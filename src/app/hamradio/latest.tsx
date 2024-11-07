import Qso from '@/interfaces/qso';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

export default function Latest() {
  const latest = getLatest();

  return (
    <div className="p-4">
      <Suspense fallback={'Loading...'}>
        <QsoTable qsosP={latest} />
      </Suspense>
    </div>
  );
}

async function QsoTable({ qsosP }: { qsosP: Promise<Qso[] | null> }) {
  const qsos = await qsosP;
  const hideClass = ' hidden sm:table-cell';

  return (
    <table className="w-full table-auto overflow-hidden rounded bg-gradient-to-br from-white/5 to-white/10 text-left shadow-2xl">
      <thead className="border-b border-b-gray-400 text-sm">
        <tr className="[&>*]:px-4 [&>*]:py-2">
          <th className={hideClass}>Date</th>
          <th>Callsign</th>
          <th>Band</th>
          <th>Mode</th>
        </tr>
      </thead>
      <tbody className="bg-white/5">
        {qsos ? (
          qsos.map((qso) => (
            <tr
              key={qso.date + qso.callsign}
              className="border-t border-t-white/10 [&>*]:px-4 [&>*]:py-1"
            >
              <td className={hideClass}>{qso.date}</td>
              <td>{qso.callsign}</td>
              <td>{qso.band}</td>
              <td>{qso.mode}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-2 text-center">
              No QSOs found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

async function getLatest(): Promise<Qso[] | null> {
  try {
    const latest = await supabase
      .from('qso')
      .select('*')
      .order('datetime', { ascending: false })
      .limit(10);

    return latest.data!.map((qso) => {
      const d = new Date(qso.datetime).toISOString().substring(0, 10);

      return {
        callsign: qso.call,
        band: qso.band ?? '',
        mode: qso.mode,
        date: d,
      };
    });
  } catch (error) {
    console.log(error);
  }

  return null;
}
