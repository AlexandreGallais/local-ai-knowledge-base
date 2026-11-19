---
name: permissions-and-selinux
description: "Diagnoses and fixes file access problems on Fedora - owner, mode, groups, SELinux contexts with ls -Z, ausearch, audit2why and restorecon. Use when you see 'Permission denied', 'Operation not permitted' or 'avc: denied', when a service or container cannot read a file, or after moving files into a system folder."
metadata:
  id: LNX-04
  stars: "4"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Permissions and SELinux

**Core rule:** check classic permissions first, then the SELinux context; fix the label with `restorecon` or a volume label, never by disabling SELinux.

## Procedure

1. Check owner, group and mode: `ls -l <path>` and `namei -l <path>` (every folder of the path).
   - Check: the user has the needed right on the file and execute right on each folder.
2. Check the SELinux context: `ls -Z <path>`.
   - Check: the type fits the use (for example `container_file_t` for a container volume).
3. Find denials: `ausearch -m avc -ts recent` and explain one: `ausearch -m avc -ts recent | audit2why`.
   - Check: you quote the denied action, the process type and the file type.
4. Fix with the table.
   - Check: the action succeeds; no new denial appears.

| Cause | Fix |
| --- | --- |
| Wrong owner or mode on your own file | `chown`, `chmod` with the narrowest mode |
| Container volume denied | `:Z` or `:z` on the mount |
| File moved with `mv` keeps an old label | `restorecon -Rv <path>` |
| A boolean blocks it | report it; `setsebool` needs the human |

## This installation

<!-- FILL: what=whether auditing tools are available to the user; find=command -v ausearch audit2why; verify=ausearch -m avc -ts today runs without permission error, or note that it needs sudo -->

<!-- FILL: what=SELinux mode on the machine; find=getenforce; verify=the value is Enforcing as expected -->

## Stop and ask the human if

- The fix needs `sudo`, `setsebool`, a new policy module or a change under `/etc`.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`setenforce 0` to test." | Never. Read the denial instead. |
| "`chmod 777` fixes it." | It opens the file to everyone and does not fix SELinux. |

## Definition of done

- [ ] Cause identified (mode, owner or label) with evidence.
- [ ] Fixed with the narrowest change; no new denial.

## Local completion checklist

- [ ] Auditing tools
- [ ] SELinux mode
