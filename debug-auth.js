// Debug script to check authentication
console.log("=== Authentication Debug ===");

// Check if we're in browser environment
if (typeof window !== 'undefined') {
  console.log("Running in browser environment");
  
  // Check all cookies
  console.log("All cookies:", document.cookie);
  
  // Check specifically for refresh_token
  const cookies = document.cookie.split(';');
  const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('refresh_token='));
  
  if (refreshTokenCookie) {
    console.log("Found refresh_token cookie:", refreshTokenCookie);
    const token = refreshTokenCookie.split('=')[1].trim();
    console.log("Token value:", token);
    
    // Try to decode it
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded token payload:", payload);
    } catch (e) {
      console.log("Failed to decode token:", e);
    }
  } else {
    console.log("No refresh_token cookie found");
    console.log("Available cookies:", cookies);
  }
} else {
  console.log("Not running in browser environment");
}
