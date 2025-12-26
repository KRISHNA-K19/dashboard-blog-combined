import api from '../lib/apiClient';
import { getLocalPosts, addLocalPost, removeLocalPost, findLocalPost, generateLocalId } from '../lib/localPosts';

export const fetchPosts = async () => {
  const { data } = await api.get('/posts');
  const local = getLocalPosts();
  // merge local posts first and avoid duplicates
  const ids = new Set(local.map((p) => String(p.id)));
  const merged = [...local, ...data.filter((p) => !ids.has(String(p.id)))];
  // ensure every post has an imageUrl (use picsum seed by id)
  return merged.map((p) => ({ ...p, imageUrl: p.imageUrl || `https://picsum.photos/seed/${p.id}/600/360` }));
};

export const fetchPostById = async (id) => {
  // Prefer local copy first (covers locally-created posts)
  const local = findLocalPost(id);
  if (local) return local;

  // Attempt remote fetch, but if it 404s (or errors) try local again before failing
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (err) {
    const fallback = findLocalPost(id);
    if (fallback) return fallback;
    throw err;
  }
};

export const createPost = async (payload) => {
  try {
    const { data } = await api.post('/posts', payload);
    // Ensure imageUrl present and persist a local copy so refresh/navigation works
    const withImage = { ...data, imageUrl: data.imageUrl || payload.imageUrl || `https://picsum.photos/seed/${data.id}/800/450` };
    try { addLocalPost(withImage); } catch (e) { /* ignore */ }
    return withImage;
  } catch (err) {
    // fallback: create a local-only post if API fails
    const fallback = { ...payload, id: generateLocalId(), __local: true, imageUrl: payload.imageUrl || `https://picsum.photos/seed/${generateLocalId()}/800/450` };
    addLocalPost(fallback);
    return fallback;
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await api.delete(`/posts/${id}`);
    // remove local copy if present
    removeLocalPost(id);
    return data;
  } catch (err) {
    // If API delete fails (e.g., remote doesn't exist), still remove locally
    removeLocalPost(id);
    return { success: true };
  }
};