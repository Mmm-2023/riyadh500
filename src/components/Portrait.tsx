const VARIANTS: Record<string, string> = {
  dark: '#111111|#3A3A3A|circle',
  grey: '#CFCFCF|#2B2B2B|ellipse',
  mint: '#C5E8D5|#004F27|circle',
  pale: '#F4F4F4|#006C35|ring',
  mid: '#8ED0AD|#0A0A0A|ellipse',
  deep: '#004F27|#4CB07B|ring',
  green: '#006C35|#0A0A0A|ellipse',
  tie: '#E6E6E6|#0A0A0A|tie',
  night: '#0A0A0A|#1E8F52|ring',
}

export function Portrait({
  variant = 'dark',
  className = '',
}: {
  variant?: string
  className?: string
}) {
  const [fill, ink, kind] = (VARIANTS[variant] ?? VARIANTS.dark).split('|')
  return (
    <svg className={className} viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Placeholder portrait">
      <rect width="100" height="125" fill={fill} />
      {kind === 'ellipse' ? <ellipse cx="56" cy="49" rx="16" ry="20" fill={ink} /> : null}
      {kind === 'circle' ? <circle cx="50" cy="50" r="18" fill={ink} /> : null}
      {kind === 'ring' ? (
        <>
          <circle cx="50" cy="46" r="19" fill={ink} />
          <path d="M12 125A38 38 0 0 1 88 125Z" fill={ink} />
          <circle cx="50" cy="46" r="29" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.55" />
        </>
      ) : null}
      {kind === 'tie' ? (
        <>
          <circle cx="48" cy="48" r="17" fill={ink} />
          <path d="M6 125C8 92 28 82 48 82S92 92 94 125Z" fill={ink} />
          <path d="M48 84L39 125H57Z" fill={fill} />
        </>
      ) : null}
      {kind === 'ellipse' ? <path d="M2 125C5 92 28 84 52 84S97 92 99 125Z" fill={ink} /> : null}
      {kind === 'circle' ? <path d="M10 125C12 90 30 80 50 80S88 90 90 125Z" fill={ink} /> : null}
    </svg>
  )
}
