from django.contrib import admin
from .models import Company, FinancialData, FundingRound, Investor, News, Source, GrowthMetric

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'founder', 'founded_year', 'headquarters', 'industry')
    search_fields = ('name', 'slug', 'founder', 'industry', 'headquarters')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('founded_year', 'industry')


@admin.register(FinancialData)
class FinancialDataAdmin(admin.ModelAdmin):
    list_display = ('company', 'total_funding_formatted', 'valuation_formatted', 'latest_round')
    search_fields = ('company__name', 'latest_round', 'source_name')


@admin.register(FundingRound)
class FundingRoundAdmin(admin.ModelAdmin):
    list_display = ('company', 'round_type', 'amount_formatted', 'date', 'valuation_formatted')
    list_filter = ('round_type', 'currency')
    search_fields = ('company__name', 'round_type', 'investors')


@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'type', 'investment_round', 'date')
    list_filter = ('type', 'investment_round')
    search_fields = ('name', 'company__name')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'category', 'source_name', 'published_date')
    list_filter = ('category', 'source_name')
    search_fields = ('title', 'summary', 'company__name')


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = ('field_name', 'company', 'source_name', 'published_date', 'accessed_date')
    search_fields = ('field_name', 'source_name', 'company__name')


@admin.register(GrowthMetric)
class GrowthMetricAdmin(admin.ModelAdmin):
    list_display = ('metric_name', 'company', 'metric_value', 'period')
    search_fields = ('metric_name', 'company__name')
