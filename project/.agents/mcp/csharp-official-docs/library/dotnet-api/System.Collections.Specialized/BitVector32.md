---
title: "BitVector32 struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/BitVector32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitVector32 struct

Namespace: `System.Collections.Specialized`

```csharp
public struct BitVector32 : IEquatable<System.Collections.Specialized.BitVector32>
```

Provides a simple structure that stores Boolean values and small integers in 32 bits of memory.

#### Remarks
`BitVector32` is more efficient than `BitArray` for Boolean values and small integers that are used internally. A `BitArray` can grow indefinitely as needed, but it has the memory and performance overhead that a class instance requires. In contrast, a `BitVector32` uses only 32 bits.

A `BitVector32` structure can be set up to contain either sections for small integers or bit flags for Booleans, but not both. A `Section` is a window into the `BitVector32` and is composed of the smallest number of consecutive bits that can contain the maximum value specified in `BitVector32.CreateSection`. For example, a section with a maximum value of 1 is composed of only one bit, whereas a section with a maximum value of 5 is composed of three bits. You can create a `Section` with a maximum value of 1 to serve as a Boolean, thereby allowing you to store integers and Booleans in the same `BitVector32`.

Some members can be used for a `BitVector32` that is set up as sections, while other members can be used for one that is set up as bit flags. For example, the `BitVector32.Item` property is the indexer for a `BitVector32` that is set up as sections, and the `BitVector32.Item` property is the indexer for a `BitVector32` that is set up as bit flags. `BitVector32.CreateMask` creates a series of masks that can be used to access individual bits in a `BitVector32` that is set up as bit flags.

Using a mask on a `BitVector32` that is set up as sections might cause unexpected results.

#### Examples
The following code example uses a `BitVector32` as a collection of bit flags.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/BitVector32/Overview/bitvector32_bitflags.cs._

The following code example uses a `BitVector32` as a collection of sections.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/BitVector32+Section/Overview/bitvector32_sections.cs._

## BitVector32.BitVector32(BitVector32) constructor

```csharp
public BitVector32 (System.Collections.Specialized.BitVector32 value);
```

Initializes a new instance of the `BitVector32` structure containing the data represented in an existing `BitVector32` structure.

Parameters:

- `value`: A `BitVector32` structure that contains the data to copy.

#### Remarks
This constructor is an O(1) operation.

## BitVector32.BitVector32(Int32) constructor

```csharp
public BitVector32 (int data);
```

Initializes a new instance of the `BitVector32` structure containing the data represented in an integer.

Parameters:

- `data`: An integer representing the data of the new `BitVector32`.

#### Remarks
This constructor is an O(1) operation.

## BitVector32.Data property

```csharp
public int Data { get; }
```

Gets the value of the `BitVector32` as an integer.

Returns: The value of the `BitVector32` as an integer.

#### Remarks
To access the value of the individual sections or bit flags, use the `BitVector32.Item` property.

Retrieving the value of this property is an O(1) operation.

## BitVector32.Item property

```csharp
public int this[System.Collections.Specialized.BitVector32.Section section] { get; set; }
```

Gets or sets the value stored in the specified `Section`.

Parameters:

- `section`: A `Section` that contains the value to get or set.

Returns: The value stored in the specified `Section`.

#### Remarks
The `BitVector32.Item` [Section] property is the indexer for a `BitVector32` that is set up as sections, and the `BitVector32.Item` [int] property is the indexer for a `BitVector32` that is set up as bit flags.

A `Section` is a window into the `BitVector32` and is composed of the smallest number of consecutive bits that can contain the maximum value specified in `BitVector32.CreateSection`. For example, a section with a maximum value of 1 is composed of only one bit, whereas a section with a maximum value of 5 is composed of three bits. You can create a `Section` with a maximum value of 1 to serve as a Boolean, thereby allowing you to store integers and Booleans in the same `BitVector32`.

The C# language uses the this keyword to define the indexers instead of implementing the `BitVector32.Item` property. Visual Basic <example-value> `BitVector32.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## BitVector32.Item property

```csharp
public bool this[int bit] { get; set; }
```

Gets or sets the state of the bit flag indicated by the specified mask.

Parameters:

- `bit`: A mask that indicates the bit to get or set.

Returns: `true` if the specified bit flag is on (1); otherwise, `false`.

#### Remarks
The `BitVector32.Item` [Section] property is the indexer for a `BitVector32` that is set up as sections, and the `BitVector32.Item` [int] property is the indexer for a `BitVector32` that is set up as bit flags.

Using this property on a `BitVector32` that is set up as sections might cause unexpected results.

The C# language uses the this keyword to define the indexers instead of implementing the `BitVector32.Item` property. Visual Basic <example-value> `BitVector32.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## BitVector32.CreateMask() method

```csharp
public static int CreateMask ();
```

Creates the first mask in a series of masks that can be used to retrieve individual bits in a `BitVector32` that is set up as bit flags.

Returns: A mask that isolates the first bit flag in the `BitVector32`.

#### Remarks
Use `CreateMask()` to create the first mask in a series and `CreateMask(int)` for all subsequent masks.

Multiple masks can be created to refer to the same bit flag.

The resulting mask isolates only one bit flag in the `BitVector32`. You can combine masks using the bitwise OR operation to create a mask that isolates multiple bit flags in the `BitVector32`.

Using a mask on a `BitVector32` that is set up as sections might cause unexpected results.

This method is an O(1) operation.

## BitVector32.CreateMask(Int32) method

```csharp
public static int CreateMask (int previous);
```

Creates an additional mask following the specified mask in a series of masks that can be used to retrieve individual bits in a `BitVector32` that is set up as bit flags.

Parameters:

- `previous`: The mask that indicates the previous bit flag.

Returns: A mask that isolates the bit flag following the one that `previous` points to in `BitVector32`.

Exceptions:

- `InvalidOperationException`: `previous` indicates the last bit flag in the `BitVector32`.

#### Remarks
Use `CreateMask()` to create the first mask in a series and `CreateMask(int)` for all subsequent masks.

Multiple masks can be created to refer to the same bit flag.

The resulting mask isolates only one bit flag in the `BitVector32`. You can combine masks using the bitwise OR operation to create a mask that isolates multiple bit flags in the `BitVector32`.

Using a mask on a `BitVector32` that is set up as sections might cause unexpected results.

This method is an O(1) operation.

## BitVector32.CreateSection(Int16) method

```csharp
public static System.Collections.Specialized.BitVector32.Section CreateSection (short maxValue);
```

Creates the first `Section` in a series of sections that contain small integers.

Parameters:

- `maxValue`: A 16-bit signed integer that specifies the maximum value for the new `Section`.

Returns: A `Section` that can hold a number from zero to `maxValue`.

Exceptions:

- `ArgumentException`: `maxValue` is less than 1.

#### Remarks
A `Section` is a window into the `BitVector32` and is composed of the smallest number of consecutive bits that can contain the maximum value specified in `BitVector32.CreateSection`. For example, a section with a maximum value of 1 is composed of only one bit, whereas a section with a maximum value of 5 is composed of three bits. You can create a `Section` with a maximum value of 1 to serve as a Boolean, thereby allowing you to store integers and Booleans in the same `BitVector32`.

If sections already exist in the `BitVector32`, those sections are still accessible; however, overlapping sections might cause unexpected results.

This method is an O(1) operation.

## BitVector32.CreateSection(Int16, BitVector32+Section) method

```csharp
public static System.Collections.Specialized.BitVector32.Section CreateSection (short maxValue, System.Collections.Specialized.BitVector32.Section previous);
```

Creates a new `Section` following the specified `Section` in a series of sections that contain small integers.

Parameters:

- `maxValue`: A 16-bit signed integer that specifies the maximum value for the new `Section`.
- `previous`: The previous `Section` in the `BitVector32`.

Returns: A `Section` that can hold a number from zero to `maxValue`.

Exceptions:

- `ArgumentException`: `maxValue` is less than 1.
- `InvalidOperationException`: `previous` includes the final bit in the `BitVector32`.

-or-

`maxValue` is greater than the highest value that can be represented by the number of bits after `previous`.

#### Remarks
A `Section` is a window into the `BitVector32` and is composed of the smallest number of consecutive bits that can contain the maximum value specified in `BitVector32.CreateSection`. For example, a section with a maximum value of 1 is composed of only one bit, whereas a section with a maximum value of 5 is composed of three bits. You can create a `Section` with a maximum value of 1 to serve as a Boolean, thereby allowing you to store integers and Booleans in the same `BitVector32`.

If sections already exist after `previous` in the `BitVector32`, those sections are still accessible; however, overlapping sections might cause unexpected results.

This method is an O(1) operation.

## BitVector32.Equals(BitVector32) method

```csharp
public bool Equals (System.Collections.Specialized.BitVector32 other);
```

Indicates whether the current instance is equal to another instance of the same type.

Parameters:

- `other`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## BitVector32.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether the specified object is equal to the `BitVector32`.

Parameters:

- `o`: The object to compare with the current `BitVector32`.

Returns: `true` if the specified object is equal to the `BitVector32`; otherwise, `false`.

#### Remarks
The object `o` is considered equal to the `BitVector32` if the type of `o` is compatible with the `BitVector32` type and if the value of `o` is equal to the value of `BitVector32.Data`.

This method is an O(1) operation.

#### Examples
The following code example compares a `BitVector32` with another `BitVector32` and with an `Int32`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/BitVector32/Equals/bitvector32_equals.cs._

## BitVector32.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the `BitVector32`.

Returns: A hash code for the `BitVector32`.

#### Remarks
The hash code of a `BitVector32` is based on the value of `BitVector32.Data`. Two instances of `BitVector32` with the same value for `BitVector32.Data` will also generate the same hash code.

This method is an O(1) operation.

## BitVector32.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `BitVector32`.

Returns: A string that represents the current `BitVector32`.

#### Remarks
This method overrides `Object.ToString`.

This method is an O(1) operation.

## BitVector32.ToString(BitVector32) method

```csharp
public static string ToString (System.Collections.Specialized.BitVector32 value);
```

Returns a string that represents the specified `BitVector32`.

Parameters:

- `value`: The `BitVector32` to represent.

Returns: A string that represents the specified `BitVector32`.

#### Remarks
This method is an O(1) operation.
