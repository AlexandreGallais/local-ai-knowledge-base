---
title: "ECDsaCng class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDsaCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsaCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ECDsaCng : System.Security.Cryptography.ECDsa
```

Provides a Cryptography Next Generation (CNG) implementation of the Elliptic Curve Digital Signature Algorithm (ECDSA).

#### Remarks
This class should only be used directly when doing platform interop with the Windows CNG library.
When platform interop is not needed, you should use the `ECDsa.Create` factory methods instead of a specific derived implementation.

#### Examples
The following example shows how to use the `ECDsaCng` class to sign a message and how to use the signature to verify that the message has not been altered.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/ECDsaCng/Overview/program.cs._

## ECDsaCng.ECDsaCng() constructor

```csharp
public ECDsaCng ();
```

Initializes a new instance of the `ECDsaCng` class with a random key pair.

Exceptions:

- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to 521 and when a key is needed the saved size is used to identify the target curve.
If a key is loaded via the `ECDsaCng.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## ECDsaCng.ECDsaCng(Int32) constructor

```csharp
public ECDsaCng (int keySize);
```

Initializes a new instance of the `ECDsaCng` class with a specified target key size.

Parameters:

- `keySize`: The size of the key. Valid key sizes are 256, 384, and 521 bits.

Exceptions:

- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.
- `CryptographicException`: `keySize` specifies an invalid length.

#### Remarks

This constructor does not generate a new public/private keypair immediately.
This constructor sets the `KeySize` property to the provided value and when a key is needed the saved size is used to identify the target curve.
If a key is loaded via the `ECDsaCng.ImportParameters` method, or other key <example-value> method, the key size from this constructor has no meaning.

## ECDsaCng.ECDsaCng(CngKey) constructor

```csharp
public ECDsaCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `ECDsaCng` class by using the specified `CngKey` object.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentException`: `key` does not specify an Elliptic Curve Digital Signature Algorithm (ECDSA) group.
- `ArgumentNullException`: `key` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) classes are not supported on this system.

To be added.

## ECDsaCng.ECDsaCng(ECCurve) constructor

```csharp
public ECDsaCng (System.Security.Cryptography.ECCurve curve);
```

Initializes a new instance of the `ECDsaCng` class whose public/private key pair is generated over the specified curve.

Parameters:

- `curve`: The curve used to generate the public/private key pair.

Exceptions:

- `CryptographicException`: `curve` does not validate.
- `ArgumentNullException`: `curve` is `null`.
- `PlatformNotSupportedException`: if `curve` does not contain an Oid with a FriendlyName.

#### Remarks
`curve` must validate (that is, it must return `true`) when passed to the `ECCurve.Validate` method and must be either a named or explicit prime.

## ECDsaCng.HashAlgorithm property

```csharp
public System.Security.Cryptography.CngAlgorithm HashAlgorithm { get; set; }
```

Gets or sets the hash algorithm to use when signing and verifying data.

Returns: An object that specifies the hash algorithm.

Exceptions:

- `ArgumentNullException`: The value is `null`.

#### Remarks
This property accepts the following algorithms: `CngAlgorithm.MD5`, `CngAlgorithm.Sha1`, `CngAlgorithm.Sha256`, `CngAlgorithm.Sha384`, and `CngAlgorithm.Sha512`.

Other custom hash algorithms may also be used.

Due to collision problems with MD5 and SHA-1, Microsoft recommends `CngAlgorithm.Sha256`. The default algorithm is `CngAlgorithm.Sha256`.

This property is not used if you are signing or verifying data that is already hashed.

## ECDsaCng.Key <example-value>

```csharp
public System.Security.Cryptography.CngKey Key { get; }
```

Gets or sets the key to use when signing and verifying data.

Returns: An object that specifies the key.

To be added.

## ECDsaCng.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the key <example-value> used by the asymmetric algorithm.

Returns: The size, in bits, of the key <example-value> used by the asymmetric algorithm.

Exceptions:

- `CryptographicException`: `value` is not permitted by `ECDsaCng.LegalKeySizes`.

#### Remarks

Setting this property to its current value has no visible effect.
Setting this property to a new legal value discards the current key, but defers creation of a new key until one is needed.

Because key sizes do not uniquely identify elliptic curves, the use of the property setter is discouraged. To generate a new key on a specific curve, use the `ECDsaCng.GenerateKey` method.

## ECDsaCng.LegalKeySizes property

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

When executed on Windows 10, this class supports many additional named curves,
but that is not reflected in this property.

## ECDsaCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `ECDsaCng` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## ECDsaCng.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## ECDsaCng.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## ECDsaCng.ExportExplicitParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportExplicitParameters (bool includePrivateParameters);
```

Exports the key and explicit curve parameters used by the Elliptic curve cryptography (ECC) object into an `ECParameters` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key and explicit curve parameters used by the ECC object.

Exceptions:

- `CryptographicException`: An error occurred while obtaining the curve values.
- `PlatformNotSupportedException`: Explicit export is not supported by this platform. Windows 10 or higher is required.

To be added.

## ECDsaCng.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportParameters (bool includePrivateParameters);
```

Exports the key used by the Elliptic curve cryptography (ECC) object into an `ECParameters` object. If the key was created as a named curve, the `ECParameters.Curve` field contains named curve parameters; otherwise, it contains explicit parameters.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key and named curve parameters used by the ECC object.

Exceptions:

- `CryptographicException`: An error occurred while obtaining the curve values.

To be added.

## ECDsaCng.FromXmlString(String, ECKeyXmlFormat) method

```csharp
public void FromXmlString (string xml, System.Security.Cryptography.ECKeyXmlFormat format);
```

Deserializes the key <example-value> from an XML string by using the specified format.

Parameters:

- `xml`: The XML-based key <example-value> to be deserialized.
- `format`: One of the enumeration values that specifies the format of the XML string. The only currently accepted format is `ECKeyXmlFormat.Rfc4050`.

Exceptions:

- `ArgumentNullException`: `xml` is `null`.
- `ArgumentOutOfRangeException`: `format` specifies an invalid format. The only accepted value is `ECKeyXmlFormat.Rfc4050`.
- `CryptographicException`: All other errors.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ECDsaCng.GenerateKey(ECCurve) method

```csharp
public override void GenerateKey (System.Security.Cryptography.ECCurve curve);
```

Generates a new ephemeral public/private key pair for the specified curve, replacing the current key.

Parameters:

- `curve`: The curve to use to generate the key.

Exceptions:

- `CryptographicException`: `curve` does not validate.

To be added.

## ECDsaCng.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified binary stream by using the specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## ECDsaCng.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

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

## ECDsaCng.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## ECDsaCng.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## ECDsaCng.ImportParameters(ECParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.ECParameters parameters);
```

Replaces the existing key that the current instance is working with by creating a new `CngKey` for the parameters structure.

Parameters:

- `parameters`: The curve parameters.

Exceptions:

- `CryptographicException`: `parameters` does not contain valid values.
- `NotSupportedException`: `parameters` references a curve that cannot be imported.
- `PlatformNotSupportedException`: `parameters` references a curve that is not supported by this platform.

#### Remarks
If `parameters` contains only `Q`, only a public key is imported. If `parameters` also contains `D`, a full key pair is imported. The `Curve` field specifies the type of the curve to import.

## ECDsaCng.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.
