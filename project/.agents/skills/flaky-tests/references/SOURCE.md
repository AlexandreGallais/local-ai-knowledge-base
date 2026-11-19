# Source of flaky-tests

## Upstream

| Repository | Path | Commit | Licence |
| --- | --- | --- | --- |
| obra/superpowers | `skills/systematic-debugging/condition-based-waiting.md` | `22f0b463e7a5e579904dd6211a520321035526f7` (2026-11-03) | MIT, Copyright (c) 2025 Jesse Vincent |

Licence checked on 2026-11-19. Full text: `../../_licenses/superpowers-MIT.txt`.

## Kept

- Wait for the actual condition, not a guess about how long it takes; arbitrary delays cause flaky tests under load.

## Changed

- Extended to the other causes of flakiness (order, shared resources, time, environment) with a classification table and a 50-run check.

## Sources

- https://github.com/obra/superpowers
