const locales = { da: 'da-DK', en: 'en-GB', sv: 'sv-SE', no: 'nb-NO', de: 'de-DE', es: 'es-ES' };

export function formatPrice(amount, lang = 'da') {
  return new Intl.NumberFormat(locales[lang] || 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
