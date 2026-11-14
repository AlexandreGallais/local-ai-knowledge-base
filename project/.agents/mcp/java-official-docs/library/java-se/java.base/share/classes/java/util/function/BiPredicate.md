---
title: "BiPredicate interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/BiPredicate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BiPredicate interface (java.util.function)

```java
public interface BiPredicate<T, U>
```

Represents a predicate (boolean-valued function) of two arguments.  This is
the two-arity specialization of `Predicate`.

This is a functional interface
whose functional method is Object).

Parameters:

- `<T>`: the type of the first argument to the predicate
- ``: the type of the second argument the predicate

**See also:** Predicate

**Since:** 1.8

## BiPredicate.test(T, U)

```java
boolean test(T t, U u)
```

Evaluates this predicate on the given arguments.

Parameters:

- `t`: the first input argument
- `u`: the second input argument

**Returns:** `true` if the input arguments match the predicate,
otherwise `false`

## BiPredicate.and(BiPredicate<? super T, ? super U>)

```java
default BiPredicate<T, U> and(BiPredicate<? super T, ? super U> other)
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

## BiPredicate.negate()

```java
default BiPredicate<T, U> negate()
```

Returns a predicate that represents the logical negation of this
predicate.

**Returns:** a predicate that represents the logical negation of this
predicate

## BiPredicate.or(BiPredicate<? super T, ? super U>)

```java
default BiPredicate<T, U> or(BiPredicate<? super T, ? super U> other)
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
