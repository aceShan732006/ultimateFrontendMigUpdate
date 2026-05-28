---

### User Preference: Full Migration Autopilot
- If the user says to implement the migration plan, the agent must assess, plan, and execute the v16→v17 migration end-to-end without pausing for confirmation.
- The agent must accept changes and keep files in place.
- The agent must stop only after migration to v17 is completed.
- The agent must not ask follow-up questions between assessment, planning, implementation, test, or checkpoint(never use tags n branches for checkpoints; only check commits for checkpoints) steps.
name: Angular Migration Implementation
description: >
  Executes the v16 -> v17 migration plan by applying code and configuration changes step-by-step.
  Handles all file modifications, dependency updates, and build validations for the active migration target.

scope:
  - Angular v16 -> v17 only

dependencies:
  - `planning.skill.md`

inputs:
  - `plan/migration_plan.md`

tasks:
  - task: Execute tasks for the current migration phase.
    instructions:
      - Read the next task from `plan/migration_plan.md`.
      - Apply the specified code or configuration changes to the relevant files.
      - Use tools to perform automated refactoring where possible.

  - task: Update dependencies.
    instructions:
      - Run `ng update` or `npm install` to update Angular and third-party packages as defined in the v16 -> v17 plan.
      - Use `--force` or `--legacy-peer-deps` only when explicitly instructed by the plan.

  - task: Validate each step.
    instructions:
      - After every significant change, run `ng build` to ensure the project still compiles.
      - If a build fails, attempt to fix the issue or trigger the rollback procedure.

  - task: Log all actions.
    instructions:
      - Maintain a detailed log of every command run and file modified.
      - Record the output of all build and test commands.
      - Save the log to `report/implementation_log.md`.
    output: `report/implementation_log.md`
  - task: Persist per-change patches and attach diagnostics.
    instructions:
      - After staging changes for a task, save the unified patch to `report/patches/<timestamp>-<task>.diff`.
      - On failure, produce a diagnostic bundle in `report/diagnostics/` including logs, `package.json`, lockfile, and the proposed patch.

  - task: Security remediation & Node compatibility handling during implementation.
    instructions:
      - Before dependency changes, run `npm audit --json` and capture the output to `report/security/`.
      - Attempt `npm audit fix` (non-force) and document changes. If critical vulnerabilities remain and block the build, escalate as a P0 task.
      - If runtime Node version mismatches are detected, attempt non-invasive install/workarounds and produce clear remediation commands in the implementation log (do not auto-upgrade the runtime).


### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.
