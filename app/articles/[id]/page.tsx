import { type Article } from "@/lib/types/article";
import ArticleContent from "./components/ArticleContent";
import ArticleFooter from "./components/ArticleFooter";
import ArticleHeader from "./components/ArticleHeader";

const article: Article = {
  id: 1,
  slug: "building-a-message-broker-from-scratch",
  title: "Building a Message Broker From Scratch",
  description:
    "A small message broker is an excellent way to learn where distributed systems become real: queues, acknowledgements, and the cost of a promise.",
  coverImage: null,
  published: true,
  publishedAt: "2026-08-24T09:00:00.000Z",
  createdAt: "2026-08-20T09:00:00.000Z",
  updatedAt: "2026-08-24T09:00:00.000Z",
  author: {
    id: 1,
    name: "Daniel Petcov",
  },
  content: [
    {
      type: "paragraph",
      text: "Message brokers can feel like infrastructure you only need once a product becomes complicated. In reality, building a small one is a compact lesson in delivery guarantees, back pressure, and the awkward gap between sending a message and knowing it was actually handled.",
    },
    {
      type: "paragraph",
      text: "The goal here is not to compete with Kafka, RabbitMQ, or NATS. It is to keep the moving parts small enough that every decision remains visible. A producer publishes a message, a queue stores it, and a consumer acknowledges it after the work is done.",
    },
    { type: "heading", level: 2, text: "Start with the smallest useful contract" },
    {
      type: "paragraph",
      text: "Before choosing a transport or persistence layer, write down what the broker promises. For a first version, at-least-once delivery is usually the right promise. A consumer may see a message twice, but it should not silently lose work when a process restarts at the wrong moment.",
    },
    {
      type: "quote",
      text: "The simplest reliable system is often the one that makes its failure modes explicit.",
      author: "A useful design constraint",
    },
    { type: "heading", level: 2, text: "A queue is a record of unfinished work" },
    {
      type: "paragraph",
      text: "Treating the queue as a list is tempting, but its real job is to record state transitions. A message moves from ready, to in-flight, to acknowledged. If a consumer disappears while the message is in flight, the broker needs a way to make that work available again.",
    },
    { type: "heading", level: 3, text: "Acknowledgements shape the whole design" },
    {
      type: "paragraph",
      text: "Acknowledging before the work finishes creates at-most-once delivery: fast, but lossy. Acknowledging after the work finishes gives the broker a chance to retry. That one ordering decision affects visibility timeouts, idempotency, and what gets written to disk.",
    },
    {
      type: "code",
      language: "typescript",
      filename: "broker.ts",
      code: `type Message = {
  id: string;
  payload: unknown;
  attempts: number;
};

async function acknowledge(message: Message) {
  await store.markComplete(message.id);
  metrics.increment("broker.messages.acknowledged");
}`,
    },
    {
      type: "diagram",
      diagramType: "mermaid",
      content: `flowchart LR
  Producer[Producer] --> Queue[(Ready queue)]
  Queue --> Consumer[Consumer]
  Consumer -->|acknowledge| Complete[(Completed)]
  Consumer -->|timeout| Queue`,
    },
    { type: "divider" },
    { type: "heading", level: 2, text: "Keep the first version observable" },
    {
      type: "paragraph",
      text: "A broker earns trust when it can explain itself. Track the number of ready and in-flight messages, the age of the oldest item, failed deliveries, and consumer heartbeats. These few measurements make debugging possible before a dashboard exists.",
    },
    {
      type: "paragraph",
      text: "Once those basics are stable, persistence, dead-letter queues, and more elaborate routing become deliberate additions instead of rescue work. The point of the exercise is not a feature checklist; it is learning which promises your system can keep.",
    },
  ],
};

function getReadingTime(content: Article["content"]) {
  const words = content
    .filter((block) => block.type === "paragraph" || block.type === "quote")
    .reduce((total, block) => total + block.text.trim().split(/\s+/).length, 0);

  return Math.max(1, Math.ceil(words / 200));
}

export default function ArticlePage() {
  return (
    <article>
      <ArticleHeader article={article} readingTime={getReadingTime(article.content)} />
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <ArticleContent content={article.content} />
        <ArticleFooter />
      </div>
    </article>
  );
}
