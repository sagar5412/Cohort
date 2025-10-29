import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE } from "../config";
import type { SignupInput } from "@sagargk/medium-common-project";

export const SignupAuth = () => {
  const [inputs, setInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/user/signup`,
        inputs
      );
      const token = response.data.token;

      localStorage.setItem("token", `Bearer ${token}`);
      setSuccess(true);
      setTimeout(() => navigate("/blog"), 800);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 px-4 items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500 underline"
            >
              Sign in
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name <span className="text-gray-700 font-normal">(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              value={inputs.name}
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  name: e.target.value,
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={inputs.email}
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  email: e.target.value,
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    password: e.target.value,
                  });
                }}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                placeholder="Enter your password"
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword((s) => !s);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 border border-green-200">
              Account created! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-2 py-2 text-sm text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Creating account…
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
