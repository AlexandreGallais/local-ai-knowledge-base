---
title: "DoubleStream interface (java.util.stream) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/DoubleStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleStream interface (java.util.stream)

```java
public interface DoubleStream extends BaseStream<Double, DoubleStream>
```

A sequence of primitive double-valued elements supporting sequential and parallel
aggregate operations.  This is the `double` primitive specialization of
`Stream`.

The following example illustrates an aggregate operation using
`Stream` and `DoubleStream`, computing the sum of the weights of the
red widgets:

```java
    double sum = widgets.stream()
                        .filter(w -> w.getColor() == RED)
                        .mapToDouble(w -> w.getWeight())
                        .sum();
```

See the class documentation for `Stream` and the package documentation
for java.util.stream for additional
specification of streams, stream operations, stream pipelines, and
parallelism.

**Since:** 1.8

**See also:** Stream

**See also:** java.util.stream

## DoubleStream.filter(DoublePredicate)

```java
DoubleStream filter(DoublePredicate predicate)
```

Returns a stream consisting of the elements of this stream that match
the given predicate.

This is an intermediate
operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to each element to determine if it should be included

**Returns:** the new stream

## DoubleStream.map(DoubleUnaryOperator)

```java
DoubleStream map(DoubleUnaryOperator mapper)
```

Returns a stream consisting of the results of applying the given
function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## DoubleStream.mapToObj(DoubleFunction<? extends U>)

```java
<U> Stream<U> mapToObj(DoubleFunction<? extends U> mapper)
```

Returns an object-valued `Stream` consisting of the results of
applying the given function to the elements of this stream.

This is an
    intermediate operation.

Parameters:

- ``: the element type of the new stream
- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## DoubleStream.mapToInt(DoubleToIntFunction)

```java
IntStream mapToInt(DoubleToIntFunction mapper)
```

Returns an `IntStream` consisting of the results of applying the
given function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## DoubleStream.mapToLong(DoubleToLongFunction)

```java
LongStream mapToLong(DoubleToLongFunction mapper)
```

Returns a `LongStream` consisting of the results of applying the
given function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## DoubleStream.flatMap(DoubleFunction<? extends DoubleStream>)

```java
DoubleStream flatMap(DoubleFunction<? extends DoubleStream> mapper)
```

Returns a stream consisting of the results of replacing each element of
this stream with the contents of a mapped stream produced by applying
the provided mapping function to each element.  Each mapped stream is
closed after its contents
have been placed into this stream.  (If a mapped stream is `null`
an empty stream is used, instead.)

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element which produces a `DoubleStream` of new values

**Returns:** the new stream

**See also:** Stream#flatMap(Function)

## DoubleStream.mapMulti(DoubleMapMultiConsumer)

```java
default DoubleStream mapMulti(DoubleMapMultiConsumer mapper)
```

Returns a stream consisting of the results of replacing each element of
this stream with multiple elements, specifically zero or more elements.
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

**Implementation requirements:** The default implementation invokes flatMap on this stream,
passing a function that behaves as follows. First, it calls the mapper function
with a `DoubleConsumer` that accumulates replacement elements into a newly created
internal buffer. When the mapper function returns, it creates a `DoubleStream` from the
internal buffer. Finally, it returns this stream to `flatMap`.

**Returns:** the new stream

**See also:** Stream#mapMulti Stream.mapMulti

**Since:** 16

## DoubleStream.distinct()

```java
DoubleStream distinct()
```

Returns a stream consisting of the distinct elements of this stream. The
elements are compared for equality according to
double).

This is a stateful
intermediate operation.

**Returns:** the result stream

## DoubleStream.sorted()

```java
DoubleStream sorted()
```

Returns a stream consisting of the elements of this stream in sorted
order. The elements are compared for equality according to
double).

This is a stateful
intermediate operation.

**Returns:** the result stream

## DoubleStream.peek(DoubleConsumer)

```java
DoubleStream peek(DoubleConsumer action)
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
    DoubleStream.of(1, 2, 3, 4)
        .filter(e -> e > 2)
        .peek(e -> System.out.println("Filtered value: " + e))
        .map(e -> e * e)
        .peek(e -> System.out.println("Mapped value: " + e))
        .sum();
```

In cases where the stream implementation is able to optimize away the
production of some or all the elements (such as with short-circuiting
operations like `findFirst`, or in the example described in
`count`), the action will not be invoked for those elements.

**Returns:** the new stream

## DoubleStream.limit(long)

```java
DoubleStream limit(long maxSize)
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
stream source (such as `generate(DoubleSupplier)`) or removing the
ordering constraint with `unordered()` may result in significant
speedups of `limit()` in parallel pipelines, if the semantics of
your situation permit.  If consistency with encounter order is required,
and you are experiencing poor performance or memory utilization with
`limit()` in parallel pipelines, switching to sequential execution
with `sequential()` may improve performance.

**Returns:** the new stream

Throws:

- `IllegalArgumentException`: if `maxSize` is negative

## DoubleStream.skip(long)

```java
DoubleStream skip(long n)
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
stream source (such as `generate(DoubleSupplier)`) or removing the
ordering constraint with `unordered()` may result in significant
speedups of `skip()` in parallel pipelines, if the semantics of
your situation permit.  If consistency with encounter order is required,
and you are experiencing poor performance or memory utilization with
`skip()` in parallel pipelines, switching to sequential execution
with `sequential()` may improve performance.

**Returns:** the new stream

Throws:

- `IllegalArgumentException`: if `n` is negative

## DoubleStream.takeWhile(DoublePredicate)

```java
default DoubleStream takeWhile(DoublePredicate predicate)
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
Using an unordered stream source (such as
`generate(DoubleSupplier)`) or removing the ordering constraint
with `unordered()` may result in significant speedups of
`takeWhile()` in parallel pipelines, if the semantics of your
situation permit.  If consistency with encounter order is required, and
you are experiencing poor performance or memory utilization with
`takeWhile()` in parallel pipelines, switching to sequential
execution with `sequential()` may improve performance.

**Returns:** the new stream

**Since:** 9

## DoubleStream.dropWhile(DoublePredicate)

```java
default DoubleStream dropWhile(DoublePredicate predicate)
```

Returns, if this stream is ordered, a stream consisting of the remaining
elements of this stream after dropping the longest prefix of elements
that match the given predicate.  Otherwise returns, if this stream is
unordered, a stream consisting of the remaining elements of this stream
after dropping a subset of elements that match the given predicate.

If this stream is ordered then the longest prefix is a contiguous
sequence of elements of this stream that match the given predicate.  The
first element of the sequence is the first element of this stream, and
the element immediately following the last element of the sequence does
not match the given predicate.

If this stream is unordered, and some (but not all) elements of this
stream match the given predicate, then the behavior of this operation is
nondeterministic; it is free to drop any subset of matching elements
(which includes the empty set).

Independent of whether this stream is ordered or unordered if all
elements of this stream match the given predicate then this operation
drops all elements (the result is an empty stream), or if no elements of
the stream match the given predicate then no elements are dropped (the
result is the same as the input).

This is a stateful
intermediate operation.

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

**API note:** While `dropWhile()` is generally a cheap operation on sequential
stream pipelines, it can be quite expensive on ordered parallel
pipelines, since the operation is constrained to return not just any
valid prefix, but the longest prefix of elements in the encounter order.
Using an unordered stream source (such as
`generate(DoubleSupplier)`) or removing the ordering constraint
with `unordered()` may result in significant speedups of
`dropWhile()` in parallel pipelines, if the semantics of your
situation permit.  If consistency with encounter order is required, and
you are experiencing poor performance or memory utilization with
`dropWhile()` in parallel pipelines, switching to sequential
execution with `sequential()` may improve performance.

**Returns:** the new stream

**Since:** 9
