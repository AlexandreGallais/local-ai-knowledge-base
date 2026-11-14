# AtomicMarkableReference class (java.util.concurrent.atomic)

```java
public class AtomicMarkableReference<V>
```

An {@code AtomicMarkableReference} maintains an object reference
along with a mark bit, that can be updated atomically.

<p>Implementation note: This implementation maintains markable
references by creating internal objects representing "boxed"
[reference, boolean] pairs.

@since 1.5
@author Doug Lea
@param <V> The type of object referred to by this reference

## AtomicMarkableReference.AtomicMarkableReference(V, boolean)

```java
public AtomicMarkableReference(V initialRef, boolean initialMark)
```

Creates a new {@code AtomicMarkableReference} with the given
initial values.

@param initialRef the initial reference
@param initialMark the initial mark

## AtomicMarkableReference.getReference()

```java
public V getReference()
```

Returns the current value of the reference.

@return the current value of the reference

## AtomicMarkableReference.isMarked()

```java
public boolean isMarked()
```

Returns the current value of the mark.

@return the current value of the mark

## AtomicMarkableReference.get(boolean[])

```java
public V get(boolean[] markHolder)
```

Returns the current values of both the reference and the mark.
Typical usage is {@code boolean[1] holder; ref = v.get(holder); }.

@param markHolder an array of size of at least one. On return,
{@code markHolder[0]} will hold the value of the mark.
@return the current value of the reference

## AtomicMarkableReference.weakCompareAndSet(V, V, boolean, boolean)

```java
public boolean weakCompareAndSet(V expectedReference, V newReference, boolean expectedMark, boolean newMark)
```

Atomically sets the value of both the reference and mark to the
given update values if the current reference is {@code ==} to
the expected reference and the current mark is equal to the
expected mark. This operation may fail spuriously and does not
provide ordering guarantees, so is only rarely an
appropriate alternative to {@code compareAndSet}.

@param expectedReference the expected value of the reference
@param newReference the new value for the reference
@param expectedMark the expected value of the mark
@param newMark the new value for the mark
@return {@code true} if successful

## AtomicMarkableReference.compareAndSet(V, V, boolean, boolean)

```java
public boolean compareAndSet(V expectedReference, V newReference, boolean expectedMark, boolean newMark)
```

Atomically sets the value of both the reference and mark
to the given update values if the
current reference is {@code ==} to the expected reference
and the current mark is equal to the expected mark.

@param expectedReference the expected value of the reference
@param newReference the new value for the reference
@param expectedMark the expected value of the mark
@param newMark the new value for the mark
@return {@code true} if successful

## AtomicMarkableReference.set(V, boolean)

```java
public void set(V newReference, boolean newMark)
```

Unconditionally sets the value of both the reference and mark.

@param newReference the new value for the reference
@param newMark the new value for the mark

## AtomicMarkableReference.attemptMark(V, boolean)

```java
public boolean attemptMark(V expectedReference, boolean newMark)
```

Atomically sets the value of the mark to the given update value
if the current reference is {@code ==} to the expected
reference.  Any given invocation of this operation may fail
(return {@code false}) spuriously, but repeated invocation
when the current value holds the expected value and no other
thread is also attempting to set the value will eventually
succeed.

@param expectedReference the expected value of the reference
@param newMark the new value for the mark
@return {@code true} if successful