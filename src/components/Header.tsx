"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import ThemeToggle from "./theme/ThemeToggle";

const LOGO_DARK = "/images/logos/dark%20blue%20and%20light%20blue@4x.png";
const LOGO_WHITE = "/images/logos/logo-white.png";

const APP_URL = "https://app.lyncs.africa";
const DEMO_URL = "/contact";

type NavLink = { href: string; label: string };
type NavItem = {
  label: string;
  badge?: string;
  href?: string;
  children?: NavLink[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Platform",
    children: [
      { href: "/platform/rides", label: "Rides" },
      { href: "/platform/buses", label: "Buses" },
      { href: "/platform/flights", label: "Flights" },
      {
        href: "/platform/ride-wallets",
        label: "Fund ride wallets",
      },
      { href: "/platform/car-rentals", label: "Car rentals" },
      { href: "/platform/car-tow", label: "Car tow" },
      { href: "/platform/fuel-vouchers", label: "Fuel & diesel vouchers" },
      { href: "/platform/mechanic", label: "On-demand mechanic" },
    ],
  },
  {
    label: "Cars",
    badge: "New",
    children: [
      { href: "/cars/list", label: "Browse all cars" },
      { href: "/cars/swap", label: "Swap your car for EV" },
      { href: "/cars/new", label: "Buy new cars" },
      { href: "/cars/used", label: "Buy used cars " },
    ],
  },
  {
    label: "Who it's for",
    children: [
      { href: "/businesses", label: "For businesses" },
      { href: "/individuals", label: "For individuals" },
    ],
  },
  {
    label: "Company",
    children: [
      { href: "/about", label: "Our story" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

type HeaderProps = {
  mode?: "light" | "dark";
};

export default function Header({ mode = "light" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const desktopNavRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!desktopNavRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    const onScroll = () => setScrollTop(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenSection(null);
    setOpenDropdown(null);
  }, [pathname]);

  const scrolled = scrollTop >= 100;
  const onDarkHero = mode === "dark" && !scrolled;

  const linkClass = classNames(
    "flex items-center gap-1 text-[15px] transition duration-150",
    {
      "text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white":
        !onDarkHero,
      "text-white/80 hover:text-white": onDarkHero,
    },
  );

  const badge = (text: string) => (
    <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none text-accent">
      {text}
    </span>
  );

  return (
    <div className="h-20 md:h-[130px]">
      <div
        className={classNames(
          "md:h-[130px] top-0 ease-in-out duration-500 font-Quicksand left-0 w-full z-40 lg:py-6 md:grid grid-cols-12",
          scrolled ? "fixed" : "relative",
        )}
      >
        <div className="xl:col-span-8 xl:col-start-3 md:col-span-10 md:col-start-2 container mx-auto relative">
          <nav
            className={classNames(
              "md:px-8 px-4 h-20 flex flex-col justify-center w-full lg:rounded-lg",
              {
                "bg-white border border-slate-200 dark:bg-slate-900 dark:border-white/10":
                  !onDarkHero,
                "shadow-xl": scrolled,
              },
            )}
          >
            <div className="flex items-center justify-between">
              <Link href="/" aria-label="Lyncs home">
                <img
                  alt="Lyncs logo"
                  className={classNames("w-[100px]", { "dark:hidden": !onDarkHero })}
                  src={onDarkHero ? LOGO_WHITE : LOGO_DARK}
                />
                {!onDarkHero && (
                  <img
                    alt=""
                    aria-hidden
                    className="w-[100px] hidden dark:block"
                    src={LOGO_WHITE}
                  />
                )}
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                <ul ref={desktopNavRef} className="flex items-center gap-6">
                  {NAV_ITEMS.map((item) =>
                    item.children ? (
                      <li key={item.label} className="relative">
                        <button
                          type="button"
                          className={linkClass}
                          aria-haspopup="true"
                          aria-expanded={openDropdown === item.label}
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.label ? null : item.label,
                            )
                          }
                        >
                          {item.label}
                          {item.badge && badge(item.badge)}
                          <FiChevronDown
                            className={classNames(
                              "transition-transform duration-150",
                              { "rotate-180": openDropdown === item.label },
                            )}
                          />
                        </button>
                        <div
                          className={classNames(
                            "transition duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-4",
                            openDropdown === item.label
                              ? "visible opacity-100 translate-y-0"
                              : "invisible opacity-0 translate-y-1",
                          )}
                        >
                          <ul className="min-w-[240px] divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white p-2 shadow-xl dark:divide-white/5 dark:border-white/10 dark:bg-slate-900">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block rounded-md px-3 py-2 text-[15px] text-slate-600 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <Link href={item.href!} className={linkClass}>
                          {item.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>

                <div className="flex items-center gap-4">
                  <ThemeToggle onDarkHero={onDarkHero} />
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Log in
                  </a>
                  <Link
                    href={DEMO_URL}
                    className={classNames(
                      "rounded-full px-5 py-2 text-sm font-medium transition duration-150",
                      {
                        "bg-primary text-white hover:bg-opacity-90 dark:bg-accent":
                          !onDarkHero,
                        "bg-white text-primary hover:bg-slate-100": onDarkHero,
                      },
                    )}
                  >
                    Book a demo
                  </Link>
                </div>
              </div>

              <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle onDarkHero={onDarkHero} />
              <button
                type="button"
                aria-label="Open menu"
                className="w-10 h-10 flex items-center justify-center rounded-md bg-transparent"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className={onDarkHero ? "text-white" : "text-black dark:text-white"}
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00781 15H0M18 1H0M18 8H0"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                  />
                </svg>
              </button>
              </div>
            </div>

            {isOpen && (
              <div className="absolute top-0 left-0 w-full max-h-screen overflow-y-auto bg-white dark:bg-slate-900 shadow-lg lg:hidden p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <Link href="/">
                    <img
                      alt="Lyncs logo"
                      className="w-[100px] -ml-2 dark:hidden"
                      src={LOGO_DARK}
                    />
                    <img
                      alt=""
                      aria-hidden
                      className="w-[100px] -ml-2 hidden dark:block"
                      src={LOGO_WHITE}
                    />
                  </Link>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoMdClose size="30px" className="text-primary dark:text-white" />
                  </button>
                </div>
                <ul className="space-y-4">
                  {NAV_ITEMS.map((item) =>
                    item.children ? (
                      <li key={item.label}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-2 text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-white"
                          aria-expanded={openSection === item.label}
                          onClick={() =>
                            setOpenSection(
                              openSection === item.label ? null : item.label,
                            )
                          }
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                            {item.badge && badge(item.badge)}
                          </span>
                          <FiChevronDown
                            className={classNames(
                              "transition-transform duration-150",
                              { "rotate-180": openSection === item.label },
                            )}
                          />
                        </button>
                        {openSection === item.label && (
                          <ul className="mt-3 ml-3 space-y-3 border-l border-slate-200 dark:border-white/10 pl-4">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="text-[15px] text-gray-500 hover:text-primary dark:text-slate-400 dark:hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <li
                        key={item.label}
                        className="text-gray-600 hover:text-primary dark:text-slate-300 dark:hover:text-white"
                      >
                        <Link href={item.href!}>{item.label}</Link>
                      </li>
                    ),
                  )}
                  <li className="flex items-center justify-between gap-3 pt-2">
                    <span className="text-sm text-gray-500 dark:text-slate-400">
                      Theme
                    </span>
                    <ThemeToggle showLabels />
                  </li>
                  <li className="flex flex-col gap-3 pt-2">
                    <a
                      href={APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center w-full rounded-full border border-primary text-primary dark:border-white/30 dark:text-white font-medium text-sm px-8 py-2.5"
                    >
                      Log in
                    </a>
                    <Link
                      href={DEMO_URL}
                      className="text-white bg-primary dark:bg-accent flex justify-center items-center w-full hover:bg-opacity-80 font-medium rounded-full text-sm px-8 py-2.5"
                    >
                      Book a demo
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
