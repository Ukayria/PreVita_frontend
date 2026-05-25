import colors from '../colors';

export default function Header({ title, subtitle, onBack, variant = 'green' }) {
  const isGreen = variant === 'green';
  return (
    <div style={{
      background: isGreen ? colors.primary : colors.surface,
      padding: '16px 20px 20px',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: isGreen ? '#fff' : colors.textPrimary,
          fontSize: 20, marginBottom: 8, padding: 0, display: 'block',
        }}>←</button>
      )}
      <h2 style={{
        margin: 0, fontSize: 20, fontWeight: 700,
        color: isGreen ? '#fff' : colors.textPrimary,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          margin: '4px 0 0', fontSize: 13,
          color: isGreen ? 'rgba(255,255,255,0.75)' : colors.textSecondary,
        }}>{subtitle}</p>
      )}
    </div>
  );
}