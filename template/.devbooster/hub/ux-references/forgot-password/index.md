# Recuperação de senha

Referências visuais para fluxos de recuperação de senha — formulário de solicitação, fluxo em múltiplas etapas, confirmação de e-mail e sucesso de reset.

Use esta categoria para explorar:

- Formulário de solicitação de recuperação
- Fluxo guiado em múltiplas etapas
- Confirmação de envio de e-mail
- Confirmação de sucesso do reset

## Mapa de tags (por faceta)

**Estilo**

| Tag                   | Referências                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `minimal`             | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-04](forgot-password-04.md) |
| `calm` / `reassuring` | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-04](forgot-password-04.md) |
| `guided`              | [forgot-password-03](forgot-password-03.md)                                                                                           |

**Layout & densidade**

| Tag             | Referências                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `centered`      | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md)                                              |
| `multi-step`    | [forgot-password-03](forgot-password-03.md)                                                                                           |
| `single-column` | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-04](forgot-password-04.md) |
| `spacious`      | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-04](forgot-password-04.md) |

**Tipo & domínio**

| Tag             | Referências                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `recovery`      | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-03](forgot-password-03.md), [forgot-password-04](forgot-password-04.md) |
| `confirmation`  | [forgot-password-01](forgot-password-01.md), [forgot-password-04](forgot-password-04.md)                                                                                           |
| `success`       | [forgot-password-01](forgot-password-01.md)                                                                                                                                        |
| `email`         | [forgot-password-04](forgot-password-04.md)                                                                                                                                        |
| `saas` / `auth` | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-03](forgot-password-03.md), [forgot-password-04](forgot-password-04.md) |

**Componentes-chave**

| Tag              | Referências                                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email-field`    | [forgot-password-02](forgot-password-02.md), [forgot-password-03](forgot-password-03.md)                                                                                           |
| `primary-button` | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-03](forgot-password-03.md), [forgot-password-04](forgot-password-04.md) |
| `back-link`      | [forgot-password-01](forgot-password-01.md), [forgot-password-02](forgot-password-02.md), [forgot-password-03](forgot-password-03.md), [forgot-password-04](forgot-password-04.md) |
| `stepper`        | [forgot-password-03](forgot-password-03.md)                                                                                                                                        |
| `progress-dots`  | [forgot-password-03](forgot-password-03.md)                                                                                                                                        |
| `resend-link`    | [forgot-password-04](forgot-password-04.md)                                                                                                                                        |

## Referências

### [forgot-password-01](forgot-password-01.md) — Confirmação de sucesso do reset

- **Tipo:** password reset success page
- **Tags:** `recovery` `success` `minimal` `centered`
- **Componentes:** ícone de status, heading, texto de apoio, botão primário, link voltar
- **Resumo:** sequência vertical clara e compacta com feedback de conclusão. Ideal para autenticação, recuperação, SaaS e portais de membros.

### [forgot-password-02](forgot-password-02.md) — Formulário de solicitação de recuperação

- **Tipo:** password recovery request page
- **Tags:** `recovery` `form` `minimal` `centered` `reassuring`
- **Componentes:** ícone de recuperação, heading, texto, campo e-mail, botão, link voltar
- **Resumo:** formulário compacto focado em uma única tarefa. Ideal para recuperação de conta, login, onboarding de SaaS e portais de clientes.

### [forgot-password-03](forgot-password-03.md) — Formulário de recuperação em múltiplas etapas

- **Tipo:** multi-step account recovery page
- **Tags:** `recovery` `multi-step` `guided` `onboarding-oriented`
- **Componentes:** stepper, ícone, heading + texto, campo e-mail, botão, link voltar, dots de progresso
- **Resumo:** trilho lateral de estrutura com formulário compacto e centralizado. Ideal para onboarding em etapas, workspace setup e recuperação guiada.

### [forgot-password-04](forgot-password-04.md) — Confirmação de e-mail de reset

- **Tipo:** password reset email confirmation page
- **Tags:** `recovery` `email` `confirmation` `minimal` `task-oriented`
- **Componentes:** ícone de e-mail, heading, texto, botão, link reenviar, link voltar
- **Resumo:** hierarquia compacta centrada na ação principal de e-mail com fallback abaixo. Ideal para recuperação, verificação, magic-link e portais de membros.

## Como adicionar referências

Salve as imagens nesta pasta seguindo o padrão `forgot-password-XX.png` ou `forgot-password-XX.webp` (exemplo: `forgot-password-01.png`). Após salvar, atualize o mapa de tags e o catálogo de referências deste `index.md` (formato no `VISION_PROMPT.md`).

## Categorias relacionadas

- `sign-in` — páginas de login
- `sign-up` — páginas de cadastro
- `verification` — verificação de e-mail e código
