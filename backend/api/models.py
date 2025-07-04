from django.db import models
from django.contrib.auth.models import User

# ---------- CATEGORY ----------
class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ---------- PRODUCT ----------
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    rating = models.FloatField(default=0.0)
    sizes = models.CharField(max_length=100, blank=True)  # Or use JSONField if storing list
    is_featured = models.BooleanField(default=False)
    is_offered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# ---------- PRODUCT IMAGE ----------
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image of {self.product.name}"


# ---------- USER PROFILE ----------
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_number = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.user.username


# ---------- PRODUCT REVIEW ----------
# class Review(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
#     content = models.TextField()
#     rating = models.IntegerField(default=5)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Review by {self.user.username} on {self.product.name}"
    


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)  # Optional
    content = models.TextField()
    rating = models.FloatField(default=0.0)
    image = models.ImageField(upload_to='review_images/', null=True, blank=True)  # ✅ Add this line
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username}"


# ---------- CART ----------
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"


# ---------- CART ITEM ----------
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def subtotal(self):
        return self.quantity * self.product.price

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


# ---------- STATIC IMAGE ----------
class StaticImage(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='static_images/')
    position = models.CharField(max_length=50, help_text="e.g., front_banner, footer_image")

    def __str__(self):
        return self.name
