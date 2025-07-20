"use client";

export default function ProductPage() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">
            Digitsole Pro Smart Insoles
          </h1>
          <p className="mt-4 text-gray-600">
            The Digitsole Pro kit allows you to analyze your patients' walking
            or running wherever you are. Carry it everywhere with you, it weighs
            less than 3 kg/7 lbs and measures 38 x 37 x 13 cm. It includes 6
            pairs of insoles with 2 connected chips & a charger.
          </p>
          <ul className="mt-6 space-y-2 text-gray-600">
            <li>📱 Easy-to-use web interface</li>
            <li>Comes with 2 chips + 6 pairs of insoles</li>
            <li>Portable kit (~3 kg)</li>
          </ul>
        </div>
        <div className="relative w-full h-64 md:h-80">
          <img
            src="https://cdn.prod.website-files.com/60e8630e6be25bfbb1a11936/60ff08274158bdc7f020b46f_insole%20flow%20duo%203-4%20pods%402x.png"
            alt="Digitsole Pro kit"
            className="object-contain h-90 w-full rounded-lg"
          />
        </div>
      </section>

      <section className="bg-gray-50 mt-8 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-blue-900">
          Technical Specs
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-gray-600">
          <div>
            <strong>Weight:</strong>
            <p>71G</p>
          </div>
          <div>
            <strong>Amperage:</strong>
            <p>35 mAh</p>
          </div>
          <div>
            <strong>Charge cycle:</strong>
            <p>500 cycles</p>
          </div>
          <div>
            <strong>Charge time:</strong>
            <p>2h30</p>
          </div>
          <div>
            <strong>Autonomy in active mode:</strong>
            <p>35H</p>
          </div>
          <div>
            <strong>Standby time:</strong>
            <p>3125h</p>
          </div>
          <div>
            <strong>Cleaning:</strong>
            <p>STERICID S-3DM</p>
          </div>
          <div>
            <strong>Connectivity</strong>
            <p>USB</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-900">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-3">
          <li>Place the smart insoles in your patient’s shoes.</li>
          <li>
            Have them walk, run, or perform movement tests inside or outside.
          </li>
          <li>Upload session data via the kits’ BLE/Wi‑Fi chips.</li>
          <li>
            Review objective gait, pressure, balance and jump analytics in our
            intuitive web app.
          </li>
        </ol>
      </section>
    </div>
  );
}
