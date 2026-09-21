import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";
import { daysInMonth, formatTime, isDateUnavailable, localTimezoneLabel, slotsForDate, todayIso } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function DatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (iso: string) => void;
}) {
  const today = todayIso();
  const initial = value ?? today;
  const [cursor, setCursor] = useState(() => {
    const [y, m] = initial.split("-").map(Number);
    return { year: y, month: m - 1 };
  });
  const [expanded, setExpanded] = useState(false);

  const days = useMemo(() => {
    const count = daysInMonth(cursor.year, cursor.month);
    return Array.from({ length: count }, (_, i) => {
      const day = i + 1;
      const iso = `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return { day, iso, unavailable: isDateUnavailable(iso) };
    });
  }, [cursor]);

  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <p className="text-xs text-muted-foreground">Times shown in your local timezone: {localTimezoneLabel()}</p>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() =>
            setCursor((c) => (c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }))
          }
          className="flex h-12 w-12 items-center justify-center border border-border"
        >
          <ChevronLeft size={16} />
        </button>
        <p className="font-display text-lg">{monthLabel}</p>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Expand calendar"
            onClick={() => setExpanded((e) => !e)}
            className="flex h-12 w-12 items-center justify-center border border-border"
          >
            <Maximize2 size={15} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setCursor((c) => (c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }))
            }
            className="flex h-12 w-12 items-center justify-center border border-border"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="mt-4">
          <div className="mb-2 grid grid-cols-7 text-center text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={`${d}-${i}`}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: new Date(cursor.year, cursor.month, 1).getDay() }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {days.map((d) => (
              <DayChip key={d.iso} {...d} selected={value === d.iso} onSelect={onChange} compact />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {days.map((d) => (
            <DayChip key={d.iso} {...d} selected={value === d.iso} onSelect={onChange} />
          ))}
        </div>
      )}
    </div>
  );
}

function DayChip({
  day,
  iso,
  unavailable,
  selected,
  onSelect,
  compact,
}: {
  day: number;
  iso: string;
  unavailable: boolean;
  selected: boolean;
  onSelect: (iso: string) => void;
  compact?: boolean;
}) {
  const weekday = new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={() => onSelect(iso)}
      className={cn(
        "border text-center transition-colors duration-200",
        compact ? "flex h-10 items-center justify-center text-sm" : "min-w-[4.2rem] px-3 py-3",
        unavailable && "border-transparent text-muted-foreground/40",
        !unavailable && !selected && "border-border text-foreground",
        selected && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {compact ? (
        day
      ) : (
        <>
          <span className="block text-[10px] uppercase tracking-[0.12em]">{weekday}</span>
          <span className="mt-1 block font-display text-lg">{day}</span>
        </>
      )}
    </button>
  );
}

const PERIODS = ["Morning", "Afternoon", "Evening"] as const;

export function TimeSlotPicker({
  date,
  value,
  durationMin = 50,
  onChange,
}: {
  date: string;
  value?: string;
  durationMin?: number;
  onChange: (time: string) => void;
}) {
  const slots = slotsForDate(date);
  return (
    <div className="space-y-6">
      {PERIODS.map((period) => {
        const group = slots.filter((s) => s.period === period);
        if (!group.length) return null;
        return (
          <div key={period}>
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{period}</p>
            <div className="grid grid-cols-2 gap-2">
              {group.map((slot) => {
                const selected = value === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => onChange(slot.time)}
                    className={cn(
                      "min-h-14 border px-3 py-2 text-left transition-colors duration-200",
                      !slot.available && "border-border bg-muted/40 text-muted-foreground/50",
                      slot.available && !selected && "border-primary/70 text-foreground",
                      selected && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    <span className="block text-sm">{formatTime(slot.time)}</span>
                    <span className={cn("block text-[11px]", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {durationMin} min
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
