# RandomGenerator interface (java.util.random)

```java
public interface RandomGenerator
```

The {@link RandomGenerator} interface is designed to provide a common
protocol for objects that generate random or (more typically) pseudorandom
sequences of numbers (or Boolean values). Such a sequence may be obtained by
either repeatedly invoking a method that returns a single pseudorandomly
chosen value, or by invoking a method that returns a stream of
pseudorandomly chosen values.

<p> Ideally, given an implicitly or explicitly specified range of values,
each value would be chosen independently and uniformly from that range. In
practice, one may have to settle for some approximation to independence and
uniformity.

<p> In the case of {@code int}, {@code long}, and {@code boolean} values, if
there is no explicit specification of range, then the range includes all
possible values of the type. In the case of {@code float} and {@code double}
values, first a value is always chosen uniformly from the set of
2<sup><i>w</i></sup> values between 0.0 (inclusive) and 1.0 (exclusive),
where <i>w</i> is {@link Float#PRECISION} for {@code float} values
and {@link Double#PRECISION} for {@code double}
values, such that adjacent values differ by 2<sup>&minus;<i>w</i></sup>
(notice that this set is a <i>subset</i> of the set of
<i>all representable floating-point values</i> between 0.0 (inclusive) and 1.0 (exclusive));
then if an explicit range was specified, then the chosen number is
computationally scaled and translated so as to appear to have been chosen
approximately uniformly from that explicit range.

<p> Each method that returns a stream produces a stream of values each of
which is chosen in the same manner as for a method that returns a single
pseudorandomly chosen value. For example, if {@code r} implements
{@link RandomGenerator}, then the method call {@code r.ints(100)} returns a
stream of 100 {@code int} values. These are not necessarily the exact same
values that would have been returned if instead {@code r.nextInt()} had been
called 100 times; all that is guaranteed is that each value in the stream is
chosen in a similar pseudorandom manner from the same range.

<p> Every object that implements the {@link RandomGenerator} interface by
using a pseudorandom algorithm is assumed to contain a finite amount of
state. Using such an object to generate a pseudorandomly chosen value alters
its state by computing a new state as a function of the current state,
without reference to any information other than the current state. The number
of distinct possible states of such an object is called its <i>period</i>.
(Some implementations of the {@link RandomGenerator} interface may be truly
random rather than pseudorandom, for example relying on the statistical
behavior of a physical object to derive chosen values. Such implementations
do not have a fixed period.)

<p> As a rule, objects that implement the {@link RandomGenerator} interface
need not be thread-safe. It is recommended that multithreaded applications
use either {@link ThreadLocalRandom} or (preferably) pseudorandom number
generators that implement the {@link SplittableGenerator} or
{@link JumpableGenerator} interface.

<p> Objects that implement {@link RandomGenerator} are typically not
cryptographically secure. Consider instead using {@link SecureRandom} to get
a cryptographically secure pseudorandom number generator for use by
security-sensitive applications. Note, however, that {@link SecureRandom}
does implement the {@link RandomGenerator} interface, so that instances of
{@link SecureRandom} may be used interchangeably with other types of
pseudorandom generators in applications that do not require a secure
generator.

<p>Unless explicit stated otherwise, the use of null for any method argument
will cause a NullPointerException.

@since 17

## RandomGenerator.of(String)

```java
static RandomGenerator of(String name)
```

Returns an instance of {@link RandomGenerator} that utilizes the
{@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link RandomGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.getDefault()

```java
static RandomGenerator getDefault()
```

Returns a {@link RandomGenerator} meeting the minimal requirement
of having an <a href="package-summary.html#algorithms">algorithm</a>
whose state bits are greater than or equal 64.

@implSpec  Since algorithms will improve over time, there is no
guarantee that this method will return the same algorithm over time.
<p> The default implementation selects L32X64MixRandom.

@return a {@link RandomGenerator}

## RandomGenerator.isDeprecated()

```java
default boolean isDeprecated()
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

@implSpec The default implementation checks for the @Deprecated annotation.

## RandomGenerator.doubles()

```java
default DoubleStream doubles()
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code double} values.

@return a stream of pseudorandomly chosen {@code double} values

@implNote It is permitted to implement this method in a manner equivalent to
{@link RandomGenerator#doubles(long) doubles}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextDouble nextDouble}().

## RandomGenerator.doubles(double, double)

```java
default DoubleStream doubles(double randomNumberOrigin, double randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code double} values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code double} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code randomNumberOrigin} is not finite,
        or {@code randomNumberBound} is not finite, or {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implNote It is permitted to implement this method in a manner equivalent to
{@link RandomGenerator#doubles(long, double, double) doubles}
({@link Long#MAX_VALUE Long.MAX_VALUE}, randomNumberOrigin, randomNumberBound).

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextDouble(double, double) nextDouble}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.doubles(long)

```java
default DoubleStream doubles(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code double} values.

@param streamSize the number of values to generate

@return a stream of pseudorandomly chosen {@code double} values

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextDouble nextDouble()}.

## RandomGenerator.doubles(long, double, double)

```java
default DoubleStream doubles(long streamSize, double randomNumberOrigin, double randomNumberBound)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code double} values, where each value is
between the specified origin (inclusive) and the specified bound
(exclusive).

@param streamSize the number of values to generate
@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code double} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code streamSize} is less than zero,
        or {@code randomNumberOrigin} is not finite,
        or {@code randomNumberBound} is not finite, or {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextDouble(double, double)  nextDouble}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.equiDoubles(double, double, boolean, boolean)

```java
default DoubleStream equiDoubles(double left, double right, boolean isLeftIncluded, boolean isRightIncluded)
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code double} values, where each value is between the specified
{@code left} boundary and the specified {@code right} boundary.
The {@code left} boundary is included as indicated by
{@code isLeftIncluded}; similarly, the {@code right} boundary is included
as indicated by {@code isRightIncluded}.

<p>The stream potentially produces all multiples <i>k</i> &delta;
(<i>k</i> integer) lying in the interval specified by the parameters,
where &delta; > 0 is the smallest number for which all these multiples
are exact {@code double}s.
They are therefore all equidistant.
The uniformity of the distribution of the {@code double}s produced by
the stream depends on the quality of the underlying {@link #nextLong(long)}.

@implSpec The default implementation first determines the &delta; above.
It then computes both the smallest integer <i>k</i><sub><i>l</i></sub>
such that <i>k</i><sub><i>l</i></sub> &delta; lies <em>inside</em>
the given interval, and the smallest integer <i>n</i> > 0 such that
(<i>k</i><sub><i>l</i></sub> + <i>n</i>) &delta; lies
<em>outside</em> the interval.
Finally, it returns a stream which generates the {@code double}s
according to (<i>k</i><sub><i>l</i></sub> + {@code nextLong(}<i>n</i>{@code )})
&delta;.
The stream never produces {@code -0.0}, although it may produce
{@code 0.0} if the specified interval contains 0.

@param left the left boundary
@param right the right boundary
@param isLeftIncluded whether the {@code left} boundary is included
@param isRightIncluded whether the {@code right} boundary is included

@return a stream of pseudorandomly chosen {@code double} values, each
        between {@code left} and {@code right}, as specified above.

@throws IllegalArgumentException if {@code left} is not finite,
        or {@code right} is not finite, or if the specified interval
        is empty.

@since 22

## RandomGenerator.ints()

```java
default IntStream ints()
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code int} values.

@return a stream of pseudorandomly chosen {@code int} values

@implNote It is permitted to implement this method in a manner
equivalent to {@link RandomGenerator#ints(long) ints}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextInt() nextInt}().

## RandomGenerator.ints(int, int)

```java
default IntStream ints(int randomNumberOrigin, int randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code int} values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code int} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implNote It is permitted to implement this method in a manner equivalent to
{@link RandomGenerator#ints(long, int, int) ints}
({@link Long#MAX_VALUE Long.MAX_VALUE}, randomNumberOrigin, randomNumberBound).

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextInt(int, int) nextInt}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.ints(long)

```java
default IntStream ints(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code int} values.

@param streamSize the number of values to generate

@return a stream of pseudorandomly chosen {@code int} values

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextInt() nextInt}().

## RandomGenerator.ints(long, int, int)

```java
default IntStream ints(long streamSize, int randomNumberOrigin, int randomNumberBound)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code int} values, where each value is between
the specified origin (inclusive) and the specified bound (exclusive).

@param streamSize the number of values to generate
@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code int} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code streamSize} is
        less than zero, or {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextInt(int, int) nextInt}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.longs()

```java
default LongStream longs()
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code long} values.

@return a stream of pseudorandomly chosen {@code long} values

@implNote It is permitted to implement this method in a manner
equivalent to {@link RandomGenerator#longs(long) longs}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextLong() nextLong}().

## RandomGenerator.longs(long, long)

```java
default LongStream longs(long randomNumberOrigin, long randomNumberBound)
```

Returns an effectively unlimited stream of pseudorandomly chosen
{@code long} values, where each value is between the specified origin
(inclusive) and the specified bound (exclusive).

@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code long} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implNote It is permitted to implement this method in a manner equivalent to
{@link RandomGenerator#longs(long, long, long) longs}
({@link Long#MAX_VALUE Long.MAX_VALUE}, randomNumberOrigin, randomNumberBound).

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextLong(long, long) nextLong}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.longs(long)

```java
default LongStream longs(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code long} values.

@param streamSize the number of values to generate

@return a stream of pseudorandomly chosen {@code long} values

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

@implSpec The default implementation produces a sequential stream
that repeatedly calls {@link RandomGenerator#nextLong() nextLong}().

## RandomGenerator.longs(long, long, long)

```java
default LongStream longs(long streamSize, long randomNumberOrigin, long randomNumberBound)
```

Returns a stream producing the given {@code streamSize} number of
pseudorandomly chosen {@code long} values, where each value is between
the specified origin (inclusive) and the specified bound (exclusive).

@param streamSize the number of values to generate
@param randomNumberOrigin the least value that can be produced
@param randomNumberBound the upper bound (exclusive) for each value produced

@return a stream of pseudorandomly chosen {@code long} values, each between
        the specified origin (inclusive) and the specified bound (exclusive)

@throws IllegalArgumentException if {@code streamSize} is
        less than zero, or {@code randomNumberOrigin}
        is greater than or equal to {@code randomNumberBound}

@implSpec The default implementation produces a sequential stream that repeatedly
calls {@link RandomGenerator#nextLong(long, long) nextLong}(randomNumberOrigin, randomNumberBound).

## RandomGenerator.nextBoolean()

```java
default boolean nextBoolean()
```

Returns a pseudorandomly chosen {@code boolean} value.

<p> The default implementation tests the high-order bit (sign bit) of a
value produced by {@link RandomGenerator#nextInt() nextInt}(), on the
grounds that some algorithms for pseudorandom number generation produce
values whose high-order bits have better statistical quality than the
low-order bits.

@return a pseudorandomly chosen {@code boolean} value

@implSpec The default implementation produces a result based on the
sign bit of a number generated by {@link nextInt()}.

## RandomGenerator.nextBytes(byte[])

```java
default void nextBytes(byte[] bytes)
```

Fills a user-supplied byte array with generated byte values
pseudorandomly chosen uniformly from the range of values between -128
(inclusive) and 127 (inclusive).

@implNote Algorithm used to fill the byte array;
          <pre>{@code
          void nextBytes(byte[] bytes) {
              int i = 0;
              int len = bytes.length;
              for (int words = len >> 3; words--> 0; ) {
                  long rnd = nextLong();
                  for (int n = 8; n--> 0; rnd >>>= Byte.SIZE)
                      bytes[i++] = (byte)rnd;
              }
              if (i < len)
                  for (long rnd = nextLong(); i < len; rnd >>>= Byte.SIZE)
                      bytes[i++] = (byte)rnd;
          }}</pre>

@param  bytes the byte array to fill with pseudorandom bytes
@throws NullPointerException if bytes is null

@implSpec The default implementation produces results from repeated calls
to {@link nextLong()}.

## RandomGenerator.nextFloat()

```java
default float nextFloat()
```

Returns a pseudorandom {@code float} value between zero (inclusive) and
one (exclusive).

@return a pseudorandom {@code float} value between zero (inclusive) and one (exclusive)

@implSpec The default implementation uses the {@link Float#PRECISION}
high-order bits from a call to {@link RandomGenerator#nextInt() nextInt()}.

## RandomGenerator.nextFloat(float)

```java
default float nextFloat(float bound)
```

Returns a pseudorandomly chosen {@code float} value between zero
(inclusive) and the specified bound (exclusive).

@param bound the upper bound (exclusive) for the returned value.
       Must be positive and finite

@return a pseudorandomly chosen {@code float} value between
        zero (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code bound} is not
        both positive and finite

@implSpec The default implementation checks that {@code bound} is a
positive finite float. Then invokes {@code nextFloat()}, scaling
the result so that the final result lies between {@code 0.0f} (inclusive)
and {@code bound} (exclusive).

## RandomGenerator.nextFloat(float, float)

```java
default float nextFloat(float origin, float bound)
```

Returns a pseudorandomly chosen {@code float} value between the
specified origin (inclusive) and the specified bound (exclusive).

@param origin the least value that can be returned
@param bound the upper bound (exclusive)

@return a pseudorandomly chosen {@code float} value between the
        origin (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code origin} is not finite,
        or {@code bound} is not finite, or {@code origin}
        is greater than or equal to {@code bound}

@implSpec The default implementation verifies that the {@code origin}
          and {@code bound} are valid then invokes {@code nextFloat()}
          scaling and translating the result to fit between {@code origin}
          and {@code bound} (exclusive).

## RandomGenerator.nextDouble()

```java
default double nextDouble()
```

Returns a pseudorandom {@code double} value between zero (inclusive) and
one (exclusive).

@return a pseudorandom {@code double} value between zero (inclusive)
        and one (exclusive)

@implSpec The default implementation uses the {@link Double#PRECISION}
high-order bits from a call to {@link RandomGenerator#nextLong() nextLong()}.

## RandomGenerator.nextDouble(double)

```java
default double nextDouble(double bound)
```

Returns a pseudorandomly chosen {@code double} value between zero
(inclusive) and the specified bound (exclusive).

@param bound the upper bound (exclusive) for the returned value.
       Must be positive and finite

@return a pseudorandomly chosen {@code double} value between
        zero (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code bound} is not
        both positive and finite

@implSpec The default implementation checks that {@code bound} is a
positive finite double. Then invokes {@code nextDouble()}, scaling
the result so that the final result lies between {@code 0.0} (inclusive)
and {@code bound} (exclusive).

## RandomGenerator.nextDouble(double, double)

```java
default double nextDouble(double origin, double bound)
```

Returns a pseudorandomly chosen {@code double} value between the
specified origin (inclusive) and the specified bound (exclusive).

@param origin the least value that can be returned
@param bound the upper bound (exclusive) for the returned value

@return a pseudorandomly chosen {@code double} value between the
        origin (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code origin} is not finite,
        or {@code bound} is not finite, or {@code origin}
        is greater than or equal to {@code bound}

@implSpec The default implementation verifies that the {@code origin}
          and {@code bound} are valid, then invokes {@code nextDouble()}
          scaling and translating the result to fit between {@code origin}
          and {@code bound}( exclusive).

## RandomGenerator.nextInt()

```java
default int nextInt()
```

Returns a pseudorandomly chosen {@code int} value.

@return a pseudorandomly chosen {@code int} value

@implSpec The default implementation uses the 32 high-order bits from a call to
{@link RandomGenerator#nextLong nextLong}().

## RandomGenerator.nextInt(int)

```java
default int nextInt(int bound)
```

Returns a pseudorandomly chosen {@code int} value between zero
(inclusive) and the specified bound (exclusive).

@param bound the upper bound (exclusive) for the returned value.
Must be positive.

@return a pseudorandomly chosen {@code int} value between
        zero (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code bound} is not positive

@implSpec The default implementation checks that {@code bound} is positive.
It then invokes {@link #nextInt()} one or more times to ensure a uniform
distribution in the range 0 (inclusive)
to {@code bound} (exclusive).
It assumes the distribution of {@link #nextInt()} to be uniform.

## RandomGenerator.nextInt(int, int)

```java
default int nextInt(int origin, int bound)
```

Returns a pseudorandomly chosen {@code int} value between the specified
origin (inclusive) and the specified bound (exclusive).

@param origin the least value that can be returned
@param bound the upper bound (exclusive) for the returned value

@return a pseudorandomly chosen {@code int} value between the
        origin (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code origin} is greater than
        or equal to {@code bound}

@implSpec The default implementation checks that {@code origin}
is less than {@code bound}.
It then invokes {@link #nextInt()} one or more times to ensure a uniform
distribution in the range {@code origin} (inclusive)
to {@code bound} (exclusive).
It assumes the distribution of {@link #nextInt()} to be uniform.

## RandomGenerator.nextLong()

```java
long nextLong()
```

Returns a pseudorandomly chosen {@code long} value.

@return a pseudorandomly chosen {@code long} value

## RandomGenerator.nextLong(long)

```java
default long nextLong(long bound)
```

Returns a pseudorandomly chosen {@code long} value between zero
(inclusive) and the specified bound (exclusive).

@param bound the upper bound (exclusive) for the returned value.
Must be positive.

@return a pseudorandomly chosen {@code long} value between
        zero (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code bound} is not positive

@implSpec The default implementation checks that {@code bound} is positive.
It then invokes {@link #nextLong()} one or more times to ensure a uniform
distribution in the range 0 (inclusive)
to {@code bound} (exclusive).
It assumes the distribution of {@link #nextLong()} to be uniform.

## RandomGenerator.nextLong(long, long)

```java
default long nextLong(long origin, long bound)
```

Returns a pseudorandomly chosen {@code long} value between the
specified origin (inclusive) and the specified bound (exclusive).

@param origin the least value that can be returned
@param bound the upper bound (exclusive) for the returned value

@return a pseudorandomly chosen {@code long} value between the
        origin (inclusive) and the bound (exclusive)

@throws IllegalArgumentException if {@code origin} is greater than
        or equal to {@code bound}

@implSpec The default implementation checks that {@code origin}
is less than {@code bound}.
It then invokes {@link #nextLong()} one or more times to ensure a uniform
distribution in the range {@code origin} (inclusive)
to {@code bound} (exclusive).
It assumes the distribution of {@link #nextLong()} to be uniform.

## RandomGenerator.nextGaussian()

```java
default double nextGaussian()
```

Returns a {@code double} value pseudorandomly chosen from a Gaussian
(normal) distribution whose mean is 0 and whose standard deviation is 1.

@return a {@code double} value pseudorandomly chosen from a
        Gaussian distribution

@implSpec The default implementation uses McFarland's fast modified
ziggurat algorithm (largely table-driven, with rare cases handled by
computation and rejection sampling). Walker's alias method for sampling
a discrete distribution also plays a role.

## RandomGenerator.nextGaussian(double, double)

```java
default double nextGaussian(double mean, double stddev)
```

Returns a {@code double} value pseudorandomly chosen from a Gaussian
(normal) distribution with a mean and standard deviation specified by the
arguments.

@param mean the mean of the Gaussian distribution to be drawn from
@param stddev the standard deviation (square root of the variance)
       of the Gaussian distribution to be drawn from

@return a {@code double} value pseudorandomly chosen from the
        specified Gaussian distribution

@throws IllegalArgumentException if {@code stddev} is negative

@implSpec The default implementation uses McFarland's fast modified
ziggurat algorithm (largely table-driven, with rare cases handled by
computation and rejection sampling). Walker's alias method for sampling
a discrete distribution also plays a role.

## RandomGenerator.nextExponential()

```java
default double nextExponential()
```

Returns a nonnegative {@code double} value pseudorandomly chosen from
an exponential distribution whose mean is 1.

@return a nonnegative {@code double} value pseudorandomly chosen from an
        exponential distribution

@implSpec The default implementation uses McFarland's fast modified
ziggurat algorithm (largely table-driven, with rare cases handled by
computation and rejection sampling). Walker's alias method for sampling
a discrete distribution also plays a role.

## RandomGenerator.of(String)

```java
static StreamableGenerator of(String name)
```

Returns an instance of {@link StreamableGenerator} that utilizes the
{@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link StreamableGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.rngs()

```java
Stream<RandomGenerator> rngs()
```

Returns an effectively unlimited stream of objects, each of which
implements the {@link RandomGenerator} interface. Ideally the
generators in the stream will appear to be statistically independent.
The new generators are of the same
<a href="package-summary.html#algorithms">algorithm</a> as this generator.

@return a stream of objects that implement the {@link RandomGenerator} interface

@implNote It is permitted to implement this method in a manner
          equivalent to {@link StreamableGenerator#rngs(long) rngs}
          ({@link Long#MAX_VALUE Long.MAX_VALUE}).

## RandomGenerator.rngs(long)

```java
default Stream<RandomGenerator> rngs(long streamSize)
```

Returns an effectively unlimited stream of objects, each of which
implements the {@link RandomGenerator} interface. Ideally the
generators in the stream will appear to be statistically independent.
The new generators are of the same
<a href="package-summary.html#algorithms">algorithm</a> as this generator.

@param streamSize the number of generators to generate

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

@implSpec The default implementation calls {@link StreamableGenerator#rngs() rngs}() and
then limits its length to {@code streamSize}.

## RandomGenerator.of(String)

```java
static SplittableGenerator of(String name)
```

Returns an instance of {@link SplittableGenerator} that utilizes the
{@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link SplittableGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.split()

```java
SplittableGenerator split()
```

Returns a new pseudorandom number generator, split off from this one,
that implements the {@link RandomGenerator} and
{@link SplittableGenerator} interfaces.

<p> This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state of the new one.

@return a new object that implements the {@link RandomGenerator} and
        {@link SplittableGenerator} interfaces

## RandomGenerator.split(SplittableGenerator)

```java
SplittableGenerator split(SplittableGenerator source)
```

Returns a new pseudorandom number generator, split off from this one,
that implements the {@link RandomGenerator} and
{@link SplittableGenerator} interfaces.

@param source a {@link SplittableGenerator} instance to be used instead
              of this one as a source of pseudorandom bits used to
              initialize the state of the new ones.

@return an object that implements the {@link RandomGenerator} and
        {@link SplittableGenerator} interfaces

@throws NullPointerException if source is null

## RandomGenerator.splits()

```java
default Stream<SplittableGenerator> splits()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link SplittableGenerator}
interface.

<p> This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state the new ones.

@implNote It is permitted to implement this method in a manner
equivalent to {@link SplittableGenerator#splits(long) splits}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

@return a stream of {@link SplittableGenerator} objects

@implSpec The default implementation invokes
{@link SplittableGenerator#splits(SplittableGenerator) splits(this)}.

## RandomGenerator.splits(long)

```java
Stream<SplittableGenerator> splits(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link SplittableGenerator} interface.

<p> This pseudorandom number generator may be used as a source of
pseudorandom bits used to initialize the state the new ones.

@param streamSize the number of values to generate

@return a stream of {@link SplittableGenerator} objects

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

## RandomGenerator.splits(SplittableGenerator)

```java
Stream<SplittableGenerator> splits(SplittableGenerator source)
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link SplittableGenerator}
interface.

@param source a {@link SplittableGenerator} instance to be used instead
              of this one as a source of pseudorandom bits used to
              initialize the state of the new ones.

@return a stream of {@link SplittableGenerator} objects

@implNote It is permitted to implement this method in a manner
          equivalent to {@link SplittableGenerator#splits(long, SplittableGenerator) splits}
          ({@link Long#MAX_VALUE Long.MAX_VALUE}, source).

@throws NullPointerException if source is null

## RandomGenerator.splits(long, SplittableGenerator)

```java
Stream<SplittableGenerator> splits(long streamSize, SplittableGenerator source)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link SplittableGenerator} interface.

@param streamSize the number of values to generate
@param source a {@link SplittableGenerator} instance to be used instead
              of this one as a source of pseudorandom bits used to
              initialize the state of the new ones.

@return a stream of {@link SplittableGenerator} objects

@throws IllegalArgumentException if {@code streamSize} is
        less than zero
@throws NullPointerException if source is null

## RandomGenerator.rngs()

```java
default Stream<RandomGenerator> rngs()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link RandomGenerator}
interface. Ideally the generators in the stream will appear to be
statistically independent.

@return a stream of objects that implement the {@link RandomGenerator} interface

@implSpec The default implementation calls {@link SplittableGenerator#splits() splits}().

## RandomGenerator.rngs(long)

```java
default Stream<RandomGenerator> rngs(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link RandomGenerator} interface. Ideally the generators in the
stream will appear to be statistically independent.

@param streamSize the number of generators to generate

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is
        less than zero

@implSpec The default implementation calls {@link SplittableGenerator#splits(long) splits}(streamSize).

## RandomGenerator.of(String)

```java
static JumpableGenerator of(String name)
```

Returns an instance of {@link JumpableGenerator} that utilizes the
{@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link JumpableGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.copy()

```java
JumpableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

@return a new object that is a copy of this generator

## RandomGenerator.jump()

```java
void jump()
```

Alter the state of this pseudorandom number generator so as to jump
forward a large, fixed distance (typically 2<sup>64</sup> or more)
within its state cycle.

## RandomGenerator.jumpDistance()

```java
double jumpDistance()
```

Returns the distance by which the
{@link JumpableGenerator#jump jump}() method will jump forward within
the state cycle of this generator object.

@return the default jump distance (as a {@code double} value)

## RandomGenerator.jumps()

```java
default Stream<RandomGenerator> jumps()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link RandomGenerator}
interface.

@return a stream of objects that implement the {@link RandomGenerator} interface

@implNote It is permitted to implement this method in a manner equivalent to
{@link JumpableGenerator#jumps(long) jumps}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

@implSpec The default implementation produces a sequential stream that  repeatedly
calls {@link JumpableGenerator#copy copy}() and {@link JumpableGenerator#jump jump}()
on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.jumps(long)

```java
default Stream<RandomGenerator> jumps(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link RandomGenerator} interface.

@param streamSize the number of generators to generate

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is less than zero

@implSpec The default implementation produces a sequential stream that  repeatedly
calls {@link JumpableGenerator#copy copy}() and {@link JumpableGenerator#jump jump}()
on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.rngs()

```java
default Stream<RandomGenerator> rngs()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link RandomGenerator}
interface. Ideally the generators in the stream will appear to be
statistically independent.

@return a stream of objects that implement the {@link RandomGenerator} interface

@implSpec The default implementation calls {@link JumpableGenerator#jumps jumps}().

## RandomGenerator.rngs(long)

```java
default Stream<RandomGenerator> rngs(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link RandomGenerator} interface. Ideally the generators in the
stream will appear to be statistically independent.

@param streamSize the number of generators to generate

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is less than zero

@implSpec The default implementation calls {@link JumpableGenerator#jumps(long) jumps}(streamSize).

## RandomGenerator.copyAndJump()

```java
default RandomGenerator copyAndJump()
```

Copy this generator, jump this generator forward, then return the
copy.

@return a copy of this generator object before the jump occurred

@implSpec The default implementation copies this, jumps and then
returns the copy.

## RandomGenerator.of(String)

```java
static LeapableGenerator of(String name)
```

Returns an instance of {@link LeapableGenerator} that utilizes the
{@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link LeapableGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.copy()

```java
LeapableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

@return a new object that is a copy of this generator

## RandomGenerator.leap()

```java
void leap()
```

Alter the state of this pseudorandom number generator so as to leap
forward a large, fixed distance (typically 2<sup>96</sup> or more)
within its state cycle.

## RandomGenerator.leapDistance()

```java
double leapDistance()
```

Returns the distance by which the
{@link LeapableGenerator#leap() leap}() method will leap forward within
the state cycle of this generator object.

@return the default leap distance (as a {@code double} value)

## RandomGenerator.leaps()

```java
default Stream<JumpableGenerator> leaps()
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the {@link JumpableGenerator}
interface.

@return a stream of objects that implement the {@link JumpableGenerator} interface

@implNote It is permitted to implement this method in a manner equivalent to
{@link LeapableGenerator#leaps(long) leaps}
({@link  Long#MAX_VALUE Long.MAX_VALUE}).

@implSpec The default implementation produces a sequential stream that  repeatedly
calls {@link LeapableGenerator#copy() copy}() and {@link LeapableGenerator#leap() leap}()
on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.leaps(long)

```java
default Stream<JumpableGenerator> leaps(long streamSize)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link JumpableGenerator} interface.

@param streamSize the number of generators to generate

@return a stream of objects that implement the {@link JumpableGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is less than zero

@implSpec The default implementation produces a sequential stream that  repeatedly
          calls {@link LeapableGenerator#copy() copy}() and {@link LeapableGenerator#leap() leap}()
          on this generator, and the copies become the generators produced by the stream.

## RandomGenerator.copyAndLeap()

```java
default JumpableGenerator copyAndLeap()
```

Copy this generator, leap this generator forward, then return the
copy.

@return a copy of this generator object before the leap occurred

@implSpec The default implementation copies this, leaps and then
returns the copy.

## RandomGenerator.of(String)

```java
static ArbitrarilyJumpableGenerator of(String name)
```

Returns an instance of {@link ArbitrarilyJumpableGenerator} that
utilizes the {@code name} <a href="package-summary.html#algorithms">algorithm</a>.

@param name  Name of random number generator
             <a href="package-summary.html#algorithms">algorithm</a>

@return An instance of {@link ArbitrarilyJumpableGenerator}

@throws NullPointerException if name is null
@throws IllegalArgumentException if the named algorithm is not found

## RandomGenerator.copy()

```java
ArbitrarilyJumpableGenerator copy()
```

Returns a new generator whose internal state is an exact copy of this
generator (therefore their future behavior should be identical if
subjected to the same series of operations).

@return a new object that is a copy of this generator

## RandomGenerator.jumpPowerOfTwo(int)

```java
void jumpPowerOfTwo(int logDistance)
```

Alter the state of this pseudorandom number generator so as to jump
forward a distance equal to 2<sup>{@code logDistance}</sup> within
its state cycle.

@param logDistance the base-2 logarithm of the distance to jump forward within the state
                   cycle

@throws IllegalArgumentException if {@code logDistance} is
                                 2<sup>{@code logDistance}</sup> is
                                 greater than the period of this generator

## RandomGenerator.jump(double)

```java
void jump(double distance)
```

Alter the state of this pseudorandom number generator so as to jump
forward a specified distance within its state cycle.

@param distance the distance to jump forward within the state cycle

@throws IllegalArgumentException if {@code distance} is not greater than
                                 or equal to 0.0, or is greater than the
                                 period of this generator

## RandomGenerator.jump()

```java
default void jump()
```

Alter the state of this pseudorandom number generator so as to jump
forward a large, fixed distance (typically 2<sup>64</sup> or more)
within its state cycle. The distance used is that returned by method
{@link ArbitrarilyJumpableGenerator#jumpDistance() jumpDistance}().

@implSpec The default implementation invokes jump(jumpDistance()).

## RandomGenerator.jumps(double)

```java
default Stream<ArbitrarilyJumpableGenerator> jumps(double distance)
```

Returns an effectively unlimited stream of new pseudorandom number
generators, each of which implements the
{@link ArbitrarilyJumpableGenerator} interface, produced by jumping
copies of this generator by different integer multiples of the
specified jump distance.

@param distance a distance to jump forward within the state cycle

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code distance} is not greater than
                                 or equal to 0.0, or is greater than the
                                 period of this generator

@implSpec The default implementation is equivalent to
{@link ArbitrarilyJumpableGenerator#jumps(long) jumps}
({@link Long#MAX_VALUE Long.MAX_VALUE}).

## RandomGenerator.jumps(long, double)

```java
default Stream<ArbitrarilyJumpableGenerator> jumps(long streamSize, double distance)
```

Returns a stream producing the given {@code streamSize} number of new
pseudorandom number generators, each of which implements the
{@link ArbitrarilyJumpableGenerator} interface, produced by jumping
copies of this generator by different integer multiples of the
specified jump distance.

@param streamSize the number of generators to generate
@param distance   a distance to jump forward within the state cycle

@return a stream of objects that implement the {@link RandomGenerator} interface

@throws IllegalArgumentException if {@code streamSize} is less than zero or if
                                 {@code distance} is not greater than
                                 or equal to 0.0, or is greater than the
                                 period of this generator

@implSpec The default implementation is equivalent to
jumps(distance).limit(streamSize).

## RandomGenerator.leap()

```java
default void leap()
```

Alter the state of this pseudorandom number generator so as to jump
forward a very large, fixed distance (typically 2<sup>128</sup> or
more) within its state cycle. The distance used is that returned by
method
{@link ArbitrarilyJumpableGenerator#leapDistance() leapDistance}().

## RandomGenerator.copyAndJump(double)

```java
default ArbitrarilyJumpableGenerator copyAndJump(double distance)
```

Copy this generator, jump this generator forward, then return the
copy.

@param distance a distance to jump forward within the state cycle

@return a copy of this generator object before the jump occurred

@throws IllegalArgumentException if {@code distance} is not greater than
                                 or equal to 0.0, or is greater than the
                                 period of this generator

@implSpec The default implementation copies this, jumps(distance) and then
returns the copy.