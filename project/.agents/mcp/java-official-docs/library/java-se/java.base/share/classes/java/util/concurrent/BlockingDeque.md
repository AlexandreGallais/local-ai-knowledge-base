---
title: "BlockingDeque interface (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/BlockingDeque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BlockingDeque interface (java.util.concurrent)

```java
public interface BlockingDeque<E> extends BlockingQueue<E>, Deque<E>
```

A `Deque` that additionally supports blocking operations that wait
for the deque to become non-empty when retrieving an element, and wait for
space to become available in the deque when storing an element.

`BlockingDeque` methods come in four forms, with different ways
of handling operations that cannot be satisfied immediately, but may be
satisfied at some point in the future:
one throws an exception, the second returns a special value (either
`null` or `false`, depending on the operation), the third
blocks the current thread indefinitely until the operation can succeed,
and the fourth blocks for only a given maximum time limit before giving
up.  These methods are summarized in the following table:

Summary of BlockingDeque methods

    First Element (Head)

   Throws exception
   Special value
   Blocks
   Times out

   Insert
   addFirst(e)
   offerFirst(e)
   putFirst(e)
   long, TimeUnit) offerFirst(e, time, unit)

   Remove
   removeFirst()
   pollFirst()
   takeFirst()
   TimeUnit) pollFirst(time, unit)

   Examine
   getFirst()
   peekFirst()
   not applicable
   not applicable

    Last Element (Tail)

   Throws exception
   Special value
   Blocks
   Times out

   Insert
   addLast(e)
   offerLast(e)
   putLast(e)
   long, TimeUnit) offerLast(e, time, unit)

   Remove
   removeLast()
   pollLast()
   takeLast()
   TimeUnit) pollLast(time, unit)

   Examine
   getLast()
   peekLast()
   not applicable
   not applicable

Like any `BlockingQueue`, a `BlockingDeque` is thread safe,
does not permit null elements, and may (or may not) be
capacity-constrained.

A `BlockingDeque` implementation may be used directly as a FIFO
`BlockingQueue`. The methods inherited from the
`BlockingQueue` interface are precisely equivalent to
`BlockingDeque` methods as indicated in the following table:

Comparison of BlockingQueue and BlockingDeque methods

    `BlockingQueue` Method
    Equivalent `BlockingDeque` Method

   Insert
   add(e)
   addLast(e)

   offer(e)
   offerLast(e)

   put(e)
   putLast(e)

   long, TimeUnit) offer(e, time, unit)
   long, TimeUnit) offerLast(e, time, unit)

   Remove
   remove()
   removeFirst()

   poll()
   pollFirst()

   take()
   takeFirst()

   TimeUnit) poll(time, unit)
   TimeUnit) pollFirst(time, unit)

   Examine
   element()
   getFirst()

   peek()
   peekFirst()

Memory consistency effects: As with other concurrent
collections, actions in a thread prior to placing an object into a
`BlockingDeque`
*happen-before*
actions subsequent to the access or removal of that element from
the `BlockingDeque` in another thread.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this deque

**Since:** 1.6

## BlockingDeque.addFirst(E)

```java
void addFirst(E e)
```

Inserts the specified element at the front of this deque if it is
possible to do so immediately without violating capacity restrictions,
throwing an `IllegalStateException` if no space is currently
available.  When using a capacity-restricted deque, it is generally
preferable to use offerFirst.

Parameters:

- `e`: the element to add

Throws:

- `IllegalStateException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: (inherited documentation)

## BlockingDeque.addLast(E)

```java
void addLast(E e)
```

Inserts the specified element at the end of this deque if it is
possible to do so immediately without violating capacity restrictions,
throwing an `IllegalStateException` if no space is currently
available.  When using a capacity-restricted deque, it is generally
preferable to use offerLast.

Parameters:

- `e`: the element to add

Throws:

- `IllegalStateException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: (inherited documentation)

## BlockingDeque.offerFirst(E)

```java
boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque if it is
possible to do so immediately without violating capacity restrictions,
returning `true` upon success and `false` if no space is
currently available.
When using a capacity-restricted deque, this method is generally
preferable to the addFirst method, which can
fail to insert an element only by throwing an exception.

Parameters:

- `e`: the element to add

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: (inherited documentation)

## BlockingDeque.offerLast(E)

```java
boolean offerLast(E e)
```

Inserts the specified element at the end of this deque if it is
possible to do so immediately without violating capacity restrictions,
returning `true` upon success and `false` if no space is
currently available.
When using a capacity-restricted deque, this method is generally
preferable to the addLast method, which can
fail to insert an element only by throwing an exception.

Parameters:

- `e`: the element to add

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: (inherited documentation)

## BlockingDeque.putFirst(E)

```java
void putFirst(E e) throws InterruptedException
```

Inserts the specified element at the front of this deque,
waiting if necessary for space to become available.

Parameters:

- `e`: the element to add

Throws:

- `InterruptedException`: if interrupted while waiting
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.putLast(E)

```java
void putLast(E e) throws InterruptedException
```

Inserts the specified element at the end of this deque,
waiting if necessary for space to become available.

Parameters:

- `e`: the element to add

Throws:

- `InterruptedException`: if interrupted while waiting
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.offerFirst(E, long, TimeUnit)

```java
boolean offerFirst(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element at the front of this deque,
waiting up to the specified wait time if necessary for space to
become available.

Parameters:

- `e`: the element to add
- `timeout`: how long to wait before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** `true` if successful, or `false` if
        the specified waiting time elapses before space is available

Throws:

- `InterruptedException`: if interrupted while waiting
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.offerLast(E, long, TimeUnit)

```java
boolean offerLast(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element at the end of this deque,
waiting up to the specified wait time if necessary for space to
become available.

Parameters:

- `e`: the element to add
- `timeout`: how long to wait before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** `true` if successful, or `false` if
        the specified waiting time elapses before space is available

Throws:

- `InterruptedException`: if interrupted while waiting
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.takeFirst()

```java
E takeFirst() throws InterruptedException
```

Retrieves and removes the first element of this deque, waiting
if necessary until an element becomes available.

**Returns:** the head of this deque

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.takeLast()

```java
E takeLast() throws InterruptedException
```

Retrieves and removes the last element of this deque, waiting
if necessary until an element becomes available.

**Returns:** the tail of this deque

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.pollFirst(long, TimeUnit)

```java
E pollFirst(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the first element of this deque, waiting
up to the specified wait time if necessary for an element to
become available.

Parameters:

- `timeout`: how long to wait before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** the head of this deque, or `null` if the specified
        waiting time elapses before an element is available

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.pollLast(long, TimeUnit)

```java
E pollLast(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the last element of this deque, waiting
up to the specified wait time if necessary for an element to
become available.

Parameters:

- `timeout`: how long to wait before giving up, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** the tail of this deque, or `null` if the specified
        waiting time elapses before an element is available

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.removeFirstOccurrence(Object)

```java
boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null (optional)

## BlockingDeque.removeLastOccurrence(Object)

```java
boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the last element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null (optional)

## BlockingDeque.add(E)

```java
boolean add(E e)
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque) if it is possible to do so
immediately without violating capacity restrictions, returning
`true` upon success and throwing an
`IllegalStateException` if no space is currently available.
When using a capacity-restricted deque, it is generally preferable to
use offer.

This method is equivalent to addLast.

Parameters:

- `e`: the element to add

Throws:

- `IllegalStateException`: (inherited documentation)
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.offer(E)

```java
boolean offer(E e)
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque) if it is possible to do so
immediately without violating capacity restrictions, returning
`true` upon success and `false` if no space is currently
available.  When using a capacity-restricted deque, this method is
generally preferable to the `add` method, which can fail to
insert an element only by throwing an exception.

This method is equivalent to offerLast.

Parameters:

- `e`: the element to add

Throws:

- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.put(E)

```java
void put(E e) throws InterruptedException
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque), waiting if necessary for
space to become available.

This method is equivalent to putLast.

Parameters:

- `e`: the element to add

Throws:

- `InterruptedException`: (inherited documentation)
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque
