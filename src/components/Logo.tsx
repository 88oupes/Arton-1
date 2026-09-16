interface LogoProps {
  variant?: 'dark' | 'light' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ variant = 'dark', className = '', size = 'md' }: LogoProps) {
  const isDark = variant === 'dark';
  
  // Color tokens from the real Arton Confort brand identity
  const navyColor = '#132B45';
  const goldColor = '#BA8C48';

  const sizeClasses = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-12 w-auto',
    lg: 'h-11 sm:h-14 md:h-16 w-auto',
    xl: 'h-16 sm:h-20 md:h-24 w-auto',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Arton Confort Vector Mark */}
      <svg
        viewBox="0 0 316 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} shrink-0 transition-transform duration-200 hover:opacity-95`}
        aria-label="Arton Confort"
        role="img"
      >
        <title>Arton Confort</title>

        {/* 1. Elegant Golden Comfort Wave / Mattress Contour Swoosh */}
        <path
          d="M 5 36 C 8 50, 24 76, 58 93 C 92 106, 136 88, 172 68 C 205 50, 248 58, 298 67 C 265 62, 218 56, 178 71 C 142 85, 96 100, 64 87 C 36 76, 20 54, 8 36 Z"
          fill={goldColor}
        />

        {/* 2. Navy Accent Smile Arc beneath the A and R letters */}
        <path
          d="M 43 69 C 55 76, 80 76, 96 68 C 82 74, 56 74, 43 69 Z"
          fill={navyColor}
        />

        {/* 3. ARTON Classic High-Contrast Serif Wordmark */}
        <text
          x="32"
          y="56"
          fill={navyColor}
          style={{
            fontFamily: "'Playfair Display', 'Bodoni Moda', 'Didot', 'Newsreader', Georgia, serif",
            fontWeight: 800,
            fontSize: '63px',
            letterSpacing: '0.035em',
          }}
        >
          ARTON
        </text>

        {/* 4. CONFORT Dynamic Italic Uppercase Subtitle */}
        <text
          x="166"
          y="86"
          fill={goldColor}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '20px',
            letterSpacing: '0.14em',
          }}
        >
          CONFORT
        </text>
      </svg>
    </div>
  );
}
