# AtomicReferenceArray class (java.util.concurrent.atomic)

```java
public class AtomicReferenceArray<E> implements java.io.Serializable
```

An array of object references in which elements may be updated
atomically.  See the {@link VarHandle} specification for
descriptions of the properties of atomic accesses.
@since 1.5
@author Doug Lea
@param <E> The base class of elements held in this array

## AtomicReferenceArray.AtomicReferenceArray(int)

```java
public AtomicReferenceArray(int length)
```

Creates a new AtomicReferenceArray of the given length, with all
elements initially null.

@param length the length of the array

## AtomicReferenceArray.AtomicReferenceArray(E[])

```java
public AtomicReferenceArray(E[] array)
```

Creates a new AtomicReferenceArray with the same length as, and
all elements copied from, the given array.

@param array the array to copy elements from
@throws NullPointerException if array is null

## AtomicReferenceArray.length()

```java
public final int length()
```

Returns the length of the array.

@return the length of the array

## AtomicReferenceArray.get(int)

```java
public final E get(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getVolatile}.

@param i the index
@return the current value

## AtomicReferenceArray.set(int, E)

```java
public final void set(int i, E newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param i the index
@param newValue the new value

## AtomicReferenceArray.lazySet(int, E)

```java
public final void lazySet(int i, E newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 1.6

## AtomicReferenceArray.getAndSet(int, E)

```java
public final E getAndSet(int i, E newValue)
```

Atomically sets the element at index {@code i} to {@code
newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param i the index
@param newValue the new value
@return the previous value

## AtomicReferenceArray.compareAndSet(int, E, E)

```java
public final boolean compareAndSet(int i, E expectedValue, E newValue)
```

Atomically sets the element at index {@code i} to {@code newValue}
if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicReferenceArray.weakCompareAndSet(int, E, E)

```java
public final boolean weakCompareAndSet(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetPlain(int, E, E)

```java
public final boolean weakCompareAndSetPlain(int i, E expectedValue, E newValue)
```

Possibly atomically sets the element at index {@code i} to
{@code newValue} if the element's current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param i the index
@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicReferenceArray.getAndUpdate(int, UnaryOperator<E>)

```java
public final E getAndUpdate(int i, UnaryOperator<E> updateFunction)
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

## AtomicReferenceArray.updateAndGet(int, UnaryOperator<E>)

```java
public final E updateAndGet(int i, UnaryOperator<E> updateFunction)
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

## AtomicReferenceArray.getAndAccumulate(int, E, BinaryOperator<E>)

```java
public final E getAndAccumulate(int i, E x, BinaryOperator<E> accumulatorFunction)
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

## AtomicReferenceArray.accumulateAndGet(int, E, BinaryOperator<E>)

```java
public final E accumulateAndGet(int i, E x, BinaryOperator<E> accumulatorFunction)
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

## AtomicReferenceArray.toString()

```java
public String toString()
```

{@return the String representation of the current values of array}

## AtomicReferenceArray.getPlain(int)

```java
public final E getPlain(int i)
```

Returns the current value of the element at index {@code i},
with memory semantics of reading as if the variable was declared
non-{@code volatile}.

@param i the index
@return the value
@since 9

## AtomicReferenceArray.setPlain(int, E)

```java
public final void setPlain(int i, E newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory semantics of setting as if the variable was
declared non-{@code volatile} and non-{@code final}.

@param i the index
@param newValue the new value
@since 9

## AtomicReferenceArray.getOpaque(int)

```java
public final E getOpaque(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getOpaque}.

@param i the index
@return the value
@since 9

## AtomicReferenceArray.setOpaque(int, E)

```java
public final void setOpaque(int i, E newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param i the index
@param newValue the new value
@since 9

## AtomicReferenceArray.getAcquire(int)

```java
public final E getAcquire(int i)
```

Returns the current value of the element at index {@code i},
with memory effects as specified by {@link VarHandle#getAcquire}.

@param i the index
@return the value
@since 9

## AtomicReferenceArray.setRelease(int, E)

```java
public final void setRelease(int i, E newValue)
```

Sets the element at index {@code i} to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param i the index
@param newValue the new value
@since 9

## AtomicReferenceArray.compareAndExchange(int, E, E)

```java
public final E compareAndExchange(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.compareAndExchangeAcquire(int, E, E)

```java
public final E compareAndExchangeAcquire(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.compareAndExchangeRelease(int, E, E)

```java
public final E compareAndExchangeRelease(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetVolatile(int, E, E)

```java
public final boolean weakCompareAndSetVolatile(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetAcquire(int, E, E)

```java
public final boolean weakCompareAndSetAcquire(int i, E expectedValue, E newValue)
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

## AtomicReferenceArray.weakCompareAndSetRelease(int, E, E)

```java
public final boolean weakCompareAndSetRelease(int i, E expectedValue, E newValue)
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