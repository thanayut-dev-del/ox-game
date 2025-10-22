export default function GoogleLoginButton() {
  const href = 'http://localhost:4000/auth/google';
  return (
    <a href={href}>
      <button>Login with Google</button>
    </a>
  );
}
