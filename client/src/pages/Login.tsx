import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-neutral">
      {/* ==================== HEADER ==================== */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            ProjectHub
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
            <span className="font-medium text-neutral">
              Sign In
            </span>

            <Link
              to="/register"
              className="transition-colors hover:text-neutral"
            >
              Create Account
            </Link>

            <a
              href="#support"
              className="transition-colors hover:text-neutral"
            >
              Support
            </a>
          </nav>

          {/* Account icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary">
            <UserIcon />
          </div>
        </div>
      </header>

      {/* ==================== MAIN ==================== */}
      <main className="min-h-[calc(100vh-4rem)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          {/* Small page label */}
          <div className="mb-4 flex w-full max-w-md items-center justify-between text-xs">
            <span className="flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 font-medium tracking-wide text-tertiary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              PROJECTHUB ACCOUNT
            </span>

            <span className="hidden text-muted sm:block">
              Workspace access
            </span>
          </div>

          {/* ==================== LOGIN CARD ==================== */}
          <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-[0_12px_35px_rgba(2,61,61,0.08)] sm:p-8">
            {/* Icon */}
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 text-primary">
              <LockIcon />
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Welcome back to ProjectHub
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted">
                Sign in to access your projects, tasks, team members, and
                conversations.
              </p>
            </div>

            {/* ==================== FORM ==================== */}
            <form 
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium"
                  >
                    Email
                  </label>

                  <span className="text-xs text-muted">
                    Required
                  </span>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                    <MailIcon />
                  </span>

                  <input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-lg border border-line bg-paper pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                    <LockIcon />
                  </span>

                  <input
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-lg border border-line bg-paper pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-line accent-primary"
                  />

                  <span>Remember me</span>
                </label>

                <span className="rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-tertiary">
                  Secure session
                </span>
              </div>

              {/* Submit */}
              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
              >
                {isSubmitting ? "Signing in..." : "Sign in to ProjectHub"}

                <ArrowRightIcon />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 h-px bg-line" />

            {/* Register */}
            <p className="text-center text-sm text-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* ==================== SECURITY INFO ==================== */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldIcon />
              Secure authentication
            </span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span>ProjectHub V1</span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span className="font-medium text-primary">
              Session protected
            </span>
          </div>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-line bg-panel/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © 2026 ProjectHub. Projects · Tasks · Members · Comments
          </span>

          <div className="flex gap-5">
            <a
              href="#privacy"
              className="hover:text-neutral"
            >
              Privacy
            </a>

            <a
              href="#terms"
              className="hover:text-neutral"
            >
              Terms
            </a>

            <a
              href="#support"
              className="hover:text-neutral"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ============================================================
   ICONS
   ============================================================ */

const UserIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c.7-3.3 3.1-5 6.5-5s5.8 1.7 6.5 5" />
    </svg>
  );
};

const LockIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
};

const ArrowRightIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
};

const ShieldIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

export default Login;