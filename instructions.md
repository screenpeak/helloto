# Project Setup Instructions: Personal Resume & Blog Website

## 1. Project Overview

This project aims to create a personal website for `helloto.me`. The site will serve as a professional resume and a personal blog. It will be built with Next.js for a fast, modern user experience, and will feature animations with Framer Motion.

## 2. Prerequisites

Requires Node.js (version 18.x or later) and npm, which is installed with Node.js.

To verify your Node.js and npm installations, run the following commands in your terminal:

```bash
node -v
npm -v
```

## 3. Setup Next.js Site

Start by creating a new Next.js application. This command will set up a new project with the recommended Next.js configuration.

```bash
npx create-next-app@latest my-resume-blog
```

When prompted, select:
*   **TypeScript:** Yes
*   **ESLint:** Yes
*   **Tailwind CSS:** Yes (Highly recommended for rapid styling)
*   **`src/` directory:** Yes
*   **App Router:** Yes (Recommended for new projects)
*   **Import alias:** No (Keep default)

This will create a new directory named `my-resume-blog` with your Next.js project.

## 4. Create the Resume Page

After creating your Next.js project, navigate into its directory: `cd my-resume-blog`.

Your main resume page will be `src/app/page.tsx` (for the App Router). You can structure your resume content within this file using React components. Consider breaking down your resume into smaller, reusable components such as:

*   `src/components/Header.tsx` (for your name, contact info)
*   `src/components/Experience.tsx` (for work history)
*   `src/components/Education.tsx` (for academic background)
*   `src/components/Skills.tsx` (for technical skills)

Use Tailwind CSS classes for styling these components to match your desired design.

## 5. Create the Blog from Markdown

To set up your blog, follow these steps:

1.  **Create a `posts` directory:** Inside your `src` directory, create a new folder named `posts` (e.g., `src/posts`). This is where you will store all your Markdown blog posts.

2.  **Install Markdown parsing libraries:** You'll need `gray-matter` to parse the frontmatter (metadata like title, date) from your Markdown files, and `remark` (or `markdown-it`) to convert Markdown content to HTML.

    ```bash
    npm install gray-matter remark remark-html
    ```

3.  **Create a utility for reading posts:** Create a file like `src/lib/posts.ts` with functions to:
    *   `getAllPostSlugs()`: Read all Markdown files from `src/posts` and return their filenames (slugs).
    *   `getPostData(slug)`: Read a specific Markdown file, parse its frontmatter and content, and return the data.

4.  **Create a dynamic route for blog posts:** In Next.js App Router, create a dynamic route to display individual blog posts. For example, create `src/app/blog/[slug]/page.tsx`.

    Inside `page.tsx`, you will:
    *   Use `generateStaticParams` to tell Next.js which slugs (post filenames) to pre-render at build time.
    *   Use `getPostData(slug)` to fetch the content for the current post.
    *   Render the post content, converting Markdown to HTML using `remark-html`.

## 6. Adding Animations

This section will cover how to add animations to your site.
