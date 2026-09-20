# Admin Dashboard API contract

The dashboard currently uses local fixture data by default. Once the endpoint below is implemented, set `USE_DUMMY_ADMIN_DATA=false` (and ensure `API_URL` is its base URL). The frontend will automatically send the existing `access_token` cookie as a bearer token. In real-API mode, `/admin` redirects to `/admin/login` when the token cookie is absent.

## `GET /admin/dashboard`

Authentication: required (`Authorization: Bearer <access_token>`)

Returns the article counts across the complete article collection, plus only the lightweight fields required for the dashboard. Do not include article content, cover-image payloads, or author objects.

```ts
type AdminDashboardArticle = {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: string | null; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
};

type AdminDashboardData = {
  counts: {
    total: number;
    published: number;
    drafts: number;
  };
  recentArticles: AdminDashboardArticle[]; // max 5, updatedAt DESC
  recentDrafts: AdminDashboardArticle[]; // max 3, draft-only, updatedAt DESC
};
```

Example response:

```json
{
  "counts": { "total": 7, "published": 4, "drafts": 3 },
  "recentArticles": [
    {
      "id": 7,
      "title": "A Practical Guide to Error Boundaries",
      "slug": "a-practical-guide-to-error-boundaries",
      "published": false,
      "publishedAt": null,
      "updatedAt": "2026-09-18T14:25:00.000Z"
    }
  ],
  "recentDrafts": []
}
```

## Linked admin workflows (not implemented by this dashboard)

The dashboard links to these screens. Their endpoints can be implemented when those screens are built:

| Workflow | Frontend route | Suggested API |
| --- | --- | --- |
| Article list | `/admin/articles` | `GET /admin/articles` |
| New article | `/admin/articles/new` | `POST /admin/articles` |
| Edit article | `/admin/articles/[slug]/edit` | `GET /admin/articles/:slug`, `PATCH /admin/articles/:id` |
| Public article | `/articles/[slug]` | `GET /articles/:slug` |

Draft preview is intentionally absent: the project currently has no authenticated preview route.
