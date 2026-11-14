---
title: "Stream interface (java.util.stream) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Stream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stream interface (java.util.stream) (part 4 of 5)

## Stream.collect(Collector<? super T, A, R>)

```java
<R, A> R collect(Collector<? super T, A, R> collector)
```

Performs a mutable
reduction operation on the elements of this stream using a
`Collector`.  A `Collector`
encapsulates the functions used as arguments to
BiConsumer, BiConsumer), allowing for reuse of
collection strategies and composition of collect operations such as
multiple-level grouping or partitioning.

If the stream is parallel, and the `Collector`
is concurrent, and
either the stream is unordered or the collector is
unordered,
then a concurrent reduction will be performed (see `Collector` for
details on concurrent reduction.)

This is a terminal
operation.

When executed in parallel, multiple intermediate results may be
instantiated, populated, and merged so as to maintain isolation of
mutable data structures.  Therefore, even when executed in parallel
with non-thread-safe data structures (such as `ArrayList`), no
additional synchronization is needed for a parallel reduction.

Parameters:

- `<R>`: the type of the result
- ``: the intermediate accumulation type of the `Collector`
- `collector`: the `Collector` describing the reduction

**API note:** The following will accumulate strings into a List:

```java
    List<String> asList = stringStream.collect(Collectors.toList());
```

The following will classify `Person` objects by city:

```java
    Map<String, List<Person>> peopleByCity
        = personStream.collect(Collectors.groupingBy(Person::getCity));
```

The following will classify `Person` objects by state and city,
cascading two `Collector`s together:

```java
    Map<String, Map<String, List<Person>>> peopleByStateAndCity
        = personStream.collect(Collectors.groupingBy(Person::getState,
                                                     Collectors.groupingBy(Person::getCity)));
```

**Returns:** the result of the reduction

**See also:** #collect(Supplier, BiConsumer, BiConsumer)

**See also:** Collectors

## Stream.toList()

```java
default List<T> toList()
```

Accumulates the elements of this stream into a `List`. The elements in
the list will be in this stream's encounter order, if one exists. The returned List
is unmodifiable; calls to any mutator method will always cause
`UnsupportedOperationException` to be thrown. There are no
guarantees on the implementation type or serializability of the returned List.

The returned instance may be value-based.
Callers should make no assumptions about the identity of the returned instances.
Identity-sensitive operations on these instances (reference equality (`==`),
identity hash code, and synchronization) are unreliable and should be avoided.

This is a terminal operation.

**API note:** If more control over the returned object is required, use
`Collectors.toCollection(Supplier)`.

**Implementation requirements:** The implementation in this interface returns a List produced as if by the following:

```java
Collections.unmodifiableList(new ArrayList<>(Arrays.asList(this.toArray())))
```

**Implementation note:** Most instances of Stream will override this method and provide an implementation
that is highly optimized compared to the implementation in this interface.

**Returns:** a List containing the stream elements

**Since:** 16

## Stream.min(Comparator<? super T>)

```java
Optional<T> min(Comparator<? super T> comparator)
```

Returns the minimum element of this stream according to the provided
`Comparator`.  This is a special case of a
reduction.

This is a terminal operation.

Parameters:

- `comparator`: a non-interfering, stateless `Comparator` to compare elements of this stream

**Returns:** an `Optional` describing the minimum element of this stream,
or an empty `Optional` if the stream is empty

Throws:

- `NullPointerException`: if the minimum element is null

## Stream.max(Comparator<? super T>)

```java
Optional<T> max(Comparator<? super T> comparator)
```

Returns the maximum element of this stream according to the provided
`Comparator`.  This is a special case of a
reduction.

This is a terminal
operation.

Parameters:

- `comparator`: a non-interfering, stateless `Comparator` to compare elements of this stream

**Returns:** an `Optional` describing the maximum element of this stream,
or an empty `Optional` if the stream is empty

Throws:

- `NullPointerException`: if the maximum element is null

## Stream.count()

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
    List<String> l = Arrays.asList("A", "B", "C", "D");
    long count = l.stream().peek(System.out::println).count();
```

The number of elements covered by the stream source, a `List`, is
known and the intermediate operation, `peek`, does not inject into
or remove elements from the stream (as may be the case for
`flatMap` or `filter` operations).  Thus the count is the
size of the `List` and there is no need to execute the pipeline
and, as a side-effect, print out the list elements.

**Returns:** the count of elements in this stream

## Stream.anyMatch(Predicate<? super T>)

```java
boolean anyMatch(Predicate<? super T> predicate)
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

## Stream.allMatch(Predicate<? super T>)

```java
boolean allMatch(Predicate<? super T> predicate)
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

## Stream.noneMatch(Predicate<? super T>)

```java
boolean noneMatch(Predicate<? super T> predicate)
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

## Stream.findFirst()

```java
Optional<T> findFirst()
```

Returns an `Optional` describing the first element of this stream,
or an empty `Optional` if the stream is empty.  If the stream has
no encounter order, then any element may be returned.

This is a short-circuiting
terminal operation.

**Returns:** an `Optional` describing the first element of this stream,
or an empty `Optional` if the stream is empty

Throws:

- `NullPointerException`: if the element selected is null

## Stream.findAny()

```java
Optional<T> findAny()
```

Returns an `Optional` describing some element of the stream, or an
empty `Optional` if the stream is empty.

This is a short-circuiting
terminal operation.

The behavior of this operation is explicitly nondeterministic; it is
free to select any element in the stream.  This is to allow for maximal
performance in parallel operations; the cost is that multiple invocations
on the same source may not return the same result.  (If a stable result
is desired, use `findFirst()` instead.)

**Returns:** an `Optional` describing some element of this stream, or an
empty `Optional` if the stream is empty

**See also:** #findFirst()

Throws:

- `NullPointerException`: if the element selected is null

## Stream.builder()

```java
public static<T> Builder<T> builder()
```

Returns a builder for a `Stream`.

Parameters:

- `<T>`: type of elements

**Returns:** a stream builder

## Stream.empty()

```java
public static<T> Stream<T> empty()
```

Returns an empty sequential `Stream`.

Parameters:

- `<T>`: the type of stream elements

**Returns:** an empty sequential stream

## Stream.of(T)

```java
public static<T> Stream<T> of(T t)
```

Returns a sequential `Stream` containing a single element.

Parameters:

- `t`: the single element
- `<T>`: the type of stream elements

**Returns:** a singleton sequential stream

## Stream.ofNullable(T)

```java
public static<T> Stream<T> ofNullable(T t)
```

Returns a sequential `Stream` containing a single element, if
non-null, otherwise returns an empty `Stream`.

Parameters:

- `t`: the single element
- `<T>`: the type of stream elements

**Returns:** a stream with a single element if the specified element
        is non-null, otherwise an empty stream

**Since:** 9

## Stream.of(T...)

```java
public static<T> Stream<T> of(T... values)
```

Returns a sequential ordered stream whose elements are the specified values.

Parameters:

- `<T>`: the type of stream elements
- `values`: the elements of the new stream

**Returns:** the new stream

## Stream.iterate(T, UnaryOperator<T>)

```java
public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
```

Returns an infinite sequential ordered `Stream` produced by iterative
application of a function `f` to an initial element `seed`,
producing a `Stream` consisting of `seed`, `f(seed)`,
`f(f(seed))`, etc.

The first element (position `0`) in the `Stream` will be
the provided `seed`.  For `n > 0`, the element at position
`n`, will be the result of applying the function `f` to the
element at position `n - 1`.

The action of applying `f` for one element
*happens-before*
the action of applying `f` for subsequent elements.  For any given
element the action may be performed in whatever thread the library
chooses.

Parameters:

- `<T>`: the type of stream elements
- `seed`: the initial element
- `f`: a function to be applied to the previous element to produce a new element

**Returns:** a new sequential `Stream`

## Stream.iterate(T, Predicate<? super T>, UnaryOperator<T>)

```java
public static<T> Stream<T> iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next)
```

Returns a sequential ordered `Stream` produced by iterative
application of the given `next` function to an initial element,
conditioned on satisfying the given `hasNext` predicate.  The
stream terminates as soon as the `hasNext` predicate returns false.

`Stream.iterate` should produce the same sequence of elements as
produced by the corresponding for-loop:

```java
    for (T index=seed; hasNext.test(index); index = next.apply(index)) {
        ...
    }
```

The resulting sequence may be empty if the `hasNext` predicate
does not hold on the seed value.  Otherwise the first element will be the
supplied `seed` value, the next element (if present) will be the
result of applying the `next` function to the `seed` value,
and so on iteratively until the `hasNext` predicate indicates that
the stream should terminate.

The action of applying the `hasNext` predicate to an element
*happens-before*
the action of applying the `next` function to that element.  The
action of applying the `next` function for one element
*happens-before* the action of applying the `hasNext`
predicate for subsequent elements.  For any given element an action may
be performed in whatever thread the library chooses.

Parameters:

- `<T>`: the type of stream elements
- `seed`: the initial element
- `hasNext`: a predicate to apply to elements to determine when the stream must terminate.
- `next`: a function to be applied to the previous element to produce a new element

**Returns:** a new sequential `Stream`

**Since:** 9

## Stream.generate(Supplier<? extends T>)

```java
public static<T> Stream<T> generate(Supplier<? extends T> s)
```

Returns an infinite sequential unordered stream where each element is
generated by the provided `Supplier`.  This is suitable for
generating constant streams, streams of random elements, etc.

Parameters:

- `<T>`: the type of stream elements
- `s`: the `Supplier` of generated elements

**Returns:** a new infinite sequential unordered `Stream`
