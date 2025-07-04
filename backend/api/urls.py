from django.urls import path
from .views import (
    product_list, product_detail, related_products,
    get_cart, add_to_cart,login_user, register_user,
    logout_user,get_category, feature_products, latest_product,
    delete_cart_item,get_review, submit_review
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # for login
    TokenRefreshView,     # to refresh tokens
)

urlpatterns = [
    path('products/', product_list, name='product_list'),
    path('products/<int:pk>/', product_detail, name='product_detail'),
    path('products/<int:pk>/related/', related_products, name='related_products'),
    path('cart/', get_cart, name='get_cart'),
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('category/', get_category, name='category'),
    path('feature/', feature_products, name='feature'),
    path('latest/', latest_product, name='latest'),
    path('deletecartitem/<int:item_id>/', delete_cart_item, name='deletecartitem'),
    path('reviews/',get_review, name='reviews' ),
    path('submit_review/', submit_review, name='submit_review')
    
]