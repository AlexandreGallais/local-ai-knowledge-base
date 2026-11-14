# AtomicInteger class (java.util.concurrent.atomic)

```java
public class AtomicInteger extends Number implements java.io.Serializable
```

An {@code int} value that may be updated atomically.  See the
{@link VarHandle} specification for descriptions of the properties
of atomic accesses. An {@code AtomicInteger} is used in
applications such as atomically incremented counters, and cannot be
used as a replacement for an {@link java.lang.Integer}. However,
this class does extend {@code Number} to allow uniform access by
tools and utilities that deal with numerically-based classes.

@since 1.5
@author Doug Lea

## AtomicInteger.AtomicInteger(int)

```java
public AtomicInteger(int initialValue)
```

Creates a new AtomicInteger with the given initial value.

@param initialValue the initial value

## AtomicInteger.AtomicInteger()

```java
public AtomicInteger()
```

Creates a new AtomicInteger with initial value {@code 0}.

## AtomicInteger.get()

```java
public final int get()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getVolatile}.

@return the current value

## AtomicInteger.set(int)

```java
public final void set(int newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param newValue the new value

## AtomicInteger.lazySet(int)

```java
public final void lazySet(int newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 1.6

## AtomicInteger.getAndSet(int)

```java
public final int getAndSet(int newValue)
```

Atomically sets the value to {@code newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param newValue the new value
@return the previous value

## AtomicInteger.compareAndSet(int, int)

```java
public final boolean compareAndSet(int expectedValue, int newValue)
```

Atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicInteger.weakCompareAndSet(int, int)

```java
public final boolean weakCompareAndSet(int expectedValue, int newValue)
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

## AtomicInteger.weakCompareAndSetPlain(int, int)

```java
public final boolean weakCompareAndSetPlain(int expectedValue, int newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicInteger.getAndIncrement()

```java
public final int getAndIncrement()
```

Atomically increments the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(1)}.

@return the previous value

## AtomicInteger.getAndDecrement()

```java
public final int getAndDecrement()
```

Atomically decrements the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(-1)}.

@return the previous value

## AtomicInteger.getAndAdd(int)

```java
public final int getAndAdd(int delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param delta the value to add
@return the previous value

## AtomicInteger.incrementAndGet()

```java
public final int incrementAndGet()
```

Atomically increments the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(1)}.

@return the updated value

## AtomicInteger.decrementAndGet()

```java
public final int decrementAndGet()
```

Atomically decrements the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(-1)}.

@return the updated value

## AtomicInteger.addAndGet(int)

```java
public final int addAndGet(int delta)
```

Atomically adds the given value to the current value,
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param delta the value to add
@return the updated value

## AtomicInteger.getAndUpdate(IntUnaryOperator)

```java
public final int getAndUpdate(IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the previous value
@since 1.8

## AtomicInteger.updateAndGet(IntUnaryOperator)

```java
public final int updateAndGet(IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the updated value
@since 1.8

## AtomicInteger.getAndAccumulate(int, IntBinaryOperator)

```java
public final int getAndAccumulate(int x, IntBinaryOperator accumulatorFunction)
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

## AtomicInteger.accumulateAndGet(int, IntBinaryOperator)

```java
public final int accumulateAndGet(int x, IntBinaryOperator accumulatorFunction)
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

## AtomicInteger.toString()

```java
public String toString()
```

{@return the String representation of the current value}

## AtomicInteger.intValue()

```java
public int intValue()
```

Returns the current value of this {@code AtomicInteger} as an
{@code int},
with memory effects as specified by {@link VarHandle#getVolatile}.

Equivalent to {@link #get()}.

## AtomicInteger.longValue()

```java
public long longValue()
```

Returns the current value of this {@code AtomicInteger} as a
{@code long} after a widening primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.2 Widening Primitive Conversion

## AtomicInteger.floatValue()

```java
public float floatValue()
```

Returns the current value of this {@code AtomicInteger} as a
{@code float} after a widening primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.2 Widening Primitive Conversion

## AtomicInteger.doubleValue()

```java
public double doubleValue()
```

Returns the current value of this {@code AtomicInteger} as a
{@code double} after a widening primitive conversion,
with memory effects as specified by {@link VarHandle#getVolatile}.
@jls 5.1.2 Widening Primitive Conversion

## AtomicInteger.getPlain()

```java
public final int getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-{@code volatile}.

@return the value
@since 9

## AtomicInteger.setPlain(int)

```java
public final void setPlain(int newValue)
```

Sets the value to {@code newValue}, with memory semantics
of setting as if the variable was declared non-{@code volatile}
and non-{@code final}.

@param newValue the new value
@since 9

## AtomicInteger.getOpaque()

```java
public final int getOpaque()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getOpaque}.

@return the value
@since 9

## AtomicInteger.setOpaque(int)

```java
public final void setOpaque(int newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param newValue the new value
@since 9

## AtomicInteger.getAcquire()

```java
public final int getAcquire()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getAcquire}.

@return the value
@since 9

## AtomicInteger.setRelease(int)

```java
public final void setRelease(int newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 9

## AtomicInteger.compareAndExchange(int, int)

```java
public final int compareAndExchange(int expectedValue, int newValue)
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

## AtomicInteger.compareAndExchangeAcquire(int, int)

```java
public final int compareAndExchangeAcquire(int expectedValue, int newValue)
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

## AtomicInteger.compareAndExchangeRelease(int, int)

```java
public final int compareAndExchangeRelease(int expectedValue, int newValue)
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

## AtomicInteger.weakCompareAndSetVolatile(int, int)

```java
public final boolean weakCompareAndSetVolatile(int expectedValue, int newValue)
```

Possibly atomically sets the value to {@code newValue} if
the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicInteger.weakCompareAndSetAcquire(int, int)

```java
public final boolean weakCompareAndSetAcquire(int expectedValue, int newValue)
```

Possibly atomically sets the value to {@code newValue} if
the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetAcquire}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicInteger.weakCompareAndSetRelease(int, int)

```java
public final boolean weakCompareAndSetRelease(int expectedValue, int newValue)
```

Possibly atomically sets the value to {@code newValue} if
the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetRelease}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9