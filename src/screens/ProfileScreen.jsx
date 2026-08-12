import { useState } from 'react';
import colors from '../colors';
//new
import translations from '../i18n';
//new
import { ProfileIcon, SignOutIcon, TrashIcon } from '../components/Icons';
import BottomNav from '../components/BottomNav';

export default function ProfileScreen({ user, onNavigate, onSignOut, language, onLanguageChange }) {
  
   //new
  const t = translations[language] || translations.English;
  //new 
  
  const [form, setForm] = useState({
    fullName: user?.fullName || 'Abioye Hanat',
    email: user?.email || '',
    phone: user?.phone || '',
  });


  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

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
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 100 }}>
      <div style={{ background: colors.primary, padding: '48px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProfileIcon size={28} color="#fff" />
          </div>
          <div>
            <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 2px' }}>{form.fullName}</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>
              {saved ? 'Your settings have been changed' : 'Tap a field below to edit your profile'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Profile */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>Profile Update</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
             {/* {[['fullName','Full Name'], ['email','Email'], ['phone','Phone Number']].map(([k, label]) => (*/}
            
             {/* new */}
             {[
  ['fullName', t.fullName],
  ['email', t.email],
  ['phone', t.phoneNumber]
].map(([k, label]) => (
  // new
              <div key={k}>
                <label style={labelStyle}>{label}</label>
                <input style={inputStyle} value={form[k]} onChange={e => update(k, e.target.value)} />
              </div>
            ))} 
          </div>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{
            width: '100%', padding: 14, borderRadius: 12, border: 'none',
            background: saved ? colors.primaryTint : colors.primary,
            color: saved ? colors.primary : '#fff',
            fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 16,
          }}>
            {/* {saved ? '✓ Changes saved' : 'Save changes'} */}
            {saved ? t.changesSaved : t.saveChanges}
          </button>
        </div>

        {/* Preferences */}
        <div style={{ background: colors.surface, borderRadius: 16, padding: '16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>{t.preferences}</p>

          {/* Language — actually works now */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: `1px solid ${colors.border}`, marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{t.language}</p>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{t.appLanguage}</p>
            </div>
            <select
              value={language}
              onChange={e => onLanguageChange(e.target.value)}
              style={{ border: `1px solid ${colors.border}`, borderRadius: 8, padding: '6px 10px', fontSize: 14, color: colors.textPrimary, background: colors.surface, fontFamily: 'inherit', cursor: 'pointer' }}
            >
              {['English', 'French', 'Swahili', 'Portuguese'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Notifications toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{t.notifications}</p>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{t.notifSub}</p>
            </div>
            <div onClick={() => setNotifications(!notifications)} style={{
              width: 48, height: 26, borderRadius: 99, cursor: 'pointer',
              background: notifications ? colors.primary : colors.border,
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 3, left: notifications ? 24 : 4,
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div style={{ background: colors.surface, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
          <button onClick={onSignOut} style={{ width: '100%', padding: '16px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', borderBottom: `1px solid ${colors.border}`, fontFamily: 'inherit' }}>
            <SignOutIcon size={20} color={colors.danger} />
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.danger }}>{t.signOutBtn}</span>
            <span style={{ marginLeft: 'auto', color: colors.textLight }}>›</span>
          </button>
          <button style={{ width: '100%', padding: '16px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
            <TrashIcon size={20} color={colors.danger} />
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.danger }}>{t.deleteAccount}</span>
            <span style={{ marginLeft: 'auto', color: colors.textLight }}>›</span>
          </button>
        </div>
      </div>

      {/* <BottomNav active="profile" onNavigate={onNavigate} /> */}

      {/* new */}

      <BottomNav
  active="profile"
  onNavigate={onNavigate}
  language={language}
/>
    </div>
  );
}