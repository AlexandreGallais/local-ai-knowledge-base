---
title: "BitArray class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/BitArray.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitArray class (part 2 of 2)

## BitArray.Get(Int32) method

```csharp
public bool Get (int index);
```

Gets the value of the bit at a specific position in the `BitArray`.

Parameters:

- `index`: The zero-based index of the value to get.

Returns: The value of the bit at position `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than or equal to the number of elements in the `BitArray`.

#### Remarks
This method is an `O(1)` operation.

#### Examples
The following code example shows how to set and get specific elements in a `BitArray`.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Get/source.cs._

## BitArray.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `BitArray`.

Returns: An `IEnumerator` for the entire `BitArray`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

## BitArray.HasAllSet() method

```csharp
public bool HasAllSet ();
```

Determines whether all bits in the `BitArray` are set to `true`.

Returns: `true` if every bit in the `BitArray` is set to `true`, or if `BitArray` is empty; otherwise, `false`.

To be added.

## BitArray.HasAnySet() method

```csharp
public bool HasAnySet ();
```

Determines whether any bit in the `BitArray` is set to `true`.

Returns: `true` if `BitArray` is not empty and at least one of its bit is set to `true`; otherwise, `false`.

To be added.

## BitArray.LeftShift(Int32) method

```csharp
public System.Collections.BitArray LeftShift (int count);
```

Shifts all the bit values of the current `BitArray` to the left on `count` bits.

Parameters:

- `count`: The number of shifts to make for each bit.

Returns: The current `BitArray`.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than zero.

#### Remarks

The current `BitArray` is updated and returned.

## BitArray.Not() method

```csharp
public System.Collections.BitArray Not ();
```

Inverts all the bit values in the current `BitArray`, so that elements set to `true` are changed to `false`, and elements set to `false` are changed to `true`.

Returns: The current instance with inverted bit values.

#### Remarks
This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to apply NOT to a `BitArray`.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Not/source.cs._

## BitArray.Or(BitArray) method

```csharp
public System.Collections.BitArray Or (System.Collections.BitArray value);
```

Performs the bitwise OR operation between the elements of the current `BitArray` object and the corresponding elements in the specified array. The current `BitArray` object will be modified to store the result of the bitwise OR operation.

Parameters:

- `value`: The array with which to perform the bitwise OR operation.

Returns: An array containing the result of the bitwise OR operation, which is a reference to the current `BitArray` object.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` and the current `BitArray` do not have the same number of elements.

#### Remarks
The bitwise OR operation returns `true` if one or both operands are `true`, and returns `false` if both operands are `false`.

This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to perform the OR operation between two `BitArray` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Or/source.cs._

## BitArray.PopCount() method

```csharp
public int PopCount ();
```

To be added.

Returns: To be added.

To be added.

## BitArray.RightShift(Int32) method

```csharp
public System.Collections.BitArray RightShift (int count);
```

Shifts all the bit values of the current `BitArray` to the right on `count` bits.

Parameters:

- `count`: The number of shifts to make for each bit.

Returns: The current `BitArray`.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than zero.

#### Remarks

The current `BitArray` is updated and returned.

## BitArray.Set(Int32, Boolean) method

```csharp
public void Set (int index, bool value);
```

Sets the bit at a specific position in the `BitArray` to the specified value.

Parameters:

- `index`: The zero-based index of the bit to set.
- `value`: The Boolean value to assign to the bit.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than or equal to the number of elements in the `BitArray`.

#### Remarks
This method is an `O(1)` operation.

#### Examples
The following code example shows how to set and get specific elements in a `BitArray`.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Get/source.cs._

## BitArray.SetAll(Boolean) method

```csharp
public void SetAll (bool value);
```

Sets all bits in the `BitArray` to the specified value.

Parameters:

- `value`: The Boolean value to assign to all bits.

#### Remarks
This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to set and get specific elements in a `BitArray`.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Get/source.cs._

## BitArray.Xor(BitArray) method

```csharp
public System.Collections.BitArray Xor (System.Collections.BitArray value);
```

Performs the bitwise exclusive OR operation between the elements of the current `BitArray` object against the corresponding elements in the specified array. The current `BitArray` object will be modified to store the result of the bitwise exclusive OR operation.

Parameters:

- `value`: The array with which to perform the bitwise exclusive OR operation.

Returns: An array containing the result of the bitwise exclusive OR operation, which is a reference to the current `BitArray` object.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` and the current `BitArray` do not have the same number of elements.

#### Remarks
The bitwise exclusive OR operation returns `true` if exactly one operand is `true`, and returns `false` if both operands have the same Boolean value.

This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to perform the XOR operation between two `BitArray` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Xor/source.cs._
