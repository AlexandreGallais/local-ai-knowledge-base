---
title: "ArraySegment<T> struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArraySegment`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArraySegment<T> struct (part 2 of 2)

## ArraySegment<T>.Slice(Int32, Int32) method

```csharp
public ArraySegment<T> Slice (int index, int count);
```

Forms a slice of the specified length out of the current array segment starting at the specified index.

Parameters:

- `index`: The index at which to begin the slice.
- `count`: The desired length of the slice.

Returns: An array segment of `count` elements starting at `index`.

Exceptions:

- `InvalidOperationException`: The underlying array of this instance is `null`.
- `ArgumentOutOfRangeException`: `index` is greater than the length of the underlying array of this instance.

-or-

`count` is greater than the length of the underlying array of this instance - `index`.

To be added.

## ArraySegment<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to add to the array segment.

Exceptions:

- `NotSupportedException`: In all cases.

This method always throws a `NotSupportedException` because an array segment cannot be expanded.

## ArraySegment<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Throws a `NotSupportedException` exception in all cases.

Exceptions:

- `NotSupportedException`: In all cases.

This method always throws a `NotSupportedException` because an array segment cannot be contracted.

## ArraySegment<T>.System.Collections.Generic.ICollection<T>.Contains(T) method

```csharp
bool ICollection<T>.Contains (T item);
```

Determines whether the array segment contains a specific value.

Parameters:

- `item`: The object to locate in the array segment.

Returns: `true` if `item` is found in the array segment; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The underlying array is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `ICollection<T>` interface.

## ArraySegment<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `item`: The object to remove from the array segment.

Returns: Always throws an exception.

Exceptions:

- `NotSupportedException`: In all cases.

This method always throws a `NotSupportedException` because an array segment cannot be contracted.

## ArraySegment<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the array segment.

Returns: An enumerator that can be used to iterate through the array segment.

Exceptions:

- `InvalidOperationException`: The underlying array is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `IEnumerable<T>` interface.

## ArraySegment<T>.System.Collections.Generic.IList<T>.IndexOf(T) method

```csharp
int IList<T>.IndexOf (T item);
```

Determines the index of a specific item in the array segment.

Parameters:

- `item`: The object to locate in the array segment.

Returns: The index of `item` if found in the list; otherwise, -1.

Exceptions:

- `InvalidOperationException`: The underlying array is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `IList<T>` interface.

## ArraySegment<T>.System.Collections.Generic.IList<T>.Insert(Int32, T) method

```csharp
void IList<T>.Insert (int index, T item);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the array segment.

Exceptions:

- `NotSupportedException`: In all cases.

This method always throws a `NotSupportedException` because an array segment cannot be expanded.

## ArraySegment<T>.System.Collections.Generic.IList<T>.RemoveAt(Int32) method

```csharp
void IList<T>.RemoveAt (int index);
```

Throws a `NotSupportedException` exception in all cases.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: In all cases.

This method always throws a `NotSupportedException` because an array segment cannot be contracted.

## ArraySegment<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through an array segment.

Returns: An enumerator that can be used to iterate through the array segment.

Exceptions:

- `InvalidOperationException`: The underlying array is `null`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `IEnumerable` interface.

## ArraySegment<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the contents of this array segment into a new array.

Returns: An array containing the data in the current array segment.

Exceptions:

- `InvalidOperationException`: `default(ArraySegment<T>)` cannot be converted to an array.

To be added.
