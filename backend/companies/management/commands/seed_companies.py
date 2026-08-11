from django.core.management.base import BaseCommand
from django.db import transaction
from companies.models import Company, FinancialData, FundingRound, Investor, News, Source, GrowthMetric

class Command(BaseCommand):
    help = 'Seeds PostgreSQL database with verified research data for Pronto and Snabbit without creating duplicates.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting verified company data seeding process...'))

        with transaction.atomic():
            # 1. SEED PRONTO DATA
            pronto, created = Company.objects.update_or_create(
                slug='pronto',
                defaults={
                    'name': 'Pronto',
                    'official_name': 'Pronto Services India Pvt. Ltd.',
                    'description': 'Pronto is an Indian quick home services platform providing shift-based domestic assistance including cleaning, utensil washing, laundry, and basic meal preparation with rapid fulfillment.',
                    'website': 'https://www.withpronto.com/',
                    'logo_url': '/src/assets/logos/pronto.svg',
                    'founder': 'Anjali Sardana',
                    'founded_year': 2025,
                    'headquarters': 'Bengaluru, Karnataka, India',
                    'industry': 'Hyperlocal On-Demand Home Services',
                    'business_model': 'Shift-based on-demand marketplace connecting urban households with background-verified female professionals ("Pros") for scheduled and rapid domestic chores.',
                    'target_customers': 'Urban nuclear households, dual-income working couples, and families in major Indian tier-1 metro hubs needing reliable domestic assistance.',
                    'services': [
                        'Domestic Cleaning & Dusting',
                        'Utensil Washing & Kitchen Cleanup',
                        'Laundry & Clothes Folding',
                        'Basic Meal Preparation & Chopping',
                        'Express 10-Minute Daily Chores'
                    ],
                    'cities': [
                        'Bengaluru', 'Delhi', 'Faridabad', 'Ghaziabad', 'Gurugram',
                        'Hyderabad', 'Mumbai', 'Navi Mumbai', 'Noida', 'Pune', 'Thane'
                    ],
                    'expansion_summary': 'Expanded from a single operational hub in Gurugram to 11 tier-1 Indian metros. Daily booking volume surged from ~1,000 orders in late 2024 to over 26,000 daily bookings by May 2026.',
                    'last_researched_date': '2026-05-18'
                }
            )

            FinancialData.objects.update_or_create(
                company=pronto,
                defaults={
                    'total_funding_usd': 58000000.00,
                    'total_funding_formatted': '$58.0 Million',
                    'latest_round': 'Series B Extension',
                    'latest_round_date': 'May 2026',
                    'valuation_usd': 200000000.00,
                    'valuation_formatted': '$200.0 Million',
                    'revenue_formatted': 'Not Publicly Available',
                    'employee_count_formatted': 'Not Publicly Available',
                    'active_professionals_formatted': '6,500+ Active Professionals',
                    'daily_bookings_formatted': '26,000 Daily Bookings',
                    'currency': 'USD',
                    'as_of_date': 'May 2026',
                    'source_name': 'TechCrunch',
                    'source_url': 'https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/'
                }
            )

            # Clear existing child items to avoid duplicates
            pronto.funding_rounds.all().delete()
            pronto.investors.all().delete()
            pronto.news.all().delete()
            pronto.sources.all().delete()
            pronto.growth_metrics.all().delete()

            # Funding rounds
            FundingRound.objects.create(
                company=pronto, round_type='Seed', amount_usd=2000000, amount_formatted='$2.0 Million',
                currency='USD', date='May 2025', valuation_formatted='Not Publicly Reported',
                investors=['Bain Capital Ventures'], source_name='TechCrunch', source_url='https://techcrunch.com/2025/05/15/bain-bets-on-indian-domestic-work-startup-pronto-even-as-rivals-face-criticism/'
            )
            FundingRound.objects.create(
                company=pronto, round_type='Series A', amount_usd=11000000, amount_formatted='$11.0 Million',
                currency='USD', date='August 2025', valuation_usd=45000000, valuation_formatted='$45.0 Million',
                investors=['General Catalyst (Co-Lead)', 'Glade Brook Capital (Co-Lead)', 'Bain Capital Ventures'],
                source_name='TechCrunch & YourStory', source_url='https://yourstory.com/2025/08/pronto-raises-11m-series-a-general-catalyst-glade-brook-capital'
            )
            FundingRound.objects.create(
                company=pronto, round_type='Series B', amount_usd=25000000, amount_formatted='$25.0 Million',
                currency='USD', date='March 2026', valuation_usd=100000000, valuation_formatted='$100.0 Million',
                investors=['Epiq Capital (Lead)', 'General Catalyst', 'Glade Brook Capital', 'Bain Capital Ventures'],
                source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/pronto-raises-25-million-from-epiq-capital-existing-backers/articleshow/128950973.cms'
            )
            FundingRound.objects.create(
                company=pronto, round_type='Series B Extension', amount_usd=20000000, amount_formatted='$20.0 Million',
                currency='USD', date='May 2026', valuation_usd=200000000, valuation_formatted='$200.0 Million',
                investors=['Lachy Groom'], source_name='TechCrunch', source_url='https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/'
            )

            # Investors
            Investor.objects.create(company=pronto, name='Lachy Groom', type='Angel', investment_round='Series B Extension', amount='$20.0M', date='May 2026', source_name='TechCrunch', source_url='https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/')
            Investor.objects.create(company=pronto, name='Epiq Capital', type='Venture Capital', investment_round='Series B (Lead)', amount='$25.0M Round Lead', date='March 2026', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/pronto-raises-25-million-from-epiq-capital-existing-backers/articleshow/128950973.cms')
            Investor.objects.create(company=pronto, name='General Catalyst', type='Venture Capital', investment_round='Series A & B', amount='Co-Lead Series A', date='August 2025', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/home-services-startup-pronto-raises-11-million-from-general-catalyst-glade-brook-capital/articleshow/123243934.cms')
            Investor.objects.create(company=pronto, name='Glade Brook Capital', type='Venture Capital', investment_round='Series A & B', amount='Co-Lead Series A', date='August 2025', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/home-services-startup-pronto-raises-11-million-from-general-catalyst-glade-brook-capital/articleshow/123243934.cms')
            Investor.objects.create(company=pronto, name='Bain Capital Ventures', type='Venture Capital', investment_round='Seed, Series A, B', amount='$2.0M Seed Lead', date='May 2024', source_name='TechCrunch', source_url='https://techcrunch.com/2025/05/15/bain-bets-on-indian-domestic-work-startup-pronto-even-as-rivals-face-criticism/')

            # News
            News.objects.create(company=pronto, title='Pronto Raises $20M Series B Extension Led by Lachy Groom, Valuation Reaches $200M', summary='Pronto secured $20M extension from Lachy Groom, reaching $200M valuation within 24 months.', source_name='TechCrunch', source_url='https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/', published_date='May 2026', category='Funding')
            News.objects.create(company=pronto, title='Pronto Processes 26,000 Daily Orders Across 10 Metros With 4,500 Female Pros', summary='Daily completed bookings reached 26,000 across 10 Indian cities.', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/startups/househelp-apps-top-2-million-monthly-orders-amid-profitability-questions/articleshow/129282139.cms', published_date='May 2026', category='Operations')
            News.objects.create(company=pronto, title='Instant Househelp Startups Burn $14-15 Million in May as Discounts Heat Up', summary='Pronto, Snabbit and Urban Company increased discounts in May as competition intensified. Pronto recorded around 800,000-810,000 orders during the month, according to industry executives cited by ETtech.', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/technology/instant-househelp-startups-burn-14-15-million-in-may-as-discounts-heat-up/articleshow/131728593.cms', published_date='June 2026', category='Operations')
            News.objects.create(company=pronto, title='Pronto Raises $11M Series A to Expand Quick Home Services', summary='Pronto raised $11M in Series A funding from General Catalyst, Glade Brook Capital and existing investors.', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/home-services-startup-pronto-raises-11-million-from-general-catalyst-glade-brook-capital/articleshow/123243934.cms', published_date='August 2025', category='Funding')

            # Sources
            Source.objects.create(company=pronto, field_name='Series B Extension Funding & Valuation', source_name='TechCrunch', source_url='https://techcrunch.com/2026/05/06/a-20-minute-pitch-wins-indian-startup-pronto-backing-from-lachy-groom/', published_date='May 2026', accessed_date='2026-08-09')
            Source.objects.create(company=pronto, field_name='Series B Funding & Lead Investor', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/pronto-raises-25-million-from-epiq-capital-existing-backers/articleshow/128950973.cms', published_date='May 2026', accessed_date='2026-08-09')


            # 2. SEED SNABBIT DATA
            snabbit, created = Company.objects.update_or_create(
                slug='snabbit',
                defaults={
                    'name': 'Snabbit',
                    'official_name': 'Snabbit Technologies Pvt. Ltd.',
                    'description': 'Snabbit is an Indian on-demand hyperlocal home services platform offering rapid 15 to 30-minute home repair, maintenance, beauty, and appliance servicing.',
                    'website': 'https://www.snabbit.com',
                    'logo_url': '/src/assets/logos/snabbit.svg',
                    'founder': 'Aayush Agarwal',
                    'founded_year': 2024,
                    'headquarters': 'Bengaluru, Karnataka, India',
                    'industry': 'On-Demand Hyperlocal Home & Personal Services',
                    'business_model': 'Hyperlocal technician and beauty professional aggregation model providing rapid 15-30 minute home repairs, electrical work, plumbing, cleaning, and salon services.',
                    'target_customers': 'Urban homeowners, working professionals, apartment complex residents, and families needing rapid or scheduled home maintenance.',
                    'services': [
                        'Electrical Work & Appliance Repair',
                        'Plumbing & Sanitation Fixes',
                        'On-Demand At-Home Salon & Beauty',
                        'Deep Cleaning & Sanitization',
                        'Handyman & Rapid Home Repairs'
                    ],
                    'cities': [
                        'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune',
                        'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Kochi', 'Lucknow'
                    ],
                    'expansion_summary': 'Built extensive coverage across 12 tier-1 and tier-2 Indian cities within 24 months, closing 5 venture rounds backed by marquee international and Indian growth funds.',
                    'last_researched_date': '2026-05-18'
                }
            )

            FinancialData.objects.update_or_create(
                company=snabbit,
                defaults={
                    'total_funding_usd': 113200000.00,
                    'total_funding_formatted': '$113.2 Million',
                    'latest_round': 'Series D',
                    'latest_round_date': 'April 2026',
                    'valuation_usd': 375000000.00,
                    'valuation_formatted': '$350.0M - $400.0 Million',
                    'revenue_formatted': 'Not Publicly Available',
                    'employee_count_formatted': 'Not Publicly Available',
                    'active_professionals_formatted': '15,000+ Workers',
                    'daily_bookings_formatted': 'Not Publicly Disclosed',
                    'currency': 'USD',
                    'as_of_date': 'April 2026',
                    'source_name': 'TechCrunch',
                    'source_url': 'https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/'
                }
            )

            # Clear existing child items
            snabbit.funding_rounds.all().delete()
            snabbit.investors.all().delete()
            snabbit.news.all().delete()
            snabbit.sources.all().delete()
            snabbit.growth_metrics.all().delete()

            # Funding rounds
            FundingRound.objects.create(company=snabbit, round_type='Seed', amount_usd=1000000, amount_formatted='$1.0 Million', currency='USD', date='Early 2024', investors=['Nexus Venture Partners'], source_name='Business Standard', source_url='https://www.business-standard.com/companies/start-ups/snabbit-raises-5-5-mn-in-funding-led-by-elevation-capital-125012001316_1.html')
            FundingRound.objects.create(company=snabbit, round_type='Series A', amount_usd=5500000, amount_formatted='$5.5 Million', currency='USD', date='January 2025', investors=['Elevation Capital (Lead)', 'Nexus Venture Partners', 'Angels'], source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/funding/quick-service-app-snabbit-raises-5-5-million-from-elevation-capital-nexus-venture-partners/articleshow/117405624.cms')
            FundingRound.objects.create(company=snabbit, round_type='Undisclosed', amount_usd=19000000, amount_formatted='$19.0 Million', currency='USD', date='May 2025', investors=['Lightspeed India Partners (Lead)', 'Elevation Capital', 'Nexus'], source_name='YourStory', source_url='https://yourstory.com/2025/05/snabbit-funding-lightspeed-quick-home-services-mumbai-expansion')
            FundingRound.objects.create(company=snabbit, round_type='Series C', amount_usd=31700000, amount_formatted='$31.7 Million', currency='USD', date='October 2025', valuation_usd=180000000, valuation_formatted='$180.0 Million', investors=['Bertelsmann India', 'Lightspeed', 'Elevation', 'Nexus'], source_name='YourStory', source_url='https://yourstory.com/2025/10/quick-service-app-snabbit-raises-rs-265-cr-in-series-c-round')
            FundingRound.objects.create(company=snabbit, round_type='Series D', amount_usd=56000000, amount_formatted='$56.0 Million', currency='USD', date='April 2026', valuation_usd=375000000, valuation_formatted='$350.0M - $400.0 Million', investors=['Susquehanna (Co-Lead)', 'Mirae Asset (Co-Lead)', 'Bertelsmann', 'Nexus', 'Lightspeed', 'FJ Labs'], source_name='TechCrunch', source_url='https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/')

            # Investors
            Investor.objects.create(company=snabbit, name='Susquehanna Venture Capital', type='Venture Capital', investment_round='Series D (Co-Lead)', amount='$56.0M Co-Lead', date='April 2026', source_name='TechCrunch', source_url='https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/')
            Investor.objects.create(company=snabbit, name='Mirae Asset Venture Investments', type='Growth Equity', investment_round='Series D (Co-Lead)', amount='$56.0M Co-Lead', date='April 2026', source_name='TechCrunch', source_url='https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/')
            Investor.objects.create(company=snabbit, name='Lightspeed India Partners', type='Venture Capital', investment_round='Series B (Lead), C, D', amount='$19.0M Series B Lead', date='May 2025', source_name='YourStory', source_url='https://yourstory.com/2025/05/snabbit-funding-lightspeed-quick-home-services-mumbai-expansion')

            # News
            News.objects.create(company=snabbit, title='Snabbit Secures $56M Series D Co-Led by Susquehanna & Mirae Asset at $400M Valuation', summary='Snabbit closed a massive $56 million Series D round reaching $350M-$400M valuation.', source_name='TechCrunch', source_url='https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/', published_date='April 2026', category='Funding')
            News.objects.create(company=snabbit, title='Snabbit Expands into At-Home Beauty Services', summary='Snabbit expanded beyond home maintenance into salon and beauty services following a Bengaluru pilot.', source_name='Economic Times', source_url='https://economictimes.indiatimes.com/tech/technology/of-kitchens-cosmetics-snabbit-forays-into-beauty-services-after-home-cooks/articleshow/131245618.cms', published_date='May 2026', category='Expansion')
            News.objects.create(company=snabbit, title='Snabbit Reports 1.5 Million Monthly Home-Service Jobs', summary='Snabbit reported 1.5 million completed monthly home-service jobs in June, up from around one million in March.', source_name='ETRetail', source_url='https://retail.economictimes.indiatimes.com/amp/news/e-commerce/e-tailing/snabbit-says-it-completed-1-5-million-monthly-home-services-jobs-in-june/132280475', published_date='July 2026', category='Operations')

            # Sources
            Source.objects.create(company=snabbit, field_name='Series D Funding & Valuation Range', source_name='TechCrunch', source_url='https://techcrunch.com/2026/04/27/indias-snabbit-closes-56m-round-as-investor-interest-heats-up-in-on-demand-home-services/', published_date='April 2026', accessed_date='2026-08-09')

        self.stdout.write(self.style.SUCCESS('Successfully seeded verified data for Pronto and Snabbit into database!'))
