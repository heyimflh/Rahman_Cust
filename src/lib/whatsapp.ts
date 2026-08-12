import { profile } from "@/data/profile";

export function buildWhatsAppUrl(message: string): string {
  if (!profile.whatsappNumber) {
    return "";
  }
  
  // Basic validation/formatting to ensure only numbers are used
  let cleanNumber = profile.whatsappNumber.replace(/\D/g, '');
  if (!cleanNumber) return "";
  
  if (cleanNumber.startsWith("0")) {
    cleanNumber = "62" + cleanNumber.slice(1);
  }
  
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Failed to copy text: ", err);
    return false;
  }
}
