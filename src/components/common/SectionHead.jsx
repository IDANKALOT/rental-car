export default function SectionHead({ label, title, subtitle, light, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 60 }}>
      {label && (
        <span className="sans" style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
          {label}
        </span>
      )}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginTop: 8,
        letterSpacing: '-0.5px', color: light ? 'white' : 'var(--dark)',
        fontFamily: 'var(--font-serif)',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p className="sans" style={{ color: light ? 'rgba(255,255,255,0.45)' : 'var(--muted)', fontSize: 16, marginTop: 12, lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
