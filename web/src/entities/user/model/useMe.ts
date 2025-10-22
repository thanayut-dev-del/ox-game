import { useEffect, useState } from 'react';
import { api } from 'shared/api';
export type Me = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  is_admin: boolean;
} | null;
let cache: Me = null;
export function useMe() {
  const [me, setMe] = useState<Me>(cache);
  useEffect(() => {
    let m = true;
    api
      .get('/api/me')
      .then((r) => {
        cache = r.data;
        if (m) setMe(r.data);
      })
      .catch(() => {
        cache = null;
        if (m) setMe(null);
      });
    return () => {
      m = false;
    };
  }, []);
  return {
    me,
    reload: async () => {
      const r = await api.get('/api/me').catch(() => ({ data: null }) as any);
      cache = r.data;
      setMe(cache);
      return cache;
    },
  };
}
