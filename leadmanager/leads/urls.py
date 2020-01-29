from rest_framework import routers
from .api.api import LeadViewSet


router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls