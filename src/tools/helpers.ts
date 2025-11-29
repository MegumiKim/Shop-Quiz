export function makeEquationString(amount: number, items: { price: number }[]) {
  const prices = items.map(i => i.price);
  const change = amount - prices.reduce((sum, p) => sum + p, 0);

  return `${[amount, ...prices].join(" - ")} = ${change}`;
}
