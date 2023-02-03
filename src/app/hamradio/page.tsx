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
          <div className="mb-2 text-center text-lg">By mode</div>
          <div>FT8 - 1349</div>
          <div>SSB - 317</div>
          <div>CW - 75</div>
          <div>FT4 - 3</div>
          <div>RTTY - 2</div>
          <div>JS8 - 1</div>
        </div>
        <div className="mx-auto my-auto">
          <div className="mb-2 text-center text-lg">By band</div>
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

      {/* Radios */}

      {/* Antennas */}

      {/* QSL */}

      {/* SOTA */}

      {/* DIY */}

      {/* Special calls */}

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
