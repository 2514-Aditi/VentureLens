from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    official_name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField()
    website = models.URLField(max_length=500)
    logo_url = models.CharField(max_length=500)
    founder = models.CharField(max_length=255)
    founded_year = models.IntegerField()
    headquarters = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    business_model = models.TextField()
    target_customers = models.TextField()
    services = models.JSONField(default=list)
    cities = models.JSONField(default=list)
    expansion_summary = models.TextField(blank=True)
    last_researched_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['name']

    def __str__(self):
        return self.name


class FinancialData(models.Model):
    company = models.OneToOneField(Company, on_delete=models.CASCADE, related_name='financials')
    total_funding_usd = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    total_funding_formatted = models.CharField(max_length=100)
    latest_round = models.CharField(max_length=100)
    latest_round_date = models.CharField(max_length=100)
    valuation_usd = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    valuation_formatted = models.CharField(max_length=100)
    revenue_formatted = models.CharField(max_length=100, default="Not Publicly Available")
    employee_count_formatted = models.CharField(max_length=100)
    active_professionals_formatted = models.CharField(max_length=255, blank=True)
    daily_bookings_formatted = models.CharField(max_length=255, blank=True)
    currency = models.CharField(max_length=10, default="USD")
    as_of_date = models.CharField(max_length=100)
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)

    def __str__(self):
        return f"Financials for {self.company.name}"


class FundingRound(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='funding_rounds')
    round_type = models.CharField(max_length=100)
    amount_usd = models.DecimalField(max_digits=15, decimal_places=2)
    amount_formatted = models.CharField(max_length=100)
    currency = models.CharField(max_length=10, default="USD")
    date = models.CharField(max_length=100)
    valuation_usd = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    valuation_formatted = models.CharField(max_length=100, null=True, blank=True)
    investors = models.JSONField(default=list)
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.company.name} - {self.round_type} ({self.date})"


class Investor(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='investors')
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, blank=True)
    investment_round = models.CharField(max_length=100)
    amount = models.CharField(max_length=100, null=True, blank=True)
    date = models.CharField(max_length=100)
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.name} ({self.company.name})"


class News(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='news')
    title = models.CharField(max_length=500)
    summary = models.TextField()
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)
    published_date = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "News"
        ordering = ['-id']

    def __str__(self):
        return f"{self.company.name}: {self.title[:50]}"


class Source(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='sources')
    field_name = models.CharField(max_length=255)
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)
    published_date = models.CharField(max_length=100, blank=True)
    accessed_date = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.company.name} - {self.field_name}"


class GrowthMetric(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='growth_metrics')
    metric_name = models.CharField(max_length=255)
    metric_value = models.CharField(max_length=255)
    period = models.CharField(max_length=100)
    source_name = models.CharField(max_length=255)
    source_url = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.company.name}: {self.metric_name}"
