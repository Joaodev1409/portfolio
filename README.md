# Portfólio · João Victor Guimarães

Site pessoal com minha stack, projetos e trajetória.

**Stack:** React 19, TypeScript, Vite, GSAP (ScrollTrigger e SplitText), Lenis.

## Efeitos

- Preloader com contador e cortina em colunas
- Grade de pontos em canvas que reage ao cursor e ao toque
- Nome com entrada letra a letra (SplitText) e parallax na rolagem
- Rolagem suave (Lenis) sincronizada com o ScrollTrigger
- Marquee que acelera e inverte com a velocidade da rolagem
- Texto do "Sobre" que acende palavra por palavra e contadores animados
- Cards da stack em bento, com luz que segue o cursor e inclinação 3D
- Projetos em scroll horizontal fixado no desktop e empilhados no celular
- Linha da trajetória que se desenha com a rolagem
- Cursor próprio, botões magnéticos, tema claro/escuro com View Transitions
- Respeita `prefers-reduced-motion`

## Rodar

```bash
npm install
npm run dev
```

Build de produção em `dist/` com `npm run build`. Os textos ficam em `src/data.ts`.
