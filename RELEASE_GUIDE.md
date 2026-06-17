# Dev Booster Release Guide

Este arquivo existe apenas para manutenção do repositório.
Ele não faz parte do kit instalado pelo usuário via `npx`.

---

## Quando usar este guia

Use este fluxo sempre que você:
- ajustar boosters
- adicionar novas skills, personas, scripts ou workflows
- refinar regras do kit
- alterar a CLI
- quiser publicar uma nova versão no npm

---

## Modelo mental

- Git = histórico e evolução do projeto
- npm = distribuição pública versionada
- `npx dev-booster` = consumo da última versão publicada

Você pode alterar o repositório à vontade localmente.
Só precisa publicar no npm quando quiser disponibilizar a nova versão para outras instalações.

---

## Fluxo recomendado

### 1. Atualize o kit

Faça suas mudanças normalmente no repositório.

### 2. Sincronize o template distribuído

```bash
npm run sync-template
```

Isso garante que:
- `.devbooster/` continue como fonte principal
- `template/.devbooster/` receba a cópia atualizada
- `template/DEVBOOSTER_INIT.md` fique alinhado com o arquivo raiz

> **⚠️ Importante:** nunca edits `template/` diretamente. A fonte de verdade é a raiz (`.devbooster/`, `DEVBOOSTER_INIT.md`, `src/`, `bin/`).
> O `template/` é apenas um espelho do que vai no npm — ele atualiza-se sozinho via `npm run sync-template`.
> Se editares diretamente o `template/`, as alterações perdem-se no próximo sync.

### 3. Revise o pacote antes de publicar

```bash
npm pack --dry-run --cache /tmp/devbooster-npm-cache
```

Use isso para confirmar:
- quais arquivos irão para o npm
- tamanho do pacote
- se não entrou nada indevido

### 4. Escolha o tipo de versão

Use uma destas opções:

```bash
npm version patch
```

Para:
- correções pequenas
- ajustes de texto
- refinos de boosters sem mudança relevante de uso

```bash
npm version minor
```

Para:
- novos boosters
- novos fluxos
- novas capacidades
- mudanças relevantes sem quebrar o uso atual

```bash
npm version major
```

Para:
- mudanças que quebram compatibilidade
- renomeações importantes
- alterações de estrutura que exigem adaptação de quem já usa o kit

### 5. Publique

```bash
npm publish
```

Se o npm pedir o código do 2FA, informe o OTP.

---

## Exemplo prático

Se você:
- melhorou boosters
- adicionou comportamento novo
- mas não quebrou o uso atual

o fluxo tende a ser:

```bash
npm run sync-template
npm pack --dry-run --cache /tmp/devbooster-npm-cache
npm version minor
npm publish
```

---

## Regras importantes

### Você não pode publicar a mesma versão duas vezes

Se `1.0.0` já foi publicado, qualquer nova publicação precisa ser:
- `1.0.1`
- `1.1.0`
- `2.0.0`

ou outra versão ainda não usada.

### Não precisa editar o package.json na mão

Prefira:

```bash
npm version patch
```

em vez de alterar o campo `"version"` manualmente.

### A fonte de verdade é a raiz, não o template

**Nunca edites `template/` diretamente.** A raiz do repositório (`.devbooster/`, `DEVBOOSTER_INIT.md`, `src/index.js`, etc.) é a fonte de verdade em modo dev.
O `template/` é sincronizado automaticamente com `npm run sync-template` e serve apenas como o pacote que sobe para o npm.

### Nem toda mudança local precisa de publish

Você só publica quando quiser liberar a novidade para instalação via `npx`.

---

## Checklist rápido

Antes de publicar:

- [ ] mudanças finalizadas
- [ ] `npm run sync-template`
- [ ] `npm pack --dry-run --cache /tmp/devbooster-npm-cache`
- [ ] versão escolhida corretamente
- [ ] `npm publish`

---

## Observação

Este arquivo é para operação do mantenedor do Dev Booster.
Ele não deve ser tratado como parte do kit entregue ao usuário final.
