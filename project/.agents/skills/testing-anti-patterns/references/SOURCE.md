# Source of testing-anti-patterns

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| obra/superpowers | `skills/test-driven-development/writing-good-tests.md` (the catalogue's "testing-anti-patterns" reference now lives there) | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03) | MIT, Copyright (c) 2025 Jesse Vincent |

Licence checked on 2026-11-19. Full text: `../../_licenses/superpowers-MIT.txt`.

## Kept

- Every test names the break it catches; every test exercises the real thing.
- Expectations derived independently (no mirror assertion); mocks earn no assertions; no change detectors.

## Changed

- Shortened to a guardrail table of 8 rows (60-line limit).
- Added the ban on editing a test only to pass and on sleeps (catalogue description).

## Sources

- https://github.com/obra/superpowers
