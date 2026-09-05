interface HeroPatternProps {
  className?: string;
}

export function HeroPattern({ className }: HeroPatternProps) {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <pattern
          id="heroPattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g fill="currentColor">
            <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#heroPattern)" />
    </svg>
  );
}
