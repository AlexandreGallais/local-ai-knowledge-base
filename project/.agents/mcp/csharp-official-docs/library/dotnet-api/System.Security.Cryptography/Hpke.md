---
title: "Hpke class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Hpke.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Hpke class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class Hpke : IDisposable
```

To be added.

To be added.

## Hpke.Hpke(HpkeSuite) constructor

```csharp
protected Hpke (System.Security.Cryptography.HpkeSuite suite);
```

To be added.

Parameters:

- `suite`: To be added.

To be added.

## Hpke.Suite property

```csharp
public System.Security.Cryptography.HpkeSuite Suite { get; }
```

To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskRecipient(Byte[], Byte[], Byte[], Byte[]) method

```csharp
public System.Security.Cryptography.HpkeRecipient CreatePskRecipient (byte[] encapsulatedSecret, byte[] psk, byte[] pskId, byte[]? info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `psk`: To be added.
- `pskId`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskRecipient(Byte>, Byte>, Byte>, Byte>) method

```csharp
public System.Security.Cryptography.HpkeRecipient CreatePskRecipient (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> psk, ReadOnlySpan<byte> pskId, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `psk`: To be added.
- `pskId`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskRecipientCore(Byte>, Byte>, Byte>, Byte>) method

```csharp
protected abstract System.Security.Cryptography.HpkeRecipient CreatePskRecipientCore (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> info, ReadOnlySpan<byte> psk, ReadOnlySpan<byte> pskId);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.
- `psk`: To be added.
- `pskId`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskSender(Byte[], Byte[], Byte[], Byte[]) method

```csharp
public System.Security.Cryptography.HpkeSender CreatePskSender (byte[] psk, byte[] pskId, out byte[] encapsulatedSecret, byte[]? info = default);
```

To be added.

Parameters:

- `psk`: To be added.
- `pskId`: To be added.
- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskSender(Byte>, Byte>, Byte[], Byte>) method

```csharp
public System.Security.Cryptography.HpkeSender CreatePskSender (ReadOnlySpan<byte> psk, ReadOnlySpan<byte> pskId, out byte[] encapsulatedSecret, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `psk`: To be added.
- `pskId`: To be added.
- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskSender(Byte>, Byte>, Byte>, Byte>) method

```csharp
public System.Security.Cryptography.HpkeSender CreatePskSender (ReadOnlySpan<byte> psk, ReadOnlySpan<byte> pskId, Span<byte> encapsulatedSecret, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `psk`: To be added.
- `pskId`: To be added.
- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreatePskSenderCore(Byte>, Byte>, Byte>, Byte>) method

```csharp
protected abstract System.Security.Cryptography.HpkeSender CreatePskSenderCore (Span<byte> encapsulatedSecret, ReadOnlySpan<byte> info, ReadOnlySpan<byte> psk, ReadOnlySpan<byte> pskId);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.
- `psk`: To be added.
- `pskId`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateRecipient(Byte[], Byte[]) method

```csharp
public System.Security.Cryptography.HpkeRecipient CreateRecipient (byte[] encapsulatedSecret, byte[]? info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateRecipient(Byte>, Byte>) method

```csharp
public System.Security.Cryptography.HpkeRecipient CreateRecipient (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateRecipientCore(Byte>, Byte>) method

```csharp
protected abstract System.Security.Cryptography.HpkeRecipient CreateRecipientCore (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> info);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateSender(Byte[], Byte>) method

```csharp
public System.Security.Cryptography.HpkeSender CreateSender (out byte[] encapsulatedSecret, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateSender(Byte>, Byte>) method

```csharp
public System.Security.Cryptography.HpkeSender CreateSender (Span<byte> encapsulatedSecret, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.CreateSenderCore(Byte>, Byte>) method

```csharp
protected abstract System.Security.Cryptography.HpkeSender CreateSenderCore (Span<byte> encapsulatedSecret, ReadOnlySpan<byte> info);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.DeriveKey(HpkeSuite, Byte[]) method

```csharp
public static System.Security.Cryptography.Hpke DeriveKey (System.Security.Cryptography.HpkeSuite suite, byte[] ikm);
```

To be added.

Parameters:

- `suite`: To be added.
- `ikm`: To be added.

Returns: To be added.

To be added.

## Hpke.DeriveKey(HpkeSuite, Byte>) method

```csharp
public static System.Security.Cryptography.Hpke DeriveKey (System.Security.Cryptography.HpkeSuite suite, ReadOnlySpan<byte> ikm);
```

To be added.

Parameters:

- `suite`: To be added.
- `ikm`: To be added.

Returns: To be added.

To be added.

## Hpke.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## Hpke.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## Hpke.ExportDecapsulationKey() method

```csharp
public byte[] ExportDecapsulationKey ();
```

To be added.

Returns: To be added.

To be added.

## Hpke.ExportDecapsulationKey(Byte>) method

```csharp
public void ExportDecapsulationKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Hpke.ExportDecapsulationKeyCore(Byte>) method

```csharp
protected abstract void ExportDecapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Hpke.ExportEncapsulationKey() method

```csharp
public byte[] ExportEncapsulationKey ();
```

To be added.

Returns: To be added.

To be added.

## Hpke.ExportEncapsulationKey(Byte>) method

```csharp
public void ExportEncapsulationKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Hpke.ExportEncapsulationKeyCore(Byte>) method

```csharp
protected abstract void ExportEncapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## Hpke.GenerateKey(HpkeSuite) method

```csharp
public static System.Security.Cryptography.Hpke GenerateKey (System.Security.Cryptography.HpkeSuite suite);
```

To be added.

Parameters:

- `suite`: To be added.

Returns: To be added.

To be added.

## Hpke.ImportDecapsulationKey(HpkeSuite, Byte[]) method

```csharp
public static System.Security.Cryptography.Hpke ImportDecapsulationKey (System.Security.Cryptography.HpkeSuite suite, byte[] source);
```

To be added.

Parameters:

- `suite`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Hpke.ImportDecapsulationKey(HpkeSuite, Byte>) method

```csharp
public static System.Security.Cryptography.Hpke ImportDecapsulationKey (System.Security.Cryptography.HpkeSuite suite, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `suite`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Hpke.ImportEncapsulationKey(HpkeSuite, Byte[]) method

```csharp
public static System.Security.Cryptography.Hpke ImportEncapsulationKey (System.Security.Cryptography.HpkeSuite suite, byte[] source);
```

To be added.

Parameters:

- `suite`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Hpke.ImportEncapsulationKey(HpkeSuite, Byte>) method

```csharp
public static System.Security.Cryptography.Hpke ImportEncapsulationKey (System.Security.Cryptography.HpkeSuite suite, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `suite`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Hpke.IsSupported(HpkeSuite) method

```csharp
public static bool IsSupported (System.Security.Cryptography.HpkeSuite suite);
```

To be added.

Parameters:

- `suite`: To be added.

Returns: To be added.

To be added.

## Hpke.Open(Byte[], Byte[], Byte[], Byte[]) method

```csharp
public byte[] Open (byte[] encapsulatedSecret, byte[] ciphertext, byte[]? associatedData = default, byte[]? info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.Open(Byte>, Byte>, Byte>, Byte>) method

```csharp
public byte[] Open (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> associatedData = default, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

Returns: To be added.

To be added.

## Hpke.Open(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
public void Open (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> ciphertext, Span<byte> plaintext, ReadOnlySpan<byte> associatedData = default, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `plaintext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.

## Hpke.OpenCore(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
protected abstract void OpenCore (ReadOnlySpan<byte> encapsulatedSecret, ReadOnlySpan<byte> ciphertext, Span<byte> plaintext, ReadOnlySpan<byte> associatedData, ReadOnlySpan<byte> info);
```

To be added.

Parameters:

- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `plaintext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.

## Hpke.Seal(Byte[], Byte[], Byte[], Byte[], Byte[]) method

```csharp
public void Seal (byte[] plaintext, out byte[] encapsulatedSecret, out byte[] ciphertext, byte[]? associatedData = default, byte[]? info = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.

## Hpke.Seal(Byte>, Byte[], Byte[], Byte>, Byte>) method

```csharp
public void Seal (ReadOnlySpan<byte> plaintext, out byte[] encapsulatedSecret, out byte[] ciphertext, ReadOnlySpan<byte> associatedData = default, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.

## Hpke.Seal(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
public void Seal (ReadOnlySpan<byte> plaintext, Span<byte> encapsulatedSecret, Span<byte> ciphertext, ReadOnlySpan<byte> associatedData = default, ReadOnlySpan<byte> info = default);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.

## Hpke.SealCore(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
protected abstract void SealCore (ReadOnlySpan<byte> plaintext, Span<byte> encapsulatedSecret, Span<byte> ciphertext, ReadOnlySpan<byte> associatedData, ReadOnlySpan<byte> info);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `encapsulatedSecret`: To be added.
- `ciphertext`: To be added.
- `associatedData`: To be added.
- `info`: To be added.

To be added.
