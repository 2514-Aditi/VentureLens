import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { PRONTO_DATA, SNABBIT_DATA, COMPARISON_DATA } from './src/data/companyData.ts';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Proxy all /api/v1 requests to the Django backend on Port 8000
  app.use('/api/v1', async (req, res, next) => {
    const djangoUrl = `http://127.0.0.1:8000/api/v1${req.path}`;
    try {
      const response = await axios({
        method: req.method,
        url: djangoUrl,
        params: req.query,
        data: req.body,
        headers: {
          ...req.headers,
          host: '127.0.0.1:8000'
        },
        validateStatus: () => true
      });
      res.status(response.status).json(response.data);
    } catch (err) {
      console.warn(`[Proxy Warning] Django backend connection failed at ${djangoUrl}. Falling back to Express mock layer.`);
      next();
    }
  });

  const companiesList = [PRONTO_DATA, SNABBIT_DATA];

  // Helper to find company by slug
  const findCompany = (slug: string) => {
    const cleanSlug = slug.toLowerCase().trim();
    return companiesList.find((c) => c.slug === cleanSlug);
  };

  // API Route: Healthcheck
  app.get('/api/v1/health', (_req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // API Route: GET /api/v1/companies/
  app.get('/api/v1/companies', (_req: Request, res: Response) => {
    try {
      const summaryList = companiesList.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        website: c.website,
        logo_url: c.logo_url,
        founder: c.founder,
        founded_year: c.founded_year,
        headquarters: c.headquarters,
        industry: c.industry,
        total_funding: c.financials.total_funding_formatted,
        valuation: c.financials.valuation_formatted,
        latest_round: c.financials.latest_round,
        last_researched_date: c.last_researched_date
      }));
      res.json({ count: summaryList.length, results: summaryList });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error processing companies list.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/
  app.get('/api/v1/companies/:slug', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json(company);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company details.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/financials/
  app.get('/api/v1/companies/:slug/financials', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json({
        company: company.name,
        slug: company.slug,
        financials: company.financials
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company financials.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/funding/
  app.get('/api/v1/companies/:slug/funding', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json({
        company: company.name,
        slug: company.slug,
        total_funding: company.financials.total_funding_formatted,
        funding_rounds: company.funding_rounds
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company funding rounds.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/investors/
  app.get('/api/v1/companies/:slug/investors', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json({
        company: company.name,
        slug: company.slug,
        investors: company.investors
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company investors.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/news/
  app.get('/api/v1/companies/:slug/news', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json({
        company: company.name,
        slug: company.slug,
        news_count: company.news.length,
        news: company.news
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company news.' });
    }
  });

  // API Route: GET /api/v1/companies/{slug}/sources/
  app.get('/api/v1/companies/:slug/sources', (req: Request, res: Response) => {
    try {
      const company = findCompany(req.params.slug);
      if (!company) {
        return res.status(404).json({ error: `Company with slug '${req.params.slug}' not found.` });
      }
      res.json({
        company: company.name,
        slug: company.slug,
        sources_count: company.sources.length,
        sources: company.sources
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error fetching company sources.' });
    }
  });

  // API Route: GET /api/v1/compare/?company1=pronto&company2=snabbit
  app.get('/api/v1/compare', (req: Request, res: Response) => {
    try {
      const c1Slug = (req.query.company1 as string) || 'pronto';
      const c2Slug = (req.query.company2 as string) || 'snabbit';

      const c1 = findCompany(c1Slug);
      const c2 = findCompany(c2Slug);

      if (!c1 || !c2) {
        return res.status(400).json({
          error: 'Invalid comparison parameters. Both specified companies must exist in database.'
        });
      }

      res.json({
        company1: c1,
        company2: c2,
        key_differences: COMPARISON_DATA.key_differences,
        summary_insight: COMPARISON_DATA.summary_insight
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error generating comparison report.' });
    }
  });

  // API Route: GET /api/v1/search/?q=
  app.get('/api/v1/search', (req: Request, res: Response) => {
    try {
      const query = ((req.query.q as string) || '').toLowerCase().trim();
      if (!query) {
        return res.json({ query: '', results: companiesList });
      }

      const results = companiesList.filter((c) => {
        const inName = c.name.toLowerCase().includes(query);
        const inFounder = c.founder.toLowerCase().includes(query);
        const inIndustry = c.industry.toLowerCase().includes(query);
        const inModel = c.business_model.toLowerCase().includes(query);
        const inInvestors = c.investors.some((inv) => inv.name.toLowerCase().includes(query));
        const inServices = c.services.some((s) => s.toLowerCase().includes(query));
        return inName || inFounder || inIndustry || inModel || inInvestors || inServices;
      });

      res.json({ query, results_count: results.length, results });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error performing research search.' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Company Intelligence server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
