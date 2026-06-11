import logoImg from '../../logo.png';

export default function Logo({ onClick, size = 'md' }) {
  const heights = { sm: 28, md: 36, lg: 48 };
  const h = heights[size] || heights.md;
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
      <img src={logoImg} alt="Soluxe" style={{ height: h, width: 'auto', display: 'block' }} />
    </div>
  );
}
