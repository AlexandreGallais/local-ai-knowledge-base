---
name: podman-rootless-essentials
description: "Runs containers with Podman rootless on Fedora - user namespaces, --userns=keep-id, SELinux volume labels :Z and :z, networking, and the differences with Docker. Use when running podman commands, translating a docker command or compose file, or when you see 'permission denied' on a mounted volume, 'avc: denied' or a port that does not answer."
metadata:
  id: CTR-02
  stars: "5"
  nature: reference
  mode: B
  wave: V1
  load: auto
---

# Podman rootless essentials

**Core rule:** translate every Docker instruction to Podman rootless: `podman` instead of `docker`, `:Z` or `:z` on bind mounts, `--userns=keep-id` when files must stay yours.

## Procedure

1. Translate the command with the table below.
   - Check: no `docker` binary or socket is used.
2. For a bind mount of a project folder, add `:Z` (only this container) or `:z` (shared by several containers).
   - Check: the container can read and write the folder; `ausearch -m avc -ts recent` shows no new denial.
3. When files written in the container must be owned by you, add `--userns=keep-id`.
   - Check: `ls -ln` on a new file shows your host UID.
4. For a port, publish it on a port above 1023: `-p 8080:80`.
   - Check: `curl -sS localhost:8080` answers from the host.

| Docker | Podman rootless |
| --- | --- |
| `docker run` | `podman run` |
| `-v ./data:/data` | `-v ./data:/data:Z` |
| `--user $(id -u)` | `--userns=keep-id` |
| `-p 80:80` | `-p 8080:80` (ports under 1024 need a system setting) |
| `docker compose up` | `podman compose up` (calls an installed compose provider) |
| `docker.sock` | `podman system service`; avoid unless a tool needs it |

## Diagnosis

| Symptom | Likely cause | Check |
| --- | --- | --- |
| `Permission denied` on a mounted path | SELinux label missing | `ls -Z <path>`; add `:Z` |
| Files owned by a high UID such as 100999 | user namespace mapping | add `--userns=keep-id` |
| Image pull fails | registry not configured or not reachable | `podman info --format '{{.Registries}}'` |
| Container stops at once | entrypoint error | `podman logs <name>` |

## This installation

<!-- FILL: what=Podman version; find=podman --version; verify=podman info prints rootless: true -->

<!-- FILL: what=internal registries and search order; find=cat ~/.config/containers/registries.conf /etc/containers/registries.conf; verify=podman pull of a known internal image succeeds -->

<!-- FILL: what=compose provider installed; find=podman compose version; verify=podman compose version prints the provider name and version -->

## Stop and ask the human if

- A task needs `--privileged`, `--network host` or root: explain why and wait for a yes.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Disable SELinux to fix it." | Never. Label the volume. |
| "Use sudo podman." | Root containers change ownership and security. Stay rootless. |

## Definition of done

- [ ] No Docker command left; mounts labelled; files owned by you.
- [ ] No new SELinux denial after the run.

## Local completion checklist

- [ ] Podman version
- [ ] Internal registries
- [ ] Compose provider
