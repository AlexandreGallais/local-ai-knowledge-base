---
name: process-and-resources
description: "Inspects processes, CPU, memory, disk and ports with ps, top, lsof, df, du, free and ss. Use when a build or test is slow or killed, the disk is full, a port is already in use, a process hangs, or you see 'No space left on device', 'Killed', 'EADDRINUSE' or 'address already in use'."
metadata:
  id: LNX-03
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Processes and resources

**Core rule:** measure with a command before blaming the code for slowness, a kill or a port conflict.

## Procedure

1. Match the symptom to a row of the table and run its commands.
   - Check: you have the output that names the resource at fault.
2. Act on your own processes only (stop your test server, clean your build output).
   - Check: the resource is free again (rerun the command).
3. Rerun the failing task.
   - Check: it passes or fails for another reason.

| Symptom | Commands |
| --- | --- |
| Port in use, `EADDRINUSE` | `ss -ltnp \| grep ':<port>'`, then `ps -o pid,cmd -p <pid>` |
| Disk full | `df -h .`, then `du -xh --max-depth=1 . 2>/dev/null \| sort -h \| tail` |
| Process killed, `Killed`, exit 137 | `free -h`, `journalctl --user -k --since -10min 2>/dev/null \| grep -i oom` |
| Slow machine | `top -b -n 1 \| head -n 20` |
| File in use, cannot delete | `lsof +D <dir> 2>/dev/null \| head` |
| Too many open files | `ulimit -n`, `ls /proc/<pid>/fd \| wc -l` |
| Container limits | `podman stats --no-stream` |

## Stop and ask the human if

- The process is not yours, or freeing space means deleting data you did not create (`destructive-action-gate`).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Kill everything on the port." | It may be another person's service. Check the command line first. |
| "Exit 137 is a crash in the code." | It is usually out of memory. Check memory first. |

## Definition of done

- [ ] The resource at fault was measured and named.
- [ ] Only your own processes and files were touched.
