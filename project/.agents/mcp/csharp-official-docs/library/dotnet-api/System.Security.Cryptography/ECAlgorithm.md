---
title: "ECAlgorithm class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class ECAlgorithm : System.Security.Cryptography.AsymmetricAlgorithm
```

Represents the abstract class from which elliptic-curve asymmetric algorithms can inherit.

To be added.

## ECAlgorithm.ECAlgorithm() constructor

```csharp
protected ECAlgorithm ();
```

Initializes a new instance of the `ECAlgorithm` class.

To be added.

## ECAlgorithm.ExportECPrivateKey() method

```csharp
public virtual byte[] ExportECPrivateKey ();
```

Exports the current key in the ECPrivateKey format.

Returns: A byte array containing the ECPrivateKey <example-value> of this key.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## ECAlgorithm.ExportECPrivateKeyPem() method

```csharp
public string ExportECPrivateKeyPem ();
```

Exports the current key in the ECPrivateKey <example-value>, PEM encoded.

Returns: A string containing the PEM-encoded ECPrivateKey.

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded ECPrivateKey will begin with `-----BEGIN EC PRIVATE KEY-----`
and end with `-----END EC PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## ECAlgorithm.ExportExplicitParameters(Boolean) method

```csharp
public virtual System.Security.Cryptography.ECParameters ExportExplicitParameters (bool includePrivateParameters);
```

When overridden in a derived class, exports the explicit `ECParameters` for an ECCurve.

Parameters:

- `includePrivateParameters`: `true` to include private parameters, otherwise, `false`.

Returns: The exported explicit parameters.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

To be added.

## ECAlgorithm.ExportParameters(Boolean) method

```csharp
public virtual System.Security.Cryptography.ECParameters ExportParameters (bool includePrivateParameters);
```

When overridden in a derived class, exports the named or explicit `ECParameters` for an ECCurve.
If the curve has a name, the Curve property will contain named curve parameters otherwise it will contain explicit parameters.

Parameters:

- `includePrivateParameters`: `true` to include private parameters, otherwise, `false`.

Returns: The exported parameters.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

To be added.

## ECAlgorithm.GenerateKey(ECCurve) method

```csharp
public virtual void GenerateKey (System.Security.Cryptography.ECCurve curve);
```

When overridden in a derived class, generates a new public/private keypair for the specified curve.

Parameters:

- `curve`: The curve to use.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

To be added.

## ECAlgorithm.ImportECPrivateKey(Byte>, Int32) method

```csharp
public virtual void ImportECPrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from an ECPrivateKey <example-value>, replacing the keys for this object.

Parameters:

- `source`: The bytes of an ECPrivateKey <example-value> in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation for `ECAlgorithm.ImportParameters`.
- `CryptographicException`:
The contents of `source` do not represent an
ASN.1-BER-encoded PKCS#8 ECPrivateKey structure.

-or-
The key <example-value> failed.

#### Remarks

This method only supports the binary (BER/CER/DER) encoding of ECPrivateKey.
If the value is Base64-encoded, the caller must Base64-decode the contents before calling this method.
If the value is PEM-encoded, `ImportFromPem` should be used.

## ECAlgorithm.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.
-or-

The contents of `source` indicate the Key <example-value> Function (KDF)
to apply is the legacy PKCS#12 KDF, which requires `char`-based passwords.

-or-

The contents of `source` do not represent an
ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for
an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format
that is not supported.

-or-
The algorithm-specific key <example-value> failed.
- `NotSupportedException`: A derived class has not provided an implementation for `ECAlgorithm.ImportParameters`.

#### Remarks

The password bytes are passed directly into the Key <example-value> Function (KDF)
used by the algorithm indicated by the EncryptedPrivateKeyInfo contents.
This enables compatibility with other systems which use a text encoding
other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded, the caller must Base64-decode the contents before calling this method.
If the contents are PEM-encoded, `ImportFromEncryptedPem`
should be used.

## ECAlgorithm.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`:
The contents of `source` do not represent an
ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for
an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format
that is not supported.

-or-
The algorithm-specific key <example-value> failed.
- `NotSupportedException`: A derived class has not provided an implementation for `ECAlgorithm.ImportParameters`.

#### Remarks

When the contents of `source` indicate an algorithm that uses PBKDF1
(Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2),
the password is converted to bytes via the UTF-8 encoding.

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded, the caller must Base64-decode the contents before calling this method.
If the contents are PEM-encoded, `ImportFromEncryptedPem`
should be used.

## ECAlgorithm.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public override void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<byte> passwordBytes);
```

Imports an encrypted RFC 7468 PEM-encoded private key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `passwordBytes`: The bytes to use as a password when decrypting the key material.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `input`
do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `input`
indicate the key is for an algorithm other than the algorithm
represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `input`
represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks

The password bytes are passed directly into the Key <example-value> Function (KDF)
used by the algorithm indicated by `pbeParameters`. This enables compatibility
with other systems which use a text encoding other than UTF-8 when processing
passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

Unsupported or malformed PEM-encoded objects are ignored. If multiple supported PEM labels
are found, an exception is thrown to prevent importing a key when
the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## ECAlgorithm.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public override void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<char> password);
```

Imports an encrypted RFC 7468 PEM-encoded private key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `password`: The password to use for decrypting the key material.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `input`
do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `input`
indicate the key is for an algorithm other than the algorithm
represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `input`
represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks

When the base-64 decoded contents of `input` indicate an algorithm that uses PBKDF1
(Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2),
the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels
are found, an exception is thrown to prevent importing a key when
the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## ECAlgorithm.ImportFromPem(Char>) method

```csharp
public override void ImportFromPem (ReadOnlySpan<char> input);
```

Imports an RFC 7468 PEM-encoded key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the key to import.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.

-or-

`input` contains an encrypted PEM-encoded key.

#### Remarks

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- `PUBLIC KEY`
- `PRIVATE KEY`
- `EC PRIVATE KEY`

## ECAlgorithm.ImportParameters(ECParameters) method

```csharp
public virtual void ImportParameters (System.Security.Cryptography.ECParameters parameters);
```

When overridden in a derived class, imports the specified `ECParameters`.

Parameters:

- `parameters`: The curve parameters.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

To be added.

## ECAlgorithm.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation for `ECAlgorithm.ImportParameters`.
- `CryptographicException`:
The contents of `source` do not represent an ASN.1-BER-encoded
PKCS#8 PrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm
other than the algorithm represented by this instance.

-or-
The contents of `source` represent the key in a format that is not supported.
-or-

The algorithm-specific key <example-value> failed.

#### Remarks

This method only supports the binary (BER/CER/DER) encoding of PrivateKeyInfo.
If the value is Base64-encoded, the caller must Base64-decode the contents before calling this method.
If the value is PEM-encoded, `ImportFromPem` should be used.

## ECAlgorithm.ImportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public override void ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public key from an X.509 SubjectPublicKeyInfo structure after decryption, replacing the keys for this object

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation for `ECAlgorithm.ImportParameters`.
- `CryptographicException`:
The contents of `source` do not represent an
ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm
other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-
The algorithm-specific key <example-value> failed.

#### Remarks

This method only supports the binary (DER) encoding of SubjectPublicKeyInfo.
If the value is Base64-encoded, the caller must Base64-decode the contents before calling this method.
If this value is PEM-encoded, `ImportFromPem` should be used.
