import { Link } from "react-router";

const Register = () => {
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
            <Link
              to="/login"
              className="transition-colors hover:text-neutral"
            >
              Sign In
            </Link>

            <span className="font-medium text-neutral">
              Create Account
            </span>

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
      <main>
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          {/* Page label */}
          <div className="mb-4 flex w-full max-w-md items-center justify-between text-xs">
            <span className="flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 font-medium tracking-wide text-tertiary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              PROJECTHUB ACCOUNT
            </span>

            <span className="hidden text-muted sm:block">
              Create your workspace account
            </span>
          </div>

          {/* ==================== REGISTER CARD ==================== */}
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_12px_35px_rgba(2,61,61,0.08)]">
            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 text-primary">
                <UserPlusIcon />
              </div>

              {/* Heading */}
              <div className="mb-7">
                <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Create your ProjectHub account
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Start organizing your projects, tasks, and team workflows
                  in one place.
                </p>
              </div>

              {/* ==================== FORM ==================== */}
              <form className="space-y-5">
                {/* Full Name */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium"
                    >
                      Full Name
                    </label>

                    <span className="text-xs text-muted">
                      Required
                    </span>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      <UserIcon />
                    </span>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="h-11 w-full rounded-lg border border-line bg-paper pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

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

                    <span className="text-xs text-muted">
                      Min 8 characters
                    </span>
                  </div>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                      <LockIcon />
                    </span>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      className="h-11 w-full rounded-lg border border-line bg-paper pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-neutral"
                      aria-label="Show password"
                    >
                      <EyeIcon />
                    </button>
                  </div>

                  {/* Password strength */}
                  <div className="mt-2">
                    <div className="flex gap-1.5">
                      <span className="h-1 flex-1 rounded-full bg-line" />
                      <span className="h-1 flex-1 rounded-full bg-line" />
                      <span className="h-1 flex-1 rounded-full bg-line" />
                      <span className="h-1 flex-1 rounded-full bg-line" />
                    </div>

                    <div className="mt-1.5 flex justify-between text-[11px] text-muted">
                      <span>Enter password</span>
                      <span>Password strength</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs leading-5 text-muted">
                  By creating an account, you agree to ProjectHub's{" "}
                  <a
                    href="#terms"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="font-medium text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
                >
                  Create ProjectHub Account

                  <ArrowRightIcon />
                </button>
              </form>
            </div>

            {/* Login footer */}
            <div className="border-t border-line bg-secondary/20 px-6 py-4 text-center text-sm text-muted sm:px-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* ==================== ACCOUNT INFO ==================== */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <MailCheckIcon />
              Email verification
            </span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span className="flex items-center gap-1.5">
              <ShieldIcon />
              Secure account
            </span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span className="font-medium text-primary">
              ProjectHub V1
            </span>
          </div>

          {/* Verification explanation */}
          <p className="mt-3 max-w-md text-center text-xs leading-5 text-muted">
            After registration, we'll send a verification code to your email
            before you can access your ProjectHub workspace.
          </p>
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

const UserPlusIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.6-3.4 2.5-5.2 5.5-5.2s4.9 1.8 5.5 5.2" />
      <path d="M18 8v6" />
      <path d="M15 11h6" />
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

const EyeIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2.5" />
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

const MailCheckIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
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
      <path d="m16 15 1.5 1.5L20 14" />
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

export default Register;