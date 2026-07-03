import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { fetchProjects } from '../../api/projects';
import Loader from '../ui/Loader';
import ErrorState from '../ui/ErrorState';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';

export default function Projects() {
  const [activeTag, setActiveTag] = useState('all');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects({ page: 1, limit: 24 }),
  });

  const tags = useMemo(() => {
    if (!data?.items) return [];
    const set = new Set();
    data.items.forEach((p) => p.techStack?.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data?.items) return [];
    if (activeTag === 'all') return data.items;
    return data.items.filter((p) => p.techStack?.includes(activeTag));
  }, [data, activeTag]);

  return (
    <section id="projects" className="section border-t border-border">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="eyebrow">03 · projects</p>
          {tags.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                    activeTag === t
                      ? 'border-accent text-accent'
                      : 'border-border text-muted hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading && <Loader label="fetching projects…" />}

        {isError && (
          <ErrorState message={error?.message || 'Could not load projects.'} onRetry={refetch} />
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            title="No projects yet"
            description="Add your first project from the admin dashboard — it'll show up here automatically."
          />
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -6 }}
                className="group card overflow-hidden"
              >
                <Link to={`/projects/${project.slug}`}>
                  <div className="aspect-video overflow-hidden bg-surface2">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
                        no preview
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/projects/${project.slug}`}>
                    <h3 className="font-display text-lg text-ink group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack?.slice(0, 4).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="GitHub repo">
                        <FiGithub size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-accent" aria-label="Live site">
                        <FiExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
