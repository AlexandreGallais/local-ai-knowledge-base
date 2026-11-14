---
title: "Spliterator interface (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Spliterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Spliterator interface (java.util) (part 2 of 2)

## Spliterator.estimateSize()

```java
long estimateSize()
```

Returns an estimate of the number of elements that would be
encountered by a `forEachRemaining` traversal, or returns `Long.MAX_VALUE` if infinite, unknown, or too expensive to compute.

If this Spliterator is `SIZED` and has not yet been partially
traversed or split, or this Spliterator is `SUBSIZED` and has
not yet been partially traversed, this estimate must be an accurate
count of elements that would be encountered by a complete traversal.
Otherwise, this estimate may be arbitrarily inaccurate, but must decrease
as specified across invocations of `trySplit`.

**API note:** Even an inexact estimate is often useful and inexpensive to compute.
For example, a sub-spliterator of an approximately balanced binary tree
may return a value that estimates the number of elements to be half of
that of its parent; if the root Spliterator does not maintain an
accurate count, it could estimate size to be the power of two
corresponding to its maximum depth.

**Returns:** the estimated size, or `Long.MAX_VALUE` if infinite,
        unknown, or too expensive to compute.

## Spliterator.getExactSizeIfKnown()

```java
default long getExactSizeIfKnown()
```

Convenience method that returns `estimateSize()` if this
Spliterator is `SIZED`, else `-1`.

**Implementation requirements:** The default implementation returns the result of `estimateSize()`
if the Spliterator reports a characteristic of `SIZED`, and
`-1` otherwise.

**Returns:** the exact size, if known, else `-1`.

## Spliterator.characteristics()

```java
int characteristics()
```

Returns a set of characteristics of this Spliterator and its
elements. The result is represented as ORed values from `ORDERED`, `DISTINCT`, `SORTED`, `SIZED`,
`NONNULL`, `IMMUTABLE`, `CONCURRENT`,
`SUBSIZED`.  Repeated calls to `characteristics()` on
a given spliterator, prior to or in-between calls to `trySplit`,
should always return the same result.

If a Spliterator reports an inconsistent set of
characteristics (either those returned from a single invocation
or across multiple invocations), no guarantees can be made
about any computation using this Spliterator.

**API note:** The characteristics of a given spliterator before splitting
may differ from the characteristics after splitting.  For specific
examples see the characteristic values `SIZED`, `SUBSIZED`
and `CONCURRENT`.

**Returns:** a representation of characteristics

## Spliterator.hasCharacteristics(int)

```java
default boolean hasCharacteristics(int characteristics)
```

Returns `true` if this Spliterator's `characteristics` contain all of the given characteristics.

Parameters:

- `characteristics`: the characteristics to check for

**Implementation requirements:** The default implementation returns true if the corresponding bits
of the given characteristics are set.

**Returns:** `true` if all the specified characteristics are present,
else `false`

## Spliterator.getComparator()

```java
default Comparator<? super T> getComparator()
```

If this Spliterator's source is `SORTED` by a `Comparator`,
returns that `Comparator`. If the source is `SORTED` in
natural order, returns `null`.  Otherwise,
if the source is not `SORTED`, throws `IllegalStateException`.

**Implementation requirements:** The default implementation always throws `IllegalStateException`.

**Returns:** a Comparator, or `null` if the elements are sorted in the
natural order.

Throws:

- `IllegalStateException`: if the spliterator does not report a characteristic of `SORTED`.

## Spliterator.ORDERED

```java
public static final int ORDERED
```

Characteristic value signifying that an encounter order is defined for
elements. If so, this Spliterator guarantees that method
`trySplit` splits a strict prefix of elements, that method
`tryAdvance` steps by one element in prefix order, and that
`forEachRemaining` performs actions in encounter order.

A `Collection` has an encounter order if the corresponding
`Collection.iterator` documents an order. If so, the encounter
order is the same as the documented order. Otherwise, a collection does
not have an encounter order.

**API note:** Encounter order is guaranteed to be ascending index order for
any `List`. But no order is guaranteed for hash-based collections
such as `HashSet`. Clients of a Spliterator that reports
`ORDERED` are expected to preserve ordering constraints in
non-commutative parallel computations.

## Spliterator.DISTINCT

```java
public static final int DISTINCT
```

Characteristic value signifying that, for each pair of
encountered elements `x, y`, `!x.equals(y)`. This
applies for example, to a Spliterator based on a `Set`.

## Spliterator.SORTED

```java
public static final int SORTED
```

Characteristic value signifying that encounter order follows a defined
sort order. If so, method `getComparator()` returns the associated
Comparator, or `null` if all elements are `Comparable` and
are sorted by their natural ordering.

A Spliterator that reports `SORTED` must also report
`ORDERED`.

**API note:** The spliterators for `Collection` classes in the JDK that
implement `NavigableSet` or `SortedSet` report `SORTED`.

## Spliterator.SIZED

```java
public static final int SIZED
```

Characteristic value signifying that the value returned from
`estimateSize()` prior to traversal or splitting represents a
finite size that, in the absence of structural source modification,
represents an exact count of the number of elements that would be
encountered by a complete traversal.

**API note:** Most Spliterators for Collections, that cover all elements of a
`Collection` report this characteristic. Sub-spliterators, such as
those for `HashSet`, that cover a sub-set of elements and
approximate their reported size do not.

## Spliterator.NONNULL

```java
public static final int NONNULL
```

Characteristic value signifying that the source guarantees that
encountered elements will not be `null`. (This applies,
for example, to most concurrent collections, queues, and maps.)

## Spliterator.IMMUTABLE

```java
public static final int IMMUTABLE
```

Characteristic value signifying that the element source cannot be
structurally modified; that is, elements cannot be added, replaced, or
removed, so such changes cannot occur during traversal. A Spliterator
that does not report `IMMUTABLE` or `CONCURRENT` is expected
to have a documented policy (for example throwing
`ConcurrentModificationException`) concerning structural
interference detected during traversal.

## Spliterator.CONCURRENT

```java
public static final int CONCURRENT
```

Characteristic value signifying that the element source may be safely
concurrently modified (allowing additions, replacements, and/or removals)
by multiple threads without external synchronization. If so, the
Spliterator is expected to have a documented policy concerning the impact
of modifications during traversal.

A top-level Spliterator should not report both `CONCURRENT` and
`SIZED`, since the finite size, if known, may change if the source
is concurrently modified during traversal. Such a Spliterator is
inconsistent and no guarantees can be made about any computation using
that Spliterator. Sub-spliterators may report `SIZED` if the
sub-split size is known and additions or removals to the source are not
reflected when traversing.

A top-level Spliterator should not report both `CONCURRENT` and
`IMMUTABLE`, since they are mutually exclusive. Such a Spliterator
is inconsistent and no guarantees can be made about any computation using
that Spliterator. Sub-spliterators may report `IMMUTABLE` if
additions or removals to the source are not reflected when traversing.

**API note:** Most concurrent collections maintain a consistency policy
guaranteeing accuracy with respect to elements present at the point of
Spliterator construction, but possibly not reflecting subsequent
additions or removals.

## Spliterator.SUBSIZED

```java
public static final int SUBSIZED
```

Characteristic value signifying that all Spliterators resulting from
`trySplit()` will be both `SIZED` and `SUBSIZED`.
(This means that all child Spliterators, whether direct or indirect, will
be `SIZED`.)

A Spliterator that does not report `SIZED` as required by
`SUBSIZED` is inconsistent and no guarantees can be made about any
computation using that Spliterator.

**API note:** Some spliterators, such as the top-level spliterator for an
approximately balanced binary tree, will report `SIZED` but not
`SUBSIZED`, since it is common to know the size of the entire tree
but not the exact sizes of subtrees.

## Spliterator.tryAdvance(T_CONS)

```java
boolean tryAdvance(T_CONS action)
```

If a remaining element exists, performs the given action on it,
returning `true`; else returns `false`.  If this
Spliterator is `ORDERED` the action is performed on the
next element in encounter order.  Exceptions thrown by the
action are relayed to the caller.

Subsequent behavior of a spliterator is unspecified if the action throws
an exception.

Parameters:

- `action`: The action

**Returns:** `false` if no remaining elements existed
upon entry to this method, else `true`.

Throws:

- `NullPointerException`: if the specified action is null

## Spliterator.forEachRemaining(T_CONS)

```java
default void forEachRemaining(T_CONS action)
```

Performs the given action for each remaining element, sequentially in
the current thread, until all elements have been processed or the
action throws an exception.  If this Spliterator is `ORDERED`,
actions are performed in encounter order.  Exceptions thrown by the
action are relayed to the caller.

Subsequent behavior of a spliterator is unspecified if the action throws
an exception.

Parameters:

- `action`: The action

**Implementation requirements:** The default implementation repeatedly invokes `tryAdvance`
until it returns `false`.  It should be overridden whenever
possible.

Throws:

- `NullPointerException`: if the specified action is null

## Spliterator.tryAdvance(Consumer<? super Integer>)

```java
default boolean tryAdvance(Consumer<? super Integer> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `IntConsumer` then it is cast
to `IntConsumer` and passed to
`tryAdvance(java.util.function.IntConsumer)`; otherwise
the action is adapted to an instance of `IntConsumer`, by
boxing the argument of `IntConsumer`, and then passed to
`tryAdvance(java.util.function.IntConsumer)`.

## Spliterator.forEachRemaining(Consumer<? super Integer>)

```java
default void forEachRemaining(Consumer<? super Integer> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `IntConsumer` then it is cast
to `IntConsumer` and passed to
`forEachRemaining(java.util.function.IntConsumer)`; otherwise
the action is adapted to an instance of `IntConsumer`, by
boxing the argument of `IntConsumer`, and then passed to
`forEachRemaining(java.util.function.IntConsumer)`.

## Spliterator.tryAdvance(Consumer<? super Long>)

```java
default boolean tryAdvance(Consumer<? super Long> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `LongConsumer` then it is cast
to `LongConsumer` and passed to
`tryAdvance(java.util.function.LongConsumer)`; otherwise
the action is adapted to an instance of `LongConsumer`, by
boxing the argument of `LongConsumer`, and then passed to
`tryAdvance(java.util.function.LongConsumer)`.

## Spliterator.forEachRemaining(Consumer<? super Long>)

```java
default void forEachRemaining(Consumer<? super Long> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `LongConsumer` then it is cast
to `LongConsumer` and passed to
`forEachRemaining(java.util.function.LongConsumer)`; otherwise
the action is adapted to an instance of `LongConsumer`, by
boxing the argument of `LongConsumer`, and then passed to
`forEachRemaining(java.util.function.LongConsumer)`.

## Spliterator.tryAdvance(Consumer<? super Double>)

```java
default boolean tryAdvance(Consumer<? super Double> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `DoubleConsumer` then it is
cast to `DoubleConsumer` and passed to
`tryAdvance(java.util.function.DoubleConsumer)`; otherwise
the action is adapted to an instance of `DoubleConsumer`, by
boxing the argument of `DoubleConsumer`, and then passed to
`tryAdvance(java.util.function.DoubleConsumer)`.

## Spliterator.forEachRemaining(Consumer<? super Double>)

```java
default void forEachRemaining(Consumer<? super Double> action)
```

(inherited documentation)

**Implementation requirements:** If the action is an instance of `DoubleConsumer` then it is
cast to `DoubleConsumer` and passed to
`forEachRemaining(java.util.function.DoubleConsumer)`;
otherwise the action is adapted to an instance of
`DoubleConsumer`, by boxing the argument of
`DoubleConsumer`, and then passed to
`forEachRemaining(java.util.function.DoubleConsumer)`.
