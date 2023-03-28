import Qso from "@/interfaces/qso";
import clientPromise from "@/lib/mongodb";
import { Suspense } from "react";

export default function Latest() {
  const latest = getLatest();

  return (
    <div className="p-4">
      <Suspense fallback={<Fallback text="Loading..." />}>
        <QsoTable qsosP={latest} />
      </Suspense>
    </div>
  );
}

const QsoTable = async function QsoTable({
  qsosP,
}: {
  qsosP: Promise<Qso[] | null>;
}) {
  const qsos = await qsosP;

  return (
    <table className="w-full table-auto overflow-hidden rounded bg-gradient-to-br from-white/5 to-white/10 text-left shadow-2xl">
      <thead className="border-b border-b-gray-400">
        <tr>
          <th className="p-4 pb-2">Date</th>
          <th className="p-4 pb-2">Time</th>
          <th className="p-4 pb-2">Callsign</th>
          <th className="p-4 pb-2">Frequency</th>
          <th className="p-4 pb-2">Mode</th>
        </tr>
      </thead>
      <tbody className="bg-white/5">
        {qsos ? (
          qsos.map((qso, i) => {
            let className = "px-4 py-1";
            if (i !== 0) className += " border-t border-t-gray-700";

            return (
              <tr key={qso.date + qso.time + qso.callsign}>
                <td className={className}>{qso.date}</td>
                <td className={className}>{qso.time}</td>
                <td className={className}>{qso.callsign}</td>
                <td className={className}>{qso.frequency}</td>
                <td className={className}>{qso.mode}</td>
              </tr>
            );
          })
        ) : (
          <Fallback text="No QSOs found" />
        )}
      </tbody>
    </table>
  );
} as unknown as ({ qsosP }: { qsosP: Promise<Qso[] | null> }) => JSX.Element;

async function getLatest(): Promise<Qso[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const latest = await db
      .collection("logentries")
      .find()
      .sort({ datetime_on: -1, _id: -1 })
      .limit(10)
      .toArray();

    return latest.map((qso) => {
      const d = qso.data.QSO_DATE;
      const f = qso.data.FREQ;

      return {
        callsign: qso.data.CALL.toUpperCase(),
        frequency: f.substring(0, f.indexOf(".") + 4),
        mode: qso.data.MODE.toUpperCase(),
        date:
          d.substring(0, 4) + "-" + d.substring(4, 6) + "-" + d.substring(6, 8),
        time: qso.data.TIME_ON.substring(0, 4),
      };
    });
  } catch (error) {
    console.log(error);
  }

  return null;
}

function Fallback({ text }: { text: string }) {
  return (
    <tr>
      <td colSpan={5} className="px-4 py-2 text-center">
        {text}
      </td>
    </tr>
  );
}
