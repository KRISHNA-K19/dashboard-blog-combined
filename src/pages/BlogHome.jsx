import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost } from '../api/posts';
import { useToast } from '../components/ToastProvider';
import { CardSkeleton } from '../components/Skeleton';

export default function BlogHome() {
  const qc = useQueryClient();
  const toast = useToast();

  const { data: posts, isLoading, isError } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

  const delMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (_, id) => {
      try { const { removeLocalPost } = require('../lib/localPosts'); removeLocalPost(id); } catch (e) {}
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.setQueryData({ queryKey: ['posts'] }, (old) => (old || []).filter((p) => String(p.id) !== String(id)));
      qc.removeQueries({ queryKey: ['post', id] });
      try { const { trackEvent } = require('../lib/analytics'); trackEvent('post_deleted', { id }, import.meta.env.VITE_GA_MEASUREMENT_ID); } catch (e) {}
      toast.success('Post deleted');
    },
    onError: () => toast.error('Failed to delete post')
  });

  if (isLoading) return (
    <div className="space-y-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Link to="/blog/create" className="px-3 py-2 border rounded-md">Create Post</Link>
      </div>

      <ul className="space-y-4">
        {(posts || []).map((p) => (
          <motion.li key={p.id} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 250, damping: 22 }} className="p-3 bg-white border rounded-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={p.imageUrl} alt={p.title} className="w-28 h-16 rounded-md object-cover flex-shrink-0 mr-3" />
              <div>
                <Link to={`/blog/${p.id}`} className="text-brand font-medium block">{p.title}</Link>
                <div className="text-sm text-muted mt-1">{p.body?.slice(0, 120)}{p.body && p.body.length > 120 ? '…' : ''}</div>
              </div>
              {p.__local && (
                <span title="Local (not persisted remotely)" role="img" aria-label="Local (not persisted remotely)" className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800 ml-3">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                  Local
                </span>
              )}
            </div>
            <div>
              <button onClick={() => delMutation.mutate(p.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
} 
