import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/data/resumeData";

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Proof of work" title="Certifications & Papers" />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={(i % 2) * 0.08}>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="glass glow-border group flex items-center justify-between gap-3 rounded-xl border border-border p-4 transition-colors hover:border-neon-green"
              >
                <span>
                  <span className="block text-sm font-medium">{cert.title}</span>
                  <span className="block text-xs text-text-dim">{cert.issuer}</span>
                </span>
                <ExternalLink
                  size={16}
                  className="shrink-0 text-text-dim transition-colors group-hover:text-neon-green"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
