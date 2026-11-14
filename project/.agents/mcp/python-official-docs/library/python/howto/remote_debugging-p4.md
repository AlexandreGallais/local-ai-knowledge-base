---
title: "Remote debugging attachment protocol (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/remote_debugging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Remote debugging attachment protocol (part 4 of 4)

Crashes or memory errors when reading a compromised process are not vulnerabilities
A tool that reads internal interpreter state from a target process must
trust that memory to be well-formed.  If the target process has been
corrupted or is controlled by an attacker, the debugger or profiler may
crash, produce garbage output, or behave unpredictably.  This is the same
risk accepted by every `ptrace`-based debugger.  Bugs in this category
(buffer overflows, segmentation faults, or undefined behaviour triggered
by reading corrupted state) are **not** treated as security issues, though
fixes that improve robustness are welcome.

Vulnerabilities in the target process are not in scope
If the Python process being debugged has already been compromised, the
attacker already controls execution in that process.  Demonstrating further
impact from that starting point does not constitute a vulnerability in the
remote debugging protocol.

## When to use `PYTHON_DISABLE_REMOTE_DEBUG`

The environment variable `PYTHON_DISABLE_REMOTE_DEBUG` (and the
equivalent `-X disable-remote-debug` flag) allows operators to disable
the in-process side of the protocol as a **defence-in-depth** measure.  This
may be useful in hardened or sandboxed deployment environments where no
debugging or profiling of the process is expected and reducing attack surface
is a priority, even though the OS-level privilege checks already prevent
unprivileged access.

Setting this variable does **not** affect other OS-level debugging interfaces
(`ptrace`, `/proc`, `task_for_pid`, etc.), which remain available
according to their own permission models.
