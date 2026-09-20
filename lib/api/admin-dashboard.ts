import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AdminDashboardData } from "@/lib/types/admin-dashboard";

const dummyDashboardData: AdminDashboardData = {
  counts: {
    total: 7,
    published: 4,
    drafts: 3,
  },
  recentArticles: [
    {
      id: 7,
      title: "A Practical Guide to Error Boundaries",
      slug: "a-practical-guide-to-error-boundaries",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-18T14:25:00.000Z",
    },
    {
      id: 6,
      title: "Building a Message Broker From Scratch",
      slug: "building-a-message-broker-from-scratch",
      published: true,
      publishedAt: "2026-09-12T09:00:00.000Z",
      updatedAt: "2026-09-16T11:40:00.000Z",
    },
    {
      id: 5,
      title: "Notes on Designing a Better CLI",
      slug: "notes-on-designing-a-better-cli",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-14T08:15:00.000Z",
    },
    {
      id: 4,
      title: "Cache Invalidation Without the Hand-Waving",
      slug: "cache-invalidation-without-the-hand-waving",
      published: true,
      publishedAt: "2026-09-03T09:00:00.000Z",
      updatedAt: "2026-09-10T16:05:00.000Z",
    },
    {
      id: 3,
      title: "A Small Checklist for Release Days",
      slug: "a-small-checklist-for-release-days",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-08T10:30:00.000Z",
    },
  ],
  recentDrafts: [
    {
      id: 7,
      title: "A Practical Guide to Error Boundaries",
      slug: "a-practical-guide-to-error-boundaries",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-18T14:25:00.000Z",
    },
    {
      id: 5,
      title: "Notes on Designing a Better CLI",
      slug: "notes-on-designing-a-better-cli",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-14T08:15:00.000Z",
    },
    {
      id: 3,
      title: "A Small Checklist for Release Days",
      slug: "a-small-checklist-for-release-days",
      published: false,
      publishedAt: null,
      updatedAt: "2026-09-08T10:30:00.000Z",
    },
  ],
};

/**
 * Returns fixture data until USE_DUMMY_ADMIN_DATA is explicitly set to false.
 * Keeping the fixture here lets the page retain the same minimal DTO and
 * request boundary in both stages of development.
 */
export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const apiUrl = process.env.API_URL;

  if (process.env.USE_DUMMY_ADMIN_DATA !== "false") {
    return dummyDashboardData;
  }

  if (!apiUrl) {
    throw new Error("API_URL is required when dashboard fixture data is disabled.");
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    redirect("/admin/login");
  }

  const response = await fetch(`${apiUrl}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/admin/login");
  }

  if (!response.ok) {
    throw new Error("Unable to load the admin dashboard.");
  }

  return response.json() as Promise<AdminDashboardData>;
}
