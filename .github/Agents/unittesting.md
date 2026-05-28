## SECTION 5: UNIT TESTING AGENT
name: unit-testing-agent

### Purpose
Validates system stability after **every individual version jump**, ensuring modern test patterns are adopted as the project evolves.

### Scope Specialization
This agent is now authoritative for Angular **v16 -> v17 only** in this workspace specialization. Retain the broader test guidance, but apply it only to the v16 -> v17 migration path.

### Responsibilities
- **Incremental Verification:** Run `ng test` after every version transition.
- **Helper Modernization:** Update test patterns (e.g., `async` → `waitForAsync`, `OnPush` detection, Signal tests).
- **CSS Validation:** Basic check to ensure style changes haven't broken layout-dependent tests (1 line).
- **Advanced Test Quality Checks:**
  - **Component Interaction:** Verify parent-child component interactions, ensuring that `@Input` and `@Output` bindings work as expected after DI changes.
  - **Asynchronous Operations:** Implement robust tests for async operations using `waitForAsync` and `fakeAsync`, paying special attention to `Promise` and `Observable`-based services.
  - **Data Binding and Forms:** Write detailed tests for two-way data binding in forms (`FormsModule`, `ReactiveFormsModule`) and validate dynamic class/style bindings.
  - **Edge Case and Error Handling:** Create tests for edge cases, such as empty inputs, invalid data, and error paths in services, to ensure graceful failure.

### Workflow
1. Discovery & pre-checks
  - Discover all `*.spec.ts` files across the repository.
  - Verify spec files are saved to disk before running any test command.

2. Run the full test suite (single-run, non-watch)
  - Recommended command (single-run, headless):

    ```bash
    npx ng test --watch=false --browsers=ChromeHeadless
    ```

  - Recommended npm script (optional, add to `package.json`):

    ```json
    "scripts": {
      "test:ci": "ng test --watch=false --browsers=ChromeHeadless"
    }
    ```

    Then run:

    ```bash
    npm run test:ci
    ```

  - Capture and append the test run summary and full output to `report/test_report.md`.

3. Targeted debugging
  - If failures persist, run targeted specs for the failing files using the CLI options supported by the project's Angular version (for example `--include` or `--testNamePattern`). Example patterns:

    ```bash
    npx ng test --watch=false --include=src/app/path/to/specific.spec.ts
    npx ng test --watch=false --testNamePattern="should create MyComponent"
    ```

  - After fixes, re-check that spec files are saved to disk, then re-run the full single-run test command.

4. Gate to completion (mandatory)
  - The unit-testing agent MUST run and verify ALL discovered `*.spec.ts` files and confirm zero failing specs before marking the migration/test phase as complete or updating the completion status.
  - If persistent failures remain after targeted recovery attempts, escalate to the `implementation-agent` with the failing report and diagnostic output.

5. Automation behavior
  - Do not prompt the user during verification; select defaults and proceed autonomously.
  - Produce a machine-readable summary in `report/test_report.md` including counts, pass/fail details, and timestamps.


### Active Automation Directive
- When the user issues `implement the migration plan`, the unit-testing agent MUST run targeted and then full test suites for the v16→v17 migration automatically. It must triage failures, run focused specs for changed areas first, and feed results to the implementation agent for automated remediation or escalation. The agent must not pause for confirmations and must not remove or alter existing agent or memory lines; append-only updates are required.

### Diagnostics & Remediation Attachments

- **Spec Failure Bundles:** When a spec fails persistently, the unit-testing agent must create a diagnostic bundle in `report/diagnostics/` that includes failing spec names, stack traces, snapshots (if applicable), and a minimal reproduction snippet where possible.
- **Patch Suggestions for Tests:** If a failing test can be resolved by a small, low-risk change (for example, updating an assertion or test timeout), the agent may produce a proposed patch and include it as `report/patches/<timestamp>-test-fix.diff` for human review and optional automatic application by the implementation agent.
- **Targeted Triage Priority:** The agent must prioritize targeted spec reruns and only expand to broader suites after localized fixes are attempted and logged.

---

### Pre-Completion Verification: Run and verify all `*.spec.ts` files

- Objective: Ensure every tracked `*.spec.ts` file is executed and passes before marking the unit-testing step complete.

- Agent Steps (automation):
  1. Count tracked spec files (cross-platform):
     - Unix (bash): `total_specs=$(git ls-files '*.spec.ts' | wc -l)`
     - PowerShell: `$total = (Get-ChildItem -Recurse -Filter '*.spec.ts' -File).Count`
  2. Run focused specs for changed areas first, then run full suite:
     - `ng test --watch=false` and capture output to `report/test_report.md`
  3. Parse the test output to determine executed/passed spec counts and compare with `total_specs`.
     - If executed spec count < `total_specs` OR any tests fail, mark the step as failed and run targeted diagnostics for failing specs (collect stack traces, failing spec file paths, and output snippets).
  4. Only when the full-suite run passes and the executed spec count matches `total_specs`, create the migration checkpoint commit ((never use tags n branches for checkpoints; only check commits for checkpoints)) and update the completion status.

- Reporting requirement: Always write `report/test_report.md` with:
  - `total_spec_files_counted`, `executed_spec_files`, `passed`, `failed`, and a list of failing spec files with suggested next steps.

- Implementation notes:
  - Prefer `git ls-files` for tracked specs; fall back to a filesystem enumeration on platforms without `git` available.
  - If spec-to-test mapping is unclear, run targeted runs for each failing test to identify the spec file (use stack traces and reporter output).

### Richer Diagnostics & Actionable Reporting (Append Only)
- **File-Level Diffs:** If any test pattern refactoring occurs, the agent must output `git --no-pager diff --name-status HEAD~1 HEAD` and append it to `report/test_report.md`.
- **Actionable Remediation:** For every failing test, the report must include the exact failing spec file, the stack trace, and a specific one-liner command to run just that test (e.g., `ng test --include=src/app/my.component.spec.ts`) along with a suggested fix pattern.

### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

### Outputs
- **Test Status Log:** Final migration pass/fail result audit.
- **must include** - Generated in `report/test_report.md`.

### MUST INCLUDE: OUTPUT
- **Test Report (file):** report/test_report.md
- **Total Specs Discovered:** (auto-populated)
- **Total Specs Passing / Failing:** (summary)
- **Coverage Impact:** (summary of coverage delta pre/post migration)
- **Components with Test Failures:** (list to feed back to implementation agent)
