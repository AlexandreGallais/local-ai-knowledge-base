---
title: "ECDsaOpenSsl class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDsaOpenSsl.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsaOpenSsl class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ECDsaOpenSsl : System.Security.Cryptography.ECDsa
```

Provides an implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA) backed by OpenSSL.

#### Remarks
This class should only be used directly when doing platform interop with the system OpenSSL library. When platform interop isn't needed, you should use the `ECDsa.Create` factory methods instead of a specific derived implementation.

## ECDsaOpenSsl.ECDsaOpenSsl() constructor

```csharp
public ECDsaOpenSsl ();
```

Initializes a new instance of the `ECDsaOpenSsl` class.

Exceptions:

- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to 521 and when a key is needed, the saved size is used to identify the target curve.
If a key is loaded via the `ECDsaOpenSsl.ImportParameters` method or another key <example-value> method, the key size from this constructor has no meaning.

## ECDsaOpenSsl.ECDsaOpenSsl(Int32) constructor

```csharp
public ECDsaOpenSsl (int keySize);
```

Initializes a new instance of the `ECDsaOpenSsl` class with a specified target key size.

Exceptions:

- `CryptographicException`: `keySize` specifies an invalid length.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to the provided value and when a key is needed, the saved size is used to identify the target curve.
If a key is loaded via the `ECDsaOpenSsl.ImportParameters` method or another key <example-value> method, the key size from this constructor has no meaning.

## ECDsaOpenSsl.ECDsaOpenSsl(IntPtr) constructor

```csharp
public ECDsaOpenSsl (IntPtr handle);
```

Initializes a new instance of the `ECDsaOpenSsl` class from an existing OpenSSL key <example-value> as an `EC_KEY*`.

Exceptions:

- `ArgumentException`: `handle` is `IntPtr.Zero`.
- `CryptographicException`: `handle` is not a valid `EC_KEY*`.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks
> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process. Before calling this constructor, verify that your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## ECDsaOpenSsl.ECDsaOpenSsl(ECCurve) constructor

```csharp
public ECDsaOpenSsl (System.Security.Cryptography.ECCurve curve);
```

Initializes a new instance of the `ECDsaOpenSsl` class and generates a new key on the specified curve.

Exceptions:

- `CryptographicException`: `curve` does not validate.
- `ArgumentNullException`: `curve` is `null`.
- `PlatformNotSupportedException`: On macOS: In all cases.

To be added.

## ECDsaOpenSsl.ECDsaOpenSsl(SafeEvpPKeyHandle) constructor

```csharp
public ECDsaOpenSsl (System.Security.Cryptography.SafeEvpPKeyHandle pkeyHandle);
```

Initializes a new instance of the `ECDsaOpenSsl` class from an existing OpenSSL key <example-value> as an `EVP_PKEY*`.

Exceptions:

- `ArgumentException`: `pkeyHandle` represents an invalid handle.
- `ArgumentNullException`: `pkeyHandle` is `null`.
- `CryptographicException`: `pkeyHandle` does not represent a elliptic curve (EC) key.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks

In .NET 9 and later versions, external modifications of `pkeyHandle` also affect the handle stored in the instance that this constructor creates.

> **Important:**
> OpenSSL supports multiple library versions being loaded within the same process. Before calling this constructor, verify that your pointer value came from the same version of OpenSSL that this class uses. For more information, see `OpenSslVersion`.

## ECDsaOpenSsl.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: `value` is not permitted by `ECDsaOpenSsl.LegalKeySizes`.

#### Remarks

Setting this property to its current value has no visible effect.
Setting this property to a new legal value discards the current key, but defers creation of a new key until one is needed.

Because key sizes do not uniquely identify elliptic curves, the use of the property setter is discouraged. To generate a new key on a specific curve, use the `ECDsaOpenSsl.GenerateKey` method.

## ECDsaOpenSsl.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the `ECDsaCng.KeySize` property setter.

Returns: An array that contains the key sizes supported by the `ECDsaCng.KeySize` property setter.

#### Remarks

In Elliptic Curve Cryptography (ECC) the key size is not the only input into the key <example-value> process,
it is derived from the curve parameters for a specific elliptic curve.
This property reports only three legal key sizes: 256, 384, and 521 bits.
When the key size is used alone as a basis for key <example-value>,
the supported sizes map to the named curves secp256r1 (aka NIST P-256), secp384r1 (aka NIST P-384), and secp521r1 (aka NIST P-521).

## ECDsaOpenSsl.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `ECDsaOpenSsl` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## ECDsaOpenSsl.DuplicateKeyHandle() method

```csharp
public System.Security.Cryptography.SafeEvpPKeyHandle DuplicateKeyHandle ();
```

Gets a `SafeEvpPKeyHandle` representation of the cryptographic key.

Returns: A `SafeEvpPKeyHandle` representation of the cryptographic key.

#### Remarks
Each call to this method produces a new `SafeEvpPKeyHandle` object with its own lifetime. The objects returned by this method can safely be used even after this `ECDsaOpenSsl` instance has been disposed. However, modifying operations (that is, direct calls to modifying OpenSSL APIs) on the new handle operate on the same underlying object. The new instance this method returns is simply an additional reference.

## ECDsaOpenSsl.ExportExplicitParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportExplicitParameters (bool includePrivateParameters);
```

Exports the key and explicit curve parameters used by the Elliptic curve cryptography (ECC) object into an `ECParameters` object.

Returns: The key and explicit curve parameters used by the ECC object.

Exceptions:

- `CryptographicException`: An error occurred while obtaining the curve values.

To be added.

## ECDsaOpenSsl.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportParameters (bool includePrivateParameters);
```

Exports the key used by the Elliptic curve cryptography (ECC) object into an `ECParameters` object. If the key was created as a named curve, the `ECParameters.Curve` field contains named curve parameters; otherwise, it contains explicit parameters.

Returns: The key and named curve parameters used by the ECC object.

Exceptions:

- `CryptographicException`: An error occurred while obtaining the curve values.

To be added.

## ECDsaOpenSsl.GenerateKey(ECCurve) method

```csharp
public override void GenerateKey (System.Security.Cryptography.ECCurve curve);
```

Generates a new ephemeral public/private key pair for the specified curve, replacing the current key.

To be added.

## ECDsaOpenSsl.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified binary stream by using the specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## ECDsaOpenSsl.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected override byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified portion of a byte array by using the specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## ECDsaOpenSsl.ImportParameters(ECParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.ECParameters parameters);
```

Replaces the current key for this instance with one using the specified key parameters.

Exceptions:

- `CryptographicException`: `parameters` does not contain valid values.

#### Remarks
If `parameters` contains only `Q`, only a public key is imported. If `parameters` also contains `D`, a full key pair is imported. The `Curve` field specifies the type of the curve to import.

## ECDsaOpenSsl.SignHash(Byte[]) method

```csharp
public override byte[] SignHash (byte[] hash);
```

Generates a digital signature for the specified hash value.

Returns: A digital signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: The `hash` parameter is `null`.

To be added.

## ECDsaOpenSsl.VerifyHash(Byte[], Byte[]) method

```csharp
public override bool VerifyHash (byte[] hash, byte[] signature);
```

Verifies that a digital signature is appropriate for the current key and provided data hash.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `signature` is `null`.

To be added.
