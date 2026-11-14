---
title: "PemEncoding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/PemEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PemEncoding class

Namespace: `System.Security.Cryptography`

```csharp
public static class PemEncoding
```

Provides methods for reading and writing the IETF RFC 7468 subset of PEM (Privacy-Enhanced Mail) textual encodings.
This class cannot be inherited.

To be added.

## PemEncoding.Find(Char>) method

```csharp
public static System.Security.Cryptography.PemFields Find (ReadOnlySpan<char> pemData);
```

Finds the first PEM-encoded data.

Parameters:

- `pemData`: The text containing the PEM-encoded data.

Returns: A value that specifies the location, label, and data location of the encoded data.

Exceptions:

- `ArgumentException`: `pemData` does not contain a well-formed PEM-encoded value.

#### Remarks

IETF RFC 7468 permits different decoding rules. This method always uses lax rules.

## PemEncoding.FindUtf8(Byte>) method

```csharp
public static System.Security.Cryptography.PemFields FindUtf8 (ReadOnlySpan<byte> pemData);
```

Finds the first PEM-encoded data.

Parameters:

- `pemData`: The text containing the PEM-encoded data.

Returns: A value that specifies the location, label, and data location of the encoded data.

Exceptions:

- `ArgumentException`: `pemData` does not contain a well-formed PEM-encoded value.

IETF RFC 7468 permits different decoding rules. This method always uses lax rules.

This does not validate the UTF-8 data outside of encapsulation boundaries and is ignored. It is the caller's responsibility to ensure the entire input is UTF-8 if required.

## PemEncoding.GetEncodedSize(Int32, Int32) method

```csharp
public static int GetEncodedSize (int labelLength, int dataLength);
```

Determines the length of a PEM-encoded value, in characters, given the length of a label and binary data.

Parameters:

- `labelLength`: The length of the label, in characters.
- `dataLength`: The length of the data, in bytes.

Returns: The number of characters in the encoded PEM.

Exceptions:

- `ArgumentOutOfRangeException`: `labelLength` is a negative value.

-or-

`dataLength` is a negative value.

-or-

`labelLength` exceeds the maximum possible label length.

-or-

`dataLength` exceeds the maximum possible encoded data length.
- `ArgumentException`: The length of the PEM-encoded value is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## PemEncoding.TryFind(Char>, PemFields) method

```csharp
public static bool TryFind (ReadOnlySpan<char> pemData, out System.Security.Cryptography.PemFields fields);
```

Attempts to find the first PEM-encoded data.

Parameters:

- `pemData`: The text containing the PEM-encoded data.
- `fields`: When this method returns, contains a value that specifies the location, label, and data location of the encoded data; or, if no PEM-encoded data is found, a value that specifies those locations as empty.

This parameter is treated as uninitialized.

Returns: `true` if PEM-encoded data was found; otherwise `false`.

#### Remarks

IETF RFC 7468 permits different decoding rules. This method always uses lax rules.

## PemEncoding.TryFindUtf8(Byte>, PemFields) method

```csharp
public static bool TryFindUtf8 (ReadOnlySpan<byte> pemData, out System.Security.Cryptography.PemFields fields);
```

Attempts to find the first PEM-encoded data.

Parameters:

- `pemData`: The text containing the PEM-encoded data.
- `fields`: When this method returns, contains a value that specifies the location, label, and data location of the encoded data; or that specifies those locations as empty if no PEM-encoded data is found.

This parameter is treated as uninitialized.

Returns: `true` if PEM-encoded data was found; otherwise `false`.

IETF RFC 7468 permits different decoding rules. This method always uses lax rules.

This does not validate the UTF-8 data outside of encapsulation boundaries and is ignored. It is the caller's responsibility to ensure the entire input is UTF-8 if required.

## PemEncoding.TryWrite(Char>, Byte>, Char>, Int32) method

```csharp
public static bool TryWrite (ReadOnlySpan<char> label, ReadOnlySpan<byte> data, Span<char> destination, out int charsWritten);
```

Tries to write the provided data and label as PEM-encoded data into a provided buffer.

Parameters:

- `label`: The label to write.
- `data`: The data to write.
- `destination`: The buffer to receive the PEM-encoded text.
- `charsWritten`: When this method returns, this parameter contains the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is large enough to contain the PEM-encoded text, otherwise `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `label` exceeds the maximum possible label length.

-or-

`data` exceeds the maximum possible encoded data length.
- `ArgumentException`: The resulting PEM-encoded text is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

-or-

`label` contains invalid characters.

#### Remarks

This method always wraps the base-64 encoded text to 64 characters, per the recommended wrapping of IETF RFC 7468. Unix-style line endings are used for line breaks.

## PemEncoding.TryWriteUtf8(Byte>, Byte>, Byte>, Int32) method

```csharp
public static bool TryWriteUtf8 (ReadOnlySpan<byte> utf8Label, ReadOnlySpan<byte> data, Span<byte> destination, out int bytesWritten);
```

Tries to write the provided data and label as PEM-encoded data into a provided buffer.

Parameters:

- `utf8Label`: The label to write.
- `data`: The data to write.
- `destination`: The buffer to receive the PEM-encoded text.
- `bytesWritten`: When this method returns, this parameter contains the number of UTF-8 encoded bytes written to `destination`.

Returns: `true` if `destination` is large enough to contain the PEM-encoded text, otherwise `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `utf8Label` exceeds the maximum possible label length.

-or-

`data` exceeds the maximum possible encoded data length.
- `ArgumentException`: The resulting PEM-encoded text is larger than `Int32.MaxValue`.

- or -

`utf8Label` contains invalid characters or is malformed UTF-8.

This method always wraps the base-64 encoded text to 64 characters, per the recommended wrapping of IETF RFC 7468. Unix-style line endings are used for line breaks.

## PemEncoding.Write(Char>, Byte>) method

```csharp
public static char[] Write (ReadOnlySpan<char> label, ReadOnlySpan<byte> data);
```

Creates an encoded PEM with the given label and data.

Parameters:

- `label`: The label to encode.
- `data`: The data to encode.

Returns: A character array of the encoded PEM.

Exceptions:

- `ArgumentOutOfRangeException`: `label` exceeds the maximum possible label length.

-or-

`data` exceeds the maximum possible encoded data length.
- `ArgumentException`: The resulting PEM-encoded text is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

-or-

`label` contains invalid characters.

#### Remarks

This method always wraps the base-64 encoded text to 64 characters, per the recommended wrapping of RFC-7468. Unix-style line endings are used for line breaks.

## PemEncoding.WriteString(Char>, Byte>) method

```csharp
public static string WriteString (ReadOnlySpan<char> label, ReadOnlySpan<byte> data);
```

Creates an encoded PEM with the given label and data.

Parameters:

- `label`: The label to encode.
- `data`: The data to encode.

Returns: A string of the encoded PEM.

Exceptions:

- `ArgumentOutOfRangeException`: `label` exceeds the maximum possible label length.

-or-

`data` exceeds the maximum possible encoded data length.
- `ArgumentException`: The resulting PEM-encoded text is larger than `Int32.MaxValue`.

-or-

`label` contains invalid characters.

#### Remarks

This method always wraps the base-64 encoded text to 64 characters, per the
recommended wrapping of RFC-7468. Unix-style line endings are used for line breaks.

## PemEncoding.WriteUtf8(Byte>, Byte>) method

```csharp
public static byte[] WriteUtf8 (ReadOnlySpan<byte> utf8Label, ReadOnlySpan<byte> data);
```

Creates an encoded PEM with the given label and data.

Parameters:

- `utf8Label`: The label to encode.
- `data`: The data to encode.

Returns: An array containing the bytes representing the UTF-8 encoding of the PEM.

Exceptions:

- `ArgumentOutOfRangeException`: `utf8Label` exceeds the maximum possible label length.

-or-

`data` exceeds the maximum possible encoded data length.
- `ArgumentException`: The resulting PEM-encoded text is larger than `Int32.MaxValue`.

-or-

`utf8Label` contains invalid characters or is malformed UTF-8.

This method always wraps the base-64 encoded text to 64 characters, per the recommended wrapping of RFC-7468. Unix-style line endings are used for line breaks.
