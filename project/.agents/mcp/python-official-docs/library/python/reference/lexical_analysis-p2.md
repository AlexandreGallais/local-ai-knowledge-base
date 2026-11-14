---
title: "Lexical analysis (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/lexical_analysis.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Lexical analysis (part 2 of 4)

## Names (identifiers and keywords)

`NAME` tokens represent *identifiers*, *keywords*, and
*soft keywords*.

Names are composed of the following characters:

- uppercase and lowercase letters (`A-Z` and `a-z`),
- the underscore (`_`),
- digits (`0` through `9`), which cannot appear as the first character, and
- non-ASCII characters. Valid names may only contain "letter-like" and
"digit-like" characters; see lexical-names-nonascii for details.

Names must contain at least one character, but have no upper length limit.
Case is significant.

Formally, names are described by the following lexical definitions:

```text

NAME:          `name_start` `name_continue`*
name_start:    "a"..."z" | "A"..."Z" | "_" | <non-ASCII character>
name_continue: name_start | "0"..."9"
identifier:    <`NAME`, except keywords>
```

Note that not all names matched by this grammar are valid; see
lexical-names-nonascii for details.

### Keywords

The following names are used as reserved words, or *keywords* of the
language, and cannot be used as ordinary identifiers.  They must be spelled
exactly as written here:

```text
False      await      else       import     pass
None       break      except     in         raise
True       class      finally    is         return
and        continue   for        lambda     try
as         def        from       nonlocal   while
assert     del        global     not        with
async      elif       if         or         yield
```

### Soft Keywords

> *Added in version 3.10.*

Some names are only reserved under specific contexts. These are known as
*soft keywords*:

- `match`, `case`, and `_`, when used in the `match` statement.
- `type`, when used in the `type` statement.
- `lazy`, when used before an `import` statement.

These syntactically act as keywords in their specific contexts,
but this distinction is done at the parser level, not when tokenizing.

As soft keywords, their use in the grammar is possible while still
preserving compatibility with existing code that uses these names as
identifier names.

> *Changed in version 3.12.*
> `type` is now a soft keyword.

> *Changed in version 3.15.*
> `lazy` is now a soft keyword.

### Reserved classes of identifiers

Certain classes of identifiers (besides keywords) have special meanings.  These
classes are identified by the patterns of leading and trailing underscore
characters:

`_*`
Not imported by `from module import *`.

`_`
In a `case` pattern within a `match` statement, `_` is a
soft keyword that denotes a
wildcard.

Separately, the interactive interpreter makes the result of the last evaluation
available in the variable `_`.
(It is stored in the `builtins` module, alongside built-in
functions like `print`.)

Elsewhere, `_` is a regular identifier. It is often used to name
"special" items, but it is not special to Python itself.

> **Note:** The name `_` is often used in conjunction with internationalization;
> refer to the documentation for the `gettext` module for more
> information on this convention.
>
> It is also commonly used for unused variables.

`__*__`
System-defined names, informally known as "dunder" names. These names are
defined by the interpreter and its implementation (including the standard library).
Current system names are discussed in the specialnames section and elsewhere.
More will likely be defined in future versions of Python.  *Any* use of `__*__` names,
in any context, that does not follow explicitly documented use, is subject to
breakage without warning.

`__*`
Class-private names.  Names in this category, when used within the context of a
class definition, are re-written to use a mangled form to help avoid name
clashes between "private" attributes of base and derived classes. See section
atom-identifiers.

### Non-ASCII characters in names

Names that contain non-ASCII characters need additional normalization
and validation beyond the rules and grammar explained
above.
For example, `ř_1`, `蛇`, or `साँप`  are valid names, but `r〰2`,
`€`, or `🐍` are not.

This section explains the exact rules.

All names are converted into the normalization form NFKC while parsing.
This means that, for example, some typographic variants of characters are
converted to their "basic" form. For example, `ﬁⁿₐˡᵢᶻₐᵗᵢᵒₙ` normalizes to
`finalization`, so Python treats them as the same name:

```
>>> ﬁⁿₐˡᵢᶻₐᵗᵢᵒₙ = 3
>>> finalization
3
```

> **Note:** Normalization is done at the lexical level only.
> Run-time functions that take names as *strings* generally do not normalize
> their arguments.
> For example, the variable defined above is accessible at run time in the
> `globals()` dictionary as `globals()["finalization"]` but not
> `globals()["ﬁⁿₐˡᵢᶻₐᵗᵢᵒₙ"]`.

Similarly to how ASCII-only names must contain only letters, digits and
the underscore, and cannot start with a digit, a valid name must
start with a character in the "letter-like" set `xid_start`,
and the remaining characters must be in the "letter- and digit-like" set
`xid_continue`.

These sets are based on the *XID_Start* and *XID_Continue* sets as defined by the
Unicode standard annex UAX-31.
Python's `xid_start` additionally includes the underscore (`_`).
Note that Python does not necessarily conform to UAX-31.

A non-normative listing of characters in the *XID_Start* and *XID_Continue*
sets as defined by Unicode is available in the DerivedCoreProperties.txt
file in the Unicode Character Database.
For reference, the construction rules for the `xid_*` sets are given below.

The set `id_start` is defined as the union of:

- Unicode category `<Lu>` - uppercase letters (includes `A` to `Z`)
- Unicode category `<Ll>` - lowercase letters (includes `a` to `z`)
- Unicode category `<Lt>` - titlecase letters
- Unicode category `<Lm>` - modifier letters
- Unicode category `<Lo>` - other letters
- Unicode category `<Nl>` - letter numbers
- {`"_"`} - the underscore
- `<Other_ID_Start>` - an explicit set of characters in PropList.txt
to support backwards compatibility

The set `xid_start` then closes this set under NFKC normalization, by
removing all characters whose normalization is not of the form
`id_start id_continue*`.

The set `id_continue` is defined as the union of:

- `id_start` (see above)
- Unicode category `<Nd>` - decimal numbers (includes `0` to `9`)
- Unicode category `<Pc>` - connector punctuations
- Unicode category `<Mn>` - nonspacing marks
- Unicode category `<Mc>` - spacing combining marks
- `<Other_ID_Continue>` - another explicit set of characters in
PropList.txt to support backwards compatibility

Again, `xid_continue` closes this set under NFKC normalization.

Unicode categories use the version of the Unicode Character Database as
included in the `unicodedata` module.

> **See also:** - PEP 3131 -- Supporting Non-ASCII Identifiers
> - PEP 672 -- Unicode-related Security Considerations for Python

## Literals

Literals are notations for constant values of some built-in types.

In terms of lexical analysis, Python has string, bytes
and numeric literals.

Other "literals" are lexically denoted using keywords
(`None`, `True`, `False`) and the special
ellipsis token (`...`).
