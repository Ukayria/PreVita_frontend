import colors from '../colors';
import { HomeIcon, CheckIcon, HistoryIcon, ProfileIcon } from './Icons';

const tabs = [
  { id: 'home',    label: 'Home',    Icon: HomeIcon    },
  { id: 'check',   label: 'Check',   Icon: CheckIcon   },
  { id: 'history', label: 'History', Icon: HistoryIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <div style={{
      position: 'fixed',
       bottom: 0, left: 0,
      width: '100%', background: colors.surface,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex', zIndex: 100, paddingBottom: 8,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => onNavigate(id)} style={{
            flex: 1, padding: '10px 0 4px', border: 'none',
            background: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          }}>
            <Icon size={22} color={isActive ? colors.primary : colors.textLight} />
            <span style={{
              fontSize: 11, fontWeight: isActive ? 600 : 400,
              color: isActive ? colors.primary : colors.textLight,
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
