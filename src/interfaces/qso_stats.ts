export interface QsoStats {
  total: number;
  gridsquares: number;
  dxccs: number;
  byMode: { [key: string]: number };
  byBand: { [key: string]: number };
}
