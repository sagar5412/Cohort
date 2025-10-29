import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative flex justify-between p-4 items-center"
    >
      <Link to={"/blogs"}>
        <div className="text-xl font-bold cursor-pointer">Medium</div>
      </Link>

      <div className="relative flex flex-row justify-center items-center gap-10">
        <Link to={"/publish"} >
          <div className="">
            <button className="bg-gray-300 rounded-lg p-3 text-black cursor-pointer px-6 text-center">
              Post
            </button>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center focus:outline-none"
          aria-label="User menu"
        >
          <AvatarComponent name="Sagar" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-300">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-mono text-gray-600 dark:text-gray-300 text-center text-lg">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
