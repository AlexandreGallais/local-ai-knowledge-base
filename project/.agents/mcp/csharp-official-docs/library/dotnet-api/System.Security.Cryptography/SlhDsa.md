---
title: "SlhDsa class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SlhDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlhDsa class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class SlhDsa : IDisposable
```

Represents an SLH-DSA key.

This algorithm is specified by FIPS-205.

Developers are encouraged to program against the `SlhDsa` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## SlhDsa.SlhDsa(SlhDsaAlgorithm) constructor

```csharp
protected SlhDsa (System.Security.Cryptography.SlhDsaAlgorithm algorithm);
```

Initializes a new instance of the `SlhDsa` class.

Parameters:

- `algorithm`: The specific SLH-DSA algorithm for this key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.

To be added.

## SlhDsa.Algorithm property

```csharp
public System.Security.Cryptography.SlhDsaAlgorithm Algorithm { get; }
```

Gets the specific SLH-DSA algorithm for this key.

Returns: The specific SLH-DSA algorithm for this key.

To be added.

## SlhDsa.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value indicating whether the current platform supports SLH-DSA.

Returns: `true` if the current platform supports SLH-DSA; otherwise, `false`.

To be added.

## SlhDsa.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `SlhDsa` class.

To be added.

## SlhDsa.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Called by the `Dispose()` and `Finalize()` methods to release the managed and unmanaged resources used by the current instance of the `SlhDsa` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## SlhDsa.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

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

## SlhDsa.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

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

## SlhDsa.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

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

## SlhDsa.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

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

## SlhDsa.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

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

## SlhDsa.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

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

## SlhDsa.ExportPkcs8PrivateKey() method

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

## SlhDsa.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

Exports the current key in a PEM-encoded representation of the PKCS#8 PrivateKeyInfo format.

Returns: A string containing the PEM-encoded representation of the PKCS#8 PrivateKeyInfo.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## SlhDsa.ExportSlhDsaPrivateKey() method

```csharp
public byte[] ExportSlhDsaPrivateKey ();
```

Exports the current key in the FIPS 205 private key format.

Returns: The FIPS 205 private key.

Exceptions:

- `CryptographicException`: The current instance cannot export a private key.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## SlhDsa.ExportSlhDsaPrivateKey(Byte>) method

```csharp
public void ExportSlhDsaPrivateKey (Span<byte> destination);
```

Exports the current key in the FIPS 205 private key format.

Parameters:

- `destination`: The buffer to receive the private key. Its length must be exactly `SlhDsaAlgorithm.PrivateKeySizeInBytes`.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the private key.
- `CryptographicException`: The current instance cannot export a private key.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## SlhDsa.ExportSlhDsaPrivateKeyCore(Byte>) method

```csharp
protected abstract void ExportSlhDsaPrivateKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the FIPS 205 private key to the specified buffer.

Parameters:

- `destination`: The buffer to receive the private key.

To be added.

## SlhDsa.ExportSlhDsaPublicKey() method

```csharp
public byte[] ExportSlhDsaPublicKey ();
```

Exports the public-key <example-value> of the current key in the FIPS 205 public key format.

Returns: The FIPS 205 public key.

Exceptions:

- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## SlhDsa.ExportSlhDsaPublicKey(Byte>) method

```csharp
public void ExportSlhDsaPublicKey (Span<byte> destination);
```

Exports the public-key <example-value> of the current key in the FIPS 205 public key format.

Parameters:

- `destination`: The buffer to receive the public key. Its length must be exactly `SlhDsaAlgorithm.PublicKeySizeInBytes`.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the public key.
- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

`destination` is required to be exactly `SlhDsaAlgorithm.PublicKeySizeInBytes` in length.

## SlhDsa.ExportSlhDsaPublicKeyCore(Byte>) method

```csharp
protected abstract void ExportSlhDsaPublicKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the FIPS 205 public key to the specified buffer.

Parameters:

- `destination`: The buffer to receive the public key.

To be added.

## SlhDsa.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## SlhDsa.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

Exports the public-key <example-value> of the current key in a PEM-encoded representation of the X.509 SubjectPublicKeyInfo format.

Returns: A string containing the PEM-encoded representation of the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## SlhDsa.GenerateKey(SlhDsaAlgorithm) method

```csharp
public static System.Security.Cryptography.SlhDsa GenerateKey (System.Security.Cryptography.SlhDsaAlgorithm algorithm);
```

Generates a new SLH-DSA key for the specified algorithm.

Parameters:

- `algorithm`: An algorithm identifying what kind of SLH-DSA key to generate.

Returns: The generated object.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred generating the SLH-DSA key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

Imports an SLH-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

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

The value does not represent an SLH-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

Imports an SLH-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The value does not represent an SLH-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.
