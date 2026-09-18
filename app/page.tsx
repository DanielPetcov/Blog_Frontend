import { ArrowRight } from "lucide-react";
import PageHero from "./components/Page/PageHero";

export default function Home() {
  return (
    <div>
      <PageHero
        pageTitle={
          <>
            Thoughts on software, <br />
            systems & building things
          </>
        }
        pageSubtitle={
          <>
            Notes and longer articles about backend/frontend development, system
            design, DevOps and things I'm building.
          </>
        }
        actionButton={{
          href: "/articles",
          children: (
            <>
              Explore Articles
              <ArrowRight />
            </>
          ),
        }}
      />
    </div>
  );
}
