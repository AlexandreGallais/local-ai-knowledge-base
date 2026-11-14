# AtomicLong class (java.util.concurrent.atomic)

```java
public class AtomicLong extends Number implements java.io.Serializable
```

A {@code long} value that may be updated atomically.  See the
{@link VarHandle} specification for descriptions of the properties
of atomic accesses. An {@code AtomicLong} is used in applications
such as atomically incremented sequence numbers, and cannot be used
as a replacement for a {@link java.lang.Long}. However, this class
does extend {@code Number} to allow uniform access by tools and
utilities that deal with numerically-based classes.

@since 1.5
@author Doug Lea

## AtomicLong.AtomicLong(long)

```java
public AtomicLong(long initialValue)
```

Creates a new AtomicLong with the given initial value.

@param initialValue the initial value

## AtomicLong.AtomicLong()

```java
public AtomicLong()
```

Creates a new AtomicLong with initial value {@code 0}.

## AtomicLong.get()

```java
public final long get()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getVolatile}.

@return the current value

## AtomicLong.set(long)

```java
public final void set(long newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param newValue the new value

## AtomicLong.lazySet(long)

```java
public final void lazySet(long newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 1.6

## AtomicLong.getAndSet(long)

```java
public final long getAndSet(long newValue)
```

Atomically sets the value to {@code newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param newValue the new value
@return the previous value

## AtomicLong.compareAndSet(long, long)

```java
public final boolean compareAndSet(long expectedValue, long newValue)
```

Atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicLong.weakCompareAndSet(long, long)

```java
public final boolean weakCompareAndSet(long expectedValue, long newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@deprecated This method has plain memory effects but the method
name implies volatile memory effects (see methods such as
{@link #compareAndExchange} and {@link #compareAndSet}).  To avoid
confusion over plain or volatile memory effects it is recommended that
the method {@link #weakCompareAndSetPlain} be used instead.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@see #weakCompareAndSetPlain

## AtomicLong.weakCompareAndSetPlain(long, long)

```java
public final boolean weakCompareAndSetPlain(long expectedValue, long newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLong.getAndIncrement()

```java
public final long getAndIncrement()
```

Atomically increments the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(1)}.

@return the previous value

## AtomicLong.getAndDecrement()

```java
public final long getAndDecrement()
```

Atomically decrements the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(-1)}.

@return the previous value

## AtomicLong.getAndAdd(long)

```java
public final long getAndAdd(long delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param delta the value to add
@return the previous value

## AtomicLong.incrementAndGet()

```java
public final long incrementAndGet()
```

Atomically increments the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(1)}.

@return the updated value

## AtomicLong.decrementAndGet()

```java
public final long decrementAndGet()
```

Atomically decrements the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(-1)}.

@return the updated value

## AtomicLong.addAndGet(long)

```java
public final long addAndGet(long delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param delta the value to add
@return the updated value

## AtomicLong.getAndUpdate(LongUnaryOperator)

```java
public final long getAndUpdate(LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the previous value
@since 1.8

## AtomicLong.updateAndGet(LongUnaryOperator)

```java
public final long updateAndGet(LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the updated value
@since 1.8

## AtomicLong.getAndAccumulate(long, LongBinaryOperator)

```java
public final long getAndAccumulate(long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function to the current and given values,
returning the previous value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value as its first argument, and the
given update as the second argument.

@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the previous value
@since 1.8

## AtomicLong.accumulateAndGet(long, LongBinaryOperator)

```java
public final long accumulateAndGet(long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function to the current and given values,
returning the updated value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value as its first argument, and the
given update as the second argument.

@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the updated value
@since 1.8

## AtomicLong.toString()

```java
public String toString()
```

{@return the String representation of the current value}

## AtomicLong.intValue()

```java
public int intValue()
```

Returns the current value of this {@code AtomicLong} as an {@code int}
after a narrowing primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.3 Narrowing Primitive Conversion

## AtomicLong.longValue()

```java
public long longValue()
```

Returns the current value of this {@code AtomicLong} as a {@code long},
with memory effects as specified by {@link VarHandle#getVolatile}.
Equivalent to {@link #get()}.

## AtomicLong.floatValue()

```java
public float floatValue()
```

Returns the current value of this {@code AtomicLong} as a {@code float}
after a widening primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.2 Widening Primitive Conversion

## AtomicLong.doubleValue()

```java
public double doubleValue()
```

Returns the current value of this {@code AtomicLong} as a {@code double}
after a widening primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.2 Widening Primitive Conversion

## AtomicLong.getPlain()

```java
public final long getPlain()
```

Returns the current value, with memory semantics of reading as if the
variable was declared non-{@code volatile}.

@return the value
@since 9

## AtomicLong.setPlain(long)

```java
public final void setPlain(long newValue)
```

Sets the value to {@code newValue}, with memory semantics
of setting as if the variable was declared non-{@code volatile}
and non-{@code final}.

@param newValue the new value
@since 9

## AtomicLong.getOpaque()

```java
public final long getOpaque()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getOpaque}.

@return the value
@since 9

## AtomicLong.setOpaque(long)

```java
public final void setOpaque(long newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param newValue the new value
@since 9

## AtomicLong.getAcquire()

```java
public final long getAcquire()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getAcquire}.

@return the value
@since 9

## AtomicLong.setRelease(long)

```java
public final void setRelease(long newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 9

## AtomicLong.compareAndExchange(long, long)

```java
public final long compareAndExchange(long expectedValue, long newValue)
```

Atomically sets the value to {@code newValue} if the current value,
referred to as the <em>witness value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchange}.

@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLong.compareAndExchangeAcquire(long, long)

```java
public final long compareAndExchangeAcquire(long expectedValue, long newValue)
```

Atomically sets the value to {@code newValue} if the current value,
referred to as the <em>witness value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchangeAcquire}.

@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLong.compareAndExchangeRelease(long, long)

```java
public final long compareAndExchangeRelease(long expectedValue, long newValue)
```

Atomically sets the value to {@code newValue} if the current value,
referred to as the <em>witness value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchangeRelease}.

@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLong.weakCompareAndSetVolatile(long, long)

```java
public final boolean weakCompareAndSetVolatile(long expectedValue, long newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLong.weakCompareAndSetAcquire(long, long)

```java
public final boolean weakCompareAndSetAcquire(long expectedValue, long newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetAcquire}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLong.weakCompareAndSetRelease(long, long)

```java
public final boolean weakCompareAndSetRelease(long expectedValue, long newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetRelease}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9