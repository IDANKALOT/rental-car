export default function SectionHead({ label, title, subtitle, light, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 64 }}>
      {label && (
        <div style={{
          display: center ? 'flex' : 'inline-flex',
          alignItems: 'center',
          justifyContent: center ? 'center' : 'flex-start',
          gap: 12,
          marginBottom: 18,
        }}>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
          <span className="sans" style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
            {label}
          </span>
          <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
        </div>
      )}
      <h2 style={{
        fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
        fontWeight: 400,
        lineHeight: 1.1,
        marginTop: 0,
        letterSpacing: '-0.02em',
        color: light ? 'white' : 'var(--dark)',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p className="sans" style={{
          color: light ? 'var(--text-dim)' : 'var(--muted)',
          fontSize: 16,
          marginTop: 16,
          lineHeight: 1.7,
          maxWidth: 540,
          margin: center ? '16px auto 0' : '16px 0 0',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
