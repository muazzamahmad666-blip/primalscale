import ProcessSection from "./ProcessSection";
import Image from "next/image";

export default function HomeView() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative pt-44 pb-24 md:pt-52 md:pb-36 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200 text-sm font-medium tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
            </span>
            ACCEPTING NEW CLIENTS
          </div>

          <h1 className="text-5xl md:text-8xl font-semibold tracking-tight text-white leading-[1.05] text-balance">
            We Build AI Systems &amp; <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-500">High-Converting Web.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Stop losing leads to slow response times and poor digital presence. We design custom AI voice agents and tailored websites that scale your operations instantly.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
            <a href="#book" className="shiny-cta group">
              <span>
                Get free quote{" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </a>
            <a href="#insights" className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-200 font-medium glossy-purple-hover flex items-center gap-3 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Read Our Insights
            </a>
          </div>

          {/* Credibility Metrics */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 mt-16 max-w-4xl mx-auto">
            <div className="text-center"><p className="text-3xl font-bold text-white">100k+</p><p className="text-sm text-zinc-500 uppercase tracking-wide mt-2">AI Calls Made</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">24/7</p><p className="text-sm text-zinc-500 uppercase tracking-wide mt-2">Uptime Support</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">30%</p><p className="text-sm text-zinc-500 uppercase tracking-wide mt-2">Conv. Increase</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-white">40+</p><p className="text-sm text-zinc-500 uppercase tracking-wide mt-2">Systems Built</p></div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 border-y border-white/5 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-base text-zinc-500 mb-10 tracking-widest uppercase">Powering Automation for Agencies &amp; SMAs using</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { label: "n8n", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.474 5.684a2.53 2.53 0 0 0-2.447 1.895H16.13a2.526 2.526 0 0 0-2.492 2.11l-.103.624a1.26 1.26 0 0 1-1.246 1.055h-1.001a2.527 2.527 0 0 0-4.893 0H4.973a2.527 2.527 0 1 0 0 1.264h1.422a2.527 2.527 0 0 0 4.894 0h1a1.26 1.26 0 0 1 1.247 1.055l.103.623a2.526 2.526 0 0 0 2.492 2.111h.37a2.527 2.527 0 1 0 0-1.263h-.37a1.26 1.26 0 0 1-1.246-1.056l-.103-.623A2.52 2.52 0 0 0 13.96 12a2.52 2.52 0 0 0 .82-1.48l.104-.622a1.26 1.26 0 0 1 1.246-1.056h2.896a2.527 2.527 0 1 0 2.447-3.158m0 1.263a1.263 1.263 0 0 1 1.263 1.263a1.263 1.263 0 0 1-1.263 1.264A1.263 1.263 0 0 1 20.21 8.21a1.263 1.263 0 0 1 1.264-1.263m-18.948 3.79A1.263 1.263 0 0 1 3.79 12a1.263 1.263 0 0 1-1.264 1.263A1.263 1.263 0 0 1 1.263 12a1.263 1.263 0 0 1 1.263-1.263m6.316 0A1.263 1.263 0 0 1 10.105 12a1.263 1.263 0 0 1-1.263 1.263A1.263 1.263 0 0 1 7.58 12a1.263 1.263 0 0 1 1.263-1.263m10.106 3.79a1.263 1.263 0 0 1 1.263 1.263a1.263 1.263 0 0 1-1.263 1.263a1.263 1.263 0 0 1-1.264-1.263a1.263 1.263 0 0 1 1.263-1.264" /></svg> },
              { label: "OpenAI", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22.282 9.821a6 6 0 0 0-.516-4.91a6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9a6.05 6.05 0 0 0 .743 7.097a5.98 5.98 0 0 0 .51 4.911a6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206a6 6 0 0 0 3.997-2.9a6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081l4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085l4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354l-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023l-.141-.085l-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365l2.602-1.5l2.607 1.5v2.999l-2.597 1.5l-2.607-1.5Z" /></svg> },
              { label: "Twilio", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12c6.64 0 12-5.36 12-12c0-6.641-5.36-12-12-12m0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12a8.777 8.777 0 0 1 8.75-8.801H12a8.776 8.776 0 0 1 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801zm5.44-11.76a2.49 2.49 0 0 1-2.481 2.479a2.49 2.49 0 0 1-2.479-2.479a2.49 2.49 0 0 1 2.479-2.481a2.493 2.493 0 0 1 2.481 2.481m0 5.919c0 1.36-1.12 2.48-2.481 2.48a2.49 2.49 0 0 1-2.479-2.48a2.49 2.49 0 0 1 2.479-2.479a2.49 2.49 0 0 1 2.481 2.479m-5.919 0c0 1.36-1.12 2.48-2.479 2.48a2.49 2.49 0 0 1-2.481-2.48a2.49 2.49 0 0 1 2.481-2.479a2.49 2.49 0 0 1 2.479 2.479m0-5.919a2.49 2.49 0 0 1-2.479 2.479a2.49 2.49 0 0 1-2.481-2.479A2.493 2.493 0 0 1 9.042 6.56a2.493 2.493 0 0 1 2.479 2.481" /></svg> },
              { label: "Retell AI", icon: <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor"><circle cx="4" cy="4" r="1.5" /><circle cx="10" cy="4" r="1.5" /><circle cx="16" cy="4" r="1.5" /><circle cx="22" cy="4" r="1.5" /><circle cx="4" cy="10" r="1.5" /><circle cx="22" cy="10" r="1.5" /><circle cx="4" cy="16" r="1.5" /><circle cx="22" cy="16" r="1.5" /><circle cx="4" cy="22" r="1.5" /><circle cx="10" cy="22" r="1.5" /><circle cx="16" cy="22" r="1.5" /><circle cx="22" cy="22" r="1.5" /><circle cx="10" cy="10" r="3" /><circle cx="16" cy="10" r="3" /><circle cx="10" cy="16" r="3" /><circle cx="16" cy="16" r="3" /></svg> },
              { label: "Airtable", icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.27 3.27 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.3 3.3 0 0 0-1.272-.257M23.4 8.056a.6.6 0 0 0-.222.045l-10.012 3.877a.61.61 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.58.58 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.64.64 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006l.307-.147l2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.6.6 0 0 0-.207-.044z" /></svg> },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-3 text-2xl font-semibold text-zinc-300 hover:text-white transition-colors">
                {icon} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">Core Capabilities</h2>
          <p className="text-xl text-zinc-400 max-w-2xl">{"We don't just \"use AI\". We architect robust digital infrastructures that handle communication, conversion, and data for you."}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-10 rounded-2xl hover:border-purple-500/50 transition-colors group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </div>
            <h3 className="text-2xl font-medium mb-4 relative z-10 text-white">AI Voice Agents</h3>
            <p className="text-zinc-400 text-base leading-relaxed mb-6 relative z-10">Inbound and outbound calling agents powered by Retell AI. They handle qualifying leads, booking appointments, and customer support inquiries 24/7.</p>
            <ul className="text-sm text-zinc-500 space-y-3 relative z-10">
              <li className="flex items-center gap-3"><CheckIcon className="text-purple-500" /> Sub-800ms latency</li>
              <li className="flex items-center gap-3"><CheckIcon className="text-purple-500" /> Custom knowledge base</li>
            </ul>
          </div>
          <div className="glass-card p-10 rounded-2xl hover:border-fuchsia-500/50 transition-colors group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 mb-8 group-hover:scale-110 transition-transform relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <h3 className="text-2xl font-medium mb-4 relative z-10 text-white">Website Creation</h3>
            <p className="text-zinc-400 text-base leading-relaxed mb-6 relative z-10">High-converting, visually stunning websites tailored for your brand. We build fast, responsive, and SEO-optimized web experiences designed to turn visitors into clients.</p>
            <ul className="text-sm text-zinc-500 space-y-3 relative z-10">
              <li className="flex items-center gap-3"><CheckIcon className="text-fuchsia-500" /> Mobile-first design</li>
              <li className="flex items-center gap-3"><CheckIcon className="text-fuchsia-500" /> SEO &amp; Speed Optimized</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessSection />

      {/* INSIGHTS */}
      <section id="insights" className="py-28 px-6">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-6 text-white">Insights</h2>
        <p className="text-xl text-zinc-400 text-center mb-20 max-w-2xl mx-auto">Deep dives into AI voice technology, web development, and digital growth.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { color: "purple", tag: "Strategy", date: "Oct 12", title: "The End of Cold Calling?", desc: "How AI voice agents are outperforming human SDRs in qualification and booking rates by seamlessly engaging leads in under a second." },
            { color: "fuchsia", tag: "Tech", date: "Oct 08", title: "Reducing Voice Latency", desc: "A technical breakdown of how we achieved sub-800ms conversational response times using highly optimized LLM routing." },
            { color: "purple", tag: "Web Design", date: "Sep 24", title: "Why Page Speed Matters", desc: "The true financial impact of website load times on your conversion rate and how we engineer pages that load instantly." },
            { color: "fuchsia", tag: "UI/UX", date: "Sep 15", title: "Designing for Trust", desc: "Essential design principles that modern brands use to build instant credibility with their digital visitors." },
          ].map(({ color, tag, date, title, desc }) => (
            <div key={title} className={`glass-card p-10 rounded-2xl hover:border-${color}-500/50 transition-colors group relative overflow-hidden flex flex-col h-full cursor-default`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`flex items-center gap-3 text-sm text-${color}-400 font-medium mb-4 relative z-10`}>
                <span>{tag}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="text-zinc-500">{date}</span>
              </div>
              <h3 className={`text-3xl font-medium mb-4 relative z-10 text-white group-hover:text-${color}-400 transition-colors`}>{title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed relative z-10">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-white/5 pt-28 pb-28 relative" id="about">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-5/12">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-800 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <Image
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
                  alt="Prime Scale team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-7/12 space-y-8 relative z-10">
              <h2 className="text-4xl font-semibold tracking-tight text-white">About Prime Scale.</h2>
              <h3 className="text-2xl text-purple-400 font-medium">We build systems, not demos.</h3>
              <p className="text-zinc-300 text-lg leading-relaxed">The tech space is full of noise. Everyone is selling a course or showing off a flashy demo that breaks in production. We operate differently.</p>
              <p className="text-zinc-300 text-lg leading-relaxed">{"We are developers and designers focused on stability and ROI. Our engineering background means we build robust digital infrastructures—whether it's AI voice systems or high-end websites—that scale with your business and actually deliver on their promises."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-36 px-6 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-purple-900/20 blur-3xl rounded-full -z-10 transform scale-50" />
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white text-balance">Ready to elevate your digital presence?</h2>
          <p className="text-xl text-zinc-300">{"If missed calls or an outdated website are holding you back, we will fix it. Let's build your new system."}</p>
          <div className="flex justify-center pt-6">
            <a href="#book" className="shiny-cta"><span>Get free quote</span></a>
          </div>
          <p className="text-sm text-zinc-500 mt-10">No commitment required. 15-minute discovery chat.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-base text-zinc-500">© 2024 Prime Scale. All rights reserved.</div>
          <div className="flex gap-10 text-base font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Email Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
