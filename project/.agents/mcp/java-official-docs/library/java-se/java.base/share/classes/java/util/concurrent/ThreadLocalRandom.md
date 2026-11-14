---
title: "ThreadLocalRandom class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ThreadLocalRandom.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadLocalRandom class (java.util.concurrent)

```java
public final class ThreadLocalRandom extends Random
```

A random number generator (with period 264) isolated
to the current thread.  Like the global `java.util.Random`
generator used by the `java.lang.Math` class,
a `ThreadLocalRandom` is initialized
with an internally generated seed that may not otherwise be
modified. When applicable, use of `ThreadLocalRandom` rather
than shared `Random` objects in concurrent programs will
typically encounter much less overhead and contention.  Use of
`ThreadLocalRandom` is particularly appropriate when multiple
tasks (for example, each a `ForkJoinTask`) use random numbers
in parallel in thread pools.

Usages of this class should typically be of the form:
`ThreadLocalRandom.current().nextX(...)` (where
`X` is `Int`, `Long`, etc).
When all usages are of this form, it is never possible to
accidentally share a `ThreadLocalRandom` across multiple threads.

This class also provides additional commonly used bounded random
generation methods.

Instances of `ThreadLocalRandom` are not cryptographically
secure.  Consider instead using `java.security.SecureRandom`
in security-sensitive applications. Additionally,
default-constructed instances do not use a cryptographically random
seed unless the system property
`java.util.secureRandomSeed` is set to `true`.

**Since:** 1.7

## ThreadLocalRandom.current()

```java
public static ThreadLocalRandom current()
```

Returns the current thread's `ThreadLocalRandom` object.
Methods of this object should be called only by the current thread,
not by other threads.

**Returns:** the current thread's `ThreadLocalRandom`

## ThreadLocalRandom.setSeed(long)

```java
public void setSeed(long seed)
```

Throws `UnsupportedOperationException`.  Setting seeds in
this generator is not supported.

Throws:

- `UnsupportedOperationException`: always

## ThreadLocalRandom.next(int)

```java
protected int next(int bits)
```

Generates a pseudorandom number with the indicated number of
low-order bits.  Because this class has no subclasses, this
method cannot be invoked or overridden.

Parameters:

- `bits`: random bits

**Returns:** the next pseudorandom value from this random number
        generator's sequence

## ThreadLocalRandom.nextBoolean()

```java
public boolean nextBoolean()
```

(inherited documentation)

## ThreadLocalRandom.nextInt()

```java
public int nextInt()
```

(inherited documentation)

## ThreadLocalRandom.nextInt(int)

```java
public int nextInt(int bound)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextInt(int, int)

```java
public int nextInt(int origin, int bound)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextLong()

```java
public long nextLong()
```

(inherited documentation)

## ThreadLocalRandom.nextLong(long)

```java
public long nextLong(long bound)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextLong(long, long)

```java
public long nextLong(long origin, long bound)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextFloat()

```java
public float nextFloat()
```

(inherited documentation)

## ThreadLocalRandom.nextFloat(float)

```java
public float nextFloat(float bound)
```

(inherited documentation)

**Implementation note:** (inherited documentation)

**Since:** 17

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextFloat(float, float)

```java
public float nextFloat(float origin, float bound)
```

(inherited documentation)

**Implementation note:** (inherited documentation)

**Since:** 17

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextDouble()

```java
public double nextDouble()
```

(inherited documentation)

## ThreadLocalRandom.nextDouble(double)

```java
public double nextDouble(double bound)
```

(inherited documentation)

**Implementation note:** (inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.nextDouble(double, double)

```java
public double nextDouble(double origin, double bound)
```

(inherited documentation)

**Implementation note:** (inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.ints(long)

```java
public IntStream ints(long streamSize)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.ints()

```java
public IntStream ints()
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `ints(Long.MAX_VALUE)`.

**Since:** 1.8

## ThreadLocalRandom.ints(long, int, int)

```java
public IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.ints(int, int)

```java
public IntStream ints(int randomNumberOrigin, int randomNumberBound)
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `ints(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.longs(long)

```java
public LongStream longs(long streamSize)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.longs()

```java
public LongStream longs()
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `longs(Long.MAX_VALUE)`.

**Since:** 1.8

## ThreadLocalRandom.longs(long, long, long)

```java
public LongStream longs(long streamSize, long randomNumberOrigin, long randomNumberBound)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.longs(long, long)

```java
public LongStream longs(long randomNumberOrigin, long randomNumberBound)
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `longs(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.doubles(long)

```java
public DoubleStream doubles(long streamSize)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.doubles()

```java
public DoubleStream doubles()
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `doubles(Long.MAX_VALUE)`.

**Since:** 1.8

## ThreadLocalRandom.doubles(long, double, double)

```java
public DoubleStream doubles(long streamSize, double randomNumberOrigin, double randomNumberBound)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)

## ThreadLocalRandom.doubles(double, double)

```java
public DoubleStream doubles(double randomNumberOrigin, double randomNumberBound)
```

(inherited documentation)

**Implementation note:** This method is implemented to be equivalent to
          `doubles(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)`.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: (inherited documentation)
