from django.urls import path
from .views import VoiceAssistantAPIView

urlpatterns = [
    path('voice/', VoiceAssistantAPIView.as_view(), name='voice'),
]
