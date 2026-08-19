import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/data/resumeData";
import heroImg from "@/assets/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        {/* initial/animate (no whileInView) fires once on first paint — this is
            the hero, it should already be visible when the page loads. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-neon-green">
            <span className="animate-glow-pulse h-1.5 w-1.5 rounded-full bg-neon-green" />
            Open to backend & AI-automation roles
          </p>

          <h1 className="font-heading text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Hi, I'm {profile.name.split(" ")[0]} —{" "}
            <span className="text-gradient">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-text-dim sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-neon-purple px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-transform hover:scale-105"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass glow-border rounded-full px-6 py-3 text-sm font-semibold"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-text-dim">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-neon-purple">
              <FaGithub size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-neon-blue">
              <FaLinkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-neon-green">
              <Mail size={20} />
            </a>
            <span className="text-xs">{profile.location}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
        >
          <div className="animate-float">
            <div className="glow-border glass relative rounded-3xl p-3">
              <img
                src={heroImg}
                alt=""
                className="aspect-square w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
