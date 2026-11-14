---
title: "PriorityQueue<TElement,TPriority> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/PriorityQueue`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PriorityQueue<TElement,TPriority> class

Namespace: `System.Collections.Generic`

```csharp
public class PriorityQueue<TElement,TPriority>
```

Represents a collection of items that have a value and a priority. On dequeue, the item with the lowest priority value is removed.

Parameters:

- `TElement`: Specifies the type of elements in the queue.
- `TPriority`: Specifies the type of priority associated with enqueued elements.

#### Remarks

Implements an array-backed, quaternary min-heap. Each element is enqueued with an associated priority that determines the dequeue order. Elements with the lowest priority are dequeued first. Note that the type does not guarantee first-in-first-out semantics for elements of equal priority.

## PriorityQueue<TElement,TPriority>.PriorityQueue() constructor

```csharp
public PriorityQueue ();
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class.

To be added.

## PriorityQueue<TElement,TPriority>.PriorityQueue(IComparer<TPriority>) constructor

```csharp
public PriorityQueue (System.Collections.Generic.IComparer<TPriority>? comparer);
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class with the specified custom priority comparer.

Parameters:

- `comparer`: Custom comparer dictating the ordering of elements.
Uses `Comparer<T>.Default` if the argument is `null`.

To be added.

## PriorityQueue<TElement,TPriority>.PriorityQueue(ValueTuple<TElement,TPriority>>) constructor

```csharp
public PriorityQueue (System.Collections.Generic.IEnumerable<(TElement Element, TPriority Priority)> items);
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class that is populated with the specified elements and priorities.

Parameters:

- `items`: The pairs of elements and priorities with which to populate the queue.

Exceptions:

- `ArgumentNullException`: The specified `items` argument was `null`.

#### Remarks

Constructs the heap using a heapify operation, which is generally faster than enqueuing individual elements sequentially.

## PriorityQueue<TElement,TPriority>.PriorityQueue(Int32) constructor

```csharp
public PriorityQueue (int initialCapacity);
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class with the specified initial capacity.

Parameters:

- `initialCapacity`: Initial capacity to allocate in the underlying heap array.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `initialCapacity` was negative.

To be added.

## PriorityQueue<TElement,TPriority>.PriorityQueue(ValueTuple<TElement,TPriority>>, IComparer<TPriority>) constructor

```csharp
public PriorityQueue (System.Collections.Generic.IEnumerable<(TElement Element, TPriority Priority)> items, System.Collections.Generic.IComparer<TPriority>? comparer);
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class that is populated with the specified elements and priorities, and with the specified custom priority comparer.

Parameters:

- `items`: The pairs of elements and priorities with which to populate the queue.
- `comparer`: Custom comparer dictating the ordering of elements.
Uses `Comparer<T>.Default` if the argument is `null`.

Exceptions:

- `ArgumentNullException`: The specified `items` argument was `null`.

#### Remarks

Constructs the heap using a heapify operation, which is generally faster than enqueuing individual elements sequentially.

## PriorityQueue<TElement,TPriority>.PriorityQueue(Int32, IComparer<TPriority>) constructor

```csharp
public PriorityQueue (int initialCapacity, System.Collections.Generic.IComparer<TPriority>? comparer);
```

Initializes a new instance of the `PriorityQueue<T1,T2>` class with the specified initial capacity and custom priority comparer.

Parameters:

- `initialCapacity`: Initial capacity to allocate in the underlying heap array.
- `comparer`: Custom comparer dictating the ordering of elements.
Uses `Comparer<T>.Default` if the argument is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `initialCapacity` was negative.

To be added.

## PriorityQueue<TElement,TPriority>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total numbers of elements the queue's backing storage can hold without resizing.

Returns: To be added.

To be added.

## PriorityQueue<TElement,TPriority>.Comparer property

```csharp
public System.Collections.Generic.IComparer<TPriority> Comparer { get; }
```

Gets the priority comparer used by the `PriorityQueue<T1,T2>`.

Returns: The comparer that determines the priority of items in the queue.

To be added.

## PriorityQueue<TElement,TPriority>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `PriorityQueue<T1,T2>`.

Returns: The number of elements contained in the queue.

To be added.

## PriorityQueue<TElement,TPriority>.UnorderedItems property

```csharp
public System.Collections.Generic.PriorityQueue<TElement,TPriority>.UnorderedItemsCollection UnorderedItems { get; }
```

Gets a collection that enumerates the elements of the queue in an unordered manner.

Returns: To be added.

#### Remarks

The enumeration does not order items by priority, since that would require N * log(N) time and N space. Instead, items are enumerated following the internal array heap layout.

## PriorityQueue<TElement,TPriority>.Clear() method

```csharp
public void Clear ();
```

Removes all items from the `PriorityQueue<T1,T2>`.

To be added.

## PriorityQueue<TElement,TPriority>.Dequeue() method

```csharp
public TElement Dequeue ();
```

Removes and returns the minimal element from the `PriorityQueue<T1,T2>` - that is, the element with the lowest priority value.

Returns: The minimal element of the `PriorityQueue<T1,T2>`.

Exceptions:

- `InvalidOperationException`: The queue is empty.

To be added.

## PriorityQueue<TElement,TPriority>.DequeueEnqueue(TElement, TPriority) method

```csharp
public TElement DequeueEnqueue (TElement element, TPriority priority);
```

Removes the minimal element and then immediately adds the specified element with associated priority to the `PriorityQueue<T1,T2>`.

Parameters:

- `element`: The element to add to the `PriorityQueue<T1,T2>`.
- `priority`: The priority with which to associate the new element.

Returns: The minimal element removed before performing the enqueue operation.

Exceptions:

- `InvalidOperationException`: The queue is empty.

Implements an extract-then-insert heap operation that is generally more efficient than sequencing Dequeue and Enqueue operations: in the worst case scenario only one shift-down operation is required.

## PriorityQueue<TElement,TPriority>.Enqueue(TElement, TPriority) method

```csharp
public void Enqueue (TElement element, TPriority priority);
```

Adds the specified element with associated priority to the `PriorityQueue<T1,T2>`.

Parameters:

- `element`: The element to add to the `PriorityQueue<T1,T2>`.
- `priority`: The priority with which to associate the new element.

To be added.

## PriorityQueue<TElement,TPriority>.EnqueueDequeue(TElement, TPriority) method

```csharp
public TElement EnqueueDequeue (TElement element, TPriority priority);
```

Adds the specified element with associated priority to the `PriorityQueue<T1,T2>`, and immediately removes the minimal element, returning the result.

Parameters:

- `element`: The element to add to the `PriorityQueue<T1,T2>`.
- `priority`: The priority with which to associate the new element.

Returns: The minimal element removed after the enqueue operation.

#### Remarks

Implements an insert-then-extract heap operation that's generally more efficient than sequencing enqueue and dequeue operations.

## PriorityQueue<TElement,TPriority>.EnqueueRange(ValueTuple<TElement,TPriority>>) method

```csharp
public void EnqueueRange (System.Collections.Generic.IEnumerable<(TElement Element, TPriority Priority)> items);
```

Enqueues a sequence of element-priority pairs to the `PriorityQueue<T1,T2>`.

Parameters:

- `items`: The pairs of elements and priorities to add to the queue.

Exceptions:

- `ArgumentNullException`: The specified `items` argument was `null`.

To be added.

## PriorityQueue<TElement,TPriority>.EnqueueRange(IEnumerable<TElement>, TPriority) method

```csharp
public void EnqueueRange (System.Collections.Generic.IEnumerable<TElement> elements, TPriority priority);
```

Enqueues a sequence of elements pairs to the `PriorityQueue<T1,T2>`, all associated with the specified priority.

Parameters:

- `elements`: The elements to add to the queue.
- `priority`: The priority to associate with the new elements.

Exceptions:

- `ArgumentNullException`: The specified `elements` argument was `null`.

To be added.

## PriorityQueue<TElement,TPriority>.EnsureCapacity(Int32) method

```csharp
public int EnsureCapacity (int capacity);
```

Ensures that the `PriorityQueue<T1,T2>` can hold up to `capacity` items without further expansion of its backing storage.

Parameters:

- `capacity`: The minimum capacity to be used.

Returns: The current capacity of the `PriorityQueue<T1,T2>`.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `capacity` is negative.

To be added.

## PriorityQueue<TElement,TPriority>.Peek() method

```csharp
public TElement Peek ();
```

Returns the minimal element from the `PriorityQueue<T1,T2>` without removing it.

Returns: The minimal element of the `PriorityQueue<T1,T2>`.

Exceptions:

- `InvalidOperationException`: The `PriorityQueue<T1,T2>` is empty.

To be added.

## PriorityQueue<TElement,TPriority>.Remove(TElement, TElement, TPriority, IEqualityComparer<TElement>) method

```csharp
public bool Remove (TElement element, out TElement removedElement, out TPriority priority, System.Collections.Generic.IEqualityComparer<TElement>? equalityComparer = default);
```

Removes the first occurrence that equals the specified parameter.

Parameters:

- `element`: The element to try to remove.
- `removedElement`: The actual element that got removed from the queue.
- `priority`: The priority value associated with the removed element.
- `equalityComparer`: The equality comparer governing element equality.

Returns: `true` if matching entry was found and removed, `false` otherwise.

The method performs a linear-time scan of every element in the heap, removing the first value found to match the `element` parameter.

In case of duplicate entries, what entry does get removed is non-deterministic and does not take priority into account.

If no `equalityComparer` is specified, `EqualityComparer<T>.Default` will be used instead.

## PriorityQueue<TElement,TPriority>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity to the actual number of items in the `PriorityQueue<T1,T2>`, if that is less than 90 percent of current capacity.

#### Remarks

This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection.

## PriorityQueue<TElement,TPriority>.TryDequeue(TElement, TPriority) method

```csharp
public bool TryDequeue (out TElement element, out TPriority priority);
```

Removes the minimal element from the `PriorityQueue<T1,T2>`, and copies it and its associated priority to the `element` and `priority` arguments.

Parameters:

- `element`: When this method returns, contains the removed element.
- `priority`: When this method returns, contains the priority associated with the removed element.

Returns: `true` if the element is successfully removed; `false` if the `PriorityQueue<T1,T2>` is empty.

To be added.

## PriorityQueue<TElement,TPriority>.TryPeek(TElement, TPriority) method

```csharp
public bool TryPeek (out TElement element, out TPriority priority);
```

Returns a value that indicates whether there is a minimal element in the `PriorityQueue<T1,T2>`, and if one is present, copies it and its associated priority to the `element` and `priority` arguments. The element is not removed from the `PriorityQueue<T1,T2>`.

Parameters:

- `element`: When this method returns, contains the minimal element in the queue.
- `priority`: When this method returns, contains the priority associated with the minimal element.

Returns: `true` if there is a minimal element; `false` if the `PriorityQueue<T1,T2>` is empty.

To be added.
