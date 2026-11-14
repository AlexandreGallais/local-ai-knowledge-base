# AtomicIntegerArray class (java.util.concurrent.atomic)

```java
public class AtomicIntegerArray implements java.io.Serializable
```

An {@code int} array in which elements may be updated atomically.
See the {@link VarHandle} specification for descriptions of the
properties of atomic accesses.
@since 1.5
@author Doug Lea

## AtomicIntegerArray.AtomicIntegerArray(int)

```java
public AtomicIntegerArray(int length)
```

Creates a new AtomicIntegerArray of the given length, with all
elements initially zero.

@param length the length of the array

## AtomicIntegerArray.AtomicIntegerArray(int[])

```java
public AtomicIntegerArray(int[] array)
```

Creates a new AtomicIntegerArray with the same length as, and
all elements copied from, the given array.

@param array the array to copy elements from
@throws NullPointerException if array is null

## AtomicIntegerArray.length()

```java
public final int length()
```

Returns the length of the array.

@return the length of the array

## AtomicIntegerArray.get(int)

```java
public final int get(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getVolatile}.

@param i the index
@return the current value

## AtomicIntegerArray.set(int, int)

```java
public final void set(int i, int newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param i the index
@param newValue the new value

## AtomicIntegerArray.lazySet(int, int)

```java
public final void lazySet(int i, int newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 1.6

## AtomicIntegerArray.getAndSet(int, int)

```java
public final int getAndSet(int i, int newValue)
```

Atomically sets the element at index {@code i} to {@code
newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param i the index
@param newValue the new value
@return the previous value

## AtomicIntegerArray.compareAndSet(int, int, int)

```java
public final boolean compareAndSet(int i, int expectedValue, int newValue)
```

Atomically sets the element at index {@code i} to {@code
newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicIntegerArray.weakCompareAndSet(int, int, int)

```java
public final boolean weakCompareAndSet(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetPlain(int, int, int)

```java
public final boolean weakCompareAndSetPlain(int i, int expectedValue, int newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicIntegerArray.getAndIncrement(int)

```java
public final int getAndIncrement(int i)
```

Atomically increments the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(i, 1)}.

@param i the index
@return the previous value

## AtomicIntegerArray.getAndDecrement(int)

```java
public final int getAndDecrement(int i)
```

Atomically decrements the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code getAndAdd(i, -1)}.

@param i the index
@return the previous value

## AtomicIntegerArray.getAndAdd(int, int)

```java
public final int getAndAdd(int i, int delta)
```

Atomically adds the given value to the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param i the index
@param delta the value to add
@return the previous value

## AtomicIntegerArray.incrementAndGet(int)

```java
public final int incrementAndGet(int i)
```

Atomically increments the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(i, 1)}.

@param i the index
@return the updated value

## AtomicIntegerArray.decrementAndGet(int)

```java
public final int decrementAndGet(int i)
```

Atomically decrements the value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

<p>Equivalent to {@code addAndGet(i, -1)}.

@param i the index
@return the updated value

## AtomicIntegerArray.addAndGet(int, int)

```java
public final int addAndGet(int i, int delta)
```

Atomically adds the given value to the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAndAdd}.

@param i the index
@param delta the value to add
@return the updated value

## AtomicIntegerArray.getAndUpdate(int, IntUnaryOperator)

```java
public final int getAndUpdate(int i, IntUnaryOperator updateFunction)
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

## AtomicIntegerArray.updateAndGet(int, IntUnaryOperator)

```java
public final int updateAndGet(int i, IntUnaryOperator updateFunction)
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

## AtomicIntegerArray.getAndAccumulate(int, int, IntBinaryOperator)

```java
public final int getAndAccumulate(int i, int x, IntBinaryOperator accumulatorFunction)
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

## AtomicIntegerArray.accumulateAndGet(int, int, IntBinaryOperator)

```java
public final int accumulateAndGet(int i, int x, IntBinaryOperator accumulatorFunction)
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

## AtomicIntegerArray.toString()

```java
public String toString()
```

{@return the String representation of the current values of array}

## AtomicIntegerArray.getPlain(int)

```java
public final int getPlain(int i)
```

Returns the current value of the element at index {@code i},
with memory semantics of reading as if the variable was declared
non-{@code volatile}.

@param i the index
@return the value
@since 9

## AtomicIntegerArray.setPlain(int, int)

```java
public final void setPlain(int i, int newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory semantics of setting as if the variable was
declared non-{@code volatile} and non-{@code final}.

@param i the index
@param newValue the new value
@since 9

## AtomicIntegerArray.getOpaque(int)

```java
public final int getOpaque(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getOpaque}.

@param i the index
@return the value
@since 9

## AtomicIntegerArray.setOpaque(int, int)

```java
public final void setOpaque(int i, int newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param i the index
@param newValue the new value
@since 9

## AtomicIntegerArray.getAcquire(int)

```java
public final int getAcquire(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAcquire}.

@param i the index
@return the value
@since 9

## AtomicIntegerArray.setRelease(int, int)

```java
public final void setRelease(int i, int newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 9

## AtomicIntegerArray.compareAndExchange(int, int, int)

```java
public final int compareAndExchange(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.compareAndExchangeAcquire(int, int, int)

```java
public final int compareAndExchangeAcquire(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.compareAndExchangeRelease(int, int, int)

```java
public final int compareAndExchangeRelease(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetVolatile(int, int, int)

```java
public final boolean weakCompareAndSetVolatile(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetAcquire(int, int, int)

```java
public final boolean weakCompareAndSetAcquire(int i, int expectedValue, int newValue)
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

## AtomicIntegerArray.weakCompareAndSetRelease(int, int, int)

```java
public final boolean weakCompareAndSetRelease(int i, int expectedValue, int newValue)
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