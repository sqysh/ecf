export function CardBrand({ brand }: { brand: string }) {
  const upper = brand.toUpperCase()
  const colors: Record<string, string> = {
    VISA: 'text-blue-700 dark:text-blue-400',
    MASTERCARD: 'text-orange-700 dark:text-orange-400',
    AMEX: 'text-sky-700 dark:text-sky-400',
    DISCOVER: 'text-amber-700 dark:text-amber-400'
  }
  return (
    <span
      className={`font-mono text-[9px] font-bold tracking-widest ${
        colors[upper] ?? 'text-text-light/75 dark:text-text-dark/70'
      }`}
    >
      {upper}
    </span>
  )
}
