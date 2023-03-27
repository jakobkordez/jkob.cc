import { QsoStats } from "@/interfaces/qso_stats";
import { Suspense } from "react";

export default function Breakdown({
  statsP,
}: {
  statsP: Promise<QsoStats | null>;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl md:grid-cols-2">
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">By mode</div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table
            columns={2}
            entries={statsP.then((s) => (s ? prepareModes(s.byMode) : null))}
          />
        </Suspense>
      </div>
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">By band</div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table
            columns={3}
            entries={statsP.then((s) => (s ? prepareBands(s.byBand) : null))}
          />
        </Suspense>
      </div>
    </div>
  );
}

const Table = async function Table({
  columns,
  entries,
}: {
  columns: number;
  entries: Promise<{ key: string; count: number }[] | null>;
}) {
  const ent = await entries;

  return ent ? (
    <div className="gap-8" style={{ columnCount: columns }}>
      {ent.map(({ key, count }) => (
        <div key={key}>
          {key} - {count}
        </div>
      ))}
    </div>
  ) : (
    <SuspenseFallback />
  );
} as unknown as ({
  columns,
  entries,
}: {
  columns: number;
  entries: Promise<{ key: string; count: number }[] | null>;
}) => JSX.Element;

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}

function prepareBands(bands: {
  [key: string]: number;
}): { key: string; count: number }[] {
  const units = ["mm", "cm", "m"];

  return Object.entries(bands)
    .map(([band, count]) => {
      band = band.toLowerCase();

      // Split to number and unit
      const [number, unit] = band.split(/(\d+)/).filter(Boolean);

      return {
        key: band,
        count,
        number: parseInt(number),
        unit: units.indexOf(unit),
      };
    })
    .sort((a, b) => {
      if (a.unit !== b.unit) {
        return b.unit - a.unit;
      }

      return b.number - a.number;
    });
}

function prepareModes(modes: {
  [key: string]: number;
}): { key: string; count: number }[] {
  const modesPriority = ["FT8", "SSB", "CW"];

  return Object.entries(modes)
    .map(([mode, count]) => {
      mode = mode.toUpperCase();

      return { key: mode, count, priority: modesPriority.indexOf(mode) };
    })
    .sort((a, b) => {
      if (a.priority === -1 && b.priority === -1) {
        return b.count - a.count;
      }

      return b.priority - a.priority;
    });
}
