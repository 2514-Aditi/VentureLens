export interface SourceItem {
  id?: string;
  field_name: string;
  source_name: string;
  source_url: string;
  published_date?: string;
  accessed_date: string;
}

export interface Investor {
  id?: string;
  name: string;
  type?: 'Venture Capital' | 'Growth Equity' | 'Strategic' | 'Angel' | 'Private Equity';
  investment_round: string;
  amount?: string | null;
  date: string;
  source_name: string;
  source_url: string;
}

export interface FundingRound {
  id?: string;
  round_type: string;
  amount_usd: number; // in USD
  amount_formatted: string;
  currency: string;
  date: string;
  valuation_usd?: number | null;
  valuation_formatted?: string | null;
  investors: string[];
  source_name: string;
  source_url: string;
}

export interface FinancialData {
  total_funding_usd: number;
  total_funding_formatted: string;
  latest_round: string;
  latest_round_date: string;
  valuation_usd: number | null;
  valuation_formatted: string;
  revenue_formatted: string; // e.g. "Not Publicly Available"
  employee_count_formatted: string;
  active_professionals_formatted?: string;
  daily_bookings_formatted?: string;
  currency: string;
  as_of_date: string;
  source_name: string;
  source_url: string;
}

export interface NewsItem {
  id?: string;
  title: string;
  summary: string;
  source_name: string;
  source_url: string;
  published_date: string;
  category: 'Funding' | 'Expansion' | 'Operations' | 'Business Model' | 'Market';
}

export interface GrowthMetric {
  id?: string;
  metric_name: string;
  metric_value: string;
  period: string;
  source_name: string;
  source_url: string;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  category: 'Funding Momentum' | 'Market Strategy' | 'Valuation & Scale' | 'Operational Model' | 'Data Limitation';
  severity: 'positive' | 'neutral' | 'caution';
  data_points: string[];
}

export interface Company {
  id: string;
  name: string;
  official_name: string;
  slug: 'pronto' | 'snabbit';
  description: string;
  website: string;
  logo_url: string;
  founder: string;
  founded_year: number;
  headquarters: string;
  industry: string;
  business_model: string;
  target_customers: string;
  services: string[];
  cities: string[];
  expansion_summary: string;
  financials: FinancialData;
  funding_rounds: FundingRound[];
  investors: Investor[];
  news: NewsItem[];
  sources: SourceItem[];
  growth_metrics: GrowthMetric[];
  insights: InsightItem[];
  last_researched_date: string;
}

export interface ComparisonData {
  company1: Company;
  company2: Company;
  key_differences: {
    category: string;
    pronto_take: string;
    snabbit_take: string;
    analysis: string;
  }[];
  summary_insight: string;
}
