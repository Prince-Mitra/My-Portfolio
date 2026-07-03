import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { to: "/#about", label: "about" },
  { to: "/#skills", label: "skills" },
  { to: "/#projects", label: "projects" },
  { to: "/#blog", label: "blog" },
  { to: "/#contact", label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-base/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* signature status strip — reads like a running service */}
      <div className="hidden sm:block border-b border-border/60 bg-surface/60">
        <div className="container-page flex items-center justify-between py-1.5 font-mono text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" />
            status: available for work
          </span>
          <span>
            build local · uptime {Math.floor(performance.now() / 1000)}s
          </span>
        </div>
      </div>

      <nav className="container-page flex items-center justify-between py-4">
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-accent"
        >
          Prince<span className="text-accent">-Mitra</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <NavLink
            to="/admin"
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted hover:border-accent/50 hover:text-accent"
          >
            admin
          </NavLink>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border bg-base"
          >
            <div className="container-page flex flex-col gap-4 py-6">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-muted hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-muted hover:text-accent"
              >
                ~/admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
