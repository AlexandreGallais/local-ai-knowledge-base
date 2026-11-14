---
title: "HpkeRecipient class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HpkeRecipient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HpkeRecipient class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class HpkeRecipient : IDisposable
```

To be added.

To be added.

## HpkeRecipient.HpkeRecipient(HpkeSuite) constructor

```csharp
protected HpkeRecipient (System.Security.Cryptography.HpkeSuite suite);
```

To be added.

Parameters:

- `suite`: To be added.

To be added.

## HpkeRecipient.Suite property

```csharp
public System.Security.Cryptography.HpkeSuite Suite { get; }
```

To be added.

Returns: To be added.

To be added.

## HpkeRecipient.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## HpkeRecipient.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## HpkeRecipient.Export(Byte[], Int32) method

```csharp
public byte[] Export (byte[] exporterContext, int length);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `length`: To be added.

Returns: To be added.

To be added.

## HpkeRecipient.Export(Byte>, Int32) method

```csharp
public byte[] Export (ReadOnlySpan<byte> exporterContext, int length);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `length`: To be added.

Returns: To be added.

To be added.

## HpkeRecipient.Export(Byte>, Byte>) method

```csharp
public void Export (ReadOnlySpan<byte> exporterContext, Span<byte> destination);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `destination`: To be added.

To be added.

## HpkeRecipient.ExportCore(Byte>, Byte>) method

```csharp
protected abstract void ExportCore (ReadOnlySpan<byte> exporterContext, Span<byte> destination);
```

To be added.

Parameters:

- `exporterContext`: To be added.
- `destination`: To be added.

To be added.

## HpkeRecipient.Open(Byte[], Byte[]) method

```csharp
public byte[] Open (byte[] ciphertext, byte[]? associatedData = default);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `associatedData`: To be added.

Returns: To be added.

To be added.

## HpkeRecipient.Open(Byte>, Byte>) method

```csharp
public byte[] Open (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> associatedData = default);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `associatedData`: To be added.

Returns: To be added.

To be added.

## HpkeRecipient.Open(Byte>, Byte>, Byte>) method

```csharp
public void Open (ReadOnlySpan<byte> ciphertext, Span<byte> plaintext, ReadOnlySpan<byte> associatedData = default);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `plaintext`: To be added.
- `associatedData`: To be added.

To be added.

## HpkeRecipient.OpenCore(Byte>, Byte>, Byte>) method

```csharp
protected abstract void OpenCore (ReadOnlySpan<byte> ciphertext, Span<byte> plaintext, ReadOnlySpan<byte> associatedData);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `plaintext`: To be added.
- `associatedData`: To be added.

To be added.
