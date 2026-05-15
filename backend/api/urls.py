from django.urls import path

from .views import ContactCreateView, ProfileView, ProjectListView, SkillListView

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("skills/", SkillListView.as_view(), name="skills"),
    path("projects/", ProjectListView.as_view(), name="projects"),
    path("contact/", ContactCreateView.as_view(), name="contact"),
]
