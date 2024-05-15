from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from django.shortcuts import render
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import login
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate



class SignupView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user_obj = User.objects.create(
                username=username,
                email=email,
                password=make_password(password)
            )
            print(f"User {user_obj} added successfully to the database")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenView(TokenObtainPairView):
    serializer_class = MyToken
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('access')

        access_token = AccessToken(token)
        access_token.set_exp(timezone.now() + timedelta(minutes=15))
        user_id = access_token.payload.get('user_id')
        user = User.objects.get(id=user_id)
        login(request, user)
        response.data['access_token_expires_at'] = access_token['exp']
        response.data['token_creation_time'] = access_token['iat']
        
        response.set_cookie('access_token', token, httponly=True)
        print("cookie created")
        return response


class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    



class user_edit(APIView):
    def put(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserEditSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class user_delete(APIView):
    def delete(self, request, user_id):
        print("userid",user_id)
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class UserDetailsView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

def user_logout(request, user_id):
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        print("token",refresh_token)
        if refresh_token:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Delete the refresh token from the client-side
            response = JsonResponse({'message': f'Logout successful for user with ID {user_id}'})
            response.delete_cookie('refresh_token')
            # Set JWT token to null
            response.set_cookie('access_token', '', httponly=True)
            return response
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

    return JsonResponse({'message': f'Logout successful for user with ID {user_id}'})

class ProfileView(APIView):
    def get(self, request, user_id):
        user_profile = get_object_or_404(User, id=user_id)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)




class AdminLogin(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Authenticate admin user
        user = authenticate(username=username, password=password)
        
        if user and user.is_superuser:
            # Generate token for admin user
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            token = serializer.validated_data

            # Add additional data to the token if needed
            token['username'] = user.username
            token['email'] = user.email

            return Response(token, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


def user_pro(req):
    user = User.objects.all()
    context = {
        "users": user
    }
    return render(req, 'index.html', context)


def edit_profile(req, id):
    print('id', id)
    pass




@api_view(['POST'])
def Profile_Edit(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        login(request, user)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileEditSerializer(instance=user, data=request.data)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)