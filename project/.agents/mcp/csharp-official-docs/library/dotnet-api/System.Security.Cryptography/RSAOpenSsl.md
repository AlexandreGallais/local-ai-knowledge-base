---
title: "RSAOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RSAOpenSsl : System.Security.Cryptography.RSA
```

Provides an implementation of the RSA algorithm backed by OpenSSL.

#### Remarks
> **Note:**
> The `RSAOpenSsl` class is an implementation of the RSA algorithm using OpenSSL. It isn't available on Windows and is only available on other operating systems when OpenSSL is installed. For applications that aren't doing OpenSSL-specific interop, it's recommended to use `RSA.Create` instead of referencing this type directly.

## RSAOpenSsl.RSAOpenSsl() constructor

```csharp
public RSAOpenSsl ();
```

Initializes a new instance of the `RSAOpenSsl` class with a random 2048-bit key pair.

Exceptions:

- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to 2048 and when a key is needed, one is generated using the property value.
If a key is loaded via the `RSAOpenSsl.ImportParameters` method or another key <example-value> method, the key size from this constructor has no meaning.

## RSAOpenSsl.RSAOpenSsl(Int32) constructor

```csharp
public RSAOpenSsl (int keySize);
```

Initializes a new instance of the `RSAOpenSsl` class with a randomly generated key of the specified size.

Exceptions:

- `CryptographicException`: `keySize` is not valid.
- `PlatformNotSupportedException`: On macOS: In all cases.

To be added.

## RSAOpenSsl.RSAOpenSsl(IntPtr) constructor

```csharp
public RSAOpenSsl (IntPtr handle);
```

Initializes a new instance of the `RSAOpenSsl` class from an existing OpenSSL key <example-value> as an `RSA*`.

Exceptions:

- `CryptographicException`: `handle` is not a valid `RSA*`.
- `ArgumentException`: `handle` is invalid
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process.
> Before calling this constructor, verify that your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## RSAOpenSsl.RSAOpenSsl(RSAParameters) constructor

```csharp
public RSAOpenSsl (System.Security.Cryptography.RSAParameters parameters);
```

Initializes a new instance of the `RSAOpenSsl` class using specified key parameters.

Exceptions:

- `CryptographicException`: `parameters` is not a valid RSA key.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks
This constructor is equivalent to using the default constructor and calling `RSAOpenSsl.ImportParameters`.

## RSAOpenSsl.RSAOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public RSAOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `RSAOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Exceptions:

- `CryptographicException`: `pkeyHandle` does not represent an RSA key.
- `ArgumentNullException`: `pkeyHandle` is `null`
- `ArgumentException`: `pkeyHandle` is invalid according to `SafeHandle.IsInvalid`.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

In .NET 9 and later versions, external modifications of `pkeyHandle` also affect the handle stored in the instance that this constructor creates.

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process.
> Before calling this constructor, verify that your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## RSAOpenSsl.KeySize property

```csharp
public override int KeySize { set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: `value` is not permitted by `RSAOpenSsl.LegalKeySizes`.

#### Remarks

Setting this property to its current value has no visible effect.
Setting this property to a new legal value discards the current key, but defers creation of a new key until one is needed.

## RSAOpenSsl.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by this implementation of RSA.

Returns: An array that contains the key sizes supported by the algorithm.

To be added.

## RSAOpenSsl.Decrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Decrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Decrypts the input data using the specified padding mode.

Returns: The decrypted data.

Exceptions:

- `ArgumentNullException`: `data` or `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is not equal to the number of bytes for `AsymmetricAlgorithm.KeySize`.

-or-

This instance represents only a public key.

-or-

The decryption operation failed.

To be added.

## RSAOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `RSAOpenSsl` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## RSAOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

#### Remarks

Each call to this method produces a new `SafeEvpPKeyHandle` object with its own lifetime. The objects returned by this method can safely be used even after this `RSAOpenSsl` instance has been disposed. However, modifying operations (that is, direct calls to modifying OpenSSL APIs) on the new handle operate on the same underlying object. The new instance this method returns is simply an additional reference.

## RSAOpenSsl.Encrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Encrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Encrypts the input data using the specified padding mode.

Returns: The encrypted data.

Exceptions:

- `ArgumentNullException`: `data` or `padding` is `null`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

The length of `data` is too long for the combination of `AsymmetricAlgorithm.KeySize` and the selected padding.

-or-

The encryption operation failed.

To be added.

## RSAOpenSsl.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.RSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the `RSAParameters`.

Returns: The parameters for `RSA`.

Exceptions:

- `CryptographicException`: The parameters could not be exported.

To be added.

## RSAOpenSsl.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The hash algorithm.

Returns: The hashed data.

To be added.

## RSAOpenSsl.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

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

## RSAOpenSsl.ImportParameters(RSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.RSAParameters parameters);
```

Imports the specified `RSAParameters`.

Exceptions:

- `CryptographicException`: `parameters` is not a valid RSA key.

To be added.

## RSAOpenSsl.SignHash(Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override byte[] SignHash (byte[] hash, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the signature for the specified hash value using the specified padding.

Returns: The RSA signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: `hash` or `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

To be added.

## RSAOpenSsl.VerifyHash(Byte[], Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override bool VerifyHash (byte[] hash, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the specified hash algorithm and padding, and comparing it to the provided hash value.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.
