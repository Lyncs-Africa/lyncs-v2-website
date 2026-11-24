import Link from 'next/link'
import {FaFacebookF, FaInstagram, FaLinkedinIn} from 'react-icons/fa'
import {FaXTwitter} from 'react-icons/fa6'
import type {IconType} from 'react-icons'
import CookieSettingsLink from './CookieSettingsLink'

const LEGAL_LINKS: { label: string; href: string }[] = [
    {label: 'Privacy Policy', href: '/privacy'},
    {label: 'Terms of Use', href: '/terms'},
    {label: 'Cookie Policy', href: '/cookies'},
]

const SOCIALS: { href: string; label: string; Icon: IconType }[] = [
    {href: 'https://www.instagram.com/lyncsafrica/', label: 'Instagram', Icon: FaInstagram},
    {href: 'https://web.facebook.com/profile.php?id=61578171967666', label: 'Facebook', Icon: FaFacebookF},
    {href: 'https://x.com/lyncsafrica', label: 'X (Twitter)', Icon: FaXTwitter},
    {href: 'https://www.linkedin.com/company/lyncs-africa/', label: 'LinkedIn', Icon: FaLinkedinIn},
]

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
        title: 'Platform',
        links: [
            {label: 'Rides', href: '/platform/rides'},
            {label: 'Buses', href: '/platform/buses'},
            {label: 'Flights', href: '/platform/flights'},
            {label: 'Car rentals', href: '/platform/car-rentals'},
            {label: 'Car tow', href: '/platform/car-tow'},
            {label: 'On demand mechanic', href: '/platform/mechanic'},
        ],
    },
    {
        title: 'Cars',
        links: [
            {label: 'Browse all cars', href: '/cars'},
            {label: 'Swap your car for an EV', href: '/swap'},
            {label: 'Buy new cars', href: '/cars?condition=new'},
            {label: 'Buy used cars', href: '/cars?condition=used'},
        ],
    },
    {
        title: "Who it's for",
        links: [
            {label: 'For businesses', href: '/businesses'},
            {label: 'For individuals', href: '/individuals'},
            {label: 'For e-hailing drivers', href: '/drivers'},
            {label: 'For school', href: '/schools'},
        ],
    },
    {
        title: 'Company',
        links: [
            {label: 'Careers', href: '/careers'},
            {label: 'Contact', href: '/contact'},
            {label: 'Book a demo', href: '/book-demo'},
            {label: 'FAQ', href: '/faq'},
            {label: 'Lyncs Business', href: 'https://app.lyncs.africa/register/', external: true},
        ],
    },
]

function FooterLink({label, href, external}: { label: string; href: string; external?: boolean }) {
    const cls = 'text-gray-400 transition hover:text-white'
    if (external || href.startsWith('http') || href === '#') {
        return (
            <a href={href} className={cls} target={external ? '_blank' : undefined}
               rel={external ? 'noopener noreferrer' : undefined}>
                {label}
            </a>
        )
    }
    return (
        <Link href={href} className={cls}>
            {label}
        </Link>
    )
}

export default function Footer() {
    return (
        <footer
            className="bg-white py-10 font-Quicksand dark:bg-night md:px-10 lg:px-20"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 rounded-2xl bg-slate-800 p-6 text-white dark:bg-slate-900 dark:border dark:border-white/10 md:grid-cols-2 md:p-10 lg:grid-cols-6">
                    {/* Brand + contact */}
                    <div className="space-y-4 lg:col-span-2">
                        <Link href="/" aria-label="Lyncs home" className="inline-block">
                            <img className="w-[100px]" src="/images/logos/logo-white.png" alt="Lyncs"/>
                        </Link>

                        <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                           Powering the future of Africa mobility.<br/>
                            Evs, corporate mobility, fleet solutions
                        </p>

                        <div className="space-y-2">
                            <p className="text-[16px] font-medium text-gray-200">Reach out to us</p>
                            <div className="flex items-center space-x-2">
                                <img className="w-6 md:w-8" src="/images/nigeria.png" alt="Nigeria flag"/>
                                <p className="text-base font-medium md:text-[17px]">Lagos, Nigeria</p>
                            </div>

                            <div className="flex items-center gap-2 pt-4">
                                {SOCIALS.map(({href, label, Icon}) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition duration-300 ease-in-out hover:scale-110"
                                    >
                                        <Icon aria-hidden="true"/>
                                    </a>
                                ))}
                            </div>

                            <a href="mailto:support@lyncs.africa"
                               className="block break-words text-sm text-gray-300 transition hover:text-white md:text-base">
                                support@lyncs.africa
                            </a>
                            <a href="tel:+2349055555407"
                               className="block break-words text-sm text-gray-300 transition hover:text-white md:text-base">
                                +234 905 555 5407
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {COLUMNS.map(({title, links}) => (
                        <div key={title}>
                            <h3 className="mb-3 text-[18px] font-semibold md:text-lg">{title}</h3>
                            <ul className="space-y-2 text-[16px]">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <FooterLink {...link}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Bottom bar */}
                    <div
                        className="border-t border-gray-600 pt-5 text-sm text-gray-400 md:text-base lg:col-span-6">
                        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                            <div className="text-center md:text-left">
                                <p>© {new Date().getFullYear()} Lyncs. All rights reserved.</p>
                                <p className="mt-1">Made with you in mind.</p>
                            </div>
                            <nav
                                aria-label="Legal"
                                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                                {LEGAL_LINKS.map(({label, href}) => (
                                    <Link key={href} href={href} className="text-gray-400 transition hover:text-white">
                                        {label}
                                    </Link>
                                ))}
                                <CookieSettingsLink/>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
