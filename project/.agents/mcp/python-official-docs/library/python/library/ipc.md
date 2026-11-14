---
title: "Networking and Interprocess Communication"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ipc.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Networking and Interprocess Communication

The modules described in this chapter provide mechanisms for
networking and inter-processes communication.

Some modules only work for two processes that are on the same machine, e.g.
`signal` and `mmap`.  Other modules support networking protocols
that two or more processes can use to communicate across machines.

The list of modules described in this chapter is:
