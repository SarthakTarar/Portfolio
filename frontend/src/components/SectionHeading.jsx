import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-2 font-mono text-xs tracking-[0.3em] text-neon-green uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-text-dim">{subtitle}</p>}
    </Reveal>
  );
}
