import logoImg from '../../logo.png';

export default function Logo({ onClick, size = 'md' }) {
  const cfg = {
    sm: { img: 30, title: 13, sub: 7,  gap: 12, divH: 20 },
    md: { img: 42, title: 17, sub: 8,  gap: 14, divH: 28 },
    lg: { img: 52, title: 20, sub: 9,  gap: 16, divH: 34 },
  };
  const c = cfg[size] || cfg.md;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: c.gap,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Logo image */}
      <img
        src={logoImg}
        alt="Soluxe"
        style={{
          height: c.img,
          width: 'auto',
          display: 'block',
          filter: 'brightness(0.65) contrast(1.15)',
        }}
      />

      {/* Gold divider */}
      <div style={{
        width: 1,
        height: c.divH,
        background: 'linear-gradient(to bottom, transparent, rgba(200,150,60,0.6), transparent)',
        flexShrink: 0,
      }} />

      {/* Brand text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          className="shimmer-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: c.title,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          SOLUXE
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: c.sub,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.32)',
          lineHeight: 1,
        }}>
          CARS
        </span>
      </div>
    </div>
  );
}
