import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/resumeData";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What I've built"
          title="Projects"
          subtitle="A few things I've shipped end-to-end, from ML backends to authenticated APIs."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 2) * 0.1}>
              <article className="glass glow-border group flex h-full flex-col rounded-2xl border border-border p-6 transition-transform hover:-translate-y-1">
                <h3 className="font-heading text-lg font-semibold">{project.name}</h3>
                <p className="mt-2 flex-1 text-sm text-text-dim">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[0.7rem] text-neon-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text transition-colors group-hover:text-neon-purple"
                  >
                    <FaGithub size={16} />
                    View on GitHub
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-neon-green transition-colors hover:text-neon-purple"
                    >
                      <FaArrowUpRightFromSquare size={13} />
                      Live Demo
                    </a>
                  )}
                </div>

                {project.demoCredentials && (
                  <p className="mt-3 font-mono text-xs text-text-dim">
                    Demo login: {project.demoCredentials.username} / {project.demoCredentials.password}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
