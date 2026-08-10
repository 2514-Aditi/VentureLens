import axios from 'axios';
import { Company, ComparisonData } from '../types';
import { PRONTO_DATA, SNABBIT_DATA, COMPARISON_DATA } from '../data/companyData';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const companyApi = {
  getCompanies: async (): Promise<Company[]> => {
    try {
      const response = await apiClient.get('/companies');
      if (response.data && Array.isArray(response.data.results)) {
        // Fetch details for each slug
        const details = await Promise.all(
          response.data.results.map((c: { slug: string }) => companyApi.getCompanyBySlug(c.slug))
        );
        return details;
      }
      return [PRONTO_DATA, SNABBIT_DATA];
    } catch (err) {
      console.warn('API error fetching companies, falling back to verified dataset:', err);
      return [PRONTO_DATA, SNABBIT_DATA];
    }
  },

  getCompanyBySlug: async (slug: string): Promise<Company> => {
    try {
      const response = await apiClient.get(`/companies/${slug}`);
      return response.data;
    } catch (err) {
      console.warn(`API error fetching company ${slug}, falling back to verified dataset:`, err);
      if (slug.toLowerCase() === 'pronto') return PRONTO_DATA;
      if (slug.toLowerCase() === 'snabbit') return SNABBIT_DATA;
      throw new Error(`Company with slug ${slug} not found.`);
    }
  },

  getFinancials: async (slug: string) => {
    try {
      const response = await apiClient.get(`/companies/${slug}/financials`);
      return response.data.financials;
    } catch (err) {
      const comp = slug.toLowerCase() === 'pronto' ? PRONTO_DATA : SNABBIT_DATA;
      return comp.financials;
    }
  },

  getFundingRounds: async (slug: string) => {
    try {
      const response = await apiClient.get(`/companies/${slug}/funding`);
      return response.data.funding_rounds;
    } catch (err) {
      const comp = slug.toLowerCase() === 'pronto' ? PRONTO_DATA : SNABBIT_DATA;
      return comp.funding_rounds;
    }
  },

  getInvestors: async (slug: string) => {
    try {
      const response = await apiClient.get(`/companies/${slug}/investors`);
      return response.data.investors;
    } catch (err) {
      const comp = slug.toLowerCase() === 'pronto' ? PRONTO_DATA : SNABBIT_DATA;
      return comp.investors;
    }
  },

  getNews: async (slug: string) => {
    try {
      const response = await apiClient.get(`/companies/${slug}/news`);
      return response.data.news;
    } catch (err) {
      const comp = slug.toLowerCase() === 'pronto' ? PRONTO_DATA : SNABBIT_DATA;
      return comp.news;
    }
  },

  getSources: async (slug: string) => {
    try {
      const response = await apiClient.get(`/companies/${slug}/sources`);
      return response.data.sources;
    } catch (err) {
      const comp = slug.toLowerCase() === 'pronto' ? PRONTO_DATA : SNABBIT_DATA;
      return comp.sources;
    }
  },

  getComparison: async (company1 = 'pronto', company2 = 'snabbit'): Promise<ComparisonData> => {
    try {
      const response = await apiClient.get(`/compare?company1=${company1}&company2=${company2}`);
      return response.data;
    } catch (err) {
      console.warn('API error fetching comparison, falling back to verified dataset:', err);
      return COMPARISON_DATA;
    }
  },

  search: async (query: string): Promise<Company[]> => {
    try {
      const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data.results || [];
    } catch (err) {
      console.warn('API search error, filtering local verified dataset:', err);
      const q = query.toLowerCase().trim();
      if (!q) return [PRONTO_DATA, SNABBIT_DATA];
      return [PRONTO_DATA, SNABBIT_DATA].filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.founder.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.business_model.toLowerCase().includes(q)
      );
    }
  }
};
