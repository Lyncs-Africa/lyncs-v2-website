import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Lyncs',
  description:
    'Learn how Lyncs collects, uses, and protects your personal data in accordance with the NDPA 2023 and GDPR.',
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-white/10 mt-4">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-primary/5 dark:bg-white/5">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold text-primary dark:text-white text-[13px] whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/10">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-600 dark:text-slate-300 text-[13px] leading-relaxed align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
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

export default function PrivacyPolicyPage() {
  return (
    <div className="font-Quicksand">
      {/* Hero */}
      <div className="bg-secondary pt-16 pb-12 md:pb-16 px-6 md:pt-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/60 mt-4 text-sm">
            Effective Date: 16 November 2026 &nbsp;|&nbsp; Last Updated: 16 November 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-night px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10">

          <P>
            Lyncs Africa (&ldquo;Lyncs,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting the
            privacy and personal data of everyone who uses our platform. This Privacy Policy explains what
            personal data we collect, why we collect it, how we use and protect it, and what rights you have
            over your data.
          </P>

          <Section title="1. Introduction">
            <P>
              Lyncs is a mobility platform based in Lagos, Nigeria. We help individuals, drivers, businesses,
              and schools move smarter — through ride comparison and booking, vehicle purchases, electric
              vehicle (EV) swaps, car rentals, buses and flights, corporate mobility and fleet solutions,
              on-demand mechanic and tow services, and rent-to-own vehicles for drivers.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              This Privacy Policy applies to all personal data processed through our website (lyncs.africa),
              our applications, email communications, and business operations — including data relating to
              website visitors, registered users, drivers, business and school clients, job applicants, and
              business contacts. Lyncs processes personal data in accordance with the{' '}
              <strong className="text-primary dark:text-white">Nigeria Data Protection Act 2023 (NDPA)</strong>, the Nigeria Data
              Protection Regulation (NDPR) where still applicable, and the{' '}
              <strong className="text-primary dark:text-white">EU General Data Protection Regulation (GDPR)</strong> where it applies.
            </p>
          </Section>

          <Section title="2. Data Controller">
            <P>The data controller for personal data processed through this platform is:</P>
            <div className="mt-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-primary dark:text-white">Lyncs Africa</p>
              <p>Lagos, Nigeria</p>
              <p>
                Email:{' '}
                <a href="mailto:privacy@lyncs.africa" className="text-accent underline underline-offset-2">
                  privacy@lyncs.africa
                </a>
              </p>
            </div>
          </Section>

          {/* 3 */}
          <div>
            <h2 className="text-primary dark:text-white text-xl font-bold mb-3">3. Personal Data We Collect</h2>
            <P>We collect different types of personal data depending on how you interact with us.</P>

            <h3 className="text-primary dark:text-white text-base font-semibold mt-6 mb-1">
              3.1 Information you provide directly
            </h3>
            <Table
              headers={['Data Category', 'Examples', 'When Collected']}
              rows={[
                ['Account information', 'Name, email address, phone number, password, profile details', 'When you create an account or sign in'],
                ['Identity & verification data', 'Government ID, driver\'s licence, date of birth, address, photo, proof of ownership', 'When you swap, finance or rent a vehicle, or register as a driver (KYC)'],
                ['Payment information', 'Card or bank details, billing address, transaction records (processed by our payment partners)', 'When you make a payment, deposit, or set up financing'],
                ['Vehicle information', 'Make, model, registration, mileage, condition, valuation details', 'When you request a car valuation, swap, sale, or financing'],
                ['Booking & request details', 'Trip details, pickup and drop-off locations, rental dates, demo and contact requests', 'When you book, request a service, or contact us'],
                ['Business & school data', 'Company or school name, contacts, staff or student transport needs', 'When you engage Lyncs for corporate mobility or school transport'],
                ['Job application data', 'CV/resume, cover letter, qualifications, work history', 'When you apply for a role at Lyncs'],
              ]}
            />

            <h3 className="text-primary dark:text-white text-base font-semibold mt-6 mb-1">
              3.2 Information collected automatically
            </h3>
            <Table
              headers={['Data Category', 'Examples', 'Purpose']}
              rows={[
                ['Device and browser data', 'IP address, browser type and version, operating system, device identifiers', 'Platform functionality, security, and analytics'],
                ['Usage data', 'Pages visited, features used, time on page, referring URL, navigation path', 'Understanding how users use our platform and improving it'],
                ['Location data', 'Approximate or precise location where you enable it', 'Ride matching, roadside dispatch, rentals, and service relevance'],
                ['Cookie data', 'Session identifiers, preference settings, analytics identifiers', 'See our Cookie Policy for full details'],
              ]}
            />

            <h3 className="text-primary dark:text-white text-base font-semibold mt-6 mb-1">
              3.3 Information from third parties
            </h3>
            <P>
              We may receive information about you from payment processors, identity verification and credit
              assessment providers, ride-hailing partners, insurance partners, and referrals. This is used to
              verify your identity, process transactions, assess financing eligibility, and prevent fraud.
            </P>
          </div>

          <Section title="4. How We Use Your Personal Data">
            <P>
              We process your personal data only for the purposes described below and only where we have a
              lawful basis to do so.
            </P>
            <Table
              headers={['Purpose', 'Data Used', 'Legal Basis (NDPA/GDPR)', 'Retention']}
              rows={[
                ['Creating and managing your account', 'Account information, device data', 'Performance of a contract', 'Duration of account + statutory period'],
                ['Providing rides, rentals, swaps and purchases', 'Account, vehicle, booking, location data', 'Performance of a contract', 'Duration of engagement + applicable record-keeping period'],
                ['Processing payments and financing', 'Payment, identity, vehicle, credit data', 'Performance of a contract / legal obligation', 'As required by financial and tax law'],
                ['Identity verification and fraud prevention', 'Identity data, device data, transaction records', 'Legal obligation / legitimate interest', 'As required by applicable law'],
                ['Customer support and communications', 'Account and contact information, request details', 'Performance of a contract / legitimate interest', '2 years from last contact'],
                ['Marketing and newsletters', 'Email address, communication preferences', 'Consent', 'Until you unsubscribe'],
                ['Platform analytics and improvement', 'Device data, usage data, cookie data', 'Legitimate interest / consent (non-essential cookies)', 'See Cookie Policy'],
                ['Legal compliance and disputes', 'Any relevant personal data', 'Legal obligation / legitimate interest', 'As required by applicable law'],
              ]}
            />
          </Section>

          <Section title="5. Who We Share Your Data With">
            <P>We do not sell, rent, or trade your personal data. We share personal data only in the following limited circumstances.</P>
            <div className="space-y-3 mt-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p><strong className="text-primary dark:text-white">Service providers.</strong> We use trusted third parties who process data on our behalf, including payment processors, identity and credit verification providers, cloud hosting, communications and email providers, and analytics services. All are bound by data processing agreements and are required to protect your data.</p>
              <p><strong className="text-primary dark:text-white">Mobility and financing partners.</strong> To deliver the service you request, we may share necessary data with ride-hailing partners, drivers, vehicle suppliers, insurers, and financing or leasing partners.</p>
              <p><strong className="text-primary dark:text-white">Business and school administrators.</strong> Where you use Lyncs through your employer or school, relevant trip and usage data may be shared with the organisation that manages your account.</p>
              <p><strong className="text-primary dark:text-white">Legal requirements.</strong> We may disclose personal data where required by law, regulation, court order, or a request from a competent authority, including the Nigeria Data Protection Commission (NDPC).</p>
              <p><strong className="text-primary dark:text-white">Business transfers.</strong> In a merger, acquisition, or sale of all or part of our business, personal data may be transferred to the successor entity. We will notify affected individuals of any such transfer.</p>
            </div>
          </Section>

          <Section title="6. International Data Transfers">
            <P>
              Lyncs is based in Lagos, Nigeria, and primarily processes data within Nigeria. Where we transfer
              personal data outside Nigeria (for example, to service providers based in the EU, UK, or US), we
              ensure appropriate safeguards are in place, including standard contractual clauses, adequacy
              decisions, or other mechanisms recognised under the NDPA and GDPR.
            </P>
          </Section>

          <Section title="7. Data Security">
            <P>
              We implement appropriate technical and organisational measures to protect personal data against
              unauthorised access, alteration, disclosure, or destruction. These measures include:
            </P>
            <ul className="mt-3 space-y-1.5 text-slate-600 dark:text-slate-300 text-base leading-relaxed list-none">
              {[
                'Encrypted data transmission (SSL/TLS) across our platform',
                'Tokenised payment handling through certified payment partners',
                'Access controls limiting data access to authorised personnel',
                'Regular security reviews of our systems and service providers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              While we take reasonable steps to protect your data, no transmission over the internet is
              completely secure. We will notify you and the relevant authorities of any data breach that poses
              a risk to your rights and freedoms, as required by applicable law.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <P>
              Depending on your location and the applicable data protection law, you have some or all of the
              following rights regarding your personal data.
            </P>
            <Table
              headers={['Right', 'Description']}
              rows={[
                ['Access', 'You can request a copy of the personal data we hold about you.'],
                ['Correction', 'You can request that we correct inaccurate or incomplete data.'],
                ['Deletion', 'You can request that we delete your personal data, subject to legal retention requirements.'],
                ['Restriction', 'You can request that we restrict processing of your data in certain circumstances.'],
                ['Data portability', 'You can request a copy of your data in a structured, machine-readable format (where applicable).'],
                ['Objection', 'You can object to processing based on legitimate interests, including direct marketing.'],
                ['Withdraw consent', 'Where processing is based on consent, you can withdraw it at any time. This does not affect processing done before withdrawal.'],
                ['Lodge a complaint', 'You can lodge a complaint with the Nigeria Data Protection Commission (NDPC) or, for EEA/UK residents, your local supervisory authority.'],
              ]}
            />
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-4">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@lyncs.africa" className="text-accent underline underline-offset-2">
                privacy@lyncs.africa
              </a>
              . We will respond within 30 days (or sooner where required by applicable law).
            </p>
          </Section>

          <Section title="9. Marketing Communications">
            <P>
              If you consent to receive marketing or subscribe to updates, we will send you the content you
              signed up for. Every marketing email includes a clear unsubscribe link, and when you unsubscribe
              we remove your email from our active marketing list promptly. We may still send you essential
              service messages (such as transaction confirmations and account notices) that are not marketing.
            </P>
          </Section>

          <Section title="10. Children's Privacy">
            <P>
              Our platform and services are directed at individuals aged 18 and over. We do not knowingly
              collect personal data from children. Where we provide school transport services, we process
              limited student information only on the instructions of, and under agreement with, the school,
              which is responsible for obtaining the necessary parental consents.
            </P>
          </Section>

          <Section title="11. Third-Party Links">
            <P>
              Our platform may contain links to external websites or services that are not operated by Lyncs,
              including our partners. We are not responsible for the privacy practices or content of those
              third-party sites. We encourage you to review their privacy policies.
            </P>
          </Section>

          <Section title="12. Changes to This Privacy Policy">
            <P>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or business operations. When we make material changes, we will
              update the &ldquo;Last Updated&rdquo; date at the top of this page. We encourage you to review
              this policy periodically.
            </P>
          </Section>

          <Section title="13. Contact Us">
            <P>
              If you have questions about this Privacy Policy, want to exercise your data rights, or have a
              concern about how we handle your data, contact us at:
            </P>
            <div className="mt-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-primary dark:text-white">Lyncs Africa</p>
              <p>Lagos, Nigeria</p>
              <p>
                Email:{' '}
                <a href="mailto:privacy@lyncs.africa" className="text-accent underline underline-offset-2">
                  privacy@lyncs.africa
                </a>
              </p>
            </div>
          </Section>

          {/* Footer nav */}
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-4">
            <Link href="/terms" className="text-primary dark:text-white font-semibold text-sm hover:text-accent transition-colors">
              Terms of Use &rarr;
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
