# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website combining a resume landing page and MDX-based blog, built with Next.js and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX) for blog posts
- **Animations**: Framer Motion
- **Hosting**: Vercel with automatic deployments from GitHub

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Page Structure

- **Resume Page** (`pages/index.tsx`): Home page with animated resume content
- **Blog System** (`pages/blog/[slug].tsx`): Dynamic routing for individual blog posts from MDX files
- **Blog Posts** (`posts/*.mdx`): MDX files with frontmatter metadata

### Component Organization

- **Layout Components**: Site-wide layout and navigation structure
- **PostCard**: Preview cards for blog posts on listing pages
- **Navbar**: Site navigation with potential dark mode toggle

### Content Management

Blog posts are written in MDX format in the `posts/` directory. Each post should include frontmatter with metadata (title, date, tags, etc.).

### Styling Approach

Uses Tailwind CSS utility classes. Global styles are in `styles/globals.css`. The design is responsive-first with support for planned dark mode implementation.

## Deployment

Vercel handles automatic deployments:
- Push to main branch triggers automatic build and deployment
- Preview deployments created for pull requests
- SSL certificates automatically managed

## Planned Features

- RSS feed at `/rss.xml`
- Dark/light mode toggle with local storage persistence
- Privacy-friendly analytics (Vercel Analytics or Plausible)
- Tag-based filtering for blog posts
