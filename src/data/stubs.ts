import { Conversation, EDAData, Feature, TrainingRun, ModelReviewData, DashboardData, SuggestionChip } from './types';

export const currentUser = {
  id: 'user-001',
  name: 'Arnab Chakraborty',
  email: 'arnab@cybermorph.io',
};

export const sampleConversations: Conversation[] = [
  {
    id: 'conv-001',
    title: 'DFP on SharePoint logs',
    status: 'gate',
    pipelineStage: 'eda',
    createdAt: new Date('2026-01-15T09:55:00'),
    updatedAt: new Date('2026-01-15T10:15:00'),
    messages: [
      {
        id: 'msg-001',
        role: 'user',
        content: 'Run DFP on last 30 days of SharePoint logs',
        timestamp: new Date('2026-01-15T09:55:00'),
        type: 'text',
      },
      {
        id: 'msg-002',
        role: 'agent',
        content: 'I understand you want to run Digital Fingerprinting on SharePoint audit logs. Let me build a plan for you.',
        timestamp: new Date('2026-01-15T09:55:15'),
        type: 'text',
      },
      {
        id: 'msg-003',
        role: 'agent',
        content: '',
        timestamp: new Date('2026-01-15T09:55:16'),
        type: 'gate',
        metadata: {
          gateType: 'plan',
          gateStatus: 'pending',
          summary: 'Plan ready for your review:',
          steps: [
            { step: 1, description: 'Pull SharePoint audit logs (Jan 1 - Jan 30)', status: 'pending' },
            { step: 2, description: 'Run EDA on access patterns', status: 'pending' },
            { step: 3, description: 'Engineer features (timing, entropy, IP reputation)', status: 'pending' },
            { step: 4, description: 'Train DFP model via Morpheus', status: 'pending' },
            { step: 5, description: 'Generate explainability report', status: 'pending' },
          ],
        },
      },
    ],
  },
  {
    id: 'conv-002',
    title: 'Exchange anomaly detection',
    status: 'completed',
    pipelineStage: 'monitoring',
    createdAt: new Date('2026-01-10T14:20:00'),
    updatedAt: new Date('2026-01-10T15:45:00'),
    messages: [
      {
        id: 'msg-010',
        role: 'user',
        content: 'Detect unusual email forwarding patterns in Exchange logs',
        timestamp: new Date('2026-01-10T14:20:00'),
        type: 'text',
      },
      {
        id: 'msg-011',
        role: 'agent',
        content: 'Model deployed successfully. Monitoring active.',
        timestamp: new Date('2026-01-10T15:45:00'),
        type: 'text',
      },
    ],
  },
  {
    id: 'conv-003',
    title: 'Privilege escalation in Azure AD',
    status: 'draft',
    pipelineStage: 'idle',
    createdAt: new Date('2026-01-14T16:30:00'),
    updatedAt: new Date('2026-01-14T16:30:00'),
    messages: [
      {
        id: 'msg-020',
        role: 'user',
        content: 'Analyze Azure AD role changes for privilege escalation',
        timestamp: new Date('2026-01-14T16:30:00'),
        type: 'text',
      },
    ],
  },
];

export const sampleEDAData: EDAData = {
  records: 1203847,
  fields: 14,
  dateRange: { start: 'Jan 1, 2026', end: 'Jan 30, 2026' },
  nullRate: 2.3,
  nullField: 'Operation',
  uniqueUsers: 3421,
  uniqueIPs: 892,
  anomalies: [
    { count: 47, description: 'Users with >3x average activity' },
    { count: 12, description: 'IPs accessing from unusual geolocations' },
    { count: 3, description: 'Users downloading >500 files/hour' },
  ],
  correlations: [
    { field1: 'Download Volume', field2: 'Off-Hours Activity', value: 0.72 },
    { field1: 'Permission Changes', field2: 'New IP Logins', value: 0.61 },
    { field1: 'File Modifications', field2: 'After-Hours Access', value: 0.45 },
  ],
  distributions: [
    {
      field: 'Operation',
      values: [
        { label: 'FileDownloaded', count: 517655, percentage: 43 },
        { label: 'FileModified', count: 337077, percentage: 28 },
        { label: 'UserLoggedIn', count: 228731, percentage: 19 },
        { label: 'PermissionChanged', count: 84269, percentage: 7 },
        { label: 'Other', count: 36115, percentage: 3 },
      ],
    },
    {
      field: 'Time of Day',
      values: [
        { label: '09:00-17:00', count: 722308, percentage: 60 },
        { label: '17:00-22:00', count: 301962, percentage: 25 },
        { label: '22:00-09:00', count: 179577, percentage: 15 },
      ],
    },
  ],
};

export const sampleFeatures: Feature[] = [
  { id: 'f1', name: 'download_volume_1h', type: 'numeric', shapImportance: 0.34, excluded: false },
  { id: 'f2', name: 'off_hours_ratio', type: 'numeric', shapImportance: 0.21, excluded: false },
  { id: 'f3', name: 'new_ip_flag', type: 'binary', shapImportance: 0.18, excluded: false },
  { id: 'f4', name: 'permission_escalation_cnt', type: 'numeric', shapImportance: 0.15, excluded: false },
  { id: 'f5', name: 'file_type_entropy', type: 'numeric', shapImportance: 0.12, excluded: false },
  { id: 'f6', name: 'geo_distance_km', type: 'numeric', shapImportance: 0.09, excluded: false },
  { id: 'f7', name: 'session_duration', type: 'numeric', shapImportance: 0.07, excluded: false },
  { id: 'f8', name: 'unique_resources_1h', type: 'numeric', shapImportance: 0.05, excluded: false },
];

export const sampleTrainingRun: TrainingRun = {
  epoch: 7,
  totalEpochs: 10,
  loss: 0.0189,
  fpr: 0.3,
  f1: 0.94,
  aucRoc: 0.97,
  latency: 12,
  status: 'running',
};

export const sampleModelReview: ModelReviewData = {
  metrics: {
    f1: { value: 0.94, target: 0.85, passed: true },
    fpr: { value: 0.3, target: 2.0, passed: true },
    aucRoc: { value: 0.97 },
    latency: { value: 12, target: 50, passed: true },
  },
  shapSignals: [
    { rank: 1, signal: 'Download volume', importance: 0.34 },
    { rank: 2, signal: 'Off-hours activity', importance: 0.21 },
    { rank: 3, signal: 'New IP geolocation', importance: 0.18 },
    { rank: 4, signal: 'Permission escalation', importance: 0.15 },
    { rank: 5, signal: 'Unusual file types', importance: 0.12 },
  ],
  redTeam: [
    { test: 'Evasion attack', passed: true, score: 98 },
    { test: 'Poisoning attack', passed: true, score: 96 },
    { test: 'Adversarial input', passed: true, score: 99 },
  ],
};

export const sampleDashboardData: DashboardData = {
  modelVersion: 'v1.2',
  status: 'canary',
  lastScored: new Date(Date.now() - 120000),
  recordsToday: 12847,
  alertsToday: 3,
  drift: {
    dataDrift: 'normal',
    conceptDrift: 'normal',
    fprTrend: { current: 0.4, previous: 0.3 },
  },
  fprHistory: [
    { time: '00:00', value: 0.3 },
    { time: '04:00', value: 0.28 },
    { time: '08:00', value: 0.35 },
    { time: '12:00', value: 0.42 },
    { time: '16:00', value: 0.38 },
    { time: '20:00', value: 0.33 },
    { time: 'Now', value: 0.4 },
  ],
  alerts: [
    {
      id: 'alert-001',
      severity: 'high',
      user: 'jsmith@contoso.com',
      description: '340 file downloads in 1 hour',
      timestamp: new Date(Date.now() - 300000),
      details: 'User jsmith downloaded 340 files from SharePoint between 14:00-15:00. Average for this user is 12 files/hour. All downloads were from the /Finance/Shared Documents/ library.',
      status: 'new',
    },
    {
      id: 'alert-002',
      severity: 'medium',
      user: '103.21.244.0',
      description: 'Login from unusual geolocation',
      timestamp: new Date(Date.now() - 900000),
      details: 'IP 103.21.244.0 (Mumbai, India) accessed SharePoint. User amiller@contoso.com typically logs in from Seattle, WA. First time this IP has been seen.',
      status: 'investigating',
    },
    {
      id: 'alert-003',
      severity: 'low',
      user: 'amiller@contoso.com',
      description: 'Off-hours file modification',
      timestamp: new Date(Date.now() - 1800000),
      details: 'User amiller modified 15 files between 22:00-23:00. This is within 1 standard deviation of their typical pattern but outside normal business hours.',
      status: 'benign',
    },
  ],
};

export const sampleSuggestionChips: SuggestionChip[] = [
  { id: 'chip-1', label: 'Show correlation matrix', action: 'correlation_matrix' },
  { id: 'chip-2', label: 'Drill into top anomaly', action: 'drill_anomaly' },
  { id: 'chip-3', label: 'Compare user segments', action: 'compare_segments' },
  { id: 'chip-4', label: 'Show distribution details', action: 'distribution_details' },
];
