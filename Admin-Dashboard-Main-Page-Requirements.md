# Admin Dashboard Main Page Requirements

## 1. Purpose

Create the main page of the blog administration area. The page should give the administrator a quick overview of article activity and provide direct access to the most common content-management actions.

This document defines what the page must contain and how it must behave. Follow the project's existing design system, layout rules, components, naming conventions, authentication approach, and API patterns.

## 2. Route and access

- Route: `/admin`
- The page is accessible only to an authenticated administrator.
- If the user is not authenticated, use the project's existing admin authentication behavior.
- Do not duplicate authentication logic inside presentation components.

## 3. Page header

The top section must contain:

- Page title: `Dashboard`
- Short supporting text: `Manage your articles and track your publishing activity.`
- Primary action: `New article`
- The `New article` action navigates to `/admin/articles/new`.

The primary action should remain easy to find on both desktop and mobile layouts.

## 4. Article overview

Show three summary values:

1. **Total articles** — number of all articles.
2. **Published** — number of articles where `published` is `true`.
3. **Drafts** — number of articles where `published` is `false`.

Requirements:

- Values must come from backend data rather than being calculated from only the visible recent-articles list.
- Each value must have a clear label.
- Do not display fake percentages, trends, or comparisons unless the backend supplies real historical data.

## 5. Recent articles section

Display the five most recently updated articles, ordered by `updatedAt` descending.

Each item must show:

- Article title
- Status: `Published` or `Draft`
- Last updated date
- Published date when the article is published and `publishedAt` is available
- `Edit` action
- `Preview` or `View` action

Behavior:

- Clicking the article title or `Edit` opens `/admin/articles/[slug]/edit`.
- For a published article, `View` opens the public route `/articles/[slug]`.
- For a draft, `Preview` must use the project's authenticated preview route. If draft preview does not exist yet, omit this action instead of linking to a public 404 page.
- Provide a `View all articles` link to `/admin/articles`.
- Dates should be formatted for humans while preserving the timestamp's real meaning.

## 6. Drafts needing attention

Show a small section containing up to three draft articles, ordered by `updatedAt` descending.

Each draft must show:

- Title
- Last updated date
- `Continue editing` action

Behavior:

- `Continue editing` opens `/admin/articles/[slug]/edit`.
- If no drafts exist, do not render this section.

This section may reuse articles already present in the recent-articles section; it exists as a focused shortcut, not as a separate dataset concept.

## 7. Empty states

### No articles exist

When the blog has no articles:

- Keep the overview visible with all values set to `0`.
- Replace the recent-articles list with a short empty-state message.
- Show a clear `Create your first article` action linking to `/admin/articles/new`.
- Do not show the drafts section.

### No recent drafts

- Hide the drafts section entirely.

## 8. Loading and error states

- Show loading placeholders that roughly match the final content structure.
- Do not temporarily show zero values while real data is still loading.
- If dashboard data fails to load, show a concise error message and a `Try again` action.
- A failure in one section should not make successfully loaded sections unusable when the data-fetching architecture supports independent requests.
- Log or handle the underlying error using the project's existing conventions; do not expose internal server details to the UI.

## 9. Required data

The page needs the following data:

```ts
interface AdminDashboardData {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
  recentArticles: AdminDashboardArticle[];
  recentDrafts: AdminDashboardArticle[];
}

interface AdminDashboardArticle {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
}
```

Implementation guidance:

- Prefer a dedicated admin dashboard endpoint if the current articles endpoint would require downloading every full article, especially its JSONB `content`, just to calculate counts and recent items.
- Suggested endpoint: `GET /admin/dashboard`.
- The dashboard response must not include article `content`, cover image data, or full author records unless the implemented UI actually needs them.
- Perform counts and ordering in the database/backend, not in the browser over an unbounded article collection.

## 10. Responsive behavior

- All information and actions must remain usable on mobile, tablet, and desktop.
- Summary values may stack on narrow screens.
- The recent-articles presentation may change from a table on desktop to stacked rows/cards on mobile.
- No action should require horizontal page scrolling.

## 11. Accessibility

- Use semantic headings in a logical order.
- Interactive elements must be keyboard accessible.
- Icon-only controls, if any, require accessible labels.
- Status must be communicated with text, not color alone.
- Loading states should not create disruptive layout shifts.

## 12. Out of scope for this page

Do not add these features unless they already exist and the project explicitly requires them:

- Visitor analytics or charts
- Views, likes, or engagement statistics
- Comments management
- Media-library management
- User-management widgets
- Revenue or newsletter statistics
- Activity feeds
- Publishing-calendar widgets
- Destructive article actions such as delete

These features can be added later when the application has the corresponding real data and workflows.

## 13. Acceptance criteria

- An authenticated administrator can open `/admin` and immediately see total, published, and draft article counts.
- The administrator can start a new article from the page header.
- The five most recently updated articles appear in the correct order without full article content being sent to the frontend.
- Every recent article can be opened for editing.
- Published articles can be opened on the public site.
- Draft preview is shown only when a valid authenticated preview flow exists.
- Recent drafts provide a quick way to continue editing unfinished work.
- Empty, loading, and error states are implemented.
- The page works without horizontal overflow on mobile.
- The implementation uses the existing project design system and does not introduce unrelated dashboard features.

## 14. Step-by-step implementation plan

Codex should complete the work in the following order. Finish and verify one step before moving to the next. Do not redesign unrelated parts of the application.

### Step 1 — Inspect the existing implementation

Goal: understand the real project structure before changing code.

Tasks:

- Inspect both frontend and backend repositories.
- Read the existing admin layout, route protection, article entity, article service/controller, DTO conventions, frontend data-fetching helpers, reusable UI components, and test setup.
- Inspect the relevant `package.json` scripts and follow the project's established commands.
- Check the current working tree and preserve unrelated user changes.
- Identify the exact files that need to be created or modified.
- Confirm whether an authenticated draft-preview route already exists.

Verification checkpoint:

- Summarize the files and existing patterns that will be reused.
- Record whether draft preview is currently supported.
- Do not make implementation changes until this inspection is complete.

### Step 2 — Implement the backend dashboard response

Goal: provide the dashboard with a small, purpose-built response.

Tasks:

- Add response DTOs/types matching `AdminDashboardData` and `AdminDashboardArticle` from this document.
- Add an authenticated `GET /admin/dashboard` endpoint, following the project's existing routing and guard conventions.
- Return:
  - total article count;
  - published article count;
  - draft article count;
  - five articles ordered by `updatedAt DESC`;
  - up to three drafts ordered by `updatedAt DESC`.
- Select only the fields needed by the dashboard.
- Do not return JSONB article content or complete author records.
- Reuse the existing article repository/service architecture instead of placing database logic in the controller.
- Add or update backend tests if a test structure already exists.

Verification checkpoint:

- Run the relevant backend type-check, lint, and tests.
- Confirm the endpoint is protected.
- Confirm counts use the full dataset rather than the five recent articles.
- Confirm article ordering and response shape.

### Step 3 — Add the frontend data layer

Goal: consume the new endpoint with explicit frontend types.

Tasks:

- Add the dashboard response types in the project's existing types location.
- Add a request/helper for the admin dashboard endpoint using the existing authenticated server-side request pattern.
- Keep API access outside visual components.
- Treat API dates as ISO strings on the frontend.
- Follow the project's established error-handling approach.

Verification checkpoint:

- Run the frontend type-check and lint.
- Confirm the request includes the administrator's authentication using the existing mechanism.
- Confirm the TypeScript type matches the backend response.

### Step 4 — Build the page shell and overview

Goal: create the main dashboard structure and its highest-priority action.

Tasks:

- Implement the `/admin` page within the existing admin layout.
- Add the `Dashboard` heading and supporting text.
- Add the `New article` action linked to `/admin/articles/new`.
- Add the three overview values: total articles, published, and drafts.
- Reuse existing components and project design rules.
- Keep the page server-rendered where practical; add client components only when interaction requires them.

Verification checkpoint:

- Confirm all three values render from real backend data.
- Confirm the new-article link works.
- Confirm the page does not duplicate the global admin navigation or layout.

### Step 5 — Build the recent articles section

Goal: make recent content easy to inspect and edit.

Tasks:

- Render at most five recent articles.
- Show title, textual status, last updated date, and published date when available.
- Link title and `Edit` to `/admin/articles/[slug]/edit`.
- Link `View` to `/articles/[slug]` for published articles.
- Show `Preview` for drafts only if Step 1 confirmed that a valid authenticated draft-preview route exists. Otherwise omit it.
- Add `View all articles`, linked to `/admin/articles`.
- Use stable identifiers such as article `id` as rendering keys.

Verification checkpoint:

- Confirm published and draft actions follow the correct routes.
- Confirm articles are displayed newest-updated first.
- Confirm no public link is generated for an unpublished article.

### Step 6 — Add recent drafts and empty states

Goal: make unfinished work discoverable without cluttering an empty dashboard.

Tasks:

- Render up to three recent drafts with title, updated date, and `Continue editing`.
- Link `Continue editing` to `/admin/articles/[slug]/edit`.
- Hide the draft section when no drafts exist.
- Implement the no-articles empty state with `Create your first article`.
- Keep overview counts visible as zero when a successful response confirms there are no articles.

Verification checkpoint:

- Test with no articles, only drafts, only published articles, and a mixture of both.
- Confirm the empty state is not displayed during loading or after a request failure.

### Step 7 — Add loading and error handling

Goal: make data-fetching states explicit and recoverable.

Tasks:

- Implement route-appropriate loading placeholders matching the dashboard structure.
- Implement a concise error state without exposing internal details.
- Add a working `Try again` action using the project's existing retry or route-refresh approach.
- Do not flash fake zero values before loading completes.
- If the architecture performs independent requests, preserve sections whose requests succeeded.

Verification checkpoint:

- Confirm loading, success, empty, and failure states are visually distinct.
- Confirm retry performs another request or route refresh.

### Step 8 — Responsive and accessibility pass

Goal: make the completed dashboard usable across devices and input methods.

Tasks:

- Verify desktop, tablet, and narrow mobile layouts.
- Adapt the recent-articles presentation for mobile if the desktop table does not fit.
- Prevent horizontal page scrolling.
- Verify semantic heading order and keyboard navigation.
- Ensure status is communicated with text and not color alone.
- Add accessible labels to icon-only controls.

Verification checkpoint:

- Test at representative mobile and desktop widths.
- Confirm every action is reachable by keyboard.
- Confirm there are no obvious accessibility violations introduced by the new page.

### Step 9 — Final validation and handoff

Goal: leave the implementation working and easy to review.

Tasks:

- Run the relevant backend and frontend lint, type-check, test, and build commands available in the repositories.
- Review the final diff for accidental or unrelated changes.
- Confirm every acceptance criterion in Section 13.
- Do not silently weaken requirements to make checks pass.

Final report must include:

- What was implemented.
- Main files changed.
- Commands/checks run and their results.
- Any requirement that could not be completed and the exact reason.
- Any required manual verification, kept to a minimum.

## 15. Single prompt for Codex

Copy and send the following as one prompt:

```text
Implement the admin dashboard main page described in `Admin-Dashboard-Main-Page-Requirements.md`.

Work through Section 14 in order, completing Steps 1 through 9. Treat each step as a checkpoint: inspect first, implement only the scope of the current step, run the relevant verification, and then continue. You may complete all steps in this single run; do not stop after each checkpoint unless you encounter a blocker that requires my decision.

Important constraints:

- Use the existing frontend and backend architecture, authentication flow, design system, components, naming conventions, request helpers, and test patterns.
- Inspect the actual code before deciding file paths or implementation details.
- Preserve unrelated working-tree changes and do not perform destructive Git operations.
- Implement a dedicated authenticated `GET /admin/dashboard` endpoint if an equivalent endpoint does not already exist.
- Keep the response minimal: counts, five recent articles, and up to three recent drafts. Do not return article JSONB content or full author records.
- Do not invent analytics, charts, activity feeds, comments, or other features listed as out of scope.
- Do not invent a draft-preview route. If one does not already exist, omit the draft preview action.
- Keep API dates typed as strings on the frontend.
- Prefer server rendering and existing server-side authentication/data-fetching patterns where appropriate. Add client-side code only when required for interaction.
- Complete the required loading, error, empty, responsive, and accessibility states.
- Run the repository's relevant lint, type-check, tests, and builds before finishing.

At the end, give me a concise report containing the implemented behavior, files changed, verification commands and results, and any unresolved blocker. Do not merely describe the solution—make the code changes and verify them.
```
