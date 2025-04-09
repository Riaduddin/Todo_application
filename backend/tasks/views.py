from django.contrib.auth.models import User
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions, status # Import status
from rest_framework.response import Response # Import Response
from rest_framework.views import APIView # Import APIView
from .models import Task
from .serializers import TaskSerializer, UserSerializer

# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tasks to be viewed or edited.
    Provides list, create, retrieve, update, destroy actions.
    """
    serializer_class = TaskSerializer
    # Ensure only authenticated users can access this viewset
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the tasks
        for the currently authenticated user.
        """
        print(f"--- get_queryset ---") # DEBUGGING
        print(f"Request User: {self.request.user}") # DEBUGGING
        print(f"Request Auth: {self.request.auth}") # DEBUGGING
        # Filter tasks based on the logged-in user
        user = self.request.user
        if user.is_authenticated:
            return Task.objects.filter(user=user)
        else:
            # Should not happen due to IsAuthenticated permission, but good practice
            print("Warning: Unauthenticated user accessed get_queryset in TaskViewSet")
            return Task.objects.none()


    def perform_create(self, serializer):
        """
        Associate the task with the logged-in user upon creation.
        """
        print(f"--- perform_create ---") # DEBUGGING
        print(f"Request User: {self.request.user}") # DEBUGGING
        print(f"Request Auth: {self.request.auth}") # DEBUGGING
        # Automatically set the user field to the current user
        if self.request.user.is_authenticated:
             serializer.save(user=self.request.user)
        else:
             # Handle cases where user might not be authenticated if permissions change
             # This shouldn't happen with IsAuthenticated permission class
             print("Error: User not authenticated during perform_create")
             # Optionally raise an exception or handle appropriately
             pass # Avoid saving if user isn't authenticated

class UserCreate(generics.CreateAPIView):
    """
    API endpoint for user registration.
    Allows unauthenticated users to create a new account.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Allow any user (authenticated or not) to access this endpoint
    permission_classes = [permissions.AllowAny]

class CurrentUserView(APIView):
    """
    API endpoint to get the details of the currently authenticated user.
    """
    permission_classes = [permissions.IsAuthenticated] # Must be logged in

    def get(self, request):
        serializer = UserSerializer(request.user) # Serialize the current user
        return Response(serializer.data)
