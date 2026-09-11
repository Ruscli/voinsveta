import type { ReactNode } from "react";

export type IconName =
  | "strength"
  | "focus"
  | "discipline"
  | "confidence"
  | "coordination"
  | "team"
  | "stance"
  | "forms"
  | "weapon"
  | "duilian"
  | "acrobatics"
  | "breath"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "check"
  | "chevron"
  | "menu"
  | "close"
  | "arrow"
  | "spark"
  | "medal"
  | "send"
  | "shield"
  | "chat"
  | "flame";

const PATHS: Record<IconName, ReactNode> = {
  strength: <path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8" />,
  focus: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="0.4" fill="currentColor" />
    </>
  ),
  discipline: (
    <>
      <path d="M3 8.2C5.6 6 8.6 5 12 5s6.4 1 9 3.2" />
      <path d="M5.5 8.5V19M18.5 8.5V19" />
      <path d="M4 13h16" />
    </>
  ),
  confidence: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
    </>
  ),
  coordination: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 9" />
      <circle cx="12" cy="7.5" r="0.4" fill="currentColor" />
      <circle cx="12" cy="16.5" r="0.4" fill="currentColor" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.6-5 5.5-5s5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16.2 14.3c2.4.4 4 2 4.4 4.2" />
    </>
  ),
  stance: (
    <path d="M12 3l7 2.8v5.4c0 4.9-3.4 7.9-7 9.8-3.6-1.9-7-4.9-7-9.8V5.8L12 3z" />
  ),
  forms: (
    <>
      <path d="M5 6l6 6-6 6" />
      <path d="M12 6l6 6-6 6" />
    </>
  ),
  weapon: (
    <>
      <path d="M5 19L16.5 7.5" />
      <path d="M16.5 7.5L20 4l-1 4-2.5-.5z" fill="currentColor" stroke="none" />
      <path d="M6.5 13.5c1.8.4 3.6 2.2 4 4" />
    </>
  ),
  duilian: (
    <>
      <path d="M4 9h12" />
      <path d="m13 5 4 4-4 4" />
      <path d="M20 15H8" />
      <path d="m9 11-4 4 4 4" />
    </>
  ),
  acrobatics: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 3v4.5h-4.5" />
    </>
  ),
  breath: (
    <>
      <path d="M3 8h9.5a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 12h13.5a2.5 2.5 0 1 1-2.5 2.5" />
      <path d="M3 16h6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  check: <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  spark: (
    <path d="M12 3l1.8 5.7L19.5 10.5l-5.7 1.8L12 18l-1.8-5.7L4.5 10.5l5.7-1.8L12 3z" />
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9.5 13.2-2 7.3 4.5-2.4 4.5 2.4-2-7.3" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
      <path d="M22 2 11 13" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.6v5.6c0 4.6-3 7.6-7 9.8-4-2.2-7-5.2-7-9.8V5.6L12 3z" />
      <path d="m9 11.6 2.2 2.2 4.3-4.3" />
    </>
  ),
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  flame: (
    <path d="M12 3c.8 3 4 4.6 4 8.2A4.2 4.2 0 0 1 12 15a4.2 4.2 0 0 1-4-3.8C8 9.5 9 8.4 10 7.2c.2 1 .7 1.6 1.4 2C11.6 7 12 5.2 12 3z" />
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
