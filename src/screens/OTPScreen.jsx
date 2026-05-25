import { useState, useRef } from 'react';
import colors from '../colors';
import translations from '../i18n';

export default function OTPScreen({ onSuccess, language = 'English' }) {
  const t = translations[language] || translations.English;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputs = useRef([]);

  const handleInput = (val, i) => {
    if (!/^\d*$/.test(val)) return; // numbers only
    const updated = [...code];
    updated[i] = val.slice(-1);
    setCode(updated);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const verify = () => {
    const full = code.join('');
    if (full.length < 6) { setError(true); return; }
    setError(false);
    setVerified(true);
    setTimeout(onSuccess, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.surface }}>
      <div style={{ background: colors.primary, padding: '48px 24px 28px' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>🔒</span>
        </div>
        <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>
          {verified ? t.verified : t.verifyIdentity}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
          {verified ? t.verifiedSub : t.verifySubtitle}
        </p>
      </div>

      <div style={{ padding: '24px 24px 40px' }}>
        <div style={{ background: colors.primaryTint, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <span style={{ fontSize: 20 }}>📱</span>
          <div>
            <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 2px' }}>{t.codeSentTo}</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: colors.primary, margin: 0 }}>+234 *** *** 5526</p>
          </div>
        </div>

        {error && (
          <div style={{ background: colors.dangerTint, borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 8 }}>
            <span style={{ color: colors.danger }}>⚠</span>
            <p style={{ fontSize: 13, color: colors.danger, margin: 0 }}>Incorrect code. 3 attempts remaining.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 8 }}>
          {code.map((val, i) => (
            <input
              key={i}
              ref={el => inputs.current[i] = el}
              value={val}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              onChange={e => handleInput(e.target.value, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              style={{
                width: 46, height: 52, textAlign: 'center', fontSize: 20, fontWeight: 700,
                borderRadius: 10,
                border: `2px solid ${error ? colors.danger : verified ? colors.primary : val ? colors.primary : colors.border}`,
                background: verified ? colors.primaryTint : colors.surface,
                color: colors.textPrimary, outline: 'none', fontFamily: 'inherit',
              }}
            />
          ))}
        </div>

        {verified ? (
          <p style={{ textAlign: 'center', fontSize: 13, color: colors.primary, fontWeight: 600, margin: '16px 0' }}>
            {t.codeAccepted} ✓
          </p>
        ) : (
          <>
            <p style={{ textAlign: 'center', fontSize: 13, color: colors.textSecondary, marginBottom: 24 }}>
              Enter 6-digit code
            </p>
            <button onClick={verify} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 16 }}>
              {t.verifyCode}
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: colors.textSecondary }}>
              {t.didntReceive}{' '}
              <span style={{ color: colors.primary, fontWeight: 600 }}>{t.resendIn} 0:30</span>
            </p>
            <p style={{ textAlign: 'center', fontSize: 13, color: colors.textSecondary, marginTop: 6 }}>
              {t.wrongNumber}{' '}
              <span style={{ color: colors.warning, fontWeight: 600, cursor: 'pointer' }}>{t.sendEmail}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}