"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-black text-white p-6">
      {/* ATM Image */}
      <div className="mb-6">
        <Image
          src="/atm.jpg" // ✅ Make sure you have an ATM image in the public folder
          alt="ATM"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-4 tracking-wide text-blue-400 drop-shadow-lg">
        Welcome to the ICD ATM
      </h1>

      {/* Description */}
      <p className="text-lg mb-6 text-gray-300 max-w-lg text-center">
        Secure and fast banking at your fingertips. Sign up or log in to access your account.
      </p>

      {/* Action Button */}
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-300 transform hover:scale-105">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
}
