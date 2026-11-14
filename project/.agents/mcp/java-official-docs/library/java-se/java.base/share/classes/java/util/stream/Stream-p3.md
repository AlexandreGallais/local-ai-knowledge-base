---
title: "Stream interface (java.util.stream) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Stream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stream interface (java.util.stream) (part 3 of 5)

## Stream.dropWhile(Predicate<? super T>)

```java
default Stream<T> dropWhile(Predicate<? super T> predicate)
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
Using an unordered stream source (such as `generate(Supplier)`) or
removing the ordering constraint with `unordered()` may result in
significant speedups of `dropWhile()` in parallel pipelines, if the
semantics of your situation permit.  If consistency with encounter order
is required, and you are experiencing poor performance or memory
utilization with `dropWhile()` in parallel pipelines, switching to
sequential execution with `sequential()` may improve performance.

**Returns:** the new stream

**Since:** 9

## Stream.forEach(Consumer<? super T>)

```java
void forEach(Consumer<? super T> action)
```

Performs an action for each element of this stream.

This is a terminal
operation.

The behavior of this operation is explicitly nondeterministic.
For parallel stream pipelines, this operation does *not*
guarantee to respect the encounter order of the stream, as doing so
would sacrifice the benefit of parallelism.  For any given element, the
action may be performed at whatever time and in whatever thread the
library chooses.  If the action accesses shared state, it is
responsible for providing the required synchronization.

Parameters:

- `action`: a  non-interfering action to perform on the elements

## Stream.forEachOrdered(Consumer<? super T>)

```java
void forEachOrdered(Consumer<? super T> action)
```

Performs an action for each element of this stream, in the encounter
order of the stream if the stream has a defined encounter order.

This is a terminal
operation.

This operation processes the elements one at a time, in encounter
order if one exists.  Performing the action for one element
*happens-before*
performing the action for subsequent elements, but for any given element,
the action may be performed in whatever thread the library chooses.

Parameters:

- `action`: a  non-interfering action to perform on the elements

**See also:** #forEach(Consumer)

## Stream.toArray()

```java
Object[] toArray()
```

Returns an array containing the elements of this stream.

This is a terminal
operation.

**Returns:** an array, whose runtime component type is `Object`, containing the elements of this stream

## Stream.toArray(IntFunction)

```java
<A> A[] toArray(IntFunction<A[]> generator)
```

Returns an array containing the elements of this stream, using the
provided `generator` function to allocate the returned array, as
well as any additional arrays that might be required for a partitioned
execution or for resizing.

This is a terminal
operation.

Parameters:

- ``: the component type of the resulting array
- `generator`: a function which produces a new array of the desired type and the provided length

**API note:** The generator function takes an integer, which is the size of the
desired array, and produces an array of the desired size.  This can be
concisely expressed with an array constructor reference:

```java
    Person[] men = people.stream()
                         .filter(p -> p.getGender() == MALE)
                         .toArray(Person[]::new);
```

**Returns:** an array containing the elements in this stream

Throws:

- `ArrayStoreException`: if the runtime type of any element of this stream is not assignable to the runtime component type of the generated array

## Stream.reduce(T, BinaryOperator<T>)

```java
T reduce(T identity, BinaryOperator<T> accumulator)
```

Performs a reduction on the
elements of this stream, using the provided identity value and an
associative
accumulation function, and returns the reduced value.  This is equivalent
to:

```java
    T result = identity;
    for (T element : this stream)
        result = accumulator.apply(result, element)
    return result;
```

but is not constrained to execute sequentially.

The `identity` value must be an identity for the accumulator
function. This means that for all `t`,
`accumulator.apply(identity, t)` is equal to `t`.
The `accumulator` function must be an
associative function.

This is a terminal
operation.

Parameters:

- `identity`: the identity value for the accumulating function
- `accumulator`: an associative, non-interfering, stateless function for combining two values

**API note:** Sum, min, max, average, and string concatenation are all special
cases of reduction. Summing a stream of numbers can be expressed as:

```java
    Integer sum = integers.reduce(0, (a, b) -> a+b);
```

or:

```java
    Integer sum = integers.reduce(0, Integer::sum);
```

While this may seem a more roundabout way to perform an aggregation
compared to simply mutating a running total in a loop, reduction
operations parallelize more gracefully, without needing additional
synchronization and with greatly reduced risk of data races.

**Returns:** the result of the reduction

## Stream.reduce(BinaryOperator<T>)

```java
Optional<T> reduce(BinaryOperator<T> accumulator)
```

Performs a reduction on the
elements of this stream, using an
associative accumulation
function, and returns an `Optional` describing the reduced value,
if any. This is equivalent to:

```java
    boolean foundAny = false;
    T result = null;
    for (T element : this stream) {
        if (!foundAny) {
            foundAny = true;
            result = element;
        }
        else
            result = accumulator.apply(result, element);
    }
    return foundAny ? Optional.of(result) : Optional.empty();
```

but is not constrained to execute sequentially.

The `accumulator` function must be an
associative function.

This is a terminal
operation.

Parameters:

- `accumulator`: an associative, non-interfering, stateless function for combining two values

**Returns:** an `Optional` describing the result of the reduction

**See also:** #reduce(Object, BinaryOperator)

**See also:** #min(Comparator)

**See also:** #max(Comparator)

Throws:

- `NullPointerException`: if the result of the reduction is null

## Stream.reduce(U, BiFunction, BinaryOperator)

```java
<U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner)
```

Performs a reduction on the
elements of this stream, using the provided identity, accumulation and
combining functions.  This is equivalent to:

```java
    U result = identity;
    for (T element : this stream)
        result = accumulator.apply(result, element)
    return result;
```

but is not constrained to execute sequentially.

The `identity` value must be an identity for the combiner
function.  This means that for all `u`, `combiner(identity, u)`
is equal to `u`.  Additionally, the `combiner` function
must be compatible with the `accumulator` function; for all
`u` and `t`, the following must hold:

```java
    combiner.apply(u, accumulator.apply(identity, t)) == accumulator.apply(u, t)
```

This is a terminal
operation.

Parameters:

- ``: The type of the result
- `identity`: the identity value for the combiner function
- `accumulator`: an associative, non-interfering, stateless function for incorporating an additional element into a result
- `combiner`: an associative, non-interfering, stateless function for combining two values, which must be compatible with the accumulator function

**API note:** Many reductions using this form can be represented more simply
by an explicit combination of `map` and `reduce` operations.
The `accumulator` function acts as a fused mapper and accumulator,
which can sometimes be more efficient than separate mapping and reduction,
such as when knowing the previously reduced value allows you to avoid
some computation.

**Returns:** the result of the reduction

**See also:** #reduce(BinaryOperator)

**See also:** #reduce(Object, BinaryOperator)

## Stream.gather(Gatherer<? super T, ?, R>)

```java
default <R> Stream<R> gather(Gatherer<? super T, ?, R> gatherer)
```

Returns a stream consisting of the results of applying the given
`Gatherer` to the elements of this stream.

This is a stateful
intermediate operation that is an
extension point.

Gatherers are highly flexible and can describe a vast array of
possibly stateful operations, with support for short-circuiting, and
parallelization.

When executed in parallel, multiple intermediate results may be
instantiated, populated, and merged so as to maintain isolation of
mutable data structures.  Therefore, even when executed in parallel
with non-thread-safe data structures (such as `ArrayList`), no
additional synchronization is needed for a parallel reduction.

Implementations are allowed, but not required, to detect consecutive
invocations and compose them into a single, fused, operation. This would
make the first expression below behave like the second:

```java
    var stream1 = Stream.of(...).gather(gatherer1).gather(gatherer2);
    var stream2 = Stream.of(...).gather(gatherer1.andThen(gatherer2));
```

Parameters:

- `<R>`: The element type of the new stream
- `gatherer`: a gatherer

**Implementation requirements:** The default implementation obtains the spliterator
of this stream, wraps that spliterator so as to support the semantics
of this operation on traversal, and returns a new stream associated with
the wrapped spliterator.  The returned stream preserves the execution
characteristics of this stream (namely parallel or sequential execution
as per `isParallel()`) but the wrapped spliterator may choose to
not support splitting.  When the returned stream is closed, the close
handlers for both the returned and this stream are invoked.
Implementations of this interface should provide their own
implementation of this method.

**See also:** Gatherers

**Returns:** the new stream

**Since:** 24

## Stream.collect(Supplier<R>, BiConsumer<R, ? super T>, BiConsumer<R, R>)

```java
<R> R collect(Supplier<R> supplier, BiConsumer<R, ? super T> accumulator, BiConsumer<R, R> combiner)
```

Performs a mutable
reduction operation on the elements of this stream.  A mutable
reduction is one in which the reduced value is a mutable result container,
such as an `ArrayList`, and elements are incorporated by updating
the state of the result rather than by replacing the result.  This
produces a result equivalent to:

```java
    R result = supplier.get();
    for (T element : this stream)
        accumulator.accept(result, element);
    return result;
```

Like BinaryOperator), `collect` operations
can be parallelized without requiring additional synchronization.

This is a terminal
operation.

Parameters:

- `<R>`: the type of the mutable result container
- `supplier`: a function that creates a new mutable result container. For a parallel execution, this function may be called multiple times and must return a fresh value each time.
- `accumulator`: an associative, non-interfering, stateless function that must fold an element into a result container.
- `combiner`: an associative, non-interfering, stateless function that accepts two partial result containers and merges them, which must be compatible with the accumulator function. The combiner function must fold the elements from the second result container into the first result container.

**API note:** There are many existing classes in the JDK whose signatures are
well-suited for use with method references as arguments to `collect()`.
For example, the following will accumulate strings into an `ArrayList`:

```java
    List<String> asList = stringStream.collect(ArrayList::new, ArrayList::add,
                                               ArrayList::addAll);
```

The following will take a stream of strings and concatenates them into a
single string:

```java
    String concat = stringStream.collect(StringBuilder::new, StringBuilder::append,
                                         StringBuilder::append)
                                .toString();
```

**Returns:** the result of the reduction
