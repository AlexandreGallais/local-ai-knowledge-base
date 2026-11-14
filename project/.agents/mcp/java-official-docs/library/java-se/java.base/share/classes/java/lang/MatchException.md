---
title: "MatchException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/MatchException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MatchException class (java.lang)

```java
public final class MatchException extends RuntimeException
```

Thrown to indicate an unexpected failure in pattern matching.

`MatchException` may be thrown when an exhaustive pattern matching
language construct (such as a `switch` expression) encounters a value
that does not match any of the specified patterns at run time, even though
the construct has been deemed exhaustive. This is intentional and can arise
from a number of cases:

- Separate compilation anomalies, where parts of the type hierarchy that
        the patterns reference have been changed, but the pattern matching
        construct has not been recompiled. For example, if a sealed interface
        has a different set of permitted subtypes at run time than it had at
        compile time, or if an enum class has a different set of enum constants
        at runtime than it had at compile time, or if the type hierarchy has
        been changed in some incompatible way between compile time and run time.

- `null` values and nested patterns involving sealed classes. If,
        for example, an interface `I` is `sealed` with two permitted
        subclasses `A` and `B`, and a record class `R` has a
        single component of type `I`, then the two record patterns `R(A a)` and `R(B b)` together are considered to be exhaustive for
        the type `R`, but neither of these patterns will match against the
        result of `new R(null)`.

- `null` values and nested record patterns. Given a record class
        `S` with a single component of type `T`, where `T` is
        another record class with a single component of type `String`,
        then the nested record pattern `R(S(var s))` is considered
        exhaustive for the type `R` but it does not match against the
        result of `new R(null)` (whereas it does match against the result
        of `new R(new S(null))` does).

`MatchException` may also be thrown by the process of pattern matching
a value against a pattern. For example, pattern matching involving a record
pattern may require accessor methods to be implicitly invoked in order to
extract the component values. If any of these accessor methods throws an
exception, pattern matching completes abruptly and throws `MatchException`. The original exception will be set as a cause of the `MatchException`. No suppressed exceptions will be
recorded.

**JLS:** 14.11.3 Execution of a `switch` Statement

**JLS:** 14.30.2 Pattern Matching

**JLS:** 15.28.2 Run-Time Evaluation of `switch` Expressions

**Since:** 21

## MatchException.MatchException(String, Throwable)

```java
public MatchException(String message, Throwable cause)
```

Constructs an `MatchException` with the specified detail message and
cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
