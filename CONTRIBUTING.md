# Contributing Guidelines

Welcome! This project follows a **single-branch workflow** – all shared development happens directly on the `main` branch. The rules below keep the history linear, the deployments predictable, and the production environment healthy.

## Branching Policy

- ✅ **Single shared branch:** All collaborative work is done on `main`.
- ✅ **Atomic commits:** Break work into the smallest reviewable units. Use feature toggles or graceful fallbacks to keep `main` deployable even when a feature is incomplete.
- ✅ **Fast-forward merges only:** Temporary local branches are fine, but they must be rebased back onto the tip of `main`. Pushes to the remote must always be fast-forwards (`git push --ff-only`).
- ✅ **No shared feature branches:** If you need to experiment, keep it local or in a fork.

## Required Local Workflow

Follow this checklist **every time** before you push:

1. **Sync `main`:**
   ```bash
   git checkout main
   git pull --ff-only origin main
   ```
2. **Implement your changes** directly on `main` (or on a short-lived local branch that you will rebase back onto `main`).
3. **Rebase (if you used a local branch):**
   ```bash
   git rebase main
   ```
   Resolve any conflicts locally.
4. **Run the full quality gate:**
   ```bash
   npm install
   npm run lint
   npm run typecheck
   npm run test
   ```
   The `prepush` npm script runs the same trio of commands. Wire it up via Husky or your Git client to prevent bypassing the checks.
5. **Commit atomically:**
   ```bash
   git add <files>
   git commit
   ```
   Use clear, imperative commit messages (e.g., `Add branch guard workflow`).
6. **Fast-forward push:**
   ```bash
   git push --ff-only origin main
   ```

## Commit Expectations

- Keep commits small and scoped to a single concern.
- Include only the files relevant to that concern.
- Reference issue or ticket IDs when available.
- Never commit secrets – `.env.example` documents the required environment variables.

## Continuous Integration Guardrails

- A GitHub Actions workflow (`.github/workflows/branch-guard.yml`) fails on pushes or pull requests that target anything other than `main` (Dependabot is exempt).
- Treat CI failures as blockers. Investigate and resolve them before reattempting a push.

## Deployment (Vercel)

- The production deployment is triggered exclusively from the `main` branch.
- Preview deployments stay enabled for collaboration, but **do not merge** anything that is not rebased onto `main`.
- Verify in Vercel project settings:
  - `Main Branch` / `Production Branch` → `main`
  - Automatic deployments → enabled for `main`, disabled for other branches
  - Production domain → mapped to `main`

## Release Process

Run `npm run release` for a scripted checklist. In summary:

1. Update `main` and ensure the working tree is clean.
2. Run lint, type checks, and tests.
3. Update changelog/versioning if needed.
4. Tag the release from `main` and push both branch and tags.
5. Observe the Vercel production deployment until it is healthy.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values locally. Never commit `.env` files or secrets to the repository. Request missing keys from the maintainers if needed.

## Need Help?

Open a discussion or reach out to the maintainers before diverging from this workflow. Consistency keeps releases smooth for everyone. Thank you for contributing responsibly! 🚀
