export function formatDateID(dateString: string): string {
  try {
    const date = new Date(`${dateString}T00:00:00`);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}
