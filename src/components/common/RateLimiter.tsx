import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
}

const RATE_LIMITS = {
  contact: { maxAttempts: 3, windowMs: 60000 }, // 3 attempts per minute
  newsletter: { maxAttempts: 2, windowMs: 30000 }, // 2 attempts per 30 seconds
  auth: { maxAttempts: 5, windowMs: 300000 }, // 5 attempts per 5 minutes
};

const rateLimitState: Record<string, RateLimitState> = {};

export const useRateLimit = (type: keyof typeof RATE_LIMITS) => {
  const [isBlocked, setIsBlocked] = useState(false);
  
  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const limit = RATE_LIMITS[type];
    const key = `${type}_${window.location.hostname}`;
    
    if (!rateLimitState[key]) {
      rateLimitState[key] = { attempts: 0, lastAttempt: 0, blocked: false };
    }
    
    const state = rateLimitState[key];
    
    // Reset if window has passed
    if (now - state.lastAttempt > limit.windowMs) {
      state.attempts = 0;
      state.blocked = false;
    }
    
    if (state.blocked || state.attempts >= limit.maxAttempts) {
      const remainingTime = Math.ceil((limit.windowMs - (now - state.lastAttempt)) / 1000);
      toast.error(`Too many attempts. Please wait ${remainingTime} seconds.`);
      setIsBlocked(true);
      state.blocked = true;
      return false;
    }
    
    state.attempts++;
    state.lastAttempt = now;
    setIsBlocked(false);
    return true;
  }, [type]);
  
  return { checkRateLimit, isBlocked };
};