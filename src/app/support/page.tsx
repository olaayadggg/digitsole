import { Mail, Phone } from "lucide-react"; // Optional icons if you're using lucide

export default function SupportPage() {
  return (
    <section className="min-h-screen bg-gray-100 py-20 px-2">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-blue-900">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our services or need assistance? We're here to
            help. Reach out to us via email or phone and we'll get back to you
            promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Support */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-blue-900">
              <Mail className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Email Support</h2>
            </div>
            <div className="text-gray-700 space-y-2">
              <div>
                <span className="font-semibold text-gray-900">
                  General support:
                </span>{" "}
                <a
                  href="mailto:support@digitsole.com"
                  className="text-blue-700 hover:underline"
                >
                  support@digitsole.com
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  Vigilance & Safety incidents:
                </span>{" "}
                <a
                  href="mailto:Vigilance@digitsole.com"
                  className="text-blue-700 hover:underline"
                >
                  Vigilance@digitsole.com
                </a>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-blue-900">
              <Phone className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Phone Support</h2>
            </div>
            <div className="text-gray-700 space-y-2">
              <div>
                <span className="font-semibold text-gray-900">France:</span>{" "}
                <a
                  href="tel:+33355409155"
                  className="text-blue-700 hover:underline"
                >
                  +33 (0)3 55 40 91 55
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-900">USA:</span>{" "}
                <a
                  href="tel:+17207984452"
                  className="text-blue-700 hover:underline"
                >
                  +1 720 798 4452
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
