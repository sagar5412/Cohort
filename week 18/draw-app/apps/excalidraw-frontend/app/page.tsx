
import Link from "next/link";
import { ArrowRight, Pencil, Share2, Layers, Moon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
        <Link className="flex items-center justify-center gap-2 font-bold text-xl" href="#">
          <Pencil className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Excalidraw Clone</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#">
            GitHub
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 flex flex-col items-center text-center px-4 md:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-fade-in-up">
              Virtual Whiteboard for Engineering Teams
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-indigo-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700 disabled:pointer-events-none disabled:opacity-50"
                href="/signup"
              >
                Start Drawing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
                href="https://github.com/sagar5412/Cohort/tree/master/week%2018/draw-app/apps/excalidraw-frontend"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-white dark:bg-black">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything you need to sketch
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Powerful features to help you visualize your ideas quickly and effectively.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm mb-4">
                  <Pencil className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Infinite Canvas</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Draw without limits. Our infinite canvas ensures you never run out of space for your ideas.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm mb-4">
                  <Share2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Work together with your team in real-time. See changes as they happen.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:shadow-lg transition-shadow">
                <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm mb-4">
                  <Layers className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Export Options</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Export your diagrams to PNG, SVG, or clipboard to share them anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-indigo-600 dark:bg-indigo-900 text-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to start sketching?
              </h2>
              <p className="mx-auto max-w-[600px] text-indigo-100 md:text-xl">
                Join thousands of developers and designers who use Excalidraw to visualize their ideas.
              </p>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-white text-indigo-600 px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
                href="/canvas"
              >
                Try it now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Excalidraw Clone. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

