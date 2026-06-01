export interface SiteConfigData {
  id: string;
  companyName: string;
  tagline: string;
  description: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroBadge: string;
  heroBackground: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  whatWeDoTitle: string;
  whatWeDoItems: string;
  whatWeDoClosing: string;
  whyUsTitle: string;
  whyUsSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  email: string;
  phone: string;
  address: string;
  footerTagline: string;
  primaryColor: string;
}

export interface ServiceData {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  bgColor: string;
  order: number;
  active: boolean;
}

export interface PillarData {
  id: string;
  title: string;
  desc: string;
  icon: string;
  gradient: string;
  accentColor: string;
  image: string;
  order: number;
  active: boolean;
}

export interface IndustryData {
  id: string;
  name: string;
  icon: string;
  desc: string;
  image: string;
  order: number;
  active: boolean;
}

export interface BlogData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  published: boolean;
}

export interface NavLinkData {
  id: string;
  label: string;
  href: string;
  order: number;
  active: boolean;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface InitData {
  siteConfig: SiteConfigData;
  services: ServiceData[];
  pillars: PillarData[];
  industries: IndustryData[];
  blogs: BlogData[];
  navLinks: NavLinkData[];
}
