---
name: observability-patterns
description: Observability and instrumentation patterns. Structured logging, correlation IDs, RED/USE metrics, tracing, symptom-based alerting.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Observability Patterns

> Principles for making production behavior visible and diagnosable.

---

## 1. Define "Working" Before Instrumenting

Telemetry without a question is noise. Before adding any signal, write down the 2–4 questions an on-call engineer will ask about the feature. Every signal must help answer one of them.

| Question type | Example |
|---------------|---------|
| Success rate | "What fraction of payments succeed on first attempt vs after retry?" |
| Failure reason | "When a payment fails permanently, why? Provider error? Timeout? Validation?" |
| Dependencies | "Is the payment provider slower than usual?" |

If you can't name the questions, you're not ready to instrument.

---

## 2. Pick the Right Signal

| Signal | Answers | Cost profile | Example |
|--------|---------|--------------|---------|
| **Structured log** | "What happened in this specific case?" | Per-event; grows with traffic | `payment_failed` with provider error code |
| **Metric** | "How often / how fast, in aggregate?" | Fixed per series; cheap | p99 latency of provider calls |
| **Trace** | "Where did time go across services?" | Per-request; usually sampled | One slow checkout, broken down by hop |

> Metrics tell you **that** something is wrong, traces tell you **where**, logs tell you **why**.

---

## 3. Structured Logging

Log events, not prose. Every line is a stable event name + machine-readable fields:

| ❌ Bad | ✅ Good |
|--------|--------|
| `logger.info(\`Payment ${id} failed after ${n} retries\`)` | `logger.warn({ event: 'payment_failed', paymentId, provider, errorCode, attempt })` |

### Log Levels

| Level | Meaning | On-call action |
|-------|---------|----------------|
| `error` | Invariant broken; someone may need to act | Investigate |
| `warn` | Degraded but handled (retry succeeded, fallback used) | Watch for trends |
| `info` | Significant business event (order placed, job finished) | None |
| `debug` | Diagnostic detail | Off in production by default |

### Correlation ID (mandatory)

Generate or accept a request ID at the system boundary and attach it to every log line, span, and outbound call. Without it, you cannot reconstruct a single request from interleaved logs.

**Never log secrets, tokens, passwords, or full PII.** Allowlist fields; don't log whole request bodies.

---

## 4. Metrics

### RED (request-driven services)

- **R**ate — requests/sec
- **E**rrors — failure rate
- **D**uration — latency histogram, not average

### USE (resources: queues, pools, hosts)

- **U**tilization
- **S**aturation
- **E**rrors

### Cardinality is the failure mode

Every unique label combination is a separate time series. Labels must come from small, fixed sets:

| OK as label | NEVER a label |
|-------------|---------------|
| `route="/api/tasks/:id"` | `user_id`, `email` |
| `status_class="5xx"` | `request_id`, raw URL |
| `provider="stripe"` | error message text |

### Percentiles, never averages

An average hides the 1% of users having a terrible time. Use histograms and read p50/p95/p99.

---

## 5. Distributed Tracing

Use OpenTelemetry (vendor-neutral standard). Auto-instrumentation covers HTTP, gRPC, and common DB clients with near-zero code:

- Add manual spans only around meaningful internal units of work (e.g., `applyDiscounts`, `chargeProvider`).
- Attach the attributes on-call will filter by.
- **Propagate context across every async boundary** — HTTP headers, queue metadata — or the trace dies at the gap.
- Sample head-based at a low rate by default; keep 100% of errors if the backend supports tail sampling.

---

## 6. Symptom-Based Alerting

Alert on **symptoms users feel**, not on causes:

| Symptom (page-worthy) | Cause (dashboard, not a page) |
|------------------------|-------------------------------|
| error rate > 1% for 5 min | CPU at 85% |
| p99 latency > 2s | one pod restarted |
| queue age > 10 min | disk at 70% |

Rules for every alert:

1. It must be actionable — if the response is "ignore it, it self-heals", delete it.
2. It links to a runbook — even three lines: what it means, first query, escalation path.
3. It has a threshold and duration justified by the SLO or historical data.
4. Two severities only: **page** (act now) and **ticket** (act this week).

---

## 7. Verify the Telemetry Itself

Instrumentation is code; it can be wrong. Before calling work done:

- Force an error in staging → find it in the logs by `requestId`, confirm fields are structured.
- Send test traffic → confirm metric series appear with expected labels and sane values.
- Follow one request across services in the tracing UI → no broken spans.
- Fire each new alert once (lower the threshold temporarily) → confirm it reaches the right channel.

---

## 8. Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| "I'll add logging after it works" | Instrument as you build |
| `console.log` string interpolation | Structured events with stable names |
| Logging secrets / full bodies | Allowlist fields |
| User ID as a metric label | Put high-cardinality values in logs/traces |
| Average latency | p50/p95/p99 histograms |
| Alerts on CPU/memory paging humans | Alert on user-facing symptoms |
| Dashboards without defined questions | Start from on-call questions |

---

> **Remember:** Code you can't observe is code you can't operate. If a feature ships without telemetry, the first user-reported bug becomes archaeology instead of a query.
