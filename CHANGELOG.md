# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## 03/09/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 887
Linhas adicionadas: +48.050
Linhas removidas: -2.725

### feature: add observability, ci-cd, pilot, refine and interview boosters and expand UX references

Resumo técnico: Adicionados cinco novos boosters — observability (auditoria de observabilidade e instrumentação), ci-cd (auditoria de pipeline CI/CD), pilot (direção técnica entre refine e execução), refine (refinamento de regras de negócio) e interview (extração de intenção por entrevista de uma pergunta por vez) — com skills e conhecimento dedicados: ci-cd-patterns, observability-patterns, design-hardening, design-refinement, react-web-workers, timing-patterns e ai-tells. Biblioteca de referências UX massivamente expandida, com índices e dezenas de padrões por categoria (404, contact, dashboards, email-templates, feature-sections, footer, forgot-password, header-sections, informational-pages, landing-pages, payments, pricing, profile, settings, sign-in, sign-up, verification). Todos os boosters passaram a declarar a seção obrigatória Required Kit Resources; Auto Triage ganhou validação opt-in pós-execução e roteamento ampliado para observability e interview; Smart Task, Forger, Builder, Motion, Intel, Global/Internal Documentation e demais boosters revisados; booster save-reference removido (raiz e template); versão do kit 1.19.5 → 1.22.7; README, MANIFEST, regras, .gitignore e template sincronizados.

### Adicionado

- Boosters `observability.md`, `ci-cd.md`, `pilot.md`, `refine.md` e `interview.md` na raiz e no template — auditoria de observabilidade, auditoria de CI/CD, direção técnica (pilot), refinamento de regras de negócio (refine) e extração de intenção (interview).
- Skills `ci-cd-patterns`, `observability-patterns`, `design-hardening` e `design-refinement` (raiz e template).
- Knowledge base: `react-web-workers.md`, `timing-patterns.md` e `ai-tells.md` (frontend-design).
- Biblioteca UX: índices expandidos e centenas de padrões por categoria (404, contact, dashboards, email-templates, feature-sections, footer, forgot-password, header-sections, informational-pages, landing-pages, payments, pricing, profile, settings, sign-in, sign-up, verification).

### Alterado

- Todos os boosters passaram a declarar a seção obrigatória "Required Kit Resources" com verificação terminal de recursos `.devbooster`.
- Auto Triage: validação opt-in após execução (Checkpoint F) e matriz de roteamento ampliada com `observability` e `interview`.
- Smart Task, Forger, Builder, Motion, Intel, Global/Internal Documentation, Design Engineer, UX References GUIDE e demais boosters revisados.
- README (50 ativadores, tabelas e artefatos), MANIFEST.md, regras (GUIDE/PROTOCOL/TRIGGERS) e template sincronizados.
- Versão do kit em `package.json`: 1.19.5 → 1.22.7.
- `.gitignore`: entradas `ui-references` e `VISION_PROMPT.md`.

### Removido

- Booster `save-reference.md` (raiz e template).
- `@booster-generated/tasks.md`.

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/boosters/accessibility.md`
- `.devbooster/boosters/advisor.md`
- `.devbooster/boosters/architecture-audit.md`
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
- `.devbooster/boosters/design-engineer.md`
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
- `.devbooster/boosters/motion.md`
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
- `.devbooster/hub/knowledge/index.md`
- `.devbooster/hub/knowledge/react-patterns.md`
- `.devbooster/hub/personas/agent_performance-optimizer.md`
- `.devbooster/hub/personas/skill_nextjs-react-expert.md`
- `.devbooster/hub/personas/skill_parallel-agents.md`
- `.devbooster/hub/roadmap/INDEX.md`
- `.devbooster/hub/roadmap/components.md`
- `.devbooster/hub/roadmap/motion.md`
- `.devbooster/hub/skills/frontend-design/SKILL.md`
- `.devbooster/hub/skills/frontend-design/animation-guide.md`
- `.devbooster/hub/skills/frontend-design/motion-graphics.md`
- `.devbooster/hub/skills/frontend-design/visual-effects.md`
- `.devbooster/hub/skills/nextjs-react-expert/1-async-eliminating-waterfalls.md`
- `.devbooster/hub/skills/nextjs-react-expert/4-client-client-side-data-fetching.md`
- `.devbooster/hub/skills/nextjs-react-expert/SKILL.md`
- `.devbooster/hub/skills/parallel-agents/SKILL.md`
- `.devbooster/hub/skills/web-design-guidelines/SKILL.md`
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
- `.devbooster/rules/PROTOCOL.md`
- `.devbooster/rules/TRIGGERS.md`
- `.gitignore`
- `@booster-generated/tasks.md`
- `README.md`
- `package.json`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/accessibility.md`
- `template/.devbooster/boosters/advisor.md`
- `template/.devbooster/boosters/architecture-audit.md`
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
- `template/.devbooster/boosters/design-engineer.md`
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
- `template/.devbooster/boosters/motion.md`
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
- `template/.devbooster/hub/knowledge/index.md`
- `template/.devbooster/hub/knowledge/react-patterns.md`
- `template/.devbooster/hub/personas/agent_performance-optimizer.md`
- `template/.devbooster/hub/personas/skill_nextjs-react-expert.md`
- `template/.devbooster/hub/personas/skill_parallel-agents.md`
- `template/.devbooster/hub/roadmap/INDEX.md`
- `template/.devbooster/hub/roadmap/components.md`
- `template/.devbooster/hub/roadmap/motion.md`
- `template/.devbooster/hub/skills/frontend-design/SKILL.md`
- `template/.devbooster/hub/skills/frontend-design/animation-guide.md`
- `template/.devbooster/hub/skills/frontend-design/motion-graphics.md`
- `template/.devbooster/hub/skills/frontend-design/visual-effects.md`
- `template/.devbooster/hub/skills/nextjs-react-expert/1-async-eliminating-waterfalls.md`
- `template/.devbooster/hub/skills/nextjs-react-expert/4-client-client-side-data-fetching.md`
- `template/.devbooster/hub/skills/nextjs-react-expert/SKILL.md`
- `template/.devbooster/hub/skills/parallel-agents/SKILL.md`
- `template/.devbooster/hub/skills/web-design-guidelines/SKILL.md`
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
- `template/.devbooster/rules/PROTOCOL.md`
- `template/.devbooster/rules/TRIGGERS.md`
- `.devbooster/boosters/ci-cd.md`
- `.devbooster/boosters/interview.md`
- `.devbooster/boosters/observability.md`
- `.devbooster/boosters/pilot.md`
- `.devbooster/boosters/refine.md`
- `.devbooster/hub/knowledge/react-web-workers.md`
- `.devbooster/hub/knowledge/timing-patterns.md`
- `.devbooster/hub/skills/ci-cd-patterns/`
- `.devbooster/hub/skills/design-hardening/`
- `.devbooster/hub/skills/design-refinement/`
- `.devbooster/hub/skills/frontend-design/ai-tells.md`
- `.devbooster/hub/skills/observability-patterns/`
- `.devbooster/hub/ux-references/404/404-01.md`
- `.devbooster/hub/ux-references/404/404-02.md`
- `.devbooster/hub/ux-references/404/404-03.md`
- `.devbooster/hub/ux-references/404/404-04.md`
- `.devbooster/hub/ux-references/404/404-05.md`
- `.devbooster/hub/ux-references/404/404-06.md`
- `.devbooster/hub/ux-references/404/404-07.md`
- `.devbooster/hub/ux-references/404/404-08.md`
- `.devbooster/hub/ux-references/404/404-09.md`
- `.devbooster/hub/ux-references/404/404-10.md`
- `.devbooster/hub/ux-references/404/404-11.md`
- `.devbooster/hub/ux-references/404/404-12.md`
- `.devbooster/hub/ux-references/404/404-13.md`
- `.devbooster/hub/ux-references/404/404-14.md`
- `.devbooster/hub/ux-references/contact/contact-01.md`
- `.devbooster/hub/ux-references/contact/contact-02.md`
- `.devbooster/hub/ux-references/contact/contact-03.md`
- `.devbooster/hub/ux-references/contact/contact-04.md`
- `.devbooster/hub/ux-references/contact/contact-05.md`
- `.devbooster/hub/ux-references/contact/contact-06.md`
- `.devbooster/hub/ux-references/contact/contact-07.md`
- `.devbooster/hub/ux-references/contact/contact-08.md`
- `.devbooster/hub/ux-references/contact/contact-09.md`
- `.devbooster/hub/ux-references/contact/contact-10.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-01.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-02.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-03.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-04.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-05.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-06.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-07.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-08.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-09.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-10.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-11.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-12.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-13.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-14.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-15.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-16.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-17.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-18.md`
- `.devbooster/hub/ux-references/dashboards/dashboard-19.md`
- `.devbooster/hub/ux-references/email-templates/email-01.md`
- `.devbooster/hub/ux-references/email-templates/email-02.md`
- `.devbooster/hub/ux-references/email-templates/email-03.md`
- `.devbooster/hub/ux-references/email-templates/email-04.md`
- `.devbooster/hub/ux-references/email-templates/email-05.md`
- `.devbooster/hub/ux-references/email-templates/email-06.md`
- `.devbooster/hub/ux-references/email-templates/email-07.md`
- `.devbooster/hub/ux-references/email-templates/email-08.md`
- `.devbooster/hub/ux-references/email-templates/email-09.md`
- `.devbooster/hub/ux-references/email-templates/email-10.md`
- `.devbooster/hub/ux-references/feature-sections/feature-01.md`
- `.devbooster/hub/ux-references/feature-sections/feature-02.md`
- `.devbooster/hub/ux-references/feature-sections/feature-03.md`
- `.devbooster/hub/ux-references/feature-sections/feature-04.md`
- `.devbooster/hub/ux-references/feature-sections/feature-05.md`
- `.devbooster/hub/ux-references/feature-sections/feature-06.md`
- `.devbooster/hub/ux-references/feature-sections/feature-07.md`
- `.devbooster/hub/ux-references/feature-sections/feature-08.md`
- `.devbooster/hub/ux-references/feature-sections/feature-09.md`
- `.devbooster/hub/ux-references/feature-sections/feature-10.md`
- `.devbooster/hub/ux-references/feature-sections/feature-11.md`
- `.devbooster/hub/ux-references/feature-sections/feature-12.md`
- `.devbooster/hub/ux-references/feature-sections/feature-13.md`
- `.devbooster/hub/ux-references/feature-sections/feature-14.md`
- `.devbooster/hub/ux-references/feature-sections/feature-15.md`
- `.devbooster/hub/ux-references/feature-sections/feature-16.md`
- `.devbooster/hub/ux-references/feature-sections/feature-17.md`
- `.devbooster/hub/ux-references/feature-sections/feature-18.md`
- `.devbooster/hub/ux-references/feature-sections/feature-19.md`
- `.devbooster/hub/ux-references/feature-sections/feature-20.md`
- `.devbooster/hub/ux-references/feature-sections/feature-21.md`
- `.devbooster/hub/ux-references/feature-sections/feature-22.md`
- `.devbooster/hub/ux-references/feature-sections/feature-23.md`
- `.devbooster/hub/ux-references/feature-sections/feature-24.md`
- `.devbooster/hub/ux-references/feature-sections/feature-25.md`
- `.devbooster/hub/ux-references/feature-sections/feature-26.md`
- `.devbooster/hub/ux-references/feature-sections/feature-27.md`
- `.devbooster/hub/ux-references/feature-sections/feature-28.md`
- `.devbooster/hub/ux-references/feature-sections/feature-29.md`
- `.devbooster/hub/ux-references/feature-sections/feature-30.md`
- `.devbooster/hub/ux-references/feature-sections/feature-31.md`
- `.devbooster/hub/ux-references/feature-sections/feature-32.md`
- `.devbooster/hub/ux-references/feature-sections/feature-33.md`
- `.devbooster/hub/ux-references/feature-sections/feature-34.md`
- `.devbooster/hub/ux-references/feature-sections/feature-35.md`
- `.devbooster/hub/ux-references/feature-sections/feature-36.md`
- `.devbooster/hub/ux-references/feature-sections/feature-37.md`
- `.devbooster/hub/ux-references/feature-sections/feature-38.md`
- `.devbooster/hub/ux-references/feature-sections/feature-39.md`
- `.devbooster/hub/ux-references/feature-sections/feature-40.md`
- `.devbooster/hub/ux-references/feature-sections/feature-41.md`
- `.devbooster/hub/ux-references/feature-sections/feature-42.md`
- `.devbooster/hub/ux-references/feature-sections/feature-43.md`
- `.devbooster/hub/ux-references/feature-sections/feature-44.md`
- `.devbooster/hub/ux-references/feature-sections/feature-45.md`
- `.devbooster/hub/ux-references/feature-sections/feature-46.md`
- `.devbooster/hub/ux-references/footer/footer-01.md`
- `.devbooster/hub/ux-references/footer/footer-02.md`
- `.devbooster/hub/ux-references/footer/footer-03.md`
- `.devbooster/hub/ux-references/footer/footer-04.md`
- `.devbooster/hub/ux-references/footer/footer-05.md`
- `.devbooster/hub/ux-references/footer/footer-06.md`
- `.devbooster/hub/ux-references/footer/footer-07.md`
- `.devbooster/hub/ux-references/footer/footer-08.md`
- `.devbooster/hub/ux-references/footer/footer-09.md`
- `.devbooster/hub/ux-references/footer/footer-10.md`
- `.devbooster/hub/ux-references/footer/footer-11.md`
- `.devbooster/hub/ux-references/footer/footer-12.md`
- `.devbooster/hub/ux-references/footer/footer-13.md`
- `.devbooster/hub/ux-references/footer/footer-14.md`
- `.devbooster/hub/ux-references/footer/footer-15.md`
- `.devbooster/hub/ux-references/footer/footer-16.md`
- `.devbooster/hub/ux-references/footer/footer-17.md`
- `.devbooster/hub/ux-references/footer/footer-18.md`
- `.devbooster/hub/ux-references/footer/footer-19.md`
- `.devbooster/hub/ux-references/footer/footer-20.md`
- `.devbooster/hub/ux-references/footer/footer-21.md`
- `.devbooster/hub/ux-references/footer/footer-22.md`
- `.devbooster/hub/ux-references/footer/footer-23.md`
- `.devbooster/hub/ux-references/footer/footer-24.md`
- `.devbooster/hub/ux-references/footer/footer-25.md`
- `.devbooster/hub/ux-references/footer/footer-26.md`
- `.devbooster/hub/ux-references/footer/footer-27.md`
- `.devbooster/hub/ux-references/footer/footer-28.md`
- `.devbooster/hub/ux-references/footer/footer-29.md`
- `.devbooster/hub/ux-references/footer/footer-30.md`
- `.devbooster/hub/ux-references/footer/footer-31.md`
- `.devbooster/hub/ux-references/footer/footer-32.md`
- `.devbooster/hub/ux-references/footer/footer-33.md`
- `.devbooster/hub/ux-references/footer/footer-34.md`
- `.devbooster/hub/ux-references/footer/footer-35.md`
- `.devbooster/hub/ux-references/footer/footer-36.md`
- `.devbooster/hub/ux-references/footer/footer-37.md`
- `.devbooster/hub/ux-references/footer/footer-38.md`
- `.devbooster/hub/ux-references/footer/footer-39.md`
- `.devbooster/hub/ux-references/footer/footer-40.md`
- `.devbooster/hub/ux-references/forgot-password/forgot-password-01.md`
- `.devbooster/hub/ux-references/forgot-password/forgot-password-02.md`
- `.devbooster/hub/ux-references/forgot-password/forgot-password-03.md`
- `.devbooster/hub/ux-references/forgot-password/forgot-password-04.md`
- `.devbooster/hub/ux-references/header-sections/header-01.md`
- `.devbooster/hub/ux-references/header-sections/header-02.md`
- `.devbooster/hub/ux-references/header-sections/header-03.md`
- `.devbooster/hub/ux-references/header-sections/header-04.md`
- `.devbooster/hub/ux-references/header-sections/header-05.md`
- `.devbooster/hub/ux-references/header-sections/header-06.md`
- `.devbooster/hub/ux-references/header-sections/header-07.md`
- `.devbooster/hub/ux-references/header-sections/header-08.md`
- `.devbooster/hub/ux-references/header-sections/header-09.md`
- `.devbooster/hub/ux-references/header-sections/header-10.md`
- `.devbooster/hub/ux-references/header-sections/header-11.md`
- `.devbooster/hub/ux-references/header-sections/header-12.md`
- `.devbooster/hub/ux-references/header-sections/header-13.md`
- `.devbooster/hub/ux-references/header-sections/header-14.md`
- `.devbooster/hub/ux-references/header-sections/header-15.md`
- `.devbooster/hub/ux-references/header-sections/header-16.md`
- `.devbooster/hub/ux-references/header-sections/header-17.md`
- `.devbooster/hub/ux-references/header-sections/header-18.md`
- `.devbooster/hub/ux-references/header-sections/header-19.md`
- `.devbooster/hub/ux-references/header-sections/header-20.md`
- `.devbooster/hub/ux-references/header-sections/header-21.md`
- `.devbooster/hub/ux-references/header-sections/header-22.md`
- `.devbooster/hub/ux-references/header-sections/header-23.md`
- `.devbooster/hub/ux-references/header-sections/header-24.md`
- `.devbooster/hub/ux-references/header-sections/header-25.md`
- `.devbooster/hub/ux-references/header-sections/header-26.md`
- `.devbooster/hub/ux-references/header-sections/header-27.md`
- `.devbooster/hub/ux-references/header-sections/header-28.md`
- `.devbooster/hub/ux-references/header-sections/header-29.md`
- `.devbooster/hub/ux-references/header-sections/header-30.md`
- `.devbooster/hub/ux-references/header-sections/header-31.md`
- `.devbooster/hub/ux-references/header-sections/header-32.md`
- `.devbooster/hub/ux-references/header-sections/header-33.md`
- `.devbooster/hub/ux-references/header-sections/header-34.md`
- `.devbooster/hub/ux-references/header-sections/header-35.md`
- `.devbooster/hub/ux-references/header-sections/header-36.md`
- `.devbooster/hub/ux-references/header-sections/header-37.md`
- `.devbooster/hub/ux-references/header-sections/header-38.md`
- `.devbooster/hub/ux-references/header-sections/header-39.md`
- `.devbooster/hub/ux-references/header-sections/header-40.md`
- `.devbooster/hub/ux-references/header-sections/header-41.md`
- `.devbooster/hub/ux-references/header-sections/header-42.md`
- `.devbooster/hub/ux-references/header-sections/header-43.md`
- `.devbooster/hub/ux-references/header-sections/header-44.md`
- `.devbooster/hub/ux-references/header-sections/header-45.md`
- `.devbooster/hub/ux-references/header-sections/header-46.md`
- `.devbooster/hub/ux-references/header-sections/header-47.md`
- `.devbooster/hub/ux-references/header-sections/header-48.md`
- `.devbooster/hub/ux-references/header-sections/header-49.md`
- `.devbooster/hub/ux-references/header-sections/header-50.md`
- `.devbooster/hub/ux-references/header-sections/header-51.md`
- `.devbooster/hub/ux-references/header-sections/header-52.md`
- `.devbooster/hub/ux-references/header-sections/header-53.md`
- `.devbooster/hub/ux-references/header-sections/header-54.md`
- `.devbooster/hub/ux-references/header-sections/header-55.md`
- `.devbooster/hub/ux-references/header-sections/header-56.md`
- `.devbooster/hub/ux-references/header-sections/header-57.md`
- `.devbooster/hub/ux-references/header-sections/header-58.md`
- `.devbooster/hub/ux-references/header-sections/header-59.md`
- `.devbooster/hub/ux-references/header-sections/header-60.md`
- `.devbooster/hub/ux-references/header-sections/header-61.md`
- `.devbooster/hub/ux-references/header-sections/header-62.md`
- `.devbooster/hub/ux-references/header-sections/header-63.md`
- `.devbooster/hub/ux-references/header-sections/header-64.md`
- `.devbooster/hub/ux-references/header-sections/header-65.md`
- `.devbooster/hub/ux-references/header-sections/header-66.md`
- `.devbooster/hub/ux-references/header-sections/header-67.md`
- `.devbooster/hub/ux-references/header-sections/header-68.md`
- `.devbooster/hub/ux-references/header-sections/header-69.md`
- `.devbooster/hub/ux-references/header-sections/header-70.md`
- `.devbooster/hub/ux-references/header-sections/header-71.md`
- `.devbooster/hub/ux-references/header-sections/header-72.md`
- `.devbooster/hub/ux-references/header-sections/header-73.md`
- `.devbooster/hub/ux-references/header-sections/header-74.md`
- `.devbooster/hub/ux-references/informational-pages/informational-01.md`
- `.devbooster/hub/ux-references/informational-pages/informational-02.md`
- `.devbooster/hub/ux-references/informational-pages/informational-03.md`
- `.devbooster/hub/ux-references/informational-pages/informational-04.md`
- `.devbooster/hub/ux-references/informational-pages/informational-05.md`
- `.devbooster/hub/ux-references/informational-pages/informational-06.md`
- `.devbooster/hub/ux-references/informational-pages/informational-07.md`
- `.devbooster/hub/ux-references/informational-pages/informational-08.md`
- `.devbooster/hub/ux-references/informational-pages/informational-09.md`
- `.devbooster/hub/ux-references/informational-pages/informational-10.md`
- `.devbooster/hub/ux-references/informational-pages/informational-11.md`
- `.devbooster/hub/ux-references/informational-pages/informational-12.md`
- `.devbooster/hub/ux-references/informational-pages/informational-13.md`
- `.devbooster/hub/ux-references/informational-pages/informational-14.md`
- `.devbooster/hub/ux-references/informational-pages/informational-15.md`
- `.devbooster/hub/ux-references/informational-pages/informational-16.md`
- `.devbooster/hub/ux-references/informational-pages/informational-17.md`
- `.devbooster/hub/ux-references/informational-pages/informational-18.md`
- `.devbooster/hub/ux-references/informational-pages/informational-19.md`
- `.devbooster/hub/ux-references/informational-pages/informational-20.md`
- `.devbooster/hub/ux-references/landing-pages/landing-01.md`
- `.devbooster/hub/ux-references/landing-pages/landing-02.md`
- `.devbooster/hub/ux-references/landing-pages/landing-03.md`
- `.devbooster/hub/ux-references/landing-pages/landing-04.md`
- `.devbooster/hub/ux-references/landing-pages/landing-05.md`
- `.devbooster/hub/ux-references/landing-pages/landing-06.md`
- `.devbooster/hub/ux-references/landing-pages/landing-07.md`
- `.devbooster/hub/ux-references/landing-pages/landing-08.md`
- `.devbooster/hub/ux-references/landing-pages/landing-09.md`
- `.devbooster/hub/ux-references/landing-pages/landing-10.md`
- `.devbooster/hub/ux-references/landing-pages/landing-11.md`
- `.devbooster/hub/ux-references/landing-pages/landing-12.md`
- `.devbooster/hub/ux-references/landing-pages/landing-13.md`
- `.devbooster/hub/ux-references/landing-pages/landing-14.md`
- `.devbooster/hub/ux-references/landing-pages/landing-15.md`
- `.devbooster/hub/ux-references/landing-pages/landing-16.md`
- `.devbooster/hub/ux-references/landing-pages/landing-17.md`
- `.devbooster/hub/ux-references/landing-pages/landing-18.md`
- `.devbooster/hub/ux-references/landing-pages/landing-19.md`
- `.devbooster/hub/ux-references/landing-pages/landing-20.md`
- `.devbooster/hub/ux-references/payments/payment-01.md`
- `.devbooster/hub/ux-references/payments/payment-02.md`
- `.devbooster/hub/ux-references/payments/payment-03.md`
- `.devbooster/hub/ux-references/payments/payment-04.md`
- `.devbooster/hub/ux-references/payments/payment-05.md`
- `.devbooster/hub/ux-references/payments/payment-06.md`
- `.devbooster/hub/ux-references/payments/payment-07.md`
- `.devbooster/hub/ux-references/payments/payment-08.md`
- `.devbooster/hub/ux-references/payments/payment-09.md`
- `.devbooster/hub/ux-references/payments/payment-10.md`
- `.devbooster/hub/ux-references/pricing/pricing-01.md`
- `.devbooster/hub/ux-references/pricing/pricing-02.md`
- `.devbooster/hub/ux-references/pricing/pricing-03.md`
- `.devbooster/hub/ux-references/pricing/pricing-04.md`
- `.devbooster/hub/ux-references/pricing/pricing-05.md`
- `.devbooster/hub/ux-references/pricing/pricing-06.md`
- `.devbooster/hub/ux-references/pricing/pricing-07.md`
- `.devbooster/hub/ux-references/pricing/pricing-08.md`
- `.devbooster/hub/ux-references/pricing/pricing-09.md`
- `.devbooster/hub/ux-references/pricing/pricing-10.md`
- `.devbooster/hub/ux-references/profile/profile-dashboard-19.md`
- `.devbooster/hub/ux-references/profile/profile-informational-17.md`
- `.devbooster/hub/ux-references/profile/profile-informational-18.md`
- `.devbooster/hub/ux-references/profile/profile-settings-01.md`
- `.devbooster/hub/ux-references/profile/profile-settings-02.md`
- `.devbooster/hub/ux-references/profile/profile-settings-03.md`
- `.devbooster/hub/ux-references/settings/settings-01.md`
- `.devbooster/hub/ux-references/settings/settings-02.md`
- `.devbooster/hub/ux-references/settings/settings-03.md`
- `.devbooster/hub/ux-references/settings/settings-04.md`
- `.devbooster/hub/ux-references/settings/settings-05.md`
- `.devbooster/hub/ux-references/settings/settings-06.md`
- `.devbooster/hub/ux-references/settings/settings-07.md`
- `.devbooster/hub/ux-references/settings/settings-08.md`
- `.devbooster/hub/ux-references/settings/settings-09.md`
- `.devbooster/hub/ux-references/settings/settings-10.md`
- `.devbooster/hub/ux-references/settings/settings-11.md`
- `.devbooster/hub/ux-references/settings/settings-12.md`
- `.devbooster/hub/ux-references/settings/settings-13.md`
- `.devbooster/hub/ux-references/settings/settings-14.md`
- `.devbooster/hub/ux-references/settings/settings-15.md`
- `.devbooster/hub/ux-references/settings/settings-16.md`
- `.devbooster/hub/ux-references/settings/settings-17.md`
- `.devbooster/hub/ux-references/settings/settings-18.md`
- `.devbooster/hub/ux-references/settings/settings-19.md`
- `.devbooster/hub/ux-references/settings/settings-20.md`
- `.devbooster/hub/ux-references/settings/settings-21.md`
- `.devbooster/hub/ux-references/sign-in/login-01.md`
- `.devbooster/hub/ux-references/sign-in/login-02.md`
- `.devbooster/hub/ux-references/sign-in/login-03.md`
- `.devbooster/hub/ux-references/sign-in/login-04.md`
- `.devbooster/hub/ux-references/sign-in/login-05.md`
- `.devbooster/hub/ux-references/sign-in/login-06.md`
- `.devbooster/hub/ux-references/sign-in/login-07.md`
- `.devbooster/hub/ux-references/sign-in/login-08.md`
- `.devbooster/hub/ux-references/sign-in/login-09.md`
- `.devbooster/hub/ux-references/sign-in/login-10.md`
- `.devbooster/hub/ux-references/sign-in/login-11.md`
- `.devbooster/hub/ux-references/sign-in/login-12.md`
- `.devbooster/hub/ux-references/sign-in/login-13.md`
- `.devbooster/hub/ux-references/sign-in/login-14.md`
- `.devbooster/hub/ux-references/sign-in/login-15.md`
- `.devbooster/hub/ux-references/sign-in/login-16.md`
- `.devbooster/hub/ux-references/sign-up/signup-01.md`
- `.devbooster/hub/ux-references/sign-up/signup-02.md`
- `.devbooster/hub/ux-references/sign-up/signup-03.md`
- `.devbooster/hub/ux-references/sign-up/signup-04.md`
- `.devbooster/hub/ux-references/sign-up/signup-05.md`
- `.devbooster/hub/ux-references/sign-up/signup-06.md`
- `.devbooster/hub/ux-references/sign-up/signup-07.md`
- `.devbooster/hub/ux-references/sign-up/signup-08.md`
- `.devbooster/hub/ux-references/sign-up/signup-09.md`
- `.devbooster/hub/ux-references/sign-up/signup-10.md`
- `.devbooster/hub/ux-references/sign-up/signup-11.md`
- `.devbooster/hub/ux-references/sign-up/signup-12.md`
- `.devbooster/hub/ux-references/sign-up/signup-13.md`
- `.devbooster/hub/ux-references/sign-up/signup-14.md`
- `.devbooster/hub/ux-references/sign-up/signup-15.md`
- `.devbooster/hub/ux-references/sign-up/signup-16.md`
- `.devbooster/hub/ux-references/sign-up/signup-17.md`
- `.devbooster/hub/ux-references/sign-up/signup-18.md`
- `.devbooster/hub/ux-references/sign-up/signup-19.md`
- `.devbooster/hub/ux-references/sign-up/signup-20.md`
- `.devbooster/hub/ux-references/sign-up/signup-21.md`
- `.devbooster/hub/ux-references/verification/verification-01.md`
- `.devbooster/hub/ux-references/verification/verification-02.md`
- `.devbooster/hub/ux-references/verification/verification-03.md`
- `REFERENCE_PROMPT.md`
- `template/.devbooster/boosters/ci-cd.md`
- `template/.devbooster/boosters/interview.md`
- `template/.devbooster/boosters/observability.md`
- `template/.devbooster/boosters/pilot.md`
- `template/.devbooster/boosters/refine.md`
- `template/.devbooster/hub/knowledge/react-web-workers.md`
- `template/.devbooster/hub/knowledge/timing-patterns.md`
- `template/.devbooster/hub/skills/ci-cd-patterns/`
- `template/.devbooster/hub/skills/design-hardening/`
- `template/.devbooster/hub/skills/design-refinement/`
- `template/.devbooster/hub/skills/frontend-design/ai-tells.md`
- `template/.devbooster/hub/skills/observability-patterns/`
- `template/.devbooster/hub/ux-references/404/404-01.md`
- `template/.devbooster/hub/ux-references/404/404-02.md`
- `template/.devbooster/hub/ux-references/404/404-03.md`
- `template/.devbooster/hub/ux-references/404/404-04.md`
- `template/.devbooster/hub/ux-references/404/404-05.md`
- `template/.devbooster/hub/ux-references/404/404-06.md`
- `template/.devbooster/hub/ux-references/404/404-07.md`
- `template/.devbooster/hub/ux-references/404/404-08.md`
- `template/.devbooster/hub/ux-references/404/404-09.md`
- `template/.devbooster/hub/ux-references/404/404-10.md`
- `template/.devbooster/hub/ux-references/404/404-11.md`
- `template/.devbooster/hub/ux-references/404/404-12.md`
- `template/.devbooster/hub/ux-references/404/404-13.md`
- `template/.devbooster/hub/ux-references/404/404-14.md`
- `template/.devbooster/hub/ux-references/contact/contact-01.md`
- `template/.devbooster/hub/ux-references/contact/contact-02.md`
- `template/.devbooster/hub/ux-references/contact/contact-03.md`
- `template/.devbooster/hub/ux-references/contact/contact-04.md`
- `template/.devbooster/hub/ux-references/contact/contact-05.md`
- `template/.devbooster/hub/ux-references/contact/contact-06.md`
- `template/.devbooster/hub/ux-references/contact/contact-07.md`
- `template/.devbooster/hub/ux-references/contact/contact-08.md`
- `template/.devbooster/hub/ux-references/contact/contact-09.md`
- `template/.devbooster/hub/ux-references/contact/contact-10.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-01.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-02.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-03.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-04.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-05.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-06.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-07.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-08.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-09.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-10.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-11.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-12.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-13.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-14.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-15.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-16.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-17.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-18.md`
- `template/.devbooster/hub/ux-references/dashboards/dashboard-19.md`
- `template/.devbooster/hub/ux-references/email-templates/email-01.md`
- `template/.devbooster/hub/ux-references/email-templates/email-02.md`
- `template/.devbooster/hub/ux-references/email-templates/email-03.md`
- `template/.devbooster/hub/ux-references/email-templates/email-04.md`
- `template/.devbooster/hub/ux-references/email-templates/email-05.md`
- `template/.devbooster/hub/ux-references/email-templates/email-06.md`
- `template/.devbooster/hub/ux-references/email-templates/email-07.md`
- `template/.devbooster/hub/ux-references/email-templates/email-08.md`
- `template/.devbooster/hub/ux-references/email-templates/email-09.md`
- `template/.devbooster/hub/ux-references/email-templates/email-10.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-01.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-02.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-03.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-04.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-05.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-06.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-07.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-08.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-09.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-10.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-11.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-12.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-13.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-14.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-15.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-16.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-17.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-18.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-19.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-20.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-21.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-22.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-23.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-24.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-25.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-26.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-27.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-28.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-29.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-30.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-31.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-32.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-33.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-34.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-35.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-36.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-37.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-38.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-39.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-40.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-41.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-42.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-43.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-44.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-45.md`
- `template/.devbooster/hub/ux-references/feature-sections/feature-46.md`
- `template/.devbooster/hub/ux-references/footer/footer-01.md`
- `template/.devbooster/hub/ux-references/footer/footer-02.md`
- `template/.devbooster/hub/ux-references/footer/footer-03.md`
- `template/.devbooster/hub/ux-references/footer/footer-04.md`
- `template/.devbooster/hub/ux-references/footer/footer-05.md`
- `template/.devbooster/hub/ux-references/footer/footer-06.md`
- `template/.devbooster/hub/ux-references/footer/footer-07.md`
- `template/.devbooster/hub/ux-references/footer/footer-08.md`
- `template/.devbooster/hub/ux-references/footer/footer-09.md`
- `template/.devbooster/hub/ux-references/footer/footer-10.md`
- `template/.devbooster/hub/ux-references/footer/footer-11.md`
- `template/.devbooster/hub/ux-references/footer/footer-12.md`
- `template/.devbooster/hub/ux-references/footer/footer-13.md`
- `template/.devbooster/hub/ux-references/footer/footer-14.md`
- `template/.devbooster/hub/ux-references/footer/footer-15.md`
- `template/.devbooster/hub/ux-references/footer/footer-16.md`
- `template/.devbooster/hub/ux-references/footer/footer-17.md`
- `template/.devbooster/hub/ux-references/footer/footer-18.md`
- `template/.devbooster/hub/ux-references/footer/footer-19.md`
- `template/.devbooster/hub/ux-references/footer/footer-20.md`
- `template/.devbooster/hub/ux-references/footer/footer-21.md`
- `template/.devbooster/hub/ux-references/footer/footer-22.md`
- `template/.devbooster/hub/ux-references/footer/footer-23.md`
- `template/.devbooster/hub/ux-references/footer/footer-24.md`
- `template/.devbooster/hub/ux-references/footer/footer-25.md`
- `template/.devbooster/hub/ux-references/footer/footer-26.md`
- `template/.devbooster/hub/ux-references/footer/footer-27.md`
- `template/.devbooster/hub/ux-references/footer/footer-28.md`
- `template/.devbooster/hub/ux-references/footer/footer-29.md`
- `template/.devbooster/hub/ux-references/footer/footer-30.md`
- `template/.devbooster/hub/ux-references/footer/footer-31.md`
- `template/.devbooster/hub/ux-references/footer/footer-32.md`
- `template/.devbooster/hub/ux-references/footer/footer-33.md`
- `template/.devbooster/hub/ux-references/footer/footer-34.md`
- `template/.devbooster/hub/ux-references/footer/footer-35.md`
- `template/.devbooster/hub/ux-references/footer/footer-36.md`
- `template/.devbooster/hub/ux-references/footer/footer-37.md`
- `template/.devbooster/hub/ux-references/footer/footer-38.md`
- `template/.devbooster/hub/ux-references/footer/footer-39.md`
- `template/.devbooster/hub/ux-references/footer/footer-40.md`
- `template/.devbooster/hub/ux-references/forgot-password/forgot-password-01.md`
- `template/.devbooster/hub/ux-references/forgot-password/forgot-password-02.md`
- `template/.devbooster/hub/ux-references/forgot-password/forgot-password-03.md`
- `template/.devbooster/hub/ux-references/forgot-password/forgot-password-04.md`
- `template/.devbooster/hub/ux-references/header-sections/header-01.md`
- `template/.devbooster/hub/ux-references/header-sections/header-02.md`
- `template/.devbooster/hub/ux-references/header-sections/header-03.md`
- `template/.devbooster/hub/ux-references/header-sections/header-04.md`
- `template/.devbooster/hub/ux-references/header-sections/header-05.md`
- `template/.devbooster/hub/ux-references/header-sections/header-06.md`
- `template/.devbooster/hub/ux-references/header-sections/header-07.md`
- `template/.devbooster/hub/ux-references/header-sections/header-08.md`
- `template/.devbooster/hub/ux-references/header-sections/header-09.md`
- `template/.devbooster/hub/ux-references/header-sections/header-10.md`
- `template/.devbooster/hub/ux-references/header-sections/header-11.md`
- `template/.devbooster/hub/ux-references/header-sections/header-12.md`
- `template/.devbooster/hub/ux-references/header-sections/header-13.md`
- `template/.devbooster/hub/ux-references/header-sections/header-14.md`
- `template/.devbooster/hub/ux-references/header-sections/header-15.md`
- `template/.devbooster/hub/ux-references/header-sections/header-16.md`
- `template/.devbooster/hub/ux-references/header-sections/header-17.md`
- `template/.devbooster/hub/ux-references/header-sections/header-18.md`
- `template/.devbooster/hub/ux-references/header-sections/header-19.md`
- `template/.devbooster/hub/ux-references/header-sections/header-20.md`
- `template/.devbooster/hub/ux-references/header-sections/header-21.md`
- `template/.devbooster/hub/ux-references/header-sections/header-22.md`
- `template/.devbooster/hub/ux-references/header-sections/header-23.md`
- `template/.devbooster/hub/ux-references/header-sections/header-24.md`
- `template/.devbooster/hub/ux-references/header-sections/header-25.md`
- `template/.devbooster/hub/ux-references/header-sections/header-26.md`
- `template/.devbooster/hub/ux-references/header-sections/header-27.md`
- `template/.devbooster/hub/ux-references/header-sections/header-28.md`
- `template/.devbooster/hub/ux-references/header-sections/header-29.md`
- `template/.devbooster/hub/ux-references/header-sections/header-30.md`
- `template/.devbooster/hub/ux-references/header-sections/header-31.md`
- `template/.devbooster/hub/ux-references/header-sections/header-32.md`
- `template/.devbooster/hub/ux-references/header-sections/header-33.md`
- `template/.devbooster/hub/ux-references/header-sections/header-34.md`
- `template/.devbooster/hub/ux-references/header-sections/header-35.md`
- `template/.devbooster/hub/ux-references/header-sections/header-36.md`
- `template/.devbooster/hub/ux-references/header-sections/header-37.md`
- `template/.devbooster/hub/ux-references/header-sections/header-38.md`
- `template/.devbooster/hub/ux-references/header-sections/header-39.md`
- `template/.devbooster/hub/ux-references/header-sections/header-40.md`
- `template/.devbooster/hub/ux-references/header-sections/header-41.md`
- `template/.devbooster/hub/ux-references/header-sections/header-42.md`
- `template/.devbooster/hub/ux-references/header-sections/header-43.md`
- `template/.devbooster/hub/ux-references/header-sections/header-44.md`
- `template/.devbooster/hub/ux-references/header-sections/header-45.md`
- `template/.devbooster/hub/ux-references/header-sections/header-46.md`
- `template/.devbooster/hub/ux-references/header-sections/header-47.md`
- `template/.devbooster/hub/ux-references/header-sections/header-48.md`
- `template/.devbooster/hub/ux-references/header-sections/header-49.md`
- `template/.devbooster/hub/ux-references/header-sections/header-50.md`
- `template/.devbooster/hub/ux-references/header-sections/header-51.md`
- `template/.devbooster/hub/ux-references/header-sections/header-52.md`
- `template/.devbooster/hub/ux-references/header-sections/header-53.md`
- `template/.devbooster/hub/ux-references/header-sections/header-54.md`
- `template/.devbooster/hub/ux-references/header-sections/header-55.md`
- `template/.devbooster/hub/ux-references/header-sections/header-56.md`
- `template/.devbooster/hub/ux-references/header-sections/header-57.md`
- `template/.devbooster/hub/ux-references/header-sections/header-58.md`
- `template/.devbooster/hub/ux-references/header-sections/header-59.md`
- `template/.devbooster/hub/ux-references/header-sections/header-60.md`
- `template/.devbooster/hub/ux-references/header-sections/header-61.md`
- `template/.devbooster/hub/ux-references/header-sections/header-62.md`
- `template/.devbooster/hub/ux-references/header-sections/header-63.md`
- `template/.devbooster/hub/ux-references/header-sections/header-64.md`
- `template/.devbooster/hub/ux-references/header-sections/header-65.md`
- `template/.devbooster/hub/ux-references/header-sections/header-66.md`
- `template/.devbooster/hub/ux-references/header-sections/header-67.md`
- `template/.devbooster/hub/ux-references/header-sections/header-68.md`
- `template/.devbooster/hub/ux-references/header-sections/header-69.md`
- `template/.devbooster/hub/ux-references/header-sections/header-70.md`
- `template/.devbooster/hub/ux-references/header-sections/header-71.md`
- `template/.devbooster/hub/ux-references/header-sections/header-72.md`
- `template/.devbooster/hub/ux-references/header-sections/header-73.md`
- `template/.devbooster/hub/ux-references/header-sections/header-74.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-01.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-02.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-03.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-04.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-05.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-06.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-07.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-08.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-09.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-10.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-11.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-12.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-13.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-14.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-15.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-16.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-17.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-18.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-19.md`
- `template/.devbooster/hub/ux-references/informational-pages/informational-20.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-01.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-02.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-03.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-04.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-05.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-06.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-07.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-08.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-09.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-10.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-11.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-12.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-13.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-14.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-15.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-16.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-17.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-18.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-19.md`
- `template/.devbooster/hub/ux-references/landing-pages/landing-20.md`
- `template/.devbooster/hub/ux-references/payments/payment-01.md`
- `template/.devbooster/hub/ux-references/payments/payment-02.md`
- `template/.devbooster/hub/ux-references/payments/payment-03.md`
- `template/.devbooster/hub/ux-references/payments/payment-04.md`
- `template/.devbooster/hub/ux-references/payments/payment-05.md`
- `template/.devbooster/hub/ux-references/payments/payment-06.md`
- `template/.devbooster/hub/ux-references/payments/payment-07.md`
- `template/.devbooster/hub/ux-references/payments/payment-08.md`
- `template/.devbooster/hub/ux-references/payments/payment-09.md`
- `template/.devbooster/hub/ux-references/payments/payment-10.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-01.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-02.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-03.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-04.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-05.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-06.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-07.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-08.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-09.md`
- `template/.devbooster/hub/ux-references/pricing/pricing-10.md`
- `template/.devbooster/hub/ux-references/profile/profile-dashboard-19.md`
- `template/.devbooster/hub/ux-references/profile/profile-informational-17.md`
- `template/.devbooster/hub/ux-references/profile/profile-informational-18.md`
- `template/.devbooster/hub/ux-references/profile/profile-settings-01.md`
- `template/.devbooster/hub/ux-references/profile/profile-settings-02.md`
- `template/.devbooster/hub/ux-references/profile/profile-settings-03.md`
- `template/.devbooster/hub/ux-references/settings/settings-01.md`
- `template/.devbooster/hub/ux-references/settings/settings-02.md`
- `template/.devbooster/hub/ux-references/settings/settings-03.md`
- `template/.devbooster/hub/ux-references/settings/settings-04.md`
- `template/.devbooster/hub/ux-references/settings/settings-05.md`
- `template/.devbooster/hub/ux-references/settings/settings-06.md`
- `template/.devbooster/hub/ux-references/settings/settings-07.md`
- `template/.devbooster/hub/ux-references/settings/settings-08.md`
- `template/.devbooster/hub/ux-references/settings/settings-09.md`
- `template/.devbooster/hub/ux-references/settings/settings-10.md`
- `template/.devbooster/hub/ux-references/settings/settings-11.md`
- `template/.devbooster/hub/ux-references/settings/settings-12.md`
- `template/.devbooster/hub/ux-references/settings/settings-13.md`
- `template/.devbooster/hub/ux-references/settings/settings-14.md`
- `template/.devbooster/hub/ux-references/settings/settings-15.md`
- `template/.devbooster/hub/ux-references/settings/settings-16.md`
- `template/.devbooster/hub/ux-references/settings/settings-17.md`
- `template/.devbooster/hub/ux-references/settings/settings-18.md`
- `template/.devbooster/hub/ux-references/settings/settings-19.md`
- `template/.devbooster/hub/ux-references/settings/settings-20.md`
- `template/.devbooster/hub/ux-references/settings/settings-21.md`
- `template/.devbooster/hub/ux-references/sign-in/login-01.md`
- `template/.devbooster/hub/ux-references/sign-in/login-02.md`
- `template/.devbooster/hub/ux-references/sign-in/login-03.md`
- `template/.devbooster/hub/ux-references/sign-in/login-04.md`
- `template/.devbooster/hub/ux-references/sign-in/login-05.md`
- `template/.devbooster/hub/ux-references/sign-in/login-06.md`
- `template/.devbooster/hub/ux-references/sign-in/login-07.md`
- `template/.devbooster/hub/ux-references/sign-in/login-08.md`
- `template/.devbooster/hub/ux-references/sign-in/login-09.md`
- `template/.devbooster/hub/ux-references/sign-in/login-10.md`
- `template/.devbooster/hub/ux-references/sign-in/login-11.md`
- `template/.devbooster/hub/ux-references/sign-in/login-12.md`
- `template/.devbooster/hub/ux-references/sign-in/login-13.md`
- `template/.devbooster/hub/ux-references/sign-in/login-14.md`
- `template/.devbooster/hub/ux-references/sign-in/login-15.md`
- `template/.devbooster/hub/ux-references/sign-in/login-16.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-01.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-02.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-03.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-04.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-05.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-06.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-07.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-08.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-09.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-10.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-11.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-12.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-13.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-14.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-15.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-16.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-17.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-18.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-19.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-20.md`
- `template/.devbooster/hub/ux-references/sign-up/signup-21.md`
- `template/.devbooster/hub/ux-references/verification/verification-01.md`
- `template/.devbooster/hub/ux-references/verification/verification-02.md`
- `template/.devbooster/hub/ux-references/verification/verification-03.md`

---

## 10/08/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 49
Linhas adicionadas: +2.132
Linhas removidas: -10

### feature: add motion booster and parallel-agents orchestration skill

Resumo técnico: Adicionado o booster Motion, especialista em animação aditiva de telas finalizadas (entrance, hover, scroll reveal e motion de fundo) com zero alteração estrutural, discovery com veto de biblioteca, validação via sub-agente e artefato único de memória. Adicionada a skill Parallel Agents, fonte única para orquestração de sub-agentes com cinco padrões de dispatch (battery, council, single delegate, artifact offload e final verification), pacote de ativação em duas linhas e invariantes de escopo. Todos os boosters passaram a declarar a política SUB-AGENT POLICY — parallel-agents; Auto Triage, Smart Task e Design Engineer passaram a rotear tarefas de animação aditiva para `motion`; manifesto, gatilho `@Motion`, guia, README e template sincronizados.

### Adicionado

- Booster `motion.md` na raiz e no template — especialista em animação aditiva com estágios Armed/Discovery/Implementation, veto de biblioteca, respeito a `prefers-reduced-motion` e artefato único em `@booster-generated/motion/`.
- Skill `parallel-agents` (`hub/skills/parallel-agents/SKILL.md` e persona `skill_parallel-agents.md`, raiz e template) — cinco padrões de dispatch, contrato de retorno, invariantes e ativação em duas linhas.
- Trigger `@Motion` no TRIGGERS.md, registro no MANIFEST.md, entrada no GUIDE.md e contagem de boosters no README (45 → 46).

### Alterado

- Todos os boosters existentes passaram a declarar a seção SUB-AGENT POLICY — parallel-agents com tipos, personas e restrições de dispatch.
- Auto Triage e Smart Task roteiam para `motion` quando a tarefa é animação aditiva de uma tela finalizada com zero mudança estrutural.
- Design Engineer delega para `motion.md` pedidos de animação aditiva e não expande o escopo.
- Template `.devbooster/` sincronizado com as mesmas capacidades do workspace.

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/boosters/auto-triage.md`
- `.devbooster/boosters/builder.md`
- `.devbooster/boosters/changelog.md`
- `.devbooster/boosters/coder.md`
- `.devbooster/boosters/commit.md`
- `.devbooster/boosters/create.md`
- `.devbooster/boosters/design-engineer.md`
- `.devbooster/boosters/enhance.md`
- `.devbooster/boosters/forger.md`
- `.devbooster/boosters/global-documentation.md`
- `.devbooster/boosters/implementation.md`
- `.devbooster/boosters/intel.md`
- `.devbooster/boosters/internal-documentation.md`
- `.devbooster/boosters/motion.md`
- `.devbooster/boosters/obsidian.md`
- `.devbooster/boosters/planning.md`
- `.devbooster/boosters/review.md`
- `.devbooster/boosters/save-context.md`
- `.devbooster/boosters/smart-task.md`
- `.devbooster/hub/personas/skill_parallel-agents.md`
- `.devbooster/hub/skills/parallel-agents/SKILL.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/TRIGGERS.md`
- `README.md`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/auto-triage.md`
- `template/.devbooster/boosters/builder.md`
- `template/.devbooster/boosters/changelog.md`
- `template/.devbooster/boosters/coder.md`
- `template/.devbooster/boosters/commit.md`
- `template/.devbooster/boosters/create.md`
- `template/.devbooster/boosters/design-engineer.md`
- `template/.devbooster/boosters/enhance.md`
- `template/.devbooster/boosters/forger.md`
- `template/.devbooster/boosters/global-documentation.md`
- `template/.devbooster/boosters/implementation.md`
- `template/.devbooster/boosters/intel.md`
- `template/.devbooster/boosters/internal-documentation.md`
- `template/.devbooster/boosters/motion.md`
- `template/.devbooster/boosters/obsidian.md`
- `template/.devbooster/boosters/planning.md`
- `template/.devbooster/boosters/review.md`
- `template/.devbooster/boosters/save-context.md`
- `template/.devbooster/boosters/smart-task.md`
- `template/.devbooster/hub/personas/skill_parallel-agents.md`
- `template/.devbooster/hub/skills/parallel-agents/SKILL.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/TRIGGERS.md`

---

## 08/08/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 154
Linhas adicionadas: +3.718
Linhas removidas: -335

### feature: add design engineer roadmap and lazy booster routing

Resumo técnico: Adicionado o booster Design Engineer com roadmap técnico indexado para referências, componentes, motion, utilities, prototipação, 3D, pesquisa e outras soluções de design engineering. Incluídas skills de composição, motion, utilities e validação visual; configurada consulta lazy pelo índice nos boosters relevantes; registrados os encaminhamentos condicionais no Auto Triage e Smart Task; atualizados manifesto, guia, README e metadados do pacote, juntamente com o conteúdo correspondente no template presente no worktree.

### Adicionado

- Booster `design-engineer.md`.
- Roadmap técnico indexado em `.devbooster/hub/roadmap/`.
- Skills de `component-composition`, `design-engineering-utilities`, `motion-design` e `visual-validation`.
- Referências de `21st.dev` e `NumberFlow` no roadmap de componentes.

### Alterado

- Boosters relevantes com consulta lazy: primeiro `INDEX.md`, depois somente a categoria/entrada correspondente.
- Auto Triage e Smart Task com seleção condicional do Design Engineer para descoberta de soluções visuais e frontend.
- Manifesto, Guide, README, regras, metadados e conteúdo dos boosters atualizados.
- Conteúdo correspondente do template atualizado conforme o estado atual do worktree.

### Arquivos modificados

- `.devbooster/boosters/accessibility.md`
- `.devbooster/boosters/advisor.md`
- `.devbooster/boosters/architecture-audit.md`
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
- `.devbooster/boosters/design-engineer.md`
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
- `.devbooster/hub/roadmap/INDEX.md`
- `.devbooster/hub/roadmap/README.md`
- `.devbooster/hub/roadmap/audio.md`
- `.devbooster/hub/roadmap/components.md`
- `.devbooster/hub/roadmap/digital-fashion.md`
- `.devbooster/hub/roadmap/emoji.md`
- `.devbooster/hub/roadmap/fonts.md`
- `.devbooster/hub/roadmap/gltf.md`
- `.devbooster/hub/roadmap/inspiration.md`
- `.devbooster/hub/roadmap/interface.md`
- `.devbooster/hub/roadmap/motion.md`
- `.devbooster/hub/roadmap/organization.md`
- `.devbooster/hub/roadmap/research.md`
- `.devbooster/hub/roadmap/three-d.md`
- `.devbooster/hub/roadmap/video-capture.md`
- `.devbooster/hub/roadmap/volumetric.md`
- `.devbooster/hub/roadmap/web-utilities.md`
- `.devbooster/hub/roadmap/whiteboard.md`
- `.devbooster/hub/skills/component-composition/README.md`
- `.devbooster/hub/skills/design-engineering-utilities/README.md`
- `.devbooster/hub/skills/design-engineering-utilities/color.md`
- `.devbooster/hub/skills/design-engineering-utilities/developer-tools.md`
- `.devbooster/hub/skills/design-engineering-utilities/gradients.md`
- `.devbooster/hub/skills/design-engineering-utilities/motion.md`
- `.devbooster/hub/skills/design-engineering-utilities/svg.md`
- `.devbooster/hub/skills/motion-design/README.md`
- `.devbooster/hub/skills/visual-validation/README.md`
- `.devbooster/MANIFEST.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/PROTOCOL.md`
- `.devbooster/rules/TRIGGERS.md`
- `README.md`
- `package.json`
- `template/.devbooster/boosters/accessibility.md`
- `template/.devbooster/boosters/advisor.md`
- `template/.devbooster/boosters/architecture-audit.md`
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
- `template/.devbooster/boosters/design-engineer.md`
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
- `template/.devbooster/hub/roadmap/INDEX.md`
- `template/.devbooster/hub/roadmap/README.md`
- `template/.devbooster/hub/roadmap/audio.md`
- `template/.devbooster/hub/roadmap/components.md`
- `template/.devbooster/hub/roadmap/digital-fashion.md`
- `template/.devbooster/hub/roadmap/emoji.md`
- `template/.devbooster/hub/roadmap/fonts.md`
- `template/.devbooster/hub/roadmap/gltf.md`
- `template/.devbooster/hub/roadmap/inspiration.md`
- `template/.devbooster/hub/roadmap/interface.md`
- `template/.devbooster/hub/roadmap/motion.md`
- `template/.devbooster/hub/roadmap/organization.md`
- `template/.devbooster/hub/roadmap/research.md`
- `template/.devbooster/hub/roadmap/three-d.md`
- `template/.devbooster/hub/roadmap/video-capture.md`
- `template/.devbooster/hub/roadmap/volumetric.md`
- `template/.devbooster/hub/roadmap/web-utilities.md`
- `template/.devbooster/hub/roadmap/whiteboard.md`
- `template/.devbooster/hub/skills/component-composition/README.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/README.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/color.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/developer-tools.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/gradients.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/motion.md`
- `template/.devbooster/hub/skills/design-engineering-utilities/svg.md`
- `template/.devbooster/hub/skills/motion-design/README.md`
- `template/.devbooster/hub/skills/visual-validation/README.md`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/PROTOCOL.md`
- `template/.devbooster/rules/TRIGGERS.md`

---

## 04/08/2026

Autor: MaikonRodrigss
Branch de origem: `main`
Arquivos modificados: 24
Linhas adicionadas: +1.045
Linhas removidas: -93

### feature: add architecture audit booster and knowledge base

Resumo técnico: Adicionado o Architecture Audit com fluxo de preparação, varredura global, classificação por lotes, rastreabilidade de decisões e preservação das convenções do projeto. Incluídos seis artigos de conhecimento para duplicação, limites de módulos, nomenclatura, organização estrutural e contratos; atualizados manifestos, gatilhos, guia, README, versão do pacote e o template distribuído para manter a capacidade sincronizada.

### Adicionado

- Booster `architecture-audit.md` na raiz e no template.
- Artigos de conhecimento sobre princípios de auditoria arquitetural, duplicação de código, limites e dependências de módulos, nomenclatura e responsabilidades, estrutura de projetos e organização de tipos e contratos, na raiz e no template.

### Alterado

- Manifestos, guia de boosters, gatilhos e índice da base de conhecimento para registrar o novo Architecture Audit.
- README atualizado de 43 para 44 boosters e versão do pacote atualizada para `1.19.2`.
- Template `.devbooster/` sincronizado com as novas capacidades.

### Arquivos modificados

- `.devbooster/MANIFEST.md`
- `.devbooster/boosters/architecture-audit.md`
- `.devbooster/hub/knowledge/architecture-audit-principles.md`
- `.devbooster/hub/knowledge/code-duplication-patterns.md`
- `.devbooster/hub/knowledge/index.md`
- `.devbooster/hub/knowledge/module-boundaries-dependencies.md`
- `.devbooster/hub/knowledge/naming-responsibility-patterns.md`
- `.devbooster/hub/knowledge/project-structure-patterns.md`
- `.devbooster/hub/knowledge/types-contracts-organization.md`
- `.devbooster/rules/GUIDE.md`
- `.devbooster/rules/TRIGGERS.md`
- `README.md`
- `package.json`
- `template/.devbooster/MANIFEST.md`
- `template/.devbooster/boosters/architecture-audit.md`
- `template/.devbooster/hub/knowledge/architecture-audit-principles.md`
- `template/.devbooster/hub/knowledge/code-duplication-patterns.md`
- `template/.devbooster/hub/knowledge/index.md`
- `template/.devbooster/hub/knowledge/module-boundaries-dependencies.md`
- `template/.devbooster/hub/knowledge/naming-responsibility-patterns.md`
- `template/.devbooster/hub/knowledge/project-structure-patterns.md`
- `template/.devbooster/hub/knowledge/types-contracts-organization.md`
- `template/.devbooster/rules/GUIDE.md`
- `template/.devbooster/rules/TRIGGERS.md`

---

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
