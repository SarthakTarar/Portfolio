import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "@/data/resumeData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // useEffect + a scroll listener: runs once on mount (empty deps array),
  // cleans itself up on unmount so we don't leak listeners between renders.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-[0_0_30px_rgba(168,85,247,0.08)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-heading text-lg font-semibold tracking-tight">
          Sarthak<span className="text-neon-green">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-dim transition-colors hover:text-neon-purple"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeFile}
          download
          className="glow-border glass hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium md:inline-flex"
        >
          <Download size={15} />
          Resume
        </a>

        <button
          type="button"
          className="text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* AnimatePresence lets the mobile menu animate OUT before React removes
          it from the DOM — without it, unmounting is instant and abrupt. */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-border last:border-none">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm text-text-dim hover:text-neon-purple"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-6 py-3">
              <a
                href={profile.resumeFile}
                download
                className="inline-flex items-center gap-2 text-sm text-neon-green"
              >
                <Download size={15} /> Download Resume
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
