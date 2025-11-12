# SatyaNetra Backend - Installation Guide

## Prerequisites

- Python 3.9 or higher
- Supabase account with project created
- pip package manager

## Step 1: Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database/migration.sql`
4. Execute the migration to create tables

## Step 2: Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (keep secret!)

3. Generate a secure JWT secret:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   Add this to `JWT_SECRET_KEY` in `.env`

## Step 3: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or using virtual environment (recommended):
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Step 4: Run the Server

```bash
python run.py
```

The API will be available at: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Step 5: Test the API

### Health Check
```bash
curl http://localhost:8000/health
```

### Create Test User
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "SecurePass123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "SecurePass123"}'
```

Save the `access_token` from the response.

### Analyze Text
```bash
curl -X POST http://localhost:8000/analyze/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"text": "This is potentially fake news and propaganda"}'
```

### Get Network Map
```bash
curl http://localhost:8000/network/map \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Troubleshooting

### Port Already in Use
Change `API_PORT` in `.env` to a different port (e.g., 8001)

### CORS Issues
Add your frontend URL to `CORS_ORIGINS` in `.env`:
```
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174
```

### Database Connection Issues
- Verify Supabase credentials are correct
- Check that migration has been run
- Ensure RLS policies are enabled

## Production Deployment

For production deployment:

1. Set `JWT_SECRET_KEY` to a strong, unique value
2. Update `CORS_ORIGINS` to your production frontend domain
3. Use a process manager like `gunicorn` or `supervisor`
4. Enable HTTPS
5. Set up proper logging and monitoring

Example production command:
```bash
gunicorn src.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
