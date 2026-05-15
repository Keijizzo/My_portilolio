from django.core.management.base import BaseCommand

from api.models import Profile, Project, Skill


class Command(BaseCommand):
    help = "Seed sample portfolio data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--if-empty",
            action="store_true",
            help="Only seed when no profile exists (safe for deploy builds).",
        )

    def handle(self, *args, **options):
        if options["if_empty"] and Profile.objects.exists():
            self.stdout.write(self.style.WARNING("Profile already exists — skipping seed."))
            return

        Profile.objects.all().delete()
        Skill.objects.all().delete()
        Project.objects.all().delete()

        Profile.objects.create(
            name="Hamis Kamugisha",
            title="Data Scientist",
            bio=(
                "Data Scientist and 3rd-year student at the Eastern Africa Statistical Training Centre (EASTC). "
                "I combine statistics, monitoring & evaluation, and finance with modern data science to deliver "
                "insights for health, development, and business. Experienced in Python, analytics dashboards, "
                "and full-stack cloud applications."
            ),
        )

        skills = [
            ("Python", 90),
            ("R", 85),
            ("SQL", 88),
            ("Machine Learning", 86),
            ("Statistics", 92),
            ("Data Visualization", 88),
            ("M&E / Impact Evaluation", 90),
            ("Financial Analysis", 84),
            ("Pandas & NumPy", 89),
            ("Power BI / Tableau", 82),
            ("Django REST", 76),
            ("React", 74),
            ("Stata", 80),
            ("Research Methods", 87),
            ("Cloud Deployment", 72),
        ]
        Skill.objects.bulk_create([Skill(name=n, level=l) for n, l in skills])

        projects = [
            {
                "title": "Health Indicators Dashboard",
                "description": "Analytics dashboard for health programme indicators with filters by region and time period.",
                "tech_stack": "Python, Pandas, Plotly, SQL",
                "link": "https://github.com",
            },
            {
                "title": "M&E Results Framework Tool",
                "description": "Tool to track outputs, outcomes, and indicators aligned with logical framework approaches.",
                "tech_stack": "Excel, R, Power BI, M&E",
                "link": "https://github.com",
            },
            {
                "title": "Portfolio Cloud API",
                "description": "Full-stack portfolio with React frontend and Django REST API deployed on Vercel and Render.",
                "tech_stack": "React, Django, Tailwind, Vercel, Render",
                "link": "https://github.com",
            },
        ]
        Project.objects.bulk_create([Project(**p) for p in projects])

        self.stdout.write(self.style.SUCCESS("Portfolio data seeded successfully."))
