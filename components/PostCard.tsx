"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-[#4682B4] dark:hover:text-[#5F9EA0] transition-colors">
          {post.title}
        </h2>
        <time className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
          {formattedDate}
        </time>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-[#B0C4DE] dark:bg-[#36648B] text-[#1e3a5f] dark:text-[#E0F0FF] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}
