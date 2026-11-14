---
title: "DSACng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSACng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSACng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class DSACng : System.Security.Cryptography.DSA
```

Provides a Cryptography Next Generation (CNG) implementation of the Digital Signature Algorithm (DSA).

To be added.

## DSACng.DSACng() constructor

```csharp
public DSACng ();
```

Initializes a new instance of the `DSACng` class with a random 2,048-bit key pair.

To be added.

## DSACng.DSACng(Int32) constructor

```csharp
public DSACng (int keySize);
```

Initializes a new instance of the `DSACng` class with a randomly generated key of the specified size.

Parameters:

- `keySize`: The size of the key to generate in bits.

Exceptions:

- `CryptographicException`: `keySize` is not valid.

#### Remarks
Valid key sizes range from 512 to 3,072 bits, in increments of 64. We recommend that a minimum size of 2,048 bits be used for all keys.

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

## DSACng.DSACng(CngKey) constructor

```csharp
public DSACng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `DSACng` class with the specified key.

Parameters:

- `key`: The key to use for DSA operations.

Exceptions:

- `ArgumentException`: `key` is not a valid DSA key.
- `ArgumentNullException`: `key` is `null`.

#### Remarks
The `CngKey.AlgorithmGroup` of `key` must be `CngAlgorithmGroup.Dsa`.

This constructor creates a copy of the key. Even if `key` is disposed, the copy of this key <example-value> in DSA remains alive.

## DSACng.Key <example-value>

```csharp
public System.Security.Cryptography.CngKey Key { get; }
```

Gets the key that will be used by the `DSACng` object for any cryptographic operation that it performs.

Returns: The key used by the `DSACng` object to perform cryptographic operations.

#### Remarks
The  `CngKey` object is disposed if the key is reset, for instance by changing the `KeySize` property, by using the `DSACng.ImportParameters` method to create a new key, or by disposing the parent `DSACng` object. Therefore, you should ensure that the key <example-value> is no longer used in these cases.

This `CngKey` object is not the same as the `CngKey` object passed to the `DSACng.%23ctor` constructor, if that constructor was used. However, it will point to the same CNG key.

## DSACng.KeyExchangeAlgorithm property

```csharp
public override string? KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm.

Returns: Always `null`.

To be added.

## DSACng.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the DSA algorithm.

Returns: An array that contains the key sizes supported by the algorithm.

To be added.

## DSACng.SignatureAlgorithm property

```csharp
public override string SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm.

Returns: The string "DSA".

To be added.

## DSACng.CreateSignature(Byte[]) method

```csharp
public override byte[] CreateSignature (byte[] rgbHash);
```

Creates the `DSA` signature for the specified data.

Parameters:

- `rgbHash`: The hash value to be signed.

Returns: The digital signature for the specified data.

Exceptions:

- `ArgumentNullException`: `rgbHash` is `null`.
- `CryptographicException`: This instance represents only a public key.

-or-

An error occurred during signature creation.
- `PlatformNotSupportedException`: `rgbHash` is shorter in length than the Q value of the DSA key.

To be added.

## DSACng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `DSACng` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## DSACng.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## DSACng.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## DSACng.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.DSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the DSA algorithm parameters.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The DSA algorithm parameters.

Exceptions:

- `CryptographicException`: DSA key is not a valid public or private key.

To be added.

## DSACng.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## DSACng.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected override byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified portion of a byte array by using a specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` that is to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## DSACng.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## DSACng.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## DSACng.ImportParameters(DSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.DSAParameters parameters);
```

Replaces the existing key that the current instance is working with by creating a new `CngKey` for the parameters structure.

Parameters:

- `parameters`: The DSA parameters.

Exceptions:

- `ArgumentException`: The specified DSA parameters are not valid.

To be added.

## DSACng.TryCreateSignatureCore(Byte>, Byte>, DSASignatureFormat, Int32) method

```csharp
protected override bool TryCreateSignatureCore (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

To be added.

Parameters:

- `hash`: To be added.
- `destination`: To be added.
- `signatureFormat`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## DSACng.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public override bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.

## DSACng.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

```csharp
public override bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.

## DSACng.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.

## DSACng.VerifySignature(Byte[], Byte[]) method

```csharp
public override bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

Verifies if the specified digital signature matches the specified hash.

Parameters:

- `rgbHash`: The signed hash.
- `rgbSignature`: The digital signature to be verified.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rgbHash` or `rgbSignature` is `null`.

To be added.

## DSACng.VerifySignatureCore(Byte>, Byte>, DSASignatureFormat) method

```csharp
protected override bool VerifySignatureCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

To be added.

Parameters:

- `hash`: To be added.
- `signature`: To be added.
- `signatureFormat`: To be added.

Returns: To be added.

To be added.
