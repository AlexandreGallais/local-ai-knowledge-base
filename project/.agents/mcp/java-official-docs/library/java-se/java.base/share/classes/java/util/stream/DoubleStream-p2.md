---
title: "DoubleStream interface (java.util.stream) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/stream/DoubleStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DoubleStream interface (java.util.stream) (part 2 of 3)

## DoubleStream.forEach(DoubleConsumer)

```java
void forEach(DoubleConsumer action)
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

## DoubleStream.forEachOrdered(DoubleConsumer)

```java
void forEachOrdered(DoubleConsumer action)
```

Performs an action for each element of this stream, guaranteeing that
each element is processed in encounter order for streams that have a
defined encounter order.

This is a terminal
operation.

Parameters:

- `action`: a  non-interfering action to perform on the elements

**See also:** #forEach(DoubleConsumer)

## DoubleStream.toArray()

```java
double[] toArray()
```

Returns an array containing the elements of this stream.

This is a terminal
operation.

**Returns:** an array containing the elements of this stream

## DoubleStream.reduce(double, DoubleBinaryOperator)

```java
double reduce(double identity, DoubleBinaryOperator op)
```

Performs a reduction on the
elements of this stream, using the provided identity value and an
associative
accumulation function, and returns the reduced value.  This is equivalent
to:

```java
    double result = identity;
    for (double element : this stream)
        result = accumulator.applyAsDouble(result, element)
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

**API note:** Sum, min, max, and average are all special cases of reduction.
Summing a stream of numbers can be expressed as:

```java
    double sum = numbers.reduce(0, (a, b) -> a+b);
```

or more compactly:

```java
    double sum = numbers.reduce(0, Double::sum);
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

## DoubleStream.reduce(DoubleBinaryOperator)

```java
OptionalDouble reduce(DoubleBinaryOperator op)
```

Performs a reduction on the
elements of this stream, using an
associative accumulation
function, and returns an `OptionalDouble` describing the reduced
value, if any. This is equivalent to:

```java
    boolean foundAny = false;
    double result = null;
    for (double element : this stream) {
        if (!foundAny) {
            foundAny = true;
            result = element;
        }
        else
            result = accumulator.applyAsDouble(result, element);
    }
    return foundAny ? OptionalDouble.of(result) : OptionalDouble.empty();
```

but is not constrained to execute sequentially.

The `accumulator` function must be an
associative function.

This is a terminal
operation.

Parameters:

- `op`: an associative, non-interfering, stateless function for combining two values

**Returns:** the result of the reduction

**See also:** #reduce(double, DoubleBinaryOperator)

## DoubleStream.collect(Supplier<R>, ObjDoubleConsumer<R>, BiConsumer<R, R>)

```java
<R> R collect(Supplier<R> supplier, ObjDoubleConsumer<R> accumulator, BiConsumer<R, R> combiner)
```

Performs a mutable
reduction operation on the elements of this stream.  A mutable
reduction is one in which the reduced value is a mutable result container,
such as an `ArrayList`, and elements are incorporated by updating
the state of the result rather than by replacing the result.  This
produces a result equivalent to:

```java
    R result = supplier.get();
    for (double element : this stream)
        accumulator.accept(result, element);
    return result;
```

Like DoubleBinaryOperator), `collect`
operations can be parallelized without requiring additional
synchronization.

This is a terminal
operation.

Parameters:

- `<R>`: the type of the mutable result container
- `supplier`: a function that creates a new mutable result container. For a parallel execution, this function may be called multiple times and must return a fresh value each time.
- `accumulator`: an associative, non-interfering, stateless function that must fold an element into a result container.
- `combiner`: an associative, non-interfering, stateless function that accepts two partial result containers and merges them, which must be compatible with the accumulator function. The combiner function must fold the elements from the second result container into the first result container.

**Returns:** the result of the reduction

**See also:** Stream#collect(Supplier, BiConsumer, BiConsumer)

## DoubleStream.sum()

```java
double sum()
```

Returns the sum of elements in this stream.

Summation is a special case of a reduction. If
floating-point summation were exact, this method would be
equivalent to:

```java
    return reduce(0, Double::sum);
```

However, since floating-point summation is not exact, the above
code is not necessarily equivalent to the summation computation
done by this method.

The value of a floating-point sum is a function both
of the input values as well as the order of addition
operations. The order of addition operations of this method is
intentionally not defined to allow for implementation
flexibility to improve the speed and accuracy of the computed
result.

In particular, this method may be implemented using compensated
summation or other technique to reduce the error bound in the
numerical sum compared to a simple summation of `double`
values.

Because of the unspecified order of operations and the
possibility of using differing summation schemes, the output of
this method may vary on the same input elements.

Various conditions can result in a non-finite sum being
computed. This can occur even if the all the elements
being summed are finite. If any element is non-finite,
the sum will be non-finite:

- If any element is a NaN, then the final sum will be
NaN.

- If the elements contain one or more infinities, the
sum will be infinite or NaN.

- If the elements contain infinities of opposite sign,
the sum will be NaN.

- If the elements contain infinities of one sign and
an intermediate sum overflows to an infinity of the opposite
sign, the sum may be NaN.

It is possible for intermediate sums of finite values to
overflow into opposite-signed infinities; if that occurs, the
final sum will be NaN even if the elements are all
finite.

If all the elements are zero, the sign of zero is
*not* guaranteed to be preserved in the final sum.

This is a terminal
operation.

**API note:** Elements sorted by increasing absolute magnitude tend
to yield more accurate results.

**Returns:** the sum of elements in this stream

## DoubleStream.min()

```java
OptionalDouble min()
```

Returns an `OptionalDouble` describing the minimum element of this
stream, or an empty OptionalDouble if this stream is empty.  The minimum
element will be `Double.NaN` if any stream element was NaN. Unlike
the numerical comparison operators, this method considers negative zero
to be strictly smaller than positive zero. This is a special case of a
reduction and is
equivalent to:

```java
    return reduce(Double::min);
```

This is a terminal
operation.

**Returns:** an `OptionalDouble` containing the minimum element of this
stream, or an empty optional if the stream is empty

## DoubleStream.max()

```java
OptionalDouble max()
```

Returns an `OptionalDouble` describing the maximum element of this
stream, or an empty OptionalDouble if this stream is empty.  The maximum
element will be `Double.NaN` if any stream element was NaN. Unlike
the numerical comparison operators, this method considers negative zero
to be strictly smaller than positive zero. This is a
special case of a
reduction and is
equivalent to:

```java
    return reduce(Double::max);
```

This is a terminal
operation.

**Returns:** an `OptionalDouble` containing the maximum element of this
stream, or an empty optional if the stream is empty

## DoubleStream.count()

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
    DoubleStream s = DoubleStream.of(1, 2, 3, 4);
    long count = s.peek(System.out::println).count();
```

The number of elements covered by the stream source is known and the
intermediate operation, `peek`, does not inject into or remove
elements from the stream (as may be the case for `flatMap` or
`filter` operations).  Thus the count is 4 and there is no need to
execute the pipeline and, as a side-effect, print out the elements.

**Returns:** the count of elements in this stream

## DoubleStream.average()

```java
OptionalDouble average()
```

Returns an `OptionalDouble` describing the arithmetic
mean of elements of this stream, or an empty optional if this
stream is empty.

The computed average can vary numerically and have the
special case behavior as computing the sum; see `sum`
for details.

The average is a special case of a reduction.

This is a terminal
operation.

**API note:** Elements sorted by increasing absolute magnitude tend
to yield more accurate results.

**Returns:** an `OptionalDouble` containing the average element of this
stream, or an empty optional if the stream is empty

## DoubleStream.summaryStatistics()

```java
DoubleSummaryStatistics summaryStatistics()
```

Returns a `DoubleSummaryStatistics` describing various summary data
about the elements of this stream.  This is a special
case of a reduction.

This is a terminal
operation.

**Returns:** a `DoubleSummaryStatistics` describing various summary data
about the elements of this stream

## DoubleStream.anyMatch(DoublePredicate)

```java
boolean anyMatch(DoublePredicate predicate)
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

## DoubleStream.allMatch(DoublePredicate)

```java
boolean allMatch(DoublePredicate predicate)
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

## DoubleStream.noneMatch(DoublePredicate)

```java
boolean noneMatch(DoublePredicate predicate)
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

## DoubleStream.findFirst()

```java
OptionalDouble findFirst()
```

Returns an `OptionalDouble` describing the first element of this
stream, or an empty `OptionalDouble` if the stream is empty.  If
the stream has no encounter order, then any element may be returned.

This is a short-circuiting
terminal operation.

**Returns:** an `OptionalDouble` describing the first element of this
stream, or an empty `OptionalDouble` if the stream is empty

## DoubleStream.findAny()

```java
OptionalDouble findAny()
```

Returns an `OptionalDouble` describing some element of the stream,
or an empty `OptionalDouble` if the stream is empty.

This is a short-circuiting
terminal operation.

The behavior of this operation is explicitly nondeterministic; it is
free to select any element in the stream.  This is to allow for maximal
performance in parallel operations; the cost is that multiple invocations
on the same source may not return the same result.  (If a stable result
is desired, use `findFirst()` instead.)

**Returns:** an `OptionalDouble` describing some element of this stream,
or an empty `OptionalDouble` if the stream is empty

**See also:** #findFirst()

## DoubleStream.boxed()

```java
Stream<Double> boxed()
```

Returns a `Stream` consisting of the elements of this stream,
boxed to `Double`.

This is an intermediate
operation.

**Returns:** a `Stream` consistent of the elements of this stream,
each boxed to a `Double`
