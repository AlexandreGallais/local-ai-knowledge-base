---
title: "Crc64 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Hashing/Crc64.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Crc64 class

Namespace: `System.IO.Hashing`

```csharp
public sealed class Crc64 : System.IO.Hashing.NonCryptographicHashAlgorithm
```

Provides an implementation of the CRC-64 algorithm as described in ECMA-182, Annex B.

#### Remarks

This implementation emits the answer in the Big Endian byte order so that
the CRC residue relationship (CRC(message concat CRC(message)) is a fixed value) holds.
For CRC-64, this stable output is the byte sequence
`{ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }`.

There are multiple, incompatible, definitions of a 64-bit cyclic redundancy
check (CRC) algorithm. When interoperating with another system, ensure that you
are using the same definition. The definition used by this implementation is not
compatible with the cyclic redundancy check described in ISO 3309.

## Crc64.Crc64() constructor

```csharp
public Crc64 ();
```

Initializes a new instance of the `Crc64` class.

To be added.

## Crc64.Crc64(Crc64ParameterSet) constructor

```csharp
public Crc64 (System.IO.Hashing.Crc64ParameterSet parameterSet);
```

To be added.

Parameters:

- `parameterSet`: To be added.

To be added.

## Crc64.ParameterSet property

```csharp
public System.IO.Hashing.Crc64ParameterSet ParameterSet { get; }
```

To be added.

Returns: To be added.

To be added.

## Crc64.Append(Byte>) method

```csharp
public override void Append (ReadOnlySpan<byte> source);
```

Appends the contents of `source` to the data already processed for the current hash computation.

Parameters:

- `source`: The data to process.

To be added.

## Crc64.Clone() method

```csharp
public System.IO.Hashing.Crc64 Clone ();
```

Creates a clone of the current instance with a copy of the current instance's internal state.

Returns: A new instance that will produce the same sequence of values as the current instance.

To be added.

## Crc64.GetCurrentHashAsUInt64() method

```csharp
public ulong GetCurrentHashAsUInt64 ();
```

Gets the current computed hash value without modifying accumulated state.

Returns: The hash value for the data already provided.

To be added.

## Crc64.GetCurrentHashCore(Byte>) method

```csharp
protected override void GetCurrentHashCore (Span<byte> destination);
```

Writes the computed hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

To be added.

## Crc64.GetHashAndResetCore(Byte>) method

```csharp
protected override void GetHashAndResetCore (Span<byte> destination);
```

Writes the computed hash value to `destination` then clears the accumulated state.

Parameters:

- `destination`: To be added.

To be added.

## Crc64.Hash(Byte[]) method

```csharp
public static byte[] Hash (byte[] source);
```

Computes the CRC-64 hash of the provided data.

Parameters:

- `source`: The data to hash.

Returns: The CRC-64 hash of the provided data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Crc64.Hash(Byte>) method

```csharp
public static byte[] Hash (ReadOnlySpan<byte> source);
```

Computes the CRC-64 hash of the provided data.

Parameters:

- `source`: The data to hash.

Returns: The CRC-64 hash of the provided data.

To be added.

## Crc64.Hash(Crc64ParameterSet, Byte[]) method

```csharp
public static byte[] Hash (System.IO.Hashing.Crc64ParameterSet parameterSet, byte[] source);
```

To be added.

Parameters:

- `parameterSet`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Crc64.Hash(Crc64ParameterSet, Byte>) method

```csharp
public static byte[] Hash (System.IO.Hashing.Crc64ParameterSet parameterSet, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `parameterSet`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Crc64.Hash(Byte>, Byte>) method

```csharp
public static int Hash (ReadOnlySpan<byte> source, Span<byte> destination);
```

Computes the CRC-64 hash of the provided data into the provided destination.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed hash value.

Returns: The number of bytes written to `destination`.

To be added.

## Crc64.Hash(Crc64ParameterSet, Byte>, Byte>) method

```csharp
public static int Hash (System.IO.Hashing.Crc64ParameterSet parameterSet, ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `parameterSet`: To be added.
- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Crc64.HashToUInt64(Byte>) method

```csharp
public static ulong HashToUInt64 (ReadOnlySpan<byte> source);
```

Computes the CRC-64 hash of the provided data.

Parameters:

- `source`: The data to hash.

Returns: The computed CRC-64 hash.

To be added.

## Crc64.HashToUInt64(Crc64ParameterSet, Byte>) method

```csharp
public static ulong HashToUInt64 (System.IO.Hashing.Crc64ParameterSet parameterSet, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `parameterSet`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Crc64.Reset() method

```csharp
public override void Reset ();
```

Resets the hash computation to the initial state.

To be added.

## Crc64.TryHash(Byte>, Byte>, Int32) method

```csharp
public static bool TryHash (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the CRC-64 hash of the provided data into the provided destination.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed hash value.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

Returns: `true` if `destination` is long enough to receive the computed hash value (8 bytes); otherwise, `false`.

To be added.

## Crc64.TryHash(Crc64ParameterSet, Byte>, Byte>, Int32) method

```csharp
public static bool TryHash (System.IO.Hashing.Crc64ParameterSet parameterSet, ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `parameterSet`: To be added.
- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
