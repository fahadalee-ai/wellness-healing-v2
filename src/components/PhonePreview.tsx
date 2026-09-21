import { useEffect, useState } from "react";

function appSrc() {
  return "/";
}

export function PhonePreview() {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid-bg flex min-h-dvh items-center justify-center overflow-hidden bg-[#0b0b0c] p-4">
      <div className="relative aspect-[9/19.5] h-[min(86vh,700px)] w-[min(92vw,340px)]">
        <div className="absolute inset-0 rounded-[42px] bg-black ring-1 ring-white/15" />
        <div className="absolute inset-[10px] overflow-hidden rounded-[34px] bg-[#141312]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[13px] font-semibold text-[#F5F3EF]">
            <span>{time}</span>
            <span className="absolute left-1/2 top-2 h-6 w-[88px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1.5 text-[#F5F3EF]" aria-hidden>
              <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="7" width="3" height="5" rx="0.5" />
                <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
                <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 3.2c1.7 0 3.2.7 4.3 1.8l1.3-1.3A7.4 7.4 0 0 0 8 1.4 7.4 7.4 0 0 0 2.4 3.7L3.7 5A6 6 0 0 1 8 3.2Z" />
                <path d="M8 6.2c.9 0 1.8.4 2.4 1l1.3-1.3A5 5 0 0 0 8 4.6 5 5 0 0 0 4.3 5.9L5.6 7.2A3.4 3.4 0 0 1 8 6.2Z" />
                <circle cx="8" cy="10.2" r="1.2" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="1.5" width="21" height="9" rx="2" stroke="currentColor" opacity="0.45" />
                <rect x="2" y="3" width="18" height="6" rx="1" fill="currentColor" />
                <path d="M23 4.5v3a1.2 1.2 0 0 0 0-3Z" fill="currentColor" opacity="0.55" />
              </svg>
            </span>
          </div>
          <iframe
            title="Wellness & Healing SF"
            src={appSrc()}
            className="h-full w-full border-0 bg-[#141312]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center">
            <span className="h-1 w-28 rounded-full bg-[#F5F3EF]/55" />
          </div>
        </div>
      </div>
      <style>{`
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 34px 34px;
        }
      `}</style>
    </div>
  );
}
