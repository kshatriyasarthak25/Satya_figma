from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from ..models.users import UserCreate, UserLogin, UserResponse, TokenResponse
from ..core.security import get_password_hash, verify_password, create_access_token
from ..core.database import get_supabase

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    """
    Register a new user.
    Creates user in Supabase and returns JWT token.
    """
    supabase = get_supabase()

    # Check if user already exists
    existing = supabase.table("users").select("*").eq("email", user_data.email).execute()
    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = get_password_hash(user_data.password)

    # Insert user into database
    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password_hash": hashed_password,
        "created_at": datetime.utcnow().isoformat()
    }

    result = supabase.table("users").insert(new_user).execute()

    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )

    created_user = result.data[0]

    # Create access token
    access_token = create_access_token(data={"sub": created_user["id"], "email": created_user["email"]})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=created_user["id"],
            name=created_user["name"],
            email=created_user["email"],
            created_at=created_user["created_at"]
        )
    )


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """
    Login with email and password.
    Returns JWT token on success.
    """
    supabase = get_supabase()

    # Find user by email
    result = supabase.table("users").select("*").eq("email", credentials.email).execute()

    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user = result.data[0]

    # Verify password
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create access token
    access_token = create_access_token(data={"sub": user["id"], "email": user["email"]})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
            created_at=user["created_at"]
        )
    )
