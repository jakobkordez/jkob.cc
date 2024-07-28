import { supabase } from '@/lib/supabase';
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
          : null,
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

async function Value({ promise }: { promise: Promise<number | null> }) {
  const value = await promise;

  return value ? (
    <div className="text-4xl font-medium">{value}</div>
  ) : (
    <SuspenseFallback />
  );
}

async function ValueWithSub({
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
}

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}

async function getTotal(): Promise<number | null> {
  try {
    const res = await supabase
      .from('qso')
      .select('*', { count: 'exact', head: true });
    return res.count;
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getDxccs(): Promise<number[] | null> {
  try {
    const res = await supabase.from('qso_dxcc_summary').select('*');
    return res
      .data!.filter((d) => d.dxcc !== null && d.dxcc > 0)
      .map((d) => d.dxcc!);
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getGridsquares(): Promise<string[] | null> {
  try {
    const res = await supabase.from('qso_grid_summary').select('*');
    return res.data!.map((d) => d.grid!);
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getRarest(
  dxccs: number[],
): Promise<{ callsign: string; rank: number } | null> {
  try {
    const mostWantedList = await getMostWanted();
    let mostWantedI = 999;
    for (const dxcc of dxccs) {
      const i = mostWantedList.indexOf(dxcc);
      if (i === -1) continue;
      if (i < mostWantedI) mostWantedI = i;
    }

    // Get full callsign for most wanted DXCC
    const res = await supabase
      .from('qso')
      .select('call')
      .eq('dxcc', mostWantedList[mostWantedI]);
    const callsign = res.data![0].call;

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
  gridsquares: string[],
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

async function getMostWanted(): Promise<number[]> {
  const uri = 'https://clublog.org/mostwanted.php?api=1';

  return fetch(uri)
    .then((res) => res.json())
    .then((json) => Object.values(json).map(Number));
}
