## ⚠️ Single-branch workflow reminder

This repository develops directly on `main`. Before requesting a review, confirm that:

- [ ] These changes have been rebased onto the latest `main`.
- [ ] You intend to fast-forward merge back into `main` (no merge commits).
- [ ] `npm run prepush` passes locally (lint, typecheck, tests).
- [ ] No secrets or temporary files are committed.

If you opened this PR from a non-`main` branch, please rebase and push to `main` instead. The branch guard workflow will fail otherwise.

---

## Summary
- _Describe what changed and why._

## Testing
- _List the commands you ran or the scenarios you validated._
