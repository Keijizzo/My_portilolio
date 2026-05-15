from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, Profile, Project, Skill
from .serializers import (
    ContactMessageSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
)


def api_root(request):
    return JsonResponse(
        {
            "message": "Portfolio API is running.",
            "endpoints": {
                "profile": "/api/profile/",
                "skills": "/api/skills/",
                "projects": "/api/projects/",
                "contact": "/api/contact/ (POST)",
                "admin": "/admin/",
            },
            "frontend": "Run the React app at http://localhost:5173 (not this port).",
        }
    )


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response(
                {"detail": "No profile found. Run: python manage.py seed_portfolio"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(ProfileSerializer(profile).data)


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
