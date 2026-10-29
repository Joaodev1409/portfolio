import {
  siC, siClaude, siDocker, siFlask, siFlyway, siGit, siGithub, siGooglegemini, siJavascript,
  siJira, siJunit5, siMysql, siNodedotjs, siOpenjdk, siPandas, siPostgresql, siPostman,
  siPython, siReact, siRender, siSpringboot, siSpringsecurity, siSqlalchemy, siTypescript,
  siVercel, siVite, siHtml5, siCss,
} from 'simple-icons'

export type Icon = { title: string; path: string; hex: string }

export const profile = {
  name: 'João Victor',
  surname: 'Guimarães',
  role: 'Desenvolvedor back-end & dados',
  city: 'Campina Grande, PB',
  email: 'joaovictorsag@hotmail.com',
  github: 'https://github.com/Joaodev1409',
  linkedin: 'https://www.linkedin.com/in/joaovictorgdev',
}

export const stats = [
  { value: 1200, prefix: '+', suffix: '', label: 'matrículas pelo sistema online que ajudei a construir' },
  { value: 73, prefix: '−', suffix: '%', label: 'no tempo médio das requisições do back-end do BDFISC' },
  { value: 59, prefix: '', suffix: '', label: 'testes automatizados no Monitoria MAP, com JUnit e Testcontainers' },
]

export type StackGroup = {
  id: string
  title: string
  blurb: string
  items: { name: string; icon?: Icon }[]
}

export const stack: StackGroup[] = [
  {
    id: 'backend',
    title: 'Back-end',
    blurb: 'APIs REST com Java 17 e Spring Boot 3, segurança com OAuth2 e persistência com JPA.',
    items: [
      { name: 'Java', icon: siOpenjdk },
      { name: 'Spring Boot', icon: siSpringboot },
      { name: 'Spring Security', icon: siSpringsecurity },
      { name: 'Python', icon: siPython },
      { name: 'Flask', icon: siFlask },
      { name: 'Node.js', icon: siNodedotjs },
    ],
  },
  {
    id: 'data',
    title: 'Dados',
    blurb: 'Modelagem relacional, migrações versionadas e ETL que vira dashboard de decisão.',
    items: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'MySQL', icon: siMysql },
      { name: 'SQLAlchemy', icon: siSqlalchemy },
      { name: 'Flyway', icon: siFlyway },
      { name: 'Pandas', icon: siPandas },
    ],
  },
  {
    id: 'frontend',
    title: 'Front-end',
    blurb: 'Interfaces em React com TypeScript, do formulário de matrícula a esta página.',
    items: [
      { name: 'React', icon: siReact },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'Vite', icon: siVite },
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    id: 'devops',
    title: 'Testes & DevOps',
    blurb: 'Testes de integração com banco real em contêiner e deploy contínuo.',
    items: [
      { name: 'JUnit', icon: siJunit5 },
      { name: 'Docker', icon: siDocker },
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'Render', icon: siRender },
      { name: 'Vercel', icon: siVercel },
      { name: 'Postman', icon: siPostman },
    ],
  },
  {
    id: 'ai',
    title: 'IA aplicada',
    blurb: 'Desenvolvo com agentes e escrevo skills para eles. Embaixador Google Estudantil.',
    items: [
      { name: 'Claude Code', icon: siClaude },
      { name: 'Gemini', icon: siGooglegemini },
    ],
  },
  {
    id: 'base',
    title: 'Fundamentos',
    blurb: 'O que eu ensino na monitoria e cobro de mim no code review.',
    items: [
      { name: 'POO' }, { name: 'SOLID' }, { name: 'GRASP' }, { name: 'Design Patterns' },
      { name: 'C', icon: siC }, { name: 'Jira', icon: siJira },
    ],
  },
]

export const marquee = [
  'Java', 'Spring Boot', 'Python', 'PostgreSQL', 'React', 'TypeScript', 'Docker',
  'Flask', 'JUnit', 'SQL', 'ETL', 'APIs REST', 'Claude Code',
]

export type Project = {
  id: string
  index: string
  title: string
  context: string
  summary: string
  tags: string[]
  metric?: string
  link?: { href: string; label: string }
  code: string[]
}

export const projects: Project[] = [
  {
    id: 'monitoria',
    index: '01',
    title: 'Monitoria MAP',
    context: 'UEPB · 2026',
    summary:
      'Os pedidos de ajuda se perdiam em grupos de mensagem. Virou uma fila de atendimento que avisa os monitores em tempo real (SSE, e-mail e notificação do navegador) e gera o relatório da monitoria em CSV.',
    tags: ['Java 17', 'Spring Boot 3', 'OAuth2', 'PostgreSQL', 'React + TS', 'Docker'],
    metric: '59 testes',
    link: { href: 'https://monitoria-map.vercel.app', label: 'Ver no ar' },
    code: [
      '@GetMapping(path = "/fila/stream",',
      '    produces = TEXT_EVENT_STREAM_VALUE)',
      'public SseEmitter acompanhar() {',
      '  return notificador.inscrever();',
      '}',
    ],
  },
  {
    id: 'matricula',
    index: '02',
    title: 'Matrícula online',
    context: 'Colégio Panorama · 2025',
    summary:
      'A matrícula era 100% presencial, com fila e secretaria sobrecarregada. Construí com a equipe o sistema online, com assinatura digital do responsável e do colégio para dar validade jurídica ao contrato.',
    tags: ['Requisitos', 'Assinatura digital', 'PostgreSQL', 'Produção'],
    metric: '+1.200 matrículas',
    code: [
      'contrato.assinar(responsavel)',
      '        .assinar(colegio)',
      '        .validar();',
      '// fila na secretaria: 0',
    ],
  },
  {
    id: 'bdfisc',
    index: '03',
    title: 'Monitor do BDFISC',
    context: 'Nutes-PB · 2025–2026',
    summary:
      'As consultas percorriam os servidores fiscais um a um. Paralelizei as chamadas e reescrevi as queries SQL do back-end em Flask, do qual fui o maior contribuidor.',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'pyodbc', 'SQL'],
    metric: '−73% de latência',
    code: [
      'with ProcessPoolExecutor() as pool:',
      '    status = list(pool.map(',
      '        consultar_carga, servidores',
      '    ))',
    ],
  },
  {
    id: 'etl',
    index: '04',
    title: 'ETL Sponte → BI',
    context: 'Colégio Panorama · 2025',
    summary:
      'Rotinas em Python que extraem dados da API do Sponte e alimentam o BI interno, com dashboards financeiros e pedagógicos que a direção usa para decidir.',
    tags: ['Python', 'Pandas', 'ETL', 'Dashboards'],
    metric: 'BI da direção',
    code: [
      'df = extrair(sponte, "/financeiro")',
      'df = transformar(df)',
      'carregar(df, destino="bi.mensalidades")',
    ],
  },
  {
    id: 'progclub',
    index: '05',
    title: 'ProgClubCG',
    context: 'Extensão UEPB · 2025',
    summary:
      'Aplicativo gamificado no estilo Duolingo para ensinar Java e orientação a objetos, planejado em sprints com a equipe do projeto de extensão.',
    tags: ['Java', 'POO', 'Gamificação', 'Sprints'],
    code: [
      'if (resposta.correta()) {',
      '  aluno.ganharXp(10);',
      '  sequencia.incrementar();',
      '}',
    ],
  },
]

export const experience = [
  {
    period: '08/2026 — agora',
    role: 'Monitor de Métodos Avançados em Programação',
    org: 'UEPB',
    text: 'Apoio estudantes em padrões de projeto, SOLID, GRASP e POO, e criei o Monitoria MAP para organizar os atendimentos.',
  },
  {
    period: '2026 — agora',
    role: 'Embaixador Google Estudantil',
    org: 'Google · campus UEPB',
    text: 'Workshops e eventos no campus sobre ferramentas de IA do Google, como Gemini e NotebookLM.',
  },
  {
    period: '08/2025 — agora',
    role: 'Estagiário de TI',
    org: 'Colégio Panorama',
    text: 'Matrícula online da concepção ao ar, ETL do Sponte para o BI, servidores e aplicações em produção com PostgreSQL.',
  },
  {
    period: '08/2025 — 09/2026',
    role: 'Estagiário de Desenvolvimento Full Stack',
    org: 'Nutes-PB · remoto',
    text: 'Back-end do monitoramento de cargas do BDFISC em Flask, telas de cargas e exportação no front, code review e sprints no Jira.',
  },
  {
    period: '2025 — agora',
    role: 'Desenvolvedor no ProgClubCG',
    org: 'Projeto de extensão · UEPB',
    text: 'App gamificado para o ensino de Java e POO.',
  },
  {
    period: 'até 2028',
    role: 'Bacharelado em Ciência da Computação',
    org: 'Universidade Estadual da Paraíba',
    text: 'Hackathons e competições de programação pelo caminho.',
  },
]
