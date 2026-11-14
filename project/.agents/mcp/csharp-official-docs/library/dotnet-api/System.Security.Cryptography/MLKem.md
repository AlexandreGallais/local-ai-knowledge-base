---
title: "MLKem class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLKem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLKem class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class MLKem : IDisposable
```

Represents an ML-KEM key.

This algorithm is specified by FIPS-203.

Developers are encouraged to program against the `MLKem` base class, rather than any specific derived class.

The derived classes are intended for interop with the underlying system cryptographic libraries.

## MLKem.MLKem(MLKemAlgorithm) constructor

```csharp
protected MLKem (System.Security.Cryptography.MLKemAlgorithm algorithm);
```

Initializes a new instance of the `MLKem` class.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.

To be added.

## MLKem.Algorithm property

```csharp
public System.Security.Cryptography.MLKemAlgorithm Algorithm { get; }
```

Gets the specific ML-KEM algorithm for this key.

Returns: The specific ML-KEM algorithm for this key.

To be added.

## MLKem.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## MLKem.Decapsulate(Byte[]) method

```csharp
public byte[] Decapsulate (byte[] ciphertext);
```

Decapsulates a shared secret from a provided ciphertext.

Parameters:

- `ciphertext`: The ciphertext.

Returns: The shared secret.

Exceptions:

- `CryptographicException`: An error occurred during decapsulation.
- `ArgumentException`: `ciphertext` is not the correct size.
- `ArgumentNullException`: `ciphertext` is `null`.
- `ObjectDisposedException`: The object has already been disposed.

Decapsulation can only decapsulate a shared secret <example-value> with the the decapsulation key's corresponding encapsulation key. If a different key is used, ML-KEM performs implicit rejection.

Implicit rejection means an error will not be returned. Instead, the shared secret will be a deterministic but incorrect result.

Detecting incorrect key use is a concern for consumers of the ML-KEM algorithm.

For more information, see FIPS 203, Section 6.3.

## MLKem.Decapsulate(Byte>, Byte>) method

```csharp
public void Decapsulate (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

Decapsulates a shared secret from a provided ciphertext.

Parameters:

- `ciphertext`: The ciphertext.
- `sharedSecret`: The buffer to receive the shared secret.

Exceptions:

- `CryptographicException`: An error occurred during decapsulation.
- `ArgumentException`: `ciphertext` is not the correct size.

-or-

`sharedSecret` is not the correct size.
- `ObjectDisposedException`: The object has already been disposed.

Decapsulation can only decapsulate a shared secret <example-value> with the the decapsulation key's corresponding encapsulation key. If a different key is used, ML-KEM performs implicit rejection.

Implicit rejection means an error will not be returned. Instead, the shared secret will be a deterministic but incorrect result.

Detecting incorrect key use is a concern for consumers of the ML-KEM algorithm.

For more information, see FIPS 203, Section 6.3.

## MLKem.DecapsulateCore(Byte>, Byte>) method

```csharp
protected abstract void DecapsulateCore (ReadOnlySpan<byte> ciphertext, Span<byte> sharedSecret);
```

When overridden in a derived class, decapsulates a shared secret from a provided ciphertext.

Parameters:

- `ciphertext`: The ciphertext.
- `sharedSecret`: The buffer to receive the shared secret.

Exceptions:

- `CryptographicException`: An error occurred during decapsulation.

To be added.

## MLKem.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `MLKem` class.

To be added.

## MLKem.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Called by the `Dispose()` and `Finalize()` methods to release the managed and unmanaged resources used by the current instance of the `MLKem` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## MLKem.Encapsulate(Byte[], Byte[]) method

```csharp
public void Encapsulate (out byte[] ciphertext, out byte[] sharedSecret);
```

Creates an encapsulation ciphertext and shared secret.

Parameters:

- `ciphertext`: When this method returns, contains the ciphertext.
- `sharedSecret`: When this method returns, contains the shared secret.

Exceptions:

- `CryptographicException`: An error occurred during encapsulation.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.Encapsulate(Byte>, Byte>) method

```csharp
public void Encapsulate (Span<byte> ciphertext, Span<byte> sharedSecret);
```

Creates an encapsulation ciphertext and shared secret, writing them into the provided buffers.

Parameters:

- `ciphertext`: The buffer to receive the ciphertext.
- `sharedSecret`: The buffer to receive the shared secret.

Exceptions:

- `CryptographicException`: An error occurred during encapsulation.

-or -

`ciphertext` overlaps with `sharedSecret`.
- `ArgumentException`: `ciphertext` is not the correct size.

-or-

`sharedSecret` is not the correct size.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.EncapsulateCore(Byte>, Byte>) method

```csharp
protected abstract void EncapsulateCore (Span<byte> ciphertext, Span<byte> sharedSecret);
```

When overridden in a derived class, creates an encapsulation ciphertext and shared secret, writing them into the provided buffers.

Parameters:

- `ciphertext`: The buffer to receive the ciphertext.
- `sharedSecret`: The buffer to receive the shared secret.

Exceptions:

- `CryptographicException`: An error occurred during encapsulation.

To be added.

## MLKem.ExportDecapsulationKey() method

```csharp
public byte[] ExportDecapsulationKey ();
```

Exports the decapsulation key.

Returns: The decapsulation key.

Exceptions:

- `CryptographicException`: The current instance cannot export a decapsulation key.

-or-

An error occurred while importing the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportDecapsulationKey(Byte>) method

```csharp
public void ExportDecapsulationKey (Span<byte> destination);
```

Exports the decapsulation key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the decapsulation key.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the decapsulation key.
- `CryptographicException`: The current instance cannot export a decapsulation key.

-or-

An error occurred while importing the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportDecapsulationKeyCore(Byte>) method

```csharp
protected abstract void ExportDecapsulationKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the decapsulation key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the decapsulation key.

To be added.

## MLKem.ExportEncapsulationKey() method

```csharp
public byte[] ExportEncapsulationKey ();
```

Exports the encapsulation key.

Returns: The encapsulation key.

Exceptions:

- `CryptographicException`: An error occurred exporting the encapsulation key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportEncapsulationKey(Byte>) method

```csharp
public void ExportEncapsulationKey (Span<byte> destination);
```

Exports the encapsulation key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the encapsulation key.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the encapsulation key.
- `CryptographicException`: An error occurred exporting the encapsulation key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportEncapsulationKeyCore(Byte>) method

```csharp
protected abstract void ExportEncapsulationKeyCore (Span<byte> destination);
```

When overridden in a derived class, exports the encapsulation key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the encapsulation key.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password.

Parameters:

- `passwordBytes`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKey(Char>, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKey(String, PbeParameters) method

```csharp
public byte[] ExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A byte array containing the PKCS#8 EncryptedPrivateKeyInfo representation of this key.

Exceptions:

- `ArgumentNullException`: `pbeParameters` or `password` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters) method

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

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters) method

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
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLKem.ExportEncryptedPkcs8PrivateKeyPem(String, PbeParameters) method

```csharp
public string ExportEncryptedPkcs8PrivateKeyPem (string password, System.Security.Cryptography.PbeParameters pbeParameters);
```

Exports the current key in a PEM-encoded representation of the PKCS#8 EncryptedPrivateKeyInfo representation of this key, using a string password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.

Returns: A string containing the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo.

Exceptions:

- `ArgumentNullException`: `password` or `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLKem.ExportPkcs8PrivateKey() method

```csharp
public byte[] ExportPkcs8PrivateKey ();
```

Export the current key in the PKCS#8 PrivateKeyInfo format.

Returns: A byte array containing the PKCS#8 PrivateKeyInfo representation of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.
