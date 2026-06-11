import logoImg from '../../logo.png';

export default function Logo({ onClick, size = 'md' }) {
  const heights = { sm: 28, md: 36, lg: 48 };
  const textSizes = { sm: 14, md: 17, lg: 22 };
  const h = heights[size] || heights.md;
  const fs = textSizes[size] || textSizes.md;
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
      <img
        src={logoImg}
        alt="Soluxe"
        style={{
          height: h,
          width: 'auto',
          display: 'block',
          filter: 'brightness(0.55) contrast(1.2)',
        }}
      />
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: fs,
        letterSpacing: '0.04em',
        color: 'white',
      }}>
        soluxe
      </span>
    </div>
  );
}
