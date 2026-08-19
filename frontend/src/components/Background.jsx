/**
 * Purely decorative, fixed behind all content: a faint grid + three blurred
 * "blob" gradients that slowly drift (see .animate-blob in index.css).
 * aria-hidden because screen readers should skip straight to real content.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      <div className="animate-blob absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-neon-purple/30 blur-[110px]" />
      <div
        className="animate-blob absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-neon-blue/25 blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-neon-green/15 blur-[110px]"
        style={{ animationDelay: "-8s" }}
      />

      <div className="noise" />
    </div>
  );
}
