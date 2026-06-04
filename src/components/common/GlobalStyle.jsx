export default function GlobalStyle() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --gold: #c8963c;
        --gold-light: #e8b050;
        --gold-muted: rgba(200,150,60,0.15);
        --dark: #0f0f0f;
        --dark-2: #1a1a1a;
        --cream: #faf8f4;
        --white: #ffffff;
        --muted: #6b6b6b;
        --border: rgba(0,0,0,0.08);
        --border-light: rgba(255,255,255,0.12);
        --radius-sm: 10px;
        --radius: 16px;
        --radius-lg: 24px;
        --radius-xl: 32px;
        --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
        --shadow: 0 4px 24px rgba(0,0,0,0.10);
        --shadow-lg: 0 12px 48px rgba(0,0,0,0.16);
        --shadow-gold: 0 8px 32px rgba(200,150,60,0.35);
        --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
        --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
        --space-12: 48px; --space-16: 64px; --space-20: 80px; --space-24: 96px;
        --font-serif: 'Cormorant Garamond', Georgia, serif;
        --font-sans: 'DM Sans', system-ui, sans-serif;
      }
      body { margin: 0; font-family: var(--font-serif); background: var(--cream); color: var(--dark); -webkit-font-smoothing: antialiased; }
      .sans { font-family: var(--font-sans); }

      /* ── Inputs ───────────────────────────────────────────────────────────── */
      .inp {
        width: 100%; background: rgba(255,255,255,0.08); border: 1px solid var(--border-light);
        border-radius: var(--radius-sm); padding: 12px 14px; color: white; font-size: 14px;
        font-family: var(--font-sans); cursor: pointer; color-scheme: dark;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .inp option { background: #1a1a1a; }
      .linp {
        width: 100%; background: #f8f8f5; border: 1px solid var(--border);
        border-radius: var(--radius-sm); padding: 12px 14px; color: var(--dark); font-size: 14px;
        font-family: var(--font-sans); transition: border-color 0.2s, box-shadow 0.2s;
      }
      .inp:focus, .linp:focus {
        outline: none; border-color: var(--gold);
        box-shadow: 0 0 0 3px rgba(200,150,60,0.15);
      }

      /* ── Buttons ─────────────────────────────────────────────────────────── */
      .btn-primary {
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
        border: none; color: #0f0f0f; border-radius: var(--radius-sm);
        padding: 14px 24px; font-size: 14px; font-weight: 700; cursor: pointer;
        font-family: var(--font-sans); letter-spacing: 0.3px;
        transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
      }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
      .btn-primary:active { transform: translateY(0); }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white;
        border-radius: var(--radius-sm); padding: 12px 20px; font-size: 14px;
        font-weight: 600; cursor: pointer; font-family: var(--font-sans);
        transition: background 0.2s, border-color 0.2s;
      }
      .btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.4); }

      /* ── Glassmorphism ───────────────────────────────────────────────────── */
      .glass {
        background: rgba(255,255,255,0.06);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.1);
      }
      .glass-light {
        background: rgba(255,255,255,0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.9);
        box-shadow: var(--shadow);
      }
      .glass-dark {
        background: rgba(15,15,15,0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.08);
      }

      /* ── Cards ───────────────────────────────────────────────────────────── */
      .car-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s; }
      .car-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
      .why-card { transition: all 0.35s ease; }
      .why-card:hover { background: var(--dark) !important; transform: translateY(-4px); }
      .why-card:hover .why-icon { background: var(--gold) !important; }
      .why-card:hover .why-title { color: white !important; }
      .why-card:hover .why-desc { color: rgba(255,255,255,0.6) !important; }
      .review-card { transition: all 0.3s ease; }
      .review-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.12); transform: translateY(-4px); }
      .dest-card { transition: all 0.4s ease; cursor: pointer; }
      .dest-card:hover { transform: scale(1.03); }
      .dest-card:hover .dest-overlay { opacity: 0.6 !important; }
      .dest-overlay { opacity: 0.3; transition: opacity 0.3s; }
      .faq-item { transition: border-color 0.2s; }
      .faq-item:hover { border-color: var(--gold) !important; }

      /* ── Navigation ──────────────────────────────────────────────────────── */
      .nav-link { transition: color 0.2s; }
      .nav-link:hover { color: var(--gold) !important; }
      .cta-btn { transition: all 0.3s ease; }
      .cta-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); }
      .lang-trigger { transition: all 0.2s; }
      .lang-trigger:hover { background: rgba(200,150,60,0.2) !important; border-color: rgba(200,150,60,0.5) !important; }
      .lang-item { transition: background 0.15s; }
      .lang-item:hover { background: rgba(255,255,255,0.07) !important; }
      .foot-link { transition: color 0.2s; }
      .foot-link:hover { color: var(--gold) !important; }

      /* ── Skeleton loader ─────────────────────────────────────────────────── */
      @keyframes skeleton-wave {
        0%   { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, #e8e8e8 25%, #d0d0d0 50%, #e8e8e8 75%);
        background-size: 1000px 100%;
        animation: skeleton-wave 1.8s infinite linear;
        border-radius: var(--radius-sm);
      }

      /* ── Animations ──────────────────────────────────────────────────────── */
      @keyframes fadeInUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeInScale { from { opacity:0; transform:scale(0.94);      } to { opacity:1; transform:scale(1);    } }
      @keyframes shimmer     { 0%  { background-position:-200% center; }       100%{ background-position:200% center; } }
      @keyframes heroFloat   { 0%,100%{transform:translateY(0);}               50%{transform:translateY(-12px);}         }
      @keyframes pulse       { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4);} 50%{box-shadow:0 0 0 14px rgba(37,211,102,0);} }
      @keyframes spin        { to { transform:rotate(360deg); } }
      @keyframes langFade    { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
      @keyframes slideUp     { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
      @keyframes pop         { from{opacity:0;transform:scale(0.92);} to{opacity:1;transform:scale(1);} }

      .animate-fadeInUp    { animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
      .animate-fadeInScale { animation: fadeInScale 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      .animate-slideUp     { animation: slideUp 0.3s ease both; }
      .animate-pop         { animation: pop 0.3s cubic-bezier(0.16,1,0.3,1) both; }
      .lang-menu           { animation: langFade 0.18s ease; }
      .wa-panel            { animation: slideUp 0.3s ease; }
      .modal-content       { animation: pop 0.3s cubic-bezier(0.16,1,0.3,1); }

      .hero-emoji  { animation: heroFloat 4s ease-in-out infinite; display: inline-block; }
      .pulse       { animation: pulse 2s infinite; }
      .shimmer-text {
        background: linear-gradient(90deg, var(--gold) 0%, #f0d080 40%, var(--gold) 80%);
        background-size: 200% auto;
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 3s linear infinite;
      }

      /* ── WhatsApp ────────────────────────────────────────────────────────── */
      .wa-btn { transition: transform 0.2s; }
      .wa-btn:hover { transform: scale(1.1); }

      /* ── Scrollbar ───────────────────────────────────────────────────────── */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

      /* ── Booking flow step ───────────────────────────────────────────────── */
      .step-enter  { animation: fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }

      /* ── Responsive ──────────────────────────────────────────────────────── */
      @media (max-width: 768px) {
        .hide-mobile              { display: none !important; }
        .nav-links-desktop        { display: none !important; }
        .hero-grid                { grid-template-columns: 1fr !important; gap: 40px !important; }
        .booking-grid             { grid-template-columns: 1fr !important; }
        .cars-grid                { grid-template-columns: 1fr !important; }
        .why-grid                 { grid-template-columns: 1fr !important; }
        .dest-grid                { grid-template-columns: 1fr !important; }
        .reviews-grid             { grid-template-columns: 1fr !important; }
        .contact-grid             { grid-template-columns: 1fr !important; }
        .footer-grid              { grid-template-columns: 1fr !important; gap: 32px !important; }
        .admin-grid               { grid-template-columns: 1fr !important; }
        .booking-flow-grid        { grid-template-columns: 1fr !important; }
        .dest-card                { grid-column: span 1 !important; height: 200px !important; }
        .hero-title               { font-size: clamp(2rem,8vw,3.5rem) !important; }
        .booking-flow-sidebar     { display: none !important; }
      }
      @media (max-width: 480px) {
        .cars-grid { grid-template-columns: 1fr !important; }
        .trust-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  );
}
