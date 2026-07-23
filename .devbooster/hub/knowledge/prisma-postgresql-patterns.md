# Prisma + PostgreSQL Patterns

> **Purpose:** Practical guidance for safe Prisma and PostgreSQL changes.
> **Primary official sources:** [Prisma schema reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference) · [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) · [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions) · [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) · [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing data-access abstractions, schema, migration history, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

---

## Table of Contents

1. [Schema–Client Generation Drift](#schemaclient-generation-drift)
2. [Safe Migration Workflow](#safe-migration-workflow)
3. [Expand–Contract Changes](#expandcontract-changes)
4. [Relations, Selection, and N+1](#relations-selection-and-n1)
5. [Transaction Boundaries](#transaction-boundaries)
6. [Indexes and Query Plans](#indexes-and-query-plans)
7. [Connection Pooling and Runtime Constraints](#connection-pooling-and-runtime-constraints)

---

## Schema–Client Generation Drift

### Problem
The Prisma schema, generated client, migration history, and deployed database describe different states. Typical symptoms are missing client properties, runtime errors for a new column, or a client that compiles locally but fails after deployment.

### Verify first
- Confirm the database URL and schema used by the failing runtime.
- Compare the checked-in `prisma/schema.prisma`, committed migrations, and generated-client version.
- Determine whether the change is intentional schema drift, a missed migration, or a stale generated artifact. Do not use `db push` to repair a production migration history without understanding the consequence.

### Fix
- Treat the Prisma schema and migration files as reviewed source of truth.
- After changing the schema, create or update the migration in development, then run `prisma generate` where the client is built.
- Deploy reviewed migrations with `prisma migrate deploy`; keep runtime images/functions responsible for generating or containing the matching client.
- Use [`prisma migrate diff`](https://www.prisma.io/docs/orm/prisma-migrate/workflows/troubleshooting#using-prisma-migrate-diff) to inspect a suspected difference before resolving drift.

### Verify
- Run type checking and a narrow query that reads/writes the changed model against a representative database.
- In the deployment artifact, confirm the generated client version matches the installed `prisma` package and schema.

---

## Safe Migration Workflow

### Problem
A migration succeeds on an empty development database but risks data loss, locking, or incompatible application behavior on a populated database.

### Verify first
- Inspect the generated SQL before it reaches a shared environment.
- Estimate table size, write volume, existing nulls/duplicates, and lock sensitivity.
- Identify PostgreSQL version and whether the operation can run inside a transaction; some operations, such as `CREATE INDEX CONCURRENTLY`, cannot.

### Fix
- Create migrations from the schema in development and commit both schema and migration SQL.
- Make destructive or data-dependent changes explicit. Backfill data deliberately rather than relying on a nullable-to-required change to succeed by chance.
- Test the actual migration against a production-like copy or representative dataset, including rollback or recovery procedures.
- Use `migrate deploy` for controlled environments; do not use development reset workflows against data that must be retained.

### Verify
- Check the migration table and application health after deployment.
- Confirm expected row counts, constraints, and query behavior rather than treating a zero exit status as sufficient.

*Sources: [Prisma production and testing environments](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production), [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html).*

---

## Expand–Contract Changes

### Problem
A single migration removes or renames a column while older application instances, queued jobs, or rollback images still use it.

### Verify first
- Identify every deployed version, asynchronous consumer, reporting query, and external integration that reads or writes the affected field.
- Confirm how long old instances can remain alive and whether a rollback would require the old schema.

### Fix
1. **Expand:** Add the new nullable column/table/index without removing the old interface.
2. Deploy code that can read the old representation and write the new one (or dual-read/dual-write when necessary).
3. Backfill in observable, bounded batches; validate completeness.
4. Switch reads to the new representation after all active writers are compatible.
5. **Contract:** Remove the old column, constraint, or code only in a later release.

Avoid dual writes when a database trigger, one-way compatibility read, or short maintenance window provides a simpler and safer invariant. The correct approach depends on consistency requirements and deployment overlap.

### Verify
- Measure records remaining to backfill and compare old/new values where both exist.
- Before contraction, prove that no supported application version issues queries using the old schema.

*Source: [Prisma custom migration SQL](https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations).*

---

## Relations, Selection, and N+1

### Symptom
An endpoint becomes slow as result count grows, emits one query per parent row, or transfers much more data than its response needs.

### Verify first
- Enable query logging or inspect database activity to count queries for one request.
- Measure the response shape and identify exactly which scalar fields and relations are needed.
- Check cardinality: a broad `include` across multiple to-many relations can create large result sets even without a classic N+1 loop.

### Fix
- Use `select` to request only needed scalar fields; use relation `select`/`include` deliberately.
- Fetch relation data in a bounded query rather than awaiting `findUnique` inside an application loop.
- Consider Prisma's relation load strategy only after measuring. `join` and `query` have different database and application trade-offs; availability depends on the provider and Prisma version.
- Paginate parent and child collections with stable ordering. Do not solve unbounded response size solely by adding eager loading.

### Verify
- Assert query count and payload shape in an integration test or trace.
- Recheck latency and database load with representative cardinality.

*Source: [Prisma relation queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries).*

---

## Transaction Boundaries

### Problem
A workflow leaves partial state after a failure, or a transaction holds locks/connections while it performs network I/O or slow computation.

### Verify first
- Define the invariant that must be atomic and the acceptable behavior for retries.
- Identify external side effects (email, HTTP calls, queues, files): they cannot be atomically committed with a PostgreSQL transaction.
- Check contention, isolation requirements, and transaction duration under realistic concurrency.

### Fix
- Use nested writes or `$transaction([])` for independent Prisma operations that must commit together.
- Use an interactive transaction only when later decisions depend on earlier reads, and keep its callback short.
- Perform external effects after commit, or record an outbox event transactionally and deliver it separately.
- Use database constraints and idempotency keys where possible; application-level check-then-insert logic alone races under concurrency.

### Verify
- Force a failure at each write boundary and confirm the invariant remains true.
- Load-test conflicting operations and inspect retry/unique-constraint behavior.

*Sources: [Prisma transaction guidance](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#transaction-options), [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html).*

---

## Indexes and Query Plans

### Symptom
A correct query has rising latency, high I/O, sequential scans on a large table, or slow sorts after data growth.

### Verify first
- Capture the actual SQL and bind values for the slow query.
- Run `EXPLAIN (ANALYZE, BUFFERS)` in a safe representative environment; it executes the statement, so do not use it casually on writes.
- Check table statistics, row estimates, predicate selectivity, ordering, joins, and the write cost of a proposed index.

### Fix
- Add an index that matches the real filter, join, and ordering pattern. Composite index column order matters.
- Use a partial index only when its predicate consistently matches the query and remains selective.
- Prefer a separately managed migration for operationally sensitive indexes. PostgreSQL supports `CREATE INDEX CONCURRENTLY`, but it has transaction and failure-handling constraints.
- Do not add indexes based only on model fields or a plan from a tiny local dataset.

### Verify
- Compare before/after plans, execution time, buffer reads, and write impact.
- Confirm the planner uses the index for representative parameters, not just one favorable value.

*Sources: [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html), [multicolumn indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html), [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html).*

---

## Connection Pooling and Runtime Constraints

### Problem
Deployments intermittently exhaust database connections, work locally but fail under serverless concurrency, or create a Prisma client per request.

### Verify first
- Determine the runtime model: long-lived process, containers with autoscaling, short-lived functions, edge runtime, or worker fleet.
- Calculate worst-case connections across all instances and pools against PostgreSQL `max_connections`, reserving capacity for administration and other services.
- Confirm whether the runtime supports the Prisma engine/client configuration in use; edge and serverless environments have specific constraints.

### Fix
- Reuse one `PrismaClient` per long-lived process rather than constructing it for every request.
- Set pool limits based on total deployment concurrency, not a single instance. Use an external pooler where the platform topology requires it, and validate its compatibility with transaction/session behavior.
- Bound serverless concurrency when needed; connection pooling cannot make unlimited concurrent database work safe.
- Keep transactions short, because each active transaction consumes a connection.

### Verify
- Observe active, waiting, and idle connections during a concurrency test.
- Test cold starts, scale-out, and failure recovery against the intended deployment topology.

*Sources: [Prisma connection management](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management), [Prisma serverless guidance](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#serverless-environments), [PostgreSQL connection settings](https://www.postgresql.org/docs/current/runtime-config-connection.html).*
