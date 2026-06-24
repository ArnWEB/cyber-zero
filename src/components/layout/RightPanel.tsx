import { Conversation } from '../../data/types';

interface RightPanelProps {
  open: boolean;
  onToggle: () => void;
  conversation: Conversation | undefined;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getStageLabel(stage: string) {
  const labels: Record<string, string> = {
    idle: 'Idle',
    pulling: 'Pulling data',
    eda: 'Running EDA',
    features: 'Feature engineering',
    training: 'Training model',
    deploying: 'Deploying',
    monitoring: 'Monitoring',
  };
  return labels[stage] || stage;
}

export function RightPanel({ open, onToggle, conversation }: RightPanelProps) {
  const recentMessages = conversation?.messages.slice(-6) || [];

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onToggle}
        />
      )}

      {/* Panel */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-neutral-gray-light border-l border-neutral-gray-mid transform transition-transform duration-300
        xl:relative xl:translate-x-0 xl:z-0
        ${open ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
      `}>
        <div className="h-14 md:h-16 flex items-center px-4 md:px-6 border-b border-neutral-gray-mid justify-between shrink-0">
          <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">Pipeline Context</span>
          <button
            onClick={onToggle}
            className="material-symbols-outlined text-secondary cursor-pointer hover:bg-neutral-gray-mid rounded p-1"
          >
            close
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto h-[calc(100%-56px)] md:h-[calc(100%-64px)]">
          {/* Active Trace */}
          {conversation && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Trace</h3>
              <div className="bg-white border border-neutral-gray-mid p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-on-surface">Pipeline: {getStageLabel(conversation.pipelineStage)}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                    conversation.status === 'gate' ? 'bg-error-container text-on-error-container' :
                    conversation.status === 'running' ? 'bg-brand-yellow/20 text-on-primary-fixed-variant' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {conversation.status === 'gate' ? 'Waiting' : conversation.status === 'running' ? 'Active' : 'Done'}
                  </span>
                </div>
                <p className="text-xs text-secondary mb-3">Model: DFP v1.2 | F1: 0.94</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border border-white bg-neutral-gray-mid flex items-center justify-center text-[8px] font-bold">AI</div>
                  </div>
                  <span className="text-[10px] text-secondary">Morpheus Pipeline</span>
                </div>
              </div>
            </div>
          )}

          {/* Workflow Steps */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Workflow Step</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-yellow flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
                  </div>
                  <div className="w-0.5 h-12 bg-neutral-gray-mid"></div>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs font-bold text-on-surface">Data Ingestion</p>
                  <p className="text-[10px] text-secondary">1.2M records loaded</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    conversation?.pipelineStage === 'eda' || conversation?.pipelineStage === 'features' || conversation?.pipelineStage === 'training'
                      ? 'border-brand-yellow animate-pulse'
                      : conversation?.pipelineStage === 'deploying' || conversation?.pipelineStage === 'monitoring'
                      ? 'border-brand-yellow'
                      : 'border-neutral-gray-mid'
                  }`}>
                    {(conversation?.pipelineStage === 'eda' || conversation?.pipelineStage === 'features' || conversation?.pipelineStage === 'training') && (
                      <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
                    )}
                    {(conversation?.pipelineStage === 'deploying' || conversation?.pipelineStage === 'monitoring') && (
                      <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
                    )}
                  </div>
                  <div className="w-0.5 h-12 bg-neutral-gray-mid"></div>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs font-bold text-on-surface">Fingerprinting Logic</p>
                  <p className={`text-[10px] ${
                    conversation?.pipelineStage === 'eda' || conversation?.pipelineStage === 'features' || conversation?.pipelineStage === 'training'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}>
                    Status: {getStageLabel(conversation?.pipelineStage || 'idle')}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 opacity-40">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-gray-mid"></div>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs font-bold text-secondary">Deployment</p>
                  <p className="text-[10px] text-secondary">Status: Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Health Metrics */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Asset Integrity</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-neutral-gray-mid rounded-lg bg-white">
                <p className="text-[9px] font-bold text-secondary uppercase">Confidence</p>
                <p className="text-lg font-bold text-on-surface">98.2<span className="text-xs">%</span></p>
              </div>
              <div className="p-3 border border-neutral-gray-mid rounded-lg bg-white">
                <p className="text-[9px] font-bold text-secondary uppercase">Latency</p>
                <p className="text-lg font-bold text-on-surface">14<span className="text-xs">ms</span></p>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Recent Activity</h3>
            <div className="space-y-2">
              {recentMessages.map(msg => (
                <div key={msg.id} className="flex gap-2">
                  <div className="w-px bg-neutral-gray-mid flex-shrink-0 mt-1" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-secondary font-mono">{formatTime(msg.timestamp)}</p>
                    <p className="text-[11px] text-secondary truncate">
                      {msg.role === 'user' ? msg.content : 'Agent responded'}
                    </p>
                  </div>
                </div>
              ))}
              {recentMessages.length === 0 && (
                <p className="text-[11px] text-secondary italic">No activity yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-gray-mid bg-neutral-gray-light">
          <button className="w-full py-2 border border-surface-charcoal text-surface-charcoal text-[11px] font-bold uppercase rounded hover:bg-surface-charcoal hover:text-white transition-all">
            Export Context Log
          </button>
        </div>
      </aside>
    </>
  );
}
