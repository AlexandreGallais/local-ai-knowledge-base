---
title: "LinkedList<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/LinkedList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LinkedList<T> class

Namespace: `System.Collections.Generic`

```csharp
public class LinkedList<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a doubly linked list.

Parameters:

- `T`: Specifies the element type of the linked list.

#### Remarks
`LinkedList<T>` is a general-purpose linked list. It supports enumerators and implements the `ICollection` interface, consistent with other collection classes in .NET.

`LinkedList<T>` provides separate nodes of type `LinkedListNode<T>`, so insertion and removal are O(1) operations.

You can remove nodes and reinsert them, either in the same list or in another list, which results in no additional objects allocated on the heap. Because the list also maintains an internal count, getting the `Count` property is an O(1) operation.

Each node in a `LinkedList<T>` object is of the type `LinkedListNode<T>`. Because the `LinkedList<T>` is doubly linked, each node points forward to the `LinkedListNode<T>.Next` node and backward to the `LinkedListNode<T>.Previous` node.

Lists that contain reference types perform better when a node and its value are created at the same time. `LinkedList<T>` accepts `null` as a valid `Value` property for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the `LinkedList<T>.First` and `LinkedList<T>.Last` properties contain `null`.

The `LinkedList<T>` class does not support chaining, splitting, cycles, or other features that can leave the list in an inconsistent state. The list remains consistent on a single thread. The only multithreaded scenario supported by `LinkedList<T>` is multithreaded read operations.

#### Examples
The following code example demonstrates many features of the `LinkedList<T>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListT/Overview/source.cs._

## LinkedList<T>.LinkedList() constructor

```csharp
public LinkedList ();
```

Initializes a new instance of the `LinkedList<T>` class that is empty.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the `LinkedList<T>.First` and `LinkedList<T>.Last` properties contain `null`.

This constructor is an O(1) operation.

#### Examples
The following code example creates and initializes a `LinkedList<T>` of type `String`, adds several nodes, and then displays its contents.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListT/.ctor/llctor.cs._

## LinkedList<T>.LinkedList(IEnumerable<T>) constructor

```csharp
public LinkedList (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `LinkedList<T>` class that contains elements copied from the specified `IEnumerable` and has sufficient capacity to accommodate the number of elements copied.

Parameters:

- `collection`: The `IEnumerable` whose elements are copied to the new `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If `collection` has no elements then the new `LinkedList<T>` is empty, and the `LinkedList<T>.First` and `LinkedList<T>.Last` properties contain `null`.

This constructor is an O(n) operation, where `n` is the number of elements in `collection`.

#### Examples
For an example that includes this constructor, see the `LinkedList<T>` class.

## LinkedList<T>.LinkedList(SerializationInfo, StreamingContext) constructor

```csharp
protected LinkedList (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `LinkedList<T>` class that is serializable with the specified `SerializationInfo` and `StreamingContext`.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `LinkedList<T>`.
- `context`: A `StreamingContext` object containing the source and destination of the serialized stream associated with the `LinkedList<T>`.

To be added.

## LinkedList<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of nodes actually contained in the `LinkedList<T>`.

Returns: The number of nodes actually contained in the `LinkedList<T>`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
For an example that includes this property, see the `LinkedList<T>` class.

## LinkedList<T>.First property

```csharp
public System.Collections.Generic.LinkedListNode<T>? First { get; }
```

Gets the first node of the `LinkedList<T>`.

Returns: The first `LinkedListNode<T>` of the `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the `LinkedList<T>.First` and `LinkedList<T>.Last` properties contain `null`.

Retrieving the value of this property is an O(1) operation.

#### Examples
For an example that includes this property, see the `LinkedList<T>` class.

## LinkedList<T>.Last property

```csharp
public System.Collections.Generic.LinkedListNode<T>? Last { get; }
```

Gets the last node of the `LinkedList<T>`.

Returns: The last `LinkedListNode<T>` of the `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the `LinkedList<T>.First` and `LinkedList<T>.Last` properties contain `null`.

Retrieving the value of this property is an O(1) operation.

#### Examples
For an example that includes this property, see the `LinkedList<T>` class.

## LinkedList<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `LinkedList<T>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## LinkedList<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `LinkedList<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## LinkedList<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `LinkedList<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot) {
   // Access the collection.
}
```

```vb
Dim ic As ICollection = ...
SyncLock ic.SyncRoot
   ' Access the collection.
End SyncLock
```

Retrieving the value of this property is an O(1) operation.

## LinkedList<T>.AddAfter(LinkedListNode<T>, LinkedListNode<T>) method

```csharp
public void AddAfter (System.Collections.Generic.LinkedListNode<T> node, System.Collections.Generic.LinkedListNode<T> newNode);
```

Adds the specified new node after the specified existing node in the `LinkedList<T>`.

Parameters:

- `node`: The `LinkedListNode<T>` after which to insert `newNode`.
- `newNode`: The new `LinkedListNode<T>` to add to the `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.

-or-

`newNode` is `null`.
- `InvalidOperationException`: `node` is not in the current `LinkedList<T>`.

-or-

`newNode` belongs to another `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddAfter(LinkedListNode<T>, T) method

```csharp
public System.Collections.Generic.LinkedListNode<T> AddAfter (System.Collections.Generic.LinkedListNode<T> node, T value);
```

Adds a new node containing the specified value after the specified existing node in the `LinkedList<T>`.

Parameters:

- `node`: The `LinkedListNode<T>` after which to insert a new `LinkedListNode<T>` containing `value`.
- `value`: The value to add to the `LinkedList<T>`.

Returns: The new `LinkedListNode<T>` containing `value`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.
- `InvalidOperationException`: `node` is not in the current `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddBefore(LinkedListNode<T>, LinkedListNode<T>) method

```csharp
public void AddBefore (System.Collections.Generic.LinkedListNode<T> node, System.Collections.Generic.LinkedListNode<T> newNode);
```

Adds the specified new node before the specified existing node in the `LinkedList<T>`.

Parameters:

- `node`: The `LinkedListNode<T>` before which to insert `newNode`.
- `newNode`: The new `LinkedListNode<T>` to add to the `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.

-or-

`newNode` is `null`.
- `InvalidOperationException`: `node` is not in the current `LinkedList<T>`.

-or-

`newNode` belongs to another `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddBefore(LinkedListNode<T>, T) method

```csharp
public System.Collections.Generic.LinkedListNode<T> AddBefore (System.Collections.Generic.LinkedListNode<T> node, T value);
```

Adds a new node containing the specified value before the specified existing node in the `LinkedList<T>`.

Parameters:

- `node`: The `LinkedListNode<T>` before which to insert a new `LinkedListNode<T>` containing `value`.
- `value`: The value to add to the `LinkedList<T>`.

Returns: The new `LinkedListNode<T>` containing `value`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.
- `InvalidOperationException`: `node` is not in the current `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddFirst(LinkedListNode<T>) method

```csharp
public void AddFirst (System.Collections.Generic.LinkedListNode<T> node);
```

Adds the specified new node at the start of the `LinkedList<T>`.

Parameters:

- `node`: The new `LinkedListNode<T>` to add at the start of the `LinkedList<T>`.

Exceptions:

- `ArgumentNullException`: `node` is `null`.
- `InvalidOperationException`: `node` belongs to another `LinkedList<T>`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the new node becomes the `LinkedList<T>.First` and the `LinkedList<T>.Last`.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.

## LinkedList<T>.AddFirst(T) method

```csharp
public System.Collections.Generic.LinkedListNode<T> AddFirst (T value);
```

Adds a new node containing the specified value at the start of the `LinkedList<T>`.

Parameters:

- `value`: The value to add at the start of the `LinkedList<T>`.

Returns: The new `LinkedListNode<T>` containing `value`.

#### Remarks
`LinkedList<T>` accepts `null` as a valid `LinkedListNode<T>.Value` for reference types and allows duplicate values.

If the `LinkedList<T>` is empty, the new node becomes the `LinkedList<T>.First` and the `LinkedList<T>.Last`.

This method is an O(1) operation.

#### Examples
For an example that includes this method, see the `LinkedList<T>` class.
