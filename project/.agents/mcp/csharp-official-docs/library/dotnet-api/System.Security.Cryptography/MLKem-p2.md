---
title: "MLKem class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLKem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLKem class (part 2 of 3)

## MLKem.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

Exports the current key in a PEM-encoded representation of the PKCS#8 PrivateKeyInfo format.

Returns: A string containing the PEM-encoded representation of the PKCS#8 PrivateKeyInfo.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLKem.ExportPrivateSeed() method

```csharp
public byte[] ExportPrivateSeed ();
```

Exports the private seed.

Returns: The private seed.

Exceptions:

- `CryptographicException`: The current instance cannot export a seed.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportPrivateSeed(Byte>) method

```csharp
public void ExportPrivateSeed (Span<byte> destination);
```

Exports the private seed into the provided buffer.

Parameters:

- `destination`: The buffer to receive the private seed.

Exceptions:

- `ArgumentException`: `destination` is the incorrect length to receive the private seed.
- `CryptographicException`: The current instance cannot export a seed.

-or-

An error occurred while exporting the key.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## MLKem.ExportPrivateSeedCore(Byte>) method

```csharp
protected abstract void ExportPrivateSeedCore (Span<byte> destination);
```

When overridden in a derived class, exports the private seed into the provided buffer.

Parameters:

- `destination`: The buffer to receive the private seed.

To be added.

## MLKem.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLKem.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

Exports the public-key <example-value> of the current key in a PEM-encoded representation of the X.509 SubjectPublicKeyInfo format.

Returns: A string containing the PEM-encoded representation of the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLKem.GenerateKey(MLKemAlgorithm) method

```csharp
public static System.Security.Cryptography.MLKem GenerateKey (System.Security.Cryptography.MLKemAlgorithm algorithm);
```

Generates a new ML-KEM key.

Parameters:

- `algorithm`: An algorithm identifying what kind of ML-KEM key to generate.

Returns: The generated key.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred generating the ML-KEM key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportDecapsulationKey(MLKemAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportDecapsulationKey (System.Security.Cryptography.MLKemAlgorithm algorithm, byte[] source);
```

Imports an ML-KEM key from a decapsulation key.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The decapsulation key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the ML-KEM algorithm.
- `ArgumentNullException`: `algorithm` is `null`.

-or-

`source` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportDecapsulationKey(MLKemAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportDecapsulationKey (System.Security.Cryptography.MLKemAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-KEM key from a decapsulation key.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The decapsulation key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the ML-KEM algorithm.
- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportEncapsulationKey(MLKemAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportEncapsulationKey (System.Security.Cryptography.MLKemAlgorithm algorithm, byte[] source);
```

Imports an ML-KEM key from a encapsulation key.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The encapsulation key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the ML-KEM algorithm.
- `ArgumentNullException`: `algorithm` is `null`.

-or-

`source` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportEncapsulationKey(MLKemAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportEncapsulationKey (System.Security.Cryptography.MLKemAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-KEM key from a encapsulation key.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The encapsulation key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the ML-KEM algorithm.
- `ArgumentNullException`: `algorithm` is `null`
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

Imports an ML-KEM private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

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

The value does not represent an ML-KEM key.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

Imports an ML-KEM private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The value does not represent an ML-KEM key.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

Imports an ML-KEM private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `ArgumentNullException`: `password` or `source` is `null`.
- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The value does not represent an ML-KEM key.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

Imports an ML-KEM key from an encrypted RFC 7468 PEM-encoded string.

Parameters:

- `source`: The PEM text of the encrypted key to import.
- `passwordBytes`: The password to use for decrypting the key material.

Returns: To be added.

Exceptions:

- `ArgumentException`: `source` does not contain a PEM-encoded key with a recognized label.

-or-

`source` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `source` represent the key in a format that is not supported.

-or-

An error occurred while importing the key.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## MLKem.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

Imports an ML-KEM key from an encrypted RFC 7468 PEM-encoded string.

Parameters:

- `source`: The PEM text of the encrypted key to import.
- `password`: The password to use for decrypting the key material.

Returns: To be added.

Exceptions:

- `ArgumentException`: `source` does not contain a PEM-encoded key with a recognized label.

-or-

`source` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `source` represent the key in a format that is not supported.

-or-

An error occurred while importing the key.

When the base-64 decoded contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## MLKem.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `passwordBytes` is `null`

To be added.

## MLKem.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `password` is `null`

To be added.

## MLKem.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromPem (ReadOnlySpan<char> source);
```

Imports an ML-KEM key from an RFC 7468 PEM-encoded string.

Parameters:

- `source`: The text of the PEM key to import.

Returns: The imported ML-KEM key.

Exceptions:

- `ArgumentException`: `source` contains an encrypted PEM-encoded key.

-or-

`source` contains multiple PEM-encoded ML-KEM keys.

-or-

`source` contains no PEM-encoded ML-KEM keys.
- `CryptographicException`: An error occurred while importing the key.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- PUBLIC KEY

- PRIVATE KEY

## MLKem.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.MLKem ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`

To be added.
