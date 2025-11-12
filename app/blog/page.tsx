import { Navbar } from "@/components/Navbar";
import { BlogClient } from "@/components/BlogClient";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <BlogClient posts={allPosts} tags={allTags} />
        </main>
      </div>
    </>
  );
}
