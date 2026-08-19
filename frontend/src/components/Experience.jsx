import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/resumeData";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Where I've worked" title="Experience" />

        <div className="relative border-l border-border pl-8">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span className="animate-glow-pulse absolute top-1.5 -left-[2.31rem] h-3 w-3 rounded-full bg-neon-purple shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

              <div className="glass glow-border rounded-2xl border border-border p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-lg font-semibold">{job.role}</h3>
                  <span className="font-mono text-xs text-neon-green">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-neon-blue">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2 text-sm text-text-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-dim" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
