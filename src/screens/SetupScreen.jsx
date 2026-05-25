import { useState } from 'react';
import colors from '../colors';
import translations from '../i18n';

const COUNTRIES = [
  'Nigeria','Ghana','Kenya','South Africa','Ethiopia','Tanzania',
  'Uganda','Rwanda','Cameroon','Senegal','Côte d\'Ivoire','Mali',
  'Burkina Faso','Niger','Chad','Sudan','Somalia','Zimbabwe',
  'Zambia','Mozambique','Angola','DR Congo','Congo','Gabon',
  'Togo','Benin','Guinea','Sierra Leone','Liberia','Gambia',
  'Other African country','Outside Africa',
];

export default function SetupScreen({ onComplete, language = 'English' }) {
  const t = translations[language] || translations.English;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', dob: '',
    nationality: '', city: '', sex: '',
    conditions: '', onMedication: '', allergies: '', clinicVisit: '',
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 10,
    border: `1px solid ${colors.border}`, fontSize: 15,
    background: colors.surface, color: colors.textPrimary,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 500, color: colors.textPrimary,
    display: 'block', marginBottom: 6,
  };

  const Chip = ({ label, selected, onClick }) => (
    <button onClick={onClick} style={{
      padding: '8px 18px', borderRadius: 99,
      border: `1.5px solid ${selected ? colors.primary : colors.border}`,
      background: selected ? colors.primaryTint : colors.surface,
      color: selected ? colors.primary : colors.textSecondary,
      fontSize: 14, fontWeight: selected ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit',
    }}>{label}</button>
  );

  const ProgressBar = () => (
    <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= step ? colors.primary : colors.border, transition: 'background 0.3s' }} />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: colors.surface }}>
      <div style={{ background: colors.primary, padding: '48px 24px 24px' }}>
        <button onClick={() => step > 1 ? setStep(step - 1) : {}} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', marginBottom: 8 }}>←</button>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>
          {step === 1 ? t.tellUs : step === 2 ? t.healthBg : t.almostIn}
        </h2>
      </div>

      <div style={{ padding: '24px 24px 100px' }}>
        <ProgressBar />
        <p style={{ fontSize: 13, color: colors.primary, fontWeight: 600, marginBottom: 20 }}>
          {t.stepOf} {step} {t.of} 3
        </p>

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t.fullName}</label>
              <input style={inputStyle} placeholder="e.g. Abioye Hanat" value={form.fullName}
                onChange={e => update('fullName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.email}</label>
              <input style={inputStyle} type="email" placeholder="e.g. abioye@gmail.com" value={form.email}
                onChange={e => update('email', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.phone}</label>
              <input style={inputStyle} type="tel" placeholder="e.g. +234 800 000 000" value={form.phone}
                onChange={e => update('phone', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.dateOfBirth}</label>
              <input style={inputStyle} type="date" value={form.dob}
                onChange={e => update('dob', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.nationality}</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.nationality}
                onChange={e => update('nationality', e.target.value)}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>{t.stateCity}</label>
              <input style={inputStyle} placeholder="e.g. Lagos, Lagos" value={form.city}
                onChange={e => update('city', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.sexAtBirth}</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <Chip label={t.female} selected={form.sex === 'Female'} onClick={() => update('sex', 'Female')} />
                <Chip label={t.male} selected={form.sex === 'Male'} onClick={() => update('sex', 'Male')} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>{t.existingConditions}</label>
              <input style={inputStyle} placeholder="Describe" value={form.conditions}
                onChange={e => update('conditions', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.onMedication}</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <Chip label={t.yes} selected={form.onMedication === 'Yes'} onClick={() => update('onMedication', 'Yes')} />
                <Chip label={t.no} selected={form.onMedication === 'No'} onClick={() => update('onMedication', 'No')} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t.allergies}</label>
              <input style={inputStyle} placeholder={t.optional} value={form.allergies}
                onChange={e => update('allergies', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t.clinicVisit}</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { key: 'Rarely', label: t.rarely },
                  { key: 'Sometimes', label: t.sometimes },
                  { key: 'Often', label: t.often },
                ].map(s => (
                  <Chip key={s.key} label={s.label} selected={form.clinicVisit === s.key}
                    onClick={() => update('clinicVisit', s.key)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🔒', title: t.dataPrivate,   sub: t.dataPrivateSub   },
              { icon: '🤖', title: t.aiAssisted,    sub: t.aiAssistedSub    },
              { icon: '📶', title: t.lowData,        sub: t.lowDataSub       },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: colors.background, borderRadius: 12 }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 4px' }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{item.sub}</p>
                </div>
              </div>
            ))}
            <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 8, lineHeight: 1.6 }}>
              {t.termsAgree}{' '}
              <span style={{ color: colors.primary, fontWeight: 600 }}>{t.terms}</span>
              {' '}{t.and}{' '}
              <span style={{ color: colors.primary, fontWeight: 600 }}>{t.privacy}</span>
            </p>
          </div>
        )}

        <button onClick={() => step < 3 ? setStep(step + 1) : onComplete(form)} style={{
          width: '100%', padding: 16, borderRadius: 12, border: 'none',
          background: colors.primary, color: '#fff', fontSize: 16,
          fontWeight: 600, cursor: 'pointer', marginTop: 32,
        }}>
          {t.continueBtn}
        </button>
      </div>
    </div>
  );
}