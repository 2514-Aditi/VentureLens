import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Newspaper, Search, Filter, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Company, NewsItem } from '../types';
import { companyApi } from '../services/api';
import { SourceBadge } from '../components/SourceBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';

interface ExtendedNewsItem extends NewsItem {
  companyName: string;
  companySlug: string;
  companyLogo: string;
}

export const NewsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const companyFilterParam = searchParams.get('company') || 'all';

  const [allNews, setAllNews] = useState<ExtendedNewsItem[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function loadNewsData() {
      setLoading(true);
      try {
        const comps = await companyApi.getCompanies();
        setCompanies(comps);

        const items: ExtendedNewsItem[] = [];
        comps.forEach((c) => {
          if (c.news) {
            c.news.forEach((n) => {
              items.push({
                ...n,
                companyName: c.name,
                companySlug: c.slug,
                companyLogo: c.logo_url
              });
            });
          }
        });

        // Sort news descending by published date or index
        setAllNews(items);
      } catch (err) {
        console.error('Failed to load news:', err);
      } finally {
        setLoading(false);
      }
    }
    loadNewsData();
  }, []);

  const categories = Array.from(new Set(allNews.map((n) => n.category)));

  const filteredNews = allNews.filter((item) => {
    // Company filter
    if (companyFilterParam !== 'all' && item.companySlug !== companyFilterParam) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.companyName.toLowerCase().includes(q) ||
        item.source_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCompanyFilterChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('company');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ company: slug });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Header */}
      <section className="bg-[#FFFFFF] dark:bg-[#202020] border-b border-[#E5E2DC] dark:border-[#333333] pt-8 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] dark:text-[#F7F7F5] uppercase font-roboto">
            LATEST <span className="text-[#E98B50]">VERIFIED NEWS</span>
          </h1>
          <p className="text-xs text-[#666666] dark:text-[#B7B7B7] max-w-2xl leading-relaxed">
            Chronological, primary-sourced coverage of capital raises, leadership moves, expansion milestones, and regulatory disclosures from TechCrunch, Economic Times and Fortune India.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E2DC] dark:border-[#333333]">
            {/* Search Box */}
            <div className="relative min-w-[240px] flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search news headline, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-md bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] placeholder-[#666666] dark:placeholder-[#B7B7B7] focus:outline-none focus:border-[#E98B50]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#666666] dark:text-[#B7B7B7]" />
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Company Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#666666] dark:text-[#B7B7B7]">Company:</span>
                <select
                  value={companyFilterParam}
                  onChange={(e) => handleCompanyFilterChange(e.target.value)}
                  className="bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] text-xs font-semibold text-[#222222] dark:text-[#F7F7F5] rounded px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="all">All Companies</option>
                  {companies.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#666666] dark:text-[#B7B7B7]">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] text-xs font-semibold text-[#222222] dark:text-[#F7F7F5] rounded px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between text-xs text-[#666666] dark:text-[#B7B7B7]">
          <span>
            Showing <strong className="text-[#222222] dark:text-[#F7F7F5]">{filteredNews.length}</strong> verified news articles
          </span>
          {(companyFilterParam !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                handleCompanyFilterChange('all');
              }}
              className="text-[#E98B50] font-medium hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : filteredNews.length === 0 ? (
          <div className="p-10 text-center bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg">
            <p className="text-sm text-[#666666] dark:text-[#B7B7B7]">
              No verified news articles found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((news, index) => (
              <div
                key={news.id || `${news.companySlug}-${index}`}
                className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-4 hover:border-[#E98B50] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar: Company Badge + Date */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/companies/${news.companySlug}`}
                      className="inline-flex items-center gap-2 group"
                    >
                      <div className="w-6 h-6 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] p-0.5">
                        <img src={news.companyLogo} alt={news.companyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-xs font-bold text-[#222222] dark:text-[#F7F7F5] group-hover:text-[#E98B50] transition-colors">
                        {news.companyName}
                      </span>
                    </Link>

                    <span className="text-xs text-[#666666] dark:text-[#B7B7B7] font-medium">
                      {news.published_date}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-base font-bold text-[#222222] dark:text-[#F7F7F5] leading-snug">
                    {news.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                {/* Footer: Category + Source Link */}
                <div className="pt-4 border-t border-[#E5E2DC] dark:border-[#333333] flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 rounded bg-[#FEF2A0] dark:bg-[#E98B50]/20 text-[#222222] dark:text-[#FEF2A0] font-bold uppercase tracking-wider">
                    {news.category}
                  </span>

                  <SourceBadge
                    sourceName={news.source_name}
                    sourceUrl={news.source_url}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
