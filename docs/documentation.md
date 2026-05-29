# Migration Documentation — Angular v16 → v17

This document records design decisions, manual code changes, and developer guidance resulting from the v16→v17 migration.

Summary of Changes

- Rationale: Upgrade project from Angular v16 → v17 to stay current with framework improvements and security updates. Migration required dependency updates, TypeScript bump, and small test-suite adjustments.

- Key Actions Performed:
	- Updated `@angular/*` packages to v17 and `@angular/cli` to v17.x.
	- Bumped `typescript` to `~5.3.3` to satisfy Angular compiler requirements.
	- Ran `npm install --legacy-peer-deps` to resolve initial peer conflicts and completed package installation.
	- Applied manual TestBed fixes: moved component classes to `declarations`, added `FormsModule` where `[(ngModel)]` is used, and added `NO_ERRORS_SCHEMA` in specs to ignore unknown child elements during unit tests.
	- Fixed failing specs and validated all unit tests (21/21 passing).
	- Built production bundle successfully (`npx ng build --configuration production`) — CSS budget warnings noted.
	- Created final migration checkpoint commit and pushed to `origin main`.

- Files modified (high level):
	- `package.json`, `package-lock.json`
	- Multiple spec files under `src/app/components/*/*.component.spec.ts` (TestBed adjustments)
	- Migration plan and report files under `plan/` and `report/`

- Validation:
	- `npx ng build --configuration production` — success (warnings only)
	- `npx ng test --watch=false` — all unit tests passed

- Rollback:
	- Use the pre-migration checkpoint `5638bcd` if rollback is required.

- Known Issues / Next Steps:
	- Review CSS budget warnings and optimize component CSS where necessary.
	- Address `npm audit` vulnerabilities as a separate follow-up.
