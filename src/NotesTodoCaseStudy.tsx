import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  Check,
  CheckSquare,
  CircleAlert,
  Cloud,
  Code2,
  Database,
  Download,
  GitBranch,
  Mail,
  MessageSquare,
  MonitorCloud,
  MoonStar,
  NotebookPen,
  Plus,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  SunMedium,
  Wifi,
  Zap,
} from "lucide-react";

export default function NotesTodoCaseStudy() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const isDark = theme === "dark";

  return (
    <div className={`notes-app ${isDark ? "theme-dark" : "theme-light"}`}>
      <header className="site-header">
        <div className="container header-row">
          <a href="#top" className="brand" aria-label="NotesTodo home">
            <span className="brand-mark">
              <CheckSquare size={18} />
            </span>
            <span>NotesTodo</span>
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a href="#overview">Overview</a>
            <a href="#features">Features</a>
            <a href="#stack">Tech Stack</a>
            <a href="#demo">Demo</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="button secondary-button theme-toggle"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <SunMedium size={16} /> : <MoonStar size={16} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
            <a href="#demo" className="button primary-button">
              Explore project
            </a>
          </div>
        </div>
      </header>
      <main className="main-shell" id="top">
        <section className="container hero">
          <div>
            <p className="eyebrow">Mobile productivity case study · 2026</p>
            <h1>NotesTodo makes everyday plans feel delightfully clear.</h1>
            <p className="lede">
              "A full-stack note and task manager built with React Native,
              Node.js, Express, MongoDB, and a secure REST API using JWT
              access & refresh tokens with Context API state management—designed
              to keep capture, focus, and follow-through in one calm mobile workspace."
            </p>
            <div className="tag-list" aria-label="Tech categories">
              <span>React Native</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>MongoDB</span>
              <span>JWT</span>
              <span>Rest Api</span>
              <span>Context API</span>

            </div>
            <div className="cta-row">
              <a href="#demo" className="button primary-button">
                View live demo
                <ArrowUpRight size={16} />
              </a>
              <a href="https://github.com/raj-9693/Registrations_CLI" className="button secondary-button">
                View GitHub repo
                <GitBranch size={16} />
              </a>
            </div>
          </div>
          <div className="phone-wrap">
            <div className="phone-glow" />
            <div className="phone-shell">
              <div className="phone-header">
                <span>9:41</span>
                <span className="status-icons">
                  <Wifi size={12} />
                  <BatteryFull size={12} />
                </span>
              </div>
              <div className="phone-screen">
                <div className="screen-topbar">
                  <div>
                    <p>Tuesday, October 25</p>
                    <h2>Good morning.</h2>
                  </div>
                  <span className="plus-button" aria-label="Add task">
                    <Plus size={16} />
                  </span>
                </div>
                <div className="focus-card">
                  <span className="focus-indicator" aria-hidden="true" />
                  <div>
                    <p className="focus-title">Ship NotesTodo case study</p>
                    <p className="focus-meta">Today · 2:00 PM</p>
                  </div>
                </div>
                <div className="focus-summary">
                  <span>Today&apos;s focus</span>
                  <span>2 of 4</span>
                </div>
                <div className="task-list">
                  <div className="task-row">
                    <span className="task-dot" aria-hidden="true" />
                    <span>Review API edge cases</span>
                  </div>
                  <div className="task-row done">
                    <span className="task-complete">
                      <Check size={10} />
                    </span>
                    <span>Write onboarding notes</span>
                  </div>
                </div>
                <div className="mini-cards">
                  <div className="mini-card">
                    <NotebookPen size={18} />
                    <p>12 notes</p>
                  </div>
                  <div className="mini-card">
                    <CheckSquare size={18} />
                    <p>8 tasks</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-badge">
              <p>Built for focus</p>
              <strong>Capture → organize → finish</strong>
            </div>
          </div>
        </section>
        <section className="section-light" id="overview">
          <div className="container overview-grid">
            <div>
              <p className="section-meta">01 · Overview</p>
              <h2>A lightweight system for the work that lives between meetings.</h2>
            </div>
            <div>
              <p className="lead-compact">
                NotesTodo helps busy people turn passing thoughts into intentional
                next steps. Notes, tasks, deadlines, and project context stay
                connected in a fast native workflow—with secure access and a
                dependable API underneath.
              </p>
              <div className="stats-grid">
                <div className="stat-card">
                  <strong>10+</strong>
                  <span>Core features</span>
                </div>
                <div className="stat-card">
                  <strong>REST</strong>
                  <span>API design</span>
                </div>
                <div className="stat-card">
                  <strong>JWT</strong>
                  <span>Secure sessions</span>
                </div>
                <div className="stat-card">
                  <strong>CRUD</strong>
                  <span>Notes &amp; tasks</span>
                </div>

              </div>
            </div>
          </div>
        </section>
        <section className="container feature-section" id="features">
          <div className="feature-header">
            <p className="section-meta">02 · Capabilities</p>
            <h2>Built around reliable, frictionless task management.</h2>
            <p className="lead-compact">
              Every feature supports a small, essential promise: your list should be
              quicker to trust than a notebook.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon">
                <ShieldCheck size={20} />
              </span>
              <h3>JWT authentication</h3>
              <p>
                Signup, login, protected routes, and refresh-aware sessions keep each
                workspace private.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <NotebookPen size={20} />
              </span>
              <h3>Full CRUD flow</h3>
              <p>
                Create, read, edit, complete, and archive notes without breaking your
                mental momentum.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <RefreshCw size={20} />
              </span>
              <h3>Resilient API states</h3>
              <p>
                Thoughtful loading, empty, retry, and response handling make network
                boundaries feel calm.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <CircleAlert size={20} />
              </span>
              <h3>Clear error recovery</h3>
              <p>
                Validation and connection failures surface with useful language and a
                clear path forward.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <Database size={20} />
              </span>
              <h3>MongoDB modeling</h3>
              <p>
                User-owned documents and predictable query shapes keep the data layer
                flexible and focused.
              </p>
            </article>
            <article className="feature-card">
              <span className="feature-icon">
                <Zap size={20} />
              </span>
              <h3>Instant UI feedback</h3>
              <p>
                Optimistic local changes and purposeful sync states keep interactions
                feeling immediate.
              </p>
            </article>
          </div>
        </section>
        <section className="section-light stack-section" id="stack">
          <div className="container">
            <div className="stack-header">
              <div>
                <p className="section-meta">03 · Technical architecture</p>
                <h2>A compact stack with clearly owned responsibilities.</h2>
              </div>
              <p>
                A native client speaks to an Express API; MongoDB persists user-scoped
                note and task documents.
              </p>
            </div>
            <div className="stack-grid">
              <div className="stack-card">
                <Smartphone size={30} />
                <p className="stack-label">Client</p>
                <h3>React Native App</h3>
                <p>Task views, note editor, auth state, and responsive feedback.</p>
              </div>
              <div className="stack-card">
                <ServerIcon />
                <p className="stack-label">Service</p>
                <h3>REST API / Express</h3>
                <p>JWT middleware, validation, routes, and response contracts.</p>
              </div>
              <div className="stack-card">
                <Database size={30} />
                <p className="stack-label">Data</p>
                <h3>MongoDB</h3>
                <p>Structured collections and secure, user-scoped record access.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="container engineering-section" id="engineering-notes">
          <div className="engineering-header">
            <p className="section-meta">04 · Engineering notes</p>
            <h2>The technical decisions<br />behind a smoother daily flow.</h2>
          </div>
          <div className="engineering-list">
            <details className="engineering-note">

              <summary><span>01</span>Auth that works quietly in the background</summary>

              <p>I built authentication using two JWT tokens instead of one. A single long-lived token is risky
                if leaked, and a single short-lived one means users get logged out constantly.<br />
                <br />
                The access token expires in 15 minutes and travels with every request. The refresh token lasts 7–30
                days, and its only job is to quietly fetch a new access token when the old one expires — without
                the user noticing. Each token is signed with its own secret key, so a leak in one doesn't compromise the other.<br />
                <br />
                The tricky part was the middleware — a function that runs before every protected route, verifies the token, and
                attaches the logged-in user's identity to the request. Skip it, and there's no way to know who's actually asking.</p>
            </details>
            <details className="engineering-note">
              <summary><span>02</span>A complete auth flow, not just a login screen</summary>
              <p>I built the entire authentication lifecycle as one connected system — not just a login form. It covers Signup,
                Login, and a full Forgot Password flow: email verification, OTP generation, OTP verification, and password reset.<br />
                <br />
                The OTP itself is never stored as plain text — it's hashed with bcrypt, just like passwords, and expires after 5 minutes. If someone
                requests a new OTP before the old one expires, the old one becomes useless immediately.<br />
                <br />
                Every step returns a consistent response shape, so the frontend always knows what happened — whether an email doesn't exist, an OTP
                is wrong, or it's expired. And once a password is actually reset, I invalidate the old
                refresh token, so any device that was logged in before gets signed out — a small detail that matters more than it looks.</p>
            </details>
            <details className="engineering-note">
              <summary><span>03</span>Balancing a flexible schema with predictable UI data</summary>
              <p>User-scoped MongoDB documents and stable response shapes keep the mobile screens simple as the product grows.</p>
            </details>
          </div>
        </section>
        <section className="container demo-section" id="demo">
          <div className="demo-header">
            <div className="demo-header-text">
              <p className="section-meta">05 · Product walkthrough</p>
              <h2>A focused interface from<br />first capture to finished task.</h2>
            </div>
            <a href="#demo-video" className="demo-swipe-link">
              Watch the walkthrough
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="demo-showcase">
            <div className="demo-gallery">
              <figure className="demo-shot">
                <img src="/login.jpg" alt="NotesTodo login screen" />
                <figcaption>Login</figcaption>
              </figure>
              <figure className="demo-shot">
                <img src="/register.jpg" alt="NotesTodo registration screen" />
                <figcaption>Registration</figcaption>
              </figure>
              <figure className="demo-shot">
                <img src="/forgate.jpg" alt="NotesTodo forgot password screen" />
                <figcaption>Forgot-passwords</figcaption>
              </figure>
              <figure className="demo-shot">
                <img src="/otp%20(2).jpg" alt="NotesTodo OTP verification screen" />
                <figcaption>OTP</figcaption>
              </figure>

              <figure className="demo-shot">
                <img src="/login.jpg" alt="NotesTodo account login preview" />
                <figcaption>Recreat-passwords</figcaption>
              </figure>
              <div className="demo-video-card" id="demo-video">
                <video controls preload="metadata" poster="/recreat.jpg">
                  <source src="/Screen.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </div>
          </div>
          <div className="laptop-video-card" id="laptop-recording">
            <div className="laptop-video-heading">
              <div>
                <p>Desktop walkthrough</p>
                <h3>See NotesTodo on a larger screen.</h3>
              </div>
              <span>Laptop recording</span>
            </div>
            <video
              controls
              preload="metadata"
              poster="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1400&q=80"
            >
              <source src="/leptopScreen.mp4" type="video/mp4" />
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </section>
        <section className="container ai-section" id="ai-workflow">
          <div className="ai-header">
            <div>
              <p className="section-meta">06 · AI-assisted workflow</p>
              <h2>Learning faster with AI<br />in the development loop.</h2>
            </div>
            <p>AI supported the building process without replacing the engineering decisions behind NotesTodo, from implementation details to deployment checks.</p>
          </div>
          <div className="ai-grid">
            <article className="ai-card">
              <div className="ai-card-top"><span className="ai-icon"><Code2 size={18} /></span><span>Build</span></div>
              <h3>Cursor</h3>
              <p>Used as a coding companion to explore React Native patterns, refine components, and move implementation tasks with more confidence.</p>
              <small>Applied to</small><strong>Components, debugging, refactoring</strong>
            </article>
            <article className="ai-card">
              <div className="ai-card-top"><span className="ai-icon"><MessageSquare size={18} /></span><span>Think</span></div>
              <h3>ChatGPT</h3>
              <p>Used to clarify backend concepts, compare implementation options, and turn unfamiliar errors into focused learning opportunities.</p>
              <small>Applied to</small><strong>JWT flow, Express routes, MongoDB queries</strong>
            </article>
            <article className="ai-card">
              <div className="ai-card-top"><span className="ai-icon"><MonitorCloud size={18} /></span><span>Code</span></div>
              <h3>VS Code</h3>
              <p>Used as the main workspace to inspect the project, validate changes, run the app, and keep the implementation grounded in the codebase.</p>
              <small>Applied to</small><strong>Editing, diagnostics, local development</strong>
            </article>
            <article className="ai-card">
              <div className="ai-card-top"><span className="ai-icon"><Cloud size={18} /></span><span>Ship</span></div>
              <h3>Cloud deployment</h3>
              <p>Used cloud hosting practices to understand environment variables, production readiness, and how a full-stack project moves beyond localhost.</p>
              <small>Applied to</small><strong>Environment setup, hosting, release checks</strong>
            </article>
          </div>
          <div className="ai-callout">
            <span className="ai-callout-icon"><Zap size={16} /></span>
            <div><strong>The goal was understanding, not just faster output.</strong><span>Each suggestion was reviewed, adapted, tested, and connected back to the NotesTodo codebase.</span></div>
            <b>Learn · build · verify</b>
          </div>
        </section>
        <section className="container contact-section" id="contact">
          <div className="contact-card">
            <div className="contact-row">
              <div className="contact-copy">
                <p className="section-meta">Let&apos;s build</p>
                <h2>Interested in working together?</h2>
                <p>I build considered digital products where interface craft and implementation detail move together.</p>
              </div>
              <div className="contact-actions">
                <a href="mailto:rajnishad96930@gmail.com" className="button primary-button">
                  Email me
                  <Mail size={16} />
                </a>
                <a href="https://drive.google.com/file/d/1OAy2cJB8f3xG62NFArt5itEXEOxSVwkt/view?usp=sharing" className="button secondary-button" target="_blank" rel="noreferrer">
                  Download résumé
                  <Download size={16} />
                </a>
              </div>
            </div>
            <div className="contact-links">
              <a href="https://github.com/raj-9693" target="_blank" rel="noreferrer"><GitBranch size={14} /> GitHub</a>
              <a href="https://www.linkedin.com/in/raj-kumar-nishad?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer"><GitBranch size={14} /> LinkedIn</a>
              <a href="mailto:rajnishad96930@gmail.com"><Mail size={14} />rajnishad96930@gmail.com</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>© 2024 NotesTodo. Full-stack mobile productivity project.</span>
        <span>Designed &amp; engineered with intention.</span>
      </footer>
    </div>
  );
}
function ServerIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="7" rx="2" /><rect x="2" y="13" width="20" height="7" rx="2" /><path d="M8 8h.01" /><path d="M8 17h.01" /></svg>;
}
