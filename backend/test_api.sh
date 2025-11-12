#!/bin/bash

# SatyaNetra API Test Script
# This script tests all major API endpoints

API_BASE="http://localhost:8000"
TOKEN=""

echo "==================================="
echo "SatyaNetra API Test Script"
echo "==================================="
echo ""

# Health check
echo "1. Testing health endpoint..."
curl -s "$API_BASE/health" | python -m json.tool
echo ""

# Signup
echo "2. Testing signup..."
SIGNUP_RESPONSE=$(curl -s -X POST "$API_BASE/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}')

echo "$SIGNUP_RESPONSE" | python -m json.tool

# Extract token
TOKEN=$(echo "$SIGNUP_RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin)['access_token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
    echo "Failed to get token from signup. Trying login..."
    
    # Login
    echo ""
    echo "3. Testing login..."
    LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/auth/login" \
      -H "Content-Type: application/json" \
      -d '{"email":"test@example.com","password":"TestPass123"}')
    
    echo "$LOGIN_RESPONSE" | python -m json.tool
    TOKEN=$(echo "$LOGIN_RESPONSE" | python -c "import sys, json; print(json.load(sys.stdin)['access_token'])" 2>/dev/null)
fi

if [ -z "$TOKEN" ]; then
    echo "Failed to obtain authentication token. Exiting."
    exit 1
fi

echo ""
echo "Token obtained: ${TOKEN:0:20}..."

# Text analysis
echo ""
echo "4. Testing text analysis..."
curl -s -X POST "$API_BASE/analyze/text" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"text":"This is fake news and propaganda spreading misinformation"}' | python -m json.tool

# Network map
echo ""
echo "5. Testing network map..."
curl -s "$API_BASE/network/map" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool | head -50

# Network stats
echo ""
echo "6. Testing network stats..."
curl -s "$API_BASE/network/stats" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

echo ""
echo "==================================="
echo "All tests completed!"
echo "==================================="
