---
name: podman-quadlet
description: "Runs containers as systemd services with Podman Quadlet files (.container, .volume, .network, .kube). Use when a container must start at boot or login, restart on failure, or be managed by systemctl, or when writing or debugging a .container file."
metadata:
  id: CTR-11
  stars: "1"
  nature: reference
  mode: B
  wave: V4
  load: auto
---

# Podman Quadlet

**Core rule:** describe the container in a Quadlet file, let systemd generate the service, and manage it only with `systemctl --user`.

## Procedure

1. Write `~/.config/containers/systemd/<name>.container` with `[Container]` (Image, PublishPort, Volume with `:Z`) and `[Install]` (`WantedBy=default.target`); confirm keys in `containers-official-docs` (`podman-systemd.unit`).
   - Check: the file names an internal image with a tag.
2. Generate and load: `systemctl --user daemon-reload`.
   - Check: `systemctl --user status <name>.service` knows the unit.
3. Start it: `systemctl --user start <name>.service`.
   - Check: active; `podman ps` shows the container.
4. Read its logs: `journalctl --user -u <name>.service --since '10 min ago' --no-pager | tail -n 40`.
   - Check: no error at start.

## This installation

<!-- FILL: what=Podman version and Quadlet support for user units; find=podman --version and ls /usr/libexec/podman/quadlet; verify=a minimal .container unit starts with systemctl --user -->

<!-- FILL: what=whether lingering is enabled for services that must run after logout; find=loginctl show-user $USER --property=Linger; verify=the value matches the need -->

## Stop and ask the human if

- The service must run as a system unit (root) or at boot without a login.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Edit the generated .service file." | It is regenerated. Edit the .container file. |
| "Forget daemon-reload." | systemd does not see the change without it. |

## Definition of done

- [ ] Quadlet file written; unit generated, active, logs clean.

## Local completion checklist

- [ ] Quadlet support
- [ ] Lingering
