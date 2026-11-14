---
title: "AbstractQueue class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractQueue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractQueue class (java.util)

```java
public abstract class AbstractQueue<E> extends AbstractCollection<E> implements Queue<E>
```

This class provides skeletal implementations of some `Queue`
operations. The implementations in this class are appropriate when
the base implementation does *not* allow `null`
elements.  Methods add, remove, and
element are based on offer, poll, and peek, respectively, but throw
exceptions instead of indicating failure via `false` or
`null` returns.

A `Queue` implementation that extends this class must
minimally define a method `Queue.offer` which does not permit
insertion of `null` elements, along with methods `Queue.peek`, `Queue.poll`, `Collection.size`, and
`Collection.iterator`.  Typically, additional methods will be
overridden as well.  If these requirements cannot be met, consider
instead subclassing `AbstractCollection`.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this queue

**Since:** 1.5

## AbstractQueue.AbstractQueue()

```java
protected AbstractQueue()
```

Constructor for use by subclasses.

## AbstractQueue.add(E)

```java
public boolean add(E e)
```

Inserts the specified element into this queue if it is possible to do so
immediately without violating capacity restrictions, returning
`true` upon success and throwing an `IllegalStateException`
if no space is currently available.

This implementation returns `true` if `offer` succeeds,
else throws an `IllegalStateException`.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `IllegalStateException`: if the element cannot be added at this time due to capacity restrictions
- `ClassCastException`: if the class of the specified element prevents it from being added to this queue
- `NullPointerException`: if the specified element is null and this queue does not permit null elements
- `IllegalArgumentException`: if some property of this element prevents it from being added to this queue

## AbstractQueue.remove()

```java
public E remove()
```

Retrieves and removes the head of this queue.  This method differs
from poll only in that it throws an exception if this
queue is empty.

This implementation returns the result of `poll`
unless the queue is empty.

**Returns:** the head of this queue

Throws:

- `NoSuchElementException`: if this queue is empty

## AbstractQueue.element()

```java
public E element()
```

Retrieves, but does not remove, the head of this queue.  This method
differs from peek only in that it throws an exception if
this queue is empty.

This implementation returns the result of `peek`
unless the queue is empty.

**Returns:** the head of this queue

Throws:

- `NoSuchElementException`: if this queue is empty

## AbstractQueue.clear()

```java
public void clear()
```

Removes all of the elements from this queue.
The queue will be empty after this call returns.

This implementation repeatedly invokes poll until it
returns `null`.

## AbstractQueue.addAll(Collection<? extends E>)

```java
public boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection to this
queue.  Attempts to addAll of a queue to itself result in
`IllegalArgumentException`. Further, the behavior of
this operation is undefined if the specified collection is
modified while the operation is in progress.

This implementation iterates over the specified collection,
and adds each element returned by the iterator to this
queue, in turn.  A runtime exception encountered while
trying to add an element (including, in particular, a
`null` element) may result in only some of the elements
having been successfully added when the associated exception is
thrown.

Parameters:

- `c`: collection containing elements to be added to this queue

**Returns:** `true` if this queue changed as a result of the call

**See also:** #add(Object)

Throws:

- `ClassCastException`: if the class of an element of the specified collection prevents it from being added to this queue
- `NullPointerException`: if the specified collection contains a null element and this queue does not permit null elements, or if the specified collection is null
- `IllegalArgumentException`: if some property of an element of the specified collection prevents it from being added to this queue, or if the specified collection is this queue
- `IllegalStateException`: if not all the elements can be added at this time due to insertion restrictions
