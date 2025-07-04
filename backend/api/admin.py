from django.contrib import admin
from .models import (
    Category, Product, ProductImage, UserProfile,
    Review, Cart, CartItem, StaticImage,
)

# ---------- Inline for Product Images ----------
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

# ---------- Product Admin ----------
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'quantity', 'rating', 'is_featured', 'is_offered']
    list_filter = ['is_featured', 'is_offered', 'category']
    search_fields = ['name', 'description']
    inlines = [ProductImageInline]

# ---------- Cart Item Inline ----------
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1

# ---------- Cart Admin ----------
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    inlines = [CartItemInline]

# ---------- Register Models ----------
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(UserProfile)
admin.site.register(Review)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem)
admin.site.register(StaticImage)
