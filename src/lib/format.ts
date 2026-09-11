export function formatKg(value: number): string {
  if (value >= 100) {
    return value.toFixed(0);
  }
  if (value >= 10) {
    return value.toFixed(1);
  }
  return value.toFixed(2);
}

export function formatQuantity(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(value >= 10 ? 1 : 2);
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
