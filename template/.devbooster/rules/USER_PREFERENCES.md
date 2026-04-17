---
name: user-preferences
priority: P0.2 (Preferences)
description: Caderno de Rascunhos Dinâmico - Padrões experimentais e regras recém aprovadas.
---

# 🧠 PROJECT PATTERNS MEMORY (Rascunho)

Este arquivo opera como um "caderno de rascunhos em tempo real" da IA e do Desenvolvedor. O núcleo da arquitetura do projeto vive em `FRONTEND.md`, `BACKEND.md` e `PROJECT.md`.

## 🛠️ THE ENCYCLOPEDIA TRIGGER
Toda vez que o usuário digitar estritamente a frase **"bota na enciclopédia"** (ou variações como "bota na enciclopedia"), referindo-se a um padrão de código que acabamos de resolver e aprovar na sessão atual, a IA **deve extrair a regra técnica** e anotá-la aqui.

- Este arquivo capta preferências de desenvolvimento e decisões emergentes para garantir consistência no curto prazo.
- Periodicamente (ou ao refatorar a base), os padrões consolidados que nascerem aqui serão migrados para as pastas oficiais de front-end ou back-end e removidos daqui.

---

## 📝 EXPERIMENTAL PATTERNS & NEW RULES
*(A IA salvará os recém descobertos padrões abaixo desta linha, categorizando-os apropriadamente)*

---

### 🔄 AUTOMATION: PROMPT DE MIGRAÇÃO (MODO EXPERT)
*Guarde este prompt. Cole no chat quando a área acima começar a ficar cheia para automatizar a limpeza:*

> **Prompt para a IA:**
> "Atue como um Arquiteto de Software. Leia a seção 'EXPERIMENTAL PATTERNS' no meu `USER_PREFERENCES.md`. Pegue todas as regras ali listadas e realize a migração seguindo estas diretrizes:
> 
> 1. **Mapeamento:** Identifique se a regra pertence a `FRONTEND.md`, `BACKEND.md` ou `PROJECT.md`.
> 2. **Documentação Pro-Max:** NÃO faça colagem rasa. Ao mover, escreva a regra seguindo o padrão estabelecido nos arquivos de destino: Explicação densa + Exemplo de Código (se aplicável) + Contexto de 'Por que fazemos assim'.
> 3. **Integração Orgânica:** Encaixe a nova regra em seções existentes ou crie novas categorias que mantenham a hierarquia e organização lógica do documento.
> 4. **Limpeza:** Após confirmar que as informações foram integradas com sucesso nos manuais definitivos e que a integridade dos arquivos foi mantida, limpe a seção 'EXPERIMENTAL PATTERNS' de `USER_PREFERENCES.md` deixando apenas o cabeçalho e este prompt."
