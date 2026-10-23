import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white dark:bg-slate-950 dark:border-t dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Link href="/" aria-label="Lyncs home">
          <img src="/images/logos/logo-white.png" alt="Lyncs" className="h-8 w-auto" />
        </Link>
        <p className="text-sm text-muted">&copy; {new Date().getFullYear()} Lyncs. All rights reserved.</p>
      </div>
    </footer>
  )
}
