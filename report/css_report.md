# CSS / Styling Report — Angular v16 → v17

Notes on stylesheets, component CSS, and global style compatibility checks. This file will collect any style-related migration items discovered (e.g., ViewEncapsulation issues, deprecated mixins).

Findings:

- Build reported CSS budget warnings for the following component stylesheets:
	- `src/app/components/advanced-form-stepper/advanced-form-stepper.component.css`
	- `src/app/components/calendar/calendar.component.css`
	- `src/app/components/event-scheduler/event-scheduler.component.css`
	- `src/app/components/sticky-notes/sticky-notes.component.css`

Notes:
- These are warnings (not build failures). They indicate component CSS bundles are larger than the configured budgets and can be reviewed/optimized if desired.
