---
title: "Convert class (part 23 of 23)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Convert.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Convert class (part 23 of 23)

## Convert.TryToHexString(Byte>, Char>, Int32) method

```csharp
public static bool TryToHexString (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Converts a span of 8-bit unsigned integers to its equivalent span representation that is encoded with uppercase hex characters.

Parameters:

- `source`: A span of 8-bit unsigned integers.
- `destination`: The span representation in hex of the elements in `source`.
- `charsWritten`: When this method returns, contains the number of chars that were written in `destination`.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## Convert.TryToHexStringLower(Byte>, Byte>, Int32) method

```csharp
public static bool TryToHexStringLower (ReadOnlySpan<byte> source, Span<byte> utf8Destination, out int bytesWritten);
```

Converts a span of 8-bit unsigned integers to its equivalent UTF-8 span representation that is encoded with lowercase hex characters.

Parameters:

- `source`: A span of 8-bit unsigned integers.
- `utf8Destination`: The UTF-8 span representation in hex of the elements in `source`.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## Convert.TryToHexStringLower(Byte>, Char>, Int32) method

```csharp
public static bool TryToHexStringLower (ReadOnlySpan<byte> source, Span<char> destination, out int charsWritten);
```

Converts a span of 8-bit unsigned integers to its equivalent span representation that is encoded with lowercase hex characters.

Parameters:

- `source`: A span of 8-bit unsigned integers.
- `destination`: The span representation in hex of the elements in `source`.
- `charsWritten`: When this method returns, contains the number of chars that were written in `destination`.

Returns: `true` if the conversion was successful; otherwise, `false`.

To be added.

## Convert.DBNull field

```csharp
public static readonly object DBNull;
```

A constant that represents a database column that is absent of data; that is, database null.

#### Remarks
The `DBNull` field is equivalent to `Value`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Convert/DBNull/dbnull1.cs._
