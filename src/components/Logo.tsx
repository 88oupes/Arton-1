export const ARTON_LOGO_URL = 'https://res.cloudinary.com/psbqhe7h/image/upload/v1790081363/Logo_ArtonConfort.png';
export const ARTON_LOGO_LOCAL_URL = '/assets/arton-confort-logo.png';
export const ARTON_LOGO_WHITE_URL = '/assets/arton-confort-logo-white.png';

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
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 sm:h-9 max-h-9 w-auto',
    md: 'h-10 sm:h-12 max-h-12 w-auto',
    lg: 'h-12 sm:h-14 max-h-14 w-auto',
    xl: 'h-16 sm:h-20 max-h-20 w-auto',
  };

  const isWhite = variant === 'white';
  const logoSrc = isWhite ? ARTON_LOGO_WHITE_URL : ARTON_LOGO_URL;

  return (
    <div
      className={`inline-flex items-center select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="ARTON CONFORT"
      role="img"
    >
      <img
        src={logoSrc}
        alt="ARTON CONFORT — Literie & Matelas d'Exception"
        width={390}
        height={115}
        onError={(e) => {
          // Graceful fallback to local asset if Cloudinary has network restriction
          const target = e.currentTarget;
          if (target.src !== ARTON_LOGO_LOCAL_URL) {
            target.src = isWhite ? ARTON_LOGO_WHITE_URL : ARTON_LOGO_LOCAL_URL;
          }
        }}
        className={`${sizeClasses[size]} object-contain drop-shadow-xs`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
