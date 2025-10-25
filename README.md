# Single-Branch Workflow Template

This repository is configured for a **single-branch (`main`) development flow** with guardrails for CI/CD and Vercel deployments. Use it as a baseline for projects that want to avoid long-lived feature branches and keep production deploys predictable.

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   npm install
   ```
2. Copy the environment template and fill in the required values:
   ```bash
   cp .env.example .env
   ```
3. Develop directly on the `main` branch (see workflow below).

## Single-Branch Workflow

- All collaborative work happens on `main`.
- Rebase onto the latest `main` before pushing (`git pull --ff-only origin main`).
- Commits must stay atomic; use feature toggles to keep `main` deployable.
- Pushes **must** be fast-forward only (`git push --ff-only`).
- CI (`.github/workflows/branch-guard.yml`) fails any push or pull request that targets a branch other than `main` (Dependabot excluded).
- Vercel is configured to deploy production from `main` only. Preview deployments remain available for in-progress reviews.

## Available Scripts

```bash
npm run lint        # placeholder – replace with your linter
npm run typecheck   # placeholder – replace with your type checker
npm run test        # placeholder – replace with your test runner
npm run prepush     # runs lint + typecheck + test (ideal for a Husky pre-push hook)
npm run release     # prints the release checklist for deployments from main
```

## Tooling Overview

- **CI:** GitHub Actions branch guard prevents accidental pushes to non-`main` branches.
- **Deployment:** `vercel.json` pins the production branch to `main`. Configure the remaining settings (env vars, domains) in the Vercel dashboard.
- **Documentation:** See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full policy, including release steps and guardrail details.

Stay disciplined with the single-branch flow and enjoy fast, frictionless deployments! 🚀
