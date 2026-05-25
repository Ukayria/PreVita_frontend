import { useState } from 'react';
import colors from '../colors';
import translations from '../i18n';
import logo from '../assets/logo.png';

export default function AuthScreen({ onSuccess, initialMode = 'signup', language = 'English' }) {
  const [mode, setMode] = useState(initialMode);
  const t = translations[language] || translations.English;
  const [form, setForm] = useState({ email: '', phone: '', password: '', confirm: '' });
  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 10,
    border: `1px solid ${colors.border}`, fontSize: 15,
    background: colors.surface, color: colors.textPrimary,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600, color: colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: '0.06em',
    display: 'block', marginBottom: 6,
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.surface, padding: '48px 24px 40px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
        <img src={logo} alt="PreVita" style={{ width: 80, height: 80, borderRadius: 20, objectFit: 'contain', marginBottom: 16 }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>
          {mode === 'signup' ? t.signUp : t.logIn}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={labelStyle}>{t.email}</label>
          <input style={inputStyle} placeholder="e.g. abioye@gmail.com"
            value={form.email} onChange={e => update('email', e.target.value)} />
        </div>

        {mode === 'signup' && (
          <div>
            <label style={labelStyle}>{t.phone}</label>
            <input style={inputStyle} placeholder="e.g. +234 800 000 000"
              value={form.phone} onChange={e => update('phone', e.target.value)} />
          </div>
        )}

        <div>
          <label style={labelStyle}>{t.password}</label>
          <input style={inputStyle} type="password" placeholder="••••••••"
            value={form.password} onChange={e => update('password', e.target.value)} />
        </div>

        {mode === 'signup' && (
          <div>
            <label style={labelStyle}>{t.confirmPassword}</label>
            <input style={inputStyle} type="password" placeholder="••••••••"
              value={form.confirm} onChange={e => update('confirm', e.target.value)} />
          </div>
        )}
      </div>

      <button onClick={onSuccess} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 32 }}>
        {mode === 'signup' ? t.createAccount : t.loginBtn}
      </button>

      <p style={{ textAlign: 'center', fontSize: 14, color: colors.textSecondary, marginTop: 20 }}>
        {mode === 'signup' ? t.haveAccount : t.noAccount}{' '}
        <span onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          style={{ color: colors.warning, fontWeight: 600, cursor: 'pointer' }}>
          {mode === 'signup' ? t.logIn : t.signUp}
        </span>
      </p>
    </div>
  );
}