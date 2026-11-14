---
title: "Adler32 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Hashing/Adler32.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Adler32 class

Namespace: `System.IO.Hashing`

```csharp
public sealed class Adler32 : System.IO.Hashing.NonCryptographicHashAlgorithm
```

To be added.

To be added.

## Adler32.Adler32() constructor

```csharp
public Adler32 ();
```

To be added.

To be added.

## Adler32.Append(Byte>) method

```csharp
public override void Append (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

To be added.

## Adler32.Clone() method

```csharp
public System.IO.Hashing.Adler32 Clone ();
```

To be added.

Returns: To be added.

To be added.

## Adler32.GetCurrentHashAsUInt32() method

```csharp
public uint GetCurrentHashAsUInt32 ();
```

To be added.

Returns: To be added.

To be added.

## Adler32.GetCurrentHashCore(Byte>) method

```csharp
protected override void GetCurrentHashCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Adler32.GetHashAndResetCore(Byte>) method

```csharp
protected override void GetHashAndResetCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Adler32.Hash(Byte[]) method

```csharp
public static byte[] Hash (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Adler32.Hash(Byte>) method

```csharp
public static byte[] Hash (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Adler32.Hash(Byte>, Byte>) method

```csharp
public static int Hash (ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Adler32.HashToUInt32(Byte>) method

```csharp
public static uint HashToUInt32 (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## Adler32.Reset() method

```csharp
public override void Reset ();
```

To be added.

To be added.

## Adler32.TryHash(Byte>, Byte>, Int32) method

```csharp
public static bool TryHash (ReadOnlySpan<byte> source, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
