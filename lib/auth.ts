import jwt from 'jsonwebtoken';

interface JwtPayload {
  user_id?: string;
  userId?: string;
  secretKey?: string;
}

export function getUserFromToken(): { userId: string; secretKey: string } | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Get the refresh_token cookie
  const cookies = document.cookie.split(';');
  const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('refresh_token='));
  
  if (!refreshTokenCookie) {
    return null;
  }

  const token = refreshTokenCookie.split('=')[1].trim();
  
  try {
    const payload = jwt.decode(token) as JwtPayload;
    const userId = payload?.user_id || payload?.userId;
    const secretKey = payload?.secretKey || 'default-secret-key'; // Fallback if not in token
    
    if (!userId) {
      return null;
    }

    return { userId, secretKey };
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
