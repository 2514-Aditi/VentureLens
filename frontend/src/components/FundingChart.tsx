import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FundingRound } from '../types';

interface FundingChartProps {
  roundsPronto: FundingRound[];
  roundsSnabbit: FundingRound[];
}

export const FundingChart: React.FC<FundingChartProps> = ({ roundsPronto, roundsSnabbit }) => {
  // Combine rounds into timeline sequence
  const prontoTotal = roundsPronto.reduce((acc, r) => acc + r.amount_usd, 0) / 1000000;
  const snabbitTotal = roundsSnabbit.reduce((acc, r) => acc + r.amount_usd, 0) / 1000000;

  const summaryData = [
    { name: 'Pronto', total_funding: prontoTotal, valuation: 200 },
    { name: 'Snabbit', total_funding: snabbitTotal, valuation: 375 }
  ];

  const roundComparisonData = [
    { round: 'Seed', Pronto: 2.0, Snabbit: 1.0 },
    { round: 'Series A', Pronto: 11.0, Snabbit: 5.5 },
    { round: 'Series B', Pronto: 25.0, Snabbit: 19.0 },
    { round: 'Series C', Pronto: 0, Snabbit: 31.7 },
    { round: 'Series D / Ext', Pronto: 20.0, Snabbit: 56.0 }
  ];

  return (
    <div className="space-y-8">
      {/* Chart 1: Total Capital Raised vs Valuation ($ Millions) */}
      <div className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
              Capital Raised & Valuation ($ Millions USD)
            </h3>
            <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
              Verified cumulative venture capital and reported valuation as of May 2026.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#E98B50] inline-block" /> Total Funding
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-[#BC4F4F] inline-block" /> Valuation
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DC" className="dark:stroke-[#333333]" />
              <XAxis dataKey="name" stroke="#666666" tick={{ fill: '#666666', fontSize: 12 }} />
              <YAxis stroke="#666666" tick={{ fill: '#666666', fontSize: 12 }} unit="M" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#202020',
                  borderColor: '#333333',
                  color: '#F7F7F5',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [`$${value}M`, '']}
              />
              <Bar dataKey="total_funding" name="Total Funding ($M)" fill="#E98B50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valuation" name="Latest Valuation ($M)" fill="#BC4F4F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Funding Amount By Round Comparison */}
      <div className="bg-[#FFFFFF] dark:bg-[#202020] border border-[#E5E2DC] dark:border-[#333333] rounded-lg p-5">
        <div className="mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#222222] dark:text-[#F7F7F5]">
            Funding Raised per Venture Stage ($ Millions)
          </h3>
          <p className="text-xs text-[#666666] dark:text-[#B7B7B7]">
            Side-by-side progression across Seed, Series A, B, C, and D rounds.
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roundComparisonData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DC" className="dark:stroke-[#333333]" />
              <XAxis dataKey="round" stroke="#666666" tick={{ fill: '#666666', fontSize: 12 }} />
              <YAxis stroke="#666666" tick={{ fill: '#666666', fontSize: 12 }} unit="M" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#202020',
                  borderColor: '#333333',
                  color: '#F7F7F5',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [`$${value}M`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Pronto" fill="#E98B50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Snabbit" fill="#BC4F4F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
