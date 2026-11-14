---
title: "CopyOnWriteArraySet class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CopyOnWriteArraySet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CopyOnWriteArraySet class (java.util.concurrent)

```java
public class CopyOnWriteArraySet<E> extends AbstractSet<E> implements java.io.Serializable
```

A `Set` that uses an internal `CopyOnWriteArrayList`
for all of its operations.  Thus, it shares the same basic <example-value>:

- It is best suited for applications in which set sizes generally
      stay small, read-only operations
      vastly outnumber mutative operations, and you need
      to prevent interference among threads during traversal.

- It is thread-safe.

- Mutative operations (`add`, `set`, `remove`, etc.)
     are expensive since they usually entail copying the entire underlying
     array.

- Iterators do not support the mutative `remove` operation.

- Traversal via iterators is fast and cannot encounter
     interference from other threads. Iterators rely on
     unchanging snapshots of the array at the time the iterators were
     constructed.

**Sample Usage.** The following code sketch uses a
copy-on-write set to maintain a set of Handler objects that
perform some action upon state updates.

```java
class Handler { void handle() { ... } }

class X {
  private final CopyOnWriteArraySet<Handler> handlers
    = new CopyOnWriteArraySet<>();
  public void addHandler(Handler h) { handlers.add(h); }

  private long internalState;
  private synchronized void changeState() { internalState = ...; }

  public void update() {
    changeState();
    for (Handler handler : handlers)
      handler.handle();
  }
}
```

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this set

**See also:** CopyOnWriteArrayList

**Since:** 1.5

## CopyOnWriteArraySet.CopyOnWriteArraySet()

```java
public CopyOnWriteArraySet()
```

Creates an empty set.

## CopyOnWriteArraySet.CopyOnWriteArraySet(Collection<? extends E>)

```java
public CopyOnWriteArraySet(Collection<? extends E> c)
```

Creates a set containing all of the elements of the specified
collection.

Parameters:

- `c`: the collection of elements to initially contain

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArraySet.size()

```java
public int size()
```

Returns the number of elements in this set.

**Returns:** the number of elements in this set

## CopyOnWriteArraySet.isEmpty()

```java
public boolean isEmpty()
```

Returns `true` if this set contains no elements.

**Returns:** `true` if this set contains no elements

## CopyOnWriteArraySet.contains(Object)

```java
public boolean contains(Object o)
```

Returns `true` if this set contains the specified element.
More formally, returns `true` if and only if this set
contains an element `e` such that `Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this set is to be tested

**Returns:** `true` if this set contains the specified element

## CopyOnWriteArraySet.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this set.
If this set makes any guarantees as to what order its elements
are returned by its iterator, this method must return the
elements in the same order.

The returned array will be "safe" in that no references to it
are maintained by this set.  (In other words, this method must
allocate a new array even if this set is backed by an array).
The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all the elements in this set

## CopyOnWriteArraySet.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this set; the
runtime type of the returned array is that of the specified array.
If the set fits in the specified array, it is returned therein.
Otherwise, a new array is allocated with the runtime type of the
specified array and the size of this set.

If this set fits in the specified array with room to spare
(i.e., the array has more elements than this set), the element in
the array immediately following the end of the set is set to
`null`.  (This is useful in determining the length of this
set *only* if the caller knows that this set does not contain
any null elements.)

If this set makes any guarantees as to what order its elements
are returned by its iterator, this method must return the elements
in the same order.

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a set known to contain only strings.
The following code can be used to dump the set into a newly allocated
array of `String`:

```java
String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of this set are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing all the elements in this set

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this set
- `NullPointerException`: if the specified array is null

## CopyOnWriteArraySet.clear()

```java
public void clear()
```

Removes all of the elements from this set.
The set will be empty after this call returns.

## CopyOnWriteArraySet.remove(Object)

```java
public boolean remove(Object o)
```

Removes the specified element from this set if it is present.
More formally, removes an element `e` such that
`Objects.equals(o, e)`, if this set contains such an element.
Returns `true` if this set contained the element (or
equivalently, if this set changed as a result of the call).
(This set will not contain the element once the call returns.)

Parameters:

- `o`: object to be removed from this set, if present

**Returns:** `true` if this set contained the specified element

## CopyOnWriteArraySet.add(E)

```java
public boolean add(E e)
```

Adds the specified element to this set if it is not already present.
More formally, adds the specified element `e` to this set if
the set contains no element `e2` such that
`Objects.equals(e, e2)`.
If this set already contains the element, the call leaves the set
unchanged and returns `false`.

Parameters:

- `e`: element to be added to this set

**Returns:** `true` if this set did not already contain the specified
        element

## CopyOnWriteArraySet.containsAll(Collection<?>)

```java
public boolean containsAll(Collection<?> c)
```

Returns `true` if this set contains all of the elements of the
specified collection.  If the specified collection is also a set, this
method returns `true` if it is a *subset* of this set.

Parameters:

- `c`: collection to be checked for containment in this set

**Returns:** `true` if this set contains all of the elements of the
        specified collection

**See also:** #contains(Object)

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArraySet.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection to this set if
they're not already present.  If the specified collection is also a
set, the `addAll` operation effectively modifies this set so
that its value is the *union* of the two sets.  The behavior of
this operation is undefined if the specified collection is modified
while the operation is in progress.

Parameters:

- `c`: collection containing elements to be added to this set

**Returns:** `true` if this set changed as a result of the call

**See also:** #add(Object)

Throws:

- `NullPointerException`: if the specified collection is null

## CopyOnWriteArraySet.removeAll(Collection<?>)

```java
public boolean removeAll(Collection<?> c)
```

Removes from this set all of its elements that are contained in the
specified collection.  If the specified collection is also a set,
this operation effectively modifies this set so that its value is the
*asymmetric set difference* of the two sets.

Parameters:

- `c`: collection containing elements to be removed from this set

**Returns:** `true` if this set changed as a result of the call

**See also:** #remove(Object)

Throws:

- `ClassCastException`: if the class of an element of this set is incompatible with the specified collection (optional)
- `NullPointerException`: if this set contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## CopyOnWriteArraySet.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Retains only the elements in this set that are contained in the
specified collection.  In other words, removes from this set all of
its elements that are not contained in the specified collection.  If
the specified collection is also a set, this operation effectively
modifies this set so that its value is the *intersection* of the
two sets.

Parameters:

- `c`: collection containing elements to be retained in this set

**Returns:** `true` if this set changed as a result of the call

**See also:** #remove(Object)

Throws:

- `ClassCastException`: if the class of an element of this set is incompatible with the specified collection (optional)
- `NullPointerException`: if this set contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## CopyOnWriteArraySet.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements contained in this set
in the order in which these elements were added.

The returned iterator provides a snapshot of the state of the set
when the iterator was constructed. No synchronization is needed while
traversing the iterator. The iterator does *NOT* support the
`remove` method.

**Returns:** an iterator over the elements in this set

## CopyOnWriteArraySet.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this set for equality.
Returns `true` if the specified object is the same object
as this object, or if it is also a `Set` and the elements
returned by an iterator over the
specified set are the same as the elements returned by an
iterator over this set.  More formally, the two iterators are
considered to return the same elements if they return the same
number of elements and for every element `e1` returned by
the iterator over the specified set, there is an element
`e2` returned by the iterator over this set such that
`Objects.equals(e1, e2)`.

Parameters:

- `o`: object to be compared for equality with this set

**Returns:** `true` if the specified object is equal to this set

## CopyOnWriteArraySet.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## CopyOnWriteArraySet.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## CopyOnWriteArraySet.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this set in the order
in which these elements were added.

The `Spliterator` reports `Spliterator.IMMUTABLE`,
`Spliterator.DISTINCT`, `Spliterator.SIZED`, and
`Spliterator.SUBSIZED`.

The spliterator provides a snapshot of the state of the set
when the spliterator was constructed. No synchronization is needed while
operating on the spliterator.

**Returns:** a `Spliterator` over the elements in this set

**Since:** 1.8
