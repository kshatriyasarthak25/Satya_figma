# Frontend Integration Guide

This guide shows how to integrate the SatyaNetra backend API with your existing React/Next.js frontend.

## API Base URL

Development: `http://localhost:8000`
Production: Update to your deployed API URL

## Authentication Flow

### 1. Create API Client (React Hook)

Create `src/hooks/useApi.ts`:

```typescript
import { useState } from 'react';

const API_BASE_URL = 'http://localhost:8000';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Signup failed');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  return { signup, login, logout, getAuthHeaders, loading, error };
}
```

### 2. Update LoginPage Component

Update `src/components/LoginPage.tsx`:

```typescript
import { useState } from 'react';
import { useApi } from '../hooks/useApi';

export function LoginPage({ onLogin, onNavigate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useApi();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      onLogin(); // Navigate to dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signup(name, email, password);
      onLogin(); // Navigate to dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add error display in your JSX
  return (
    // ... existing JSX
    {error && <div className="text-red-400">{error}</div>}
    // ... rest of your form
  );
}
```

## Text Analysis Integration

### Create Analysis Hook

Create `src/hooks/useAnalysis.ts`:

```typescript
import { useState } from 'react';

const API_BASE_URL = 'http://localhost:8000';

export function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (text: string) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${API_BASE_URL}/analyze/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeMeme = async (file: File) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze/meme`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Meme analysis failed');
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeText, analyzeMeme, loading, error };
}
```

### Update AnalysisPage Component

Update `src/components/AnalysisPage.tsx`:

```typescript
import { useAnalysis } from '../hooks/useAnalysis';

export function AnalysisPage({ onNavigate, onLogout }) {
  const [textInput, setTextInput] = useState('');
  const { analyzeText, analyzeMeme, loading } = useAnalysis();
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!textInput.trim()) return;

    try {
      const analysisResult = await analyzeText(textInput);
      setResult(analysisResult);
      // Use analysisResult.score, analysisResult.label, etc.
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const analysisResult = await analyzeMeme(file);
      setResult(analysisResult);
      // Use analysisResult.score, analysisResult.label, etc.
    } catch (error) {
      console.error('Meme analysis failed:', error);
    }
  };

  // Rest of your component...
}
```

## Network Map Integration

### Create Network Hook

Create `src/hooks/useNetwork.ts`:

```typescript
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8000';

export function useNetwork() {
  const [networkData, setNetworkData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNetworkMap = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${API_BASE_URL}/network/map`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch network data');
      }

      const data = await response.json();
      setNetworkData(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchNetworkStats = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${API_BASE_URL}/network/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      return await response.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { networkData, fetchNetworkMap, fetchNetworkStats, loading, error };
}
```

### Update NetworkPage Component

Update `src/components/NetworkPage.tsx`:

```typescript
import { useEffect } from 'react';
import { useNetwork } from '../hooks/useNetwork';

export function NetworkPage({ onNavigate, onLogout }) {
  const { networkData, fetchNetworkMap, loading } = useNetwork();

  useEffect(() => {
    fetchNetworkMap();
  }, []);

  // Use networkData.nodes and networkData.edges for visualization
  // Example:
  if (loading) return <div>Loading network data...</div>;

  if (networkData) {
    console.log('Nodes:', networkData.nodes);
    console.log('Edges:', networkData.edges);
    console.log('Clusters:', networkData.clusters);
    // Render your network visualization
  }

  // Rest of your component...
}
```

## Protected Routes

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      onNavigate('login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return children;
}
```

## Error Handling

All API calls should handle these common errors:

```typescript
try {
  // API call
} catch (error) {
  if (error.message.includes('401')) {
    // Token expired or invalid
    localStorage.removeItem('access_token');
    onNavigate('login');
  } else {
    // Show error to user
    console.error(error.message);
  }
}
```

## Complete Integration Checklist

- [ ] Install backend dependencies and run migration
- [ ] Create useApi hook for authentication
- [ ] Update LoginPage to use real API
- [ ] Create useAnalysis hook for text/meme analysis
- [ ] Update AnalysisPage to use real API
- [ ] Create useNetwork hook for network data
- [ ] Update NetworkPage to use real API
- [ ] Add ProtectedRoute component
- [ ] Add error handling for expired tokens
- [ ] Test all API endpoints
- [ ] Update CORS_ORIGINS in backend .env if needed

## Testing

Use the browser console to verify API calls:
```javascript
// Check stored token
console.log(localStorage.getItem('access_token'));

// Test API call
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log);
```
