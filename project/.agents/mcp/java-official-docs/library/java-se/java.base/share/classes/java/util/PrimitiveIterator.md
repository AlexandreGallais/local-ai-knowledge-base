---
title: "PrimitiveIterator interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/PrimitiveIterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrimitiveIterator interface (java.util)

```java
public interface PrimitiveIterator<T, T_CONS> extends Iterator<T>
```

A base type for primitive specializations of `Iterator`.  Specialized
subtypes are provided for int, long, and
double values.

The specialized subtype default implementations of `Iterator.next`
and `Iterator.forEachRemaining(java.util.function.Consumer)` box
primitive values to instances of their corresponding wrapper class.  Such
boxing may offset any advantages gained when using the primitive
specializations.  To avoid boxing, the corresponding primitive-based methods
should be used.  For example, `PrimitiveIterator.OfInt.nextInt()` and
`PrimitiveIterator.OfInt.forEachRemaining(java.util.function.IntConsumer)`
should be used in preference to `PrimitiveIterator.OfInt.next()` and
`PrimitiveIterator.OfInt.forEachRemaining(java.util.function.Consumer)`.

Iteration of primitive values using boxing-based methods
next() and
forEachRemaining(),
does not affect the order in which the values, transformed to boxed values,
are encountered.

Parameters:

- `<T>`: the type of elements returned by this PrimitiveIterator. The type must be a wrapper type for a primitive type, such as `Integer` for the primitive `int` type.
- `<T_CONS>`: the type of primitive consumer. The type must be a primitive specialization of `java.util.function.Consumer` for `T`, such as `java.util.function.IntConsumer` for `Integer`.

**Implementation note:** If the boolean system property `org.openjdk.java.util.stream.tripwire`
is set to `true` then diagnostic warnings are reported if boxing of
primitive values occur when operating on primitive subtype specializations.

**Since:** 1.8

## PrimitiveIterator.forEachRemaining(T_CONS)

```java
void forEachRemaining(T_CONS action)
```

Performs the given action for each remaining element until all elements
have been processed or the action throws an exception.  Actions are
performed in the order of iteration, if that order is specified.
Exceptions thrown by the action are relayed to the caller.

The behavior of an iterator is unspecified if the action modifies the
source of elements in any way (even by calling the remove
method or other mutator methods of `Iterator` subtypes),
unless an overriding class has specified a concurrent modification policy.

Subsequent behavior of an iterator is unspecified if the action throws an
exception.

Parameters:

- `action`: The action to be performed for each element

Throws:

- `NullPointerException`: if the specified action is null

## PrimitiveIterator.nextInt()

```java
int nextInt()
```

Returns the next `int` element in the iteration.

**Returns:** the next `int` element in the iteration

Throws:

- `NoSuchElementException`: if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(IntConsumer)

```java
default void forEachRemaining(IntConsumer action)
```

(inherited documentation)

**Implementation requirements:** The default implementation behaves as if:

```java
    while (hasNext())
        action.accept(nextInt());
```

## PrimitiveIterator.next()

```java
default Integer next()
```

(inherited documentation)

**Implementation requirements:** The default implementation boxes the result of calling
`nextInt()`, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Integer>)

```java
default void forEachRemaining(Consumer<? super Integer> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `IntConsumer` then it is cast
to `IntConsumer` and passed to `forEachRemaining`;
otherwise the action is adapted to an instance of
`IntConsumer`, by boxing the argument of `IntConsumer`,
and then passed to `forEachRemaining`.

## PrimitiveIterator.nextLong()

```java
long nextLong()
```

Returns the next `long` element in the iteration.

**Returns:** the next `long` element in the iteration

Throws:

- `NoSuchElementException`: if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(LongConsumer)

```java
default void forEachRemaining(LongConsumer action)
```

(inherited documentation)

**Implementation requirements:** The default implementation behaves as if:

```java
    while (hasNext())
        action.accept(nextLong());
```

## PrimitiveIterator.next()

```java
default Long next()
```

(inherited documentation)

**Implementation requirements:** The default implementation boxes the result of calling
`nextLong()`, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Long>)

```java
default void forEachRemaining(Consumer<? super Long> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `LongConsumer` then it is cast
to `LongConsumer` and passed to `forEachRemaining`;
otherwise the action is adapted to an instance of
`LongConsumer`, by boxing the argument of `LongConsumer`,
and then passed to `forEachRemaining`.

## PrimitiveIterator.nextDouble()

```java
double nextDouble()
```

Returns the next `double` element in the iteration.

**Returns:** the next `double` element in the iteration

Throws:

- `NoSuchElementException`: if the iteration has no more elements

## PrimitiveIterator.forEachRemaining(DoubleConsumer)

```java
default void forEachRemaining(DoubleConsumer action)
```

(inherited documentation)

**Implementation requirements:** The default implementation behaves as if:

```java
    while (hasNext())
        action.accept(nextDouble());
```

## PrimitiveIterator.next()

```java
default Double next()
```

(inherited documentation)

**Implementation requirements:** The default implementation boxes the result of calling
`nextDouble()`, and returns that boxed result.

## PrimitiveIterator.forEachRemaining(Consumer<? super Double>)

```java
default void forEachRemaining(Consumer<? super Double> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `DoubleConsumer` then it is
cast to `DoubleConsumer` and passed to
`forEachRemaining`; otherwise the action is adapted to
an instance of `DoubleConsumer`, by boxing the argument of
`DoubleConsumer`, and then passed to
`forEachRemaining`.
