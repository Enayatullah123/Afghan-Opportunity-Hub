export const AUTH_KEY = 'admin_auth_v1';
export const POSTS_KEY = 'admin_posts_v1';
export const MESSAGES_KEY = 'admin_messages_v1';
export const ADMIN_USER_KEY = 'admin_user_v1';
export const RESET_TOKENS_KEY = 'admin_reset_tokens_v1';
export const CONTACT_KEY = 'admin_contact_v1';

export function loginUser(email, password) {
  // UI-only login: verify admin credentials if set
  const admin = getAdminUser();
  if (admin) {
    if (!verifyAdminPassword(email, password)) return null;
  }
  const payload = { email, token: `local-${Date.now()}` };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  return payload;
}

// Admin user helpers (simple client-side storage)
export function getAdminUser() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_USER_KEY));
  } catch (e) {
    return null;
  }
}

export function setAdminUser(email, password) {
  // store a rudimentary hashed password (not secure; replace with real backend later)
  const hash = btoa(password);
  const user = { email, passwordHash: hash, createdAt: new Date().toISOString() };
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  return user;
}

export function verifyAdminPassword(email, password) {
  const admin = getAdminUser();
  if (!admin) return true; // if no admin set, allow login
  if (admin.email !== email) return false;
  return admin.passwordHash === btoa(password);
}

// Reset tokens (simulate email reset)
export function createResetToken(email, ttlMinutes = 30) {
  const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  const token = `${Math.random().toString(36).slice(2)}-${Date.now()}`;
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;
  tokens.push({ token, email, expiresAt });
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));
  return token;
}

export function verifyResetToken(token) {
  const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  const t = tokens.find(x => x.token === token);
  if (!t) return null;
  if (Date.now() > t.expiresAt) return null;
  return t.email;
}

export function consumeResetToken(token) {
  const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  const remaining = tokens.filter(x => x.token !== token);
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(remaining));
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(AUTH_KEY);
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (e) {
    return null;
  }
}

// Posts handling
export function getPosts() {
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function savePost(post) {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  return posts;
}

export function updatePost(id, newData) {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === id);
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...newData, updatedAt: new Date().toISOString() };
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  }
  return posts;
}

export function deletePost(id) {
  const posts = getPosts().filter(p => p.id !== id);
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  return posts;
}

export function fetchPostsByType(type) {
  return getPosts().filter(p => p.type === type);
}

// Messages handling
export function getMessages() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function saveMessage(msg) {
  const messages = getMessages();
  const m = { id: msg.id || Date.now(), ...msg, status: msg.status || 'pending', createdAt: new Date().toISOString() };
  messages.unshift(m);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  return messages;
}

export function updateMessage(id, newData) {
  const messages = getMessages();
  const idx = messages.findIndex(m => m.id === id);
  if (idx !== -1) {
    messages[idx] = { ...messages[idx], ...newData };
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  }
  return messages;
}

export function deleteMessage(id) {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  return messages;
}

// Resources handling (using posts with type: 'resource')
export function getResources() {
  return fetchPostsByType('resource');
}

export function addResource(resource) {
  const post = {
    id: resource.id || Date.now(),
    type: 'resource',
    title: { en: resource.title || '' },
    description: { en: resource.description || '' },
    shortDescription: resource.shortDescription || '',
    category: resource.category || 'guide',
    fileUrl: resource.fileUrl || '',
    fileName: resource.fileName || '',
    fileSize: resource.fileSize || '',
    createdAt: resource.createdAt || new Date().toISOString(),
  };
  return savePost(post);
}

export function updateResource(id, newData) {
  const resources = getResources();
  const idx = resources.findIndex(r => r.id === id);
  if (idx !== -1) {
    const updated = {
      ...resources[idx],
      title: { en: newData.title || resources[idx].title?.en || '' },
      description: { en: newData.description || resources[idx].description?.en || '' },
      shortDescription: newData.shortDescription || resources[idx].shortDescription || '',
      category: newData.category || resources[idx].category,
      fileUrl: newData.fileUrl || resources[idx].fileUrl,
      fileName: newData.fileName || resources[idx].fileName || '',
      fileSize: newData.fileSize || resources[idx].fileSize || '',
    };
    return updatePost(id, updated);
  }
  return resources;
}

export function deleteResource(id) {
  return deletePost(id);
}

// Learn Hub management (type: 'learn')
export function getLearnItems() {
  return fetchPostsByType('learn');
}

// Contact settings (admin-controlled contact info)
export function getContactSettings() {
  try {
    return JSON.parse(localStorage.getItem(CONTACT_KEY)) || {};
  } catch (e) {
    return {};
  }
}

export function saveContactSettings(settings) {
  const payload = {
    email: settings.email || '',
    facebookUrl: settings.facebookUrl || '',
    youtubeUrl: settings.youtubeUrl || '',
    location: settings.location || '',
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONTACT_KEY, JSON.stringify(payload));
  try { window.dispatchEvent(new Event('dataUpdated')); } catch (e) {}
  return payload;
}

// File upload helpers for resources
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateFile(file) {
  if (!file) return { valid: false, error: 'No file selected' };
  
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF, DOC, and DOCX files are allowed' };
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  return { valid: true };
}

export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file selected' };
  
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPG, JPEG, WEBP, and GIF images are allowed' };
  }
  
  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image size must be less than 5MB' };
  }
  
  return { valid: true };
}

export function getFileExtension(fileName) {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getFileNameFromBase64(base64String) {
  // Extract MIME type
  const mimeMatch = base64String.match(/^data:(.+?);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  
  let ext = 'bin';
  if (mimeType === 'application/pdf') ext = 'pdf';
  if (mimeType === 'application/msword') ext = 'doc';
  if (mimeType.includes('wordprocessingml')) ext = 'docx';
  
  return `resource-${Date.now()}.${ext}`;
}

// Portfolio management (type: 'portfolio')
export function getPortfolios() {
  return fetchPostsByType('portfolio');
}

export function addPortfolio(p) {
  const post = {
    id: p.id || Date.now(),
    type: 'portfolio',
    title: { en: p.title || '' },
    category: p.category || 'Web',
    description: { en: p.description || '' },
    image: p.image || '',
    projectLink: p.projectLink || '',
    createdAt: p.createdAt || new Date().toISOString(),
  };
  return savePost(post);
}

export function updatePortfolio(id, newData) {
  const portfolios = getPortfolios();
  const idx = portfolios.findIndex(p => p.id === id);
  if (idx !== -1) {
    const updated = {
      ...portfolios[idx],
      title: { en: newData.title || portfolios[idx].title?.en || '' },
      category: newData.category || portfolios[idx].category,
      description: { en: newData.description || portfolios[idx].description?.en || '' },
      image: newData.image || portfolios[idx].image || '',
      projectLink: newData.projectLink || portfolios[idx].projectLink || '',
    };
    return updatePost(id, updated);
  }
  return portfolios;
}

export function deletePortfolio(id) {
  return deletePost(id);
}

// Reviews management (type: 'review')
export function getReviews() {
  return fetchPostsByType('review');
}

export function addReview(r) {
  const post = {
    id: r.id || Date.now(),
    type: 'review',
    name: r.name || '',
    rating: r.rating || 5,
    comment: r.comment || '',
    status: r.status || 'pending', // pending, approved, rejected
    createdAt: r.createdAt || new Date().toISOString(),
  };
  return savePost(post);
}

export function updateReview(id, newData) {
  const reviews = getReviews();
  const idx = reviews.findIndex(r => r.id === id);
  if (idx !== -1) {
    const updated = { ...reviews[idx], ...newData };
    return updatePost(id, updated);
  }
  return reviews;
}

export function deleteReview(id) {
  return deletePost(id);
}

