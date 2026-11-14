---
title: "X509AuthorityKeyIdentifierExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509AuthorityKeyIdentifierExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509AuthorityKeyIdentifierExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509AuthorityKeyIdentifierExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Represents the Authority Key <example-value> X.509 Extension (2.5.29.35).

To be added.

## X509AuthorityKeyIdentifierExtension.X509AuthorityKeyIdentifierExtension() constructor

```csharp
public X509AuthorityKeyIdentifierExtension ();
```

Initializes a new instance of the `X509AuthorityKeyIdentifierExtension` class.

To be added.

## X509AuthorityKeyIdentifierExtension.X509AuthorityKeyIdentifierExtension(Byte[], Boolean) constructor

```csharp
public X509AuthorityKeyIdentifierExtension (byte[] rawData, bool critical = false);
```

Initializes a new instance of the `X509AuthorityKeyIdentifierExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rawData` is `null`.
- `CryptographicException`: `rawData` did not decode as an Authority Key <example-value> extension.

To be added.

## X509AuthorityKeyIdentifierExtension.X509AuthorityKeyIdentifierExtension(Byte>, Boolean) constructor

```csharp
public X509AuthorityKeyIdentifierExtension (ReadOnlySpan<byte> rawData, bool critical = false);
```

Initializes a new instance of the `X509AuthorityKeyIdentifierExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `CryptographicException`: `rawData` did not decode as an Authority Key <example-value> extension.

To be added.

## X509AuthorityKeyIdentifierExtension.KeyIdentifier property

```csharp
public ReadOnlyMemory<byte>? KeyIdentifier { get; }
```

Gets the subject key <example-value> value from this certificate's issuing Certificate Authority (CA), when specified.

Returns: The subject key <example-value> from this certificate's issuing Certificate Authority (CA).

To be added.

## X509AuthorityKeyIdentifierExtension.NamedIssuer property

```csharp
public System.Security.Cryptography.X509Certificates.X500DistinguishedName? NamedIssuer { get; }
```

Gets the `X509Certificate2.IssuerName` value from this certificate's issuing Certificate Authority (CA), when available.

Returns: The `X509Certificate2.IssuerName` value from this certificate's issuing Certificate Authority (CA).

This property is `null` if any of the following are true:

The encoded extension does not include an `authorityCertIssuer` value.
The `authorityCertIssuer` value contains no `directoryName` values.
The `authorityCertIssuer` value contains multiple `directoryName` values.
 The `directoryName` value did not successfully decode as an `X500DistinguishedName`.

## X509AuthorityKeyIdentifierExtension.RawIssuer property

```csharp
public ReadOnlyMemory<byte>? RawIssuer { get; }
```

Gets the encoded representation of the `authorityCertIssuer` field from the extension, or `null` when the extension does not contain an authority certificate issuer field.

Returns: The encoded `authorityCertIssuer` value.

To be added.

## X509AuthorityKeyIdentifierExtension.SerialNumber property

```csharp
public ReadOnlyMemory<byte>? SerialNumber { get; }
```

Gets the serial number of this certificate's issuing Certificate Authority (CA).

Returns: The serial number from this certificate's issuing Certificate Authority (CA).

To be added.

## X509AuthorityKeyIdentifierExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Copies the extension properties of the specified `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` to be copied.

To be added.

## X509AuthorityKeyIdentifierExtension.Create(Byte[], X500DistinguishedName, Byte[]) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension Create (byte[] keyIdentifier, System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, byte[] serialNumber);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided key <example-value>, issuer name and serial number.

Parameters:

- `keyIdentifier`: The subject key <example-value> value from the Certificate Authority (CA) certificate that will sign this extension.
- `issuerName`: The issuer name value from the Certificate Authority (CA) certificate that will sign this extension.
- `serialNumber`: The serial number value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `keyIdentifier`, `issuerName` or
`serialNumber` is `null`.
- `ArgumentException`: `serialNumber` is invalid because the leading 9 bits are either
all zero or all one.

To be added.

## X509AuthorityKeyIdentifierExtension.Create(Byte>, X500DistinguishedName, Byte>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension Create (ReadOnlySpan<byte> keyIdentifier, System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, ReadOnlySpan<byte> serialNumber);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided key <example-value>, issuer name and serial number.

Parameters:

- `keyIdentifier`: The subject key <example-value> value from the Certificate Authority (CA) certificate that will sign this extension.
- `issuerName`: The issuer name value from the Certificate Authority (CA) certificate that will sign this extension.
- `serialNumber`: The serial number value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `issuerName` is `null`.
- `ArgumentException`: `serialNumber` is invalid because the leading 9 bits are either
all zero or all one.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromCertificate(X509Certificate2, Boolean, Boolean) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromCertificate (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, bool includeKeyIdentifier, bool includeIssuerAndSerial);
```

Creates an `X509AuthorityKeyIdentifierExtension` based on values from the provided certificate.

Parameters:

- `certificate`: The Certificate Authority (CA) certificate that will sign this extension.
- `includeKeyIdentifier`: `true` to include the Subject Key <example-value> value from the certificate as the key <example-value> value in this extension; otherwise, `false`.
- `includeIssuerAndSerial`: `true` to include the certificate's issuer name and serial number in this extension; otherwise, `false`.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `CryptographicException`: `includeKeyIdentifier` is `true`, but
`certificate` does not contain a Subject Key <example-value> extension.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromIssuerNameAndSerialNumber(X500DistinguishedName, Byte[]) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromIssuerNameAndSerialNumber (System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, byte[] serialNumber);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided issuer name and serial number.

Parameters:

- `issuerName`: The issuer name value from the Certificate Authority (CA) certificate that will sign this extension.
- `serialNumber`: The serial number value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `issuerName` or `serialNumber` is `null`.
- `ArgumentException`: `serialNumber` is invalid because the leading 9 bits are either
all zero or all one.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromIssuerNameAndSerialNumber(X500DistinguishedName, Byte>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromIssuerNameAndSerialNumber (System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, ReadOnlySpan<byte> serialNumber);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided issuer name and serial number.

Parameters:

- `issuerName`: The issuer name value from the Certificate Authority (CA) certificate that will sign this extension.
- `serialNumber`: The serial number value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `issuerName` is `null`.
- `ArgumentException`: `serialNumber` is invalid because the leading 9 bits are either
all zero or all one.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromSubjectKeyIdentifier(Byte[]) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromSubjectKeyIdentifier (byte[] subjectKeyIdentifier);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided key <example-value> value.

Parameters:

- `subjectKeyIdentifier`: The subject key <example-value> value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `subjectKeyIdentifier` is `null`.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromSubjectKeyIdentifier(Byte>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromSubjectKeyIdentifier (ReadOnlySpan<byte> subjectKeyIdentifier);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the provided key <example-value> value.

Parameters:

- `subjectKeyIdentifier`: The subject key <example-value> value from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

To be added.

## X509AuthorityKeyIdentifierExtension.CreateFromSubjectKeyIdentifier(X509SubjectKeyIdentifierExtension) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension CreateFromSubjectKeyIdentifier (System.Security.Cryptography.X509Certificates.X509SubjectKeyIdentifierExtension subjectKeyIdentifier);
```

Creates an `X509AuthorityKeyIdentifierExtension` that specifies the key <example-value> value from a subject key <example-value> extension.

Parameters:

- `subjectKeyIdentifier`: The subject key <example-value> extension from the Certificate Authority (CA) certificate that will sign this extension.

Returns: The configured extension.

Exceptions:

- `ArgumentNullException`: `subjectKeyIdentifier` is `null`.

To be added.
