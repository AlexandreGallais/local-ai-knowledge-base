---
title: "RSA class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSA class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class RSA : System.Security.Cryptography.AsymmetricAlgorithm
```

Represents the base class from which all implementations of the `RSA` algorithm inherit.

#### Remarks

Developers are encouraged to program against the `RSA` base class rather than any specific derived class. The derived classes are intended for interop with the underlying system cryptographic libraries.

## RSA.RSA() constructor

```csharp
protected RSA ();
```

Initializes a new instance of the `RSA` class.

#### Remarks
This is a protected method that can only be called from a class derived from `RSA`. You cannot create an instance of an abstract class.

## RSA.KeyExchangeAlgorithm property

```csharp
public override string? KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm available with this implementation of `RSA`.

Returns: Returns "RSA".

To be added.

## RSA.SignatureAlgorithm property

```csharp
public override string SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm available with this implementation of `RSA`.

Returns: Returns "RSA".

To be added.

## RSA.Create() method

```csharp
public static System.Security.Cryptography.RSA Create ();
```

Creates an instance of the default implementation of the `RSA` algorithm.

Returns: A new instance of the default implementation of `RSA`.

To be added.

## RSA.Create(Int32) method

```csharp
public static System.Security.Cryptography.RSA Create (int keySizeInBits);
```

Creates a new ephemeral RSA key with the specified key size.

Parameters:

- `keySizeInBits`: The key size, in bits.

Returns: A new ephemeral RSA key with the specified key size.

Exceptions:

- `CryptographicException`: `keySizeInBits` is not supported by the default implementation.

To be added.

## RSA.Create(RSAParameters) method

```csharp
public static System.Security.Cryptography.RSA Create (System.Security.Cryptography.RSAParameters parameters);
```

Creates a new ephemeral RSA key with the specified RSA key parameters.

Parameters:

- `parameters`: The parameters for the `RSA` algorithm.

Returns: A new ephemeral RSA key.

Exceptions:

- `CryptographicException`: `parameters` does not represent a valid RSA key.

To be added.

## RSA.Create(String) method

```csharp
public static System.Security.Cryptography.RSA? Create (string algName);
```

Creates an instance of the specified implementation of `RSA`.

Parameters:

- `algName`: The name of the implementation of `RSA` to use.

Returns: A new instance of the specified implementation of `RSA`.

To be added.

## RSA.Decrypt(Byte[], RSAEncryptionPadding) method

```csharp
public virtual byte[] Decrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

When overridden in a derived class, decrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to decrypt.
- `padding`: The padding mode.

Returns: The decrypted data.

Exceptions:

- `ArgumentNullException`: `data` or `padding` is `null`.
- `NotImplementedException`: A derived class must override this method.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is not equal to the number of bytes for `AsymmetricAlgorithm.KeySize`.

-or-

This instance represents only a public key.

-or-

The decryption operation failed.

To be added.

## RSA.Decrypt(Byte>, RSAEncryptionPadding) method

```csharp
public byte[] Decrypt (ReadOnlySpan<byte> data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Decrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to decrypt.
- `padding`: The padding mode.

Returns: The decrypted data.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The decryption operation failed.
- `NotImplementedException`: This implementation has not implemented one of `RSA.Decrypt` or
`RSA.TryDecrypt`.

To be added.

## RSA.Decrypt(Byte>, Byte>, RSAEncryptionPadding) method

```csharp
public int Decrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Decrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to decrypt.
- `destination`: The buffer to receive the decrypted data.
- `padding`: The padding mode.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the decrypted data.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The decryption operation failed.
- `NotImplementedException`: This implementation has not implemented one of `RSA.Decrypt` or
`RSA.TryDecrypt`.

To be added.

## RSA.DecryptValue(Byte[]) method

```csharp
public virtual byte[] DecryptValue (byte[] rgb);
```

When overridden in a derived class, decrypts the input data using the private key.

Parameters:

- `rgb`: The cipher text to be decrypted.

Returns: The resulting decryption of the `rgb` parameter in plain text.

Exceptions:

- `NotSupportedException`: This method call is not supported.

To be added.

## RSA.Encrypt(Byte[], RSAEncryptionPadding) method

```csharp
public virtual byte[] Encrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

When overridden in a derived class, encrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to encrypt.
- `padding`: The padding mode.

Returns: The encrypted data.

Exceptions:

- `ArgumentNullException`: `data` or `padding` is `null`.
- `NotImplementedException`: A derived class must override this method.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is too long for the combination of `AsymmetricAlgorithm.KeySize` and the selected padding.

-or-

The encryption operation failed.

To be added.

## RSA.Encrypt(Byte>, RSAEncryptionPadding) method

```csharp
public byte[] Encrypt (ReadOnlySpan<byte> data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Encrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to encrypt.
- `padding`: The padding mode.

Returns: The encrypted data.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of data is too long for the combination of `AsymmetricAlgorithm.KeySize` and the selected padding.

-or-

The encryption operation failed.
- `NotImplementedException`: This implementation has not implemented one of `RSA.Encrypt` or
`RSA.TryEncrypt`.

To be added.

## RSA.Encrypt(Byte>, Byte>, RSAEncryptionPadding) method

```csharp
public int Encrypt (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Encrypts the input data using the specified padding mode.

Parameters:

- `data`: The data to encrypt.
- `destination`: The buffer to receive the encrypted data.
- `padding`: The padding mode.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `ArgumentException`: The buffer in `destination` is too small to hold the encrypted data.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of data is too long for the combination of `AsymmetricAlgorithm.KeySize` and the selected padding.

-or-

The encryption operation failed.
- `NotImplementedException`: This implementation has not implemented one of `RSA.Encrypt` or
`RSA.TryEncrypt`.

To be added.

## RSA.EncryptValue(Byte[]) method

```csharp
public virtual byte[] EncryptValue (byte[] rgb);
```

When overridden in a derived class, encrypts the input data using the public key.

Parameters:

- `rgb`: The plain text to be encrypted.

Returns: The resulting encryption of the `rgb` parameter as cipher text.

Exceptions:

- `NotSupportedException`: This method call is not supported.

To be added.

## RSA.ExportParameters(Boolean) method

```csharp
public abstract System.Security.Cryptography.RSAParameters ExportParameters (bool includePrivateParameters);
```

When overridden in a derived class, exports the `RSAParameters`.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The parameters for `RSA`.

Exceptions:

- `CryptographicException`: The parameters could not be exported.

To be added.

## RSA.ExportRSAPrivateKey() method

```csharp
public virtual byte[] ExportRSAPrivateKey ();
```

Exports the current key in the PKCS#1 RSAPrivateKey format.

Returns: A byte array containing the PKCS#1 RSAPrivateKey <example-value> of this key.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## RSA.ExportRSAPrivateKeyPem() method

```csharp
public string ExportRSAPrivateKeyPem ();
```

Exports the current key in the PKCS#1 RSAPrivateKey <example-value>, PEM encoded.

Returns: A string containing the PEM-encoded PKCS#1 RSAPrivateKey.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#1 RSAPrivateKey will begin with `-----BEGIN RSA PRIVATE KEY-----`
and end with `-----END RSA PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## RSA.ExportRSAPublicKey() method

```csharp
public virtual byte[] ExportRSAPublicKey ();
```

Exports the public-key <example-value> of the current key in the PKCS#1 RSAPublicKey format.

Returns: A byte array containing the PKCS#1 RSAPublicKey <example-value> of this key.

To be added.

## RSA.ExportRSAPublicKeyPem() method

```csharp
public string ExportRSAPublicKeyPem ();
```

Exports the public-key <example-value> of the current key in the PKCS#1 RSAPublicKey <example-value>, PEM encoded.

Returns: A string containing the PEM-encoded PKCS#1 RSAPublicKey.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#1 RSAPublicKey will begin with `-----BEGIN RSA PUBLIC KEY-----`
and end with `-----END RSA PUBLIC KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## RSA.FromXmlString(String) method

```csharp
public override void FromXmlString (string xmlString);
```

Initializes an `RSA` object from the key <example-value> from an XML string.

Parameters:

- `xmlString`: The XML string containing `RSA` key information.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## RSA.GetMaxOutputSize() method

```csharp
public int GetMaxOutputSize ();
```

Gets the maximum number of bytes an RSA operation can produce.

Returns: The maximum number of bytes an RSA operation can produce.

Exceptions:

- `CryptographicException`: `AsymmetricAlgorithm.KeySize` returned a value that is not a possible RSA key size.

The maximum output size is defined by the RSA modulus, or key size. The key size, in bytes, is the maximum output size. If the key size is not an even number of bytes, then it is rounded up to the nearest number of whole bytes for purposes of determining the maximum output size.

## RSA.HashData(Stream, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The hash algorithm.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## RSA.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified portion of a byte array by using a specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` that is to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use in hash the data.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## RSA.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.

-or-

The contents of `source` indicate the Key <example-value> Function (KDF) to apply is the legacy PKCS#12 KDF, which requires `Char`-based passwords.

-or-

The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by the EncryptedPrivateKeyInfo contents.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.
