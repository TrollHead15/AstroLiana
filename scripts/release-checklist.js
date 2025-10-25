#!/usr/bin/env node

const steps = [
  "Release checklist (executed from the 'main' branch):",
  "",
  "1. Ensure your working tree is clean and you are on 'main':",
  "   git status && git checkout main",
  "2. Fetch and fast-forward to the tip of 'origin/main':",
  "   git pull --ff-only origin main",
  "3. Run the full quality gate locally (lint, typecheck, tests):",
  "   npm run lint && npm run typecheck && npm run test",
  "4. Update the version / changelog if applicable.",
  "5. Tag the release from 'main' (lightweight or annotated depending on your policy).",
  "6. Push the tag and main branch:",
  "   git push origin main --tags",
  "7. Trigger the production deployment (Vercel will pick up 'main').",
  "8. Monitor the deployment until it is complete and healthy.",
  "",
  "Remember: releases are always made from a fast-forwarded 'main'."
];

console.log(steps.join('\n'));
