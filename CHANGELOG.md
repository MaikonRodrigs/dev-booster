# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## 04/08/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 199
Linhas adicionadas: +32.324
Linhas removidas: -7.556

### feature: expand Dev Booster with native Apple support

Resumo técnico: Expandidos os boosters, personas, skills e regras do Dev Booster com suporte a bootstrap explícito, análise Intel, memória Obsidian e desenvolvimento Apple nativo. Atualizados o runtime, a documentação, os manifestos e o template distribuído para manter a nova capacidade sincronizada.

### Adicionado

- Boosters `init.md`, `intel.md` e `obsidian.md`.
- Skills e personas para Swift, SwiftUI, Vapor e fluxo de trabalho do Xcode.
- Regra `CODEBASE.md` para o snapshot inicial do projeto.

### Alterado

- Manifestos, regras, triggers, documentação, scripts e runtime do kit.
- Bootstrap `DEVBOOSTER_INIT.md` e pacote principal.
- Template `.devbooster/` sincronizado com as mesmas capacidades do workspace.

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/boosters/accessibility.md`
- `.devbooster/boosters/advisor.md`
- `.devbooster/boosters/atomic.md`
- `.devbooster/boosters/audit.md`
- `.devbooster/boosters/auto-triage.md`
- `.devbooster/boosters/backend.md`
- `.devbooster/boosters/builder.md`
- `.devbooster/boosters/changelog.md`
- `.devbooster/boosters/check-build.md`
- `.devbooster/boosters/code-audit.md`
- `.devbooster/boosters/coder.md`
- `.devbooster/boosters/commit.md`
- `.devbooster/boosters/context.md`
- `.devbooster/boosters/create.md`
- `.devbooster/boosters/debug.md`
- `.devbooster/boosters/deploy.md`
- `.devbooster/boosters/design.md`
- `.devbooster/boosters/diff-review.md`
- `.devbooster/boosters/discovery.md`
- `.devbooster/boosters/enhance.md`
- `.devbooster/boosters/forger.md`
- `.devbooster/boosters/frontend.md`
- `.devbooster/boosters/global-documentation.md`
- `.devbooster/boosters/i18n.md`
- `.devbooster/boosters/implementation.md`
- `.devbooster/boosters/init.md`
- `.devbooster/boosters/intel.md`
- `.devbooster/boosters/internal-documentation.md`
- `.devbooster/boosters/investigation.md`
- `.devbooster/boosters/mobile.md`
- `.devbooster/boosters/obsidian.md`
- `.devbooster/boosters/performance.md`
- `.devbooster/boosters/planning.md`
- `.devbooster/boosters/refactor.md`
- `.devbooster/boosters/review.md`
- `.devbooster/boosters/save-context.md`
- `.devbooster/boosters/save-reference.md`
- `.devbooster/boosters/security.md`
- `.devbooster/boosters/seo.md`
- `.devbooster/boosters/smart-task.md`
- `.devbooster/boosters/stack-refresh.md`
- `.devbooster/boosters/testing.md`
- `.devbooster/boosters/ui-ux-pro-max.md`
- `.devbooster/hub/personas/agent_backend-specialist.md`
- `.devbooster/hub/personas/agent_frontend-specialist.md`
- `.devbooster/hub/personas/agent_mobile-developer.md`
- `.devbooster/hub/personas/agent_project-planner.md`
- `.devbooster/hub/personas/agent_security-auditor.md`
- `.devbooster/hub/personas/preview.md`
- `.devbooster/hub/personas/skill_api-patterns.md`
- `.devbooster/hub/personas/skill_clean-code.md`
- `.devbooster/hub/personas/skill_frontend-design.md`
- `.devbooster/hub/personas/skill_geo-fundamentals.md`
- `.devbooster/hub/personas/skill_i18n-localization.md`
- `.devbooster/hub/personas/skill_lint-and-validate.md`
- `.devbooster/hub/personas/skill_mobile-design.md`
- `.devbooster/hub/personas/skill_nextjs-react-expert.md`
- `.devbooster/hub/personas/skill_performance-profiling.md`
- `.devbooster/hub/personas/skill_swift-apps.md`
- `.devbooster/hub/personas/skill_swift-backend.md`
- `.devbooster/hub/personas/skill_vulnerability-scanner.md`
- `.devbooster/hub/personas/skill_webapp-testing.md`
- `.devbooster/hub/personas/skill_xcode-cli.md`
- `.devbooster/hub/personas/status.md`
- `.devbooster/hub/scripts/checklist.py`
- `.devbooster/hub/scripts/verify_all.py`
- `.devbooster/hub/skills/api-patterns/SKILL.md`
- `.devbooster/hub/skills/clean-code/SKILL.md`
- `.devbooster/hub/skills/frontend-design/SKILL.md`
- `.devbooster/hub/skills/geo-fundamentals/SKILL.md`
- `.devbooster/hub/skills/i18n-localization/SKILL.md`
- `.devbooster/hub/skills/lint-and-validate/SKILL.md`
- `.devbooster/hub/skills/mobile-design/SKILL.md`
- `.devbooster/hub/skills/nextjs-react-expert/SKILL.md`
- `.devbooster/hub/skills/performance-profiling/SKILL.md`
- `.devbooster/hub/skills/swift-apps/SKILL.md`
- `.devbooster/hub/skills/swift-apps/platform-ios.md`
- `.devbooster/hub/skills/swift-apps/platform-macos.md`
- `.devbooster/hub/skills/swift-apps/platform-watchos-tvos.md`
- `.devbooster/hub/skills/swift-apps/swift-language.md`
- `.devbooster/hub/skills/swift-apps/swiftui-core.md`
- `.devbooster/hub/skills/swift-apps/swiftui-data.md`
- `.devbooster/hub/skills/swift-apps/swiftui-testing.md`
- `.devbooster/hub/skills/swift-backend/SKILL.md`
- `.devbooster/hub/skills/swift-backend/vapor-patterns.md`
- `.devbooster/hub/skills/vulnerability-scanner/SKILL.md`
- `.devbooster/hub/skills/webapp-testing/SKILL.md`
- `.devbooster/hub/skills/xcode-cli/SKILL.md`
- `.devbooster/hub/skills/xcode-cli/xcode-workflow.md`
- `.devbooster/rules/BACKEND.md`
- `.devbooster/rules/CODEBASE.md`
- `.devbooster/rules/FRONTEND.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/PROTOCOL.md`
- `.devbooster/rules/TRIGGERS.md`
- `.devbooster/rules/USER_PREFERENCES.md`
- `DEVBOOSTER_INIT.md`
- `README.md`
- `package.json`
- `src/index.js`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/accessibility.md`
- `template/.devbooster/boosters/advisor.md`
- `template/.devbooster/boosters/atomic.md`
- `template/.devbooster/boosters/audit.md`
- `template/.devbooster/boosters/auto-triage.md`
- `template/.devbooster/boosters/backend.md`
- `template/.devbooster/boosters/builder.md`
- `template/.devbooster/boosters/changelog.md`
- `template/.devbooster/boosters/check-build.md`
- `template/.devbooster/boosters/code-audit.md`
- `template/.devbooster/boosters/coder.md`
- `template/.devbooster/boosters/commit.md`
- `template/.devbooster/boosters/context.md`
- `template/.devbooster/boosters/create.md`
- `template/.devbooster/boosters/debug.md`
- `template/.devbooster/boosters/deploy.md`
- `template/.devbooster/boosters/design.md`
- `template/.devbooster/boosters/diff-review.md`
- `template/.devbooster/boosters/discovery.md`
- `template/.devbooster/boosters/enhance.md`
- `template/.devbooster/boosters/forger.md`
- `template/.devbooster/boosters/frontend.md`
- `template/.devbooster/boosters/global-documentation.md`
- `template/.devbooster/boosters/i18n.md`
- `template/.devbooster/boosters/implementation.md`
- `template/.devbooster/boosters/init.md`
- `template/.devbooster/boosters/intel.md`
- `template/.devbooster/boosters/internal-documentation.md`
- `template/.devbooster/boosters/investigation.md`
- `template/.devbooster/boosters/mobile.md`
- `template/.devbooster/boosters/obsidian.md`
- `template/.devbooster/boosters/performance.md`
- `template/.devbooster/boosters/planning.md`
- `template/.devbooster/boosters/refactor.md`
- `template/.devbooster/boosters/review.md`
- `template/.devbooster/boosters/save-context.md`
- `template/.devbooster/boosters/save-reference.md`
- `template/.devbooster/boosters/security.md`
- `template/.devbooster/boosters/seo.md`
- `template/.devbooster/boosters/smart-task.md`
- `template/.devbooster/boosters/stack-refresh.md`
- `template/.devbooster/boosters/testing.md`
- `template/.devbooster/boosters/ui-ux-pro-max.md`
- `template/.devbooster/hub/personas/agent_backend-specialist.md`
- `template/.devbooster/hub/personas/agent_frontend-specialist.md`
- `template/.devbooster/hub/personas/agent_mobile-developer.md`
- `template/.devbooster/hub/personas/agent_project-planner.md`
- `template/.devbooster/hub/personas/agent_security-auditor.md`
- `template/.devbooster/hub/personas/preview.md`
- `template/.devbooster/hub/personas/skill_api-patterns.md`
- `template/.devbooster/hub/personas/skill_clean-code.md`
- `template/.devbooster/hub/personas/skill_frontend-design.md`
- `template/.devbooster/hub/personas/skill_geo-fundamentals.md`
- `template/.devbooster/hub/personas/skill_i18n-localization.md`
- `template/.devbooster/hub/personas/skill_lint-and-validate.md`
- `template/.devbooster/hub/personas/skill_mobile-design.md`
- `template/.devbooster/hub/personas/skill_nextjs-react-expert.md`
- `template/.devbooster/hub/personas/skill_performance-profiling.md`
- `template/.devbooster/hub/personas/skill_swift-apps.md`
- `template/.devbooster/hub/personas/skill_swift-backend.md`
- `template/.devbooster/hub/personas/skill_vulnerability-scanner.md`
- `template/.devbooster/hub/personas/skill_webapp-testing.md`
- `template/.devbooster/hub/personas/skill_xcode-cli.md`
- `template/.devbooster/hub/personas/status.md`
- `template/.devbooster/hub/scripts/checklist.py`
- `template/.devbooster/hub/scripts/verify_all.py`
- `template/.devbooster/hub/skills/api-patterns/SKILL.md`
- `template/.devbooster/hub/skills/clean-code/SKILL.md`
- `template/.devbooster/hub/skills/frontend-design/SKILL.md`
- `template/.devbooster/hub/skills/geo-fundamentals/SKILL.md`
- `template/.devbooster/hub/skills/i18n-localization/SKILL.md`
- `template/.devbooster/hub/skills/lint-and-validate/SKILL.md`
- `template/.devbooster/hub/skills/mobile-design/SKILL.md`
- `template/.devbooster/hub/skills/nextjs-react-expert/SKILL.md`
- `template/.devbooster/hub/skills/performance-profiling/SKILL.md`
- `template/.devbooster/hub/skills/swift-apps/SKILL.md`
- `template/.devbooster/hub/skills/swift-apps/platform-ios.md`
- `template/.devbooster/hub/skills/swift-apps/platform-macos.md`
- `template/.devbooster/hub/skills/swift-apps/platform-watchos-tvos.md`
- `template/.devbooster/hub/skills/swift-apps/swift-language.md`
- `template/.devbooster/hub/skills/swift-apps/swiftui-core.md`
- `template/.devbooster/hub/skills/swift-apps/swiftui-data.md`
- `template/.devbooster/hub/skills/swift-apps/swiftui-testing.md`
- `template/.devbooster/hub/skills/swift-backend/SKILL.md`
- `template/.devbooster/hub/skills/swift-backend/vapor-patterns.md`
- `template/.devbooster/hub/skills/vulnerability-scanner/SKILL.md`
- `template/.devbooster/hub/skills/webapp-testing/SKILL.md`
- `template/.devbooster/hub/skills/xcode-cli/SKILL.md`
- `template/.devbooster/hub/skills/xcode-cli/xcode-workflow.md`
- `template/.devbooster/rules/BACKEND.md`
- `template/.devbooster/rules/CODEBASE.md`
- `template/.devbooster/rules/FRONTEND.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/PROTOCOL.md`
- `template/.devbooster/rules/TRIGGERS.md`
- `template/.devbooster/rules/USER_PREFERENCES.md`
- `template/DEVBOOSTER_INIT.md`
---


## 29/07/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 70
Linhas adicionadas: +2.537
Linhas removidas: -35
Versão do pacote: `1.18.8`

### feature: add check-build booster, forger, save-reference, ux-references and template sync

Resumo técnico: Adicionado novo booster `check-build.md` para validação pré-merge com clean install, lint, typecheck e build. Adicionados boosters `forger.md` e `save-reference.md`. Adicionada biblioteca de referências UX (`hub/ux-references/`) com 18 categorias de interface. Ajustados boosters existentes (auto-triage, builder, create, design, enhance, frontend, implementation, smart-task, ui-ux-pro-max). Atualizado `.gitignore` para não ignorar `.devbooster/`. Sincronizado template via `scripts/sync-template.js`.

### Adicionado

- `.devbooster/boosters/check-build.md`: booster de validação pré-merge (@CheckBuild)
- `.devbooster/boosters/forger.md`: forja planos atômicos em código
- `.devbooster/boosters/save-reference.md`: catálogo visual de referências UX
- `.devbooster/hub/ux-references/`: biblioteca com 18 categorias de referências de interface
- `template/.devbooster/boosters/check-build.md`, `forger.md`, `save-reference.md`
- `template/.devbooster/hub/ux-references/`: sincronizado do workspace

### Alterado

- `.devbooster/MANIFEST.md`: registro dos novos boosters
- `.devbooster/rules/GUIDE.md`: documentação dos novos boosters
- `.devbooster/rules/TRIGGERS.md`: novos triggers
- `.devbooster/boosters/auto-triage.md`, `builder.md`, `create.md`, `design.md`, `enhance.md`, `frontend.md`, `implementation.md`, `smart-task.md`, `ui-ux-pro-max.md`: ajustes diversos
- `template/.devbooster/`: sincronizado com workspace
- `README.md`: contagem de boosters atualizada
- `package.json`: versão atualizada
- `.gitignore`: `.devbooster/` removido do ignore
- `scripts/sync-template.js`: atualizado

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/boosters/auto-triage.md`
- `.devbooster/boosters/builder.md`
- `.devbooster/boosters/check-build.md`
- `.devbooster/boosters/create.md`
- `.devbooster/boosters/design.md`
- `.devbooster/boosters/enhance.md`
- `.devbooster/boosters/forger.md`
- `.devbooster/boosters/frontend.md`
- `.devbooster/boosters/implementation.md`
- `.devbooster/boosters/save-reference.md`
- `.devbooster/boosters/smart-task.md`
- `.devbooster/boosters/ui-ux-pro-max.md`
- `.devbooster/hub/ux-references/404/index.md`
- `.devbooster/hub/ux-references/GUIDE.md`
- `.devbooster/hub/ux-references/contact/index.md`
- `.devbooster/hub/ux-references/dashboards/index.md`
- `.devbooster/hub/ux-references/email-templates/index.md`
- `.devbooster/hub/ux-references/feature-sections/index.md`
- `.devbooster/hub/ux-references/footer/index.md`
- `.devbooster/hub/ux-references/forgot-password/index.md`
- `.devbooster/hub/ux-references/header-sections/index.md`
- `.devbooster/hub/ux-references/informational-pages/index.md`
- `.devbooster/hub/ux-references/landing-pages/index.md`
- `.devbooster/hub/ux-references/payments/index.md`
- `.devbooster/hub/ux-references/pricing/index.md`
- `.devbooster/hub/ux-references/profile/index.md`
- `.devbooster/hub/ux-references/settings/index.md`
- `.devbooster/hub/ux-references/sign-in/index.md`
- `.devbooster/hub/ux-references/sign-up/index.md`
- `.devbooster/hub/ux-references/verification/index.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/TRIGGERS.md`
- `.gitignore`
- `README.md`
- `package.json`
- `scripts/sync-template.js`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/auto-triage.md`
- `template/.devbooster/boosters/builder.md`
- `template/.devbooster/boosters/check-build.md`
- `template/.devbooster/boosters/create.md`
- `template/.devbooster/boosters/design.md`
- `template/.devbooster/boosters/enhance.md`
- `template/.devbooster/boosters/forger.md`
- `template/.devbooster/boosters/frontend.md`
- `template/.devbooster/boosters/implementation.md`
- `template/.devbooster/boosters/save-reference.md`
- `template/.devbooster/boosters/smart-task.md`
- `template/.devbooster/boosters/ui-ux-pro-max.md`
- `template/.devbooster/hub/ux-references/404/index.md`
- `template/.devbooster/hub/ux-references/GUIDE.md`
- `template/.devbooster/hub/ux-references/contact/index.md`
- `template/.devbooster/hub/ux-references/dashboards/index.md`
- `template/.devbooster/hub/ux-references/email-templates/index.md`
- `template/.devbooster/hub/ux-references/feature-sections/index.md`
- `template/.devbooster/hub/ux-references/footer/index.md`
- `template/.devbooster/hub/ux-references/forgot-password/index.md`
- `template/.devbooster/hub/ux-references/header-sections/index.md`
- `template/.devbooster/hub/ux-references/informational-pages/index.md`
- `template/.devbooster/hub/ux-references/landing-pages/index.md`
- `template/.devbooster/hub/ux-references/payments/index.md`
- `template/.devbooster/hub/ux-references/pricing/index.md`
- `template/.devbooster/hub/ux-references/profile/index.md`
- `template/.devbooster/hub/ux-references/settings/index.md`
- `template/.devbooster/hub/ux-references/sign-in/index.md`
- `template/.devbooster/hub/ux-references/sign-up/index.md`
- `template/.devbooster/hub/ux-references/verification/index.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/TRIGGERS.md`

---

## 26/07/2026

### feat(protocol): add NVM runtime activation rule

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 9
Linhas adicionadas: +69
Linhas removidas: -33
Versão do pacote: `1.18.4`

Resumo técnico: Adicionada regra fixa de ativação do NVM no PROTOCOL.md (§7) para resolver falhas de comandos Node em shells não-interativos. O NVM é uma shell function — quando o terminal da IA spawna um shell não-interativo, `nvm` não está disponível. A nova seção ensina o snippet correto (`export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; nvm install; nvm use`) e estabelece a REPEAT RULE: todo comando Node precisa re-ativar o NVM. O PROJECT.md foi atualizado para detectar `.nvmrc` e lockfile durante o bootstrap. Boosters `stack-refresh.md` e `audit.md` corrigidos: substituído `run nvm use` (falha em shell não-interativo) por referência ao PROTOCOL.md §7.

### Adicionado

- `.devbooster/rules/PROTOCOL.md`: nova seção **§7 — NVM/NODE RUNTIME ACTIVATION** com detecção de `.nvmrc`, ativação correta via source, REPEAT RULE, exemplo de comando, e proibição de falso negativo.

### Alterado

- `.devbooster/rules/PROJECT.md`: STEP 1 agora detecta `.nvmrc`/`.node-version` + lockfile para identificar package manager; nova seção **Runtime Configuration** na Expected Structure.
- `.devbooster/boosters/stack-refresh.md`: Step B substitui `run nvm use` por referência ao PROTOCOL.md §7 com alerta explícito de que `nvm use` puro falha em shell não-interativo.
- `.devbooster/boosters/audit.md`: Step A mesma correção do stack-refresh.
- `template/.devbooster/rules/PROTOCOL.md`, `PROJECT.md`, `boosters/stack-refresh.md`, `boosters/audit.md`: sincronizados via `scripts/sync-template.js`.

### Arquivos modificados

- `.devbooster/rules/PROTOCOL.md`
- `.devbooster/rules/PROJECT.md`
- `.devbooster/boosters/stack-refresh.md`
- `.devbooster/boosters/audit.md`
- `package.json`
- `template/.devbooster/rules/PROTOCOL.md`
- `template/.devbooster/rules/PROJECT.md`
- `template/.devbooster/boosters/stack-refresh.md`
- `template/.devbooster/boosters/audit.md`

---

### fix(boosters): replace generic execution booster references with explicit Builder booster

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 4
Linhas adicionadas: +16
Linhas removidas: -16
Versão do pacote: `1.18.6`

Resumo técnico: Substituídas referências genéricas a "selected execution booster" no auto-triage.md e "Builder" solto no smart-task.md por invocação explícita do booster `builder.md`. Agora ambos os boosters carregam `.devbooster/boosters/builder.md` via ROUTE B: DIRECT EXECUTION, com proibição explícita de invocar qualquer outro booster ou executar código diretamente.

### Alterado

- `.devbooster/boosters/auto-triage.md`: Stage 3 agora carrega `builder.md` explicitamente; Checkpoint E mostra `builder.md` como executor fixo; artifact field alterado de "Selected executor" para "Executor: `builder.md`".
- `.devbooster/boosters/smart-task.md`: Stage 2 agora carrega `builder.md` explicitamente com proibição: "Do NOT invoke any other booster or execute code directly".
- `template/.devbooster/boosters/auto-triage.md`: sincronizado.
- `template/.devbooster/boosters/smart-task.md`: sincronizado.

### Arquivos modificados

- `.devbooster/boosters/auto-triage.md`
- `.devbooster/boosters/smart-task.md`
- `template/.devbooster/boosters/auto-triage.md`
- `template/.devbooster/boosters/smart-task.md`

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
