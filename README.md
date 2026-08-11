# Company Intelligence Platform

A high-precision company research, intelligence, and competitive benchmarking platform built with React, TypeScript, Tailwind CSS, Recharts, Express, Python, Django REST Framework, and PostgreSQL.

This platform provides verified primary-sourced intelligence on fast-growing technology companies, featuring deep profiles and side-by-side comparative analysis for **Pronto** and **Snabbit**.

---

## 1. Overview & Objectives

**Company Intelligence** was built to solve the lack of structured, verified, and transparent data in corporate research. Rather than relying on unverified SEO blogs, estimated zero-fill placeholders, or hallucinated AI outputs, this platform enforces strict primary source tracking across every metric.

### Core Questions Answered
- **What does the company do?** Detailed operational model breakdowns.
- **Who founded it & when?** Verified founders and inception year.
- **Where is it headquartered?** Primary corporate headquarters.
- **What is its business model?** Specific monetisation, workforce, and service mechanics.
- **How much funding has it raised?** Chronological funding timeline from Seed to growth rounds.
- **Who are its investors?** Venture capital firms, growth funds, and angel syndicates.
- **What is its valuation?** Publicly reported valuation milestones.
- **How does Pronto compare with Snabbit?** Structured comparative matrices, key strategic differences, and Recharts visual analytics.
- **What is traceable?** 100% of data points link directly to supporting primary sources (TechCrunch, Economic Times, YourStory, Fortune India, Inc42).

---

## 2. Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (exact `#FEF2A0`, `#F3CD97`, `#E98B50`, `#BC4F4F` brand palette)
- **Routing:** React Router DOM v7
- **Visualization:** Recharts
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Typography:** Roboto (400, 500, 700)

### Full-Stack Runtime & Development Server
- **Server:** Node.js + Express + Vite Middleware (`server.ts`) running on Port 3000
- **Dev Execution:** `tsx server.ts`

### Backend Architecture (Local & Production Standalone)
- **Framework:** Python 3.11+ / Django 5.0 / Django REST Framework
- **Database:** PostgreSQL (with SQLite fallback for lightweight development)
- **CORS:** `django-cors-headers`
- **Testing:** Pytest & Django Test Suite (`python manage.py test`)

---

## 3. Project Structure

```
company-intelligence-platform/
├── backend/                        # Django REST Framework Backend
│   ├── manage.py                   # Django management script
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Environment template
│   ├── config/                     # Django project settings & URL routing
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── companies/                  # Core companies domain app
│       ├── models.py               # PostgreSQL normalized models
│       ├── serializers.py          # DRF serializers
│       ├── views.py                # REST API views & exception handlers
│       ├── services.py             # Business logic layer
│       ├── urls.py                 # App endpoint routes
│       ├── admin.py                # Django Admin setup
│       ├── tests.py                # Comprehensive test suite
│       └── management/
│           └── commands/
│               └── seed_companies.py # Verified data seeder
│
├── frontend (root workspace)/      # React + Vite + TypeScript Frontend
│   ├── index.html                  # Main entry point with Roboto font
│   ├── server.ts                   # Express + Vite full-stack dev/prod server
│   ├── package.json                # Dependencies & scripts
│   ├── public/                     # Static branding assets & favicon
│   └── src/
│       ├── assets/
│       │   ├── branding/           # Company Intelligence SVG platform logos
│       │   └── logos/              # Official Pronto and Snabbit logos
│       ├── components/             # Reusable UI components
│       │   ├── Navbar.tsx          # Responsive navigation & search
│       │   ├── Footer.tsx          # Footer with source policy
│       │   ├── SourceBadge.tsx     # Clickable source tracking badge
│       │   ├── FundingChart.tsx    # Recharts visualization
│       │   └── SkeletonLoader.tsx  # Data loading skeletons
│       ├── data/                   # Verified research datasets
│       │   └── companyData.ts
│       ├── hooks/                  # Custom hooks (useTheme)
│       ├── pages/                  # Application views
│       │   ├── HomePage.tsx
│       │   ├── CompanyDetailsPage.tsx
│       │   ├── ComparePage.tsx
│       │   └── MethodologyPage.tsx
│       ├── services/               # Axios API service layer
│       │   └── api.ts
│       ├── types/                  # Shared TypeScript interfaces
│       │   └── index.ts
│       └── index.css               # Tailwind CSS & theme definitions
└── README.md                       # Comprehensive platform documentation
```

---

## 4. Database Schema (PostgreSQL)

The backend utilizes PostgreSQL with normalized relational models:

1. **`Company`**: `id`, `name`, `official_name`, `slug`, `description`, `website`, `logo_url`, `founder`, `founded_year`, `headquarters`, `industry`, `business_model`, `target_customers`, `services`, `cities`, `expansion_summary`, `last_researched_date`
2. **`FinancialData`**: `company` (FK), `total_funding_usd`, `total_funding_formatted`, `latest_round`, `latest_round_date`, `valuation_usd`, `valuation_formatted`, `revenue_formatted`, `employee_count_formatted`, `active_professionals_formatted`, `daily_bookings_formatted`, `source_name`, `source_url`
3. **`FundingRound`**: `company` (FK), `round_type`, `amount_usd`, `amount_formatted`, `date`, `valuation_formatted`, `investors` (JSON), `source_name`, `source_url`
4. **`Investor`**: `company` (FK), `name`, `type`, `investment_round`, `amount`, `date`, `source_name`, `source_url`
5. **`News`**: `company` (FK), `title`, `summary`, `source_name`, `source_url`, `published_date`, `category`
6. **`Source`**: `company` (FK), `field_name`, `source_name`, `source_url`, `published_date`, `accessed_date`
7. **`GrowthMetric`**: `company` (FK), `metric_name`, `metric_value`, `period`, `source_name`, `source_url`

---

## 5. REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/companies/` | List all verified company summaries |
| `GET` | `/api/v1/companies/{slug}/` | Detailed company intelligence report |
| `GET` | `/api/v1/companies/{slug}/financials/` | Financial snapshot and funding summary |
| `GET` | `/api/v1/companies/{slug}/funding/` | Chronological funding rounds |
| `GET` | `/api/v1/companies/{slug}/investors/` | Investor syndicate list |
| `GET` | `/api/v1/companies/{slug}/news/` | Verified editorial news feed |
| `GET` | `/api/v1/companies/{slug}/sources/` | Complete traceable source list |
| `GET` | `/api/v1/compare/?company1=pronto&company2=snabbit` | Side-by-side comparison matrix |
| `GET` | `/api/v1/search/?q={query}` | Search by company, founder, or industry |

---

## 6. Research Methodology & Source Policy

### Highest Priority — Data Accuracy
All numbers, dates, founders, and investors are 100% real and verified against published journalism and corporate filings. Zero placeholders or hallucinated metrics.

### Missing Data Policy
If a financial metric (such as audited revenue) is unconfirmed, it is strictly displayed as:
```
"Not Publicly Available"
```
We **never** convert missing figures into zero or invent fake estimates.

### Preferred Source Hierarchy
1. Official Company Website & Press Disclosures
2. Executive Official LinkedIn Profiles
3. TechCrunch & Reuters
4. Economic Times & Fortune India
5. YourStory, Inc42, & Entrackr
6. Crunchbase & Tracxn

---

## 7. Local Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ and pip
- PostgreSQL (optional for local DB, defaults to SQLite fallback out-of-the-box)

---

### Step 1: Clone Repository & Configure Environment

```bash
# Clone repository
git clone <repository-url>
cd company-intelligence-platform

# Copy environment template
cp backend/.env.example backend/.env
```

---

### Step 2: Backend Setup (Django + PostgreSQL)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Seed verified data for Pronto and Snabbit
python manage.py seed_companies

# Run test suite
python manage.py test

# Start Django Development Server (Port 8000)
python manage.py runserver 8000
```

Backend will be accessible at `http://localhost:8000/api/v1/companies/` and Django Admin at `http://localhost:8000/admin/`.

---

### Step 3: Frontend Setup (React + Vite + Express Server)

In a new terminal window at the project root:

```bash
# Install npm dependencies
npm install

# Start Full-Stack Dev Server (Port 3000)
npm run dev
```

Frontend application will be accessible live at `http://localhost:3000`.

---

## 8. Author & Credits

Designed and built for CTO-level company intelligence requirements, prioritizing source lineage, mathematical color rhythm, and clean editorial typography.
