import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiGithub, FiExternalLink, FiArrowLeft } from 'react-icons/fi';
import { fetchProjectBySlug } from '../api/projects';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import Badge from '../components/ui/Badge';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug),
  });

  if (isLoading) return <div className="container-page py-24"><Loader label="fetching project…" /></div>;
  if (isError)
    return (
      <div className="container-page py-24">
        <ErrorState message={error?.response?.data?.message || 'Project not found.'} onRetry={refetch} />
      </div>
    );

  return (
    <article className="container-page py-16 sm:py-24">
      <Link to="/#projects" className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent">
        <FiArrowLeft /> back to projects
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl text-ink">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack?.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>

      <div className="mt-6 flex gap-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent">
            <FiGithub /> repo
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent">
            <FiExternalLink /> live site
          </a>
        )}
      </div>

      {project.coverImage && (
        <img src={project.coverImage} alt={project.title} className="mt-10 w-full rounded-xl border border-border" />
      )}

      {project.content && (
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-accent">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              },
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>
      )}

      {project.images?.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.images.map((img) => (
            <img key={img} src={img} alt="" className="rounded-lg border border-border" />
          ))}
        </div>
      )}
    </article>
  );
}
