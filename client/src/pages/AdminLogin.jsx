import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) navigate('/admin/dashboard', { replace: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8">
        <p className="eyebrow mb-2">~/admin/login</p>
        <h1 className="mb-6 font-display text-2xl text-ink">Sign in</h1>

        <label className="mb-1.5 block font-mono text-xs text-muted">email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mb-4 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />

        <label className="mb-1.5 block font-mono text-xs text-muted">password</label>
        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mb-6 w-full rounded-lg border border-border bg-surface2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
