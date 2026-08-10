import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Newspaper, TrendingUp, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { Company } from '../types';
import { companyApi } from '../services/api';
import { SourceBadge } from '../components/SourceBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState(queryParam);

  useEffect(() => {
    setSearchFilter(queryParam);
  }, [queryParam]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (searchFilter.trim()) {
          const results = await companyApi.search(searchFilter);
          setCompanies(results);
        } else {
          const data = await companyApi.getCompanies();
          setCompanies(data);
        }
      } catch (err) {
        console.error('Failed to load companies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [searchFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFilter.trim()) {
      setSearchParams({ q: searchFilter.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearFilter = () => {
    setSearchFilter('');
    setSearchParams({});
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Editorial Compact Hero */}
      <section className="bg-[#FFFFFF] dark:bg-[#202020] border-b border-[#E5E2DC] dark:border-[#333333] pt-10 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#222222] dark:text-[#F7F7F5] uppercase font-roboto">
              VENTURE<span className="text-[#E98B50]">LENS</span>
            </h1>

            <p className="text-base text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
              Research, understand and compare companies through reliable information.
            </p>

            {/* Compact Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 flex items-center gap-2 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search companies, founders, industries or investors..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] placeholder-[#666666] dark:placeholder-[#B7B7B7] focus:outline-none focus:border-[#E98B50] dark:focus:border-[#E98B50]"
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#666666]" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-md bg-[#E98B50] hover:bg-[#BC4F4F] text-[#FFFFFF] font-medium text-sm transition-colors shadow-sm"
              >
                Search
              </button>
              {queryParam && (
                <button
                  type="button"
                  onClick={clearFilter}
                  className="px-3 py-2.5 rounded-md bg-[#F5F3ED] dark:bg-[#262626] text-[#666666] dark:text-[#B7B7B7] text-xs hover:text-[#222222]"
                >
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Search Results / Featured Companies Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#E98B50]" />
                {queryParam ? `Search Results for "${queryParam}"` : 'FEATURED COMPANIES'}
              </h2>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
                {companies.length} verified company reports available.
              </p>
            </div>

            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E98B50] hover:text-[#BC4F4F] transition-colors"
            >
              Compare Side-by-Side <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : companies.length === 0 ? (
            <div className="p-8 text-center bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg">
              <p className="text-sm text-[#666666] dark:text-[#B7B7B7]">
                No verified companies found matching "{searchFilter}".
              </p>
              <button
                onClick={clearFilter}
                className="mt-3 text-xs text-[#E98B50] underline font-medium"
              >
                View All Companies
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 hover:border-[#E98B50] transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header: Official Logo + Meta */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] p-1 flex items-center justify-center overflow-hidden">
                          <img
                            src={company.logo_url}
                            alt={`${company.name} official logo`}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#222222] dark:text-[#F7F7F5]">
                            {company.name}
                          </h3>
                          <span className="text-xs text-[#666666] dark:text-[#B7B7B7] block">
                            {company.industry}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#F5F3ED] dark:bg-[#262626] text-[#666666] dark:text-[#B7B7B7] font-medium border border-[#E5E2DC] dark:border-[#333333]">
                        Founded {company.founded_year}
                      </span>
                    </div>

                    <p className="text-xs text-[#222222] dark:text-[#F7F7F5] leading-relaxed line-clamp-3">
                      {company.description}
                    </p>

                    {/* Key Metric Snapshot Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] rounded p-2.5">
                        <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] font-medium uppercase block">
                          Total Funding
                        </span>
                        <span className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                          {company.financials.total_funding_formatted}
                        </span>
                        <SourceBadge
                          sourceName={company.financials.source_name}
                          sourceUrl={company.financials.source_url}
                          publishedDate={company.financials.as_of_date}
                          className="mt-1"
                        />
                      </div>

                      <div className="bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] rounded p-2.5">
                        <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] font-medium uppercase block">
                          Latest Valuation
                        </span>
                        <span className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                          {company.financials.valuation_formatted}
                        </span>
                        <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] block mt-1">
                          {company.financials.latest_round} ({company.financials.latest_round_date})
                        </span>
                      </div>
                    </div>

                    {/* Founders & Cities */}
                    <div className="text-xs space-y-1 text-[#666666] dark:text-[#B7B7B7] pt-1">
                      <div>
                        <span className="font-semibold text-[#222222] dark:text-[#F7F7F5]">Founder:</span>{' '}
                        {company.founder}
                      </div>
                      <div>
                        <span className="font-semibold text-[#222222] dark:text-[#F7F7F5]">Headquarters:</span>{' '}
                        {company.headquarters}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E2DC] dark:border-[#333333] flex items-center justify-between">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#666666] dark:text-[#B7B7B7] hover:text-[#222222]"
                    >
                      {company.website.replace('https://', '')}
                      <ExternalLink className="w-3 h-3 text-[#E98B50]" />
                    </a>

                    <Link
                      to={`/companies/${company.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E98B50] hover:bg-[#BC4F4F] text-[#FFFFFF] text-xs font-medium transition-colors"
                    >
                      View Report <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* KEY INTELLIGENCE / COMPARATIVE OBSERVATIONS */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E98B50]" />
              KEY INTELLIGENCE & MARKET OBSERVATIONS
            </h2>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
              Synthesized data-backed findings from verified disclosures of Pronto and Snabbit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FEF2A0] text-[#222222]">
                Shift-Based vs Hyperlocal
              </span>
              <h4 className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                Divergent Operational Models
              </h4>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
                Pronto leverages shift-based employment for 4,500+ female domestic pros targeting daily chores. Snabbit operates an on-demand technician aggregation network targeting episodic repairs & beauty.
              </p>
            </div>

            <div className="p-4 rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3CD97] text-[#222222]">
                Venture Capital Intensity
              </span>
              <h4 className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                Rapid Capital Inflow ($171.2M Total)
              </h4>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
                Both companies have attracted tier-1 venture syndicates within 24 months of inception. Snabbit raised $113.2M across 5 rounds, while Pronto raised $58M across 4 rounds.
              </p>
            </div>

            <div className="p-4 rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E5E2DC] dark:bg-[#333333] text-[#222222] dark:text-[#F7F7F5]">
                Transparency Policy
              </span>
              <h4 className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                Missing Data Standard
              </h4>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
                Neither company discloses audited net revenue or unit margins in public disclosures. These metrics are strictly flagged <span className="font-semibold text-[#222222] dark:text-[#F7F7F5]">"Not Publicly Available"</span>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
