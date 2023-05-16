import clientPromise from '@/lib/mongodb';
import { Suspense } from 'react';

type ByCat = { key: string; count: number }[];

export default function Breakdown() {
  const cats = [
    { name: 'By mode', entries: getByMode(), columns: 2 },
    { name: 'By band', entries: getByBand(), columns: 3 },
    { name: 'By callsign used', entries: getByCallUsed(), columns: 1 },
    { name: 'By continent', entries: getByContinent(), columns: 2 },
  ];

  return (
    <div className="m-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      {cats.map(({ name, entries, columns }) => (
        <div
          key={name}
          className="flex flex-col overflow-hidden rounded bg-gradient-to-br from-white/5 to-white/10"
        >
          <div className="p-3 pb-2 text-center text-lg font-bold">{name}</div>
          <div className="flex-grow border-t border-t-gray-400 bg-white/5 p-4 pt-2">
            <Suspense fallback={<SuspenseFallback />}>
              <Table columns={columns} entries={entries} />
            </Suspense>
          </div>
        </div>
      ))}
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
    <div className="gap-4 text-center" style={{ columnCount: columns }}>
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
  const units = ['mm', 'cm', 'm'];

  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection('logentries')
      .aggregate([
        {
          $group: {
            _id: { $toLower: '$data.BAND' },
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
  const modesPriority = ['FT8', 'SSB', 'CW'];

  try {
    const client = await clientPromise;
    const db = client.db();

    const res = await db
      .collection('logentries')
      .aggregate([
        {
          $group: {
            _id: { $toUpper: '$data.MODE' },
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
      .collection('logentries')
      .aggregate([
        {
          $group: {
            _id: { $toUpper: '$data.STATION_CALLSIGN' },
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
      .collection('logentries')
      .aggregate([
        {
          $group: {
            _id: { $toUpper: '$data.CONT' },
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
