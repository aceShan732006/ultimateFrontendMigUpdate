# Skills Notes

This file is the master log for all skills. When a skill is developed or updated, the change **must** be logged here first so the individual skill definition files stay in sync.

### Workspace Specialization Note
This workspace now treats the migration tooling as **v16 -> v17 only**. Keep the log concise and focused on the active migration scope.

## Skill Updates & Changelog

### Updated Skill Behavior: Optional Migration Prompts
- **Description:** Migration skills must automatically choose the recommended/default option, or the first option if no default is shown, when Angular presents an optional migration prompt.
- **Reason:** The migration must never pause for user button presses.
- **Status:** Implemented.

### Updated Skill Behavior: Targeted Test Triage
- **Description:** Unit-testing skills must start with the changed feature area or the first failing spec when the full suite becomes too broad or fails many modules at once.
- **Reason:** The full suite was too heavy for some migration steps and caused unhelpful all-module failures.
- **Status:** Implemented.

### Updated Skill Behavior: Build Warning Cleanup
- **Description:** Build warnings tied to the migration must be treated as cleanup tasks or explicitly logged follow-ups instead of being ignored.
- **Reason:** The migration should not leave unresolved warning debt behind.
- **Status:** Implemented.

### New Skill Behavior: Diagnostics, Diffs, and Security Preflight
- **Diagnostics & Diffs:** Skills must specify where per-change patches and diagnostic bundles are stored (`report/patches`, `report/diagnostics`) and include a file-level diff snippet in the plan for each planned change.
- **Security Preflight:** Skills should run `npm audit` as part of the planning/implementation preflight and classify vulnerabilities by severity. Critical vulnerabilities should be surfaced as P0 tasks and attempted with `npm audit fix` non-force during implementation.
- **Node Compatibility:** Skills should note `engines.node` guidance in the plan and provide fallback/workaround recommendations rather than forcing exact Node upgrades.


### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.
