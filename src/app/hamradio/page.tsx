import ModalImage from "@/components/modal_image";
import { QsoStats } from "@/interfaces/qso_stats";
import clientPromise from "@/lib/mongodb";
import { Metadata } from "next";
import Breakdown from "./breakdown";
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
  const stats = getStats();

  return (
    <div className="content">
      <h1>Amateur Radio</h1>

      <h2>My Stats</h2>
      <Stats statsP={stats} />

      <h2>QSO breakdown</h2>
      <Breakdown statsP={stats} />

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
          src="/images/hamradio/qsl_2022.jpg"
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
          src="/images/hamradio/sota_1.jpg"
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

async function getStats(): Promise<QsoStats | null> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const count = await db.collection("logentries").countDocuments();

    const bands = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toLower: "$data.BAND" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()
      .then((bands) =>
        bands.reduce((acc, { _id, count }) => {
          acc[_id] = count;
          return acc;
        }, {})
      );

    const modes = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toUpper: "$data.MODE" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()
      .then((modes) =>
        modes.reduce((acc, { _id, count }) => {
          acc[_id] = count;
          return acc;
        }, {})
      );

    const dxccs = await db.collection("logentries").distinct("data.DXCC");
    const dxccsCount = dxccs.length;

    const gridsquares = await db
      .collection("logentries")
      .aggregate([
        {
          $group: {
            _id: { $toUpper: { $substr: ["$data.GRIDSQUARE", 0, 4] } },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()
      .then((gridsquares) => gridsquares.length);

    // TODO: Most wanted in log

    // const mostWantedList = await getMostWanted();
    // let mostWanted = 999;
    // for (const dxcc of dxccs) {
    //   const i = mostWantedList.indexOf(dxcc);
    //   if (i === -1) continue;

    // }

    return {
      total: count,
      byBand: bands,
      byMode: modes,
      dxccs: dxccsCount,
      gridsquares,
    };
  } catch (e) {
    console.error(e);
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getMostWanted(): Promise<number[]> {
  const uri = "https://clublog.org/mostwanted.php?api=1";

  return fetch(uri)
    .then((res) => res.json())
    .then((json) => Object.values(json).map(Number));
}
