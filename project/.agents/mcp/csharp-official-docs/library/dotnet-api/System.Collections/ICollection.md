---
title: "ICollection interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ICollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICollection interface

Namespace: `System.Collections`

```csharp
public interface ICollection : System.Collections.IEnumerable
```

Defines size, enumerators, and synchronization methods for all nongeneric collections.

#### Remarks

The `ICollection` interface is the base interface for classes in the `Collections` namespace. Its generic equivalent is the `ICollection<T>` interface.

The `ICollection` interface extends `IEnumerable`; `IDictionary` and `IList` are more specialized interfaces that extend `ICollection`. An `IDictionary` implementation is a collection of key/value pairs, like the `Hashtable` class. An `IList` implementation is a collection of values and its members can be accessed by index, like the `ArrayList` class.

Some collections that limit access to their elements, such as the `Queue` class and the `Stack` class, directly implement the `ICollection` interface.

If neither the `IDictionary` interface nor the `IList` interface meet the requirements of the required collection, derive the new collection class from the `ICollection` interface instead for more flexibility.

For the generic version of this interface, see `ICollection<T>`.

## ICollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ICollection`.

Returns: The number of elements contained in the `ICollection`.

To be added.

## ICollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks
`ICollection.SyncRoot` returns an object, which can be used to synchronize access to the `ICollection`.

Most collection classes in the `Collections` namespace also implement a Synchronized method, which provides a synchronized wrapper around the underlying collection.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ICollection/IsSynchronized/remarks.cs._

## ICollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks
For collections whose underlying store is not publicly available, the expected implementation is to return the current instance. Note that the pointer to the current instance might not be sufficient for collections that wrap other collections; those should return the underlying collection's `SyncRoot` property.

Most collection classes in the `Collections` namespace also implement a `Synchronized` method, which provides a synchronized wrapper around the underlying collection. However, derived classes can provide their own synchronized version of the collection using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` property of the collection, not directly on the collection. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the collection instance.

In the absence of a `Synchronized` method on a collection, the expected usage for `ICollection.SyncRoot` looks as follows:

_Code sample not included: ~/snippets/csharp/System.Collections/ICollection/IsSynchronized/remarks.cs._

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ICollection/IsSynchronized/remarks.cs._

## ICollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

To be added.
