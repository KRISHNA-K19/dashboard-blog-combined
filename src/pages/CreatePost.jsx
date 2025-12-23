import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import { useToast } from '../components/ToastProvider';
import { trackEvent } from '../lib/analytics';
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const qc = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: (data) => {
      // ensure local copy exists and sync cache so detail/list pages show the created post
      try { const { addLocalPost } = require('../lib/localPosts'); addLocalPost(data); } catch (e) { /* ignore */ }
      qc.setQueryData({ queryKey: ['posts'] }, (old) => [data, ...(old || [])]);
      qc.setQueryData({ queryKey: ['post', data.id] }, data);
      qc.invalidateQueries({ queryKey: ['posts'] });
      try { trackEvent('post_created', { id: data.id, title: data.title }, MEASUREMENT_ID); } catch (e) {}
      toast.success('Post created');
      navigate(`/blog/${data.id}`, { state: { post: data } });
    },
    onError: () => toast.error('Failed to create post')
  });

  const submit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, body, userId: 1, imageUrl: imageUrl || undefined });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Create new post</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Title</label>
          <input className="w-full border rounded-md px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
        </div>
        <div>
          <label className="text-sm block mb-1">Body</label>
          <textarea className="w-full border rounded-md px-3 py-2" value={body} onChange={(e) => setBody(e.target.value)} rows={6} required />
        </div>
        <div>
          <label className="text-sm block mb-1">Image URL (optional)</label>
          <input className="w-full border rounded-md px-3 py-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... (leave blank for auto image)" />
        </div>
        <div className="flex items-center space-x-2">
          <button type="submit" className="px-4 py-2 bg-brand text-white rounded-md">{mutation.isLoading ? 'Saving…' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
