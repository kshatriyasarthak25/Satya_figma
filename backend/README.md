# SatyaNetra Backend API

Real-time misinformation detection platform backend built with FastAPI and Supabase.

## Features

- JWT-based authentication (signup/login)
- Text content analysis for propaganda/misinformation detection
- Meme/image analysis for harmful content
- Bot network visualization data (graph nodes and edges)
- Analysis history logging
- RESTful API with automatic documentation

## Tech Stack

- **Framework**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT tokens with bcrypt password hashing
- **AI/ML**: Placeholder classifiers (ready for IndicBERT integration)
- **Image Processing**: Pillow

## Project Structure

```
backend/
├── src/
│   ├── api/              # API route handlers
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── analyze_text.py   # Text analysis
│   │   ├── analyze_meme.py   # Image/meme analysis
│   │   └── network_map.py    # Network graph data
│   ├── core/             # Core functionality
│   │   ├── config.py     # Configuration management
│   │   ├── security.py   # JWT and password handling
│   │   └── database.py   # Supabase client
│   ├── models/           # Pydantic data models
│   │   ├── users.py
│   │   ├── analysis_logs.py
│   │   └── alerts.py
│   ├── services/         # Business logic
│   │   ├── text_classifier.py    # Text analysis service
│   │   ├── meme_classifier.py    # Image analysis service
│   │   └── network_graph.py      # Network graph generation
│   └── main.py           # FastAPI application
├── database/
│   └── migration.sql     # Database schema
├── tests/                # Unit tests (to be implemented)
├── requirements.txt      # Python dependencies
├── run.py               # Application runner
├── .env.example         # Environment variables template
├── INSTALLATION.md      # Setup instructions
├── INTEGRATION.md       # Frontend integration guide
└── README.md            # This file
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login and get JWT token

### Analysis
- `POST /analyze/text` - Analyze text content (requires auth)
- `POST /analyze/meme` - Analyze uploaded image (requires auth)

### Network
- `GET /network/map` - Get bot network graph data (requires auth)
- `GET /network/stats` - Get network statistics (requires auth)

### Health
- `GET /` - Service status
- `GET /health` - Detailed health check

## Quick Start

1. **Install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Setup database**:
   - Run `database/migration.sql` in your Supabase SQL editor

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Run server**:
   ```bash
   python run.py
   ```

5. **Access API docs**: http://localhost:8000/docs

## Documentation

- [Installation Guide](INSTALLATION.md) - Detailed setup instructions
- [Integration Guide](INTEGRATION.md) - Frontend integration examples
- [API Documentation](http://localhost:8000/docs) - Interactive API docs (when running)

## Database Schema

### users
- Stores user accounts with bcrypt hashed passwords
- Email is unique identifier

### analysis_logs
- Records all text and meme analyses
- Links to user who performed analysis
- Stores input data and results

### alerts
- System-wide alerts for detected threats
- Severity levels: critical, high, medium, low

All tables have Row Level Security (RLS) enabled for data protection.

## AI/ML Integration

Current implementation uses placeholder classifiers that return mock scores. To integrate real models:

1. **Text Analysis** (`src/services/text_classifier.py`):
   - Replace with IndicBERT or similar model
   - Add model loading in `__init__`
   - Update `analyze()` method with real inference

2. **Image Analysis** (`src/services/meme_classifier.py`):
   - Add CNN model for harmful meme detection
   - Implement OCR for text extraction from images
   - Update `analyze()` method with model inference

3. **Network Analysis** (`src/services/network_graph.py`):
   - Connect to Neo4j graph database
   - Implement real bot detection algorithms
   - Query actual social media data

## Security

- Passwords hashed with bcrypt
- JWT tokens for stateless authentication
- Row Level Security (RLS) on all database tables
- CORS configured for frontend access
- Service role key used only in backend
- Input validation on all endpoints

## Future Enhancements

- Real-time WebSocket updates for live monitoring
- Advanced analytics and reporting
- Multi-language support
- Model confidence scores
- Batch analysis endpoints
- Rate limiting
- Redis caching
- Logging and monitoring integration
- Unit and integration tests

## Support

For issues or questions:
1. Check [INSTALLATION.md](INSTALLATION.md) for setup problems
2. Check [INTEGRATION.md](INTEGRATION.md) for frontend integration
3. Review API docs at `/docs` endpoint
4. Check Supabase dashboard for database issues

## License

This project is part of the SatyaNetra misinformation detection platform.
