---
title: "RandomGenerator interface (java.util.random) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/random/RandomGenerator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RandomGenerator interface (java.util.random) (part 4 of 4)

## RandomGenerator.jumps(long, double)

```java
default Stream<ArbitrarilyJumpableGenerator> jumps(long streamSize, double distance)
```

Returns a stream producing the given `streamSize` number of new
pseudorandom number generators, each of which implements the
`ArbitrarilyJumpableGenerator` interface, produced by jumping
copies of this generator by different integer multiples of the
specified jump distance.

Parameters:

- `streamSize`: the number of generators to generate
- `distance`: a distance to jump forward within the state cycle

**Returns:** a stream of objects that implement the `RandomGenerator` interface

**Implementation requirements:** The default implementation is equivalent to
jumps(distance).limit(streamSize).

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero or if `distance` is not greater than or equal to 0.0, or is greater than the period of this generator

## RandomGenerator.leap()

```java
default void leap()
```

Alter the state of this pseudorandom number generator so as to jump
forward a very large, fixed distance (typically 2128 or
more) within its state cycle. The distance used is that returned by
method
leapDistance().

## RandomGenerator.copyAndJump(double)

```java
default ArbitrarilyJumpableGenerator copyAndJump(double distance)
```

Copy this generator, jump this generator forward, then return the
copy.

Parameters:

- `distance`: a distance to jump forward within the state cycle

**Returns:** a copy of this generator object before the jump occurred

**Implementation requirements:** The default implementation copies this, jumps(distance) and then
returns the copy.

Throws:

- `IllegalArgumentException`: if `distance` is not greater than or equal to 0.0, or is greater than the period of this generator
