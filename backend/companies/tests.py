from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from companies.models import Company, FinancialData, FundingRound, Investor, News, Source

class CompanyAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create test company 1: Pronto
        self.pronto = Company.objects.create(
            name='Pronto',
            official_name='Pronto Services India Pvt. Ltd.',
            slug='pronto',
            description='Shift-based quick domestic services.',
            website='https://www.withpronto.com/',
            logo_url='/src/assets/logos/pronto.svg',
            founder='Anjali Sardana',
            founded_year=2024,
            headquarters='Bengaluru, Karnataka, India',
            industry='Hyperlocal On-Demand Home Services',
            business_model='Shift-based domestic help.',
            target_customers='Urban nuclear households',
            services=['Cleaning', 'Laundry'],
            cities=['Gurugram', 'Delhi NCR'],
            last_researched_date='2026-05-18'
        )

        self.pronto_financials = FinancialData.objects.create(
            company=self.pronto,
            total_funding_usd=58000000,
            total_funding_formatted='$58.0 Million',
            latest_round='Series B Extension',
            latest_round_date='May 2026',
            valuation_usd=200000000,
            valuation_formatted='$200.0 Million',
            revenue_formatted='Not Publicly Available',
            employee_count_formatted='Not Publicly Available',
            as_of_date='May 2026',
            source_name='Fortune India',
            source_url='https://www.fortuneindia.com'
        )

        FundingRound.objects.create(
            company=self.pronto,
            round_type='Series B Extension',
            amount_usd=20000000,
            amount_formatted='$20.0 Million',
            date='May 2026',
            investors=['Lachy Groom'],
            source_name='Fortune India',
            source_url='https://www.fortuneindia.com'
        )

        Investor.objects.create(
            company=self.pronto,
            name='Lachy Groom',
            investment_round='Series B Extension',
            date='May 2026',
            source_name='Fortune India',
            source_url='https://www.fortuneindia.com'
        )

        News.objects.create(
            company=self.pronto,
            title='Pronto Raises $20M Series B Extension',
            summary='Extension round led by Lachy Groom.',
            source_name='Fortune India',
            source_url='https://www.fortuneindia.com',
            published_date='May 2026',
            category='Funding'
        )

        Source.objects.create(
            company=self.pronto,
            field_name='Series B Extension Valuation',
            source_name='Fortune India',
            source_url='https://www.fortuneindia.com',
            published_date='May 2026',
            accessed_date='2026-08-09'
        )

        # Create test company 2: Snabbit
        self.snabbit = Company.objects.create(
            name='Snabbit',
            official_name='Snabbit Technologies Pvt. Ltd.',
            slug='snabbit',
            description='On-demand home maintenance and salon app.',
            website='https://www.snabbit.com',
            logo_url='/src/assets/logos/snabbit.svg',
            founder='Aayush Agarwal',
            founded_year=2024,
            headquarters='Bengaluru, India',
            industry='On-Demand Hyperlocal Home Services',
            business_model='On-demand handyman aggregation.',
            target_customers='Urban homeowners',
            services=['Electrical', 'Plumbing', 'Salon'],
            cities=['Bengaluru', 'Mumbai'],
            last_researched_date='2026-05-18'
        )

        FinancialData.objects.create(
            company=self.snabbit,
            total_funding_usd=113200000,
            total_funding_formatted='$113.2 Million',
            latest_round='Series D',
            latest_round_date='April 2026',
            valuation_usd=375000000,
            valuation_formatted='$350.0M - $400.0 Million',
            revenue_formatted='Not Publicly Available',
            employee_count_formatted='~350 Corporate Staff',
            as_of_date='April 2026',
            source_name='TechCrunch',
            source_url='https://techcrunch.com'
        )

    def test_company_list_api(self):
        url = reverse('company-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)

    def test_company_detail_api(self):
        url = reverse('company-detail', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Pronto')
        self.assertEqual(response.data['founder'], 'Anjali Sardana')

    def test_company_financials_api(self):
        url = reverse('company-financials', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['financials']['total_funding_formatted'], '$58.0 Million')

    def test_company_funding_api(self):
        url = reverse('company-funding', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['funding_rounds']), 1)

    def test_company_investors_api(self):
        url = reverse('company-investors', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['investors'][0]['name'], 'Lachy Groom')

    def test_company_news_api(self):
        url = reverse('company-news', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['news'][0]['source_name'], 'Fortune India')

    def test_company_sources_api(self):
        url = reverse('company-sources', kwargs={'slug': 'pronto'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['sources'][0]['field_name'], 'Series B Extension Valuation')

    def test_compare_api(self):
        url = reverse('company-compare') + '?company1=pronto&company2=snabbit'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company1']['name'], 'Pronto')
        self.assertEqual(response.data['company2']['name'], 'Snabbit')
        self.assertTrue('key_differences' in response.data)
        self.assertTrue('summary_insight' in response.data)
        self.assertGreater(len(response.data['key_differences']), 0)

    def test_search_api(self):
        url = reverse('company-search') + '?q=Anjali'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results_count'], 1)
        self.assertEqual(response.data['results'][0]['name'], 'Pronto')
