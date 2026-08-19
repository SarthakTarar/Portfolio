import { motion } from "framer-motion";

/**
 * Reveal wraps any children and fades/slides them in once they scroll into view.
 * `delay` staggers siblings, `y` controls how far it travels, `className` passes
 * through to the underlying motion.div so it can be used like a normal <div>.
 */
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
