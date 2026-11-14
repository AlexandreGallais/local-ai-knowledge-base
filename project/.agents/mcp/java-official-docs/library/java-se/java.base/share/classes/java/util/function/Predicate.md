---
title: "Predicate interface (java.util.function)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/function/Predicate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Predicate interface (java.util.function)

```java
public interface Predicate<T>
```

Represents a predicate (boolean-valued function) of one argument.

This is a functional interface
whose functional method is `test(Object)`.

Parameters:

- `<T>`: the type of the input to the predicate

**Since:** 1.8

## Predicate.test(T)

```java
boolean test(T t)
```

Evaluates this predicate on the given argument.

Parameters:

- `t`: the input argument

**Returns:** `true` if the input argument matches the predicate,
otherwise `false`

## Predicate.and(Predicate<? super T>)

```java
default Predicate<T> and(Predicate<? super T> other)
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

## Predicate.negate()

```java
default Predicate<T> negate()
```

Returns a predicate that represents the logical negation of this
predicate.

**Returns:** a predicate that represents the logical negation of this
predicate

## Predicate.or(Predicate<? super T>)

```java
default Predicate<T> or(Predicate<? super T> other)
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

## Predicate.isEqual(Object)

```java
static <T> Predicate<T> isEqual(Object targetRef)
```

Returns a predicate that tests if two arguments are equal according
to Object).

Parameters:

- `<T>`: the type of arguments to the predicate
- `targetRef`: the object reference with which to compare for equality, which may be `null`

**Returns:** a predicate that tests if two arguments are equal according
to Object)

## Predicate.not(Predicate<? super T>)

```java
static <T> Predicate<T> not(Predicate<? super T> target)
```

Returns a predicate that is the negation of the supplied predicate.
This is accomplished by returning result of the calling
`target.negate()`.

Parameters:

- `<T>`: the type of arguments to the specified predicate
- `target`: predicate to negate

**Returns:** a predicate that negates the results of the supplied
        predicate

**Since:** 11

Throws:

- `NullPointerException`: if target is null
