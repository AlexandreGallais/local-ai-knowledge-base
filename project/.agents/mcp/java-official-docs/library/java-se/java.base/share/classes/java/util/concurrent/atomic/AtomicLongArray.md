# AtomicLongArray class (java.util.concurrent.atomic)

```java
public class AtomicLongArray implements java.io.Serializable
```

A {@code long} array in which elements may be updated atomically.
See the {@link VarHandle} specification for descriptions of the
properties of atomic accesses.
@since 1.5
@author Doug Lea

## AtomicLongArray.AtomicLongArray(int)

```java
public AtomicLongArray(int length)
```

Creates a new AtomicLongArray of the given length, with all
elements initially zero.

@param length the length of the array

## AtomicLongArray.AtomicLongArray(long[])

```java
public AtomicLongArray(long[] array)
```

Creates a new AtomicLongArray with the same length as, and
all elements copied from, the given array.

@param array the array to copy elements from
@throws NullPointerException if array is null

## AtomicLongArray.length()

```java
public final int length()
```

Returns the length of the array.

@return the length of the array

## AtomicLongArray.get(int)

```java
public final long get(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getVolatile}.

@param i the index
@return the current value

## AtomicLongArray.set(int, long)

```java
public final void set(int i, long newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param i the index
@param newValue the new value

## AtomicLongArray.lazySet(int, long)

```java
public final void lazySet(int i, long newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 1.6

## AtomicLongArray.getAndSet(int, long)

```java
public final long getAndSet(int i, long newValue)
```

Atomically sets the element at index {@code i} to {@code
newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param i the index
@param newValue the new value
@return the previous value

## AtomicLongArray.compareAndSet(int, long, long)

```java
public final boolean compareAndSet(int i, long expectedValue, long newValue)
```

Atomically sets the element at index {@code i} to {@code newValue}
if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicLongArray.weakCompareAndSet(int, long, long)

```java
public final boolean weakCompareAndSet(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@deprecated This method has plain memory effects but the method
name implies volatile memory effects (see methods such as
{@link #compareAndExchange} and {@link #compareAndSet}).  To avoid
confusion over plain or volatile memory effects it is recommended that
the method {@link #weakCompareAndSetPlain} be used instead.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@see #weakCompareAndSetPlain

## AtomicLongArray.weakCompareAndSetPlain(int, long, long)

```java
public final boolean weakCompareAndSetPlain(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLongArray.getAndIncrement(int)

```java
public final long getAndIncrement(int i)
```

Atomically increments the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(i, 1)}.

@param i the index
@return the previous value

## AtomicLongArray.getAndDecrement(int)

```java
public final long getAndDecrement(int i)
```

Atomically decrements the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(i, -1)}.

@param i the index
@return the previous value

## AtomicLongArray.getAndAdd(int, long)

```java
public final long getAndAdd(int i, long delta)
```

Atomically adds the given value to the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param i the index
@param delta the value to add
@return the previous value

## AtomicLongArray.incrementAndGet(int)

```java
public final long incrementAndGet(int i)
```

Atomically increments the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(i, 1)}.

@param i the index
@return the updated value

## AtomicLongArray.decrementAndGet(int)

```java
public final long decrementAndGet(int i)
```

Atomically decrements the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(i, -1)}.

@param i the index
@return the updated value

## AtomicLongArray.addAndGet(int, long)

```java
public long addAndGet(int i, long delta)
```

Atomically adds the given value to the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param i the index
@param delta the value to add
@return the updated value

## AtomicLongArray.getAndUpdate(int, LongUnaryOperator)

```java
public final long getAndUpdate(int i, LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the element at index {@code i} with
the results of applying the given function, returning the
previous value. The function should be side-effect-free, since
it may be re-applied when attempted updates fail due to
contention among threads.

@param i the index
@param updateFunction a side-effect-free function
@return the previous value
@since 1.8

## AtomicLongArray.updateAndGet(int, LongUnaryOperator)

```java
public final long updateAndGet(int i, LongUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the element at index {@code i} with
the results of applying the given function, returning the
updated value. The function should be side-effect-free, since it
may be re-applied when attempted updates fail due to contention
among threads.

@param i the index
@param updateFunction a side-effect-free function
@return the updated value
@since 1.8

## AtomicLongArray.getAndAccumulate(int, long, LongBinaryOperator)

```java
public final long getAndAccumulate(int i, long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the element at index {@code i} with
the results of applying the given function to the current and
given values, returning the previous value. The function should
be side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value of the element at index {@code i}
as its first argument, and the given update as the second
argument.

@param i the index
@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the previous value
@since 1.8

## AtomicLongArray.accumulateAndGet(int, long, LongBinaryOperator)

```java
public final long accumulateAndGet(int i, long x, LongBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the element at index {@code i} with
the results of applying the given function to the current and
given values, returning the updated value. The function should
be side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.  The function is
applied with the current value of the element at index {@code i}
as its first argument, and the given update as the second
argument.

@param i the index
@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the updated value
@since 1.8

## AtomicLongArray.toString()

```java
public String toString()
```

{@return the String representation of the current values of array}

## AtomicLongArray.getPlain(int)

```java
public final long getPlain(int i)
```

Returns the current value of the element at index {@code i},
with memory semantics of reading as if the variable was declared
non-{@code volatile}.

@param i the index
@return the value
@since 9

## AtomicLongArray.setPlain(int, long)

```java
public final void setPlain(int i, long newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory semantics of setting as if the variable was
declared non-{@code volatile} and non-{@code final}.

@param i the index
@param newValue the new value
@since 9

## AtomicLongArray.getOpaque(int)

```java
public final long getOpaque(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getOpaque}.

@param i the index
@return the value
@since 9

## AtomicLongArray.setOpaque(int, long)

```java
public final void setOpaque(int i, long newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param i the index
@param newValue the new value
@since 9

## AtomicLongArray.getAcquire(int)

```java
public final long getAcquire(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAcquire}.

@param i the index
@return the value
@since 9

## AtomicLongArray.setRelease(int, long)

```java
public final void setRelease(int i, long newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 9

## AtomicLongArray.compareAndExchange(int, long, long)

```java
public final long compareAndExchange(int i, long expectedValue, long newValue)
```

Atomically sets the element at index {@code i} to {@code newValue}
if the element's current value, referred to as the <em>witness
value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchange}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLongArray.compareAndExchangeAcquire(int, long, long)

```java
public final long compareAndExchangeAcquire(int i, long expectedValue, long newValue)
```

Atomically sets the element at index {@code i} to {@code newValue}
if the element's current value, referred to as the <em>witness
value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchangeAcquire}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLongArray.compareAndExchangeRelease(int, long, long)

```java
public final long compareAndExchangeRelease(int i, long expectedValue, long newValue)
```

Atomically sets the element at index {@code i} to {@code newValue}
if the element's current value, referred to as the <em>witness
value</em>, {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#compareAndExchangeRelease}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return the <em>witness value</em>, which will be the same as the
expected value if successful
@since 9

## AtomicLongArray.weakCompareAndSetVolatile(int, long, long)

```java
public final boolean weakCompareAndSetVolatile(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSet}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLongArray.weakCompareAndSetAcquire(int, long, long)

```java
public final boolean weakCompareAndSetAcquire(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetAcquire}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicLongArray.weakCompareAndSetRelease(int, long, long)

```java
public final boolean weakCompareAndSetRelease(int i, long expectedValue, long newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetRelease}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9