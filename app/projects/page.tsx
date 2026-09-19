import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ProjectCover =
  | "broker"
  | "notes"
  | "terminal"
  | "metrics"
  | "library"
  | "garden";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  coverImage: string | null;
  cover: ProjectCover;
  status: "Shipped" | "In progress" | "Exploring";
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Relay",
    description:
      "A small message broker built to make queues, acknowledgements, and retries easier to understand.",
    link: "#",
    coverImage: null,
    cover: "broker",
    status: "In progress",
    year: "2026",
  },
  {
    id: 2,
    title: "Field Notes",
    description:
      "A deliberately small writing environment for technical notes and experiments.",
    link: "#",
    coverImage: null,
    cover: "notes",
    status: "Shipped",
    year: "2026",
  },
  {
    id: 3,
    title: "Dockside",
    description:
      "A terminal-first toolkit for the repetitive work around local development.",
    link: "#",
    coverImage: null,
    cover: "terminal",
    status: "Exploring",
    year: "2025",
  },
  {
    id: 4,
    title: "Signal",
    description:
      "A focused dashboard for seeing the health of a small system at a glance.",
    link: "#",
    coverImage: null,
    cover: "metrics",
    status: "In progress",
    year: "2025",
  },
  {
    id: 5,
    title: "Schema Kit",
    description:
      "Tiny utilities for turning database decisions into clearer application contracts.",
    link: "#",
    coverImage: null,
    cover: "library",
    status: "Shipped",
    year: "2025",
  },
  {
    id: 6,
    title: "Patch Garden",
    description:
      "An ongoing collection of playful, one-purpose interfaces and visual experiments.",
    link: "#",
    coverImage: null,
    cover: "garden",
    status: "Exploring",
    year: "2024",
  },
];

function ProjectCoverArt({ cover }: { cover: ProjectCover }) {
  const grid = (
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,35,59,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(16,35,59,0.09)_1px,transparent_1px)] bg-[size:20px_20px]" />
  );

  return (
    <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-surface">
      {grid}
      {cover === "broker" && (
        <>
          <div className="absolute left-[13%] top-[22%] size-[22%] border-8 border-brand" />
          <div className="absolute right-[13%] top-[38%] h-[25%] w-[38%] bg-brand" />
          <div className="absolute bottom-[15%] left-[28%] h-px w-[45%] -rotate-[26deg] bg-navy" />
        </>
      )}
      {cover === "notes" && (
        <>
          <div className="absolute left-[17%] top-[15%] h-[70%] w-[53%] border-[7px] border-navy bg-background" />
          <div className="absolute left-[28%] top-[32%] h-2 w-[31%] bg-brand" />
          <div className="absolute left-[28%] top-[48%] h-2 w-[24%] bg-navy/30" />
          <div className="absolute left-[28%] top-[64%] h-2 w-[34%] bg-navy/30" />
        </>
      )}
      {cover === "terminal" && (
        <>
          <div className="absolute inset-x-[12%] top-[20%] h-[58%] border-[7px] border-navy bg-navy p-[9%] font-mono text-sm text-brand-soft">
            <span className="text-brand">$</span> make small
            <br />
            <span className="text-brand">$</span> ship often_
          </div>
        </>
      )}
      {cover === "metrics" && (
        <>
          <div className="absolute bottom-[19%] left-[15%] h-[13%] w-[12%] bg-navy" />
          <div className="absolute bottom-[19%] left-[34%] h-[31%] w-[12%] bg-brand" />
          <div className="absolute bottom-[19%] left-[53%] h-[48%] w-[12%] bg-navy" />
          <div className="absolute bottom-[19%] left-[72%] h-[25%] w-[12%] bg-brand-soft outline outline-4 outline-navy" />
        </>
      )}
      {cover === "library" && (
        <>
          <div className="absolute left-[16%] top-[18%] h-[62%] w-[17%] bg-brand" />
          <div className="absolute left-[38%] top-[29%] h-[51%] w-[17%] border-[6px] border-navy bg-surface-elevated" />
          <div className="absolute left-[60%] top-[12%] h-[68%] w-[17%] bg-navy" />
        </>
      )}
      {cover === "garden" && (
        <>
          <div className="absolute left-[17%] top-[20%] size-[25%] rounded-full border-[7px] border-brand" />
          <div className="absolute bottom-[15%] right-[16%] size-[36%] border-[8px] border-navy" />
          <div className="absolute left-[40%] top-[42%] size-[12%] bg-brand" />
        </>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  return (
    <Link
      href={project.link}
      className={`group block border border-border bg-surface-elevated transition-[transform,border-color] hover:-translate-y-1 hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${featured ? "md:col-span-2" : ""}`}
    >
      <div className={featured ? "md:grid md:grid-cols-2" : ""}>
        {project.coverImage ? (
          // Remote image policy will be configured when real project covers are connected.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt=""
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <ProjectCoverArt cover={project.cover} />
        )}
        <div
          className={`flex flex-col justify-between p-5 sm:p-6 ${featured ? "md:p-8" : ""}`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              <span>{project.status}</span>
              <span>{project.year}</span>
            </div>
            <h2 className="mt-9 text-3xl font-medium leading-none tracking-[-0.055em] text-navy sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-foreground-muted sm:text-base">
              {project.description}
            </p>
          </div>
          <span className="mt-9 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
            View project{" "}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
            Selected work / 2024—2026
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.075em] text-navy sm:text-6xl lg:text-7xl">
            Projects made to learn by building.
          </h1>
          <p className="mt-7 max-w-xl font-mono text-xs leading-6 tracking-[0.025em] text-foreground-muted sm:text-sm">
            Experiments, tools, and small systems that help me explore an idea
            in the open.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
              Project index
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.055em] text-navy sm:text-4xl">
              Things in progress.
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
            {projects.length} projects
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
