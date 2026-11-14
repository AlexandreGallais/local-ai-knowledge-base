---
title: "ICollection<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/ICollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICollection<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface ICollection<T> : System.Collections.Generic.IEnumerable<T>
```

Defines methods to manipulate generic collections.

Parameters:

- `T`: The type of the elements in the collection.

#### Remarks
The `ICollection<T>` interface is the base interface for classes in the `Generic` namespace.

The `ICollection<T>` interface extends `IEnumerable<T>`; `IDictionary<T1,T2>` and `IList<T>` are more specialized interfaces that extend `ICollection<T>`. A `IDictionary<T1,T2>` implementation is a collection of key/value pairs, like the `Dictionary<T1,T2>` class. A `IList<T>` implementation is a collection of values, and its members can be accessed by index, like the `List<T>` class.

If neither the `IDictionary<T1,T2>` interface nor the `IList<T>` interface meet the requirements of the required collection, derive the new collection class from the `ICollection<T>` interface instead for more flexibility.

#### Examples
The following example implements the `ICollection<T>` interface to create a collection of custom `Box` objects named `BoxCollection`. Each `Box` has height, length, and width properties, which are used to define equality. Equality can be defined as all dimensions being the same or the volume being the same. The `Box` class implements the `IEquatable<T>` interface to define the default equality as the dimensions being the same.

The `BoxCollection` class implements the `ICollection<T>.Contains` method to use the default equality to determine whether a `Box` is in the collection. This method is used by the `ICollection<T>.Add` method so that each `Box` added to the collection has a unique set of dimensions. The `BoxCollection` class also provides an overload of the  `ICollection<T>.Contains` method that takes a specified `EqualityComparer<T>` object, such as `BoxSameDimensions` and `BoxSameVol` classes in the example.

This example also implements an `IEnumerator<T>` interface for the `BoxCollection` class so that the collection can be enumerated.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ICollectionT/Overview/program.cs._

## ICollection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ICollection<T>`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## ICollection<T>.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks
A collection that is read-only does not allow the addition or removal of elements after the collection is created. Note that read-only in this context does not indicate whether individual elements of the collection can be modified, since the `ICollection<T>` interface only supports addition and removal operations. For example, the `IsReadOnly` property of an array that is cast or converted to an `ICollection<T>` object returns `true`, even though individual array elements can be modified.

## ICollection<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: The `ICollection<T>` is read-only.

To be added.

## ICollection<T>.Clear() method

```csharp
public void Clear ();
```

Removes all items from the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: The `ICollection<T>` is read-only.

#### Remarks
`ICollection<T>.Count` must be set to 0, and references to other objects from elements of the collection must be released.

## ICollection<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

#### Remarks

Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Default`, whereas `Dictionary<T1,T2>` allows the user to specify the `IEqualityComparer<T>` implementation to use for comparing keys.

## ICollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than 0.
- `ArgumentException`: The number of elements in the source `ICollection<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

To be added.

## ICollection<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

Exceptions:

- `NotSupportedException`: The `ICollection<T>` is read-only.

#### Remarks

Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Default`, whereas, `Dictionary<T1,T2>` allows the user to specify the `IEqualityComparer<T>` implementation to use for comparing keys.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.
