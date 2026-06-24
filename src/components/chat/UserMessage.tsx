import { Message } from '../../data/types';

interface UserMessageProps {
  message: Message;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end gap-3 md:gap-4 max-w-3xl ml-auto">
      <div className="bg-neutral-gray-light p-3 md:p-4 rounded-xl rounded-tr-none border border-neutral-gray-mid shadow-sm">
        <p className="font-body-md text-body-sm md:text-body-md leading-relaxed text-on-surface">
          {message.content}
        </p>
      </div>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 overflow-hidden border border-neutral-gray-mid bg-secondary flex items-center justify-center">
        <span className="material-symbols-outlined text-white text-xs md:text-sm">person</span>
      </div>
    </div>
  );
}
