import colors from '../colors';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const RISK_CONFIG = {
  Low:    { color: colors.primary, bg: colors.primaryTint },
  Medium: { color: '#8B5E00',      bg: colors.warningTint },
  High:   { color: colors.danger,  bg: colors.dangerTint  },
};

export default function HistoryScreen({ history, onNavigate, onViewReport, language = 'English' }) {
  const t = translations[language] || translations.English;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 100 }}>
      <Header title={t.healthHistory2} subtitle={t.allPastChecks} />

      <div style={{ padding: '20px' }}>
        {history.length === 0 ? (
          <div style={{ border: `2px dashed ${colors.border}`, borderRadius: 16, padding: '48px 24px', textAlign: 'center', marginTop: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, margin: '0 0 8px' }}>
              {t.noRecords}
            </p>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 24px', lineHeight: 1.6 }}>
              {t.noRecordsSub}
            </p>
            <button onClick={() => onNavigate('check')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {t.checkSymptoms}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>
              {t.recentRecords}
            </p>
            {history.map(entry => {
              const risk = RISK_CONFIG[entry.result?.risk_level] || RISK_CONFIG.Low;
              const topSymptoms = entry.symptoms?.slice(0, 2).join(', ');
              return (
                <div key={entry.id} onClick={() => onViewReport(entry)} style={{ background: colors.surface, borderRadius: 16, padding: '16px', border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <p style={{ fontSize: 13, color: colors.textLight, margin: 0 }}>
                      {new Date(entry.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: risk.bg, color: risk.color }}>
                      {entry.result?.risk_level === 'Low' ? t.lowRisk : entry.result?.risk_level === 'Medium' ? t.mediumRisk : t.highRisk}
                    </span>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 4px' }}>
                    {topSymptoms}
                  </p>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 10px', lineHeight: 1.5 }}>
                    {entry.result?.risk_summary?.slice(0, 80)}...
                  </p>
                  <p style={{ fontSize: 13, color: colors.primary, fontWeight: 600, margin: 0 }}>
                    {t.tapToOpen}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav active="history" onNavigate={onNavigate} />
    </div>
  );
}