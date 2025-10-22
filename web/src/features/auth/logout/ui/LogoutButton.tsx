import Button from 'shared/ui/Button';
import { api } from 'shared/api';
export default function LogoutButton() {
  const onClick = async () => {
    await api.post('/auth/logout');
    location.href = '/login';
  };
  return <Button onClick={onClick}>Logout</Button>;
}
