import React, { useEffect, useMemo, useState } from "react";

function useAuthHeaders() {
  const token = localStorage.getItem("token"); // ✅ match login
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

function SectionTabs({ tab, setTab }) {
  const tabs = ["Events", "HackMate", "Help Box"];
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={`tab-button ${tab === t ? "active" : ""}`}
          onClick={() => setTab(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const headers = useAuthHeaders();

  useEffect(() => {
    fetch("http://localhost:5000/api/events", { headers })
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error);
  }, [headers]);

  const now = new Date();
  const { recent, live, upcoming } = useMemo(() => {
    const r = [], l = [], u = [];
    events.forEach((ev) => {
      const s = new Date(ev.start), e = new Date(ev.end);
      if (e < now) r.push(ev);
      else if (s <= now && now <= e) l.push(ev);
      else u.push(ev);
    });
    return { recent: r, live: l, upcoming: u };
  }, [events, now]);

  const Section = ({ title, items }) => (
    <div className="feature-card glass-card" style={{ maxWidth: "100%" }}>
      <h3>{title}</h3>
      <div className="card-grid">
        {items.map((ev) => (
          <div key={ev._id || ev.title} className="card">
            <h4>{ev.title}</h4>
            <p>{ev.org}</p>
            <p>
              <strong>{new Date(ev.start).toLocaleString()}</strong> →{" "}
              {new Date(ev.end).toLocaleString()}
            </p>
            <a className="cosmic-btn" href={ev.link} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        ))}
        {items.length === 0 && <p style={{ opacity: 0.7 }}>No items</p>}
      </div>
    </div>
  );

  return (
    <div className="section">
      <h2>Event Tracker</h2>
      <Section title="🔥 Live" items={live} />
      <Section title="🕓 Upcoming" items={upcoming} />
      <Section title="🗓️ Recent" items={recent} />
    </div>
  );
}

function HackMate() {
  const [profiles, setProfiles] = useState([]);
  const [index, setIndex] = useState(0);
  const [hackathon, setHackathon] = useState("");
  const [role, setRole] = useState("");
  const headers = useAuthHeaders();
  const me = JSON.parse(localStorage.getItem("user") || "{}"); // ✅ match server response

  useEffect(() => {
    fetch("http://localhost:5000/api/hackmate/profiles", { headers })
      .then((r) => r.json())
      .then(setProfiles)
      .catch(console.error);
  }, [headers]);

  const current = profiles[index];

  const skip = () => setIndex((i) => Math.min(i + 1, profiles.length));

  const connect = async () => {
    if (!current) return;
    if (!hackathon || !role) return alert("Enter hackathon & role first");
    try {
      const res = await fetch("http://localhost:5000/api/hackmate/request", {
        method: "POST",
        headers,
        body: JSON.stringify({
          toUserId: current._id,
          message: `${me.name || "Someone"} wants you to join ${hackathon} as ${role}`,
          hackathon,
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      alert("✨ Request sent! They’ll get a notification.");
      skip();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="section">
      <h2>HackMate (Tinder for nerds)</h2>
      <div className="glass-card" style={{ maxWidth: 700 }}>
        {!current ? (
          <p style={{ textAlign: "center" }}>No more profiles. Touch grass 🌱</p>
        ) : (
          <div className="swipe-card">
            <img src={current.avatarUrl} alt="avatar" className="avatar" />
            <h3>{current.name}</h3>
            <p>{current.bio}</p>
            <p>
              <strong>Skills:</strong> {current.skills?.join(", ")}
            </p>
            <div className="row">
              <input
                className="neon-input"
                placeholder="Hackathon name"
                value={hackathon}
                onChange={(e) => setHackathon(e.target.value)}
              />
              <input
                className="neon-input"
                placeholder="Role (e.g., Frontend)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="row">
              <button className="cosmic-btn" onClick={skip}>
                👎 Skip
              </button>
              <button className="cosmic-btn" onClick={connect}>
                👍 Connect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HelpBox() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey, I’m UniVerse Assist. Ask me about events, teams, or bugs!" },
  ]);
  const [input, setInput] = useState("");
  const headers = useAuthHeaders();

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "you", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    try {
      const res = await fetch("http://localhost:5000/api/helpbox/ask", {
        method: "POST",
        headers,
        body: JSON.stringify({ question: userMsg.text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.answer }]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: "Server busy. Try again." }]);
    }
  };

  return (
    <div className="section">
      <h2>Help Box (AI-ish)</h2>
      <div className="glass-card chat-window">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.from}`}>
              <span>{m.text}</span>
            </div>
          ))}
        </div>
        <div className="row">
          <input
            className="neon-input"
            placeholder="Type your question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="cosmic-btn" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("Events");
  const [notifs, setNotifs] = useState([]);
  const headers = useAuthHeaders();
  const me = JSON.parse(localStorage.getItem("user") || "{}"); // ✅ match login

  useEffect(() => {
    const pull = () => {
      fetch("http://localhost:5000/api/notifications", { headers })
        .then((r) => r.json())
        .then(setNotifs)
        .catch(() => {});
    };
    pull();
    const t = setInterval(pull, 5000);
    return () => clearInterval(t);
  }, [headers]);

  return (
    <div style={{ paddingTop: 70 }}>
      <div className="topbar glass-card">
        <div>👋 Hi, {me.name || "Explorer"}</div>
        <div>🔔 {notifs.length} notifications</div>
      </div>

      <SectionTabs tab={tab} setTab={setTab} />
      {tab === "Events" && <Events />}
      {tab === "HackMate" && <HackMate />}
      {tab === "Help Box" && <HelpBox />}

      <div className="section" style={{ maxWidth: 900 }}>
        {notifs.map((n) => (
          <div key={n._id} className="card glass-card" style={{ marginBottom: 12 }}>
            <strong>📩 {n.title}</strong>
            <p>{n.message}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </div>
        ))}
        {notifs.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.7 }}>
            No notifications yet. Time to shoot your shot on HackMate 😏
          </p>
        )}
      </div>
    </div>
  );
}
