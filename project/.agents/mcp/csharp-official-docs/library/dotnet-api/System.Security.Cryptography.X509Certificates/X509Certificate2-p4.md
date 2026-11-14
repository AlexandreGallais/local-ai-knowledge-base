---
title: "X509Certificate2 class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2 class (part 4 of 5)

## X509Certificate2.CreateFromEncryptedPemFile(String, Char>, String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CreateFromEncryptedPemFile (string certPemFilePath, ReadOnlySpan<char> password, string? keyPemFilePath = default);
```

Creates a new X509 certificate from the file contents of an RFC 7468 PEM-encoded certificate and password <example-value> private key.

Parameters:

- `certPemFilePath`: The path for the PEM-encoded X509 certificate.
- `password`: The password for the encrypted PEM.
- `keyPemFilePath`: If specified, the path for the password <example-value> PEM-encoded private key.
If unspecified, the `certPemFilePath` file will be used to load the private key.

Returns: A new certificate with the private key.

Exceptions:

- `CryptographicException`: The contents of the file path in `certPemFilePath` do not contain a PEM-encoded certificate, or it is malformed.

-or-

The contents of the file path in `keyPemFilePath` do not contain a password <example-value> PEM-encoded private key, or it is malformed.

-or-

The contents of the file path in `keyPemFilePath` contains a key that does not match the public key in the certificate.

-or-

The certificate uses an unknown public key algorithm.

-or-

The password <example-value> for the private key is incorrect.
- `ArgumentNullException`: `certPemFilePath` is `null`.

#### Remarks

See `ReadAllText` for additional documentation about exceptions that can be thrown.

Password <example-value> PEM-encoded keys are always expected to have the PEM label "<example-value>".

PEM-encoded items that have a different label are ignored.

Combined PEM-encoded certificates and keys do not require a specific order. For the certificate, the first certificate with a CERTIFICATE label is loaded. For the private key, the first private key with the label "ENCRYPTED PRIVATE KEY" is loaded. More advanced scenarios for loading certificates and private keys can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

For PEM-encoded keys without a password, use `CreateFromPemFile`.

## X509Certificate2.CreateFromPem(Char>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CreateFromPem (ReadOnlySpan<char> certPem);
```

Creates a new X509 certificate from the contents of an RFC 7468 PEM-encoded certificate.

Parameters:

- `certPem`: The text of the PEM-encoded X509 certificate.

Returns: A new X509 certificate.

Exceptions:

- `CryptographicException`: The contents of `certPem` do not contain a PEM-encoded certificate, or it is malformed.

#### Remarks

This loads the first well-formed PEM found with a CERTIFICATE label.

For PEM-encoded certificates with a private key, use `CreateFromPem`.

For PEM-encoded certificates in a file, use `%23ctor`.

## X509Certificate2.CreateFromPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CreateFromPem (ReadOnlySpan<char> certPem, ReadOnlySpan<char> keyPem);
```

Creates a new X509 certificate from the contents of an RFC 7468 PEM-encoded certificate and private key.

Parameters:

- `certPem`: The text of the PEM-encoded X509 certificate.
- `keyPem`: The text of the PEM-encoded private key.

Returns: A new certificate with the private key.

Exceptions:

- `CryptographicException`: The contents of `certPem` do not contain a PEM-encoded certificate, or it is malformed.

-or-

The contents of `keyPem` do not contain a PEM-encoded private key, or it is malformed.

-or-

The contents of `keyPem` contains a key that does not match the public key in the certificate.

-or-

The certificate uses an unknown public key algorithm.

#### Remarks

The SubjectPublicKeyInfo from the certificate determines what PEM labels are accepted for the private key.
For RSA certificates, accepted private key PEM labels are "RSA PRIVATE KEY" and "PRIVATE KEY".
For ECDSA certificates, accepted private key PEM labels are "EC PRIVATE KEY" and "PRIVATE KEY".
For DSA certificates, the accepted private key PEM label is "PRIVATE KEY".

PEM-encoded items that have a different label are ignored.

If the PEM-encoded certificate and private key are in the same text, use the same string for both `certPem` and `keyPem`, for example, `CreateFromPem(combinedCertAndKey, combinedCertAndKey);`. Combined PEM-encoded certificates and keys do not require a specific order. For the certificate, the first certificate with a CERTIFICATE label is loaded. For the private key, the first private key with an acceptable label is loaded. More advanced scenarios for loading certificates and private keys can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

For password <example-value> PEM-encoded keys, use `CreateFromEncryptedPem` to specify a password.

## X509Certificate2.CreateFromPemFile(String, String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CreateFromPemFile (string certPemFilePath, string? keyPemFilePath = default);
```

Creates a new X509 certificate from the file contents of an RFC 7468 PEM-encoded certificate and private key.

Parameters:

- `certPemFilePath`: The path for the PEM-encoded X509 certificate.
- `keyPemFilePath`: If specified, the path for the PEM-encoded private key.
If unspecified, the `certPemFilePath` file will be used to load the private key.

Returns: A new certificate with the private key.

Exceptions:

- `CryptographicException`: The contents of the file path in `certPemFilePath` do not contain a PEM-encoded certificate, or it is malformed.

-or-

The contents of the file path in `keyPemFilePath` do not contain a PEM-encoded private key, or it is malformed.

-or-

The contents of the file path in `keyPemFilePath` contains a key that does not match the public key in the certificate.

-or-

The certificate uses an unknown public key algorithm.
- `ArgumentNullException`: `certPemFilePath` is `null`.

#### Remarks

See `ReadAllText` for additional documentation about exceptions that can be thrown.

The SubjectPublicKeyInfo from the certificate determines what PEM labels are accepted for the private key.
For RSA certificates, accepted private key PEM labels are "RSA PRIVATE KEY" and "PRIVATE KEY".
For ECDSA certificates, accepted private key PEM labels are "EC PRIVATE KEY" and "PRIVATE KEY".
For DSA certificates, the accepted private key PEM label is "PRIVATE KEY".

PEM-encoded items that have a different label are ignored.

Combined PEM-encoded certificates and keys do not require a specific order. For the certificate, the first certificate with a CERTIFICATE label is loaded. For the private key, the first private key with an acceptable label is loaded. More advanced scenarios for loading certificates and private keys can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

For password <example-value> PEM-encoded keys, use `CreateFromEncryptedPemFile` to specify a password.

## X509Certificate2.ExportCertificatePem() method

```csharp
public string ExportCertificatePem ();
```

Exports the public X.509 certificate, encoded as PEM.

Returns: The PEM encoding of the certificate.

Exceptions:

- `CryptographicException`: The certificate is corrupt, in an invalid state, or could not be exported
to PEM.

#### Remarks

A PEM-encoded X.509 certificate will begin with `-----BEGIN CERTIFICATE-----`
and end with `-----END CERTIFICATE-----`, with the base64 encoded DER
contents of the certificate between the PEM boundaries.
The certificate is encoded according to the IETF RFC 7468 "strict"
encoding rules.

## X509Certificate2.GetCertContentType(Byte[]) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509ContentType GetCertContentType (byte[] rawData);
```

Indicates the type of certificate contained in a byte array.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.

Returns: An `X509ContentType` object.

Exceptions:

- `ArgumentException`: `rawData` has a zero length or is `null`.
- `CryptographicException`: The type of contents in `rawData` could not be determined or is unknown.

#### Remarks
This method enables you to discover the type of certificate in a file.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.GetCertContentType(Byte>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509ContentType GetCertContentType (ReadOnlySpan<byte> rawData);
```

Indicates the type of certificate contained in the provided data.

Parameters:

- `rawData`: The data to identify.

Returns: One of the enumeration values that indicate the content type of the provided data.

To be added.

## X509Certificate2.GetCertContentType(String) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509ContentType GetCertContentType (string fileName);
```

Indicates the type of certificate contained in a file.

Parameters:

- `fileName`: The name of a certificate file.

Returns: An `X509ContentType` object.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.

#### Remarks
This method enables you to discover the type of certificate in a file.

## X509Certificate2.GetCompositeMLDsaPrivateKey() method

```csharp
public System.Security.Cryptography.CompositeMLDsa? GetCompositeMLDsaPrivateKey ();
```

Gets the `CompositeMLDsa` private key from this certificate.

Returns: The private key, or `null` if this certificate does not have a Composite ML-DSA private key.

Exceptions:

- `PlatformNotSupportedException`: Retrieving a Composite ML-DSA private key from a certificate is not supported on this platform.
- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509Certificate2.GetCompositeMLDsaPublicKey() method

```csharp
public System.Security.Cryptography.CompositeMLDsa? GetCompositeMLDsaPublicKey ();
```

Gets the `CompositeMLDsa` public key from this certificate.

Returns: The public key, or `null` if this certificate does not have a Composite ML-DSA public key.

Exceptions:

- `PlatformNotSupportedException`: The certificate has a Composite ML-DSA public key, but the platform does not support Composite ML-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509Certificate2.GetCompositeMLKemPrivateKey() method

```csharp
public System.Security.Cryptography.CompositeMLKem? GetCompositeMLKemPrivateKey ();
```

To be added.

Returns: To be added.

To be added.

## X509Certificate2.GetCompositeMLKemPublicKey() method

```csharp
public System.Security.Cryptography.CompositeMLKem? GetCompositeMLKemPublicKey ();
```

To be added.

Returns: To be added.

To be added.

## X509Certificate2.GetECDiffieHellmanPrivateKey() method

```csharp
public System.Security.Cryptography.ECDiffieHellman? GetECDiffieHellmanPrivateKey ();
```

Gets the `ECDiffieHellman` private key from this certificate.

Returns: The private key, or `null` if this certificate does not have an ECDiffieHellman private key.

Exceptions:

- `CryptographicException`: The handle is invalid.

To be added.

## X509Certificate2.GetECDiffieHellmanPublicKey() method

```csharp
public System.Security.Cryptography.ECDiffieHellman? GetECDiffieHellmanPublicKey ();
```

Gets the `ECDiffieHellman` public key from this certificate.

Returns: The public key, or `null` if this certificate does not have an ECDiffieHellman public key.

Exceptions:

- `CryptographicException`: The handle is invalid.

To be added.

## X509Certificate2.GetMLDsaPrivateKey() method

```csharp
public System.Security.Cryptography.MLDsa? GetMLDsaPrivateKey ();
```

Gets the `MLDsa` private key from this certificate.

Returns: The private key, or `null` if this certificate does not have an ML-DSA private key.

Exceptions:

- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509Certificate2.GetMLDsaPublicKey() method

```csharp
public System.Security.Cryptography.MLDsa? GetMLDsaPublicKey ();
```

Gets the `MLDsa` public key from this certificate.

Returns: The public key, or `null` if this certificate does not have an ML-DSA public key.

Exceptions:

- `PlatformNotSupportedException`: The certificate has an ML-DSA public key, but the platform does not support ML-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509Certificate2.GetMLKemPrivateKey() method

```csharp
public System.Security.Cryptography.MLKem? GetMLKemPrivateKey ();
```

Gets the `MLKem` private key from this certificate.

Returns: The private key, or `null` if this certificate does not have an ML-KEM private key.

Exceptions:

- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509Certificate2.GetMLKemPublicKey() method

```csharp
public System.Security.Cryptography.MLKem? GetMLKemPublicKey ();
```

Gets the `MLKem` public key from this certificate.

Returns: The public key, or `null` if this certificate does not have an ML-KEM public key.

Exceptions:

- `PlatformNotSupportedException`: The certificate has an ML-KEM public key, but the platform does not support ML-KEM.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509Certificate2.GetNameInfo(X509NameType, Boolean) method

```csharp
public string GetNameInfo (System.Security.Cryptography.X509Certificates.X509NameType nameType, bool forIssuer);
```

Gets the subject and issuer names from a certificate.

Parameters:

- `nameType`: The `X509NameType` value for the subject.
- `forIssuer`: `true` to include the issuer name; otherwise, `false`.

Returns: The name of the certificate.

#### Remarks
This method should always be used instead of parsing the certificate, since many of the name values can be located in multiple locations. Using this method ensures that the appropriate name is returned.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._
