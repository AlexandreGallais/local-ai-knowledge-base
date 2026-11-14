---
title: "ECDiffieHellmanCng class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanCng class (part 2 of 3)

## ECDiffieHellmanCng.DeriveKeyMaterial(CngKey) method

```csharp
public byte[] DeriveKeyMaterial (System.Security.Cryptography.CngKey <example-value>);
```

Derives the key <example-value> that is generated from the secret <example-value> between two parties, given a `CngKey` object that contains the second party's public key.

Parameters:

- `otherPartyPublicKey`: An object that contains the public part of the Elliptic Curve Diffie-Hellman (ECDH) key from the other party in the key exchange.

Returns: A byte array that contains the key material. This information is generated from the secret <example-value> that is calculated from the current object's private key and the specified public key.

Exceptions:

- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `ArgumentException`: `otherPartyPublicKey` is invalid. Either its `CngKey.AlgorithmGroup` property does not specify `CngAlgorithmGroup.ECDiffieHellman` or its key size does not match the key size of this instance.
- `InvalidOperationException`: This object's `ECDiffieHellmanCng.KeyDerivationFunction` property specifies the `ECDiffieHellmanKeyDerivationFunction.Tls` key <example-value> function, but either `ECDiffieHellmanCng.Label` or `ECDiffieHellmanCng.Seed` is `null`.
- `CryptographicException`: All other errors.

To be added.

## ECDiffieHellmanCng.DeriveKeyMaterial(ECDiffieHellmanPublicKey) method

```csharp
public override byte[] DeriveKeyMaterial (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>);
```

Derives the key <example-value> that is generated from the secret <example-value> between two parties, given an `ECDiffieHellmanPublicKey` object that contains the second party's public key.

Parameters:

- `otherPartyPublicKey`: The public key from the other party in the key exchange.

Returns: A byte array that contains the key material. This information is generated from the secret <example-value> that is calculated from the current object's private key and the specified public key.

Exceptions:

- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `ArgumentException`: `otherPartyPublicKey` is not an `ECDiffieHellmanCngPublicKey` key.

To be added.

## ECDiffieHellmanCng.DeriveKeyTls(ECDiffieHellmanPublicKey, Byte[], Byte[]) method

```csharp
public override byte[] DeriveKeyTls (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>, byte[] prfLabel, byte[] prfSeed);
```

Performs key <example-value> using the TLS (Transport Layer Security) 1.1 PRF (Pseudo-Random Function).

Parameters:

- `otherPartyPublicKey`: The other party's public key.
- `prfLabel`: The ASCII-encoded PRF label.
- `prfSeed`: The 64-byte PRF seed.

Returns: The first 48 bytes from the TLS 1.1 PRF, using the shared secret as the key.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentException`: The curve used by `otherPartyPublicKey` has a different size than the curve from this key.
- `ArgumentNullException`: `otherPartyPublicKey`, `prfLabel` or `prfSeed` is `null`.
- `CryptographicException`: `prfSeed` is not exactly 64 bytes in length.

-or-

The curve used by `otherPartyPublicKey` is different than the curve from this key.

-or-

This instance represents only a public key.

To be added.

## ECDiffieHellmanCng.DeriveSecretAgreementHandle(CngKey) method

```csharp
public Microsoft.Win32.SafeHandles.SafeNCryptSecretHandle DeriveSecretAgreementHandle (System.Security.Cryptography.CngKey <example-value>);
```

Gets a handle to the secret <example-value> generated between two parties, given a `CngKey` object that contains the second party's public key.

Parameters:

- `otherPartyPublicKey`: An object that contains the public part of the Elliptic Curve Diffie-Hellman (ECDH) key from the other party in the key exchange.

Returns: A handle to the secret agreement. This information is calculated from the current object's private key and the specified public key.

Exceptions:

- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `ArgumentException`: `otherPartyPublicKey` is not an ECDH key, or it is not the correct size.
- `CryptographicException`: All other errors.

To be added.

## ECDiffieHellmanCng.DeriveSecretAgreementHandle(ECDiffieHellmanPublicKey) method

```csharp
public Microsoft.Win32.SafeHandles.SafeNCryptSecretHandle DeriveSecretAgreementHandle (System.Security.Cryptography.ECDiffieHellmanPublicKey <example-value>);
```

Gets a handle to the secret <example-value> generated between two parties, given an `ECDiffieHellmanPublicKey` object that contains the second party's public key.

Parameters:

- `otherPartyPublicKey`: The public key from the other party in the key exchange.

Returns: A handle to the secret agreement. This information is calculated from the current object's private key and the specified public key.

Exceptions:

- `ArgumentNullException`: `otherPartyPublicKey` is `null`.
- `ArgumentException`: `otherPartyPublicKey` is not an `ECDiffieHellmanPublicKey` key.

To be added.

## ECDiffieHellmanCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `ECDiffieHellmanCng` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## ECDiffieHellmanCng.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## ECDiffieHellmanCng.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public override byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

To be added.

## ECDiffieHellmanCng.ExportExplicitParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportExplicitParameters (bool includePrivateParameters);
```

Exports the key and explicit curve parameters used by the `ECCurve` object into an `ECParameters` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key and explicit curve parameters used by the `ECCurve` object.

Exceptions:

- `CryptographicException`: The method cannot obtain curve values.
- `PlatformNotSupportedException`: Explicit export is not supported by this platform. Windows 10 or higher is required.

To be added.

## ECDiffieHellmanCng.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.ECParameters ExportParameters (bool includePrivateParameters);
```

Exports the key used by the `ECCurve` object into an `ECParameters` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The key and named curve parameters used by the `ECCurve` object.

Exceptions:

- `CryptographicException`: The method cannot obtain curve values.

#### Remarks
If the key was created as a named curve, the `Curve` field contains named curve parameters;          otherwise,  it contains explicit parameters.

## ECDiffieHellmanCng.FromXmlString(String, ECKeyXmlFormat) method

```csharp
public void FromXmlString (string xml, System.Security.Cryptography.ECKeyXmlFormat format);
```

Deserializes the key <example-value> from an XML string by using the specified format.

Parameters:

- `xml`: The XML-based key <example-value> to be deserialized.
- `format`: One of the enumeration values that specifies the format of the XML string. The only currently accepted format is `ECKeyXmlFormat.Rfc4050`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## ECDiffieHellmanCng.GenerateKey(ECCurve) method

```csharp
public override void GenerateKey (System.Security.Cryptography.ECCurve curve);
```

Generates a new ephemeral public/private key pair for the specified curve.

Parameters:

- `curve`: The curve used to generate an ephemeral public/private key pair.

Exceptions:

- `CryptographicException`: `curve` does not validate.

#### Remarks
`curve` must validate (that is, it must return true when passed to the `ECCurve.Validate` method) and must not be implicit.

Characteristic-2 curves are not supported on Windows.

## ECDiffieHellmanCng.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## ECDiffieHellmanCng.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## ECDiffieHellmanCng.ImportParameters(ECParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.ECParameters parameters);
```

Imports the specified parameters for an `ECCurve` object as a key into the current instance.

Parameters:

- `parameters`: The curve's parameters to import.

Exceptions:

- `CryptographicException`: `parameters` does not validate.
- `NotSupportedException`: `parameters` references a curve that cannot be imported.
- `PlatformNotSupportedException`: `parameters` references a curve that is not supported by this platform.

#### Remarks
The `ECDiffieHellmanCng.ImportParameters` method replaces the existing key that this object is working with by creating a         new `CngKey` object. If `parameters` contains only the `Q` field, then only a public key is imported.         If `parameters` also contains `D`, then a full key pair is be imported. The `parameter` `Curve` value specifies the type of the curve to import.

## ECDiffieHellmanCng.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## ECDiffieHellmanCng.ToXmlString(ECKeyXmlFormat) method

```csharp
public string ToXmlString (System.Security.Cryptography.ECKeyXmlFormat format);
```

Serializes the key <example-value> to an XML string by using the specified format.

Parameters:

- `format`: One of the enumeration values that specifies the format of the XML string. The only currently accepted format is `ECKeyXmlFormat.Rfc4050`.

Returns: This method doesn't return a value

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## ECDiffieHellmanCng.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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

## ECDiffieHellmanCng.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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
