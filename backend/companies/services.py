from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Company

class CompanyService:
    @staticmethod
    def list_all_companies():
        return Company.objects.prefetch_related('financials').all()

    @staticmethod
    def get_company_by_slug(slug: str) -> Company:
        return get_object_or_404(Company, slug=slug.lower().strip())

    @staticmethod
    def compare_companies(slug1: str, slug2: str):
        comp1 = get_object_or_404(Company, slug=slug1.lower().strip())
        comp2 = get_object_or_404(Company, slug=slug2.lower().strip())
        
        return {
            'company1': comp1,
            'company2': comp2
        }

    @staticmethod
    def search_companies(query: str):
        if not query or not query.strip():
            return Company.objects.all()
        
        q = query.strip()
        return Company.objects.filter(
            Q(name__icontains=q) |
            Q(founder__icontains=q) |
            Q(industry__icontains=q) |
            Q(description__icontains=q) |
            Q(business_model__icontains=q)
        ).distinct()
