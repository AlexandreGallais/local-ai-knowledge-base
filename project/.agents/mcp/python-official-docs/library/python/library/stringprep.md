---
title: "stringprep --- Internet String Preparation"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/stringprep.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `stringprep` --- Internet String Preparation

Module `stringprep`.

**Source code:** Lib/stringprep.py

When identifying things (such as host names) in the internet, it is often
necessary to compare such identifications for "equality". Exactly how this
comparison is executed may depend on the application domain, e.g. whether it
should be case-insensitive or not. It may be also necessary to restrict the
possible identifications, to allow only identifications consisting of
"printable" characters.

RFC 3454 defines a procedure for "preparing" Unicode strings in internet
protocols. Before passing strings onto the wire, they are processed with the
preparation procedure, after which they have a certain normalized form. The RFC
defines a set of tables, which can be combined into profiles. Each profile must
define which tables it uses, and what other optional parts of the `stringprep`
procedure are part of the profile. One example of a `stringprep` profile is
`nameprep`, which is used for internationalized domain names.

The module `stringprep` only exposes the tables from RFC 3454. As these
tables would be very large to represent as dictionaries or lists, the
module uses the Unicode character database internally. The module source code
itself was generated using the `mkstringprep.py` utility.

As a result, these tables are exposed as functions, not as data structures.
There are two kinds of tables in the RFC: sets and mappings. For a set,
`stringprep` provides the "characteristic function", i.e. a function that
returns `True` if the parameter is part of the set. For mappings, it provides the
mapping function: given the key, it returns the associated value. Below is a
list of all functions available in the module.

### `in_table_a1(code)`

Determine whether *code* is in tableA.1 (Unassigned code points in Unicode 3.2).

### `in_table_b1(code)`

Determine whether *code* is in tableB.1 (Commonly mapped to nothing).

### `map_table_b2(code)`

Return the mapped value for *code* according to tableB.2 (Mapping for
case-folding used with NFKC).

### `map_table_b3(code)`

Return the mapped value for *code* according to tableB.3 (Mapping for
case-folding used with no normalization).

### `in_table_c11(code)`

Determine whether *code* is in tableC.1.1  (ASCII space characters).

### `in_table_c12(code)`

Determine whether *code* is in tableC.1.2  (Non-ASCII space characters).

### `in_table_c11_c12(code)`

Determine whether *code* is in tableC.1  (Space characters, union of C.1.1 and
C.1.2).

### `in_table_c21(code)`

Determine whether *code* is in tableC.2.1  (ASCII control characters).

### `in_table_c22(code)`

Determine whether *code* is in tableC.2.2  (Non-ASCII control characters).

### `in_table_c21_c22(code)`

Determine whether *code* is in tableC.2  (Control characters, union of C.2.1 and
C.2.2).

### `in_table_c3(code)`

Determine whether *code* is in tableC.3  (Private use).

### `in_table_c4(code)`

Determine whether *code* is in tableC.4  (Non-character code points).

### `in_table_c5(code)`

Determine whether *code* is in tableC.5  (Surrogate codes).

### `in_table_c6(code)`

Determine whether *code* is in tableC.6  (Inappropriate for plain text).

### `in_table_c7(code)`

Determine whether *code* is in tableC.7  (Inappropriate for canonical
representation).

### `in_table_c8(code)`

Determine whether *code* is in tableC.8  (Change display properties or are
deprecated).

### `in_table_c9(code)`

Determine whether *code* is in tableC.9  (Tagging characters).

### `in_table_d1(code)`

Determine whether *code* is in tableD.1  (Characters with bidirectional property
"R" or "AL").

### `in_table_d2(code)`

Determine whether *code* is in tableD.2  (Characters with bidirectional property
"L").
