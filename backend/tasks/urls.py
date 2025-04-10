from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserCreate, CurrentUserView, UpdateProfileView, ChangePasswordView # Import CurrentUserView

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task') # Using basename='task'

# The API URLs are now determined automatically by the router.
# Additionally, we include the user registration URL.
urlpatterns = [
    path('', include(router.urls)), # Includes /tasks/ and /tasks/{id}/
    path('register/', UserCreate.as_view(), name='user_register'),
    path('users/me/', CurrentUserView.as_view(), name='current_user'), # Add path for current user
    path('users/me/update/', UpdateProfileView.as_view(), name='update_profile'),
    path('users/me/password/', ChangePasswordView.as_view(), name='change_password'),
]
