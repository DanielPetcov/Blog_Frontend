# Personal Blog Frontend

Next.js frontend for the personal blog and its authenticated editorial workspace.

## Setup

Requirements: Node.js, npm, and the backend API running locally.

```bash
npm install
```

Create `.env` with the backend base URL:

```env
API_URL=http://localhost:3001
```

Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Serve a production build
npm run lint     # ESLint
npx tsc --noEmit # Type-check only
```

## Application areas

- `/` — latest published writing and the top three published topics.
- `/articles` — paginated public archive with search and topic filters.
- `/articles/:slug` — public article detail.
- `/admin/login` — administrator sign-in.
- `/admin` — editorial dashboard.
- `/admin/articles` — article administration.
- `/admin/articles/new` and `/admin/articles/:slug/edit` — article forms.

## Data and API conventions

Server API functions live in `lib/api`; server actions live in `actions`; shared response handling uses `ApiResult<T>` from `lib/types/api.ts`.

Article API operations are named by audience and action, for example `listPublicArticles`, `getAdminArticle`, and `updateAdminArticle`. Topic operations follow the same convention.

The API URL is server-only. Authentication is stored in an HTTP-only `access_token` cookie after sign-in, and protected server actions send it as a bearer token.

## Block editor

The article edit screen includes a block editor for the API’s ordered `ArticleBlock[]` content model. It provides separate controls for paragraph, heading, image, code, quote, divider, and Mermaid diagram blocks.

Use the sidebar to select a block, add a new block, remove a block, or drag blocks to reorder them. Saving submits the complete ordered block array to the backend.

## Topics

Article forms offer existing topics through a datalist. Entering a new valid topic slug creates that topic automatically when the article is saved. The public archive preserves search and topic filters independently, and each active filter can be removed without clearing the other.
