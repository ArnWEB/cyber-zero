import { Conversation, ConversationStatus } from '../../data/types';

interface LeftSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onNavigate: (view: 'chat' | 'dashboard') => void;
  currentView: 'chat' | 'dashboard';
}

function getStatusIcon(status: ConversationStatus) {
  switch (status) {
    case 'running':
      return <span className="material-symbols-outlined text-sm text-brand-yellow">sync</span>;
    case 'gate':
      return <span className="material-symbols-outlined text-sm text-error">warning</span>;
    case 'completed':
      return <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>;
    case 'error':
      return <span className="material-symbols-outlined text-sm text-error">error</span>;
    case 'draft':
      return <span className="material-symbols-outlined text-sm text-secondary">draft</span>;
  }
}

function getStatusLabel(status: ConversationStatus) {
  switch (status) {
    case 'running': return 'Running';
    case 'gate': return 'Needs attention';
    case 'completed': return 'Done';
    case 'error': return 'Failed';
    case 'draft': return 'Draft';
  }
}

function formatTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = diff / (1000 * 60 * 60);
  if (hours < 24) return 'Today';
  if (hours < 48) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function LeftSidebar({ conversations, activeId, onSelect, onNewChat, onNavigate, currentView }: LeftSidebarProps) {
  const activeConvs = conversations.filter(c => c.status === 'running' || c.status === 'gate');
  const completedConvs = conversations.filter(c => c.status === 'completed');
  const draftConvs = conversations.filter(c => c.status === 'draft');

  const gateCount = conversations.filter(c => c.status === 'gate').length;

  return (
    <aside className="flex flex-col h-full w-64 bg-neutral-gray-light border-r border-neutral-gray-mid py-6 px-4 shrink-0">
      {/* Header */}
      <div className="mb-8 px-2">
        <h1 className="text-headline-md font-bold text-on-surface">CyberMorph</h1>
        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Enterprise Instance</p>
      </div>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="mb-8 w-full py-3 px-4 bg-brand-yellow text-surface-charcoal font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all"
      >
        <span className="material-symbols-outlined">chat_bubble</span>
        <span className="font-label-sm text-label-sm">New Chat</span>
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        <div
          onClick={() => onNavigate('chat')}
          className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-lg ${
            currentView === 'chat'
              ? 'bg-brand-yellow text-on-primary-fixed-variant font-bold'
              : 'text-secondary hover:bg-neutral-gray-mid'
          }`}
        >
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="font-label-sm text-label-sm">Direct Messages</span>
          {gateCount > 0 && (
            <span className="ml-auto px-1.5 py-0.5 bg-error text-white text-[9px] font-bold rounded-full">
              {gateCount}
            </span>
          )}
        </div>
        <div
          onClick={() => onNavigate('dashboard')}
          className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-lg ${
            currentView === 'dashboard'
              ? 'bg-brand-yellow text-on-primary-fixed-variant font-bold'
              : 'text-secondary hover:bg-neutral-gray-mid'
          }`}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-sm text-label-sm">Analytics</span>
        </div>
        <div className="flex items-center gap-3 p-3 transition-all cursor-pointer text-secondary hover:bg-neutral-gray-mid rounded-lg">
          <span className="material-symbols-outlined">folder_shared</span>
          <span className="font-label-sm text-label-sm">Projects</span>
        </div>
        <div className="flex items-center gap-3 p-3 transition-all cursor-pointer text-secondary hover:bg-neutral-gray-mid rounded-lg">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-sm text-label-sm">Archives</span>
        </div>
      </nav>

      {/* Conversations */}
      <div className="mt-4 space-y-1 overflow-y-auto max-h-64">
        {activeConvs.length > 0 && (
          <>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest px-3 mb-2">Active</p>
            {activeConvs.map(conv => (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-lg ${
                  conv.id === activeId
                    ? 'bg-surface-container-high text-on-surface font-bold'
                    : 'text-secondary hover:bg-neutral-gray-mid'
                }`}
              >
                {getStatusIcon(conv.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] truncate">{conv.title}</p>
                  <p className="text-[10px] text-secondary">{getStatusLabel(conv.status)}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {completedConvs.length > 0 && (
          <>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest px-3 mb-2 mt-4">Completed</p>
            {completedConvs.map(conv => (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-lg ${
                  conv.id === activeId
                    ? 'bg-surface-container-high text-on-surface font-bold'
                    : 'text-secondary hover:bg-neutral-gray-mid'
                }`}
              >
                {getStatusIcon(conv.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] truncate">{conv.title}</p>
                  <p className="text-[10px] text-secondary">{formatTime(conv.updatedAt)}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {draftConvs.length > 0 && (
          <>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest px-3 mb-2 mt-4">Drafts</p>
            {draftConvs.map(conv => (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`flex items-center gap-3 p-3 transition-all cursor-pointer rounded-lg ${
                  conv.id === activeId
                    ? 'bg-surface-container-high text-on-surface font-bold'
                    : 'text-secondary hover:bg-neutral-gray-mid'
                }`}
              >
                {getStatusIcon(conv.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] truncate">{conv.title}</p>
                  <p className="text-[10px] text-secondary">{formatTime(conv.createdAt)}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-neutral-gray-mid pt-4 space-y-1">
        <div className="flex items-center gap-3 p-3 transition-all cursor-pointer text-secondary hover:bg-neutral-gray-mid rounded-lg">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-sm text-label-sm">Help</span>
        </div>
        <div className="flex items-center gap-3 p-3 transition-all cursor-pointer text-secondary hover:bg-neutral-gray-mid rounded-lg">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-sm text-label-sm">Sign Out</span>
        </div>
      </div>
    </aside>
  );
}
