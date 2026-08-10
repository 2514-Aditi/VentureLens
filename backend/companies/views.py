from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler
from django.http import Http404

from .services import CompanyService
from .serializers import (
    CompanyListSerializer,
    CompanyDetailSerializer,
    FinancialDataSerializer,
    FundingRoundSerializer,
    InvestorSerializer,
    NewsSerializer,
    SourceSerializer
)

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is None:
        return Response(
            {'error': 'An internal server error occurred. Please try again later.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    return response


class CompanyListView(APIView):
    def get(self, request):
        companies = CompanyService.list_all_companies()
        serializer = CompanyListSerializer(companies, many=True)
        return Response({'count': len(serializer.data), 'results': serializer.data})


class CompanyDetailView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = CompanyDetailSerializer(company)
        return Response(serializer.data)


class CompanyFinancialsView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = FinancialDataSerializer(company.financials)
        return Response({'company': company.name, 'slug': company.slug, 'financials': serializer.data})


class CompanyFundingView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = FundingRoundSerializer(company.funding_rounds.all(), many=True)
        return Response({
            'company': company.name,
            'slug': company.slug,
            'total_funding': company.financials.total_funding_formatted,
            'funding_rounds': serializer.data
        })


class CompanyInvestorsView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = InvestorSerializer(company.investors.all(), many=True)
        return Response({'company': company.name, 'slug': company.slug, 'investors': serializer.data})


class CompanyNewsView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = NewsSerializer(company.news.all(), many=True)
        return Response({'company': company.name, 'slug': company.slug, 'news': serializer.data})


class CompanySourcesView(APIView):
    def get(self, request, slug):
        company = CompanyService.get_company_by_slug(slug)
        serializer = SourceSerializer(company.sources.all(), many=True)
        return Response({'company': company.name, 'slug': company.slug, 'sources': serializer.data})


class CompanyCompareView(APIView):
    def get(self, request):
        c1_slug = request.query_params.get('company1', 'pronto')
        c2_slug = request.query_params.get('company2', 'snabbit')

        try:
            comparison = CompanyService.compare_companies(c1_slug, c2_slug)
        except Http404:
            return Response(
                {'error': 'One or both requested comparison companies could not be found.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        c1_data = CompanyDetailSerializer(comparison['company1']).data
        c2_data = CompanyDetailSerializer(comparison['company2']).data

        # Define key differences and summary insight
        key_differences = []
        summary_insight = ""

        slugs = {c1_slug.lower().strip(), c2_slug.lower().strip()}
        if slugs == {'pronto', 'snabbit'}:
            key_differences = [
                {
                    'category': 'Service Vertical Focus',
                    'pronto_take': 'Specializes in high-frequency daily domestic help (cleaning, utensil washing, laundry, basic meal prep) with 99% female professionals.',
                    'snabbit_take': 'Broad hyperlocal handyman and home servicing (electrical, plumbing, beauty, deep cleaning, appliance repair).',
                    'analysis': 'Pronto targets daily recurring household chores using shift-based female pros, whereas Snabbit targets episodic home repairs, grooming, and maintenance.'
                },
                {
                    'category': 'Total Funding & Valuation',
                    'pronto_take': '$58.0M Total Funding | $200.0M Valuation (May 2026 Series B Extension)',
                    'snabbit_take': '$113.2M Total Funding | $350.0M - $400.0M Valuation (April 2026 Series D)',
                    'analysis': 'Snabbit has raised nearly double the total capital ($113.2M vs $58.0M) across 5 rounds, commanding a higher valuation range ($350M-$400M vs $200M).'
                },
                {
                    'category': 'Fulfillment & Workforce Model',
                    'pronto_take': 'Shift-based structured employment model for domestic workers, providing guaranteed income windows.',
                    'snabbit_take': 'On-demand technician and skilled gig-worker aggregation with 15-30 minute response SLA.',
                    'analysis': 'Pronto relies on shift predictability for domestic helpers, while Snabbit operates a fast-dispatch on-demand technician model.'
                },
                {
                    'category': 'Investor Syndicate Profile',
                    'pronto_take': 'Bain Capital Ventures, General Catalyst, Glade Brook Capital, Epiq Capital, Lachy Groom.',
                    'snabbit_take': 'Susquehanna, Mirae Asset, Bertelsmann, Lightspeed India, Elevation Capital, Nexus Venture Partners, FJ Labs.',
                    'analysis': 'Both companies enjoy elite VC backing. Snabbit attracted large growth equity funds (Susquehanna, Mirae Asset, Bertelsmann), while Pronto attracted Bain, General Catalyst, Epiq, and Lachy Groom.'
                },
                {
                    'category': 'Geographic Scale',
                    'pronto_take': '10 Metro Cities (Gurugram, Delhi NCR, Bengaluru, Mumbai, etc.) processing 26,000 daily bookings.',
                    'snabbit_take': '12 Metro Cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Kolkata, Pune, etc.).',
                    'analysis': 'Snabbit leads slightly in city breadth (12 vs 10 metros), while Pronto reports explicit daily order throughput (26,000 daily bookings).'
                }
            ]
            summary_insight = "Pronto and Snabbit represent two distinct playbooks in India's rapidly growing instant home-services market. Pronto is building a shift-based, recurring daily domestic chore platform with female professionals, while Snabbit is a venture-backed, multi-category repair, beauty, and maintenance aggregator."
        else:
            # Fallback for dynamic comparison
            summary_insight = f"Comparison report between {comparison['company1'].name} and {comparison['company2'].name}."
            key_differences = [
                {
                    'category': 'Industry & Domain',
                    'pronto_take': f"{comparison['company1'].name} operates in {comparison['company1'].industry}.",
                    'snabbit_take': f"{comparison['company2'].name} operates in {comparison['company2'].industry}.",
                    'analysis': f"The companies cover different target services: {comparison['company1'].industry} vs {comparison['company2'].industry}."
                }
            ]

        return Response({
            'company1': c1_data,
            'company2': c2_data,
            'key_differences': key_differences,
            'summary_insight': summary_insight
        })


class CompanySearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        results = CompanyService.search_companies(query)
        serializer = CompanyListSerializer(results, many=True)
        return Response({
            'query': query,
            'results_count': len(serializer.data),
            'results': serializer.data
        })
