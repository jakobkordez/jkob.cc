export interface Position {
  lat: number;
  lon: number;
}

export interface PolarPosition {
  distance: number;
  bearing: number;
}

export const gridsquareRe = /^[A-R]{2}(\d\d([A-X]{2})?)*$/i;

export function fromGridsquare(value: string): Position {
  value = value.toUpperCase();
  if (!gridsquareRe.test(value)) {
    throw new Error("Invalid gridsquare");
  }

  let lon = -180.0;
  let lat = -90.0;

  lon += 20.0 * (value.charCodeAt(0) - 65);
  lat += 10.0 * (value.charCodeAt(1) - 65);

  let div = 1.0;

  for (let i = 2; i < value.length; i += 2) {
    const chOffset = i % 4 === 0 ? 65 : 48;

    lon += ((value.charCodeAt(i) - chOffset) * 2) / div;
    lat += (value.charCodeAt(i + 1) - chOffset) / div;

    div *= i % 4 === 0 ? 10 : 24;
  }

  return { lat, lon };
}

export function toPolarPosition(from: Position, to: Position): PolarPosition {
  const lat1 = (from.lat * Math.PI) / 180;
  const lon1 = (from.lon * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const lon2 = (to.lon * Math.PI) / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const distance = 6371000 * c;
  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  return { distance, bearing };
}
