---
title: "Random class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Random.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Random class (java.util)

```java
public class Random implements RandomGenerator, java.io.Serializable
```

An instance of this class is used to generate a stream of
pseudorandom numbers; its period is only 248.
The class uses a 48-bit seed, which is
modified using a linear congruential formula. (See Donald E. Knuth,
*The Art of Computer Programming, Volume 2, Third
edition: Seminumerical Algorithms*, Section 3.2.1.)

If two instances of `Random` are created with the same
seed, and the same sequence of method calls is made for each, they
will generate and return identical sequences of numbers. In order to
guarantee this property, particular algorithms are specified for the
class `Random`. Java implementations must use all the algorithms
shown here for the class `Random`, for the sake of absolute
portability of Java code. However, subclasses of class `Random`
are permitted to use other algorithms, so long as they adhere to the
general contracts for all the methods.

The algorithms implemented by class `Random` use a
`protected` utility method that on each invocation can supply
up to 32 pseudorandomly generated bits.

Many applications will find the method `Math.random` simpler to use.

Instances of `java.util.Random` are threadsafe.
However, the concurrent use of the same `java.util.Random`
instance across threads may encounter contention and consequent
poor performance. Consider instead using
`java.util.concurrent.ThreadLocalRandom` in multithreaded
designs.

Instances of `java.util.Random` are not cryptographically
secure.  Consider instead using `java.security.SecureRandom` to
get a cryptographically secure pseudo-random number generator for use
by security-sensitive applications.

**Since:** 1.0

## Random.setSeed(long)

```java
public void setSeed(long seed)
```

setSeed does not exist in `java.util.random.RandomGenerator` so can't
use it.

## Random.Random()

```java
public Random()
```

Creates a new random number generator. This constructor sets
the seed of the random number generator to a value very likely
to be distinct from any other invocation of this constructor.

## Random.Random(long)

```java
public Random(long seed)
```

Creates a new random number generator using a single `long` seed.
The seed is the initial value of the internal state of the pseudorandom
number generator which is maintained by method `next`.

Parameters:

- `seed`: the initial seed

**Implementation requirements:** The invocation `new Random(seed)` is equivalent to:

```java
Random rnd = new Random();
rnd.setSeed(seed);
```

**See also:** #setSeed(long)

## Random.from(RandomGenerator)

```java
public static Random from(RandomGenerator generator)
```

Returns an instance of `Random` that delegates method calls to the `RandomGenerator`
argument. If the generator is an instance of `Random`, it is returned. Otherwise, this method
returns an instance of `Random` that delegates all methods except `setSeed` to the generator.
The returned instance's `setSeed` method always throws `UnsupportedOperationException`.
The returned instance is not serializable.

Parameters:

- `generator`: the `RandomGenerator` calls are delegated to

**Returns:** the delegating `Random` instance

**Since:** 19

Throws:

- `NullPointerException`: if generator is null

## Random.setSeed(long)

```java
public synchronized void setSeed(long seed)
```

Sets or updates the seed of this random number generator using the
provided `long` seed value (optional operation).

Parameters:

- `seed`: the seed value

**Implementation requirements:** The implementation in this class alters the state of this random number
generator so that it is in the same state as if it had just been created with
new Random(seed). It atomically updates the seed to

```java
(seed ^ 0x5DEECE66DL) & ((1L << 48) - 1)
```

and clears the `haveNextNextGaussian` flag used by `nextGaussian`.
Note that this uses only 48 bits of the given seed value.

Throws:

- `UnsupportedOperationException`: if the `setSeed` operation is not supported by this random number generator

## Random.next(int)

```java
protected int next(int bits)
```

Generates the next pseudorandom number. This method returns an
`int` value such that, if the argument `bits` is between
`1` and `32` (inclusive), then that many low-order
bits of the returned value will be (approximately) independently
chosen bit values, each of which is (approximately) equally
likely to be `0` or `1`.

Parameters:

- `bits`: random bits

**API note:** The other random-producing methods in this class are implemented
in terms of this method, so subclasses can override just this
method to provide a different source of pseudorandom numbers for
the entire class.

**Implementation requirements:** The implementation in this class atomically updates the seed to

```java
(seed * 0x5DEECE66DL + 0xBL) & ((1L << 48) - 1)
```

and returns

```java
(int)(seed >>> (48 - bits))}.
```

This is a linear congruential pseudorandom number generator, as
defined by D. H. Lehmer and described by Donald E. Knuth in
*The Art of Computer Programming, Volume 2, Third edition:
Seminumerical Algorithms*, section 3.2.1.

**Returns:** the next pseudorandom value from this random number
        generator's sequence

**Since:** 1.1

## Random.nextBytes(byte[])

```java
public void nextBytes(byte[] bytes)
```

Generates random bytes and places them into a user-supplied
byte array.  The number of random bytes produced is equal to
the length of the byte array.

Parameters:

- `bytes`: the byte array to fill with random bytes

**Implementation requirements:** The method `nextBytes` is
implemented by class `Random` as if by:

```java
public void nextBytes(byte[] bytes) {
  for (int i = 0; i < bytes.length; )
    for (int rnd = nextInt(), n = Math.min(bytes.length - i, 4);
         n-- > 0; rnd >>= 8)
      bytes[i++] = (byte)rnd;
}
```

**Since:** 1.1

Throws:

- `NullPointerException`: if the byte array is null

## Random.nextInt()

```java
public int nextInt()
```

Returns the next pseudorandom, uniformly distributed `int`
value from this random number generator's sequence. The general
contract of `nextInt` is that one `int` value is
pseudorandomly generated and returned. All 232 possible
`int` values are produced with (approximately) equal probability.

**Implementation requirements:** The method `nextInt` is
implemented by class `Random` as if by:

```java
public int nextInt() {
  return next(32);
}
```

**Returns:** the next pseudorandom, uniformly distributed `int`
        value from this random number generator's sequence

## Random.nextInt(int)

```java
public int nextInt(int bound)
```

Returns a pseudorandom, uniformly distributed `int` value
between 0 (inclusive) and the specified value (exclusive), drawn from
this random number generator's sequence.  The general contract of
`nextInt` is that one `int` value in the specified range
is pseudorandomly generated and returned.  All `bound` possible
`int` values are produced with (approximately) equal
probability.

Parameters:

- `bound`: the upper bound (exclusive). Must be positive.

**Implementation requirements:** The method `nextInt(int bound)` is implemented by
class `Random` as if by:

```java
public int nextInt(int bound) {
  if (bound <= 0)
    throw new IllegalArgumentException("bound must be positive");

  if ((bound & -bound) == bound)  // i.e., bound is a power of 2
    return (int)((bound * (long)next(31)) >> 31);

  int bits, val;
  do {
      bits = next(31);
      val = bits % bound;
  } while (bits - val + (bound-1) < 0);
  return val;
}
```

The hedge "approximately" is used in the foregoing description only
because the next method is only approximately an unbiased source of
independently chosen bits.  If it were a perfect source of randomly
chosen bits, then the algorithm shown would choose `int`
values from the stated range with perfect uniformity.

The algorithm is slightly tricky.  It rejects values that would result
in an uneven distribution (due to the fact that 2^31 is not divisible
by n). The probability of a value being rejected depends on n.  The
worst case is n=2^30+1, for which the probability of a reject is 1/2,
and the expected number of iterations before the loop terminates is 2.

The algorithm treats the case where n is a power of two specially: it
returns the correct number of high-order bits from the underlying
pseudo-random number generator.  In the absence of special treatment,
the correct number of *low-order* bits would be returned.  Linear
congruential pseudo-random number generators such as the one
implemented by this class are known to have short periods in the
sequence of values of their low-order bits.  Thus, this special case
greatly increases the length of the sequence of values returned by
successive calls to this method if n is a small power of two.

**Returns:** the next pseudorandom, uniformly distributed `int`
        value between zero (inclusive) and `bound` (exclusive)
        from this random number generator's sequence

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if bound is not positive

## Random.nextLong()

```java
public long nextLong()
```

Returns the next pseudorandom, uniformly distributed `long`
value from this random number generator's sequence. The general
contract of `nextLong` is that one `long` value is
pseudorandomly generated and returned.

**Implementation requirements:** The method `nextLong` is implemented by class `Random`
as if by:

```java
public long nextLong() {
  return ((long)next(32) << 32) + next(32);
}
```

Because class `Random` uses a seed with only 48 bits,
this algorithm will not return all possible `long` values.

**Returns:** the next pseudorandom, uniformly distributed `long`
        value from this random number generator's sequence

## Random.nextBoolean()

```java
public boolean nextBoolean()
```

Returns the next pseudorandom, uniformly distributed
`boolean` value from this random number generator's
sequence. The general contract of `nextBoolean` is that one
`boolean` value is pseudorandomly generated and returned.  The
values `true` and `false` are produced with
(approximately) equal probability.

**Implementation requirements:** The method `nextBoolean` is implemented by class
`Random` as if by:

```java
public boolean nextBoolean() {
  return next(1) != 0;
}
```

**Returns:** the next pseudorandom, uniformly distributed
        `boolean` value from this random number generator's
        sequence

**Since:** 1.2

## Random.nextFloat()

```java
public float nextFloat()
```

Returns the next pseudorandom, uniformly distributed `float`
value between `0.0` and `1.0` from this random
number generator's sequence.

The general contract of `nextFloat` is that one
`float` value, chosen (approximately) uniformly from the
range `0.0f` (inclusive) to `1.0f` (exclusive), is
pseudorandomly generated and returned. All 224 possible
`float` values of the form *m x *2-24,
where *m* is a positive integer less than 224, are
produced with (approximately) equal probability.

**Implementation requirements:** The method `nextFloat` is implemented by class
`Random` as if by:

```java
public float nextFloat() {
  return next(24) / ((float)(1 << 24));
}
```

The hedge "approximately" is used in the foregoing description only
because the next method is only approximately an unbiased source of
independently chosen bits. If it were a perfect source of randomly
chosen bits, then the algorithm shown would choose `float`
values from the stated range with perfect uniformity.

[In early versions of Java, the result was incorrectly calculated as:

```java
return next(30) / ((float)(1 << 30));
```

This might seem to be equivalent, if not better, but in fact it
introduced a slight nonuniformity because of the bias in the rounding
of floating-point numbers: it was slightly more likely that the
low-order bit of the significand would be 0 than that it would be 1.]

**Returns:** the next pseudorandom, uniformly distributed `float`
        value between `0.0f` and `1.0f` from this
        random number generator's sequence

## Random.nextDouble()

```java
public double nextDouble()
```

Returns the next pseudorandom, uniformly distributed
`double` value between `0.0` and
`1.0` from this random number generator's sequence.

The general contract of `nextDouble` is that one
`double` value, chosen (approximately) uniformly from the
range `0.0d` (inclusive) to `1.0d` (exclusive), is
pseudorandomly generated and returned.

**Implementation requirements:** The method `nextDouble` is implemented by class
`Random` as if by:

```java
public double nextDouble() {
  return (((long)next(26) << 27) + next(27))
    / (double)(1L << 53);
}
```

The hedge "approximately" is used in the foregoing description only
because the `next` method is only approximately an unbiased source
of independently chosen bits. If it were a perfect source of randomly
chosen bits, then the algorithm shown would choose `double` values
from the stated range with perfect uniformity.

[In early versions of Java, the result was incorrectly calculated as:

```java
return (((long)next(27) << 27) + next(27)) / (double)(1L << 54);
```

This might seem to be equivalent, if not better, but in fact it
introduced a large nonuniformity because of the bias in the rounding of
floating-point numbers: it was three times as likely that the low-order
bit of the significand would be 0 than that it would be 1! This
nonuniformity probably doesn't matter much in practice, but we strive
for perfection.]

**Returns:** the next pseudorandom, uniformly distributed `double`
        value between `0.0` and `1.0` from this
        random number generator's sequence

**See also:** Math#random
