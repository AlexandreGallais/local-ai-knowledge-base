---
title: "RandomGenerator interface (java.util.random) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/random/RandomGenerator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RandomGenerator interface (java.util.random) (part 3 of 4)

## RandomGenerator.split()

```java
SplittableGenerator split()
```

Returns a new pseudorandom number generator, split off from this one,
that implements the `RandomGenerator` and
`SplittableGenerator` interfaces.

 This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state of the new one.

**Returns:** a new object that implements the `RandomGenerator` and
        `SplittableGenerator` interfaces

## RandomGenerator.split(SplittableGenerator)

```java
SplittableGenerator split(SplittableGenerator source)
```

Returns a new pseudorandom number generator, split off from this one,
that implements the `RandomGenerator` and
`SplittableGenerator` interfaces.

Parameters:

- `source`: a `SplittableGenerator` instance to be used instead of this one as a source of pseudorandom bits used to initialize the state of the new ones.

**Returns:** an object that implements the `RandomGenerator` and
        `SplittableGenerator` interfaces

Throws:

- `NullPointerException`: if source is null

## RandomGenerator.splits()

```java
default Stream<SplittableGenerator> splits()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `SplittableGenerator`
interface.

 This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state the new ones.

**Implementation note:** It is permitted to implement this method in a manner
equivalent to splits
(Long.MAX_VALUE).

**Returns:** a stream of `SplittableGenerator` objects

**Implementation requirements:** The default implementation invokes
splits(this).

## RandomGenerator.splits(long)

```java
Stream<SplittableGenerator> splits(long streamSize)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`SplittableGenerator` interface.

 This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state the new ones.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of `SplittableGenerator` objects

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.splits(SplittableGenerator)

```java
Stream<SplittableGenerator> splits(SplittableGenerator source)
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `SplittableGenerator`
interface.

Parameters:

- `source`: a `SplittableGenerator` instance to be used instead of this one as a source of pseudorandom bits used to initialize the state of the new ones.

**Returns:** a stream of `SplittableGenerator` objects

**Implementation note:** It is permitted to implement this method in a manner
          equivalent to SplittableGenerator) splits
          (Long.MAX_VALUE, source).

Throws:

- `NullPointerException`: if source is null

## RandomGenerator.splits(long, SplittableGenerator)

```java
Stream<SplittableGenerator> splits(long streamSize, SplittableGenerator source)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`SplittableGenerator` interface.

Parameters:

- `streamSize`: the number of values to generate
- `source`: a `SplittableGenerator` instance to be used instead of this one as a source of pseudorandom bits used to initialize the state of the new ones.

**Returns:** a stream of `SplittableGenerator` objects

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero
- `NullPointerException`: if source is null

## RandomGenerator.rngs()

```java
default Stream<RandomGenerator> rngs()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `RandomGenerator`
interface. Ideally the generators in the stream will appear to be
statistically independent.

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation calls splits().

## RandomGenerator.rngs(long)

```java
default Stream<RandomGenerator> rngs(long streamSize)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`RandomGenerator` interface. Ideally the generators in the
stream will appear to be statistically independent.

Parameters:

- `streamSize`: the number of generators to generate

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation calls splits(streamSize).

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.of(String)

```java
static JumpableGenerator of(String name)
```

Returns an instance of `JumpableGenerator` that utilizes the
`name` algorithm.

Parameters:

- `name`: Name of random number generator algorithm

**Returns:** An instance of `JumpableGenerator`

Throws:

- `NullPointerException`: if name is null
- `IllegalArgumentException`: if the named algorithm is not found

## RandomGenerator.copy()

```java
JumpableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

**Returns:** a new object that is a copy of this generator

## RandomGenerator.jump()

```java
void jump()
```

Alter the state of this pseudorandom number generator so as to jump
forward a large, fixed distance (typically 264 or more)
within its state cycle.

## RandomGenerator.jumpDistance()

```java
double jumpDistance()
```

Returns the distance by which the
jump() method will jump forward within
the state cycle of this generator object.

**Returns:** the default jump distance (as a `double` value)

## RandomGenerator.jumps()

```java
default Stream<RandomGenerator> jumps()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `RandomGenerator`
interface.

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation note:** It is permitted to implement this method in a manner equivalent to
jumps
(Long.MAX_VALUE).

**Implementation requirements:** The default implementation produces a sequential stream that  repeatedly
calls copy() and jump()
on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.jumps(long)

```java
default Stream<RandomGenerator> jumps(long streamSize)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`RandomGenerator` interface.

Parameters:

- `streamSize`: the number of generators to generate

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation produces a sequential stream that  repeatedly
calls copy() and jump()
on this generator, and the copies become the generators produced by the stream.

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.rngs()

```java
default Stream<RandomGenerator> rngs()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `RandomGenerator`
interface. Ideally the generators in the stream will appear to be
statistically independent.

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation calls jumps().

## RandomGenerator.rngs(long)

```java
default Stream<RandomGenerator> rngs(long streamSize)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`RandomGenerator` interface. Ideally the generators in the
stream will appear to be statistically independent.

Parameters:

- `streamSize`: the number of generators to generate

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation calls jumps(streamSize).

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.copyAndJump()

```java
default RandomGenerator copyAndJump()
```

Copy this generator, jump this generator forward, then return the
copy.

**Returns:** a copy of this generator object before the jump occurred

**Implementation requirements:** The default implementation copies this, jumps and then
returns the copy.

## RandomGenerator.of(String)

```java
static LeapableGenerator of(String name)
```

Returns an instance of `LeapableGenerator` that utilizes the
`name` algorithm.

Parameters:

- `name`: Name of random number generator algorithm

**Returns:** An instance of `LeapableGenerator`

Throws:

- `NullPointerException`: if name is null
- `IllegalArgumentException`: if the named algorithm is not found

## RandomGenerator.copy()

```java
LeapableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

**Returns:** a new object that is a copy of this generator

## RandomGenerator.leap()

```java
void leap()
```

Alter the state of this pseudorandom number generator so as to leap
forward a large, fixed distance (typically 296 or more)
within its state cycle.

## RandomGenerator.leapDistance()

```java
double leapDistance()
```

Returns the distance by which the
leap() method will leap forward within
the state cycle of this generator object.

**Returns:** the default leap distance (as a `double` value)

## RandomGenerator.leaps()

```java
default Stream<JumpableGenerator> leaps()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the `JumpableGenerator`
interface.

**Returns:** a stream of objects that implement the `JumpableGenerator` interface

**Implementation note:** It is permitted to implement this method in a manner equivalent to
leaps
(Long.MAX_VALUE).

**Implementation requirements:** The default implementation produces a sequential stream that  repeatedly
calls copy() and leap()
on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.leaps(long)

```java
default Stream<JumpableGenerator> leaps(long streamSize)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`JumpableGenerator` interface.

Parameters:

- `streamSize`: the number of generators to generate

**Returns:** a stream of objects that implement the `JumpableGenerator` interface

**Implementation requirements:** The default implementation produces a sequential stream that  repeatedly
          calls copy() and leap()
          on this generator, and the copies become the generators produced by the stream.

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## RandomGenerator.copyAndLeap()

```java
default JumpableGenerator copyAndLeap()
```

Copy this generator, leap this generator forward, then return the
copy.

**Returns:** a copy of this generator object before the leap occurred

**Implementation requirements:** The default implementation copies this, leaps and then
returns the copy.

## RandomGenerator.of(String)

```java
static ArbitrarilyJumpableGenerator of(String name)
```

Returns an instance of `ArbitrarilyJumpableGenerator` that
utilizes the `name` algorithm.

Parameters:

- `name`: Name of random number generator algorithm

**Returns:** An instance of `ArbitrarilyJumpableGenerator`

Throws:

- `NullPointerException`: if name is null
- `IllegalArgumentException`: if the named algorithm is not found

## RandomGenerator.copy()

```java
ArbitrarilyJumpableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

**Returns:** a new object that is a copy of this generator

## RandomGenerator.jumpPowerOfTwo(int)

```java
void jumpPowerOfTwo(int logDistance)
```

Alter the state of this pseudorandom number generator so as to jump
forward a distance equal to 2`logDistance` within
its state cycle.

Parameters:

- `logDistance`: the base-2 logarithm of the distance to jump forward within the state cycle

Throws:

- `IllegalArgumentException`: if `logDistance` is 2`logDistance` is greater than the period of this generator

## RandomGenerator.jump(double)

```java
void jump(double distance)
```

Alter the state of this pseudorandom number generator so as to jump
forward a specified distance within its state cycle.

Parameters:

- `distance`: the distance to jump forward within the state cycle

Throws:

- `IllegalArgumentException`: if `distance` is not greater than or equal to 0.0, or is greater than the period of this generator

## RandomGenerator.jump()

```java
default void jump()
```

Alter the state of this pseudorandom number generator so as to jump
forward a large, fixed distance (typically 264 or more)
within its state cycle. The distance used is that returned by method
jumpDistance().

**Implementation requirements:** The default implementation invokes jump(jumpDistance()).

## RandomGenerator.jumps(double)

```java
default Stream<ArbitrarilyJumpableGenerator> jumps(double distance)
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the
`ArbitrarilyJumpableGenerator` interface, produced by jumping
copies of this generator by different integer multiples of the
specified jump distance.

Parameters:

- `distance`: a distance to jump forward within the state cycle

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation is equivalent to
jumps
(Long.MAX_VALUE).

Throws:

- `IllegalArgumentException`: if `distance` is not greater than or equal to 0.0, or is greater than the period of this generator
