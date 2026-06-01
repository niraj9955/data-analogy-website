import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// Auto-seed data on first visit (important for Vercel deployment with fresh MongoDB)
async function ensureSeedData() {
  let siteConfig = await db.siteConfig.findFirst()

  if (!siteConfig) {
    console.log('🌱 No site config found, auto-seeding database...')

    // Site Config
    siteConfig = await db.siteConfig.create({
      data: {
        companyName: 'Data Analogy',
        tagline: 'Turning Enterprise Data Into Scalable Solutions',
        description: 'Technology services company focused on SAP data migration, software development, and data analytics.',
        heroTitle: 'Turning Enterprise Data',
        heroHighlight: 'Into Scalable Solutions',
        heroSubtitle: 'We help organizations manage, migrate, and make sense of their data with secure, maintainable, and scalable technology solutions.',
        heroBadge: 'Enterprise Data Solutions',
        heroBackground: '/hero-bg.png',
        stat1Value: '50+',
        stat1Label: 'Projects Delivered',
        stat2Value: '99.9%',
        stat2Label: 'Data Accuracy',
        stat3Value: '24/7',
        stat3Label: 'Support',
        aboutTitle: 'Who We Are?',
        aboutText1: 'Data Analogy is a technology services company focused on helping organizations manage, migrate, and make sense of their data. We work with enterprises and growing businesses to deliver reliable SAP data migration, software development, and data analytics solutions.',
        aboutText2: 'Our approach is practical, transparent, and driven by real business requirements — not unnecessary complexity.',
        whatWeDoTitle: 'What We Do?',
        whatWeDoItems: 'SAP data migration with validation and data integrity checks|Custom web and software development tailored to business workflows|Data analytics solutions that turn raw data into actionable insights|Data-focused consulting to support scalable system architecture',
        whatWeDoClosing: 'We design solutions that are secure, maintainable, and built to scale.',
        whyUsTitle: 'Why Data Analogy?',
        whyUsSubtitle: 'We combine deep technical expertise with a practical approach to deliver solutions that work.',
        ctaTitle: 'Ready to modernize your data systems?',
        ctaSubtitle: "Let's discuss how Data Analogy can help transform your data infrastructure.",
        ctaButtonText: 'Talk to Our Experts',
        email: 'contact@dataanalogy.com',
        phone: '+1 (555) 123-4567',
        address: 'Global — Remote First',
        footerTagline: 'Turning enterprise data into scalable solutions. SAP Data Migration | Software Development | Data Analytics',
        primaryColor: 'cyan',
      },
    })
    console.log('✅ SiteConfig auto-seeded')

    // Nav Links
    const navCount = await db.navLink.count()
    if (navCount === 0) {
      await db.navLink.createMany({
        data: [
          { label: 'Home', href: '#home', order: 0 },
          { label: 'About', href: '#about', order: 1 },
          { label: 'Services', href: '#services', order: 2 },
          { label: 'Pillars', href: '#pillars', order: 3 },
          { label: 'Industries', href: '#industries', order: 4 },
          { label: 'Blog', href: '#blog', order: 5 },
          { label: 'Contact', href: '#contact', order: 6 },
        ],
      })
      console.log('✅ NavLinks auto-seeded')
    }

    // Services
    const svcCount = await db.service.count()
    if (svcCount === 0) {
      await db.service.createMany({
        data: [
          { title: 'SAP Data Migration', desc: 'Securely migrate to S/4HANA with zero data loss. We use automated validation for a risk-free transition.', icon: 'Database', color: 'text-cyan-600', bgColor: 'bg-cyan-50', order: 0 },
          { title: 'Mobile App Dev', desc: 'High-performance iOS & Android apps. Turn smartphones into your most powerful engagement channel.', icon: 'Smartphone', color: 'text-emerald-600', bgColor: 'bg-emerald-50', order: 1 },
          { title: 'Web Development', desc: 'Fast, SEO-optimized MERN stack sites. We build digital experiences that convert visitors into clients.', icon: 'Code2', color: 'text-orange-600', bgColor: 'bg-orange-50', order: 2 },
          { title: 'Software Dev', desc: 'Custom enterprise software tailored to your workflows. Build solutions that adapt to you.', icon: 'Cpu', color: 'text-purple-600', bgColor: 'bg-purple-50', order: 3 },
          { title: 'Data Analytics', desc: 'Transform raw data into actionable strategies. Stop guessing and start knowing with PowerBI.', icon: 'BarChart3', color: 'text-rose-600', bgColor: 'bg-rose-50', order: 4 },
          { title: 'Tech Consulting', desc: 'Strategic roadmaps for digital transformation. We help you cut costs and future-proof your stack.', icon: 'Lightbulb', color: 'text-amber-600', bgColor: 'bg-amber-50', order: 5 },
        ],
      })
      console.log('✅ Services auto-seeded')
    }

    // Pillars
    const pillarCount = await db.pillar.count()
    if (pillarCount === 0) {
      await db.pillar.createMany({
        data: [
          { title: 'PRECISION', desc: 'In data migration, 99.9% isn\'t good enough. We engineer automated validation scripts to ensure absolute zero-loss accuracy across your entire ecosystem.', icon: 'Target', gradient: 'from-red-500 to-red-700', accentColor: 'text-red-500', image: '/pillars/precision-new.png', order: 0 },
          { title: 'VELOCITY', desc: 'Speed is the new currency. We utilize CI/CD pipelines and modular architectures to deploy features in weeks, not months—without breaking production.', icon: 'Zap', gradient: 'from-yellow-400 to-amber-600', accentColor: 'text-amber-500', image: '/pillars/velocity-new.png', order: 1 },
          { title: 'SECURITY', desc: 'We don\'t add security at the end; we bake it in. From bank-grade encryption to role-based access control, your data is a fortress from day one.', icon: 'ShieldCheck', gradient: 'from-emerald-500 to-emerald-700', accentColor: 'text-emerald-500', image: '/pillars/security-new.png', order: 2 },
          { title: 'SCALABILITY', desc: 'We refuse to write dead-end code. Every system we build is architected to handle millions of requests, ensuring you never have to rebuild from scratch.', icon: 'Layers', gradient: 'from-cyan-500 to-teal-700', accentColor: 'text-teal-500', image: '/pillars/scalability-new.png', order: 3 },
        ],
      })
      console.log('✅ Pillars auto-seeded')
    }

    // Industries
    const indCount = await db.industry.count()
    if (indCount === 0) {
      await db.industry.createMany({
        data: [
          { name: 'Manufacturing', icon: 'Factory', desc: 'Data-driven systems for inventory, operations, and process optimization.', image: '/industries/Manufacturing.png', order: 0 },
          { name: 'School Learning Apps', icon: 'GraduationCap', desc: 'Scalable platforms for digital learning and student management.', image: '/industries/School Learning Apps.png', order: 1 },
          { name: 'ERP Modules', icon: 'Blocks', desc: 'Custom ERP components integrated with business systems.', image: '/industries/ERP Modules.png', order: 2 },
          { name: 'Online KPO Platforms', icon: 'Globe2', desc: 'Secure platforms supporting analytics and offshore operations.', image: '/industries/Online KPO Platforms.png', order: 3 },
          { name: 'Courier & Logistics', icon: 'Truck', desc: 'Shipment tracking and logistics data management systems.', image: '/industries/Courier & Logistics.png', order: 4 },
          { name: 'Medical', icon: 'Stethoscope', desc: 'Reliable software for healthcare data and compliance.', image: '/industries/Medical.png', order: 5 },
          { name: 'Online Delivery', icon: 'Package', desc: 'Order management and real-time delivery platforms.', image: '/industries/Online Delivery.png', order: 6 },
          { name: 'E-commerce', icon: 'ShoppingCart', desc: 'Scalable commerce platforms with analytics and integrations.', image: '/industries/E-commerce.png', order: 7 },
        ],
      })
      console.log('✅ Industries auto-seeded')
    }

    // Blogs
    const blogCount = await db.blog.count()
    if (blogCount === 0) {
      await db.blog.createMany({
        data: [
          { slug: 'sap-data-migration', title: 'SAP Data Migration: Key Challenges and Best Practices', excerpt: 'SAP data migration is a critical process for enterprises modernizing their systems.', content: 'SAP data migration involves transferring large volumes of structured business data between SAP systems or from legacy platforms.', category: 'SAP & Data', date: new Date('2026-01-12'), image: '/blogs/sap-data-migration.png' },
          { slug: 'data-accuracy-over-speed', title: 'Why Data Accuracy Matters More Than Speed in Enterprise Systems', excerpt: 'Fast systems are useless if the data behind them is inaccurate.', content: 'In enterprise environments, data accuracy directly impacts decision-making.', category: 'Enterprise Systems', date: new Date('2026-01-18'), image: '/blogs/data-accuracy-over-speed.png' },
          { slug: 'scalable-saas', title: 'Building Scalable SaaS Applications: Lessons from Real Projects', excerpt: 'Scalability is not just about handling more users — it is about designing systems that grow without breaking.', content: 'Scalable SaaS systems require careful architectural decisions from the beginning.', category: 'SaaS Engineering', date: new Date('2026-01-25'), image: '/blogs/scalable-saas.png' },
          { slug: 'data-analytics-decisions', title: 'How Data Analytics Drives Better Business Decisions', excerpt: 'Raw data has little value unless it is transformed into actionable insights.', content: 'Data analytics enables organizations to identify patterns, trends, and opportunities.', category: 'Data Analytics', date: new Date('2026-02-02'), image: '/blogs/data-analytics-decisions.png' },
          { slug: 'software-architecture-stability', title: 'The Role of Software Architecture in Long-Term System Stability', excerpt: 'Short-term development decisions impact long-term success.', content: 'Software architecture serves as the foundation for long-term system maintainability.', category: 'Software Engineering', date: new Date('2026-02-08'), image: '/blogs/software-architecture-stability.png' },
          { slug: 'data-validation-sap-migration', title: 'Understanding the Importance of Data Validation in SAP Migrations', excerpt: 'Data migration without validation can introduce silent errors.', content: 'Data validation plays a critical role in SAP migration projects.', category: 'SAP & Data', date: new Date('2026-01-10'), image: '/blogs/data-validation-sap-migration.png' },
        ],
      })
      console.log('✅ Blogs auto-seeded')
    }

    console.log('🎉 Auto-seed complete!')
  }

  return siteConfig
}

export async function GET() {
  try {
    const siteConfig = await ensureSeedData()

    const services = await db.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: { id: true, title: true, desc: true, icon: true, color: true, bgColor: true, order: true },
    })

    const pillars = await db.pillar.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: { id: true, title: true, desc: true, icon: true, gradient: true, accentColor: true, image: true, order: true },
    })

    const industries = await db.industry.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 8,
      select: { id: true, name: true, icon: true, desc: true, image: true, order: true },
    })

    const blogs = await db.blog.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 6,
      select: { id: true, slug: true, title: true, excerpt: true, category: true, author: true, date: true, image: true },
    })

    const navLinks = await db.navLink.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: { id: true, label: true, href: true, order: true },
    })

    return NextResponse.json({
      siteConfig,
      services,
      pillars,
      industries,
      blogs,
      navLinks,
    })
  } catch (error) {
    console.error('Failed to fetch site data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site data', details: String(error) },
      { status: 500 }
    )
  }
}
