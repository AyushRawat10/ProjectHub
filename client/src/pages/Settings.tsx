import { useState } from "react";
import { Link } from "react-router";
import AppHeader from "../components/layouts/AppHeader";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

type SettingsSection = "profile" | "notifications" | "workspace" | "security";

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function WorkspaceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 4v16M3 9h5M3 15h5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
    </svg>
  );
}

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-primary" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

const Settings = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [projectNotifications, setProjectNotifications] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const sections = [
    {
      id: "profile" as const,
      label: "Profile",
      description: "Personal information",
      icon: <UserIcon />,
    },
    {
      id: "notifications" as const,
      label: "Notifications",
      description: "Notification preferences",
      icon: <BellIcon />,
    },
    {
      id: "workspace" as const,
      label: "Workspace",
      description: "Workspace preferences",
      icon: <WorkspaceIcon />,
    },
    {
      id: "security" as const,
      label: "Security",
      description: "Password and security",
      icon: <ShieldIcon />,
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-neutral">
      {/* Top bar */}
      <AppHeader pageTitle="Settings" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-muted">
          <Link to="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>

          <span>/</span>

          <span className="font-semibold text-neutral">Settings</span>
        </div>

        {/* Heading */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Preferences
          </p>

          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Manage your profile, workspace preferences, notifications, and
            account security.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="h-fit rounded-2xl border border-line bg-panel p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                  activeSection === section.id
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-secondary/50 hover:text-neutral"
                }`}
              >
                <span
                  className={
                    activeSection === section.id
                      ? "text-white"
                      : "text-primary"
                  }
                >
                  {section.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {section.label}
                  </span>

                  <span
                    className={`mt-0.5 block truncate text-xs ${
                      activeSection === section.id
                        ? "text-white/70"
                        : "text-muted"
                    }`}
                  >
                    {section.description}
                  </span>
                </span>
              </button>
            ))}

            <div className="my-2 border-t border-line" />

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-red-600 transition hover:bg-red-50"
            >
              <LogOutIcon />

              <span>
                <span className="block text-sm font-medium">Log out</span>
                <span className="mt-0.5 block text-xs text-red-500/70">
                  Sign out of your account
                </span>
              </span>
            </button>
          </aside>

          {/* Settings content */}
          <section className="min-w-0">
            {/* Profile */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-line bg-panel">
                  <div className="border-b border-line p-5 sm:p-6">
                    <h2 className="font-display text-xl font-semibold">Profile</h2>
                    <p className="mt-1 text-sm text-muted">
                      Update your personal information.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-semibold text-secondary">
                        AR
                      </div>

                      <div>
                        <h3 className="font-semibold">Profile photo</h3>
                        <p className="mt-1 text-sm text-muted">
                          JPG, PNG or WEBP. Maximum size 2MB.
                        </p>

                        <Button
                          variant="outline"
                          className="mt-3 rounded-lg px-4 py-2 text-sm font-medium"
                        >
                          Change photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                          Full name
                        </span>

                        <input
                          defaultValue="Ayush Rawat"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                          Username
                        </span>

                        <input
                          defaultValue="@ayushrawat"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-sm font-bold">
                          Email address
                        </span>

                        <input
                          type="email"
                          defaultValue="ayush@example.com"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-sm font-bold">
                          Bio
                        </span>

                        <textarea
                          defaultValue="Computer Science student and developer."
                          rows={4}
                          className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        className="rounded-xl px-5 py-3 text-sm font-medium text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <div className="rounded-2xl border border-line bg-panel">
                <div className="border-b border-line p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold">Notifications</h2>
                  <p className="mt-1 text-sm text-muted">
                    Choose what ProjectHub should notify you about.
                  </p>
                </div>

                <div className="divide-y divide-line">
                  <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <h3 className="font-semibold">Email notifications</h3>
                      <p className="mt-1 text-sm leading-5 text-muted">
                        Receive important updates and account notifications by
                        email.
                      </p>
                    </div>

                    <Toggle
                      enabled={emailNotifications}
                      onChange={() =>
                        setEmailNotifications(!emailNotifications)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <h3 className="font-semibold">Task notifications</h3>
                      <p className="mt-1 text-sm leading-5 text-muted">
                        Get notified when tasks are assigned or updated.
                      </p>
                    </div>

                    <Toggle
                      enabled={taskNotifications}
                      onChange={() =>
                        setTaskNotifications(!taskNotifications)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <h3 className="font-semibold">Project activity</h3>
                      <p className="mt-1 text-sm leading-5 text-muted">
                        Receive updates about activity in your projects.
                      </p>
                    </div>

                    <Toggle
                      enabled={projectNotifications}
                      onChange={() =>
                        setProjectNotifications(!projectNotifications)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
                    <div>
                      <h3 className="font-semibold">Weekly summary</h3>
                      <p className="mt-1 text-sm leading-5 text-muted">
                        Receive a weekly summary of your workspace activity.
                      </p>
                    </div>

                    <Toggle
                      enabled={weeklySummary}
                      onChange={() => setWeeklySummary(!weeklySummary)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Workspace */}
            {activeSection === "workspace" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-line bg-panel">
                  <div className="border-b border-line p-5 sm:p-6">
                    <h2 className="font-display text-xl font-semibold">Workspace</h2>
                    <p className="mt-1 text-sm text-muted">
                      Configure how your workspace appears and behaves.
                    </p>
                  </div>

                  <div className="space-y-5 p-5 sm:p-6">
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold">
                        Workspace name
                      </span>

                      <input
                        defaultValue="ProjectHub Workspace"
                        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-bold">
                        Workspace description
                      </span>

                      <textarea
                        defaultValue="A collaborative workspace for managing projects and tasks."
                        rows={4}
                        className="w-full resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-bold">
                        Default project view
                      </span>

                      <select
                        defaultValue="kanban"
                        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="kanban">Kanban Board</option>
                        <option value="overview">Project Overview</option>
                      </select>
                    </label>

                    <div className="flex justify-end pt-2">
                      <Button
                        className="rounded-xl px-5 py-3 text-sm font-medium text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
                  <h2 className="font-display text-xl font-semibold text-red-700">
                    Danger Zone
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-red-600/80">
                    Deleting the workspace is permanent and cannot be undone.
                  </p>

                  <button
                    type="button"
                    className="mt-4 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-100"
                  >
                    Delete Workspace
                  </button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-line bg-panel">
                  <div className="border-b border-line p-5 sm:p-6">
                    <h2 className="font-display text-xl font-semibold">Security</h2>
                    <p className="mt-1 text-sm text-muted">
                      Manage your password and account security.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-6 flex items-center gap-4 rounded-xl bg-secondary/40 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
                        <LockIcon />
                      </div>

                      <div>
                        <h3 className="font-semibold">Password</h3>
                        <p className="mt-1 text-xs text-muted">
                          Last changed 30 days ago
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                          Current password
                        </span>

                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                          New password
                        </span>

                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold">
                          Confirm new password
                        </span>

                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-tertiary"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-panel">
                  <div className="border-b border-line p-5 sm:p-6">
                    <h2 className="font-display text-xl font-semibold">
                      Active Sessions
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                      Devices currently signed in to your account.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Windows · Chrome
                        </h3>

                        <p className="mt-1 text-xs text-muted">
                          Current session · India
                        </p>
                      </div>

                      <Badge
                        variant="default"
                        className="px-3 py-1 text-xs font-medium"
                      >
                        Current
                      </Badge>
                    </div>

                    <button
                      type="button"
                      className="mt-5 text-sm font-medium text-primary hover:text-tertiary"
                    >
                      Sign out of all other sessions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-line pt-6 text-center text-xs text-muted">
          ProjectHub · Account Settings
        </footer>
      </main>
    </div>
  );
}

export default Settings;