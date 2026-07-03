import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {year} Prince Mitra — built with React, Express &amp; Postgres
        </p>
        <div className="flex items-center gap-4 text-muted">
          <a
            href="https://github.com/Prince-Mitra"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-accent"
          >
            <FiGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href="https://leetcode.com/u/Prince7803/"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            className="hover:text-accent"
          >
            <SiLeetcode size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
