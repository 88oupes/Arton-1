export const DARY_LOGO_URL = 'https://res.cloudinary.com/psbqhe7h/image/upload/v1789644319/Dari_logo.jpg';

interface LogoProps {
  variant?: 'primary' | 'white' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({
  variant = 'primary',
  className = '',
  size = 'md',
  showText = false,
}: LogoProps) {
  const sizeDimensions = {
    sm: {
      img: 'h-8 sm:h-9 w-auto max-w-[130px]',
      text: 'text-lg',
      sub: 'text-[9px]',
    },
    md: {
      img: 'h-11 sm:h-12 w-auto max-w-[160px]',
      text: 'text-xl sm:text-2xl',
      sub: 'text-[10px] sm:text-[11px]',
    },
    lg: {
      img: 'h-13 sm:h-15 w-auto max-w-[200px]',
      text: 'text-2xl sm:text-3xl',
      sub: 'text-xs',
    },
    xl: {
      img: 'h-16 sm:h-20 w-auto max-w-[250px]',
      text: 'text-3xl sm:text-4xl',
      sub: 'text-sm',
    },
  };

  const currentSize = sizeDimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official DARY Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={DARY_LOGO_URL}
          alt="DARY Logo"
          referrerPolicy="no-referrer"
          className={`${currentSize.img} object-contain rounded-lg drop-shadow-xs`}
          loading="eager"
        />
      </div>

      {/* Optional Brand Wordmark Side Text */}
      {showText && (
        <div className="hidden sm:flex flex-col justify-center">
          <span
            className={`font-serif font-bold tracking-wider leading-none text-[#723C90] ${currentSize.text}`}
          >
            DARY
          </span>
          <span
            className={`font-sans tracking-[0.22em] font-semibold text-[#542D6B]/80 uppercase mt-0.5 ${currentSize.sub}`}
          >
            Literie & Maison
          </span>
        </div>
      )}
    </div>
  );
}

