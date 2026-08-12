export function safeSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn(`Failed to save to localStorage for key: ${key}`);
  }
}

export function safeGet(key: string, fallback: string = ""): string {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : fallback;
    }
  } catch (error) {
    console.warn(`Failed to read from localStorage for key: ${key}`);
  }
  return fallback;
}

export function safeSetSession(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn(`Failed to save to sessionStorage for key: ${key}`);
  }
}

export function safeGetSession(key: string, fallback: string = ""): string {
  try {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item !== null ? item : fallback;
    }
  } catch (error) {
    console.warn(`Failed to read from sessionStorage for key: ${key}`);
  }
  return fallback;
}
