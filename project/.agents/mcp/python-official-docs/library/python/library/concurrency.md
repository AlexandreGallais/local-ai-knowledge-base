---
title: "Concurrent Execution"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/concurrency.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Concurrent Execution

The modules described in this chapter provide support for concurrent
execution of code. The appropriate choice of tool will depend on the
task to be executed (CPU bound vs IO bound) and preferred style of
development (event driven cooperative multitasking vs preemptive
multitasking). Here's an overview:

The following are support modules for some of the above services:
