
---

## **Project Overview**

This project is a personal website built to serve as both a **resume landing page** and a **Markdown-based blog**. It’s designed for simplicity, performance, and a modern, animated presentation.

The site is **hosted on [Vercel](https://vercel.com)** and built with **Next.js**, combining **MDX** (Markdown + JSX) for blog posts, **Tailwind CSS** for styling, and **Framer Motion** for smooth animations.

---

## **Tech Stack**

| Layer               | Technology                                      | Purpose                                             |
| ------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **Framework**       | [Next.js](https://nextjs.org/)                  | React-based framework for static and dynamic pages  |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)        | Utility-first CSS for responsive, modern layouts    |
| **Content**         | [MDX](https://mdxjs.com/)                       | Write blog posts in Markdown with React components  |
| **Animations**      | [Framer Motion](https://www.framer.com/motion/) | For smooth, declarative motion effects              |
| **Hosting**         | [Vercel](https://vercel.com/)                   | Global CDN hosting and CI/CD platform               |
| **Version Control** | [GitHub](https://github.com/)                   | Source control and automatic deployment integration |

---

## **Getting Started**

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see your site.

### Adding Blog Posts

Create `.mdx` files in the `posts/` directory with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-01-15"
excerpt: "A brief description of your post"
tags: ["JavaScript", "Tutorial"]
---

Your markdown content here...
```

## **Project Structure**

```
/
├─ app/
│  ├─ layout.tsx          # Root layout with theme provider
│  ├─ page.tsx            # Landing page with contact form
│  ├─ globals.css         # Global styles and Tailwind
│  ├─ blog/
│  │  ├─ page.tsx         # Blog listing with search & filters
│  │  └─ [slug]/
│  │     └─ page.tsx      # Dynamic blog post page
│  └─ resume/
│     └─ page.tsx         # Animated resume page
├─ components/
│  ├─ ThemeProvider.tsx   # Dark/light mode context
│  ├─ ThemeToggle.tsx     # Theme toggle button
│  ├─ Navbar.tsx          # Site navigation
│  └─ PostCard.tsx        # Blog post preview card
├─ lib/
│  └─ posts.ts            # Utilities for reading MDX files
├─ posts/                 # MDX blog posts
│  └─ example-post.mdx
├─ package.json
├─ tailwind.config.ts
├─ next.config.ts
└─ vercel.json
```

---

## **Deployment**

The site is continuously deployed via **Vercel**, connected directly to GitHub.

### Deployment Workflow

1. Push updates to the main branch.
2. Vercel automatically detects the commit, builds, and deploys.
3. The site is served globally through Vercel’s CDN.
4. SSL certificates are automatically provisioned and renewed via **Let’s Encrypt**, ensuring full HTTPS security.

### Live Demo

👉 **[https://your-site.vercel.app](https://your-site.vercel.app)** (example)

---

## **Features**

* 📄 **MDX blog posts** with frontmatter metadata
* 🔍 **Blog search & tag filtering** for easy navigation
* 🌓 **Dark/light mode toggle** with local storage persistence
* ✨ **Smooth animations** using Framer Motion
* 📧 **Contact form** on landing page
* 🎨 **Minimal, clean design** with Tailwind CSS
* 📱 **Fully responsive** mobile-first design
* ⚡ **Static site generation** for optimal performance
* 🔒 **Automatic SSL (HTTPS)** via Vercel

---

## **Why Vercel**

Vercel provides seamless, zero-config deployment for Next.js apps:

* Automatic build and deployment from GitHub.
* Global edge network for fast performance.
* Built-in SSL and CDN with no setup.
* Instant rollbacks and preview deployments.

This makes it ideal for a personal site that should be reliable, performant, and easy to maintain.

---

## **Future Enhancements**

- [ ] RSS feed at `/rss.xml`
- [ ] Privacy-friendly analytics (Vercel Analytics or Plausible)
- [ ] Code syntax highlighting with Prism or Shiki
- [ ] Reading time estimates for blog posts
- [ ] Related posts suggestions
- [ ] Newsletter subscription
- [ ] Open Graph images for social sharing

---

