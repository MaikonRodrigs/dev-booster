# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## 24/07/2026

### feature: retry commit on git identity errors

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 3
Linhas adicionadas: +9
Linhas removidas: -3

Resumo técnico: Adicionada uma política limitada de até três tentativas para falhas de identidade do Git, sem alterar automaticamente `user.name`, `user.email`, a configuração do Git ou a mensagem do commit. A versão do pacote também foi atualizada para `1.18.3`.

### Alterado

- `.devbooster/boosters/commit.md`: retry controlado para erros de identidade e notificação após a terceira tentativa.
- `template/.devbooster/boosters/commit.md`: mesma regra de retry na versão distribuída pelo template.
- `package.json`: versão atualizada de `1.18.1` para `1.18.3`.

### Arquivos modificados

- `.devbooster/boosters/commit.md`
- `package.json`
- `template/.devbooster/boosters/commit.md`

---

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 52
Linhas adicionadas: +4.460
Linhas removidas: -24

### feature: add commit workflow and knowledge base guidance

Resumo técnico: Adicionado o booster de commit com preflight conversacional, revalidação do worktree, barreira de segurança, criação idempotente do changelog e execução de um único checkpoint com `git add .`. O kit também recebeu registros de manifesto, trigger, guia, documentação pública, atualização de versão e uma base de conhecimento técnico distribuída no template.

### Adicionado

- `.devbooster/boosters/commit.md`: contrato do booster de commit com três estágios, autorização explícita, revalidação, segurança, changelog e limites de escopo.
- `template/.devbooster/boosters/commit.md`: versão do booster distribuída pelo template.
- Base de conhecimento técnico em `template/.devbooster/hub/knowledge/`, com artigos de stack, dependências, migrações, testes e padrões de implementação.

### Alterado

- `.devbooster/MANIFEST.md`, `.devbooster/rules/GUIDE.md` e `.devbooster/rules/TRIGGERS.md`: registro do booster `commit` e do trigger `@Commit`.
- `README.md`: contagem de boosters, documentação do novo fluxo, comportamento de artefatos e trigger.
- `package.json`: versão atualizada para `1.18.1`.
- `template/.devbooster/MANIFEST.md`: inclusão da base de conhecimento e atualização da documentação do kit.
- Boosters existentes no template: inclusão de regras de consulta seletiva e somente leitura da base de conhecimento.
- Regras do template: atualização do guia, protocolo de ativação e dicionário de triggers.

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/TRIGGERS.md`
- `README.md`
- `package.json`
- `.devbooster/boosters/commit.md`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/advisor.md`
- `template/.devbooster/boosters/audit.md`
- `template/.devbooster/boosters/auto-triage.md`
- `template/.devbooster/boosters/backend.md`
- `template/.devbooster/boosters/builder.md`
- `template/.devbooster/boosters/code-audit.md`
- `template/.devbooster/boosters/coder.md`
- `template/.devbooster/boosters/create.md`
- `template/.devbooster/boosters/debug.md`
- `template/.devbooster/boosters/deploy.md`
- `template/.devbooster/boosters/discovery.md`
- `template/.devbooster/boosters/frontend.md`
- `template/.devbooster/boosters/implementation.md`
- `template/.devbooster/boosters/investigation.md`
- `template/.devbooster/boosters/performance.md`
- `template/.devbooster/boosters/planning.md`
- `template/.devbooster/boosters/refactor.md`
- `template/.devbooster/boosters/review.md`
- `template/.devbooster/boosters/security.md`
- `template/.devbooster/boosters/smart-task.md`
- `template/.devbooster/boosters/stack-refresh.md`
- `template/.devbooster/boosters/testing.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/PROTOCOL.md`
- `template/.devbooster/rules/TRIGGERS.md`
- `template/.devbooster/boosters/commit.md`
- `template/.devbooster/hub/knowledge/angular-patterns.md`
- `template/.devbooster/hub/knowledge/dependency-guide.md`
- `template/.devbooster/hub/knowledge/eslint-migration.md`
- `template/.devbooster/hub/knowledge/index.md`
- `template/.devbooster/hub/knowledge/migration-guides.md`
- `template/.devbooster/hub/knowledge/monorepo-patterns.md`
- `template/.devbooster/hub/knowledge/nestjs-patterns.md`
- `template/.devbooster/hub/knowledge/nextjs-pitfalls.md`
- `template/.devbooster/hub/knowledge/nodejs-patterns.md`
- `template/.devbooster/hub/knowledge/package-manager-patterns.md`
- `template/.devbooster/hub/knowledge/prisma-postgresql-patterns.md`
- `template/.devbooster/hub/knowledge/react-patterns.md`
- `template/.devbooster/hub/knowledge/tailwind-shadcn-patterns.md`
- `template/.devbooster/hub/knowledge/tanstack-patterns.md`
- `template/.devbooster/hub/knowledge/testing-patterns.md`
- `template/.devbooster/hub/knowledge/trpc-patterns.md`
- `template/.devbooster/hub/knowledge/typescript-patterns.md`
- `template/.devbooster/hub/knowledge/upgrade-fallout.md`
- `template/.devbooster/hub/knowledge/vite-patterns.md`

---
