import clientPromise from '@/lib/mongodb';
import { fromGridsquare, toPolarPosition } from '@/util/position';
import { Suspense } from 'react';

export default function Stats() {
  const total = getTotal();
  const dxccs = getDxccs();
  const gridsquares = getGridsquares();
  const rarest = dxccs.then((d) => (d ? getRarest(d) : null));
  const furthest = gridsquares.then((g) => (g ? getFurthest(g) : null));

  const firstRow = [
    { name: 'QSOs', value: total },
    { name: 'DXCCs', value: dxccs.then((d) => d?.length ?? null) },
    { name: 'Grid Squares', value: gridsquares.then((g) => g?.length ?? null) },
  ];

  const secondRow = [
    {
      name: 'Rarest DXCC',
      value: rarest.then((r) =>
        r
          ? {
              value: r.callsign,
              sub: `#${r.rank} most wanted`,
            }
          : null
      ),
    },
    {
      name: 'Furthest QSO',
      value: furthest.then((s) => {
        if (!s) return null;

        const d = Math.round(s.distance / 1000).toLocaleString();

        return {
          value: `${d} km`,
          sub: s.gridsquare,
        };
      }),
    },
  ];

  return (
    <>
      <div className="m-4 grid grid-cols-1 gap-4 text-center md:grid-cols-3">
        {firstRow.map(({ name, value }) => (
          <div
            key={name}
            className="rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl"
          >
            <div className="mb-1 text-lg">{name}</div>
            <Suspense fallback={<SuspenseFallback />}>
              <Value promise={value} />
            </Suspense>
          </div>
        ))}
      </div>

      <div className="m-4 grid grid-cols-1 gap-4 text-center md:grid-cols-2">
        {secondRow.map(({ name, value }) => (
          <div
            key={name}
            className="rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl"
          >
            <div className="mb-1 text-lg">{name}</div>
            <Suspense fallback={<SuspenseFallback />}>
              <ValueWithSub promise={value} />
            </Suspense>
          </div>
        ))}
      </div>

      {/* TODO: add more stats */}
    </>
  );
}

const Value = async function Value({
  promise,
}: {
  promise: Promise<number | null>;
}) {
  const value = await promise;

  return value ? (
    <div className="text-4xl font-medium">{value}</div>
  ) : (
    <SuspenseFallback />
  );
} as unknown as ({
  promise,
}: {
  promise: Promise<number | null>;
}) => JSX.Element;

const ValueWithSub = async function ValueWithSub({
  promise,
}: {
  promise: Promise<{ value: string; sub: string } | null>;
}) {
  const value = await promise;

  return value ? (
    <>
      <div className="text-4xl font-medium">{value.value}</div>
      <div className="mt-1">{value.sub}</div>
    </>
  ) : (
    <SuspenseFallback />
  );
} as unknown as ({
  promise,
}: {
  promise: Promise<{ value: string; sub: string } | null>;
}) => JSX.Element;

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}

async function getTotal(): Promise<number | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    return db.collection('logentries').countDocuments();
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getDxccs(): Promise<string[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    return db.collection('logentries').distinct('data.DXCC');
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getGridsquares(): Promise<string[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    return db
      .collection('logentries')
      .aggregate([
        {
          $group: {
            _id: { $toUpper: { $substr: ['$data.GRIDSQUARE', 0, 4] } },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()
      .then((e) => e.filter((g) => g._id.length === 4))
      .then((e) => e.map((g) => g._id));
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getRarest(
  dxccs: string[]
): Promise<{ callsign: string; rank: number } | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const mostWantedList = await getMostWanted();
    let mostWantedI = 999;
    for (const dxcc of dxccs) {
      const i = mostWantedList.indexOf(dxcc);
      if (i === -1) continue;
      if (i < mostWantedI) mostWantedI = i;
    }

    // Get full callsign for most wanted DXCC
    const callsign = await db
      .collection('logentries')
      .findOne({ 'data.DXCC': mostWantedList[mostWantedI] })
      .then((e) => e?.data.CALL);

    return {
      callsign,
      rank: mostWantedI + 1,
    };
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getFurthest(
  gridsquares: string[]
): Promise<{ gridsquare: string; distance: number } | null> {
  try {
    let furthestG = 'JN76';
    let furthest = 0;

    const from = fromGridsquare('JN76');
    for (const grid of gridsquares) {
      const { distance } = toPolarPosition(from, fromGridsquare(grid));
      if (distance > furthest) {
        furthest = distance;
        furthestG = grid;
      }
    }

    return { gridsquare: furthestG, distance: furthest };
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getMostWanted(): Promise<string[]> {
  const uri = 'https://clublog.org/mostwanted.php?api=1';

  return fetch(uri)
    .then((res) => res.json())
    .then((json) => Object.values(json));
}
