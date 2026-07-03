import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { submitContact } from '../../api/contact';
import Button from '../ui/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: (data) => {
      toast.success(data.message || 'Message sent!');
      setForm({ name: '', email: '', message: '' });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to send. Try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <section id="contact" className="section border-t border-border">
      <div className="container-page grid gap-12 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="eyebrow mb-4">05 · contact</p>
          <h2 className="font-display text-3xl text-ink">Let's build something.</h2>
          <p className="mt-4 max-w-sm text-muted">
            Open to internships, freelance work, and interesting problems in general.
            Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="Prince Mitra"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="mitra@example.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-xs text-muted">message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              placeholder="Write your query"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Sending…' : 'Send message'}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
