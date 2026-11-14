---
title: "ImmutableArray<T> struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableArray`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArray<T> struct

Namespace: `System.Collections.Immutable`

```csharp
public readonly struct ImmutableArray<T> : IEquatable<System.Collections.Immutable.ImmutableArray<T>>, System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList, System.Collections.Immutable.IImmutableList<T>, System.Collections.IStructuralComparable, System.Collections.IStructuralEquatable
```

Represents an array that is immutable, meaning it can't be changed once it's created.

Parameters:

- `T`: The type of element stored by the array.

#### Remarks
There are different scenarios best for `ImmutableArray<T>` and others best for `ImmutableList<T>`.

Reasons to use immutable array:

- Updating the data is rare or the number of elements is quite small (less than 16 items)
- You need to be able to iterate over the data in performance critical sections
- You have many instances of immutable collections and you can't afford keeping the data in trees

Reasons to use immutable list:

- Updating the data is common or the number of elements isn't expected to be small
- Updating the collection is more performance critical than iterating the contents

The following table summarizes the performance characteristics of `ImmutableArray<T>`

| Operation | ImmutableArray complexity | ImmutableList complexity | Comments |
| --------- | ------------------------- | ------------------------ | -------- |
| `Item`    | O(1)                      | O(log n)                 | Directly index into the underlying array |
| `Add()`   | O(n)                      | O(log n)                 | Requires creating a new array |

#### Examples
This example shows how to create an immutable array and iterate over elements in it:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableArray`1/Overview/ImmutableArraySnippets.cs._
This example shows how to create a new immutable array by adding and removing items from the original array:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableArray`1/Overview/ImmutableArraySnippets.cs._
This example shows how to create an immutable array using `Builder`:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableArray`1/Overview/ImmutableArraySnippets.cs._
## ImmutableArray<T>.IsDefault property

```csharp
public bool IsDefault { get; }
```

Gets a value indicating whether this array was declared but not initialized.

Returns: `true` if the `ImmutableArray<T>` is `null`; otherwise, `false`.

To be added.

## ImmutableArray<T>.IsDefaultOrEmpty property

```csharp
public bool IsDefaultOrEmpty { get; }
```

Gets a value indicating whether this `ImmutableArray<T>` is empty or is not initialized.

Returns: `true` if the `ImmutableArray<T>` is `null` or `ImmutableArray<T>.Empty`; otherwise, `false`.

To be added.

## ImmutableArray<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value indicating whether this `ImmutableArray<T>` is empty.

Returns: `true` if the `ImmutableArray<T>` is empty; otherwise, `false`.

To be added.

## ImmutableArray<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element at the specified index in the immutable array.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index in the immutable array.

To be added.

## ImmutableArray<T>.Length property

```csharp
public int Length { get; }
```

Gets the number of elements in the array.

Returns: The number of elements in the array.

To be added.

## ImmutableArray<T>.System.Collections.Generic.ICollection<T>.Count property

```csharp
int System.Collections.Generic.ICollection<T>.Count { get; }
```

Gets the number of items in the collection.

Returns: Number of items in the collection.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether this instance is read only.

Returns: `true` if this instance is read only; otherwise, `false`.

To be added.

## ImmutableArray<T>.System.Collections.Generic.IList<T>.Item property

```csharp
T System.Collections.Generic.IList<T>.Item[int index] { get; set; }
```

Gets or sets the element at the specified index in the read-only list.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index in the read-only list.

Exceptions:

- `NotSupportedException`: Always thrown from the setter.
- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.System.Collections.Generic.IReadOnlyCollection<T>.Count property

```csharp
int System.Collections.Generic.IReadOnlyCollection<T>.Count { get; }
```

Gets the number of items in the collection.

Returns: The number of items in the collection.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.System.Collections.Generic.IReadOnlyList<T>.Item property

```csharp
T System.Collections.Generic.IReadOnlyList<T>.Item[int index] { get; }
```

Gets the element at the specified index.

Parameters:

- `index`: The index.

Returns: The element.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

Gets the size of the array.

Returns: The number of items in the collection.

Exceptions:

- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

See the `ICollection` interface. Always returns `true` since since immutable collections are thread-safe.

Returns: Boolean value determining whether the collection is thread-safe.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection` interface.

## ImmutableArray<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets the sync root.

Returns: An object for synchronizing access to the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `ICollection` interface.

## ImmutableArray<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether this instance is fixed size.

Returns: `true` if this instance is fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IList` interface.

## ImmutableArray<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether this instance is read only.

Returns: `true` if this instance is read only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableArray<T>` instance is cast to an `IList` interface.

## ImmutableArray<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the `Object` at the specified index.

Parameters:

- `index`: The index.

Returns: The object at the specified index.

Exceptions:

- `NotSupportedException`: Always thrown from the setter.
- `InvalidOperationException`: The `ImmutableArray<T>.IsDefault` property returns `true`.

To be added.

## ImmutableArray<T>.Add(T) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> Add (T item);
```

Returns a copy of the original array with the specified item added to the end.

Parameters:

- `item`: The item to be added to the end of the array.

Returns: A new array with the specified item added to the end.

To be added.

## ImmutableArray<T>.AddRange(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (System.Collections.Generic.IEnumerable<T> items);
```

Returns a copy of the original array with the specified elements added to the end of the array.

Parameters:

- `items`: The elements to add to the array.

Returns: A new array with the elements added.

To be added.

## ImmutableArray<T>.AddRange(ImmutableArray<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (System.Collections.Immutable.ImmutableArray<T> items);
```

Returns a copy of the original array with the specified elements added to the end of the array.

Parameters:

- `items`: The elements to add to the array.

Returns: A new array with the elements added.

To be added.

## ImmutableArray<T>.AddRange(ReadOnlySpan<T>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (scoped ReadOnlySpan<T> items);
```

Adds the specified values to this list.

Parameters:

- `items`: The values to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.AddRange(T[]) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (params T[] items);
```

Adds the specified values to this list.

Parameters:

- `items`: The values to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.AddRange(ImmutableArray<T>, Int32) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (System.Collections.Immutable.ImmutableArray<T> items, int length);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The values to add.
- `length`: The number of elements from the source array to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.AddRange(T[], Int32) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange (T[] items, int length);
```

Adds the specified items to the end of the array.

Parameters:

- `items`: The values to add.
- `length`: The number of elements from the source array to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.AddRange<TDerived>(ImmutableArray<TDerived>) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange<TDerived> (System.Collections.Immutable.ImmutableArray<TDerived> items) where TDerived : T;
```

Adds the specified items to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The values to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.AddRange<TDerived>(TDerived[]) method

```csharp
public System.Collections.Immutable.ImmutableArray<T> AddRange<TDerived> (TDerived[] items) where TDerived : T;
```

Adds the specified items to the end of the array.

Parameters:

- `TDerived`: The type that derives from the type of item already in the array.
- `items`: The values to add.

Returns: A new list with the elements added.

To be added.

## ImmutableArray<T>.As<TOther>() method

```csharp
public System.Collections.Immutable.ImmutableArray<TOther> As<TOther> () where TOther : class;
```

Returns a new immutable array that contains the elements of this array cast to a different type.

Parameters:

- `TOther`: The type of array element to return.

Returns: An immutable array that contains the elements of this array, cast to a different type. If the cast fails, returns an array whose `ImmutableArray<T>.IsDefault` property returns `true`.

#### Remarks
Arrays of derived elements types can be cast to arrays of base element types without reallocating the array.

Upcasts of element created with the `ImmutableArray.Create` method can be reversed using the `ImmutableArray<T>.As` method. However, a downcast is only successful when it reverses a prior upcast. operation.

## ImmutableArray<T>.AsMemory() method

```csharp
public ReadOnlyMemory<T> AsMemory ();
```

Creates a new read-only memory region over this immutable array.

Returns: The read-only memory representation of this immutable array.

To be added.

## ImmutableArray<T>.AsSpan() method

```csharp
public ReadOnlySpan<T> AsSpan ();
```

Creates a new read-only span over this immutable array.

Returns: The read-only span representation of this immutable array.

To be added.

## ImmutableArray<T>.AsSpan(Range) method

```csharp
public ReadOnlySpan<T> AsSpan (Range range);
```

Creates a span over the portion of the current `ImmutableArray<T>` based on the specified `range`.

Parameters:

- `range`: A range in the current `ImmutableArray<T>`.

Returns: A span representation of the `ImmutableArray<T>`.

To be added.

## ImmutableArray<T>.AsSpan(Int32, Int32) method

```csharp
public ReadOnlySpan<T> AsSpan (int start, int length);
```

Creates a `ReadOnlySpan<T>` over the portion of the current `ImmutableArray<T>`, beginning at a specified position for a specified length.

Parameters:

- `start`: The index at which to begin the span.
- `length`: The number of items in the span.

Returns: The `ReadOnlySpan<T>` representation of the `ImmutableArray<T>`.

To be added.

## ImmutableArray<T>.CastArray<TOther>() method

```csharp
public System.Collections.Immutable.ImmutableArray<TOther> CastArray<TOther> () where TOther : class;
```

Initializes a new instance of the `ImmutableArray<T>` struct by casting the underlying array to an array of type `TOther`.

Parameters:

- `TOther`: The type of array element to return.

Returns: An immutable array instance with elements cast to the new type.

Exceptions:

- `InvalidCastException`: The cast is illegal.

To be added.
