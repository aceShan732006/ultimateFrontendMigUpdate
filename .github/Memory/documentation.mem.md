---
scope: documentation-agent
name: Documentation Agent Memory

## Purpose
To store project-specific documentation preferences and standards. This ensures that all generated documentation is consistent and meets the project's requirements.

## Workspace Specialization Note
Use this memory to document only Angular **v16 -> v17** migration history in this workspace specialization.

## Memory Structure

### Entry Template
```markdown
---
id: <unique_identifier>
date: <YYYY-MM-DD>
type: <"Formatting" | "StandardSection" | "AudienceNote">
keywords: [<keyword1>, <keyword2>]
---

**Requirement:**
<A description of the specific documentation requirement.>

**Implementation Guideline:**
<How the documentation agent should apply this requirement.>

**Example:**
---
id: documentation-001
date: 2024-05-08
type: StandardSection
keywords: [readme, deployment]
---

**Requirement:**
The project's main `README.md` must always include a "Deployment" section that details the production build and deployment process.

**Implementation Guideline:**
When generating or updating documentation, the agent must verify that the `README.md` contains a `## Deployment` section. If it is missing, the agent should create it and add a placeholder prompting the user to fill in the details.
```
---
### Orchestration Polish & Actionability
- **Minor Orchestration Polish:** Ensure automated hand-offs between assessment, planning, implementation, testing, and documentation are flawlessly executed. Maintain near perfection in error recovery and state management.
- **Atomic & Actionable Outputs:** All generated plans and reports must be atomic, isolated per version, and actionable.
- **Richer Diagnostics & File-Level Diffs:** Include comprehensive diagnostics on any failure. Retain file-level diffs (unified patches) to provide clear visibility into modifications.
- **Remediation Steps:** Alongside any identified error or warning, explicitly document the specific remediation steps required to resolve the issue.

