import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { AppBar } from "../components/AppBar";
export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog, error } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error || "Blog not found"}</div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="border-b-2 border-gray-100 mb-6"></div>
      <FullBlog blog={blog} />;
    </div>
  );
};
