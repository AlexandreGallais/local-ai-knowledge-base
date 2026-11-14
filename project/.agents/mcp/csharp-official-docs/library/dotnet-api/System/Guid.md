---
title: "Guid struct (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Guid.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Guid struct

Namespace: `System`

```csharp
public readonly struct Guid : IComparable, IComparable<Guid>, IEquatable<Guid>, IParsable<Guid>, ISpanFormattable, ISpanParsable<Guid>, IUtf8SpanFormattable, IUtf8SpanParsable<Guid>
```

Represents a globally unique identifier (GUID).

#### Remarks
A GUID is a 128-bit integer (16 bytes) that can be used across all computers and networks wherever a unique identifier is required. Such an identifier has a very low probability of being duplicated.

## Guid.Guid(Byte[]) constructor

```csharp
public Guid (byte[] b);
```

Initializes a new instance of the `Guid` structure by using the specified array of bytes.

Parameters:

- `b`: A 16-element byte array containing values with which to initialize the GUID.

Exceptions:

- `ArgumentNullException`: `b` is `null`.
- `ArgumentException`: `b` is not 16 bytes long.

To be added.

## Guid.Guid(Byte>) constructor

```csharp
public Guid (ReadOnlySpan<byte> b);
```

Initializes a new instance of the `Guid` structure by using the value represented by the specified read-only span of bytes.

Parameters:

- `b`: A read-only span containing the bytes representing the GUID. The span must be exactly 16 bytes long.

Exceptions:

- `ArgumentException`: The span must be exactly 16 bytes long.

To be added.

## Guid.Guid(String) constructor

```csharp
public Guid (string g);
```

Initializes a new instance of the `Guid` structure by using the value represented by the specified string.

Parameters:

- `g`: A string that contains a GUID in one of the following formats ("d" represents a hexadecimal digit whose case is ignored):

32 contiguous hexadecimal digits:

dddddddddddddddddddddddddddddddd

-or-

Groups of 8, 4, 4, 4, and 12 hexadecimal digits with hyphens between the groups. The entire GUID can optionally be enclosed in matching braces or parentheses:

dddddddd-dddd-dddd-dddd-dddddddddddd

-or-

{dddddddd-dddd-dddd-dddd-dddddddddddd}

-or-

(dddddddd-dddd-dddd-dddd-dddddddddddd)

-or-

Groups of 8, 4, and 4 hexadecimal digits, and a subset of eight groups of 2 hexadecimal digits, with each group prefixed by "0x" or "0X", and separated by commas. The entire GUID, as well as the subset, is enclosed in matching braces:

{0xdddddddd, 0xdddd, 0xdddd,{0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd}}

All braces, commas, and "0x" prefixes are required. All embedded spaces are ignored. All leading zeros in a group are ignored.

The hexadecimal digits shown in a group are the maximum number of meaningful hexadecimal digits that can appear in that group. You can specify from 1 to the number of hexadecimal digits shown for a group. The specified digits are assumed to be the low-order digits of the group.

Exceptions:

- `ArgumentNullException`: `g` is `null`.
- `FormatException`: The format of `g` is invalid.
- `OverflowException`: The format of `g` is invalid.

#### Remarks
The alphabetic hexadecimal digits in the `g` parameter can be uppercase or lowercase. For example, the following strings represent the same GUID:

"ca761232ed4211cebacd00aa0057b223"

"CA761232-ED42-11CE-BACD-00AA0057B223"

"{CA761232-ED42-11CE-BACD-00AA0057B223}"

"(CA761232-ED42-11CE-BACD-00AA0057B223)"

"{0xCA761232, 0xED42, 0x11CE, {0xBA, 0xCD, 0x00, 0xAA, 0x00, 0x57, 0xB2, 0x23}}"

#### Examples
The following example passes each string listed in the Remarks section to the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System/Guid/.ctor/ctor1.cs._

## Guid.Guid(Byte>, Boolean) constructor

```csharp
public Guid (ReadOnlySpan<byte> b, bool bigEndian);
```

Initializes a new instance of the `Guid` structure by using the value represented by the specified read-only span of bytes and the specified endianness.

Parameters:

- `b`: A 16-element read-only span containing the bytes with which to initialize the GUID.
- `bigEndian`: `true` to interpret `b` as big-endian; `false` to interpret it as little-endian.

Exceptions:

- `ArgumentException`: `b` is not 16 bytes long.

To be added.

## Guid.Guid(Int32, Int16, Int16, Byte[]) constructor

```csharp
public Guid (int a, short b, short c, byte[] d);
```

Initializes a new instance of the `Guid` structure by using the specified integers and byte array.

Parameters:

- `a`: The first 4 bytes of the GUID.
- `b`: The next 2 bytes of the GUID.
- `c`: The next 2 bytes of the GUID.
- `d`: The remaining 8 bytes of the GUID.

Exceptions:

- `ArgumentNullException`: `d` is `null`.
- `ArgumentException`: `d` is not 8 bytes long.

#### Examples
`Guid(1,2,3,new byte[]{0,1,2,3,4,5,6,7})` creates a `Guid` that corresponds to "00000001-0002-0003-0001-020304050607".

## Guid.Guid(Int32, Int16, Int16, Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte) constructor

```csharp
public Guid (int a, short b, short c, byte d, byte e, byte f, byte g, byte h, byte i, byte j, byte k);
```

Initializes a new instance of the `Guid` structure by using the specified integers and bytes.

Parameters:

- `a`: The first 4 bytes of the GUID.
- `b`: The next 2 bytes of the GUID.
- `c`: The next 2 bytes of the GUID.
- `d`: The next byte of the GUID.
- `e`: The next byte of the GUID.
- `f`: The next byte of the GUID.
- `g`: The next byte of the GUID.
- `h`: The next byte of the GUID.
- `i`: The next byte of the GUID.
- `j`: The next byte of the GUID.
- `k`: The next byte of the GUID.

#### Remarks
Specifying individual bytes in this manner can be used to circumvent byte order restrictions (big-endian or little-endian byte order) on particular types of computers.

#### Examples
The following example creates a GUID whose string representation is "0000000a-000b-000c-0001-020304050607".

_Code sample not included: ~/snippets/csharp/System/Guid/.ctor/ctor2.cs._

## Guid.Guid(UInt32, UInt16, UInt16, Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte) constructor

```csharp
public Guid (uint a, ushort b, ushort c, byte d, byte e, byte f, byte g, byte h, byte i, byte j, byte k);
```

Initializes a new instance of the `Guid` structure by using the specified unsigned integers and bytes.

Parameters:

- `a`: The first 4 bytes of the GUID.
- `b`: The next 2 bytes of the GUID.
- `c`: The next 2 bytes of the GUID.
- `d`: The next byte of the GUID.
- `e`: The next byte of the GUID.
- `f`: The next byte of the GUID.
- `g`: The next byte of the GUID.
- `h`: The next byte of the GUID.
- `i`: The next byte of the GUID.
- `j`: The next byte of the GUID.
- `k`: The next byte of the GUID.

#### Remarks
Specifying the bytes in this manner avoids endianness issues.

## Guid.AllBitsSet property

```csharp
public static Guid AllBitsSet { get; }
```

Gets a `Guid` where all bits are set.

Returns: A GUID with a value of FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF.

This property returns the value: FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF

## Guid.Variant property

```csharp
public int Variant { get; }
```

Gets the value of the variant field for the `Guid`.

Returns: To be added.

This property returns all 4 bits as-is. If you only care about fewer bits of the variant field, see RFC 9562 for information on how to interpret the result.

For example, the UUIDv7 standard might only want to consider the two most significant bits of the field, as the least two significant bits are documented as "don't-care".

## Guid.Version property

```csharp
public int Version { get; }
```

Gets the value of the version field for the `Guid`.

Returns: To be added.

This property corresponds to the most significant 4 bits of the 6th byte: 00000000-0000-F000-0000-000000000000.

For more information on how to interpret this value, see RFC 9562.

## Guid.CompareTo(Guid) method

```csharp
public int CompareTo (Guid value);
```

Compares this instance to a specified `Guid` object and returns an indication of their relative values.

Parameters:

- `value`: An object to compare to this instance.

Returns: A signed number indicating the relative values of this instance and `value`.

-  A negative integer

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  A positive integer

:  This instance is greater than `value`.

#### Remarks
The `Guid.CompareTo` method compares the GUIDs as if they were values provided to the `%23ctor` constructor, as follows:

- It compares the `UInt32` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- It compares the first `UInt16` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- It compares the second `UInt16` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- If performs a byte-by-byte comparison of the next eight `Byte` values. When it encounters the first unequal pair, it returns the result. Otherwise, it returns 0 to indicate that the two `Guid` values are equal.

Note that the final eight bytes appear in the string representation of a `Guid` in reverse order, from low byte to high byte. For example, in the string representation of the `Guid` value "01e75c83-c6f5-4192-b57e-7427cec5560d", the final eight bytes are "b57e-7427cec5560d." In other words, the final eight bytes are compared on a byte-by-byte basis from left to right starting with 0xb5.

If two GUIDs have equal values for a component, the method compares the next component. When it finds a component whose values are unequal, it returns the result.

This method implements the `IComparable<T>` interface and performs slightly better than the `Guid.CompareTo` method because it does not have to convert the `value` parameter to a `Guid` value.

#### Examples
The following example calls the `CompareTo` method to compare a GUID value with two similar GUID values.

_Code sample not included: ~/snippets/csharp/System/Guid/CompareTo/compareto2.cs._

## Guid.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares this instance to a specified object and returns an indication of their relative values.

Parameters:

- `value`: An object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  A negative integer

:  This instance is less than `value`.

-  Zero

:  This instance is equal to `value`.

-  A positive integer

:  This instance is greater than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `Guid`.

#### Remarks
The `value` parameter must be `null` or an instance of `Guid`; otherwise, an exception is thrown. Any instance of `Guid`, regardless of its value, is considered greater than `null`.

The `Guid.CompareTo` method compares the GUIDs as if they were values provided to the `Guid.%23ctor` constructor, as follows:

- It compares the `Int32` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- It compares the first `Int16` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- It compares the second `Int16` values, and returns a result if they are unequal. If they are equal, it performs the next comparison.

- If performs a byte-by-byte comparison of the next eight `Byte` values. When it encounters the first unequal pair, it returns the result. Otherwise, it returns 0 to indicate that the two `Guid` values are equal.

If two GUIDs have equal values for a component, the method compares the next component. When it finds a component whose values are unequal, it returns the result.

Note that the final eight bytes appear in the string representation of a `Guid` in reverse order, from low byte to high byte. For example, in the string representation of the `Guid` value "01e75c83-c6f5-4192-b57e-7427cec5560d", the final eight bytes are "b57e-7427cec5560d."

#### Examples
The following example uses the `GuidAttribute` attribute to assign a GUID to a class. It retrieves the value of this GUID by calling the `Attribute.GetCustomAttribute` method and passing the `Value` property of the returned `GuidAttribute` object to the `Guid.Parse` method. Then it compares that GUID with an array of values.

_Code sample not included: ~/snippets/csharp/System/Guid/CompareTo/compareto1.cs._

## Guid.CreateVersion7() method

```csharp
public static Guid CreateVersion7 ();
```

Creates a new `Guid` according to RFC 9562, following the Version 7 format.

Returns: A new `Guid` according to RFC 9562, following the Version 7 format.

This method uses `DateTimeOffset.UtcNow` to determine the Unix Epoch timestamp source.

This method seeds the rand_a and rand_b sub-fields with random data.

## Guid.CreateVersion7(DateTimeOffset) method

```csharp
public static Guid CreateVersion7 (DateTimeOffset timestamp);
```

Creates a new `Guid` according to RFC 9562, following the Version 7 format.

Parameters:

- `timestamp`: The date-time offset used to determine the Unix Epoch timestamp.

Returns: A new `Guid` according to RFC 9562, following the Version 7 format.

Exceptions:

- `ArgumentOutOfRangeException`: `timestamp` represents an offset prior to `DateTimeOffset.UnixEpoch`.

This method seeds the rand_a and rand_b sub-fields with random data.

## Guid.Equals(Guid) method

```csharp
public bool Equals (Guid g);
```

Returns a value indicating whether this instance and a specified `Guid` object represent the same value.

Parameters:

- `g`: An object to compare to this instance.

Returns: `true` if `g` is equal to this instance; otherwise, `false`.

#### Remarks
Two `Guid` objects are equal if they have identical byte values.

This method performs slightly better than the `Guid.Equals` method because it does not have to box the `g` parameter.

## Guid.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `o`: The object to compare with this instance.

Returns: `true` if `o` is a `Guid` that has the same value as this instance; otherwise, `false`.

#### Remarks
Two `Guid` objects are equal if they have identical byte values.

## Guid.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

To be added.
