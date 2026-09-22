import type { ReactNode } from 'react'

type Tone = 'dark' | 'light'

const eyebrowColor: Record<Tone, string> = {
  dark: 'text-ink-soft/75',
  light: 'text-sand/90',
}

const headingColor: Record<Tone, string> = {
  dark: 'text-ink',
  light: 'text-pearl',
}

export function Eyebrow({
  children,
  tone = 'dark',
}: {
  children: ReactNode
  tone?: Tone
}) {
  return (
    <p className={`mb-4 font-serif text-[1.15rem] italic md:text-[1.25rem] ${eyebrowColor[tone]}`}>
      {children}
    </p>
  )
}

export function DisplayHeading({
  children,
  className = '',
  tone = 'dark',
  id,
  as: Tag = 'h2',
}: {
  children: ReactNode
  className?: string
  tone?: Tone
  id?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <Tag
      id={id}
      className={`font-display text-[clamp(2.2rem,5vw,3.85rem)] font-bold leading-[1.02] tracking-[-0.035em] text-balance ${headingColor[tone]} ${className}`}
    >
      {children}
    </Tag>
  )
}
