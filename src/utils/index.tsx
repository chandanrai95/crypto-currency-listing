export function formatPrice(value: number, currency: string = 'USD') {
  let formattedValue;

  if (value >= 1000000000000) {
    formattedValue = (value / 1000000000000).toFixed(2) + 'T';
  } else if (value >= 1000000000) {
    formattedValue = (value / 1000000000).toFixed(2) + 'B';
  } else if (value >= 1000000) {
    formattedValue = (value / 1000000).toFixed(2) + 'M';
  } else if (value >= 1000) {
    formattedValue = (value / 1000).toFixed(2) + 'K';
  } else {
    formattedValue = value;
  }

  return `${formattedValue} ${currency}`;
}

export function formatDate(dateStr: string | undefined) {
  try {
    const opt: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      second: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    const date = new Date(dateStr).toLocaleDateString('en-US', opt);
    return date
  } catch (err) {
    return ''
  }
}