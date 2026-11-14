---
title: "ArraySegment<T> struct (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArraySegment`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArraySegment<T> struct

Namespace: `System`

```csharp
public readonly struct ArraySegment<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>
```

Delimits a section of a one-dimensional array.

Parameters:

- `T`: The type of the elements in the array segment.

#### Remarks
`ArraySegment<T>` is a wrapper around an array that delimits a range of elements in that array. Multiple `ArraySegment<T>` instances can refer to the same original array and can overlap. The original array must be one-dimensional and must have zero-based indexing.

The `ArraySegment<T>` structure is useful whenever the elements of an array will be manipulated in distinct segments. For example:

- You can pass an `ArraySegment<T>` object that represents only a portion of an array as an argument to a method, rather than call a relatively expensive method like `Array.Copy` to pass a copy of a portion of an array.

- In a multithreaded app, you can use the `ArraySegment<T>` structure to have each thread operate on only a portion of the array.

- For task-based asynchronous operations, you can use an `ArraySegment<T>` object to ensure that each task operates on a distinct segment of the array. The following example divides an array into individual segments with up to ten elements. Each element in the segment is multiplied by its segment number. The result shows that using the `ArraySegment<T>` class to manipulate elements in this way changes the values of its underlying array.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/segmentexample.cs._

Note, however, that although the `ArraySegment<T>` structure can be used to divide an array into distinct segments, the segments are not completely independent of one another. The `Array` property returns the entire original array, not a copy of the array; therefore, changes made to the array returned by the `Array` property are made to the original array. If this is undesirable, you should perform operations on a copy of the array, rather than an `ArraySegment<T>` object that represents a portion of the array.

The `ArraySegment<T>.Equals` method and the equality and inequality operators test for reference equality when they compare two `ArraySegment<T>` objects. For two `ArraySegment<T>` objects to be considered equal, they must meet all of the following conditions:

- Reference the same array.
- Begin at the same index in the array.
- Have the same number of elements.

If you want to retrieve an element by its index in the `ArraySegment<T>` object, you must cast it to an `IList<T>` object and retrieve it or modify it by using the `IList<T>.Item` property. Note that this is not necessary in F#. The following example retrieves the element in an `ArraySegment<T>` object that delimits a section of a string array.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/example1.cs._

#### Examples
The following code example passes an `ArraySegment<T>` structure to a method.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/arraysegment.cs._

## ArraySegment<T>.ArraySegment(T[]) constructor

```csharp
public ArraySegment (T[] array);
```

Initializes a new instance of the `ArraySegment<T>` structure that delimits all the elements in the specified array.

Parameters:

- `array`: The array to wrap.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
This constructor creates an `ArraySegment<T>` that delimits all the elements of `array`. That is, the `Offset` property of the `ArraySegment<T>` is 0 and its `Count` property is the length of `array`. To create an `ArraySegment<T>` that delimits only part of an array, use the `%23ctor` constructor.

The original array must be one-dimensional and must have zero-based indexing.

Multiple `ArraySegment<T>` instances can refer to the same original array and can overlap.

## ArraySegment<T>.ArraySegment(T[], Int32, Int32) constructor

```csharp
public ArraySegment (T[] array, int offset, int count);
```

Initializes a new instance of the `ArraySegment<T>` structure that delimits the specified range of the elements in the specified array.

Parameters:

- `array`: The array containing the range of elements to delimit.
- `offset`: The zero-based index of the first element in the range.
- `count`: The number of elements in the range.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than 0.
- `ArgumentException`: `offset` and `count` do not specify a valid range in `array`.

#### Remarks
The original array must be one-dimensional and must have zero-based indexing.

Multiple `ArraySegment<T>` instances can refer to the same original array and can overlap.

## ArraySegment<T>.Array property

```csharp
public T[]? Array { get; }
```

Gets the original array containing the range of elements that the array segment delimits.

Returns: The original array that was passed to the constructor, and that contains the range delimited by the `ArraySegment<T>`.

#### Remarks
The `Array` property returns the original array, not a copy of the array; therefore, changes made through the property are made directly to the original array.

#### Examples
The following code example passes an `ArraySegment<T>` to a method.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/arraysegment.cs._

## ArraySegment<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the range delimited by the array segment.

Returns: The number of elements in the range delimited by the `ArraySegment<T>`.

#### Examples
The following code example passes an `ArraySegment<T>` structure to a method.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/arraysegment.cs._

## ArraySegment<T>.Empty property

```csharp
public static ArraySegment<T> Empty { get; }
```

Represents the empty array segment. This field is read-only.

Returns: An array segment of type `T` containing zero elements.

To be added.

## ArraySegment<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `ArraySegment<T>`.

To be added.

## ArraySegment<T>.Offset property

```csharp
public int Offset { get; }
```

Gets the position of the first element in the range delimited by the array segment, relative to the start of the original array.

Returns: The position of the first element in the range delimited by the `ArraySegment<T>`, relative to the start of the original array.

#### Examples
The following code example passes an `ArraySegment<T>` structure to a method.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/arraysegment.cs._

## ArraySegment<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether the array segment  is read-only.

Returns: `true` if the array segment is read-only; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `ICollection<T>` interface.

## ArraySegment<T>.System.Collections.Generic.IList<T>.Item property

```csharp
T System.Collections.Generic.IList<T>.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `ArraySegment<T>`.
- `NotSupportedException`: The property is set and the array segment is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `IList<T>` interface, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/ArraySegmentT/Overview/example1.cs._

## ArraySegment<T>.System.Collections.Generic.IReadOnlyList<T>.Item property

```csharp
T System.Collections.Generic.IReadOnlyList<T>.Item[int index] { get; }
```

Gets the element at the specified index of the array segment.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `ArraySegment<T>`.
- `InvalidOperationException`: The underlying array is `null`.
- `NotSupportedException`: The property is set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ArraySegment<T>` instance is cast to an `IReadOnlyList<T>` interface.

## ArraySegment<T>.CopyTo(ArraySegment<T>) method

```csharp
public void CopyTo (ArraySegment<T> destination);
```

Copies the contents of this instance into the specified destination array segment of the same type `T`.

Parameters:

- `destination`: The array segment into which the contents of this instance will be copied.

Exceptions:

- `InvalidOperationException`: The underlying array of this instance is `null`.

-or-

The underlying array of `destination` is `null`.
- `ArgumentException`: The length of the underlying array of this instance is larger than the length of the underlying array of `destination`.

To be added.

## ArraySegment<T>.CopyTo(T[]) method

```csharp
public void CopyTo (T[] destination);
```

Copies the contents of this instance into the specified destination array of the same type `T`.

Parameters:

- `destination`: The array of type `T` into which the contents of this instance will be copied.

Exceptions:

- `InvalidOperationException`: The underlying array of this instance is `null`.

To be added.

## ArraySegment<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] destination, int destinationIndex);
```

Copies the contents of this instance into the specified destination array of the same type `T`, starting at the specified destination index.

Parameters:

- `destination`: The array of type `T` into which the contents of this instance will be copied.
- `destinationIndex`: The index in `destination` at which storing begins.

Exceptions:

- `InvalidOperationException`: The underlying array of this instance is `null`.

To be added.

## ArraySegment<T>.Equals(ArraySegment<T>) method

```csharp
public bool Equals (ArraySegment<T> obj);
```

Determines whether the specified `ArraySegment<T>` structure is equal to the current instance.

Parameters:

- `obj`: The structure to compare with the current instance.

Returns: `true` if the specified `ArraySegment<T>` structure is equal to the current instance; otherwise, `false`.

#### Remarks
Two `ArraySegment<T>` objects are considered to be equal if all the following conditions are met:

- They reference the same array.

- They begin at the same index in the array.

- They have the same number of elements.

## ArraySegment<T>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current instance.

Parameters:

- `obj`: The object to be compared with the current instance.

Returns: `true` if the specified object is a `ArraySegment<T>` structure and is equal to the current instance; otherwise, `false`.

#### Remarks
Two `ArraySegment<T>` objects are considered to be equal if all the following conditions are met:

- They reference the same array.

- They begin at the same index in the array.

- They have the same number of elements.

## ArraySegment<T>.GetEnumerator() method

```csharp
public ArraySegment<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that can be used to iterate through the array segment.

Returns: An enumerator that can be used to iterate through the array segment.

Exceptions:

- `InvalidOperationException`: The underlying array is `null`.

To be added.

## ArraySegment<T>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ArraySegment<T>.op_Equality(ArraySegment<T>, ArraySegment<T>) method

```csharp
public static bool operator == (ArraySegment<T> a, ArraySegment<T> b);
```

Indicates whether two `ArraySegment<T>` structures are equal.

Parameters:

- `a`: The structure on the left side of the equality operator.
- `b`: The structure on the right side of the equality operator.

Returns: `true` if `a` is equal to `b`; otherwise, `false`.

#### Remarks
Two `ArraySegment<T>` objects are considered to be equal if all the following conditions are met:

- They reference the same array.

- They begin at the same index.

- They have the same number of elements.

The equivalent method for this operator is `Equals`

## ArraySegment<T>.op_Implicit(T[]) method

```csharp
public static implicit operator ArraySegment<T> (T[] array);
```

Defines an implicit conversion of an array of type `T` to an array segment of type `T`.

Parameters:

- `array`: The array to convert.

Returns: An array segment representation of the array.

To be added.

## ArraySegment<T>.op_Inequality(ArraySegment<T>, ArraySegment<T>) method

```csharp
public static bool operator != (ArraySegment<T> a, ArraySegment<T> b);
```

Indicates whether two `ArraySegment<T>` structures are unequal.

Parameters:

- `a`: The structure on the left side of the inequality operator.
- `b`: The structure on the right side of the inequality operator.

Returns: `true` if `a` is not equal to `b`; otherwise, `false`.

#### Remarks
Two `ArraySegment<T>` objects are considered to be unequal if they are of the same closed generic type but any of the following conditions is true:

- They do not reference the same array.

- They have different starting indexes.

- They have a different number of elements.

The equivalent method for this operator is `Equals`

## ArraySegment<T>.Slice(Int32) method

```csharp
public ArraySegment<T> Slice (int index);
```

Forms a slice out of the current array segment starting at the specified index.

Parameters:

- `index`: The index at which to begin the slice.

Returns: An array segment that consists of all elements of the current array segment from `index` to the end of the array segment.

Exceptions:

- `InvalidOperationException`: The underlying array of this instance is `null`.
- `ArgumentOutOfRangeException`: `index` is greater than the length of the underlying array of this instance.

To be added.
