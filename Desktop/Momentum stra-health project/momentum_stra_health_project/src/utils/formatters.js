export function formatDate(date, locale = navigator.language) {
  try {
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(date));
  } catch {
    return String(date);
  }
}

export function formatCurrency(amount, currency = 'USD', locale = navigator.language) {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  } catch {
    return String(amount);
  }
}
