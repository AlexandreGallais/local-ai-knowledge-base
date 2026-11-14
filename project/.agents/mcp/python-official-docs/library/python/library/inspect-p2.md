---
title: "inspect --- Inspect live objects (part 2 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/inspect.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# inspect --- Inspect live objects (part 2 of 8)

## Types and members

The `getmembers()` function retrieves the members of an object such as a
class or module. The functions whose names begin with "is" are mainly
provided as convenient choices for the second argument to `getmembers()`.
They also help you determine when you can expect to find the following special
attributes (see import-mod-attrs for module attributes):
