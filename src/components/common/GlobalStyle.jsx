export default function GlobalStyle() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        /* Brand */
        --gold: #c8963c;
        --gold-light: #daa84e;
        --gold-dim: rgba(200,150,60,0.13);
        --sand: #d8c29a;
        --sand-dim: rgba(216,194,154,0.1);

        /* Backgrounds */
        --dark: #0f0f10;
        --surface: #18181b;
        --surface-2: #1f1f24;
        --surface-3: #26262c;
        --cream: #f9f7f3;
        --cream-2: #f3f0ea;
        --white: #ffffff;

        /* Text */
        --muted: #71717a;
        --text-dim: rgba(255,255,255,0.48);
        --text-subtle: rgba(255,255,255,0.26);

        /* Borders */
        --border-dark: rgba(255,255,255,0.07);
        --border-gold: rgba(200,150,60,0.22);
        --border-light: rgba(0,0,0,0.08);

        /* Shadows */
        --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
        --shadow: 0 4px 28px rgba(0,0,0,0.10);
        --shadow-lg: 0 16px 64px rgba(0,0,0,0.22);
        --shadow-xl: 0 32px 96px rgba(0,0,0,0.32);
        --shadow-gold: 0 8px 40px rgba(200,150,60,0.28);

        /* Radius */
        --r-sm: 8px; --r: 14px; --r-lg: 20px; --r-xl: 24px; --r-2xl: 40px;

        /* Spacing */
        --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;
        --space-5:20px;--space-6:24px;--space-8:32px;--space-10:40px;
        --space-12:48px;--space-16:64px;--space-20:80px;--space-24:96px;

        /* Typography */
        --font-serif: 'Outfit', system-ui, sans-serif;
        --font-sans: 'Inter', system-ui, sans-serif;
        --font-display: 'Outfit', system-ui, sans-serif;
      }

      body {
        margin: 0;
        font-family: var(--font-sans);
        background: var(--cream);
        color: var(--dark);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
      }

      /* Legacy compat */
      .sans { font-family: var(--font-sans); }

      /* All headings use display serif */
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-serif);
        line-height: 1.15;
      }

      /* ── Inputs ─────────────────────────────────────── */
      .inp {
        width: 100%; background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1); border-radius: var(--r);
        padding: 13px 16px; color: white; font-size: 14px;
        font-family: var(--font-sans); cursor: pointer; color-scheme: dark;
        transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
      }
      .inp option { background: #1a1a1a; }
      .inp:focus {
        outline: none; border-color: rgba(200,150,60,0.55); background: rgba(255,255,255,0.09);
        box-shadow: 0 0 0 3px rgba(200,150,60,0.12);
      }
      .linp {
        width: 100%; background: #fafaf8; border: 1px solid rgba(0,0,0,0.1);
        border-radius: var(--r); padding: 13px 16px; color: var(--dark);
        font-size: 14px; font-family: var(--font-sans);
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .linp:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(200,150,60,0.12); }

      /* ── Buttons ─────────────────────────────────────── */
      .btn-primary {
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        background: var(--gold); border: none; color: #0f0f10;
        border-radius: var(--r); padding: 14px 28px; font-size: 14px;
        font-weight: 700; cursor: pointer; font-family: var(--font-sans); letter-spacing: 0.2px;
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, background 0.2s;
      }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-gold); background: var(--gold-light); }
      .btn-primary:active { transform: translateY(0); }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        background: transparent; border: 1px solid rgba(255,255,255,0.18); color: white;
        border-radius: var(--r); padding: 13px 24px; font-size: 14px;
        font-weight: 500; cursor: pointer; font-family: var(--font-sans); letter-spacing: 0.2px;
        transition: background 0.25s, border-color 0.25s, transform 0.25s;
      }
      .btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.35); transform: translateY(-1px); }

      /* ── Glassmorphism ───────────────────────────────── */
      .glass { background: rgba(255,255,255,0.055); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.1); }
      .glass-light { background: rgba(255,255,255,0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.92); box-shadow: var(--shadow); }
      .glass-dark { background: rgba(15,15,16,0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.07); }
      .glass-gold { background: rgba(200,150,60,0.08); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(200,150,60,0.2); }

      /* ── Luxury Cards ────────────────────────────────── */
      .luxury-card {
        background: var(--surface); border: 1px solid rgba(255,255,255,0.06);
        border-radius: var(--r-xl); overflow: hidden;
        transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s, border-color 0.3s;
      }
      .luxury-card:hover { transform: translateY(-8px); box-shadow: 0 24px 80px rgba(0,0,0,0.5); border-color: rgba(200,150,60,0.18); }
      .luxury-card .img-wrap { overflow: hidden; }
      .luxury-card .img-wrap img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
      .luxury-card:hover .img-wrap img { transform: scale(1.07); }

      /* Destination cards */
      .dest-card { transition: all 0.5s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
      .dest-card:hover { transform: scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
      .dest-card:hover .dest-overlay { opacity: 0.78 !important; }
      .dest-overlay { transition: opacity 0.4s; opacity: 0.55; }

      /* Review cards */
      .review-card { transition: all 0.35s cubic-bezier(0.16,1,0.3,1); }
      .review-card:hover { box-shadow: 0 16px 56px rgba(0,0,0,0.14); transform: translateY(-4px); }

      /* FAQ items */
      .faq-item { transition: border-color 0.2s; }
      .faq-item:hover { border-color: rgba(200,150,60,0.28) !important; }

      /* ── Navigation ──────────────────────────────────── */
      .nav-link { transition: color 0.2s; }
      .nav-link:hover { color: var(--sand) !important; }
      .nav-link.active { color: var(--gold) !important; font-weight: 600; }
      .lang-trigger { transition: all 0.2s; }
      .lang-trigger:hover { background: rgba(200,150,60,0.14) !important; border-color: rgba(200,150,60,0.38) !important; }
      .lang-item { transition: background 0.15s; }
      .lang-item:hover { background: rgba(255,255,255,0.06) !important; }
      .foot-link { transition: color 0.2s; }
      .foot-link:hover { color: var(--sand) !important; }
      .cta-btn { transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
      .cta-btn:hover { transform: translateY(-1px); }

      /* ── Skeleton ────────────────────────────────────── */
      @keyframes skeleton-wave { 0%{background-position:-1000px 0;} 100%{background-position:1000px 0;} }
      .skeleton {
        background: linear-gradient(90deg,#e8e8e8 25%,#d4d4d4 50%,#e8e8e8 75%);
        background-size: 1000px 100%; animation: skeleton-wave 1.8s infinite linear; border-radius: var(--r-sm);
      }

      /* ── Animations ──────────────────────────────────── */
      @keyframes fadeInUp    { from{opacity:0;transform:translateY(28px);}  to{opacity:1;transform:translateY(0);} }
      @keyframes fadeInScale { from{opacity:0;transform:scale(0.95);}        to{opacity:1;transform:scale(1);}    }
      @keyframes shimmer     { 0%{background-position:-200% center;}          100%{background-position:200% center;} }
      @keyframes heroFloat   { 0%,100%{transform:translateY(0);}              50%{transform:translateY(-10px);}    }
      @keyframes pulse       { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4);} 50%{box-shadow:0 0 0 14px rgba(37,211,102,0);} }
      @keyframes spin        { to{transform:rotate(360deg);} }
      @keyframes langFade    { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
      @keyframes slideUp     { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
      @keyframes pop         { from{opacity:0;transform:scale(0.93);} to{opacity:1;transform:scale(1);} }
      @keyframes panSlow      { from{transform:scale(1.1);} to{transform:scale(1.1) translateX(-2%);} }
      @keyframes menuSlideIn  { from{opacity:0;transform:translateX(100%);} to{opacity:1;transform:translateX(0);} }
      @keyframes menuItemIn   { from{opacity:0;transform:translateX(20px);} to{opacity:1;transform:translateX(0);} }
      .mobile-menu-overlay    { animation: menuSlideIn 0.38s cubic-bezier(0.16,1,0.3,1) both; }
      .mobile-menu-item       { animation: menuItemIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

      .animate-fadeInUp    { animation: fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
      .animate-fadeInScale { animation: fadeInScale 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      .animate-slideUp     { animation: slideUp 0.32s ease both; }
      .animate-pop         { animation: pop 0.32s cubic-bezier(0.16,1,0.3,1) both; }
      .lang-menu           { animation: langFade 0.18s ease; }
      .wa-panel            { animation: slideUp 0.3s ease; }
      .modal-content       { animation: pop 0.3s cubic-bezier(0.16,1,0.3,1); }
      .hero-img-pan        { animation: panSlow 24s ease-in-out infinite alternate; }
      .hero-emoji          { animation: heroFloat 4s ease-in-out infinite; display: inline-block; }
      .pulse               { animation: pulse 2s infinite; }
      .shimmer-text {
        background: linear-gradient(90deg, var(--gold) 0%, #f0d080 40%, var(--gold) 80%);
        background-size: 200% auto;
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 3.5s linear infinite;
      }

      /* ── Decorative elements ─────────────────────────── */
      .gold-line { display:block; width:40px; height:1px; background:var(--gold); opacity:0.7; }
      .overlay-bottom { background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 50%, transparent 100%); }
      .overlay-dark   { background: linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 100%); }

      /* ── WhatsApp ─────────────────────────────────────── */
      .wa-btn { transition: transform 0.2s; }
      .wa-btn:hover { transform: scale(1.08); }

      /* ── Scrollbar ────────────────────────────────────── */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: var(--cream); }
      ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

      /* ── Booking flow ─────────────────────────────────── */
      .step-enter { animation: fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }

      /* ── Responsive ───────────────────────────────────── */
      @media (min-width: 769px) { .hide-desktop { display: none !important; } }
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
        .step-2col                { grid-template-columns: 1fr !important; }
        .progress-label           { display: none !important; }
        .dest-card                { grid-column: span 1 !important; grid-row: span 1 !important; height: 220px !important; }
        .hero-title               { font-size: clamp(2.2rem,8vw,3.5rem) !important; }
        .booking-flow-sidebar     { display: none !important; }
        .why-feature              { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 480px) {
        .cars-grid  { grid-template-columns: 1fr !important; }
        .trust-grid { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  );
}
