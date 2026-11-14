---
title: "StreamSupport class (java.util.stream)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/StreamSupport.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StreamSupport class (java.util.stream)

```java
public final class StreamSupport
```

Low-level utility methods for creating and manipulating streams.

This class is mostly for library writers presenting stream views
of data structures; most static stream methods intended for end users are in
the various `Stream` classes.

**Since:** 1.8

## StreamSupport.stream(Spliterator<T>, boolean)

```java
public static <T> Stream<T> stream(Spliterator<T> spliterator, boolean parallel)
```

Creates a new sequential or parallel `Stream` from a
`Spliterator`.

The spliterator is only traversed, split, or queried for estimated
size after the terminal operation of the stream pipeline commences.

It is strongly recommended the spliterator report a characteristic of
`IMMUTABLE` or `CONCURRENT`, or be
late-binding.  Otherwise,
int, boolean) should be used
to reduce the scope of potential interference with the source.  See
Non-Interference for
more details.

Parameters:

- `<T>`: the type of stream elements
- `spliterator`: a `Spliterator` describing the stream elements
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `Stream`

## StreamSupport.stream(Supplier<? extends Spliterator<T>>, int, boolean)

```java
public static <T> Stream<T> stream(Supplier<? extends Spliterator<T>> supplier, int characteristics, boolean parallel)
```

Creates a new sequential or parallel `Stream` from a
`Supplier` of `Spliterator`.

The `Supplier.get()` method will be invoked on the supplier no
more than once, and only after the terminal operation of the stream pipeline
commences.

For spliterators that report a characteristic of `IMMUTABLE`
or `CONCURRENT`, or that are
late-binding, it is likely
more efficient to use boolean)
instead.

The use of a `Supplier` in this form provides a level of
indirection that reduces the scope of potential interference with the
source.  Since the supplier is only invoked after the terminal operation
commences, any modifications to the source up to the start of the
terminal operation are reflected in the stream result.  See
Non-Interference for
more details.

Parameters:

- `<T>`: the type of stream elements
- `supplier`: a `Supplier` of a `Spliterator`
- `characteristics`: Spliterator characteristics of the supplied `Spliterator`. The characteristics must be equal to `supplier.get().characteristics()`, otherwise undefined behavior may occur when terminal operation commences.
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `Stream`

**See also:** #stream(java.util.Spliterator, boolean)

## StreamSupport.intStream(Spliterator.OfInt, boolean)

```java
public static IntStream intStream(Spliterator.OfInt spliterator, boolean parallel)
```

Creates a new sequential or parallel `IntStream` from a
`Spliterator.OfInt`.

The spliterator is only traversed, split, or queried for estimated size
after the terminal operation of the stream pipeline commences.

It is strongly recommended the spliterator report a characteristic of
`IMMUTABLE` or `CONCURRENT`, or be
late-binding.  Otherwise,
int, boolean) should be
used to reduce the scope of potential interference with the source.  See
Non-Interference for
more details.

Parameters:

- `spliterator`: a `Spliterator.OfInt` describing the stream elements
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `IntStream`

## StreamSupport.intStream(Supplier<? extends Spliterator.OfInt>, int, boolean)

```java
public static IntStream intStream(Supplier<? extends Spliterator.OfInt> supplier, int characteristics, boolean parallel)
```

Creates a new sequential or parallel `IntStream` from a
`Supplier` of `Spliterator.OfInt`.

The `Supplier.get()` method will be invoked on the supplier no
more than once, and only after the terminal operation of the stream pipeline
commences.

For spliterators that report a characteristic of `IMMUTABLE`
or `CONCURRENT`, or that are
late-binding, it is likely
more efficient to use boolean)
instead.

The use of a `Supplier` in this form provides a level of
indirection that reduces the scope of potential interference with the
source.  Since the supplier is only invoked after the terminal operation
commences, any modifications to the source up to the start of the
terminal operation are reflected in the stream result.  See
Non-Interference for
more details.

Parameters:

- `supplier`: a `Supplier` of a `Spliterator.OfInt`
- `characteristics`: Spliterator characteristics of the supplied `Spliterator.OfInt`. The characteristics must be equal to `supplier.get().characteristics()`, otherwise undefined behavior may occur when terminal operation commences.
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `IntStream`

**See also:** #intStream(java.util.Spliterator.OfInt, boolean)

## StreamSupport.longStream(Spliterator.OfLong, boolean)

```java
public static LongStream longStream(Spliterator.OfLong spliterator, boolean parallel)
```

Creates a new sequential or parallel `LongStream` from a
`Spliterator.OfLong`.

The spliterator is only traversed, split, or queried for estimated
size after the terminal operation of the stream pipeline commences.

It is strongly recommended the spliterator report a characteristic of
`IMMUTABLE` or `CONCURRENT`, or be
late-binding.  Otherwise,
int, boolean) should be
used to reduce the scope of potential interference with the source.  See
Non-Interference for
more details.

Parameters:

- `spliterator`: a `Spliterator.OfLong` describing the stream elements
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `LongStream`

## StreamSupport.longStream(Supplier<? extends Spliterator.OfLong>, int, boolean)

```java
public static LongStream longStream(Supplier<? extends Spliterator.OfLong> supplier, int characteristics, boolean parallel)
```

Creates a new sequential or parallel `LongStream` from a
`Supplier` of `Spliterator.OfLong`.

The `Supplier.get()` method will be invoked on the supplier no
more than once, and only after the terminal operation of the stream pipeline
commences.

For spliterators that report a characteristic of `IMMUTABLE`
or `CONCURRENT`, or that are
late-binding, it is likely
more efficient to use boolean)
instead.

The use of a `Supplier` in this form provides a level of
indirection that reduces the scope of potential interference with the
source.  Since the supplier is only invoked after the terminal operation
commences, any modifications to the source up to the start of the
terminal operation are reflected in the stream result.  See
Non-Interference for
more details.

Parameters:

- `supplier`: a `Supplier` of a `Spliterator.OfLong`
- `characteristics`: Spliterator characteristics of the supplied `Spliterator.OfLong`. The characteristics must be equal to `supplier.get().characteristics()`, otherwise undefined behavior may occur when terminal operation commences.
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `LongStream`

**See also:** #longStream(java.util.Spliterator.OfLong, boolean)

## StreamSupport.doubleStream(Spliterator.OfDouble, boolean)

```java
public static DoubleStream doubleStream(Spliterator.OfDouble spliterator, boolean parallel)
```

Creates a new sequential or parallel `DoubleStream` from a
`Spliterator.OfDouble`.

The spliterator is only traversed, split, or queried for estimated size
after the terminal operation of the stream pipeline commences.

It is strongly recommended the spliterator report a characteristic of
`IMMUTABLE` or `CONCURRENT`, or be
late-binding.  Otherwise,
int, boolean) should
be used to reduce the scope of potential interference with the source.  See
Non-Interference for
more details.

Parameters:

- `spliterator`: A `Spliterator.OfDouble` describing the stream elements
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `DoubleStream`

## StreamSupport.doubleStream(Supplier<? extends Spliterator.OfDouble>, int, boolean)

```java
public static DoubleStream doubleStream(Supplier<? extends Spliterator.OfDouble> supplier, int characteristics, boolean parallel)
```

Creates a new sequential or parallel `DoubleStream` from a
`Supplier` of `Spliterator.OfDouble`.

The `Supplier.get()` method will be invoked on the supplier no
more than once, and only after the terminal operation of the stream pipeline
commences.

For spliterators that report a characteristic of `IMMUTABLE`
or `CONCURRENT`, or that are
late-binding, it is likely
more efficient to use boolean)
instead.

The use of a `Supplier` in this form provides a level of
indirection that reduces the scope of potential interference with the
source.  Since the supplier is only invoked after the terminal operation
commences, any modifications to the source up to the start of the
terminal operation are reflected in the stream result.  See
Non-Interference for
more details.

Parameters:

- `supplier`: A `Supplier` of a `Spliterator.OfDouble`
- `characteristics`: Spliterator characteristics of the supplied `Spliterator.OfDouble`. The characteristics must be equal to `supplier.get().characteristics()`, otherwise undefined behavior may occur when terminal operation commences.
- `parallel`: if `true` then the returned stream is a parallel stream; if `false` the returned stream is a sequential stream.

**Returns:** a new sequential or parallel `DoubleStream`

**See also:** #doubleStream(java.util.Spliterator.OfDouble, boolean)
