---
title: "AsymmetricAlgorithm class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AsymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsymmetricAlgorithm class (part 2 of 3)

## AsymmetricAlgorithm.ExportPkcs8PrivateKey() method

```csharp
public virtual byte[] ExportPkcs8PrivateKey ();
```

Exports the current key in the PKCS#8 PrivateKeyInfo format.

Returns: A byte array containing the PKCS#8 PrivateKeyInfo representation of this key.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## AsymmetricAlgorithm.ExportPkcs8PrivateKeyPem() method

```csharp
public string ExportPkcs8PrivateKeyPem ();
```

Exports the current key in the PKCS#8 PrivateKeyInfo format, PEM encoded.

Returns: A string containing the PEM-encoded PKCS#8 PrivateKeyInfo.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.ExportPkcs8PrivateKey` or
`AsymmetricAlgorithm.TryExportPkcs8PrivateKey` has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded PKCS#8 PrivateKeyInfo will begin with `-----BEGIN PRIVATE KEY-----`
and end with `-----END PRIVATE KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict" encoding rules.

## AsymmetricAlgorithm.ExportSubjectPublicKeyInfo() method

```csharp
public virtual byte[] ExportSubjectPublicKeyInfo ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of the public-key <example-value> of this key.

To be added.

## AsymmetricAlgorithm.ExportSubjectPublicKeyInfoPem() method

```csharp
public string ExportSubjectPublicKeyInfoPem ();
```

Exports the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format, PEM encoded.

Returns: A string containing the PEM-encoded X.509 SubjectPublicKeyInfo.

Exceptions:

- `NotImplementedException`: An implementation for `AsymmetricAlgorithm.ExportSubjectPublicKeyInfo` or
`AsymmetricAlgorithm.TryExportSubjectPublicKeyInfo` has not been provided.
- `CryptographicException`: The key could not be exported.

#### Remarks

A PEM-encoded X.509 SubjectPublicKeyInfo will begin with
`-----BEGIN PUBLIC KEY-----` and end with
`-----END PUBLIC KEY-----`, with the base64 encoded DER
contents of the key <example-value> the PEM boundaries.

The PEM is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## AsymmetricAlgorithm.FromXmlString(String) method

```csharp
public virtual void FromXmlString (string xmlString);
```

When overridden in a derived class, reconstructs an `AsymmetricAlgorithm` object from an XML string. Otherwise, throws a `NotImplementedException`.

Parameters:

- `xmlString`: The XML string to use to reconstruct the `AsymmetricAlgorithm` object.

#### Examples
The following code example demonstrates how to implement the `AsymmetricAlgorithm.FromXmlString` method to parse the specified XML string to populate the current `CspParameters` object. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._

## AsymmetricAlgorithm.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public virtual void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

When overridden in a derived class, imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.

-or-

The contents of `source` indicate the Key <example-value> Function (KDF) to apply is the legacy PKCS#12 KDF, which requires `Char`-based passwords.

-or-

The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

Because algorithm-specific support is required to interpret the contents of this data format, `AsymmetricAlgorithm.ImportEncryptedPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public virtual void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

When overridden in a derived class, imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.

-or-

The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
When the contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

Because algorithm-specific support is required to interpret the contents of this data format, `AsymmetricAlgorithm.ImportEncryptedPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public virtual void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<byte> passwordBytes);
```

When overridden in a derived class, imports an encrypted RFC 7468 PEM-encoded key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `passwordBytes`: The bytes to use as a password when decrypting the key material.

Exceptions:

- `NotImplementedException`: A derived type has not overridden this member.
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

Because each algorithm may have algorithm-specific PEM labels, the default behavior will throw `NotImplementedException`.

## AsymmetricAlgorithm.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public virtual void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<char> password);
```

When overridden in a derived class, imports an encrypted RFC 7468 PEM-encoded key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `password`: The password to use for decrypting the key material.

Exceptions:

- `NotImplementedException`: A derived type has not overridden this member.
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

Because each algorithm may have algorithm-specific PEM labels, the default behavior will throw `NotImplementedException`.

## AsymmetricAlgorithm.ImportFromPem(Char>) method

```csharp
public virtual void ImportFromPem (ReadOnlySpan<char> input);
```

When overridden in a derived class, imports an RFC 7468 textually encoded key, replacing the keys for this object.

Parameters:

- `input`: The text of the PEM key to import.

Exceptions:

- `NotImplementedException`: A derived type has not overridden this member.
- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.

-or-

`input` contains an encrypted PEM-encoded key.

#### Remarks

Because each algorithm may have algorithm-specific PEM labels, the default behavior will throw `NotImplementedException`.

## AsymmetricAlgorithm.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public virtual void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

When overriden in a derived class, imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
This method only supports the binary (BER/CER/DER) encoding of PrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

Because algorithm-specific support is required to interpret the contents of this data format, `AsymmetricAlgorithm.ImportPkcs8PrivateKey` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.ImportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public virtual void ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source, out int bytesRead);
```

When overriden in a derived class, imports the public key from an X.509 SubjectPublicKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.
- `NotImplementedException`: A derived type has not overriden this member.

#### Remarks
This method only supports the binary (DER) encoding of SubjectPublicKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

Because algorithm-specific support is required to interpret the contents of this data format, `AsymmetricAlgorithm.ImportSubjectPublicKeyInfo` throws a `NotImplementedException` by default.

## AsymmetricAlgorithm.ToXmlString(Boolean) method

```csharp
public virtual string ToXmlString (bool includePrivateParameters);
```

When overridden in a derived class, creates and returns an XML string representation of the current `AsymmetricAlgorithm` object. Otherwise, throws a `NotImplementedException`.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: An XML string encoding of the current `AsymmetricAlgorithm` object.

#### Examples
The following code example demonstrates how to call the `AsymmetricAlgorithm.ToXmlString` method to create an XML representation of the parameters in the current `AsymmetricAlgorithm` object. This code example is part of a larger example provided for the `AsymmetricAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AsymmetricAlgorithm/Overview/customcrypto.cs._
