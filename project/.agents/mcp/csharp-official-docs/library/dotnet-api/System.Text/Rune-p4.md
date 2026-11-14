---
title: "Rune struct (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Rune.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rune struct (part 4 of 4)

## Rune.TryCreate(UInt32, Rune) method

```csharp
public static bool TryCreate (uint value, out System.Text.Rune result);
```

Attempts to create a `Rune` from the specified 32-bit unsigned integer that represents a Unicode scalar value.

Parameters:

- `value`: The Unicode scalar value.
- `result`: When this method returns, the rune that corresponds to `value`.

Returns: `true` if the method succeeded; otherwise, `false`.

To be added.

## Rune.TryCreate(Char, Char, Rune) method

```csharp
public static bool TryCreate (char highSurrogate, char lowSurrogate, out System.Text.Rune result);
```

Attempts to create a `Rune` from the specified UTF-16 surrogate pair and returns a value that indicates whether the operation was successful.

Parameters:

- `highSurrogate`: The high surrogate of the surrogate pair.
- `lowSurrogate`: The low surrogate of the surrogate pair.
- `result`: The rune that corresponds to the specified surrogate pair.

Returns: `true` if the operation succeeded; `false` if the input values don't represent a well-formed UTF-16 surrogate pair.

To be added.

## Rune.TryEncodeToUtf16(Char>, Int32) method

```csharp
public bool TryEncodeToUtf16 (Span<char> destination, out int charsWritten);
```

Encodes this `Rune` to a UTF-16 encoded destination buffer.

Parameters:

- `destination`: The buffer to which to write this value as UTF-16 encoded value.
- `charsWritten`: The number of `Char` values written to `destination`, or 0 if the destination buffer is not large enough to contain the output.

Returns: `true` if the value was written to the buffer; otherwise, `false`.

#### Remarks

The `Utf16SequenceLength` property can be queried ahead of time to determine the required size of the `destination` buffer.

## Rune.TryEncodeToUtf8(Byte>, Int32) method

```csharp
public bool TryEncodeToUtf8 (Span<byte> destination, out int bytesWritten);
```

Encodes this `Rune` to a UTF-8 encoded destination buffer.

Parameters:

- `destination`: The buffer to which to write the UTF-8 encoded value.
- `bytesWritten`: The number of `Byte` values written to `destination`, or 0 if the destination buffer is not large enough to contain the output.

Returns: `true` if the value was written to the buffer; otherwise, `false`.

#### Remarks

The `Utf8SequenceLength` property can be queried ahead of time to determine the required size of the `destination` buffer.

## Rune.TryGetRuneAt(String, Int32, Rune) method

```csharp
public static bool TryGetRuneAt (string input, int index, out System.Text.Rune value);
```

Attempts to get the `Rune` that begins at a specified position in a string, and return a value that indicates whether the operation succeeded.

Parameters:

- `input`: The string from which to extract the rune.
- `index`: The zero-based index from which to extract the rune.
- `value`: When this method returns, the decoded rune.

Returns: `true` if a scalar value was successfully extracted from the specified index; `false` if a value could not be extracted because of invalid data.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentOutOfRangeException`: `index` is out of the range of `input`.

#### Remarks

Throws an exception if `input` is `null` or `index` is out of range.
