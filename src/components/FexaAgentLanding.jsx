import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Mic,
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Menu,
  X,
  Play,
  Phone,
  PhoneOff,
  Search,
  Bell,
  Settings,
  Users,
  BarChart3,
  Puzzle,
  Inbox,
  Bot,
  Headset,
  Shield,
  Workflow,
  Clock,
  ShoppingBag,
  Zap,
} from "lucide-react";

/* ----------------------------------------------------------------------- */
/*  Small self-contained brand icons (lucide dropped these in newer         */
/*  versions, so these are plain inline SVGs — no external dependency)      */
/* ----------------------------------------------------------------------- */
function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 8.5h2V5.3c-.35-.05-1.54-.15-2.94-.15-2.9 0-4.9 1.77-4.9 5.02v2.6H6.3V16h2.86v8h3.44v-8h2.75l.44-3.23h-3.19V10.5c0-.93.26-1.57 1.6-1.57Z"
        fill="currentColor"
      />
    </svg>
  );
}
function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TwitterIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M20 5.8c-.66.3-1.36.5-2.1.6a3.7 3.7 0 0 0 1.6-2 7.3 7.3 0 0 1-2.33.9 3.66 3.66 0 0 0-6.24 3.34A10.4 10.4 0 0 1 3.4 4.9a3.66 3.66 0 0 0 1.13 4.89c-.6-.02-1.16-.19-1.65-.46v.05a3.67 3.67 0 0 0 2.94 3.6c-.55.15-1.13.17-1.68.06a3.67 3.67 0 0 0 3.42 2.55A7.36 7.36 0 0 1 2.9 16.9a10.4 10.4 0 0 0 5.63 1.65c6.75 0 10.45-5.6 10.45-10.45l-.01-.48A7.5 7.5 0 0 0 20 5.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
function YoutubeIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" />
    </svg>
  );
}
function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7.2" cy="8" r="1.15" fill="currentColor" />
      <path d="M6.2 11h2v7h-2v-7Zm4.2 0h1.9v1c.5-.75 1.3-1.2 2.3-1.2 1.9 0 2.9 1.25 2.9 3.4V18h-2v-3.4c0-1-.4-1.7-1.35-1.7-.75 0-1.2.5-1.4 1-.07.18-.09.42-.09.66V18h-2v-7Z" fill="currentColor" />
    </svg>
  );
}

/* ----------------------------------------------------------------------- */
/*  Shared: scroll reveal + count-up                                       */
/* ----------------------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s cubic-bezier(.21,.9,.35,1) ${delay}ms, transform 0.7s cubic-bezier(.21,.9,.35,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(step);
            else setVal(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  const display = Number.isInteger(target) ? Math.round(val) : val.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/*  Small shared bits                                                      */
/* ----------------------------------------------------------------------- */
function Eyebrow({ children }) {
  return (
    <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-300">
      {children}
    </span>
  );
}

function PrimaryButton({ children, className = "", ...rest }) {
  return (
    <button
      className={
        "relative inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_0_0_6px_rgba(52,211,153,0.15)] active:scale-95 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", ...rest }) {
  return (
    <button
      className={
        "inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-emerald-400/60 hover:text-emerald-300 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

function Scribble({ text, className = "" }) {
  return (
    <span
      className={"pointer-events-none select-none text-emerald-300 " + className}
      style={{ fontFamily: "'Segoe Script','Brush Script MT',cursive", fontSize: 20, lineHeight: 1.1 }}
    >
      {text}
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/*  Navbar                                                                  */
/* ----------------------------------------------------------------------- */
const NAV_LINKS = ["Product", "Solutions", "Pricing", "Resources", "Company"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        "sticky top-0 z-50 transition-all duration-500 " +
        (scrolled ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400 text-sm font-black text-slate-950">
            <Bot size={18} />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Fexa Agent</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="group relative text-sm text-slate-300 transition-colors hover:text-white">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="#" className="text-sm text-slate-300 transition-colors hover:text-white">
            Sign in
          </a>
          <PrimaryButton className="!px-5 !py-2.5 text-xs">
            Book a Demo <ArrowRight size={14} />
          </PrimaryButton>
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="overflow-hidden transition-all duration-300 md:hidden" style={{ maxHeight: open ? 320 : 0 }}>
        <div className="flex flex-col gap-4 px-6 pb-6">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-sm text-slate-300">
              {l}
            </a>
          ))}
          <PrimaryButton className="w-full justify-center">Book a Demo</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  Hero + dashboard mockup                                                 */
/* ----------------------------------------------------------------------- */
const CONVERSATIONS = [
  { name: "Sarah Johnson", msg: "Hi! Do you have this in stock?", time: "2m ago" },
  { name: "Michael Chen", msg: "Can you tell me the pricing?", time: "5m ago" },
  { name: "Emily Carter", msg: "I'd like to place an order.", time: "12m ago" },
  { name: "David Wilson", msg: "Do you offer international shipping?", time: "18m ago" },
  { name: "Sophia Martinez", msg: "Thank you! That's helpful.", time: "24m ago" },
];
const CHANNELS = ["All", "Facebook", "Instagram", "WhatsApp", "Messenger", "Website"];
const CHANNEL_ICONS = [FacebookIcon, InstagramIcon, MessageCircle, MessageCircle];

const STATS = [
  { value: 5, suffix: "x", label: "Faster Response" },
  { value: 24, suffix: "/7", label: "Customer Support" },
  { value: 10, suffix: "x", label: "More Conversions" },
  { value: 99.9, suffix: "%", label: "Uptime & Reliability" },
];

function DashboardMock() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)]"
      style={{ animation: "floaty 7s ease-in-out infinite" }}
    >
      <div className="grid grid-cols-[54px_1fr] sm:grid-cols-[190px_1fr]">
        {/* sidebar */}
        <div className="flex flex-col gap-1 border-r border-white/10 bg-slate-950/60 p-3 text-xs text-slate-400">
          <div className="mb-3 hidden items-center gap-2 px-1 sm:flex">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400 text-slate-950">
              <Bot size={12} />
            </span>
            <span className="text-[11px] font-semibold text-white">Fexa Agent</span>
          </div>
          {[
            { icon: Inbox, label: "Inbox", active: true },
            { icon: Bot, label: "AI Agents" },
            { icon: Users, label: "Contacts" },
            { icon: Clock, label: "Automation" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Puzzle, label: "Integrations" },
            { icon: Settings, label: "Settings" },
          ].map((it) => (
            <div
              key={it.label}
              className={
                "flex items-center gap-2 rounded-md px-2 py-1.5 " +
                (it.active ? "bg-emerald-500/15 text-emerald-300" : "")
              }
            >
              <it.icon size={13} />
              <span className="hidden sm:inline">{it.label}</span>
            </div>
          ))}
        </div>

        {/* main */}
        <div>
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-500">
              <Search size={12} /> Search conversations...
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] text-emerald-300 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> AI Agent
            </span>
            <Bell size={14} className="text-slate-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr]">
            <div className="border-b border-white/10 p-3 sm:border-b-0 sm:border-r">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-white">Inbox</span>
                <span className="text-[10px] text-slate-500">Always on</span>
              </div>
              <div className="mb-2 flex gap-1 overflow-x-auto pb-1 text-[10px] text-slate-400">
                {CHANNELS.map((c, i) => (
                  <span
                    key={c}
                    className={
                      "shrink-0 rounded-full px-2 py-1 " +
                      (i === 0 ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5")
                    }
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {CONVERSATIONS.map((c, i) => (
                  <div
                    key={c.name}
                    className={"flex items-center gap-2 rounded-lg px-2 py-1.5 " + (i === 0 ? "bg-white/5" : "")}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[9px] font-semibold text-emerald-300">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[11px] text-white">{c.name}</div>
                      <div className="truncate text-[10px] text-slate-500">{c.msg}</div>
                    </div>
                    <span className="shrink-0 text-[9px] text-slate-600">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white">Sarah Johnson</span>
                <div className="flex gap-1.5">
                  {CHANNEL_ICONS.map((Icon, i) => (
                    <span key={i} className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300">
                      <Icon size={11} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-3 py-1.5 text-[11px] text-slate-200 transition-opacity duration-500" style={{ opacity: step >= 0 ? 1 : 0 }}>
                  Hi! Do you have this in stock?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald-400 px-3 py-1.5 text-[11px] text-slate-950 transition-opacity duration-500" style={{ opacity: step >= 1 ? 1 : 0 }}>
                  Yes! It's in stock and ready to ship. Would you like to place an order?
                </div>
                <div
                  className="ml-auto flex max-w-[85%] items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 transition-opacity duration-500"
                  style={{ opacity: step >= 2 ? 1 : 0 }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-300">
                    <ShoppingBag size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] text-white">Premium Headphones</div>
                    <div className="text-[10px] text-emerald-300">$99.00</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-400 px-2 py-1 text-[9px] font-semibold text-slate-950">
                    Buy Now
                  </span>
                </div>
                {step < 2 && (
                  <div className="flex gap-1 pl-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>

              <div className="mt-2 rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-slate-500">Type a message...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden bg-slate-950 pb-10 pt-16 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[120px]"
        style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <Eyebrow>AI Agents for Business</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Automate today.
            <br />
            <span className="text-emerald-400">Grow tomorrow.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
            Fexa Agent helps businesses automate customer conversations, recruitment and repetitive
            workflows with intelligent AI agents.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton>
              Book a Demo <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Explore Solutions</GhostButton>
            <Scribble
              text="Less work, more growth"
              className="absolute -right-4 -top-16 hidden rotate-[-6deg] sm:block"
            />
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Setup in minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Trusted by modern businesses
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} className="px-6">
        <DashboardMock />
      </Reveal>

      <Reveal delay={300}>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-emerald-400 sm:text-4xl">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </header>
  );
}

/* ----------------------------------------------------------------------- */
/*  Trusted-by logo strip                                                   */
/* ----------------------------------------------------------------------- */
const BRANDS = ["Shopify", "WordPress", "WooCommerce", "Meta", "Google", "Zapier"];

function LogoStrip() {
  return (
    <section className="border-t border-white/5 bg-slate-950 py-10">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-600">Trusted by 2,000+ businesses worldwide</p>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
          {BRANDS.map((b) => (
            <span key={b} className="text-sm font-semibold text-slate-500 opacity-70 transition-opacity hover:opacity-100">
              {b}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Globe / global trust section                                            */
/* ----------------------------------------------------------------------- */
function GlobeSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-4 pt-8 text-center">
      <Reveal>
        <div className="relative mx-auto h-40 w-full max-w-3xl sm:h-56">
          <div
            className="absolute left-1/2 top-full h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[520px] sm:w-[520px]"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(52,211,153,0.55), rgba(15,118,110,0.25) 45%, rgba(2,6,23,0) 70%)",
              boxShadow: "0 -20px 80px rgba(16,185,129,0.35)",
              animation: "spinSlow 40s linear infinite",
              backgroundImage:
                "radial-gradient(circle at 50% 30%, rgba(52,211,153,0.55), rgba(15,118,110,0.25) 45%, rgba(2,6,23,0) 70%), repeating-conic-gradient(rgba(255,255,255,0.05) 0deg 2deg, transparent 2deg 14deg)",
            }}
          />
          <div
            className="absolute left-1/2 top-full h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border-t border-emerald-300/40 sm:h-[520px] sm:w-[520px]"
          />
        </div>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-6 text-sm text-slate-400">Businesses in 30+ countries automate with Fexa Agent</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["S", "M", "J", "R"].map((i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500/20 text-xs font-semibold text-emerald-300"
              >
                {i}
              </span>
            ))}
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-500">4.9/5 from 500+ reviews</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  "See Fexa Agent in Action" showcase                                     */
/* ----------------------------------------------------------------------- */
const VIDEO_CARDS = [
  { icon: MessageCircle, title: "AI Chat Agent", desc: "Automate customer conversations across all channels.", time: "02:15" },
  { icon: Users, title: "AI Recruitment Agent", desc: "Find, screen and hire top talent faster with AI.", time: "01:28" },
  { icon: Mic, title: "AI Voice Agent", desc: "Handle calls, answer questions and book appointments.", time: "02:02" },
];

function ActionSection() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>Watch &amp; Learn</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See Fexa Agent <span className="text-emerald-400">in Action</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Watch how each AI agent works and discover how Fexa Agent can help your business automate,
            engage and grow — effortlessly.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
          {VIDEO_CARDS.map((v, i) => (
            <Reveal delay={i * 100} key={v.title}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40">
                <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-emerald-900/50 to-slate-900">
                  <span className="absolute right-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                    {v.time}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 transition-transform duration-300 group-hover:scale-110">
                    <Play size={16} className="ml-0.5" fill="currentColor" />
                  </span>
                  <v.icon size={64} className="absolute -right-3 -bottom-3 text-emerald-400/10" />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-white">{v.title}</div>
                  <p className="mt-1 text-xs text-slate-500">{v.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-300">
                    Watch Video <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={250}>
          <div className="mt-6 grid grid-cols-1 items-center gap-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 p-8 text-left sm:grid-cols-[1.3fr_1fr]">
            <div>
              <Eyebrow>Full Overview</Eyebrow>
              <h3 className="mt-4 text-2xl font-bold text-white">
                See All 3 Agents <span className="text-emerald-400">Together</span>
              </h3>
              <p className="mt-3 max-w-md text-sm text-slate-400">
                Watch how Fexa Agent's AI Chat, Recruitment and Voice Agents work together to automate
                your entire business workflow.
              </p>
              <PrimaryButton className="mt-5 !px-5 !py-2.5 text-xs">
                <Play size={12} fill="currentColor" /> Play Full Video · 03:45
              </PrimaryButton>
            </div>
            <div className="relative mx-auto h-44 w-full max-w-[280px]">
              {[
                { icon: MessageCircle, label: "Chat Agent", pos: "left-0 top-0" },
                { icon: Users, label: "Recruitment Agent", pos: "right-0 top-0" },
                { icon: Mic, label: "Voice Agent", pos: "right-6 bottom-0" },
              ].map((n) => (
                <div key={n.label} className={"absolute flex flex-col items-center gap-1 " + n.pos}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-emerald-300">
                    <n.icon size={15} />
                  </span>
                  <span className="text-[9px] text-slate-400">{n.label}</span>
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-400 text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.5)]"
                  style={{ animation: "pulseGlow 3s ease-in-out infinite" }}
                >
                  <Bot size={22} />
                </span>
                <span className="whitespace-nowrap text-[9px] font-medium text-white">Fexa Agent</span>
                <span className="whitespace-nowrap text-[8px] text-slate-500">One Platform · Endless Possibilities</span>
              </div>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 176">
                <circle cx="140" cy="88" r="60" fill="none" stroke="rgba(52,211,153,0.3)" strokeWidth="1" strokeDasharray="4 4" style={{ animation: "spinSlow 14s linear infinite", transformOrigin: "140px 88px" }} />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Problem section                                                         */
/* ----------------------------------------------------------------------- */
const PAIN_POINTS = [
  { icon: Headset, text: "Too many inquiries to handle" },
  { icon: Clock, text: "Slow response times" },
  { icon: MessageCircle, text: "Repetitive questions eat up time" },
  { icon: Workflow, text: "Manual follow-ups get forgotten" },
  { icon: Users, text: "Hiring takes unnecessary time" },
  { icon: Zap, text: "Valuable leads slip away" },
];

function ProblemSection() {
  return (
    <section className="bg-slate-900/40 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <Eyebrow>The Problem</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your team is buried in repetitive work.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-4 max-w-lg text-slate-400">
            Every day your team spends hours on tasks that could be automated. It slows growth,
            increases costs and leads to missed opportunities.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PAIN_POINTS.map((p, i) => (
              <Reveal delay={i * 70} key={p.text}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.06]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
                    <p.icon size={14} />
                  </span>
                  <span className="text-xs leading-snug text-slate-300">{p.text}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="relative mx-auto max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-8">
              <div
                className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/5"
                style={{ animation: "floaty 5s ease-in-out infinite" }}
              >
                <Users size={44} className="text-slate-500" />
              </div>
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-semibold text-white">
                <Phone size={11} /> 5 missed calls
              </span>
              <Scribble text="Sound familiar?" className="absolute bottom-3 left-3 rotate-[-4deg]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Product blocks: Chat / Recruiter / Voice                                */
/* ----------------------------------------------------------------------- */
function ChatMock() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="mb-3 flex justify-end gap-2">
        {[FacebookIcon, InstagramIcon, MessageCircle, MessageCircle].map((Icon, i) => (
          <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-slate-300">
            <Icon size={13} />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[9px]">C</span>
          Customer
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-3 py-2 text-xs text-slate-200">
          Hi! Do you have this in stock?
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[9px] text-slate-950">F</span>
          Fexa AI
        </div>
        <div
          className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-3 py-2 text-xs text-slate-200 transition-opacity duration-500"
          style={{ opacity: step >= 1 ? 1 : 0 }}
        >
          Yes! It's in stock and ready to ship. Would you like to place an order?
        </div>
        <div className="flex flex-wrap gap-2 transition-opacity duration-500" style={{ opacity: step >= 2 ? 1 : 0 }}>
          <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-slate-900">Yes, please!</span>
          <span className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] text-slate-300">
            Can you show me more options?
          </span>
        </div>
      </div>
    </div>
  );
}

function RecruiterMock() {
  const candidates = [
    { name: "Sarah Ahmed", role: "Marketing Specialist", score: 92 },
    { name: "John Carter", role: "Sales Executive", score: 80 },
    { name: "Emily Watson", role: "Content Writer", score: 85 },
    { name: "Michael Brown", role: "Product Manager", score: 83 },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="mb-3 text-xs font-semibold text-white">Top Candidates</div>
      <div className="flex flex-col gap-2.5">
        {candidates.map((c, i) => (
          <Reveal delay={i * 100} key={c.name}>
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-[10px] font-semibold text-fuchsia-300">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs text-white">{c.name}</div>
                <div className="truncate text-[10px] text-slate-500">{c.role}</div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                {c.score}%
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function VoiceMock() {
  const bars = Array.from({ length: 22 });
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-emerald-400/40" style={{ animation: "ringPulse 2.2s ease-out infinite" }} />
        <span className="absolute inset-0 rounded-full border border-emerald-400/25" style={{ animation: "ringPulse 2.2s ease-out infinite 0.7s" }} />
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-slate-300 shadow-[0_0_30px_rgba(52,211,153,0.35)]">
          <Users size={22} />
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-emerald-300">Speaking with customer...</p>
      <div className="mt-3 flex items-end justify-center gap-[3px]">
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-emerald-400/70"
            style={{ height: 5 + (i % 6) * 3, animation: "wave 1s ease-in-out infinite", animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300">
          <Mic size={14} />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
          <PhoneOff size={15} />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300">
          <Phone size={14} />
        </span>
      </div>
    </div>
  );
}

const PRODUCT_BLOCKS = [
  {
    tag: "Chat",
    title: "AI Chat Agent",
    tagline: "Turn conversations into customers.",
    items: ["Replies instantly on all channels", "Answers product questions", "Qualifies leads & books appointments", "Works 24/7 without breaks"],
    mock: ChatMock,
  },
  {
    tag: "Recruit",
    title: "AI Recruiter Agent",
    tagline: "Hire faster. Smarter.",
    items: ["Screens and filters candidates", "Conducts initial interviews", "Scores and ranks applicants", "Schedules interviews automatically"],
    mock: RecruiterMock,
  },
  {
    tag: "Voice",
    title: "AI Voice Agent",
    tagline: "Natural conversations. Real results.",
    items: ["Handles calls like a real human", "Answers questions & provides information", "Books appointments & takes orders", "Supports multiple languages"],
    mock: VoiceMock,
  },
];

function ProductsSection() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>Our Products</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI that works for your business.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Powerful AI agents designed to handle your most important workflows — so you can save time,
            reduce costs and drive real results.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-6 px-6">
        {PRODUCT_BLOCKS.map((b, i) => (
          <Reveal delay={i * 100} key={b.title}>
            <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:grid-cols-2 sm:p-8">
              <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{b.title}</h3>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                    {b.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-emerald-300">{b.tagline}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {b.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" /> {it}
                    </li>
                  ))}
                </ul>
                <button className="mt-5 inline-flex items-center gap-1 rounded-full border border-emerald-400/40 px-4 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/10">
                  Learn more <ArrowRight size={12} />
                </button>
              </div>
              <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                <b.mock />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  "Everything you need to grow" feature grid                              */
/* ----------------------------------------------------------------------- */
const GROW_FEATURES = [
  { icon: Inbox, title: "Omnichannel Inbox", desc: "All messages in one place" },
  { icon: Workflow, title: "Automation Workflows", desc: "Save time with AI" },
  { icon: Users, title: "Team Collaboration", desc: "Work smarter together" },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Track growth in real-time" },
  { icon: Puzzle, title: "Easy Integrations", desc: "Connect your favorite tools" },
  { icon: Shield, title: "Secure & Reliable", desc: "Your data is always safe" },
  { icon: Settings, title: "Custom Workflows", desc: "Build what you need" },
  { icon: Headset, title: "24/7 AI Support", desc: "Always on for your business" },
];

function GrowSection() {
  return (
    <section className="bg-slate-900/40 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to grow — in <span className="text-emerald-400">one platform.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Powerful tools, smarter workflows and seamless integrations — all in one place.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
          {GROW_FEATURES.map((f, i) => (
            <Reveal delay={i * 60} key={f.title}>
              <div className="h-full rounded-xl border border-white/10 bg-slate-950/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <f.icon size={16} />
                </span>
                <div className="mt-3 text-sm font-semibold text-white">{f.title}</div>
                <div className="mt-1 text-xs text-slate-500">{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Integrations                                                            */
/* ----------------------------------------------------------------------- */
const INTEGRATIONS = ["Shopify", "WordPress", "WooCommerce", "Meta", "Instagram", "WhatsApp", "Slack", "+20 more"];
const INTEGRATION_COLORS = ["#95BF47", "#21759B", "#96588A", "#0866FF", "#E1306C", "#25D366", "#611f69", "#334155"];

function IntegrationsSection() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Connect your favorite tools</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">Seamless integrations with the platforms you already use.</p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((name, i) => (
            <Reveal delay={i * 60} key={name}>
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-bold text-white transition-transform duration-300 hover:scale-110"
                  style={{ background: INTEGRATION_COLORS[i] + "33", color: INTEGRATION_COLORS[i], border: `1px solid ${INTEGRATION_COLORS[i]}55` }}
                >
                  {name.startsWith("+") ? name : name.slice(0, 2)}
                </span>
                <span className="text-[10px] text-slate-500">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/50 p-8 text-left sm:p-10">
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-white">More integrations. More possibilities.</h3>
              <p className="mt-2 text-sm text-slate-400">
                Connect Fexa Agent with 50+ apps and tools to create a seamless workflow across your
                entire business.
              </p>
              <PrimaryButton className="mt-5 !px-5 !py-2.5 text-xs">
                View all integrations <ArrowRight size={14} />
              </PrimaryButton>
            </div>
            {[
              { top: "10%", right: "8%", color: "#95BF47", delay: "0s" },
              { top: "42%", right: "22%", color: "#0866FF", delay: "1s" },
              { top: "60%", right: "4%", color: "#E1306C", delay: "2s" },
            ].map((f, i) => (
              <span
                key={i}
                className="absolute hidden h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white sm:flex"
                style={{
                  top: f.top,
                  right: f.right,
                  background: f.color,
                  animation: `floaty 4s ease-in-out infinite`,
                  animationDelay: f.delay,
                  boxShadow: `0 10px 30px ${f.color}55`,
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Testimonials                                                            */
/* ----------------------------------------------------------------------- */
const FEATURED_TESTIMONIALS = [
  {
    text: "Fexa Agent has completely transformed the way we handle customer inquiries. Our response time is 5x faster and we've seen a 40% increase in conversions.",
    name: "Jessica Miller",
    role: "CEO, TrendyKart",
    rating: 5,
  },
  {
    text: "The recruitment agent screens and ranks every applicant automatically. What used to take our team days now takes hours.",
    name: "Daniel Kim",
    role: "HR Manager, Northlane",
    rating: 5,
  },
  {
    text: "Our voice agent now handles the majority of inbound calls, and customers genuinely can't tell the difference.",
    name: "Rachel Adams",
    role: "Operations Lead, Brightly",
    rating: 5,
  },
];

const SMALL_TESTIMONIALS = [
  { icon: Workflow, text: "Hiring is now 10x easier with the AI Recruiter. It saves us so much time!", name: "Daniel Kim", role: "HR Manager" },
  { icon: Headset, text: "The AI voice agent handles calls perfectly. Our customers love it.", name: "Rachel Adams", role: "Operations Lead" },
  { icon: MessageCircle, text: "A must-have for any growing eCommerce business.", name: "Chris Taylor", role: "Founder, ShopFlow" },
];

function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % FEATURED_TESTIMONIALS.length), 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + dir + FEATURED_TESTIMONIALS.length) % FEATURED_TESTIMONIALS.length);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % FEATURED_TESTIMONIALS.length), 4500);
  };

  return (
    <section className="bg-gradient-to-b from-emerald-900/20 to-slate-950 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Eyebrow>Testimonials</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What our clients say about Fexa Agent.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-3 text-slate-400">Real businesses. Real results.</p>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative mt-8 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-400 sm:flex"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="relative h-56 flex-1 overflow-hidden sm:h-44">
              {FEATURED_TESTIMONIALS.map((t, i) => {
                const offset = i - index;
                return (
                  <div
                    key={t.name}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-6 transition-all duration-700 sm:px-10"
                    style={{
                      transform: `translateX(${offset * 30}px) scale(${offset === 0 ? 1 : 0.94})`,
                      opacity: offset === 0 ? 1 : 0,
                      pointerEvents: offset === 0 ? "auto" : "none",
                    }}
                  >
                    <span className="mb-2 text-3xl leading-none text-emerald-400">"</span>
                    <p className="text-sm text-slate-200 sm:text-base">{t.text}</p>
                    <div className="mt-3 text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                    <div className="mt-2 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => go(1)}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-400 sm:flex"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {FEATURED_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  clearInterval(timerRef.current);
                  setIndex(i);
                  timerRef.current = setInterval(() => setIndex((x) => (x + 1) % FEATURED_TESTIMONIALS.length), 4500);
                }}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === index ? 22 : 8, background: i === index ? "#34d399" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {SMALL_TESTIMONIALS.map((t, i) => (
            <Reveal delay={i * 100} key={t.name}>
              <div className="h-full rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
                  <t.icon size={14} />
                </span>
                <p className="mt-3 text-xs text-slate-300">"{t.text}"</p>
                <div className="mt-3 text-xs font-semibold text-white">{t.name}</div>
                <div className="text-[10px] text-slate-500">{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  FAQ                                                                      */
/* ----------------------------------------------------------------------- */
const FAQS = [
  {
    q: "How does Fexa Agent work?",
    a: "Fexa Agent uses advanced AI to understand customer inquiries, automate workflows and perform tasks like chatting, calling and recruitment — all from one powerful platform.",
  },
  { q: "Do I need technical knowledge to get started?", a: "No. Agents are configured through guided setup, not code — your team describes the workflow in plain language and we handle the rest." },
  { q: "Which platforms does it support?", a: "Fexa connects to chat, email, voice and SMS out of the box, plus your CRM, helpdesk and e-commerce platforms through native integrations." },
  { q: "Can I try Fexa Agent for free?", a: "Yes — you can start a free trial with no credit card required and explore every core feature before committing to a plan." },
  { q: "Is my data secure?", a: "All data is encrypted in transit and at rest, and agents only ever access what a workflow explicitly needs." },
];

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-3 text-slate-400">Everything you need to know about Fexa Agent.</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal delay={i * 60} key={f.q}>
                <div
                  className={
                    "overflow-hidden rounded-xl border transition-colors duration-300 " +
                    (isOpen ? "border-emerald-400/40 bg-emerald-500/[0.05]" : "border-white/10 bg-white/[0.02]")
                  }
                >
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-sm text-white">{f.q}</span>
                    <span
                      className={
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all duration-300 " +
                        (isOpen ? "bg-emerald-400 text-slate-950" : "bg-white/10 text-white")
                      }
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Final CTA                                                                */
/* ----------------------------------------------------------------------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(52,211,153,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          animation: "panGrid 18s linear infinite",
        }}
      />
      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-900/25 to-slate-900/40 px-6 py-12 sm:px-14">
            <Eyebrow>Ready to grow?</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let AI handle the repetitive work.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
              Save time, reduce costs and scale your business with Fexa Agent. Get started today and
              see the difference.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton>
                Book a Demo <ArrowRight size={16} />
              </PrimaryButton>
              <GhostButton>Start Free Trial</GhostButton>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Setup in minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Footer                                                                    */
/* ----------------------------------------------------------------------- */
const FOOTER_COLS = {
  Product: ["AI Chat", "AI Recruiter", "AI Voice", "AI Solutions", "Integrations"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Resources: ["Help Center", "Documentation", "Case Studies", "Pricing"],
};

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 pb-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400 text-slate-950">
              <Bot size={14} />
            </span>
            <span className="text-base font-bold text-white">Fexa Agent</span>
          </div>
          <p className="mt-3 max-w-[200px] text-xs leading-relaxed text-slate-500">
            AI agents for modern businesses. Automate. Engage. Grow.
          </p>
          <div className="mt-4 flex gap-3 text-slate-500">
            {[LinkedinIcon, FacebookIcon, TwitterIcon, YoutubeIcon].map((Icon, i) => (
              <a key={i} href="#" className="transition-colors hover:text-emerald-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_COLS).map(([col, links]) => (
          <div key={col}>
            <div className="mb-4 text-xs font-semibold text-white">{col}</div>
            <ul className="flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-slate-500 transition-colors hover:text-emerald-300">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-slate-600">
        © 2026 Fexa Agent. All rights reserved.
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------------- */
/*  App                                                                       */
/* ----------------------------------------------------------------------- */
export default function FexaAgentLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white antialiased">
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 260px 260px; }
        }
        @keyframes spinSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <Navbar />
      <Hero />
      <LogoStrip />
      <GlobeSection />
      <ActionSection />
      <ProblemSection />
      <ProductsSection />
      <GrowSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
