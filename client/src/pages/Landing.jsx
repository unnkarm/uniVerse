import React from "react";

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>🌌 Welcome to UniVerse</h1>
        <p>Where ideas find teammates, and events find YOU ✨</p>
      </section>

      {/* About Us */}
      <section className="section glass-card">
        <h2>About Us</h2>
        <p>
          Born out of sleepless hackathon nights and too much coffee ☕, 
          UniVerse is a cosmic platform where students connect, collaborate, 
          and conquer. We wanted to build a universe where every lost hacker 
          finds their crew 🚀.
        </p>
      </section>

      {/* Our Creation */}
      <section className="section glass-card">
        <h2>Our Creation</h2>
        <p>
          Think of UniVerse as a telescope 🔭 — not for stars, but for 
          hackathons, clubs, and teammates. Instead of wandering blindly, 
          you’ll see constellations of opportunities right where you belong.
        </p>
      </section>

      {/* Features */}
      <section className="section">
        <h2>Our Features</h2>
        <div className="features">
          {/* Event Manager */}
          <div className="glass-card feature-card">
            <h3>📅 Event Manager</h3>
            <p>
              Never miss a college event again! Our Event Manager is like 
              Google Calendar — but with more memes and less guilt.
            </p>
          </div>

          {/* HackMate */}
          <div className="glass-card feature-card">
            <h3>🔥 HackMate</h3>
            <p>
              The Tinder of hackathons — swipe right on coders who don’t ghost 
              your repo. Find your perfect debugging soulmate 💻❤️.
            </p>
          </div>

          {/* Help Box */}
          <div className="glass-card feature-card">
            <h3>🛠️ Help Box</h3>
            <p>
              Stuck in code, or life? Drop a question in our Help Box and 
              summon the wisdom of fellow galaxy wanderers ✨.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 UniVerse. Built by students, for students 🌠</p>
      </footer>
    </div>
  );
}
