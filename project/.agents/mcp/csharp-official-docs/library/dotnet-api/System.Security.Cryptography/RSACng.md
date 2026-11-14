---
title: "RSACng class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSACng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RSACng : System.Security.Cryptography.RSA
```

Provides a Cryptography Next Generation (CNG) implementation of the RSA algorithm.

#### Remarks
The `RSACng` class is derived from the `RSA` class. Therefore, it is not a drop-in replacement for existing uses of `RSACryptoServiceProvider`.

`RSACng` uses a programming model that is similar to the `ECDsaCng` class rather than the `RSACryptoServiceProvider` class. For example:

- The key used by `RSACng` is managed by a separate `CngKey` object. In contrast, `RSACryptoServiceProvider` has a key that is directly tied to the operations of the type itself.

-   `RSACng` performs such operations as signing and verifying signatures by using properties of the `RSACng` object, just as `ECDsaCng` uses its object properties to control signing and verification operations.

> **Note:**
> The `RSACng` class is an implementation of the RSA algorithm using the Windows CNG libraries and isn't available on operating systems other than Windows. For applications which aren't doing Windows interop, you're encouraged to use `RSA.Create` instead of referencing this type directly.

## RSACng.RSACng() constructor

```csharp
public RSACng ();
```

Initializes a new instance of the `RSACng` class with a random 2,048-bit key pair.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to 2048 and when a key is needed one is generated using the property value.
If a key is loaded via the `RSACng.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## RSACng.RSACng(Int32) constructor

```csharp
public RSACng (int keySize);
```

Initializes a new instance of the `RSACng` class with a randomly generated key of the specified size.

Parameters:

- `keySize`: The size of the key to generate in bits.

Exceptions:

- `CryptographicException`: `keySize` is not valid.

#### Remarks
Valid key sizes range from 384 to 16,384 bits, in increments of 8. We recommend that a minimum size of 2,048 bits be used for all keys.

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to `keySize` and when a key is needed one is generated using the property value.
If a key is loaded via the `RSACng.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## RSACng.RSACng(CngKey) constructor

```csharp
public RSACng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `RSACng` class with the specified key.

Parameters:

- `key`: The key to use for RSA operations.

Exceptions:

- `ArgumentException`: `key` is not a valid RSA key.
- `ArgumentNullException`: `key` is `null`.

#### Remarks
The `CngKey.AlgorithmGroup` of `key` must be `CngAlgorithmGroup.Rsa`.

This constructor creates a copy of the key. Even if `key` is disposed, the copy of this key <example-value> in RSA remains alive.

## RSACng.Key <example-value>

```csharp
public System.Security.Cryptography.CngKey Key { get; }
```

Gets the key that will be used by the `RSACng` object for any cryptographic operation that it performs.

Returns: The key used by the `RSACng` object.

#### Remarks
The returned `CngKey` object is disposed if the key is reset, for instance by changing the `KeySize` property, by using the `RSA.ImportParameters` to create a new key, or by disposing of the parent `RSA` object. Therefore, you should ensure that the key <example-value> is no longer used in these cases.

This `CngKey` object is not the same as the `CngKey` object passed to the `RSACng.%23ctor` constructor, if that constructor was used. However, it will point to the same CNG key.

## RSACng.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by this implementation of RSA.

Returns: An array that contains the key sizes supported by the algorithm.

To be added.

## RSACng.Decrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Decrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Decrypts input data using the specified padding mode.

Parameters:

- `data`: The data to decrypt.
- `padding`: The padding mode.

Returns: The decrypted data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: `padding`.`RSAEncryptionPadding.Mode` isn't equal to `RSAEncryptionPaddingMode.Pkcs1` or `RSAEncryptionPaddingMode.Oaep`.

To be added.

## RSACng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `RSACng` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## RSACng.Encrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Encrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Encrypts the input data using the specified padding.

Parameters:

- `data`: The data to encrypt.
- `padding`: The padding mode.

Returns: The encrypted data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: `padding`.`RSAEncryptionPadding.Mode` isn't equal to `RSAEncryptionPaddingMode.Pkcs1` or `RSAEncryptionPaddingMode.Oaep`.

To be added.

## RSACng.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## RSACng.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## RSACng.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.RSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the key used by the RSA object into a `RSAParameters` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key used by the RSA object.

To be added.

## RSACng.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The hash algorithm.

Returns: The hashed data.

To be added.

## RSACng.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected override byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a specified portion of a byte array by using a specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` that is to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use in hash the data.

Returns: The hashed data.

To be added.

## RSACng.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## RSACng.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## RSACng.ImportParameters(RSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.RSAParameters parameters);
```

Replaces the existing key that the current instance is working with by creating a new `CngKey` for the parameters structure.

Parameters:

- `parameters`: The RSA parameters.

Exceptions:

- `ArgumentException`: `parameters` contains neither an exponent nor a modulus.
- `CryptographicException`: `parameters` is not a valid RSA key.

-or-

`parameters` is a full key pair and the default KSP is used.

#### Remarks
If `parameters` contains only an exponent and modulus, only a public key is imported. If `parameters` also contains P and Q values, a full key pair is imported.

This method builds a new ephemeral RSA key <example-value> using the specified parameters and replaces the `Key` value with the new key,
any already open key is unaffected by this method.

## RSACng.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## RSACng.SignHash(Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override byte[] SignHash (byte[] hash, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Signs data that was hashed by using the specified hashing algorithm and padding mode.

Parameters:

- `hash`: The hash to sign.
- `hashAlgorithm`: The hash algorithm name.
- `padding`: The padding mode.

Returns: The signed data.

Exceptions:

- `ArgumentNullException`: `hash` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: The value of the `HashAlgorithmName.Name` property of `hashAlgorithm` is `null` or `String.Empty`.
- `CryptographicException`: `padding` does not equal `RSASignaturePadding.Pkcs1` or `RSASignaturePadding.Pss`.

To be added.

## RSACng.TryDecrypt(Byte>, Byte>, RSAEncryptionPadding, Int32) method

```csharp
public override bool TryDecrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding, out int bytesWritten);
```

Decrypts data using the private key.

Parameters:

- `data`: The data to decrypt.
- `destination`: The buffer to receive the decrypted data.
- `padding`: The padding mode.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the decrypted data; otherwise, `false`.

To be added.

## RSACng.TryEncrypt(Byte>, Byte>, RSAEncryptionPadding, Int32) method

```csharp
public override bool TryEncrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding, out int bytesWritten);
```

Encrypts data using the public key.

Parameters:

- `data`: The data to encrypt.
- `destination`: The buffer to receive the encrypted data.
- `padding`: The padding mode.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the encrypted data; otherwise, `false`.

To be added.

## RSACng.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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
