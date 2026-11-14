---
title: "XxHash128 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Hashing/XxHash128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XxHash128 class

Namespace: `System.IO.Hashing`

```csharp
public sealed class XxHash128 : System.IO.Hashing.NonCryptographicHashAlgorithm
```

Provides an implementation of the XXH128 hash algorithm for generating a 128-bit hash.

For methods that persist the computed numerical hash value as bytes, the value is written in the Big Endian byte order.

## XxHash128.XxHash128() constructor

```csharp
public XxHash128 ();
```

Initializes a new instance of the `XxHash128` class using the default seed value 0.

To be added.

## XxHash128.XxHash128(Int64) constructor

```csharp
public XxHash128 (long seed);
```

Initializes a new instance of the `XxHash128` class using the specified seed.

Parameters:

- `seed`: The seed value for the hash computation.

To be added.

## XxHash128.Append(Byte>) method

```csharp
public override void Append (ReadOnlySpan<byte> source);
```

Appends the contents of `source` to the data already processed for the current hash computation.

Parameters:

- `source`: The data to process.

To be added.

## XxHash128.Clone() method

```csharp
public System.IO.Hashing.XxHash128 Clone ();
```

Returns a clone of the current instance, with a copy of the current instance's internal state.

Returns: A new instance that will produce the same sequence of values as the current instance.

To be added.

## XxHash128.GetCurrentHashAsUInt128() method

```csharp
public UInt128 GetCurrentHashAsUInt128 ();
```

Gets the current computed hash value without modifying accumulated state.

Returns: The hash value for the data already provided.

To be added.

## XxHash128.GetCurrentHashCore(Byte>) method

```csharp
protected override void GetCurrentHashCore (Span<byte> destination);
```

Writes the computed 128-bit hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: The buffer that receives the computed hash value.

To be added.

## XxHash128.Hash(Byte[]) method

```csharp
public static byte[] Hash (byte[] source);
```

Computes the XXH128 hash of the provided `source` data.

Parameters:

- `source`: The data to hash.

Returns: The XXH128 128-bit hash code of the provided data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## XxHash128.Hash(Byte[], Int64) method

```csharp
public static byte[] Hash (byte[] source, long seed);
```

Computes the XXH128 hash of the provided data using the provided seed.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation.

Returns: The XXH128 128-bit hash code of the provided data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## XxHash128.Hash(Byte>, Int64) method

```csharp
public static byte[] Hash (ReadOnlySpan<byte> source, long seed = 0);
```

Computes the XXH128 hash of the provided `source` data using the optionally provided `seed`.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The XXH128 128-bit hash code of the provided data.

To be added.

## XxHash128.Hash(Byte>, Byte>, Int64) method

```csharp
public static int Hash (ReadOnlySpan<byte> source, Span<byte> destination, long seed = 0);
```

Computes the XXH128 hash of the provided `source` data into the provided `destination` using the optionally provided `seed`.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed 128-bit hash code.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The number of bytes written to `destination`.

Exceptions:

- `ArgumentException`: `destination` is shorter than the number of bytes produced from this hash algorithm (16 bytes).

To be added.

## XxHash128.HashToUInt128(Byte>, Int64) method

```csharp
public static UInt128 HashToUInt128 (ReadOnlySpan<byte> source, long seed = 0);
```

Computes the XXH128 hash of the provided data.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The computed XXH128 hash.

To be added.

## XxHash128.Reset() method

```csharp
public override void Reset ();
```

Resets the hash computation to the initial state.

To be added.

## XxHash128.TryHash(Byte>, Byte>, Int32, Int64) method

```csharp
public static bool TryHash (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, long seed = 0);
```

Attempts to compute the XXH128 hash of the provided `source` data into the provided `destination` using the optionally provided `seed`.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed 128-bit hash code.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: `true` if `destination` is long enough to receive the computed hash value (16 bytes); otherwise, `false`.

To be added.
