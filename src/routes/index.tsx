import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Flame,
  Users,
  Church,
  MapPin,
  Sparkles,
  Zap,
  HandHeart,
  PartyPopper,
  BookOpen,
  Music,
  Compass,
  Palette,
  Brain,
  Network,
  Globe2,
  GraduationCap,
  ArrowRight,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  ChevronDown,
  Menu,
  X,
  Play,
  Linkedin,
} from "lucide-react";
import heroWorship from "@/assets/hero-worship.jpg";
import youthWorship from "@/assets/youth-worship.jpg";
import delhiSkyline from "@/assets/delhi-skyline.jpg";
import stageLights from "@/assets/stage-lights.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLID Conference 2026 — IGNITE | Delhi Yuva Movement" },
      {
        name: "description",
        content:
          "IGNITE 2026 — the flagship youth gathering of Delhi Yuva Movement. 1,000+ young leaders, 200+ churches, one Kingdom vision for Delhi NCR.",
      },
      { property: "og:title", content: "SOLID Conference 2026 — IGNITE" },
      {
        property: "og:description",
        content:
          "A movement of young leaders for the flourishing of Delhi NCR. Join 1,000+ young people at IGNITE 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SOLID Conference 2026 — IGNITE" },
      {
        name: "twitter:description",
        content: "A movement of young leaders for the flourishing of Delhi NCR.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

// ---------- Hooks ----------
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(target, 2000, inView);
  return (
    <div ref={ref} className="font-display text-5xl font-bold sm:text-6xl md:text-7xl text-primary">
      {value.toLocaleString()}
      {suffix}
    </div>
  );
}

// ---------- Nav ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"],
    ["Vision", "#vision"],
    ["Journey", "#journey"],
    ["2026", "#ignite"],
    ["Team", "#team"],
    ["Partners", "#partners"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary glow">
            <Flame className="h-5 w-5 text-background" strokeWidth={2.5} />
          </div>
          <span
            className={`font-display text-lg font-bold tracking-tight ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            SOLID CONFERENCE
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              // className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105 md:inline-block"
          >
            Register
          </a>
          <button
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-lg glass md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="glass border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
              >
                {l}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-ignite px-5 py-3 text-center text-sm font-semibold text-background"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <img
        src={heroWorship}
        alt="Youth worshipping together at SOLID Conference"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        width={1920}
        height={1200}
      />
      <div className="absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[80vw] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full bg-secondary/20 blur-3xl animate-float-slow" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-20 text-center">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            SOLID Conference · Delhi NCR 2026
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(2rem,9vw,7rem)] font-bold leading-[0.85] tracking-tighter">
            <span className="text-primary drop-shadow-[0_0_60px_rgba(255,106,0,0.4)]">
              Reel to Real
            </span>
            <span className="block text-2xl font-medium tracking-widest text-muted-foreground sm:text-3xl mt-4">
              2026
            </span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-3xl text-xl font-medium text-white sm:text-2xl">
            A Movement of Young Leaders for the Flourishing of Delhi NCR
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            SOLID is the flagship youth gathering of Delhi Yuva Movement, bringing young people from
            churches across Delhi NCR to encounter Christ, discover their God-given purpose, and
            become leaders who influence churches, campuses, workplaces, and communities.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-105 glow"
            >
              Register Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => setVideoOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full glass px-8 py-4 text-base font-semibold transition-colors  hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" strokeWidth={0} />
              Watch Trailer
            </button>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: "1,000+", l: "Young Leaders" },
              { n: "200+", l: "Churches" },
              { n: "Delhi NCR", l: "Regions" },
              { n: "One", l: "Kingdom Vision" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 sm:p-6">
                <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
                  {s.n}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-black sm:text-sm font-bold">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-float-slow">
        <ChevronDown className="h-6 w-6" />
      </div>

      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setVideoOpen(false)}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/85 p-4 backdrop-blur-md animate-fade-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl glass glow"
          >
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground transition-transform hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              {/* <iframe
                src="https://www.youtube.com/watch?v=_0uaqEVIAiI"
                title="SOLID Conference Trailer"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              /> */}
              <iframe
                src="https://www.youtube.com/embed/_0uaqEVIAiI"
                title="Solid Conference 2024 DBF | CBN India News"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            About SOLID
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl text-brand-navy">
            More Than <span className="text-primary">A Conference</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              SOLID is a growing movement that gathers young people from churches across Delhi NCR
              to encounter Christ, discover their God-given purpose, and be equipped to influence
              their churches, campuses, workplaces, and communities.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="glass rounded-3xl border-l-4 border-primary p-8">
              <p className="text-lg italic leading-relaxed">
                "Our desire is simple: to see a Yuva Movement everywhere where young people are
                transformed by the Gospel and become a blessing to the city."
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- Vision ----------
function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-32">
      <img
        src={delhiSkyline}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        width={1920}
        height={900}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Our Vision
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Gathering Delhi NCR youth to <span className="text-primary">Christ</span> for creating{" "}
            <span className="text-primary">life-transferring community</span> that blesses the city.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Movement ----------
const movement = [
  { icon: Zap, title: "Catalyze", desc: "Empowering young leaders for Kingdom impact." },
  {
    icon: Sparkles,
    title: "Create",
    desc: "Building new opportunities for discipleship and innovation.",
  },
  {
    icon: HandHeart,
    title: "Collaborate",
    desc: "Uniting churches and ministries across Delhi NCR.",
  },
  {
    icon: PartyPopper,
    title: "Celebrate",
    desc: "Worshiping God together while celebrating transformed lives.",
  },
];

function Movement() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Our Movement
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Four rhythms of a <span className="text-primary">Yuva Movement</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {movement.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:glow">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-ignite text-background">
                    <m.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Why SOLID ----------
function WhySolid() {
  const challenges = [
    "Identity",
    "Purpose",
    "Belonging",
    "Career Pressure",
    "Relationships",
    "Technology",
    "Mental Health",
    "Cultural Challenges",
  ];
  return (
    <section className="py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={youthWorship}
              alt="Young people in worship"
              className="h-[500px] w-full object-cover"
              width={1200}
              height={1400}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Why SOLID?
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
              A generation facing <span className="text-primary">unprecedented</span> pressure.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Today's young people are navigating storms their parents never imagined:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {challenges.map((c) => (
                <span key={c} className="rounded-full glass px-4 py-2 text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-8 border-l-4 border-primary pl-6 text-xl font-medium italic">
              "We believe young people are not just the future of the Church—they are God's
              ambassadors today."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Journey ----------
const journey = [
  {
    year: "2023",
    theme: "Head • Heart • Hand in Christ",
    desc: "The first SOLID Conference laid the foundation for holistic discipleship.",
    points: [
      "Know Christ deeply",
      "Experience inward transformation",
      "Live out faith through practical obedience",
    ],
    stats: [
      { n: "250+", l: "Young People" },
      { n: "45+", l: "Churches" },
    ],
  },
  {
    year: "2024",
    theme: "Build His Kingdom",
    desc: "Young leaders were invited into God's mission across every sphere of life.",
    points: ["Church", "Campus", "Workplace", "Family", "Society"],
    stats: [
      { n: "450+", l: "Young People" },
      { n: "80+", l: "Churches" },
    ],
  },
  {
    year: "2025",
    theme: "Resilience",
    verse: "Colossians 2:7",
    desc: "Young people were encouraged to remain rooted in Christ, grounded in biblical truth, and faithful in their calling.",
    points: [
      "Many surrendered or recommitted their lives to Christ",
      "Citywide unity, worship, leadership, creativity",
      "Kingdom collaboration across Delhi NCR",
    ],
    stats: [
      { n: "800+", l: "Young People" },
      { n: "150+", l: "Churches" },
    ],
  },
];

function Journey() {
  return (
    <section id="journey" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Our Journey
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
            Three years of <span className="text-primary">Kingdom growth</span>
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
          <div className="space-y-16">
            {journey.map((y, i) => (
              <Reveal key={y.year} delay={i * 100}>
                <div
                  className={`relative grid gap-8 md:grid-cols-2 md:gap-16 ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className="absolute left-4 top-4 -translate-x-1/2 md:left-1/2">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-ignite glow">
                      <div className="h-2 w-2 rounded-full bg-background" />
                    </div>
                  </div>
                  <div className="pl-14 md:pl-0 md:text-right">
                    <div className="font-display text-6xl font-bold text-primary sm:text-7xl">
                      {y.year}
                    </div>
                    <div className="mt-2 font-display text-2xl font-semibold text-brand-navy">
                      {y.theme}
                    </div>
                    {y.verse && (
                      <div className="mt-1 text-sm font-medium uppercase tracking-widest text-accent">
                        {y.verse}
                      </div>
                    )}
                  </div>
                  <div className="pl-14 md:pl-0">
                    <div className="glass rounded-3xl p-6 md:p-8">
                      <p className="text-black">{y.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {y.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm">
                            <Flame className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex gap-6 border-t border-border pt-6">
                        {y.stats.map((s) => (
                          <div key={s.l}>
                            <div className="font-display text-3xl font-bold text-primary">
                              {s.n}
                            </div>
                            <div className="text-xs uppercase tracking-wider text-muted-foreground">
                              {s.l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Ignite 2026 ----------
function Ignite2026() {
  const roles = ["Disciple Makers", "Servant Leaders", "City Influencers", "Kingdom Builders"];
  return (
    <section id="ignite" className="relative overflow-hidden py-32">
      <img
        src={stageLights}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        width={1600}
        height={1000}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/10 to-brand-navy" />
      {/* <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" /> */}

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">SOLID 2026</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,10vw,9rem)] font-bold leading-[0.85] tracking-tighter text-gradient-ignite drop-shadow-[0_0_80px_rgba(255,106,0,0.5)]">
            Reel to Real
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-3xl text-xl font-medium sm:text-2xl">
            From filters to Faith
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            And be not conformed to this world: but be ye transformed by the renewing of your mind,
            that ye may prove what is that good, and acceptable, and perfect, will of God - Romans
            12:2
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => (
              <div
                key={r}
                className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:glow"
              >
                <Flame className="mx-auto h-8 w-8 text-primary" />
                <div className="mt-3 font-display text-lg font-semibold">{r}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-24">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Vision for 2026
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass rounded-3xl p-6">
                <Counter target={1000} suffix="+" />
                <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                  Young Leaders
                </div>
              </div>
              <div className="glass rounded-3xl p-6">
                <Counter target={200} suffix="+" />
                <div className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">
                  Churches
                </div>
              </div>
              <div className="glass rounded-3xl p-6 text-left">
                <div className="font-display text-2xl font-bold text-primary">
                  Greater Collaboration
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Across Delhi NCR</div>
              </div>
              <div className="glass rounded-3xl p-6 text-left">
                <div className="font-display text-2xl font-bold text-primary">IMPACT 3E</div>
                <div className="mt-2 text-sm text-muted-foreground">Apprenticeship Program</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Features ----------
const features = [
  { icon: BookOpen, t: "Christ-centered Biblical Teaching" },
  { icon: Music, t: "Worship & Prayer" },
  { icon: Compass, t: "Leadership Development" },
  { icon: Palette, t: "Creative Arts & Culture" },
  { icon: Brain, t: "Mental Health Conversations" },
  { icon: Network, t: "Networking Across Churches" },
  { icon: Globe2, t: "Regional Engagement" },
  { icon: GraduationCap, t: "IMPACT 3E Apprenticeship" },
];

function Features() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            What Makes SOLID Different
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Built for the <span className="text-primary">whole disciple</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:glow">
                <f.icon className="h-8 w-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                <div className="mt-6 font-display text-lg font-semibold leading-tight">{f.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Impact ----------
function Impact() {
  const stats = [
    { n: 800, s: "+", l: "Young People in 2025" },
    { n: 150, s: "+", l: "Churches" },
    { n: 3, s: "", l: "Years of Growth" },
    { n: 1, s: "", l: "Movement" },
  ];
  return (
    <section id="impact" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Our Impact
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-4 max-w-4xl text-center font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            The <span className="text-primary">numbers</span> tell a Kingdom story
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div className="glass rounded-3xl p-8 text-center transition-transform hover:-translate-y-1 hover:glow">
                <Counter target={s.n} suffix={s.s} />
                <div className="mt-4 text-sm uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Prayer ----------
function Prayer() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl animate-pulse-glow" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Our Prayer
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 text-2xl leading-relaxed sm:text-3xl">
            To see every district of Delhi NCR filled with Christ-centered young leaders who love
            Jesus, serve the Church, bless their communities, and seek the welfare of the city.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-14 font-display text-4xl font-bold leading-tight text-primary sm:text-6xl">
            One City. One Generation. <br />
            One Kingdom Vision.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const faqs = [
  {
    q: "When and where is SOLID 2026?",
    a: "SOLID 2026 will gather young leaders across Delhi NCR. Register to receive dates, venue details, and travel information.",
  },
  {
    q: "Who is SOLID for?",
    a: "SOLID is for young adults ages 16–35, church leaders, volunteers, and partner churches across Delhi NCR who want to encounter Christ and grow as Kingdom leaders.",
  },
  {
    q: "How can my church partner with SOLID?",
    a: "We collaborate with churches across Delhi NCR. Reach out via the Partner With Us form and our team will connect with your leadership.",
  },
  {
    q: "What is the IMPACT 3E Apprenticeship Program?",
    a: "IMPACT 3E is our year-long apprenticeship connecting emerging young leaders with mentors, ministry practice, and Kingdom-focused development.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Frequently Asked
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-center font-display text-5xl font-bold sm:text-6xl">
            Got <span className="text-gradient-ignite">questions?</span>
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full overflow-hidden rounded-2xl glass text-left transition-all"
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA() {
  return (
    <section id="register" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-ignite opacity-20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] glass p-12 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-ignite opacity-10" />
          <div className="relative">
            <Reveal>
              <Flame className="mx-auto h-12 w-12 text-primary animate-pulse-glow" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-7xl">
                Join The <span className="text-primary">Movement</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Be part of a generation setting Delhi NCR on fire for the Gospel. Register, partner,
                volunteer, or reach out — there's a place for you.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-background transition-transform hover:scale-105 glow"
                >
                  Register <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold hover:bg-white/10"
                >
                  Partner With Us
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold hover:bg-white/10"
                >
                  Volunteer
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact / Newsletter ----------
function Contact() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Stay Connected
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
              Get updates from the <span className="text-primary">movement</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sign up to receive stories, event details, and prayer requests from SOLID and Delhi
              Yuva Movement.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-border bg-background/50 px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                {sent ? "Thank you!" : "Subscribe"}
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              We'll only send you meaningful updates. No spam.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const cols = [
    { title: "Movement", links: ["About", "Vision", "Journey", "Impact"] },
    { title: "Conference", links: ["IGNITE 2026", "Register", "Partner Churches", "Volunteer"] },
    { title: "Connect", links: ["Contact", "Prayer Requests", "IMPACT 3E", "Newsletter"] },
  ];
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary glow">
                <Flame className="h-5 w-5 text-background" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold">SOLID CONFERENCE</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The flagship youth gathering of Delhi Yuva Movement — a collaborative initiative under
              The Delhi Movement.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Youtube, Facebook, Mail].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:scale-110 hover:glow"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-display text-sm font-bold uppercase tracking-widest">
                {c.title}
              </div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} SOLID Conference · Delhi Yuva Movement</div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Delhi NCR, India
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- Team ----------
const team = [
  {
    name: "Pastor Rajesh Kumar",
    role: "Movement Director",
    bio: "Leading Delhi Yuva Movement with 20+ years of youth ministry across North India.",
    initials: "RK",
  },
  {
    name: "Priya Thomas",
    role: "Conference Lead",
    bio: "Champions the SOLID vision and orchestrates city-wide gatherings.",
    initials: "PT",
  },
  {
    name: "Arjun Mathew",
    role: "IMPACT 3E Lead",
    bio: "Mentors emerging leaders through the year-long apprenticeship program.",
    initials: "AM",
  },
  {
    name: "Neha Singh",
    role: "Worship & Creative Arts",
    bio: "Curates worship experiences and creative arts culture at SOLID.",
    initials: "NS",
  },
  {
    name: "Daniel Verma",
    role: "Campus Engagement",
    bio: "Connects SOLID with universities and student communities across NCR.",
    initials: "DV",
  },
  {
    name: "Rebecca George",
    role: "Church Partnerships",
    bio: "Builds bridges with 200+ partner churches across Delhi NCR.",
    initials: "RG",
  },
];

function Team() {
  return (
    <section id="team" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            The Team
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-4 max-w-4xl text-center font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            People behind the <span className="text-primary">movement</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
            A collaborative team of pastors, leaders, and volunteers serving young people across
            Delhi NCR.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <div className="group h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:glow">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg font-bold text-primary-foreground glow">
                    {m.initials}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold leading-tight">{m.name}</div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-widest text-accent">
                      {m.role}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                <div className="mt-6 flex gap-2">
                  <a
                    href="#"
                    aria-label={`${m.name} on LinkedIn`}
                    className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110 hover:glow"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    aria-label={`${m.name} on Instagram`}
                    className="grid h-9 w-9 place-items-center rounded-full glass transition-transform hover:scale-110 hover:glow"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Partners / Collaborators ----------
const partners = [
  "The Delhi Movement",
  "Delhi Yuva",
  "IMPACT 3E",
  "City Harvest",
  "New Delhi Bible Fellowship",
  "Grace Community",
  "Living Hope Church",
  "Kingdom Culture",
  "Youth Alive NCR",
  "Ekklesia Delhi",
  "Solid Rock Ministries",
  "Genesis Network",
];

function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Kingdom Collaboration
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-4 max-w-4xl text-center font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            Partnering with churches & <span className="text-primary">ministries</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
            SOLID is a collaborative movement. We work alongside 200+ churches, ministries, and
            Kingdom partners across Delhi NCR.
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p, i) => (
            <Reveal key={p} delay={i * 40}>
              <div className="group flex h-24 items-center justify-center overflow-hidden rounded-2xl glass px-4 text-center transition-all duration-500 hover:-translate-y-1 hover:glow">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <Flame className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="font-display text-sm font-semibold leading-tight text-foreground/90">
                    {p}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-14 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Become a Partner <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Page ----------
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Vision />
        <Movement />
        <WhySolid />
        <Journey />
        <Ignite2026 />
        <Features />
        <Impact />
        <Prayer />
        <Team />
        <Partners />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
