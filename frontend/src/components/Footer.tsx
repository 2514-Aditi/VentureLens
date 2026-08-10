import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#E5E2DC] dark:border-[#333333] bg-[#FCFBF7] dark:bg-[#161616] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#161616] dark:bg-[#202020] border border-[#333333] flex items-center justify-center p-1">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M7 9H25M7 16H25M7 23H17" stroke="#E98B50" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="21" cy="23" r="3" fill="#BC4F4F"/>
                </svg>
              </div>
              <span className="font-bold text-sm tracking-wider uppercase text-[#222222] dark:text-[#F7F7F5] font-roboto">
                VENTURE<span className="text-[#E98B50]">LENS</span>
              </span>
            </div>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7] max-w-md leading-relaxed">
              Company Intelligence is a professional research platform dedicated to verified, primary-sourced intelligence on high-growth companies.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
              Platform Research
            </h4>
            <ul className="space-y-2 text-xs text-[#666666] dark:text-[#B7B7B7]">
              <li>
                <Link to="/companies/pronto" className="hover:text-[#E98B50] transition-colors flex items-center gap-1">
                  Pronto Intelligence Report <ArrowUpRight className="w-3 h-3 text-[#E98B50]" />
                </Link>
              </li>
              <li>
                <Link to="/companies/snabbit" className="hover:text-[#E98B50] transition-colors flex items-center gap-1">
                  Snabbit Intelligence Report <ArrowUpRight className="w-3 h-3 text-[#E98B50]" />
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#E98B50] transition-colors flex items-center gap-1">
                  Pronto vs Snabbit Comparison <ArrowUpRight className="w-3 h-3 text-[#E98B50]" />
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-[#E98B50] transition-colors">
                  Research Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Data Integrity Statement */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
              Data Standards
            </h4>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
              We explicitly reject hallucinated figures, zero-fill estimates, and unverified blog claims. If a metric is unconfirmed, it is strictly marked <span className="font-semibold text-[#222222] dark:text-[#F7F7F5]">"Not Publicly Available"</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E2DC] dark:border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs text-[#666666] dark:text-[#B7B7B7]">
          <p>© {new Date().getFullYear()} VENTURELENS. All verified research attributed to primary publications.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link to="/methodology" className="hover:underline">Source Policy</Link>
            <Link to="/methodology" className="hover:underline">Verification Hierarchy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
