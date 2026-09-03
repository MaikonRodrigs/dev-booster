# Verificação

Referências visuais para fluxos de verificação de identidade — solicitação de verificação de e-mail, entrada de código (OTP) e confirmação de sucesso.

Use esta categoria para explorar:

- Solicitação de verificação de e-mail
- Entrada manual de código de verificação
- Confirmação de verificação bem-sucedida

## Mapa de tags (por faceta)

**Estilo**

| Tag                    | Referências                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `minimal`              | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `clean` / `restrained` | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `reassuring`           | [verification-03](verification-03.md)                                                                               |

**Layout & densidade**

| Tag             | Referências                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `centered`      | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `single-column` | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `spacious`      | [verification-01](verification-01.md), [verification-03](verification-03.md)                                        |

**Tipo & domínio**

| Tag                    | Referências                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `email-verification`   | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `otp`                  | [verification-02](verification-02.md)                                                                               |
| `request`              | [verification-01](verification-01.md)                                                                               |
| `success`              | [verification-03](verification-03.md)                                                                               |
| `passwordless` / `2fa` | [verification-02](verification-02.md)                                                                               |

**Componentes-chave**

| Tag              | Referências                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `status-icon`    | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `primary-button` | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |
| `otp-input`      | [verification-02](verification-02.md)                                                                               |
| `resend-link`    | [verification-02](verification-02.md), [verification-03](verification-03.md)                                        |
| `back-link`      | [verification-01](verification-01.md), [verification-02](verification-02.md), [verification-03](verification-03.md) |

## Referências

### [verification-01](verification-01.md) — Solicitação de verificação de e-mail

- **Tipo:** email verification request page
- **Tags:** `email-verification` `request` `minimal` `centered` `single-column`
- **Componentes:** ícone de status de e-mail, heading, copy de apoio, botão primário, link voltar
- **Resumo:** coluna centralizada com mensagem, ação principal e retorno. Ideal para confirmação de e-mail, autenticação sem senha, ativação de conta e convites.

### [verification-02](verification-02.md) — Entrada manual de código de verificação

- **Tipo:** email verification code page
- **Tags:** `otp` `code` `minimal` `centered` `task-oriented`
- **Componentes:** ícone de status, heading, copy, input de código único (OTP), botão, link reenviar, link voltar
- **Resumo:** coluna única com campo de código, envio, prompt de recuperação e navegação de volta. Ideal para OTP, confirmação, login sem senha, 2FA e códigos curtos.

### [verification-03](verification-03.md) — Confirmação de verificação bem-sucedida

- **Tipo:** email verification success page
- **Tags:** `success` `confirmation` `minimal` `centered` `reassuring`
- **Componentes:** ícone de sucesso, heading, copy, botão, link reenviar, link voltar
- **Resumo:** mensagem de sucesso compacta com continuação e opções de recuperação/retorno. Ideal para conclusão de verificação, ativação, sem senha e checkpoints de onboarding.

## Como adicionar referências

Salve as imagens nesta pasta seguindo o padrão `verification-XX.png` ou `verification-XX.webp` (exemplo: `verification-01.png`). Após salvar, atualize o mapa de tags e o catálogo de referências deste `index.md` (formato no `VISION_PROMPT.md`).

## Categorias relacionadas

- `sign-in` — páginas de login
- `sign-up` — páginas de cadastro
- `forgot-password` — recuperação de senha
