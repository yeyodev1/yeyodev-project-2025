import { createI18n } from 'vue-i18n'

// Mensajes en español
const es = {
  nav: {
    projects: 'Proyectos',
    about: 'Sobre Mí',
    contact: 'Contacto'
  },
  buttons: {
    letsTalk: '¡Hablemos!',
    forRecruiters: 'Para Reclutadores',
    viewProjects: 'Ver Mis Proyectos',
    downloadCV: 'Descargar CV',
    contact: 'Contactar'
  },
  hero: {
    greeting: 'Hola, soy',
    name: 'Diego Reyes',
    roles: {
      frontend: 'Frontend Developer',
      fullstack: 'Fullstack Developer',
      uiux: 'UI/UX Designer'
    },
    description: 'Desarrollador de software especializado en crear experiencias web excepcionales con Vue.js, TypeScript y tecnologías modernas.',
    hiringBadge: {
      question: '¿Hiring?',
      action: 'Click aquí'
    }
  },
  projects: {
    badge: 'Portfolio',
    title: 'Mis',
    titleAccent: 'Proyectos',
    subtitle: 'Una colección de proyectos que demuestran mi experiencia en desarrollo frontend y fullstack',
    cta: {
      text: '¿Tienes un proyecto en mente? ¡Hablemos!',
      button: 'Contactar'
    }
  },
  about: {
    title: 'Sobre',
    titleAccent: 'Mí',
    intro: {
      paragraph1: '¡Hola! Soy <strong>Diego</strong>, un desarrollador de software con una profunda pasión por la <span class="about__highlight">arquitectura de sistemas</span> y la creación de experiencias de usuario memorables.',
      paragraph2: 'Mi enfoque se centra en escribir <span class="about__highlight">código limpio, escalable y bien documentado</span>, aplicando principios sólidos para construir productos que no solo funcionen hoy, sino que sean fáciles de mantener y evolucionar mañana.',
      paragraph3: 'Disfruto desentrañando problemas complejos y traduciendo ideas en soluciones tecnológicas robustas. Siempre estoy explorando nuevas herramientas y paradigmas para mantenerme a la vanguardia.'
    },
    achievements: {
      projects: 'Proyectos Completados',
      experience: 'Años de Experiencia',
      technologies: 'Tecnologías Dominadas',
      dedication: 'Dedicación'
    },
    skills: {
      architecture: 'Arquitectura de Software',
      cleanCode: 'Clean Code',
      agile: 'Metodologías Ágiles',
      leadership: 'Liderazgo Técnico',
      performance: 'Optimización de Performance',
      testing: 'Testing & QA'
    }
  },
  terminal: {
    trigger: {
      text: 'Abrir Terminal'
    },
    input: {
      placeholder: 'Escribe un comando...'
    },
    commands: {
      help: {
        description: 'Muestra todos los comandos disponibles',
        title: 'Comandos disponibles:',
        about: '  about        - Información personal de Diego',
        skills: '  skills       - Lista de tecnologías y habilidades',
        projects: '  projects     - Proyectos destacados',
        experience: '  experience   - Experiencia profesional',
        contact: '  contact      - Información de contacto',
        achievements: '  achievements - Logros y estadísticas',
        techStack: '  tech-stack   - Stack tecnológico actual',
        clear: '  clear        - Limpia la terminal',
        exit: '  exit         - Cierra la terminal',
        tip: 'Tip: Usa TAB para autocompletar comandos'
      }
    }
  },
  footer: {
    copyright: 'Todos los derechos reservados.',
    recruiter: {
      question: '¿Eres reclutador y solo quieres ver qué he hecho?',
      action: 'Presiona aquí para mi perfil completo'
    }
  }
}

// Mensajes en inglés
const en = {
  nav: {
    projects: 'Projects',
    about: 'About Me',
    contact: 'Contact'
  },
  buttons: {
    letsTalk: "Let's Talk!",
    forRecruiters: 'For Recruiters',
    viewProjects: 'View My Projects',
    downloadCV: 'Download CV',
    contact: 'Contact'
  },
  hero: {
    greeting: 'Hi, I\'m',
    name: 'Diego Reyes',
    roles: {
      frontend: 'Frontend Developer',
      fullstack: 'Fullstack Developer',
      uiux: 'UI/UX Designer'
    },
    description: 'Software developer specialized in creating exceptional web experiences with Vue.js, TypeScript and modern technologies.',
    hiringBadge: {
      question: 'Hiring?',
      action: 'Click here'
    }
  },
  projects: {
    badge: 'Portfolio',
    title: 'My',
    titleAccent: 'Projects',
    subtitle: 'A collection of projects that demonstrate my expertise in frontend and fullstack development',
    cta: {
      text: 'Have a project in mind? Let\'s talk!',
      button: 'Contact'
    }
  },
  about: {
    title: 'About',
    titleAccent: 'Me',
    intro: {
      paragraph1: 'Hello! I\'m <strong>Diego</strong>, a software developer with a deep passion for <span class="about__highlight">systems architecture</span> and creating memorable user experiences.',
      paragraph2: 'My approach focuses on writing <span class="about__highlight">clean, scalable and well-documented code</span>, applying solid principles to build products that not only work today, but are easy to maintain and evolve tomorrow.',
      paragraph3: 'I enjoy unraveling complex problems and translating ideas into robust technological solutions. I\'m always exploring new tools and paradigms to stay at the forefront.'
    },
    achievements: {
      projects: 'Completed Projects',
      experience: 'Years of Experience',
      technologies: 'Technologies Mastered',
      dedication: 'Dedication'
    },
    skills: {
      architecture: 'Software Architecture',
      cleanCode: 'Clean Code',
      agile: 'Agile Methodologies',
      leadership: 'Technical Leadership',
      performance: 'Performance Optimization',
      testing: 'Testing & QA'
    }
  },
  terminal: {
    trigger: {
      text: 'Open Terminal'
    },
    input: {
      placeholder: 'Type a command...'
    },
    commands: {
      help: {
        description: 'Shows all available commands',
        title: 'Available commands:',
        about: '  about        - Diego\'s personal information',
        skills: '  skills       - Technologies and skills list',
        projects: '  projects     - Featured projects',
        experience: '  experience   - Professional experience',
        contact: '  contact      - Contact information',
        achievements: '  achievements - Achievements and statistics',
        techStack: '  tech-stack   - Current tech stack',
        clear: '  clear        - Clear the terminal',
        exit: '  exit         - Close the terminal',
        tip: 'Tip: Use ↑↓ arrows to navigate through history'
      }
    }
  },
  footer: {
    copyright: 'All rights reserved.',
    recruiter: {
      question: 'Are you a recruiter and just want to see what I\'ve done?',
      action: 'Press here for my complete profile'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // idioma por defecto
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
})

export default i18n
export { es, en }