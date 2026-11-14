---
title: "KmacXof128 class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/KmacXof128.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KmacXof128 class (part 2 of 2)

## KmacXof128.Verify(Byte[], Stream, Byte[], Byte[]) method

```csharp
public static bool Verify (byte[] key, System.IO.Stream source, byte[] hash, byte[]? customizationString = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.

Returns: To be added.

To be added.

## KmacXof128.Verify(Byte>, Stream, Byte>, Byte>) method

```csharp
public static bool Verify (ReadOnlySpan<byte> key, System.IO.Stream source, ReadOnlySpan<byte> hash, ReadOnlySpan<byte> customizationString = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.

Returns: To be added.

To be added.

## KmacXof128.Verify(Byte>, Byte>, Byte>, Byte>) method

```csharp
public static bool Verify (ReadOnlySpan<byte> key, ReadOnlySpan<byte> source, ReadOnlySpan<byte> hash, ReadOnlySpan<byte> customizationString = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyAsync(Byte[], Stream, Byte[], Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyAsync (byte[] key, System.IO.Stream source, byte[] hash, byte[]? customizationString = default, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyAsync(Byte>, Stream, Byte>, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> VerifyAsync (ReadOnlyMemory<byte> key, System.IO.Stream source, ReadOnlyMemory<byte> hash, ReadOnlyMemory<byte> customizationString = default, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `key`: To be added.
- `source`: To be added.
- `hash`: To be added.
- `customizationString`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyCurrentHash(Byte[]) method

```csharp
public bool VerifyCurrentHash (byte[] hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyCurrentHash(Byte>) method

```csharp
public bool VerifyCurrentHash (ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyHashAndReset(Byte[]) method

```csharp
public bool VerifyHashAndReset (byte[] hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.

## KmacXof128.VerifyHashAndReset(Byte>) method

```csharp
public bool VerifyHashAndReset (ReadOnlySpan<byte> hash);
```

To be added.

Parameters:

- `hash`: To be added.

Returns: To be added.

To be added.
