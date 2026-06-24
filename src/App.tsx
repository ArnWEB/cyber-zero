import { useState, useCallback } from 'react';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightPanel } from './components/layout/RightPanel';
import { ChatView } from './components/chat/ChatView';
import { DashboardView } from './components/dashboard/DashboardView';
import { MobileNav } from './components/layout/MobileNav';
import { sampleConversations } from './data/stubs';
import { Conversation, PipelineStage } from './data/types';

type View = 'chat' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('chat');
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-001');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleNewChat = useCallback(() => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New conversation',
      status: 'draft',
      pipelineStage: 'idle',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setView('chat');
    setSidebarOpen(false);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setView('chat');
    setSidebarOpen(false);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!activeConversationId) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id !== activeConversationId) return conv;

      const userMsg = {
        id: `msg-${Date.now()}`,
        role: 'user' as const,
        content,
        timestamp: new Date(),
        type: 'text' as const,
      };

      return {
        ...conv,
        messages: [...conv.messages, userMsg],
        updatedAt: new Date(),
        title: conv.messages.length === 0 ? content.slice(0, 40) : conv.title,
      };
    }));

    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id !== activeConversationId) return conv;

        const agentMsg = {
          id: `msg-${Date.now()}-agent`,
          role: 'agent' as const,
          content: getAgentResponse(content),
          timestamp: new Date(),
          type: 'text' as const,
        };

        return {
          ...conv,
          messages: [...conv.messages, agentMsg],
          updatedAt: new Date(),
        };
      }));
    }, 1500);
  }, [activeConversationId]);

  const handleApproveGate = useCallback((gateType: string) => {
    if (!activeConversationId) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id !== activeConversationId) return conv;

      const updatedMessages = conv.messages.map(msg => {
        if (msg.type === 'gate' && msg.metadata?.gateType === gateType) {
          return {
            ...msg,
            metadata: { ...msg.metadata, gateStatus: 'approved' },
          };
        }
        return msg;
      });

      const agentMsg = {
        id: `msg-${Date.now()}-agent`,
        role: 'agent' as const,
        content: getGateResponse(gateType),
        timestamp: new Date(),
        type: 'text' as const,
      };

      return {
        ...conv,
        messages: [...updatedMessages, agentMsg],
        status: 'running' as const,
        pipelineStage: getNextStage(conv.pipelineStage),
        updatedAt: new Date(),
      };
    }));
  }, [activeConversationId]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - hidden on mobile, drawer on md */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <LeftSidebar
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={handleSelectConversation}
            onNewChat={handleNewChat}
            onNavigate={setView}
            currentView={view}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {view === 'chat' ? (
            <ChatView
              conversation={activeConversation}
              onSendMessage={handleSendMessage}
              onApproveGate={handleApproveGate}
              onMenuClick={() => setSidebarOpen(true)}
              onContextClick={() => setRightPanelOpen(!rightPanelOpen)}
            />
          ) : (
            <DashboardView onMenuClick={() => setSidebarOpen(true)} />
          )}
        </main>

        {/* Right Panel - overlay on lg, fixed on xl+ */}
        <RightPanel
          open={rightPanelOpen}
          onToggle={() => setRightPanelOpen(!rightPanelOpen)}
          conversation={activeConversation}
        />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentView={view}
        onNavigate={setView}
        onMenuClick={() => setSidebarOpen(true)}
      />
    </div>
  );
}

function getAgentResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('dfp') || lower.includes('fingerprint')) {
    return "I'll run Digital Fingerprinting on your SharePoint logs. Let me first check data availability and build a plan for your review.";
  }
  if (lower.includes('correlation')) {
    return "Here's the correlation analysis. I found a strong positive correlation (r=0.72) between download volume and off-hours activity. This suggests users who download files frequently also tend to access them outside business hours.";
  }
  if (lower.includes('anomaly') || lower.includes('unusual')) {
    return "I detected 47 users with activity levels 3x above their baseline. The top anomaly is jsmith@contoso.com with 340 file downloads in a single hour — that's 28x their normal rate.";
  }
  return "I understand. Let me process that and get back to you with the analysis.";
}

function getGateResponse(gateType: string): string {
  switch (gateType) {
    case 'plan':
      return "Plan approved. Starting data pull from SharePoint audit logs. This will take approximately 45 seconds for 1.2M records.";
    case 'eda':
      return "EDA review complete. Moving to feature engineering. I'll generate 47 cybersecurity-specific features including timing deltas, entropy scores, and IP reputation lookups.";
    case 'model':
      return "Model signed off. Initiating deployment: shadow mode first (24h), then 5% canary, then full rollout. I'll notify you if any drift is detected.";
    default:
      return "Understood. Proceeding with the next step.";
  }
}

function getNextStage(current: string): PipelineStage {
  const stages: PipelineStage[] = ['idle', 'pulling', 'eda', 'features', 'training', 'deploying', 'monitoring'];
  const idx = stages.indexOf(current as PipelineStage);
  return stages[Math.min(idx + 1, stages.length - 1)];
}

export default App;
