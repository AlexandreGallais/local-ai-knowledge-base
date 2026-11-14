---
title: "Gatherers class (java.util.stream)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Gatherers.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Gatherers class (java.util.stream)

```java
public final class Gatherers
```

Implementations of `Gatherer` that provide useful intermediate
operations, such as windowing functions, folding functions,
transforming elements concurrently, etc.

**Since:** 24

## Gatherers.windowFixed(int)

```java
public static <TR> Gatherer<TR, ?, List<TR>> windowFixed(int windowSize)
```

Returns a Gatherer that gathers elements into windows
-- encounter-ordered groups of elements -- of a fixed size.
If the stream is empty then no window will be produced.
The last window may contain fewer elements than the supplied window size.

Example:

Parameters:

- `windowSize`: the size of the windows
- ``: the type of elements the returned gatherer consumes and the contents of the windows it produces

**Implementation requirements:** Each window produced is an unmodifiable List; calls to any
mutator method will always cause `UnsupportedOperationException`
to be thrown. There are no guarantees on the implementation type or
serializability of the produced Lists.

**API note:** For efficiency reasons, windows may be allocated contiguously
         and eagerly. This means that choosing large window sizes for
         small streams may use excessive memory for the duration of
         evaluation of this operation.

**Returns:** a new gatherer which groups elements into fixed-size windows

Throws:

- `IllegalArgumentException`: when `windowSize` is less than 1

## Gatherers.windowSliding(int)

```java
public static <TR> Gatherer<TR, ?, List<TR>> windowSliding(int windowSize)
```

Returns a Gatherer that gathers elements into windows --
encounter-ordered groups of elements -- of a given size, where each
subsequent window includes all elements of the previous window except
for the least recent, and adds the next element in the stream.
If the stream is empty then no window will be produced. If the size of
the stream is smaller than the window size then only one window will
be produced, containing all elements in the stream.

Example:

Parameters:

- `windowSize`: the size of the windows
- ``: the type of elements the returned gatherer consumes and the contents of the windows it produces

**Implementation requirements:** Each window produced is an unmodifiable List; calls to any
mutator method will always cause `UnsupportedOperationException`
to be thrown. There are no guarantees on the implementation type or
serializability of the produced Lists.

**API note:** For efficiency reasons, windows may be allocated contiguously
         and eagerly. This means that choosing large window sizes for
         small streams may use excessive memory for the duration of
         evaluation of this operation.

**Returns:** a new gatherer which groups elements into sliding windows

Throws:

- `IllegalArgumentException`: when windowSize is less than 1

## Gatherers.fold(Supplier<R>, BiFunction<? super R, ? super T, ? extends R>)

```java
public static <T, R> Gatherer<T, ?, R> fold( Supplier<R> initial, BiFunction<? super R, ? super T, ? extends R> folder)
```

Returns a Gatherer that performs an ordered, *reduction-like*,
transformation for scenarios where no combiner-function can be
implemented, or for reductions which are intrinsically
order-dependent.

Parameters:

- `initial`: the identity value for the fold operation
- `folder`: the folding function
- `<T>`: the type of elements the returned gatherer consumes
- `<R>`: the type of elements the returned gatherer produces

**Implementation requirements:** If no exceptions are thrown during processing, then this
operation only ever produces a single element.

Example:

**See also:** java.util.stream.Stream#reduce(Object, BinaryOperator)

**Returns:** a new Gatherer

Throws:

- `NullPointerException`: if any of the parameters are `null`

## Gatherers.scan(Supplier<R>, BiFunction<? super R, ? super T, ? extends R>)

```java
public static <T, R> Gatherer<T, ?, R> scan( Supplier<R> initial, BiFunction<? super R, ? super T, ? extends R> scanner)
```

Returns a Gatherer that performs a Prefix Scan -- an incremental
accumulation -- using the provided functions.  Starting with an
initial value obtained from the `Supplier`, each subsequent
value is obtained by applying the `BiFunction` to the current
value and the next input element, after which the resulting value is
produced downstream.

Example:

Parameters:

- `initial`: the supplier of the initial value for the scanner
- `scanner`: the function to apply for each element
- `<T>`: the type of element which this gatherer consumes
- `<R>`: the type of element which this gatherer produces

**Returns:** a new Gatherer which performs a prefix scan

Throws:

- `NullPointerException`: if any of the parameters are `null`

## Gatherers.mapConcurrent(int, Function<? super T, ? extends R>)

```java
public static <T, R> Gatherer<T,?,R> mapConcurrent( final int maxConcurrency, final Function<? super T, ? extends R> mapper)
```

An operation which executes a function concurrently
with a configured level of max concurrency, using
virtual threads.
This operation preserves the ordering of the stream.

Parameters:

- `maxConcurrency`: the maximum concurrency desired
- `mapper`: a function to be executed concurrently
- `<T>`: the type of input
- `<R>`: the type of output

**API note:** In progress tasks will be attempted to be cancelled,
on a best-effort basis, in situations where the downstream no longer
wants to receive any more elements.

**Implementation requirements:** If a result of the function is to be pushed downstream but
instead the function completed exceptionally then the corresponding
exception will instead be rethrown by this method as an instance of
`RuntimeException`, after which any remaining tasks are canceled.

**Returns:** a new Gatherer

Throws:

- `IllegalArgumentException`: if `maxConcurrency` is less than 1
- `NullPointerException`: if `mapper` is `null`
