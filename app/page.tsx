import { ArrowRight } from "lucide-react";
import PageHero from "./components/Page/PageHero";
import ArticleRow, { ArticleRowProps } from "./components/ArticleRow";
import ActionButton from "./components/ActionButton";
import TopicRow, { TopicRowProps } from "./components/TopicRow";

const articles: ArticleRowProps[] = [
  {
    id: 1,
    slug: "test",
    title: "Building a Message Broker From Scratch",
    description: "Learn to build a small broker",
    topic: "System Design",
    readTime: 12,
    dateCreated: new Date(),
  },
  {
    id: 2,
    slug: "test",
    title: "Building a  Broker From Scratch",
    description: "Learn to build a small broker",
    topic: "System Design",
    readTime: 12,
    dateCreated: new Date(),
  },
  {
    id: 3,
    slug: "test",
    title:
      "Building a Message Broker From Scratch. A new type of solving equations",
    description:
      "Learnasdfasdfasdfasdf to buiasdfasdf d a asdf asdf asd fasdf asmall broker",
    topic: "System Design",
    readTime: 12,
    dateCreated: new Date(),
  },
];

const topics: TopicRowProps[] = [
  {
    slug: "system",
    title: "system design",
    count: 1,
  },
  {
    slug: "database",
    title:
      "databaseasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadatabaseasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfa",
    count: 12,
  },
  {
    slug: "backend",
    title: "backend",
    count: 123,
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-5">
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

      <div className="space-y-12 mt-40">
        {articles.map((article) => (
          <ArticleRow key={article.id} {...article} />
        ))}
        <ActionButton>
          Check all articles <ArrowRight />{" "}
        </ActionButton>
      </div>

      <div className="mt-40">
        <div className="space-y-6 font-mono">
          <h2 className="uppercase text-lg font-semibold">Topics</h2>
          {topics.map((topic) => (
            <TopicRow key={topic.slug} {...topic} />
          ))}
        </div>
      </div>
    </div>
  );
}
