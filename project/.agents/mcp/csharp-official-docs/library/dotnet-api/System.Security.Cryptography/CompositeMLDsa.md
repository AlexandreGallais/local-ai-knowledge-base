---
title: "CompositeMLDsa class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CompositeMLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeMLDsa class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class CompositeMLDsa : IDisposable
```

Represents a Composite ML-DSA key.

Developers are encouraged to program against the `CompositeMLDsa` base class, rather than any specific derived class. The derived classes are intended for interop with the underlying system cryptographic libraries.

## CompositeMLDsa.CompositeMLDsa(CompositeMLDsaAlgorithm) constructor

```csharp
protected CompositeMLDsa (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm);
```

Initializes a new instance of the `CompositeMLDsa` class.

Parameters:

- `algorithm`: The specific Composite ML-DSA algorithm for this key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.

To be added.

## CompositeMLDsa.Algorithm property

```csharp
public System.Security.Cryptography.CompositeMLDsaAlgorithm Algorithm { get; }
```

Gets the specific Composite ML-DSA algorithm for this key.

Returns: To be added.

To be added.

## CompositeMLDsa.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value indicating whether the current platform supports Composite ML-DSA.

Returns: `true` if the current platform supports Composite ML-DSA; otherwise, `false`.

To be added.

## CompositeMLDsa.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `CompositeMLDsa` class.

To be added.

## CompositeMLDsa.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Called by the `CompositeMLDsa.Dispose` method to release the managed and unmanaged resources used by the current instance of the `CompositeMLDsa` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPrivateKey() method

```csharp
public byte[] ExportCompositeMLDsaPrivateKey ();
```

Exports the private-key <example-value> of the current key.

Returns: The Composite ML-DSA private key.

Exceptions:

- `CryptographicException`: The current instance cannot export a private key.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPrivateKey(Byte>) method

```csharp
public int ExportCompositeMLDsaPrivateKey (Span<byte> destination);
```

Exports the private-key <example-value> of the current key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the Composite ML-DSA private key value.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `destination` wasn't large enough to hold the result.

-or-

An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPrivateKeyCore(Byte>) method

```csharp
protected abstract int ExportCompositeMLDsaPrivateKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the private key <example-value> of the current key.

Parameters:

- `destination`: The buffer to receive the private key value.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPublicKey() method

```csharp
public byte[] ExportCompositeMLDsaPublicKey ();
```

Exports the public-key <example-value> of the current key.

Returns: The Composite ML-DSA public key.

Exceptions:

- `CryptographicException`: An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPublicKey(Byte>) method

```csharp
public int ExportCompositeMLDsaPublicKey (Span<byte> destination);
```

Exports the public-key <example-value> of the current key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the Composite ML-DSA public key value.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `destination` was too not large enough to hold the result.

-or-

An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportCompositeMLDsaPublicKeyCore(Byte>) method

```csharp
protected abstract int ExportCompositeMLDsaPublicKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the public key <example-value> of the current key.

Parameters:

- `destination`: The buffer to receive the public key value.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

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

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

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

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

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

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

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

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

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

## CompositeMLDsa.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

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

## CompositeMLDsa.ExportPkcs8PrivateKey() method

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

## CompositeMLDsa.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

Exports the current key in a PEM-encoded representation of the PKCS#8 PrivateKeyInfo format.

Returns: A string containing the PEM-encoded representation of the PKCS#8 PrivateKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

Exports the public-key <example-value> of the current key in a PEM-encoded representation of the X.509 SubjectPublicKeyInfo format.

Returns: A string containing the PEM-encoded representation of the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.GenerateKey(CompositeMLDsaAlgorithm) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa GenerateKey (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm);
```

Generates a new Composite ML-DSA key.

Parameters:

- `algorithm`: An algorithm identifying what kind of Composite ML-DSA key to generate.

Returns: The generated key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`
- `CryptographicException`: An error occurred generating the Composite ML-DSA key.
- `PlatformNotSupportedException`: The platform does not support the specified Composite ML-DSA algorithm. Callers can use `CompositeMLDsa.IsAlgorithmSupported` to determine if the algorithm is supported.

To be added.

## CompositeMLDsa.ImportCompositeMLDsaPrivateKey(CompositeMLDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportCompositeMLDsaPrivateKey (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## CompositeMLDsa.ImportCompositeMLDsaPrivateKey(CompositeMLDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportCompositeMLDsaPrivateKey (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA private key.

Parameters:

- `algorithm`: The specific Composite ML-DSA algorithm for this key.
- `source`: The bytes of the public key.

Returns: The imported key.

Exceptions:

- `CryptographicException`: `source` length is the wrong size for the specified algorithm.

-or-

An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support the specified Composite ML-DSA algorithm. Callers can use `CompositeMLDsa.IsAlgorithmSupported` to determine if the algorithm is supported.

To be added.

## CompositeMLDsa.ImportCompositeMLDsaPublicKey(CompositeMLDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportCompositeMLDsaPublicKey (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.
