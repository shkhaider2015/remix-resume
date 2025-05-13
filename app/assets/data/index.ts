import whyIChoseReactNestjs from "~/assets/images/blogs/why-i-chose-react-nestjs.png";
import remixVsNextjsWhyChooseRemixjs from "~/assets/images/blogs/remix-vs-nextjs-why-choose-remixjs.png";
const whyChooseReactNest: BlogPost = {
  id: "1",
  title: "Why I Chose React + NestJS for Full-Stack Development",
  slug: "why-i-chose-react-nestjs-for-full-stack-development",
  authorId: "user123",
  createdAt: "2025-05-12T10:00:00Z",
  updatedAt: "2025-05-12T10:00:00Z",
  isPublished: true,
  content: [
    {
      type: "image",
      url: whyIChoseReactNestjs,
      alt: "React and NestJS logos",
    },
    {
      type: "heading",
      level: 1,
      text: "🧠 Why I Chose React + NestJS for Full-Stack Development",
    },
    {
      type: "paragraph",
      text: "As a full-stack developer, choosing the right tech stack isn’t just about hype — it’s about productivity, scalability, and long-term maintainability. After building several projects using different stacks, I found the combination of React (for the frontend) and NestJS (for the backend) to be a perfect match. Here's why.",
    },
    {
      type: "heading",
      level: 2,
      text: "🔷 1. React – A Frontend Powerhouse",
    },
    {
      type: "paragraph",
      text: "React is my go-to frontend framework for a few key reasons:",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Component-based architecture: Encourages reusable UI logic",
        "Huge ecosystem: Tons of libraries (React Router, Zustand, Redux, Tailwind)",
        "Developer experience: Hot reload, dev tools, easy testing",
        "Strong community & job market",
      ],
    },
    {
      type: "paragraph",
      text: "A simple example: A button component in React",
    },
    {
      type: "code",
      language: "jsx",
      code: `// components/Button.tsx
  import React from 'react';
  
  type ButtonProps = {
    label: string;
    onClick: () => void;
  };
  
  const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default Button;`,
    },
    {
      type: "paragraph",
      text: "This reusable component pattern is one of the biggest wins with React.",
    },
    {
      type: "heading",
      level: 2,
      text: "🛡️ 2. NestJS – Scalable & Structured Backend",
    },
    {
      type: "paragraph",
      text: "NestJS stood out to me because it's:",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Opinionated: Gives structure, unlike raw Express",
        "TypeScript-first: Type safety across the app",
        "Modular: Great for scaling projects",
        "Supports REST, GraphQL, WebSockets, Microservices",
        "Easy database integration",
      ],
    },
    {
      type: "paragraph",
      text: "Example: A simple route in NestJS",
    },
    {
      type: "code",
      language: "ts",
      code: `// users.controller.ts
  import { Controller, Get } from '@nestjs/common';
  
  @Controller('users')
  export class UsersController {
    @Get()
    findAll() {
      return [{ id: 1, name: 'John Doe' }];
    }
  }`,
    },
    {
      type: "paragraph",
      text: "Readable, testable, and scalable from the start.",
    },
    {
      type: "heading",
      level: 2,
      text: "🔗 3. Type Sharing Between Frontend & Backend",
    },
    {
      type: "paragraph",
      text: "Since both React and NestJS use TypeScript, I can share types/interfaces between the frontend and backend — avoiding redundant declarations and reducing bugs.",
    },
    {
      type: "paragraph",
      text: "Shared type example",
    },
    {
      type: "code",
      language: "ts",
      code: `// shared/types.ts
  export type User = {
    id: string;
    name: string;
    email: string;
  };`,
    },
    {
      type: "paragraph",
      text: "In NestJS:",
    },
    {
      type: "code",
      language: "ts",
      code: `import { User } from '../shared/types';`,
    },
    {
      type: "paragraph",
      text: "In React:",
    },
    {
      type: "code",
      language: "ts",
      code: `import { User } from '../shared/types';`,
    },
    {
      type: "paragraph",
      text: "No mismatch. No guesswork.",
    },
    {
      type: "heading",
      level: 2,
      text: "🧩 4. Easy API Integration",
    },
    {
      type: "paragraph",
      text: "React + NestJS makes it easy to fetch and render data:",
    },
    {
      type: "code",
      language: "jsx",
      code: `// Fetching users in React
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);`,
    },
    {
      type: "paragraph",
      text: "The backend stays clean and maintainable, the frontend remains responsive and interactive.",
    },
    {
      type: "heading",
      level: 2,
      text: "🚀 Final Thoughts",
    },
    {
      type: "paragraph",
      text: "Choosing React + NestJS wasn't random. It came from building real-world apps and understanding where bottlenecks appear. This stack has helped me:",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Move faster without sacrificing structure",
        "Maintain and scale apps confidently",
        "Deliver both web and mobile apps efficiently (especially with React Native)",
      ],
    },
    {
      type: "paragraph",
      text: "If you're deciding on your full-stack architecture or coming from a MERN background, I highly recommend giving React + NestJS a try.",
    },
  ],
};

const remixVsNextjs: BlogPost = {
  id: "remix-vs-nextjs-2025",
  title: "🥊 Remix vs Next.js — Why Choose RemixJS?",
  slug: "remix-vs-nextjs-why-choose-remixjs",
  authorId: "shakeel-haider",
  createdAt: "2025-05-13T10:00:00Z",
  updatedAt: "2025-05-13T10:00:00Z",
  isPublished: true,
  content: [
    {
      type: "image",
      url: remixVsNextjsWhyChooseRemixjs,
      alt: "React and NestJS logos",
    },
    {
      type: "heading",
      level: 1,
      text: "🥊 Remix vs Next.js — Why Choose RemixJS?",
    },
    {
      type: "paragraph",
      text: "Both Remix and Next.js are powerful full-stack React frameworks designed to build modern web applications. While Next.js is a long-established player backed by Vercel, RemixJS is the newer, web-standard-focused framework rapidly gaining attention for its performance, simplicity, and data handling model.",
    },
    {
      type: "paragraph",
      text: "In this article, we’ll dive into what sets Remix apart from Next.js, and why Remix might be the better fit for your next project — especially if you're after speed, maintainability, and web-fundamental alignment.",
    },
    {
      type: "heading",
      level: 2,
      text: "🚀 RemixJS at a Glance",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Full-stack React framework",
        "Built around web fundamentals (like HTTP caching, native forms)",
        "Embraces progressive enhancement",
        "Focus on fast performance through minimal JavaScript dependency",
        "Works with any deployment target (Node, Cloudflare, Deno, etc.)",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "🔍 Key Advantages of Remix Over Next.js",
    },
    {
      type: "paragraph",
      text: "Let’s compare both based on real developer concerns and architectural differences.",
    },
    {
      type: "heading",
      level: 3,
      text: "1. 🧠 Data Loading Model",
    },
    {
      type: "paragraph",
      text: "✅ Remix: Server-first, co-located loaders\nEach route in Remix defines a `loader()` function that runs on the server before rendering. It fetches all required data in parallel and sends it as part of the response.",
    },
    {
      type: "code",
      language: "jsx",
      code: `// app/routes/posts.tsx
export const loader = async () => {
  const posts = await getPosts();
  return json(posts);
};`,
    },
    {
      type: "paragraph",
      text: "🚫 Next.js: getServerSideProps or getStaticProps\nNext.js separates data fetching into special functions, but only at the page level, which limits reusability and composability for nested components.",
    },
    {
      type: "code",
      language: "jsx",
      code: `// pages/posts.js
export async function getServerSideProps() {
  const posts = await getPosts();
  return { props: { posts } };
}`,
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: Remix simplifies data fetching by tying it directly to the route, even nested ones — leading to better performance and structure.",
    },
    {
      type: "heading",
      level: 3,
      text: "2. 🧭 Nested Routing and Layouts",
    },
    {
      type: "paragraph",
      text: "✅ Remix: Native Nested Routes\nRemix routes are co-located and inherently nested. Layouts and routes are structured just like folders, and you can have layout-level loaders.",
    },
    {
      type: "code",
      language: "text",
      code: `routes/
├── dashboard.tsx        --> /dashboard
└── dashboard/
    └── settings.tsx     --> /dashboard/settings`,
    },
    {
      type: "paragraph",
      text: "🚫 Next.js: App Router and File Conventions\nNext.js recently introduced app directory-based routing, which supports layouts, but it's newer and more complex, and does not integrate deeply with server-side data in layouts.",
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: Remix's nested routes are easier to reason about, more flexible, and scale better with complex UI hierarchies.",
    },
    {
      type: "heading",
      level: 3,
      text: "3. ⚡ Performance: Less JavaScript on the Client",
    },
    {
      type: "paragraph",
      text: "✅ Remix: Minimal JS Dependency\nRemix loads as little JS as needed. It relies on standard browser behavior like native form submission and caching to reduce client-side logic.",
    },
    {
      type: "paragraph",
      text: "🚫 Next.js: Client-heavy Interactivity\nNext.js leans more on hydration and client-side APIs, which often leads to heavier bundles.",
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: Remix apps are often faster by default because they offload more work to the browser and server.",
    },
    {
      type: "heading",
      level: 3,
      text: "4. 📤 Forms & Actions",
    },
    {
      type: "paragraph",
      text: "✅ Remix: Progressive, Server-powered Forms\nForms in Remix use native `<form>` tags with server-side `action()` functions to handle submissions — no JavaScript needed.",
    },
    {
      type: "code",
      language: "jsx",
      code: `export const action = async ({ request }) => {
  const formData = await request.formData();
  await savePost(formData);
  return redirect("/success");
};`,
    },
    {
      type: "paragraph",
      text: "🚫 Next.js: Requires JavaScript + API routes\nNext.js forms are typically handled via `fetch` or client-side libraries. No built-in form handling like Remix.",
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: Remix brings the simplicity of traditional server-rendered apps, enabling fast, progressive forms with less client code.",
    },
    {
      type: "heading",
      level: 3,
      text: "5. 🌐 Caching & Web Fundamentals",
    },
    {
      type: "paragraph",
      text: "✅ Remix: Built on HTTP caching\nYou can control caching at the loader level, allowing smart control over what the browser or CDN stores.",
    },
    {
      type: "code",
      language: "ts",
      code: `export const loader: LoaderFunction = async ({ request }) => {
  return new Response(JSON.stringify(data), {
    headers: { "Cache-Control": "max-age=3600" },
  });
};`,
    },
    {
      type: "paragraph",
      text: "🚫 Next.js: Mostly handled by Vercel-specific optimizations\nYou can control headers, but it's more abstracted and less flexible if not hosted on Vercel.",
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: Remix gives direct control over HTTP responses and cache — embracing native web principles.",
    },
    {
      type: "heading",
      level: 3,
      text: "6. 🛠️ Deployment Flexibility",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Remix runs on Node.js, Deno, Cloudflare Workers, Vercel, Netlify, Fly.io — even as a standalone Express app.",
        "Next.js works best on Vercel (its sponsor). Custom deployments are possible but less seamless.",
      ],
    },
    {
      type: "paragraph",
      text: "🔍 Verdict: If you need to avoid vendor lock-in, Remix is more flexible.",
    },
    {
      type: "heading",
      level: 3,
      text: "7. 🔧 Developer Experience",
    },
    {
      type: "paragraph",
      text: "Here’s a quick feature comparison between Remix and Next.js:",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Routing — Remix: Nested, layout-first | Next.js: Flat by default (Pages), App Dir is new",
        "Data Fetching — Remix: Route-based loaders | Next.js: getServerSideProps, API routes",
        "Forms — Remix: Native w/ actions | Next.js: Custom JS + API endpoints",
        "Caching — Remix: Full HTTP control | Next.js: Vercel handled or custom",
        "Client JS — Remix: Smaller, minimal | Next.js: Larger, hydration heavy",
        "Deployment — Remix: Any (Cloudflare, Deno…) | Next.js: Best on Vercel",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "🧩 When Should You Choose Remix Over Next.js?",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "✅ You want progressive enhancement and fast performance",
        "✅ You care about deep control over routing and data fetching",
        "✅ You prefer minimal JS and better SEO",
        "✅ You want to build apps that work even with JS disabled",
        "✅ You need flexible deployment options beyond Vercel",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "🏁 Final Thoughts",
    },
    {
      type: "paragraph",
      text: "Both Remix and Next.js are excellent tools. But Remix brings back the simplicity and performance of classic server-rendered apps, while still giving you modern React features. It favors web standards over custom abstractions, making your apps fast, resilient, and easier to reason about.",
    },
    {
      type: "paragraph",
      text: "Want help migrating an app from Next.js to Remix or building a new Remix app from scratch? Let me know! 🚀",
    },
  ],
};

export const blogPosts: BlogPost[] = [remixVsNextjs, whyChooseReactNest];
