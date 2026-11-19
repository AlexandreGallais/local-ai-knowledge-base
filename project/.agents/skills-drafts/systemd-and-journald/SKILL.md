---
name: systemd-and-journald
description: "Manages services and timers with systemd user units and reads their logs with journalctl filters. Use when a service must start at login or on a schedule, when writing a .service or .timer unit, when a unit fails to start, or when reading logs with journalctl."
metadata:
  id: LNX-06
  stars: "3"
  nature: reference
  mode: B
  wave: V3
  load: auto
---

# systemd and journald

**Core rule:** use user units (`systemctl --user`) for your own services, and read their logs with `journalctl --user -u <unit>` filtered by time.

## Procedure

1. Write the unit in `~/.config/systemd/user/<name>.service` (and `<name>.timer` for a schedule); confirm keys in `linux-official-docs` (`systemd.service`, `systemd.timer`).
   - Check: `systemd-analyze --user verify ~/.config/systemd/user/<name>.service` prints no error.
2. Load and start: `systemctl --user daemon-reload`, then `systemctl --user enable --now <name>.service` (or the timer).
   - Check: `systemctl --user status <name>` shows active, or the error.
3. Read logs: `journalctl --user -u <name> --since '10 min ago' --no-pager | tail -n 50`.
   - Check: the start and any error lines are visible.
4. For a timer: `systemctl --user list-timers`.
   - Check: the next run time is listed.

## This installation

<!-- FILL: what=whether user services keep running after logout (lingering); find=loginctl show-user $USER --property=Linger; verify=the value matches the need of the service -->

<!-- FILL: what=whether systemd is available inside the dev container; find=ps -p 1 -o comm=; verify=systemctl --user status works, or note that units run on the host only -->

## Stop and ask the human if

- The service needs a system unit (root) or lingering enabled.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Edit the unit, it is applied." | Run `daemon-reload` and restart the unit. |
| "journalctl shows everything." | Without `--user` and `-u` you search the wrong journal. |

## Definition of done

- [ ] Unit verified, enabled and active; logs read with filters.

## Local completion checklist

- [ ] Lingering
- [ ] systemd in the dev container
