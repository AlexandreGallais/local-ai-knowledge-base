---
title: "Stream interface (java.util.stream) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Stream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stream interface (java.util.stream)

```java
public interface Stream<T> extends BaseStream<T, Stream<T>>
```

A sequence of elements supporting sequential and parallel aggregate
operations.  The following example illustrates an aggregate operation using
`Stream` and `IntStream`:

```java
    int sum = widgets.stream()
                     .filter(w -> w.getColor() == RED)
                     .mapToInt(w -> w.getWeight())
                     .sum();
```

In this example, `widgets` is a `Collection<Widget>`.  We create
a stream of `Widget` objects via Collection.stream(),
filter it to produce a stream containing only the red widgets, and then
transform it into a stream of `int` values representing the weight of
each red widget. Then this stream is summed to produce a total weight.

In addition to `Stream`, which is a stream of object references,
there are primitive specializations for `IntStream`, `LongStream`,
and `DoubleStream`, all of which are referred to as "streams" and
conform to the characteristics and restrictions described here.

To perform a computation, stream
operations are composed into a
*stream pipeline*.  A stream pipeline consists of a source (which
might be an array, a collection, a generator function, an I/O channel,
etc), zero or more *intermediate operations* (which transform a
stream into another stream, such as `Stream.filter(Predicate)`), and a
*terminal operation* (which produces a result or side-effect, such
as `Stream.count()` or `Stream.forEach(Consumer)`).
Streams are lazy; computation on the source data is only performed when the
terminal operation is initiated, and source elements are consumed only
as needed.

A stream implementation is permitted significant latitude in optimizing
the computation of the result.  For example, a stream implementation is free
to elide operations (or entire stages) from a stream pipeline -- and
therefore elide invocation of behavioral parameters -- if it can prove that
it would not affect the result of the computation.  This means that
side-effects of behavioral parameters may not always be executed and should
not be relied upon, unless otherwise specified (such as by the terminal
operations `forEach` and `forEachOrdered`). (For a specific
example of such an optimization, see the API note documented on the
`count` operation.  For more detail, see the
side-effects section of the
stream package documentation.)

Collections and streams, while bearing some superficial similarities,
have different goals.  Collections are primarily concerned with the efficient
management of, and access to, their elements.  By contrast, streams do not
provide a means to directly access or manipulate their elements, and are
instead concerned with declaratively describing their source and the
computational operations which will be performed in aggregate on that source.
However, if the provided stream operations do not offer the desired
functionality, the `iterator()` and `spliterator()` operations
can be used to perform a controlled traversal.

A stream pipeline, like the "widgets" example above, can be viewed as
a *query* on the stream source.  Unless the source was explicitly
designed for concurrent modification (such as a `ConcurrentHashMap`),
unpredictable or erroneous behavior may result from modifying the stream
source while it is being queried.

Most stream operations accept parameters that describe user-specified
behavior, such as the lambda expression `w -> w.getWeight()` passed to
`mapToInt` in the example above.  To preserve correct behavior,
these *behavioral parameters*:

- must be non-interfering
(they do not modify the stream source); and

- in most cases must be stateless
(their result should not depend on any state that might change during execution
of the stream pipeline).

Such parameters are always instances of a
functional interface such
as `java.util.function.Function`, and are often lambda expressions or
method references.  Unless otherwise specified these parameters must be
*non-null*.

A stream should be operated on (invoking an intermediate or terminal stream
operation) only once.  This rules out, for example, "forked" streams, where
the same source feeds two or more pipelines, or multiple traversals of the
same stream.  A stream implementation may throw `IllegalStateException`
if it detects that the stream is being reused. However, since some stream
operations may return their receiver rather than a new stream object, it may
not be possible to detect reuse in all cases.

Streams have a `close()` method and implement `AutoCloseable`.
Operating on a stream after it has been closed will throw `IllegalStateException`.
Most stream instances do not actually need to be closed after use, as they
are backed by collections, arrays, or generating functions, which require no
special resource management. Generally, only streams whose source is an IO channel,
such as those returned by `Files.lines(Path)`, will require closing. If a
stream does require closing, it must be opened as a resource within a try-with-resources
statement or similar control structure to ensure that it is closed promptly after its
operations have completed.

Stream pipelines may execute either sequentially or in
parallel.  This
execution mode is a property of the stream.  Streams are created
with an initial choice of sequential or parallel execution.  (For example,
Collection.stream() creates a sequential stream,
and Collection.parallelStream() creates
a parallel one.)  This choice of execution mode may be modified by the
`sequential()` or `parallel()` methods, and may be queried with
the `isParallel()` method.

Parameters:

- `<T>`: the type of the stream elements

**Since:** 1.8

**See also:** IntStream

**See also:** LongStream

**See also:** DoubleStream

**See also:** java.util.stream

## Stream.filter(Predicate<? super T>)

```java
Stream<T> filter(Predicate<? super T> predicate)
```

Returns a stream consisting of the elements of this stream that match
the given predicate.

This is an intermediate
operation.

Parameters:

- `predicate`: a non-interfering, stateless predicate to apply to each element to determine if it should be included

**Returns:** the new stream

## Stream.map(Function<? super T, ? extends R>)

```java
<R> Stream<R> map(Function<? super T, ? extends R> mapper)
```

Returns a stream consisting of the results of applying the given
function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `<R>`: The element type of the new stream
- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## Stream.mapToInt(ToIntFunction<? super T>)

```java
IntStream mapToInt(ToIntFunction<? super T> mapper)
```

Returns an `IntStream` consisting of the results of applying the
given function to the elements of this stream.

This is an
    intermediate operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## Stream.mapToLong(ToLongFunction<? super T>)

```java
LongStream mapToLong(ToLongFunction<? super T> mapper)
```

Returns a `LongStream` consisting of the results of applying the
given function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## Stream.mapToDouble(ToDoubleFunction<? super T>)

```java
DoubleStream mapToDouble(ToDoubleFunction<? super T> mapper)
```

Returns a `DoubleStream` consisting of the results of applying the
given function to the elements of this stream.

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element

**Returns:** the new stream

## Stream.flatMap(Function<? super T, ? extends Stream<? extends R>>)

```java
<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)
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

- `<R>`: The element type of the new stream
- `mapper`: a non-interfering, stateless function to apply to each element which produces a stream of new values

**API note:** The `flatMap()` operation has the effect of applying a one-to-many
transformation to the elements of the stream, and then flattening the
resulting elements into a new stream.

**Examples.**

If `orders` is a stream of purchase orders, and each purchase
order contains a collection of line items, then the following produces a
stream containing all the line items in all the orders:

```java
    orders.flatMap(order -> order.getLineItems().stream())...
```

If `path` is the path to a file, then the following produces a
stream of the `words` contained in that file:

```java
    Stream<String> lines = Files.lines(path, StandardCharsets.UTF_8);
    Stream<String> words = lines.flatMap(line -> Stream.of(line.split(" +")));
```

The `mapper` function passed to `flatMap` splits a line,
using a simple regular expression, into an array of words, and then
creates a stream of words from that array.

**Returns:** the new stream

**See also:** #mapMulti mapMulti

## Stream.flatMapToInt(Function<? super T, ? extends IntStream>)

```java
IntStream flatMapToInt(Function<? super T, ? extends IntStream> mapper)
```

Returns an `IntStream` consisting of the results of replacing each
element of this stream with the contents of a mapped stream produced by
applying the provided mapping function to each element.  Each mapped
stream is closed after its
contents have been placed into this stream.  (If a mapped stream is
`null` an empty stream is used, instead.)

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element which produces a stream of new values

**Returns:** the new stream

**See also:** #flatMap flatMap

## Stream.flatMapToLong(Function<? super T, ? extends LongStream>)

```java
LongStream flatMapToLong(Function<? super T, ? extends LongStream> mapper)
```

Returns an `LongStream` consisting of the results of replacing each
element of this stream with the contents of a mapped stream produced by
applying the provided mapping function to each element.  Each mapped
stream is closed after its
contents have been placed into this stream.  (If a mapped stream is
`null` an empty stream is used, instead.)

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element which produces a stream of new values

**Returns:** the new stream

**See also:** #flatMap flatMap

## Stream.flatMapToDouble(Function<? super T, ? extends DoubleStream>)

```java
DoubleStream flatMapToDouble(Function<? super T, ? extends DoubleStream> mapper)
```

Returns an `DoubleStream` consisting of the results of replacing
each element of this stream with the contents of a mapped stream produced
by applying the provided mapping function to each element.  Each mapped
stream is closed after its
contents have placed been into this stream.  (If a mapped stream is
`null` an empty stream is used, instead.)

This is an intermediate
operation.

Parameters:

- `mapper`: a non-interfering, stateless function to apply to each element which produces a stream of new values

**Returns:** the new stream

**See also:** #flatMap flatMap

## Stream.mapMulti(BiConsumer<? super T, ? super Consumer<R>>)

```java
default <R> Stream<R> mapMulti(BiConsumer<? super T, ? super Consumer<R>> mapper)
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

- `<R>`: The element type of the new stream
- `mapper`: a non-interfering, stateless function that generates replacement elements

**Implementation requirements:** The default implementation invokes flatMap on this stream,
passing a function that behaves as follows. First, it calls the mapper function
with a `Consumer` that accumulates replacement elements into a newly created
internal buffer. When the mapper function returns, it creates a stream from the
internal buffer. Finally, it returns this stream to `flatMap`.

**API note:** This method is similar to flatMap in that it applies a one-to-many
transformation to the elements of the stream and flattens the result elements
into a new stream. This method is preferable to `flatMap` in the following
circumstances:

- When replacing each stream element with a small (possibly zero) number of
elements. Using this method avoids the overhead of creating a new Stream instance
for every group of result elements, as required by `flatMap`.

- When it is easier to use an imperative approach for generating result
elements than it is to return them in the form of a Stream.

If a lambda expression is provided as the mapper function argument, additional type
information may be necessary for proper inference of the element type `<R>` of
the returned stream. This can be provided in the form of explicit type declarations for
the lambda parameters or as an explicit type argument to the `mapMulti` call.

**Examples**

Given a stream of `Number` objects, the following
produces a list containing only the `Integer` objects:

```java
    Stream<Number> numbers = ... ;
    List<Integer> integers = numbers.<Integer>mapMulti((number, consumer) -> {
            if (number instanceof Integer i)
                consumer.accept(i);
        })
        .collect(Collectors.toList());
```

If we have an `Iterable<Object>` and need to recursively expand its elements
that are themselves of type `Iterable`, we can use `mapMulti` as follows:

```java
class C {
    static void expandIterable(Object e, Consumer<Object> c) {
        if (e instanceof Iterable<?> elements) {
            for (Object ie : elements) {
                expandIterable(ie, c);
            }
        } else if (e != null) {
            c.accept(e);
        }
    }

    public static void main(String[] args) {
        var nestedList = List.of(1, List.of(2, List.of(3, 4)), 5);
        Stream<Object> expandedStream = nestedList.stream().mapMulti(C::expandIterable);
    }
}
```

**Returns:** the new stream

**See also:** #flatMap flatMap

**Since:** 16
