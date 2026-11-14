---
title: "Random class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Random.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Random class (java.util) (part 2 of 2)

## Random.nextGaussian()

```java
public synchronized double nextGaussian()
```

Returns the next pseudorandom, Gaussian ("normally") distributed
`double` value with mean `0.0` and standard
deviation `1.0` from this random number generator's sequence.

The general contract of `nextGaussian` is that one
`double` value, chosen from (approximately) the usual
normal distribution with mean `0.0` and standard deviation
`1.0`, is pseudorandomly generated and returned.

**Implementation requirements:** The method `nextGaussian` is implemented by class
`Random` as if by a threadsafe version of the following:

```java
private double nextNextGaussian;
private boolean haveNextNextGaussian = false;

public double nextGaussian() {
  if (haveNextNextGaussian) {
    haveNextNextGaussian = false;
    return nextNextGaussian;
  } else {
    double v1, v2, s;
    do {
      v1 = 2 * nextDouble() - 1;   // between -1.0 and 1.0
      v2 = 2 * nextDouble() - 1;   // between -1.0 and 1.0
      s = v1 * v1 + v2 * v2;
    } while (s >= 1 || s == 0);
    double multiplier = StrictMath.sqrt(-2 * StrictMath.log(s)/s);
    nextNextGaussian = v2 * multiplier;
    haveNextNextGaussian = true;
    return v1 * multiplier;
  }
}
```

This uses the *polar method* of G. E. P. Box, M. E. Muller, and
G. Marsaglia, as described by Donald E. Knuth in *The Art of
Computer Programming, Volume 2, third edition: Seminumerical Algorithms*,
section 3.4.1, subsection C, algorithm P. Note that it generates two
independent values at the cost of only one call to `StrictMath.log`
and one call to `StrictMath.sqrt`.

**Returns:** the next pseudorandom, Gaussian ("normally") distributed
        `double` value with mean `0.0` and
        standard deviation `1.0` from this random number
        generator's sequence

## Random.ints(long)

```java
public IntStream ints(long streamSize)
```

Returns a stream producing the given `streamSize` number of
pseudorandom `int` values.

A pseudorandom `int` value is generated as if it's the result of
calling the method `nextInt()`.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of pseudorandom `int` values

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## Random.ints()

```java
public IntStream ints()
```

Returns an effectively unlimited stream of pseudorandom `int`
values.

A pseudorandom `int` value is generated as if it's the result of
calling the method `nextInt()`.

**Implementation note:** This method is implemented to be equivalent to `ints(Long.MAX_VALUE)`.

**Returns:** a stream of pseudorandom `int` values

**Since:** 1.8

## Random.ints(long, int, int)

```java
public IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)
```

Returns a stream producing the given `streamSize` number
of pseudorandom `int` values, each conforming to the given
origin (inclusive) and bound (exclusive).

A pseudorandom `int` value is generated as if it's the result of
calling the following method with the origin and bound:

```java
int nextInt(int origin, int bound) {
  int n = bound - origin;
  if (n > 0) {
    return nextInt(n) + origin;
  }
  else {  // range not representable as int
    int r;
    do {
      r = nextInt();
    } while (r < origin || r >= bound);
    return r;
  }
}
```

Parameters:

- `streamSize`: the number of values to generate
- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Returns:** a stream of pseudorandom `int` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero, or `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## Random.ints(int, int)

```java
public IntStream ints(int randomNumberOrigin, int randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandom `int` values, each conforming to the given origin (inclusive) and bound
(exclusive).

A pseudorandom `int` value is generated as if it's the result of
calling the following method with the origin and bound:

```java
int nextInt(int origin, int bound) {
  int n = bound - origin;
  if (n > 0) {
    return nextInt(n) + origin;
  }
  else {  // range not representable as int
    int r;
    do {
      r = nextInt();
    } while (r < origin || r >= bound);
    return r;
  }
}
```

Parameters:

- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Implementation note:** This method is implemented to be equivalent to `ints(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Returns:** a stream of pseudorandom `int` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## Random.longs(long)

```java
public LongStream longs(long streamSize)
```

Returns a stream producing the given `streamSize` number of
pseudorandom `long` values.

A pseudorandom `long` value is generated as if it's the result
of calling the method `nextLong()`.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of pseudorandom `long` values

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## Random.longs()

```java
public LongStream longs()
```

Returns an effectively unlimited stream of pseudorandom `long`
values.

A pseudorandom `long` value is generated as if it's the result
of calling the method `nextLong()`.

**Implementation note:** This method is implemented to be equivalent to `longs(Long.MAX_VALUE)`.

**Returns:** a stream of pseudorandom `long` values

**Since:** 1.8

## Random.longs(long, long, long)

```java
public LongStream longs(long streamSize, long randomNumberOrigin, long randomNumberBound)
```

Returns a stream producing the given `streamSize` number of
pseudorandom `long`, each conforming to the given origin
(inclusive) and bound (exclusive).

A pseudorandom `long` value is generated as if it's the result
of calling the following method with the origin and bound:

```java
long nextLong(long origin, long bound) {
  long r = nextLong();
  long n = bound - origin, m = n - 1;
  if ((n & m) == 0L)  // power of two
    r = (r & m) + origin;
  else if (n > 0L) {  // reject over-represented candidates
    for (long u = r >>> 1;            // ensure nonnegative
         u + m - (r = u % n) < 0L;    // rejection check
         u = nextLong() >>> 1) // retry
        ;
    r += origin;
  }
  else {              // range not representable as long
    while (r < origin || r >= bound)
      r = nextLong();
  }
  return r;
}
```

Parameters:

- `streamSize`: the number of values to generate
- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Returns:** a stream of pseudorandom `long` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero, or `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## Random.longs(long, long)

```java
public LongStream longs(long randomNumberOrigin, long randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandom `long` values, each conforming to the given origin (inclusive) and bound
(exclusive).

A pseudorandom `long` value is generated as if it's the result
of calling the following method with the origin and bound:

```java
long nextLong(long origin, long bound) {
  long r = nextLong();
  long n = bound - origin, m = n - 1;
  if ((n & m) == 0L)  // power of two
    r = (r & m) + origin;
  else if (n > 0L) {  // reject over-represented candidates
    for (long u = r >>> 1;            // ensure nonnegative
         u + m - (r = u % n) < 0L;    // rejection check
         u = nextLong() >>> 1) // retry
        ;
    r += origin;
  }
  else {              // range not representable as long
    while (r < origin || r >= bound)
      r = nextLong();
  }
  return r;
}
```

Parameters:

- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Implementation note:** This method is implemented to be equivalent to `longs(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Returns:** a stream of pseudorandom `long` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `randomNumberOrigin` is greater than or equal to `randomNumberBound`

## Random.doubles(long)

```java
public DoubleStream doubles(long streamSize)
```

Returns a stream producing the given `streamSize` number of
pseudorandom `double` values, each between zero
(inclusive) and one (exclusive).

A pseudorandom `double` value is generated as if it's the result
of calling the method `nextDouble()`.

Parameters:

- `streamSize`: the number of values to generate

**Returns:** a stream of `double` values

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `streamSize` is less than zero

## Random.doubles()

```java
public DoubleStream doubles()
```

Returns an effectively unlimited stream of pseudorandom `double` values, each between zero (inclusive) and one
(exclusive).

A pseudorandom `double` value is generated as if it's the result
of calling the method `nextDouble()`.

**Implementation note:** This method is implemented to be equivalent to `doubles(Long.MAX_VALUE)`.

**Returns:** a stream of pseudorandom `double` values

**Since:** 1.8

## Random.doubles(long, double, double)

```java
public DoubleStream doubles(long streamSize, double randomNumberOrigin, double randomNumberBound)
```

Returns a stream producing the given `streamSize` number of
pseudorandom `double` values, each conforming to the given origin
(inclusive) and bound (exclusive).

Parameters:

- `streamSize`: the number of values to generate
- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Returns:** a stream of pseudorandom `double` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## Random.doubles(double, double)

```java
public DoubleStream doubles(double randomNumberOrigin, double randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandom `double` values, each conforming to the given origin (inclusive) and bound
(exclusive).

Parameters:

- `randomNumberOrigin`: the origin (inclusive) of each random value
- `randomNumberBound`: the bound (exclusive) of each random value

**Implementation note:** This method is implemented to be equivalent to `doubles(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Returns:** a stream of pseudorandom `double` values,
        each with the given origin (inclusive) and bound (exclusive)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)
