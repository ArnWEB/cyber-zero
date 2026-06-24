import { PlanStep } from '../../data/types';

interface GatePromptProps {
  gateType: string;
  gateStatus: string;
  summary: string;
  steps: PlanStep[];
  onApprove: () => void;
}

function getGateTitle(gateType: string) {
  switch (gateType) {
    case 'plan': return 'GATE 1: Confirm plan before proceeding';
    case 'eda': return 'GATE 2: Review EDA before training';
    case 'model': return 'GATE 3: Human sign-off required';
    default: return 'Action required';
  }
}

function getApproveLabel(gateType: string) {
  switch (gateType) {
    case 'plan': return 'Approve';
    case 'eda': return 'Approve & Train';
    case 'model': return 'Deploy';
    default: return 'Approve';
  }
}

export function GatePrompt({ gateType, gateStatus, summary, steps, onApprove }: GatePromptProps) {
  const isApproved = gateStatus === 'approved';

  return (
    <div className="flex gap-3 md:gap-4 max-w-3xl">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg shrink-0 bg-surface-charcoal flex items-center justify-center">
        <span className="material-symbols-outlined text-brand-yellow text-sm md:text-base">smart_toy</span>
      </div>
      <div className="flex-1">
        <div className={`bg-white p-4 md:p-6 rounded-lg border-2 shadow-sm ${isApproved ? 'border-green-500' : 'border-brand-yellow gate-active'}`}>
          <div className="flex items-center gap-2 mb-3 md:mb-4 text-primary">
            <span className="material-symbols-outlined text-sm md:text-base">{isApproved ? 'check_circle' : 'lock_open'}</span>
            <span className="font-label-sm uppercase tracking-wider text-[10px] md:text-xs">{isApproved ? 'Gate Approved' : 'Proposal Gate Required'}</span>
          </div>
          <h4 className="font-headline-md text-on-surface mb-2 text-sm md:text-base">{getGateTitle(gateType)}</h4>
          <p className="text-body-sm md:text-body-md text-secondary mb-4 md:mb-6">{summary}</p>

          {/* Expandable Steps */}
          {steps && steps.length > 0 && (
            <details className="group border border-neutral-gray-mid rounded overflow-hidden mb-4 md:mb-6">
              <summary className="flex items-center justify-between p-3 md:p-4 cursor-pointer bg-neutral-gray-light hover:bg-neutral-gray-mid transition-colors list-none">
                <span className="font-label-sm text-on-surface text-xs md:text-sm">View Detailed Implementation Steps</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-sm md:text-base">expand_more</span>
              </summary>
              <div className="p-3 md:p-4 bg-white space-y-3 md:space-y-4 text-body-sm md:text-body-md border-t border-neutral-gray-mid">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 md:gap-3">
                    <span className="font-bold text-primary text-xs md:text-sm">{String(step.step).padStart(2, '0')}.</span>
                    <p className="text-xs md:text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Gate Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
            <button
              onClick={onApprove}
              disabled={isApproved}
              className={`flex-1 min-w-[100px] sm:min-w-[120px] font-bold h-10 md:h-11 rounded flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 text-xs md:text-sm ${
                isApproved
                  ? 'bg-green-100 border border-green-500 text-green-700'
                  : 'bg-brand-yellow text-on-primary-fixed-variant hover:opacity-90'
              }`}
            >
              <span className="material-symbols-outlined text-sm md:text-base">{isApproved ? 'check_circle' : 'check_circle'}</span>
              <span>{isApproved ? 'Approved' : getApproveLabel(gateType)}</span>
            </button>
            <button
              disabled={isApproved}
              className="flex-1 min-w-[100px] sm:min-w-[120px] bg-white border border-surface-charcoal text-surface-charcoal font-bold h-10 md:h-11 rounded flex items-center justify-center gap-2 hover:bg-neutral-gray-light transition-all cursor-pointer disabled:opacity-50 text-xs md:text-sm"
            >
              <span className="material-symbols-outlined text-sm md:text-base">edit</span>
              <span>Modify</span>
            </button>
            <button
              disabled={isApproved}
              className="flex-1 min-w-[100px] sm:min-w-[120px] bg-surface-charcoal text-white font-bold h-10 md:h-11 rounded flex items-center justify-center gap-2 hover:bg-black transition-all cursor-pointer disabled:opacity-50 text-xs md:text-sm"
            >
              <span className="material-symbols-outlined text-sm md:text-base">cancel</span>
              <span>Cancel</span>
            </button>
          </div>
        </div>
        <span className="text-[9px] md:text-[10px] text-secondary mt-2 block">Agent CyberMorph-01 &bull; {isApproved ? 'Gate approved' : 'Waiting for user input...'}</span>
      </div>
    </div>
  );
}
