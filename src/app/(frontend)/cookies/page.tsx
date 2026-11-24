import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Lyncs',
  description:
    'Find out how Lyncs uses cookies, what data is collected, and how you can manage your preferences.',
}

function Table({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
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

function Badge({ label }: { label: string }) {
  const colours: Record<string, string> = {
    Necessary: 'bg-primary/10 text-primary dark:bg-white/10 dark:text-white',
    Analytics: 'bg-accent/10 text-accent',
    Functional: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
  }
  return (
    <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${colours[label] ?? 'bg-slate-100 text-slate-600'}`}>
      {label}
    </span>
  )
}

export default function CookiePolicyPage() {
  return (
    <div className="font-Quicksand">
      {/* Hero */}
      <div className="bg-secondary pt-16 pb-12 md:pb-16 px-6 md:pt-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Legal</p>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight">
            Cookie Policy
          </h1>
          <p className="text-white/60 mt-4 text-sm">
            Effective Date: 16 November 2026 &nbsp;|&nbsp; Last Updated: 16 November 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-night px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-10">

          <Section title="1. What Are Cookies">
            <P>
              Cookies are small text files that are placed on your device (computer, tablet, or mobile phone)
              when you visit a website. They are widely used to make websites work efficiently, remember your
              preferences, and provide information to the website owner about how the site is being used.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              This Cookie Policy explains what cookies we use on the Lyncs website at lyncs.africa, why we use
              them, and how you can manage your preferences. It should be read together with our{' '}
              <Link href="/privacy" className="text-accent underline underline-offset-2 hover:opacity-80">
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="2. How We Use Cookies">
            <P>We use cookies for the following purposes.</P>
            <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p><strong className="text-primary dark:text-white">Necessary cookies</strong> are required for the Website to function properly. They enable basic features like page navigation, secure access, keeping you signed in, and remembering items such as your car valuation or swap request as you move through a flow. The Website cannot function properly without these cookies, and they cannot be disabled.</p>
              <p><strong className="text-primary dark:text-white">Analytics cookies</strong> help us understand how visitors interact with our Website by collecting information about pages visited, time spent, and navigation patterns. This data is aggregated and anonymised. We use it to improve our Website&apos;s content, structure, and performance.</p>
              <p><strong className="text-primary dark:text-white">Functional cookies</strong> remember your preferences and choices — such as your light or dark theme — to provide a more personalised experience. They are not used for tracking or advertising purposes.</p>
              <p>We do not use advertising or behavioural tracking cookies, and we do not sell cookie data to advertising networks.</p>
            </div>
          </Section>

          <Section title="3. Cookies We Use">
            <P>
              The table below lists the main cookies and similar technologies used on our Website. This table
              will be updated if we add or remove cookies.
            </P>
            <Table
              headers={['Name', 'Type', 'Purpose', 'Duration']}
              rows={[
                ['session / auth token', <Badge key="n1" label="Necessary" />, 'Keeps you signed in and maintains your session as you navigate Lyncs', 'Session or until you sign out'],
                ['cookie_consent', <Badge key="n2" label="Necessary" />, 'Records your cookie consent preferences so we don\'t ask again on every visit', '12 months'],
                ['theme (local storage)', <Badge key="f1" label="Functional" />, 'Remembers your light or dark mode preference', 'Until cleared by you'],
                ['_ga', <Badge key="a1" label="Analytics" />, 'Google Analytics — distinguishes unique visitors to help us understand site traffic', '2 years'],
                ['_ga_*', <Badge key="a2" label="Analytics" />, 'Google Analytics — maintains session state for analytics', '2 years'],
                ['_gid', <Badge key="a3" label="Analytics" />, 'Google Analytics — distinguishes visitors within a 24-hour period', '24 hours'],
              ]}
            />
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3">
              Analytics cookies are only set after you consent to them. If you decline non-essential cookies,
              no analytics cookies are placed.
            </p>
          </Section>

          <Section title="4. Third-Party Cookies">
            <P>
              Some cookies on our Website are set by third-party services that we use to operate and improve
              the site.
            </P>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p>
                <strong className="text-primary dark:text-white">Google Analytics</strong> for website usage analytics. Google
                Analytics uses cookies to collect anonymised data about how visitors use our Website. We have
                configured it to anonymise IP addresses. You can opt out of Google Analytics tracking by
                installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:opacity-80"
                >
                  Google Analytics Opt-Out Browser Add-On
                </a>
                .
              </p>
              <p>
                <strong className="text-primary dark:text-white">Payment and verification providers.</strong> When you make a
                payment, complete identity verification, or finance a vehicle, our payment and verification
                partners may set cookies that are strictly necessary to process your transaction securely and
                to help prevent fraud.
              </p>
              <p>
                We do not allow any third party to use cookies on our Website for advertising or profiling
                purposes.
              </p>
            </div>
          </Section>

          <Section title="5. Managing Your Cookie Preferences">
            <P>
              When you first visit our Website, you will see a cookie consent banner that allows you to accept
              all cookies, manage your preferences, or decline non-essential cookies. You can change your
              preferences at any time by clicking the{' '}
              <strong className="text-primary dark:text-white">Cookie Settings</strong> link in our Website footer.
            </P>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-3">
              You can also control cookies through your browser settings. Most browsers allow you to block or
              delete cookies. However, if you block all cookies (including necessary cookies), some parts of
              the Website may not function properly.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mt-4 font-medium text-primary dark:text-white">
              Instructions for managing cookies in common browsers:
            </p>
            <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {[
                ['Google Chrome', 'Settings > Privacy and Security > Cookies and other site data'],
                ['Mozilla Firefox', 'Settings > Privacy & Security > Cookies and Site Data'],
                ['Safari', 'Preferences > Privacy > Manage Website Data'],
                ['Microsoft Edge', 'Settings > Cookies and site permissions > Manage and delete cookies'],
              ].map(([browser, path]) => (
                <li key={browser} className="flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span><strong className="text-primary dark:text-white">{browser}:</strong> {path}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="6. Do Not Track Signals">
            <P>
              Some browsers send a &ldquo;Do Not Track&rdquo; (DNT) signal to websites. There is no industry
              standard for how websites should respond to DNT signals. Our Website does not currently respond
              to DNT signals. However, you can manage your cookie preferences using the methods described
              above.
            </P>
          </Section>

          <Section title="7. Changes to This Cookie Policy">
            <P>
              We may update this Cookie Policy from time to time to reflect changes in our use of cookies,
              third-party services, or applicable regulations. When we make changes, we will update the
              &ldquo;Last Updated&rdquo; date at the top of this page. We encourage you to review this policy
              periodically.
            </P>
          </Section>

          <Section title="8. Contact">
            <P>If you have questions about our use of cookies, contact us at:</P>
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
            <Link href="/privacy" className="text-primary dark:text-white font-semibold text-sm hover:text-accent transition-colors">
              Privacy Policy &rarr;
            </Link>
            <Link href="/terms" className="text-primary dark:text-white font-semibold text-sm hover:text-accent transition-colors">
              Terms of Use &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
