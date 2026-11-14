---
title: "LongPredicate interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/LongPredicate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongPredicate interface (java.util.function)

```java
public interface LongPredicate
```

Represents a predicate (boolean-valued function) of one `long`-valued
argument. This is the `long`-consuming primitive type specialization of
`Predicate`.

This is a functional interface
whose functional method is `test(long)`.

**See also:** Predicate

**Since:** 1.8

## LongPredicate.test(long)

```java
boolean test(long value)
```

Evaluates this predicate on the given argument.

Parameters:

- `value`: the input argument

**Returns:** `true` if the input argument matches the predicate,
otherwise `false`

## LongPredicate.and(LongPredicate)

```java
default LongPredicate and(LongPredicate other)
```

Returns a composed predicate that represents a short-circuiting logical
AND of this predicate and another.  When evaluating the composed
predicate, if this predicate is `false`, then the `other`
predicate is not evaluated.

Any exceptions thrown during evaluation of either predicate are relayed
to the caller; if evaluation of this predicate throws an exception, the
`other` predicate will not be evaluated.

Parameters:

- `other`: a predicate that will be logically-ANDed with this predicate

**Returns:** a composed predicate that represents the short-circuiting logical
AND of this predicate and the `other` predicate

Throws:

- `NullPointerException`: if other is null

## LongPredicate.negate()

```java
default LongPredicate negate()
```

Returns a predicate that represents the logical negation of this
predicate.

**Returns:** a predicate that represents the logical negation of this
predicate

## LongPredicate.or(LongPredicate)

```java
default LongPredicate or(LongPredicate other)
```

Returns a composed predicate that represents a short-circuiting logical
OR of this predicate and another.  When evaluating the composed
predicate, if this predicate is `true`, then the `other`
predicate is not evaluated.

Any exceptions thrown during evaluation of either predicate are relayed
to the caller; if evaluation of this predicate throws an exception, the
`other` predicate will not be evaluated.

Parameters:

- `other`: a predicate that will be logically-ORed with this predicate

**Returns:** a composed predicate that represents the short-circuiting logical
OR of this predicate and the `other` predicate

Throws:

- `NullPointerException`: if other is null
