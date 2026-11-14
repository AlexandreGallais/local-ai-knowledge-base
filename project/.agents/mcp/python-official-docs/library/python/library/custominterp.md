---
title: "Custom Python Interpreters"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/custominterp.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Custom Python Interpreters

The modules described in this chapter allow writing interfaces similar to
Python's interactive interpreter.  If you want a Python interpreter that
supports some special feature in addition to the Python language, you should
look at the `code` module.  (The `codeop` module is lower-level, used
to support compiling a possibly incomplete chunk of Python code.)

The full list of modules described in this chapter is:
