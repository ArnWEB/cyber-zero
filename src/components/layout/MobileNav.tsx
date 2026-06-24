interface MobileNavProps {
  currentView: 'chat' | 'dashboard';
  onNavigate: (view: 'chat' | 'dashboard') => void;
  onMenuClick: () => void;
}

export function MobileNav({ currentView, onNavigate, onMenuClick }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-neutral-gray-mid flex items-center justify-around z-50">
      <button
        onClick={onMenuClick}
        className="flex flex-col items-center gap-0.5 p-2 text-secondary hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined">menu</span>
        <span className="text-[9px] font-bold">Menu</span>
      </button>
      <button
        onClick={() => onNavigate('chat')}
        className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
          currentView === 'chat' ? 'text-primary font-bold' : 'text-secondary'
        }`}
      >
        <span className="material-symbols-outlined">chat_bubble</span>
        <span className="text-[9px]">Chat</span>
      </button>
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
          currentView === 'dashboard' ? 'text-primary font-bold' : 'text-secondary'
        }`}
      >
        <span className="material-symbols-outlined">analytics</span>
        <span className="text-[9px]">Analytics</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 p-2 text-secondary hover:text-primary transition-colors">
        <span className="material-symbols-outlined">folder_shared</span>
        <span className="text-[9px]">Projects</span>
      </button>
      <button className="flex flex-col items-center gap-0.5 p-2 text-secondary hover:text-primary transition-colors">
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[9px]">Settings</span>
      </button>
    </nav>
  );
}
