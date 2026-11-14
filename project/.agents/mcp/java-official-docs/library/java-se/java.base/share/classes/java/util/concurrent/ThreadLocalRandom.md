# ThreadLocalRandom class (java.util.concurrent)

```java
public final class ThreadLocalRandom extends Random
```

A random number generator (with period 2<sup>64</sup>) isolated
to the current thread.  Like the global {@link java.util.Random}
generator used by the {@link java.lang.Math} class,
a {@code ThreadLocalRandom} is initialized
with an internally generated seed that may not otherwise be
modified. When applicable, use of {@code ThreadLocalRandom} rather
than shared {@code Random} objects in concurrent programs will
typically encounter much less overhead and contention.  Use of
{@code ThreadLocalRandom} is particularly appropriate when multiple
tasks (for example, each a {@link ForkJoinTask}) use random numbers
in parallel in thread pools.

<p>Usages of this class should typically be of the form:
{@code ThreadLocalRandom.current().nextX(...)} (where
{@code X} is {@code Int}, {@code Long}, etc).
When all usages are of this form, it is never possible to
accidentally share a {@code ThreadLocalRandom} across multiple threads.

<p>This class also provides additional commonly used bounded random
generation methods.

<p>Instances of {@code ThreadLocalRandom} are not cryptographically
secure.  Consider instead using {@link java.security.SecureRandom}
in security-sensitive applications. Additionally,
default-constructed instances do not use a cryptographically random
seed unless the {@linkplain System#getProperty system property}
{@code java.util.secureRandomSeed} is set to {@code true}.

@since 1.7
@author Doug Lea

## ThreadLocalRandom.current()

```java
public static ThreadLocalRandom current()
```

Returns the current thread's {@code ThreadLocalRandom} object.
Methods of this object should be called only by the current thread,
not by other threads.

@return the current thread's {@code ThreadLocalRandom}

## ThreadLocalRandom.setSeed(long)

```java
public void setSeed(long seed)
```

Throws {@code UnsupportedOperationException}.  Setting seeds in
this generator is not supported.

@throws UnsupportedOperationException always

## ThreadLocalRandom.next(int)

```java
protected int next(int bits)
```

Generates a pseudorandom number with the indicated number of
low-order bits.  Because this class has no subclasses, this
method cannot be invoked or overridden.

@param  bits random bits
@return the next pseudorandom value from this random number
        generator's sequence

## ThreadLocalRandom.nextBoolean()

```java
public boolean nextBoolean()
```

{@inheritDoc}

## ThreadLocalRandom.nextInt()

```java
public int nextInt()
```

{@inheritDoc}

## ThreadLocalRandom.nextInt(int)

```java
public int nextInt(int bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ThreadLocalRandom.nextInt(int, int)

```java
public int nextInt(int origin, int bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ThreadLocalRandom.nextLong()

```java
public long nextLong()
```

{@inheritDoc}

## ThreadLocalRandom.nextLong(long)

```java
public long nextLong(long bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ThreadLocalRandom.nextLong(long, long)

```java
public long nextLong(long origin, long bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}

## ThreadLocalRandom.nextFloat()

```java
public float nextFloat()
```

{@inheritDoc}

## ThreadLocalRandom.nextFloat(float)

```java
public float nextFloat(float bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@implNote {@inheritDoc}

@since 17

## ThreadLocalRandom.nextFloat(float, float)

```java
public float nextFloat(float origin, float bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@implNote {@inheritDoc}

@since 17

## ThreadLocalRandom.nextDouble()

```java
public double nextDouble()
```

{@inheritDoc}

## ThreadLocalRandom.nextDouble(double)

```java
public double nextDouble(double bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@implNote {@inheritDoc}

## ThreadLocalRandom.nextDouble(double, double)

```java
public double nextDouble(double origin, double bound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@implNote {@inheritDoc}

## ThreadLocalRandom.ints(long)

```java
public IntStream ints(long streamSize)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.ints()

```java
public IntStream ints()
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code ints(Long.MAX_VALUE)}.
@since 1.8

## ThreadLocalRandom.ints(long, int, int)

```java
public IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.ints(int, int)

```java
public IntStream ints(int randomNumberOrigin, int randomNumberBound)
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code ints(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)}.
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.longs(long)

```java
public LongStream longs(long streamSize)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.longs()

```java
public LongStream longs()
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code longs(Long.MAX_VALUE)}.
@since 1.8

## ThreadLocalRandom.longs(long, long, long)

```java
public LongStream longs(long streamSize, long randomNumberOrigin, long randomNumberBound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.longs(long, long)

```java
public LongStream longs(long randomNumberOrigin, long randomNumberBound)
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code longs(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)}.
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.doubles(long)

```java
public DoubleStream doubles(long streamSize)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.doubles()

```java
public DoubleStream doubles()
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code doubles(Long.MAX_VALUE)}.
@since 1.8

## ThreadLocalRandom.doubles(long, double, double)

```java
public DoubleStream doubles(long streamSize, double randomNumberOrigin, double randomNumberBound)
```

{@inheritDoc}
@throws IllegalArgumentException {@inheritDoc}
@since 1.8

## ThreadLocalRandom.doubles(double, double)

```java
public DoubleStream doubles(double randomNumberOrigin, double randomNumberBound)
```

{@inheritDoc}
@implNote This method is implemented to be equivalent to
          {@code doubles(Long.MAX_VALUE, randomNumberOrigin, randomNumberBound)}.
@throws IllegalArgumentException {@inheritDoc}
@since 1.8