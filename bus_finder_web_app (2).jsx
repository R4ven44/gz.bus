import { useMemo, useState } from "react";

const DAY_OPTIONS = [
  { value: "mon", label: "Poniedziałek" },
  { value: "weekday", label: "Wtorek–Piątek" },
  { value: "sat", label: "Sobota" },
  { value: "sun", label: "Niedziela" },
  { value: "holiday", label: "Święto" },
];

const STOPS = [
  { name: "KRZESZOWICE D.A", offset: 0 },
  { name: "KRZESZOWICE RONDO JP II", offset: 2 },
  { name: "KRZESZOWICE WYKI CENTRUM", offset: 3 },
  { name: "KRZESZOWICE WIADUKT", offset: 5 },
  { name: "NAWOJOWA GÓRA GWOZDZIEC", offset: 6 },
  { name: "NAWOJOWA GÓRA ZAGRODY", offset: 7 },
  { name: "NAWOJOWA GÓRA PISARSKA", offset: 8 },
  { name: "MŁYNKA DOLNA", offset: 9 },
  { name: "RUDAWA MŁYN", offset: 10 },
  { name: "RUDAWA STADION", offset: 11 },
  { name: "RUDAWA PKP", offset: 12 },
  { name: "RUDAWA RYNEK", offset: 13 },
  { name: "RUDAWA SZKOŁA", offset: 15 },
  { name: "PISARY MLECZNA", offset: 16 },
  { name: "PISARY AKACJOWA", offset: 17 },
  { name: "PISARY DWÓR", offset: 18 },
  { name: "PISARY SPACEROWA", offset: 19 },
  { name: "PISARY KASZTANOWA", offset: 20 },
  { name: "PISARY DĄBRÓWKI", offset: 21 },
  { name: "RADWANOWICE PĘTLA", offset: 24 },
  { name: "RADWANOWICE KRZESZOWICKA", offset: 26 },
  { name: "RUDAWA 21 LIPCA", offset: 27 },
  { name: "RUDAWA RYNEK 2", offset: 29 },
  { name: "RUDAWA PRZYMIARKI", offset: 30 },
  { name: "NIEGOSZOWICE REMIZA", offset: 32 },
  { name: "RUDAWA GRANICA POWIATOWA", offset: 33 },
  { name: "BRZEZINKA SKRZYŻOWANIE", offset: 34 },
  { name: "BRZEZINKA KOŚCIÓŁ", offset: 35 },
  { name: "BRZEZINKA ZARZECZE", offset: 36 },
  { name: "WIĘCKOWICE REMIZA OSP", offset: 38 },
  { name: "WIĘCKOWICE DOM POMOCY", offset: 39 },
  { name: "WIĘCKOWICE II", offset: 40 },
  { name: "KOBYLANY KWIATOWA", offset: 41 },
  { name: "KARNIOWICE PĘTLA", offset: 43 },
  { name: "KARNIOWICE GÓRKI", offset: 44 },
  { name: "BOLECHOWICE CENTRUM", offset: 45 },
  { name: "BOLECHOWICE DROGI", offset: 46 },
  { name: "BOLECHOWICE KRZEWINY", offset: 47 },
  { name: "BOLECHOWICE ZIELONA", offset: 49 },
  { name: "ZABIERZÓW MŁYN", offset: 50 },
];

const MON = ["04:10","05:00","06:05","07:00","07:55","08:50","10:10","11:00","11:50","12:40","13:30","14:25","15:20","16:25","17:20","18:40","19:30","20:20","21:10","22:00"];
const WEEKDAY = ["05:50","07:00","07:50","08:50","09:50","11:40","12:40","13:40","14:40","15:40","17:15","18:30","19:45","21:00"];
const SAT = ["07:50","08:50","09:50","11:40","14:40","15:40","17:15","18:30","21:00"];
const SUN = SAT;
const HOLIDAY = SAT;

function toMin(t) {
  const [a, b] = t.split(":").map(Number);
  return a * 60 + b;
}

function toTime(m) {
  m = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function build(orig) {
  return STOPS.reduce((acc, s) => {
    acc[s.name] = orig.map((o) => toTime(toMin(o) + s.offset));
    return acc;
  }, {});
}

const DATA = {
  mon: build(MON),
  weekday: build(WEEKDAY),
  sat: build(SAT),
  sun: build(SUN),
  holiday: build(HOLIDAY),
};

function dayLabel(v) {
  return DAY_OPTIONS.find((d) => d.value === v)?.label ?? v;
}

function getTimes(stop, day) {
  return DATA[day]?.[stop] || [];
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s6-4.35 6-10a6 6 0 0 0-12 0c0 5.65 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function TimeCard({ label, value, active = false, muted = false }) {
  return (
    <div
      className={
        `rounded-2xl border p-3 transition ` +
        (active
          ? "border-blue-500/30 bg-blue-500/10"
          : muted
            ? "border-zinc-800 bg-zinc-950/60 opacity-60"
            : "border-zinc-800 bg-zinc-950/80")
      }
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

export default function App() {
  const [from, setFrom] = useState(STOPS[0].name);
  const [to, setTo] = useState(STOPS[STOPS.length - 1].name);
  const [day, setDay] = useState("weekday");
  const [time, setTime] = useState("10:15");
  const [search, setSearch] = useState(false);

  const result = useMemo(() => {
    if (!search) return null;

    const fromMeta = STOPS.find((s) => s.name === from);
    const toMeta = STOPS.find((s) => s.name === to);
    if (!fromMeta || !toMeta) return null;

    const timesFrom = getTimes(from, day);
    const now = toMin(time);
    const prevTimes = timesFrom.filter((t) => toMin(t) <= now);
    const nextTimes = timesFrom.filter((t) => toMin(t) > now);

    const previous = prevTimes.length ? prevTimes[prevTimes.length - 1] : null;

    if (!nextTimes.length) {
      return {
        previous,
        upcoming: [],
        next: null,
      };
    }

    const travel = toMeta.offset - fromMeta.offset;
    const upcoming = nextTimes.slice(0, 5).map((depart) => ({
      depart,
      arrival: toTime(toMin(depart) + travel),
      duration: travel,
    }));

    return {
      previous,
      upcoming,
      next: upcoming[0],
    };
  }, [from, to, day, time, search]);

  const stopOptions = [...new Set(STOPS.map((s) => s.name))];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 lg:px-6">
        <header className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400">gmina zabierzów</div>
            <h1 className="text-lg font-semibold text-zinc-50">Rozkład linii GZ3</h1>
          </div>
          <div className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-sm text-zinc-300">GZ3</div>
        </header>

        <main className="grid flex-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl shadow-black/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-zinc-400">Wyszukiwanie połączenia</div>
                <div className="text-2xl font-semibold text-zinc-50">Sprawdź trasę</div>
              </div>
              <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 ring-1 ring-blue-500/30">
                GZ3 ZABIERZÓW
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <LocationIcon />
                  Skąd
                </div>
                <select
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setSearch(false);
                  }}
                >
                  {stopOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <LocationIcon />
                  Dokąd
                </div>
                <select
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setSearch(false);
                  }}
                >
                  {stopOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <ClockIcon />
                  Dzień
                </div>
                <select
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                    setSearch(false);
                  }}
                >
                  {DAY_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <SearchIcon />
                  Godzina wyjazdu
                </div>
                <input
                  type="time"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    setSearch(false);
                  }}
                />
              </label>

              <button
                onClick={() => setSearch(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 active:bg-blue-700"
              >
                <SearchIcon />
                Szukaj połączenia
              </button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <TimeCard label="Skąd" value={from} />
              <TimeCard label="Dokąd" value={to} />
              <TimeCard label="Dzień" value={dayLabel(day)} />
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-4 shadow-xl shadow-black/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-zinc-400">Wynik wyszukiwania</div>
                <div className="text-2xl font-semibold text-zinc-50">Najbliższe kursy</div>
              </div>
              <div className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-zinc-300 ring-1 ring-zinc-700">
                {search && result ? `${result.upcoming.length} kursów` : "—"}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4">
              {!search ? (
                <div className="flex min-h-[180px] items-center justify-center text-center text-zinc-400">
                  Wybierz przystanek początkowy, końcowy, dzień i godzinę, a pokażę najbliższe połączenie.
                </div>
              ) : result?.next ? (
                <>
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-blue-300">Najbliższy odjazd</div>
                      <div className="mt-1 text-4xl font-semibold text-white">{result.next.depart}</div>
                      <div className="mt-2 text-sm text-zinc-300">
                        z <span className="font-medium text-zinc-100">{from}</span> do <span className="font-medium text-zinc-100">{to}</span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Przyjazd</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-100">{result.next.arrival}</div>
                      </div>
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Czas podróży</div>
                        <div className="mt-1 text-2xl font-semibold text-zinc-100">{result.next.duration} min</div>
                      </div>
                    </div>
                  </div>

                  {result.previous && (
                    <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3 opacity-60">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Odjechał</div>
                      <div className="mt-1 text-lg font-semibold text-zinc-200">{result.previous}</div>
                    </div>
                  )}

                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    <div className="mb-3 text-sm font-medium text-zinc-400">Następne kursy</div>
                    <div className="space-y-2">
                      {result.upcoming.slice(0, 5).map((course, index) => (
                        <div
                          key={`${course.depart}-${index}`}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${index === 0 ? "border-blue-500/25 bg-blue-500/10" : "border-zinc-800 bg-zinc-900"}`}
                        >
                          <div>
                            <div className="text-sm text-zinc-400">Odjazd</div>
                            <div className="text-xl font-semibold text-zinc-100">{course.depart}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-zinc-400">Przyjazd</div>
                            <div className="text-xl font-semibold text-zinc-100">{course.arrival}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
                  <div className="text-2xl font-semibold text-zinc-100">Brak późniejszych kursów</div>
                  <div className="mt-2 max-w-md text-sm text-zinc-400">
                    W wybranym dniu po podanej godzinie nie ma już odjazdu z tego przystanku.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-400">
              Kursy prezentowane są po wskazanej godzinie. Jeden wcześniejszy kurs pozostaje widoczny jako przyciemniony, aby łatwo odróżnić go od odjazdu aktualnego.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
