import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../api/posts';

export default function PostDetail() {
  const { id } = useParams();
  const location = useLocation();
  const initial = location.state?.post;

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
    initialData: initial
  });

  if (isLoading) return (
    <div>
      <div className="w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-md mb-4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse" />
      </div>
    </div>
  );

  if (isError) {
    // Friendly message for 404s (not found) and a generic message otherwise
    const status = error?.response?.status;
    if (status === 404) return <div>Post not found.</div>;
    return <div>Failed to load post: {String(error)}</div>;
  }

  if (!post) return <div>Post not found.</div>;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 24 }}>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />}
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <span>{post.title}</span>
        {post.__local && (
          <span title="Local (not persisted remotely)" role="img" aria-label="Local (not persisted remotely)" className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            Local
          </span>
        )}
      </h1>
      <p className="text-slate-700 whitespace-pre-wrap">{post.body}</p>
    </motion.div>
  );
} 
