---
title: "Stream interface (java.util.stream) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Stream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stream interface (java.util.stream) (part 2 of 5)

## Stream.mapMultiToInt(BiConsumer<? super T, ? super IntConsumer>)

```java
default IntStream mapMultiToInt(BiConsumer<? super T, ? super IntConsumer> mapper)
```

Returns an `IntStream` consisting of the results of replacing each
element of this stream with multiple elements, specifically zero or more
elements.
Replacement is performed by applying the provided mapping function to each
element in conjunction with a consumer argument
that accepts replacement elements. The mapping function calls the consumer
zero or more times to provide the replacement elements.

This is an intermediate
operation.

If the consumer argument is used outside the scope of
its application to the mapping function, the results are undefined.

Parameters:

- `mapper`: a non-interfering, stateless function that generates replacement elements

**Implementation requirements:** The default implementation invokes flatMapToInt on this stream,
passing a function that behaves as follows. First, it calls the mapper function
with an `IntConsumer` that accumulates replacement elements into a newly created
internal buffer. When the mapper function returns, it creates an `IntStream` from
the internal buffer. Finally, it returns this stream to `flatMapToInt`.

**Returns:** the new stream

**See also:** #mapMulti mapMulti

**Since:** 16

## Stream.mapMultiToLong(BiConsumer<? super T, ? super LongConsumer>)

```java
default LongStream mapMultiToLong(BiConsumer<? super T, ? super LongConsumer> mapper)
```

Returns a `LongStream` consisting of the results of replacing each
element of this stream with multiple elements, specifically zero or more
elements.
Replacement is performed by applying the provided mapping function to each
element in conjunction with a consumer argument
that accepts replacement elements. The mapping function calls the consumer
zero or more times to provide the replacement elements.

This is an intermediate
operation.

If the consumer argument is used outside the scope of
its application to the mapping function, the results are undefined.

Parameters:

- `mapper`: a non-interfering, stateless function that generates replacement elements

**Implementation requirements:** The default implementation invokes flatMapToLong on this stream,
passing a function that behaves as follows. First, it calls the mapper function
with a `LongConsumer` that accumulates replacement elements into a newly created
internal buffer. When the mapper function returns, it creates a `LongStream` from
the internal buffer. Finally, it returns this stream to `flatMapToLong`.

**Returns:** the new stream

**See also:** #mapMulti mapMulti

**Since:** 16

## Stream.mapMultiToDouble(BiConsumer<? super T, ? super DoubleConsumer>)

```java
default DoubleStream mapMultiToDouble(BiConsumer<? super T, ? super DoubleConsumer> mapper)
```

Returns a `DoubleStream` consisting of the results of replacing each
element of this stream with multiple elements, specifically zero or more
elements.
Replacement is performed by applying the provided mapping function to each
element in conjunction with a consumer argument
that accepts replacement elements. The mapping function calls the consumer
zero or more times to provide the replacement elements.

This is an intermediate
operation.

If the consumer argument is used outside the scope of
its application to the mapping function, the results are undefined.

Parameters:

- `mapper`: a non-interfering, stateless function that generates replacement elements

**Implementation requirements:** The default implementation invokes flatMapToDouble on this stream,
passing a function that behaves as follows. First, it calls the mapper function
with an `DoubleConsumer` that accumulates replacement elements into a newly created
internal buffer. When the mapper function returns, it creates a `DoubleStream` from
the internal buffer. Finally, it returns this stream to `flatMapToDouble`.

**Returns:** the new stream

**See also:** #mapMulti mapMulti

**Since:** 16

## Stream.distinct()

```java
Stream<T> distinct()
```

Returns a stream consisting of the distinct elements (according to
`Object.equals(Object)`) of this stream.

For ordered streams, the selection of distinct elements is stable
(for duplicated elements, the element appearing first in the encounter
order is preserved.)  For unordered streams, no stability guarantees
are made.

This is a stateful
intermediate operation.

**API note:** Preserving stability for `distinct()` in parallel pipelines is
relatively expensive (requires that the operation act as a full barrier,
with substantial buffering overhead), and stability is often not needed.
Using an unordered stream source (such as `generate(Supplier)`)
or removing the ordering constraint with `unordered()` may result
in significantly more efficient execution for `distinct()` in parallel
pipelines, if the semantics of your situation permit.  If consistency
with encounter order is required, and you are experiencing poor performance
or memory utilization with `distinct()` in parallel pipelines,
switching to sequential execution with `sequential()` may improve
performance.

**Returns:** the new stream

## Stream.sorted()

```java
Stream<T> sorted()
```

Returns a stream consisting of the elements of this stream, sorted
according to natural order.  If the elements of this stream are not
`Comparable`, a `java.lang.ClassCastException` may be thrown
when the terminal operation is executed.

For ordered streams, the sort is stable.  For unordered streams, no
stability guarantees are made.

This is a stateful
intermediate operation.

**Returns:** the new stream

## Stream.sorted(Comparator<? super T>)

```java
Stream<T> sorted(Comparator<? super T> comparator)
```

Returns a stream consisting of the elements of this stream, sorted
according to the provided `Comparator`.

For ordered streams, the sort is stable.  For unordered streams, no
stability guarantees are made.

This is a stateful
intermediate operation.

Parameters:

- `comparator`: a non-interfering, stateless `Comparator` to be used to compare stream elements

**Returns:** the new stream

## Stream.peek(Consumer<? super T>)

```java
Stream<T> peek(Consumer<? super T> action)
```

Returns a stream consisting of the elements of this stream, additionally
performing the provided action on each element as elements are consumed
from the resulting stream.

This is an intermediate
operation.

For parallel stream pipelines, the action may be called at
whatever time and in whatever thread the element is made available by the
upstream operation.  If the action modifies shared state,
it is responsible for providing the required synchronization.

Parameters:

- `action`: a  non-interfering action to perform on the elements as they are consumed from the stream

**API note:** This method exists mainly to support debugging, where you want
to see the elements as they flow past a certain point in a pipeline:

```java
    Stream.of("one", "two", "three", "four")
        .filter(e -> e.length() > 3)
        .peek(e -> System.out.println("Filtered value: " + e))
        .map(String::toUpperCase)
        .peek(e -> System.out.println("Mapped value: " + e))
        .collect(Collectors.toList());
```

In cases where the stream implementation is able to optimize away the
production of some or all the elements (such as with short-circuiting
operations like `findFirst`, or in the example described in
`count`), the action will not be invoked for those elements.

**Returns:** the new stream

## Stream.limit(long)

```java
Stream<T> limit(long maxSize)
```

Returns a stream consisting of the elements of this stream, truncated
to be no longer than `maxSize` in length.

This is a short-circuiting
stateful intermediate operation.

Parameters:

- `maxSize`: the number of elements the stream should be limited to

**API note:** While `limit()` is generally a cheap operation on sequential
stream pipelines, it can be quite expensive on ordered parallel pipelines,
especially for large values of `maxSize`, since `limit(n)`
is constrained to return not just any *n* elements, but the
*first n* elements in the encounter order.  Using an unordered
stream source (such as `generate(Supplier)`) or removing the
ordering constraint with `unordered()` may result in significant
speedups of `limit()` in parallel pipelines, if the semantics of
your situation permit.  If consistency with encounter order is required,
and you are experiencing poor performance or memory utilization with
`limit()` in parallel pipelines, switching to sequential execution
with `sequential()` may improve performance.

**Returns:** the new stream

Throws:

- `IllegalArgumentException`: if `maxSize` is negative

## Stream.skip(long)

```java
Stream<T> skip(long n)
```

Returns a stream consisting of the remaining elements of this stream
after discarding the first `n` elements of the stream.
If this stream contains fewer than `n` elements then an
empty stream will be returned.

This is a stateful
intermediate operation.

Parameters:

- `n`: the number of leading elements to skip

**API note:** While `skip()` is generally a cheap operation on sequential
stream pipelines, it can be quite expensive on ordered parallel pipelines,
especially for large values of `n`, since `skip(n)`
is constrained to skip not just any *n* elements, but the
*first n* elements in the encounter order.  Using an unordered
stream source (such as `generate(Supplier)`) or removing the
ordering constraint with `unordered()` may result in significant
speedups of `skip()` in parallel pipelines, if the semantics of
your situation permit.  If consistency with encounter order is required,
and you are experiencing poor performance or memory utilization with
`skip()` in parallel pipelines, switching to sequential execution
with `sequential()` may improve performance.

**Returns:** the new stream

Throws:

- `IllegalArgumentException`: if `n` is negative

## Stream.takeWhile(Predicate<? super T>)

```java
default Stream<T> takeWhile(Predicate<? super T> predicate)
```

Returns, if this stream is ordered, a stream consisting of the longest
prefix of elements taken from this stream that match the given predicate.
Otherwise returns, if this stream is unordered, a stream consisting of a
subset of elements taken from this stream that match the given predicate.

If this stream is ordered then the longest prefix is a contiguous
sequence of elements of this stream that match the given predicate.  The
first element of the sequence is the first element of this stream, and
the element immediately following the last element of the sequence does
not match the given predicate.

If this stream is unordered, and some (but not all) elements of this
stream match the given predicate, then the behavior of this operation is
nondeterministic; it is free to take any subset of matching elements
(which includes the empty set).

Independent of whether this stream is ordered or unordered if all
elements of this stream match the given predicate then this operation
takes all elements (the result is the same as the input), or if no
elements of the stream match the given predicate then no elements are
taken (the result is an empty stream).

This is a short-circuiting
stateful intermediate operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to elements to determine the longest prefix of elements.

**Implementation requirements:** The default implementation obtains the spliterator
of this stream, wraps that spliterator so as to support the semantics
of this operation on traversal, and returns a new stream associated with
the wrapped spliterator.  The returned stream preserves the execution
characteristics of this stream (namely parallel or sequential execution
as per `isParallel()`) but the wrapped spliterator may choose to
not support splitting.  When the returned stream is closed, the close
handlers for both the returned and this stream are invoked.

**API note:** While `takeWhile()` is generally a cheap operation on sequential
stream pipelines, it can be quite expensive on ordered parallel
pipelines, since the operation is constrained to return not just any
valid prefix, but the longest prefix of elements in the encounter order.
Using an unordered stream source (such as `generate(Supplier)`) or
removing the ordering constraint with `unordered()` may result in
significant speedups of `takeWhile()` in parallel pipelines, if the
semantics of your situation permit.  If consistency with encounter order
is required, and you are experiencing poor performance or memory
utilization with `takeWhile()` in parallel pipelines, switching to
sequential execution with `sequential()` may improve performance.

**Returns:** the new stream

**Since:** 9
