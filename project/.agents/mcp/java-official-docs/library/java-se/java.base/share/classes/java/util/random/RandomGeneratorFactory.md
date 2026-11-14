# RandomGeneratorFactory class (java.util.random)

```java
public final class RandomGeneratorFactory<T extends RandomGenerator>
```

This is a factory class for generating multiple random number generators
of a specific <a href="package-summary.html#algorithms">algorithm</a>.
{@link RandomGeneratorFactory} also provides
methods for selecting random number generator algorithms.

A specific {@link RandomGeneratorFactory} can be located by using the
{@link RandomGeneratorFactory#of(String)} method, where the argument string
is the name of the <a href="package-summary.html#algorithms">algorithm</a>
required. The method
{@link RandomGeneratorFactory#all()} produces a non-empty {@link Stream} of all available
{@link RandomGeneratorFactory RandomGeneratorFactorys} that can be searched
to locate a {@link RandomGeneratorFactory} suitable to the task.

There are three methods for constructing a RandomGenerator instance,
depending on the type of initial seed required.
{@link RandomGeneratorFactory#create(long)} is used for long
seed construction,
{@link RandomGeneratorFactory#create(byte[])} is used for byte[]
seed construction, and
{@link RandomGeneratorFactory#create()} is used for random seed
construction. Example;

{@snippet :
   RandomGeneratorFactory<RandomGenerator> factory = RandomGeneratorFactory.of("Random");

    for (int i = 0; i < 10; i++) {
        new Thread(() -> {
            RandomGenerator random = factory.create(100L);
            System.out.println(random.nextDouble());
        }).start();
    }
}

RandomGeneratorFactory also provides methods describing the attributes (or properties)
of a generator and can be used to select random number generator
<a href="package-summary.html#algorithms">algorithms</a>.
These methods are typically used in
conjunction with {@link RandomGeneratorFactory#all()}. In this example, the code
locates the {@link RandomGeneratorFactory} that produces
{@link RandomGenerator RandomGenerators}
with the highest number of state bits.

{@snippet :
    RandomGeneratorFactory<RandomGenerator> best = RandomGeneratorFactory.all()
        .filter(rgf -> !rgf.name().equals("SecureRandom")) // SecureRandom has MAX_VALUE stateBits.
        .sorted(Comparator.comparingInt(RandomGeneratorFactory<RandomGenerator>::stateBits).reversed())
        .findFirst()
        .orElse(RandomGeneratorFactory.of("Random"));
    System.out.println(best.name() + " in " + best.group() + " was selected");

    RandomGenerator rng = best.create();
    System.out.println(rng.nextLong());
}

@param <T> type of created random generator

@since 17

@see java.util.random

## RandomGeneratorFactory.of(String)

```java
public static <T extends RandomGenerator> RandomGeneratorFactory<T> of(String name)
```

Returns a {@link RandomGeneratorFactory} that can produce instances of
{@link RandomGenerator} that utilize the {@code name}
<a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
<a href="package-summary.html#algorithms">algorithm</a>
@param <T> Sub-interface of {@link RandomGenerator} to produce

@return {@link RandomGeneratorFactory} of {@link RandomGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGeneratorFactory.getDefault()

```java
public static RandomGeneratorFactory<RandomGenerator> getDefault()
```

Returns a {@link RandomGeneratorFactory} meeting the minimal requirement
of having an algorithm whose state bits are greater than or equal 64.

@implSpec  Since algorithms will improve over time, there is no
guarantee that this method will return the same algorithm over time.

@return a {@link RandomGeneratorFactory}

## RandomGeneratorFactory.all()

```java
public static Stream<RandomGeneratorFactory<RandomGenerator>> all()
```

Returns a non-empty stream of available {@link RandomGeneratorFactory RandomGeneratorFactory(s)}.

RandomGenerators that are marked as deprecated are not included in the result.

@return a non-empty stream of all available {@link RandomGeneratorFactory RandomGeneratorFactory(s)}.

## RandomGeneratorFactory.name()

```java
public String name()
```

Return the name of the <a href="package-summary.html#algorithms">algorithm</a>
used by the random number generator.

@return Name of the <a href="package-summary.html#algorithms">algorithm</a>.

## RandomGeneratorFactory.group()

```java
public String group()
```

Return the group name of the <a href="package-summary.html#algorithms">algorithm</a>
used by the random number generator.

@return Group name of the <a href="package-summary.html#algorithms">algorithm</a>.

## RandomGeneratorFactory.stateBits()

```java
public int stateBits()
```

Returns number of bits used by the <a href="package-summary.html#algorithms">algorithm</a>
to maintain state of seed.

@return number of bits used by the <a href="package-summary.html#algorithms">algorithm</a>
        to maintain state of seed.

## RandomGeneratorFactory.equidistribution()

```java
public int equidistribution()
```

Returns the equidistribution of the <a href="package-summary.html#algorithms">algorithm</a>.

@return the equidistribution of the <a href="package-summary.html#algorithms">algorithm</a>.

## RandomGeneratorFactory.period()

```java
public BigInteger period()
```

Return the period of the <a href="package-summary.html#algorithms">algorithm</a>
used by the random number generator.
Returns BigInteger.ZERO if period is not determinable.

@return BigInteger period.

## RandomGeneratorFactory.isStatistical()

```java
public boolean isStatistical()
```

Return true if random generator is computed using an arithmetic
<a href="package-summary.html#algorithms">algorithm</a>
and is statistically deterministic.

@return true if random generator is statistical.

## RandomGeneratorFactory.isStochastic()

```java
public boolean isStochastic()
```

Return true if random generator is computed using external or entropic
sources as inputs.

@return true if random generator is stochastic.

## RandomGeneratorFactory.isHardware()

```java
public boolean isHardware()
```

Return true if random generator uses a hardware device (HRNG) to produce
entropic input.

@return true if random generator is generated by hardware.

## RandomGeneratorFactory.isArbitrarilyJumpable()

```java
public boolean isArbitrarilyJumpable()
```

Return true if random generator can jump an arbitrarily specified distant
point in the state cycle.

@return true if random generator is arbitrarily jumpable.

## RandomGeneratorFactory.isJumpable()

```java
public boolean isJumpable()
```

Return true if random generator can jump a specified distant point in
the state cycle.

@return true if random generator is jumpable.

## RandomGeneratorFactory.isLeapable()

```java
public boolean isLeapable()
```

Return true if random generator is jumpable and can leap to a very distant
point in the state cycle.

@return true if random generator is leapable.

## RandomGeneratorFactory.isSplittable()

```java
public boolean isSplittable()
```

Return true if random generator can be cloned into a separate object with
the same properties but positioned further in the state cycle.

@return true if random generator is splittable.

## RandomGeneratorFactory.isStreamable()

```java
public boolean isStreamable()
```

Return true if random generator can be used to create
{@link java.util.stream.Stream Streams} of random numbers.

@return true if random generator is streamable.

## RandomGeneratorFactory.isDeprecated()

```java
public boolean isDeprecated()
```

Return true if the implementation of RandomGenerator (algorithm) has been
marked for deprecation.

@implNote Random number generator algorithms evolve over time; new
          algorithms will be introduced and old algorithms will
          lose standing. If an older algorithm is deemed unsuitable
          for continued use, it will be marked as deprecated to indicate
          that it may be removed at some point in the future.

@return true if the implementation of RandomGenerator (algorithm) has been
        marked for deprecation

## RandomGeneratorFactory.create()

```java
public T create()
```

Create an instance of {@link RandomGenerator} based on the
<a href="package-summary.html#algorithms">algorithm</a> chosen.

@return new instance of {@link RandomGenerator}.

## RandomGeneratorFactory.create(long)

```java
public T create(long seed)
```

Create an instance of {@link RandomGenerator} based on the
<a href="package-summary.html#algorithms">algorithm</a> chosen,
and the provided {@code seed}.
If the {@link RandomGenerator} doesn't support instantiation through
a {@code seed} of type {@code long} then this method throws
an {@link UnsupportedOperationException}.

@param seed long random seed value.

@return new instance of {@link RandomGenerator}.

@throws UnsupportedOperationException
     if a {@code seed} of type {@code long} in not supported.

## RandomGeneratorFactory.create(byte[])

```java
public T create(byte[] seed)
```

Create an instance of {@link RandomGenerator} based on the
<a href="package-summary.html#algorithms">algorithm</a> chosen,
and the provided {@code seed}.
If the {@link RandomGenerator} doesn't support instantiation through
a {@code seed} of type {@code byte[]} then this method throws
an {@link UnsupportedOperationException}.

@param seed byte array random seed value.

@return new instance of {@link RandomGenerator}.

@throws UnsupportedOperationException
     if a {@code seed} of type {@code byte[]} in not supported.

@throws NullPointerException if seed is null.