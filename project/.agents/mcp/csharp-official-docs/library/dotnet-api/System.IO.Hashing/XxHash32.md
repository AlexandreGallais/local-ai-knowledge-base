---
title: "XxHash32 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Hashing/XxHash32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XxHash32 class

Namespace: `System.IO.Hashing`

```csharp
public sealed class XxHash32 : System.IO.Hashing.NonCryptographicHashAlgorithm
```

Provides an implementation of the XxHash32 algorithm.

For methods that persist the computed numerical hash value as bytes, the value is written in the Big Endian byte order.

## XxHash32.XxHash32() constructor

```csharp
public XxHash32 ();
```

Initializes a new instance of the `XxHash32` class.

The XXH32 algorithm supports an optional seed value. Instances created with this constructor use the default seed, zero.

## XxHash32.XxHash32(Int32) constructor

```csharp
public XxHash32 (int seed);
```

Initializes a new instance of the `XxHash32` class with a specified seed.

Parameters:

- `seed`: The hash seed value for computations from this instance.

To be added.

## XxHash32.Append(Byte>) method

```csharp
public override void Append (ReadOnlySpan<byte> source);
```

Appends the contents of `source` to the data already processed for the current hash computation.

Parameters:

- `source`: The data to process.

To be added.

## XxHash32.Clone() method

```csharp
public System.IO.Hashing.XxHash32 Clone ();
```

Returns a clone of the current instance, with a copy of the current instance's internal state.

Returns: A new instance that will produce the same sequence of values as the current instance.

To be added.

## XxHash32.GetCurrentHashAsUInt32() method

```csharp
public uint GetCurrentHashAsUInt32 ();
```

Gets the current computed hash value without modifying accumulated state.

Returns: The hash value for the data already provided.

To be added.

## XxHash32.GetCurrentHashCore(Byte>) method

```csharp
protected override void GetCurrentHashCore (Span<byte> destination);
```

Writes the computed hash value to `destination` without modifying accumulated state.

Parameters:

- `destination`: To be added.

To be added.

## XxHash32.Hash(Byte[]) method

```csharp
public static byte[] Hash (byte[] source);
```

Computes the XXH32 hash of the provided data.

Parameters:

- `source`: The data to hash.

Returns: The XXH32 hash of the provided data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## XxHash32.Hash(Byte[], Int32) method

```csharp
public static byte[] Hash (byte[] source, int seed);
```

Computes the XXH32 hash of the provided data using the provided seed.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation.

Returns: The XXH32 hash of the provided data.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## XxHash32.Hash(Byte>, Int32) method

```csharp
public static byte[] Hash (ReadOnlySpan<byte> source, int seed = 0);
```

Computes the XXH32 hash of the provided data.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The XXH32 hash of the provided data.

To be added.

## XxHash32.Hash(Byte>, Byte>, Int32) method

```csharp
public static int Hash (ReadOnlySpan<byte> source, Span<byte> destination, int seed = 0);
```

Computes the XXH32 hash of the provided data into the provided destination.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed hash value.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The number of bytes written to `destination`.

To be added.

## XxHash32.HashToUInt32(Byte>, Int32) method

```csharp
public static uint HashToUInt32 (ReadOnlySpan<byte> source, int seed = 0);
```

Computes the XXH32 hash of the provided data.

Parameters:

- `source`: The data to hash.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: The computed XXH32 hash.

To be added.

## XxHash32.Reset() method

```csharp
public override void Reset ();
```

Resets the hash computation to the initial state.

To be added.

## XxHash32.TryHash(Byte>, Byte>, Int32, Int32) method

```csharp
public static bool TryHash (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten, int seed = 0);
```

Attempts to compute the XXH32 hash of the provided data into the provided destination.

Parameters:

- `source`: The data to hash.
- `destination`: The buffer that receives the computed hash value.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.
- `seed`: The seed value for this hash computation. The default is zero.

Returns: `true` if `destination` is long enough to receive the computed hash value (4 bytes); otherwise, `false`.

To be added.
