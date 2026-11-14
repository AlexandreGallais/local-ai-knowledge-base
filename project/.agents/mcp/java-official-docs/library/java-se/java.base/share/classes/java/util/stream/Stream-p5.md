---
title: "Stream interface (java.util.stream) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Stream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stream interface (java.util.stream) (part 5 of 5)

## Stream.concat(Stream<? extends T>, Stream<? extends T>)

```java
public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)
```

Creates a lazily concatenated stream whose elements are all the
elements of the first stream followed by all the elements of the
second stream.  The resulting stream is ordered if both
of the input streams are ordered, and parallel if either of the input
streams is parallel.  When the resulting stream is closed, the close
handlers for both input streams are invoked.

This method operates on the two input streams and binds each stream
to its source.  As a result subsequent modifications to an input stream
source may not be reflected in the concatenated stream result.

Parameters:

- `<T>`: The type of stream elements
- `a`: the first stream
- `b`: the second stream

**Implementation note:** Use caution when constructing streams from repeated concatenation.
Accessing an element of a deeply concatenated stream can result in deep
call chains, or even `StackOverflowError`.

Subsequent changes to the sequential/parallel execution mode of the
returned stream are not guaranteed to be propagated to the input streams.

**API note:** To preserve optimization opportunities this method binds each stream to
its source and accepts only two streams as parameters.  For example, the
exact size of the concatenated stream source can be computed if the exact
size of each input stream source is known.
To concatenate more streams without binding, or without nested calls to
this method, try creating a stream of streams and flat-mapping with the
identity function, for example:

```java
    Stream<T> concat = Stream.of(s1, s2, s3, s4).flatMap(s -> s);
```

**Returns:** the concatenation of the two input streams

## Stream.accept(T)

```java
void accept(T t)
```

Adds an element to the stream being built.

Throws:

- `IllegalStateException`: if the builder has already transitioned to the built state

## Stream.add(T)

```java
default Builder<T> add(T t)
```

Adds an element to the stream being built.

Parameters:

- `t`: the element to add

**Implementation requirements:** The default implementation behaves as if:

```java
    accept(t)
    return this;
```

**Returns:** `this` builder

Throws:

- `IllegalStateException`: if the builder has already transitioned to the built state

## Stream.build()

```java
Stream<T> build()
```

Builds the stream, transitioning this builder to the built state.
An `IllegalStateException` is thrown if there are further attempts
to operate on the builder after it has entered the built state.

**Returns:** the built stream

Throws:

- `IllegalStateException`: if the builder has already transitioned to the built state
