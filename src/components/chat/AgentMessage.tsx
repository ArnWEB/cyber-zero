import { useState, useEffect } from 'react';
import { Message } from '../../data/types';

interface AgentMessageProps {
  message: Message;
}

export function AgentMessage({ message }: AgentMessageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!message.content) {
      setIsTyping(false);
      return;
    }

    let idx = 0;
    const text = message.content;
    const interval = setInterval(() => {
      idx++;
      setDisplayedText(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message.content]);

  if (!message.content && message.type !== 'text') {
    return null;
  }

  return (
    <div className="flex gap-3 md:gap-4 max-w-3xl">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg shrink-0 bg-surface-charcoal flex items-center justify-center">
        <span className="material-symbols-outlined text-brand-yellow text-sm md:text-base">smart_toy</span>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary">CyberMorph AI Agent</span>
          {isTyping && <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>}
        </div>
        <div className="border border-neutral-gray-mid p-3 md:p-5 rounded-xl bg-neutral-gray-light/30">
          <p className="font-body-md text-body-sm md:text-body-md leading-relaxed text-on-surface whitespace-pre-wrap">
            {displayedText}
            {isTyping && <span className="inline-block w-0.5 h-4 bg-brand-yellow ml-0.5 animate-pulse" />}
          </p>
        </div>
      </div>
    </div>
  );
}
