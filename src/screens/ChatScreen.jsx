import { useState, useRef, useEffect } from 'react';
import colors from '../colors';
import translations from '../i18n';
import logo from '../assets/logo.png';

const API_BASE = 'https://previta-backend.onrender.com';

async function askPreVitaAI(messages, language) {
  const response = await fetch(`${API_BASE}/api/v1/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, language }),
  });
  if (!response.ok) throw new Error('Server error');
  const data = await response.json();
  return data.reply;
}

// for voice language



export default function ChatScreen({ onBack, language = 'English', user }) {
  const t = translations[language] || translations.English;
  const name = user?.fullName?.split(' ')[0] || 'there';
// old
  // const GREETING = `Hi ${name}, I'm PreVita AI. Tell me how you're feeling and I'll help assess your symptoms. What brings you here today?`;
// old
// new
  const GREETING = t.chatGreeting.replace('{name}', name);
// new
  const [messages, setMessages] = useState([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);


  // voice to text
  const [listening, setListening] = useState(false);

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Voice input is not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();

  const speechLanguages = {
    English: 'en-US',
    French: 'fr-FR',
    Swahili: 'sw-KE',
    Portuguese: 'pt-PT',
  };

  recognition.lang = speechLanguages[language] || 'en-US';
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setInput(prev =>
      prev ? `${prev} ${transcript}` : transcript
    );
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
};

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError('');
    const userMsg = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const reply = await askPreVitaAI(
        updated.map(m => ({ role: m.role, content: m.content })),
        language
      );
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setError('Could not connect. Please check your internet and try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: colors.primary, padding: '48px 20px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <img src={logo} alt="PreVita AI" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div>
          <p style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{t.chatTitle}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADE80' }} />
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0 }}>{t.chatSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: colors.textLight, background: colors.border, padding: '3px 12px', borderRadius: 99 }}>
            {t.chatToday}
          </span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12, alignItems: 'flex-end', gap: 8 }}>
            {msg.role === 'assistant' && (
              <img src={logo} alt="PreVita" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div style={{
              maxWidth: '75%', padding: '12px 14px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? colors.primary : colors.surface,
              color: msg.role === 'user' ? '#fff' : colors.textPrimary,
              fontSize: 14, lineHeight: 1.6,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 }}>
            <img src={logo} alt="PreVita" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ background: colors.surface, padding: '12px 16px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: colors.primary, animation: `bounce 1s ease ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: colors.dangerTint, borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: colors.danger }}>
            ⚠ {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input New*/}
      <div
  style={{
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px 32px',
    background: colors.surface,
    borderTop: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
  }}
>
  <div
    style={{
      width: '100%',
      maxWidth: 700,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
    }}
  >
    {/* Input
    <input
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && send(input)}
      placeholder={t.chatPlaceholder}
      style={{
        flex: 1,
        minWidth: 0,
        padding: '12px 16px',
        borderRadius: 99,
        border: `1px solid ${colors.border}`,
        fontSize: 14,
        outline: 'none',
        fontFamily: 'inherit',
        background: colors.background,
        color: colors.textPrimary,
        boxSizing: 'border-box',
      }}
    /> */}
    <textarea
  value={input}
  onChange={e => {
    setInput(e.target.value);

    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  }}
  onKeyDown={e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }}
  placeholder={t.chatPlaceholder}
  rows={1}
  style={{
    flex: 1,
    minWidth: 0,
    minHeight: 44,
    maxHeight: 120,
    padding: '12px 16px',
    borderRadius: 22,
    border: `1px solid ${colors.border}`,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    background: colors.background,
    color: colors.textPrimary,
    boxSizing: 'border-box',
    resize: 'none',
    overflowY: 'auto',
    lineHeight: 1.5,
  }}
/>

    {/* Voice */}
    <button
      onClick={startListening}
      aria-label="Voice input"
      style={{
        width: 44,
        height: 44,
        minWidth: 44,
        borderRadius: '50%',
        background: listening ? colors.danger : colors.primary,
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 18,
      }}
    >
      {listening ? '⏹' : '🎤'}
    </button>

    {/* Send */}
    <button
      onClick={() => send(input)}
      disabled={!input.trim()}
      style={{
        width: 44,
        height: 44,
        minWidth: 44,
        borderRadius: '50%',
        background: input.trim() ? colors.primary : colors.border,
        border: 'none',
        cursor: input.trim() ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </button>
  </div>
</div>
      {/* Input New */}
      

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  );
}