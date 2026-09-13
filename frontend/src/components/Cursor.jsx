import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Elements that should feel "hoverable" even without an explicit data-cursor
// label — plain links, buttons, and form controls just grow the ring.
const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, select";

/**
 * Custom neon cursor: a precise dot glued to the real pointer position, plus
 * a ring that trails it on a spring (useSpring turns the raw mouse position
 * into a physically-damped one — see REACT_NOTES.md). Hovering an element
 * tagged data-cursor="view"/"get" grows the ring further and swaps in that
 * label; plain interactive elements just grow it.
 *
 * Only mounts on a real mouse with motion allowed — touch screens and
 * prefers-reduced-motion both get the native cursor untouched.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    document.documentElement.classList.add("cursor-custom");
    setEnabled(true);

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target.closest?.(`${HOVER_SELECTOR}, [data-cursor]`);
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const handleLeaveWindow = () => setHovering(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);
    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-neon-green"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 68 : hovering ? 44 : 28,
          height: label ? 68 : hovering ? 44 : 28,
          borderColor: hovering ? "#39ff8f" : "rgba(168, 85, 247, 0.55)",
          backgroundColor: hovering ? "rgba(57, 255, 143, 0.08)" : "rgba(168, 85, 247, 0.04)",
          boxShadow: hovering
            ? "0 0 24px rgba(57, 255, 143, 0.35)"
            : "0 0 16px rgba(168, 85, 247, 0.25)",
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <span className="font-mono text-[0.6rem] font-semibold tracking-widest text-neon-green uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
