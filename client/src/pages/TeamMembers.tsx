import { useMemo, useState } from "react";
import { Link } from "react-router";
import AppHeader from "../components/layouts/AppHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

type Role = "ADMIN" | "LEADER" | "MEMBER";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  projects: string[];
  tasks: number;
  avatar: string;
  joined: string;
};

const members: Member[] = [
  {
    id: "1",
    name: "Ayush Rawat",
    email: "ayush@example.com",
    role: "ADMIN",
    projects: ["ProjectHub", "DevPulse"],
    tasks: 18,
    avatar: "AR",
    joined: "Jan 12, 2026",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    role: "LEADER",
    projects: ["ProjectHub"],
    tasks: 14,
    avatar: "RK",
    joined: "Feb 04, 2026",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "MEMBER",
    projects: ["ProjectHub", "DevPulse"],
    tasks: 9,
    avatar: "PS",
    joined: "Mar 18, 2026",
  },
  {
    id: "4",
    name: "Arjun Singh",
    email: "arjun@example.com",
    role: "MEMBER",
    projects: ["ProjectHub"],
    tasks: 7,
    avatar: "AS",
    joined: "Apr 02, 2026",
  },
  {
    id: "5",
    name: "Neha Verma",
    email: "neha@example.com",
    role: "LEADER",
    projects: ["DevPulse"],
    tasks: 11,
    avatar: "NV",
    joined: "Apr 21, 2026",
  },
  {
    id: "6",
    name: "Karan Mehta",
    email: "karan@example.com",
    role: "MEMBER",
    projects: ["DevPulse"],
    tasks: 6,
    avatar: "KM",
    joined: "May 09, 2026",
  },
];

const roleStyles: Record<Role, string> = {
  ADMIN: "!bg-primary !text-secondary",
  LEADER: "!bg-secondary !text-neutral",
  MEMBER: "!bg-tertiary !text-secondary",
};

function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      variant="default"
      className={`px-3 py-1 text-xs font-semibold tracking-wide ${roleStyles[role]}`}
    >
      {role}
    </Badge>
  );
}

function MemberAvatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-secondary">
      {initials}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const TeamMembers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | Role>("ALL");

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.projects.some((project) =>
          project.toLowerCase().includes(query),
        );

      const matchesRole =
        roleFilter === "ALL" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  const adminCount = members.filter(
    (member) => member.role === "ADMIN",
  ).length;

  const leaderCount = members.filter(
    (member) => member.role === "LEADER",
  ).length;

  const memberCount = members.filter(
    (member) => member.role === "MEMBER",
  ).length;

  return (
    <div className="min-h-screen bg-paper text-neutral">
      <AppHeader pageTitle="Team Members" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-muted">
          <Link to="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>

          <span>/</span>

          <span className="font-medium text-neutral">Team Members</span>
        </div>

        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Workspace
            </p>

            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Team Members
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Manage your team, roles, projects, and member activity from one
              place.
            </p>
          </div>

          <Button
            className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white sm:w-auto"
          >
            <UserPlusIcon />
            Invite Member
          </Button>
        </section>

        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Total Members
            </p>
            <p className="font-display mt-2 text-3xl font-semibold">
              {members.length}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Admins
            </p>
            <p className="font-display mt-2 text-3xl font-semibold">
              {adminCount}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Leaders
            </p>
            <p className="font-display mt-2 text-3xl font-semibold">
              {leaderCount}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Members
            </p>
            <p className="font-display mt-2 text-3xl font-semibold">
              {memberCount}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-panel shadow-sm">
          <div className="flex flex-col gap-4 border-b border-line p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted">
                <SearchIcon />
              </div>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search members, email or project..."
                className="w-full rounded-lg border border-line bg-paper py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:w-auto">
              {(["ALL", "ADMIN", "LEADER", "MEMBER"] as const).map(
                (role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRoleFilter(role)}
                    className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-medium transition ${
                      roleFilter === role
                        ? "bg-primary text-secondary"
                        : "border border-line bg-paper text-muted hover:text-primary"
                    }`}
                  >
                    {role === "ALL" ? "All Roles" : role}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-0">
              <thead>
                <tr className="border-b border-line bg-paper/60 text-left">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                    Member
                  </th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                    Projects
                  </th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                    Tasks
                  </th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-muted">
                    Joined
                  </th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>

              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-line last:border-0 hover:bg-paper/50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <MemberAvatar initials={member.avatar} />

                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="mt-1 text-xs text-muted">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <RoleBadge role={member.role} />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {member.projects.map((project) => (
                          <Badge
                            key={project}
                            variant="default"
                            className="rounded-lg px-2.5 py-1 text-xs font-medium text-neutral"
                          >
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm font-medium">
                      {member.tasks}
                    </td>

                    <td className="px-6 py-5 text-sm text-muted">
                      {member.joined}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        aria-label={`More options for ${member.name}`}
                        className="rounded-lg p-2 text-muted transition hover:bg-secondary/50 hover:text-neutral"
                      >
                        <MoreIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 lg:hidden">
            {filteredMembers.map((member) => (
              <article
                key={member.id}
                className="rounded-lg border border-line bg-paper p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <MemberAvatar initials={member.avatar} />

                    <div className="min-w-0">
                      <h2 className="truncate font-medium">{member.name}</h2>
                      <p className="truncate text-xs text-muted">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${member.name}`}
                    className="shrink-0 rounded-lg p-2 text-muted hover:bg-secondary/50"
                  >
                    <MoreIcon />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <RoleBadge role={member.role} />

                  <span className="text-xs font-medium text-muted">
                    {member.tasks} tasks
                  </span>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                    Projects
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {member.projects.map((project) => (
                      <Badge
                        key={project}
                        variant="default"
                        className="rounded-lg px-2.5 py-1 text-xs font-medium text-neutral"
                      >
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
                  <span className="text-muted">Joined {member.joined}</span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-medium text-primary"
                  >
                    View
                    <ArrowRightIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                <SearchIcon />
              </div>

              <h2 className="mt-4 font-display text-lg font-semibold">
                No members found
              </h2>

              <p className="mt-2 text-sm text-muted">
                Try changing your search or role filter.
              </p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-line bg-secondary/40 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display font-semibold">Manage your workspace</h2>

              <p className="mt-1 text-sm leading-6 text-muted">
                Assign roles carefully. Admins manage the workspace, leaders
                manage projects, and members work on assigned tasks.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:text-tertiary"
            >
              Back to Dashboard
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamMembers;
