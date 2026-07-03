import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiArrowLeft } from 'react-icons/fi';
import { fetchBlogBySlug } from '../api/blogs';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import Badge from '../components/ui/Badge';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data: post, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
  });

  if (isLoading) return <div className="container-page py-24"><Loader label="fetching post…" /></div>;
  if (isError)
    return (
      <div className="container-page py-24">
        <ErrorState message={error?.response?.data?.message || 'Post not found.'} onRetry={refetch} />
      </div>
    );

  return (
    <article className="container-page py-16 sm:py-24">
      <Link to="/#blog" className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent">
        <FiArrowLeft /> back to blog
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl text-ink">{post.title}</h1>
      <p className="mt-3 font-mono text-xs text-muted">
        {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags?.map((t) => <Badge key={t}>{t}</Badge>)}
      </div>

      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="mt-10 w-full rounded-xl border border-border" />
      )}

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
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
