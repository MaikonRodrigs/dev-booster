```text
🧭 GUIA DO DEV BOOSTER KIT (BOOSTERS)

Este guia serve como referência rápida para entender a função de cada Booster (ativador manual).
Ele foi formatado como bloco de código para facilitar a leitura direta na IDE.

---

[ 🛠️ ENGENHARIA E EXECUÇÃO ]

• create.md         -> Arquiteto Mestre. Focado em Scaffolding e criação de novas 
                       funcionalidades ou apps do zero, integrando FRONTEND.md e BACKEND.md.
• performance.md    -> Engenheiro de Performance. Focado em Core Web Vitals, 
                       velocidade de carregamento e otimização de Next.js.
• i18n.md           -> Especialista de Internacionalização. Extração de textos e 
                       configuração de múltiplos idiomas.
• accessibility.md  -> Auditor de Acessibilidade. Garante conformidade WCAG e 
                       uso correto de semântica HTML/ARIA.
• refactor.md       -> Líder de Qualidade. Focado em limpar dívida técnica, implementar 
                       SOLID e reforçar o Clean Code.
• implementation.md -> Mestre de Implementação. Faz a triagem da complexidade (P, M, G) 
                       e escolhe o template correto antes de gerar o plano após confirmação.
                       
• documentation.md  -> Documentação Técnica. Gera um documento estruturado de 17 seções a partir do contexto consolidado
                       para prever todos os requisitos técnicos rigorosos.
• atomic.md         -> Execução Atômica. Protocolo para execução passo a passo, 
                       focada em uma única alteração cirúrgica por vez.
• review.md         -> Auditoria Elite. Ativa orquestração mult-agente para validar 
                       se um plano ou código segue os padrões do projeto.

---

[ 🔍 DESCOBERTA E PLANEJAMENTO ]

• discovery.md      -> Consultor Estratégico. Usa brainstorm de 3 caminhos para validar 
                       ideias de produto e regras de negócio.
• planning.md       -> Alinhamento e Prontidão. Consolida decisões, mapeia riscos/gaps e valida se está pronto para implementation 
                       antes de seguir para implementation.
• investigation.md  -> Pré-Orquestrador de Contexto. Faz análise profunda do repositório 
                       (no-code analysis) antes de propor mudanças.
• advisor.md        -> Consultor do Kit (GPS). Ajuda a escolher qual booster usar.

---

[ 🐞 CORREÇÃO E QUALIDADE ]

• debug.md          -> Análise de Causa Raiz. Usa motor de hipóteses para investigar bugs 
                       de forma sistemática.
• testing.md        -> Estrategista de Testes. Define estratégia de cobertura (Unit, E2E) 
                       e coordena a execução.
• changelog.md      -> Gerador de Histórico. Cria notas de release estruturadas e organiza 
                       o histórico de alterações.

---

[ 🎨 ESPECIALIDADES E STACK ]

• frontend.md       -> Especialista de Frontend. Ativa regras de Next.js, React e UI/UX.
• backend.md        -> Especialista de Backend. Focado em APIs, tRPC, Banco de Dados e Servidor.
• design.md         -> Auditoria de UI/UX. Verifica se os componentes estão seguindo 
                       padrões premium e acessibilidade.
• seo.md            -> Guardião de SEO. Valida HTML semântico e metatags para indexação.
• mobile.md         -> Mestre de Mobile. Ativa padrões de React Native, Expo e touch UX.

---

[ 🛡️ SEGURANÇA E DEPLOY ]

• security.md       -> Auditoria de Segurança. Analisa vulnerabilidades, vazamento de 
                       segredos e modelagem de ameaças.
• deploy.md         -> Protocolo de Lançamento. Faz os "pre-flight checks" para garantir 
                       que o código está pronto para produção.

---

💡 COMO USAR AGORA:
Os Boosters agora funcionam como modos manuais do Dev Booster.
Na maioria dos casos, a ativação NÃO executa tudo imediatamente.

Fluxo padrão:
1. Ative o Booster pelo nome.
2. O Booster entra no modo correto.
3. Depois envie a tarefa, ideia, contexto, artefato ou objetivo real.
4. Só então ele carrega o necessário e continua.

Exemplos de ativação:
- Arraste `.devbooster/boosters/frontend.md` no chat e envie.
- Arraste `.devbooster/boosters/discovery.md` no chat e envie.
- Arraste `.devbooster/boosters/advisor.md` no chat e envie.

Padrões de comportamento:
- Boosters de domínio, como frontend, backend, testing e performance:
  ativam rápido, entram em modo armado e carregam contexto depois da primeira dor real.
- Boosters de síntese, como documentation e planning:
  resumem o contexto atual e pedem confirmação antes de continuar.
- Boosters de entrada de artefato, como review:
  pedem a documentação, implementação, arquivo ou referência antes de carregar o restante.
- Boosters operacionais como changelog:
  usam o estado real do Git como fonte principal e fazem apenas as perguntas mínimas.

Exemplos práticos:
- Arraste `.devbooster/boosters/planning.md` no chat e envie.
- Arraste `.devbooster/boosters/documentation.md` no chat e envie.
- Arraste `.devbooster/boosters/changelog.md` no chat e envie.
- Arraste `.devbooster/boosters/review.md` no chat e envie.

Depois da ativação, envie o próximo passo normalmente.
Exemplo:
"[arquivo planning.md enviado no chat]"
"Agora quero validar se já fechamos contexto suficiente para seguir para implementation."

---

💡 COMO ATUALIZAR O KIT:
Se este projeto já tem Dev Booster instalado e você quiser receber uma versão mais nova do kit,
use no terminal:

`npx dev-booster --update`

O update:
- atualiza `.devbooster/boosters/`
- atualiza `.devbooster/hub/`
- preserva `.devbooster/rules/`
- preserva `DEVBOOSTER_INIT.md`

Isso existe para manter seguras as regras e ajustes locais do projeto.
```
