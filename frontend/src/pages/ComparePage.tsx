import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { GitCompare, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Company, ComparisonData } from '../types';
import { companyApi } from '../services/api';
import { FundingChart } from '../components/FundingChart';
import { SourceBadge } from '../components/SourceBadge';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const c1Slug = searchParams.get('company1') || 'pronto';
  const c2Slug = searchParams.get('company2') || 'snabbit';

  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [allComps, compData] = await Promise.all([
          companyApi.getCompanies(),
          companyApi.getComparison(c1Slug, c2Slug)
        ]);
        setCompanyList(allComps);
        setComparison(compData);
      } catch (err) {
        console.error('Failed to load comparison data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [c1Slug, c2Slug]);

  const handleCompany1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ company1: e.target.value, company2: c2Slug });
  };

  const handleCompany2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ company1: c1Slug, company2: e.target.value });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SkeletonLoader />
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-sm text-[#666666]">Unable to load comparison report.</p>
      </div>
    );
  }

  const { company1, company2, key_differences, summary_insight } = comparison;

  return (
    <div className="space-y-10 pb-16">
      {/* Header & Company Selectors */}
      <section className="bg-[#FFFFFF] dark:bg-[#202020] border-b border-[#E5E2DC] dark:border-[#333333] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FEF2A0] dark:bg-[#E98B50]/20 text-[#222222] dark:text-[#FEF2A0] text-xs font-semibold tracking-wider uppercase border border-[#E5E2DC] dark:border-[#E98B50]/30 mb-2">
                <GitCompare className="w-3.5 h-3.5 text-[#E98B50]" /> Side-by-Side Research Comparison
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#222222] dark:text-[#F7F7F5] font-roboto">
                COMPANY <span className="text-[#E98B50]">COMPARISON</span>
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#B7B7B7] mt-1">
                Comparing operational models, capital rounds, growth trajectories, and market positioning.
              </p>
            </div>

            {/* Selectors */}
            <div className="flex items-center gap-3 bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#666666]">Co A:</span>
                <select
                  value={company1.slug}
                  onChange={handleCompany1Change}
                  className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-xs font-bold text-[#222222] dark:text-[#F7F7F5] rounded px-2 py-1 focus:outline-none"
                >
                  {companyList.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs text-[#E98B50] font-bold">VS</span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#666666]">Co B:</span>
                <select
                  value={company2.slug}
                  onChange={handleCompany2Change}
                  className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] text-xs font-bold text-[#222222] dark:text-[#F7F7F5] rounded px-2 py-1 focus:outline-none"
                >
                  {companyList.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Header Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-lg bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] p-0.5 flex items-center justify-center overflow-hidden">
                  <img src={company1.logo_url} alt={company1.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#222222] dark:text-[#F7F7F5]">{company1.name}</h3>
                  <span className="text-xs text-[#666666]">{company1.industry}</span>
                </div>
              </div>
              <Link
                to={`/companies/${company1.slug}`}
                className="text-xs text-[#E98B50] font-medium hover:underline inline-flex items-center gap-1"
              >
                Full Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-lg bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] p-0.5 flex items-center justify-center overflow-hidden">
                  <img src={company2.logo_url} alt={company2.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#222222] dark:text-[#F7F7F5]">{company2.name}</h3>
                  <span className="text-xs text-[#666666]">{company2.industry}</span>
                </div>
              </div>
              <Link
                to={`/companies/${company2.slug}`}
                className="text-xs text-[#E98B50] font-medium hover:underline inline-flex items-center gap-1"
              >
                Full Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* EXECUTIVE SYNTHESIS */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E98B50]" /> EXECUTIVE SYNTHESIS
          </h2>
          <p className="text-xs text-[#222222] dark:text-[#F7F7F5] leading-relaxed">
            {summary_insight}
          </p>
        </section>

        {/* COMPARATIVE METRICS MATRIX */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
              STRUCTURED COMPARISON MATRIX
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E5E2DC] dark:border-[#333333] bg-[#FCFBF7] dark:bg-[#161616] text-[#222222] dark:text-[#F7F7F5]">
                  <th className="py-3 px-4 font-bold uppercase w-1/4">Metric / Dimension</th>
                  <th className="py-3 px-4 font-bold uppercase w-3/8 text-[#E98B50]">{company1.name}</th>
                  <th className="py-3 px-4 font-bold uppercase w-3/8 text-[#BC4F4F]">{company2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DC] dark:divide-[#333333]">
                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Founder(s)</td>
                  <td className="py-3 px-4">{company1.founder}</td>
                  <td className="py-3 px-4">{company2.founder}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Founded Year</td>
                  <td className="py-3 px-4">{company1.founded_year}</td>
                  <td className="py-3 px-4">{company2.founded_year}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Headquarters</td>
                  <td className="py-3 px-4">{company1.headquarters}</td>
                  <td className="py-3 px-4">{company2.headquarters}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616] bg-[#FEF2A0]/20 dark:bg-[#E98B50]/10">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Total Capital Raised</td>
                  <td className="py-3 px-4 font-bold text-[#E98B50]">{company1.financials.total_funding_formatted}</td>
                  <td className="py-3 px-4 font-bold text-[#BC4F4F]">{company2.financials.total_funding_formatted}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616] bg-[#FEF2A0]/20 dark:bg-[#E98B50]/10">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Reported Valuation</td>
                  <td className="py-3 px-4 font-bold text-[#E98B50]">{company1.financials.valuation_formatted}</td>
                  <td className="py-3 px-4 font-bold text-[#BC4F4F]">{company2.financials.valuation_formatted}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Latest Funding Round</td>
                  <td className="py-3 px-4">{company1.financials.latest_round} ({company1.financials.latest_round_date})</td>
                  <td className="py-3 px-4">{company2.financials.latest_round} ({company2.financials.latest_round_date})</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Revenue Disclosure</td>
                  <td className="py-3 px-4 text-[#BC4F4F]">{company1.financials.revenue_formatted}</td>
                  <td className="py-3 px-4 text-[#BC4F4F]">{company2.financials.revenue_formatted}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Workforce & Pros</td>
                  <td className="py-3 px-4">{company1.financials.active_professionals_formatted || company1.financials.employee_count_formatted}</td>
                  <td className="py-3 px-4">{company2.financials.active_professionals_formatted || company2.financials.employee_count_formatted}</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Geographic Cities</td>
                  <td className="py-3 px-4">{company1.cities.length} Metros ({company1.cities.slice(0, 4).join(', ')})</td>
                  <td className="py-3 px-4">{company2.cities.length} Metros ({company2.cities.slice(0, 4).join(', ')})</td>
                </tr>

                <tr className="hover:bg-[#FCFBF7] dark:hover:bg-[#161616]">
                  <td className="py-3 px-4 font-bold text-[#222222] dark:text-[#F7F7F5]">Core Business Model</td>
                  <td className="py-3 px-4 leading-relaxed">{company1.business_model}</td>
                  <td className="py-3 px-4 leading-relaxed">{company2.business_model}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* RECHARTS COMPARATIVE CHARTS */}
        <section className="space-y-4">
          <FundingChart
            roundsPronto={company1.funding_rounds}
            roundsSnabbit={company2.funding_rounds}
          />
        </section>

        {/* KEY STRATEGIC DIFFERENCES */}
        <section className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-6 space-y-6">
          <div className="border-b border-[#E5E2DC] dark:border-[#333333] pb-3">
            <h2 className="text-base font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
              KEY STRATEGIC DIFFERENCES
            </h2>
          </div>

          <div className="space-y-4">
            {key_differences.map((diff, index) => (
              <div
                key={index}
                className="p-4 rounded bg-[#FCFBF7] dark:bg-[#161616] border border-[#E5E2DC] dark:border-[#333333] space-y-2 text-xs"
              >
                <span className="font-bold uppercase text-[#E98B50] tracking-wider block">
                  {diff.category}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333]">
                    <span className="font-bold text-[#222222] dark:text-[#F7F7F5] block mb-1">
                      {company1.name}:
                    </span>
                    <span className="text-[#666666] dark:text-[#B7B7B7]">{diff.pronto_take}</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333]">
                    <span className="font-bold text-[#222222] dark:text-[#F7F7F5] block mb-1">
                      {company2.name}:
                    </span>
                    <span className="text-[#666666] dark:text-[#B7B7B7]">{diff.snabbit_take}</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#222222] dark:text-[#F7F7F5] pt-1">
                  <span className="font-bold text-[#E98B50]">Analysis:</span> {diff.analysis}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
