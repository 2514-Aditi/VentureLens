from django.urls import path
from .views import (
    CompanyListView,
    CompanyDetailView,
    CompanyFinancialsView,
    CompanyFundingView,
    CompanyInvestorsView,
    CompanyNewsView,
    CompanySourcesView,
    CompanyCompareView,
    CompanySearchView
)

urlpatterns = [
    path('companies/', CompanyListView.as_view(), name='company-list'),
    path('companies/<slug:slug>/', CompanyDetailView.as_view(), name='company-detail'),
    path('companies/<slug:slug>/financials/', CompanyFinancialsView.as_view(), name='company-financials'),
    path('companies/<slug:slug>/funding/', CompanyFundingView.as_view(), name='company-funding'),
    path('companies/<slug:slug>/investors/', CompanyInvestorsView.as_view(), name='company-investors'),
    path('companies/<slug:slug>/news/', CompanyNewsView.as_view(), name='company-news'),
    path('companies/<slug:slug>/sources/', CompanySourcesView.as_view(), name='company-sources'),
    path('compare/', CompanyCompareView.as_view(), name='company-compare'),
    path('search/', CompanySearchView.as_view(), name='company-search'),
]
