"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    num: 1,
    title: "Audit & Strategy Design",
    desc: "We map out your current bottlenecks. Whether it's conversation flow for voice or UI/UX for your website, we design the logic before writing a single line of code.",
  },
  {
    num: 2,
    title: "Build & Integration",
    desc: "Developing the solution. From connecting AI APIs with your CRM to coding responsive web pages that fit your exact brand identity.",
  },
  {
    num: 3,
    title: "Rigorous Testing",
    desc: "Thorough testing to ensure AI handles edge cases and websites perform flawlessly across all devices and browsers.",
  },
  {
    num: 4,
    title: "Deployment & Handoff",
    desc: "The system goes live. We provide comprehensive documentation so you can take control, monitor results, and scale freely.",
  },
];

export default function ProcessSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function update() {
      const section = stepsRef.current;
      const glowLine = glowLineRef.current;
      if (!section || !glowLine) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.6;
      const totalLineHeight = rect.height - 40;
      let scrollProgress = triggerPoint - (rect.top + 20);
      scrollProgress = Math.max(0, Math.min(scrollProgress, totalLineHeight));
      glowLine.style.height = `${scrollProgress}px`;

      circleRefs.current.forEach((circle) => {
        if (!circle) return;
        const cr = circle.getBoundingClientRect();
        const center = cr.top + cr.height / 2;
        if (center < triggerPoint) {
          circle.classList.add("bg-purple-600", "text-white", "border-purple-500", "shadow-[0_0_15px_rgba(168,85,247,0.6)]");
          circle.classList.remove("bg-zinc-800", "border-zinc-700", "text-zinc-500");
        } else {
          circle.classList.remove("bg-purple-600", "text-white", "border-purple-500", "shadow-[0_0_15px_rgba(168,85,247,0.6)]");
          circle.classList.add("bg-zinc-800", "border-zinc-700", "text-zinc-500");
        }
      });
    }

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="process" className="py-28 border-y border-white/5 bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-white text-balance">How We Build Your System</h2>
            <p className="text-xl text-zinc-400 mb-10">A transparent, engineering-focused approach. No magic, just logic.</p>
            <a
              href="#book"
              className="px-6 py-4 rounded-xl bg-zinc-800 border border-white/10 text-white font-semibold text-base inline-flex items-center justify-center glossy-purple-hover"
            >
              Start the Process
            </a>
          </div>

          <div className="md:w-2/3 relative" ref={stepsRef}>
            <div className="absolute left-[1.25rem] top-5 bottom-5 w-[2px] bg-zinc-800 transform -translate-x-1/2 rounded-full hidden sm:block" />
            <div
              ref={glowLineRef}
              className="absolute left-[1.25rem] top-5 w-[2px] bg-purple-500 shadow-[0_0_12px_#a855f7] transform -translate-x-1/2 transition-all duration-150 ease-out rounded-full hidden sm:block"
              style={{ height: 0 }}
            />
            <div className="space-y-16 relative z-10">
              {steps.map((step, i) => (
                <div key={step.num} className="flex gap-8">
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      ref={(el) => { circleRefs.current[i] = el; }}
                      className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 font-bold text-lg transition-all duration-500 ease-out shadow-none relative z-10"
                    >
                      {step.num}
                    </div>
                  </div>
                  <div className={step.num < 4 ? "pb-6" : ""}>
                    <h3 className="text-2xl font-medium text-white mb-3">{step.title}</h3>
                    <p className="text-zinc-400 text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
