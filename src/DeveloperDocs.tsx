import { useState } from "react";
import {
  Search,
  Terminal,
  Database,
  Layers,
  FolderOpen,
  Rocket,
  Settings,
  Cpu,
  BookOpen,
  Code2,
  GitBranch,
  FlaskConical,
  Map,
  Users,
  FileText,
  ChevronRight,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
type SectionId =
  | "overview"
  | "why"
  | "architecture"
  | "techstack"
  | "structure"
  | "gettingstarted"
  | "configuration"
  | "howitworks"
  | "dbschema"
  | "apireference"
  | "extending"
  | "testing"
  | "roadmap"
  | "contributing"
  | "license";

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: <BookOpen size={14} /> },
  { id: "why", label: "Why NotesTodo", icon: <Layers size={14} /> },
  { id: "architecture", label: "Architecture", icon: <Cpu size={14} /> },
  { id: "techstack", label: "Tech Stack", icon: <Code2 size={14} /> },
  { id: "structure", label: "Project Structure", icon: <FolderOpen size={14} /> },
  { id: "gettingstarted", label: "Getting Started", icon: <Rocket size={14} /> },
  { id: "configuration", label: "Configuration", icon: <Settings size={14} /> },
  { id: "howitworks", label: "How It Works", icon: <Cpu size={14} /> },
  { id: "dbschema", label: "Database Schema", icon: <Database size={14} /> },
  { id: "apireference", label: "API Reference", icon: <Terminal size={14} /> },
  { id: "extending", label: "Extending NotesTodo", icon: <GitBranch size={14} /> },
  { id: "testing", label: "Testing", icon: <FlaskConical size={14} /> },
  { id: "roadmap", label: "Roadmap", icon: <Map size={14} /> },
  { id: "contributing", label: "Contributing", icon: <Users size={14} /> },
  { id: "license", label: "License", icon: <FileText size={14} /> },
];

/* ─── Shared UI helpers ──────────────────────────────────── */
function DocTag({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 9px", borderRadius: 999,
      border: "1px solid rgba(99,102,241,.35)", color: "#818cf8",
      fontFamily: "monospace", fontSize: ".62rem", fontWeight: 700,
      letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 14,
    }}>
      {label}
    </span>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-section-card" style={{
      border: "1px solid rgba(99,102,241,.18)", borderRadius: 18,
      background: "rgba(255,255,255,.03)", padding: "28px 30px", marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      margin: "0 0 14px", fontSize: "1.25rem", fontWeight: 700, color: "#f5f5f7",
      fontFamily: '"Space Grotesk", Inter, sans-serif', letterSpacing: "-.03em",
    }}>
      {children}
    </h3>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: 0, color: "#a1a1aa", fontSize: ".88rem", lineHeight: 1.85 }}>
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={{
      margin: "22px 0 8px", fontSize: ".78rem", fontWeight: 700, color: "#818cf8",
      letterSpacing: ".14em", textTransform: "uppercase",
    }}>
      {children}
    </h4>
  );
}

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul style={{
      margin: "10px 0 0", paddingLeft: 20, color: "#a1a1aa",
      fontSize: ".86rem", lineHeight: 1.85, display: "grid", gap: 4,
    }}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function CodeBlock({ children, lang = "bash" }: { children: string; lang?: string }) {
  return (
    <pre aria-label={`${lang} snippet`} style={{
      margin: "16px 0 0", padding: "18px 20px", borderRadius: 13,
      background: "#0b0d17", border: "1px solid rgba(99,102,241,.22)",
      color: "#a5b4fc", fontFamily: '"JetBrains Mono","Fira Code","Cascadia Code",monospace',
      fontSize: ".75rem", lineHeight: 1.75, overflowX: "auto", whiteSpace: "pre",
    }}>
      {children}
    </pre>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      padding: "2px 7px", borderRadius: 6, background: "rgba(99,102,241,.15)",
      color: "#a5b4fc", fontFamily: '"JetBrains Mono",monospace', fontSize: ".78em",
    }}>
      {children}
    </code>
  );
}

function BadgePill({ label, variant = "default" }: {
  label: string;
  variant?: "default" | "get" | "post" | "put" | "delete";
}) {
  const bg: Record<string, string> = {
    default: "rgba(99,102,241,.18)", get: "rgba(34,197,94,.18)",
    post: "rgba(59,130,246,.18)", put: "rgba(234,179,8,.18)", delete: "rgba(239,68,68,.18)",
  };
  const fg: Record<string, string> = {
    default: "#a5b4fc", get: "#86efac", post: "#93c5fd", put: "#fde047", delete: "#fca5a5",
  };
  return (
    <span style={{
      display: "inline-block", padding: "3px 9px", borderRadius: 6,
      background: bg[variant], color: fg[variant],
      fontFamily: "monospace", fontSize: ".65rem", fontWeight: 700,
      letterSpacing: ".08em", textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}

/* ─── Real API routes from the README ───────────────────── */
interface ApiRoute {
  num: number;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  auth: boolean;
  description: string;
}

const API_ROUTES: ApiRoute[] = [
  { num: 1, method: "POST", path: "/api/auth/signup", auth: false, description: "Register a new user" },
  { num: 2, method: "POST", path: "/api/auth/Login", auth: false, description: "Login and receive tokens" },
  { num: 3, method: "POST", path: "/api/auth/forgot-password", auth: false, description: "Send OTP to email" },
  { num: 4, method: "POST", path: "/api/auth/Otp", auth: false, description: "Verify OTP" },
  { num: 5, method: "POST", path: "/api/auth/resetpassword", auth: false, description: "Reset password with OTP" },
  { num: 6, method: "GET", path: "/api/categories/", auth: false, description: "Fetch all categories" },
  { num: 7, method: "POST", path: "/api/categories/", auth: false, description: "Create a new category" },
  { num: 8, method: "DELETE", path: "/api/categories/:id", auth: false, description: "Delete category + its notes" },
  { num: 9, method: "GET", path: "/api/notes/all", auth: true, description: "Get all notes of logged-in user" },
  { num: 10, method: "GET", path: "/api/notes/:categoryId", auth: false, description: "Get notes by category" },
  { num: 11, method: "POST", path: "/api/notes/", auth: false, description: "Create a new note" },
  { num: 12, method: "PUT", path: "/api/notes/:id", auth: false, description: "Update a note" },
  { num: 13, method: "DELETE", path: "/api/notes/:id", auth: false, description: "Delete a note" },
];

/* ─── Main component ─────────────────────────────────────── */
export default function DeveloperDocs() {
  const [active, setActive] = useState<SectionId>("overview");
  const [query, setQuery] = useState("");

  const filtered = NAV_ITEMS.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  function scrollTo(id: SectionId) {
    setActive(id);
    document.getElementById(`doc-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="developer-docs"
      className="developer-docs-section"
      style={{
        background: "linear-gradient(180deg,#0b0d17 0%,#0d0f1b 100%)",
        padding: "92px 0 100px",
        borderTop: "1px solid rgba(99,102,241,.18)",
      }}
    >
      <div className="container">

        {/* ── Section header ── */}
        <div style={{ marginBottom: 54 }}>
          <p style={{
            margin: "0 0 18px", color: "#6366f1",
            fontFamily: '"JetBrains Mono","Fira Code",monospace',
            fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase",
          }}>
            06 · DEVELOPER DOCUMENTATION
          </p>
          <h2 style={{
            margin: "0 0 16px", fontSize: "clamp(2rem,3.2vw,3.2rem)",
            fontFamily: '"Space Grotesk", Inter, sans-serif', fontWeight: 700,
            color: "#f5f5f7", lineHeight: 1.05, letterSpacing: "-.05em", maxWidth: 720,
          }}>
            Everything needed to understand, run, and extend NotesTodo.
          </h2>
          <p style={{ margin: 0, color: "#71717a", fontSize: ".96rem", lineHeight: 1.8, maxWidth: 680 }}>
            A practical companion for developers exploring the React Native client,
            Express API, and MongoDB data model behind the product story.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div
          className="docs-layout"
          style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 28, alignItems: "start" }}
        >

          {/* ── LEFT: Sticky sidebar ── */}
          <aside style={{
            position: "sticky", top: 90,
            border: "1px solid rgba(99,102,241,.2)", borderRadius: 18,
            background: "rgba(255,255,255,.025)", padding: "16px 12px",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 9, padding: "9px 12px",
              borderRadius: 10, border: "1px solid rgba(99,102,241,.2)",
              background: "rgba(255,255,255,.04)", marginBottom: 14,
            }}>
              <Search size={13} color="#6366f1" />
              <input
                type="search" placeholder="Search docs" value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search documentation sections"
                style={{
                  flex: 1, background: "none", border: "none", outline: "none",
                  color: "#a1a1aa", fontSize: ".78rem", fontFamily: "inherit",
                }}
              />
            </div>
            <nav aria-label="Documentation navigation">
              {filtered.map(item => {
                const isActive = item.id === active;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    style={{
                      display: "flex", alignItems: "center", gap: 9, width: "100%",
                      padding: "8px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                      background: isActive ? "rgba(99,102,241,.18)" : "transparent",
                      color: isActive ? "#a5b4fc" : "#71717a",
                      fontSize: ".78rem", fontWeight: isActive ? 700 : 500,
                      fontFamily: "inherit", textAlign: "left",
                      transition: "background .18s ease, color .18s ease", marginBottom: 2,
                    }}
                  >
                    <span style={{ color: isActive ? "#6366f1" : "#4b5563", display: "flex", alignItems: "center" }}>
                      {item.icon}
                    </span>
                    {item.label}
                    {isActive && <ChevronRight size={12} style={{ marginLeft: "auto", color: "#6366f1" }} />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p style={{ padding: "12px", color: "#52525b", fontSize: ".75rem", textAlign: "center", margin: 0 }}>
                  No results for "{query}"
                </p>
              )}
            </nav>
          </aside>

          {/* ── RIGHT: All 15 content sections ── */}
          <div className="docs-content">

            {/* 01 · Overview */}
            <div id="doc-overview">
              <SectionCard>
                <DocTag label="01 · Overview" />
                <SectionTitle>A focused productivity stack, end to end.</SectionTitle>
                <Prose>
                  NotesTodo is a cross-platform mobile app (Android &amp; iOS) that combines note-taking
                  with lightweight task management. Each note can hold a title, a description, and a
                  checklist of todos — all organized under user-defined categories. Authentication is
                  handled with JWT access / refresh tokens and includes a full forgot-password flow via
                  email OTP.
                </Prose>
                <SubHeading>Key capabilities at a glance</SubHeading>
                <BulletList items={[
                  "Secure signup / login with hashed passwords and JWT",
                  "Forgot password via 6-digit OTP sent to email (valid 5 minutes)",
                  "Create, read, update, and delete notes",
                  "Attach checklist todos to any note",
                  "Organize notes by category; deleting a category also removes its notes",
                  "Persistent login state via AsyncStorage",
                  "Token-based request authorization on protected routes",
                ]} />
              </SectionCard>
            </div>

            {/* 02 · Why NotesTodo */}
            <div id="doc-why">
              <SectionCard>
                <DocTag label="02 · Why NotesTodo" />
                <SectionTitle>Small enough to learn from, complete enough to ship.</SectionTitle>
                <Prose>
                  Most note apps treat tasks as an afterthought. NotesTodo was built to keep notes and
                  actionable todos in the same place — under a flexible category system — while handling
                  the full auth lifecycle (registration, login, and password recovery) securely out of
                  the box.
                </Prose>
                <SubHeading>Design principles</SubHeading>
                <BulletList items={[
                  <><strong style={{ color: "#e2e8f0" }}>Secure by default</strong> — passwords hashed with bcrypt (cost factor 10), OTPs hashed before storage, refresh tokens stored in DB for single-device invalidation</>,
                  <><strong style={{ color: "#e2e8f0" }}>Offline-first session</strong> — JWT stored in AsyncStorage so the user stays logged in across restarts</>,
                  <><strong style={{ color: "#e2e8f0" }}>Clean separation</strong> — auth, categories, and notes each have their own route / controller / model; easy to maintain and extend</>,
                  <><strong style={{ color: "#e2e8f0" }}>Typed frontend</strong> — TypeScript on the React Native side catches issues at compile time</>,
                ]} />
              </SectionCard>
            </div>

            {/* 03 · Architecture */}
            <div id="doc-architecture">
              <SectionCard>
                <DocTag label="03 · Architecture" />
                <SectionTitle>Three clearly owned layers, one cohesive product.</SectionTitle>
                <Prose>
                  The frontend and backend are completely decoupled. The mobile app communicates only
                  through the REST API. Navigation is split into an Auth stack (Login, Signup,
                  ForgotPassword, OTP, RecreatePassword) and a Main stack (Bottom tabs + Card +
                  Settings), switched automatically based on the presence of a JWT in AsyncStorage.
                </Prose>
                <div
                  className="arch-grid"
                  style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 18 }}
                >
                  {[
                    {
                      label: "Client", title: "React Native (Mobile)",
                      body: "AuthContext ↔ AsyncStorage, Axios JWT interceptor, React Navigation (Auth stack / Main stack).",
                    },
                    {
                      label: "API", title: "Node.js + Express",
                      body: "/api/auth · /api/categories · /api/notes — each with its own controller and authMiddleware guard.",
                    },
                    {
                      label: "Data", title: "MongoDB Atlas",
                      body: "Collections: users · categories · nots. Nodemailer + Gmail SMTP for OTP emails.",
                    },
                  ].map(t => (
                    <div key={t.label} style={{
                      padding: "16px", border: "1px solid rgba(99,102,241,.18)",
                      borderRadius: 13, background: "rgba(99,102,241,.06)",
                    }}>
                      <span style={{ display: "block", color: "#6366f1", fontSize: ".6rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>{t.label}</span>
                      <strong style={{ display: "block", color: "#f5f5f7", fontSize: ".88rem", marginBottom: 8 }}>{t.title}</strong>
                      <p style={{ margin: 0, color: "#71717a", fontSize: ".75rem", lineHeight: 1.7 }}>{t.body}</p>
                    </div>
                  ))}
                </div>
                <CodeBlock lang="text">{`┌──────────────────────────────────────────────┐
│              React Native (Mobile)            │
│  AuthContext  ←→  AsyncStorage (token/userId) │
│  Axios client with JWT interceptor            │
│  React Navigation (Auth stack / Main stack)   │
└───────────────────┬──────────────────────────┘
                    │ HTTP / REST
                    ▼
┌──────────────────────────────────────────────┐
│          Node.js + Express (REST API)         │
│  /api/auth   → authController                 │
│  /api/categories → CategoryControllers        │
│  /api/notes  → notsController                 │
│  authMiddleware (JWT protect)                 │
└───────────────────┬──────────────────────────┘
                    │ Mongoose ODM
                    ▼
┌──────────────────────────────────────────────┐
│        MongoDB Atlas (Cloud Database)         │
│  Collections: users · categories · nots      │
└──────────────────────────────────────────────┘
                    │
              Nodemailer + Gmail SMTP
         (OTP emails for password reset)`}</CodeBlock>
              </SectionCard>
            </div>

            {/* 04 · Tech Stack */}
            <div id="doc-techstack">
              <SectionCard>
                <DocTag label="04 · Tech Stack" />
                <SectionTitle>The right tools for each layer.</SectionTitle>
                <SubHeading>Backend — /Backend</SubHeading>
                <div className="stack-table" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
                  {([
                    ["express ^5.2.1", "HTTP server and routing", "Server"],
                    ["mongoose ^9.9.1", "MongoDB ODM", "Data"],
                    ["bcryptjs ^2.4.3", "Password and OTP hashing", "Server"],
                    ["jsonwebtoken ^9.0.3", "JWT access & refresh tokens", "Server"],
                    ["nodemailer ^9.0.5", "OTP email delivery via Gmail SMTP", "Server"],
                    ["cors ^2.8.6", "Cross-origin resource sharing", "Server"],
                    ["dotenv ^17.4.2", "Environment variable loading", "Config"],
                    ["nodemon ^3.1.14", "Dev auto-restart (devDependency)", "Dev"],
                  ] as [string, string, string][]).map(([name, desc, layer]) => (
                    <div key={name} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", border: "1px solid rgba(99,102,241,.13)", borderRadius: 10, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ flex: 1 }}>
                        <strong style={{ display: "block", color: "#e2e8f0", fontSize: ".8rem", marginBottom: 3, fontFamily: '"JetBrains Mono",monospace' }}>{name}</strong>
                        <span style={{ color: "#71717a", fontSize: ".72rem", lineHeight: 1.5 }}>{desc}</span>
                      </div>
                      <span style={{ padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,.12)", color: "#818cf8", fontSize: ".58rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>{layer}</span>
                    </div>
                  ))}
                </div>
                <SubHeading>Frontend — /MyAuthApp</SubHeading>
                <div className="stack-table" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
                  {([
                    ["react-native 0.86.2", "Cross-platform mobile framework", "Client"],
                    ["react 19.2.3", "UI library", "Client"],
                    ["@react-navigation/native ^7", "Navigation container", "Client"],
                    ["axios ^1.19.0", "HTTP client with interceptors", "Client"],
                    ["async-storage ^3.1.1", "Persistent local token storage", "Client"],
                    ["formik ^2.4.9", "Form state management", "Client"],
                    ["react-hook-form ^7.84.0", "Lightweight form handling", "Client"],
                    ["yup ^1.7.1", "Schema-based form validation", "Client"],
                    ["lucide-react-native ^1.39.0", "Lucide icon set for React Native", "Client"],
                    ["rn-linear-gradient ^2.8.3", "Gradient UI elements", "Client"],
                    ["react-native-svg ^15.15.5", "SVG asset support", "Client"],
                    ["typescript ^5.8.3", "Static typing (devDependency)", "Dev"],
                  ] as [string, string, string][]).map(([name, desc, layer]) => (
                    <div key={name} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", border: "1px solid rgba(99,102,241,.13)", borderRadius: 10, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ flex: 1 }}>
                        <strong style={{ display: "block", color: "#e2e8f0", fontSize: ".8rem", marginBottom: 3, fontFamily: '"JetBrains Mono",monospace' }}>{name}</strong>
                        <span style={{ color: "#71717a", fontSize: ".72rem", lineHeight: 1.5 }}>{desc}</span>
                      </div>
                      <span style={{ padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,.12)", color: "#818cf8", fontSize: ".58rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>{layer}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* 05 · Project Structure */}
            <div id="doc-structure">
              <SectionCard>
                <DocTag label="05 · Project Structure" />
                <SectionTitle>Two directories, one product.</SectionTitle>
                <Prose>
                  The repo is split into <InlineCode>Backend/</InlineCode> (Express REST API) and{" "}
                  <InlineCode>MyAuthApp/</InlineCode> (React Native client). Each has its own{" "}
                  <InlineCode>package.json</InlineCode> and runs independently.
                </Prose>
                <CodeBlock lang="text">{`NotesTodo/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection via Mongoose
│   ├── controllers/
│   │   ├── authController.js      # signup, Login, forgotPassword, verifyOTP, resetPassword
│   │   ├── CategoryControllers.js # getCategories, createCategory, deleteCategory
│   │   └── notsController.js      # getAllNotes, getNotesByCategory, createNote, updateNote, deleteNote
│   ├── middlewares/
│   │   └── authMiddleware.js      # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Category.js            # Category schema
│   │   └── note.js                # Note + todos schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   ├── categoryRoutes.js      # /api/categories/*
│   │   └── notesRoutes.js         # /api/notes/*
│   ├── utils/
│   │   └── sendEmail.js           # Nodemailer Gmail helper
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── MyAuthApp/
    ├── Src/
    │   ├── Api/
    │   │   ├── apiClint.js         # Axios instance + JWT interceptor
    │   │   ├── AuthClients.js      # Auth API calls (signup/login/OTP/reset)
    │   │   ├── CategoryClint.js    # Category API calls
    │   │   └── NotsClients.js      # Notes API calls (get/post/update/delete)
    │   ├── Assets/Image/           # App images and SVG assets
    │   ├── Components/             # CustomButton, CustomInput, NoteCardAll, OTPInput …
    │   ├── Context/
    │   │   ├── AuthContext.js      # Token state, login(), logout()
    │   │   └── NumberContext.js    # Shared counter/answer state
    │   ├── Navigation/
    │   │   ├── Router.js           # Root navigator (auth vs main)
    │   │   ├── AuthNavigation.js   # Auth stack navigator
    │   │   └── MainNavigation.js   # Main stack + bottom tabs
    │   └── Screen/
    │       ├── AuthScreen/         # Login, Signup, ForgotPassword, OTP, RecreatePassword
    │       └── MainScreen/         # Home, Note, AddNote, AllNots, Card, Setting, BottomTab
    ├── App.tsx                     # Root component (AuthProvider + Router)
    ├── index.js                    # RN entry point
    ├── package.json
    └── tsconfig.json`}</CodeBlock>
              </SectionCard>
            </div>

            {/* 06 · Getting Started */}
            <div id="doc-gettingstarted">
              <SectionCard>
                <DocTag label="06 · Getting Started" />
                <SectionTitle>Up and running in minutes.</SectionTitle>
                <SubHeading>Prerequisites</SubHeading>
                <BulletList items={[
                  "Node.js >= 22.11.0 and npm or yarn",
                  "MongoDB Atlas account (free tier is sufficient)",
                  "Android Studio (for Android) or Xcode (for iOS)",
                  "React Native CLI environment — follow the official RN setup guide",
                ]} />

                <SubHeading>1 — Clone the repository</SubHeading>
                <CodeBlock>{`git clone <your-repo-url>
cd NotesTodo`}</CodeBlock>

                <SubHeading>2 — Set up the Backend</SubHeading>
                <CodeBlock>{`cd Backend
npm install

# Create your .env file (see Configuration section)
# then start the server:

npm run dev      # Development — auto-restart on changes
# or
npm start        # Production

# API runs at http://localhost:5000`}</CodeBlock>

                <SubHeading>3 — Set up the Frontend</SubHeading>
                <CodeBlock>{`cd MyAuthApp
npm install

# Update BASE_URL in Src/Api/apiClint.js to your machine's local IP
# e.g.  const BASE_URL = 'http://192.168.x.x:5000';

# Android
npm run android
# or
npx react-native run-android

# iOS
cd ios && pod install && cd ..
npm run ios

# Start Metro bundler (if not auto-started)
npm start`}</CodeBlock>

                <SubHeading>4 — Verify everything works</SubHeading>
                <Prose>
                  Open the app, tap <InlineCode>Sign Up</InlineCode>, create an account, then create a
                  note with a couple of todos. If the server terminal shows{" "}
                  <InlineCode>API is running and MongoDB connected!</InlineCode> and your data appears
                  in the app, you're good.
                </Prose>
              </SectionCard>
            </div>

            {/* 07 · Configuration */}
            <div id="doc-configuration">
              <SectionCard>
                <DocTag label="07 · Configuration" />
                <SectionTitle>Environment variables reference.</SectionTitle>
                <Prose>
                  Create a <InlineCode>.env</InlineCode> file in the <InlineCode>Backend/</InlineCode>{" "}
                  directory. This file is already listed in <InlineCode>.gitignore</InlineCode> — never
                  commit it.
                </Prose>
                <CodeBlock lang="env">{`# ── Server ───────────────────────────────────
PORT=5000

# ── MongoDB ───────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# ── JWT Secrets (use long random strings in production) ──
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>

# ── Email (Gmail + App Password for OTP delivery) ────────
EMAIL_USER=yourapp@gmail.com
EMAIL_APP_PASSWORD=<your_gmail_app_password>`}</CodeBlock>

                <SubHeading>Variable reference</SubHeading>
                <div className="docs-table-wrap" style={{ marginTop: 12, border: "1px solid rgba(99,102,241,.18)", borderRadius: 12, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(99,102,241,.1)", borderBottom: "1px solid rgba(99,102,241,.18)" }}>
                        {["Variable", "Description"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#818cf8", fontWeight: 700, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["PORT", "Port the Express server listens on (default: 5000)"],
                        ["MONGO_URI", "MongoDB Atlas connection string"],
                        ["ACCESS_TOKEN_SECRET", "Signs JWT access tokens — expires in 15 minutes"],
                        ["REFRESH_TOKEN_SECRET", "Signs JWT refresh tokens — expires in 7 days"],
                        ["EMAIL_USER", "Gmail address used to send OTP emails"],
                        ["EMAIL_APP_PASSWORD", "Gmail App Password — not your regular Google account password"],
                      ].map(([v, d], i, arr) => (
                        <tr key={v} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(99,102,241,.08)" : "none" }}>
                          <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#a5b4fc", fontSize: ".75rem", whiteSpace: "nowrap" }}>{v}</td>
                          <td style={{ padding: "10px 14px", color: "#a1a1aa", lineHeight: 1.6 }}>{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <SubHeading>Frontend — Base URL</SubHeading>
                <Prose>
                  Edit <InlineCode>MyAuthApp/Src/Api/apiClint.js</InlineCode> and set{" "}
                  <InlineCode>BASE_URL</InlineCode> to your backend host:
                </Prose>
                <CodeBlock lang="js">{`const BASE_URL = 'http://<your-local-ip>:5000';`}</CodeBlock>
              </SectionCard>
            </div>

            {/* 08 · How It Works */}
            <div id="doc-howitworks">
              <SectionCard>
                <DocTag label="08 · How It Works" />
                <SectionTitle>Core flows, step by step.</SectionTitle>

                <SubHeading>Authentication flow</SubHeading>
                <BulletList items={[
                  <>Signup — user submits firstName, lastName, email, password, phoneNumber. Backend validates, hashes the password with bcrypt, creates the user, and returns both an <InlineCode>accessToken</InlineCode> (15 min) and a <InlineCode>refreshToken</InlineCode> (7 days).</>,
                  <>Login — credentials validated, new tokens issued, refreshToken updated in DB.</>,
                  <>Protected requests — the Axios interceptor in <InlineCode>apiClint.js</InlineCode> reads <InlineCode>userToken</InlineCode> from AsyncStorage and attaches it as <InlineCode>Authorization: Bearer &lt;token&gt;</InlineCode> on every request. The <InlineCode>protect</InlineCode> middleware on the backend verifies the token and attaches the user to <InlineCode>req.user</InlineCode>.</>,
                ]} />

                <SubHeading>Forgot-password OTP flow</SubHeading>
                <BulletList items={[
                  "User submits email → backend generates a 6-digit OTP, hashes it, stores it with a 5-minute expiry, and sends the plaintext OTP via Nodemailer / Gmail",
                  "User submits OTP → backend compares with stored hash and verifies expiry",
                  "User submits new password → backend hashes and saves it, clears OTP fields, and invalidates the existing refresh token",
                ]} />

                <SubHeading>Navigation flow</SubHeading>
                <BulletList items={[
                  <>On app start, <InlineCode>AuthContext</InlineCode> checks AsyncStorage for a saved token. While checking, a loading spinner is shown.</>,
                  <>Token present → <InlineCode>MainNavigation</InlineCode> (bottom tabs: Home, Notes, All Notes, Settings) is rendered.</>,
                  <>No token → <InlineCode>AuthNavigation</InlineCode> (Login screen by default) is rendered.</>,
                  "Logout clears the token and userData from AsyncStorage, sending the user back to the Auth stack.",
                ]} />

                <SubHeading>Notes &amp; categories</SubHeading>
                <BulletList items={[
                  <>Notes belong to a <InlineCode>user_id</InlineCode> and optionally a <InlineCode>category_id</InlineCode>.</>,
                  <>Each note has a <InlineCode>todos</InlineCode> array of <InlineCode>{"{ task_text, is_completed }"}</InlineCode> objects for checklist functionality.</>,
                  <><InlineCode>GET /api/notes/all</InlineCode> is protected and returns only the authenticated user's notes with category names populated via Mongoose <InlineCode>populate</InlineCode>.</>,
                  "Deleting a category cascades and deletes all notes in that category.",
                ]} />
              </SectionCard>
            </div>

            {/* 09 · Database Schema */}
            <div id="doc-dbschema">
              <SectionCard>
                <DocTag label="09 · Database Schema" />
                <SectionTitle>Three collections, clean boundaries.</SectionTitle>

                <SubHeading>users — Backend/models/User.js</SubHeading>
                <CodeBlock lang="js">{`{
  _id:                    ObjectId,   // auto-generated
  firstName:              String,     // required
  lastName:               String,     // required
  email:                  String,     // required, unique
  password:               String,     // required, select:false  (bcrypt hash)
  phoneNumber:            String,     // required, unique  (10-digit Indian format)
  refreshToken:           String,     // select:false — updated on each login
  resetPasswordOTP:       String,     // select:false — bcrypt-hashed OTP
  resetPasswordOTPExpiry: Date,       // select:false — 5-min window
  createdAt:              Date,       // Mongoose timestamps
  updatedAt:              Date
}`}</CodeBlock>

                <SubHeading>categories — Backend/models/Category.js</SubHeading>
                <CodeBlock lang="js">{`{
  _id:           ObjectId,  // auto-generated
  category_name: String     // required
}`}</CodeBlock>

                <SubHeading>nots — Backend/models/note.js</SubHeading>
                <CodeBlock lang="js">{`{
  _id:         ObjectId,                    // auto-generated
  title:       String,                      // required
  description: String,                      // required
  todos: [
    {
      task_text:    String,                 // required — the task label
      is_completed: Boolean                 // default: false
    }
  ],
  category_id: ObjectId (ref: 'Category'), // optional, default: null
  user_id:     ObjectId (ref: 'User')      // required
}`}</CodeBlock>
              </SectionCard>
            </div>

            {/* 10 · API Reference */}
            <div id="doc-apireference">
              <SectionCard>
                <DocTag label="10 · API Reference" />
                <SectionTitle>Every endpoint, at a glance.</SectionTitle>
                <Prose>
                  Base URL: <InlineCode>http://localhost:5000</InlineCode>. Endpoints marked{" "}
                  <span style={{ color: "#86efac" }}>🔒</span> require{" "}
                  <InlineCode>Authorization: Bearer &lt;accessToken&gt;</InlineCode>.
                </Prose>

                {/* Route summary table */}
                <div className="docs-table-wrap" style={{ marginTop: 18, border: "1px solid rgba(99,102,241,.18)", borderRadius: 12, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(99,102,241,.1)", borderBottom: "1px solid rgba(99,102,241,.18)" }}>
                        {["#", "Method", "Endpoint", "Auth", "Description"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#818cf8", fontWeight: 700, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {API_ROUTES.map((r, i) => (
                        <tr key={i} style={{ borderBottom: i < API_ROUTES.length - 1 ? "1px solid rgba(99,102,241,.08)" : "none" }}>
                          <td style={{ padding: "10px 14px", color: "#52525b", fontSize: ".72rem" }}>{r.num}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <BadgePill label={r.method} variant={r.method.toLowerCase() as "get" | "post" | "put" | "delete"} />
                          </td>
                          <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#a5b4fc", fontSize: ".75rem" }}>{r.path}</td>
                          <td style={{ padding: "10px 14px", color: r.auth ? "#86efac" : "#71717a", fontSize: ".7rem" }}>{r.auth ? "🔒" : "—"}</td>
                          <td style={{ padding: "10px 14px", color: "#a1a1aa", lineHeight: 1.6 }}>{r.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Detailed endpoint blocks */}
                <SubHeading>POST /api/auth/signup</SubHeading>
                <CodeBlock lang="json">{`// Request body
{
  "firstName": "Raj",
  "lastName": "Kumar",
  "email": "raj@example.com",
  "password": "secret123",
  "phoneNumber": "9876543210"
}

// Success 201
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "<userId>",
    "firstName": "Raj",
    "email": "raj@example.com",
    "accessToken": "<jwt_15min>",
    "refreshToken": "<jwt_7days>"
  }
}`}</CodeBlock>

                <SubHeading>POST /api/auth/forgot-password</SubHeading>
                <CodeBlock lang="json">{`// Request body
{ "email": "raj@example.com" }

// Success 200
{ "success": true, "message": "OTP sent successfully to your email" }`}</CodeBlock>

                <SubHeading>POST /api/auth/Otp — verify OTP</SubHeading>
                <CodeBlock lang="json">{`// Request body
{ "email": "raj@example.com", "otp": "482910" }

// Success 200
{ "success": true, "message": "OTP verified successfully" }`}</CodeBlock>

                <SubHeading>POST /api/auth/resetpassword</SubHeading>
                <CodeBlock lang="json">{`// Request body
{ "email": "raj@example.com", "otp": "482910", "newPassword": "newSecret456" }

// Success 200
{ "success": true, "message": "Password reset successfully. Please login with your new password." }`}</CodeBlock>

                <SubHeading>GET /api/notes/all 🔒</SubHeading>
                <CodeBlock lang="json">{`// Success 200
{
  "success": true,
  "user": { "_id": "<userId>", "firstName": "Raj", "email": "raj@example.com" },
  "NotesDeta": [
    {
      "_id": "<noteId>",
      "title": "Grocery List",
      "description": "Weekly shopping items",
      "todos": [
        { "_id": "<todoId>", "task_text": "Buy milk", "is_completed": false },
        { "_id": "<todoId>", "task_text": "Buy eggs", "is_completed": true }
      ],
      "category_id": { "_id": "<catId>", "category_name": "Personal" },
      "user_id": "<userId>"
    }
  ]
}`}</CodeBlock>

                <SubHeading>POST /api/notes/ — create a note</SubHeading>
                <CodeBlock lang="json">{`// Request body
{
  "title": "Grocery List",
  "description": "Weekly shopping",
  "todos": [
    { "task_text": "Buy eggs", "is_completed": false },
    { "task_text": "Buy bread", "is_completed": false }
  ],
  "category_id": "<categoryId>",
  "user_id": "<userId>"
}`}</CodeBlock>

                <SubHeading>Common error shape</SubHeading>
                <CodeBlock lang="json">{`{ "success": false, "message": "Human-readable error description" }`}</CodeBlock>
                <div className="docs-table-wrap" style={{ marginTop: 14, border: "1px solid rgba(99,102,241,.18)", borderRadius: 12, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                    <thead>
                      <tr style={{ background: "rgba(99,102,241,.1)", borderBottom: "1px solid rgba(99,102,241,.18)" }}>
                        {["HTTP Status", "When it occurs"].map(h => (
                          <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#818cf8", fontWeight: 700, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["400", "Validation failed — missing or invalid fields"],
                        ["401", "No token provided, or token is invalid / expired"],
                        ["404", "Requested resource (user, note, category) not found"],
                        ["409", "Conflict — email or phone number already registered"],
                        ["500", "Unexpected server error"],
                      ].map(([code, desc], i, arr) => (
                        <tr key={code} style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(99,102,241,.08)" : "none" }}>
                          <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#fca5a5", fontSize: ".8rem" }}>{code}</td>
                          <td style={{ padding: "10px 14px", color: "#a1a1aa", lineHeight: 1.6 }}>{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            </div>

            {/* 11 · Extending NotesTodo */}
            <div id="doc-extending">
              <SectionCard>
                <DocTag label="11 · Extending NotesTodo" />
                <SectionTitle>Good seams to build on.</SectionTitle>

                <SubHeading>Add a new API route</SubHeading>
                <BulletList items={[
                  <>Create a controller file in <InlineCode>Backend/controllers/</InlineCode>.</>,
                  <>Add a route file in <InlineCode>Backend/routes/</InlineCode> using <InlineCode>express.Router()</InlineCode>.</>,
                  <>Mount the router in <InlineCode>Backend/server.js</InlineCode> with <InlineCode>{"app.use('/api/<resource>', require('./routes/<file>'))"}</InlineCode>.</>,
                  <>Add a corresponding API client function in <InlineCode>MyAuthApp/Src/Api/</InlineCode>.</>,
                ]} />

                <SubHeading>Add a new screen</SubHeading>
                <BulletList items={[
                  <>Create a folder under <InlineCode>MyAuthApp/Src/Screen/MainScreen/</InlineCode> or <InlineCode>AuthScreen/</InlineCode>.</>,
                  <>Add it to the appropriate navigator (<InlineCode>AuthNavigation.js</InlineCode> or <InlineCode>MainNavigation.js</InlineCode>).</>,
                  "Export it from the relevant index.js if needed.",
                ]} />

                <SubHeading>Add a new model</SubHeading>
                <BulletList items={[
                  <>Define a Mongoose schema in <InlineCode>Backend/models/</InlineCode>.</>,
                  <>Reference it in the appropriate controller with <InlineCode>{"require('../models/<Model>')"}</InlineCode>.</>,
                ]} />

                <SubHeading>Swap email provider</SubHeading>
                <Prose>
                  The <InlineCode>sendEmail</InlineCode> utility in{" "}
                  <InlineCode>Backend/utils/sendEmail.js</InlineCode> uses Nodemailer. Change the{" "}
                  <InlineCode>service</InlineCode> field (or use a full SMTP config) and update{" "}
                  <InlineCode>EMAIL_USER</InlineCode> / <InlineCode>EMAIL_APP_PASSWORD</InlineCode> in{" "}
                  <InlineCode>.env</InlineCode> to switch to SendGrid, Mailgun, SES, etc.
                </Prose>

                <SubHeading>Add Google / social login</SubHeading>
                <Prose>
                  A <InlineCode>GoogleButton</InlineCode> component already exists in{" "}
                  <InlineCode>MyAuthApp/Src/ComponentsStartup/</InlineCode>. Wire it up with{" "}
                  <InlineCode>@react-native-google-signin/google-signin</InlineCode> and add a
                  corresponding <InlineCode>/api/auth/google</InlineCode> route on the backend.
                </Prose>
              </SectionCard>
            </div>

            {/* 12 · Testing */}
            <div id="doc-testing">
              <SectionCard>
                <DocTag label="12 · Testing" />
                <SectionTitle>What to test and how.</SectionTitle>

                <SubHeading>Backend — manual testing (current)</SubHeading>
                <Prose>
                  The backend does not yet have an automated test suite. Manual testing can be done
                  with any REST client (Postman, Insomnia, curl).
                </Prose>
                <CodeBlock>{`# Verify the server health check
curl http://localhost:5000/
# → "API is running and MongoDB connected!"`}</CodeBlock>

                <SubHeading>Frontend — Jest (configured)</SubHeading>
                <Prose>
                  The React Native project uses <strong style={{ color: "#e2e8f0" }}>Jest</strong> with{" "}
                  <InlineCode>@react-native/jest-preset</InlineCode>. A basic smoke test lives at{" "}
                  <InlineCode>MyAuthApp/__tests__/App.test.tsx</InlineCode>.
                </Prose>
                <CodeBlock>{`cd MyAuthApp

# Run all tests
npm test

# Run with coverage
npx jest --coverage`}</CodeBlock>

                <SubHeading>Recommended approach (roadmap)</SubHeading>
                <BulletList items={[
                  "Backend: Jest + Supertest for route integration tests against a mongodb-memory-server instance",
                  "Frontend: React Native Testing Library for screen and component tests",
                  "E2E: Detox for end-to-end flows on a real emulator",
                  "Mock Axios with axios-mock-adapter to isolate network calls in unit tests",
                ]} />
              </SectionCard>
            </div>

            {/* 13 · Roadmap */}
            <div id="doc-roadmap">
              <SectionCard>
                <DocTag label="13 · Roadmap" />
                <SectionTitle>What comes next.</SectionTitle>
                <div style={{ display: "grid", gap: 10, marginTop: 6 }}>
                  {([
                    ["Refresh token endpoint — renew expired access tokens without re-login", "Planned"],
                    ["Search notes by title or description", "Planned"],
                    ["Note pinning / favourites", "Planned"],
                    ["Offline support — queue creates/updates, sync when back online", "Planned"],
                    ["Push notifications for todo reminders", "Planned"],
                    ["Google / social login (component shell already exists)", "Planned"],
                    ["Note sharing between users", "Planned"],
                    ["Dark mode", "Planned"],
                    ["Unit and integration test coverage for backend controllers", "In progress"],
                    ["CI/CD pipeline (GitHub Actions)", "In progress"],
                  ] as [string, string][]).map(([label, status]) => {
                    const color = status === "In progress" ? "#fde047" : "#71717a";
                    return (
                      <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "11px 14px", border: "1px solid rgba(99,102,241,.12)", borderRadius: 10, background: "rgba(255,255,255,.02)" }}>
                        <span style={{ color: "#d4d4d8", fontSize: ".83rem" }}>{label}</span>
                        <span style={{ color, fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{status}</span>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>

            {/* 14 · Contributing */}
            <div id="doc-contributing">
              <SectionCard>
                <DocTag label="14 · Contributing" />
                <SectionTitle>Open to collaboration.</SectionTitle>
                <Prose>
                  Contributions are welcome. Please open an issue before submitting a pull request so
                  we can discuss the approach first.
                </Prose>
                <CodeBlock>{`# 1. Fork the repo and create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes and commit
git commit -m "feat: describe your change"

# 3. Push to your fork
git push origin feature/your-feature-name

# 4. Open a Pull Request against main`}</CodeBlock>

                <SubHeading>Code style guidelines</SubHeading>
                <BulletList items={[
                  "Backend: CommonJS modules, consistent async/await error handling",
                  "Frontend: functional components with hooks, TypeScript where possible",
                  <>Run <InlineCode>npm run lint</InlineCode> in the frontend before submitting</>,
                  "One logical change per pull request",
                  "Keep commit messages in the conventional commits format",
                ]} />

                <SubHeading>Reporting bugs</SubHeading>
                <Prose>
                  Open an issue with steps to reproduce, expected behavior, and actual behavior.
                </Prose>
              </SectionCard>
            </div>

            {/* 15 · License */}
            <div id="doc-license">
              <SectionCard>
                <DocTag label="15 · License" />
                <SectionTitle>ISC License.</SectionTitle>
                <Prose>
                  This project is licensed under the{" "}
                  <strong style={{ color: "#a5b4fc" }}>ISC License</strong> (as declared in{" "}
                  <InlineCode>Backend/package.json</InlineCode>).
                </Prose>
                <CodeBlock lang="text">{`ISC License

Copyright (c) 2024 NotesTodo Contributors

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
OF THIS SOFTWARE.`}</CodeBlock>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                  <a
                    href="https://github.com/raj-9693"
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, background: "#6366f1", color: "#fff", fontWeight: 700, fontSize: ".82rem", textDecoration: "none" }}
                  >
                    <GitBranch size={14} />
                    View on GitHub
                  </a>
                  <a
                    href="#contact"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, background: "rgba(99,102,241,.12)", color: "#a5b4fc", fontWeight: 700, fontSize: ".82rem", border: "1px solid rgba(99,102,241,.25)", textDecoration: "none" }}
                  >
                    Get in touch
                  </a>
                </div>
              </SectionCard>
            </div>

          </div>{/* end right column */}
        </div>{/* end two-column layout */}
      </div>{/* end container */}

      <style>{`
        .developer-docs-section {
          color: #f5f5f7;
        }

        .notes-app.theme-light .developer-docs-section {
          background: linear-gradient(180deg, #f7f8ff 0%, #eef1fb 100%) !important;
          color: #1f2937;
          border-top-color: rgba(79, 70, 229, .16) !important;
        }

        .notes-app.theme-light .developer-docs-section h2,
        .notes-app.theme-light .developer-docs-section h3 {
          color: #172033 !important;
        }

        .notes-app.theme-light .developer-docs-section p,
        .notes-app.theme-light .developer-docs-section ul,
        .notes-app.theme-light .developer-docs-section li,
        .notes-app.theme-light .developer-docs-section td {
          color: #526078 !important;
        }

        .notes-app.theme-light .developer-docs-section strong {
          color: #27344d !important;
        }

        .notes-app.theme-light .developer-docs-section aside {
          border-color: rgba(79, 70, 229, .2) !important;
          background: rgba(255, 255, 255, .72) !important;
          box-shadow: 0 18px 42px rgba(50, 60, 100, .08);
        }

        .notes-app.theme-light .developer-docs-section aside > div {
          border-color: rgba(79, 70, 229, .18) !important;
          background: rgba(238, 241, 251, .82) !important;
        }

        .notes-app.theme-light .developer-docs-section input {
          color: #34415a !important;
        }

        .notes-app.theme-light .developer-docs-section button {
          color: #526078 !important;
        }

        .notes-app.theme-light .developer-docs-section button[aria-current="location"] {
          color: #4338ca !important;
          background: rgba(99, 102, 241, .13) !important;
        }

        .notes-app.theme-light .developer-docs-section .docs-section-card {
          border-color: rgba(79, 70, 229, .16) !important;
          background: rgba(255, 255, 255, .78) !important;
          box-shadow: 0 12px 30px rgba(50, 60, 100, .06);
        }

        .notes-app.theme-light .developer-docs-section .docs-table-wrap {
          border-color: rgba(79, 70, 229, .16) !important;
          background: rgba(255, 255, 255, .7);
        }

        .notes-app.theme-light .developer-docs-section table tr {
          border-bottom-color: rgba(79, 70, 229, .12) !important;
        }

        .notes-app.theme-light .developer-docs-section table tr:first-child {
          background: rgba(99, 102, 241, .1) !important;
        }

        .notes-app.theme-light .developer-docs-section pre {
          background: #182033 !important;
          color: #c7d2fe !important;
          border-color: rgba(79, 70, 229, .24) !important;
        }

        .docs-layout > aside {
          min-width: 0;
        }

        .docs-content {
          min-width: 0;
          width: 100%;
        }

        @media (max-width: 767px) {
          .developer-docs-section {
            overflow-x: hidden;
            padding: 64px 0 72px !important;
          }

          .developer-docs-section > .container {
            width: 100%;
            max-width: 100%;
            padding-inline: 16px;
          }

          .docs-layout {
            width: 100%;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 0 !important;
          }

          .docs-layout > aside {
            display: none !important;
          }

          .docs-content {
            min-width: 0;
            max-width: 100%;
          }

          .docs-section-card {
            padding: 22px 18px !important;
            border-radius: 14px !important;
          }

          .docs-table-wrap {
            max-width: 100%;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
          }

          .docs-table-wrap table {
            min-width: 620px;
          }
        }

        @media (max-width: 620px) {
          .arch-grid  { grid-template-columns: 1fr !important; }
          .stack-table { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
