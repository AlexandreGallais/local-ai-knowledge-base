---
title: "UniqueId class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/UniqueId.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UniqueId class

Namespace: `System.Xml`

```csharp
public class UniqueId
```

A unique identifier optimized for Guids.

#### Remarks
This class can hold any string value, but has optimizations for dealing with `Guid`s.

## UniqueId.UniqueId() constructor

```csharp
public UniqueId ();
```

Creates a new instance of this class with a new, unique Guid.

To be added.

## UniqueId.UniqueId(Byte[]) constructor

```csharp
public UniqueId (byte[] guid);
```

Creates a new instance of this class using a byte array that represents a `Guid`.

Parameters:

- `guid`: A byte array that represents a `Guid`.

Exceptions:

- `ArgumentNullException`: `guid` is `null`.
- `ArgumentException`: `guid` provides less than 16 valid bytes.

#### Remarks
Only the first 16 bytes of the array are used.

## UniqueId.UniqueId(Guid) constructor

```csharp
public UniqueId (Guid guid);
```

Creates a new instance of this class using a `Guid`.

Parameters:

- `guid`: A `Guid`.

Exceptions:

- `ArgumentNullException`: `guid` is `null`.

To be added.

## UniqueId.UniqueId(String) constructor

```csharp
public UniqueId (string value);
```

Creates a new instance of this class using a string.

Parameters:

- `value`: A string used to generate the `UniqueId`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `FormatException`: Length of `value` is zero.

#### Remarks
Any string non-zero length string is a valid value.

## UniqueId.UniqueId(Byte[], Int32) constructor

```csharp
public UniqueId (byte[] guid, int offset);
```

Creates a new instance of this class starting from an offset within a `byte` array that represents a `Guid`.

Parameters:

- `guid`: A `byte` array that represents a `Guid`.
- `offset`: Offset position within the `byte` array that represents a `Guid`.

Exceptions:

- `ArgumentNullException`: `guid` is `null`.
- `ArgumentOutOfRangeException`: `offset` less than zero or greater than the length of the array.
- `ArgumentException`: `guid` and `offset` provide less than 16 valid bytes.

#### Remarks
Only the first 16 bytes at the specified offset are used.

## UniqueId.UniqueId(Char[], Int32, Int32) constructor

```csharp
public UniqueId (char[] chars, int offset, int count);
```

Creates a new instance of this class starting from an offset within a `char` using a specified number of entries.

Parameters:

- `chars`: A `char` array that represents a `Guid`.
- `offset`: Offset position within the `char` array that represents a `Guid`.
- `count`: Number of array entries to use, starting from `offset`.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `offset` less than zero or greater than the length of the array.

-or-

`count` less than zero or greater than the length of the array minus `offset`.
- `FormatException`: `count` equals zero.

To be added.

## UniqueId.CharArrayLength property

```csharp
public int CharArrayLength { get; }
```

Gets the length of the string representation of the `UniqueId`.

Returns: The length of the string representation of the `UniqueId`.

To be added.

## UniqueId.IsGuid property

```csharp
public bool IsGuid { get; }
```

Indicates whether the `UniqueId` is a `Guid`.

Returns: `true` if the `UniqueId` is a `Guid`; otherwise `false`.

To be added.

## UniqueId.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Tests whether an object equals this `UniqueId`.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the object equals this `UniqueId`; otherwise `false`.

To be added.

## UniqueId.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Creates a hash-code representation of this `UniqueId`.

Returns: An integer hash-code representation of this `UniqueId`.

To be added.

## UniqueId.op_Equality(UniqueId, UniqueId) method

```csharp
public static bool operator == (System.Xml.UniqueId? id1, System.Xml.UniqueId? id2);
```

Overrides the equality operator to test for equality of two `UniqueId`s.

Parameters:

- `id1`: The first `UniqueId`.
- `id2`: The second `UniqueId`.

Returns: `true` if the two `UniqueId`s are equal, or are both `null`; `false` if they are not equal, or if only one of them is `null`.

The equivalent method for this operator is `UniqueId.Equals`

## UniqueId.op_Inequality(UniqueId, UniqueId) method

```csharp
public static bool operator != (System.Xml.UniqueId? id1, System.Xml.UniqueId? id2);
```

Overrides the equality operator to test for inequality of two `UniqueId`s.

Parameters:

- `id1`: The first `UniqueId`.
- `id2`: The second `UniqueId`.

Returns: `true` if the overridden equality operator returns `false`; otherwise `false`.

The equivalent method for this operator is the negation of `UniqueId.Equals`

## UniqueId.ToCharArray(Char[], Int32) method

```csharp
public int ToCharArray (char[] chars, int offset);
```

Puts the `UniqueId` value into a `char` array.

Parameters:

- `chars`: The `char` array.
- `offset`: The position in the `char` array to start inserting the `UniqueId` value.

Returns: The number of entries in the `char` array filled by the `UniqueId` value.

Exceptions:

- `ArgumentNullException`: `chars` is `null`.
- `ArgumentOutOfRangeException`: `offset` less than zero or greater than the length of the array.

#### Remarks
This method is `unsafe`.

## UniqueId.ToString() method

```csharp
public override string ToString ();
```

Displays the `UniqueId` value in string format.

Returns: A string representation of the `UniqueId` value.

To be added.

## UniqueId.TryGetGuid(Guid) method

```csharp
public bool TryGetGuid (out Guid guid);
```

Tries to get the value of the `UniqueId` as a `Guid`.

Parameters:

- `guid`: When this method returns, contains the `Guid` if successful; otherwise `Guid.Empty`.

Returns: `true` if the UniqueId represents a `Guid`; otherwise `false`.

To be added.

## UniqueId.TryGetGuid(Byte[], Int32) method

```csharp
public bool TryGetGuid (byte[] buffer, int offset);
```

Tries to get the value of the `UniqueId` as a `Guid` and store it in the given byte array at the specified offset.

Parameters:

- `buffer`: `byte` array that will contain the `Guid`.
- `offset`: Position in the `byte` array to start inserting the `Guid` value.

Returns: `true` if the value stored in this instance of `UniqueId` is a `Guid`; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` less than zero or greater than the length of the array.
- `ArgumentException`: `buffer` and `offset` provide less than 16 valid bytes.

#### Remarks
This method is `unsafe`.
