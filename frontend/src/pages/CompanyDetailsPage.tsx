import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Newspaper,
  GitCompare,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { Company } from '../types';
import { companyApi } from '../services/api';
import { SourceBadge } from '../components/SourceBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const CompanyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCompany() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await companyApi.getCompanyBySlug(slug);
        setCompany(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load company research report.');
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <div className="p-8 bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg">
          <h2 className="text-xl font-bold text-[#222222] dark:text-[#F7F7F5]">
            Company Not Found
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#B7B7B7] mt-1">
            {error || 'The requested company research profile could not be loaded.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded bg-[#E98B50] text-[#FFFFFF] text-xs font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const otherSlug = company.slug === 'pronto' ? 'snabbit' : 'pronto';
  const otherName = company.slug === 'pronto' ? 'Snabbit' : 'Pronto';

  return (
    <div className="space-y-10 pb-16">
      {/* Top Breadcrumb & Profile Header */}
      <section className="bg-[#FFFFFF] dark:bg-[#202020] border-b border-[#E5E2DC] dark:border-[#333333] pt-6 pb-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#B7B7B7] hover:text-[#222222] dark:hover:text-[#F7F7F5]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Companies
            </Link>

            <Link
              to={`/compare?company1=${company.slug}&company2=${otherSlug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FEF2A0] dark:bg-[#E98B50] text-[#222222] text-xs font-bold transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" /> Compare with {otherName}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] p-1 flex items-center justify-center overflow-hidden">
                <img
                  src={company.logo_url}
                  alt={`${company.name} official logo`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222222] dark:text-[#F7F7F5]">
                    {company.name}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#F5F3ED] dark:bg-[#262626] border border-[#E5E2DC] dark:border-[#333333] text-[#666666] dark:text-[#B7B7B7]">
                    {company.official_name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#666666] dark:text-[#B7B7B7] mt-1">
                  <span className="font-medium text-[#222222] dark:text-[#F7F7F5]">{company.industry}</span>
                  <span>•</span>
                  <span>HQ: {company.headquarters}</span>
                  <span>•</span>
                  <span>Founded {company.founded_year}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end text-xs text-[#666666] dark:text-[#B7B7B7] space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F5F3ED] dark:bg-[#262626] border border-[#E5E2DC] dark:border-[#333333]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E98B50]" />
                <span>Last Researched: {company.last_researched_date}</span>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#E98B50] font-medium hover:underline"
              >
                {company.website} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm text-[#222222] dark:text-[#F7F7F5] leading-relaxed max-w-4xl pt-2">
            {company.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* OVERVIEW + FINANCIAL SNAPSHOT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview Card (2 cols) */}
          <div className="lg:col-span-2 bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
            <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#E98B50]" /> OVERVIEW & BUSINESS ARCHITECTURE
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
                <span className="text-[#666666] dark:text-[#B7B7B7] block mb-1">Founder(s)</span>
                <span className="font-bold text-sm text-[#222222] dark:text-[#F7F7F5]">{company.founder}</span>
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
                <span className="text-[#666666] dark:text-[#B7B7B7] block mb-1">Headquarters</span>
                <span className="font-bold text-sm text-[#222222] dark:text-[#F7F7F5]">{company.headquarters}</span>
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
                <span className="text-[#666666] dark:text-[#B7B7B7] block mb-1">Industry Classification</span>
                <span className="font-bold text-sm text-[#222222] dark:text-[#F7F7F5]">{company.industry}</span>
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333]">
                <span className="text-[#666666] dark:text-[#B7B7B7] block mb-1">Target Customers</span>
                <span className="font-bold text-sm text-[#222222] dark:text-[#F7F7F5]">{company.target_customers}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] block">
                Business Model Description
              </span>
              <p className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] leading-relaxed">
                {company.business_model}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] block">
                Offered Services / Products
              </span>
              <div className="flex flex-wrap gap-2">
                {company.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#F5F3ED] dark:bg-[#262626] border border-[#E5E2DC] dark:border-[#333333] text-[#222222] dark:text-[#F7F7F5] font-medium"
                  >
                    • {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Snapshot Sidebar (1 col) */}
          <div className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
            <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#E98B50]" /> FINANCIAL SNAPSHOT
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1">
                <span className="text-[#666666] dark:text-[#B7B7B7] block font-medium uppercase">Total Capital Raised</span>
                <span className="text-xl font-extrabold text-[#222222] dark:text-[#F7F7F5]">
                  {company.financials.total_funding_formatted}
                </span>
                <SourceBadge
                  sourceName={company.financials.source_name}
                  sourceUrl={company.financials.source_url}
                  publishedDate={company.financials.as_of_date}
                />
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1">
                <span className="text-[#666666] dark:text-[#B7B7B7] block font-medium uppercase">Reported Valuation</span>
                <span className="text-xl font-extrabold text-[#E98B50]">
                  {company.financials.valuation_formatted}
                </span>
                <span className="text-[11px] text-[#666666] dark:text-[#B7B7B7] block">
                  Round: {company.financials.latest_round} ({company.financials.latest_round_date})
                </span>
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1">
                <span className="text-[#666666] dark:text-[#B7B7B7] block font-medium uppercase">Revenue Information</span>
                <span className="text-sm font-bold text-[#BC4F4F]">
                  {company.financials.revenue_formatted}
                </span>
                <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] block">
                  Strict missing data policy enforced (no unverified estimates)
                </span>
              </div>

              <div className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1">
                <span className="text-[#666666] dark:text-[#B7B7B7] block font-medium uppercase">Workforce & Partners</span>
                <span className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                  {company.financials.employee_count_formatted}
                </span>
                {company.financials.active_professionals_formatted && (
                  <span className="text-xs text-[#E98B50] font-semibold block">
                    {company.financials.active_professionals_formatted}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CHRONOLOGICAL FUNDING TIMELINE */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E98B50]" /> CHRONOLOGICAL FUNDING TIMELINE
              </h3>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
                All verified investment rounds from Seed to latest growth extension.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DC] dark:border-[#333333] bg-[#FCFBF7] dark:bg-[#161616] text-[#222222] dark:text-[#F7F7F5]">
                  <th className="py-2.5 px-3 font-bold uppercase">Round</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Capital Raised</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Date</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Reported Valuation</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Key Investors</th>
                  <th className="py-2.5 px-3 font-bold uppercase">Verified Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DC] dark:divide-[#333333]">
                {company.funding_rounds.map((round) => (
                  <tr key={round.id} className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                    <td className="py-3 px-3 font-bold text-[#222222] dark:text-[#F7F7F5]">
                      {round.round_type}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#E98B50]">
                      {round.amount_formatted}
                    </td>
                    <td className="py-3 px-3 text-[#666666] dark:text-[#B7B7B7]">
                      {round.date}
                    </td>
                    <td className="py-3 px-3 text-[#222222] dark:text-[#F7F7F5]">
                      {round.valuation_formatted || 'Not Reported'}
                    </td>
                    <td className="py-3 px-3 text-[#222222] dark:text-[#F7F7F5] max-w-xs">
                      {round.investors.join(', ')}
                    </td>
                    <td className="py-3 px-3">
                      <SourceBadge
                        sourceName={round.source_name}
                        sourceUrl={round.source_url}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* INVESTORS BREAKDOWN */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#E98B50]" /> INVESTOR SYNDICATE
            </h3>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
              Participating venture capital firms, growth funds, and individual angel investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {company.investors.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#222222] dark:text-[#F7F7F5]">
                    {inv.name}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEF2A0] text-[#222222] font-semibold">
                    {inv.type || 'Investor'}
                  </span>
                </div>
                <div className="text-[11px] text-[#666666] dark:text-[#B7B7B7]">
                  <span>Round: {inv.investment_round}</span>
                </div>
                <SourceBadge sourceName={inv.source_name} sourceUrl={inv.source_url} publishedDate={inv.date} />
              </div>
            ))}
          </div>
        </section>

        {/* GROWTH, EXPANSION & CITIES */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E98B50]" /> GEOGRAPHIC FOOTPRINT & GROWTH METRICS
            </h3>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
              Verified market expansion and operational throughput figures.
            </p>
          </div>

          <p className="text-xs text-[#222222] dark:text-[#F7F7F5] leading-relaxed">
            {company.expansion_summary}
          </p>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] block">
              Active Operational Cities ({company.cities.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {company.cities.map((city, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#F5F3ED] dark:bg-[#262626] border border-[#E5E2DC] dark:border-[#333333] text-xs font-medium text-[#222222] dark:text-[#F7F7F5]"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {company.growth_metrics.map((gm) => (
              <div
                key={gm.id}
                className="p-3 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-1"
              >
                <span className="text-[10px] text-[#666666] dark:text-[#B7B7B7] uppercase font-medium block">
                  {gm.metric_name}
                </span>
                <span className="text-sm font-bold text-[#E98B50] block">
                  {gm.metric_value}
                </span>
                <SourceBadge sourceName={gm.source_name} sourceUrl={gm.source_url} publishedDate={gm.period} />
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED NEWS */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h3 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#E98B50]" /> LATEST DEVELOPMENTS & NEWS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {company.news.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-2"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#FEF2A0] text-[#222222] font-semibold uppercase">
                    {item.category}
                  </span>
                  <span className="text-[#666666] dark:text-[#B7B7B7]">{item.published_date}</span>
                </div>
                <h4 className="text-sm font-bold text-[#222222] dark:text-[#F7F7F5]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#B7B7B7] leading-relaxed">
                  {item.summary}
                </p>
                <SourceBadge sourceName={item.source_name} sourceUrl={item.source_url} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
