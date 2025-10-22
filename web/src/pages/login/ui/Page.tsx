import GoogleLoginButton from 'features/auth/login/ui/GoogleLoginButton';
export default function LoginPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h3>Sign in to play</h3>
      <GoogleLoginButton />
    </div>
  );
}
