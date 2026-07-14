export function fmtPrice(n) {
  if (n == null || isNaN(n)) return "-";
  if (n >= 1) return "$" + n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 0.01) return "$" + n.toFixed(4);
  return "$" + n.toFixed(8).replace(/0+$/, "");
}

export function fmtNum(n) {
  if (n == null || isNaN(n)) return "-";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K";
  return "$" + n.toFixed(2);
}

export function fmtPct(n) {
  if (n == null || isNaN(n)) return "-";
  const sign = n >= 0 ? "+" : "";
  return sign + n.toFixed(2) + "%";
}
