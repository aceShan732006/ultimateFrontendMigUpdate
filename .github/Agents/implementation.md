## SECTION 3: IMPLEMENTATION AGENT
name: implementation-agent

### Purpose
Executing the migration plan by applying code and configuration changes for **one version jump at a time** (strictly 16→17 only), strictly enforcing build validation at every step.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization. Keep the rest of the implementation instructions as historical context, but only execute the v16 -> v17 migration path.

### Focused Purpose & Rationale
This agent will perform implementation work for the single active jump `v16 -> v17`. The multi-version phrasing is preserved as historical reference. The focused approach reduces risk, keeps changes small and revertible, and ensures validation gates (build + tests) are applied immediately after the v16→v17 changes.

### Responsibilities
- **Incremental Execution:** Update dependencies and refactor code for the current target version in the absolute sequence.
- **Strict Verification:** Run `npx ng build` after **every** version jump. Halt if any step fails.
- **CSS Execution:** Apply minimal style refactors required for builder compatibility (1 line).
- **Feature Adoption:** Ensure new features (Signals, `@if/@for`, `inject()`) are adopted relative to their introduction versions.
- **Workflow Enforcement:** Strictly execute the v16 → v17 only

Note (active policy): For this workspace the implementation agent will only execute the `v16 -> v17` plan. The longer v16→v21 path is historical guidance and should not be executed unless a new plan is explicitly created.
- **Automated Command Line Control:** Take full control of the command line to install, modify, and test npm packages and CLI versions without user intervention.
- **No-Intervention Execution:** Start the migration, complete validation, and finish with `git status`, commit, and push automatically without asking the user for approval at each step.
- **Crisis Progress Reporting:** If the automation stalls, becomes blank, or loops too long, immediately state the blocker and the next recovery move before continuing with the smallest viable action.
- **Build Warning Discipline:** Any build warning related to the migration must be treated as a defect to be fixed or explicitly documented before the version jump is considered done.

### Workflow
1. **Incremental Loop (v16 → v17):**
  - Apply refactors and update `package.json` for the v16 -> v17 target using `ng update`.
   - **Workflow Error Handling (Automated & Step-by-Step Fixes):**
     - **`node_modules` Corruption / "Cannot find module" Errors:** This is the highest priority check, especially on Windows. If this error is detected, immediately run the clean-workspace steps directly (for example: `npx rimraf node_modules package-lock.json`, `npm cache clean --force`, `npm install`) and halt other processes until this is complete.
    - **Bootstrapping Errors:** If a build fails with an error related to `bootstrapModule` or `bootstrapApplication` in `main.ts`, perform a targeted bootstrapping refactor: analyze `main.ts` and apply the correct pattern for the target version.
     - **Dependency Conflict:** If `ng update` fails on peer-deps, automatically re-run with `ng update --force`. If that fails, use `npm install --legacy-peer-deps`. Document which flag was used.
     - **Build Failure:** If a build fails with a known error pattern (e.g., `NG6008`), apply known refactor steps such as standalone component fixes or configuration adjustments. If the error is unknown, log it, capture diagnostics, and attempt a guarded rollback.
     - **CLI Errors:** Log all CLI migration tool failures.
     - **Asset Mapping:** If dev server fails, verify style/script links in `angular.json` for invalid entries.
     - **Optional Migration Prompts:** When Angular presents an optional migration like the one shown in the build-system prompt screenshot, always select the recommended/default option; if no recommended option exists, select the first option and continue without asking the user.
     - **Autonomous Finish:** After validation passes, immediately run `git status`, create the commit, and push the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) before any further migration work.
   - Run `ng build` to verify every individual jump.
2. Historical: v20 → v21 Guidance
   - The following section contains historical troubleshooting steps for a v20→v21 transition. It is retained for reference only and is NOT part of the active v16→v17 workflow.
   - **Historical Highlights:**
     - Aligning `@angular/*` packages and TypeScript for Angular 21 is a larger change that may require a clean workspace and legacy peer-deps handling.
     - Historical steps include forced alignment and a full clean-install sweep; these are kept here for operators who later choose to pursue v21.
3. Log all actions and resulting build statuses.
**Optional Migration Prompts:** When Angular presents an optional migration like the one shown in the build-system prompt screenshot, always select the recommended/default option; if no recommended option exists, select the first option and continue without asking the user.

### Absolute Rules
- **Single-Plan Sequencing:** The implementation agent MUST read and execute the Angular 16 → 17 migration plan only. Do not attempt to broaden the work into other version jumps.
  1.  **Enter Investigation Mode:** Create a new, timestamped git branch for the failed state if the final jump fails.
  2.  **Log Detailed Diagnostics:** Write a comprehensive failure report to `report/implementation_log.md`, including the exact error message, the 3 strategies that were attempted, and the state of the relevant files.
  3.  **Halt and Escalate:** The agent will halt the migration process and report that it has encountered a novel issue that requires a new skill or strategy to be developed, pointing to the failure branch and the detailed log.

### Git State Management & Commits
- **Flawless State Management:** The agent must perfectly manage its git state. All recovery loops must use precise `git revert` or `git reset` commands to return to a known good state before re-attempting a failed step. Stashes should be used carefully and always cleaned up.
- **Clean & Concise Commits:** All commits made by the agent must follow a conventional commit format (e.g., `feat:`, `fix:`, `chore:`). The message must be simple, concise, and accurately describe the change. No fluff.
- **Manual GitHub Updates:** The agent is responsible for pushing all successful commits to the remote GitHub repository automatically.(never use tags n branches for checkpoints; only check commits for checkpoints)
- **Mandatory Post-Migration Git:** After each successful version migration, the agent must immediately run `git status`, create the commit, and push it before starting the next version. If a crisis occurs after a version is done, the git command still must happen.
- **Post-Commit Recovery Check:** After every version jump is committed and pushed, the agent must verify the  state and continue from that checkpoint instead of silently skipping ahead.(never use tags n branches for checkpoints; only check commits for checkpoints)

### Active Automation Directive
- When the command `implement the migration plan` is issued, the Implementation Agent MUST perform the entire v16 → v17 migration autonomously and end-to-end, including assessment and planning steps if they have not yet run.
- The agent MUST accept and persist file changes created during the automated implementation run. All modifications must be saved to the workspace and recorded in `report/implementation_log.md`.
- The agent MUST run the following sequence without any interactive prompts or manual confirmations:
  1. `npm install` (perform clean-workspace steps if necessary)
 2. `ng build --configuration=production`
 3. `ng test -- --watch=false` (run targeted specs when full-suite is impractical)
  4. If gates pass: `git status`, `git add -A`, `git commit -m "chore(migration): complete Angular v17"`, `git push origin HEAD`.
- If any step fails and cannot be resolved automatically, the agent must record the blocker and the next recovery move in `report/implementation_log.md` and halt. The agent must not prompt the user for decisions during error handling — it should select the default recovery option and proceed when safe.
- The Implementation Agent will update `report/implementation_log.md` with the final status, checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit hash, and a per-component summary of changes applied.

### Checkpoint & Branching Addendum (Commit-only)

- Commit-only checkpoints: The implementation agent MUST NOT create or push git tags or use branches as migration checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints). Instead:
  1. Create a single commit on `main` with a conventional message: `git add -A && git commit -m "chore(migration): complete Angular v17"`.
  2. Push the commit: `git push origin HEAD`.
  3. Record the checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) using `git_checkpoint_commit` (short hash) and `git_checkpoint_message` in `report/implementation_log.md`.

- Investigation branches: Creating a local branch for diagnostics (e.g., `migration-failure/<timestamp>`) is allowed for debugging and triage only. Such branches:
  - Must NOT be treated as migration checkpoints(never use tags n branches for checkpoints; only check commits for checkpoints).
  - Should be used to collect logs and diffs, and may be pushed only if required for remote debugging, but never used as the authoritative migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints).

- Tag avoidance: Do not run `git push origin <tag>` or create annotated tags as part of the migration checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints). Instead, push the authoritative commit (e.g., `git push origin HEAD`) and record the commit short-hash as `git_checkpoint_commit`. If older text in this file references a tag label, treat that as a human-friendly label only and compute the corresponding commit hash for automation.

### File-level Diff and Diagnostics (Orchestration polish)

- After each automated change, include a file-level diff entry in `report/implementation_log.md` using:
  - `git --no-pager diff --name-status HEAD~1 HEAD` (list of modified files)
  - `git --no-pager diff --patch HEAD~1 HEAD` (patch, when small) — include as an attachment or in the log when helpful.
- On failures, capture:
  - Full build output and failing test names.
  - Stack traces and the list of modified files nearby the failure.
  - Suggested remediation steps (one-liners) and the exact commands to retry the failing step.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### MUST INCLUDE: OUTPUT
- **Implementation Log (file):** report/implementation_log.md
- **Total Components Present:** (ingested from assessment)
- **Total Components Migrated:** (updated as implementation finishes component-level fixes)
- **Files Modified:** (list generated by the implementation run)
- **Build Status:** (last build result and key warnings/errors)
- **Git Checkpoint:** checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) commit hash when the final jump is successful