export default function Logo({ light = true, onClick, size = 'md' }) {
  const sizes = { sm: { icon: 18, text: 17 }, md: { icon: 22, text: 21 }, lg: { icon: 28, text: 26 } };
  const s = sizes[size] || sizes.md;
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
      <span style={{ fontSize: s.icon }}>🌊</span>
      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: s.text, letterSpacing: '0.5px' }}>
        <span className="shimmer-text">Costa Drive</span>
        <span style={{ color: light ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.38)', fontWeight: 300 }}> Club</span>
      </span>
    </div>
  );
}
