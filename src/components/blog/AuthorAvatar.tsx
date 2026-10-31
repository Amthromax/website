import React from "react";

/** Posts credited to the company itself, rather than to a named person. */
export const isHouseAuthor = (name: string) =>
  name.trim().toLowerCase().startsWith("amthromax");

/**
 * The mark, sized to sit inside a byline circle. The asset is
 * dark-on-transparent, so it is inverted onto a dark circle and left alone
 * once the circle turns white in dark mode.
 */
export const HouseMark: React.FC<{ className?: string }> = ({ className = "w-[62%] h-[62%]" }) => (
  <img
    src="/images/amthromax_asterisk_logo.png"
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    className={`${className} object-contain invert dark:invert-0`}
  />
);

interface AuthorAvatarProps {
  name: string;
  initial: string;
  className?: string;
}

/**
 * The circle beside a byline. Posts credited to Amthromax itself carry the
 * mark rather than an initial; a named person still gets their letter.
 */
const AuthorAvatar: React.FC<AuthorAvatarProps> = ({ name, initial, className = "w-8 h-8" }) => {
  return (
    <div
      className={`${className} shrink-0 rounded-full bg-[#1d1d1f] text-white dark:bg-white dark:text-black font-semibold text-xs flex items-center justify-center border border-[#e5e5e7] dark:border-white/10 shadow-xs overflow-hidden`}
    >
      {isHouseAuthor(name) ? <HouseMark /> : initial}
    </div>
  );
};

export default AuthorAvatar;
