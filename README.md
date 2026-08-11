# VentureLens - Company Intelligence Platform

VentureLens is a company intelligence platform built for the technical assignment to research and compare **Pronto** and **Snabbit** using publicly available information.

The platform stores researched company information in PostgreSQL, exposes it through Django REST APIs, and presents it through a React dashboard.


## Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- django-cors-headers
- python-dotenv

### Database
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React


## Architecture

```text
                         VENTURELENS
                              |
                              v
                        React + TypeScript
                           Frontend
                              |
                         REST / JSON
                              |
                              v
                       Django + DRF
                           Backend
                              |
                         Django ORM
                              |
                              v
                         PostgreSQL
                           Database
```

Django handles database models, persistence, APIs, search, comparison, analysis, source records, data seeding, and tests.

React handles company discovery, company reports, financial information, funding history, investors, news, sources, comparison, charts, search, and methodology.


## Project Structure

```text
company-intelligence-ri/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/
│   └── companies/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── tests.py
│       ├── admin.py
│       ├── migrations/
│       └── management/
│           └── commands/
│               └── seed_companies.py
│
├── frontend/
│   ├── package.json
│   └── src/
│
├── .env.example
├── .gitignore
└── README.md
```


## Data Pipeline

```text
Public sources
      ↓
Research and verification
      ↓
Normalize and structure data
      ↓
Django seed command
      ↓
PostgreSQL
      ↓
Django REST API
      ↓
React dashboard
```

The researched dataset can be loaded with:

```bash
python manage.py seed_companies
```

The seed command creates the Pronto and Snabbit records and their related financial, funding, investor, news, and source information.

## Data Quality Approach

The platform does not intentionally fill unavailable private-company metrics with fabricated values.

When reliable public information is unavailable, the value is represented as:

```text
Not Publicly Available
```

Where a reputable source reports an estimate or range, it is treated as an estimate rather than an exact audited value.

Source records contain the source name and direct article URL so users can inspect the underlying publication.

Because private-company information can differ between publications, source context and reporting dates are retained rather than silently presenting every reported figure as identical.

## Research Sources

### Pronto

Official website:

https://www.withpronto.com/

Seed:

https://techcrunch.com/2025/05/15/bain-bets-on-indian-domestic-work-startup-pronto-even-as-rivals-face-criticism/

Series A:

https://economictimes.indiatimes.com/tech/funding/home-services-startup-pronto-raises-11-million-from-general-catalyst-glade-brook-capital/articleshow/123243934.cms

Series B:

https://economictimes.indiatimes.com/tech/funding/pronto-raises-25-million-from-epiq-capital-existing-backers/articleshow/128950973.cms

Series B Extension:

https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/

Additional reporting:

https://www.reuters.com/world/india/indian-instant-home-services-startup-pronto-raises-20-million-valuation-doubles-2026-05-07/

### Snabbit

Official website:

https://www.snabbit.com/

Early/Seed funding:

https://www.business-standard.com/companies/start-ups/snabbit-raises-5-5-mn-in-funding-led-by-elevation-capital-125012001316_1.html

Series A:

https://economictimes.indiatimes.com/tech/funding/quick-service-app-snabbit-raises-5-5-million-from-elevation-capital-nexus-venture-partners/articleshow/117405624.cms

Series B:

https://yourstory.com/2025/05/snabbit-funding-lightspeed-quick-home-services-mumbai-expansion

Series C:

https://yourstory.com/2025/10/quick-service-app-snabbit-raises-rs-265-cr-in-series-c-round

Series D:

https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/

Additional Series D reporting:

https://www.business-standard.com/companies/news/home-services-platform-snabbit-raises-56-mn-in-series-d-funding-round-126042800223_1.html


## Local Setup

### Requirements

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

### Backend

From the project root:

```bash
cd backend
python -m venv venv
```

Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env` using `.env.example` and configure PostgreSQL:

```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DB_NAME=company_intel
DB_USER=postgres
DB_PASSWORD=your-postgres-password
DB_HOST=localhost
DB_PORT=5432
```

Run migrations:

```bash
python manage.py migrate
```

Load the researched data:

```bash
python manage.py seed_companies
```

Run checks:

```bash
python manage.py check
```

Start Django:

```bash
python manage.py runserver
```

The backend runs at:

```text
http://127.0.0.1:8000/
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the local URL shown by Vite.

## Testing

From `backend/`:

```bash
python manage.py test
```

The test suite covers the main company APIs, including:

- Company listing
- Company details
- Financial data
- Funding
- Investors
- News
- Sources
- Company comparison
- Search

## Updating Research Data

When new verified information becomes available:

1. Update the relevant records in `seed_companies.py`.
2. Add the direct source/article URL.
3. Run:

```bash
python manage.py seed_companies
```

4. Validate the application:

```bash
python manage.py check
python manage.py test
```

## Key Engineering Decisions

### Django + Django REST Framework

Django provides the backend application structure, ORM, migrations, and database integration. Django REST Framework provides the API layer used by the frontend.

### PostgreSQL

PostgreSQL is used because the project contains related entities such as companies, funding rounds, investors, news, financial records, and source records.

### React + TypeScript

React provides the dashboard interface and TypeScript provides typed frontend data structures.

### Source Traceability

Source information is stored alongside the researched data so important figures can be traced back to their underlying publications.

### Conservative Missing-Data Handling

Unavailable private-company metrics are not converted to zero or invented. They are explicitly represented as unavailable.

## Assumptions

- The platform relies on publicly available information.
- Private companies may not disclose complete financial information.
- Different reputable sources may report different figures.
- Historical information is retained with its relevant source and reporting date.
- Estimates are not treated as audited financial results.
