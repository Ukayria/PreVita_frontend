import { useState } from 'react';
import colors from '../colors';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const CLINICS = [
  { name: 'Lagos Island General Hospital', address: '1 Hospital RD, Lagos Island', distance: '0.8km', walk: '10 min walk', status: 'Open now', badge: 'NHIS', rating: 4.5 },
  { name: 'Reddington Hospital', address: '12 Idejo St, Victoria Island', distance: '1.9km', walk: '25 min walk', status: '24 hrs', badge: '', rating: 4.8 },
  { name: 'Broad Street Clinic', address: '22 Broad St, Lagos Island', distance: '2.4km', walk: '30 min walk', status: 'Open now', badge: 'Free OPD', rating: 4.3 },
];

export default function NearbyClinicScreen({ onBack, onNavigate, language = 'English', symptoms = [], riskLevel = 'Medium', user }) {
  const t = translations[language] || translations.English;
  const [selected, setSelected] = useState(null);
  const refCode = `PV-REF-${Date.now().toString().slice(-4)}`;

  if (selected !== null) {
    const clinic = CLINICS[selected];
    return (
      <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
        <div style={{ background: colors.primary, padding: '48px 20px 20px' }}>
          <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{t.yourAllSet}</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>{t.headToClinic}</p>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: `2px solid ${colors.primary}` }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: '0 0 6px' }}>{t.referralSent}</h3>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: 0 }}>{clinic.name}</p>
          </div>

          {/* Clinic details */}
          <div style={{ background: colors.surface, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 16 }}>
            {[
              [t.clinic, clinic.name],
              [t.address, clinic.address],
              [t.distance, `${clinic.distance} ~ ${clinic.walk}`],
              [t.status, clinic.status],
              [t.ref, refCode],
            ].map(([label, val], i, arr) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: label === t.ref ? colors.primary : colors.textPrimary, margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Referral slip */}
          <div style={{ background: colors.primaryTint, borderRadius: 14, padding: '14px 16px', marginBottom: 16, border: `1px solid ${colors.border}` }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: colors.primary, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.yourReferralSlip}</p>
            <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 12px' }}>{t.showAtReception}</p>
            <div style={{ background: colors.surface, borderRadius: 10, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              {[
                [t.patient, user?.fullName || 'Patient'],
                ['Symptoms', symptoms.join(', ') || 'N/A'],
                ['Risk level', riskLevel],
                [t.ref, refCode],
              ].map(([label, val], i, arr) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: label === 'Risk level' ? (riskLevel === 'High' ? colors.danger : riskLevel === 'Medium' ? '#8B5E00' : colors.primary) : colors.textPrimary, margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: colors.textSecondary, margin: '0 0 20px' }}>{t.safeJourney}</p>

          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: '📍', label: t.directions },
              { icon: '📞', label: t.callClinic },
              { icon: '↗', label: t.shareSlip },
            ].map(a => (
              <button key={a.label} style={{ flex: 1, padding: '12px 8px', borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.surface, cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>{a.icon}</span>
                <p style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>{a.label}</p>
              </button>
            ))}
          </div>
        </div>
        <BottomNav active="check" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      <div style={{ background: colors.primary, padding: '48px 20px 20px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{t.nearbyClinics}</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>3 open near you · Lagos Island</p>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Map placeholder */}
        <div style={{ width: '100%', height: 180, borderRadius: 16, background: '#E8F0E8', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}`, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)' }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <span style={{ fontSize: 32 }}>🗺️</span>
            <p style={{ fontSize: 13, color: colors.primary, fontWeight: 600, margin: '4px 0 0' }}>Lagos Island, Nigeria</p>
          </div>
          {/* Pin */}
          <div style={{ position: 'absolute', top: '40%', left: '50%', fontSize: 24 }}>📍</div>
        </div>

        <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.openNow}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {CLINICS.map((clinic, i) => (
            <div key={i} style={{ background: i === 0 ? colors.primaryTint : colors.surface, borderRadius: 14, padding: '14px 16px', border: `1.5px solid ${i === 0 ? colors.primary : colors.border}`, cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center' }} onClick={() => {}}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🏥</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 3px' }}>{clinic.name}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 4px' }}>{clinic.address}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>{clinic.status}</span>
                  {clinic.badge && <span style={{ fontSize: 11, background: colors.primaryTint, color: colors.primary, padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>{clinic.badge}</span>}
                  <span style={{ fontSize: 11, color: '#8B5E00' }}>★ {clinic.rating}</span>
                </div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>{clinic.distance}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setSelected(0)} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          {t.goTo} {CLINICS[0].name} →
        </button>
      </div>
      <BottomNav active="check" onNavigate={onNavigate} />
    </div>
  );
}