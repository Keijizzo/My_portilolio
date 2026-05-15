from django.contrib import admin

from .models import ContactMessage, Profile, Project, Skill

admin.site.register(Profile)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(ContactMessage)
