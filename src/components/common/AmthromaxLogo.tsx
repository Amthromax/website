import React from "react";

interface AmthromaxLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AmthromaxLogo: React.FC<AmthromaxLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-[14px]",
    md: "text-[18px]",
    lg: "text-[22px]",
    xl: "text-[28px]",
  };

  return (
    <span
      className={`font-nevan font-black tracking-[0.24em] uppercase select-none transition-all duration-200 text-gray-900 dark:text-white ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "'Nevan', 'Outfit', 'Inter', system-ui, sans-serif" }}
    >
      <span className="inline-block hover:scale-[1.02] transition-transform duration-200">
        &#581;MTHROM&#581;X
      </span>
    </span>
  );
};

export default AmthromaxLogo;
