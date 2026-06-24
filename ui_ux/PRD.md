# PRD: CyberMorph UI — Interactive Prototype

## Problem Statement

Security analysts need a way to build AI-powered threat detection models from Microsoft 365/SharePoint audit logs without writing code. Current tools require deep ML expertise, manual data pipelines, and significant time to go from raw logs to a deployed detection model. The problem is: **how do we make threat model building accessible through natural language conversation?**

## Solution

A chat-first web interface where users describe cybersecurity problems in natural language (e.g., "run DFP on SharePoint logs") and an AI agent orchestrates the entire pipeline — data ingestion, EDA, feature engineering, model training, and deployment — with human-in-the-loop gates at critical decision points. The UI serves as a prototype to validate the interaction model before backend integration.

## User Stories

1. As a security analyst, I want to open the app and immediately try it with sample data, so that I can understand the product before connecting my real M365 tenant
2. As a security analyst, I want to type "run DFP on SharePoint logs" in a chat, so that I can start building a detection model without navigating complex UIs
3. As a security analyst, I want to see the agent's plan before it executes, so that I can confirm it understood my intent correctly
4. As a security analyst, I want to approve, modify, or cancel a plan with a single click, so that I stay in control without slowing down
5. As a security analyst, I want to see real-time progress as data is being pulled, so that I know the system is working and how long it will take
6. As a security analyst, I want to see an EDA report with distributions and anomalies, so that I understand what's in my data before training
7. As a security analyst, I want to ask follow-up questions about EDA findings (e.g., "show me the correlation matrix"), so that I can explore the data interactively
8. As a security analyst, I want to see suggested questions after EDA, so that I know what I can ask even if I'm not an ML expert
9. As a security analyst, I want to see which features were auto-generated and their importance scores, so that I understand what the model will learn from
10. As a security analyst, I want to exclude specific features from training, so that I can apply domain knowledge
11. As a security analyst, I want to see training progress with live loss/FPR metrics, so that I know the model is converging
12. As a security analyst, I want to see SHAP explainability summaries showing top signals, so that I understand what the model is detecting
13. As a security analyst, I want to see red team test results (evasion, poisoning), so that I can trust the model's robustness
14. As a security analyst, I want to sign off on a model before deployment, so that no model goes live without human validation
15. As a security analyst, I want to see deployment progress (shadow → canary → full), so that I know the rollout status
16. As a security analyst, I want to see a monitoring dashboard with drift metrics and FPR trends, so that I can track model health over time
17. As a security analyst, I want to trigger a retrain from the dashboard, so that I can respond to drift without going back to chat
18. As a security analyst, I want to have multiple conversations running in parallel, so that I can work on different detection models simultaneously
19. As a security analyst, I want conversation history persisted in the sidebar, so that I can pick up where I left off
20. As a security analyst, I want to see a notification badge when a gate needs my attention, so that I don't miss critical decisions
21. As a security analyst, I want browser notifications when training completes, so that I can work on other things while waiting
22. As a security analyst, I want to see inline error messages with retry/resume options, so that I can recover from failures without starting over
23. As a security analyst, I want to pause a running pipeline, so that I can prioritize other work
24. As a security analyst, I want to see a collapsible context panel showing current pipeline state, so that I have context without it taking screen space
25. As a security analyst, I want to connect my M365 tenant via OAuth, so that the agent can access real audit logs
26. As a security analyst, I want to select which M365 tenant to use, so that I can work across multiple environments
27. As a security analyst, I want to see data freshness indicators, so that I know if the logs are recent enough to be useful
28. As a security analyst, I want to see the number of records pulled and processing time, so that I can estimate costs and feasibility
29. As a security analyst, I want to see correlation visualizations (scatter plots, heatmaps) when exploring EDA, so that I can understand feature relationships
30. As a security analyst, I want to drill into specific anomalies from the EDA summary, so that I can investigate suspicious patterns
31. As a security analyst, I want to filter EDA results by user, IP, or time range, so that I can focus on specific segments
32. As a security analyst, I want to see a SHAP waterfall chart for individual records, so that I can understand why a specific event was flagged
33. As a security analyst, I want to mark alerts as "benign" or "genuine threat", so that I can provide feedback for future model improvements
34. As a security analyst, I want to see training epoch progress with current best metrics, so that I can decide if early stopping is appropriate
35. As a security analyst, I want to see which GPU is being used and estimated time remaining, so that I can plan my workflow
36. As a security analyst, I want to see a feature importance chart ranked by SHAP value, so that I can validate the model uses meaningful signals
37. As a security analyst, I want to see the difference between shadow mode results and production traffic, so that I can validate before full deployment
38. As a security analyst, I want to see canary alert samples with user context, so that I can manually review before promoting to full rollout
39. As a security analyst, I want to see a timeline of all actions taken in a conversation, so that I have an audit trail
40. As a security analyst, I want to switch between light and dark themes, so that I can work comfortably in different lighting conditions
41. As a security analyst, I want the chat to stream agent responses in real-time, so that I feel like I'm having a conversation, not waiting for a batch job
42. As a security analyst, I want to see a "thinking" indicator when the agent is processing, so that I know it's working
43. As a security analyst, I want to cancel a data pull mid-stream, so that I can change my mind without waiting
44. As a security analyst, I want to see partial data pull results with the option to proceed, so that I can work with what's available
45. As a security analyst, I want to see schema validation results before data processing, so that I know if there are compatibility issues
46. As a security analyst, I want to see a summary of what the model will detect before training starts, so that I can confirm the detection objective
47. As a security analyst, I want to compare metrics across multiple training runs, so that I can track improvements
48. As a security analyst, I want to see alert volume trends on the dashboard, so that I can spot model degradation
49. As a security analyst, I want to receive notifications in the chat when background tasks complete, so that I don't need to check the dashboard
50. As a security analyst, I want to see a "last trained" timestamp on deployed models, so that I know how fresh the model is

## Implementation Decisions

### Modules to Build

1. **App Shell Module** — Root layout with left sidebar, main content, and collapsible right panel. Handles routing and global state.

2. **Chat Engine Module** — Core chat functionality: message rendering, streaming text simulation, input handling, scroll management. Deep module — encapsulates all chat UI logic behind a simple `Conversation` component interface.

3. **Gate System Module** — Renders gate prompts with approve/modify/cancel buttons. Manages gate state transitions. Deep module — gates are self-contained interaction units.

4. **EDA Explorer Module** — Renders EDA reports with suggestion chips, expandable detail cards, and modal overlays for charts/tables. Deep module — all EDA visualization logic encapsulated.

5. **Feature Engineering Display Module** — Renders feature lists with importance scores, exclusion toggles, and expandable details.

6. **Training Monitor Module** — Renders training progress with live metrics, epoch tracking, and pause/cancel controls.

7. **Model Review Module** — Renders Gate 3 with performance metrics, SHAP summary, and red team results.

8. **Dashboard Module** — Single model monitoring view with drift metrics, alert list, and FPR trend visualization.

9. **Left Sidebar Module** — Conversation list with status indicators, new chat button, navigation.

10. **Right Panel Module** — Context panel with pipeline status, data source info, and activity timeline.

11. **Stub Data Module** — All mock data: conversations, EDA reports, feature lists, training metrics, alerts, model reviews.

### Interfaces

- `Conversation` — accepts messages array, renders chat with streaming simulation
- `GatePrompt` — accepts gate config (type, options, summary), renders action buttons
- `EDAReport` — accepts EDA data object, renders summary + chips + expandable details
- `FeatureList` — accepts features array, renders ranked list with importance
- `TrainingProgress` — accepts training state, renders progress bar + live metrics
- `ModelReview` — accepts model metrics + SHAP + red team data, renders Gate 3
- `Dashboard` — accepts model health data, renders monitoring view

### Architectural Decisions

- **No routing library** — use React state for view switching (5 screens is too few to need React Router)
- **No state management library** — use React Context + useReducer for conversation state
- **Stub data lives in a single `data/` directory** — easy to swap for real API calls later
- **All components are pure** — receive data via props, emit events via callbacks
- **Typewriter simulation** — use `useState` + `useEffect` with `setInterval` for streaming text
- **No real WebSocket** — simulate real-time updates with `setTimeout` for prototype

### Schema (Stub Data Shape)

Conversations, messages, EDA reports, features, training runs, model reviews, alerts, and dashboard metrics all follow the TypeScript interfaces defined in `src/data/types.ts`.

## Testing Decisions

- **Test external behavior, not implementation** — verify that Gate buttons render and trigger callbacks, not internal state changes
- **Which modules to test:**
  - Chat Engine — message rendering, streaming, input handling
  - Gate System — button rendering, state transitions
  - EDA Explorer — chip rendering, expansion, modal behavior
  - Dashboard — metric rendering, auto-refresh behavior
- **Prior art:** This is a greenfield project — no existing tests. Establish testing patterns with Vitest + React Testing Library.

## Out of Scope

- Backend integration (API calls, WebSocket, real agent)
- Authentication/authorization logic (use stub user data)
- M365 OAuth flow (mock the connection state)
- Morpheus pipeline integration (mock training/EDA/feature engineering)
- Real data ingestion (use stub data only)
- Database/persistence (in-memory state only)
- CI/CD pipeline
- Performance optimization (lazy loading, code splitting)
- i18n / localization
- Mobile responsive design (desktop-first for prototype)

## Further Notes

- This prototype is for **interaction model validation** — the goal is to prove the chat-first UX works before investing in backend
- All stub data should feel realistic — use actual M365 field names, realistic user names, believable metrics
- The typewriter streaming effect is critical for the "conversational" feel — don't skip it
- Gate interactions must feel responsive — buttons should give immediate feedback
- The dashboard should auto-refresh drift metrics every 30 seconds (simulated with random walk)
