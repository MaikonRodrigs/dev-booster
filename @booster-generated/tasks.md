# System Tasks

Backlog operacional simples do projeto. Use este arquivo para registrar tarefas técnicas, ajustes pendentes e itens concluídos do sistema.

## Status
- `TODO`: ainda não iniciado
- `DOING`: em andamento
- `DONE`: concluído
- `BLOCKED`: depende de outra decisão ou desbloqueio

## Tasks

### TODO
- [ ] Atualizar os carrosseis de exemplo da landing page.
  Resumo: revisar os carrosseis exibidos na landing page para substituir ou renovar os exemplos atuais, garantindo que reflitam melhor a qualidade e o posicionamento atual do produto.
  Referências: `src/app/(pages)/landingpage/`, `src/app/(pages)/landingpage/sessions/hero-section/`, `/public/images/projects/carousel/`.
- [ ] Trocar as chaves de desenvolvimento do Clerk por chaves apropriadas para produção.
  Resumo: revisar a configuração atual do Clerk para remover o uso de `pk_test` fora do ambiente local e garantir que o deploy use credenciais de produção sem warnings nem limites de instância de desenvolvimento.
  Referências: `src/app/layout.tsx`, variáveis de ambiente do Clerk, dashboard do Clerk.
- [ ] Atualizar a configuração de redirects do Clerk para remover o uso de APIs depreciadas.
  Resumo: revisar o fluxo de autenticação e redirecionamento para substituir a convenção antiga baseada em `afterSignInUrl` pelos props atuais como `fallbackRedirectUrl` ou `forceRedirectUrl`, preservando o comportamento do login customizado.
  Referências: `src/app/layout.tsx`, `src/middleware.ts`, `src/components/auth/SignInForm.tsx`, `src/app/(pages)/landingpage/sessions/menu.tsx`.
- [ ] Ajustar as imagens above-the-fold do hero para reduzir o warning de LCP no Next.js.
  Resumo: revisar as imagens principais do hero de carousel e aplicar a estratégia correta de carregamento prioritário apenas nos elementos acima da dobra que estão sendo detectados como Largest Contentful Paint.
  Referências: `src/app/(pages)/landingpage/sessions/hero-section/carousel.tsx`, `/public/images/projects/carousel/`.
- [ ] Investigar o warning de `non-static position` emitido pelo Motion no scroll da landing page.
  Resumo: reproduzir e confirmar qual container usado pelo `useScroll` está sendo interpretado com posição estática para decidir se o ajuste é estrutural ou apenas um warning benigno da biblioteca.
  Referências: `src/components/ui/horizontal-scroll-section.tsx`, `src/app/(pages)/landingpage/sessions/how-it-works-section.tsx`, `src/app/(pages)/landingpage/landing-page.tsx`.
- [ ] Investigar como voltar o build de produção para Turbopack sem puxar módulos server-only para o client.
  Resumo: revisar a fronteira entre `src/trpc/react.tsx` e `src/server/api/root.ts` para eliminar o acoplamento que hoje quebra o build com Turbopack e manter o pipeline de produção sem depender de `--webpack`.
  Referências: `src/trpc/react.tsx`, `src/trpc/server.ts`, `src/server/api/root.ts`, `package.json`.
- [ ] Atualizar o ambiente do projeto para Node 22+ antes da janela de suporte futuro do AWS SDK v3.
  Resumo: planejar a atualização da versão de Node usada no desenvolvimento e no deploy para manter compatibilidade com futuras versões do AWS SDK e evitar ficar sem updates de segurança e bugfixes.
  Referências: `package.json`, `@aws-sdk/client-s3`, `@types/node`.
- [ ] Adaptar os visualizadores de imagem no admin para respeitar corretamente se o conteúdo é `story` ou `feed`.
  Resumo: revisar todos os pontos do admin onde imagens são abertas ou ampliadas para exibir o aspect ratio correto conforme o destino real do conteúdo.
  Referências: `src/app/(pages)/admin/`, `src/app/(pages)/projects/[id]/page.tsx`, `src/types/projects.types.ts`.
- [ ] Corrigir a inferência de aspect em projetos antigos de `single-post` que não carregam destino explícito.
  Resumo: revisar a leitura de projetos legados para evitar que posts antigos sejam renderizados como `feed` quando o default histórico era `story`, garantindo que a visualização respeite o aspect original ou a regra correta de fallback.
  Referências: `src/app/(pages)/projects/[id]/page.tsx`, `src/types/projects.types.ts`, `src/app/(pages)/create/components/single-post/`.
- [ ] Adicionar uma seção ou rota `/como-funciona` explicando o fluxo de `carousel`.
  Resumo: criar uma explicação dedicada para mostrar ao usuário como funciona a geração de carrossel, etapas do processo e proposta de valor do formato.
  Referências: `src/app/(pages)/`, `docs/3-operations/new-carousel.md`, `src/app/(pages)/create/components/carousel/`.
- [ ] Ajustar a tela `/consumo` para diferenciar `single-post` e `carousel` apenas com iconografia.
  Resumo: deixar a leitura visual do consumo mais clara usando ícones distintos por tipo de geração, sem depender de texto adicional.
  Referências: `src/app/(pages)/consumo/`, `src/server/api/routers/user.ts`, `src/types/projects.types.ts`.
- [ ] Atualizar o `ntfy` para diferenciar quando a notificação é de `single-post` e quando é de `carousel`.
  Resumo: adaptar o payload e a apresentação das notificações para identificar claramente o tipo de geração concluída, evitando mensagens ambíguas no monitoramento.
  Referências: `src/lib/notifications.ts`, `src/server/api/routers/project.ts`, `src/server/api/routers/carousel/index.ts`, `docs/4-history-and-plans/NTFY_IMPLEMENTATION.md`.
- [ ] Apagar o módulo `text-post_old` quando o carousel já tiver absorvido tudo o que ainda pode ser reaproveitado.
  Resumo: manter o legado temporariamente como referência de pesquisa e remover depois que não houver mais dependência prática nem necessidade de consulta.
  Referências: `src/services/text-post_old/`, `src/app/(pages)/create/components/text-post_old/`, `src/server/api/routers/ai/text-post/index.ts`.
- [ ] Organizar o domínio de carousel em arquivos menores sem alterar comportamento.
  Resumo: separar o módulo atual em partes menores para reduzir acoplamento e alinhar com o padrão usado nos routers modulares do projeto.
  Referências: `src/server/api/routers/carousel/index.ts`, `src/server/api/routers/ai/single-post/index.ts`, `src/server/api/routers/ai/text-post/index.ts`.
- [ ] Adicionar novas tarefas aqui conforme forem surgindo.

### DONE
- [x] Padronizar o router de carousel para estrutura pasta/arquivo sem alterar comportamento.
  Arquivo movido de `src/server/api/routers/carousel.ts` para `src/server/api/routers/carousel/index.ts` e imports validados.
