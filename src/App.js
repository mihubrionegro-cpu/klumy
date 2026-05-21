import React, { useState, useEffect, useRef } from "react";

// ─── Countries & Cities ───────────────────────────────────────────────────────
const COUNTRIES = {
  "Colombia": { flag: "🇨🇴", cities: ["Medellín", "Bogotá", "Cali", "Barranquilla", "Cartagena"] },
  "USA": { flag: "🇺🇸", cities: ["New York", "San Francisco", "Miami", "Los Angeles", "Chicago"] },
  "Mexico": { flag: "🇲🇽", cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla"] },
  "Italy": { flag: "🇮🇹", cities: ["Rome", "Milan", "Florence", "Naples", "Turin"] },
  "Germany": { flag: "🇩🇪", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"] },
  "Nigeria": { flag: "🇳🇬", cities: ["Lagos", "Abuja", "Kano", "Ibadan"] },
  "India": { flag: "🇮🇳", cities: ["Bangalore", "Mumbai", "Delhi", "Chennai"] },
  "Singapore": { flag: "🇸🇬", cities: ["Singapore"] },
  "Brazil": { flag: "🇧🇷", cities: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"] },
  "Spain": { flag: "🇪🇸", cities: ["Madrid", "Barcelona", "Valencia", "Seville"] },
  "UK": { flag: "🇬🇧", cities: ["London", "Manchester", "Birmingham", "Edinburgh"] },
  "France": { flag: "🇫🇷", cities: ["Paris", "Lyon", "Marseille", "Bordeaux"] },
};

// ─── Events ───────────────────────────────────────────────────────────────────
const MOCK_EVENTS = [
  { id: "evt1", name: "Founders Summit Medellín 2026", organizer: "Ruta N", country: "Colombia", city: "Medellín", date: "April 15, 2026", attendees: 450, sponsored: true, logo: "🚀", color: "#2e7d52", revenue: 5000 },
  { id: "evt2", name: "LATAM Tech Connect", organizer: "Endeavor", country: "Mexico", city: "Mexico City", date: "May 20, 2026", attendees: 320, sponsored: true, logo: "⚡", color: "#6366f1", revenue: 3500 },
  { id: "evt3", name: "Milan Fashion Trade Expo", organizer: "Camera Moda Italia", country: "Italy", city: "Milan", date: "March 10, 2026", attendees: 280, sponsored: true, logo: "👜", color: "#ec4899", revenue: 4200 },
  { id: "evt4", name: "Coffee Chat at El Cielo", organizer: "User meetup", country: "Colombia", city: "Medellín", date: "Today", attendees: 2, sponsored: false, logo: "☕", color: "#7a746e", revenue: 0 },
];

// ─── Mock Users ───────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, nombre: "Sarah Chen", empresa: "GreenLoop", sector: "Technology", country: "USA", city: "San Francisco", etapa: "Growth", descripcion: "AI-powered supply chain platform reducing waste by 40%.", que_busca: "Seed investment and enterprise partnerships", que_ofrece: "Proprietary AI technology, 30+ pilot clients", skills: ["AI/ML", "SaaS", "B2B", "Sustainability"], target_countries: ["USA", "Germany", "UK"], linkedin: "sarahchen", verified: true, deals_completed: 12, total_connections: 89, rating: 4.9, reviews: 23, member_since: "2024", email: "sarah@greenloop.io", password: "1234" },
  { id: 2, nombre: "Carlos Rivera", empresa: "FinFlow", sector: "Fintech", country: "Mexico", city: "Mexico City", etapa: "MVP", descripcion: "Micro-lending platform for informal entrepreneurs using AI.", que_busca: "Technical co-founder and banking partnerships", que_ofrece: "500+ active clients, proven model", skills: ["Fintech", "AI", "Financial Inclusion"], target_countries: ["Mexico", "Colombia", "Brazil"], linkedin: "carlosrivera", verified: true, deals_completed: 5, total_connections: 42, rating: 4.7, reviews: 11, member_since: "2024", email: "carlos@finflow.io", password: "1234" },
  { id: 7, nombre: "María Gómez", empresa: "GreenTech", sector: "Technology", country: "Colombia", city: "Medellín", etapa: "Growth", descripcion: "AgriTech platform connecting small farmers with digital markets.", que_busca: "Seed investment and distribution alliances", que_ofrece: "AgriTech, access to rural communities, 200+ farmers", skills: ["AgriTech", "B2B", "Sustainability"], target_countries: ["Colombia", "USA", "Italy"], linkedin: "mariagomez", verified: true, deals_completed: 8, total_connections: 67, rating: 4.8, reviews: 17, member_since: "2023", email: "maria@greentech.co", password: "1234" },
  { id: 8, nombre: "Giovanni Russo", empresa: "SportStyle", sector: "E-commerce", country: "Italy", city: "Milan", etapa: "Growth", descripcion: "Premium sportswear importer across Italy. Sourcing from LATAM.", que_busca: "Sportswear manufacturers in LATAM", que_ofrece: "Distribution network in Italy, 50+ retail clients", skills: ["Import/Export", "Retail", "Fashion"], target_countries: ["Italy", "Colombia", "Brazil"], linkedin: "giovannirusso", verified: true, deals_completed: 24, total_connections: 156, rating: 4.9, reviews: 41, member_since: "2023", email: "giovanni@sportstyle.it", password: "1234" },
  { id: 9, nombre: "Sofia Rossi", empresa: "ExportBridge", sector: "Fintech", country: "Italy", city: "Rome", etapa: "MVP", descripcion: "Export financing for SMEs entering European markets.", que_busca: "LATAM partners and exporters ready for Europe", que_ofrece: "Export financing, customs expertise, EU access", skills: ["Export", "Trade Finance", "Logistics"], target_countries: ["Italy", "Colombia", "Mexico"], linkedin: "sofiarossi", verified: true, deals_completed: 7, total_connections: 53, rating: 4.6, reviews: 14, member_since: "2024", email: "sofia@exportbridge.it", password: "1234" },
  { id: 10, nombre: "Marco Ferrari", empresa: "BrandITA", sector: "E-commerce", country: "Italy", city: "Florence", etapa: "Growth", descripcion: "Brand consultancy for fashion entering Italian markets.", que_busca: "Unique fashion brands from emerging markets", que_ofrece: "Brand strategy, EU distribution, retail connections", skills: ["Branding", "Fashion", "Marketing"], target_countries: ["Italy", "Colombia", "India"], linkedin: "marcoferrari", verified: true, deals_completed: 18, total_connections: 124, rating: 4.8, reviews: 32, member_since: "2023", email: "marco@brandita.it", password: "1234" },
  { id: 11, nombre: "Valentina Cruz", empresa: "SportCo", sector: "E-commerce", country: "Colombia", city: "Medellín", etapa: "Expansion", descripcion: "Colombian sportswear manufacturer exporting to 5 countries.", que_busca: "Importers in Europe and USA, export agents, investors", que_ofrece: "Manufacturing capacity, certified sustainable fabrics", skills: ["Manufacturing", "Export", "Sustainability"], target_countries: ["Colombia", "Italy", "USA", "Spain"], linkedin: "valentinacruz", verified: true, deals_completed: 15, total_connections: 98, rating: 4.9, reviews: 26, member_since: "2023", email: "valentina@sportco.co", password: "1234" },
  { id: 12, nombre: "Ana Restrepo", empresa: "LogiExport", sector: "Technology", country: "Colombia", city: "Bogotá", etapa: "Growth", descripcion: "Export logistics platform for Colombian SMEs.", que_busca: "Exporters ready to scale internationally", que_ofrece: "Full export logistics, 200+ clients", skills: ["Logistics", "Export", "Customs"], target_countries: ["Colombia", "USA", "Spain", "Italy"], linkedin: "anarestrepo", verified: true, deals_completed: 21, total_connections: 145, rating: 4.7, reviews: 38, member_since: "2023", email: "ana@logiexport.co", password: "1234" },
  { id: 13, nombre: "Alex Smith", empresa: "QuickInvest", sector: "Fintech", country: "USA", city: "Miami", etapa: "Idea", descripcion: "Looking for entrepreneurs to invest in opportunities.", que_busca: "Entrepreneurs seeking capital", que_ofrece: "Investment opportunities", skills: ["Investment"], target_countries: ["Colombia", "Mexico"], linkedin: "", verified: false, deals_completed: 0, total_connections: 2, rating: 0, reviews: 0, member_since: "2026", email: "alex@quickinvest.io", password: "1234" },
];

const MOCK_CONEXIONES = { 7: [{ id: 11, event: "evt1" }, { id: 12, event: null }], 11: [{ id: 7, event: "evt1" }] };

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name) => name.split(" ").map(n => n[0]).join("").slice(0, 2);
const sectorColor = { "Technology": "#2e7d52", "Fintech": "#6366f1", "Education": "#f59e0b", "Health": "#ef4444", "E-commerce": "#8b5cf6", "Fashion": "#ec4899" };
const getColor = (s) => sectorColor[s] || "#2e7d52";
const getTrustLevel = (u) => {
  let s = 0;
  if (u.verified) s += 30;
  if (u.linkedin) s += 20;
  s += Math.min(20, (u.deals_completed || 0) * 2);
  s += Math.min(15, (u.total_connections || 0) / 10);
  s += Math.min(15, (u.rating || 0) * 3);
  return Math.round(s);
};
const getTrustBadge = (s) => {
  if (s >= 80) return { label: "Top Rated", color: "#2e7d52", bg: "#d1fae5" };
  if (s >= 60) return { label: "Verified", color: "#ff6b5b", bg: "#ecfdf5" };
  if (s >= 40) return { label: "Established", color: "#6366f1", bg: "#ede9fe" };
  if (s >= 20) return { label: "New Member", color: "#f59e0b", bg: "#fef3c7" };
  return { label: "Unverified", color: "#ef4444", bg: "#fee2e2" };
};

// Active users count per city
const getCityStats = () => {
  const stats = {};
  MOCK_USERS.forEach(u => {
    const k = `${u.country}-${u.city}`;
    stats[k] = (stats[k] || 0) + 1;
  });
  return stats;
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #faf7f2; --surface: #ffffff; --surface2: #faf7f2;
    --border: #ececec; --text: #0a0a0a; --muted: #6b6b6b;
    --green: #ff6b5b; --green-light: rgba(255,107,91,0.12);
    --gold: #2e7d52; --gold-light: #e8f5e9;
    --radius: 16px; --shadow: 0 2px 12px rgba(0,0,0,0.06); --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
    font-family: 'DM Sans', sans-serif;
  }
  body { background: var(--bg); color: var(--text); }
  .display { font-family: 'Syne', sans-serif; }
  .nav { background: var(--surface); border-bottom: 1.5px solid var(--border); position: sticky; top: 0; z-index: 100; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; cursor: pointer; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; color: var(--text); }
  .nav-logo-text { color: var(--text); }
  .nav-links { display: flex; gap: 4px; }
  .nav-btn { background: none; border: none; cursor: pointer; padding: 8px 14px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: var(--muted); transition: all .18s; display: flex; align-items: center; gap: 6px; }
  .nav-btn:hover { background: var(--surface2); color: var(--text); }
  .nav-btn.active { background: var(--green-light); color: var(--green); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; color: white; flex-shrink: 0; position: relative; }
  .verified-dot { position:absolute; bottom:-2px; right:-2px; width:14px; height:14px; background:var(--green); border:2px solid white; border-radius:50%; display:flex; align-items:center; justify-content:center; }
  .btn { border: none; cursor: pointer; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all .18s; display: inline-flex; align-items: center; gap: 6px; }
  .btn-primary { background: var(--text); color: white; padding: 10px 20px; font-size: 14px; }
  .btn-primary:hover { opacity: .85; transform: translateY(-1px); }
  .btn-green { background: var(--green); color: white; padding: 10px 20px; font-size: 14px; }
  .btn-green:hover { opacity: .88; transform: translateY(-1px); }
  .btn-outline { background: none; border: 1.5px solid var(--border); color: var(--text); padding: 9px 18px; font-size: 14px; }
  .btn-outline:hover { border-color: var(--text); background: var(--surface2); }
  .btn-ghost { background: none; border: none; color: var(--muted); padding: 8px 12px; font-size: 13px; }
  .btn-ghost:hover { background: var(--surface2); color: var(--text); }
  .btn-sm { padding: 7px 14px !important; font-size: 13px !important; }
  .btn-icon { padding: 8px; border-radius: 10px; }
  .card { background: var(--surface); border-radius: var(--radius); border: 1.5px solid var(--border); padding: 24px; box-shadow: var(--shadow); }
  .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; gap: 4px; }
  .badge-green { background: var(--green-light); color: var(--green); }
  .badge-gray { background: var(--surface2); color: var(--muted); }
  .badge-dark { background: var(--text); color: white; }
  .badge-warn { background: #fef3c7; color: #d97706; }
  .badge-gold { background: var(--gold-light); color: var(--gold); }
  .input-wrap { display: flex; flex-direction: column; gap: 6px; }
  .label { font-size: 13px; font-weight: 500; color: var(--muted); }
  .input { border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; background: var(--surface); color: var(--text); outline: none; transition: border .15s; width: 100%; }
  .input:focus { border-color: var(--green); }
  select.input { appearance: none; cursor: pointer; }
  textarea.input { resize: vertical; min-height: 80px; }
  .page { max-width: 1160px; margin: 0 auto; padding: 40px 24px; }
  .page-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; letter-spacing: -1px; margin-bottom: 6px; }
  .page-sub { color: var(--muted); font-size: 16px; margin-bottom: 32px; }
  .grid-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  @media (max-width: 900px) { .grid-3,.grid-4 { grid-template-columns: repeat(2,1fr); } .grid-2 { grid-template-columns: 1fr; } }
  @media (max-width: 600px) { .grid-3,.grid-4 { grid-template-columns: 1fr; } }
  .hero { min-height: calc(100vh - 64px); display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8f7f4 60%, #d1fae5 100%); padding: 60px 24px; text-align: center; }
  .hero-inner { max-width: 700px; }
  .hero-tag { display: inline-flex; align-items: center; gap: 6px; background: var(--green-light); color: var(--green); padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(42px, 7vw, 72px); font-weight: 800; line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; }
  .hero-title span { color: var(--green); }
  .hero-sub { font-size: 18px; color: var(--muted); line-height: 1.6; margin-bottom: 36px; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .hero-stats { display: flex; gap: 40px; justify-content: center; margin-top: 60px; padding-top: 40px; border-top: 1.5px solid var(--border); }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
  .stat-label { color: var(--muted); font-size: 14px; margin-top: 2px; }
  .auth-wrap { min-height: calc(100vh - 64px); display: flex; align-items: flex-start; justify-content: center; padding: 32px 16px; }
  .auth-card { width: 100%; max-width: 560px; }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-stack { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
  .swipe-card { background: var(--surface); border-radius: 24px; border: 1.5px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden; transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .3s; }
  .swipe-card.go-left { transform: translateX(-140%) rotate(-18deg); opacity: 0; }
  .swipe-card.go-right { transform: translateX(140%) rotate(18deg); opacity: 0; }
  .swipe-header { padding: 28px 28px 16px; }
  .swipe-body { padding: 0 28px 20px; }
  .swipe-actions { display: flex; gap: 16px; padding: 16px 28px 28px; border-top: 1.5px solid var(--border); }
  .swipe-pass { flex:1; padding:14px; border-radius:14px; border:2px solid #fee2e2; background:white; color:#ef4444; font-family:'Syne',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all .18s; display:flex; align-items:center; justify-content:center; gap:8px; }
  .swipe-pass:hover { background:#fee2e2; transform:translateY(-2px); }
  .swipe-connect { flex:1; padding:14px; border-radius:14px; border:none; background:var(--green); color:white; font-family:'Syne',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all .18s; display:flex; align-items:center; justify-content:center; gap:8px; }
  .swipe-connect:hover { opacity:.88; transform:translateY(-2px); }
  .loc-bar { display:flex; gap:16px; margin-bottom:28px; flex-wrap:wrap; }
  .loc-box { flex:1; min-width:220px; background:var(--surface); border:1.5px solid var(--border); border-radius:14px; padding:14px 18px; }
  .loc-label { font-size:11px; font-weight:700; letter-spacing:.8px; color:var(--muted); margin-bottom:8px; }
  .loc-selects { display:flex; gap:8px; }
  .loc-selects select { flex:1; border:1.5px solid var(--border); border-radius:8px; padding:7px 10px; font-family:'DM Sans',sans-serif; font-size:13px; background:var(--surface2); color:var(--text); outline:none; cursor:pointer; }
  .loc-selects select:focus { border-color:var(--green); }
  .ai-box { background:linear-gradient(135deg,#f0fdf4,#ecfdf5); border:1.5px solid #a7f3d0; border-radius:14px; padding:16px 18px; margin-bottom:16px; }
  .ai-loading { background:var(--surface2); border:1.5px solid var(--border); border-radius:14px; padding:16px 18px; margin-bottom:16px; display:flex; align-items:center; gap:10px; color:var(--muted); font-size:13px; }
  .ai-label { font-size:11px; font-weight:700; letter-spacing:.8px; color:var(--green); margin-bottom:8px; display:flex; align-items:center; gap:5px; }
  .ai-text { font-size:13px; line-height:1.6; color:var(--text); }
  .pct-badge { display:inline-flex; align-items:center; gap:6px; background:var(--green); color:white; padding:4px 12px; border-radius:20px; font-family:'Syne',sans-serif; font-weight:800; font-size:18px; }
  .trust-panel { background: var(--surface2); border-radius: 12px; padding: 14px 16px; margin-top: 12px; }
  .trust-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 13px; }
  .trust-row .val { font-weight: 600; }
  .stars { color: #f59e0b; letter-spacing: 1px; font-size: 12px; }
  .event-card { background: var(--surface); border-radius: 16px; padding: 20px; cursor: pointer; transition: all .2s; border: 1.5px solid var(--border); position: relative; overflow: hidden; }
  .event-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
  .event-sponsor { position: absolute; top: 12px; right: 12px; background: var(--green-light); color: var(--green); font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 10px; letter-spacing: .5px; }
  .event-logo { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
  .qr-box { background: white; border: 3px solid var(--text); border-radius: 16px; padding: 20px; display: inline-block; }
  .qr-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2px; width: 200px; height: 200px; }
  .qr-cell { background: var(--text); border-radius: 1px; }
  .qr-cell.empty { background: white; }
  .msg-layout { display:grid; grid-template-columns:280px 1fr; height:560px; border:1.5px solid var(--border); border-radius:var(--radius); overflow:hidden; background:var(--surface); }
  .msg-sidebar { border-right:1.5px solid var(--border); overflow-y:auto; }
  .msg-item { padding:14px 16px; cursor:pointer; border-bottom:1px solid var(--border); transition:background .15s; display:flex; align-items:center; gap:12px; }
  .msg-item:hover,.msg-item.active { background:var(--surface2); }
  .msg-body { display:flex; flex-direction:column; }
  .msg-header { padding:16px 20px; border-bottom:1.5px solid var(--border); display:flex; align-items:center; gap:12px; }
  .msg-feed { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; }
  .bubble { max-width:70%; padding:10px 14px; border-radius:16px; font-size:14px; line-height:1.5; }
  .bubble.mine { background:var(--text); color:white; margin-left:auto; border-radius:16px 16px 4px 16px; }
  .bubble.theirs { background:var(--surface2); color:var(--text); border-radius:16px 16px 16px 4px; }
  .msg-input { padding:12px 16px; border-top:1.5px solid var(--border); display:flex; gap:10px; }
  .spin { width:20px; height:20px; border:2px solid var(--border); border-top-color:var(--green); border-radius:50%; animation:spin .7s linear infinite; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .empty { text-align:center; padding:60px 20px; color:var(--muted); }
  .toast { position:fixed; bottom:24px; right:24px; background:var(--text); color:white; padding:14px 20px; border-radius:12px; font-size:14px; z-index:999; animation:slideUp .25s ease; box-shadow:var(--shadow-lg); max-width:340px; line-height:1.5; }
  @keyframes slideUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
  .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn .2s ease; }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  .modal { background:var(--surface); border-radius:20px; max-width:520px; width:100%; max-height:90vh; overflow-y:auto; animation:slideUp .25s ease; }
  .modal-header { padding:20px 24px; border-bottom:1.5px solid var(--border); display:flex; justify-content:space-between; align-items:center; }
  .modal-body { padding:24px; }
  .divider { border:none; border-top:1.5px solid var(--border); margin:20px 0; }
  /* Admin */
  .admin-bg { background: linear-gradient(135deg, #1a1714, #2a2520); color: white; min-height: 100vh; padding: 30px 24px; }
  .admin-card { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 20px; }
  .admin-stat { font-family: 'Syne', sans-serif; font-weight: 800; }
  .toggle { width: 44px; height: 24px; border-radius: 12px; background: var(--border); position: relative; cursor: pointer; transition: background .2s; }
  .toggle.on { background: var(--green); }
  .toggle-knob { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: white; transition: transform .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
  .toggle.on .toggle-knob { transform: translateX(20px); }
  .truncate{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
  .clamp2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .clamp3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
  .flex{display:flex;}.items-center{align-items:center;}.justify-between{justify-content:space-between;}.justify-center{justify-content:center;}
  .gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}
  .mt-1{margin-top:4px}.mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}
  .mb-1{margin-bottom:4px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}
  .text-sm{font-size:13px}.text-xs{font-size:11px}.text-lg{font-size:18px}
  .font-bold{font-weight:700}.font-semibold{font-weight:600}.font-medium{font-weight:500}
  .text-muted{color:var(--muted)}.text-green{color:var(--green)}.text-center{text-align:center}
  .w-full{width:100%}.flex-1{flex:1}.flex-wrap{flex-wrap:wrap}

  /* ═══════════ RESPONSIVE MÓVIL ═══════════ */
  /* Tablet y abajo */
  @media (max-width: 768px) {
    .nav { padding: 0 16px; height: 58px; }
    .nav-logo { font-size: 19px; }
    .nav-links { display: none; }  /* ocultamos links de texto en móvil, queda barra inferior */
    .page { padding: 24px 16px 90px; }  /* padding-bottom para barra inferior */
    .page-title { font-size: 26px; }
    .page-sub { font-size: 15px; margin-bottom: 22px; }
    .hero-title { font-size: clamp(38px, 12vw, 54px); }
    .hero-sub { font-size: 16px; }
    .hero { padding: 40px 20px; min-height: auto; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .auth-card { max-width: 100% !important; }
    .auth-card.card { padding: 24px 18px; }
    .auth-title { font-size: 24px; }
    .form-row { grid-template-columns: 1fr; }
    .loc-bar { flex-direction: column; }
    .loc-box { min-width: 100%; }
    .msg-layout { grid-template-columns: 1fr; height: auto; }
    .msg-sidebar { max-height: 180px; border-right: none; border-bottom: 1.5px solid var(--border); }
    .msg-body { height: 440px; }
    /* Explore: tarjeta y sidebar apilados */
    .explore-grid { grid-template-columns: 1fr !important; }
    .explore-sidebar { order: -1; }
  }
  /* Celular */
  @media (max-width: 600px) {
    .nav-right .signout-text { display: none; }  /* solo ícono de salir */
    .nav-right .user-meta { display: none; }     /* ocultar nombre largo en nav */
    .grid-3,.grid-4 { grid-template-columns: 1fr; }
    .swipe-actions { padding: 14px 18px 22px; }
    .swipe-header, .swipe-body { padding-left: 18px; padding-right: 18px; }
    .modal { max-width: 100%; border-radius: 18px 18px 0 0; align-self: flex-end; }
    .modal-backdrop { align-items: flex-end; padding: 0; }
    .hero-stats { gap: 24px; flex-wrap: wrap; }
    .btn { font-size: 15px; }
    .qr-grid { width: 170px; height: 170px; }
    .nav-logo-text { font-size: 18px; }
  }
  /* Barra de navegación inferior (solo móvil, estilo app) */
  .bottom-nav { display: none; }
  @media (max-width: 768px) {
    .bottom-nav {
      display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
      background: var(--surface); border-top: 1.5px solid var(--border);
      padding: 8px 4px calc(8px + env(safe-area-inset-bottom)); justify-content: space-around;
      box-shadow: 0 -2px 16px rgba(0,0,0,0.06);
    }
    .bottom-nav-btn {
      background: none; border: none; cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 3px; padding: 4px 12px; color: var(--muted);
      font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; flex: 1;
    }
    .bottom-nav-btn.active { color: var(--green); }
  }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const p = {
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17z",
    msg: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 7a4 4 0 100 8 4 4 0 000-8z",
    pin: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5",
    send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    x: "M18 6L6 18M6 6l12 12",
    check: "M20 6L9 17l-5-5",
    plus: "M12 5v14M5 12h14",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0c-2.5 2.5-4 6-4 10s1.5 7.5 4 10m0-20c2.5 2.5 4 6 4 10s-1.5 7.5-4 10M2 12h20",
    qr: "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM13 13h2v2h-2zM17 13h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2zM21 13h2v2h-2zM21 17h2v2h-2zM13 21h2v2h-2zM17 21h2v2h-2z",
    shield: "M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z M9 12l2 2 4-4",
    calendar: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM3 10h18M8 2v4M16 2v4",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 10-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z",
    money: "M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={p[name]} />
    </svg>
  );
};

const Toast = ({ message, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  return <div className="toast">{message}</div>;
};

const Av = ({ name, sector, size = 36, verified = false }) => (
  <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.34, background: getColor(sector || "Technology") }}>
    {getInitials(name)}
    {verified && size >= 40 && (
      <div className="verified-dot" style={{ width: size * 0.32, height: size * 0.32 }}>
        <Icon name="check" size={size * 0.16} color="white" />
      </div>
    )}
  </div>
);

const QRPattern = ({ seed = "user" }) => {
  // QR decorativo en SVG (proporción fija, nunca se desborda)
  const N = 21;          // módulos por lado
  const M = 14;          // tamaño de cada módulo en px
  const size = N * M;    // tamaño total
  let s = 0;
  for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i) * (i + 1);
  const rng = (i) => ((Math.sin(s + i * 12.9898) * 43758.5453) % 1 + 1) % 1;
  const isFinder = (r, c) => {
    const inBox = (br, bc) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    const ring = (br, bc) => (r === br || r === br + 6 || c === bc || c === bc + 6);
    const core = (br, bc) => r >= br + 2 && r <= br + 4 && c >= bc + 2 && c <= bc + 4;
    for (const [br, bc] of [[0,0],[0,N-7],[N-7,0]]) {
      if (inBox(br, bc)) return ring(br, bc) || core(br, bc);
    }
    return null;
  };
  const rects = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = isFinder(r, c);
      let fill;
      if (f !== null) fill = f;
      else {
        // dejar libre la zona central para el logo
        const center = r >= 8 && r <= 12 && c >= 8 && c <= 12;
        fill = center ? false : rng(r * N + c) > 0.55;
      }
      if (fill) rects.push(<rect key={r + "-" + c} x={c * M} y={r * M} width={M} height={M} rx="2" fill="#0a0a0a" />);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", maxWidth: "100%", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="#ffffff" />
      {rects}
      {/* logo de eslabones en el centro */}
      <g transform={`translate(${size/2 - 26}, ${size/2 - 26}) scale(0.43)`}>
        <rect x="-6" y="-6" width="132" height="132" rx="20" fill="#ffffff" />
        <g transform="rotate(45 60 60)">
          <rect x="20" y="38" width="56" height="44" rx="22" stroke="#0a0a0a" strokeWidth="13" fill="none" />
          <rect x="44" y="38" width="56" height="44" rx="22" stroke="#ff6b5b" strokeWidth="13" fill="none" />
        </g>
      </g>
    </svg>
  );
};

// ─── AI ───────────────────────────────────────────────────────────────────────
const analyzeMatch = async (user, candidate) => {
  const prompt = `You are a business matching expert for Klumy. Analyze compatibility between two entrepreneurs.

A: ${user.nombre} | ${user.empresa} | ${user.sector} | ${user.country}/${user.city} | ${user.etapa}
Description: ${user.descripcion}
Looking for: ${user.que_busca || "Not specified"}
Offering: ${user.que_ofrece || "Not specified"}
Target markets: ${(user.target_countries || []).join(", ")}

B: ${candidate.nombre} | ${candidate.empresa} | ${candidate.sector} | ${candidate.country}/${candidate.city} | ${candidate.etapa}
Description: ${candidate.descripcion}
Looking for: ${candidate.que_busca || "Not specified"}
Offering: ${candidate.que_ofrece || "Not specified"}
Target markets: ${(candidate.target_countries || []).join(", ")}

Responde SOLO con JSON en español, sin markdown. El campo "reason" debe explicar claramente POR QUÉ encajan estos dos emprendedores (2-3 frases concretas sobre mercados, qué busca uno y ofrece el otro, complementariedad):
{"score":<0-100>,"reason":"<por qué encajan, en español>","synergy":"<frase corta>","recommendation":"<connect o pass>"}`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || "{}";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (e) {
    return smartFallbackMatch(user, candidate);
  }
};

// Cálculo de match basado en datos reales (cuando la IA no responde)
const smartFallbackMatch = (user, candidate) => {
  let score = 45;
  const reasons = [];
  const uTargets = user.target_countries || [];
  const cTargets = candidate.target_countries || [];
  // ¿El candidato está en un mercado que el usuario quiere?
  if (uTargets.includes(candidate.country)) {
    score += 18;
    reasons.push(`${candidate.nombre.split(" ")[0]} opera en ${candidate.country}, uno de tus mercados objetivo`);
  }
  // ¿El usuario está en un mercado que el candidato busca?
  if (cTargets.includes(user.country)) {
    score += 12;
    reasons.push(`busca expandirse a ${user.country}, donde tú estás`);
  }
  // Mercados objetivo en común
  const sharedTargets = uTargets.filter(t => cTargets.includes(t));
  if (sharedTargets.length > 0) {
    score += 8;
    reasons.push(`comparten interés en ${sharedTargets.slice(0, 2).join(" y ")}`);
  }
  // Complementariedad sector
  if (candidate.sector !== user.sector) {
    score += 6;
    reasons.push(`sus sectores (${user.sector} y ${candidate.sector}) se complementan`);
  } else {
    score += 4;
  }
  // Confianza del candidato
  if (candidate.verified) score += 5;
  if ((candidate.deals_completed || 0) > 10) {
    score += 6;
    reasons.push(`tiene ${candidate.deals_completed} negocios cerrados`);
  }
  score = Math.min(94, Math.max(40, score));
  const reasonText = reasons.length > 0
    ? "Encajan porque " + reasons.slice(0, 3).join("; ") + "."
    : `Ambos son emprendedores con perfiles que pueden complementarse en ${candidate.sector}.`;
  return {
    score,
    reason: reasonText,
    synergy: sharedTargets.length > 0 || uTargets.includes(candidate.country) ? "Sinergia de mercado" : "Posibles aliados",
    recommendation: score >= 60 ? "connect" : "pass"
  };
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
// ─── Klumy Logo (interlocking links) ──────────────────────────────────────────
const KlumyLogo = ({ size = 30, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <g transform="rotate(45 60 60)">
      <rect x="20" y="38" width="56" height="44" rx="22" stroke={dark ? "#ffffff" : "#0a0a0a"} strokeWidth="13" fill="none" />
      <rect x="44" y="38" width="56" height="44" rx="22" stroke="#ff6b5b" strokeWidth="13" fill="none" />
    </g>
  </svg>
);

const Nav = ({ page, setPage, user, setUser }) => {
  const links = user ? [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "explore", label: "Explore", icon: "globe" },
    { id: "events", label: "Events", icon: "calendar" },
    { id: "messages", label: "Messages", icon: "msg" },
  ] : [];
  return (
    <nav className="nav">
      <div className="flex items-center gap-4">
        <span className="nav-logo display" onClick={() => setPage("home")}>
          <KlumyLogo size={30} />
          <span className="nav-logo-text">Klumy</span>
        </span>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className={`nav-btn ${page === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>
              <Icon name={l.icon} size={15} /> {l.label}
            </button>
          ))}
        </div>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <Av name={user.nombre} sector={user.sector} size={34} />
            <div className="user-meta" style={{ lineHeight: 1.3 }}>
              <div className="text-sm font-semibold flex items-center gap-1">
                {user.nombre}
                {user.verified && <Icon name="check" size={12} color="var(--green)" />}
              </div>
              <div className="text-xs text-muted">{COUNTRIES[user.country]?.flag} {user.city}</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setUser(null); setPage("home"); }}>
              <Icon name="logout" size={14} /> <span className="signout-text">Sign out</span>
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline btn-sm" onClick={() => setPage("login")}>Sign in</button>
            <button className="btn btn-primary btn-sm" onClick={() => setPage("register")}>Get started</button>
          </>
        )}
      </div>
    </nav>
  );
};

// ─── Home ─────────────────────────────────────────────────────────────────────
const Home = ({ setPage }) => (
  <div className="hero">
    <div className="hero-inner">
      <div className="hero-tag">✦ AI Matching · Verified Profiles · Live Events</div>
      <h1 className="hero-title display">Find your perfect<br /><span>business match.</span></h1>
      <p className="hero-sub">Klumy helps entrepreneurs find — and never lose — the people who can change their business. Verified profiles, AI matches, real connections.</p>
      <div className="hero-btns">
        <button className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 16 }} onClick={() => setPage("register")}>Start for free →</button>
        <button className="btn btn-outline" style={{ padding: "14px 28px", fontSize: 16 }} onClick={() => setPage("login")}>Sign in</button>
      </div>
      <div className="hero-stats">
        {[["10k+", "Entrepreneurs"], ["150+", "Countries"], ["✓", "Verified Profiles"]].map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="stat-num display">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({ setPage, setUser, showToast }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const handle = () => {
    if (email === "admin@klumy.app" && pass === "admin") { setPage("admin"); return; }
    const found = MOCK_USERS.find(u => u.email === email && u.password === pass);
    if (found) { setUser(found); setPage("explore"); showToast(`Welcome back, ${found.nombre.split(" ")[0]}! 👋`); }
    else setErr("Invalid email or password");
  };
  return (
    <div className="auth-wrap">
      <div className="card auth-card" style={{ maxWidth: 440 }}>
        <div className="auth-title display">Welcome back</div>
        <div className="text-muted text-sm">Sign in to your Klumy account</div>
        {err && <div style={{ background: "#fee2e2", color: "#ef4444", padding: "10px 14px", borderRadius: 10, fontSize: 14, marginTop: 12 }}>{err}</div>}
        <div className="form-stack">
          <div className="input-wrap"><label className="label">Email</label><input className="input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="input-wrap"><label className="label">Password</label><input className="input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} /></div>
          <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 12 }} onClick={handle}>Sign in</button>
        </div>
        <hr className="divider" />
        <div className="text-sm text-muted text-center">No account? <span style={{ color: "var(--green)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage("register")}>Sign up</span></div>
        <div className="text-xs text-muted text-center mt-3">
          User demo: <strong>valentina@sportco.co</strong> / <strong>1234</strong><br />
          Admin: <strong>admin@klumy.app</strong> / <strong>admin</strong>
        </div>
      </div>
    </div>
  );
};

// ─── Register ─────────────────────────────────────────────────────────────────
const Register = ({ setPage, setUser, showToast }) => {
  const DRAFT_KEY = "klumy_register_draft";
  const defaultForm = {
    nombre: "", empresa: "", sector: "Technology", country: "Colombia", city: "Medellín",
    etapa: "Idea", email: "", password: "", descripcion: "",
    que_busca: "", que_ofrece: "", skills: "", target_countries: [], linkedin: ""
  };
  // Recuperar borrador guardado (si volviste de LinkedIn, etc.)
  const loadDraft = () => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) return { ...defaultForm, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultForm;
  };
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(loadDraft);
  // Guardar borrador automáticamente cada vez que cambia el formulario
  useEffect(() => {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form)); } catch (e) {}
  }, [form]);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleTarget = (c) => setForm(p => ({ ...p, target_countries: p.target_countries.includes(c) ? p.target_countries.filter(x => x !== c) : [...p.target_countries, c] }));
  const handle = () => {
    if (!form.nombre || !form.email || !form.empresa) { showToast("Please fill in required fields"); return; }
    const newUser = { ...form, id: Date.now(), skills: form.skills.split(",").map(s => s.trim()).filter(Boolean), verified: !!form.linkedin, deals_completed: 0, total_connections: 0, rating: 0, reviews: 0, member_since: "2026" };
    MOCK_USERS.push(newUser);
    try { sessionStorage.removeItem(DRAFT_KEY); } catch (e) {}
    setUser(newUser);
    setPage("explore");
    showToast(`Welcome to Klumy, ${newUser.nombre.split(" ")[0]}! 🚀`);
  };
  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <div className="auth-title display">Create your profile</div>
        <div className="text-muted text-sm mb-2">Step {step} of 2</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 20, marginTop: 12 }}>
          {[1, 2].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? "var(--green)" : "var(--border)", transition: "background .3s" }} />)}
        </div>
        {step === 1 && (
          <div className="form-stack">
            <div className="form-row">
              <div className="input-wrap"><label className="label">Full name *</label><input className="input" placeholder="Your name" value={form.nombre} onChange={e => set("nombre", e.target.value)} /></div>
              <div className="input-wrap"><label className="label">Company *</label><input className="input" placeholder="Company name" value={form.empresa} onChange={e => set("empresa", e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="input-wrap"><label className="label">Sector</label>
                <select className="input" value={form.sector} onChange={e => set("sector", e.target.value)}>
                  {["Technology","Fintech","Health","Education","E-commerce","Fashion","Manufacturing","Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="input-wrap"><label className="label">Stage</label>
                <select className="input" value={form.etapa} onChange={e => set("etapa", e.target.value)}>
                  {["Idea","Validation","MVP","Growth","Expansion"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="input-wrap"><label className="label">📍 Country</label>
                <select className="input" value={form.country} onChange={e => { set("country", e.target.value); set("city", COUNTRIES[e.target.value]?.cities[0] || ""); }}>
                  {Object.keys(COUNTRIES).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-wrap"><label className="label">City</label>
                <select className="input" value={form.city} onChange={e => set("city", e.target.value)}>
                  {(COUNTRIES[form.country]?.cities || []).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="input-wrap"><label className="label">Email *</label><input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} /></div>
            <div className="input-wrap"><label className="label">Password</label><input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} /></div>
            <div className="input-wrap">
              <label className="label">🔗 LinkedIn (gives Verified badge)</label>
              <input className="input" placeholder="your linkedin username" value={form.linkedin} onChange={e => set("linkedin", e.target.value)} />
            </div>
            <button className="btn btn-primary w-full" style={{ justifyContent: "center", padding: 12 }} onClick={() => { if (!form.nombre || !form.email) { showToast("Fill required fields"); return; } setStep(2); }}>Continue →</button>
          </div>
        )}
        {step === 2 && (
          <div className="form-stack">
            <div className="input-wrap"><label className="label">About your venture</label><textarea className="input" placeholder="What does your company do?" value={form.descripcion} onChange={e => set("descripcion", e.target.value)} /></div>
            <div className="form-row">
              <div className="input-wrap"><label className="label">What do you need?</label><input className="input" placeholder="investors, importers..." value={form.que_busca} onChange={e => set("que_busca", e.target.value)} /></div>
              <div className="input-wrap"><label className="label">What do you offer?</label><input className="input" placeholder="manufacturing..." value={form.que_ofrece} onChange={e => set("que_ofrece", e.target.value)} /></div>
            </div>
            <div className="input-wrap"><label className="label">Skills (comma separated)</label><input className="input" placeholder="Export, Manufacturing..." value={form.skills} onChange={e => set("skills", e.target.value)} /></div>
            <div className="input-wrap">
              <label className="label">🌍 Target markets</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(COUNTRIES).map(([c, { flag }]) => (
                  <button key={c} type="button" className={`btn btn-sm ${form.target_countries.includes(c) ? "btn-green" : "btn-outline"}`} style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => toggleTarget(c)}>{flag} {c}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary flex-1" style={{ justifyContent: "center", padding: 12 }} onClick={handle}>Create profile →</button>
            </div>
          </div>
        )}
        <div className="text-sm text-muted text-center mt-3">
          Already have an account? <span style={{ color: "var(--green)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage("login")}>Sign in</span>
        </div>
      </div>
    </div>
  );
};

// ─── Trust Panel ──────────────────────────────────────────────────────────────
const TrustPanel = ({ user }) => {
  const trust = getTrustLevel(user);
  const badge = getTrustBadge(trust);
  return (
    <div className="trust-panel">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-bold text-muted">TRUST SCORE</div>
        <span className="badge" style={{ background: badge.bg, color: badge.color, fontWeight: 600 }}>
          <Icon name="shield" size={11} color={badge.color} /> {badge.label}
        </span>
      </div>
      <div className="trust-row"><span className="text-muted">Verified</span><span className="val">{user.verified ? <Icon name="check" size={14} color="var(--green)" /> : "—"}</span></div>
      <div className="trust-row"><span className="text-muted">LinkedIn</span><span className="val">{user.linkedin ? <Icon name="check" size={14} color="var(--green)" /> : "—"}</span></div>
      <div className="trust-row"><span className="text-muted">Deals completed</span><span className="val">{user.deals_completed || 0}</span></div>
      <div className="trust-row"><span className="text-muted">Connections</span><span className="val">{user.total_connections || 0}</span></div>
      <div className="trust-row"><span className="text-muted">Rating</span><span className="val">{user.rating > 0 ? <><span className="stars">{"★".repeat(Math.round(user.rating))}</span> {user.rating} ({user.reviews})</> : "No reviews"}</span></div>
      <div className="trust-row"><span className="text-muted">Member since</span><span className="val">{user.member_since}</span></div>
    </div>
  );
};

// ─── Explore ──────────────────────────────────────────────────────────────────
const Explore = ({ user, connections, setConnections, showToast }) => {
  const [myCountry, setMyCountry] = useState(user?.country || "Colombia");
  const [myCity, setMyCity] = useState(user?.city || "Medellín");
  const [exploreCountry, setExploreCountry] = useState(user?.country || "Colombia");
  const [exploreCity, setExploreCity] = useState(user?.city || "Medellín");
  const [candidates, setCandidates] = useState([]);
  const [idx, setIdx] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [swiping, setSwiping] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const pool = MOCK_USERS.filter(u => {
      if (u.id === user?.id) return false;
      if (connections.find(c => c.id === u.id)) return false;
      return u.country === exploreCountry && u.city === exploreCity;
    });
    setCandidates(pool);
    setIdx(0);
    setAiAnalysis(null);
  }, [exploreCountry, exploreCity]);

  const current = candidates[idx];
  useEffect(() => {
    if (current && user) {
      setAiLoading(true);
      setAiAnalysis(null);
      analyzeMatch(user, current).then(r => { setAiAnalysis(r); setAiLoading(false); });
    }
  }, [current]);

  const doSwipe = (dir) => {
    setSwiping(dir);
    setTimeout(() => {
      if (dir === "right") {
        setConnections(prev => [...prev, { ...current, event: null }]);
        setHistory(h => [...h, { name: current.nombre, action: "connect" }]);
        showToast(`✅ Connected with ${current.nombre}!`);
      } else {
        setHistory(h => [...h, { name: current.nombre, action: "pass" }]);
      }
      setSwiping(null);
      setAiAnalysis(null);
      setIdx(i => i + 1);
    }, 350);
  };

  const trust = current ? getTrustLevel(current) : 0;
  const trustBadge = current ? getTrustBadge(trust) : null;

  return (
    <div className="page">
      <div className="page-title display">Explore</div>
      <div className="page-sub">Discover entrepreneurs anywhere in the world — completely free during launch 🚀</div>

      <div className="loc-bar">
        <div className="loc-box">
          <div className="loc-label">📍 MY BUSINESS LOCATION</div>
          <div className="loc-selects">
            <select value={myCountry} onChange={e => { setMyCountry(e.target.value); setMyCity(COUNTRIES[e.target.value]?.cities[0]); }}>
              {Object.entries(COUNTRIES).map(([c, { flag }]) => <option key={c} value={c}>{flag} {c}</option>)}
            </select>
            <select value={myCity} onChange={e => setMyCity(e.target.value)}>
              {(COUNTRIES[myCountry]?.cities || []).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="loc-box" style={{ borderColor: "var(--green)", background: "#f0fdf4" }}>
          <div className="loc-label" style={{ color: "var(--green)" }}>🔍 EXPLORING</div>
          <div className="loc-selects">
            <select value={exploreCountry} onChange={e => { setExploreCountry(e.target.value); setExploreCity(COUNTRIES[e.target.value]?.cities[0]); }}>
              {Object.entries(COUNTRIES).map(([c, { flag }]) => <option key={c} value={c}>{flag} {c}</option>)}
            </select>
            <select value={exploreCity} onChange={e => setExploreCity(e.target.value)}>
              {(COUNTRIES[exploreCountry]?.cities || []).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="explore-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
        <div>
          {!current ? (
            <div className="card empty" style={{ border: "none" }}>
              <Icon name="globe" size={48} color="var(--muted)" />
              <div className="font-bold text-lg mt-3">No entrepreneurs in {exploreCity}</div>
              <div className="text-sm mt-2">Try a different city or country</div>
            </div>
          ) : (
            <>
              <div className={`swipe-card ${swiping === "left" ? "go-left" : swiping === "right" ? "go-right" : ""}`}>
                <div className="swipe-header">
                  <div className="flex items-center gap-4">
                    <Av name={current.nombre} sector={current.sector} size={64} verified={current.verified} />
                    <div className="flex-1">
                      <div className="font-bold display flex items-center gap-2" style={{ fontSize: 22 }}>
                        {current.nombre}
                        {current.linkedin && <Icon name="linkedin" size={14} color="#0a66c2" />}
                      </div>
                      <div className="text-green font-semibold">{current.empresa}</div>
                      <div className="flex gap-3 mt-1 text-muted text-sm flex-wrap">
                        <span className="flex items-center gap-1"><Icon name="pin" size={12} />{COUNTRIES[current.country]?.flag} {current.city}</span>
                        <span className="flex items-center gap-1"><Icon name="building" size={12} />{current.sector}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="badge" style={{ background: trustBadge.bg, color: trustBadge.color, fontWeight: 600 }}>
                      <Icon name="shield" size={11} color={trustBadge.color} /> {trustBadge.label}
                    </span>
                    {current.rating > 0 && <span className="badge badge-gray"><span className="stars">★</span> {current.rating} ({current.reviews})</span>}
                    {current.deals_completed > 0 && <span className="badge badge-gray">🤝 {current.deals_completed} deals</span>}
                    <span className="badge badge-gray">{current.etapa}</span>
                    {!current.verified && <span className="badge badge-warn">⚠ Unverified</span>}
                  </div>
                </div>
                <div className="swipe-body">
                  {aiLoading && <div className="ai-loading"><div className="spin" /><span>AI analyzing compatibility...</span></div>}
                  {aiAnalysis && !aiLoading && (
                    <div className="ai-box">
                      <div className="ai-label"><Icon name="sparkles" size={12} color="var(--green)" /> AI MATCH ANALYSIS</div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div className="pct-badge">{aiAnalysis.score}%</div>
                        <span className="badge badge-dark" style={{ fontSize: 11 }}>{aiAnalysis.synergy}</span>
                      </div>
                      <div className="ai-text">{aiAnalysis.reason}</div>
                    </div>
                  )}
                  <p className="text-sm clamp3 mb-4" style={{ color: "var(--muted)", lineHeight: 1.7 }}>{current.descripcion}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px" }}>
                      <div className="text-xs font-bold text-muted mb-1">LOOKING FOR</div>
                      <div className="text-sm clamp2">{current.que_busca || "—"}</div>
                    </div>
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px" }}>
                      <div className="text-xs font-bold text-muted mb-1">OFFERING</div>
                      <div className="text-sm clamp2">{current.que_ofrece || "—"}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(current.skills || []).map((s, i) => <span key={i} className="badge badge-green">{s}</span>)}
                  </div>
                </div>
                <div className="swipe-actions">
                  <button className="swipe-pass" onClick={() => doSwipe("left")}><Icon name="x" size={18} color="#ef4444" /> Pass</button>
                  <button className="swipe-connect" onClick={() => doSwipe("right")}><Icon name="heart" size={18} color="white" /> Connect</button>
                </div>
              </div>
              <div className="text-center mt-3 text-xs text-muted">{candidates.length - idx - 1} more in {exploreCity}</div>
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ border: "none" }}>
            <div className="font-bold display mb-3">Session</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ l: "Reviewed", v: history.length, c: "var(--text)" }, { l: "Connected", v: history.filter(h => h.action === "connect").length, c: "var(--green)" }].map(s => (
                <div key={s.l} style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 24, color: s.c }}>{s.v}</div>
                  <div className="text-xs text-muted mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, var(--gold-light), #fef9c3)", borderRadius: 14, padding: 16, border: "1.5px solid var(--gold)" }}>
            <div className="text-xs font-bold mb-2" style={{ color: "var(--gold)" }}>🎁 LAUNCH OFFER</div>
            <div className="text-sm font-semibold mb-1">All features free</div>
            <div className="text-xs text-muted" style={{ lineHeight: 1.5 }}>
              Explore the world unlimited during our launch phase. Premium plans coming soon for power users.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Events ───────────────────────────────────────────────────────────────────
const Events = ({ user, connections, setConnections, showToast, setPage }) => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [scanModal, setScanModal] = useState(false);

  const joinEvent = (evt) => {
    setActiveEvent(evt);
    showToast(`✓ Estás en ${evt.name}. Mira quién está presente 👇`);
    setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, 150);
  };
  const simulateScan = (other) => {
    setScanModal(false);
    setConnections(prev => [...prev, { ...other, event: activeEvent?.id }]);
    showToast(`🎉 Connected with ${other.nombre} at ${activeEvent?.name || "this meetup"}!`);
  };

  const attendees = activeEvent
    ? MOCK_USERS
        .filter(u => u.id !== user.id)
        .map(u => ({ ...u, _m: smartFallbackMatch(user, u).score }))
        .sort((a, b) => b._m - a._m)
        .slice(0, 8)
    : [];

  return (
    <div className="page">
      <div className="page-title display">Events</div>
      <div className="page-sub">Join events, share your QR, and connect instantly with people you meet in person</div>

      {activeEvent && (
        <div className="card mb-4" style={{ border: "none", background: "linear-gradient(135deg, var(--text), #2a2520)", color: "white" }}>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="event-logo" style={{ background: activeEvent.color, color: "white" }}>{activeEvent.logo}</div>
              <div>
                <div className="text-xs" style={{ opacity: .7, letterSpacing: 1 }}>YOU'RE ACTIVE AT</div>
                <div className="font-bold text-lg display">{activeEvent.name}</div>
                <div className="text-sm" style={{ opacity: .8 }}>{activeEvent.attendees}+ attendees connected</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-green btn-sm" onClick={() => setShowQR(true)}><Icon name="qr" size={14} /> Show My QR</button>
              <button className="btn btn-outline btn-sm" style={{ background: "white", color: "var(--text)" }} onClick={() => setScanModal(true)}>📱 Scan QR</button>
              <button className="btn btn-ghost btn-sm" style={{ color: "white" }} onClick={() => setActiveEvent(null)}>Leave</button>
            </div>
          </div>
        </div>
      )}

      {activeEvent && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold display text-lg">Personas en este evento</div>
            <span className="badge badge-green">{attendees.length} presentes</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {attendees.map((a, idx) => {
              const isTop = idx < 2; // primeros 2 = destacados por IA
              const fb = smartFallbackMatch(user, a);
              return (
                <div key={a.id} className="card" style={{ padding: 14, border: isTop ? "1.5px solid var(--green)" : "1.5px solid var(--border)" }}>
                  <div className="flex items-center gap-3">
                    <Av name={a.nombre} sector={a.sector} size={46} verified={a.verified} />
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <div className="font-semibold flex items-center gap-1">
                        {a.nombre}
                        {a.linkedin && <Icon name="linkedin" size={11} color="#0a66c2" />}
                      </div>
                      <div className="text-xs text-muted truncate">{a.empresa} · {COUNTRIES[a.country]?.flag} {a.city}</div>
                    </div>
                    {isTop && <span className="badge badge-green" style={{ fontSize: 10 }}>✦ {fb.score}% match</span>}
                  </div>
                  {isTop && (
                    <div className="ai-box" style={{ marginTop: 10, marginBottom: 10 }}>
                      <div className="ai-label"><Icon name="sparkles" size={11} color="var(--green)" /> POR QUÉ CONECTAR</div>
                      <div className="ai-text">{fb.reason}</div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button className="btn btn-green btn-sm flex-1" style={{ justifyContent: "center" }} onClick={() => {
                      if (!connections.find(c => c.id === a.id)) {
                        setConnections(prev => [...prev, { ...a, event: activeEvent.id }]);
                      }
                      showToast(`💬 Chat abierto con ${a.nombre.split(" ")[0]}`);
                      setPage("messages");
                    }}><Icon name="msg" size={13} color="white" /> Escribir</button>
                    <button className="btn btn-outline btn-sm flex-1" style={{ justifyContent: "center" }} onClick={() => {
                      if (!connections.find(c => c.id === a.id)) {
                        setConnections(prev => [...prev, { ...a, event: activeEvent.id }]);
                        showToast(`✅ Conectaste con ${a.nombre.split(" ")[0]}`);
                      } else {
                        showToast(`Ya estás conectado con ${a.nombre.split(" ")[0]}`);
                      }
                    }}><Icon name="heart" size={13} /> Conectar</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="font-bold display text-lg mb-3">Live & Upcoming Events</div>
      <div className="grid-3 mb-4">
        {MOCK_EVENTS.map(evt => (
          <div key={evt.id} className="event-card" onClick={() => joinEvent(evt)}>
            {evt.sponsored && <div className="event-sponsor">SPONSORED</div>}
            <div className="event-logo mb-3" style={{ background: evt.color + "20", color: evt.color }}>{evt.logo}</div>
            <div className="font-bold mb-1">{evt.name}</div>
            <div className="text-xs text-muted mb-2">by {evt.organizer}</div>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="badge badge-gray">📍 {evt.city}</span>
              <span className="badge badge-gray">📅 {evt.date}</span>
              <span className="badge badge-gray">👥 {evt.attendees}</span>
            </div>
            <button className="btn btn-green btn-sm w-full" style={{ justifyContent: "center" }}>Join Event</button>
          </div>
        ))}
      </div>

      <div className="card" style={{ border: "none", background: "linear-gradient(135deg, var(--green-light), #ecfdf5)", textAlign: "center", padding: 32 }}>
        <div className="display font-bold text-lg mb-2">📣 Organize an event?</div>
        <div className="text-sm text-muted mb-3" style={{ maxWidth: 480, margin: "0 auto" }}>
          Promote your event to thousands of entrepreneurs. Featured listings, custom branding, and detailed analytics on connections made.
        </div>
        <button className="btn btn-primary btn-sm">Become a sponsor →</button>
      </div>

      {showQR && (
        <div className="modal-backdrop" onClick={() => setShowQR(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div><div className="font-bold display text-lg">Your QR Code</div><div className="text-xs text-muted">Others scan this to connect with you</div></div>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowQR(false)}><Icon name="x" size={16} /></button>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <div className="qr-box mb-4"><QRPattern seed={user.email} /></div>
              <div className="font-bold display text-lg">{user.nombre}</div>
              <div className="text-green font-medium">{user.empresa}</div>
              {activeEvent && <div className="badge badge-green mt-3" style={{ padding: "6px 14px" }}>📍 At {activeEvent.name}</div>}
              <div className="text-xs text-muted mt-3">When someone scans this, you'll be connected automatically.</div>
            </div>
          </div>
        </div>
      )}

      {scanModal && (
        <div className="modal-backdrop" onClick={() => setScanModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div><div className="font-bold display text-lg">Connect with attendees</div><div className="text-xs text-muted">Tap a person to connect instantly</div></div>
              <button className="btn btn-ghost btn-icon" onClick={() => setScanModal(false)}><Icon name="x" size={16} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {attendees.map(a => (
                  <div key={a.id} onClick={() => simulateScan(a)} style={{ cursor: "pointer", padding: 12, borderRadius: 12, border: "1.5px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
                    <Av name={a.nombre} sector={a.sector} size={42} verified={a.verified} />
                    <div className="flex-1">
                      <div className="font-semibold flex items-center gap-1">{a.nombre}{a.linkedin && <Icon name="linkedin" size={11} color="#0a66c2" />}</div>
                      <div className="text-xs text-muted">{a.empresa} · {COUNTRIES[a.country]?.flag} {a.city}</div>
                    </div>
                    <Icon name="qr" size={18} color="var(--green)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({ user, setPage, connections }) => {
  const trust = getTrustLevel(user);
  const stats = [
    { label: "Connections", value: connections.length, icon: "users", color: "#2e7d52", bg: "#d1fae5" },
    { label: "Trust Score", value: trust, icon: "shield", color: "#ff6b5b", bg: "#ecfdf5" },
    { label: "Target Markets", value: (user.target_countries || []).length, icon: "globe", color: "#6366f1", bg: "#ede9fe" },
    { label: "Messages", value: 0, icon: "msg", color: "#3b82f6", bg: "#dbeafe" },
  ];
  return (
    <div className="page">
      <div className="page-title display">Hey, {user.nombre.split(" ")[0]}! 👋</div>
      <div className="page-sub">Your Klumy overview</div>
      <div className="grid-4 mb-4">
        {stats.map(s => (
          <div key={s.label} className="card" style={{ border: "none" }}>
            <div className="flex justify-between items-center">
              <div><div className="text-muted text-sm mb-1">{s.label}</div><div className="display font-bold" style={{ fontSize: 28 }}>{s.value}</div></div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={20} color={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card" style={{ border: "none" }}>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-lg display">Recent Connections</div>
            <button className="btn btn-outline btn-sm" onClick={() => setPage("explore")}>Explore more</button>
          </div>
          {connections.length === 0 ? (
            <div className="empty" style={{ padding: "30px 0" }}>
              <Icon name="globe" size={36} color="var(--muted)" />
              <div className="font-semibold mt-3">No connections yet</div>
              <button className="btn btn-green mt-3 btn-sm" onClick={() => setPage("explore")}>Start Exploring</button>
            </div>
          ) : connections.map(c => {
            const event = c.event ? MOCK_EVENTS.find(e => e.id === c.event) : null;
            return (
              <div key={c.id} className="flex items-center gap-3 mb-3" style={{ padding: "12px", background: "var(--surface2)", borderRadius: 12 }}>
                <Av name={c.nombre} sector={c.sector} size={42} verified={c.verified} />
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-1">{c.nombre}{c.linkedin && <Icon name="linkedin" size={11} color="#0a66c2" />}</div>
                  <div className="text-sm text-muted">{c.empresa} · {c.sector}</div>
                  <div className="text-xs text-muted mt-1 flex items-center gap-2 flex-wrap">
                    <span>{COUNTRIES[c.country]?.flag} {c.city}</span>
                    {event && <span className="badge badge-green" style={{ fontSize: 10, padding: "2px 8px" }}>{event.logo} {event.name}</span>}
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setPage("messages")}><Icon name="msg" size={13} /> Chat</button>
              </div>
            );
          })}
        </div>
        <div className="card" style={{ border: "none" }}>
          <div className="font-bold display mb-3">My Profile</div>
          <div className="text-center">
            <Av name={user.nombre} sector={user.sector} size={56} verified={user.verified} />
            <div className="font-bold mt-2 flex items-center justify-center gap-1">{user.nombre}{user.linkedin && <Icon name="linkedin" size={14} color="#0a66c2" />}</div>
            <div className="text-green font-medium text-sm">{user.empresa}</div>
            <div className="text-muted text-xs mt-1">{COUNTRIES[user.country]?.flag} {user.city}, {user.country}</div>
          </div>
          <TrustPanel user={user} />
          {(user.target_countries || []).length > 0 && (
            <div className="mt-3">
              <div className="text-xs font-bold text-muted mb-2">TARGET MARKETS</div>
              <div className="flex flex-wrap gap-1">
                {user.target_countries.map(c => <span key={c} className="badge badge-gray">{COUNTRIES[c]?.flag} {c}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Messages ─────────────────────────────────────────────────────────────────
const Messages = ({ user, connections }) => {
  const [active, setActive] = useState(connections[0] || null);
  const [msgs, setMsgs] = useState({});
  const [text, setText] = useState("");
  const feedRef = useRef();
  useEffect(() => { if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight; }, [msgs, active]);
  const send = () => {
    if (!text.trim() || !active) return;
    const key = [user.id, active.id].sort().join("-");
    setMsgs(prev => ({ ...prev, [key]: [...(prev[key] || []), { from: user.id, text, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] }));
    setText("");
  };
  const getConvo = (other) => msgs[[user.id, other.id].sort().join("-")] || [];
  if (connections.length === 0) return (
    <div className="page">
      <div className="page-title display">Messages</div>
      <div className="empty"><Icon name="msg" size={48} color="var(--muted)" /><div className="font-bold text-lg mt-3">No connections yet</div></div>
    </div>
  );
  return (
    <div className="page">
      <div className="page-title display">Messages</div>
      <div className="msg-layout mt-4">
        <div className="msg-sidebar">
          <div style={{ padding: "14px 16px", borderBottom: "1.5px solid var(--border)", fontFamily: "Syne", fontWeight: 700, fontSize: 14 }}>
            Conversations ({connections.length})
          </div>
          {connections.map(c => (
            <div key={c.id} className={`msg-item ${active?.id === c.id ? "active" : ""}`} onClick={() => setActive(c)}>
              <Av name={c.nombre} sector={c.sector} size={36} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{c.nombre}</div>
                <div className="text-xs text-muted">{COUNTRIES[c.country]?.flag} {c.city}</div>
              </div>
            </div>
          ))}
        </div>
        {active ? (
          <div className="msg-body">
            <div className="msg-header">
              <Av name={active.nombre} sector={active.sector} size={36} verified={active.verified} />
              <div>
                <div className="font-bold flex items-center gap-1">{active.nombre}{active.linkedin && <Icon name="linkedin" size={12} color="#0a66c2" />}</div>
                <div className="text-xs text-muted">{active.empresa} · {COUNTRIES[active.country]?.flag} {active.city}</div>
              </div>
            </div>
            <div className="msg-feed" ref={feedRef}>
              {getConvo(active).length === 0
                ? <div className="empty" style={{ padding: 30 }}><div className="text-sm">Say hi to {active.nombre.split(" ")[0]}! 👋</div></div>
                : getConvo(active).map((m, i) => (
                  <div key={i} className={`bubble ${m.from === user.id ? "mine" : "theirs"}`}>
                    {m.text}
                    <div style={{ fontSize: 10, opacity: .6, marginTop: 4, textAlign: m.from === user.id ? "right" : "left" }}>{m.ts}</div>
                  </div>
                ))}
            </div>
            <div className="msg-input">
              <input className="input" placeholder={`Message ${active.nombre.split(" ")[0]}...`} value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
              <button className="btn btn-primary btn-icon" onClick={send}><Icon name="send" size={16} color="white" /></button>
            </div>
          </div>
        ) : <div className="empty"><div className="text-sm">Select a conversation</div></div>}
      </div>
    </div>
  );
};

// ─── Admin Panel ──────────────────────────────────────────────────────────────
const AdminPanel = ({ setPage }) => {
  const [premiumCities, setPremiumCities] = useState({});
  const cityStats = getCityStats();
  const totalRevenue = MOCK_EVENTS.reduce((sum, e) => sum + e.revenue, 0);
  const totalUsers = MOCK_USERS.length;
  const totalEvents = MOCK_EVENTS.filter(e => e.sponsored).length;
  const verifiedUsers = MOCK_USERS.filter(u => u.verified).length;

  const togglePremium = (key) => {
    setPremiumCities(p => ({ ...p, [key]: !p[key] }));
  };

  const sortedCities = Object.entries(cityStats).sort((a, b) => b[1] - a[1]);

  return (
    <div className="admin-bg">
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="display font-bold" style={{ fontSize: 32, letterSpacing: -1 }}>Klumy Admin</div>
            <div style={{ opacity: .7, fontSize: 14 }}>Internal control panel · Founder access only</div>
          </div>
          <button className="btn" style={{ background: "rgba(255,255,255,.1)", color: "white", padding: "10px 18px" }} onClick={() => setPage("home")}>
            <Icon name="logout" size={14} /> Exit Admin
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 mb-4">
          <div className="admin-card">
            <div style={{ opacity: .7, fontSize: 12, letterSpacing: .5 }}>TOTAL USERS</div>
            <div className="admin-stat" style={{ fontSize: 36 }}>{totalUsers}</div>
            <div className="text-xs" style={{ color: "#2e7d52" }}>↑ Growing daily</div>
          </div>
          <div className="admin-card">
            <div style={{ opacity: .7, fontSize: 12, letterSpacing: .5 }}>VERIFIED USERS</div>
            <div className="admin-stat" style={{ fontSize: 36 }}>{verifiedUsers}</div>
            <div className="text-xs" style={{ color: "#2e7d52" }}>{Math.round(verifiedUsers / totalUsers * 100)}% of total</div>
          </div>
          <div className="admin-card">
            <div style={{ opacity: .7, fontSize: 12, letterSpacing: .5 }}>SPONSORED EVENTS</div>
            <div className="admin-stat" style={{ fontSize: 36 }}>{totalEvents}</div>
            <div className="text-xs" style={{ color: "#2e7d52" }}>Active this month</div>
          </div>
          <div className="admin-card">
            <div style={{ opacity: .7, fontSize: 12, letterSpacing: .5 }}>TOTAL REVENUE</div>
            <div className="admin-stat" style={{ fontSize: 36, color: "#2e7d52" }}>${totalRevenue.toLocaleString()}</div>
            <div className="text-xs" style={{ opacity: .7 }}>From event sponsors</div>
          </div>
        </div>

        {/* Premium per City */}
        <div className="admin-card mb-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="display font-bold text-lg">Premium Activation by City</div>
              <div className="text-xs" style={{ opacity: .7 }}>Activate Premium when a city reaches 100+ active users. Below that, keep it free to grow the network.</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: "#fbbf24" }}>📊 Strategy:</strong> Don't charge before reaching 100 users per city. Network effects matter more than early revenue. Use this panel to monitor growth and turn on Premium when ready.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sortedCities.map(([key, count]) => {
              const [country, city] = key.split("-");
              const ready = count >= 100;
              const isOn = premiumCities[key];
              const flag = COUNTRIES[country]?.flag || "🌍";
              const pct = Math.min(100, count);
              return (
                <div key={key} style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ minWidth: 200 }}>
                    <div className="font-semibold">{flag} {city}, {country}</div>
                    <div className="text-xs" style={{ opacity: .7 }}>{count} active user{count !== 1 ? "s" : ""}</div>
                  </div>
                  <div style={{ flex: 1, background: "rgba(255,255,255,.1)", borderRadius: 8, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: ready ? "#2e7d52" : "#fbbf24", transition: "width .4s" }} />
                  </div>
                  <div style={{ minWidth: 90, textAlign: "right", fontSize: 12, opacity: .7 }}>{count}/100</div>
                  {ready ? (
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 12, opacity: .8 }}>{isOn ? "ON" : "OFF"}</span>
                      <div className={`toggle ${isOn ? "on" : ""}`} onClick={() => togglePremium(key)}>
                        <div className="toggle-knob" />
                      </div>
                    </div>
                  ) : (
                    <span className="badge" style={{ background: "rgba(251,191,36,.2)", color: "#fbbf24", fontSize: 11 }}>Growing</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Revenue Detail */}
        <div className="admin-card">
          <div className="display font-bold text-lg mb-3">Events Revenue</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MOCK_EVENTS.filter(e => e.sponsored).map(e => (
              <div key={e.id} style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: e.color + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{e.logo}</div>
                <div className="flex-1">
                  <div className="font-semibold">{e.name}</div>
                  <div className="text-xs" style={{ opacity: .7 }}>{e.organizer} · {COUNTRIES[e.country]?.flag} {e.city} · {e.attendees} attendees</div>
                </div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "#2e7d52" }}>${e.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
// ─── Bottom Nav (mobile app-style) ────────────────────────────────────────────
const BottomNav = ({ page, setPage }) => {
  const links = [
    { id: "dashboard", label: "Home", icon: "dashboard" },
    { id: "explore", label: "Explore", icon: "globe" },
    { id: "events", label: "Events", icon: "calendar" },
    { id: "messages", label: "Chats", icon: "msg" },
  ];
  return (
    <div className="bottom-nav">
      {links.map(l => (
        <button key={l.id} className={`bottom-nav-btn ${page === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>
          <Icon name={l.icon} size={20} />
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default function App() {
  document.title = "Klumy";
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => setToast(msg);
  const handleSetUser = (u) => {
    setUser(u);
    if (u) {
      const conns = (MOCK_CONEXIONES[u.id] || []).map(c => {
        const fullUser = MOCK_USERS.find(x => x.id === c.id);
        return fullUser ? { ...fullUser, event: c.event } : null;
      }).filter(Boolean);
      setConnections(conns);
    } else setConnections([]);
  };
  const go = (p) => {
    if (!user && ["dashboard", "explore", "events", "messages"].includes(p)) { setPage("login"); return; }
    setPage(p);
  };
  return (
    <>
      <style>{css}</style>
      {page !== "admin" && <Nav page={page} setPage={go} user={user} setUser={handleSetUser} />}
      {page === "home" && <Home setPage={go} />}
      {page === "login" && <Login setPage={setPage} setUser={handleSetUser} showToast={showToast} />}
      {page === "register" && <Register setPage={setPage} setUser={handleSetUser} showToast={showToast} />}
      {page === "dashboard" && user && <Dashboard user={user} setPage={go} connections={connections} />}
      {page === "explore" && user && <Explore user={user} connections={connections} setConnections={setConnections} showToast={showToast} />}
      {page === "events" && user && <Events user={user} connections={connections} setConnections={setConnections} showToast={showToast} setPage={go} />}
      {page === "messages" && user && <Messages user={user} connections={connections} />}
      {page === "admin" && <AdminPanel setPage={setPage} />}
      {user && page !== "admin" && page !== "home" && <BottomNav page={page} setPage={go} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}