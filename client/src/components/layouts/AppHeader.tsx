import { Link } from "react-router";

type AppHeaderProps = {
  pageTitle?: string;
};

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export default function AppHeader({
  pageTitle = "Dashboard",
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          ProjectHub
        </Link>

        {/* Workspace */}
        <div className="hidden items-center gap-2 text-sm text-muted md:flex">
          <span>My Workspace</span>

          <ChevronRightIcon />

          <span className="font-medium text-neutral">
            {pageTitle}
          </span>
        </div>

        {/* Search */}
        <div className="hidden w-64 lg:block">
          <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-panel px-3 text-sm text-muted">
            <SearchIcon />

            <span>Search tasks, projects...</span>

            <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[10px]">
              ⌘K
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/team-members"
            className="hidden rounded-lg border border-line px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/40 sm:block"
          >
            Invite Members
          </Link>

          <Link
            to="/settings"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary transition-colors hover:bg-tertiary"
            aria-label="Account"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}