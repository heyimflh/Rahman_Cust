import { useEffect, RefObject } from "react";

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    
    const element = ref.current;
    
    // Save previously focused element to restore it later
    const previousFocus = document.activeElement as HTMLElement | null;
    
    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = element.querySelectorAll<HTMLElement>(focusableSelectors);
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (firstElement) {
      firstElement.focus();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus) {
        // use a small timeout to let modal close before restoring focus
        setTimeout(() => previousFocus.focus(), 10);
      }
    };
  }, [active, ref]);
}
