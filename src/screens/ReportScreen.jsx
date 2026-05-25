import colors from '../colors';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const RISK_CONFIG = {
  Low:  { bg: colors.primary, label: 'lowRisk'  },
  Medium: { bg: '#8B5E00',    label: 'mediumRisk' },
  High: { bg: colors.danger,  label: 'highRisk'  },
};

export default function ReportScreen({ entry, onBack, onNavigate, language = 'English' }) {
  const t = translations[language] || translations.English;
  const risk = RISK_CONFIG[entry?.result?.risk_level] || RISK_CONFIG.Low;
  const r = entry?.result;

  const copyReport = () => {
    const text = `PreVita ${t.healthReport} — ${new Date(entry.date).toLocaleDateString()}
${t.ref}: PV-RPT-${entry?.id?.toString().slice(-8)}
${t.riskLevel}: ${r?.risk_level}
${r?.risk_summary}

${t.symptomsReported}: ${entry?.symptoms?.join(', ')}

${t.possibleConditions}:
${r?.conditions?.map(c => `• ${c.name}: ${c.description}`).join('\n')}

${t.recommendation}:
${[...(r?.immediate_actions || []), ...(r?.self_care || [])].map(a => `• ${a}`).join('\n')}

${r?.disclaimer}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 100 }}>
      {/* Colored header */}
      <div style={{ background: risk.bg, padding: '48px 24px 24px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{t.healthReport}</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
          {new Date(entry?.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} · {t[risk.label]}
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Date & Report ID */}
        <div style={{
          background: entry?.result?.risk_level === 'High' ? colors.dangerTint : colors.primaryTint,
          borderRadius: 12, padding: '14px 16px', marginBottom: 16, border: `1px solid ${colors.border}`
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textSecondary, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.dateTime}</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: entry?.result?.risk_level === 'High' ? colors.danger : colors.primary, margin: '0 0 4px' }}>
            {new Date(entry?.date).toLocaleString('en-NG', { dateStyle: 'long', timeStyle: 'short' })}
          </p>
          <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
            Report ID: PV-RPT-{entry?.id?.toString().slice(-8)}
          </p>
        </div>

        {/* Symptoms */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.symptomsReported}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {entry?.symptoms?.map(s => (
              <span key={s} style={{ padding: '5px 12px', borderRadius: 99, background: colors.background, color: colors.textSecondary, fontSize: 13, border: `1px solid ${colors.border}` }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Risk level */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{t.riskLevel}</p>
            <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, background: risk.bg, color: '#fff' }}>{t[risk.label]}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: colors.textLight }}>{t.low}</span>
            <span style={{ fontSize: 11, color: colors.textLight }}>{t.high}</span>
          </div>
          <div style={{ height: 8, background: colors.border, borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{
              height: '100%', borderRadius: 99, background: risk.bg,
              width: r?.risk_level === 'Low' ? '30%' : r?.risk_level === 'Medium' ? '60%' : '95%',
            }} />
          </div>
          <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{r?.risk_summary}</p>
        </div>

        {/* Conditions */}
        {r?.conditions?.length > 0 && (
          <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.possibleConditions}</p>
            {r.conditions.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.likelihood === 'Likely' ? colors.warning : colors.primary, flexShrink: 0, marginTop: 5, display: 'inline-block' }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{c.name}</p>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.5 }}>{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {(r?.immediate_actions?.length > 0 || r?.self_care?.length > 0) && (
          <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.recommendation}</p>
            {[...(r?.immediate_actions || []), ...(r?.self_care || [])].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: r?.risk_level === 'High' ? colors.danger : colors.primary, flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          background: r?.risk_level === 'High' ? colors.dangerTint : colors.background,
          borderRadius: 12, padding: '12px 16px', marginBottom: 20,
          border: `1px solid ${r?.risk_level === 'High' ? colors.danger + '44' : colors.border}`,
        }}>
          <p style={{ fontSize: 12, color: r?.risk_level === 'High' ? colors.danger : colors.textSecondary, margin: 0, lineHeight: 1.6 }}>
            {r?.disclaimer || t.notDiagnosis}
          </p>
        </div>

        {/* Actions */}
        <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.actions}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { icon: '📥', label: t.download,       sub: t.savePdf,        action: null    },
            { icon: '📋', label: t.copyReport,      sub: t.copyClipboard,  action: copyReport },
            { icon: '↗',  label: t.share,           sub: t.comingSoon,     action: null    },
          ].map(a => (
            <button key={a.label} onClick={a.action} style={{
              flex: 1, padding: '12px 8px', borderRadius: 12,
              border: `1.5px solid ${colors.border}`,
              background: colors.surface, cursor: a.action ? 'pointer' : 'not-allowed',
              textAlign: 'center', fontFamily: 'inherit',
              opacity: a.action ? 1 : 0.5,
            }}>
              <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>{a.icon}</span>
              <p style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{a.label}</p>
              <p style={{ fontSize: 11, color: colors.textLight, margin: 0 }}>{a.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="history" onNavigate={onNavigate} />
    </div>
  );
}