---
name: core-dump-analysis
description: "Analyses a crash from its core dump on Fedora - coredumpctl, gdb on the core, debug symbols from debuginfo packages. Use when a native program crashes with 'Segmentation fault (core dumped)', 'Aborted', SIGSEGV or SIGABRT, or when a C or C++ test binary dies without a useful message."
metadata:
  id: DBG-15
  stars: "2"
  nature: process
  mode: B
  wave: V3
  load: auto
---

# Core dump analysis

**Core rule:** get a symbolised backtrace from the core before changing code.

## Procedure

1. List recent crashes: `coredumpctl list --since today`.
   - Check: the crashed program and its PID are listed.
2. Print the backtrace without an interactive session: `coredumpctl debug <PID> --debugger-arguments='-batch -ex "bt full"'` (or `coredumpctl dump <PID> -o /tmp/core` then `gdb -batch -ex 'bt full' <binary> /tmp/core`).
   - Check: frames show function names and lines.
3. If frames show `??`, install symbols: `dnf debuginfo-install <package>` or rebuild the project with `-g`.
   - Check: the backtrace is symbolised.
4. Find the first frame in project code and reproduce (`reproduce-first`), ideally under AddressSanitizer.
   - Check: a reproduction crashes the same way.

## This installation

<!-- FILL: what=whether systemd-coredump collects cores here and inside containers; find=coredumpctl list and cat /proc/sys/kernel/core_pattern; verify=a deliberate crash (sleep 100 & kill -SEGV $!) appears in coredumpctl list -->

<!-- FILL: what=debuginfo repositories availability; find=dnf repolist --all | grep -i debug; verify=dnf debuginfo-install of a small package succeeds or is reported unavailable -->

## Stop and ask the human if

- The core holds sensitive data (memory of a process handling secrets).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Read the code around the crash line." | Get the full backtrace first; the cause is often a caller. |
| "Interactive gdb is fine." | Use batch mode; interactive sessions block the agent. |

## Definition of done

- [ ] Symbolised backtrace obtained; first project frame identified; crash reproduced.

## Local completion checklist

- [ ] Core collection
- [ ] Debuginfo repositories
