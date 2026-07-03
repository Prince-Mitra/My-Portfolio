import { useState } from 'react';
import Button from '../ui/Button';
import ImageUploadField from './ImageUploadField';

const empty = { title: '', content: '', tags: '', coverImage: '', published: false };

export default function BlogForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initial ? { ...empty, ...initial, tags: (initial.tags || []).join(', ') } : empty
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block font-mono text-xs text-muted">title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-xs text-muted">content (markdown)</label>
        <textarea
          required
          rows={10}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-surface2 px-4 py-2.5 font-mono text-xs text-ink outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-xs text-muted">tags (comma separated)</label>
        <input
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="react, backend, notes"
          className="w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
      </div>
      <ImageUploadField label="cover image" value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} />
      <label className="flex items-center gap-2 font-mono text-xs text-muted">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
        />
        published (visible on the public site)
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save post'}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
