# Roadmap: Sprint Intelligence Dashboard

## Working Principles

This plan covers 16 weeks with five small, meaningful commits per week. That
provides approximately 80 days of regular work without artificially splitting a
single change into multiple commits.

A good daily commit:

- delivers one complete change,
- includes a test or a verifiable result,
- uses an intention-revealing message, such as `feat: add sprint selector`,
- does not mix features, refactoring, and documentation without a reason,
- reaches GitHub only after the relevant checks pass.

Green contribution squares should be a result of regular work, not the product's
goal. Work five days per week and leave weekends for rest, research, or writing
about important technical decisions.

All repository content must be written in English, including code, comments,
documentation, issue titles, branch names, and commit messages.

## Proposed Product

Working name: **Sprint Intelligence Dashboard**.

Core user flow:

1. The user creates a team and a sprint.
2. The user imports work items from a demonstration CSV file.
3. The dashboard calculates and displays sprint metrics.
4. The user adds a meeting transcript.
5. AI returns a summary, decisions, blockers, and action items.
6. The user reviews the results and connects them with work items.
7. The retrospective view combines metrics with recurring meeting topics.

## Proposed Technology Stack

- Next.js with TypeScript as a full-stack application
- PostgreSQL and Prisma for data persistence
- Tailwind CSS and an accessible component library
- Recharts or Nivo for charts
- Zod for validation at system boundaries
- Vitest and Testing Library for unit and component tests
- Playwright for critical end-to-end flows
- A language model API behind an internal provider adapter
- GitHub Actions for linting, testing, and building

The stack should be finalized during the first week. Do not introduce a separate
backend, queue, or microservices until a real requirement justifies them.

## MVP Definition

The MVP is complete when a new user can open the demo, select a sprint, review
four reliable metrics, add a sample transcript, and receive an editable summary
with action items. The main flow has an end-to-end test, and the application is
deployed and documented.

## 16-Week Plan

Each item represents one meaningful day of work and potentially one commit. When
a task is too large, split it by behavior, such as implementing tested logic
first and its interface the following day.

### Week 1: Product Foundation

1. Document the problem, audience, MVP scope, and success criteria.
2. Initialize the Next.js application with TypeScript and core scripts.
3. Add linting, formatting, and commit conventions.
4. Build the base layout, navigation, and empty page states.
5. Add CI that runs linting, tests, and the production build.

Outcome: a working project skeleton with a clearly limited MVP.

### Week 2: Design System and Accessibility

1. Define colors, typography, spacing, and theme variables.
2. Add Button, Card, and Badge components with their states.
3. Add form components and validation messages.
4. Build a responsive sidebar and header.
5. Run the first accessibility audit and fix the identified issues.

Outcome: a consistent UI foundation for efficiently building product views.

### Week 3: Domain Model

1. Document the Team, Sprint, WorkItem, Meeting, and Insight entities.
2. Configure PostgreSQL and Prisma.
3. Add the initial database migration.
4. Create seed data for a realistic demonstration team.
5. Add domain rule tests and an architecture decision record.

Outcome: a credible data model instead of disconnected objects made for charts.

### Week 4: Sprints and Work Items

1. Add the sprint list query and view.
2. Add sprint details and status.
3. Build a sortable work item table.
4. Add work item filters for status and assignee.
5. Add empty, loading, and error states with view tests.

Outcome: users can comfortably explore the data of a single sprint.

### Week 5: Data Import

1. Define and document the CSV format.
2. Build a CSV parser with Zod validation.
3. Add a preview of valid and invalid records before import.
4. Persist approved imports and prevent duplicates.
5. Add import tests and sample files.

Outcome: the application accepts real data without requiring a Jira integration.

### Week 6: Metrics Engine

1. Implement velocity calculations with tests.
2. Implement sprint predictability calculations with tests.
3. Implement cycle time calculations with tests.
4. Implement scope change calculations with tests.
5. Add a metrics aggregation service and missing-data handling.

Outcome: tested business logic independent of the presentation layer.

### Week 7: Dashboard

1. Add KPI cards that explain the meaning of each metric.
2. Build the burndown chart.
3. Build the multi-sprint velocity chart.
4. Add cycle time and scope change visualizations.
5. Add tooltips, responsive behavior, and chart component tests.

Outcome: the first visually strong portfolio-ready part of the product.

### Week 8: Data Interpretation

1. Add rules that detect sprint risks.
2. Build a trends and warnings panel.
3. Compare the current sprint with historical averages.
4. Add date filters and synchronize them with the URL.
5. Document the methodology and limitations of each metric.

Outcome: the dashboard supports decisions instead of only displaying numbers.

### Week 9: Meetings Without AI

1. Add the meeting model and daily, refinement, review, and retro types.
2. Build meeting list and detail views.
3. Add a transcript input form.
4. Add manual creation of decisions, blockers, and action items.
5. Connect an action item with a sprint or work item.

Outcome: the complete meeting flow works before connecting an AI model.

### Week 10: AI Layer

1. Define the structured AI response contract.
2. Add a model provider adapter and environment configuration.
3. Create a prompt and a set of anonymized test transcripts.
4. Add a summary generation endpoint with response validation.
5. Add a mock AI provider for tests and the local demo.

Outcome: the AI integration is replaceable, testable, and optional for the demo.

### Week 11: Assistant Experience

1. Add the generation screen and a clear processing state.
2. Display summaries, decisions, blockers, and action items.
3. Allow users to edit and approve every generated item.
4. Add retry behavior and safe API limit handling.
5. Add privacy information and explicit transcript deletion.

Outcome: AI assists the user without saving its output uncritically.

### Week 12: Connecting Insights and Metrics

1. Display meeting blockers on the sprint dashboard.
2. Display open action items next to connected work items.
3. Add a trend view for recurring topics.
4. Build the retrospective preparation view.
5. Add retrospective summary export to Markdown.

Outcome: the application becomes one coherent product rather than two features
sharing a repository.

### Week 13: Quality and Security

1. Add input size and type limits.
2. Protect secrets, logs, and transcript content.
3. Add rate limiting or controlled AI usage limits.
4. Review error handling and user-facing messages.
5. Add regression tests for the most important identified risks.

Outcome: the project demonstrates technical maturity beyond the happy path.

### Week 14: End-to-End Tests and Performance

1. Add an end-to-end test for data import and dashboard access.
2. Add an end-to-end meeting flow test using the mock AI provider.
3. Measure performance and improve the slowest view.
4. Test the application on mobile and improve responsiveness.
5. Run a second accessibility audit.

Outcome: critical product flows are protected from regressions.

### Week 15: Deployment and Observability

1. Prepare the production database and environment configuration.
2. Deploy the demonstration application.
3. Add privacy-conscious error logging.
4. Add basic usage metrics without collecting meeting content.
5. Document deployment, migration, and recovery procedures.

Outcome: recruiters can open a live product, and its author can maintain it.

### Week 16: Portfolio Presentation

1. Improve the README with screenshots, architecture, and setup instructions.
2. Add a data flow diagram and document important technical decisions.
3. Write a case study covering the problem, decisions, tradeoffs, and results.
4. Record a short demonstration of the main user flow.
5. Organize the backlog, tag the first release, and publish release notes.

Outcome: the project is easy to evaluate without reading the entire codebase.

## Optional Weeks 17-24

After the MVP, choose extensions based on what the product genuinely needs. Each
topic can provide one or two additional weeks of meaningful work:

- authentication and multi-team data isolation,
- Jira, Linear, or GitHub Projects integration,
- audio upload and transcription,
- semantic search across previous meetings,
- source-grounded questions about sprint history,
- AI summary quality evaluation against a prepared dataset,
- AI request budgets and cost observability,
- prompt versioning and output comparisons,
- notifications for unresolved action items,
- controlled-access public sprint reports.

## Weekly Rhythm

Suggested weekly rhythm:

- Monday: a small feature or data model change,
- Tuesday: logic and tests,
- Wednesday: interface and edge cases,
- Thursday: integration or quality improvement,
- Friday: end-to-end test, decision documentation, or a focused refactor.

Before each week, create five issues with acceptance criteria. Each day, close
one issue or a clearly separated part of it. There is no need to commit at any
cost: an empty contribution square is better than a commit that cannot be
explained honestly.

## Presenting the Project

Do not introduce the project in an interview as "a dashboard with AI." A stronger
story is:

> I built a tool that connects quantitative sprint metrics with qualitative
> context from team meetings. I designed the import flow and data model,
> implemented a tested metrics engine, and placed AI behind a validated adapter
> so that a human always reviews its output.

This story demonstrates product thinking, Scrum Master experience, and a mature
approach to software development.
