import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import AppHeader from "../components/layouts/AppHeader";
import Sidebar from "../components/layouts/Sidebar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { createProject } from "../services/project.service";

const CreateProject = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const project = await createProject({
        name: name.trim(),
        description: description.trim() || undefined,
      });

      navigate(`/projects/${project.id}`);
    } catch {
      setError("Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-neutral">
      <AppHeader pageTitle="Create Project" />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar activePage="projects" />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-3xl px-4 py-7 sm:px-6 lg:px-8">
            {/* Mobile navigation */}
            <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
              <Link
                to="/projects"
                className="shrink-0 rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted"
              >
                Projects
              </Link>

              <span className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm text-secondary">
                New Project
              </span>
            </div>

            {/* Page header */}
            <section className="mb-7">
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Create Project
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
                Create a new project and start organizing your team's work.
              </p>
            </section>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-line bg-panel p-5 sm:p-6"
            >
              <div className="space-y-5">
                <Input
                  label="Project name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. ProjectHub"
                  disabled={submitting}
                />

                <div>
                  <label
                    htmlFor="description"
                    className="mb-1.5 block text-sm font-medium text-neutral"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Describe what this project is about..."
                    rows={5}
                    disabled={submitting}
                    className="w-full resize-none rounded-lg border border-line bg-panel px-3 py-2.5 text-sm text-neutral outline-none transition-colors placeholder:text-muted/70 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:justify-end">
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-neutral transition-colors hover:bg-secondary/40"
                  >
                    Cancel
                  </Link>

                  <Button
                    type="submit"
                    disabled={submitting || !name.trim()}
                  >
                    {submitting ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProject;