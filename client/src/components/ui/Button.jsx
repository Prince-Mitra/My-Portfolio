export default function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-accent text-base hover:brightness-110 active:scale-[0.98] shadow-glow',
    outline: 'border border-border text-ink hover:border-accent/60 hover:text-accent',
    ghost: 'text-muted hover:text-ink',
  };
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
