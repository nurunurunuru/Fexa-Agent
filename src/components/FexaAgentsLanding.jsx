import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Headset,
  UserPlus,
  TrendingUp,
  Settings,
  Mail,
  Target,
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
  MessageSquare,
  FileText,
  ChevronDown,
} from "lucide-react";

/* ----------------------------------------------------------------------- */
/*  Reveal-on-scroll wrapper                                               */
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.21,.9,.35,1) ${delay}ms, transform 0.7s cubic-bezier(.21,.9,.35,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/*  Count-up number, triggers once in view                                 */
/* ----------------------------------------------------------------------- */
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

  const display =
    Number.isInteger(target) && target < 100
      ? Math.round(val)
      : val.toFixed(1).replace(/\.0$/, "");

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/*  Static data                                                            */
/* ----------------------------------------------------------------------- */
const NAV_LINKS = ["Platform", "Solutions", "Features", "Pricing", "Learn"];

const STATS = [
  { value: 5, suffix: "x", label: "Faster", sub: "Analysis time" },
  { value: 24, suffix: "/7", label: "", sub: "Customer support" },
  { value: 10, suffix: "x", label: "", sub: "Advanced analytics" },
  { value: 99.9, suffix: "%", label: "", sub: "Reliable uptime" },
];

const PAIN_POINTS = [
  { icon: Headset, text: "Too many repetitive customer conversations" },
  { icon: TrendingUp, text: "Slow responses losing business opportunities" },
  { icon: Mail, text: "Manual recruitment communication taking hours" },
  { icon: Settings, text: "Repetitive operational work consuming team time" },
  { icon: UserPlus, text: "Employees spending time on low-value tasks" },
  { icon: Target, text: "Inconsistent follow-ups leading to missed revenue" },
];

const FLOW_STEPS = [
  { label: "Manual Work", color: "#f5b544" },
  { label: "Raw Responses", color: "#ef6f6f" },
  { label: "Workflow Bottleneck", color: "#c77dff" },
  { label: "Free AI Agents", color: "#34d399" },
  { label: "Automated Flow", color: "#2dd4bf" },
];

const SOLUTIONS = [
  {
    name: "Customer Communication",
    tagline: "Reply instantly. Resolve automatically.",
    steps: [
      "Customer sends a message",
      "Agent understands intent and context",
      "Agent generates an accurate response",
      "Conversation resolved or escalated",
    ],
    outcome: "Customers get faster responses. Your team handles only complex cases.",
  },
  {
    name: "Recruitment Automation",
    tagline: "Screen candidates while you sleep.",
    steps: [
      "Candidate submits application",
      "Agent reads CV and scores fit",
      "Agent schedules a first-round call",
      "Recruiter reviews the shortlist",
    ],
    outcome: "Faster shortlists. Recruiters spend their time on people, not paperwork.",
  },
  {
    name: "Operational Automation",
    tagline: "One trigger, many steps handled.",
    steps: [
      "Internal event or request comes in",
      "Agent maps it to the right workflow",
      "Agent executes each step in order",
      "Status logged and team notified",
    ],
    outcome: "Consistent execution. Less manual coordination across teams.",
  },
  {
    name: "Lead Qualification",
    tagline: "No warm lead waits in a queue.",
    steps: [
      "New lead fills a form or replies",
      "Agent asks qualifying questions",
      "Agent scores and tags the lead",
      "Hot leads routed to sales instantly",
    ],
    outcome: "Hot leads reach sales in minutes. Cold leads are nurtured automatically.",
  },
  {
    name: "Customer Support",
    tagline: "Tickets triaged the moment they land.",
    steps: [
      "Ticket arrives across any channel",
      "Agent classifies urgency and topic",
      "Agent resolves or drafts a reply",
      "Human reviews only edge cases",
    ],
    outcome: "Resolution time drops. Support handles more without hiring more.",
  },
  {
    name: "Workflow Automation",
    tagline: "Repetitive steps, zero repetition.",
    steps: [
      "A recurring task is defined once",
      "Agent watches for the trigger",
      "Agent completes the task end to end",
      "Exceptions surfaced for review",
    ],
    outcome: "Hours of manual work reclaimed every week, without new headcount.",
  },
];

const USE_CASES = [
  {
    icon: Headset,
    title: "Customer Support",
    problem: "Support teams overwhelmed with repetitive queries",
    action: "Agent reads and resolves tickets automatically",
    result: "Faster resolution. Team handles only complex cases.",
  },
  {
    icon: UserPlus,
    title: "Recruitment",
    problem: "Recruiters buried in CV screening and scheduling",
    action: "Agent screens, communicates and schedules candidates",
    result: "Faster shortlists. Recruiters focus on people.",
  },
  {
    icon: TrendingUp,
    title: "Sales",
    problem: "Sales team wastes time on research and admin",
    action: "Agent researches prospects and prepares outreach",
    result: "More selling time. Better qualified pipeline.",
  },
  {
    icon: Settings,
    title: "Operations",
    problem: "Manual processes slow down operational output",
    action: "Agent executes multi-step workflows across systems",
    result: "Consistent execution. Less manual coordination.",
  },
  {
    icon: Mail,
    title: "Follow-ups",
    problem: "Follow-up messages fall through the cracks",
    action: "Agent sends timely, personalized follow-ups",
    result: "No lead or customer left behind.",
  },
  {
    icon: Target,
    title: "Lead Qualification",
    problem: "Unqualified leads consuming sales team time",
    action: "Agent engages and qualifies leads immediately",
    result: "Hot leads reach sales. Cold leads nurtured automatically.",
  },
];

const TESTIMONIALS = [
  {
    name: "John Williams",
    role: "Lead designer",
    rating: 3,
    text: "Thank god — finally there is someone making it easy for me to use on my projects. Love it.",
  },
  {
    name: "Jane Copper",
    role: "Lead designer",
    rating: 4,
    text: "Everything is great! Thanks for making this so effortless.",
  },
  {
    name: "Emily",
    role: "Designer",
    rating: 4,
    text: "Thank god — finally there is someone making it easy for me to use on my projects. Love it.",
  },
];

const FAQS = [
  {
    q: "How fast can I get started with Fexa Agents?",
    a: "Most teams go live within seven days. We build a working agent around your first use case, connect it to your existing tools, and refine it with you before it ever talks to a real customer.",
  },
  {
    q: "Do I need any technical knowledge to set this up?",
    a: "No. Agents are configured through guided setup, not code. Your team describes the workflow in plain language and we handle the rest.",
  },
  {
    q: "Can the agent hand off to a human when needed?",
    a: "Yes. Every agent has escalation rules built in, so anything outside its confidence threshold is routed straight to your team with full context.",
  },
  {
    q: "Which channels and tools does it work with?",
    a: "Fexa connects to chat, email, voice and SMS out of the box, plus your CRM, helpdesk and ATS through native integrations.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest, and agents only ever access what a workflow explicitly needs.",
  },
];

const FOOTER_COLS = {
  Platform: ["Agent Builder", "Orchestration", "Memory & Learning", "Observability", "Integrations", "Pricing"],
  Solutions: [
    "Customer Communication",
    "Recruitment Automation",
    "Operational Automation",
    "Lead Qualification",
    "Customer Support",
    "All Solutions",
  ],
  Industries: ["E-commerce", "SaaS", "Retail", "Healthcare", "Financial Services", "Travel", "Professional Services"],
  Company: ["About", "Team", "Careers", "Press", "Contact", "Privacy", "Terms"],
};

const LOGO_STRIP = ["umbrella", "Madrid", "Sitemark", "SiteGPT", "cambridge", "orbit"];

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

/* ----------------------------------------------------------------------- */
/*  Navbar                                                                 */
/* ----------------------------------------------------------------------- */
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
            F
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Fexa Agents</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="group relative text-sm text-slate-300 transition-colors hover:text-white"
            >
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

      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{ maxHeight: open ? 320 : 0 }}
      >
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
/*  Hero                                                                   */
/* ----------------------------------------------------------------------- */
function DashboardMock() {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    "Thank you. Please enter the amount and date of the transaction (eg 100, December 31st).",
    "$50, November 30th",
    "Thanks — it looks like there might be a delay processing this. What would you like to do next?",
  ];

  useEffect(() => {
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % (messages.length + 1)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)]"
      style={{ animation: "floaty 7s ease-in-out infinite" }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <span className="ml-4 text-xs text-slate-400">app.fexaagents.com/inbox</span>
      </div>
      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[200px_1fr]">
        <div className="hidden flex-col gap-3 border-r border-white/10 bg-slate-950/60 p-4 text-xs text-slate-400 sm:flex">
          <span className="mb-1 font-semibold text-white">Inbox</span>
          <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-emerald-300">Assigned to me · 6</span>
          <span className="px-2 py-1">Unassigned</span>
          <span className="mt-4 mb-1 font-semibold text-white">Status</span>
          <span className="px-2 py-1">Order requests · 123</span>
          <span className="px-2 py-1">Unreplied · 54</span>
          <span className="px-2 py-1">Complaints · 22</span>
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-white">Sajal Akand</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
              AI Agent active
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-emerald-400 px-4 py-2 text-xs text-slate-950 transition-all duration-500"
              style={{ opacity: msgIndex >= 0 ? 1 : 0 }}
            >
              {messages[0]}
            </div>
            <div
              className="max-w-[70%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-2 text-xs text-slate-200 transition-all duration-500"
              style={{ opacity: msgIndex >= 1 ? 1 : 0 }}
            >
              {messages[1]}
            </div>
            <div
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-emerald-400 px-4 py-2 text-xs text-slate-950 transition-all duration-500"
              style={{ opacity: msgIndex >= 2 ? 1 : 0 }}
            >
              {messages[2]}
            </div>
            {msgIndex < 2 && (
              <div className="flex gap-1 pl-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: "300ms" }} />
              </div>
            )}
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
          <Eyebrow>The power of AI agents</Eyebrow>
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
            Fexa Agents helps businesses automate customer communication, recruitment and repetitive
            workflows with intelligent AI agents.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton>
              Book a Demo <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Explore Solutions</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Secure by design
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Live in under a week
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Human oversight built in
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} className="px-6">
        <DashboardMock />
      </Reveal>

      <Reveal delay={300}>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.sub}>
              <div className="text-3xl font-bold text-emerald-400 sm:text-4xl">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-wide text-slate-600">World's best 120+ companies work with us</p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 overflow-hidden px-6 text-slate-500">
            {LOGO_STRIP.map((name) => (
              <span key={name} className="text-sm font-medium opacity-60 transition-opacity hover:opacity-100">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </header>
  );
}

/* ----------------------------------------------------------------------- */
/*  Problem section                                                        */
/* ----------------------------------------------------------------------- */
function ProblemSection() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your team is buried in repetitive work.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Every day your team spends hours on tasks that could be handled automatically — creating
            bottlenecks that slow your entire business.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {PAIN_POINTS.map((p, i) => (
            <Reveal delay={i * 80} key={p.text}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.06]">
                <p.icon size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                <span className="text-sm text-slate-300">{p.text}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="relative mt-14 flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:flex-row sm:justify-between">
            {FLOW_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div
                  className="relative z-10 rounded-lg border px-4 py-3 text-center text-xs font-semibold"
                  style={{
                    borderColor: step.color + "55",
                    background: step.color + "14",
                    color: step.color,
                  }}
                >
                  {step.label}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <div className="relative hidden h-px w-10 flex-1 overflow-hidden bg-white/10 sm:block">
                    <span
                      className="absolute inset-y-0 left-0 w-4 bg-emerald-400/80"
                      style={{ animation: `flowDot 1.6s linear infinite`, animationDelay: `${i * 0.25}s` }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Solutions section (auto-rotating interactive panel)                    */
/* ----------------------------------------------------------------------- */
function SolutionsSection() {
  const [active, setActive] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setStepIndex(0);
    const id = setInterval(() => {
      setStepIndex((s) => (s + 1 < SOLUTIONS[active].steps.length + 1 ? s + 1 : 0));
    }, 1100);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % SOLUTIONS.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const pick = (i) => {
    clearInterval(timerRef.current);
    setActive(i);
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SOLUTIONS.length), 6000);
  };

  const sol = SOLUTIONS[active];

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>Solutions</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One platform, every workflow automated.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Fexa deploys purpose-built AI agents for your most important workflows — each one trained
            to understand your context and take real action.
          </p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 px-6 md:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-2">
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => pick(i)}
                className={
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 " +
                  (i === active
                    ? "border-emerald-400/50 bg-emerald-500/10 text-white"
                    : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white")
                }
              >
                <span>
                  <span className="mr-2 text-xs text-slate-500">0{i + 1}</span>
                  {s.name}
                </span>
                {i === active && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />}
              </button>
            ))}
          </div>

          <div
            key={active}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-left"
            style={{ animation: "fadeSlide 0.5s ease" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{sol.name} Agent</div>
                <div className="text-xs text-slate-500">{sol.tagline}</div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Running
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {sol.steps.map((step, i) => {
                const done = stepIndex > i;
                const current = stepIndex === i;
                return (
                  <div key={step} className="flex items-center gap-3 text-sm">
                    <span
                      className={
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all duration-300 " +
                        (done
                          ? "border-emerald-400 bg-emerald-400 text-slate-950"
                          : current
                          ? "border-emerald-400 text-emerald-400"
                          : "border-white/20 text-transparent")
                      }
                    >
                      {done ? <Check size={12} /> : current ? "•" : ""}
                    </span>
                    <span className={done || current ? "text-slate-200" : "text-slate-500"}>{step}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                Outcome
              </div>
              <div className="text-xs text-slate-300">{sol.outcome}</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  AI Chat / AI Recruiter feature blocks                                  */
/* ----------------------------------------------------------------------- */
function ChatMock() {
  const [step, setStep] = useState(0);
  const bubbles = ["Hi, I'm looking for a product for my team.", "..."];

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-72 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400 text-[10px] font-black text-slate-950">
          F
        </span>
        <span className="text-xs font-semibold text-slate-800">Fexa Agents</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-4">
        <div
          className="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-emerald-400 px-4 py-2 text-xs text-slate-950 transition-opacity duration-500"
          style={{ opacity: step >= 1 ? 1 : 0 }}
        >
          {bubbles[0]}
        </div>
        {step < 2 && (
          <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-400">
          Type a message
          <ArrowRight size={12} className="ml-auto text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

function CvMock() {
  const items = [
    "Reading CV...",
    "Experience detected",
    "Skills identified",
    "Education analyzed",
    "Job requirements matched",
    "Candidate score calculated",
  ];
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setVisible((v) => (v >= items.length ? 1 : v + 1)), 650);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-72 overflow-hidden rounded-2xl border border-white/10 bg-white p-5 shadow-2xl">
      <div className="mb-4 flex items-center gap-2">
        <FileText size={16} className="text-slate-600" />
        <div>
          <div className="text-xs font-semibold text-slate-800">Sarah Johnson — Product Designer</div>
          <div className="text-[10px] text-emerald-600">CV uploaded</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div
            key={it}
            className="flex items-center gap-2 text-xs text-slate-500 transition-all duration-300"
            style={{ opacity: i < visible ? 1 : 0.25 }}
          >
            {i < visible - 1 || visible > items.length - 1 ? (
              <Check size={13} className="text-emerald-500" />
            ) : i === visible - 1 ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
            ) : (
              <span className="h-3 w-3 rounded-full border border-slate-300" />
            )}
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureBlocks() {
  return (
    <section className="bg-slate-900/40 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>Feature</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI Chat, AI Recruiter, AI Voice
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Fexa deploys purpose-built AI agents for your most important workflows — each one trained
            to understand your context and take real action.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <Eyebrow>Fexa AI Chat</Eyebrow>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Your AI agent is <span className="text-emerald-400">always ready to chat.</span>
          </h3>
          <p className="mt-3 text-sm text-slate-400">
            Turn customer messages into meaningful conversations with an AI agent that understands
            context, answers questions and helps customers take the next step.
          </p>
          <div className="mt-5 flex gap-3">
            <PrimaryButton className="!px-5 !py-2.5 text-xs">
              Try AI Chat <ArrowRight size={14} />
            </PrimaryButton>
            <GhostButton className="!px-5 !py-2.5 text-xs">Book a Demo</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={150} className="order-1 md:order-2">
          <ChatMock />
        </Reveal>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <Reveal>
          <CvMock />
        </Reveal>
        <Reveal delay={150}>
          <Eyebrow>Fexa AI Recruiter</Eyebrow>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Turn CVs into completed <span className="text-emerald-400">recruitment workflows.</span>
          </h3>
          <p className="mt-3 text-sm text-slate-400">
            Fexa AI Recruiter reads candidate information, understands qualifications and automatically
            moves suitable candidates through the recruitment process.
          </p>
          <div className="mt-5 flex gap-3">
            <PrimaryButton className="!px-5 !py-2.5 text-xs">
              Try AI Recruiter <ArrowRight size={14} />
            </PrimaryButton>
            <GhostButton className="!px-5 !py-2.5 text-xs">Book a Demo</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  AI Voice                                                                */
/* ----------------------------------------------------------------------- */
function VoiceSection() {
  const bars = Array.from({ length: 20 });
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <Eyebrow>Fexa AI Voice</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI that talks to <span className="text-emerald-400">your customers.</span>
          </h2>
          <p className="mt-4 text-sm text-slate-400">
            Let Fexa AI Voice handle customer conversations naturally, answer questions, qualify
            requests and take action — without making your customers wait.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton>
              Try AI Voice <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Book a Demo</GhostButton>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> No code setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Live in 7 days
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Human escalation built in
            </span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-8">
            <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                AI Agent active
              </span>
            </div>

            <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-emerald-400/40" style={{ animation: "ringPulse 2.2s ease-out infinite" }} />
              <span className="absolute inset-0 rounded-full border border-emerald-400/30" style={{ animation: "ringPulse 2.2s ease-out infinite 0.7s" }} />
              <span className="absolute inset-0 rounded-full border border-emerald-400/20" style={{ animation: "ringPulse 2.2s ease-out infinite 1.4s" }} />
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.6)]">
                <Mic size={28} className="text-slate-950" />
              </div>
            </div>

            <div className="mt-6 flex items-end justify-center gap-[3px]">
              {bars.map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-emerald-400/70"
                  style={{
                    height: 6 + (i % 5) * 4,
                    animation: `wave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-slate-950/70 px-4 py-3 text-center text-xs text-slate-400">
              "Hi, I'd like to know if my order has shipped."
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Use cases grid                                                          */
/* ----------------------------------------------------------------------- */
function UseCasesSection() {
  return (
    <section className="bg-slate-900/40 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Eyebrow>Use cases</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI agents for every team.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Real workflows, real outcomes. Fexa agents work across every function in your business.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal delay={i * 80} key={u.title}>
              <div className="group h-full rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_20px_60px_-25px_rgba(52,211,153,0.4)]">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 transition-transform duration-300 group-hover:rotate-6">
                  <u.icon size={18} />
                </div>
                <div className="mb-3 text-sm font-semibold text-white">{u.title}</div>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-500">
                    <span className="text-slate-600">Problem — </span>
                    {u.problem}
                  </p>
                  <p className="text-slate-500">
                    <span className="text-slate-600">Agent action — </span>
                    {u.action}
                  </p>
                  <p className="text-emerald-300/90">{u.result}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Testimonials carousel                                                   */
/* ----------------------------------------------------------------------- */
function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 4200);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 4200);
  };

  return (
    <section className="bg-gradient-to-b from-emerald-900/30 to-slate-950 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What our clients say about us
            </h2>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => go(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-400"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-emerald-400"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="relative h-64 overflow-hidden sm:h-52">
          {TESTIMONIALS.map((t, i) => {
            const offset = i - index;
            return (
              <div
                key={t.name}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-800/40 to-emerald-950/40 px-8 py-8 transition-all duration-700"
                style={{
                  transform: `translateX(${offset * 30}px) scale(${offset === 0 ? 1 : 0.92})`,
                  opacity: offset === 0 ? 1 : 0,
                  pointerEvents: offset === 0 ? "auto" : "none",
                }}
              >
                <p className="text-sm text-slate-200 sm:text-base">"{t.text}"</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s < t.rating ? "fill-emerald-400 text-emerald-400" : "text-slate-600"}
                    />
                  ))}
                </div>
                <div className="mt-4 text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(timerRef.current);
                setIndex(i);
                timerRef.current = setInterval(() => setIndex((x) => (x + 1) % TESTIMONIALS.length), 4200);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? 22 : 8, background: i === index ? "#34d399" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  FAQ                                                                     */
/* ----------------------------------------------------------------------- */
function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently asked <span className="text-emerald-400">questions</span>
          </h2>
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
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3 text-sm text-white">
                      <span className="text-xs text-slate-500">0{i + 1}</span>
                      {f.q}
                    </span>
                    <span
                      className={
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all duration-300 " +
                        (isOpen ? "bg-emerald-400 text-slate-950" : "bg-white/10 text-white")
                      }
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
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
/*  Final CTA                                                               */
/* ----------------------------------------------------------------------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(52,211,153,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          animation: "panGrid 18s linear infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[110px]"
        style={{ animation: "pulseGlow 5s ease-in-out infinite" }}
      />
      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <Eyebrow>Ready to start</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Let AI handle the <span className="text-emerald-400">repetitive work.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-5 max-w-lg text-sm text-slate-400 sm:text-base">
            See exactly how Fexa AI agents would work in your business — in a live 30-minute
            demonstration built around your actual workflows.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton>
              Book a Demo <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Talk to an Expert</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <p className="mt-5 text-xs text-slate-600">
            No commitment required · We build a working agent around your use case, live on the call
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/*  Footer                                                                  */
/* ----------------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 pb-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400 text-xs font-black text-slate-950">
              F
            </span>
            <span className="text-base font-bold text-white">Fexa Agents</span>
          </div>
          <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-slate-500">
            AI agents that handle customer communication, recruitment and operations — so your team
            focuses on growth.
          </p>
          <PrimaryButton className="mt-5 !px-5 !py-2.5 text-xs">Book a Demo</PrimaryButton>
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

      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-slate-600 sm:flex-row">
          <span>© 2026 Fexa Agents Ltd. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-emerald-300">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-300">Terms of Service</a>
            <a href="#" className="hover:text-emerald-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------------- */
/*  App                                                                     */
/* ----------------------------------------------------------------------- */
export default function FexaAgentsLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white antialiased">
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
        }
        @keyframes flowDot {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(280%); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes panGrid {
          0% { background-position: 0 0; }
          100% { background-position: 260px 260px; }
        }
      `}</style>

      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionsSection />
      <FeatureBlocks />
      <VoiceSection />
      <UseCasesSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </div>
  );
}
