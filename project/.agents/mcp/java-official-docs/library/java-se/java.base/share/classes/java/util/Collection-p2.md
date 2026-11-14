---
title: "Collection interface (java.util) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collection interface (java.util) (part 2 of 3)

## Collection.toArray(T[])

```java
<T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this collection;
the runtime type of the returned array is that of the specified array.
If the collection fits in the specified array, it is returned therein.
Otherwise, a new array is allocated with the runtime type of the
specified array and the size of this collection.

If this collection fits in the specified array with room to spare
(i.e., the array has more elements than this collection), the element
in the array immediately following the end of the collection is set to
`null`.  (This is useful in determining the length of this
collection *only* if the caller knows that this collection does
not contain any `null` elements.)

If this collection makes any guarantees as to what order its elements
are returned by its iterator, this method must return the elements in
the same order.

Parameters:

- `<T>`: the component type of the array to contain the collection
- `a`: the array into which the elements of this collection are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**API note:** This method acts as a bridge between array-based and collection-based APIs.
It allows an existing array to be reused under certain circumstances.
Use `toArray()` to create an array whose runtime type is `Object[]`,
or use `toArray(IntFunction)` to control the runtime type of
the array.

Suppose `x` is a collection known to contain only strings.
The following code can be used to dump the collection into a previously
allocated `String` array:

```java
    String[] y = new String[SIZE];
    ...
    y = x.toArray(y);
```

The return value is reassigned to the variable `y`, because a
new array will be allocated and returned if the collection `x` has
too many elements to fit into the existing array `y`.

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

**Returns:** an array containing all of the elements in this collection

Throws:

- `ArrayStoreException`: if the runtime type of any element in this collection is not assignable to the runtime component type of the specified array
- `NullPointerException`: if the specified array is null

## Collection.toArray(IntFunction<T[]>)

```java
default <T> T[] toArray(IntFunction<T[]> generator)
```

Returns an array containing all of the elements in this collection,
using the provided `generator` function to allocate the returned array.

If this collection makes any guarantees as to what order its elements
are returned by its iterator, this method must return the elements in
the same order.

Parameters:

- `<T>`: the component type of the array to contain the collection
- `generator`: a function which produces a new array of the desired type and the provided length

**API note:** This method acts as a bridge between array-based and collection-based APIs.
It allows creation of an array of a particular runtime type. Use
`toArray()` to create an array whose runtime type is `Object[]`,
or use toArray(T[]) to reuse an existing array.

Suppose `x` is a collection known to contain only strings.
The following code can be used to dump the collection into a newly
allocated array of `String`:

```java
    String[] y = x.toArray(String[]::new);
```

**Implementation requirements:** The default implementation calls the generator function with zero
and then passes the resulting array to toArray(T[]).

**Returns:** an array containing all of the elements in this collection

**Since:** 11

Throws:

- `ArrayStoreException`: if the runtime type of any element in this collection is not assignable to the runtime component type of the generated array
- `NullPointerException`: if the generator function is null

## Collection.add(E)

```java
boolean add(E e)
```

Ensures that this collection contains the specified element (optional
operation).  Returns `true` if this collection changed as a
result of the call.  (Returns `false` if this collection does
not permit duplicates and already contains the specified element.)

Collections that support this operation may place limitations on what
elements may be added to this collection.  In particular, some
collections will refuse to add `null` elements, and others will
impose restrictions on the type of elements that may be added.
Collection classes should clearly specify in their documentation any
restrictions on what elements may be added.

If a collection refuses to add a particular element for any reason
other than that it already contains the element, it *must* throw
an exception (rather than returning `false`).  This preserves
the invariant that a collection always contains the specified element
after this call returns.

Parameters:

- `e`: element whose presence in this collection is to be ensured

**Returns:** `true` if this collection changed as a result of the
        call

Throws:

- `UnsupportedOperationException`: if the `add` operation is not supported by this collection
- `ClassCastException`: if the class of the specified element prevents it from being added to this collection
- `NullPointerException`: if the specified element is null and this collection does not permit null elements
- `IllegalArgumentException`: if some property of the element prevents it from being added to this collection
- `IllegalStateException`: if the element cannot be added at this time due to insertion restrictions

## Collection.remove(Object)

```java
boolean remove(Object o)
```

Removes a single instance of the specified element from this
collection, if it is present (optional operation).  More formally,
removes an element `e` such that
`Objects.equals(o, e)`, if
this collection contains one or more such elements.  Returns
`true` if this collection contained the specified element (or
equivalently, if this collection changed as a result of the call).

Parameters:

- `o`: element to be removed from this collection, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the type of the specified element is incompatible with this collection (optional)
- `NullPointerException`: if the specified element is null and this collection does not permit null elements (optional)
- `UnsupportedOperationException`: if the `remove` operation is not supported by this collection

## Collection.containsAll(Collection<?>)

```java
boolean containsAll(Collection<?> c)
```

Returns `true` if this collection contains all of the elements
in the specified collection.

Parameters:

- `c`: collection to be checked for containment in this collection

**Returns:** `true` if this collection contains all of the elements
        in the specified collection

**See also:** #contains(Object)

Throws:

- `ClassCastException`: if the types of one or more elements in the specified collection are incompatible with this collection (optional)
- `NullPointerException`: if the specified collection contains one or more null elements and this collection does not permit null elements (optional) or if the specified collection is null.

## Collection.addAll(Collection<? extends E>)

```java
boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection to this collection
(optional operation).  The behavior of this operation is undefined if
the specified collection is modified while the operation is in progress.
(This implies that the behavior of this call is undefined if the
specified collection is this collection, and this collection is
nonempty.) If the specified collection has a defined
encounter order,
processing of its elements generally occurs in that order.

Parameters:

- `c`: collection containing elements to be added to this collection

**Returns:** `true` if this collection changed as a result of the call

**See also:** #add(Object)

Throws:

- `UnsupportedOperationException`: if the `addAll` operation is not supported by this collection
- `ClassCastException`: if the class of an element of the specified collection prevents it from being added to this collection
- `NullPointerException`: if the specified collection contains a null element and this collection does not permit null elements, or if the specified collection is null
- `IllegalArgumentException`: if some property of an element of the specified collection prevents it from being added to this collection
- `IllegalStateException`: if not all the elements can be added at this time due to insertion restrictions

## Collection.removeAll(Collection<?>)

```java
boolean removeAll(Collection<?> c)
```

Removes all of this collection's elements that are also contained in the
specified collection (optional operation).  After this call returns,
this collection will contain no elements in common with the specified
collection.

Parameters:

- `c`: collection containing elements to be removed from this collection

**Returns:** `true` if this collection changed as a result of the
        call

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: if the `removeAll` operation is not supported by this collection
- `ClassCastException`: if the types of one or more elements in this collection are incompatible with the specified collection (optional)
- `NullPointerException`: if this collection contains one or more null elements and the specified collection does not support null elements (optional) or if the specified collection is null

## Collection.removeIf(Predicate<? super E>)

```java
default boolean removeIf(Predicate<? super E> filter)
```

Removes all of the elements of this collection that satisfy the given
predicate (optional operation).  Errors or runtime exceptions thrown during
iteration or by the predicate are relayed to the caller.

Parameters:

- `filter`: a predicate which returns `true` for elements to be removed

**Implementation requirements:** The default implementation traverses all elements of the collection using
its `iterator`.  Each matching element is removed using
`Iterator.remove()`.  If the collection's iterator does not
support removal then an `UnsupportedOperationException` will be
thrown on the first matching element.

**Returns:** `true` if any elements were removed

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified filter is null
- `UnsupportedOperationException`: if the `removeIf` operation is not supported by this collection

## Collection.retainAll(Collection<?>)

```java
boolean retainAll(Collection<?> c)
```

Retains only the elements in this collection that are contained in the
specified collection (optional operation).  In other words, removes from
this collection all of its elements that are not contained in the
specified collection.

Parameters:

- `c`: collection containing elements to be retained in this collection

**Returns:** `true` if this collection changed as a result of the call

**See also:** #remove(Object)

**See also:** #contains(Object)

Throws:

- `UnsupportedOperationException`: if the `retainAll` operation is not supported by this collection
- `ClassCastException`: if the types of one or more elements in this collection are incompatible with the specified collection (optional)
- `NullPointerException`: if this collection contains one or more null elements and the specified collection does not permit null elements (optional) or if the specified collection is null

## Collection.clear()

```java
void clear()
```

Removes all of the elements from this collection (optional operation).
The collection will be empty after this method returns.

Throws:

- `UnsupportedOperationException`: if the `clear` operation is not supported by this collection

## Collection.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this collection for equality.

While the `Collection` interface adds no stipulations to the
general contract for the `Object.equals`, programmers who
implement the `Collection` interface "directly" (in other words,
create a class that is a `Collection` but is not a `Set`
or a `List`) must exercise care if they choose to override the
`Object.equals`.  It is not necessary to do so, and the simplest
course of action is to rely on `Object`'s implementation, but
the implementor may wish to implement a "value comparison" in place of
the default "reference comparison."  (The `List` and
`Set` interfaces mandate such value comparisons.)

The general contract for the `Object.equals` method states that
equals must be symmetric (in other words, `a.equals(b)` if and
only if `b.equals(a)`).  The contracts for `List.equals`
and `Set.equals` state that lists are only equal to other lists,
and sets to other sets.  Thus, a custom `equals` method for a
collection class that implements neither the `List` nor
`Set` interface must return `false` when this collection
is compared to any list or set.  (By the same logic, it is not possible
to write a class that correctly implements both the `Set` and
`List` interfaces.)

Parameters:

- `o`: object to be compared for equality with this collection

**Returns:** `true` if the specified object is equal to this
collection

**See also:** Object#equals(Object)

**See also:** Set#equals(Object)

**See also:** List#equals(Object)

## Collection.hashCode()

```java
int hashCode()
```

Returns the hash code value for this collection.  While the
`Collection` interface adds no stipulations to the general
contract for the `Object.hashCode` method, programmers should
take note that any class that overrides the `Object.equals`
method must also override the `Object.hashCode` method in order
to satisfy the general contract for the `Object.hashCode` method.
In particular, `c1.equals(c2)` implies that
`c1.hashCode()==c2.hashCode()`.

**Returns:** the hash code value for this collection

**See also:** Object#hashCode()

**See also:** Object#equals(Object)
