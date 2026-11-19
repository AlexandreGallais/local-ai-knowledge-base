---
name: container-debugging
description: "Debugs a container that fails, restarts in a loop or is unhealthy - podman ps, logs, inspect, exec, healthchecks, entrypoint. Use when a container exits at once, restarts repeatedly, shows unhealthy, does not answer on its port, or when podman run or podman compose up fails."
metadata:
  id: CTR-06
  stars: "4"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# Container debugging

**Core rule:** read the container's state and logs before changing its image or command.

## Procedure

1. See the state: `podman ps -a --format '{{.Names}} {{.Status}} {{.Ports}}'`.
   - Check: you know if it exited, restarts or runs.
2. Read the logs: `podman logs --tail 80 <name>`.
   - Check: you quote the last error line.
3. Inspect the config: `podman inspect <name> --format '{{.Config.Entrypoint}} {{.Config.Cmd}} {{.State.ExitCode}}'`.
   - Check: entrypoint, command and exit code are known.
4. For a running container, look inside: `podman exec -it <name> sh -c 'id; env | sort | head -50; ls -la'` (omit `-it` when no terminal).
   - Check: user, environment and files match expectations.
5. For one that exits at once, start a shell instead of the command: `podman run --rm -it --entrypoint sh <image>`.
   - Check: you can run the command by hand and see its error.
6. Fix one cause, rebuild or rerun, check again.
   - Check: the state is `Up` (healthy if a healthcheck exists).

| Exit code | Usual meaning |
| --- | --- |
| 0 | the command finished: no long-running process |
| 1 | application error: read the logs |
| 126, 127 | command not executable or not found |
| 137 | killed, often out of memory |
| 139 | segmentation fault |

## This installation

<!-- FILL: what=shell available in the team's images (sh, bash or none); find=podman run --rm --entrypoint sh <image> -c 'echo ok'; verify=the command prints ok -->

<!-- FILL: what=where application logs go inside the images (stdout or files); find=podman exec <name> ls /var/log and the app config; verify=podman logs shows the application output -->

## Stop and ask the human if

- The fix needs more memory, privileges or a host setting.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Rebuild and retry." | The same image fails the same way. Read the logs. |
| "Exit 0 means fine." | A server that exits 0 stopped; it should run. |

## Definition of done

- [ ] Cause found from state and logs; one fix applied.
- [ ] Container `Up` (and healthy) afterwards.

## Local completion checklist

- [ ] Shell available in images
- [ ] Log location in images
