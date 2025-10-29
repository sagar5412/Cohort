import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { API_BASE } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  const handlePublish = async () => {
    const content = editor?.getHTML() || "";
    if (!title.trim() || !content.trim() || content === "<p></p>") {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      await axios.post(
        `${API_BASE}/api/v1/blog`,
        { title, content },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      navigate("/blogs");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create a New Post</h1>
        <p className="text-gray-600 mt-1">Share your ideas with the world</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title..."
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            disabled={loading}
          />
        </div>

        {/* TipTap Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <EditorContent
              editor={editor}
              className="bg-white"
              disabled={loading}
            />
          </div>
        </div>

        {/* Toolbar (Bold, Italic, etc.) */}
        {editor && (
          <div className="flex gap-1 p-2 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("bold") ? "bg-gray-300" : ""
              }`}
            >
              B
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("italic") ? "bg-gray-300" : ""
              }`}
            >
              I
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
              }`}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
              }`}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("bulletList") ? "bg-gray-300" : ""
              }`}
            >
              • List
            </button>
          </div>
        )}

        {/* Publish Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Publishing...
              </>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};