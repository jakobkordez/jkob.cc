import { QsoStats } from "@/interfaces/qso_stats";
import { Suspense } from "react";

export default function Stats({
  statsP,
}: {
  statsP: Promise<QsoStats | null>;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 text-center shadow-2xl md:grid-cols-3">
        <div className="m-auto">
          <div className="mb-1 text-lg">QSOs</div>
          <Suspense fallback={<SuspenseFallback />}>
            <Value promise={statsP.then((s) => s?.total)} />
          </Suspense>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">DXCCs</div>
          <Suspense fallback={<SuspenseFallback />}>
            <Value promise={statsP.then((s) => s?.dxccs)} />
          </Suspense>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">Grid Squares</div>
          <Suspense fallback={<SuspenseFallback />}>
            <Value promise={statsP.then((s) => s?.gridsquares)} />
          </Suspense>
        </div>
      </div>

      {/* TODO: Dynamic */}
      <div className="mt-4 grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 text-center shadow-2xl md:grid-cols-2">
        <div className="m-auto">
          <div className="mb-1 text-lg">Most wanted prefix in logbook</div>
          <div className="text-4xl font-medium">3B7</div>
          <div>#54 most wanted</div>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">Furthest QSO</div>
          <div className="text-4xl font-medium">18,371 km</div>
          <div>RE78 FT8 20 W</div>
        </div>
      </div>

      {/* TODO: add more stats */}
    </>
  );
}

const Value = async function Value({
  promise,
}: {
  promise: Promise<number | undefined>;
}) {
  const value = await promise;

  return <div className="text-4xl font-medium">{value ?? "err"}</div>;
} as unknown as ({
  promise,
}: {
  promise: Promise<number | undefined>;
}) => JSX.Element;

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}
