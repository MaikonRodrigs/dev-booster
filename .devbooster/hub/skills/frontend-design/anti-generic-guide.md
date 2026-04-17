# UI Design Skill — Anti-Generic Guide
### Para Next.js + Tailwind CSS + shadcn/ui

> Leia este documento **antes** de escrever qualquer componente de UI.  
> Ele não é uma lista de regras opcionais. É o contrato visual do projeto.

---

## 1. O problema que você está sendo contratado para evitar

Modelos de linguagem treinados em código público aprenderam com milhares de projetos que usam os mesmos templates: Tailwind UI, shadcn/ui boilerplates, v0.dev outputs. O resultado é uma "média estatística" do que existe — e essa média tem cara reconhecível:

- Grade de 3 colunas com cards idênticos
- Ícone + título + parágrafo cinza repetido N vezes  
- `border rounded-lg p-6 shadow-sm` em absolutamente tudo
- Hierarquia tipográfica `text-2xl font-bold` → `text-sm text-muted-foreground` sem variação
- Paleta: branco, cinza-100, cinza-800, uma cor de accent genérica
- Fonte: Inter. Sempre Inter.

**Interfaces geradas assim são corretas. Funcionam. E são completamente invisíveis.**

---

## 2. Antes de escrever uma linha de código

Responda mentalmente:

1. **Qual é a hierarquia de informação?** O que o usuário precisa ver *primeiro*? O que é secundário? O que pode sumir?
2. **Qual é o tom emocional?** Técnico/preciso? Quente/humano? Urgente? Contemplativo?
3. **O que quebra o padrão aqui?** Um tamanho tipográfico inesperado, uma cor fora do grid, um elemento que não está dentro de um card.
4. **Onde está a tensão visual?** Contraste de peso, escala, cor ou espaço que cria direção de leitura.

Se você não consegue responder essas perguntas, **não comece a codar**. Volte para o contexto do componente.

---

## 3. Padrões proibidos

### 3.1 Layout

❌ **Grade uniforme de cards com mesmo peso visual**
```tsx
// PROIBIDO — todos os cards iguais, hierarquia zero
<div className="grid grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

✅ **Hierarquia explícita — um elemento domina**
```tsx
// Um item principal (grande), outros secundários (menores)
<div className="grid grid-cols-3 gap-6">
  <div className="col-span-2 row-span-2">...</div> {/* ancora visual */}
  <Card className="...">...</Card>
  <Card className="...">...</Card>
</div>
```

---

❌ **Card dentro de Card dentro de Card**
```tsx
// PROIBIDO — caixas aninhadas sem propósito
<Card>
  <CardContent>
    <Card> {/* por quê? */}
      <Card> {/* sério? */}
```

✅ **Use separação visual sem container**
```tsx
// Divida com espaço, tipografia ou borda — não com mais boxes
<div className="space-y-6">
  <section>
    <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
      Seção
    </h3>
    <div className="space-y-2">...</div>
  </section>
</div>
```

---

❌ **Ícone flutuante genérico acima de cada heading**
```tsx
// PROIBIDO — esse padrão grita "template"
<div className="flex flex-col items-center text-center">
  <div className="rounded-full bg-primary/10 p-3 mb-4">
    <Icon className="h-6 w-6 text-primary" />
  </div>
  <h3 className="font-semibold">Título</h3>
  <p className="text-sm text-muted-foreground">Descrição genérica</p>
</div>
```

✅ **Integre o ícone no fluxo tipográfico ou elimine-o**
```tsx
<div>
  <h3 className="font-semibold flex items-center gap-2">
    <Icon className="h-4 w-4 opacity-50" />
    Título
  </h3>
  <p className="text-sm text-muted-foreground mt-1 pl-6">Descrição</p>
</div>
```

---

### 3.2 Tipografia

❌ **Escala homogênea — tudo `text-sm` ou tudo `text-base`**

✅ **Contraste de escala intencional**
```tsx
// Crie tensão: um elemento muito grande, outro muito pequeno
<div>
  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
    Receita mensal
  </span>
  <p className="text-4xl font-bold tracking-tight mt-1">R$ 48.320</p>
  <p className="text-sm text-muted-foreground mt-1">↑ 12% vs mês anterior</p>
</div>
```

❌ **`font-semibold` como único grau de ênfase**

✅ **Use o sistema completo: peso + tamanho + cor + espaçamento + opacidade**
```tsx
// Hierarquia sem usar negrito em tudo
<p className="text-sm font-medium">Label</p>          // primário
<p className="text-sm text-muted-foreground">Desc</p> // secundário  
<p className="text-xs opacity-50">Metadata</p>        // terciário
```

---

❌ **Inter como fonte padrão por inércia**

✅ **Escolha com intenção** — ou use o que está no `tailwind.config`, ou questione se deve adicionar uma fonte display para headings:
```tsx
// No tailwind.config.ts — fonts com personalidade
fontFamily: {
  sans: ['Geist', 'system-ui', 'sans-serif'],     // corpo
  display: ['Cal Sans', 'serif'],                   // headings grandes
  mono: ['Geist Mono', 'monospace'],               // código/dados
}
```

---

### 3.3 Cor

❌ **Paleta de 50 tons de cinza + uma cor de brand genérica**

✅ **Cor com função editorial**
- Use cor para criar *hierarquia*, não apenas *identidade*
- Uma cor quente num contexto frio chama atenção — use isso
- `text-muted-foreground` é para informação *realmente* secundária, não para tudo que não é título

❌ **`#000000` ou `#ffffff` puros**

✅ **Neutros com matiz** — cinzas levemente azulados, quentes ou frios dependem do tom do produto:
```css
/* Em vez de gray puro, use slate (frio/técnico) ou zinc (neutro) ou stone (quente) */
--foreground: 224 71% 4%;    /* quase preto com matiz azul */
--background: 210 20% 98%;   /* quase branco com matiz frio */
```

---

### 3.4 Espaço e ritmo

❌ **`gap-6` e `p-6` em tudo, uniformemente**

✅ **Espaço como hierarquia** — mais espaço = mais importância
```tsx
// Seções principais: espaço generoso
// Elementos relacionados: espaço comprimido
<div className="space-y-16">          {/* entre seções */}
  <section className="space-y-8">    {/* dentro da seção */}
    <header className="space-y-2">  {/* dentro do header */}
```

---

## 4. Padrões que funcionam (use com consciência)

### 4.1 Âncora visual
Todo layout precisa de um elemento que domine — tamanho, cor ou posição. O olho precisa saber *onde começar*.

### 4.2 Assimetria intencional
`col-span-2` + `col-span-1` cria mais tensão visual do que `col-span-1` repetido. Use.

### 4.3 Linha de base e alinhamento de dados
Para dados numéricos, alinhe à direita. Para listas de texto, alinhe à esquerda. Nunca centralize tabelas.

### 4.4 Densidade variada
Uma seção densa (muita informação, espaço comprimido) ao lado de uma seção arejada cria ritmo. Evite densidade uniforme.

### 4.5 Bordas como separação, não como decoração
```tsx
// Borda como divisor tipográfico — sem shadow, sem rounded excessivo
<div className="border-t pt-4 mt-4">
```

---

## 5. Checklist antes de entregar um componente

Antes de finalizar, responda:

- [ ] Consigo identificar claramente o elemento de maior hierarquia visual?
- [ ] Tem algum `<Card>` que poderia ser substituído por espaço + tipografia?
- [ ] A escala tipográfica tem pelo menos 3 níveis distintos de peso/tamanho?
- [ ] Existe ao menos um elemento que quebra a simetria da grade?
- [ ] As cores têm função (hierarquia/atenção/estado) ou são só decoração?
- [ ] Se alguém ver este componente por 3 segundos, saberá o que fazer?
- [ ] Este componente poderia ter saído do v0.dev sem alteração? **(se sim, revise)**

---

## 6. Referência rápida — Tailwind classes problemáticas vs melhores alternativas

| Padrão genérico | Por que é ruim | Alternativa |
|---|---|---|
| `rounded-lg` em tudo | Uniformidade falsa de "modernidade" | Varie: `rounded-none`, `rounded-sm`, `rounded-2xl` com intenção |
| `shadow-sm` em todo card | Profundidade sem significado | Use sombra só para elementos elevados de verdade (modals, dropdowns) |
| `text-muted-foreground` em desc | Torna tudo secundário igualmente | Use opacidade gradual: `opacity-70`, `opacity-50` |
| `p-6` universal | Grade mecânica | Padding assimétrico: `px-6 py-4`, `pt-8 pb-4 px-6` |
| `gap-6` universal | Sem ritmo | Varie espaço por nível hierárquico |
| `font-semibold` para ênfase | Único grau de ênfase disponível | Combine `font-medium` + tamanho maior OU cor diferente |

---

## 7. Filosofia de base

> Uma interface *correta* é aquela que funciona.  
> Uma interface com *assinatura* é aquela que o usuário reconhece sem ver o logo.

A diferença não está em usar ferramentas diferentes. Está em fazer escolhas intencionais em vez de escolhas estatisticamente seguras.

**O shadcn/ui é um ponto de partida, não um destino.**  
Modifique os componentes. Quebre os defaults. Use as primitivas do Radix diretamente quando o wrapper do shadcn estiver te limitando.

A interface mais genérica possível é aquela onde o desenvolvedor nunca questionou o default.

---

*Versão 1.0 — Baseado em análise de padrões recorrentes de AI-generated UI com Next.js + Tailwind + shadcn/ui*
