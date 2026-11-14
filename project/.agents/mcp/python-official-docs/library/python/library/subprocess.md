---
title: "subprocess --- Subprocess management (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/subprocess.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `subprocess` --- Subprocess management

Module `subprocess`.

**Source code:** Lib/subprocess.py

The `subprocess` module allows you to spawn new processes, connect to their
input/output/error pipes, and obtain their return codes.  This module intends to
replace several older modules and functions:

```
os.system
os.spawn*
```

Information about how the `subprocess` module can be used to replace these
modules and functions can be found in the following sections.

> **See also:** PEP 324 -- PEP proposing the subprocess module
