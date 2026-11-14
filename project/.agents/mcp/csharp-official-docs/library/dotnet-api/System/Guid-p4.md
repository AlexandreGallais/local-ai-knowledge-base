---
title: "Guid struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Guid.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Guid struct (part 4 of 4)

## Guid.TryParseExact(String, String, Guid) method

```csharp
public static bool TryParseExact (string? input, string? format, out Guid result);
```

Converts the string representation of a GUID to the equivalent `Guid` structure, provided that the string is in the specified format.

Parameters:

- `input`: The GUID to convert.
- `format`: One of the following specifiers that indicates the exact format to use when interpreting `input`: "N", "D", "B", "P", or "X".
- `result`: When this method returns, contains the parsed value. If the method returns `true`, `result` contains a valid `Guid`. If the method returns `false`, `result` equals `Guid.Empty`.

Returns: `true` if the parse operation was successful; otherwise, `false`.

#### Remarks
This method requires the string to convert to be exactly in the format specified by the `format` parameter, after leading and trailing white-space characters are removed. It returns `false` if `input` is `null` or is not in the format specified by `format`, and doesn't throw an exception.

The following table shows the accepted format specifiers for the `format` parameter. "0" represents a digit; hyphens ("-"), braces ("{", "}"), and parentheses ("(", ")") appear as shown.

|Specifier|Format of the `input` parameter|
|---------------|-------------------------------------|
|N|32 digits: 00000000000000000000000000000000|
|D|32 digits separated by hyphens: 00000000-0000-0000-0000-000000000000|
|B|32 digits separated by hyphens, enclosed in braces: {00000000-0000-0000-0000-000000000000}|
|P|32 digits separated by hyphens, enclosed in parentheses: (00000000-0000-0000-0000-000000000000)|
|X|Four hexadecimal values enclosed in braces, where the fourth value is a subset of eight hexadecimal values that is also enclosed in braces: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}|

#### Examples
The following example calls the `ToString` method with each of the supported format specifiers to generate an array of strings that represent a single GUID. These are then passed to the `Guid.TryParseExact` method, which successfully parses the string that conforms to the "B" format specifier.

_Code sample not included: ~/snippets/csharp/System/Guid/Parse/tryparseexactex1.cs._

## Guid.TryWriteBytes(Byte>) method

```csharp
public bool TryWriteBytes (Span<byte> destination);
```

Tries to write the current GUID instance into a span of bytes.

Parameters:

- `destination`: When this method returns, the GUID as a span of bytes.

Returns: `true` if the GUID is successfully written to the specified span; `false` otherwise.

To be added.

## Guid.TryWriteBytes(Byte>, Boolean, Int32) method

```csharp
public bool TryWriteBytes (Span<byte> destination, bool bigEndian, out int bytesWritten);
```

Tries to write the current GUID instance into a span of bytes, using the specified endianness.

Parameters:

- `destination`: The span in which to write the GUID as a span of bytes.
- `bigEndian`: `true` to write the bytes in big-endian byte order; `false` to write them in little-endian byte order.
- `bytesWritten`: When this method returns, contains the number of bytes written into `destination`.

Returns: `true` if the GUID is successfully written to the specified span; `false` otherwise.

To be added.

## Guid.Empty field

```csharp
public static readonly Guid Empty;
```

A read-only instance of the `Guid` structure whose value is all zeros.

#### Remarks
You can compare a GUID with the value of the `Empty` field to determine whether a GUID is non-zero. The following example uses the `Guid.op_Equality` operator to compare two GUID values with `Empty` to determine whether they consist exclusively of zeros.

_Code sample not included: ~/snippets/csharp/System/Guid/Empty/empty.cs._
