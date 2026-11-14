---
title: "Remote debugging attachment protocol (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/remote_debugging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Remote debugging attachment protocol

This protocol enables external tools to attach to a running CPython process and
execute Python code remotely.

Attaching to another Python process may require additional permissions or
configuration, depending on the platform.
