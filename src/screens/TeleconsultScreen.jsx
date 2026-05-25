import { useState } from 'react';
import colors from '../colors';
import BottomNav from '../components/BottomNav';
import translations from '../i18n';

const DOCTORS = [
  { name: 'Dr. Evanson Solomon', specialty: 'General practitioner', exp: 8, rating: 4.8 },
  { name: 'Dr. Amaka Obi', specialty: 'General practitioner', exp: 6, rating: 4.7 },
  { name: 'Dr. Chukwu James', specialty: 'General practitioner', exp: 10, rating: 4.9 },
];

const TIMES = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

const DAYS = { MON:1, TUE:2, WED:3, THU:4, FRI:5, SAT:6, SUN:7 };

export default function TeleconsultScreen({ onBack, onNavigate, language = 'English', symptoms = [] }) {
  const t = translations[language] || translations.English;
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSession, setSelectedSession] = useState('Video call');
  const [selectedDay, setSelectedDay] = useState(25);
  const bookingRef = `PV-${Date.now().toString().slice(-8)}`;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: colors.primary, padding: '48px 20px 20px' }}>
        <button onClick={step > 1 ? () => setStep(step - 1) : onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: 8, padding: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0, textAlign: 'center' }}>
          {step === 1 ? t.bookConsult : step === 2 ? t.pickTime : t.bookingConfirmed}
        </h2>
      </div>

      <div style={{ padding: '20px' }}>
        {step === 1 && (
          <>
            <div style={{ background: colors.primaryTint, borderRadius: 12, padding: '12px 16px', marginBottom: 20, border: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: 14, color: colors.primary, margin: 0 }}>{t.basedOnSymptoms}</p>
            </div>
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>{t.availableDoctors}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {DOCTORS.map((doc, i) => (
                <div key={i} onClick={() => setSelectedDoctor(i)} style={{
                  background: colors.surface, borderRadius: 14, padding: '14px 16px',
                  border: `2px solid ${selectedDoctor === i ? colors.primary : colors.border}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍⚕️</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{doc.name}</p>
                    <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 4px' }}>{doc.specialty} · {doc.exp} {t.yearsExp}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: colors.primary, fontWeight: 600 }}>● {t.availableNow}</span>
                      <span style={{ fontSize: 11, color: '#8B5E00' }}>★ {doc.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {t.continueWith} {DOCTORS[selectedDoctor].name.split(' ')[1]} →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Selected doctor */}
            <div style={{ background: colors.surface, borderRadius: 14, padding: '14px 16px', marginBottom: 20, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍⚕️</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>{DOCTORS[selectedDoctor].name}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{DOCTORS[selectedDoctor].specialty} · ★ {DOCTORS[selectedDoctor].rating}</p>
              </div>
              <button onClick={() => setStep(1)} style={{ fontSize: 13, color: colors.primary, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{t.change}</button>
            </div>

            {/* Calendar */}
            <p style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary, margin: '0 0 12px' }}>April 2026</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 20 }}>
              {Object.keys(DAYS).map(d => <p key={d} style={{ fontSize: 11, fontWeight: 600, color: colors.textLight, textAlign: 'center', margin: '0 0 6px' }}>{d}</p>)}
              {Array.from({length: 30}, (_, i) => i + 1).map(day => (
                <button key={day} onClick={() => setSelectedDay(day)} style={{
                  padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: selectedDay === day ? colors.primary : 'transparent',
                  color: selectedDay === day ? '#fff' : colors.textPrimary,
                  fontSize: 13, fontWeight: selectedDay === day ? 700 : 400, fontFamily: 'inherit',
                }}>{day}</button>
              ))}
            </div>

            {/* Times */}
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>{t.availableTimes} — {selectedDay} APR</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
              {TIMES.map(time => (
                <button key={time} onClick={() => setSelectedTime(time)} style={{
                  padding: '10px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  background: selectedTime === time ? colors.primary : colors.surface,
                  color: selectedTime === time ? '#fff' : colors.textPrimary,
                  border: `1.5px solid ${selectedTime === time ? colors.primary : colors.border}`,
                  fontSize: 13, fontWeight: selectedTime === time ? 600 : 400,
                }}>{time}</button>
              ))}
            </div>

            {/* Session type */}
            <p style={{ fontSize: 12, fontWeight: 600, color: colors.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>{t.sessionType}</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[
                { label: t.videoCall, sub: t.recommendation2 },
                { label: t.videoCallLowData, sub: '' },
                { label: t.chat, sub: 'Text only' },
              ].map(s => (
                <button key={s.label} onClick={() => setSelectedSession(s.label)} style={{
                  flex: 1, padding: '10px 8px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  background: selectedSession === s.label ? colors.primaryTint : colors.surface,
                  border: `1.5px solid ${selectedSession === s.label ? colors.primary : colors.border}`,
                  color: selectedSession === s.label ? colors.primary : colors.textSecondary,
                  fontSize: 12, fontWeight: 500, textAlign: 'center',
                }}>
                  <p style={{ margin: '0 0 2px', fontWeight: 600 }}>{s.label}</p>
                  {s.sub && <p style={{ margin: 0, fontSize: 10, color: colors.primary }}>{s.sub}</p>}
                </button>
              ))}
            </div>

            <button onClick={() => setStep(3)} disabled={!selectedTime} style={{
              width: '100%', padding: 16, borderRadius: 12, border: 'none',
              background: selectedTime ? colors.primary : colors.border,
              color: selectedTime ? '#fff' : colors.textLight,
              fontSize: 15, fontWeight: 600, cursor: selectedTime ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
            }}>
              {t.reviewBooking}
            </button>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px auto 20px', border: `2px solid ${colors.primary}` }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.textPrimary, margin: '0 0 8px' }}>{t.yourBooked}</h2>
            <p style={{ fontSize: 14, color: colors.textSecondary, margin: '0 0 24px' }}>{t.reminderSent}</p>

            {/* Doctor card */}
            <div style={{ background: colors.surface, borderRadius: 14, padding: '14px 16px', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, textAlign: 'left' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: colors.primaryTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍⚕️</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 2px' }}>{DOCTORS[selectedDoctor].name}</p>
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>{DOCTORS[selectedDoctor].specialty}</p>
              </div>
            </div>

            {/* Booking details */}
            <div style={{ background: colors.surface, borderRadius: 14, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 16, textAlign: 'left' }}>
              {[
                [t.date, `Friday, ${selectedDay} April 2026`],
                [t.time, selectedTime],
                [t.session, selectedSession],
                [t.bookingRef, bookingRef],
              ].map(([label, val], i, arr) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: label === t.bookingRef ? colors.primary : colors.textPrimary, margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Shared with doctor */}
            {symptoms.length > 0 && (
              <div style={{ background: colors.primaryTint, borderRadius: 12, padding: '12px 16px', marginBottom: 24, textAlign: 'left', border: `1px solid ${colors.border}` }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: colors.primary, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.sharedWithDoctor}</p>
                <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0 }}>Symptoms: {symptoms.join(', ')}</p>
              </div>
            )}

            <button style={{ width: '100%', padding: 16, borderRadius: 12, border: 'none', background: colors.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 12 }}>
              {t.joinCall} {selectedTime}
            </button>
            <button style={{ width: '100%', padding: 14, borderRadius: 12, border: `1.5px solid ${colors.border}`, background: colors.surface, color: colors.textPrimary, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {t.addCalendar}
            </button>
          </div>
        )}
      </div>

      <BottomNav active="check" onNavigate={onNavigate} />
    </div>
  );
}