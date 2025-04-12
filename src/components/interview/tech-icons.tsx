import type { FC } from "react"

interface IconProps {
  className?: string
}

export const ReactIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M12 9a3 3 0 0 0 0 6" />
    <path d="M12 3c.64 0 1.27.08 1.88.23 1.93.47 3.6 1.9 4.62 3.93.31.62.5 1.28.6 1.94.11.67.1 1.35-.03 2.02-.12.68-.38 1.34-.73 1.94-1.03 2.03-2.7 3.46-4.62 3.93-.61.15-1.24.23-1.88.23-.64 0-1.27-.08-1.88-.23-1.93-.47-3.6-1.9-4.62-3.93-.31-.62-.5-1.28-.6-1.94-.11-.67-.1-1.35.03-2.02.12-.68.38-1.34.73-1.94 1.03-2.03 2.7-3.46 4.62-3.93C10.73 3.08 11.36 3 12 3z" />
    <path d="M4.93 19.07a9.96 9.96 0 0 1 0-14.14" />
    <path d="M19.07 19.07a9.96 9.96 0 0 0 0-14.14" />
  </svg>
)

export const NextJsIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 15V9l7.745 10.65A9 9 0 1 1 19 17.657" />
    <path d="M15 12V9" />
  </svg>
)

export const JavaScriptIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8v8" />
    <path d="M8 8v8" />
    <path d="M8 12h4" />
    <rect width="20" height="16" x="2" y="4" rx="2" />
  </svg>
)
