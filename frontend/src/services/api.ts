import axios from 'axios';
import { Company, ComparisonData } from '../types';
import { PRONTO_DATA, SNABBIT_DATA, COMPARISON_DATA } from '../data/companyData';

const apiClient = axios.create({
  baseURL: 
    import.meta.env.VITE_API_URL ||
    'https://venturelens-production-8471.up.railway.app/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

const fixLogoUrl = (company: Company): Company => {
  if (company.slug?.toLowerCase() === 'pronto') {
    return {
      ...company,
      logo_url: '/logos/pronto.svg'
    };
  }

  if (company.slug?.toLowerCase() === 'snabbit') {
    return {
      ...company,
      logo_url: '/logos/snabbit.svg'
    };
  }

  return company;
};

export const companyApi = {
  getCompanies: async (): Promise<Company[]> => {
    try {
      const response = await apiClient.get('/companies');
      if (response.data && Array.isArray(response.data.results)) {
        // Fetch details for each slug
        const details = await Promise.all(
          response.data.results.map((c: { slug: string }) => companyApi.getCompanyBySlug(c.slug))
        );
        return details.map((company) => ({
          ...company,
          logo_url:
          company.slug === 'pronto'
            ? '/logos/pronto.svg'
            : company.slug === 'snabbit'
              ? '/logos/snabbit.svg'
              : company.logo_url,
        }));
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
      
      const company = response.data;
      
      if (company.slug === 'pronto') {
        company.logo_url = '/logos/pronto.svg';
      } else if (company.slug === 'snabbit') {
        company.logo_url = '/logos/snabbit.svg';
      }
      
      return company;
    } catch (err) {
      console.error(`API error fetching company ${slug}:`, err);
      throw new Error(`Failed to load company data from the backend.`);
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
      console.error(`API error fetching news for ${slug}:`, err);
      throw new Error(`Failed to load company news.`);
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

  getComparison: async (
  company1 = 'pronto',
  company2 = 'snabbit'
): Promise<ComparisonData> => {
  try {
    const response = await apiClient.get(
      `/compare?company1=${company1}&company2=${company2}`
    );

    const data = response.data;

    return {
      ...data,
      company1: fixLogoUrl(data.company1),
      company2: fixLogoUrl(data.company2)
    };
  } catch (err) {
    console.warn(
      'API error fetching comparison, falling back to verified dataset:',
      err
    );

    return {
      ...COMPARISON_DATA,
      company1: fixLogoUrl(COMPARISON_DATA.company1),
      company2: fixLogoUrl(COMPARISON_DATA.company2)
    };
  }
},

  search: async (query: string): Promise<Company[]> => {
  try {
    const response = await apiClient.get(
      `/search?q=${encodeURIComponent(query)}`
    );

    if (response.data && Array.isArray(response.data.results)) {
      const results = response.data.results;

      // Convert search results into complete company objects
      const details = await Promise.all(
        results.map((company: { slug: string }) =>
          companyApi.getCompanyBySlug(company.slug)
        )
      );

      return details;
    }

    return [];
  } catch (err) {
    console.error('API search error:', err);

    const q = query.toLowerCase().trim();

    if (!q) {
      return [PRONTO_DATA, SNABBIT_DATA];
    }

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
