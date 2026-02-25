export { isJwtExpired } from '@/stores/authStore';

export function isSessionExpired(): boolean {
  const { useAuthStore, isJwtExpired } = require('@/stores/authStore');
  const token = useAuthStore.getState().token ?? (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  if (!token) return true;
  return isJwtExpired(token);
}
