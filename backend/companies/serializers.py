from rest_framework import serializers
from .models import Company, FinancialData, FundingRound, Investor, News, Source, GrowthMetric

class FinancialDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialData
        fields = '__all__'


class FundingRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingRound
        fields = '__all__'


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = '__all__'


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'


class GrowthMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrowthMetric
        fields = '__all__'


class CompanyListSerializer(serializers.ModelSerializer):
    total_funding = serializers.CharField(source='financials.total_funding_formatted', read_only=True)
    valuation = serializers.CharField(source='financials.valuation_formatted', read_only=True)
    latest_round = serializers.CharField(source='financials.latest_round', read_only=True)

    class Meta:
        model = Company
        fields = [
            'id', 'name', 'official_name', 'slug', 'description',
            'website', 'logo_url', 'founder', 'founded_year',
            'headquarters', 'industry', 'total_funding',
            'valuation', 'latest_round', 'last_researched_date'
        ]


class CompanyDetailSerializer(serializers.ModelSerializer):
    financials = FinancialDataSerializer(read_only=True)
    funding_rounds = FundingRoundSerializer(many=True, read_only=True)
    investors = InvestorSerializer(many=True, read_only=True)
    news = NewsSerializer(many=True, read_only=True)
    sources = SourceSerializer(many=True, read_only=True)
    growth_metrics = GrowthMetricSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = '__all__'
