---
title: "CompositeMLKem class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CompositeMLKem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeMLKem class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class CompositeMLKem : IDisposable
```

To be added.

To be added.

## CompositeMLKem.CompositeMLKem(CompositeMLKemAlgorithm) constructor

```csharp
protected CompositeMLKem (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm);
```

To be added.

Parameters:

- `algorithm`: To be added.

To be added.

## CompositeMLKem.Algorithm property

```csharp
public System.Security.Cryptography.CompositeMLKemAlgorithm Algorithm { get; }
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.Decapsulate(Byte[]) method

```csharp
public byte[] Decapsulate (byte[] ciphertext);
```

To be added.

Parameters:

- `ciphertext`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.Decapsulate(Byte>, Byte>) method

```csharp
public void Decapsulate (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## CompositeMLKem.DecapsulateCore(Byte>, Byte>) method

```csharp
protected abstract void DecapsulateCore (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## CompositeMLKem.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## CompositeMLKem.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## CompositeMLKem.Encapsulate(Byte[], Byte[]) method

```csharp
public void Encapsulate (out byte[] ciphertext, out byte[] sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## CompositeMLKem.Encapsulate(Byte>, Byte>) method

```csharp
public void Encapsulate (Span<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## CompositeMLKem.EncapsulateCore(Byte>, Byte>) method

```csharp
protected abstract void EncapsulateCore (Span<byte> ciphertext, Span<byte> sharedSecret);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `sharedSecret`: To be added.

To be added.

## CompositeMLKem.ExportDecapsulationKey() method

```csharp
public byte[] ExportDecapsulationKey ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportDecapsulationKey(Byte>) method

```csharp
public int ExportDecapsulationKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportDecapsulationKeyCore(Byte>) method

```csharp
protected abstract int ExportDecapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncapsulationKey() method

```csharp
public byte[] ExportEncapsulationKey ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncapsulationKey(Byte>) method

```csharp
public int ExportEncapsulationKey (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncapsulationKeyCore(Byte>) method

```csharp
protected abstract int ExportEncapsulationKeyCore (Span<byte> destination);
```

To be added.

Parameters:

- `destination`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportPkcs8PrivateKey() method

```csharp
public byte[] ExportPkcs8PrivateKey ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

To be added.

Returns: To be added.

To be added.

## CompositeMLKem.GenerateKey(CompositeMLKemAlgorithm) method

```csharp
public static System.Security.Cryptography.CompositeMLKem GenerateKey (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm);
```

To be added.

Parameters:

- `algorithm`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportDecapsulationKey(CompositeMLKemAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportDecapsulationKey (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportDecapsulationKey(CompositeMLKemAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportDecapsulationKey (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportEncapsulationKey(CompositeMLKemAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportEncapsulationKey (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportEncapsulationKey(CompositeMLKemAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportEncapsulationKey (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `passwordBytes`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromPem (ReadOnlySpan<char> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLKem ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.IsAlgorithmSupported(CompositeMLKemAlgorithm) method

```csharp
public static bool IsAlgorithmSupported (System.Security.Cryptography.CompositeMLKemAlgorithm algorithm);
```

To be added.

Parameters:

- `algorithm`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.TryExportDecapsulationKey(Byte>, Int32) method

```csharp
public bool TryExportDecapsulationKey (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.TryExportEncapsulationKey(Byte>, Int32) method

```csharp
public bool TryExportEncapsulationKey (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## CompositeMLKem.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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

## CompositeMLKem.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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

## CompositeMLKem.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

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

## CompositeMLKem.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
