"use client";
import { useState, FormEvent } from "react";

export default function BookingView() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    try {
      await fetch("https://formsubmit.co/ajax/muazzamahmad666@gmail.com", {
        method: "POST",
        body: new FormData(form),
      });
      setSubmitted(true);
      form.reset();
      setTimeout(() => {
        setSubmitted(false);
        window.location.hash = "#home";
      }, 3500);
    } catch {
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Thank You Overlay */}
      {submitted && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl">
          <div className="text-center p-6 max-w-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-6 tracking-tight">Thank You!</h2>
            <p className="text-xl md:text-2xl text-zinc-300">{"We've successfully received your request. Our team will be in touch with your free quote shortly."}</p>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 flex items-center justify-center relative z-10">
        <div className="relative w-full max-w-5xl mx-auto rounded-[2rem] p-[2px] overflow-hidden shadow-[0_0_60px_rgba(147,51,234,0.3)]">
          {/* Spinning border */}
          <div className="absolute inset-[-100%] animate-spin-gradient z-0" />

          <div className="relative z-10 w-full bg-zinc-950/60 backdrop-blur-2xl rounded-[calc(2rem-2px)] flex flex-col lg:flex-row overflow-hidden border border-white/5">
            {/* Left: Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-8 order-2 lg:order-1">
              <div className="space-y-3">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl shadow-lg shadow-purple-900/50 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Get a Free Quote</h2>
                <p className="text-white/60 text-base">{"Enter your details below and we'll reach out instantly with your free quote."}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="_subject" value="New Prime Scale Lead Request!" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 block">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      <input type="text" name="First Name" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300" placeholder="John" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 block">Last Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                      <input type="text" name="Last Name" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300" placeholder="Doe" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 block">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white/40"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </div>
                    <input type="email" name="email" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300" placeholder="john@company.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 block">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-white/40"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <input type="tel" name="Phone" className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300" placeholder="+1 (555) 000-0000" required />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={submitting} className="shiny-cta w-full">
                    <span>
                      {submitting ? "Sending..." : "Submit Request"}
                      {!submitting && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-10" />

            {/* Right: Info */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-8 relative overflow-hidden order-1 lg:order-2 bg-white/5 lg:bg-transparent border-b lg:border-b-0 border-white/10">
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-purple-300"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Deploy your AI workforce.</h2>
                <p className="text-zinc-400 text-base leading-relaxed">Transform your business with intelligent AI voice agents that handle inbound calls, and highly optimized websites that convert visitors to clients.</p>
              </div>
              <div className="space-y-5 relative z-10">
                {[
                  { title: "Lifelike Conversations", desc: "Human-like AI interactions with ultra-low latency" },
                  { title: "High-Converting Web", desc: "Visually stunning and deeply optimized sites" },
                  { title: "Custom Integrations", desc: "Directly connected to your CRM and workflow" },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="text-purple-400"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{title}</h3>
                      <p className="text-zinc-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
