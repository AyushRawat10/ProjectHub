import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      {/* ==================== NAVBAR ==================== */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            ProjectHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            <a
              href="#product"
              className="transition-colors hover:text-neutral"
            >
              Product
            </a>

            <a
              href="#workflow"
              className="transition-colors hover:text-neutral"
            >
              How it works
            </a>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <Link
              to="/login"
              className="rounded-md border border-line px-3 py-2 transition-colors hover:bg-secondary/40 sm:px-4"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="rounded-md bg-primary px-3 py-2 text-secondary transition-colors hover:bg-tertiary sm:px-4"
            >
              <span className="hidden sm:inline">Create account</span>
              <span className="sm:hidden">Sign up</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ==================== HERO ==================== */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-14 sm:px-6 sm:pt-16 lg:grid-cols-2 lg:gap-12">
          {/* Hero Content */}
          <div className="min-w-0">
            <p className="mb-3 text-sm font-medium text-primary">
              For small development teams
            </p>

            <h1 className="max-w-[18ch] font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              One workspace for projects, tasks, and the conversation around
              them.
            </h1>

            <p className="mt-5 mb-7 max-w-[44ch] text-base leading-7 text-muted sm:text-lg">
              Create a project, bring your team in, assign the work, and track
              it from open to done — with comments living right on the task,
              not scattered across other tools.
            </p>

            {/* Hero Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-tertiary sm:text-base"
              >
                Create your account
              </Link>

              <a
                href="#workflow"
                className="rounded-md border border-line px-5 py-2.5 text-sm transition-colors hover:bg-secondary/40 sm:text-base"
              >
                See how it works
              </a>
            </div>

            <p className="mt-4 max-w-[55ch] text-sm leading-6 text-muted">
              Free during V1. No integrations to configure — projects, tasks,
              and comments, working the way they should.
            </p>
          </div>

          {/* ==================== PRODUCT PREVIEW ==================== */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              {/* Project Header */}
              <div className="flex items-center justify-between border-b border-line px-4 py-3 text-sm">
                <strong className="font-semibold">
                  Website Redesign
                </strong>

                <span className="shrink-0 text-muted">
                  4 members
                </span>
              </div>

              {/* Board Scroll Area */}
              <div className="overflow-x-auto">
                <div className="flex min-w-[680px]">
                  {/* TODO */}
                  <div className="w-[170px] shrink-0 border-r border-line p-3">
                    <BoardColumnTitle title="TODO" />

                    <TaskPreview
                      title="Draft onboarding copy"
                      priority="MEDIUM"
                      assignee="Unassigned"
                    />

                    <TaskPreview
                      title="Set up staging DB"
                      priority="HIGH"
                      assignee="Ankit"
                      priorityClass="border-primary text-primary"
                    />
                  </div>

                  {/* IN PROGRESS */}
                  <div className="w-[170px] shrink-0 border-r border-line p-3">
                    <BoardColumnTitle title="IN PROGRESS" />

                    <TaskPreview
                      title="Fix refresh token rotation"
                      priority="URGENT"
                      assignee="Rahul"
                      priorityClass="border-secondary bg-secondary text-tertiary font-semibold"
                    />
                  </div>

                  {/* IN REVIEW */}
                  <div className="w-[170px] shrink-0 border-r border-line p-3">
                    <BoardColumnTitle title="IN REVIEW" />

                    <TaskPreview
                      title="Members list pagination"
                      priority="LOW"
                      assignee="Ayush"
                    />
                  </div>

                  {/* DONE */}
                  <div className="w-[170px] shrink-0 p-3">
                    <BoardColumnTitle title="DONE" />

                    <div className="mb-2 rounded-md border border-line bg-paper p-2.5 text-[13px]">
                      <div className="mb-2 font-medium">
                        Email verification flow
                      </div>

                      <div className="text-[11px] text-muted">
                        Due Sep 20
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small explanation below preview */}
            <p className="mt-3 text-center text-xs text-muted">
              Projects, tasks, members, and comments in one workspace.
            </p>
          </div>
        </section>

        {/* ==================== PRODUCT ==================== */}
        <section
          id="product"
          className="border-t border-line/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 max-w-[52ch]">
              <p className="mb-2 text-sm font-medium text-primary">
                What's actually in V1
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Built around one clean workflow — project, members, tasks,
                comments.
              </h2>

              <p className="mt-3 text-muted">
                No dashboards for things that don't exist yet. Just the parts
                your team will use every day.
              </p>
            </div>

            <div className="grid border-t border-line md:grid-cols-3">
              <Feature
                title="Projects & members"
                description="Create a project and add the people already on ProjectHub. Owners manage membership; everyone with access can see who's on the team."
              />

              <Feature
                title="Tasks that hold real state"
                description="Every task carries a status, a priority, an assignee, and a due date. Search, filter, and sort the work your team needs to complete."
              />

              <Feature
                title="Comments on the task itself"
                description="Discussion happens where the work is. Anyone with project access can comment, keeping the conversation connected to the actual task."
              />
            </div>
          </div>
        </section>

        {/* ==================== WORKFLOW ==================== */}
        <section
          id="workflow"
          className="border-t border-line/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-primary">
                Getting started
              </p>

              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                From sign-up to your first comment.
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-panel">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                <WorkflowStep
                  number="01"
                  title="Register"
                  description="Name, email, password"
                />

                <WorkflowStep
                  number="02"
                  title="Verify email"
                  description="6-digit code"
                />

                <WorkflowStep
                  number="03"
                  title="Log in"
                  description="Session starts"
                />

                <WorkflowStep
                  number="04"
                  title="Create a project"
                  description="You're the owner"
                />

                <WorkflowStep
                  number="05"
                  title="Add tasks"
                  description="Assign & comment"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== MEMBERS + COMMENTS ==================== */}
        <section className="border-t border-line/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
            {/* Members */}
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                Project members
              </p>

              <h2 className="mb-5 font-display text-2xl font-semibold sm:text-3xl">
                Everyone knows who's on the project.
              </h2>

              <div className="divide-y divide-line rounded-xl border border-line bg-panel px-5">
                <Member
                  name="Ayush Rawat"
                  initials="AR"
                  role="Owner"
                />

                <Member
                  name="Rahul"
                  initials="RH"
                  role="Joined Sep 20"
                />

                <Member
                  name="Ankit"
                  initials="AN"
                  role="Joined Sep 21"
                />
              </div>
            </div>

            {/* Comments */}
            <div>
              <p className="mb-2 text-sm font-medium text-primary">
                Task detail
              </p>

              <h2 className="mb-5 font-display text-2xl font-semibold sm:text-3xl">
                Comments stay with the work.
              </h2>

              <div className="divide-y divide-line rounded-xl border border-line bg-panel px-5">
                <Comment
                  name="Ayush Rawat"
                  time="2 hours ago"
                  text="Completed the API integration — ready for review."
                />

                <Comment
                  name="Rahul"
                  time="1 hour ago"
                  text="I'll test it today."
                  actions
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CTA ==================== */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-tertiary px-6 py-10 text-secondary sm:px-9 sm:py-11">
            <div>
              <h2 className="max-w-[20ch] font-display text-3xl font-semibold sm:text-4xl">
                Give your team one place to plan and track the work.
              </h2>

              <p className="mt-3 max-w-[38ch] text-sm leading-6 text-[#cfe0da] sm:text-base">
                Set up your first project in a couple of minutes — no
                configuration required.
              </p>
            </div>

            <Link
              to="/register"
              className="shrink-0 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-tertiary transition-opacity hover:opacity-90 sm:text-base"
            >
              Create your account
            </Link>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 ProjectHub</span>

          <span>Projects · Tasks · Members · Comments</span>
        </div>
      </footer>
    </div>
  );
};

/* ============================================================
   REUSABLE COMPONENTS
   ============================================================ */

type BoardColumnTitleProps = {
  title: string;
};

const BoardColumnTitle = ({
  title,
}: BoardColumnTitleProps) => {
  return (
    <h4 className="mb-3 text-xs font-semibold tracking-wide text-muted">
      {title}
    </h4>
  );
};

type TaskPreviewProps = {
  title: string;
  priority: string;
  assignee: string;
  priorityClass?: string;
};

const TaskPreview = ({
  title,
  priority,
  assignee,
  priorityClass = "border-line",
}: TaskPreviewProps) => {
  return (
    <div className="mb-2 rounded-md border border-line bg-paper p-2.5 text-[13px]">
      <div className="mb-2 font-medium leading-5">
        {title}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
        <span
          className={`rounded-full border px-2 py-0.5 ${priorityClass}`}
        >
          {priority}
        </span>

        <span>{assignee}</span>
      </div>
    </div>
  );
};

type FeatureProps = {
  title: string;
  description: string;
};

const Feature = ({
  title,
  description,
}: FeatureProps) => {
  return (
    <div className="border-b border-line py-7 transition-colors hover:bg-secondary/10 md:border-r md:px-7 md:last:border-r-0">
      <h3 className="mb-2 font-display text-lg font-semibold">
        {title}
      </h3>

      <p className="text-[15px] leading-6 text-muted">
        {description}
      </p>
    </div>
  );
};

type WorkflowStepProps = {
  number: string;
  title: string;
  description: string;
};

const WorkflowStep = ({
  number,
  title,
  description,
}: WorkflowStepProps) => {
  return (
    <div className="border-b border-line p-5 last:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="mb-3 text-xs font-semibold text-primary">
        {number}
      </div>

      <div className="font-display font-semibold">
        {title}
      </div>

      <div className="mt-1 text-xs text-muted">
        {description}
      </div>
    </div>
  );
};

type MemberProps = {
  name: string;
  initials: string;
  role: string;
};

const Member = ({
  name,
  initials,
  role,
}: MemberProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-secondary">
          {initials}
        </span>

        <span className="truncate text-sm">
          {name}
        </span>
      </span>

      <span className="shrink-0 text-xs text-muted">
        {role}
      </span>
    </div>
  );
};

type CommentProps = {
  name: string;
  time: string;
  text: string;
  actions?: boolean;
};

const Comment = ({
  name,
  time,
  text,
  actions = false,
}: CommentProps) => {
  return (
    <div className="py-4">
      <div>
        <span className="text-[13px] font-semibold">
          {name}
        </span>

        <span className="ml-2 text-xs text-muted">
          {time}
        </span>
      </div>

      <p className="mt-1.5 text-sm leading-6">
        {text}
      </p>

      {actions && (
        <div className="mt-2 text-xs font-medium text-primary">
          Edit · Delete
        </div>
      )}
    </div>
  );
};

export default Home;