import { useState } from 'react';
export function useRestart() {
  const [resetKey, setResetKey] = useState(0);
  const restart = () => setResetKey((v) => v + 1);
  return { resetKey, restart };
}
