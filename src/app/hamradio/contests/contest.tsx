import Image from 'next/image';

interface Contest {
  img: string;
  name: string;
  date: string;
  callsign: string;
  category: string;
  qsos: number;
  score: number;
}

const contests: Contest[] = [
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX CW',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 1108,
    score: 1_342_664,
  },
  {
    img: '/images/hamradio/ari.png',
    name: 'ARI DX',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB CW LP',
    qsos: 40,
    score: 5110,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX SSB',
    date: '2024',
    callsign: 'S50C',
    category: 'SOAB LP',
    qsos: 1118,
    score: 1_516_690,
  },
  {
    img: '/images/hamradio/rdxc_logo.png',
    name: 'Russian DX Contest',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB LP CW',
    qsos: 85,
    score: 46_726,
  },
  {
    img: '/images/hamradio/YOTA.png',
    name: 'YOTA 1st Round',
    date: '2024',
    callsign: 'S50C',
    category: 'SOAB YOTA',
    qsos: 588,
    score: 370668,
  },
  {
    img: '/images/hamradio/ARRL.png',
    name: 'ARRL DX SSB',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 267,
    score: 79299,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX RTTY',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 209,
    score: 98525,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ 160M CW',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SO QRP',
    qsos: 27,
    score: 888,
  },
  {
    img: '/images/hamradio/EUDXC.png',
    name: 'EUDX',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 169,
    score: 235410,
  },
  {
    img: '/images/hamradio/HADX.png',
    name: 'Hungarian DX',
    date: '2024',
    callsign: 'S52KJ',
    category: 'SO Youth 6h',
    qsos: 103,
    score: 16646,
  },
  {
    img: '/images/hamradio/YOTA.png',
    name: 'YOTA 3rd Round',
    date: '2023',
    callsign: '9A/S52KJ',
    category: 'SOAB YOTA',
    qsos: 189,
    score: 82038,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WW DX CW',
    date: '2023',
    callsign: 'S56V',
    category: 'SOAB LP',
    qsos: 664,
    score: 224852,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WW DX SSB',
    date: '2023',
    callsign: 'S56V',
    category: 'SOAB LP',
    qsos: 662,
    score: 212352,
  },
  {
    img: '/images/hamradio/YO-FRR.jpg',
    name: 'YODX HF',
    date: '2023',
    callsign: 'S59VEG',
    category: 'SOAB LP',
    qsos: 211,
    score: 71060,
  },
  {
    img: '/images/hamradio/YOTA.png',
    name: 'YOTA 2nd Round',
    date: '2023',
    callsign: 'S51A',
    category: 'MultiSingle',
    qsos: 782,
    score: 338000,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX CW',
    date: '2023',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 408,
    score: 203255,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX SSB',
    date: '2023',
    callsign: 'S52KJ',
    category: 'SOAB LP',
    qsos: 199,
    score: 54668,
  },
  {
    img: '/images/hamradio/YOTA.png',
    name: 'YOTA 1st Round',
    date: '2023',
    callsign: 'S52KJ',
    category: 'MultiSingle',
    qsos: 659,
    score: 245904,
  },
  {
    img: '/images/hamradio/YOTA.png',
    name: 'YOTA 3rd Round',
    date: '2022',
    callsign: 'S52KJ',
    category: 'SOAB YOTA 6h',
    qsos: 36,
    score: 2808,
  },
  {
    img: '/images/hamradio/CQ.png',
    name: 'CQ WPX SSB',
    date: '2022',
    callsign: 'S52KJ',
    category: 'SOAB QRP',
    qsos: 17,
    score: 527,
  },
];

interface ContestListProps {
  count?: number;
}

export function ContestList({ count }: ContestListProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-4">
      {contests.slice(0, count).map((c, i) => (
        <div
          className="flex flex-col items-center gap-3 rounded bg-white/5 p-4 text-center"
          key={i}
        >
          <div className="flex h-24 w-24">
            <Image
              src={c.img}
              alt={c.name}
              width={100}
              height={100}
              className="m-auto max-h-full max-w-full rounded"
            />
          </div>
          <div>
            <div className="text-xl font-bold">{c.name}</div>
            <div className="text-sm">{c.date}</div>
          </div>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="pr-2 text-right text-xs">Callsign</td>
                <td>{c.callsign}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right text-xs">Category</td>
                <td>{c.category}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right text-xs">QSOs</td>
                <td>{c.qsos}</td>
              </tr>
              <tr>
                <td className="pr-2 text-right text-xs">Score</td>
                <td>{c.score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
