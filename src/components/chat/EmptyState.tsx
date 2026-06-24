interface EmptyStateProps {
  onSendMessage: (message: string) => void;
  onMenuClick: () => void;
  onContextClick: () => void;
}

const quickActions = [
  { label: 'Run DFP on sample logs', icon: 'psychology' },
  { label: 'Show me anomalies', icon: 'monitoring' },
  { label: 'Analyze SharePoint access', icon: 'folder_shared' },
  { label: 'What data is available?', icon: 'database' },
];

export function EmptyState({ onSendMessage, onMenuClick, onContextClick }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Header */}
      <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 border-b border-neutral-gray-mid shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden material-symbols-outlined text-secondary hover:text-primary transition-colors p-1"
          >
            menu
          </button>
          <div className="w-8 h-8 rounded bg-brand-yellow flex items-center justify-center">
            <span className="material-symbols-outlined text-surface-charcoal text-sm">smart_toy</span>
          </div>
          <div className="hidden sm:block">
            <h2 className="font-label-sm text-label-sm text-surface-charcoal">MorphAgent Alpha</h2>
            <p className="text-[11px] text-secondary">Ready for instructions</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-surface-charcoal hidden sm:block">search</span>
          <button
            onClick={onContextClick}
            className="material-symbols-outlined text-secondary cursor-pointer hover:text-surface-charcoal"
          >
            info
          </button>
          <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-surface-charcoal">more_vert</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="max-w-2xl text-center w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded bg-brand-yellow flex items-center justify-center">
            <span className="material-symbols-outlined text-surface-charcoal text-3xl">smart_toy</span>
          </div>

          <h2 className="text-headline-md md:text-headline-lg text-on-surface mb-2 font-bold">
            Welcome to CyberMorph
          </h2>
          <p className="text-body-md md:text-body-lg text-secondary mb-6 md:mb-8">
            AI-powered threat detection from your M365 logs.
            <br className="hidden sm:block" />
            <span className="text-primary font-semibold">Try it with sample data</span> to see it in action.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => onSendMessage(action.label)}
                className="flex items-center gap-3 px-4 py-3 bg-neutral-gray-light border border-neutral-gray-mid rounded-lg hover:border-brand-yellow/50 hover:bg-neutral-gray-mid transition-colors text-left group"
              >
                <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">{action.icon}</span>
                <span className="text-sm text-secondary group-hover:text-on-surface transition-colors">{action.label}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-mid" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-secondary">or type anything</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <footer className="p-3 md:p-6 md:pt-0 shrink-0 bg-white border-t md:border-t-0 border-neutral-gray-mid md:border-none">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2 md:gap-3 p-2 bg-white border-2 border-neutral-gray-mid focus-within:border-brand-yellow rounded-xl transition-all duration-200">
            <button className="p-2 text-secondary hover:text-surface-charcoal hidden sm:block">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <textarea
              placeholder="Type a command..."
              rows={1}
              className="flex-1 py-2 px-1 border-none focus:ring-0 resize-none font-body-md text-body-md placeholder:text-neutral-gray-mid max-h-32 min-h-[40px]"
            />
            <button className="p-3 bg-surface-charcoal text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <div className="hidden md:flex justify-center mt-3 gap-6">
            <div className="flex items-center gap-2 text-[11px] text-secondary uppercase font-bold tracking-tight cursor-pointer hover:text-primary">
              <span className="material-symbols-outlined text-xs">history</span> Recent Actions
            </div>
            <div className="flex items-center gap-2 text-[11px] text-secondary uppercase font-bold tracking-tight cursor-pointer hover:text-primary">
              <span className="material-symbols-outlined text-xs">lock</span> Confidential Workspace
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
