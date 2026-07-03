import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { fetchProjects, createProject, updateProject, deleteProject } from '../api/projects';
import { fetchAllBlogsAdmin, createBlog, updateBlog, deleteBlog } from '../api/blogs';
import Loader from '../components/ui/Loader';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ProjectForm from '../components/admin/ProjectForm';
import BlogForm from '../components/admin/BlogForm';

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState('projects');

  return (
    <div className="container-page py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">~/admin/dashboard</p>
          <h1 className="font-display text-2xl text-ink">Signed in as {admin?.email}</h1>
        </div>
        <Button variant="outline" onClick={logout}>
          <FiLogOut /> Log out
        </Button>
      </div>

      <div className="mb-8 flex gap-2 border-b border-border">
        {['projects', 'blogs'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 font-mono text-sm border-b-2 transition-colors ${
              tab === t ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'projects' ? <ProjectsPanel /> : <BlogsPanel />}
    </div>
  );
}

function ProjectsPanel() {
  const qc = useQueryClient();
  const [modal, setModal] = useState(null); // null | 'create' | project object

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => fetchProjects({ page: 1, limit: 50 }),
  });

  const createM = useMutation({
    mutationFn: createProject,
    onSuccess: () => { toast.success('Project created'); qc.invalidateQueries({ queryKey: ['admin-projects'] }); qc.invalidateQueries({ queryKey: ['projects'] }); setModal(null); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to create'),
  });
  const updateM = useMutation({
    mutationFn: ({ id, payload }) => updateProject(id, payload),
    onSuccess: () => { toast.success('Project updated'); qc.invalidateQueries({ queryKey: ['admin-projects'] }); qc.invalidateQueries({ queryKey: ['projects'] }); setModal(null); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to update'),
  });
  const deleteM = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => { toast.success('Project deleted'); qc.invalidateQueries({ queryKey: ['admin-projects'] }); qc.invalidateQueries({ queryKey: ['projects'] }); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to delete'),
  });

  if (isLoading) return <Loader label="loading projects…" />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setModal('create')}><FiPlus /> New project</Button>
      </div>

      {data.items.length === 0 ? (
        <EmptyState title="No projects yet" description="Create your first one." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border font-mono text-xs text-muted">
              <tr>
                <th className="p-4">title</th>
                <th className="p-4 hidden sm:table-cell">tech</th>
                <th className="p-4 hidden sm:table-cell">featured</th>
                <th className="p-4 text-right">actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="p-4 text-ink">{p.title}</td>
                  <td className="p-4 hidden sm:table-cell text-muted font-mono text-xs">{p.techStack?.join(', ')}</td>
                  <td className="p-4 hidden sm:table-cell text-muted">{p.featured ? 'yes' : 'no'}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setModal(p)} className="text-muted hover:text-accent"><FiEdit2 size={16} /></button>
                      <button
                        onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteM.mutate(p.id); }}
                        className="text-muted hover:text-red-400"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(modal)} onClose={() => setModal(null)} title={modal === 'create' ? 'New project' : 'Edit project'}>
        <ProjectForm
          initial={modal !== 'create' ? modal : null}
          submitting={createM.isPending || updateM.isPending}
          onCancel={() => setModal(null)}
          onSubmit={(payload) => {
            if (modal === 'create') createM.mutate(payload);
            else updateM.mutate({ id: modal.id, payload });
          }}
        />
      </Modal>
    </div>
  );
}

function BlogsPanel() {
  const qc = useQueryClient();
  const [modal, setModal] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => fetchAllBlogsAdmin({ page: 1, limit: 50 }),
  });

  const createM = useMutation({
    mutationFn: createBlog,
    onSuccess: () => { toast.success('Post created'); qc.invalidateQueries({ queryKey: ['admin-blogs'] }); qc.invalidateQueries({ queryKey: ['blogs'] }); setModal(null); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to create'),
  });
  const updateM = useMutation({
    mutationFn: ({ id, payload }) => updateBlog(id, payload),
    onSuccess: () => { toast.success('Post updated'); qc.invalidateQueries({ queryKey: ['admin-blogs'] }); qc.invalidateQueries({ queryKey: ['blogs'] }); setModal(null); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to update'),
  });
  const deleteM = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => { toast.success('Post deleted'); qc.invalidateQueries({ queryKey: ['admin-blogs'] }); qc.invalidateQueries({ queryKey: ['blogs'] }); },
    onError: (err) => toast.error(err?.response?.data?.message || 'Failed to delete'),
  });

  if (isLoading) return <Loader label="loading posts…" />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setModal('create')}><FiPlus /> New post</Button>
      </div>

      {data.items.length === 0 ? (
        <EmptyState title="No posts yet" description="Write your first one." />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border font-mono text-xs text-muted">
              <tr>
                <th className="p-4">title</th>
                <th className="p-4 hidden sm:table-cell">published</th>
                <th className="p-4 text-right">actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="p-4 text-ink">{b.title}</td>
                  <td className="p-4 hidden sm:table-cell text-muted">{b.published ? 'yes' : 'draft'}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setModal(b)} className="text-muted hover:text-accent"><FiEdit2 size={16} /></button>
                      <button
                        onClick={() => { if (confirm(`Delete "${b.title}"?`)) deleteM.mutate(b.id); }}
                        className="text-muted hover:text-red-400"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(modal)} onClose={() => setModal(null)} title={modal === 'create' ? 'New post' : 'Edit post'}>
        <BlogForm
          initial={modal !== 'create' ? modal : null}
          submitting={createM.isPending || updateM.isPending}
          onCancel={() => setModal(null)}
          onSubmit={(payload) => {
            if (modal === 'create') createM.mutate(payload);
            else updateM.mutate({ id: modal.id, payload });
          }}
        />
      </Modal>
    </div>
  );
}
