---
title: "re --- Regular expression operations (part 2 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 2 of 8)

## Regular expression syntax

A regular expression (or RE) specifies a set of strings that matches it; the
functions in this module let you check if a particular string matches a given
regular expression (or if a given regular expression matches a particular
string, which comes down to the same thing).

Regular expressions can be concatenated to form new regular expressions; if *A*
and *B* are both regular expressions, then *AB* is also a regular expression.
In general, if a string *p* matches *A* and another string *q* matches *B*, the
string *pq* will match AB.  This holds unless *A* or *B* contain low precedence
operations; boundary conditions between *A* and *B*; or have numbered group
references.  Thus, complex expressions can easily be constructed from simpler
primitive expressions like the ones described here.  For details of the theory
and implementation of regular expressions, consult the Friedl book [Frie09]_,
or almost any textbook about compiler construction.

A brief explanation of the format of regular expressions follows.  For further
information and a gentler presentation, consult the regex-howto.

Regular expressions can contain both special and ordinary characters. Most
ordinary characters, like `'A'`, `'a'`, or `'0'`, are the simplest regular
expressions; they simply match themselves.  You can concatenate ordinary
characters, so `last` matches the string `'last'`.  (In the rest of this
section, we'll write RE's in `this special style`, usually without quotes, and
strings to be matched `'in single quotes'`.)

Some characters, like `'|'` or `'('`, are special. Special
characters either stand for classes of ordinary characters, or affect
how the regular expressions around them are interpreted.

Repetition operators or quantifiers (`*`, `+`, `?`, `{m,n}`, etc) cannot be
directly nested. This avoids ambiguity with the non-greedy modifier suffix
`?`, and with other modifiers in other implementations. To apply a second
repetition to an inner repetition, parentheses may be used. For example,
the expression `(?:a{6})*` matches any multiple of six `'a'` characters.
