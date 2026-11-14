---
title: "Compound statements (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/reference/compound_stmts.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Compound statements (part 3 of 7)

## The `match` statement

> *Added in version 3.10.*

The match statement is used for pattern matching.  Syntax:

```text
python-grammar
match_stmt: 'match' `subject_expr` ":" NEWLINE INDENT `case_block`+ DEDENT
subject_expr: `flexible_expression` "," [`flexible_expression_list` [',']]
            : | `assignment_expression`
case_block: 'case' `patterns` [`guard`] ":" `suite`
```

> **Note:** This section uses single quotes to denote
> soft keywords.

Pattern matching takes a pattern as input (following `case`) and a subject
value (following `match`).  The pattern (which may contain subpatterns) is
matched against the subject value.  The outcomes are:

- A match success or failure (also termed a pattern success or failure).

- Possible binding of matched values to a name.  The prerequisites for this are
further discussed below.

The `match` and `case` keywords are soft keywords.

> **See also:** - PEP 634 -- Structural Pattern Matching: Specification
> - PEP 636 -- Structural Pattern Matching: Tutorial

### Overview

Here's an overview of the logical flow of a match statement:

1. The subject expression `subject_expr` is evaluated and a resulting subject
value obtained. If the subject expression contains a comma, a tuple is
constructed using the standard rules.

1. Each pattern in a `case_block` is attempted to match with the subject value. The
specific rules for success or failure are described below. The match attempt can also
bind some or all of the standalone names within the pattern. The precise
pattern binding rules vary per pattern type and are
specified below.  **Name bindings made during a successful pattern match
outlive the executed block and can be used after the match statement**.

> **Note:** During failed pattern matches, some subpatterns may succeed.  Do not
> rely on bindings being made for a failed match.  Conversely, do not
> rely on variables remaining unchanged after a failed match.  The exact
> behavior is dependent on implementation and may vary.  This is an
> intentional decision made to allow different implementations to add
> optimizations.

1. If the pattern succeeds, the corresponding guard (if present) is evaluated. In
this case all name bindings are guaranteed to have happened.

- If the guard evaluates as true or is missing, the `block` inside
`case_block` is executed.

- Otherwise, the next `case_block` is attempted as described above.

- If there are no further case blocks, the match statement is completed.

> **Note:** Users should generally never rely on a pattern being evaluated.  Depending on
> implementation, the interpreter may cache values or use other optimizations
> which skip repeated evaluations.

A sample match statement:

```
>>> flag = False
>>> match (100, 200):
...    case (100, 300):  # Mismatch: 200 != 300
...        print('Case 1')
...    case (100, 200) if flag:  # Successful match, but guard fails
...        print('Case 2')
...    case (100, y):  # Matches and binds y to 200
...        print(f'Case 3, y: {y}')
...    case _:  # Pattern not attempted
...        print('Case 4, I match anything!')
...
Case 3, y: 200
```

In this case, `if flag` is a guard.  Read more about that in the next section.

### Guards

```text
python-grammar
guard: "if" `assignment_expression`
```

A `guard` (which is part of the `case`) must succeed for code inside
the `case` block to execute.  It takes the form: `if` followed by an
expression.

The logical flow of a `case` block with a `guard` follows:

1. Check that the pattern in the `case` block succeeded.  If the pattern
failed, the `guard` is not evaluated and the next `case` block is
checked.

1. If the pattern succeeded, evaluate the `guard`.

- If the `guard` condition evaluates as true, the case block is
selected.

- If the `guard` condition evaluates as false, the case block is not
selected.

- If the `guard` raises an exception during evaluation, the exception
bubbles up.

Guards are allowed to have side effects as they are expressions.  Guard
evaluation must proceed from the first to the last case block, one at a time,
skipping case blocks whose pattern(s) don't all succeed. (I.e.,
guard evaluation must happen in order.) Guard evaluation must stop once a case
block is selected.

### Irrefutable Case Blocks

An irrefutable case block is a match-all case block.  A match statement may have
at most one irrefutable case block, and it must be last.

A case block is considered irrefutable if it has no guard and its pattern is
irrefutable.  A pattern is considered irrefutable if we can prove from its
syntax alone that it will always succeed.  Only the following patterns are
irrefutable:

- as-patterns whose left-hand side is irrefutable

- or-patterns containing at least one irrefutable pattern

- capture-patterns

- wildcard-patterns

- parenthesized irrefutable patterns
