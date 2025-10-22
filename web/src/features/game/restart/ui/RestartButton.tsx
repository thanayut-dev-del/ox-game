import Button from 'shared/ui/Button';
export default function RestartButton({
  onClick,
  finished,
}: {
  onClick: () => void;
  finished: boolean;
}) {
  return <Button onClick={onClick}>{finished ? 'Play again' : 'Restart'}</Button>;
}
