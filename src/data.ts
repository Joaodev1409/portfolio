import {
  siC, siClaude, siDocker, siFlask, siFlyway, siGit, siGithub, siGooglegemini, siJavascript,
  siJira, siJunit5, siMysql, siNodedotjs, siOpenjdk, siPandas, siPostgresql, siPostman,
  siPython, siReact, siRender, siSpringboot, siSpringsecurity, siSqlalchemy, siTypescript,
  siVercel, siVite, siHtml5, siCss,
} from 'simple-icons'

export type Lang = 'pt' | 'en'
export type Icon = { title: string; path: string; hex: string }

export const profile = {
  name: 'João Victor',
  surname: 'Guimarães',
  city: 'Campina Grande, PB',
  email: 'joaovictorsag@hotmail.com',
  github: 'https://github.com/Joaodev1409',
  linkedin: 'https://www.linkedin.com/in/joaovictorgdev',
  cv: '/curriculo-joao-victor.pdf',
}

// Partes que não mudam com o idioma: números, ícones, código e links.
const statValues = [
  { value: 1200, prefix: '+', suffix: '' },
  { value: 73, prefix: '−', suffix: '%' },
  { value: 59, prefix: '', suffix: '' },
]

const stackItems: Record<string, { name: string; icon?: Icon }[]> = {
  backend: [
    { name: 'Java', icon: siOpenjdk },
    { name: 'Spring Boot', icon: siSpringboot },
    { name: 'Spring Security', icon: siSpringsecurity },
    { name: 'Python', icon: siPython },
    { name: 'Flask', icon: siFlask },
    { name: 'Node.js', icon: siNodedotjs },
  ],
  data: [
    { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'MySQL', icon: siMysql },
    { name: 'SQLAlchemy', icon: siSqlalchemy },
    { name: 'Flyway', icon: siFlyway },
    { name: 'Pandas', icon: siPandas },
  ],
  frontend: [
    { name: 'React', icon: siReact },
    { name: 'TypeScript', icon: siTypescript },
    { name: 'JavaScript', icon: siJavascript },
    { name: 'Vite', icon: siVite },
    { name: 'HTML', icon: siHtml5 },
    { name: 'CSS', icon: siCss },
  ],
  devops: [
    { name: 'JUnit', icon: siJunit5 },
    { name: 'Docker', icon: siDocker },
    { name: 'Git', icon: siGit },
    { name: 'GitHub', icon: siGithub },
    { name: 'Render', icon: siRender },
    { name: 'Vercel', icon: siVercel },
    { name: 'Postman', icon: siPostman },
  ],
  ai: [
    { name: 'Claude Code', icon: siClaude },
    { name: 'Gemini', icon: siGooglegemini },
  ],
  base: [
    { name: 'POO / OOP' }, { name: 'SOLID' }, { name: 'GRASP' }, { name: 'Design Patterns' },
    { name: 'C', icon: siC }, { name: 'Jira', icon: siJira },
  ],
}

const projectBase = {
  monitoria: {
    index: '01',
    href: 'https://monitoria-map.vercel.app',
    code: [
      '@GetMapping(path = "/fila/stream",',
      '    produces = TEXT_EVENT_STREAM_VALUE)',
      'public SseEmitter acompanhar() {',
      '  return notificador.inscrever();',
      '}',
    ],
  },
  matricula: {
    index: '02',
    code: [
      'contrato.assinar(responsavel)',
      '        .assinar(colegio)',
      '        .validar();',
      '// fila na secretaria: 0',
    ],
  },
  sefaz: {
    index: '03',
    code: [
      'with ProcessPoolExecutor() as pool:',
      '    status = list(pool.map(',
      '        consultar_carga, servidores',
      '    ))',
    ],
  },
  etl: {
    index: '04',
    code: [
      'df = extrair(sponte, "/financeiro")',
      'df = transformar(df)',
      'carregar(df, destino="bi.mensalidades")',
    ],
  },
  progclub: {
    index: '05',
    code: [
      'if (resposta.correta()) {',
      '  aluno.ganharXp(10);',
      '  sequencia.incrementar();',
      '}',
    ],
  },
} as const

type ProjectId = keyof typeof projectBase

export type StackGroup = { id: string; title: string; blurb: string; items: { name: string; icon?: Icon }[] }

export type Project = {
  id: ProjectId
  index: string
  title: string
  context: string
  summary: string
  tags: string[]
  metric?: string
  link?: { href: string; label: string }
  code: readonly string[]
}

// Textos de cada idioma. Trechos entre *asteriscos* viram <em>, na fonte serifada.
const texts = {
  pt: {
    meta: {
      title: 'João Victor Guimarães · Desenvolvedor',
      description: 'Portfólio de João Victor Guimarães, estudante de Ciência da Computação na UEPB e desenvolvedor back-end e de dados: Java, Spring Boot, Python, SQL e React.',
    },
    nav: {
      links: ['Sobre', 'Stack', 'Projetos', 'Trajetória', 'Contato'],
      top: 'Voltar ao topo',
      sections: 'Seções',
      menu: 'Menu',
      toLight: 'Mudar para tema claro',
      toDark: 'Mudar para tema escuro',
      lang: 'Switch to English',
    },
    preloader: 'João Victor · portfólio',
    hero: {
      available: 'Aberto a estágio em back-end e dados',
      lede: 'Desenvolvo *back-ends*, pipelines de *dados* e as interfaces em cima deles. Java, Spring Boot, Python e SQL no dia a dia, React quando o usuário precisa ver o resultado.',
      projects: 'Ver projetos',
      projectsCursor: 'Ir',
      cv: 'Currículo',
      scroll: 'role',
    },
    marquee: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'Flask', 'JUnit', 'SQL', 'ETL', 'APIs REST', 'Claude Code'],
    marqueeLabel: 'Tecnologias',
    about: {
      eyebrow: 'Sobre',
      statement:
        'Estudo Ciência da Computação na UEPB e gosto do código que resolve um problema de verdade. Já tirei uma secretaria inteira da fila com matrícula online, construí o back-end que monitora as notas fiscais da SEFAZ-PB e cortei 73% da latência dele, e hoje ensino padrões de projeto como monitor. Uso IA no desenvolvimento, sem deixar de entender cada linha que vai para produção.',
      stats: [
        'matrículas pelo sistema online que ajudei a construir',
        'no tempo médio das requisições do monitoramento de notas fiscais da SEFAZ-PB',
        'testes automatizados no Monitoria MAP, com JUnit e Testcontainers',
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Ferramentas que eu *coloco em produção*',
      groups: {
        backend: ['Back-end', 'APIs REST com Java 17 e Spring Boot 3, segurança com OAuth2 e persistência com JPA.'],
        data: ['Dados', 'Modelagem relacional, migrações versionadas e ETL que vira dashboard de decisão.'],
        frontend: ['Front-end', 'Interfaces em React com TypeScript, do formulário de matrícula a esta página.'],
        devops: ['Testes & DevOps', 'Testes de integração com banco real em contêiner e deploy contínuo.'],
        ai: ['IA aplicada', 'Desenvolvo com agentes e escrevo skills para eles. Embaixador Google Estudantil.'],
        base: ['Fundamentos', 'O que eu ensino na monitoria e cobro de mim no code review.'],
      },
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Problemas reais, *resolvidos*',
      more: 'e mais',
      moreTitle: 'Todos os repositórios no GitHub',
      open: 'Abrir',
      live: 'Ver no ar',
      items: {
        monitoria: {
          title: 'Monitoria MAP',
          context: 'UEPB · 2026',
          summary: 'Os pedidos de ajuda se perdiam em grupos de mensagem. Virou uma fila de atendimento que avisa os monitores em tempo real (SSE, e-mail e notificação do navegador) e gera o relatório da monitoria em CSV.',
          tags: ['Java 17', 'Spring Boot 3', 'OAuth2', 'PostgreSQL', 'React + TS', 'Docker'],
          metric: '59 testes',
        },
        matricula: {
          title: 'Matrícula online',
          context: 'Colégio Panorama · 2025',
          summary: 'A matrícula era 100% presencial, com fila e secretaria sobrecarregada. Construí com a equipe o sistema online, com assinatura digital do responsável e do colégio para dar validade jurídica ao contrato.',
          tags: ['Requisitos', 'Assinatura digital', 'PostgreSQL', 'Produção'],
          metric: '+1.200 matrículas',
        },
        sefaz: {
          title: 'Sistema de monitoramento de notas fiscais SEFAZ-PB',
          context: 'Nutes-PB · 2025–2026',
          summary: 'Construí todo o back-end do projeto em Flask: status dos bancos fiscais, histórico de cargas e dashboard. As consultas percorriam os servidores um a um; paralelizei as chamadas e reescrevi as queries SQL, reduzindo em 73% o tempo médio das requisições.',
          tags: ['Python', 'Flask', 'SQLAlchemy', 'pyodbc', 'SQL'],
          metric: '−73% de latência',
        },
        etl: {
          title: 'ETL Sponte → BI',
          context: 'Colégio Panorama · 2025',
          summary: 'Rotinas em Python que extraem dados da API do Sponte e alimentam o BI interno, com dashboards financeiros e pedagógicos que a direção usa para decidir.',
          tags: ['Python', 'Pandas', 'ETL', 'Dashboards'],
          metric: 'BI da direção',
        },
        progclub: {
          title: 'ProgClubCG',
          context: 'Extensão UEPB · 2025',
          summary: 'Aplicativo gamificado no estilo Duolingo para ensinar Java e orientação a objetos, planejado em sprints com a equipe do projeto de extensão.',
          tags: ['Java', 'POO', 'Gamificação', 'Sprints'],
        },
      },
    },
    experience: {
      eyebrow: 'Trajetória',
      title: 'Onde eu *aprendi fazendo*',
      items: [
        { period: '08/2026 — agora', role: 'Monitor de Métodos Avançados em Programação', org: 'UEPB', text: 'Apoio estudantes em padrões de projeto, SOLID, GRASP e POO, e criei o Monitoria MAP para organizar os atendimentos.' },
        { period: '2026 — agora', role: 'Embaixador Google Estudantil', org: 'Google · campus UEPB', text: 'Workshops e eventos no campus sobre ferramentas de IA do Google, como Gemini e NotebookLM.' },
        { period: '08/2025 — agora', role: 'Estagiário de TI', org: 'Colégio Panorama', text: 'Matrícula online da concepção ao ar, ETL do Sponte para o BI, servidores e aplicações em produção com PostgreSQL.' },
        { period: '08/2025 — 09/2026', role: 'Estagiário de Desenvolvimento Full Stack', org: 'Nutes-PB · remoto', text: 'Construí todo o back-end do sistema de monitoramento de notas fiscais da SEFAZ-PB em Flask, com queda de 73% na latência; no front, telas de cargas e exportação. Code review e sprints no Jira.' },
        { period: '2025 — agora', role: 'Desenvolvedor no ProgClubCG', org: 'Projeto de extensão · UEPB', text: 'App gamificado para o ensino de Java e POO.' },
        { period: 'até 2028', role: 'Bacharelado em Ciência da Computação', org: 'Universidade Estadual da Paraíba', text: 'Hackathons e competições de programação pelo caminho.' },
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Vamos *conversar?*',
      copy: 'clique para copiar',
      copied: 'copiado ✓',
      cursorCopy: 'Copiar',
      cursorCopied: 'Copiado',
      toast: 'E-mail copiado para a área de transferência',
      email: 'E-mail',
      social: 'Redes',
      made: 'Feito com React, TypeScript e GSAP',
      top: 'Voltar ao topo ↑',
    },
  },
  en: {
    meta: {
      title: 'João Victor Guimarães · Developer',
      description: 'Portfolio of João Victor Guimarães, Computer Science student at UEPB and back-end and data developer: Java, Spring Boot, Python, SQL and React.',
    },
    nav: {
      links: ['About', 'Stack', 'Projects', 'Journey', 'Contact'],
      top: 'Back to top',
      sections: 'Sections',
      menu: 'Menu',
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
      lang: 'Mudar para português',
    },
    preloader: 'João Victor · portfolio',
    hero: {
      available: 'Open to back-end and data internships',
      lede: 'I build *back-ends*, *data* pipelines and the interfaces on top of them. Java, Spring Boot, Python and SQL day to day, React when users need to see the result.',
      projects: 'See projects',
      projectsCursor: 'Go',
      cv: 'Résumé (PT)',
      scroll: 'scroll',
    },
    marquee: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'Flask', 'JUnit', 'SQL', 'ETL', 'REST APIs', 'Claude Code'],
    marqueeLabel: 'Technologies',
    about: {
      eyebrow: 'About',
      statement:
        "I study Computer Science at UEPB and I like code that solves a real problem. I've taken a whole front desk out of the queue with online enrollment, built the back-end that monitors invoices for SEFAZ-PB (Paraíba's tax authority) and cut its latency by 73%, and today I teach design patterns as a teaching assistant. I use AI to build software without losing track of a single line that goes to production.",
      stats: [
        'enrollments through the online system I helped build',
        'in average request time for the SEFAZ-PB invoice monitoring system',
        'automated tests in Monitoria MAP, with JUnit and Testcontainers',
      ],
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Tools I *ship to production*',
      groups: {
        backend: ['Back-end', 'REST APIs with Java 17 and Spring Boot 3, OAuth2 security and JPA persistence.'],
        data: ['Data', 'Relational modeling, versioned migrations and ETL that turns into decision dashboards.'],
        frontend: ['Front-end', 'React interfaces with TypeScript, from an enrollment form to this very page.'],
        devops: ['Testing & DevOps', 'Integration tests against a real database in a container, and continuous deployment.'],
        ai: ['Applied AI', 'I build with agents and write skills for them. Google Student Ambassador.'],
        base: ['Fundamentals', 'What I teach as a TA and hold myself to in code review.'],
      },
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Real problems, *solved*',
      more: 'and more',
      moreTitle: 'Every repository on GitHub',
      open: 'Open',
      live: 'See it live',
      items: {
        monitoria: {
          title: 'Monitoria MAP',
          context: 'UEPB · 2026',
          summary: 'Students’ help requests got lost in group chats. It became a support queue that notifies TAs in real time (SSE, e-mail and browser notifications) and generates the TA report as CSV.',
          tags: ['Java 17', 'Spring Boot 3', 'OAuth2', 'PostgreSQL', 'React + TS', 'Docker'],
          metric: '59 tests',
        },
        matricula: {
          title: 'Online enrollment',
          context: 'Colégio Panorama · 2025',
          summary: 'Enrollment was 100% in person, with queues and an overloaded front desk. With the team I built the online system, with digital signatures from both guardian and school to make the contract legally binding.',
          tags: ['Requirements', 'Digital signature', 'PostgreSQL', 'Production'],
          metric: '1,200+ enrollments',
        },
        sefaz: {
          title: 'SEFAZ-PB invoice monitoring system',
          context: 'Nutes-PB · 2025–2026',
          summary: 'I built the entire back-end in Flask: tax database status, load history and dashboard. Queries hit the servers one at a time; I parallelized the calls and rewrote the SQL, cutting average request time by 73%.',
          tags: ['Python', 'Flask', 'SQLAlchemy', 'pyodbc', 'SQL'],
          metric: '−73% latency',
        },
        etl: {
          title: 'Sponte → BI ETL',
          context: 'Colégio Panorama · 2025',
          summary: 'Python jobs that pull data from the Sponte API into the internal BI, with financial and academic dashboards the school board uses to make decisions.',
          tags: ['Python', 'Pandas', 'ETL', 'Dashboards'],
          metric: 'Board-level BI',
        },
        progclub: {
          title: 'ProgClubCG',
          context: 'UEPB outreach · 2025',
          summary: 'A gamified, Duolingo-style app for teaching Java and object-oriented programming, planned in sprints with the outreach project team.',
          tags: ['Java', 'OOP', 'Gamification', 'Sprints'],
        },
      },
    },
    experience: {
      eyebrow: 'Journey',
      title: 'Where I *learned by doing*',
      items: [
        { period: '08/2026 — now', role: 'Teaching Assistant, Advanced Programming Methods', org: 'UEPB', text: 'I help students with design patterns, SOLID, GRASP and OOP, and built Monitoria MAP to organize the sessions.' },
        { period: '2026 — now', role: 'Google Student Ambassador', org: 'Google · UEPB campus', text: 'Workshops and campus events on Google AI tools such as Gemini and NotebookLM.' },
        { period: '08/2025 — now', role: 'IT Intern', org: 'Colégio Panorama', text: 'Online enrollment from concept to launch, Sponte-to-BI ETL, servers and production apps on PostgreSQL.' },
        { period: '08/2025 — 09/2026', role: 'Full Stack Development Intern', org: 'Nutes-PB · remote', text: 'Built the entire back-end of the SEFAZ-PB invoice monitoring system in Flask, cutting latency by 73%; on the front end, load screens and data export. Code review and Jira sprints.' },
        { period: '2025 — now', role: 'Developer at ProgClubCG', org: 'Outreach project · UEPB', text: 'Gamified app for teaching Java and OOP.' },
        { period: 'until 2028', role: 'B.Sc. in Computer Science', org: 'State University of Paraíba', text: 'Hackathons and programming contests along the way.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's *talk?*",
      copy: 'click to copy',
      copied: 'copied ✓',
      cursorCopy: 'Copy',
      cursorCopied: 'Copied',
      toast: 'E-mail copied to clipboard',
      email: 'E-mail',
      social: 'Social',
      made: 'Built with React, TypeScript and GSAP',
      top: 'Back to top ↑',
    },
  },
}

export type Content = ReturnType<typeof buildContent>

function buildContent(lang: Lang) {
  const t = texts[lang]
  return {
    ...t,
    locale: lang === 'pt' ? 'pt-BR' : 'en-US',
    stats: statValues.map((s, i) => ({ ...s, label: t.about.stats[i] })),
    stackGroups: Object.entries(t.stack.groups).map(([id, [title, blurb]]): StackGroup => ({ id, title, blurb, items: stackItems[id] })),
    projectList: (Object.keys(projectBase) as ProjectId[]).map((id): Project => {
      const base = projectBase[id]
      const p = t.projects.items[id]
      return {
        id,
        index: base.index,
        code: base.code,
        ...p,
        link: 'href' in base ? { href: base.href, label: t.projects.live } : undefined,
      }
    }),
  }
}

export const content: Record<Lang, Content> = { pt: buildContent('pt'), en: buildContent('en') }
