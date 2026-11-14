---
title: "IProducerConsumerCollection<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/IProducerConsumerCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IProducerConsumerCollection<T> interface

Namespace: `System.Collections.Concurrent`

```csharp
public interface IProducerConsumerCollection<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.ICollection
```

Defines methods to manipulate thread-safe collections intended for producer/consumer usage. This interface provides a unified representation for producer/consumer collections so that higher level abstractions such as `BlockingCollection<T>` can use the collection as the underlying storage mechanism.

Parameters:

- `T`: Specifies the type of elements in the collection.

#### Remarks
For more information, see Thread-Safe Collections and BlockingCollection Overview.

#### Examples
The following example shows a stack data structure that implements `IProducerConsumerCollection<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/IProducerConsumerCollectionT/Overview/iprodcon.cs._

## IProducerConsumerCollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the elements of the `IProducerConsumerCollection<T>` to an `Array`, starting at a specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `IProducerConsumerCollection<T>`.

The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `index` is equal to or greater than the length of the `array` -or- The number of elements in the collection is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
The method provides a snapshot of the underlying collection. It is possible for other threads to add or remove items immediately after the copy is made.

## IProducerConsumerCollection<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the elements contained in the `IProducerConsumerCollection<T>` to a new array.

Returns: A new array containing the elements copied from the `IProducerConsumerCollection<T>`.

#### Remarks
The method provides a snapshot of the underlying collection. It is possible for other threads to add or remove items immediately after the array is made.

## IProducerConsumerCollection<T>.TryAdd(T) method

```csharp
public bool TryAdd (T item);
```

Attempts to add an object to the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: The object to add to the `IProducerConsumerCollection<T>`.

Returns: `true` if the object was added successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `item` was invalid for this collection.

To be added.

## IProducerConsumerCollection<T>.TryTake(T) method

```csharp
public bool TryTake (out T item);
```

Attempts to remove and return an object from the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: When this method returns, if the object was removed and returned successfully, `item` contains the removed object. If no object was available to be removed, the value is unspecified.

Returns: `true` if an object was removed and returned successfully; otherwise, `false`.

To be added.
