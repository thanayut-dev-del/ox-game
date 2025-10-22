import { ReactNode, useEffect } from 'react';
import { useMe } from 'entities/user/model/useMe';
import { useLocation, useNavigate } from 'react-router-dom';
export function RequireAuth({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const { me } = useMe();
  const nav = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    if (me === null) {
      const t = setTimeout(() => {
        if (me === null) nav('/login', { replace: true, state: { from: loc.pathname } });
      }, 300);
      return () => clearTimeout(t);
    }
    if (adminOnly && me && !me.is_admin) {
      nav('/', { replace: true });
    }
  }, [me, adminOnly]);
  if (!me) return <p style={{ marginTop: 32 }}>Loading...</p>;
  if (adminOnly && !me.is_admin) return null;
  return <>{children}</>;
}
