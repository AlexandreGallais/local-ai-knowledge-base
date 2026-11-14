---
title: "Data Persistence"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/persistence.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Data Persistence

The modules described in this chapter support storing Python data in a
persistent form on disk.  The `pickle` and `marshal` modules can turn
many Python data types into a stream of bytes and then recreate the objects from
the bytes.  The various DBM-related modules support a family of hash-based file
formats that store a mapping of strings to other strings.

The list of modules described in this chapter is:
