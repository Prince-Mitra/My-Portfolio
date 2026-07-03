import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section border-t border-border">
      <div className="container-page grid gap-10 sm:grid-cols-[1fr_2fr]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          01 · about
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl space-y-4 text-muted"
        >
          <p>
            I enjoy building full-stack web applications where I can work across
            both frontend and backend — from designing APIs and databases to
            creating clean, responsive user interfaces. I focus on understanding
            how systems work end-to-end rather than just writing isolated code.
          </p>

          <p>
            I’m a B.Tech Information Technology student, graduating in 2026. I
            mainly work with React, Node.js, and Express, and I’m also learning
            Java and Spring Boot for backend development. I’m comfortable
            working with databases like PostgreSQL and MySQL and understanding
            how data flows in real-world applications.
          </p>

          <p>
            Alongside projects, I continuously improve my problem-solving skills
            through Data Structures and Algorithms and explore system design
            fundamentals. I also enjoy deploying personal projects and learning
            tools that help take ideas from development to production.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
