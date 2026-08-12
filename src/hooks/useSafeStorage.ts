import { useState, useCallback, useEffect } from "react";
import { safeGet, safeSet } from "@/lib/storage";

export function useSafeStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(initialValue);

  // Read from storage after hydration & listen for real-time cross-component updates
  useEffect(() => {
    const value = safeGet(key, initialValue);
    setStoredValue(value);

    const handleStorageUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ key: string; value: string }>;
      if (customEvent.detail && customEvent.detail.key === key) {
        setStoredValue(customEvent.detail.value);
      }
    };

    window.addEventListener("local-storage-update", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("local-storage-update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: string) => {
      setStoredValue(value);
      safeSet(key, value);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("local-storage-update", { detail: { key, value } })
        );
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
