# 🚀 START HERE - Get Backend Running in 3 Minutes

## Prerequisites
- Python 3.9+ installed
- Supabase account created
- Node.js installed (for frontend)

## Step-by-Step Commands

### 1️⃣ Setup Database (1 minute)

```bash
# 1. Open Supabase Dashboard: https://app.supabase.com
# 2. Go to SQL Editor
# 3. Open: backend/database/migration.sql
# 4. Copy all content, paste in SQL Editor, click RUN
```

### 2️⃣ Configure Environment (30 seconds)

```bash
cd backend
cp .env.example .env

# Edit .env file with your Supabase credentials:
# - SUPABASE_URL (from Supabase Settings → API)
# - SUPABASE_ANON_KEY (from Supabase Settings → API)
# - SUPABASE_SERVICE_ROLE_KEY (from Supabase Settings → API)
# - JWT_SECRET_KEY (generate with: python -c "import secrets; print(secrets.token_urlsafe(32))")
```

### 3️⃣ Install & Run (1 minute)

```bash
# Still in backend/ directory

# Install dependencies
pip install -r requirements.txt

# Start server
python run.py
```

**Server running at: http://localhost:8000**

### 4️⃣ Verify It Works (30 seconds)

Open in browser or terminal:

```bash
# Health check
curl http://localhost:8000/health

# Or visit in browser:
# http://localhost:8000/docs
```

### 5️⃣ Test API (1 minute)

```bash
# Run automated tests
./test_api.sh
```

## 🎉 Success!

Your backend is now running!

**API Documentation**: http://localhost:8000/docs

**Next Steps**:
1. Keep backend running (don't close this terminal)
2. Open new terminal for frontend
3. See `INTEGRATION.md` to connect frontend

## Quick Commands

```bash
# Start backend
cd backend
python run.py

# Start frontend (in new terminal)
npm run dev

# Test API
cd backend
./test_api.sh

# View logs
# Check the terminal where python run.py is running
```

## Common Issues

**"Module not found"**
```bash
pip install -r requirements.txt
```

**"Port 8000 in use"**
```bash
# Change port in .env
API_PORT=8001
```

**"Database connection failed"**
```bash
# Check .env has correct Supabase credentials
# Verify migration.sql was executed in Supabase
```

## Need Help?

- 📖 Full Guide: `QUICKSTART.md`
- 🔧 Installation: `INSTALLATION.md`
- 🔌 Integration: `INTEGRATION.md`
- 📚 Documentation: `README.md`

---

**That's it! Your backend is ready to use.**
