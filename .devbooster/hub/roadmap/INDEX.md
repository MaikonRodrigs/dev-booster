# Roadmap Index

Use este índice antes de abrir qualquer categoria. Pesquise primeiro por **problema**, depois por **tag**.

## Regra de consulta

```text
problema do usuário → domínio → tags → categoria → solução → documentação oficial
```

## Achados técnicos catalogados

| Fonte                                                              | Papel                                                                                                                                                                                                    | Quando consultar                                                                                                                                                  | Tags                                                                               |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [BagUI](https://www.bagui.pro/)                                    | Biblioteca open source de blocos React e shadcn/ui prontos para composição de interfaces, incluindo hero, feature, pricing, testimonial, CTA, FAQ, navbar, footer e blog.                                | Quando a tarefa precisa acelerar a composição de uma landing page ou reutilizar blocos de interface compatíveis com React/shadcn/ui.                              | `#react #shadcn #ui #blocks #landing-page #components`                             |
| [TanStack Charts](https://tanstack.com/charts/latest?via=dailydev) | Biblioteca de gráficos com gramática tipada e tree-shakable para SVG e Canvas, baseada em marks, views, escalas, transforms, interações e motion.                                                        | Quando a tarefa precisa de gráficos analíticos, dashboards, visualizações compostas, tooltips, seleção, crosshair, zoom, animação ou integração tipada com React. | `#charts #data-visualization #react #typescript #svg #canvas #interaction #motion` |
| [FeralUI](https://feralui.dev/)                                    | Vitrine de componentes React/TypeScript com física real e animação artesanal — cada componente é um demo independente (foil holográfico de carta, corda física, mascote reativo, textura de pelo, etc.). | Quando a tarefa precisa de um efeito interativo com física (tilt/foil, microinterações físicas) ou inspiração para componentes React "playful".                   | `#react #components #physics #motion #animation`                                   |

### Como usar esses achados

- Consulte a fonte conforme o problema; não carregue nem adote as duas bibliotecas por padrão.
- Leia primeiro o código real do projeto, o design system existente, as dependências instaladas e os componentes já disponíveis.
- Use BagUI como referência ou fonte de blocos somente quando a composição React/shadcn fizer sentido para o projeto.
- Use TanStack Charts quando a visualização exigir composição de marks, escalas, dados tipados ou interações mais avançadas do que um gráfico básico.
- Preserve a identidade visual, tokens, acessibilidade, arquitetura e convenções do projeto; as fontes não substituem essas regras.
- Antes de adicionar uma dependência, verificar compatibilidade de versão, bundle, licença, manutenção, SSR/client boundaries e necessidade real.

## Categorias

| Arquivo              | Usar quando                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `inspiration.md`     | Procurar referências visuais, padrões de produto ou direção de interface |
| `components.md`      | Procurar componentes, padrões React, shadcn/ui ou blocos reutilizáveis   |
| `web-utilities.md`   | Resolver cores, contraste, easing, SVG, regex ou utilidades web          |
| `motion.md`          | Criar animações, microinterações, motion graphics ou interfaces animadas |
| `interface.md`       | Trabalhar com Figma, Framer, Penpot, Rive ou prototipação de interface   |
| `whiteboard.md`      | Mapear fluxos, wireframes, jornadas ou ideias visualmente                |
| `video-capture.md`   | Capturar, editar, transmitir ou revisar uma interface em vídeo           |
| `audio.md`           | Procurar áudio, voice, sound design ou integração de áudio               |
| `volumetric.md`      | Trabalhar com captura volumétrica, scans ou assets 3D reais              |
| `three-d.md`         | Criar cenas, objetos, modelagem, shaders ou experiências 3D              |
| `gltf.md`            | Otimizar, converter ou visualizar assets glTF                            |
| `digital-fashion.md` | Criar roupas digitais, simulação têxtil ou fashion 3D                    |
| `fonts.md`           | Pesquisar tipografia, fontes gratuitas ou referências de uso             |
| `organization.md`    | Organizar referências, projetos, tarefas ou bibliotecas visuais          |
| `research.md`        | Pesquisar, sintetizar ou comparar informação                             |
| `emoji.md`           | Criar ou consultar assets de emoji                                       |

## Consulta por problema

| Problema                                                | Tags para buscar                     | Categoria                       |
| ------------------------------------------------------- | ------------------------------------ | ------------------------------- |
| Preciso de inspiração para uma landing page             | `#inspiration #landing-page #web`    | `inspiration.md`                |
| Preciso de um componente React pronto                   | `#react #components #ui`             | `components.md`                 |
| Preciso de uma alternativa para shadcn/ui               | `#shadcn #design-system #components` | `components.md`                 |
| Preciso animar texto ou números                         | `#animation #text #numbers #motion`  | `motion.md`, `components.md`    |
| Preciso escolher uma curva de animação                  | `#easing #motion #css`               | `web-utilities.md`, `motion.md` |
| Preciso animar/transicionar ícones                      | `#motion #icons #svg`                | `motion.md`                     |
| Preciso testar uma paleta                               | `#color #oklch #contrast`            | `web-utilities.md`              |
| Preciso otimizar um SVG                                 | `#svg #optimization`                 | `web-utilities.md`              |
| Preciso criar uma interface/protótipo                   | `#figma #framer #penpot #prototype`  | `interface.md`                  |
| Preciso registrar um fluxo                              | `#whiteboard #flow #wireframe`       | `whiteboard.md`                 |
| Preciso gravar uma demonstração                         | `#capture #screen #video`            | `video-capture.md`              |
| Preciso criar uma cena 3D                               | `#3d #webgl #shader`                 | `three-d.md`                    |
| Preciso de um efeito interativo com física (tilt, foil) | `#physics #motion #components`       | `components.md`                 |
| Preciso trabalhar com glTF                              | `#gltf #3d #optimization`            | `gltf.md`                       |
| Preciso pesquisar uma decisão                           | `#research #ai #knowledge`           | `research.md`                   |

## Tags globais

`#inspiration` `#frontend` `#components` `#react` `#shadcn` `#animation` `#motion` `#physics` `#color` `#icons` `#svg` `#prototype` `#video` `#audio` `#3d` `#gltf` `#fonts` `#research` `#organization`

## Fora do roadmap principal

Não catalogar como recomendação técnica padrão: IDEs, agentes/harness de código, modelos de IA específicos, navegadores e ferramentas pessoais de ambiente. Essas escolhas pertencem ao usuário e não devem ser interpretadas pela LLM como fonte de verdade.
