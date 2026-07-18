import Link from "next/link";
import { Route } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/30">
                <Route className="w-4 h-4 text-brand-cyan" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                Flow<span className="text-brand-cyan">Route</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              FlowRoute is an intelligent journey planning platform combining live maps, weather intelligence, route optimization, and AI reasoning to recommend the most suitable journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-sm text-slate-400 hover:text-brand-cyan transition-colors">
                  Journey Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Technologies */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Technologies
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Next.js 15 & TS</li>
              <li>Tailwind CSS v4</li>
              <li>Google Gemini API</li>
              <li>OSRM & Leaflet Maps</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FlowRoute. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/adwGlitch/codex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
