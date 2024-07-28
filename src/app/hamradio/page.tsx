import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import Breakdown from './breakdown';
import Latest from './latest';
import Stats from './stats';
import ExpandableImage from '@/components/expandable_image';
import RelativeTime from '@/components/relative_time';

import wrtc from './assets/wrtc.jpg';
import portable from './assets/portable.jpg';
import setup from './assets/setup.jpg';
import linLoaded from './assets/lin_loaded.jpg';
import balun41 from './assets/4_1_balun.jpg';
import balun49 from './assets/49_1_balun.jpg';
import qsl from './assets/qsl_2022.jpg';
import sota from './assets/sota_1.jpg';
import dxcomanderParts from './assets/dxcomander_parts.jpg';
import dxcomander from './assets/dxcomander.jpg';
import { ContestList } from './contests/contest';

// Revalidates every 1h
export const revalidate = 3600;

const colStyle = 'gap-10 space-y-10 md:columns-2';

export default function Hamradio() {
  const lastUpdate = new Date();

  return (
    <div className="content">
      <h1>Amateur Radio</h1>

      <Header />

      <h2>My Stats</h2>
      <Stats />

      <h2>QSO breakdown</h2>
      <Breakdown />

      <h2>Most recent QSO&apos;s</h2>
      <Latest />
      <div className="text-center text-sm text-gray-300">
        Last updated: <RelativeTime date={lastUpdate.toISOString()} />
      </div>

      <h2>My radios</h2>
      <div className={colStyle}>
        <MyRadios />
      </div>

      <h2>My antennas</h2>
      <div className={colStyle}>
        <MyAntennas />
      </div>

      <h2>QSL</h2>
      <div className={colStyle}>
        <Qsl />
      </div>

      <h2>Contesing</h2>
      <div className={colStyle}>
        <Contesting />
      </div>
      <h3>Recent contests</h3>
      <ContestList count={4} />
      <div className="flex">
        <Link className="button mt-3 text-sm" href="/hamradio/contests">
          MORE CONTESTS
        </Link>
      </div>

      <h2>SOTA</h2>
      <div className={colStyle}>
        <Sota />
      </div>

      {/* DIY */}

      <h2>Other callsigns I used</h2>
      <div className={colStyle}>
        <CallsignsUsed />
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="m-4 grid grid-cols-2 gap-4 rounded bg-gradient-to-br from-white/10 to-white/20 px-6 py-4 shadow-2xl md:grid-cols-3">
        <div className="col-span-2 m-auto text-center md:col-span-1">
          <div className="text-sm">Callsign</div>
          <div className="text-5xl font-medium">S52KJ</div>
        </div>
        <table className="mx-auto">
          <tbody>
            <tr>
              <th className="pr-4">CQZ</th>
              <td>15</td>
            </tr>
            <tr>
              <th className="pr-4">ITU</th>
              <td>28</td>
            </tr>
            <tr>
              <th className="pr-4">DXCC</th>
              <td>499 (Slovenia)</td>
            </tr>
          </tbody>
        </table>
        <table className="mx-auto mb-auto">
          <tbody>
            <tr>
              <th className="pr-4">Class</th>
              <td>A + CW</td>
            </tr>
            <tr>
              <th className="pr-4">Grid</th>
              <td>JN76db</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="m-4 flex flex-wrap items-center gap-2 text-sm">
        <Link className="button" href="https://www.qrz.com/db/s52kj">
          QRZ.com
        </Link>
        <Link className="button" href="https://www.qrzcq.com/call/S52KJ">
          QRZCQ
        </Link>
        <div className="mx-2">|</div>
        <Link className="button" href="https://www.s59veg.si/">
          Radioklub Vegova
        </Link>
        <Link className="button" href="http://s50c.hamradio.si/">
          Radioklub Domžale
        </Link>
        <Link className="button" href="https://s5cc.eu/">
          Slovenia Contest Club
        </Link>
        <Link className="button" href="http://www.hamradio.si/">
          ZRS
        </Link>
      </div>
    </>
  );
}

function MyRadios() {
  return (
    <>
      <div>
        <p>
          Since late june 2023 my primary TRX has been an{' '}
          <strong>Icom IC-7300</strong> which is a 100W HF SDR transceiver.
        </p>
        <p>
          I used to have a Xiegu G90 and an Icom IC-726 before I got the
          IC-7300. The G90 served me well, but I wanted an upgrade and I
          wasn&apos;t using it for portable operations as much as I thought I
          would.
        </p>
        <p>
          For VHF/UHF I use a <strong>Icom IC-275H</strong> and a{' '}
          <strong>Baofeng UV-5RTP</strong> which is a cheap 8W handheld radio.
        </p>
        <p>
          I also have a <strong>RTL-SDR v3</strong> which I rarely use.
        </p>
      </div>

      <MImage src={portable} alt="Portable HF setup" />

      <MImage src={setup} alt="Old setup (Xiegu G90 and Icom IC-726)" />
    </>
  );
}

function MyAntennas() {
  return (
    <>
      <div>
        <p>
          Most of my HF antennas are homebrewed. My main antenna is an{' '}
          <strong>off center fed dipole</strong> in an inverted V configuration
          with a 4:1 hybrid balun I made. It works on 40m, 20m, 15m, 12m and
          10m. I also have an <strong>end-fed half-wave antenna</strong> with a
          49:1 unun and a loading coil I made to cover the other bands. I used
          to use a <strong>Random wire antenna</strong> with a 9:1 unun I made.
        </p>
        <p>
          I also have a 1:1 balun I bought that I use for either a{' '}
          <strong>normal or multiband inverted V</strong> or a{' '}
          <strong>80m linear loaded inverted V</strong>.
        </p>

        <p>
          I&apos;m planning on making a{' '}
          <strong>9 element yagi for 144 MHz</strong> to try meteor scatter.
        </p>

        <p>
          I&apos;m in the process of testing the <strong>Loop on Ground</strong>{' '}
          antenna by KK5JY as a receive antenna.
        </p>

        <p>
          Recently I made a DXComander-style antenna for my expedition in
          Croatia. I bought a 10m fiberglass pole, some wire for the elements
          and radials, some rope for guying and some nuts and bolts. The
          seperators are 3D printed from PLA plastic. The antenna has 4 elements
          for 5 bands and 48m of radials in 3m lengths. The elements for 40m,
          20m and 10m are verticals and the 80m element is an inverted L. The
          15m band is covered by the 40m element (3rd harmonic).
        </p>
      </div>

      <MImage src={balun41} alt="4:1 hybrid balun" />

      <MImage src={balun49} alt="49:1 unun" />

      <MImage src={linLoaded} alt="80m linear loaded dipole" />

      <MImage src={dxcomanderParts} alt="DIY DXComander parts" />

      <MImage src={dxcomander} alt="DIY DXComander" />
    </>
  );
}

function Qsl() {
  return (
    <>
      <div>
        <p>
          I use <strong>QRZ&apos;s Logbook</strong> so confirmations there are
          instant, but I also very frequently confirm my QSO&apos;s via{' '}
          <strong>LOTW</strong>.
        </p>
        <p>
          If you want to send me a QSL card, you can send it to my home address
          or via the <strong>bureau</strong>. My QRZ page has all the details.
          If you want my QSL card, please contact me or send a request via{' '}
          <strong>OQRS</strong>.
        </p>
        <p>
          I no longer upload my QSO&apos;s to <strong>eQSL</strong>.
        </p>
      </div>

      <MImage src={qsl} alt="My QSL card" />
    </>
  );
}

function Contesting() {
  return (
    <>
      <div>
        <p>
          I try and participate in the larger HF contests like CQWW, CQWPX, IARU
          HF, etc. I mostly operate from home in the{' '}
          <strong>single operator, all band, low power</strong> category. I
          usualy don&apos;t compete in digital modes, I prefer{' '}
          <strong>CW and SSB</strong>. I usualy participate with my callsign (
          <strong>S52KJ</strong>) or the club callsign <strong>S56V</strong>.
        </p>
        <p>
          I like to participate in the{' '}
          <strong>Youngsters on the air contest</strong>. In 2023 I participated
          in the 1<sup>st</sup> and 2<sup>nd</sup> round from the Slovenia
          Contest Club location.
        </p>
        <p>
          I also participate in the <strong>KVP ZRS</strong> contests on 80m in
          which I use my linear loaded dipole.
        </p>
      </div>
    </>
  );
}

function Sota() {
  return (
    <>
      <div>
        <p>
          I sometimes take my radio and antennas with me on hikes and activate
          summits. I&apos;ve activated one summit two times so far.
        </p>

        <p>
          I also do some chasing. Over the weekends I have my Icom IC-275H set
          on 145.550 MHz to chase any nearby activators.
        </p>
      </div>

      <MImage src={sota} alt="My first SOTA pack" />
    </>
  );
}

function CallsignsUsed() {
  return (
    <>
      <div>
        <p>
          I&apos;ve used the callsign <strong>S52KJ/P</strong> for SOTA
          activations.
        </p>
        <p>
          In 2023 I was a youth volunteer at WRTC in Italy, at that time I
          participated in the IARU HF contest with the callsigns{' '}
          <strong>I4/S52KJ</strong> and <strong>I41A</strong>.
        </p>
        <p>
          In december 2023 I traveled to Croatia and activated with the callsign{' '}
          <strong>9A/S52KJ</strong> with a DXComander-style antenna I made
        </p>
        <p>
          I also sometimes use the callsign <strong>S56V</strong> for contesting
          which is the callsign of Radioklub Vegova.
        </p>
        <p>
          I also participated in the 2022 and 2023 YOTA month with the callsign{' '}
          <strong>S50YOTA</strong>. I also used the callsign{' '}
          <strong>9A0YOTA</strong> with a remote station in Croatia.
        </p>
        <p>
          For the 2<sup>nd</sup> round of the 2023 YOTA contest I used the
          callsign <strong>S51A</strong> which is the contest callsign of
          Radioklub Triglav.
        </p>
        <p>
          For the 1<sup>st</sup> round of the 2024 YOTA contest I used the
          callsign <strong>S50C</strong> which is the contest callsign of
          Radioklub Domžale.
        </p>
      </div>

      <MImage src={wrtc} alt="WRTC 2021" />
    </>
  );
}

function MImage({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <ExpandableImage src={src} alt={alt}>
      <div className="mx-auto mb-auto block w-fit cursor-pointer overflow-hidden rounded bg-white/20 shadow-2xl transition-all ease-in-out hover:scale-[1.01]">
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          placeholder="blur"
        />
        {alt && <div className="px-3 py-1">{alt}</div>}
      </div>
    </ExpandableImage>
  );
}
