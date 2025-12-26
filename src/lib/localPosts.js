const LS_KEY = 'dashboard_blog_local_posts';

export function getLocalPosts() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read local posts', err);
    return [];
  }
}

export function saveLocalPosts(posts) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save local posts', err);
  }
}

export function addLocalPost(post) {
  const posts = getLocalPosts();
  // ensure local flag for generated ids
  const entry = { ...post };
  if (entry.__local === undefined) {
    if (String(entry.id).includes('-') || isNaN(Number(entry.id))) entry.__local = true;
  }
  // generate a placeholder image if none provided
  if (!entry.imageUrl) {
    entry.imageUrl = `https://picsum.photos/seed/${entry.id}/800/450`;
  }
  // avoid duplicates by id
  const exists = posts.find((p) => String(p.id) === String(entry.id));
  const newPosts = exists ? posts.map((p) => (String(p.id) === String(entry.id) ? entry : p)) : [entry, ...posts];
  saveLocalPosts(newPosts);
  return entry;
}

export function removeLocalPost(id) {
  const posts = getLocalPosts();
  const newPosts = posts.filter((p) => String(p.id) !== String(id));
  saveLocalPosts(newPosts);
  return newPosts;
}

export function findLocalPost(id) {
  const posts = getLocalPosts();
  return posts.find((p) => String(p.id) === String(id));
}

export function generateLocalId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
