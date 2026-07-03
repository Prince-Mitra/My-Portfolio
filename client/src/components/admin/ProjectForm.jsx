import { useState } from 'react';
import Button from '../ui/Button';
import ImageUploadField from './ImageUploadField';

const empty = {
  title: '', description: '', content: '', techStack: '', githubUrl: '', liveUrl: '',
  coverImage: '', featured: false,
};

export default function ProjectForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(
    initial
      ? { ...empty, ...initial, techStack: (initial.techStack || []).join(', ') }
      : empty
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      images: initial?.images || [],
    });
  };

  const field = (name, label, props = {}) => (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      <input
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        {...props}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field('title', 'title', { required: true })}
      <div>
        <label className="mb-1.5 block font-mono text-xs text-muted">description</label>
        <textarea
          required
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-xs text-muted">content (markdown case study)</label>
        <textarea
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-surface2 px-4 py-2.5 font-mono text-xs text-ink outline-none focus:border-accent"
        />
      </div>
      {field('techStack', 'tech stack (comma separated)', { placeholder: 'React, Node.js, PostgreSQL' })}
      <div className="grid gap-4 sm:grid-cols-2">
        {field('githubUrl', 'github url')}
        {field('liveUrl', 'live url')}
      </div>
      <ImageUploadField label="cover image" value={form.coverImage} onChange={(url) => setForm({ ...form, coverImage: url })} />
      <label className="flex items-center gap-2 font-mono text-xs text-muted">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        featured
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save project'}</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
