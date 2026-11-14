---
title: "Full Grammar specification"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/grammar.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Full Grammar specification

This is the full Python grammar, derived directly from the grammar
used to generate the CPython parser (see Grammar/python.gram).
The version here omits details related to code generation and
error recovery.

The notation used here is the same as in the preceding docs,
and is described in the notation section,
except for an extra complication:

- `~` ("cut"): commit to the current alternative; fail the rule
if the alternative fails to parse

Python mainly uses cuts for optimizations or improved error
messages. They often appear to be useless in the listing below.

Cuts currently don't appear inside parentheses, brackets, lookaheads
and similar.
Their behavior in these contexts is deliberately left unspecified.
