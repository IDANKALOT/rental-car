export function Skeleton({ width = '100%', height = 16, radius = 8, style = {} }) {
  return (
    <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />
  );
}

export function CarCardSkeleton() {
  return (
    <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <Skeleton height={180} radius={0} />
      <div style={{ padding: 24 }}>
        <Skeleton width="40%" height={11} style={{ marginBottom: 12 }} />
        <Skeleton width="70%" height={22} style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <Skeleton width={60} height={24} radius={8} />
          <Skeleton width={70} height={24} radius={8} />
          <Skeleton width={50} height={24} radius={8} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton width="35%" height={26} />
          <Skeleton width={90} height={38} radius={12} />
        </div>
      </div>
    </div>
  );
}
