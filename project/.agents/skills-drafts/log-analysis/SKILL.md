---
name: log-analysis
description: "Filters and correlates logs (grep, journalctl, podman logs, timestamps) to rebuild the sequence of events around a failure. Use when a failure must be understood from logs, when several services are involved, when a log file is large, or when asked what happened at a given time."
metadata:
  id: DBG-05
  stars: "4"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# Log analysis

**Core rule:** find the first error in time, then read the lines just before it; never read a large log whole.

## Procedure

1. Gather the logs of the time window: files, `podman logs --since <time> <name>`, `journalctl --user --since '<time>' --until '<time>'`.
   - Check: each source is saved to `/tmp/logs/<source>.log`.
2. Find error lines with their numbers: `grep -n -i -E 'error|fatal|exception|panic|refused|timeout' <file> | head -n 30`.
   - Check: you have the first error and its timestamp.
3. Read the context: `sed -n '<n-30>,<n+5>p' <file>`.
   - Check: you can say what happened just before.
4. Correlate across sources with the timestamp or a request ID: `grep -n '<request-id>' /tmp/logs/*.log`.
   - Check: the events are in one ordered list.
5. Write the sequence: time, source, event, up to the failure.
   - Check: the list explains the failure or names the missing information.

## This installation

<!-- FILL: what=where the team's services write logs and in which time zone; find=ls /var/log and podman logs of a service; verify=one known event is found with the expected timestamp -->

<!-- FILL: what=request or correlation ID field name; find=grep -o -E '(request|trace|correlation)[_-]?id[^ ]*' on a sample log | sort | uniq -c; verify=one ID appears in two services' logs -->

## Stop and ask the human if

- The logs hold personal or secret data that you would need to quote (`sensitive-data-handling`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The last error is the cause." | Later errors are often consequences. Find the first. |
| "Times line up across hosts." | Check time zones and clock drift first. |

## Definition of done

- [ ] First error found and its context read.
- [ ] Ordered sequence of events written.

## Local completion checklist

- [ ] Log locations and time zone
- [ ] Correlation ID field
