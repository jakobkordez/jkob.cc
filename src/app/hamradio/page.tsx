import { LinkButton } from "@/components/button";
import DateTime from "@/components/date_time";
import ModalImage from "@/components/modal_image";
import { Metadata } from "next";
import Breakdown from "./breakdown";
import Latest from "./latest";
import Stats from "./stats";

// Revalidate every 24 hours
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Amateur Radio",
  description: "My amateur radio activities.",
  keywords: ["hamradio", "amateur radio", "antennas", "qsl card", "sota"],
};

const colStyle = "gap-10 space-y-10 md:columns-2";

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
        Last updated: <DateTime date={lastUpdate.toISOString()} />
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

      <h2>SOTA</h2>
      <div className={colStyle}>
        <Sota />
      </div>

      {/* DIY */}

      <h2>Other callsigns I used</h2>
      <p>
        I&apos;ve used the callsign <strong>S52KJ/P</strong> for SOTA
        activations. I also participated in the 2022 YOTA month with the
        callsign <strong>S50YOTA</strong>.
      </p>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="m-4 grid grid-cols-2 gap-4 rounded bg-gradient-to-br from-white/10 to-white/20 py-4 px-6 shadow-2xl md:grid-cols-3">
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
      <div className="m-4 flex gap-2 text-sm">
        <LinkButton href="https://www.qrz.com/db/s52kj">QRZ.com</LinkButton>
        <LinkButton href="https://www.qrzcq.com/call/S52KJ">QRZCQ</LinkButton>
      </div>
    </>
  );
}

function MyRadios() {
  return (
    <>
      <div>
        <p>
          My primary TRX is a <strong>Xiegu G90</strong> which is a 20W HF all
          mode transceiver and an <strong>Icom IC-726</strong> that needs some
          fixing. I also have a <strong>RTL-SDR v3</strong> which I sometimes
          use to recieve higher bands.
        </p>
        <p>
          For VHF/UHF I use a <strong>Baofeng UV-5RTP</strong> which is a cheap
          8W handheld radio.
        </p>
        <p>
          When I need more power I use my fathers{" "}
          <strong>Yaesu FTDX-3000</strong>.
        </p>
      </div>

      <ModalImage
        src="/images/hamradio/portable.jpg"
        alt="Portable setup"
        width={500}
        height={500}
      />

      <ModalImage
        src="/images/hamradio/setup.jpg"
        alt="Home setup"
        width={500}
        height={500}
      />
    </>
  );
}

function MyAntennas() {
  return (
    <>
      <div>
        <p>
          All of the antennas are homebrewed. I mostly use a{" "}
          <strong>Random wire antenna</strong> with a 9:1 unun I made. I also
          have an <strong>40m off center fed dipole</strong> in an{" "}
          <strong>inverted V</strong> configuration with a 4:1 balun I made.
        </p>
        <p>
          I also have a 1:1 balun I bought that I use for either a{" "}
          <strong>40m Inverted V</strong> or a{" "}
          <strong>80m linear loaded Inverted V</strong>.
        </p>
        <p>
          I used to have a{" "}
          <strong>17m, 15m and 10m Inverted V fan dipole</strong> but had
          problems with it and took it down.
        </p>
      </div>

      <ModalImage
        src="/images/hamradio/4_1_balun.jpg"
        alt="4:1 Balun"
        height={500}
        width={500}
      />

      <ModalImage
        src="/images/hamradio/lin_loaded.jpg"
        alt="80m linear loaded dipole"
        width={500}
        height={500}
      />

      <ModalImage
        src="/images/hamradio/multi_inv_v.jpg"
        alt="17m, 15m and 10m Inverted V fan dipole"
        width={500}
        height={500}
      />
    </>
  );
}

function Qsl() {
  return (
    <>
      <div>
        <p>
          I use <strong>QRZ&apos;s Logbook</strong> so confirmations there are
          instant, but I also very frequently confirm my QSO&apos;s via{" "}
          <strong>LOTW</strong>. If you want to send me a QSL card, you can send
          it to my home address or via the <strong>bureau</strong>. My QRZ page
          has all the details. If you want my QSL card, please contact me or
          send a request via <strong>OQRS</strong>.
        </p>
        <p>
          I rarely upload my QSO&apos;s to <strong>eQSL</strong> and{" "}
          <strong>Clublog</strong>.
        </p>
      </div>

      <ModalImage
        src="/images/hamradio/qsl_2022.jpg"
        alt="My QSL card"
        width={500}
        height={500}
      />
    </>
  );
}

function Sota() {
  return (
    <>
      <p>
        I sometimes take my radio and antennas with me on hikes and activate
        summits. I&apos;ve activated one summit two times so far.
      </p>

      <ModalImage
        src="/images/hamradio/sota_1.jpg"
        alt="My first SOTA pack"
        width={500}
        height={500}
      />
    </>
  );
}
