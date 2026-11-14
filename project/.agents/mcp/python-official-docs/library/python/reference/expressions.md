---
title: "Expressions (part 1 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/expressions.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Expressions

This chapter explains the meaning of the elements of expressions in Python.

**Syntax Notes:** In this and the following chapters,
grammar notation will be used to describe syntax,
not lexical analysis.

When (one alternative of) a syntax rule has the form:

```text
python-grammar
name: othername
```

and no semantics are given, the semantics of this form of `name` are the same
as for `othername`.

## Arithmetic conversions

When a description of an arithmetic operator below uses the phrase "the numeric
arguments are converted to a common real type", this means that the operator
implementation for built-in numeric types works as described in the
Numeric Types section of the standard
library documentation.

Some additional rules apply for certain operators and non-numeric operands
(for example, a string as a left argument to the `%` operator).
Extensions must define their own conversion behavior.
