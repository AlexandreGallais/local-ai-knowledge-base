---
title: "Gatherer interface (java.util.stream) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/Gatherer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Gatherer interface (java.util.stream)

```java
public interface Gatherer<T, A, R>
```

An intermediate operation that transforms a stream of input elements into a
stream of output elements, optionally applying a final action when the end of
the upstream is reached. The transformation may be stateless or stateful,
and may buffer input before producing any output.

Gatherer operations can be performed either sequentially,
or be parallelized -- if a combiner function is supplied.

There are many examples of gathering operations, including but not
limited to:
grouping elements into batches (windowing functions);
de-duplicating consecutively similar elements; incremental accumulation
functions (prefix scan); incremental reordering functions, etc.  The class
`java.util.stream.Gatherers` provides implementations of common
gathering operations.

Parameters:

- `<T>`: the type of input elements to the gatherer operation
- ``: the potentially mutable state type of the gatherer operation (often hidden as an implementation detail)
- `<R>`: the type of output elements from the gatherer operation

**API note:** A `Gatherer` is specified by four functions that work together to
process input elements, optionally using intermediate state, and optionally
perform a final action at the end of input.  They are:

- creating a new, potentially mutable, state (`initializer()`)

- integrating a new input element (`integrator()`)

- combining two states into one (`combiner()`)

- performing an optional final action (`finisher()`)

Each invocation of `initializer()`, `integrator()`,
`combiner()`, and `finisher()` must return a semantically
identical result.

Implementations of Gatherer must not capture, retain, or expose to
other threads, the references to the state instance, or the downstream
`Downstream` for longer than the invocation duration of the method
which they are passed to.

Performing a gathering operation with a `Gatherer` should produce a
result equivalent to:

However, the library is free to partition the input, perform the
integrations on the partitions, and then use the combiner function to
combine the partial results to achieve a gathering operation.  (Depending
on the specific gathering operation, this may perform better or worse,
depending on the relative cost of the integrator and combiner functions.)

In addition to the predefined implementations in `Gatherers`, the
static factory methods `of(...)` and `ofSequential(...)`
can be used to construct gatherers.  For example, you could create a gatherer
that implements the equivalent of
`java.util.stream.Stream.map(java.util.function.Function)` with:

Gatherers are designed to be *composed*; two or more Gatherers can
be composed into a single Gatherer using the `andThen(Gatherer)`
method.

As an example, a Gatherer implementing a sequential Prefix Scan could
be done the following way:

Example of usage:

**Implementation requirements:** Libraries that implement transformations based on `Gatherer`,
such as `Stream.gather(Gatherer)`, must adhere to the following
constraints:

- Gatherers whose initializer is `defaultInitializer()` are
    considered to be stateless, and invoking their initializer is optional.

- Gatherers whose integrator is an instance of `Integrator.Greedy`
    can be assumed not to short-circuit, and the return value of invoking
    Object, Downstream) does not need to
    be inspected.

- The first argument passed to the integration function, both
    arguments passed to the combiner function, and the argument passed to the
    finisher function must be the result of a previous invocation of the
    initializer or combiner functions.

- The implementation should not do anything with the result of any of
    the initializer or combiner functions other than to
    pass them again to the integrator, combiner, or finisher functions.

- Once a state object is passed to the combiner or finisher function,
    it is never passed to the integrator function again.

- When the integrator function returns `false`,
    it shall be interpreted just as if there were no more elements to pass
    it.

- For parallel evaluation, the gathering implementation must manage
    that the input is properly partitioned, that partitions are processed
    in isolation, and combining happens only after integration is complete
    for both partitions.

- Gatherers whose combiner is `defaultCombiner()` may only be
    evaluated sequentially. All other combiners allow the operation to be
    parallelized by initializing each partition in separation, invoking
    the integrator until it returns `false`, and then joining each
    partitions state using the combiner, and then invoking the finisher on
    the joined state. Outputs and state later in the input sequence will
    be discarded if processing an earlier partition short-circuits.

- Gatherers whose finisher is `defaultFinisher()` are considered
    to not have an end-of-stream hook and invoking their finisher is
    optional.

**See also:** Stream#gather(Gatherer)

**See also:** Gatherers

**Since:** 24

## Gatherer.initializer()

```java
default Supplier<A> initializer()
```

A function that produces an instance of the intermediate state used for
this gathering operation.

**Implementation requirements:** The implementation in this interface returns
          `defaultInitializer()`.

**Returns:** A function that produces an instance of the intermediate state
used for this gathering operation

## Gatherer.integrator()

```java
Integrator<A, T, R> integrator()
```

A function which integrates provided elements, potentially using
the provided intermediate state, optionally producing output to the
provided `Downstream`.

**Returns:** a function which integrates provided elements, potentially using
        the provided state, optionally producing output to the provided
        Downstream

## Gatherer.combiner()

```java
default BinaryOperator<A> combiner()
```

A function which accepts two intermediate states and combines them into
one.

**Implementation requirements:** The implementation in this interface returns
          `defaultCombiner()`.

**Returns:** a function which accepts two intermediate states and combines
        them into one

## Gatherer.finisher()

```java
default BiConsumer<A, Downstream<? super R>> finisher()
```

A function which accepts the final intermediate state
and a `Downstream` object, allowing to perform a final action at
the end of input elements.

**Implementation requirements:** The implementation in this interface returns
          `defaultFinisher()`.

**Returns:** a function which transforms the intermediate result to the final
        result(s) which are then passed on to the provided Downstream

## Gatherer.andThen(Gatherer<? super R, ?, ? extends RR>)

```java
default <RR> Gatherer<T, ?, RR> andThen(Gatherer<? super R, ?, ? extends RR> that)
```

Returns a composed Gatherer which connects the output of this Gatherer
to the input of that Gatherer.

Parameters:

- `that`: the other gatherer
- `<RR>`: The type of output of that Gatherer

**Implementation requirements:** The implementation in this interface returns a new Gatherer
          which is semantically equivalent to the combination of
          `this` and `that` gatherer.

**Returns:** returns a composed Gatherer which connects the output of this
        Gatherer as input that Gatherer

Throws:

- `NullPointerException`: if the argument is `null`

## Gatherer.defaultInitializer()

```java
static <A> Supplier<A> defaultInitializer()
```

Returns an initializer which is the default initializer of a Gatherer.
The returned initializer identifies that the owner Gatherer is stateless.

Parameters:

- ``: the type of the state of the returned initializer

**Implementation requirements:** This method always returns the same instance.

**See also:** Gatherer#initializer()

**Returns:** the instance of the default initializer

## Gatherer.defaultCombiner()

```java
static <A> BinaryOperator<A> defaultCombiner()
```

Returns a combiner which is the default combiner of a Gatherer.
The returned combiner identifies that the owning Gatherer must only
be evaluated sequentially.

Parameters:

- ``: the type of the state of the returned combiner

**Implementation requirements:** This method always returns the same instance.

**See also:** Gatherer#combiner()

**Returns:** the instance of the default combiner

## Gatherer.defaultFinisher()

```java
static <A, R> BiConsumer<A, Downstream<? super R>> defaultFinisher()
```

Returns a `finisher` which is the default finisher of
a `Gatherer`.
The returned finisher identifies that the owning Gatherer performs
no additional actions at the end of input.

Parameters:

- ``: the type of the state of the returned finisher
- `<R>`: the type of the Downstream of the returned finisher

**Implementation requirements:** This method always returns the same instance.

**See also:** Gatherer#finisher()

**Returns:** the instance of the default finisher

## Gatherer.ofSequential(Integrator<Void, T, R>)

```java
static <T, R> Gatherer<T, Void, R> ofSequential( Integrator<Void, T, R> integrator)
```

Returns a new, sequential, and stateless `Gatherer` described by
the given `integrator`.

Parameters:

- `integrator`: the integrator function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if the argument is `null`

## Gatherer.ofSequential(Integrator<Void, T, R>, BiConsumer<Void, Downstream<? super R>>)

```java
static <T, R> Gatherer<T, Void, R> ofSequential( Integrator<Void, T, R> integrator, BiConsumer<Void, Downstream<? super R>> finisher)
```

Returns a new, sequential, and stateless `Gatherer` described by
the given `integrator` and `finisher`.

Parameters:

- `integrator`: the integrator function for the new gatherer
- `finisher`: the finisher function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.ofSequential(Supplier, Integrator)

```java
static <T, A, R> Gatherer<T, A, R> ofSequential( Supplier<A> initializer, Integrator<A, T, R> integrator)
```

Returns a new, sequential, `Gatherer` described by the given
`initializer` and `integrator`.

Parameters:

- `initializer`: the initializer function for the new gatherer
- `integrator`: the integrator function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- ``: the type of state for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.ofSequential(Supplier, Integrator, BiConsumer>)

```java
static <T, A, R> Gatherer<T, A, R> ofSequential( Supplier<A> initializer, Integrator<A, T, R> integrator, BiConsumer<A, Downstream<? super R>> finisher)
```

Returns a new, sequential, `Gatherer` described by the given
`initializer`, `integrator`, and `finisher`.

Parameters:

- `initializer`: the initializer function for the new gatherer
- `integrator`: the integrator function for the new gatherer
- `finisher`: the finisher function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- ``: the type of state for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.of(Integrator<Void, T, R>)

```java
static <T, R> Gatherer<T, Void, R> of(Integrator<Void, T, R> integrator)
```

Returns a new, parallelizable, and stateless `Gatherer` described
by the given `integrator`.

Parameters:

- `integrator`: the integrator function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.of(Integrator<Void, T, R>, BiConsumer<Void, Downstream<? super R>>)

```java
static <T, R> Gatherer<T, Void, R> of( Integrator<Void, T, R> integrator, BiConsumer<Void, Downstream<? super R>> finisher)
```

Returns a new, parallelizable, and stateless `Gatherer` described
by the given `integrator` and `finisher`.

Parameters:

- `integrator`: the integrator function for the new gatherer
- `finisher`: the finisher function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.of(Supplier, Integrator, BinaryOperator, BiConsumer>)

```java
static <T, A, R> Gatherer<T, A, R> of( Supplier<A> initializer, Integrator<A, T, R> integrator, BinaryOperator<A> combiner, BiConsumer<A, Downstream<? super R>> finisher)
```

Returns a new, parallelizable, `Gatherer` described by the given
`initializer`, `integrator`, `combiner` and
`finisher`.

Parameters:

- `initializer`: the initializer function for the new gatherer
- `integrator`: the integrator function for the new gatherer
- `combiner`: the combiner function for the new gatherer
- `finisher`: the finisher function for the new gatherer
- `<T>`: the type of input elements for the new gatherer
- ``: the type of state for the new gatherer
- `<R>`: the type of results for the new gatherer

**Returns:** the new `Gatherer`

Throws:

- `NullPointerException`: if any argument is `null`

## Gatherer.push(T)

```java
boolean push(T element)
```

Pushes, if possible, the provided element downstream -- to the next
stage in the pipeline.

Parameters:

- `element`: the element to push downstream

**Implementation requirements:** If this method returns `false` then no further
elements will be accepted and subsequent invocations of this method
will return `false`.

**Returns:** `true` if more elements can be sent,
        and `false` if not.

## Gatherer.isRejecting()

```java
default boolean isRejecting()
```

Checks whether the next stage is known to not want
any more elements sent to it.

**API note:** This is best-effort only, once this returns `true` it
should never return `false` again for the same instance.

**Implementation requirements:** The implementation in this interface returns `false`.

**Returns:** `true` if this Downstream is known not to want any
        more elements sent to it, `false` if otherwise
