# LongAccumulator class (java.util.concurrent.atomic)

```java
public class LongAccumulator extends Striped64 implements Serializable
```

One or more variables that together maintain a running {@code long}
value updated using a supplied function.  When updates (method
{@link #accumulate}) are contended across threads, the set of variables
may grow dynamically to reduce contention.  Method {@link #get}
(or, equivalently, {@link #longValue}) returns the current value
across the variables maintaining updates.

<p>This class is usually preferable to {@link AtomicLong} when
multiple threads update a common value that is used for purposes such
as collecting statistics, not for fine-grained synchronization
control.  Under low update contention, the two classes have similar
characteristics. But under high contention, expected throughput of
this class is significantly higher, at the expense of higher space
consumption.

<p>The order of accumulation within or across threads is not
guaranteed and cannot be depended upon, so this class is only
applicable to functions for which the order of accumulation does
not matter. The supplied accumulator function should be
side-effect-free, since it may be re-applied when attempted updates
fail due to contention among threads. For predictable results, the
accumulator function should be associative and commutative. The
function is applied with an existing value (or identity) as one
argument, and a given update as the other argument.  For example,
to maintain a running maximum value, you could supply {@code
Long::max} along with {@code Long.MIN_VALUE} as the identity.

<p>Class {@link LongAdder} provides analogs of the functionality of
this class for the common special case of maintaining counts and
sums.  The call {@code new LongAdder()} is equivalent to {@code new
LongAccumulator((x, y) -> x + y, 0L)}.

<p>This class extends {@link Number}, but does <em>not</em> define
methods such as {@code equals}, {@code hashCode} and {@code
compareTo} because instances are expected to be mutated, and so are
not useful as collection keys.

@since 1.8
@author Doug Lea

## LongAccumulator.LongAccumulator(LongBinaryOperator, long)

```java
public LongAccumulator(LongBinaryOperator accumulatorFunction, long identity)
```

Creates a new instance using the given accumulator function
and identity element.
@param accumulatorFunction a side-effect-free function of two arguments
@param identity identity (initial value) for the accumulator function

## LongAccumulator.accumulate(long)

```java
public void accumulate(long x)
```

Updates with the given value.

@param x the value

## LongAccumulator.get()

```java
public long get()
```

Returns the current value.  The returned value is <em>NOT</em>
an atomic snapshot; invocation in the absence of concurrent
updates returns an accurate result, but concurrent updates that
occur while the value is being calculated might not be
incorporated.

@return the current value

## LongAccumulator.reset()

```java
public void reset()
```

Resets variables maintaining updates to the identity value.
This method may be a useful alternative to creating a new
updater, but is only effective if there are no concurrent
updates.  Because this method is intrinsically racy, it should
only be used when it is known that no threads are concurrently
updating.

## LongAccumulator.getThenReset()

```java
public long getThenReset()
```

Equivalent in effect to {@link #get} followed by {@link
#reset}. This method may apply for example during quiescent
points between multithreaded computations.  If there are
updates concurrent with this method, the returned value is
<em>not</em> guaranteed to be the final value occurring before
the reset.

@return the value before reset

## LongAccumulator.toString()

```java
public String toString()
```

{@return the String representation of the current value}

## LongAccumulator.longValue()

```java
public long longValue()
```

Equivalent to {@link #get}.

@return the current value

## LongAccumulator.intValue()

```java
public int intValue()
```

Returns the {@linkplain #get current value} as an {@code int}
after a narrowing primitive conversion.

## LongAccumulator.floatValue()

```java
public float floatValue()
```

Returns the {@linkplain #get current value} as a {@code float}
after a widening primitive conversion.

## LongAccumulator.doubleValue()

```java
public double doubleValue()
```

Returns the {@linkplain #get current value} as a {@code double}
after a widening primitive conversion.