// formate currency helper
export function formatCurrency(amount, currency = 'EGP', locale = 'en-EG') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}