export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-border bg-surface2 px-3 py-1 font-mono text-xs text-muted ${className}`}>
      {children}
    </span>
  );
}
