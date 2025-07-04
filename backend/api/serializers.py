from rest_framework import serializers
from .models import Product, ProductImage, CartItem, Cart, Category, Review
import json
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    sizes = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity', 'rating', 'sizes',
                  'is_featured', 'is_offered', 'created_at', 'updated_at', 'images']
    
    def get_sizes(self, obj):

        try:
            return json.loads(obj.sizes)
        except:
            return []
        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id','user', 'items']


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields =['id', 'image', 'name']


            
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source = 'user.username', read_only=True)
    image_url = serializers.ImageField(source= 'image', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user_name', 'content', 'rating', 'image_url', 'created_at']
