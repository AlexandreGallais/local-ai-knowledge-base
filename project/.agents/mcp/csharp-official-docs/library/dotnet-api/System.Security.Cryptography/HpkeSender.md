---
title: "HpkeSender class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HpkeSender.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HpkeSender class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class HpkeSender : IDisposable
```

To be added.

To be added.

## HpkeSender.HpkeSender(HpkeSuite) constructor

```csharp
protected HpkeSender (System.Security.Cryptography.HpkeSuite suite);
```

To be added.

Parameters:

- `suite`: To be added.

To be added.

## HpkeSender.Suite property

```csharp
public System.Security.Cryptography.HpkeSuite Suite { get; }
```

To be added.

Returns: To be added.

To be added.

## HpkeSender.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## HpkeSender.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## HpkeSender.Export(Byte[], Int32) method

```csharp
public byte[] Export (byte[] exporterContext, int length);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `length`: To be added.

Returns: To be added.

To be added.

## HpkeSender.Export(Byte>, Int32) method

```csharp
public byte[] Export (ReadOnlySpan<byte> exporterContext, int length);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `length`: To be added.

Returns: To be added.

To be added.

## HpkeSender.Export(Byte>, Byte>) method

```csharp
public void Export (ReadOnlySpan<byte> exporterContext, Span<byte> destination);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `destination`: To be added.

To be added.

## HpkeSender.ExportCore(Byte>, Byte>) method

```csharp
protected abstract void ExportCore (ReadOnlySpan<byte> exporterContext, Span<byte> destination);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `destination`: To be added.

To be added.

## HpkeSender.Seal(Byte[], Byte[]) method

```csharp
public byte[] Seal (byte[] plaintext, byte[]? associatedData = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `associatedData`: To be added.

Returns: To be added.

To be added.

## HpkeSender.Seal(Byte>, Byte>) method

```csharp
public byte[] Seal (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> associatedData = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `associatedData`: To be added.

Returns: To be added.

To be added.

## HpkeSender.Seal(Byte>, Byte>, Byte>) method

```csharp
public void Seal (ReadOnlySpan<byte> plaintext, Span<byte> ciphertext, ReadOnlySpan<byte> associatedData = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.

To be added.

## HpkeSender.SealCore(Byte>, Byte>, Byte>) method

```csharp
protected abstract void SealCore (ReadOnlySpan<byte> plaintext, Span<byte> ciphertext, ReadOnlySpan<byte> associatedData);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.

To be added.
