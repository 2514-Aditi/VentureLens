import React from 'react';
import { ShieldCheck, Database, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FCFBF7] dark:bg-[#161616] text-[#222222] dark:text-[#F7F7F5]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#222222] dark:text-[#F7F7F5] font-roboto">
          RESEARCH <span className="text-[#E98B50]">METHODOLOGY</span>
        </h1>

        <p className="mt-3 text-sm text-[#666666] dark:text-[#B7B7B7] max-w-2xl leading-relaxed">
          How VentureLens verifies company data, handles missing information,
          and keeps research traceable.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">

        {/* SECTION 1 */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E98B50]" />
              1. VERIFIED DATA
            </h2>
          </div>

          <p className="text-xs leading-relaxed text-[#222222] dark:text-[#F7F7F5]">
            Important company and financial information is cross-checked using
            official company sources and reputable publications.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#BC4F4F]" />
              2. MISSING DATA
            </h2>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#E98B50] shrink-0 mt-0.5" />
              <span>
                <strong>Not Publicly Available:</strong> Missing information
                is shown as unavailable rather than guessed.
              </span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#E98B50] shrink-0 mt-0.5" />
              <span>
                <strong>No Zero-Fill:</strong> Missing financial values are
                never converted to zero.
              </span>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#E98B50] shrink-0 mt-0.5" />
              <span>
                <strong>Estimates are labelled:</strong> Reported or estimated
                figures are clearly identified with their source.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-[#E98B50]" />
              3. SOURCE HIERARCHY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">

            <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
              <span className="font-bold text-[#E98B50] block mb-1">
                1. Official Sources
              </span>
              <p className="text-[#666666] dark:text-[#B7B7B7]">
                Company websites, announcements and official disclosures.
              </p>
            </div>

            <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
              <span className="font-bold text-[#E98B50] block mb-1">
                2. Executive Profiles
              </span>
              <p className="text-[#666666] dark:text-[#B7B7B7]">
                Verified founder and leadership information.
              </p>
            </div>

            <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
              <span className="font-bold text-[#E98B50] block mb-1">
                3. Tier-1 Journalism
              </span>
              <p className="text-[#666666] dark:text-[#B7B7B7]">
                TechCrunch, Reuters and other established publications.
              </p>
            </div>

            <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
              <span className="font-bold text-[#E98B50] block mb-1">
                4. Indian Business Media
              </span>
              <p className="text-[#666666] dark:text-[#B7B7B7]">
                Economic Times, Fortune India and specialist startup media.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 4 */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E98B50]" />
              4. SOURCE TRANSPARENCY
            </h2>
          </div>

          <p className="text-xs leading-relaxed">
            Key metrics include their source and direct article link, allowing
            users to verify the information themselves.
          </p>
        </section>

        {/* PRINCIPLES */}
        <div className="border-t border-[#E5E2DC] dark:border-[#333333] pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#666666] dark:text-[#B7B7B7]">
            VERIFIED · TRANSPARENT · TRACEABLE · HONEST
          </p>
        </div>

      </div>
    </div>
  );
};