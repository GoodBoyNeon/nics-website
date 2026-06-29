import { motion, useReducedMotion } from "motion/react";

import { staggerContainer } from "@/lib/animations";
import { Send, FileText, Sparkles } from "lucide-react";
import { config } from "@/lib/config";

export default function Community() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="community"
      className="bg-dark text-white py-20 md:py-28 overflow-hidden relative"
    >
      {/* Background vector glow decoration */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-16"
        >
          {/* Header Area */}
          <motion.div className="max-w-[700px] space-y-4">
            <p className="label-eyebrow text-accent font-semibold tracking-[0.15em] mb-3">
              Become a Member
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
              Be part of something building.
            </h2>
            <p className="text-body text-gray-400 max-w-[600px] font-normal">
              NICS is free to join and open to every high schooler in Nepal.
              Come learn, build, share, and connect with other passionate peers.
            </p>
          </motion.div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Membership card */}
            <motion.div className="bg-white/3 border border-white/10 rounded-2xl p-8 flex flex-col justify-between items-start gap-8 hover:border-accent/40 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-normal text-white">
                    Apply for Membership
                  </h3>
                  <p className="text-body text-sm text-gray-400">
                    Get priority invitations to all physical workshops,
                    webinars, local development teams, and future hackathons. It
                    is free. Always.
                  </p>
                </div>
              </div>
              <a
                href={config.applicationForm}
                id="apply-membership-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition-all border border-white/20"
              >
                Apply Now <Sparkles size={14} className="text-gold" />
              </a>
            </motion.div>

            {/* Discord card */}
            <motion.div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col justify-between items-start gap-8 hover:border-accent/40 transition-all duration-300">
              <div className="space-y-5">
                {/* Discord simplified logo */}
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 127.14 96.36"
                    fill="currentColor"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.48,6.83,77.19,77.19,0,0,0,49.18,0,105.15,105.15,0,0,0,18.74,8.07C-1.64,38.58-7.12,68.43,4.64,95.44A105.82,105.82,0,0,0,35.14,111a77.6,77.6,0,0,0,6.44-10.51,69.59,69.59,0,0,1-10.15-4.85c.86-.63,1.68-1.3,2.47-2a68.36,68.36,0,0,0,65.68,0c.79.7,1.61,1.37,2.47,2a69.59,69.59,0,0,1-10.15,4.85,77.6,77.6,0,0,0,6.44,10.51,105.82,105.82,0,0,0,30.5-15.56C135.26,68.43,129.78,38.58,107.7,8.07ZM42.45,75.69C36.21,75.69,31,70,31,63s5.17-12.65,11.41-12.65S53.84,56,53.84,63,48.69,75.69,42.45,75.69Zm42.24,0C78.45,75.69,73.28,70,73.28,63s5.17-12.65,11.41-12.65S96.1,56,96.1,63,91,75.69,84.69,75.69Z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-normal text-white">
                    Join our Discord
                  </h3>
                  <p className="text-body text-sm text-gray-400">
                    Interact directly with members. Discuss hardware setups,
                    share projects, ask coding questions, or coordinate with
                    regional groups.
                  </p>
                </div>
              </div>
              <a
                href={config.social.discord}
                id="join-discord-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer transition-all border border-accent/20"
              >
                Join Server <Send size={14} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
