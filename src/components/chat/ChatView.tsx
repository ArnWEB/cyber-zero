import { useState, useRef, useEffect } from 'react';
import { Conversation } from '../../data/types';
import { AgentMessage } from './AgentMessage';
import { UserMessage } from './UserMessage';
import { GatePrompt } from './GatePrompt';
import { EmptyState } from './EmptyState';

interface ChatViewProps {
  conversation: Conversation | undefined;
  onSendMessage: (content: string) => void;
  onApproveGate: (gateType: string) => void;
  onMenuClick: () => void;
  onContextClick: () => void;
}

export function ChatView({ conversation, onSendMessage, onApproveGate, onMenuClick, onContextClick }: ChatViewProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  if (!conversation || conversation.messages.length === 0) {
    return <EmptyState onSendMessage={onSendMessage} onMenuClick={onMenuClick} onContextClick={onContextClick} />;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Chat Header */}
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
            <p className="text-[11px] text-secondary truncate max-w-[200px] md:max-w-none">{conversation.title}</p>
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

      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scroll-hide pb-20 md:pb-6">
        {conversation.messages.map(msg => {
          if (msg.role === 'user') {
            return <UserMessage key={msg.id} message={msg} />;
          }

          if (msg.type === 'gate') {
            return (
              <GatePrompt
                key={msg.id}
                gateType={msg.metadata?.gateType as string}
                gateStatus={msg.metadata?.gateStatus as string}
                summary={msg.metadata?.summary as string}
                steps={msg.metadata?.steps as any[]}
                onApprove={() => onApproveGate(msg.metadata?.gateType as string)}
              />
            );
          }

          return <AgentMessage key={msg.id} message={msg} />;
        })}
        <div ref={messagesEndRef} />
      </section>

      {/* Input */}
      <footer className="p-3 md:p-6 md:pt-0 shrink-0 bg-white border-t md:border-t-0 border-neutral-gray-mid md:border-none">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-2 md:gap-3 p-2 bg-white border-2 border-neutral-gray-mid focus-within:border-brand-yellow rounded-xl transition-all duration-200">
            <button className="p-2 text-secondary hover:text-surface-charcoal hidden sm:block">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              rows={1}
              className="flex-1 py-2 px-1 border-none focus:ring-0 resize-none font-body-md text-body-md placeholder:text-neutral-gray-mid max-h-32 min-h-[40px]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-surface-charcoal text-white rounded-lg hover:bg-black transition-colors flex items-center justify-center disabled:opacity-50"
            >
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
