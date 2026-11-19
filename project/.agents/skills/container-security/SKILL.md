---
name: container-security
description: "Runs containers with the least power - no --privileged by default, dropped capabilities, seccomp kept, Podman secrets, read-only file systems. Use when writing podman run options, compose files, Containerfiles or Quadlet units, or when a command asks for --privileged, --cap-add or root."
metadata:
  id: CTR-12
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Container security

**Core rule:** start from the smallest set of rights and add one capability only when an error proves it is needed.

## Procedure

1. Run rootless and as a non-root user inside the image.
   - Check: `podman run --rm <image> id -u` prints non-zero.
2. Drop capabilities and add back only what is needed: `--cap-drop=ALL --cap-add=<NAME>`.
   - Check: the service works with the listed capabilities only.
3. Keep the default seccomp and SELinux confinement; never `--privileged` or `--security-opt label=disable` without a yes.
   - Check: no such option in the command or file.
4. Pass secrets with `podman secret create` and `--secret`, not with environment variables in files.
   - Check: `podman inspect` shows no secret value.
5. Use a read-only root file system where possible: `--read-only` with `--tmpfs /tmp`.
   - Check: the service runs.

## Stop and ask the human if

- A tool insists on `--privileged`, host network or host PID.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`--privileged` fixes the error." | It gives the container nearly full host access. Find the one capability. |
| "Secrets in `-e` are fine." | They show in `inspect` and process lists. |

## Definition of done

- [ ] Non-root, minimal capabilities, default confinement, secrets through Podman secrets.
