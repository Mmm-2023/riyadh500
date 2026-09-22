import { Link } from 'react-router-dom'
import { sectorIndexLabel, type Sector } from '../content/sectors'

export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      to={`/sectors/${sector.slug}`}
      className="group flex h-full flex-col justify-between border border-ink/10 bg-pearl p-5 transition-colors hover:border-gold hover:bg-sand"
    >
      <div>
        <p className="font-serif text-lg text-gold italic">{sectorIndexLabel(sector.sort_order)}</p>
        <h2 className="mt-3 font-display text-[1.35rem] leading-tight font-bold tracking-[-0.03em] text-ink">
          {sector.name}
        </h2>
      </div>
      <p className="mt-8 text-sm text-ink/60">Up to {sector.cap} places</p>
    </Link>
  )
}
