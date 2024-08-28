import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

type ByCat = { key: string; count: number }[];

export default function Breakdown() {
  const cats = [
    { name: 'By Mode', entries: getByMode(), columns: 2 },
    { name: 'By Band', entries: getByBand(), columns: 3 },
    { name: 'By Callsign Used', entries: getByCallUsed(), columns: 2 },
    { name: 'By Continent', entries: getByContinent(), columns: 2 },
  ];

  return (
    <div className="m-4 grid grid-cols-1 gap-6 md:grid-cols-2">
      {cats.map(({ name, entries, columns }) => (
        <div
          key={name}
          className="flex flex-col overflow-hidden rounded bg-gradient-to-br from-white/5 to-white/10"
        >
          <div className="p-3 py-2 text-center text-lg">{name}</div>
          <div className="flex-grow border-t border-t-white/10 bg-white/5 p-4 pt-2">
            <Suspense fallback={<SuspenseFallback />}>
              <Table columns={columns} entries={entries} />
            </Suspense>
          </div>
        </div>
      ))}
    </div>
  );
}

async function Table({
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
        <div key={key} className="flex gap-3 text-right [&>*]:flex-1">
          <span className="font-semibold">{key}</span>
          <span className="text-left">{count}</span>
        </div>
      ))}
    </div>
  ) : (
    <SuspenseFallback />
  );
}

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}

async function getByBand(): Promise<ByCat | null> {
  const units = ['mm', 'cm', 'm'];

  try {
    const res = await supabase.from('qso_band_summary').select('*');

    const byBand = res
      .data!.map(({ band, qso_count }) => {
        band = band!.toLowerCase();

        // Split to number and unit
        const [number, unit] = band.split(/(\d+)/).filter(Boolean);

        return {
          key: band,
          count: qso_count!,
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
    const res = await supabase.from('qso_mode_summary').select('*');

    const byMode = res
      .data!.map(({ mode, qso_count }) => {
        mode = mode!.toUpperCase();

        return {
          key: mode,
          count: qso_count!,
          priority: modesPriority.indexOf(mode),
        };
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
    const res = await supabase.from('qso_call_summary').select('*');

    const byCallUsed = res
      .data!.map(({ call, qso_count }) => {
        call = call!.toUpperCase();

        return { key: call, count: qso_count! };
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
    const res = await supabase.from('qso_cont_summary').select('*');
    const byContinent = res
      .data!.filter(({ cont }) => cont)
      .map(({ cont, qso_count }) => {
        const continent = cont?.toUpperCase() ?? '?';

        return { key: continent, count: qso_count! };
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
