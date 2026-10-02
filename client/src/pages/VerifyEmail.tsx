import { useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { verifyEmail, resendVerification } from "../services/auth.service";

const VerifyEmail = () => {
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await verifyEmail({
        email,
        code: otp,
      });

      setSuccess("Email verified successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Invalid or expired verification code."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value) || value.length > 1) {
      return;
    }

    const otpArray = otp.split("");
    
    otpArray[index] = value;

    const nextOtp = otpArray
      .slice(0, 6)
      .map((digit) => digit || "")
      .join("");

    setOtp(nextOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !event.currentTarget.value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      await resendVerification({ email });

      setSuccess("A new verification code has been sent.");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Unable to resend the verification code."
      );
    } finally {
      setIsResending(false);
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
            <Link to="/login" className="transition-colors hover:text-neutral">
              Sign In
            </Link>

            <Link
              to="/register"
              className="transition-colors hover:text-neutral"
            >
              Create Account
            </Link>

            <a href="#support" className="transition-colors hover:text-neutral">
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
          {/* Page labels */}
          <div className="mb-4 flex w-full max-w-lg items-center justify-center gap-2 text-xs">
            <span className="flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 font-medium tracking-wide text-tertiary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              EMAIL VERIFICATION
            </span>

            <span className="hidden rounded-full bg-panel px-3 py-1 text-muted sm:inline">
              6-DIGIT CODE
            </span>
          </div>

          {/* ==================== CARD ==================== */}
          <div className="w-full max-w-lg rounded-2xl border border-line bg-panel p-6 shadow-[0_12px_35px_rgba(2,61,61,0.08)] sm:p-8">
            {/* Icon */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/70 text-primary">
                <MailIcon />
              </div>

              <span className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2.5 py-1 text-xs text-muted">
                <ShieldIcon />
                Secure verification
              </span>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Verify your email address
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted">
                We've sent a 6-digit verification code to the email address you
                used to create your ProjectHub account.
              </p>

              {/* Email */}
              <div className="mt-3 inline-flex items-center rounded-md bg-secondary/50 px-2.5 py-1 text-sm font-medium text-tertiary">
                {email || "your email address"}
              </div>

              {/* Change email */}
              <p className="mt-3 text-sm text-muted">
                Wrong email address?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Change address
                </Link>
              </p>
            </div>

            {/* ==================== OTP ==================== */}
            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p className="mb-4 text-sm text-primary">
                {success}
              </p>
            )}

            <form 
              onSubmit={handleSubmit}
            >
              <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium tracking-wide">
                  Verification code
                </label>

                <span className="text-xs text-muted">6 digits</span>
              </div>

              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpRefs.current[index] = element;
                    }}
                    type="text"
                    value={otp[index] ?? ""}
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    aria-label={`Verification digit ${index + 1}`}
                    onChange={(event) => handleOtpChange(index, event)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    className="h-12 w-full rounded-lg border border-line bg-paper text-center font-display text-xl font-semibold outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Enter the code from your email
                </span>

                <span>6 digits required</span>
              </div>
              </div>

              {/* ==================== VERIFY BUTTON ==================== */}
              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6 || !email}
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-secondary transition-colors hover:bg-tertiary"
              >
                {isSubmitting ? "Verifying..." : "Verify Email & Continue"}
                <ArrowRightIcon />
              </button>
            </form>

            {/* ==================== RESEND ==================== */}
            <div className="mt-6 border-t border-line pt-5">
              <div className="text-center">
                <p className="text-sm text-muted">Didn't receive the code?</p>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="mt-1 text-sm font-semibold text-primary hover:underline"
                >
                  {isResending ? "Sending..." : "Resend verification code"}
                </button>
              </div>

              <div className="mt-4 rounded-lg bg-secondary/30 px-4 py-3 text-center text-xs leading-5 text-muted">
                Check your spam or junk folder if you don't see the email.
              </div>
            </div>

            {/* ==================== HELP ==================== */}
            <p className="mt-5 text-center text-xs leading-5 text-muted">
              If you're having trouble verifying your account, contact
              ProjectHub support.
            </p>
          </div>

          {/* ==================== SECURITY INFO ==================== */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldIcon />
              Secure authentication
            </span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span className="flex items-center gap-1.5">
              <MailCheckIcon />
              Email verification
            </span>

            <span className="hidden h-3 w-px bg-line sm:block" />

            <span className="font-medium text-primary">ProjectHub V1</span>
          </div>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-line bg-panel/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 ProjectHub. Projects · Tasks · Members · Comments</span>

          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-neutral">
              Privacy
            </a>

            <a href="#terms" className="hover:text-neutral">
              Terms
            </a>

            <a href="#support" className="hover:text-neutral">
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

const MailIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
      <path d="m16 15 1.5 1.5L20 14" />
    </svg>
  );
};

export default VerifyEmail;
