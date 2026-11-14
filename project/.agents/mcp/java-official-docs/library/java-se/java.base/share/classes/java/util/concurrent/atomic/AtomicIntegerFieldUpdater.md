# AtomicIntegerFieldUpdater class (java.util.concurrent.atomic)

```java
public abstract class AtomicIntegerFieldUpdater<T>
```

A reflection-based utility that enables atomic updates to
designated {@code volatile int} fields of designated classes.
This class is designed for use in atomic data structures in which
several fields of the same node are independently subject to atomic
updates.

<p>Note that the guarantees of the {@code compareAndSet}
method in this class are weaker than in other atomic classes.
Because this class cannot ensure that all uses of the field
are appropriate for purposes of atomic access, it can
guarantee atomicity only with respect to other invocations of
{@code compareAndSet} and {@code set} on the same updater.

<p>Object arguments for parameters of type {@code T} that are not
instances of the class passed to {@link #newUpdater} will result in
a {@link ClassCastException} being thrown.

@since 1.5
@author Doug Lea
@param <T> The type of the object holding the updatable field

## AtomicIntegerFieldUpdater.newUpdater(Class<U>, String)

```java
public static <U> AtomicIntegerFieldUpdater<U> newUpdater(Class<U> tclass, String fieldName)
```

Creates and returns an updater for objects with the given field.
The Class argument is needed to check that reflective types and
generic types match.

@param tclass the class of the objects holding the field
@param fieldName the name of the field to be updated
@param <U> the type of instances of tclass
@return the updater
@throws IllegalArgumentException if the field is not a
volatile integer type
@throws RuntimeException with a nested reflection-based
exception if the class does not hold field or is the wrong type,
or the field is inaccessible to the caller according to Java language
access control

## AtomicIntegerFieldUpdater.AtomicIntegerFieldUpdater()

```java
protected AtomicIntegerFieldUpdater()
```

Protected do-nothing constructor for use by subclasses.

## AtomicIntegerFieldUpdater.compareAndSet(T, int, int)

```java
public abstract boolean compareAndSet(T obj, int expect, int update)
```

Atomically sets the field of the given object managed by this updater
to the given updated value if the current value {@code ==} the
expected value. This method is guaranteed to be atomic with respect to
other calls to {@code compareAndSet} and {@code set}, but not
necessarily with respect to other changes in the field.

@param obj An object whose field to conditionally set
@param expect the expected value
@param update the new value
@return {@code true} if successful

## AtomicIntegerFieldUpdater.weakCompareAndSet(T, int, int)

```java
public abstract boolean weakCompareAndSet(T obj, int expect, int update)
```

Atomically sets the field of the given object managed by this updater
to the given updated value if the current value {@code ==} the
expected value. This method is guaranteed to be atomic with respect to
other calls to {@code compareAndSet} and {@code set}, but not
necessarily with respect to other changes in the field.

<p>This operation may fail spuriously and does not provide
ordering guarantees, so is only rarely an appropriate
alternative to {@code compareAndSet}.

@param obj An object whose field to conditionally set
@param expect the expected value
@param update the new value
@return {@code true} if successful

## AtomicIntegerFieldUpdater.set(T, int)

```java
public abstract void set(T obj, int newValue)
```

Sets the field of the given object managed by this updater to the
given updated value. This operation is guaranteed to act as a volatile
store with respect to subsequent invocations of {@code compareAndSet}.

@param obj An object whose field to set
@param newValue the new value

## AtomicIntegerFieldUpdater.lazySet(T, int)

```java
public abstract void lazySet(T obj, int newValue)
```

Eventually sets the field of the given object managed by this
updater to the given updated value.

@param obj An object whose field to set
@param newValue the new value
@since 1.6

## AtomicIntegerFieldUpdater.get(T)

```java
public abstract int get(T obj)
```

Returns the current value held in the field of the given object
managed by this updater.

@param obj An object whose field to get
@return the current value

## AtomicIntegerFieldUpdater.getAndSet(T, int)

```java
public int getAndSet(T obj, int newValue)
```

Atomically sets the field of the given object managed by this updater
to the given value and returns the old value.

@param obj An object whose field to get and set
@param newValue the new value
@return the previous value

## AtomicIntegerFieldUpdater.getAndIncrement(T)

```java
public int getAndIncrement(T obj)
```

Atomically increments by one the current value of the field of the
given object managed by this updater.

@param obj An object whose field to get and set
@return the previous value

## AtomicIntegerFieldUpdater.getAndDecrement(T)

```java
public int getAndDecrement(T obj)
```

Atomically decrements by one the current value of the field of the
given object managed by this updater.

@param obj An object whose field to get and set
@return the previous value

## AtomicIntegerFieldUpdater.getAndAdd(T, int)

```java
public int getAndAdd(T obj, int delta)
```

Atomically adds the given value to the current value of the field of
the given object managed by this updater.

@param obj An object whose field to get and set
@param delta the value to add
@return the previous value

## AtomicIntegerFieldUpdater.incrementAndGet(T)

```java
public int incrementAndGet(T obj)
```

Atomically increments by one the current value of the field of the
given object managed by this updater.

@param obj An object whose field to get and set
@return the updated value

## AtomicIntegerFieldUpdater.decrementAndGet(T)

```java
public int decrementAndGet(T obj)
```

Atomically decrements by one the current value of the field of the
given object managed by this updater.

@param obj An object whose field to get and set
@return the updated value

## AtomicIntegerFieldUpdater.addAndGet(T, int)

```java
public int addAndGet(T obj, int delta)
```

Atomically adds the given value to the current value of the field of
the given object managed by this updater.

@param obj An object whose field to get and set
@param delta the value to add
@return the updated value

## AtomicIntegerFieldUpdater.getAndUpdate(T, IntUnaryOperator)

```java
public final int getAndUpdate(T obj, IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the field of the given object managed
by this updater with the results of applying the given
function, returning the previous value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.

@param obj An object whose field to get and set
@param updateFunction a side-effect-free function
@return the previous value
@since 1.8

## AtomicIntegerFieldUpdater.updateAndGet(T, IntUnaryOperator)

```java
public final int updateAndGet(T obj, IntUnaryOperator updateFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the field of the given object managed
by this updater with the results of applying the given
function, returning the updated value. The function should be
side-effect-free, since it may be re-applied when attempted
updates fail due to contention among threads.

@param obj An object whose field to get and set
@param updateFunction a side-effect-free function
@return the updated value
@since 1.8

## AtomicIntegerFieldUpdater.getAndAccumulate(T, int, IntBinaryOperator)

```java
public final int getAndAccumulate(T obj, int x, IntBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the field of the given object managed
by this updater with the results of applying the given function
to the current and given values, returning the previous value.
The function should be side-effect-free, since it may be
re-applied when attempted updates fail due to contention among
threads.  The function is applied with the current value as its
first argument, and the given update as the second argument.

@param obj An object whose field to get and set
@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the previous value
@since 1.8

## AtomicIntegerFieldUpdater.accumulateAndGet(T, int, IntBinaryOperator)

```java
public final int accumulateAndGet(T obj, int x, IntBinaryOperator accumulatorFunction)
```

Atomically updates (with memory effects as specified by {@link
VarHandle#compareAndSet}) the field of the given object managed
by this updater with the results of applying the given function
to the current and given values, returning the updated value.
The function should be side-effect-free, since it may be
re-applied when attempted updates fail due to contention among
threads.  The function is applied with the current value as its
first argument, and the given update as the second argument.

@param obj An object whose field to get and set
@param x the update value
@param accumulatorFunction a side-effect-free function of two arguments
@return the updated value
@since 1.8