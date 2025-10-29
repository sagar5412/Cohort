import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading blogs...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }
  return (
    <div>
      <AppBar></AppBar>
      <div className="border-b-2 border-gray-100 mb-6"></div>
      <div className="p-30 pt-0">
        {blogs.map((blog) => (
          <BlogCard
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content || ""}
            datePublished={formatDate(blog.createdAt)}
          ></BlogCard>
        ))}
      </div>
    </div>
  );
};

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
