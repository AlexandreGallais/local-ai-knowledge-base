---
title: "Audit events table"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/audit_events.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Audit events table

This table contains all events raised by `sys.audit()` or
`PySys_Audit` calls throughout the CPython runtime and the
standard library.  These calls were added in 3.8 or later (see PEP 578).

See `sys.addaudithook()` and `PySys_AddAuditHook` for
information on handling these events.

> **CPython implementation detail:** This table is generated from the CPython documentation, and may not
> represent events raised by other implementations. See your runtime
> specific documentation for actual events raised.

The following events are raised internally and do not correspond to any
public API of CPython:

```text
+----------------------------+-------------------------------------------+
| Audit event                | Arguments                                 |
+============================+===========================================+
| _winapi.CreateFile         | ``file_name``, ``desired_access``,        |
|                            | ``share_mode``, ``creation_disposition``, |
|                            | ``flags_and_attributes``                  |
+----------------------------+-------------------------------------------+
| _winapi.CreateJunction     | ``src_path``, ``dst_path``                |
+----------------------------+-------------------------------------------+
| _winapi.CreateNamedPipe    | ``name``, ``open_mode``, ``pipe_mode``    |
+----------------------------+-------------------------------------------+
| _winapi.CreatePipe         |                                           |
+----------------------------+-------------------------------------------+
| _winapi.CreateProcess      | ``application_name``, ``command_line``,   |
|                            | ``current_directory``                     |
+----------------------------+-------------------------------------------+
| _winapi.OpenProcess        | ``process_id``, ``desired_access``        |
+----------------------------+-------------------------------------------+
| _winapi.TerminateProcess   | ``handle``, ``exit_code``                 |
+----------------------------+-------------------------------------------+
| _posixsubprocess.fork_exec | ``exec_list``, ``args``, ``env``          |
+----------------------------+-------------------------------------------+
| ctypes.PyObj_FromPtr       | ``obj``                                   |
+----------------------------+-------------------------------------------+
```

> *Added in version 3.14.*
> The `_posixsubprocess.fork_exec` internal audit event.
