import ModalImage from "@/components/modal_image";
import { Metadata } from "next";

const stats = {
  total: 1717,
  by_mode: [
    ["CW", 75],
    ["SSB", 286],
    ["FT8", 1349],
    ["FT4", 3],
    ["FM", 1],
    ["RTTY", 2],
    ["JS8", 1],
  ],
  by_band: [
    ["160m", 16],
    ["80m", 112],
    ["60m", 175],
    ["40m", 261],
    ["30m", 396],
    ["20m", 213],
    ["17m", 120],
    ["15m", 238],
    ["12m", 57],
    ["10m", 114],
    ["6m", 14],
    ["70cm", 1],
  ],
  gridsquares: 496,
  dxccs: 122,
};

export const metadata: Metadata = {
  title: "Amateur Radio",
  description: "My amateur radio activities.",
  keywords: ["hamradio", "amateur radio", "antennas", "qsl card", "sota"],
};

const colStyle = "gap-10 space-y-10 md:columns-2";

export default function Hamradio() {
  return (
    <div className="content">
      <h1>Amateur Radio</h1>

      <h2>My Stats</h2>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 text-center shadow-2xl md:grid-cols-3">
        <div className="m-auto">
          <div className="mb-1 text-lg">QSOs</div>
          <div className="text-4xl font-medium">{stats.total}</div>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">DXCCs</div>
          <div className="text-4xl font-medium">{stats.dxccs}</div>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">Grid Squares</div>
          <div className="text-4xl font-medium">{stats.gridsquares}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 text-center shadow-2xl md:grid-cols-2">
        <div className="m-auto">
          <div className="mb-1 text-lg">Most wanted prefix in logbook</div>
          <div className="text-4xl font-medium">TN</div>
          <div>#80 most wanted</div>
        </div>
        <div className="m-auto">
          <div className="mb-1 text-lg">Furthest QSO</div>
          <div className="text-4xl font-medium">18,371 km</div>
          <div>RE78 FT8 20 W</div>
        </div>
      </div>

      <h2>QSO breakdown</h2>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl md:grid-cols-2">
        <div className="m-auto">
          <div className="mb-2 text-center text-lg font-bold">By mode</div>
          <div className="columns-2 gap-8">
            {stats.by_mode.map(([mode, count]) => (
              <div key={mode}>
                {mode} - {count}
              </div>
            ))}
          </div>
        </div>
        <div className="m-auto">
          <div className="mb-2 text-center text-lg font-bold">By band</div>
          <div className="columns-3 gap-8">
            {stats.by_band.map(([band, count]) => (
              <div key={band}>
                {band} - {count}
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2>My radios</h2>
      <div className={colStyle}>
        <div>
          <p>
            My primary TRX is a <strong>Xiegu G90</strong> which is a 20W HF all
            mode transceiver and an <strong>Icom IC-726</strong> that needs some
            fixing. I also have a <strong>RTL-SDR v3</strong> connected to an
            old laptop running <strong>rtl-tcp</strong> that I can connect to
            over the network.
          </p>
          <p>
            For VHF/UHF I use a <strong>Baofeng UV-5RTP</strong> which is a
            cheap 8W handheld radio.
          </p>
          <p>
            When I need more power I use my fathers{" "}
            <strong>Yaesu FTDX-3000</strong>.
          </p>
        </div>

        <ModalImage
          src="/images/portable.jpg"
          alt="Portable setup"
          width={500}
          height={500}
        />

        <ModalImage
          src="/images/setup.jpg"
          alt="Home setup"
          width={500}
          height={500}
        />
      </div>

      <h2>My antennas</h2>
      <div className={colStyle}>
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
          src="/images/4_1_balun.jpg"
          alt="4:1 Balun"
          height={500}
          width={500}
        />

        <ModalImage
          src="/images/lin_loaded.jpg"
          alt="80m linear loaded dipole"
          width={500}
          height={500}
        />

        <ModalImage
          src="/images/multi_inv_v.jpg"
          alt="17m, 15m and 10m Inverted V fan dipole"
          width={500}
          height={500}
        />
      </div>

      <h2>QSL</h2>
      <div className={colStyle}>
        <div>
          <p>
            I use <strong>QRZ&apos;s Logbook</strong> so confirmations there are
            instant, but I also very frequently confirm my QSO&apos;s via{" "}
            <strong>LOTW</strong>. If you want to send me a QSL card, you can
            send it to my home address or via the <strong>bureau</strong>. My
            QRZ page has all the details. If you want my QSL card, please
            contact me.
          </p>
          <p>
            I rarely upload my QSO&apos;s to <strong>eQSL</strong> and{" "}
            <strong>Clublog</strong>.
          </p>
        </div>

        <ModalImage
          src="/images/qsl_2022.jpg"
          alt="My QSL card"
          width={500}
          height={500}
        />
      </div>

      <h2>SOTA</h2>
      <div className={colStyle}>
        <p>
          I sometimes take my radio and antennas with me on hikes and activate
          summits. I&apos;ve activated one summit two times so far.
        </p>

        <ModalImage
          src="/images/sota_1.jpg"
          alt="My first SOTA pack"
          width={500}
          height={500}
        />
      </div>

      {/* DIY */}

      <h2>Other callsigns I used</h2>
      <p>
        I&apos;ve used the callsign <strong>S52KJ/P</strong> for SOTA
        activations. I also participated in the 2022 YOTA month with the
        callsign <strong>S50YOTA</strong>.
      </p>

      {/* <div className="content my-6">
        <h2>Most recent QSO&apos;s</h2>
        <iframe
          className="w-full rounded bg-white"
          height="515"
          src="https://logbook.qrz.com/lbstat/S52KJ/"
        ></iframe>
      </div> */}
    </div>
  );
}
