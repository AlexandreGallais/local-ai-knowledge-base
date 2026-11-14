# AtomicReference class (java.util.concurrent.atomic)

```java
public class AtomicReference<V> implements java.io.Serializable
```

An object reference that may be updated atomically.  See the {@link
VarHandle} specification for descriptions of the properties of
atomic accesses.
@since 1.5
@author Doug Lea
@param <V> The type of object referred to by this reference

## AtomicReference.AtomicReference(V)

```java
public AtomicReference(V initialValue)
```

Creates a new AtomicReference with the given initial value.

@param initialValue the initial value

## AtomicReference.AtomicReference()

```java
public AtomicReference()
```

Creates a new AtomicReference with null initial value.

## AtomicReference.get()

```java
public final V get()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getVolatile}.

@return the current value

## AtomicReference.set(V)

```java
public final void set(V newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param newValue the new value

## AtomicReference.lazySet(V)

```java
public final void lazySet(V newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 1.6

## AtomicReference.compareAndSet(V, V)

```java
public final boolean compareAndSet(V expectedValue, V newValue)
```

Atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicReference.weakCompareAndSet(V, V)

```java
public final boolean weakCompareAndSet(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetPlain(V, V)

```java
public final boolean weakCompareAndSetPlain(V expectedValue, V newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicReference.getAndSet(V)

```java
public final V getAndSet(V newValue)
```

Atomically sets the value to {@code newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param newValue the new value
@return the previous value

## AtomicReference.getAndUpdate(UnaryOperator<V>)

```java
public final V getAndUpdate(UnaryOperator<V> updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the previous value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the previous value
@since 1.8

## AtomicReference.updateAndGet(UnaryOperator<V>)

```java
public final V updateAndGet(UnaryOperator<V> updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the current value with the results of
applying the given function, returning the updated value. The
function should be side-effect-free, since it may be re-applied
when attempted updates fail due to contention among threads.

@param updateFunction a side-effect-free function
@return the updated value
@since 1.8

## AtomicReference.getAndAccumulate(V, BinaryOperator<V>)

```java
public final V getAndAccumulate(V x, BinaryOperator<V> accumulatorFunction)
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

## AtomicReference.accumulateAndGet(V, BinaryOperator<V>)

```java
public final V accumulateAndGet(V x, BinaryOperator<V> accumulatorFunction)
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

## AtomicReference.toString()

```java
public String toString()
```

{@return the String representation of the current value}

## AtomicReference.getPlain()

```java
public final V getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-{@code volatile}.

@return the value
@since 9

## AtomicReference.setPlain(V)

```java
public final void setPlain(V newValue)
```

Sets the value to {@code newValue}, with memory semantics
of setting as if the variable was declared non-{@code volatile}
and non-{@code final}.

@param newValue the new value
@since 9

## AtomicReference.getOpaque()

```java
public final V getOpaque()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getOpaque}.

@return the value
@since 9

## AtomicReference.setOpaque(V)

```java
public final void setOpaque(V newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param newValue the new value
@since 9

## AtomicReference.getAcquire()

```java
public final V getAcquire()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getAcquire}.

@return the value
@since 9

## AtomicReference.setRelease(V)

```java
public final void setRelease(V newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 9

## AtomicReference.compareAndExchange(V, V)

```java
public final V compareAndExchange(V expectedValue, V newValue)
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

## AtomicReference.compareAndExchangeAcquire(V, V)

```java
public final V compareAndExchangeAcquire(V expectedValue, V newValue)
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

## AtomicReference.compareAndExchangeRelease(V, V)

```java
public final V compareAndExchangeRelease(V expectedValue, V newValue)
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

## AtomicReference.weakCompareAndSetVolatile(V, V)

```java
public final boolean weakCompareAndSetVolatile(V expectedValue, V newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicReference.weakCompareAndSetAcquire(V, V)

```java
public final boolean weakCompareAndSetAcquire(V expectedValue, V newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetAcquire}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicReference.weakCompareAndSetRelease(V, V)

```java
public final boolean weakCompareAndSetRelease(V expectedValue, V newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetRelease}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9