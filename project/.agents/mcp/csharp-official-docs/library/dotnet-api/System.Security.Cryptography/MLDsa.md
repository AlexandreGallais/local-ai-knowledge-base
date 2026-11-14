---
title: "MLDsa class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsa class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class MLDsa : IDisposable
```

Represents an ML-DSA key.

This algorithm is specified by FIPS-204.

Developers are encouraged to program against the `MLDsa` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLDsa.MLDsa(MLDsaAlgorithm) constructor

```csharp
protected MLDsa (System.Security.Cryptography.MLDsaAlgorithm algorithm);
```

Initializes a new instance of the `MLDsa` class.

Parameters:

- `algorithm`: The specific ML-DSA algorithm for this key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.

To be added.

## MLDsa.Algorithm property

```csharp
public System.Security.Cryptography.MLDsaAlgorithm Algorithm { get; }
```

Gets the specific ML-DSA algorithm for this key.

Returns: The specific ML-DSA algorithm for this key.

To be added.

## MLDsa.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value indicating whether the current platform supports ML-DSA.

Returns: `true` if the current platform supports ML-DSA; otherwise, `false`.

To be added.

## MLDsa.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `MLDsa` class.

To be added.

## MLDsa.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Called by the `Dispose()` and `Finalize()` methods to release the managed and unmanaged resources used by the current instance of the `MLDsa` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of the this key.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `pbeParameters` specifies a KDF that requires a char-based password.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of the this key.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `pbeParameters` is `null`.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in a PEM-encoded representation of the PKCS#8 EncryptedPrivateKeyInfo representation of this key, using a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A string containing the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `pbeParameters` specifies a KDF that requires a char-based password.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in a PEM-encoded representation of the PKCS#8 EncryptedPrivateKeyInfo representation of this key, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A string containing the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `pbeParameters` is `null`.

To be added.

## MLDsa.ExportMLDsaPrivateKey() method

```csharp
public byte[] ExportMLDsaPrivateKey ();
```

Exports the current key in the FIPS 204 private key format.

Returns: The FIPS 204 private key.

Exceptions:

- `CryptographicException`: The current instance cannot export a private key.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLDsa.ExportMLDsaPrivateKey(Byte>) method

```csharp
public void ExportMLDsaPrivateKey (Span<byte> destination);
```

Exports the current key in the FIPS 204 private key format.

Parameters:

- `destination`: The buffer to receive the private key. Its length must be exactly `MLDsaAlgorithm.PrivateKeySizeInBytes`.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the private key.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLDsa.ExportMLDsaPrivateKeyCore(Byte>) method

```csharp
protected abstract void ExportMLDsaPrivateKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the FIPS 204 private key to the specified buffer.

Parameters:

- `destination`: The buffer to receive the private key.

To be added.

## MLDsa.ExportMLDsaPrivateSeed() method

```csharp
public byte[] ExportMLDsaPrivateSeed ();
```

Exports the private seed in the FIPS 204 private seed format.

Returns: The FIPS 204 private seed.

Exceptions:

- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLDsa.ExportMLDsaPrivateSeed(Byte>) method

```csharp
public void ExportMLDsaPrivateSeed (Span<byte> destination);
```

Exports the private seed of the current key.

Parameters:

- `destination`: The buffer to receive the private seed. Its length must be exactly `MLDsaAlgorithm.PrivateSeedSizeInBytes`.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the private seed.
- `CryptographicException`: An error occurred while exporting the private seed.

To be added.

## MLDsa.ExportMLDsaPrivateSeedCore(Byte>) method

```csharp
protected abstract void ExportMLDsaPrivateSeedCore (Span<byte> destination);
```

When overridden in a derived class, exports the private seed to the specified buffer.

Parameters:

- `destination`: The buffer to receive the private seed.

To be added.

## MLDsa.ExportMLDsaPublicKey() method

```csharp
public byte[] ExportMLDsaPublicKey ();
```

Exports the public-key <example-value> of the current key in the FIPS 204 public key format.

Returns: The FIPS 204 public key.

Exceptions:

- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLDsa.ExportMLDsaPublicKey(Byte>) method

```csharp
public void ExportMLDsaPublicKey (Span<byte> destination);
```

Exports the public-key <example-value> of the current key in the FIPS 204 public key format.

Parameters:

- `destination`: The buffer to receive the public key. Its length must be exactly `MLDsaAlgorithm.PublicKeySizeInBytes`.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the public key.
- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

`destination` is required to be exactly `MLDsaAlgorithm.PublicKeySizeInBytes` in length.

## MLDsa.ExportMLDsaPublicKeyCore(Byte>) method

```csharp
protected abstract void ExportMLDsaPublicKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the FIPS 204 public key to the specified buffer.

Parameters:

- `destination`: The buffer to receive the public key.

To be added.

## MLDsa.ExportPkcs8PrivateKey() method

```csharp
public byte[] ExportPkcs8PrivateKey ();
```

Exports the current key in the PKCS#8 PrivateKeyInfo format.

Returns: A byte array containing the PKCS#8 PrivateKeyInfo representation of the this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

Exports the current key in a PEM-encoded representation of the PKCS#8 PrivateKeyInfo format.

Returns: A string containing the PEM-encoded representation of the PKCS#8 PrivateKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLDsa.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLDsa.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

Exports the public-key <example-value> of the current key in a PEM-encoded representation of the X.509 SubjectPublicKeyInfo format.

Returns: A string containing the PEM-encoded representation of the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLDsa.GenerateKey(MLDsaAlgorithm) method

```csharp
public static System.Security.Cryptography.MLDsa GenerateKey (System.Security.Cryptography.MLDsaAlgorithm algorithm);
```

Generates a new ML-DSA key.

Parameters:

- `algorithm`: An algorithm identifying what kind of ML-DSA key to generate.

Returns: The generated key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`
- `CryptographicException`: An error occured generating the ML-DSA key.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

To be added.

## MLDsa.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

Imports an ML-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The EncryptedPrivateKeyInfo indicates the Key <example-value> Function (KDF) to apply is the legacy PKCS#12 KDF, which requires `Char`-based passwords.

-or-

The value does not represent an ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

To be added.
