---
title: "BlockingDeque interface (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/BlockingDeque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BlockingDeque interface (java.util.concurrent) (part 2 of 2)

## BlockingDeque.offer(E, long, TimeUnit)

```java
boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque), waiting up to the
specified wait time if necessary for space to become available.

This method is equivalent to
offerLast.

Parameters:

- `e`: the element to add

**Returns:** `true` if the element was added to this deque, else
        `false`

Throws:

- `InterruptedException`: (inherited documentation)
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## BlockingDeque.remove()

```java
E remove()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque).
This method differs from poll() only in that it
throws an exception if this deque is empty.

This method is equivalent to removeFirst.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## BlockingDeque.poll()

```java
E poll()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), or returns
`null` if this deque is empty.

This method is equivalent to `pollFirst()`.

**Returns:** the head of this deque, or `null` if this deque is empty

## BlockingDeque.take()

```java
E take() throws InterruptedException
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), waiting if
necessary until an element becomes available.

This method is equivalent to takeFirst.

**Returns:** the head of this deque

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.poll(long, TimeUnit)

```java
E poll(long timeout, TimeUnit unit) throws InterruptedException
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), waiting up to the
specified wait time if necessary for an element to become available.

This method is equivalent to
pollFirst.

**Returns:** the head of this deque, or `null` if the
        specified waiting time elapses before an element is available

Throws:

- `InterruptedException`: if interrupted while waiting

## BlockingDeque.element()

```java
E element()
```

Retrieves, but does not remove, the head of the queue represented by
this deque (in other words, the first element of this deque).
This method differs from peek only in that it throws an
exception if this deque is empty.

This method is equivalent to getFirst.

**Returns:** the head of this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## BlockingDeque.peek()

```java
E peek()
```

Retrieves, but does not remove, the head of the queue represented by
this deque (in other words, the first element of this deque), or
returns `null` if this deque is empty.

This method is equivalent to peekFirst.

**Returns:** the head of this deque, or `null` if this deque is empty

## BlockingDeque.remove(Object)

```java
boolean remove(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`o.equals(e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

This method is equivalent to
removeFirstOccurrence.

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if this deque changed as a result of the call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null (optional)

## BlockingDeque.contains(Object)

```java
boolean contains(Object o)
```

Returns `true` if this deque contains the specified element.
More formally, returns `true` if and only if this deque contains
at least one element `e` such that `o.equals(e)`.

Parameters:

- `o`: object to be checked for containment in this deque

**Returns:** `true` if this deque contains the specified element

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null (optional)

## BlockingDeque.size()

```java
int size()
```

Returns the number of elements in this deque.

**Returns:** the number of elements in this deque

## BlockingDeque.iterator()

```java
Iterator<E> iterator()
```

Returns an iterator over the elements in this deque in proper sequence.
The elements will be returned in order from first (head) to last (tail).

**Returns:** an iterator over the elements in this deque in proper sequence

## BlockingDeque.push(E)

```java
void push(E e)
```

Pushes an element onto the stack represented by this deque (in other
words, at the head of this deque) if it is possible to do so
immediately without violating capacity restrictions, throwing an
`IllegalStateException` if no space is currently available.

This method is equivalent to addFirst.

Throws:

- `IllegalStateException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: if the specified element is null
- `IllegalArgumentException`: (inherited documentation)
