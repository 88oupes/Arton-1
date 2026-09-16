interface LogoProps {
  variant?: 'dark' | 'light' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', className = '', size = 'md' }: LogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-[#121c24]' : 'text-white';
  const subColor = isDark ? 'text-[#64748B]' : 'text-slate-200';
  const strokeColor = isDark ? '#121c24' : '#ffffff';

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const tagSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9.5px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.28em]',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Sleep Curve / Mattress Layer Wave Symbol */}
      <svg
        viewBox="0 0 44 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0 transition-transform duration-300 hover:scale-105`}
      >
        <path
          d="M3 13C8 8.5 15 8.5 20 13C25 17.5 32 17.5 37 13"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M6 19C10 15.5 16 15.5 20 19C24 22.5 30 22.5 34 19"
          stroke={strokeColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M9 25C12 22.5 17 22.5 20 25C23 27.5 28 27.5 31 25"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-tight leading-none ${textColor} ${textSizes[size]}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          Dormi<span className="font-bold">Lux</span>
        </span>
        <span
          className={`font-medium uppercase leading-tight pt-0.5 ${subColor} ${tagSizes[size]}`}
        >
          Bien plus qu'un matelas
        </span>
      </div>
    </div>
  );
}
