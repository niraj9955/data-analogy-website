import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DataAnalogy.Com",
  description:
    "Learn how DataAnalogy.Com collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "We collect information you voluntarily provide when you contact us through our website, including your name, email address, and the contents of your message. This information is used solely to respond to your enquiry and provide the services you request.",
      "Like most websites, we also automatically collect certain technical information when you visit, such as your browser type, device type, operating system, referring URLs, and pages visited. This data helps us understand how visitors use our site so we can improve its performance and content.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use the information we collect to respond to your enquiries, provide and improve our services, send requested information about SAP data migration, software development, and data analytics offerings, and maintain the security and integrity of our website.",
      "We do not sell, rent, or trade your personal information to third parties. We only share information with service providers who assist us in operating our website and conducting our business, and only to the extent necessary, under obligations to keep your information confidential.",
    ],
  },
  {
    title: "3. Cookies and Tracking Technologies",
    body: [
      "Our website may use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyse site traffic. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent through your browser settings.",
      "Please note that if you disable cookies, some parts of our website may not function as intended.",
    ],
  },
  {
    title: "4. Data Security",
    body: [
      "We implement appropriate technical and organisational measures designed to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted connections (HTTPS/TLS), access controls, and secure data storage practices.",
      "However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "We retain your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Contact enquiries are retained for a reasonable period so we can follow up on your request and maintain a record of our communications.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your jurisdiction, you may have the right to access, correct, update, or request deletion of your personal information. You may also have the right to object to or restrict certain processing of your data.",
      "To exercise any of these rights, please contact us using the details below. We will respond to your request in accordance with applicable data protection laws.",
    ],
  },
  {
    title: "7. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The revised version will be posted on this page with an updated effective date. Continued use of the website after changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "9. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your information, please contact us at contact@dataanalogy.com or through the contact form on our website.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <span className="font-display text-white font-bold text-xl tracking-tight">
            DataAnalogy<span className="text-cyan-400">.Com</span>
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-sm font-semibold text-cyan-700 uppercase tracking-wider mb-2">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-10">
          Effective date: January 1, 2026 &middot; Last updated: January 1, 2026
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          DataAnalogy.Com (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
          This Privacy Policy explains what information we collect when you use our
          website, how we use it, and the choices you have. By using this website,
          you agree to the practices described in this policy.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          &copy;{new Date().getFullYear()} DataAnalogy.Com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
