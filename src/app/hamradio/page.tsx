import Image from "next/image";
import Link from "next/link";

export default function Hamradio() {
  return (
    <div className="content">
      <h1>Amateur Radio</h1>

      <h2>My Stats</h2>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl md:grid-cols-3">
        <div className="mx-auto my-auto text-center">
          <div className="mb-1 text-lg">QSO&apos;s</div>
          <div className="text-4xl font-medium">1.7 k</div>
        </div>
        <div className="mx-auto my-auto text-center">
          <div className="mb-1 text-lg">Most wanted prefix in logbook</div>
          <div className="text-4xl font-medium">TN</div>
          <div>#80 most wanted</div>
        </div>
        <div className="mx-auto my-auto text-center">
          <div className="mb-1 text-lg">Furthest QSO</div>
          <div className="text-4xl font-medium">18,371 km</div>
          <div>RE78 FT8 20 W</div>
        </div>
        {/* Grid squares, DXCC, ??? */}
      </div>

      <h2>QSO breakdown</h2>
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded bg-gradient-to-br from-white/10 to-white/20 p-4 shadow-2xl md:grid-cols-2">
        <div className="mx-auto my-auto">
          <div className="mb-2 text-center text-lg font-bold">By mode</div>
          <div>FT8 - 1349</div>
          <div>SSB - 317</div>
          <div>CW - 75</div>
          <div>FT4 - 3</div>
          <div>RTTY - 2</div>
          <div>JS8 - 1</div>
        </div>
        <div className="mx-auto my-auto">
          <div className="mb-2 text-center text-lg font-bold">By band</div>
          <div className="columns-2">
            <div>160 m - 16</div>
            <div>80 m - 112</div>
            <div>60 m - 175</div>
            <div>40 m - 267</div>
            <div>30 m - 396</div>
            <div>20 m - 237</div>
            <div>17 m - 120</div>
            <div>15 m - 239</div>
            <div>12 m - 57</div>
            <div>10 m - 114</div>
            <div>6 m - 14</div>
          </div>
        </div>
      </div>

      <h2>My radios</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

          <ImageWithText
            src="/images/portable.jpg"
            alt="Portable setup"
            width={500}
            height={500}
          />
        </div>

        <ImageWithText
          src="/images/setup.jpg"
          alt="Home setup"
          width={500}
          height={500}
        />
      </div>

      <h2>My antennas</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

        <ImageWithText
          src="/images/4_1_balun.jpg"
          alt="4:1 Balun"
          height={500}
          width={500}
        />

        <ImageWithText
          src="/images/lin_loaded.jpg"
          alt="80m linear loaded Inverted V"
          width={500}
          height={500}
        />

        <ImageWithText
          src="/images/multi_inv_v.jpg"
          alt="17m, 15m and 10m Inverted V fan dipole"
          width={500}
          height={500}
        />
      </div>

      <h2>QSL</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

        <ImageWithText
          src="/images/qsl_2022.jpg"
          alt="My QSL card"
          width={500}
          height={500}
        />
      </div>

      <h2>SOTA</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <p>
          I sometimes take my radio and antennas with me on hikes and activate
          summits. I&apos;ve activated one summit two times so far.
        </p>

        <ImageWithText
          src="/images/sota_1.jpg"
          alt="SOTA setup"
          width={500}
          height={500}
          text="My first SOTA pack"
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

interface ImageWithTextProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text?: string;
}

function ImageWithText({ src, alt, width, height, text }: ImageWithTextProps) {
  return (
    <Link
      href={src}
      className="mx-auto mb-auto block w-fit overflow-hidden rounded bg-white/20"
    >
      <Image src={src} alt={alt} width={width} height={height} />
      <div className="py-1 px-3">{text ?? alt}</div>
    </Link>
  );
}
