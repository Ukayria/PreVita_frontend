export default function PreVitaLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" rx="22" fill="#1B5E3B"/>
      <polyline
        points="8,55 22,55 32,28 44,76 54,42 62,55 72,55 85,55"
        stroke="white" strokeWidth="5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="32" cy="28" r="5" fill="#F59E0B"/>
      <circle cx="44" cy="76" r="5" fill="#F59E0B"/>
      <text x="68" y="72" fontFamily="Arial" fontWeight="bold" fontSize="36" fill="white">P</text>
    </svg>
  );
}