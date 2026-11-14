---
title: "IntStream interface (java.util.stream) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/IntStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntStream interface (java.util.stream) (part 2 of 3)

## IntStream.forEach(IntConsumer)

```java
void forEach(IntConsumer action)
```

Performs an action for each element of this stream.

This is a terminal
operation.

For parallel stream pipelines, this operation does *not*
guarantee to respect the encounter order of the stream, as doing so
would sacrifice the benefit of parallelism.  For any given element, the
action may be performed at whatever time and in whatever thread the
library chooses.  If the action accesses shared state, it is
responsible for providing the required synchronization.

Parameters:

- `action`: a  non-interfering action to perform on the elements

## IntStream.forEachOrdered(IntConsumer)

```java
void forEachOrdered(IntConsumer action)
```

Performs an action for each element of this stream, guaranteeing that
each element is processed in encounter order for streams that have a
defined encounter order.

This is a terminal
operation.

Parameters:

- `action`: a  non-interfering action to perform on the elements

**See also:** #forEach(IntConsumer)

## IntStream.toArray()

```java
int[] toArray()
```

Returns an array containing the elements of this stream.

This is a terminal
operation.

**Returns:** an array containing the elements of this stream

## IntStream.reduce(int, IntBinaryOperator)

```java
int reduce(int identity, IntBinaryOperator op)
```

Performs a reduction on the
elements of this stream, using the provided identity value and an
associative
accumulation function, and returns the reduced value.  This is equivalent
to:

```java
    int result = identity;
    for (int element : this stream)
        result = accumulator.applyAsInt(result, element)
    return result;
```

but is not constrained to execute sequentially.

The `identity` value must be an identity for the accumulator
function. This means that for all `x`,
`accumulator.apply(identity, x)` is equal to `x`.
The `accumulator` function must be an
associative function.

This is a terminal
operation.

Parameters:

- `identity`: the identity value for the accumulating function
- `op`: an associative, non-interfering, stateless function for combining two values

**API note:** Sum, min and max are all special cases of reduction that can be
expressed using this method.
For example, summing a stream can be expressed as:

```java
    int sum = integers.reduce(0, (a, b) -> a+b);
```

or more compactly:

```java
    int sum = integers.reduce(0, Integer::sum);
```

While this may seem a more roundabout way to perform an aggregation
compared to simply mutating a running total in a loop, reduction
operations parallelize more gracefully, without needing additional
synchronization and with greatly reduced risk of data races.

**Returns:** the result of the reduction

**See also:** #sum()

**See also:** #min()

**See also:** #max()

**See also:** #average()

## IntStream.reduce(IntBinaryOperator)

```java
OptionalInt reduce(IntBinaryOperator op)
```

Performs a reduction on the
elements of this stream, using an
associative accumulation
function, and returns an `OptionalInt` describing the reduced value,
if any. This is equivalent to:

```java
    boolean foundAny = false;
    int result = null;
    for (int element : this stream) {
        if (!foundAny) {
            foundAny = true;
            result = element;
        }
        else
            result = accumulator.applyAsInt(result, element);
    }
    return foundAny ? OptionalInt.of(result) : OptionalInt.empty();
```

but is not constrained to execute sequentially.

The `accumulator` function must be an
associative function.

This is a terminal
operation.

Parameters:

- `op`: an associative, non-interfering, stateless function for combining two values

**Returns:** the result of the reduction

**See also:** #reduce(int, IntBinaryOperator)

## IntStream.collect(Supplier<R>, ObjIntConsumer<R>, BiConsumer<R, R>)

```java
<R> R collect(Supplier<R> supplier, ObjIntConsumer<R> accumulator, BiConsumer<R, R> combiner)
```

Performs a mutable
reduction operation on the elements of this stream.  A mutable
reduction is one in which the reduced value is a mutable result container,
such as an `ArrayList`, and elements are incorporated by updating
the state of the result rather than by replacing the result.  This
produces a result equivalent to:

```java
    R result = supplier.get();
    for (int element : this stream)
        accumulator.accept(result, element);
    return result;
```

Like IntBinaryOperator), `collect` operations
can be parallelized without requiring additional synchronization.

This is a terminal
operation.

Parameters:

- `<R>`: the type of the mutable result container
- `supplier`: a function that creates a new mutable result container. For a parallel execution, this function may be called multiple times and must return a fresh value each time.
- `accumulator`: an associative, non-interfering, stateless function that must fold an element into a result container.
- `combiner`: an associative, non-interfering, stateless function that accepts two partial result containers and merges them, which must be compatible with the accumulator function. The combiner function must fold the elements from the second result container into the first result container.

**Returns:** the result of the reduction

**See also:** Stream#collect(Supplier, BiConsumer, BiConsumer)

## IntStream.sum()

```java
int sum()
```

Returns the sum of elements in this stream.  This is a special case
of a reduction
and is equivalent to:

```java
    return reduce(0, Integer::sum);
```

This is a terminal
operation.

**Returns:** the sum of elements in this stream

## IntStream.min()

```java
OptionalInt min()
```

Returns an `OptionalInt` describing the minimum element of this
stream, or an empty optional if this stream is empty.  This is a special
case of a reduction
and is equivalent to:

```java
    return reduce(Integer::min);
```

This is a terminal operation.

**Returns:** an `OptionalInt` containing the minimum element of this
stream, or an empty `OptionalInt` if the stream is empty

## IntStream.max()

```java
OptionalInt max()
```

Returns an `OptionalInt` describing the maximum element of this
stream, or an empty optional if this stream is empty.  This is a special
case of a reduction
and is equivalent to:

```java
    return reduce(Integer::max);
```

This is a terminal
operation.

**Returns:** an `OptionalInt` containing the maximum element of this
stream, or an empty `OptionalInt` if the stream is empty

## IntStream.count()

```java
long count()
```

Returns the count of elements in this stream.  This is a special case of
a reduction and is
equivalent to:

```java
    return mapToLong(e -> 1L).sum();
```

This is a terminal operation.

**API note:** An implementation may choose to not execute the stream pipeline (either
sequentially or in parallel) if it is capable of computing the count
directly from the stream source.  In such cases no source elements will
be traversed and no intermediate operations will be evaluated.
Behavioral parameters with side-effects, which are strongly discouraged
except for harmless cases such as debugging, may be affected.  For
example, consider the following stream:

```java
    IntStream s = IntStream.of(1, 2, 3, 4);
    long count = s.peek(System.out::println).count();
```

The number of elements covered by the stream source is known and the
intermediate operation, `peek`, does not inject into or remove
elements from the stream (as may be the case for `flatMap` or
`filter` operations).  Thus the count is 4 and there is no need to
execute the pipeline and, as a side-effect, print out the elements.

**Returns:** the count of elements in this stream

## IntStream.average()

```java
OptionalDouble average()
```

Returns an `OptionalDouble` describing the arithmetic mean of elements of
this stream, or an empty optional if this stream is empty.  This is a
special case of a
reduction.

This is a terminal
operation.

**Returns:** an `OptionalDouble` containing the average element of this
stream, or an empty optional if the stream is empty

## IntStream.summaryStatistics()

```java
IntSummaryStatistics summaryStatistics()
```

Returns an `IntSummaryStatistics` describing various
summary data about the elements of this stream.  This is a special
case of a reduction.

This is a terminal
operation.

**Returns:** an `IntSummaryStatistics` describing various summary data
about the elements of this stream

## IntStream.anyMatch(IntPredicate)

```java
boolean anyMatch(IntPredicate predicate)
```

Returns whether any elements of this stream match the provided
predicate.  May not evaluate the predicate on all elements if not
necessary for determining the result.  If the stream is empty then
`false` is returned and the predicate is not evaluated.

This is a short-circuiting
terminal operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to elements of this stream

**API note:** This method evaluates the *existential quantification* of the
predicate over the elements of the stream (for some x P(x)).

**Returns:** `true` if any elements of the stream match the provided
predicate, otherwise `false`

## IntStream.allMatch(IntPredicate)

```java
boolean allMatch(IntPredicate predicate)
```

Returns whether all elements of this stream match the provided predicate.
May not evaluate the predicate on all elements if not necessary for
determining the result.  If the stream is empty then `true` is
returned and the predicate is not evaluated.

This is a short-circuiting
terminal operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to elements of this stream

**API note:** This method evaluates the *universal quantification* of the
predicate over the elements of the stream (for all x P(x)).  If the
stream is empty, the quantification is said to be *vacuously
satisfied* and is always `true` (regardless of P(x)).

**Returns:** `true` if either all elements of the stream match the
provided predicate or the stream is empty, otherwise `false`

## IntStream.noneMatch(IntPredicate)

```java
boolean noneMatch(IntPredicate predicate)
```

Returns whether no elements of this stream match the provided predicate.
May not evaluate the predicate on all elements if not necessary for
determining the result.  If the stream is empty then `true` is
returned and the predicate is not evaluated.

This is a short-circuiting
terminal operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to elements of this stream

**API note:** This method evaluates the *universal quantification* of the
negated predicate over the elements of the stream (for all x ~P(x)).  If
the stream is empty, the quantification is said to be vacuously satisfied
and is always `true`, regardless of P(x).

**Returns:** `true` if either no elements of the stream match the
provided predicate or the stream is empty, otherwise `false`

## IntStream.findFirst()

```java
OptionalInt findFirst()
```

Returns an `OptionalInt` describing the first element of this
stream, or an empty `OptionalInt` if the stream is empty.  If the
stream has no encounter order, then any element may be returned.

This is a short-circuiting
terminal operation.

**Returns:** an `OptionalInt` describing the first element of this stream,
or an empty `OptionalInt` if the stream is empty

## IntStream.findAny()

```java
OptionalInt findAny()
```

Returns an `OptionalInt` describing some element of the stream, or
an empty `OptionalInt` if the stream is empty.

This is a short-circuiting
terminal operation.

The behavior of this operation is explicitly nondeterministic; it is
free to select any element in the stream.  This is to allow for maximal
performance in parallel operations; the cost is that multiple invocations
on the same source may not return the same result.  (If a stable result
is desired, use `findFirst()` instead.)

**Returns:** an `OptionalInt` describing some element of this stream, or
an empty `OptionalInt` if the stream is empty

**See also:** #findFirst()

## IntStream.asLongStream()

```java
LongStream asLongStream()
```

Returns a `LongStream` consisting of the elements of this stream,
converted to `long`.

This is an intermediate
operation.

**Returns:** a `LongStream` consisting of the elements of this stream,
converted to `long`

## IntStream.asDoubleStream()

```java
DoubleStream asDoubleStream()
```

Returns a `DoubleStream` consisting of the elements of this stream,
converted to `double`.

This is an intermediate
operation.

**Returns:** a `DoubleStream` consisting of the elements of this stream,
converted to `double`

## IntStream.boxed()

```java
Stream<Integer> boxed()
```

Returns a `Stream` consisting of the elements of this stream,
each boxed to an `Integer`.

This is an intermediate
operation.

**Returns:** a `Stream` consistent of the elements of this stream,
each boxed to an `Integer`

## IntStream.builder()

```java
public static Builder builder()
```

Returns a builder for an `IntStream`.

**Returns:** a stream builder

## IntStream.empty()

```java
public static IntStream empty()
```

Returns an empty sequential `IntStream`.

**Returns:** an empty sequential stream

## IntStream.of(int)

```java
public static IntStream of(int t)
```

Returns a sequential `IntStream` containing a single element.

Parameters:

- `t`: the single element

**Returns:** a singleton sequential stream

## IntStream.of(int...)

```java
public static IntStream of(int... values)
```

Returns a sequential ordered stream whose elements are the specified values.

Parameters:

- `values`: the elements of the new stream

**Returns:** the new stream

## IntStream.iterate(int, IntUnaryOperator)

```java
public static IntStream iterate(final int seed, final IntUnaryOperator f)
```

Returns an infinite sequential ordered `IntStream` produced by iterative
application of a function `f` to an initial element `seed`,
producing a `Stream` consisting of `seed`, `f(seed)`,
`f(f(seed))`, etc.

The first element (position `0`) in the `IntStream` will be
the provided `seed`.  For `n > 0`, the element at position
`n`, will be the result of applying the function `f` to the
element at position `n - 1`.

The action of applying `f` for one element
*happens-before*
the action of applying `f` for subsequent elements.  For any given
element the action may be performed in whatever thread the library
chooses.

Parameters:

- `seed`: the initial element
- `f`: a function to be applied to the previous element to produce a new element

**Returns:** a new sequential `IntStream`
