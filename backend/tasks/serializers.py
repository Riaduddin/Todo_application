from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model (for registration)."""
    # We make password write-only for security
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # Fields to include in the serialized output/input
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        # Extra constraints (e.g., making email required for registration)
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False},
            'first_name': {'required': False, 'allow_blank': True},
            'last_name': {'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        """
        Handle user creation with password hashing.
        """
        # Pop the password from the validated data
        password = validated_data.pop('password')
        # Create the user instance without the plain password
        user = User(**validated_data)
        # Set the password correctly using Django's built-in method
        user.set_password(password)
        # Save the user to the database
        user.save()
        return user

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task model."""
    # Make the user field read-only in the API output,
    # as it will be set automatically based on the logged-in user.
    # We display the username for better readability.
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        # Include all relevant fields for task management
        fields = ('id', 'user', 'title', 'description', 'completed', 'created_at', 'updated_at', 'due_date')
        # Optionally make some fields read-only if they shouldn't be updated directly via API
        # read_only_fields = ('created_at', 'updated_at', 'user')
