---
scope: planning-agent
name: Planning Agent Memory

## Purpose
To capture learnings from the execution of migration plans. This memory helps the Planning Agent refine its strategies, improve task sequencing, and make more accurate risk assessments.

## Workspace Specialization Note
Use this memory to guide only the Angular **v16 -> v17** plan in this workspace specialization.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"PlanDeviation" | "RiskReassessment" | "TaskSequencing">
keywords: [<keyword1>, <keyword2>]
---

**Situation:**
<A description of the situation where the original plan was not optimal.>

**Learned Improvement:**
<A new strategy or adjustment to the planning process that should be applied in the future.>

**Example:**
---
id: planning-001
date: 2024-05-08
type: TaskSequencing
keywords: [third-party, chart-library]
---

**Situation:**
The original plan scheduled the update of a critical third-party charting library *after* the main `@angular/core` update. This led to significant build failures that were difficult to debug.

**Learned Improvement:**
For projects with critical third-party UI libraries, the planning agent should prioritize their updates *before* or *concurrently with* the core Angular updates. This isolates potential compatibility issues early. The plan should now include a dedicated pre-flight phase for such dependencies.
```
---
### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

