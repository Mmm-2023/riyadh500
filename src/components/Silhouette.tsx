const TONES = ['#111111', '#006C35', '#d7d7d4', '#f4f4f2'] as const

export function Silhouette({
  tone = 0,
  className = '',
}: {
  tone?: number
  className?: string
}) {
  const fill = TONES[tone % TONES.length]
  const ink = tone % 2 === 0 ? '#ffffff' : '#111111'
  return (
    <svg viewBox="0 0 80 96" className={className} role="img" aria-label="Example portrait, not a photograph">
      <rect width="80" height="96" fill={fill} />
      <circle cx="40" cy="34" r="14" fill={ink} />
      <path d="M16 96c4-22 14-32 24-32s20 10 24 32" fill={ink} />
    </svg>
  )
}
