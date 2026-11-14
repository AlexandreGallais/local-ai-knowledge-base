---
title: "RSA class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSA class (part 3 of 4)

## RSA.SignData(Byte[], Int32, Int32, HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual byte[] SignData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the hash value of a portion of the specified byte array using the specified hash algorithm and padding mode, and signs the resulting hash value.

Parameters:

- `data`: The input data to hash and sign.
- `offset`: The offset into the array at which to begin using data.
- `count`: The number of bytes in the array to use as data.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `padding`: The padding mode.

Returns: The RSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

To be added.

## RSA.SignHash(Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual byte[] SignHash (byte[] hash, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

When overridden in a derived class, computes the signature for the specified hash value using the specified padding.

Parameters:

- `hash`: The hash value of the data to be signed.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding.

Returns: The RSA signature for the specified hash value.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentNullException`: `hash` or `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

To be added.

## RSA.SignHash(Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public byte[] SignHash (ReadOnlySpan<byte> hash, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the signature for the specified hash value using the specified padding.

Parameters:

- `hash`: The hash value of the data to be signed.
- `hashAlgorithm`: The hash algorithm used to create the hash of `hash`.
- `padding`: The padding mode.

Returns: The RSA signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: `padding` or `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.
- `NotImplementedException`: This implementation has not implemented one of `RSA.TrySignHash`
or `RSA.SignHash`.

To be added.

## RSA.SignHash(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public int SignHash (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Signs the hash with the current key, writing the signature into a provided buffer.

Parameters:

- `hash`: The hash value of the data to be signed.
- `destination`: The buffer to receive the RSA signature.
- `hashAlgorithm`: The hash algorithm used to create the hash of `hash`.
- `padding`: The padding mode.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `padding` or `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.

-or-

The buffer in `destination` is too small to hold the signature.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.
- `NotImplementedException`: This implementation has not implemented one of `RSA.TrySignHash`
or `RSA.SignHash`.

To be added.

## RSA.ToXmlString(Boolean) method

```csharp
public override string ToXmlString (bool includePrivateParameters);
```

Creates and returns an XML string containing the key of the current `RSA` object.

Parameters:

- `includePrivateParameters`: `true` to include a public and private RSA key; `false` to include only the public key.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## RSA.TryDecrypt(Byte>, Byte>, RSAEncryptionPadding, Int32) method

```csharp
public virtual bool TryDecrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding, out int bytesWritten);
```

Attempts to decrypt the input data using the specified padding mode, writing the result into a provided buffer.

Parameters:

- `data`: The data to decrypt.
- `destination`: The buffer to receive the decrypted data.
- `padding`: The padding mode.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is not equal to the number of bytes for `AsymmetricAlgorithm.KeySize`.

-or-

This instance represents only a public key.

-or-

The decryption operation failed.

#### Remarks
The default implementation of this method calls `Decrypt` and copies the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

The RSA decryption algorithm will always produce an output smaller than the input, therefore this method will never return `false` when `destination.Length >= data.Length`.

## RSA.TryEncrypt(Byte>, Byte>, RSAEncryptionPadding, Int32) method

```csharp
public virtual bool TryEncrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding, out int bytesWritten);
```

Attempts to encrypt the input data with a specified padding mode into a provided buffer.

Parameters:

- `data`: The data to encrypt.
- `destination`: The buffer to receive the encrypted data.
- `padding`: The padding mode.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is too long for the combination of `AsymmetricAlgorithm.KeySize` and the selected padding.

-or-

The encryption operation failed.

#### Remarks
The default implementation of this method calls `Encrypt` and copies the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

The RSA encryption algorithm will always produce an output equal to the number of bytes required for `KeySize` bits.

## RSA.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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

Exceptions:

- `CryptographicException`: The key could not be exported.

-or-

`pbeParameters` indicates that `PbeEncryptionAlgorithm.TripleDes3KeyPkcs12` should be used, which requires `Char`-based passwords.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

## RSA.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks
When `pbeParameters` indicates an algorithm that uses PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

## RSA.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## RSA.TryExportRSAPrivateKey(Byte>, Int32) method

```csharp
public virtual bool TryExportRSAPrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#1 RSAPrivateKey <example-value> into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#1 RSAPrivateKey data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## RSA.TryExportRSAPrivateKeyPem(Char>, Int32) method

```csharp
public bool TryExportRSAPrivateKeyPem (Span<char> destination, out int charsWritten);
```

Attempts to export the current key in the PEM-encoded PKCS#1 RSAPrivateKey <example-value> into a provided buffer.

Parameters:

- `destination`: The character span to receive the PEM-encoded PKCS#1 RSAPrivateKey data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#1 RSAPrivateKey will begin with
`-----BEGIN RSA PRIVATE KEY-----` and end with
`-----END RSA PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## RSA.TryExportRSAPublicKey(Byte>, Int32) method

```csharp
public virtual bool TryExportRSAPublicKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#1 RSAPublicKey <example-value> into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#1 RSAPublicKey data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## RSA.TryExportRSAPublicKeyPem(Char>, Int32) method

```csharp
public bool TryExportRSAPublicKeyPem (Span<char> destination, out int charsWritten);
```

Attempts to export the current key in the PEM-encoded PKCS#1 RSAPublicKey <example-value> into a provided buffer.

Parameters:

- `destination`: The character span to receive the PEM-encoded PKCS#1 RSAPublicKey data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#1 RSAPublicKey will begin with
`-----BEGIN RSA PUBLIC KEY-----` and end with
`-----END RSA PUBLIC KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.
