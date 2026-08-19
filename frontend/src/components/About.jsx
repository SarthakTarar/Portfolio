import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile, skillGroups, education } from "@/data/resumeData";

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Who I am" title="About" />

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="text-base leading-relaxed text-text-dim">{profile.summary}</p>

            <div className="glass mt-8 rounded-2xl border border-border p-6">
              <h3 className="font-heading text-sm font-semibold text-neon-green">Education</h3>
              {education.map((edu) => (
                <div key={`${edu.school}-${edu.degree}`} className="mt-3">
                  <p className="font-medium">{edu.school}</p>
                  <p className="text-sm text-text-dim">{edu.degree}</p>
                  <p className="mt-1 font-mono text-xs text-text-dim">
                    {edu.location} · {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 font-mono text-xs tracking-wide text-text-dim uppercase">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="glass rounded-full border border-border px-3 py-1 text-xs text-text transition-colors hover:border-neon-purple hover:text-neon-purple"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
