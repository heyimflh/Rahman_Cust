import { useState, useCallback, useRef } from "react";

/**
 * Returns a pool that randomizes items without repeating until exhausted, 
 * then reshuffles. Useful for Gacha and Catch game.
 */
export function useShuffledPool<T>(initialItems: T[]) {
  const poolRef = useRef<T[]>([]);
  
  const shuffle = useCallback((array: T[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  }, []);

  const getNext = useCallback((): T | null => {
    if (initialItems.length === 0) return null;
    
    if (poolRef.current.length === 0) {
      poolRef.current = shuffle(initialItems);
    }
    
    // Pop the last item
    return poolRef.current.pop() || null;
  }, [initialItems, shuffle]);

  return { getNext };
}
