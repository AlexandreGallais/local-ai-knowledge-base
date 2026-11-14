---
title: "BitArray class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/BitArray.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitArray class

Namespace: `System.Collections`

```csharp
public sealed class BitArray : ICloneable, System.Collections.ICollection
```

Manages a compact array of bit values, which are represented as Booleans, where `true` indicates that the bit is on (1) and `false` indicates the bit is off (0).

#### Remarks
The `BitArray` class is a collection class in which the capacity is always the same as the count. Elements are added to a `BitArray` by increasing the `Length` property; elements are deleted by decreasing the `Length` property. The size of a `BitArray` is controlled by the client; indexing past the end of the `BitArray` throws an `ArgumentException`. The `BitArray` class provides methods that are not found in other collections, including those that allow multiple elements to be modified at once using a filter, such as `BitArray.And`, `BitArray.Or`, `BitArray.Xor` , `BitArray.Not`, and `BitArray.SetAll`.

The `BitVector32` class is a structure that provides the same functionality as `BitArray`, but with faster performance. `BitVector32` is faster because it is a value type and therefore allocated on the stack, whereas `BitArray` is a reference type and, therefore, allocated on the heap.

`BitVector32` can store exactly 32 bits, whereas `BitArray` can store a variable number of bits. `BitVector32` stores both bit flags and small integers, thereby making it ideal for data that is not exposed to the user. However, if the number of required bit flags is unknown, is variable, or is greater than 32, use `BitArray` instead.

`BitArray` is in the `Collections` namespace; `BitVector32` is in the `Specialized` namespace.

Elements in this collection can be accessed using an integer index.  Indexes in this collection are zero-based.

#### Examples
The following code example shows how to create and initialize a `BitArray` and how to print out its values.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Overview/source.cs._

## BitArray.BitArray(Boolean[]) constructor

```csharp
public BitArray (bool[] values);
```

Initializes a new instance of the `BitArray` class that contains bit values copied from the specified array of Booleans.

Parameters:

- `values`: An array of Booleans to copy.

Exceptions:

- `ArgumentNullException`: `values` is `null`.

#### Remarks
This constructor is an `O(n)` operation, where `n` is the number of elements in `values`.

## BitArray.BitArray(Byte[]) constructor

```csharp
public BitArray (byte[] bytes);
```

Initializes a new instance of the `BitArray` class that contains bit values copied from the specified array of bytes.

Parameters:

- `bytes`: An array of bytes containing the values to copy, where each byte represents eight consecutive bits.

Exceptions:

- `ArgumentNullException`: `bytes` is `null`.
- `ArgumentException`: The length of `bytes` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The first byte in the array represents bits 0 through 7, the second byte represents bits 8 through 15, and so on. The Least Significant Bit of each byte represents the lowest index value: " `bytes` [0] & 1" represents bit 0, " `bytes` [0] & 2" represents bit 1, " `bytes` [0] & 4" represents bit 2, and so on.

This constructor is an `O(n)` operation, where `n` is the number of elements in `bytes`.

## BitArray.BitArray(BitArray) constructor

```csharp
public BitArray (System.Collections.BitArray bits);
```

Initializes a new instance of the `BitArray` class that contains bit values copied from the specified `BitArray`.

Parameters:

- `bits`: The `BitArray` to copy.

Exceptions:

- `ArgumentNullException`: `bits` is `null`.

#### Remarks
This constructor is an `O(n)` operation, where `n` is the number of elements in `bits`.

## BitArray.BitArray(Int32) constructor

```csharp
public BitArray (int length);
```

Initializes a new instance of the `BitArray` class that can hold the specified number of bit values, which are initially set to `false`.

Parameters:

- `length`: The number of bit values in the new `BitArray`.

Exceptions:

- `ArgumentOutOfRangeException`: `length` is less than zero.

#### Remarks
This constructor is an `O(n)` operation, where `n` is `length`.

## BitArray.BitArray(Int32[]) constructor

```csharp
public BitArray (int[] values);
```

Initializes a new instance of the `BitArray` class that contains bit values copied from the specified array of 32-bit integers.

Parameters:

- `values`: An array of integers containing the values to copy, where each integer represents 32 consecutive bits.

Exceptions:

- `ArgumentNullException`: `values` is `null`.
- `ArgumentException`: The length of `values` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
The number in the first `values` array element represents bits 0 through 31, the second number in the array represents bits 32 through 63, and so on. The Least Significant Bit of each integer represents the lowest index value: " `values` [0] & 1" represents bit 0, " `values` [0] & 2" represents bit 1, " `values` [0] & 4" represents bit 2, and so on.

This constructor is an `O(n)` operation, where `n` is the number of elements in `values`.

## BitArray.BitArray(Boolean>) constructor

```csharp
public BitArray (ReadOnlySpan<bool> values);
```

To be added.

Parameters:

- `values`: To be added.

To be added.

## BitArray.BitArray(Byte>) constructor

```csharp
public BitArray (ReadOnlySpan<byte> bytes);
```

To be added.

Parameters:

- `bytes`: To be added.

To be added.

## BitArray.BitArray(Int32>) constructor

```csharp
public BitArray (ReadOnlySpan<int> values);
```

To be added.

Parameters:

- `values`: To be added.

To be added.

## BitArray.BitArray(Int32, Boolean) constructor

```csharp
public BitArray (int length, bool defaultValue);
```

Initializes a new instance of the `BitArray` class that can hold the specified number of bit values, which are initially set to the specified value.

Parameters:

- `length`: The number of bit values in the new `BitArray`.
- `defaultValue`: The Boolean value to assign to each bit.

Exceptions:

- `ArgumentOutOfRangeException`: `length` is less than zero.

#### Remarks
This constructor is an `O(n)` operation, where `n` is `length`.

## BitArray.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `BitArray`.

Returns: The number of elements contained in the `BitArray`.

#### Remarks
`BitArray.Length` and `BitArray.Count` return the same value. `BitArray.Length` can be set to a specific value, but `BitArray.Count` is read-only.

Retrieving the value of this property is an `O(1)` operation.

## BitArray.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `BitArray` is read-only.

Returns: This property is always `false`.

#### Remarks
`BitArray` implements the `IsReadOnly` property because it is required by the `IList` interface.

A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

This method is an `O(1)` operation.

## BitArray.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether access to the `BitArray` is synchronized (thread safe).

Returns: This property is always `false`.

#### Remarks
`BitArray` implements the `IsSynchronized` property because it is required by the `ICollection` interface.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `BitArray.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Overview/source2.cs._

This method is an `O(1)` operation.

## BitArray.Item property

```csharp
public bool this[int index] { get; set; }
```

Gets or sets the value of the bit at a specific position in the `BitArray`.

Parameters:

- `index`: The zero-based index of the value to get or set.

Returns: The value of the bit at position `index`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `BitArray.Count`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `BitArray.Item` property. Visual Basic <example-value> `BitArray.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an `O(1)` operation; setting the property is also an `O(1)` operation.

## BitArray.Length property

```csharp
public int Length { get; set; }
```

Gets or sets the number of elements in the `BitArray`.

Returns: The number of elements in the `BitArray`.

Exceptions:

- `ArgumentOutOfRangeException`: The property is set to a value that is less than zero.

#### Remarks
`BitArray.Length` and `BitArray.Count` return the same value. `BitArray.Length` can be set to a specific value, but `BitArray.Count` is read-only.

If `BitArray.Length` is set to a value that is less than `BitArray.Count`, the `BitArray` is truncated and the elements after the index `value` -1 are deleted.

If `BitArray.Length` is set to a value that is greater than `BitArray.Count`, the new elements are set to `false`.

Retrieving the value of this property is an `O(1)` operation. Setting this property is an `O(n)` operation.

## BitArray.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `BitArray`.

Returns: An object that can be used to synchronize access to the `BitArray`.

#### Remarks
Derived classes can provide their own synchronized version of the `BitArray` using the `SyncRoot` property. The synchronizing code must perform operations on the `BitArray.SyncRoot` of the `BitArray`, not directly on the `BitArray`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `BitArray` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `BitArray.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/Overview/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## BitArray.And(BitArray) method

```csharp
public System.Collections.BitArray And (System.Collections.BitArray value);
```

Performs the bitwise AND operation between the elements of the current `BitArray` object and the corresponding elements in the specified array. The current `BitArray` object will be modified to store the result of the bitwise AND operation.

Parameters:

- `value`: The array with which to perform the bitwise AND operation.

Returns: An array containing the result of the bitwise AND operation, which is a reference to the current `BitArray` object.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` and the current `BitArray` do not have the same number of elements.

#### Remarks
The bitwise AND operation returns `true` if both operands are `true`, and returns `false` if one or both operands are `false`.

This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to perform the bitwise AND operation between two `BitArray` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/And/source.cs._

## BitArray.Clone() method

```csharp
public object Clone ();
```

Creates a shallow copy of the `BitArray`.

Returns: A shallow copy of the `BitArray`.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but it does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an `O(n)` operation, where `n` is `BitArray.Count`.

## BitArray.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the entire `BitArray` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `BitArray`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `BitArray` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `BitArray` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type. Only `bool`, `int`, and `byte` types of arrays are supported.

This method is an `O(n)` operation, where `n` is `BitArray.Count`.

#### Examples
The following code example shows how to copy a `BitArray` into a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System.Collections/BitArray/CopyTo/source.cs._
