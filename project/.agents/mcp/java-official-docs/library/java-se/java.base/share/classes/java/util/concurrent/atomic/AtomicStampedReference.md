# AtomicStampedReference class (java.util.concurrent.atomic)

```java
public class AtomicStampedReference<V>
```

An {@code AtomicStampedReference} maintains an object reference
along with an integer "stamp", that can be updated atomically.

<p>Implementation note: This implementation maintains stamped
references by creating internal objects representing "boxed"
[reference, integer] pairs.

@since 1.5
@author Doug Lea
@param <V> The type of object referred to by this reference

## AtomicStampedReference.AtomicStampedReference(V, int)

```java
public AtomicStampedReference(V initialRef, int initialStamp)
```

Creates a new {@code AtomicStampedReference} with the given
initial values.

@param initialRef the initial reference
@param initialStamp the initial stamp

## AtomicStampedReference.getReference()

```java
public V getReference()
```

Returns the current value of the reference.

@return the current value of the reference

## AtomicStampedReference.getStamp()

```java
public int getStamp()
```

Returns the current value of the stamp.

@return the current value of the stamp

## AtomicStampedReference.get(int[])

```java
public V get(int[] stampHolder)
```

Returns the current values of both the reference and the stamp.
Typical usage is {@code int[1] holder; ref = v.get(holder); }.

@param stampHolder an array of size of at least one.  On return,
{@code stampHolder[0]} will hold the value of the stamp.
@return the current value of the reference

## AtomicStampedReference.weakCompareAndSet(V, V, int, int)

```java
public boolean weakCompareAndSet(V expectedReference, V newReference, int expectedStamp, int newStamp)
```

Atomically sets the value of both the reference and stamp to
the given update values if the current reference is {@code ==}
to the expected reference and the current stamp is equal to the
expected stamp. This operation may fail spuriously and does not
provide ordering guarantees, so is only rarely an
appropriate alternative to {@code compareAndSet}.

@param expectedReference the expected value of the reference
@param newReference the new value for the reference
@param expectedStamp the expected value of the stamp
@param newStamp the new value for the stamp
@return {@code true} if successful

## AtomicStampedReference.compareAndSet(V, V, int, int)

```java
public boolean compareAndSet(V expectedReference, V newReference, int expectedStamp, int newStamp)
```

Atomically sets the value of both the reference and stamp
to the given update values if the
current reference is {@code ==} to the expected reference
and the current stamp is equal to the expected stamp.

@param expectedReference the expected value of the reference
@param newReference the new value for the reference
@param expectedStamp the expected value of the stamp
@param newStamp the new value for the stamp
@return {@code true} if successful

## AtomicStampedReference.set(V, int)

```java
public void set(V newReference, int newStamp)
```

Unconditionally sets the value of both the reference and stamp.

@param newReference the new value for the reference
@param newStamp the new value for the stamp

## AtomicStampedReference.attemptStamp(V, int)

```java
public boolean attemptStamp(V expectedReference, int newStamp)
```

Atomically sets the value of the stamp to the given update value
if the current reference is {@code ==} to the expected
reference.  Any given invocation of this operation may fail
(return {@code false}) spuriously, but repeated invocation
when the current value holds the expected value and no other
thread is also attempting to set the value will eventually
succeed.

@param expectedReference the expected value of the reference
@param newStamp the new value for the stamp
@return {@code true} if successful