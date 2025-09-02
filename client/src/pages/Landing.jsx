import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const authed = !!localStorage.getItem("uv_token");

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #0b0f29 0%, #000000 100%)",
      }}
    >
      {/* 🌌 Animated Stars */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* 🌠 Hero Section */}
      <section className="hero relative z-10 text-center py-20">
        <h1 className="text-6xl font-extrabold mb-4">
          🌌 Welcome to <span className="text-purple-400">UniVerse</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Where ideas find teammates, and events find YOU ✨
        </p>

        {/* 🚀 Entry Options */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          {!authed ? (
            <>
              <Link
                to="/login"
                className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition transform hover:scale-105"
              >
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-700 transition transform hover:scale-105"
              >
                ✨ New Explorer? Sign Up
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-700 transition transform hover:scale-105"
            >
              🚀 Enter Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* 🪐 About Us */}
      <section className="section glass-card relative z-10 max-w-3xl mx-auto my-12 p-8 text-center">
        <h2 className="text-3xl mb-4">About Us</h2>
        <p>
          Born out of sleepless hackathon nights and way too much coffee ☕,  
          UniVerse is the cosmic hub where students connect, collaborate,  
          and conquer. A galaxy where every lost hacker finds their crew 🚀.
        </p>
      </section>

      {/* 🔭 Our Creation */}
      <section className="section glass-card relative z-10 max-w-3xl mx-auto my-12 p-8 text-center">
        <h2 className="text-3xl mb-4">Our Creation</h2>
        <p>
          Think of UniVerse as a telescope 🔭 — not for stars, but for hackathons,  
          clubs, and teammates. Instead of wandering blindly, you’ll see constellations  
          of opportunities right where you belong.
        </p>
      </section>

      {/* 🌟 Features */}
      <section className="section relative z-10 max-w-5xl mx-auto my-12 text-center">
        <h2 className="text-3xl mb-8">Our Features</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="glass-card feature-card p-6">
            <h3 className="text-xl mb-2">📅 Event Manager</h3>
            <p>
              Never miss a college event again!  
              Like Google Calendar — but with more memes and less guilt.
            </p>
          </div>
          <div className="glass-card feature-card p-6">
            <h3 className="text-xl mb-2">🔥 HackMate</h3>
            <p>
              The Tinder of hackathons — swipe right on coders who don’t ghost  
              your repo. Find your debugging soulmate 💻❤️.
            </p>
          </div>
          <div className="glass-card feature-card p-6">
            <h3 className="text-xl mb-2">🛠️ Help Box</h3>
            <p>
              Stuck in code, or life? Ask in the Help Box and summon the wisdom  
              of fellow galaxy wanderers ✨.
            </p>
          </div>
        </div>
      </section>

      {/* 🌠 Footer */}
      <footer className="footer text-center py-6 relative z-10">
        <p>© 2025 UniVerse. Built by students, for students 🌠</p>
      </footer>
    </div>
  );
}

