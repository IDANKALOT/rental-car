export default function Badge({ children, color = 'var(--gold)', bg, style = {} }) {
  return (
    <span className="sans" style={{
      display: 'inline-block',
      background: bg || `${color}20`,
      color,
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 100,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      ...style,
    }}>
      {children}
    </span>
  );
}

export function AvailabilityBadge({ status }) {
  const map = {
    available:   { label: '● Live',            color: '#16a34a', bg: '#dcfce7' },
    reserved:    { label: '◑ Reserveret',       color: '#d97706', bg: '#fef3c7' },
    maintenance: { label: '⚙ Vedligeholdelse',  color: '#dc2626', bg: '#fee2e2' },
    hidden:      { label: '○ Skjult',           color: '#6b7280', bg: '#f3f4f6' },
  };
  const s = map[status] || map.hidden;
  return <Badge color={s.color} bg={s.bg}>{s.label}</Badge>;
}
