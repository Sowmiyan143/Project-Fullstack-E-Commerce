from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, filters
from .models import Product, Cart, CartItem, Category, CartItem, Review
from .serializers import ProductSerializer, CartSerializer, RegisterSerializer, LoginSerializer, CategorySerializer, ReviewSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(['GET'])
@permission_classes([AllowAny])
def product_list(request):
    qs = Product.objects.filter(is_featured=False, is_offered=False)

    ordering = request.query_params.get('ordering')
    allowed = {'price', '-price', 'rating', '-rating', 'created_at', '-created_at', 'name', '-name'}
    if ordering in allowed:
        qs = qs.order_by(ordering)
    else:
        qs = qs.order_by('-created_at')

    paginator = PageNumberPagination()
    paginator.page_size=8
    result_page = paginator.paginate_queryset(qs, request)

    serializer = ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error':'Product not Found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET'])
def related_products(request,pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error':'Product not Found'}, status=status.HTTP_404_NOT_FOUND)
    related = Product.objects.filter(category=product.category).exclude(pk=pk)[:4]
    serializer = ProductSerializer(related, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity',1))

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    cart, _ = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += quantity
    else:
        item.quantity = quantity
    item.save()
    return Response({"message": "Item added to cart"})





@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id, cart__user=request.user)
        item.delete()
        return Response({"msg": "Item removed"}, status=204)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)



@api_view(['POST'])
def register_user(request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login_user(request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            return Response({"error": "password or name incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"msg": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"error": "Invalid refresh token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_category(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def feature_products(request):
    featured = Product.objects.filter(is_featured=True).order_by('-created_at')
    serializer = ProductSerializer(featured, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def latest_product(request):
    latest = Product.objects.filter(is_featured=False, is_offered=False).order_by('-created_at')[:8]
    serializer = ProductSerializer(latest, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_review(request):
    content = request.data.get('content')
    rating = request.data.get('rating')
    image = request.FILES.get('image')


    if not content or not rating:
        return Response({"msg": "Review submitted"}, status=201)
    
    review = Review.objects.create(
        user=  request.user,
        content=content,
        rating=rating,
        image=image
    )

    return Response({"msg": "Review submitted"}, status=201)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_review(request):
    review = Review.objects.all().order_by('-created_at')
    serializer = ReviewSerializer(review, many=True)
    return Response(serializer.data)


