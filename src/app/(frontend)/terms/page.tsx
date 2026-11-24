import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | Lyncs',
  description: 'Read the terms and conditions governing your use of the Lyncs platform and website.',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-primary dark:text-white text-xl font-bold mb-3">{title}</h2>
      {children}
    </div>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">{children}</p>
}

export default function TermsOfUsePage() {
  return (
    <div className="font-Quicksand">
      {/* Hero */}
      <div className="bg-secondary pt-16 pb-12 md:pb-16 px-6 md:pt-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Terms of Use
          </h1>
          <p className="text-white/60 mt-4 text-sm">
            Effective Date: 16 November 2026 &nbsp;|&nbsp; Last Updated: 16 November 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-night px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10">

          <Section title="1. Agreement to Terms">
            <P>
              These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the website, applications,
              and services operated by Lyncs Africa (&ldquo;Lyncs,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
              located at lyncs.africa (together, the &ldquo;Platform&rdquo;).
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to
              these Terms, you should not use the Platform. These Terms apply to all visitors, users, drivers,
              and business and school clients who access the Platform.
            </p>
          </Section>

          <Section title="2. About Lyncs">
            <P>
              Lyncs is a mobility platform based in Lagos, Nigeria. We connect individuals, drivers,
              businesses, and schools with mobility services including ride comparison and booking, vehicle
              purchases, electric vehicle (EV) swaps, car rentals, buses and flights, corporate mobility and
              fleet solutions, on-demand mechanic and tow services, and rent-to-own vehicles for drivers. For
              some services, Lyncs acts as an intermediary connecting you with third-party providers.
            </P>
          </Section>

          <Section title="3. Eligibility and Accounts">
            <P>
              You must be at least 18 years old and able to form a legally binding contract to use the
              Platform. When you create an account, you agree to provide accurate and complete information and
              to keep it up to date. You are responsible for safeguarding your account credentials and for all
              activity that occurs under your account. Notify us immediately if you suspect any unauthorised
              use of your account.
            </P>
          </Section>

          <Section title="4. Services, Bookings and Payments">
            <P>
              Prices, vehicle availability, valuations, financing terms, and service details shown on the
              Platform are indicative and may change before a transaction is confirmed. A booking, purchase,
              swap, rental, or financing arrangement is only confirmed once you complete the required steps and
              receive confirmation from us.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              Payments are processed through third-party payment providers. By making a payment, you authorise
              us and our providers to charge the applicable amount. Certain services — including vehicle
              purchases, swaps, rentals, and financing — may be subject to additional specific terms, eligibility
              checks, identity verification, and separate agreements, which you will be asked to accept before
              the service is provided. Where there is a conflict, those specific terms take precedence for that
              service.
            </p>
          </Section>

          <Section title="5. Third-Party Providers">
            <P>
              Some services are delivered by independent third-party providers, such as ride-hailing partners,
              drivers, vehicle suppliers, insurers, mechanics, and financing partners. Lyncs is not liable for
              the acts or omissions of these providers beyond our role as described in the applicable service
              terms. Your use of a third-party provider&apos;s service may also be subject to that provider&apos;s own
              terms.
            </P>
          </Section>

          <Section title="6. Intellectual Property">
            <P>
              All content on the Platform — including text, graphics, logos, images, data compilations, design
              elements, and software — is the property of Lyncs or its licensors and is protected by Nigerian
              copyright law, international intellectual property treaties, and other applicable laws.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              You may view and use the Platform for your own personal, non-commercial use. You may not, without
              our prior written consent:
            </p>
            <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {[
                'Reproduce, distribute, or publicly display content from the Platform for commercial purposes;',
                'Use any content in a manner that suggests association with, endorsement by, or sponsorship by Lyncs;',
                'Incorporate any content into another publication, product, or service;',
                'Create derivative works based on content from the Platform; or',
                'Use automated tools (scrapers, crawlers, or bots) to extract content or data from the Platform.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">({String.fromCharCode(97 + i)})</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              The Lyncs name, logo, and related marks are trademarks of Lyncs Africa. You may not use these
              marks without our prior written consent.
            </p>
          </Section>

          <Section title="7. Acceptable Use">
            <P>You agree to use the Platform only for lawful purposes and in a manner consistent with these Terms. You agree not to:</P>
            <ul className="mt-3 space-y-2 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {[
                'Use the Platform in any way that violates any applicable law or regulation;',
                'Attempt to gain unauthorised access to any part of the Platform, its servers, or connected systems;',
                'Introduce any viruses, trojans, worms, or other malicious code;',
                'Interfere with or disrupt the Platform\'s operation, security, or performance;',
                'Impersonate any person or entity, or misrepresent your affiliation with any person or entity;',
                'Provide false, misleading, or fraudulent information, including during identity or payment verification; or',
                'Use the Platform to collect or harvest personal data about other users.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">({String.fromCharCode(97 + i)})</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="8. Information Accuracy">
            <P>
              The content on the Platform is provided for general informational purposes about Lyncs and its
              services. While we take care to ensure accuracy, we do not warrant that all information —
              including pricing, valuations, availability, and estimated savings — is complete, accurate, or
              current at all times. Any calculators or estimates provided (such as fuel-versus-EV savings) are
              illustrative only and do not constitute a binding offer or financial advice.
            </P>
          </Section>

          <Section title="9. User Submissions and Communications">
            <P>
              When you submit information to us through the Platform (including through forms, bookings,
              requests, or applications), you are responsible for ensuring that the information is accurate and
              that you are authorised to share it. Any ideas or suggestions you submit are provided on a
              non-confidential basis unless we have a separate written agreement, and we may use them without
              obligation to you, except where they contain personal data (in which case our Privacy Policy
              applies).
            </P>
          </Section>

          <Section title="10. Limitation of Liability">
            <P>
              To the maximum extent permitted by applicable law, Lyncs and its directors, officers, employees,
              agents, and affiliates shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising out of or in connection with your use of (or inability to use) the
              Platform or any service obtained through it, including loss of profits, loss of data, or business
              interruption.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              This limitation applies regardless of the legal theory on which the claim is based, whether in
              contract, tort (including negligence), strict liability, or otherwise. Nothing in these Terms
              excludes or limits liability for death or personal injury caused by negligence, fraud or
              fraudulent misrepresentation, or any other liability that cannot be excluded under applicable law.
            </p>
          </Section>

          <Section title="11. Disclaimers">
            <P>
              The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of
              any kind, either express or implied. Lyncs disclaims all warranties, including implied warranties
              of merchantability, fitness for a particular purpose, non-infringement, and accuracy. We do not
              warrant that the Platform will be uninterrupted, error-free, secure, or free of harmful
              components.
            </P>
          </Section>

          <Section title="12. Indemnification">
            <P>
              You agree to indemnify, defend, and hold harmless Lyncs and its directors, officers, employees,
              and agents from and against any claims, liabilities, damages, losses, costs, and expenses
              (including reasonable legal fees) arising out of or related to your violation of these Terms, your
              use of the Platform, or your infringement of any intellectual property or other right of any
              person or entity.
            </P>
          </Section>

          <Section title="13. Governing Law and Jurisdiction">
            <P>
              These Terms are governed by and construed in accordance with the laws of the Federal Republic of
              Nigeria. Any dispute arising out of or in connection with these Terms or your use of the Platform
              shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria. Where Lyncs
              provides services under a separate agreement, the governing law and dispute resolution provisions
              of that agreement take precedence for matters arising under that engagement.
            </P>
          </Section>

          <Section title="14. Termination">
            <P>
              We reserve the right to restrict, suspend, or terminate your access to the Platform at any time,
              without notice, for any reason, including if we reasonably believe you have violated these Terms or
              engaged in fraudulent or unlawful activity. Upon termination, all provisions that by their nature
              should survive (including intellectual property, limitation of liability, indemnification, and
              governing law) will continue to apply.
            </P>
          </Section>

          <Section title="15. Severability and Changes">
            <P>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, that provision
              will be enforced to the maximum extent permissible and the remaining provisions will continue in
              full force and effect. We may update these Terms from time to time; when we make material changes,
              we will update the &ldquo;Last Updated&rdquo; date at the top of this page. Your continued use of the
              Platform after changes constitutes acceptance of the revised Terms.
            </P>
          </Section>

          <Section title="16. Contact">
            <P>If you have questions about these Terms, contact us at:</P>
            <div className="mt-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-primary dark:text-white">Lyncs Africa</p>
              <p>Lagos, Nigeria</p>
              <p>
                Email:{' '}
                <a href="mailto:legal@lyncs.africa" className="text-accent underline underline-offset-2">
                  legal@lyncs.africa
                </a>
              </p>
            </div>
          </Section>

          {/* Footer nav */}
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4">
            <Link href="/privacy" className="text-primary dark:text-white font-semibold text-sm hover:text-accent transition-colors">
              Privacy Policy &rarr;
            </Link>
            <Link href="/cookies" className="text-primary dark:text-white font-semibold text-sm hover:text-accent transition-colors">
              Cookie Policy &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
