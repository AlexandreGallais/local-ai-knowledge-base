---
title: "AsymmetricAlgorithm class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricAlgorithm class (part 3 of 3)

## AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public virtual bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

When overridden in a derived class, attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

-or-

`pbeParameters` indicates that `PbeEncryptionAlgorithm.TripleDes3KeyPkcs12` should be used, which requires `Char`-based passwords.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

Because algorithm-specific support is required to produce this data format, `AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

```csharp
public virtual bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

When overriden in a derived class, attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
When `pbeParameters` indicates an algorithm that uses PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Because algorithm-specific support is required to produce this data format, `AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKeyPem(Byte>, PbeParameters, Char>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<char> destination, out int charsWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a byte-based password, PEM encoded.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The character span to receive the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey`
has not been provided.
- `CryptographicException`: The key could not be exported.

A PEM-encoded PKCS#8 EncryptedPrivateKeyInfo will begin with `-----BEGIN ENCRYPTED PRIVATE KEY-----` and end with `-----END ENCRYPTED PRIVATE KEY-----`, with the base64 encoded DER contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict" encoding rules.

## AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKeyPem(Char>, PbeParameters, Char>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKeyPem (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<char> destination, out int charsWritten);
```

Exports the current key in the PKCS#8 EncryptedPrivateKeyInfo format with a char-based password, PEM encoded.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The character span to receive the PEM-encoded PKCS#8 EncryptedPrivateKeyInfo data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.TryExportEncryptedPkcs8PrivateKey`
has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

When `pbeParameters` indicates an algorithm that
uses PBKDF2 (Password-Based Key <example-value> Function 2), the password
is converted to bytes via the UTF-8 encoding.

A PEM-encoded PKCS#8 EncryptedPrivateKeyInfo will begin with
`-----BEGIN ENCRYPTED PRIVATE KEY-----` and end with
`-----END ENCRYPTED PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## AsymmetricAlgorithm.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public virtual bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

When overridden in a derived class, attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
Because algorithm-specific support is required to produce this data format, `AsymmetricAlgorithm.TryExportPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.TryExportPkcs8PrivateKeyPem(Char>, Int32) method

```csharp
public bool TryExportPkcs8PrivateKeyPem (Span<char> destination, out int charsWritten);
```

Attempts to export the current key in the PEM-encoded PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The character span to receive the PEM-encoded PKCS#8 PrivateKeyInfo data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.TryExportPkcs8PrivateKey`
has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#8 PrivateKeyInfo will begin with `-----BEGIN PRIVATE KEY-----`
and end with `-----END PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## AsymmetricAlgorithm.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public virtual bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

When overridden in a derived class, attempts to export the current key in the X.509 SubjectPublicKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the X.509 SubjectPublicKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
Because algorithm-specific support is required to produce this data format, `AsymmetricAlgorithm.TryExportSubjectPublicKeyInfo` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.TryExportSubjectPublicKeyInfoPem(Char>, Int32) method

```csharp
public bool TryExportSubjectPublicKeyInfoPem (Span<char> destination, out int charsWritten);
```

Attempts to export the current key in the PEM-encoded X.509 SubjectPublicKeyInfo format into a provided buffer.

Parameters:

- `destination`: The character span to receive the PEM-encoded X.509 SubjectPublicKeyInfo data.
- `charsWritten`: When this method returns, contains a value that indicates the number of characters written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.TryExportSubjectPublicKeyInfo`
has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded X.509 SubjectPublicKeyInfo will begin with
`-----BEGIN PUBLIC KEY-----` and end with
`-----END PUBLIC KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## AsymmetricAlgorithm.KeySizeValue field

```csharp
protected int KeySizeValue;
```

Represents the size, in bits, of the key <example-value> used by the asymmetric algorithm.

#### Remarks
The valid key sizes are specified by the particular implementation of the asymmetric algorithm and are listed in the `LegalKeySizes` property.

This field is accessed through the `KeySize` property.

## AsymmetricAlgorithm.LegalKeySizesValue field

```csharp
protected System.Security.Cryptography.KeySizes[] LegalKeySizesValue;
```

Specifies the key sizes that are supported by the asymmetric algorithm.

#### Remarks
The asymmetric algorithm supports only key sizes that match an entry in this array.

This field is accessed through the `LegalKeySizes` property.
