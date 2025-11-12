# Quick Start Guide

Get the SatyaNetra backend running in 5 minutes!

## Step 1: Setup Database (2 minutes)

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `backend/database/migration.sql`
4. Click "Run" to execute the migration

## Step 2: Configure Environment (1 minute)

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
- Get URL and keys from Supabase Dashboard > Settings > API

## Step 3: Install & Run (2 minutes)

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python run.py
```

Server will start at: **http://localhost:8000**

## Step 4: Test API

Open browser and visit:
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

Or use the test script:
```bash
./test_api.sh
```

## Next Steps

1. **Integrate with Frontend**: See [INTEGRATION.md](INTEGRATION.md)
2. **Create Test User**: Use `/docs` to create user via Swagger UI
3. **Test Endpoints**: Try text analysis with sample propaganda text

## Common Issues

**Port 8000 in use?**
```bash
# Change port in .env
API_PORT=8001
```

**CORS errors?**
```bash
# Add your frontend URL to .env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Import errors?**
```bash
# Install from project root
cd backend
pip install -r requirements.txt
```

## API Quick Reference

```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login (save the token)
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Analyze text (use token from login)
curl -X POST http://localhost:8000/analyze/text \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"text":"This is fake propaganda"}'

# Get network map
curl http://localhost:8000/network/map \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Development Tips

1. **Auto-reload enabled**: Code changes reload automatically
2. **Interactive docs**: Use `/docs` for testing endpoints
3. **View logs**: Check console for request/response logs
4. **Database viewer**: Use Supabase dashboard to view data

That's it! You're ready to integrate with your frontend.
