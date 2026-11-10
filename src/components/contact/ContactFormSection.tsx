'use client'

import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {IoCall, IoCheckmarkCircle, IoLogoWhatsapp, IoMail} from 'react-icons/io5'
import {LuArrowRight, LuCheck, LuHeadset} from 'react-icons/lu'
import {PhoneInput} from 'react-international-phone'

export default function ContactFormSection() {
    const [submitted, setSubmitted] = useState(false)
    const [isWhatsapp, setIsWhatsapp] = useState(false)
    const [form, setForm] = useState({name: '', email: '', phone: '', message: ''})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const reset = () => {
        setSubmitted(false)
        setForm({name: '', email: '', phone: '', message: ''})
        setIsWhatsapp(false)
    }

    const labelCls = 'block text-[13px] text-slate-500 dark:text-white/50'
    const fieldCls =
        'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

    return (
        <section
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
            className="-mt-20 font-Quicksand dark:bg-night md:-mt-[130px]">
            <div
                className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-28 md:pt-[160px] lg:gap-16 lg:px-8 xl:grid-cols-2">
                <div>
                    <span
                        className="flex w-fit items-center gap-2 text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300">
                        <LuHeadset size={20} className="text-accent"/>
                        We&apos;re here to help you
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-primary dark:text-white sm:text-5xl md:text-6xl">
                        <span className="text-accent">Discuss</span> your corporate mobility needs
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-500 dark:text-slate-300">
                        Swapping your fleet, moving your staff, or getting an EV of your own, tell us what you need and
                        we’ll get you to the right person.
                    </p>

                    <div className="mt-12 space-y-7">
                        <a href="mailto:support@lyncs.africa" className="flex items-center gap-4 group">
                            <IoMail size={26} className="shrink-0 text-accent"/>
                            <span>
                                <span className="block text-[13px] text-slate-400 dark:text-white/50">E-mail</span>
                                <span
                                    className="block text-lg font-semibold text-primary transition group-hover:text-accent dark:text-white">
                                    support@lyncs.africa
                                </span>
                            </span>
                        </a>
                        <a href="tel:+2349055555407" className="flex items-center gap-4 group">
                            <IoCall size={26} className="shrink-0 text-accent"/>
                            <span>
                                <span
                                    className="block text-[13px] text-slate-400 dark:text-white/50">Phone number</span>
                                <span
                                    className="block text-lg font-semibold text-primary transition group-hover:text-accent dark:text-white">
                                    +234 905 555 5407
                                </span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right: form card */}
                <div
                    className="demo-card rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 md:p-10 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="done"
                                initial={{opacity: 0, scale: 0.97}}
                                animate={{opacity: 1, scale: 1}}
                                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                            >
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                    <IoCheckmarkCircle size={44}/>
                                </div>
                                <h2 className="mt-5 text-2xl font-bold text-primary dark:text-white">Message sent!</h2>
                                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-white/60">
                                    Thanks, {form.name || 'there'}. Our team will get back to you at{' '}
                                    {form.email || 'your email'} shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="mt-7 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className={labelCls}>Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        placeholder="Tolu Adeyemi"
                                        className={fieldCls}
                                    />
                                </div>

                                <div>
                                    <label className={labelCls}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        placeholder="tolu@yourcompany.com"
                                        className={fieldCls}
                                    />
                                </div>

                                <div>
                                    <label className={labelCls}>Phone</label>
                                    <div className="contact-phone mt-1.5">
                                        <PhoneInput
                                            defaultCountry="ng"
                                            value={form.phone}
                                            onChange={(val) => setForm({...form, phone: val})}
                                            placeholder="800 000 0000"
                                        />
                                    </div>
                                    <label
                                        className={`group mt-3 flex w-fit cursor-pointer select-none items-center gap-2.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                                            isWhatsapp
                                                ? 'border-[#25D366]/40 bg-[#25D366]/10 text-slate-700 dark:text-white'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white/70'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isWhatsapp}
                                            onChange={(e) => setIsWhatsapp(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 ${
                                                isWhatsapp
                                                    ? 'border-[#25D366] bg-[#25D366] text-white'
                                                    : 'border-slate-300 bg-white dark:border-white/20 dark:bg-transparent'
                                            }`}
                                        >
                                            {isWhatsapp && <LuCheck size={14} strokeWidth={3}/>}
                                        </span>
                                        <IoLogoWhatsapp size={16} className="text-[#25D366]"/>
                                        This is my WhatsApp number
                                    </label>
                                </div>

                                <div>
                                    <label className={labelCls}>Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={form.message}
                                        onChange={(e) => setForm({...form, message: e.target.value})}
                                        placeholder="Type your message"
                                        className={`${fieldCls} resize-none`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-2 pr-7 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
                                >
                                    <span
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent transition group-hover:translate-x-0.5 dark:text-[#2D419A]">
                                        <LuArrowRight size={20}/>
                                    </span>
                                    Get a Solution
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
