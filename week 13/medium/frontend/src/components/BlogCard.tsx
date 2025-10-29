import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  datePublished: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  datePublished,
}: BlogCardProps) => {
  const readMinutes = Math.max(1, Math.ceil(content.length / 500));
  return (
    <Link to={`/blog/${id}`}>
      <article className="cursor-pointer">
        <header className="inline-flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
          <div>
            <AvatarComponent name={authorName} />
          </div>
          <div className="font-medium font-sans text-gray-700 mx-1 capitalize">
            {authorName}
          </div>
          <time
            className="font-normal font-sans text-gray-500"
            dateTime={datePublished}
          >
            {datePublished}
          </time>
        </header>
        <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-700 line-clamp-3 mb-2">
          {content.slice(0, 300)}
          {content.length > 300 && "..."}
        </p>

        <footer className="text-sm text-gray-500 mt-8">
          {readMinutes} min read
        </footer>
        <div className="border-b-2 border-gray-100 mt-10 mb-6"></div>
      </article>
    </Link>
  );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-mono text-gray-600 dark:text-gray-300 text-center text-sm">
        {name[0]}
      </span>
    </div>
  );
}
