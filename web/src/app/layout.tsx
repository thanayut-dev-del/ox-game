import { Link, Outlet } from 'react-router-dom';
import { useMe } from 'entities/user/model/useMe';
import LogoutButton from 'features/auth/logout/ui/LogoutButton';
export function AppLayout() {
  const { me } = useMe();
  return (
    <div className="container">
      <header className="header">
        <h2>OX Game</h2>
        <nav className="nav">
          <Link to="/">Play</Link>
          {me?.is_admin && <Link to="/admin">Leaderboard</Link>}
        </nav>
        {me ? (
          <div className="me">
            <img src={me.avatar} className="avatar" />
            <span>{me.name}</span>
            <LogoutButton />
          </div>
        ) : (
          <div />
        )}
      </header>
      <Outlet />
    </div>
  );
}
