---
title: "RandomGenerator interface (java.util.random) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/random/RandomGenerator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RandomGenerator interface (java.util.random)

```java
public interface RandomGenerator
```

The `RandomGenerator` interface is designed to provide a common
protocol for objects that generate random or (more typically) pseudorandom
sequences of numbers (or Boolean values). Such a sequence may be obtained by
either repeatedly invoking a method that returns a single pseudorandomly
chosen value, or by invoking a method that returns a stream of
pseudorandomly chosen values.

 Ideally, given an implicitly or explicitly specified range of values,
each value would be chosen independently and uniformly from that range. In
practice, one may have to settle for some approximation to independence and
uniformity.

 In the case of `int`, `long`, and `boolean` values, if
there is no explicit specification of range, then the range includes all
possible values of the type. In the case of `float` and `double`
values, first a value is always chosen uniformly from the set of
2*w* values between 0.0 (inclusive) and 1.0 (exclusive),
where *w* is `Float.PRECISION` for `float` values
and `Double.PRECISION` for `double`
values, such that adjacent values differ by 2&minus;*w*
(notice that this set is a *subset* of the set of
*all representable floating-point values* between 0.0 (inclusive) and 1.0 (exclusive));
then if an explicit range was specified, then the chosen number is
computationally scaled and translated so as to appear to have been chosen
approximately uniformly from that explicit range.

 Each method that returns a stream produces a stream of values each of
which is chosen in the same manner as for a method that returns a single
pseudorandomly chosen value. For example, if `r` implements
`RandomGenerator`, then the method call `r.ints(100)` returns a
stream of 100 `int` values. These are not necessarily the exact same
values that would have been returned if instead `r.nextInt()` had been
called 100 times; all that is guaranteed is that each value in the stream is
chosen in a similar pseudorandom manner from the same range.

 Every object that implements the `RandomGenerator` interface by
using a pseudorandom algorithm is assumed to contain a finite amount of
state. Using such an object to generate a pseudorandomly chosen value alters
its state by computing a new state as a function of the current state,
without reference to any information other than the current state. The number
of distinct possible states of such an object is called its *period*.
(Some implementations of the `RandomGenerator` interface may be truly
random rather than pseudorandom, for example relying on the statistical
behavior of a physical object to derive chosen values. Such implementations
do not have a fixed period.)

 As a rule, objects that implement the `RandomGenerator` interface
need not be thread-safe. It is recommended that multithreaded applications
use either `ThreadLocalRandom` or (preferably) pseudorandom number
generators that implement the `SplittableGenerator` or
`JumpableGenerator` interface.

 Objects that implement `RandomGenerator` are typically not
cryptographically secure. Consider instead using `SecureRandom` to get
a cryptographically secure pseudorandom number generator for use by
security-sensitive applications. Note, however, that `SecureRandom`
does implement the `RandomGenerator` interface, so that instances of
`SecureRandom` may be used interchangeably with other types of
pseudorandom generators in applications that do not require a secure
generator.

Unless explicit stated otherwise, the use of null for any method argument
will cause a NullPointerException.

**Since:** 17

## RandomGenerator.of(String)

```java
static RandomGenerator of(String name)
```

Returns an instance of `RandomGenerator` that utilizes the
`name` algorithm.

Parameters:

- `name`: Name of random number generator algorithm

**Returns:** An instance of `RandomGenerator`

Throws:

- `NullPointerException`: if name is null
- `IllegalArgumentException`: if the named algorithm is not found

## RandomGenerator.getDefault()

```java
static RandomGenerator getDefault()
```

Returns a `RandomGenerator` meeting the minimal requirement
of having an algorithm
whose state bits are greater than or equal 64.

**Implementation requirements:** Since algorithms will improve over time, there is no
guarantee that this method will return the same algorithm over time.

 The default implementation selects L32X64MixRandom.

**Returns:** a `RandomGenerator`

## RandomGenerator.isDeprecated()

```java
default boolean isDeprecated()
```

Return true if the implementation of RandomGenerator (algorithm) has been
marked for deprecation.

**Implementation note:** Random number generator algorithms evolve over time; new
algorithms will be introduced and old algorithms will
lose standing. If an older algorithm is deemed unsuitable
for continued use, it will be marked as deprecated to indicate
that it may be removed at some point in the future.

**Returns:** true if the implementation of RandomGenerator (algorithm) has been
        marked for deprecation

**Implementation requirements:** The default implementation checks for the @Deprecated annotation.

## RandomGenerator.doubles()

```java
default DoubleStream doubles()
```

Returns an effectively unlimited stream of pseudorandomly chosen
`double` values.

**Returns:** a stream of pseudorandomly chosen `double` values

**Implementation note:** It is permitted to implement this method in a manner equivalent to
doubles
(Long.MAX_VALUE).

**Implementation requirements:** The default implementation produces a sequential stream
that repeatedly calls nextDouble().

## RandomGenerator.doubles(double, double)

```java
default DoubleStream doubles(double randomNumberOrigin, double randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
`double` values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

Parameters:

- `randomNumberOrigin`: the least value that can be produced
- `randomNumberBound`: the upper bound (exclusive) for each value produced

**Returns:** a stream of pseudorandomly chosen `double` values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

**Implementation note:** It is permitted to implement this method in a manner equivalent to
double, double) doubles
(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound).

**Implementation requirements:** The default implementation produces a sequential stream that repeatedly
calls double) nextDouble(randomNumberOrigin, randomNumberBound).

Throws:

- `IllegalArgumentException`: if `randomNumberOrigin` is not finite, or `randomNumberBound` is not finite, or `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## RandomGenerator.doubles(long)

```java
default DoubleStream doubles(long streamSize)
```

Returns a stream producing the given `streamSize` number of
pseudorandomly chosen `double` values.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of pseudorandomly chosen `double` values

**Implementation requirements:** The default implementation produces a sequential stream
that repeatedly calls nextDouble().

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.doubles(long, double, double)

```java
default DoubleStream doubles(long streamSize, double randomNumberOrigin, double randomNumberBound)
```

Returns a stream producing the given `streamSize` number of
pseudorandomly chosen `double` values, where each value is
between the specified origin (inclusive) and the specified bound
(exclusive).

Parameters:

- `streamSize`: the number of values to generate
- `randomNumberOrigin`: the least value that can be produced
- `randomNumberBound`: the upper bound (exclusive) for each value produced

**Returns:** a stream of pseudorandomly chosen `double` values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

**Implementation requirements:** The default implementation produces a sequential stream that repeatedly
calls double) nextDouble(randomNumberOrigin, randomNumberBound).

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero, or `randomNumberOrigin` is not finite, or `randomNumberBound` is not finite, or `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## RandomGenerator.equiDoubles(double, double, boolean, boolean)

```java
default DoubleStream equiDoubles(double left, double right, boolean isLeftIncluded, boolean isRightIncluded)
```

Returns an effectively unlimited stream of pseudorandomly chosen
`double` values, where each value is between the specified
`left` boundary and the specified `right` boundary.
The `left` boundary is included as indicated by
`isLeftIncluded`; similarly, the `right` boundary is included
as indicated by `isRightIncluded`.

The stream potentially produces all multiples *k* &delta;
(*k* integer) lying in the interval specified by the parameters,
where &delta; > 0 is the smallest number for which all these multiples
are exact `double`s.
They are therefore all equidistant.
The uniformity of the distribution of the `double`s produced by
the stream depends on the quality of the underlying `nextLong(long)`.

Parameters:

- `left`: the left boundary
- `right`: the right boundary
- `isLeftIncluded`: whether the `left` boundary is included
- `isRightIncluded`: whether the `right` boundary is included

**Implementation requirements:** The default implementation first determines the &delta; above.
It then computes both the smallest integer *k**l*
such that *k**l* &delta; lies *inside*
the given interval, and the smallest integer *n* > 0 such that
(*k**l* + *n*) &delta; lies
*outside* the interval.
Finally, it returns a stream which generates the `double`s
according to (*k**l* + `nextLong(`*n*`)`)
&delta;.
The stream never produces `-0.0`, although it may produce
`0.0` if the specified interval contains 0.

**Returns:** a stream of pseudorandomly chosen `double` values, each
        between `left` and `right`, as specified above.

**Since:** 22

Throws:

- `IllegalArgumentException`: if `left` is not finite, or `right` is not finite, or if the specified interval is empty.

## RandomGenerator.ints()

```java
default IntStream ints()
```

Returns an effectively unlimited stream of pseudorandomly chosen
`int` values.

**Returns:** a stream of pseudorandomly chosen `int` values

**Implementation note:** It is permitted to implement this method in a manner
equivalent to ints
(Long.MAX_VALUE).

**Implementation requirements:** The default implementation produces a sequential stream
that repeatedly calls nextInt().

## RandomGenerator.ints(int, int)

```java
default IntStream ints(int randomNumberOrigin, int randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
`int` values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

Parameters:

- `randomNumberOrigin`: the least value that can be produced
- `randomNumberBound`: the upper bound (exclusive) for each value produced

**Returns:** a stream of pseudorandomly chosen `int` values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

**Implementation note:** It is permitted to implement this method in a manner equivalent to
int, int) ints
(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound).

**Implementation requirements:** The default implementation produces a sequential stream that repeatedly
calls int) nextInt(randomNumberOrigin, randomNumberBound).

Throws:

- `IllegalArgumentException`: if `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## RandomGenerator.ints(long)

```java
default IntStream ints(long streamSize)
```

Returns a stream producing the given `streamSize` number of
pseudorandomly chosen `int` values.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of pseudorandomly chosen `int` values

**Implementation requirements:** The default implementation produces a sequential stream
that repeatedly calls nextInt().

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.ints(long, int, int)

```java
default IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)
```

Returns a stream producing the given `streamSize` number of
pseudorandomly chosen `int` values, where each value is between
the specified origin (inclusive) and the specified bound (exclusive).

Parameters:

- `streamSize`: the number of values to generate
- `randomNumberOrigin`: the least value that can be produced
- `randomNumberBound`: the upper bound (exclusive) for each value produced

**Returns:** a stream of pseudorandomly chosen `int` values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

**Implementation requirements:** The default implementation produces a sequential stream that repeatedly
calls int) nextInt(randomNumberOrigin, randomNumberBound).

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero, or `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## RandomGenerator.longs()

```java
default LongStream longs()
```

Returns an effectively unlimited stream of pseudorandomly chosen
`long` values.

**Returns:** a stream of pseudorandomly chosen `long` values

**Implementation note:** It is permitted to implement this method in a manner
equivalent to longs
(Long.MAX_VALUE).

**Implementation requirements:** The default implementation produces a sequential stream
that repeatedly calls nextLong().

## RandomGenerator.longs(long, long)

```java
default LongStream longs(long randomNumberOrigin, long randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
`long` values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

Parameters:

- `randomNumberOrigin`: the least value that can be produced
- `randomNumberBound`: the upper bound (exclusive) for each value produced

**Returns:** a stream of pseudorandomly chosen `long` values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

**Implementation note:** It is permitted to implement this method in a manner equivalent to
long, long) longs
(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound).

**Implementation requirements:** The default implementation produces a sequential stream that repeatedly
calls long) nextLong(randomNumberOrigin, randomNumberBound).

Throws:

- `IllegalArgumentException`: if `randomNumberOrigin` is greater than or equal to `randomNumberBound`
