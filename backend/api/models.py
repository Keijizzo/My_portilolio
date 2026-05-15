from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=120)
    title = models.CharField(max_length=120)
    bio = models.TextField()

    class Meta:
        verbose_name_plural = "profiles"

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=80)
    level = models.PositiveIntegerField(default=50)

    def __str__(self):
        return f"{self.name} ({self.level}%)"


class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.email}"
