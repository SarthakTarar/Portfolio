import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/data/resumeData";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-text-dim">
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; FastAPI.
        </p>
        <div className="flex items-center gap-5 text-text-dim">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-neon-purple">
            <FaGithub size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-neon-blue">
            <FaLinkedin size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-neon-green">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
