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
          <div className="mb-1 text-lg">Rarest DXCC</div>
          <Suspense fallback={<SuspenseFallback />}>
            <ValueWithSub
              promise={statsP.then((s) =>
                s
                  ? {
                      value: s.mostWanted.callsign,
                      sub: `#${s.mostWanted.wanted} most wanted`,
                    }
                  : undefined
              )}
            />
          </Suspense>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">Furthest QSO</div>
          <Suspense fallback={<SuspenseFallback />}>
            <ValueWithSub
              promise={statsP.then((s) => {
                const furthest = s?.furthest;
                if (!furthest) return undefined;

                const d = Math.round(furthest.distance / 1000).toLocaleString();

                return {
                  value: `${d} km`,
                  sub: furthest.gridsquare,
                };
              })}
            />
          </Suspense>
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

  return value ? (
    <div className="text-4xl font-medium">{value}</div>
  ) : (
    <SuspenseFallback />
  );
} as unknown as ({
  promise,
}: {
  promise: Promise<number | undefined>;
}) => JSX.Element;

const ValueWithSub = async function ValueWithSub({
  promise,
}: {
  promise: Promise<{ value: string; sub: string } | undefined>;
}) {
  const value = await promise;

  return value ? (
    <>
      <div className="text-4xl font-medium">{value.value}</div>
      <div>{value.sub}</div>
    </>
  ) : (
    <SuspenseFallback />
  );
} as unknown as ({
  promise,
}: {
  promise: Promise<{ value: string; sub: string } | undefined>;
}) => JSX.Element;

function SuspenseFallback() {
  return <div className="text-center text-4xl font-medium">-</div>;
}
