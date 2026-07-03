import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import Button from "../ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden section pt-24 sm:pt-32">
      <div className="container-page">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p variants={item} className="eyebrow mb-4">
            $ whoami
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-6xl font-semibold leading-tight text-ink"
          >
            Full-stack developer building
            <span className="text-accent">
              {" "}
              scalable web applications.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted"
          >
            I design and develop full-stack applications using React, Node.js,
            Express, and Spring Boot, with databases like PostgreSQL and MySQL.
            I focus on clean architecture, API design, and deploying
            applications using modern DevOps tools.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="/resume.docx" download>
              <FiDownload /> Download resume
            </Button>
            <Button as="a" href="#projects" variant="outline">
              View projects
            </Button>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-5 text-muted"
          >
            <a
              href="https://github.com/Prince-Mitra"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-accent"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://leetcode.com/u/Prince7803/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="hover:text-accent"
            >
              <SiLeetcode size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
