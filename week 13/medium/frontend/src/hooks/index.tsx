import { API_BASE } from "../config";
import axios from "axios";
import { useState, useEffect } from "react";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
  };
}

export const useBlog = ({id}:{id:string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No blog ID provided");
      setLoading(false);
      return;
    }
    axios
      .get(`${API_BASE}/api/v1/blog/${id}`)
      .then((res) => {
        setBlog(res.data.post || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load blogs");
        setLoading(false);
      });
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/v1/blog/bulk`)
      .then((res) => {
        setBlogs(res.data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load blogs");
        setLoading(false);
      });
  }, []);

  return { loading, blogs, error };
};
