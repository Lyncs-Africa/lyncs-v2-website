import Link from 'next/link'

export default function Strip() {
    return (
        <section className="relative w-full overflow-hidden bg-black font-Quicksand">
            <div className="mx-auto max-w-7xl px-4 py-24 md:py-28">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <h2 className="text-[3rem] font-bold leading-[1.1] text-white md:text-[4rem]">
                        Let’s Make Your Next Move Seamless
                    </h2>
                    <p className="mt-8 text-[16px] font-light text-gray-400 md:text-[17px]">
                        Book rides, trips, and flights with ease. Let’s simplify your team’s mobility now.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="https://app.lyncs.africa/register/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded border border-white bg-white px-8 py-3 text-[16px] text-black transition hover:bg-transparent hover:text-white"
                        >
                            Get Lyncs Business
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
