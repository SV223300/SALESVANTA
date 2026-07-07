import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  Target,
  Eye,
  Users,
  Workflow,
  Database,
  Megaphone,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Zap,
  CalendarCheck,
  Star,
  Handshake,
  Award,
  Lightbulb,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { Logo, LogoMark } from './components/ui/Logo';

/* ============================================================ DATA */

const stats = [
  { value: 500, suffix: '+', label: 'Clients Served' },
  { value: 20, suffix: 'K+', label: 'Leads Generated' },
  { value: 98, suffix: '%', label: 'Satisfaction' },
  { value: 300, suffix: '%', label: 'Average ROI' },
];

const services = [
  {
    icon: Users,
    title: 'Lead Generation',
    description: 'Human-led prospecting that fills your pipeline with sales-ready, high-intent buyers — not cold lists.',
  },
  {
    icon: Database,
    title: 'CRM Setup',
    description: 'HubSpot, Salesforce, and Pipedrive implementations structured for clean data and clear reporting.',
  },
  {
    icon: Workflow,
    title: 'Sales Automation',
    description: 'Smart workflows that remove manual follow-up so your reps spend time closing, not chasing.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Full-funnel campaigns across email, ads, and web that nurture leads into real revenue.',
  },
  {
    icon: MessageSquare,
    title: 'Conversion Optimization',
    description: 'Landing pages, copy, and funnels refined by senior strategists to turn traffic into pipeline.',
  },
  {
    icon: Target,
    title: 'Growth Strategy',
    description: 'Positioning, messaging, and channel plans built by operators who have scaled real companies.',
  },
];

const process = [
  { icon: Target, title: 'Discover', description: 'We audit your funnel, market, and data to find the fastest path to pipeline.' },
  { icon: Lightbulb, title: 'Strategy', description: 'A multi-channel growth plan with messaging, channels, and KPIs defined.' },
  { icon: Zap, title: 'Launch', description: 'Campaigns, CRM, and workflows go live within two weeks — not months.' },
  { icon: TrendingUp, title: 'Optimize', description: 'Weekly sprints test, refine, and double down on what actually converts.' },
];

const team = [
  {
    name: 'Faisal Ali',
    role: 'Founder & CEO',
    phone: '0312-2818181',
    phoneHref: 'tel:+923122818181',
    email: 'info@salesvanta.gmail.com',
    bio: 'A growth operator with years of experience scaling B2B revenue. Faisal founded Salesvanta to bring senior, human-led strategy to businesses tired of generic agencies.',
    gradient: 'from-brand-600 to-accent-500',
  },
  {
    name: 'Strategy Team',
    role: 'Senior Growth Strategists',
    phone: '0312-2818181',
    phoneHref: 'tel:+923122818181',
    email: 'info@salesvanta.gmail.com',
    bio: 'Veterans who have built and scaled sales engines for SaaS, agencies, and service businesses. You work with them directly — never juniors.',
    gradient: 'from-accent-500 to-brand-600',
  },
  {
    name: 'Execution Team',
    role: 'Campaign & CRM Specialists',
    phone: '0312-2818181',
    phoneHref: 'tel:+923122818181',
    email: 'info@salesvanta.gmail.com',
    bio: 'The hands-on specialists who build your sequences, set up your CRM, and run your campaigns with precision and care.',
    gradient: 'from-brand-500 to-accent-400',
  },
];

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '0312-2818181', href: 'tel:+923122818181' },
  { icon: Mail, label: 'Email', value: 'info@salesvanta.gmail.com', href: 'mailto:info@salesvanta.gmail.com' },
  { icon: MapPin, label: 'Address', value: 'R1, Salam Square, Jaffer Bagh, Model Colony, Karachi' },
];

/* ============================================================ HELPERS */

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let frame: number;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ============================================================ SCROLL PROGRESS */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600"
      style={{ scaleX }}
    />
  );
}

/* ============================================================ HEADER */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-black/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between container-px sm:h-18">
        <Logo />
        <a href="#contact" className="btn-primary h-10 text-sm sm:h-11">
          Book Free Strategy Call
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ============================================================ HERO */

function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-50, 50], [8, -8]);
  const rotateY = useTransform(mx, [-50, 50], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-brand-600/12 blur-[160px] animate-pulse-glow" />
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-accent-500/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-brand-600/8 blur-[130px] animate-pulse-glow" />
      </div>

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">
            <span className="flex h-1.5 w-1.5 rounded-full bg-accent-400 shadow-glow-accent" />
            Scale Faster. Sell Smarter.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[4.25rem] text-shadow-glow"
        >
          Grow Your Business with{' '}
          <span className="text-gradient">Expert-Led Sales</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-400 sm:text-xl"
        >
          Salesvanta helps businesses generate more leads and close more deals through proven
          sales systems crafted by senior strategists — not software, not guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#contact" className="btn-primary h-12 w-full text-base sm:w-auto">
            Book Free Strategy Call
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#services" className="btn-ghost h-12 w-full text-base sm:w-auto">
            Explore Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouse}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <DashboardMock />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-600/20 via-accent-500/10 to-transparent blur-3xl" />

      <div className="card-luxury overflow-hidden p-5 shadow-glow-lg sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-ink-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-glow-accent" />
            Live pipeline
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-ink-500">Revenue this quarter</p>
            <p className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">$1.84M</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            +38.2%
          </div>
        </div>

        <div className="mt-5 h-32 rounded-xl border border-white/[0.04] bg-black/30 p-3 sm:h-36">
          <div className="flex h-full items-end justify-between gap-1.5">
            {[38, 52, 44, 68, 58, 82, 74, 96, 70, 88, 64, 92].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-accent-400"
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: 'Leads', value: '2,418' },
            { icon: CalendarCheck, label: 'Meetings', value: '318' },
            { icon: Target, label: 'Win rate', value: '34%' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
              <div className="flex items-center gap-1.5 text-ink-500">
                <s.icon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-medium">{s.label}</span>
              </div>
              <p className="mt-1 font-display text-base font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-3 -top-5 hidden rounded-xl border border-white/10 bg-ink-950/90 p-3 shadow-glow backdrop-blur-xl sm:block"
        style={{ transform: 'translateZ(50px)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 text-white">
            <Handshake className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-semibold text-white">Senior Strategy</span>
        </div>
        <p className="mt-1.5 text-[10px] leading-relaxed text-ink-400">Real operators, real results</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-5 -left-3 hidden items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/90 px-3 py-1.5 text-xs font-semibold text-white shadow-glow backdrop-blur-xl sm:flex"
        style={{ transform: 'translateZ(30px)' }}
      >
        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
        300% avg ROI
      </motion.div>
    </div>
  );
}

/* ============================================================ STATS */

function StatsSection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl container-px">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col items-center justify-center bg-black/40 px-6 py-10 text-center"
    >
      <span ref={ref} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {count}
        <span className="text-gradient">{suffix}</span>
      </span>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-ink-500 sm:text-sm">
        {label}
      </p>
    </motion.div>
  );
}

/* ============================================================ ABOUT */

function AboutSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl container-px">
        <SectionHeading
          eyebrow="About Us"
          title={<>Built to make growth <span className="text-gradient">predictable</span></>}
          description="Salesvanta exists to replace guesswork with craft — senior strategists building proven sales systems that turn effort into qualified pipeline and real revenue."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="card-luxury group p-8 transition-colors hover:border-brand-600/20"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400 transition-colors group-hover:bg-brand-600/25">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">Our Mission</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-400">
              To make predictable growth accessible to every ambitious business by building proven
              sales systems that turn effort into qualified pipeline and real revenue — not vanity
              metrics, not empty promises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="card-luxury group p-8 transition-colors hover:border-accent-500/20"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400 transition-colors group-hover:bg-accent-500/25">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">Our Vision</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-400">
              A world where every sales team has a growth engine built by people who have done it
              before — where pipeline is a system, not a gamble, and founders can forecast revenue
              with confidence instead of hope.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CEO / LEADERSHIP */

function CEOSection() {
  return (
    <section id="leadership" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-dots mask-fade-b opacity-30" />
      <div className="mx-auto max-w-6xl container-px">
        <SectionHeading
          eyebrow="Leadership"
          title={<>Meet the <span className="text-gradient">founder</span></>}
          description="Salesvanta is led by an operator who has been in your seat — building, scaling, and solving the same growth problems you face today."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <div className="card-luxury overflow-hidden p-8 shadow-glow-lg sm:p-10">
            <div className="grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
              {/* Avatar */}
              <div className="mx-auto w-fit">
                <div className="relative h-32 w-32">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-brand-600/20 to-accent-500/20 blur-xl" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-brand-600 to-accent-500 shadow-glow">
                    <span className="font-display text-4xl font-bold text-white">FA</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-brand-600 to-accent-500">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-bold text-white">Faisal Ali</h3>
                  <span className="rounded-full border border-brand-600/30 bg-brand-600/10 px-3 py-0.5 text-xs font-semibold text-brand-400">
                    Founder & CEO
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink-400">
                  Faisal built Salesvanta after years of leading growth for B2B companies and
                  seeing the same problem repeat — businesses stuck with agencies that delivered
                  reports instead of pipeline. He founded Salesvanta to do it differently: senior
                  strategy, honest reporting, and systems engineered for real revenue.
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-400">
                  Under his leadership, Salesvanta has helped over 500 businesses generate more
                  than 20,000 qualified leads and build sales engines that run without constant
                  oversight. His philosophy is simple: treat every client's pipeline as if it were
                  his own.
                </p>

                {/* Quick contact */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="tel:+923122818181"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:border-brand-600/30 hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-brand-400" />
                    0312-2818181
                  </a>
                  <a
                    href="mailto:info@salesvanta.gmail.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-ink-200 transition-colors hover:border-accent-500/30 hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-accent-400" />
                    Email Faisal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================ SERVICES */

function ServicesSection() {
  return (
    <section id="services" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-dots mask-fade-b opacity-40" />
      <div className="mx-auto max-w-6xl container-px">
        <SectionHeading
          eyebrow="Our Services"
          title={<>Everything you need to <span className="text-gradient">build a pipeline</span></>}
          description="Specialized services crafted by senior strategists — working together as one growth engine, or standalone where you need them most."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group card-luxury relative overflow-hidden p-6 transition-colors hover:border-brand-600/30"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-600/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-glow">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                {service.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ PROCESS */

function ProcessSection() {
  return (
    <section id="process" className="relative py-24">
      <div className="mx-auto max-w-6xl container-px">
        <SectionHeading
          eyebrow="How We Work"
          title={<>A proven path from <span className="text-gradient">idea to impact</span></>}
          description="Four disciplined stages that turn a vague growth goal into a system that runs without you."
        />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px glow-line lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-ink-950 text-brand-400 shadow-card"
                >
                  <step.icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-xs font-bold text-white shadow-glow">
                    {i + 1}
                  </span>
                </motion.div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-ink-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CTA STRIP */

function CTAStrip() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl container-px">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-brand-950/40 via-black to-accent-950/20 p-8 text-center shadow-glow-lg sm:p-12"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-4 flex w-fit items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Trusted by <span className="text-gradient">500+ growing businesses</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-ink-400">
              Join the founders and operators who replaced guesswork with a system built by people
              who care. Your growth engine is one call away.
            </p>
            <a href="#contact" className="btn-primary mt-7 inline-flex h-12 text-base">
              Book Free Strategy Call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================ CONTACT */

function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-grid mask-fade-b opacity-30" />
      <div className="mx-auto max-w-6xl container-px">
        <SectionHeading
          eyebrow="Get in Touch"
          title={<>Let's build your <span className="text-gradient">growth engine</span></>}
          description="Book a free strategy call or reach out directly. You will speak with a senior strategist — no automated funnels, no juniors, a real human who has done this before."
        />

        {/* Team cards */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="card-luxury group p-6 transition-colors hover:border-brand-600/30"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} shadow-glow`}>
                    <span className="font-display text-lg font-bold text-white">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-white">{member.name}</h3>
                    <p className="text-xs font-medium text-brand-400">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">{member.bio}</p>
                <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                  <a
                    href={member.phoneHref}
                    className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-400" />
                    {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent-400" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business info */}
        <div className="mx-auto mt-8 max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-brand-400">
                  <info.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="mt-0.5 block break-words text-sm font-medium text-ink-100 transition-colors hover:text-brand-400"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 break-words text-sm font-medium text-ink-100">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-brand-950/30 to-black p-8 text-center shadow-glow sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 flex-shrink-0 text-brand-400" />
            <div>
              <p className="font-display text-lg font-semibold text-white">Ready to scale?</p>
              <p className="text-sm text-ink-400">Book your free 30-minute strategy call today.</p>
            </div>
          </div>
          <a
            href="tel:+923122818181"
            className="btn-primary h-12 flex-shrink-0 text-base"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================ FOOTER */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-6xl container-px">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-base font-bold text-white">Salesvanta</span>
          </div>
          <p className="text-center text-sm text-ink-500 sm:text-right">
            &copy; {new Date().getFullYear()} Salesvanta. Scale Faster. Sell Smarter.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ BACK TO TOP */

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-ink-200 shadow-glow backdrop-blur-xl transition-colors hover:border-brand-600/40 hover:text-brand-400"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================ SHARED */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="mt-4 text-base leading-relaxed text-ink-400 sm:text-lg"
      >
        {description}
      </motion.p>
    </div>
  );
}

/* ============================================================ APP */

function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-black">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <AboutSection />
        <CEOSection />
        <ServicesSection />
        <ProcessSection />
        <CTAStrip />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
