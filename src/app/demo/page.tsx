"use client";
import { motion } from "framer-motion";
import connect from "@/app/public/images/connected-insoles.png";
import run from "@/app/public/images/run.svg";
import show from "@/app/public/images/show.svg";
import background from "@/app/public/images/insoles digitsole pro.png";
export default function DigitsoleDemoPage() {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <section className="relative rounded-xl text-white py-28 px-8 text-center overflow-hidden">
        <img
          src={background.src}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        <motion.div
          className="relative z-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">
            Experience Smart Footwear
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-lg">
            Track your health, steps, posture, and more with Digitsole Pro
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl text-blue-900 font-semibold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <img
              src={connect.src}
              alt="Insert Insoles"
              className="h-40 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              1. Insert Smart Insoles
            </h3>
            <p>
              Place the Digitsole Pro smart insoles inside your footwear to get
              started.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <img
              src={run.src}
              alt="Start walking"
              className="h-40 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              2. Start Running
            </h3>
            <p>
              Start walking or running whether inside the clinic, on a treadmill
              or outside.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <img
              src={show.src}
              alt="Analyze Data"
              className="h-40 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              3. Analyze and Improve
            </h3>
            <p>
              Track steps, balance, posture, fatigue, and gait analysis to
              improve your health and performance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 px-8 text-center">
        <motion.h2
          className="text-3xl md:text-4xl text-blue-900 font-semibold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Smart Features of Digitsole
        </motion.h2>
        <motion.ul
          className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <li className="bg-gray-100 p-4 rounded-lg">
            ✔ Real-time posture monitoring
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">✔ Smart gait analysis</li>
          <li className="bg-gray-100 p-4 rounded-lg">
            ✔ Activity tracking & step counting
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">
            ✔ Fatigue & risk prediction
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">
            ✔ Seamless Bluetooth syncing
          </li>
          <li className="bg-gray-100 p-4 rounded-lg">
            ✔ Intuitive mobile dashboard
          </li>
        </motion.ul>
      </section>
    </div>
  );
}
