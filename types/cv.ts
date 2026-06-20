export interface NavLink { href: string; label: string }
export interface Nav { brandName: string; links: NavLink[] }

export interface HeroStat { target: number; suffix: string; label: string }
export interface Hero {
  statusBadge: string
  name: string
  highlightedPart: string
  typewriterLines: string[]
  stats: HeroStat[]
}

export interface Skill { name: string; color: string }
export interface SkillGroup { icon: string; title: string; skills: Skill[] }
export interface Skills { description: string; groups: SkillGroup[] }

export interface Tag { name: string; color: string }
export interface Project {
  name?: string
  period?: string
  borderColor?: string
  bullets: string[]
  tags: Tag[]
}
export interface Job {
  company: string
  role: string
  period: string
  companyColor?: string
  dotColor?: string
  projects: Project[]
}

export interface Metric { value: string; label: string }

export interface Language { name: string; level: string; color: string }
export interface Education {
  school: string
  degree: string
  period: string
  languages: Language[]
}

export interface ContactField { key: string; value: string; valueColor: string }
export interface Contact {
  terminalUser: string
  fields: ContactField[]
  emailLink: string
  phoneLink: string
  phoneDisplay: string
}

export interface Footer { text: string }

export interface PdfFile { id: string; filename: string; label: string }
export interface PdfConfig { files: PdfFile[]; activeId: string }

export interface SeoConfig {
  title: string
  description: string
  author: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
}

export interface CvData {
  seo: SeoConfig
  nav: Nav
  hero: Hero
  skills: Skills
  experience: Job[]
  metrics: Metric[]
  education: Education
  contact: Contact
  footer: Footer
  pdf: PdfConfig
}
