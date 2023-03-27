import clientPromise from "@/lib/mongodb";
import { Suspense } from "react";

type ByCat = { key: string; count: number }[];

export default function Breakdown() {
  const byBand = getByBand();
  const byMode = getByMode();
  const byCallUsed = getByCallUsed();
  const byContinent = getByContinent();

  return (
    <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl md:grid-cols-2">
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">By mode</div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table columns={2} entries={byMode} />
        </Suspense>
      </div>
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">By band</div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table columns={3} entries={byBand} />
        </Suspense>
      </div>
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">
          By callsign used
        </div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table columns={1} entries={byCallUsed} />
        </Suspense>
      </div>
      <div className="m-auto">
        <div className="mb-2 text-center text-lg font-bold">By continent</div>
        <Suspense fallback={<SuspenseFallback />}>
          <Table columns={2} entries={byContinent} />
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
  entries: Promise<ByCat | null>;
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
  entries: Promise<ByCat | null>;
}) => JSX.Element;

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}

async function getByBand(): Promise<ByCat | null> {
  const units = ["mm", "cm", "m"];

  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toLower: "$data.BAND" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const byBand = res
      .map(({ _id, count }) => {
        const band = _id.toLowerCase();

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

    return byBand;
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getByMode(): Promise<ByCat | null> {
  const modesPriority = ["FT8", "SSB", "CW"];

  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toUpper: "$data.MODE" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const byMode = res
      .map(({ _id, count }) => {
        const mode = _id.toUpperCase();

        return { key: mode, count, priority: modesPriority.indexOf(mode) };
      })
      .sort((a, b) => {
        if (a.priority === -1 && b.priority === -1) {
          return b.count - a.count;
        }

        return b.priority - a.priority;
      });

    return byMode;
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getByCallUsed(): Promise<ByCat | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toUpper: "$data.STATION_CALLSIGN" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const byCallUsed = res
      .map(({ _id, count }) => {
        const call = _id.toUpperCase();

        return { key: call, count };
      })
      .filter((e) => e.key)
      .sort((a, b) => {
        return b.count - a.count;
      });

    return byCallUsed;
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getByContinent(): Promise<ByCat | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toUpper: "$data.CONT" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const byContinent = res
      .map(({ _id, count }) => {
        const continent = _id.toUpperCase();

        return { key: continent, count };
      })
      .filter((e) => e.key)
      .sort((a, b) => {
        return b.count - a.count;
      });

    return byContinent;
  } catch (e) {
    console.log(e);
  }

  return null;
}
