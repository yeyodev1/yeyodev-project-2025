export interface TechSkill {
  name: string
  level: number
  description: string
}

export interface TechCategory {
  name: string
  icon: string
  color: string
  skills: TechSkill[]
}

export const techCategories: TechCategory[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    color: '#42b883',
    skills: [
      {
        name: 'Vue.js',
        level: 95,
        description: 'Framework progresivo — SPA, SSR, ecosistema completo',
      },
      { name: 'TypeScript', level: 92, description: 'Tipado robusto para apps a escala' },
      {
        name: 'Tailwind CSS',
        level: 90,
        description: 'Utilidades primero, diseño rápido y consistente',
      },
      { name: 'SCSS', level: 88, description: 'Arquitectura BEM, variables, mixins avanzados' },
      { name: 'Vite', level: 90, description: 'Build tool ultrarrápido con HMR instantáneo' },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: '#ff6b6b',
    skills: [
      { name: 'Node.js', level: 88, description: 'APIs REST, websockets, serverless' },
      { name: 'Express / Fastify', level: 85, description: 'Frameworks web ligeros y eficientes' },
      { name: 'MongoDB', level: 80, description: 'Esquemas flexibles, agregaciones, índices' },
      { name: 'PostgreSQL', level: 75, description: 'SQL relacional, consultas complejas' },
    ],
  },
  {
    name: 'AI & Data',
    icon: '🤖',
    color: '#f59e0b',
    skills: [
      {
        name: 'LLM Integration',
        level: 85,
        description: 'OpenAI, Claude, Gemini — APIs y fine-tuning',
      },
      { name: 'AI Training', level: 80, description: 'Entrené modelos en Scale AI para GPT-3/3.5' },
      {
        name: 'Data Pipelines',
        level: 75,
        description: 'ETL, automatización, procesamiento de datos',
      },
      { name: 'Python', level: 78, description: 'Scripting, análisis de datos, automatización' },
    ],
  },
  {
    name: 'Tools & DevOps',
    icon: '🛠️',
    color: '#4ecdc4',
    skills: [
      { name: 'Git', level: 92, description: 'Control de versiones, flujos colaborativos' },
      { name: 'Docker', level: 78, description: 'Contenedores, entornos reproducibles' },
      { name: 'Netlify / Vercel', level: 88, description: 'Deploy automático, edge functions' },
      { name: 'CI/CD', level: 82, description: 'Integración y despliegue continuo automatizado' },
    ],
  },
]
