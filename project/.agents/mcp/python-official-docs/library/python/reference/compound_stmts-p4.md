---
title: "Compound statements (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 4 of 7)

### Patterns

> **Note:** This section uses grammar notations beyond standard EBNF:
>
> - the notation `SEP.RULE+` is shorthand for `RULE (SEP RULE)*`
>
> - the notation `!RULE` is shorthand for a negative lookahead assertion

The top-level syntax for `patterns` is:

```text
python-grammar
patterns: `open_sequence_pattern` | `pattern`
pattern: `as_pattern` | `or_pattern`
closed_pattern: | `literal_pattern`
              : | `capture_pattern`
              : | `wildcard_pattern`
              : | `value_pattern`
              : | `group_pattern`
              : | `sequence_pattern`
              : | `mapping_pattern`
              : | `class_pattern`
```

The descriptions below will include a description "in simple terms" of what a pattern
does for illustration purposes (credits to Raymond Hettinger for a document that
inspired most of the descriptions). Note that these descriptions are purely for
illustration purposes and **may not** reflect
the underlying implementation.  Furthermore, they do not cover all valid forms.

#### OR Patterns

An OR pattern is two or more patterns separated by vertical
bars `|`.  Syntax:

```text
python-grammar
or_pattern: "|".`closed_pattern`+
```

Only the final subpattern may be irrefutable, and each
subpattern must bind the same set of names to avoid ambiguity.

An OR pattern matches each of its subpatterns in turn to the subject value,
until one succeeds.  The OR pattern is then considered successful.  Otherwise,
if none of the subpatterns succeed, the OR pattern fails.

In simple terms, `P1 | P2 | ...` will try to match `P1`, if it fails it will try to
match `P2`, succeeding immediately if any succeeds, failing otherwise.

#### AS Patterns

An AS pattern matches an OR pattern on the left of the `as`
keyword against a subject.  Syntax:

```text
python-grammar
as_pattern: `or_pattern` "as" `capture_pattern`
```

If the OR pattern fails, the AS pattern fails.  Otherwise, the AS pattern binds
the subject to the name on the right of the as keyword and succeeds.
`capture_pattern` cannot be a `_`.

In simple terms `P as NAME` will match with `P`, and on success it will
set `NAME = <subject>`.

#### Literal Patterns

A literal pattern corresponds to most
literals in Python.  Syntax:

```text
python-grammar
literal_pattern: `signed_number`
               : | `signed_number` "+" NUMBER
               : | `signed_number` "-" NUMBER
               : | `strings`
               : | "None"
               : | "True"
               : | "False"
signed_number: ["+" | "-"] NUMBER
```

The rule `strings` and the token `NUMBER` are defined in the
standard Python grammar.  Triple-quoted strings are
supported.  Raw strings and byte strings are supported.  f-strings
and t-strings are not supported.

The forms `signed_number '+' NUMBER` and `signed_number '-' NUMBER` are
for expressing complex numbers; they require a real number
on the left and an imaginary number on the right. E.g. `3 + 4j`.

In simple terms, `LITERAL` will succeed only if `<subject> == LITERAL`. For
the singletons `None`, `True` and `False`, the `is` operator is used.

#### Capture Patterns

A capture pattern binds the subject value to a name.
Syntax:

```text
python-grammar
capture_pattern: !'_' NAME
```

A single underscore `_` is not a capture pattern (this is what `!'_'`
expresses). It is instead treated as a
`python-grammar:wildcard_pattern`.

In a given pattern, a given name can only be bound once.  E.g.
`case x, x: ...` is invalid while `case [x] | x: ...` is allowed.

Capture patterns always succeed.  The binding follows scoping rules
established by the assignment expression operator in PEP 572; the
name becomes a local variable in the closest containing function scope unless
there's an applicable `global` or `nonlocal` statement.

In simple terms `NAME` will always succeed and it will set `NAME = <subject>`.

#### Wildcard Patterns

A wildcard pattern always succeeds (matches anything)
and binds no name.  Syntax:

```text
python-grammar
wildcard_pattern: '_'
```

`_` is a soft keyword within any pattern,
but only within patterns.  It is an identifier, as usual, even within
`match` subject expressions, `guard`s, and `case` blocks.

In simple terms, `_` will always succeed.

#### Value Patterns

A value pattern represents a named value in Python.
Syntax:

```text
python-grammar
value_pattern: `attr`
attr: `name_or_attr` "." NAME
name_or_attr: `attr` | NAME
```

The dotted name in the pattern is looked up using standard Python
name resolution rules.  The pattern succeeds if the
value found compares equal to the subject value (using the `==` equality
operator).

In simple terms `NAME1.NAME2` will succeed only if `<subject> == NAME1.NAME2`

> **Note:** If the same value occurs multiple times in the same match statement, the
> interpreter may cache the first value found and reuse it rather than repeat
> the same lookup.  This cache is strictly tied to a given execution of a
> given match statement.

#### Group Patterns

A group pattern allows users to add parentheses around patterns to
emphasize the intended grouping.  Otherwise, it has no additional syntax.
Syntax:

```text
python-grammar
group_pattern: "(" `pattern` ")"
```

In simple terms `(P)` has the same effect as `P`.

#### Sequence Patterns

A sequence pattern contains several subpatterns to be matched against sequence elements.
The syntax is similar to the unpacking of a list or tuple.

```text
python-grammar
sequence_pattern: "[" [`maybe_sequence_pattern`] "]"
                : | "(" [`open_sequence_pattern`] ")"
open_sequence_pattern: `maybe_star_pattern` "," [`maybe_sequence_pattern`]
maybe_sequence_pattern: ",".`maybe_star_pattern`+ ","?
maybe_star_pattern: `star_pattern` | `pattern`
star_pattern: "*" (`capture_pattern` | `wildcard_pattern`)
```

There is no difference if parentheses  or square brackets
are used for sequence patterns (i.e. `(...)` vs `[...]` ).

> **Note:** A single pattern enclosed in parentheses without a trailing comma
> (e.g. `(3 | 4)`) is a group pattern.
> While a single pattern enclosed in square brackets (e.g. `[3 | 4]`) is
> still a sequence pattern.

At most one star subpattern may be in a sequence pattern.  The star subpattern
may occur in any position. If no star subpattern is present, the sequence
pattern is a fixed-length sequence pattern; otherwise it is a variable-length
sequence pattern.

The following is the logical flow for matching a sequence pattern against a
subject value:

1. If the subject value is not a sequence, the sequence pattern
fails.

1. If the subject value is an instance of `str`, `bytes` or `bytearray`
the sequence pattern fails.

1. The subsequent steps depend on whether the sequence pattern is fixed or
variable-length.

If the sequence pattern is fixed-length:

1. If the length of the subject sequence is not equal to the number of
subpatterns, the sequence pattern fails

1. Subpatterns in the sequence pattern are matched to their corresponding
items in the subject sequence from left to right.  Matching stops as soon
as a subpattern fails.  If all subpatterns succeed in matching their
corresponding item, the sequence pattern succeeds.

Otherwise, if the sequence pattern is variable-length:

1. If the length of the subject sequence is less than the number of non-star
subpatterns, the sequence pattern fails.

1. The leading non-star subpatterns are matched to their corresponding items
as for fixed-length sequences.

1. If the previous step succeeds, the star subpattern matches a list formed
of the remaining subject items, excluding the remaining items
corresponding to non-star subpatterns following the star subpattern.

1. Remaining non-star subpatterns are matched to their corresponding subject
items, as for a fixed-length sequence.

> **Note:** The length of the subject sequence is obtained via
> `len() (i.e. via the len__()` protocol).
> This length may be cached by the interpreter in a similar manner as
> value patterns.

In simple terms `[P1, P2, P3,` ... `, P<N>]` matches only if all the following
happens:

- check `<subject>` is a sequence
- `len(subject) == <N>`
- `P1` matches `<subject>[0]` (note that this match can also bind names)
- `P2` matches `<subject>[1]` (note that this match can also bind names)
- ... and so on for the corresponding pattern/element.

#### Mapping Patterns

A mapping pattern contains one or more key-value patterns.  The syntax is
similar to the construction of a dictionary.
Syntax:

```text
python-grammar
mapping_pattern: "{" [`items_pattern`] "}"
items_pattern: ",".`key_value_pattern`+ ","?
key_value_pattern: (`literal_pattern` | `value_pattern`) ":" `pattern`
                 : | `double_star_pattern`
double_star_pattern: "**" `capture_pattern`
```

At most one double star pattern may be in a mapping pattern.  The double star
pattern must be the last subpattern in the mapping pattern.

Duplicate keys in mapping patterns are disallowed. Duplicate literal keys will
raise a `SyntaxError`. Two keys that otherwise have the same value will
raise a `ValueError` at runtime.

The following is the logical flow for matching a mapping pattern against a
subject value:

1. If the subject value is not a mapping,the mapping pattern fails.

1. If every key given in the mapping pattern is present in the subject mapping,
and the pattern for each key <example-value> the corresponding item of the subject
mapping, the mapping pattern succeeds.

1. If duplicate keys are detected in the mapping pattern, the pattern is
considered invalid. A `SyntaxError` is raised for duplicate literal
values; or a `ValueError` for named keys of the same value.

> **Note:** Key-value pairs are matched using the two-argument form of the mapping
> subject's `get()` method.  Matched key-value pairs must already be present
> in the mapping, and not created on-the-fly via `__missing__()`
> or `__getitem__()`.

In simple terms `{KEY1: P1, KEY2: P2, ... }` matches only if all the following
happens:

- check `<subject>` is a mapping
- `KEY1 in <subject>`
- `P1` matches `<subject>[KEY1]`
- ... and so on for the corresponding KEY/pattern pair.

#### Class Patterns

A class pattern represents a class and its positional and keyword arguments
(if any).  Syntax:

```text
python-grammar
class_pattern: `name_or_attr` "(" [`pattern_arguments` ","?] ")"
pattern_arguments: `positional_patterns` ["," `keyword_patterns`]
                 : | `keyword_patterns`
positional_patterns: ",".`pattern`+
keyword_patterns: ",".`keyword_pattern`+
keyword_pattern: NAME "=" `pattern`
```

The same keyword should not be repeated in class patterns.

The following is the logical flow for matching a class pattern against a
subject value:

1. If `name_or_attr` is not an instance of the builtin `type` , raise
`TypeError`.

1. If the subject value is not an instance of `name_or_attr` (tested via
`isinstance()`), the class pattern fails.

1. If no pattern arguments are present, the pattern succeeds.  Otherwise,
the subsequent steps depend on whether keyword or positional argument patterns
are present.

For a number of built-in types (specified below), a single positional
subpattern is accepted which will match the entire subject; for these types
keyword patterns also work as for other types.

If only keyword patterns are present, they are processed as follows,
one by one:

I. The keyword is looked up as an attribute on the subject.

- If this raises an exception other than `AttributeError`, the
exception bubbles up.

- If this raises `AttributeError`, the class pattern has failed.

- Else, the subpattern associated with the keyword pattern is matched
against the subject's attribute value.  If this fails, the class
pattern fails; if this succeeds, the match proceeds to the next keyword.

II. If all keyword patterns succeed, the class pattern succeeds.

If any positional patterns are present, they are converted to keyword
patterns using the `__match_args__` attribute on the class
`name_or_attr` before matching:

I. The equivalent of `getattr(cls, "__match_args__", ())` is called.

- If this raises an exception, the exception bubbles up.

- If the returned value is not a tuple, the conversion fails and
`TypeError` is raised.

- If there are more positional patterns than `len(cls.__match_args__)`,
`TypeError` is raised.

- Otherwise, positional pattern `i` is converted to a keyword pattern
using `__match_args__[i]` as the keyword.  `__match_args__[i]` must
be a string; if not `TypeError` is raised.

- If there are duplicate keywords, `TypeError` is raised.

> **See also:** class-pattern-matching

II. Once all positional patterns have been converted to keyword patterns,
the match proceeds as if there were only keyword patterns.

For the following built-in types the handling of positional subpatterns is
different:

- `bool`
- `bytearray`
- `bytes`
- `dict`
- `float`
- `frozendict`
- `frozenset`
- `int`
- `list`
- `set`
- `str`
- `tuple`

These classes accept a single positional argument, and the pattern there is matched
against the whole object rather than an attribute. For example `int(0|1)` matches
the value `0`, but not the value `0.0`.

In simple terms `CLS(P1, attr=P2)` matches only if the following happens:

- `isinstance(<subject>, CLS)`
- convert `P1` to a keyword pattern using `CLS.__match_args__`
- For each keyword argument `attr=P2`:

- `hasattr(<subject>, "attr")`
- `P2` matches `<subject>.attr`

- ... and so on for the corresponding keyword argument/pattern pair.

> **See also:** - PEP 634 -- Structural Pattern Matching: Specification
> - PEP 636 -- Structural Pattern Matching: Tutorial
