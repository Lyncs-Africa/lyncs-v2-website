import Image from 'next/image'

// Staggered columns of photo cards, tilted like a pinned moodboard.
// Enough columns to overfill ultra-wide screens once rotated.
const PHOTOS = [
  '/images/team-4.jpg',
  '/images/10.jpg',
  '/images/7.jpg',
  '/images/3.jpg',
  '/images/2.jpg',
  '/images/team-2.jpg',
  '/images/9.jpg',
  '/images/14.jpg',
  '/images/13.jpg',
]
const OFFSETS = ['translate-y-24', '-translate-y-10', 'translate-y-16', '-translate-y-20', 'translate-y-8', '-translate-y-4']
const COLUMN_COUNT = 14
const PER_COLUMN = 4

const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, i) => ({
  offset: OFFSETS[i % OFFSETS.length],
  photos: Array.from({ length: PER_COLUMN }, (_, j) => PHOTOS[(i * 2 + j * 5) % PHOTOS.length]),
}))

export default function HeroCollage() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 45%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 45%, transparent 80%)',
      }}
    >
      <div className="absolute inset-0 hidden items-center justify-center -rotate-12 gap-5 dark:flex dark:opacity-[0.04] md:gap-7">
        {COLUMNS.map((col, i) => (
          <div key={i} className={`flex shrink-0 flex-col gap-5 md:gap-7 ${col.offset}`}>
            {col.photos.map((src, j) => (
              <Image
                key={j}
                src={src}
                alt=""
                width={240}
                height={320}
                sizes="240px"
                className="h-[240px] w-[180px] rounded-3xl object-cover md:h-[320px] md:w-[240px]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
