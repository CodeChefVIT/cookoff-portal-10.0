"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TimerErrorToast() {
  useEffect(() => {
    // Check for timer error cookie
    const cookies = document.cookie.split(';');
    const timerErrorCookie = cookies.find(cookie => 
      cookie.trim().startsWith('timer-error=')
    );

    if (timerErrorCookie) {
      const message = decodeURIComponent(timerErrorCookie.split('=')[1]);
      toast.error(message);
      
      // Clear the cookie after showing the toast
      document.cookie = 'timer-error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }, []);

  return null; // This component doesn't render anything
}
