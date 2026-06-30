export function BrandMark({ size = 32, variant = 'default' }: { size?: number; variant?: 'default' | 'light' | 'admin' }) {
  const s = size
  const inner = Math.round(s * 0.55)
  const pad = Math.round((s - inner) / 2)

  if (variant === 'admin') {
    return (
      <div className="relative" style={{ width: s, height: s }}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <rect width={s} height={s} rx={s * 0.28} fill="var(--terracotta)" />
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize={s * 0.45}
            fontWeight="800"
            fontFamily="var(--font-serif)"
          >M</text>
        </svg>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" className="shrink-0">
        <rect width={s} height={s} rx={s * 0.25} fill="currentColor" className="text-terracotta" />
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize={s * 0.48}
          fontWeight="800"
          fontFamily="var(--font-serif)"
        >M</text>
      </svg>
      <div className="leading-tight">
        <span className={`block text-sm font-bold tracking-tight ${variant === 'light' ? 'text-white' : 'text-warm-gray'}`}>
          MGL
        </span>
        <span className={`block text-[10px] tracking-[0.2em] uppercase ${variant === 'light' ? 'text-gray-light/60' : 'text-gray'}`}>
          Construction
        </span>
      </div>
    </div>
  )
}

export function MLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={className}>
      <rect width={size} height={size} rx={size * 0.25} fill="var(--terracotta)" />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize={size * 0.48}
        fontWeight="800"
        fontFamily="var(--font-serif)"
      >M</text>
    </svg>
  )
}
