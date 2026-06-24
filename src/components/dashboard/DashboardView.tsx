import { useState, useEffect } from 'react';
import { sampleDashboardData } from '../../data/stubs';

interface DashboardViewProps {
  onMenuClick: () => void;
}

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return seconds + 's ago';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  return Math.floor(seconds / 3600) + 'h ago';
}

function getSeverityColor(severity: string) {
  if (severity === 'high') return 'bg-error-container text-on-error-container';
  if (severity === 'medium') return 'bg-amber-100 text-amber-800';
  if (severity === 'low') return 'bg-green-100 text-green-800';
  return 'bg-neutral-gray-light text-secondary';
}

function getStatusColor(status: string) {
  if (status === 'shadow') return 'bg-blue-100 text-blue-800';
  if (status === 'canary') return 'bg-amber-100 text-amber-800';
  if (status === 'deployed') return 'bg-green-100 text-green-800';
  if (status === 'failed') return 'bg-error-container text-on-error-container';
  return 'bg-neutral-gray-light text-secondary';
}

function getDriftIcon(status: string) {
  if (status === 'normal') return <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>;
  if (status === 'warning') return <span className="material-symbols-outlined text-sm text-amber-600">warning</span>;
  if (status === 'critical') return <span className="material-symbols-outlined text-sm text-error">error</span>;
  return <span className="material-symbols-outlined text-sm text-secondary">help</span>;
}

export function DashboardView({ onMenuClick }: DashboardViewProps) {
  const [data, setData] = useState(sampleDashboardData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        drift: {
          ...prev.drift,
          fprTrend: {
            ...prev.drift.fprTrend,
            current: Math.max(0.1, Math.min(1.0, prev.drift.fprTrend.current + (Math.random() - 0.5) * 0.05)),
          },
        },
        recordsToday: prev.recordsToday + Math.floor(Math.random() * 100),
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
          <span className="material-symbols-outlined text-primary hidden sm:block">security</span>
          <h2 className="font-headline-md text-on-surface text-sm md:text-base">DFP Model {data.modelVersion} &mdash; Monitoring</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold uppercase ${getStatusColor(data.status)}`}>
            {data.status}
          </span>
          <button className="material-symbols-outlined text-secondary hover:text-primary transition-colors p-2">
            refresh
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-container mx-auto space-y-4 md:space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="p-3 md:p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <p className="text-[9px] font-bold text-secondary uppercase">Status</p>
              <p className="text-base md:text-lg font-bold text-green-700">Healthy</p>
            </div>
            <div className="p-3 md:p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <p className="text-[9px] font-bold text-secondary uppercase">Records Today</p>
              <p className="text-base md:text-lg font-bold text-on-surface font-mono">{data.recordsToday.toLocaleString()}</p>
            </div>
            <div className="p-3 md:p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <p className="text-[9px] font-bold text-secondary uppercase">Alerts Today</p>
              <p className="text-base md:text-lg font-bold text-amber-700">{data.alertsToday}</p>
            </div>
            <div className="p-3 md:p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <p className="text-[9px] font-bold text-secondary uppercase">FPR Trend</p>
              <p className="text-base md:text-lg font-bold text-on-surface font-mono">
                {data.drift.fprTrend.current.toFixed(1)}%
                <span className={`text-xs ml-1 ${data.drift.fprTrend.current > data.drift.fprTrend.previous ? 'text-error' : 'text-green-600'}`}>
                  {data.drift.fprTrend.current > data.drift.fprTrend.previous ? 'up' : 'down'}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Drift Monitor */}
            <div className="lg:col-span-1 p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <h3 className="font-label-sm text-secondary uppercase tracking-widest mb-4">Drift Monitor</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Data drift</span>
                  <div className="flex items-center gap-1.5">
                    {getDriftIcon(data.drift.dataDrift)}
                    <span className="text-sm text-on-surface capitalize">{data.drift.dataDrift}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">Concept drift</span>
                  <div className="flex items-center gap-1.5">
                    {getDriftIcon(data.drift.conceptDrift)}
                    <span className="text-sm text-on-surface capitalize">{data.drift.conceptDrift}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary">FPR</span>
                  <span className="text-sm text-on-surface font-mono">
                    {data.drift.fprTrend.previous}% to {data.drift.fprTrend.current.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* FPR Trend Chart */}
            <div className="lg:col-span-2 p-4 border border-neutral-gray-mid rounded-lg bg-white">
              <h3 className="font-label-sm text-secondary uppercase tracking-widest mb-4">FPR Trend (24h)</h3>
              <div className="flex items-end gap-1 md:gap-2 h-24 md:h-32">
                {data.fprHistory.map((point, idx) => {
                  const height = (point.value / 1.0) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] md:text-[10px] text-secondary font-mono">{point.value.toFixed(1)}%</span>
                      <div className="w-full bg-neutral-gray-light rounded-t" style={{ height: height + '%' }}>
                        <div className="w-full bg-brand-yellow rounded-t" style={{ height: height + '%' }} />
                      </div>
                      <span className="text-[8px] md:text-[10px] text-secondary">{point.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="p-4 border border-neutral-gray-mid rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-label-sm text-secondary uppercase tracking-widest">Recent Alerts</h3>
              <button className="text-xs text-interactive-blue hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              {data.alerts.map(alert => (
                <div
                  key={alert.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 p-3 rounded bg-neutral-gray-light border border-neutral-gray-mid hover:border-brand-yellow/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="text-[11px] text-secondary sm:hidden">{formatTimeAgo(alert.timestamp)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-on-surface">{alert.description}</p>
                    <p className="text-[11px] text-secondary mt-0.5">
                      {alert.user} &middot; <span className="hidden sm:inline">{formatTimeAgo(alert.timestamp)}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-2 py-1 text-[10px] text-secondary hover:text-on-surface border border-neutral-gray-mid rounded hover:bg-neutral-gray-mid transition-colors">
                      Investigate
                    </button>
                    <button className="px-2 py-1 text-[10px] text-secondary hover:text-green-700 border border-neutral-gray-mid rounded hover:bg-green-50 transition-colors">
                      Mark benign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-yellow text-on-primary-fixed-variant font-bold rounded hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-sm">refresh</span>
              Trigger Retrain
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-surface-charcoal text-surface-charcoal font-bold rounded hover:bg-neutral-gray-light transition-all">
              <span className="material-symbols-outlined text-sm">history</span>
              View Training History
            </button>
          </div>
        </div>
      </div>

      {/* Footer - hidden on mobile */}
      <footer className="hidden md:block bg-surface-charcoal py-4 px-6 shrink-0">
        <div className="max-w-container mx-auto flex justify-between items-center text-center gap-4">
          <span className="text-brand-yellow font-bold font-label-sm text-label-sm">CyberMorph</span>
          <p className="text-neutral-gray-mid font-label-sm text-label-sm">&copy; 2024 CyberMorph Platform. Built for EY Global Delivery.</p>
          <div className="flex gap-6">
            <a className="text-neutral-gray-mid font-label-sm text-label-sm hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="text-neutral-gray-mid font-label-sm text-label-sm hover:text-white transition-colors" href="#">Security Disclosure</a>
            <a className="text-neutral-gray-mid font-label-sm text-label-sm hover:text-white transition-colors" href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
