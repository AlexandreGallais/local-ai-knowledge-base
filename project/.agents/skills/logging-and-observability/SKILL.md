---
name: logging-and-observability
description: "Adds structured logs, correct levels and correlation IDs, plus RED metrics and traces where the project has them. Use when adding or changing logging, when a failure cannot be understood from the logs, when adding metrics or traces, or when you see print statements used as logs."
license: MIT
metadata:
  id: OBS-02
  stars: "3"
  nature: reference
  mode: R
  wave: V2
  load: auto
---

# Logging and observability

**Core rule:** log events as structured data with a level, a message and context fields, using the project's logger; never log secrets or personal data.

## Procedure

1. Find the project's logger and format: `grep -rn -E 'getLogger|createLogger|ILogger|tracing::|slog|log4j' src | head`.
   - Check: you use the same logger as the surrounding code.
2. Log at the boundaries: request received and answered, job started and finished, external call failed.
   - Check: each log line has a stable message and fields (`request_id`, `duration_ms`, `status`).
3. Pick the level with the table.
   - Check: no `error` for expected situations; no `info` inside tight loops.
4. Pass the correlation ID through calls and logs.
   - Check: one request can be followed across its log lines by one ID.
5. Where metrics exist, cover Rate, Errors and Duration of each endpoint or job.
   - Check: a test or a local run shows the counters moving.

| Level | When |
| --- | --- |
| error | an operation failed and someone must act |
| warn | unexpected but handled; may need attention |
| info | a business event or a lifecycle step |
| debug | detail useful when diagnosing; off by default |

## Stop and ask the human if

- Logs would include user data or identifiers covered by `sensitive-data-handling`.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Interpolate values into the message." | Put values in fields; the message stays searchable. |
| "Log and rethrow at every layer." | Log once, where the error is handled. |

## Definition of done

- [ ] Project logger used; structured fields; levels per the table.
- [ ] No secret or personal data in logs.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
