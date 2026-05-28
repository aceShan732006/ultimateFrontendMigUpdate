# Migration plan: Angular 16 → 17

Scope: atomic migration for this repository from Angular v16 to v17 only.

Phases
1. Assessment
   - Inventory project dependencies and components
   - Record current package versions and potential blockers

2. Preparation
   - Create a dedicated branch or checkpoint (policy: commit to `main` after successful validation)
   - Update `package.json` devDependencies and dependencies to `^17` where applicable
   - Run `npm install`

3. Automatic migration
   - Run `npx @angular/cli@17 ng update @angular/core@17 @angular/cli@17` and accept default prompts
   - Run any recommended schematic migrations

4. Manual fixes
   - Address compile errors and deprecations reported by the update
   - Update code patterns flagged by TypeScript or Angular tests

5. Validation
   - `ng build` (production)
   - `ng test --watch=false`
   - Linting (if configured)

6. Checkpoint
   - `git add -A && git commit -m "chore(migration): complete Angular v17 migration"`
   - `git push origin HEAD`

7. Reporting
   - Produce `report/assessment_report.md`, `report/implementation_log.md`, `report/test_report.md`, `report/css_report.md`, `docs/documentation.md`, and `report/migration_report.md` with details and commit hash

Validation gates (must pass to commit)
- `ng build` succeeds without fatal errors
- Unit tests run (or targeted specs pass after triage)

Rollback
- If validation fails and cannot be fixed within small iterations, revert local changes and reset to previous commit. Use the checkpoint commit hash for recovery.

Notes
- This plan is atomic: only this version's changes are made. Do not attempt other version jumps in the same run.
# Migration Plan: Angular v16 → v17

## Executive Summary

Scope: single, atomic migration from Angular **v16** to **v17** for this repository. This plan is intentionally minimal, test-driven, and checkpointed: each validation gate must pass before committing the checkpoint.

This plan is authoritative for the v16→v17 migration only. Do NOT attempt other version jumps under this plan.

## Goals
- Update `@angular/*` packages to v17-compatible versions
- Ensure the project builds (`ng build`) and tests pass (`ng test --watch=false`)
- Keep changes small and reversible with commit-only checkpoints

## Outputs
- `report/assessment_report.md` (produced by assessment step)
- `report/implementation_log.md` (implementation actions & diffs)
- `report/test_report.md` (unit test results)

## Preflight (required)
1. Commit or stash any local changes.
2. Run a clean install:

```bash
npx rimraf node_modules package-lock.json
npm cache clean --force
npm install
```

3. Record current HEAD for recovery: `git rev-parse --short HEAD`.

## Phase 1 — Assessment (Read-only)
- Task: Run the Assessment Agent to produce `report/assessment_report.md`.
- Actions (manual commands or agent-run):
  - Inspect `package.json`, `angular.json`, `tsconfig.json`, and `src/main.ts`.
  - Produce a Project Inventory (components, modules, services) and list of blockers.
- Gate: `report/assessment_report.md` exists and contains a dependency table and component inventory.

## Phase 2 — Core Angular & CLI Update
- Task: Update core Angular packages.
- Actions:
  - `npx ng update @angular/core @angular/cli` (target v17)
  - If peer-deps fail, update third-party packages first as advised by assessment.
  - Reinstall: `npm install`.
- Gate: `npx ng build` completes with 0 errors.

## Phase 3 — Third-Party Dependency Stabilization
- Task: Upgrade incompatible third-party libraries identified by assessment.
- Actions:
  - Update packages listed as incompatible; prefer explicit versions that satisfy peerDeps.
  - If `ng update` suggests migrations, accept the recommended option automatically.
- Gate: `npx ng build` passes and runtime smoke-check succeeds.

## Phase 4 — TypeScript / Config Fixes
- Task: Resolve TS errors and update `tsconfig.json` per v17 requirements.
- Actions: fix compile-time type errors, adjust `moduleResolution` / `target`, and ensure `package.json` engines note if needed.
- Gate: `npx ng build --configuration=production` passes.

## Phase 5 — API & Pattern Refactors
- Task: Replace deprecated APIs and adopt v17 patterns (selective):
  - `main.ts` bootstrapping (ensure correct `bootstrapModule` / `bootstrapApplication` usage)
  - Standalone component adoption only where low-risk
  - Signal adoption on a per-feature basis (not an all-at-once rewrite)
- Gate: Local runtime smoke-check and `ng test --watch=false` pass for changed areas.

## Final Validation & Checkpoint
- Run:

```bash
ng build --configuration=production
ng test --watch=false
git status
git add -A
git commit -m "chore(migration): complete Angular v17"
git push origin HEAD
```

- Record `git_checkpoint_commit` (short hash) and `git_checkpoint_message` in `report/implementation_log.md`.

## Rollback Procedure (commit-only checkpoints)
- Use `git revert <commit>` to undo the migration commit if needed.
- Emergency clean-recover:

```bash
git reset --hard <last-stable-commit>
npx rimraf node_modules package-lock.json
npm install
```

Do NOT use tags or branches as canonical checkpoints; rely on commit hashes only.

## Diagnostics & Reporting
- For every automated change, save a unified diff to `report/patches/<timestamp>-<phase>.diff`.
- On failure, capture `ng build` output, stack traces, and a 5-line context snippet to `report/diagnostics/<timestamp>-<slug>.md`.

## Risk & Mitigation
- Dependency conflicts — Mitigate by upgrading problematic libraries before core upgrade.
- Bootstrapping errors — Mitigate by validating `src/main.ts` and applying targeted bootstrap refactor.
- node_modules corruption on Windows — Use `npx rimraf` and `npm cache clean` as preflight.

## Acceptance Criteria
- `ng build` succeeds with zero errors.
- All unit tests relevant to changed areas pass; preferred full-suite pass where feasible.
- `report/implementation_log.md` contains the checkpoint commit hash and a short summary of changes.

## Next Steps (recommended)
1. Run the Assessment Agent to generate `report/assessment_report.md`.
2. Review assessment, then run the Implementation Agent to execute Phase 2.
3. After each phase, run the Unit Testing Agent and Documentation Agent to update `report/*` and `docs/*`.

---
Generated by automation after agent analysis (v16→v17 only).
