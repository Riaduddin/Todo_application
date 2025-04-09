from django.db import models
from django.contrib.auth.models import User # Import the standard User model

# Create your models here.
class Task(models.Model):
    """
    Represents a single task item in the To-Do list.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True) # Optional description
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(blank=True, null=True) # Optional due date

    # Optional: Add tags later if needed (e.g., ManyToManyField)
    # tags = models.ManyToManyField('Tag', blank=True)

    def __str__(self):
        """String representation of the Task model."""
        return f"{self.title} (User: {self.user.username})"

    class Meta:
        ordering = ['completed', '-created_at'] # Default ordering: incomplete first, then by creation date descending
