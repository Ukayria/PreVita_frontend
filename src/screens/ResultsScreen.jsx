import { useState } from 'react';
import colors from '../colors';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const RISK_CONFIG = {
  Low:    { color: colors.primary, bg: colors.primaryTint,  bar: '#4CAF73' },
  Medium: { color: '#8B5E00',      bg: colors.warningTint,  bar: colors.warning },
  High:   { color: colors.danger,  bg: colors.dangerTint,   bar: colors.danger },
};

export default function ResultsScreen({ result, symptoms, onNewCheck, onNavigate, onSave, language = 'English' }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = translations[language] || translations.English;
  const risk = RISK_CONFIG[result?.risk_level] || RISK_CONFIG.Medium;

  const handleSave = () => { onSave(); setSaved(true); };

  const handleCopy = () => {
    const text = `PreVita Health Report
Risk Level: ${result?.risk_level}
${result?.risk_summary}

Possible Conditions:
${result?.conditions?.map(c => `• ${c.name} (${c.likelihood}): ${c.description}`).join('\n')}

Recommendations:
${result?.immediate_actions?.map(a => `• ${a}`).join('\n')}

${result?.disclaimer}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextSteps = [
    { icon: '📞', label: t.bookTeleconsult, sub: result?.immediate_actions?.[0] || '', action: () => onNavigate('teleconsult') },
    { icon: '🏥', label: t.nearbyClinic,    sub: t.findOpenClinics,                    action: () => onNavigate('nearby')      },
    { icon: '💊', label: t.selfCareTips,    sub: result?.self_care?.[0] || '',          action: () => onNavigate('selfcare')    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 100 }}>
      <Header title={t.yourResults} />

      <div style={{ padding: '20px' }}>
        {/* Risk card */}
        <div style={{ background: risk.bg, borderRadius: 16, padding: '20px', marginBottom: 16, border: `1px solid ${risk.bar}33` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: colors.textSecondary, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.riskLevel}</p>
            <span style={{ padding: '4px 12px', borderRadius: 99, fontSize: 13, fontWeight: 700, background: risk.bar, color: '#fff' }}>
              {result?.risk_level === 'Low' ? t.lowRisk : result?.risk_level === 'Medium' ? t.mediumRisk : t.highRisk}
            </span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: colors.textLight }}>{t.low}</span>
              <span style={{ fontSize: 11, color: colors.textLight }}>{t.high}</span>
            </div>
            <div style={{ height: 8, background: colors.border, borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99, background: risk.bar,
                width: result?.risk_level === 'Low' ? '30%' : result?.risk_level === 'Medium' ? '60%' : '95%',
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>
          <p style={{ fontSize: 14, color: risk.color, margin: 0, lineHeight: 1.6 }}>{result?.risk_summary}</p>
        </div>

        {/* Symptoms detected */}
        {symptoms?.length > 0 && (
          <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.symptomsDetected}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {symptoms.map(s => (
                <span key={s} style={{ padding: '5px 12px', borderRadius: 99, background: colors.background, color: colors.textSecondary, fontSize: 13, border: `1px solid ${colors.border}` }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Conditions */}
        {result?.conditions?.length > 0 && (
          <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.possibleConditions}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.conditions.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: c.likelihood === 'Likely' ? colors.warning : colors.primary, display: 'inline-block' }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{c.name}</p>
                    <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, lineHeight: 1.5 }}>{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next steps */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.nextSteps}</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {nextSteps.map((item, i) => (
              <div key={item.label} onClick={item.action} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: i < nextSteps.length - 1 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{item.sub}</p>
                </div>
                <span style={{ color: colors.textLight, fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning signs */}
        {result?.warning_signs?.length > 0 && (
          <div style={{ background: colors.dangerTint, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.danger}33` }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.danger, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>{t.warningSignsTitle}</p>
            {result.warning_signs.map((s, i) => (
              <p key={i} style={{ fontSize: 13, color: '#5C1010', margin: '0 0 6px', lineHeight: 1.5 }}>→ {s}</p>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div style={{ background: colors.background, borderRadius: 12, padding: '12px 16px', marginBottom: 20, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0, lineHeight: 1.6 }}>
            {result?.disclaimer || t.notDiagnosis}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <button onClick={handleCopy} style={{ flex: 1, padding: 14, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: copied ? colors.primaryTint : colors.surface, color: copied ? colors.primary : colors.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? t.copied : `📋 ${t.copyReport}`}
          </button>
          <button style={{ flex: 1, padding: 14, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.surface, color: colors.textSecondary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            📥 {t.download}
          </button>
        </div>

        <button onClick={handleSave} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: saved ? colors.primaryTint : colors.primary, color: saved ? colors.primary : '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          {saved ? t.resultSaved : t.saveResult}
        </button>
      </div>

      <BottomNav active="check" onNavigate={onNavigate} />
    </div>
  );
}