import { Company, ComparisonData } from '../types';

export const PRONTO_DATA: Company = {
  id: 'comp_pronto_01',
  name: 'Pronto',
  official_name: 'Pronto Services India Pvt. Ltd.',
  slug: 'pronto',
  description: 'Pronto is an Indian quick home services platform providing shift-based domestic assistance including cleaning, utensil washing, laundry, and basic meal preparation with rapid fulfillment.',
  website: 'https://www.prontoapp.in',
  logo_url: '/logos/pronto.svg',
  founder: 'Anjali Sardana',
  founded_year: 2024,
  headquarters: 'Gurugram, Haryana, India',
  industry: 'Hyperlocal On-Demand Home Services',
  business_model: 'Shift-based on-demand marketplace connecting urban households with background-verified female professionals ("Pros") for scheduled and rapid domestic chores.',
  target_customers: 'Urban nuclear households, dual-income working couples, and families in major Indian tier-1 metro hubs needing reliable domestic assistance.',
  services: [
    'Domestic Cleaning & Dusting',
    'Utensil Washing & Kitchen Cleanup',
    'Laundry & Clothes Folding',
    'Basic Meal Preparation & Chopping',
    'Express 10-Minute Daily Chores'
  ],
  cities: [
    'Gurugram',
    'Delhi NCR',
    'Bengaluru',
    'Mumbai',
    'Noida',
    'Ghaziabad',
    'Faridabad',
    'Hyderabad',
    'Pune',
    'Chennai'
  ],
  expansion_summary: 'Expanded from a single operational hub in Gurugram to 10 tier-1 Indian metros. Daily booking volume surged from ~1,000 orders in late 2024 to over 26,000 daily bookings by May 2026.',
  last_researched_date: '2026-05-18',
  financials: {
    total_funding_usd: 58000000,
    total_funding_formatted: '$58.0 Million',
    latest_round: 'Series B Extension',
    latest_round_date: 'May 2026',
    valuation_usd: 200000000,
    valuation_formatted: '$200.0 Million',
    revenue_formatted: 'Not Publicly Available',
    employee_count_formatted: '~150 Corporate Staff',
    active_professionals_formatted: '4,500+ Active Female Professionals (99% Women)',
    daily_bookings_formatted: '26,000 Daily Bookings',
    currency: 'USD',
    as_of_date: 'May 2026',
    source_name: 'Fortune India & TechFundingNews',
    source_url: 'https://www.fortuneindia.com'
  },
  funding_rounds: [
    {
      id: 'pronto_f1',
      round_type: 'Seed',
      amount_usd: 2000000,
      amount_formatted: '$2.0 Million',
      currency: 'USD',
      date: 'May 2024',
      valuation_usd: null,
      valuation_formatted: 'Not Publicly Reported',
      investors: ['Bain Capital Ventures'],
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com'
    },
    {
      id: 'pronto_f2',
      round_type: 'Series A',
      amount_usd: 11000000,
      amount_formatted: '$11.0 Million',
      currency: 'USD',
      date: 'August 2025',
      valuation_usd: 45000000,
      valuation_formatted: '$45.0 Million',
      investors: ['General Catalyst (Co-Lead)', 'Glade Brook Capital (Co-Lead)', 'Bain Capital Ventures'],
      source_name: 'TechCrunch & YourStory',
      source_url: 'https://yourstory.com'
    },
    {
      id: 'pronto_f3',
      round_type: 'Series B',
      amount_usd: 25000000,
      amount_formatted: '$25.0 Million',
      currency: 'USD',
      date: 'March 2026',
      valuation_usd: 100000000,
      valuation_formatted: '$100.0 Million',
      investors: ['Epiq Capital (Lead)', 'General Catalyst', 'Glade Brook Capital', 'Bain Capital Ventures'],
      source_name: 'Economic Times',
      source_url: 'https://economictimes.indiatimes.com'
    },
    {
      id: 'pronto_f4',
      round_type: 'Series B Extension',
      amount_usd: 20000000,
      amount_formatted: '$20.0 Million',
      currency: 'USD',
      date: 'May 2026',
      valuation_usd: 200000000,
      valuation_formatted: '$200.0 Million',
      investors: ['Lachy Groom'],
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com'
    }
  ],
  investors: [
    {
      id: 'inv_p1',
      name: 'Lachy Groom',
      type: 'Angel',
      investment_round: 'Series B Extension',
      amount: '$20.0M',
      date: 'May 2026',
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com'
    },
    {
      id: 'inv_p2',
      name: 'Epiq Capital',
      type: 'Venture Capital',
      investment_round: 'Series B (Lead)',
      amount: '$25.0M Round Lead',
      date: 'March 2026',
      source_name: 'Economic Times',
      source_url: 'https://economictimes.indiatimes.com'
    },
    {
      id: 'inv_p3',
      name: 'General Catalyst',
      type: 'Venture Capital',
      investment_round: 'Series A & Series B',
      amount: 'Co-Lead Series A ($11M)',
      date: 'August 2025',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'inv_p4',
      name: 'Glade Brook Capital',
      type: 'Venture Capital',
      investment_round: 'Series A & Series B',
      amount: 'Co-Lead Series A ($11M)',
      date: 'August 2025',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'inv_p5',
      name: 'Bain Capital Ventures',
      type: 'Venture Capital',
      investment_round: 'Seed, Series A, Series B',
      amount: '$2.0M Seed Lead',
      date: 'May 2024',
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com'
    }
  ],
  news: [
    {
      id: 'n_p1',
      title: 'Pronto Raises $20M Series B Extension Led by Lachy Groom, Doubling Valuation to $200M',
      summary: 'Hyperlocal home services startup Pronto secured $20 million in an extension to its Series B round from US investor Lachy Groom, pushing its total valuation to $200M within two years of founding.',
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com',
      published_date: 'May 2026',
      category: 'Funding'
    },
    {
      id: 'n_p2',
      title: 'Pronto Reaches 26,000 Daily Orders Across 10 Metros With Female Gig Worker Focus',
      summary: 'Pronto reported rapid growth in daily completed domestic help requests, reaching 26,000 daily bookings across 10 cities with over 4,500 active female gig service workers.',
      source_name: 'Economic Times',
      source_url: 'https://economictimes.indiatimes.com',
      published_date: 'April 2026',
      category: 'Operations'
    },
    {
      id: 'n_p3',
      title: 'Epiq Capital Leads $25M Series B Round in Quick Home Services App Pronto',
      summary: 'Pronto raised $25 million in Series B funding led by Epiq Capital with participation from Glade Brook Capital, General Catalyst, and Bain Capital Ventures at a $100M valuation.',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com',
      published_date: 'March 2026',
      category: 'Funding'
    },
    {
      id: 'n_p4',
      title: 'Organizing India\'s Informal Domestic Help Market: Inside Anjali Sardana\'s Shift-Based Model',
      summary: 'A detailed feature on how Pronto provides structured shifts and predictable income for female domestic workers while providing urban households with 10-minute domestic chore response.',
      source_name: 'Inc42',
      source_url: 'https://inc42.com',
      published_date: 'January 2026',
      category: 'Business Model'
    }
  ],
  growth_metrics: [
    {
      id: 'gm_p1',
      metric_name: 'Daily Completed Bookings',
      metric_value: '26,000 / day',
      period: 'May 2026',
      source_name: 'Economic Times',
      source_url: 'https://economictimes.indiatimes.com'
    },
    {
      id: 'gm_p2',
      metric_name: 'Active Female Service Professionals ("Pros")',
      metric_value: '4,500+ (99% Women)',
      period: 'April 2026',
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com'
    },
    {
      id: 'gm_p3',
      metric_name: 'Operational Cities',
      metric_value: '10 Metro Hubs',
      period: 'May 2026',
      source_name: 'Inc42',
      source_url: 'https://inc42.com'
    },
    {
      id: 'gm_p4',
      metric_name: 'Valuation Growth',
      metric_value: '$45M (Aug 25) ➔ $200M (May 26)',
      period: '2025-2026',
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com'
    }
  ],
  sources: [
    {
      field_name: 'Series B Extension Funding & Valuation',
      source_name: 'Fortune India',
      source_url: 'https://www.fortuneindia.com',
      published_date: 'May 2026',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Series B Funding & Lead Investor',
      source_name: 'Economic Times',
      source_url: 'https://economictimes.indiatimes.com',
      published_date: 'March 2026',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Series A Funding & Co-Leads',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com',
      published_date: 'August 2025',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Founder & Business Model Architecture',
      source_name: 'Inc42',
      source_url: 'https://inc42.com',
      published_date: 'January 2026',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Seed Funding Details',
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com',
      published_date: 'May 2024',
      accessed_date: '2026-08-09'
    }
  ],
  insights: [
    {
      id: 'ins_p1',
      title: 'Shift-Based Labor Architecture Drives 26x Booking Expansion',
      description: 'Pronto operates on structured shifts rather than gig-by-gig dispatch, providing predictable earning windows for 4,500+ female domestic pros and enabling 10-minute turnaround.',
      category: 'Operational Model',
      severity: 'positive',
      data_points: ['26,000 daily bookings', '99% female service force', '10 operational hubs']
    },
    {
      id: 'ins_p2',
      title: 'High Valuation Velocity Across 4 Capital Rounds',
      description: 'Pronto increased its reported valuation from $45M in August 2025 to $100M in March 2026, and $200M in May 2026, backed by Bain, General Catalyst, Epiq Capital, and Lachy Groom.',
      category: 'Funding Momentum',
      severity: 'positive',
      data_points: ['$58M total capital raised', '4.4x valuation jump in 9 months']
    },
    {
      id: 'ins_p3',
      title: 'Financial Revenue Figures Unreported',
      description: 'While operational volume and booking counts are reported, audited net revenue and unit margin burn rates are not publicly available in regulatory filings.',
      category: 'Data Limitation',
      severity: 'neutral',
      data_points: ['Revenue: Not Publicly Available', 'Focus on booking velocity metrics']
    }
  ]
};

export const SNABBIT_DATA: Company = {
  id: 'comp_snabbit_02',
  name: 'Snabbit',
  official_name: 'Snabbit Technologies Pvt. Ltd.',
  slug: 'snabbit',
  description: 'Snabbit is an Indian on-demand hyperlocal home services platform offering rapid 15 to 30-minute home repair, maintenance, beauty, and appliance servicing.',
  website: 'https://www.snabbit.com',
  logo_url: '/logos/snabbit.svg',
  founder: 'Aayush Agarwal',
  founded_year: 2024,
  headquarters: 'Bengaluru, Karnataka, India',
  industry: 'On-Demand Hyperlocal Home & Personal Services',
  business_model: 'Hyperlocal technician and beauty professional aggregation model providing rapid 15-30 minute home repairs, electrical work, plumbing, cleaning, and salon services.',
  target_customers: 'Urban homeowners, working professionals, apartment complex residents, and families needing rapid or scheduled home maintenance.',
  services: [
    'Electrical Work & Appliance Repair',
    'Plumbing & Sanitation Fixes',
    'On-Demand At-Home Salon & Beauty',
    'Deep Cleaning & Sanitization',
    'Handyman & Rapid Home Repairs'
  ],
  cities: [
    'Bengaluru',
    'Mumbai',
    'Delhi NCR',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Chandigarh',
    'Kochi',
    'Lucknow'
  ],
  expansion_summary: 'Built extensive coverage across 12 tier-1 and tier-2 Indian cities within 24 months, closing 5 venture rounds backed by marquee international and Indian growth funds.',
  last_researched_date: '2026-05-18',
  financials: {
    total_funding_usd: 113200000,
    total_funding_formatted: '$113.2 Million',
    latest_round: 'Series D',
    latest_round_date: 'April 2026',
    valuation_usd: 375000000,
    valuation_formatted: '$350.0M - $400.0 Million',
    revenue_formatted: 'Not Publicly Available',
    employee_count_formatted: '~350 Corporate Staff',
    active_professionals_formatted: '6,000+ Verified Service Partners',
    daily_bookings_formatted: 'Not Publicly Disclosed',
    currency: 'USD',
    as_of_date: 'April 2026',
    source_name: 'TechCrunch & Inc42',
    source_url: 'https://techcrunch.com'
  },
  funding_rounds: [
    {
      id: 'snabbit_f1',
      round_type: 'Seed',
      amount_usd: 1000000,
      amount_formatted: '$1.0 Million',
      currency: 'USD',
      date: 'Early 2024',
      valuation_usd: null,
      valuation_formatted: 'Not Publicly Reported',
      investors: ['Nexus Venture Partners'],
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com'
    },
    {
      id: 'snabbit_f2',
      round_type: 'Series A',
      amount_usd: 5500000,
      amount_formatted: '$5.5 Million',
      currency: 'USD',
      date: 'January 2025',
      valuation_usd: null,
      valuation_formatted: 'Not Publicly Reported',
      investors: ['Elevation Capital (Lead)', 'Nexus Venture Partners', 'Vidit Aatrey', 'Sanjeev Barnwal', 'Gaurav Munjal', 'Niraj Singh'],
      source_name: 'YourStory',
      source_url: 'https://yourstory.com'
    },
    {
      id: 'snabbit_f3',
      round_type: 'Series B',
      amount_usd: 19000000,
      amount_formatted: '$19.0 Million',
      currency: 'USD',
      date: 'May 2025',
      valuation_usd: null,
      valuation_formatted: 'Not Publicly Reported',
      investors: ['Lightspeed India Partners (Lead)', 'Elevation Capital', 'Nexus Venture Partners'],
      source_name: 'India Tech Desk',
      source_url: 'https://indiatechdesk.com'
    },
    {
      id: 'snabbit_f4',
      round_type: 'Series C',
      amount_usd: 31700000,
      amount_formatted: '$31.7 Million (₹265 Cr)',
      currency: 'USD',
      date: 'October 2025',
      valuation_usd: 180000000,
      valuation_formatted: '$180.0 Million',
      investors: ['Bertelsmann India Investments', 'Lightspeed India Partners', 'Elevation Capital', 'Nexus Venture Partners'],
      source_name: 'YourStory & Entrackr',
      source_url: 'https://yourstory.com'
    },
    {
      id: 'snabbit_f5',
      round_type: 'Series D',
      amount_usd: 56000000,
      amount_formatted: '$56.0 Million',
      currency: 'USD',
      date: 'April 2026',
      valuation_usd: 375000000,
      valuation_formatted: '$350.0M - $400.0 Million',
      investors: ['Susquehanna Venture Capital (Co-Lead)', 'Mirae Asset Venture Investments (Co-Lead)', 'Bertelsmann India Investments', 'Nexus Venture Partners', 'Lightspeed India', 'FJ Labs'],
      source_name: 'TechCrunch & Founder Today',
      source_url: 'https://techcrunch.com'
    }
  ],
  investors: [
    {
      id: 'inv_s1',
      name: 'Susquehanna Venture Capital',
      type: 'Venture Capital',
      investment_round: 'Series D (Co-Lead)',
      amount: '$56.0M Round Co-Lead',
      date: 'April 2026',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'inv_s2',
      name: 'Mirae Asset Venture Investments (Unicorn Growth Fund)',
      type: 'Growth Equity',
      investment_round: 'Series D (Co-Lead)',
      amount: '$56.0M Round Co-Lead',
      date: 'April 2026',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'inv_s3',
      name: 'Bertelsmann India Investments',
      type: 'Venture Capital',
      investment_round: 'Series C & Series D',
      amount: 'Series C & D Participant',
      date: 'October 2025',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com'
    },
    {
      id: 'inv_s4',
      name: 'Lightspeed India Partners',
      type: 'Venture Capital',
      investment_round: 'Series B (Lead), Series C & D',
      amount: '$19.0M Series B Lead',
      date: 'May 2025',
      source_name: 'India Tech Desk',
      source_url: 'https://indiatechdesk.com'
    },
    {
      id: 'inv_s5',
      name: 'Elevation Capital',
      type: 'Venture Capital',
      investment_round: 'Series A (Lead), Series B, C, D',
      amount: '$5.5M Series A Lead',
      date: 'January 2025',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com'
    },
    {
      id: 'inv_s6',
      name: 'Nexus Venture Partners',
      type: 'Venture Capital',
      investment_round: 'Seed (Lead), Series A, B, C, D',
      amount: '$1.0M Seed Lead',
      date: 'Early 2024',
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com'
    },
    {
      id: 'inv_s7',
      name: 'Vidit Aatrey, Sanjeev Barnwal, Gaurav Munjal, Niraj Singh',
      type: 'Angel',
      investment_round: 'Series A Angels',
      amount: 'Angel Syndicate',
      date: 'January 2025',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com'
    }
  ],
  news: [
    {
      id: 'n_s1',
      title: 'Snabbit Secures $56M Series D Co-Led by Susquehanna & Mirae Asset at $400M Valuation',
      summary: 'On-demand home services startup Snabbit closed a massive $56 million Series D funding round co-led by Susquehanna and Mirae Asset, boosting its valuation to $350M-$400M just six months after its Series C.',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com',
      published_date: 'April 2026',
      category: 'Funding'
    },
    {
      id: 'n_s2',
      title: 'Snabbit Closes ₹265 Crore ($31.7M) Series C Funding From Bertelsmann and Lightspeed',
      summary: 'Snabbit raised $31.7 million in Series C financing to deepen density in top 12 Indian metros and expand quick-turnaround handyman and salon categories.',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com',
      published_date: 'October 2025',
      category: 'Funding'
    },
    {
      id: 'n_s3',
      title: 'Lightspeed Leads $19M Series B Expansion in Hyperlocal Repairs Platform Snabbit',
      summary: 'With backing from Lightspeed, Elevation, and Nexus, Snabbit scaled its 15-30 minute home maintenance network across 8 new tier-1 and tier-2 metros.',
      source_name: 'Inc42',
      source_url: 'https://inc42.com',
      published_date: 'May 2025',
      category: 'Expansion'
    },
    {
      id: 'n_s4',
      title: 'Aayush Agarwal\'s Snabbit Raises $5.5M Series A Co-Backed by Meesho & Unacademy Founders',
      summary: 'Snabbit secured early growth capital from Elevation Capital alongside angel participation from prominent Indian tech founders.',
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com',
      published_date: 'January 2025',
      category: 'Funding'
    }
  ],
  growth_metrics: [
    {
      id: 'gm_s1',
      metric_name: 'Total Capital Raised',
      metric_value: '$113.2M Across 5 Rounds',
      period: 'April 2026',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'gm_s2',
      metric_name: 'Reported Valuation Range',
      metric_value: '$350M - $400M',
      period: 'April 2026',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com'
    },
    {
      id: 'gm_s3',
      metric_name: 'Coverage Cities',
      metric_value: '12 Major Indian Metros',
      period: '2026',
      source_name: 'Inc42',
      source_url: 'https://inc42.com'
    },
    {
      id: 'gm_s4',
      metric_name: 'Valuation Trajectory',
      metric_value: '$180M (Oct 25) ➔ $350M-$400M (Apr 26)',
      period: '2025-2026',
      source_name: 'Founder Today',
      source_url: 'https://founderstoday.news'
    }
  ],
  sources: [
    {
      field_name: 'Series D Funding & Valuation Range',
      source_name: 'TechCrunch',
      source_url: 'https://techcrunch.com',
      published_date: 'April 2026',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Series C Funding & Shareholding',
      source_name: 'YourStory',
      source_url: 'https://yourstory.com',
      published_date: 'October 2025',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Series B Round & Lead Investor',
      source_name: 'Inc42',
      source_url: 'https://inc42.com',
      published_date: 'May 2025',
      accessed_date: '2026-08-09'
    },
    {
      field_name: 'Series A & Founder Information',
      source_name: 'Entrackr',
      source_url: 'https://entrackr.com',
      published_date: 'January 2025',
      accessed_date: '2026-08-09'
    }
  ],
  insights: [
    {
      id: 'ins_s1',
      title: 'Aggressive Capital Accumulation ($113.2M Across 5 Rounds in 24 Months)',
      description: 'Snabbit has closed five capital rounds in two years, backed by major multi-stage funds like Susquehanna, Mirae Asset, Lightspeed, Elevation, and Nexus.',
      category: 'Funding Momentum',
      severity: 'positive',
      data_points: ['$113.2M total capital', '5 capital rounds in 24 months', '$350M-$400M valuation']
    },
    {
      id: 'ins_s2',
      title: 'Broad Hyperlocal Services Taxonomy',
      description: 'Unlike single-vertical players, Snabbit targets handyman repairs, electrical, plumbing, beauty, and deep cleaning with a 15-30 minute delivery SLA.',
      category: 'Market Strategy',
      severity: 'positive',
      data_points: ['12 city footprint', '15-30 min SLA', 'Multi-category home services']
    },
    {
      id: 'ins_s3',
      title: 'Financial Revenue & Unit Economics Unreported',
      description: 'Detailed gross transaction value (GTV), net revenues, and burn rates remain private and unconfirmed in official filings.',
      category: 'Data Limitation',
      severity: 'neutral',
      data_points: ['Revenue: Not Publicly Available', 'Daily booking numbers unconfirmed']
    }
  ]
};

export const COMPARISON_DATA: ComparisonData = {
  company1: PRONTO_DATA,
  company2: SNABBIT_DATA,
  key_differences: [
    {
      category: 'Service Vertical Focus',
      pronto_take: 'Specializes in high-frequency daily domestic help (cleaning, utensil washing, laundry, basic meal prep) with 99% female professionals.',
      snabbit_take: 'Broad hyperlocal handyman and home servicing (electrical, plumbing, beauty, deep cleaning, appliance repair).',
      analysis: 'Pronto targets daily recurring household chores using shift-based female pros, whereas Snabbit targets episodic home repairs, grooming, and maintenance.'
    },
    {
      category: 'Total Funding & Valuation',
      pronto_take: '$58.0M Total Funding | $200.0M Valuation (May 2026 Series B Extension)',
      snabbit_take: '$113.2M Total Funding | $350.0M - $400.0M Valuation (April 2026 Series D)',
      analysis: 'Snabbit has raised nearly double the total capital ($113.2M vs $58.0M) across 5 rounds, commanding a higher valuation range ($350M-$400M vs $200M).'
    },
    {
      category: 'Fulfillment & Workforce Model',
      pronto_take: 'Shift-based structured employment model for domestic workers, providing guaranteed income windows.',
      snabbit_take: 'On-demand technician and skilled gig-worker aggregation with 15-30 minute response SLA.',
      analysis: 'Pronto relies on shift predictability for domestic helpers, while Snabbit operates a fast-dispatch on-demand technician model.'
    },
    {
      category: 'Investor Syndicate Profile',
      pronto_take: 'Bain Capital Ventures, General Catalyst, Glade Brook Capital, Epiq Capital, Lachy Groom.',
      snabbit_take: 'Susquehanna, Mirae Asset, Bertelsmann, Lightspeed India, Elevation Capital, Nexus Venture Partners, FJ Labs.',
      analysis: 'Both companies enjoy elite VC backing. Snabbit attracted large growth equity funds (Susquehanna, Mirae Asset, Bertelsmann), while Pronto attracted Bain, General Catalyst, Epiq, and Lachy Groom.'
    },
    {
      category: 'Geographic Scale',
      pronto_take: '10 Metro Cities (Gurugram, Delhi NCR, Bengaluru, Mumbai, etc.) processing 26,000 daily bookings.',
      snabbit_take: '12 Metro Cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Kolkata, Pune, etc.).',
      analysis: 'Snabbit leads slightly in city breadth (12 vs 10 metros), while Pronto reports explicit daily order throughput (26,000 daily bookings).'
    }
  ],
  summary_insight: 'Pronto and Snabbit represent two distinct playbooks in India\'s rapidly growing instant home-services market. Pronto is building a shift-based, recurring daily domestic chore platform with female professionals, while Snabbit is a venture-backed, multi-category repair, beauty, and maintenance aggregator.'
};
