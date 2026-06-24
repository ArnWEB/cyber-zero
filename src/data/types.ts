export type ConversationStatus = 'running' | 'gate' | 'completed' | 'error' | 'draft';
export type GateType = 'plan' | 'eda' | 'model';
export type GateStatus = 'pending' | 'approved' | 'modified' | 'cancelled';
export type PipelineStage = 'idle' | 'pulling' | 'eda' | 'features' | 'training' | 'deploying' | 'monitoring';
export type AlertSeverity = 'high' | 'medium' | 'low';
export type ModelStatus = 'shadow' | 'canary' | 'deployed' | 'failed';
export type DriftStatus = 'normal' | 'warning' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  type?: 'text' | 'progress' | 'gate' | 'error' | 'eda-summary' | 'feature-list' | 'training' | 'model-review';
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  title: string;
  status: ConversationStatus;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  pipelineStage: PipelineStage;
}

export interface EDAData {
  records: number;
  fields: number;
  dateRange: { start: string; end: string };
  nullRate: number;
  nullField: string;
  uniqueUsers: number;
  uniqueIPs: number;
  anomalies: { count: number; description: string }[];
  correlations: { field1: string; field2: string; value: number }[];
  distributions: { field: string; values: { label: string; count: number; percentage: number }[] }[];
}

export interface Feature {
  id: string;
  name: string;
  type: 'numeric' | 'binary' | 'categorical';
  shapImportance: number;
  excluded: boolean;
}

export interface TrainingRun {
  epoch: number;
  totalEpochs: number;
  loss: number;
  fpr: number;
  f1: number;
  aucRoc: number;
  latency: number;
  status: 'running' | 'completed' | 'failed' | 'paused';
}

export interface ModelReviewData {
  metrics: {
    f1: { value: number; target: number; passed: boolean };
    fpr: { value: number; target: number; passed: boolean };
    aucRoc: { value: number };
    latency: { value: number; target: number; passed: boolean };
  };
  shapSignals: { rank: number; signal: string; importance: number }[];
  redTeam: { test: string; passed: boolean; score: number }[];
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  user: string;
  description: string;
  timestamp: Date;
  details: string;
  status: 'new' | 'investigating' | 'benign' | 'genuine';
}

export interface DashboardData {
  modelVersion: string;
  status: ModelStatus;
  lastScored: Date;
  recordsToday: number;
  alertsToday: number;
  drift: {
    dataDrift: DriftStatus;
    conceptDrift: DriftStatus;
    fprTrend: { current: number; previous: number };
  };
  fprHistory: { time: string; value: number }[];
  alerts: Alert[];
}

export interface PlanStep {
  step: number;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface SuggestionChip {
  id: string;
  label: string;
  action: string;
}
