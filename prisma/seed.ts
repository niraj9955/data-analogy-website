import { db } from "../src/lib/db";

async function seed() {
  console.log("🌱 Seeding database (MongoDB)...");

  // ─── Site Config ─────────────────────────────────────────────────
  const existingConfig = await db.siteConfig.findFirst();
  if (!existingConfig) {
    await db.siteConfig.create({
      data: {
        companyName: "Data Analogy",
        tagline: "Turning Enterprise Data Into Scalable Solutions",
        description:
          "Technology services company focused on SAP data migration, software development, and data analytics.",
        heroTitle: "Turning Enterprise Data",
        heroHighlight: "Into Scalable Solutions",
        heroSubtitle:
          "We help organizations manage, migrate, and make sense of their data with secure, maintainable, and scalable technology solutions.",
        heroBadge: "Enterprise Data Solutions",
        heroBackground: "/hero-bg.png",
        stat1Value: "50+",
        stat1Label: "Projects Delivered",
        stat2Value: "99.9%",
        stat2Label: "Data Accuracy",
        stat3Value: "24/7",
        stat3Label: "Support",
        aboutTitle: "Who We Are?",
        aboutText1:
          "Data Analogy is a technology services company focused on helping organizations manage, migrate, and make sense of their data. We work with enterprises and growing businesses to deliver reliable SAP data migration, software development, and data analytics solutions.",
        aboutText2:
          "Our approach is practical, transparent, and driven by real business requirements — not unnecessary complexity.",
        whatWeDoTitle: "What We Do?",
        whatWeDoItems:
          "SAP data migration with validation and data integrity checks|Custom web and software development tailored to business workflows|Data analytics solutions that turn raw data into actionable insights|Data-focused consulting to support scalable system architecture",
        whatWeDoClosing:
          "We design solutions that are secure, maintainable, and built to scale.",
        whyUsTitle: "Why Data Analogy?",
        whyUsSubtitle:
          "We combine deep technical expertise with a practical approach to deliver solutions that work.",
        ctaTitle: "Ready to modernize your data systems?",
        ctaSubtitle:
          "Let's discuss how Data Analogy can help transform your data infrastructure.",
        ctaButtonText: "Talk to Our Experts",
        email: "contact@dataanalogy.com",
        phone: "+1 (555) 123-4567",
        address: "Global — Remote First",
        footerTagline:
          "Turning enterprise data into scalable solutions. SAP Data Migration | Software Development | Data Analytics",
        primaryColor: "cyan",
      },
    });
    console.log("✅ SiteConfig seeded");
  } else {
    console.log("⏭️ SiteConfig already exists, skipping");
  }

  // ─── Nav Links ────────────────────────────────────────────────────
  const navLinksData = [
    { label: "Home", href: "#home", order: 0 },
    { label: "About", href: "#about", order: 1 },
    { label: "Services", href: "#services", order: 2 },
    { label: "Pillars", href: "#pillars", order: 3 },
    { label: "Industries", href: "#industries", order: 4 },
    { label: "Blog", href: "#blog", order: 5 },
    { label: "Contact", href: "#contact", order: 6 },
  ];

  const existingNavLinks = await db.navLink.count();
  if (existingNavLinks === 0) {
    await db.navLink.createMany({ data: navLinksData });
    console.log("✅ NavLinks seeded");
  } else {
    console.log("⏭️ NavLinks already exist, skipping");
  }

  // ─── Services ─────────────────────────────────────────────────────
  const servicesData = [
    {
      title: "SAP Data Migration",
      desc: "Securely migrate to S/4HANA with zero data loss. We use automated validation for a risk-free transition.",
      icon: "Database",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      order: 0,
    },
    {
      title: "Mobile App Dev",
      desc: "High-performance iOS & Android apps. Turn smartphones into your most powerful engagement channel.",
      icon: "Smartphone",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      order: 1,
    },
    {
      title: "Web Development",
      desc: "Fast, SEO-optimized MERN stack sites. We build digital experiences that convert visitors into clients.",
      icon: "Code2",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      order: 2,
    },
    {
      title: "Software Dev",
      desc: "Custom enterprise software tailored to your workflows. Build solutions that adapt to you.",
      icon: "Cpu",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      order: 3,
    },
    {
      title: "Data Analytics",
      desc: "Transform raw data into actionable strategies. Stop guessing and start knowing with PowerBI.",
      icon: "BarChart3",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      order: 4,
    },
    {
      title: "Tech Consulting",
      desc: "Strategic roadmaps for digital transformation. We help you cut costs and future-proof your stack.",
      icon: "Lightbulb",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      order: 5,
    },
  ];

  const existingServices = await db.service.count();
  if (existingServices === 0) {
    await db.service.createMany({ data: servicesData });
    console.log("✅ Services seeded");
  } else {
    console.log("⏭️ Services already exist, skipping");
  }

  // ─── Pillars ──────────────────────────────────────────────────────
  const pillarsData = [
    {
      title: "PRECISION",
      desc: "In data migration, 99.9% isn't good enough. We engineer automated validation scripts to ensure absolute zero-loss accuracy across your entire ecosystem.",
      icon: "Target",
      gradient: "from-red-500 to-red-700",
      accentColor: "text-red-500",
      image: "/pillars/precision-new.png",
      order: 0,
    },
    {
      title: "VELOCITY",
      desc: "Speed is the new currency. We utilize CI/CD pipelines and modular architectures to deploy features in weeks, not months—without breaking production.",
      icon: "Zap",
      gradient: "from-yellow-400 to-amber-600",
      accentColor: "text-amber-500",
      image: "/pillars/velocity-new.png",
      order: 1,
    },
    {
      title: "SECURITY",
      desc: "We don't add security at the end; we bake it in. From bank-grade encryption to role-based access control, your data is a fortress from day one.",
      icon: "ShieldCheck",
      gradient: "from-emerald-500 to-emerald-700",
      accentColor: "text-emerald-500",
      image: "/pillars/security-new.png",
      order: 2,
    },
    {
      title: "SCALABILITY",
      desc: "We refuse to write dead-end code. Every system we build is architected to handle millions of requests, ensuring you never have to rebuild from scratch.",
      icon: "Layers",
      gradient: "from-cyan-500 to-teal-700",
      accentColor: "text-teal-500",
      image: "/pillars/scalability-new.png",
      order: 3,
    },
  ];

  const existingPillars = await db.pillar.count();
  if (existingPillars === 0) {
    await db.pillar.createMany({ data: pillarsData });
    console.log("✅ Pillars seeded");
  } else {
    console.log("⏭️ Pillars already exist, skipping");
  }

  // ─── Industries ───────────────────────────────────────────────────
  const industriesData = [
    { name: "Manufacturing", icon: "Factory", desc: "Data-driven systems for inventory, operations, and process optimization.", image: "/industries/Manufacturing.png", order: 0 },
    { name: "School Learning Apps", icon: "GraduationCap", desc: "Scalable platforms for digital learning and student management.", image: "/industries/School Learning Apps.png", order: 1 },
    { name: "ERP Modules", icon: "Blocks", desc: "Custom ERP components integrated with business systems.", image: "/industries/ERP Modules.png", order: 2 },
    { name: "Online KPO Platforms", icon: "Globe2", desc: "Secure platforms supporting analytics and offshore operations.", image: "/industries/Online KPO Platforms.png", order: 3 },
    { name: "Courier & Logistics", icon: "Truck", desc: "Shipment tracking and logistics data management systems.", image: "/industries/Courier & Logistics.png", order: 4 },
    { name: "Medical", icon: "Stethoscope", desc: "Reliable software for healthcare data and compliance.", image: "/industries/Medical.png", order: 5 },
    { name: "Online Delivery", icon: "Package", desc: "Order management and real-time delivery platforms.", image: "/industries/Online Delivery.png", order: 6 },
    { name: "E-commerce", icon: "ShoppingCart", desc: "Scalable commerce platforms with analytics and integrations.", image: "/industries/E-commerce.png", order: 7 },
    { name: "Education Portals", icon: "BookOpen", desc: "Institutional portals for content, users, and reporting.", image: "/industries/Education Portals.png", order: 8 },
    { name: "Job Portals", icon: "Briefcase", desc: "Systems for job listings and candidate data workflows.", image: "/industries/Job Portals.png", order: 9 },
    { name: "Multi-Service Platforms", icon: "Layers", desc: "Unified platforms managing multiple services efficiently.", image: "/industries/Multi-Service Platforms.png", order: 10 },
    { name: "Professional Websites", icon: "Monitor", desc: "High-performance websites for business presence.", image: "/industries/Professional Websites.png", order: 11 },
    { name: "Online Dating", icon: "Heart", desc: "Secure and scalable user-driven platforms.", image: "/industries/Online Dating.png", order: 12 },
    { name: "Local Listing", icon: "MapPin", desc: "Location-based discovery and listing platforms.", image: "/industries/Local Listing.png", order: 13 },
    { name: "SaaS System", icon: "Cloud", desc: "Cloud-ready SaaS applications built to scale.", image: "/industries/SaaS System.png", order: 14 },
    { name: "Community Platforms", icon: "Users", desc: "Engagement-focused platforms for user interaction.", image: "/industries/Community Platforms.png", order: 15 },
  ];

  const existingIndustries = await db.industry.count();
  if (existingIndustries === 0) {
    await db.industry.createMany({ data: industriesData });
    console.log("✅ Industries seeded");
  } else {
    console.log("⏭️ Industries already exist, skipping");
  }

  // ─── Blogs ────────────────────────────────────────────────────────
  const blogsData = [
    { slug: "sap-data-migration", title: "SAP Data Migration: Key Challenges and Best Practices", excerpt: "SAP data migration is a critical process for enterprises modernizing their systems. Understanding the challenges early can significantly reduce risk and downtime.", content: "SAP data migration involves transferring large volumes of structured business data between SAP systems or from legacy platforms. While the process is essential for modernization, it also carries significant risks if not handled correctly.\n\nCommon challenges include data inconsistency, incomplete mappings, and performance bottlenecks during migration. Enterprises often underestimate the complexity of validation and reconciliation, leading to operational issues post-migration.\n\nBest practices include conducting detailed data profiling, defining clear migration rules, and implementing automated validation checks. A phased migration approach with continuous testing ensures data accuracy and business continuity.", category: "SAP & Data", date: new Date("2026-01-12"), image: "/blogs/sap-data-migration.png" },
    { slug: "data-accuracy-over-speed", title: "Why Data Accuracy Matters More Than Speed in Enterprise Systems", excerpt: "Fast systems are useless if the data behind them is inaccurate. Enterprises must prioritize data correctness over raw performance.", content: "In enterprise environments, data accuracy directly impacts decision-making, reporting, and operational efficiency. While performance optimization is important, inaccurate data can lead to far greater business losses.", category: "Enterprise Systems", date: new Date("2026-01-18"), image: "/blogs/data-accuracy-over-speed.png" },
    { slug: "scalable-saas", title: "Building Scalable SaaS Applications: Lessons from Real Projects", excerpt: "Scalability is not just about handling more users — it is about designing systems that grow without breaking.", content: "Scalable SaaS systems require careful architectural decisions from the beginning. Many applications fail not due to lack of features, but because they were not designed to handle growth.", category: "SaaS Engineering", date: new Date("2026-01-25"), image: "/blogs/scalable-saas.png" },
    { slug: "data-analytics-decisions", title: "How Data Analytics Drives Better Business Decisions", excerpt: "Raw data has little value unless it is transformed into actionable insights that guide decision-making.", content: "Data analytics enables organizations to identify patterns, trends, and opportunities hidden within large datasets.", category: "Data Analytics", date: new Date("2026-02-02"), image: "/blogs/data-analytics-decisions.png" },
    { slug: "software-architecture-stability", title: "The Role of Software Architecture in Long-Term System Stability", excerpt: "Short-term development decisions impact long-term success.", content: "Software architecture serves as the foundation for long-term system maintainability and scalability.", category: "Software Engineering", date: new Date("2026-02-08"), image: "/blogs/software-architecture-stability.png" },
    { slug: "data-validation-sap-migration", title: "Understanding the Importance of Data Validation in SAP Migrations", excerpt: "Data migration without validation can introduce silent errors that impact business operations long after go-live.", content: "Data validation plays a critical role in SAP migration projects, ensuring that migrated data remains accurate, complete, and consistent across systems.", category: "SAP & Data", date: new Date("2026-01-10"), image: "/blogs/data-validation-sap-migration.png" },
    { slug: "system-modernization-mistakes", title: "Common Mistakes Enterprises Make During System Modernization", excerpt: "Modernizing legacy systems requires more than adopting new technologies—it requires careful planning and execution.", content: "Many enterprises begin modernization projects with ambitious goals but overlook foundational challenges such as data quality, integration complexity, and user readiness.", category: "Enterprise Systems", date: new Date("2026-01-14"), image: "/blogs/system-modernization-mistakes.png" },
    { slug: "data-centric-system-design", title: "Designing Software Systems with Data at the Core", excerpt: "Data-centric design ensures that software systems remain scalable, reliable, and adaptable.", content: "Modern software systems increasingly depend on data as their primary asset. Designing with data at the core means prioritizing data models, consistency, and flow before building features.", category: "Software Engineering", date: new Date("2026-01-18"), image: "/blogs/data-centric-system-design.png" },
    { slug: "clean-data-analytics", title: "Why Clean Data Is the Foundation of Effective Analytics", excerpt: "Analytics outcomes are only as reliable as the data they are built upon.", content: "Organizations often invest heavily in analytics tools while underestimating the importance of data cleanliness.", category: "Data Analytics", date: new Date("2026-01-22"), image: "/blogs/clean-data-analytics.png" },
    { slug: "enterprise-scalability-challenges", title: "Scalability Challenges in Growing Enterprise Applications", excerpt: "Growth exposes architectural weaknesses that were previously manageable.", content: "As enterprise applications grow, scalability challenges become more apparent.", category: "Architecture", date: new Date("2026-01-26"), image: "/blogs/enterprise-scalability-challenges.png" },
    { slug: "automation-data-migration", title: "The Role of Automation in Data Migration Projects", excerpt: "Automation reduces risk, improves accuracy, and accelerates migration timelines.", content: "Manual data migration processes are time-consuming and prone to error. Automation streamlines repetitive tasks.", category: "Data Migration", date: new Date("2026-01-30"), image: "/blogs/automation-data-migration.png" },
    { slug: "secure-enterprise-applications", title: "Building Secure Enterprise Applications from Day One", excerpt: "Security cannot be treated as an afterthought in modern system design.", content: "Enterprise applications often handle sensitive data, making security a fundamental design requirement.", category: "Security", date: new Date("2026-02-03"), image: "/blogs/secure-enterprise-applications.png" },
    { slug: "erp-customization-maintainability", title: "How ERP Customization Impacts Long-Term Maintainability", excerpt: "Over-customization can limit flexibility and increase operational costs.", content: "ERP systems often require customization to meet specific business needs. However, excessive customization complicates upgrades.", category: "ERP Systems", date: new Date("2026-02-07"), image: "/blogs/erp-customization-maintainability.png" },
    { slug: "data-governance-enterprises", title: "Data Governance: Why Enterprises Can't Ignore It Anymore", excerpt: "As data volumes grow, governance becomes essential for control and accountability.", content: "Data governance establishes policies and standards that ensure data quality, security, and compliance.", category: "Data Governance", date: new Date("2026-02-11"), image: "/blogs/data-governance-enterprises.png" },
    { slug: "analytics-business-workflows", title: "Integrating Analytics into Everyday Business Workflows", excerpt: "Analytics delivers maximum value when embedded into daily operations.", content: "Standalone analytics tools often fail to influence decision-making because they are disconnected from operational workflows.", category: "Business Analytics", date: new Date("2026-02-15"), image: "/blogs/analytics-business-workflows.png" },
    { slug: "technical-debt-management", title: "Managing Technical Debt in Long-Running Systems", excerpt: "Unchecked technical debt slows innovation and increases maintenance costs.", content: "Technical debt accumulates when short-term solutions replace long-term planning.", category: "Software Engineering", date: new Date("2026-02-19"), image: "/blogs/technical-debt-management.png" },
    { slug: "saas-observability", title: "The Importance of Monitoring and Observability in SaaS Platforms", excerpt: "Visibility into system behavior enables proactive issue resolution.", content: "Monitoring and observability provide insights into application performance, reliability, and user experience.", category: "SaaS Engineering", date: new Date("2026-02-23"), image: "/blogs/saas-observability.png" },
    { slug: "data-integration-challenges", title: "Data Integration Challenges in Multi-System Environments", excerpt: "Disconnected systems create data silos and operational inefficiencies.", content: "Enterprises often rely on multiple systems that must exchange data seamlessly.", category: "System Integration", date: new Date("2026-02-27"), image: "/blogs/data-integration-challenges.png" },
    { slug: "enterprise-documentation", title: "Why Documentation Is Critical for Enterprise Software", excerpt: "Well-documented systems reduce dependency and improve maintainability.", content: "Documentation captures system design, data flows, and operational procedures.", category: "Best Practices", date: new Date("2026-03-03"), image: "/blogs/enterprise-documentation.png" },
    { slug: "future-ready-enterprise-systems", title: "Preparing Enterprise Systems for Future Growth", excerpt: "Future-ready systems are designed to adapt, not just operate.", content: "Enterprise systems must accommodate evolving business requirements, user growth, and technological change.", category: "Enterprise Strategy", date: new Date("2026-03-07"), image: "/blogs/future-ready-enterprise-systems.png" },
  ];

  const existingBlogs = await db.blog.count();
  if (existingBlogs === 0) {
    await db.blog.createMany({ data: blogsData });
    console.log("✅ Blogs seeded");
  } else {
    console.log("⏭️ Blogs already exist, skipping");
  }

  console.log("🎉 Seeding complete!");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
