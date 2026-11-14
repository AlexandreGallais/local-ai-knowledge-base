---
title: "X25519DiffieHellman class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/X25519DiffieHellman.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X25519DiffieHellman class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class X25519DiffieHellman : IDisposable
```

To be added.

To be added.

## X25519DiffieHellman.X25519DiffieHellman() constructor

```csharp
protected X25519DiffieHellman ();
```

To be added.

To be added.

## X25519DiffieHellman.IsSupported property

```csharp
public static bool IsSupported { get; }
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreement(Byte[]) method

```csharp
public byte[] DeriveRawSecretAgreement (byte[] otherPartyPublicKey);
```

To be added.

Parameters:

- `otherPartyPublicKey`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreement(X25519DiffieHellman) method

```csharp
public byte[] DeriveRawSecretAgreement (System.Security.Cryptography.X25519DiffieHellman otherParty);
```

To be added.

Parameters:

- `otherParty`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreement(Byte>, Byte>) method

```csharp
public void DeriveRawSecretAgreement (ReadOnlySpan<byte> otherPartyPublicKey, Span<byte> destination);
```

To be added.

Parameters:

- `otherPartyPublicKey`: To be added.
- `destination`: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreement(X25519DiffieHellman, Byte>) method

```csharp
public void DeriveRawSecretAgreement (System.Security.Cryptography.X25519DiffieHellman otherParty, Span<byte> destination);
```

To be added.

Parameters:

- `otherParty`: To be added.
- `destination`: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreementCore(Byte>, Byte>) method

```csharp
protected abstract void DeriveRawSecretAgreementCore (ReadOnlySpan<byte> otherPartyPublicKey, Span<byte> destination);
```

To be added.

Parameters:

- `otherPartyPublicKey`: To be added.
- `destination`: To be added.

To be added.

## X25519DiffieHellman.DeriveRawSecretAgreementCore(X25519DiffieHellman, Byte>) method

```csharp
protected abstract void DeriveRawSecretAgreementCore (System.Security.Cryptography.X25519DiffieHellman otherParty, Span<byte> destination);
```

To be added.

Parameters:

- `otherParty`: To be added.
- `destination`: To be added.

To be added.

## X25519DiffieHellman.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## X25519DiffieHellman.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportPkcs8PrivateKey() method

```csharp
public byte[] ExportPkcs8PrivateKey ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportPrivateKey() method

```csharp
public byte[] ExportPrivateKey ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportPrivateKey(Byte>) method

```csharp
public void ExportPrivateKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## X25519DiffieHellman.ExportPrivateKeyCore(Byte>) method

```csharp
protected abstract void ExportPrivateKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## X25519DiffieHellman.ExportPublicKey() method

```csharp
public byte[] ExportPublicKey ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportPublicKey(Byte>) method

```csharp
public void ExportPublicKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## X25519DiffieHellman.ExportPublicKeyCore(Byte>) method

```csharp
protected abstract void ExportPublicKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

To be added.

## X25519DiffieHellman.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.GenerateKey() method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman GenerateKey ();
```

To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromPem (ReadOnlySpan<char> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPrivateKey (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPublicKey(Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPublicKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportPublicKey(Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportPublicKey (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.X25519DiffieHellman ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `pbeParameters`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected abstract bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## X25519DiffieHellman.PrivateKeySizeInBytes field

```csharp
public const int PrivateKeySizeInBytes = 32;
```

To be added.

To be added.

## X25519DiffieHellman.PublicKeySizeInBytes field

```csharp
public const int PublicKeySizeInBytes = 32;
```

To be added.

To be added.

## X25519DiffieHellman.SecretAgreementSizeInBytes field

```csharp
public const int SecretAgreementSizeInBytes = 32;
```

To be added.

To be added.
