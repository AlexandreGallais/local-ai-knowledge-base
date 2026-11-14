# AtomicBoolean class (java.util.concurrent.atomic)

```java
public class AtomicBoolean implements java.io.Serializable
```

A {@code boolean} value that may be updated atomically. See the
{@link VarHandle} specification for descriptions of the properties
of atomic accesses. An {@code AtomicBoolean} is used in
applications such as atomically updated flags, and cannot be used
as a replacement for a {@link java.lang.Boolean}.

@since 1.5
@author Doug Lea

## AtomicBoolean.AtomicBoolean(boolean)

```java
public AtomicBoolean(boolean initialValue)
```

Creates a new {@code AtomicBoolean} with the given initial value.

@param initialValue the initial value

## AtomicBoolean.AtomicBoolean()

```java
public AtomicBoolean()
```

Creates a new {@code AtomicBoolean} with initial value {@code false}.

## AtomicBoolean.get()

```java
public final boolean get()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getVolatile}.

@return the current value

## AtomicBoolean.compareAndSet(boolean, boolean)

```java
public final boolean compareAndSet(boolean expectedValue, boolean newValue)
```

Atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#compareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful. False return indicates that
the actual value was not equal to the expected value.

## AtomicBoolean.weakCompareAndSet(boolean, boolean)

```java
public boolean weakCompareAndSet(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.weakCompareAndSetPlain(boolean, boolean)

```java
public boolean weakCompareAndSetPlain(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to {@code newValue}
if the current value {@code == expectedValue},
with memory effects as specified by {@link VarHandle#weakCompareAndSetPlain}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicBoolean.set(boolean)

```java
public final void set(boolean newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setVolatile}.

@param newValue the new value

## AtomicBoolean.lazySet(boolean)

```java
public final void lazySet(boolean newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 1.6

## AtomicBoolean.getAndSet(boolean)

```java
public final boolean getAndSet(boolean newValue)
```

Atomically sets the value to {@code newValue} and returns the old value,
with memory effects as specified by {@link VarHandle#getAndSet}.

@param newValue the new value
@return the previous value

## AtomicBoolean.toString()

```java
public String toString()
```

{@return the String representation of the current value}

## AtomicBoolean.getPlain()

```java
public final boolean getPlain()
```

Returns the current value, with memory semantics of reading as
if the variable was declared non-{@code volatile}.

@return the value
@since 9

## AtomicBoolean.setPlain(boolean)

```java
public final void setPlain(boolean newValue)
```

Sets the value to {@code newValue}, with memory semantics
of setting as if the variable was declared non-{@code volatile}
and non-{@code final}.

@param newValue the new value
@since 9

## AtomicBoolean.getOpaque()

```java
public final boolean getOpaque()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getOpaque}.

@return the value
@since 9

## AtomicBoolean.setOpaque(boolean)

```java
public final void setOpaque(boolean newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setOpaque}.

@param newValue the new value
@since 9

## AtomicBoolean.getAcquire()

```java
public final boolean getAcquire()
```

Returns the current value,
with memory effects as specified by {@link VarHandle#getAcquire}.

@return the value
@since 9

## AtomicBoolean.setRelease(boolean)

```java
public final void setRelease(boolean newValue)
```

Sets the value to {@code newValue},
with memory effects as specified by {@link VarHandle#setRelease}.

@param newValue the new value
@since 9

## AtomicBoolean.compareAndExchange(boolean, boolean)

```java
public final boolean compareAndExchange(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.compareAndExchangeAcquire(boolean, boolean)

```java
public final boolean compareAndExchangeAcquire(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.compareAndExchangeRelease(boolean, boolean)

```java
public final boolean compareAndExchangeRelease(boolean expectedValue, boolean newValue)
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

## AtomicBoolean.weakCompareAndSetVolatile(boolean, boolean)

```java
public final boolean weakCompareAndSetVolatile(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to {@code newValue} if the current
value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSet}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicBoolean.weakCompareAndSetAcquire(boolean, boolean)

```java
public final boolean weakCompareAndSetAcquire(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to {@code newValue} if the current
value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetAcquire}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9

## AtomicBoolean.weakCompareAndSetRelease(boolean, boolean)

```java
public final boolean weakCompareAndSetRelease(boolean expectedValue, boolean newValue)
```

Possibly atomically sets the value to {@code newValue} if the current
value {@code == expectedValue},
with memory effects as specified by
{@link VarHandle#weakCompareAndSetRelease}.

@param expectedValue the expected value
@param newValue the new value
@return {@code true} if successful
@since 9