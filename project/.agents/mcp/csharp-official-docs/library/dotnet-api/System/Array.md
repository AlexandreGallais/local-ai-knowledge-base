---
title: "Array class (part 1 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class

Namespace: `System`

```csharp
public abstract class Array : ICloneable, System.Collections.IList, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable
```

Provides methods for creating, manipulating, searching, and sorting arrays, thereby serving as the base class for all arrays in the common language runtime.

#### Remarks
The `Array` class is not part of the `Collections` namespaces. However, it is still considered a collection because it is based on the `IList` interface.

The `Array` class is the base class for language implementations that support arrays. However, only the system and compilers can derive explicitly from the `Array` class. Users should employ the array constructs provided by the language.

An element is a value in an `Array`. The length of an `Array` is the total number of elements it can contain. The lower bound of an `Array` is the index of its first element. An `Array` can have any lower bound, but it has a lower bound of zero by default. A different lower bound can be defined when creating an instance of the `Array` class using `Array.CreateInstance`. A multidimensional `Array` can have different bounds for each dimension. An array can have a maximum of 32 dimensions.

Unlike the classes in the `Collections` namespaces, `Array` has a fixed capacity. To increase the capacity, you must create a new `Array` object with the required capacity, copy the elements from the old `Array` object to the new one, and delete the old `Array`.

| The array size is limited to a total of 4 billion elements, and to a maximum index of 0X7FEFFFFF in any given dimension (0X7FFFFFC7 for byte arrays and arrays of single-byte structures).

Single-dimensional arrays implement the `IList<T>`, `ICollection<T>`, `IEnumerable<T>`, `IReadOnlyList<T>`, and `IReadOnlyCollection<T>` generic interfaces. The implementations are provided to arrays at runtime, and as a result, the generic interfaces do not appear in the declaration syntax for the `Array` class. In addition, there are no reference topics for interface members that are accessible only by casting an array to the generic interface type (explicit interface implementations). The key thing to be aware of when you cast an array to one of these interfaces is that members that add, insert, or remove elements throw `NotSupportedException`.

`Type` objects provide information about array type declarations. `Array` objects with the same array type share the same `Type` object.

`Type.IsArray` and `Type.GetElementType` might not return the expected results with `Array` because if an array is cast to the type `Array`, the result is an object, not an array. That is, `typeof(System.Array).IsArray` returns `false`, and `typeof(System.Array).GetElementType` returns `null`.

The `Array.Copy` method copies elements not only between arrays of the same type but also between standard arrays of different types; it handles type casting automatically.

Some methods, such as `Array.CreateInstance`, `Array.Copy`, `Array.CopyTo`, `Array.GetValue`, and `Array.SetValue`, provide overloads that accept 64-bit integers as parameters to accommodate large capacity arrays. `Array.LongLength` and `Array.GetLongLength` return 64-bit integers indicating the length of the array.

The `Array` is not guaranteed to be sorted.  You must sort the `Array` prior to performing operations (such as `Array.BinarySearch`) that require the `Array` to be sorted.

Using an `Array` object of pointers in native code is not supported and will throw a `NotSupportedException` for several methods.

#### Examples

The following code example shows how `Array.Copy` copies elements between an array of type integer and an array of type `Object`.

_Code sample not included: ~/snippets/csharp/System/Array/Overview/source.cs._

The following code example creates and initializes an `Array` and displays its properties and its elements.

_Code sample not included: ~/snippets/csharp/System/Array/Overview/source3.cs._

## Array.IsFixedSize property

```csharp
public bool IsFixedSize { get; }
```

Gets a value indicating whether the `Array` has a fixed size.

Returns: This property is always `true` for all arrays.

#### Remarks
`Array` implements the `IsFixedSize` property because it is required by the `IList` interface.

An array with a fixed size does not allow the addition or removal of elements after the array is created, but it allows the modification of existing elements.

Retrieving the value of this property is an O(1) operation.

## Array.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `Array` is read-only.

Returns: This property is always `false` for all arrays.

#### Remarks
`Array` implements the `IsReadOnly` property because it is required by the `IList` interface. An array that is read-only does not allow the addition, removal, or modification of elements after the array is created.

If you require a read-only collection, use a `Collections` class that implements the `IList` interface.

If you cast or convert an array to an `IList` interface object, the `IsReadOnly` property returns `false`. However, if you cast or convert an array to a `IList<T>` interface, the `IsReadOnly` property returns `true`.

Retrieving the value of this property is an O(1) operation.

## Array.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `Array` is synchronized (thread safe).

Returns: This property is always `false` for all arrays.

#### Remarks
`Array` implements the `IsSynchronized` property because it is required by the `ICollection` interface.

.NET classes based on `Array` provide their own synchronized version of the collection using the `SyncRoot` property.

Classes that use arrays can also implement their own synchronization using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` of the collection, not directly on the collection. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the collection. Note that some implementations of `Array.SyncRoot` might return the `Array` itself.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to lock an array during the entire enumeration by using the `SyncRoot` property.

_Code sample not included: ~/snippets/csharp/System/Array/IsSynchronized/source.cs._

## Array.Length property

```csharp
public int Length { get; }
```

Gets the total number of elements in all the dimensions of the `Array`.

Returns: The total number of elements in all the dimensions of the `Array`; zero if there are no elements in the array.

Exceptions:

- `OverflowException`: The array is multidimensional and contains more than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following example uses the `Length` property to get the total number of elements in an array. It also uses the `Array.GetUpperBound` method to determine the number of elements in each dimension of a multidimensional array.

_Code sample not included: ~/snippets/csharp/System/Array/Length/length1.cs._

## Array.LongLength property

```csharp
public long LongLength { get; }
```

Gets a 64-bit integer that represents the total number of elements in all the dimensions of the `Array`.

Returns: A 64-bit integer that represents the total number of elements in all the dimensions of the `Array`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## Array.MaxLength property

```csharp
public static int MaxLength { get; }
```

Gets the maximum number of elements that may be contained in an array.

Returns: The maximum count of elements allowed in any array.

#### Remarks

This property represents a runtime limitation, the maximum number of elements (not bytes)
the runtime will allow in an array. There is no guarantee that an allocation under this length
will succeed, but all attempts to allocate a larger array will fail.

This property only applies to single-dimension, zero-bound (SZ) arrays.
`Length` property may return larger value than this property for multi-dimensional arrays.

## Array.Rank property

```csharp
public int Rank { get; }
```

Gets the rank (number of dimensions) of the `Array`. For example, a one-dimensional array returns 1, a two-dimensional array returns 2, and so on.

Returns: The rank (number of dimensions) of the `Array`.

#### Remarks
For example, the following code creates an array of three dimensions with a `Rank` property whose value is 3.

```vb
Dim TDArray(0,0,0) As Integer
```

```csharp
int[,,] TDArray = new int[1,1,1];
```

A jagged array (an array of arrays) is a one-dimensional array; the value of its `Rank` property is 1.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following example initializes a one-dimensional array, a two-dimensional array, and a jagged array, and retrieves the `Rank` property of each.

_Code sample not included: ~/snippets/csharp/System/Array/Rank/rank1.cs._

## Array.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `Array`.

Returns: An object that can be used to synchronize access to the `Array`.

#### Remarks

This property implements the `ICollection` interface.

.NET classes based on `Array` provide their own synchronized version of the collection using the `SyncRoot` property.

Classes that use arrays can also implement their own synchronization using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` of the collection, not directly on the collection. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the collection. Note that some implementations of `Array.SyncRoot` might return the `Array` itself.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to lock an array during the entire enumeration by using the `SyncRoot` property.

_Code sample not included: ~/snippets/csharp/System/Array/IsSynchronized/source.cs._

## Array.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

Gets the number of elements contained in the `Array`.

Returns: The number of elements contained in the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `ICollection` interface.

## Array.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `ICollection.Count`.
- `ArgumentException`: The current `Array` does not have exactly one dimension.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Array` instance is cast to an `IList` interface.

## Array.AsReadOnly<T>(T[]) method

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<T> AsReadOnly<T> (T[] array);
```

Returns a read-only wrapper for the specified array.

Parameters:

- `T`: The type of the elements of the array.
- `array`: The one-dimensional, zero-based array to wrap in a read-only `ReadOnlyCollection<T>` wrapper.

Returns: A read-only `ReadOnlyCollection<T>` wrapper for the specified array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
To prevent any modifications to the array, expose the array only through this wrapper.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

This method is an O(1) operation.

#### Examples
The following example wraps an array in a read-only `ReadOnlyCollection<T>`.

_Code sample not included: ~/snippets/csharp/System/Array/AsReadOnlyT/arrayasreadonly.cs._
