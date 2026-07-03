import { motion } from 'framer-motion';
import {
  SiJavascript, SiPython,
  SiReact, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiExpress, SiGithub,
  SiPostgresql, SiMongodb, SiPrisma,
  SiGit, SiVercel, SiCloudinary, SiMysql,SiNetlify,SiPostman, SiSpring,SiRender
} from 'react-icons/si';
import { DiHtml5, DiCss3 } from 'react-icons/di';
import { DiJava } from "react-icons/di";

const groups = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Java', icon: DiJava },
    ],
  },
{
    label: 'Frontend',
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: DiHtml5 },
      { name: 'CSS3', icon: DiCss3 },
      { name: 'Bootstrap', icon: SiBootstrap },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'Spring Boot', icon: SiSpring },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MySQL', icon: SiMysql }
    ],
  },
  {
    label: 'Tools & DevOps',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      // { name: 'Docker', icon: SiDocker },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Cloudinary', icon: SiCloudinary },
       { name: 'Netlify', icon: SiNetlify },
       { name: 'Postman', icon: SiPostman },
        { name: 'Render', icon: SiRender },
    ],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const badge = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-border">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="eyebrow mb-10"
        >
          02 · skills
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card p-6"
            >
              <h3 className="mb-4 font-display text-sm font-semibold text-ink">{group.label}</h3>
              <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
                {group.items.map(({ name, icon: Icon }) => (
                  <motion.span
                    key={name}
                    variants={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface2 px-3 py-1.5 font-mono text-xs text-muted"
                  >
                    <Icon size={14} className="text-accent2" />
                    {name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
