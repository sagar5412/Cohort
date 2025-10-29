import type { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <div className="flex items-center gap-1 text-sm text-gray-600 mb-6">
            Posted on
            <time>{date}</time>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <div className="md:col-span-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
               Author
            </h3>
            <div className="inline-flex justify-center items-center gap-2">
              <AvatarComponent name={blog.author.name || "A"} />
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="font-bold text-2xl text-gray-900 capitalize">
                {blog.author.name || "Anonymous"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center w-10 h-10 text-lg font-medium text-white bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
      {name[0].toUpperCase()}
    </div>
  );
}
