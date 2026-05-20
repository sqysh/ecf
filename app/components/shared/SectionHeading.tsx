interface SectionHeadingProps {
  label: string
  heading: string
  highlight?: string
  className?: string
}

export default function SectionHeading({ label, heading, highlight, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${className} mb-6`}>
      <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark block mb-3">
        {label}
      </span>
      <h2 className="font-kanit text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        {heading} <br />
        {highlight && (
          <span className="bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      <div className="h-1 w-20 bg-primary-light dark:bg-primary-dark" />
    </div>
  )
}
