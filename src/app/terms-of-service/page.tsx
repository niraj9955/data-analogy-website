import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | DataAnalogy.Com",
  description:
    "Terms of service and disclaimer for using the DataAnalogy.Com website and services.",
};

const terms = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing and using the DataAnalogy.Com website (the \"Site\"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting on this page.",
    ],
  },
  {
    title: "2. Use of the Site",
    body: [
      "You may use the Site for lawful purposes only. You agree not to use the Site in any way that could damage, disable, overburden, or impair it, or interfere with any other party's use of the Site. You may not attempt to gain unauthorised access to any part of the Site, other accounts, computer systems, or networks connected to the Site.",
      "The content on the Site is provided for general information about our SAP data migration, software development, and data analytics services. It does not constitute professional advice for your specific situation, and you should consult with our team before making decisions based on the content.",
    ],
  },
  {
    title: "3. Intellectual Property",
    body: [
      "All content on the Site — including text, graphics, logos, images, blog articles, and design — is the property of DataAnalogy.Com or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or reuse any portion of the Site without our prior written consent.",
    ],
  },
  {
    title: "4. Service Enquiries and Engagements",
    body: [
      "Submitting a contact form or enquiry through the Site does not create a client relationship. Any engagement for services will be governed by a separate written agreement or statement of work agreed between you and DataAnalogy.Com.",
      "We strive to respond to all enquiries in a timely manner but do not guarantee a specific response timeframe.",
    ],
  },
  {
    title: "5. Limitation of Liability",
    body: [
      "The Site and its content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, DataAnalogy.Com disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.",
      "In no event will DataAnalogy.Com be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Site.",
    ],
  },
  {
    title: "6. Governing Law",
    body: [
      "These terms are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of India.",
    ],
  },
];

const disclaimer = [
  "The information provided on this website is for general informational purposes only. While we make reasonable efforts to keep the content accurate and up to date, DataAnalogy.Com makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained on it.",
  "Any reliance you place on such information is strictly at your own risk. Examples of project outcomes, statistics, and metrics shown on this website are illustrative of our experience and are not a guarantee of future results. In no event will we be liable for any loss or damage arising from the use of this website.",
];

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-10">
          Effective date: January 1, 2026 &middot; Last updated: January 1, 2026
        </p>

        <div className="space-y-10">
          {terms.map((section) => (
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

          <section id="disclaimer" className="scroll-mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Disclaimer</h2>
            <div className="space-y-3">
              {disclaimer.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>
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
