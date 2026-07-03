import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../api/blogs";
import Loader from "../ui/Loader";
import ErrorState from "../ui/ErrorState";
import EmptyState from "../ui/EmptyState";
import Badge from "../ui/Badge";

export default function Blog() {
  const [activeTag, setActiveTag] = useState("all");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs({ page: 1, limit: 20 }),
  });

  const tags = useMemo(() => {
    if (!data?.items) return [];
    const set = new Set();
    data.items.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set)];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data?.items) return [];
    if (activeTag === "all") return data.items;
    return data.items.filter((b) => b.tags?.includes(activeTag));
  }, [data, activeTag]);

  return (
    <section id="blog" className="section border-t border-border">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="eyebrow">04 · blog</p>
          {tags.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                    activeTag === t
                      ? "border-accent text-accent"
                      : "border-border text-muted hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading && <Loader label="fetching posts…" />}
        {isError && (
          <ErrorState
            message={error?.message || "Could not load blog posts."}
            onRetry={refetch}
          />
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            title="No posts yet"
            description="Published posts from the admin dashboard will appear here."
          />
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="divide-y divide-border border-t border-border">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-display text-lg text-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags?.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
