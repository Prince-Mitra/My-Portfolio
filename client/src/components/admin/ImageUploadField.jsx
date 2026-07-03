import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiX } from 'react-icons/fi';
import { uploadImage } from '../../api/upload';

export default function ImageUploadField({ label, value, onChange }) {
  const [preview, setPreview] = useState(value || '');

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setPreview(data.url);
      onChange(data.url);
      toast.success('Image uploaded');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Upload failed');
    },
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutation.mutate(file);
  };

  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs text-muted">{label}</label>
      {preview ? (
        <div className="relative w-full max-w-xs">
          <img src={preview} alt="" className="w-full rounded-lg border border-border" />
          <button
            type="button"
            onClick={() => { setPreview(''); onChange(''); }}
            className="absolute right-2 top-2 rounded-full bg-base/80 p-1.5 text-ink hover:text-accent"
          >
            <FiX size={14} />
          </button>
        </div>
      ) : (
        <label className="flex w-full max-w-xs cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border py-8 text-muted hover:border-accent/50">
          <FiUploadCloud size={20} />
          <span className="font-mono text-xs">
            {mutation.isPending ? 'uploading…' : 'click to upload'}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={mutation.isPending} />
        </label>
      )}
    </div>
  );
}
