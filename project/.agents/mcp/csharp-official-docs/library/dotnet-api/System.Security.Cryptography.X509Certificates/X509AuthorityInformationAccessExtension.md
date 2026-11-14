---
title: "X509AuthorityInformationAccessExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509AuthorityInformationAccessExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509AuthorityInformationAccessExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509AuthorityInformationAccessExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Represents the Authority Information Access X.509 Extension (1.3.6.1.5.5.7.1.1).

To be added.

## X509AuthorityInformationAccessExtension.X509AuthorityInformationAccessExtension() constructor

```csharp
public X509AuthorityInformationAccessExtension ();
```

Initializes a new instance of the `X509AuthorityInformationAccessExtension` class.

To be added.

## X509AuthorityInformationAccessExtension.X509AuthorityInformationAccessExtension(Byte[], Boolean) constructor

```csharp
public X509AuthorityInformationAccessExtension (byte[] rawData, bool critical = false);
```

Initializes a new instance of the `X509AuthorityInformationAccessExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rawData` is `null`.
- `CryptographicException`: `rawData` did not decode as an Authority Information Access extension.

To be added.

## X509AuthorityInformationAccessExtension.X509AuthorityInformationAccessExtension(Byte>, Boolean) constructor

```csharp
public X509AuthorityInformationAccessExtension (ReadOnlySpan<byte> rawData, bool critical = false);
```

Initializes a new instance of the `X509AuthorityInformationAccessExtension` class from an encoded representation of the extension and an optional critical marker.

Parameters:

- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `CryptographicException`: `rawData` did not decode as an Authority Information Access extension.

To be added.

## X509AuthorityInformationAccessExtension.X509AuthorityInformationAccessExtension(String>, String>, Boolean) constructor

```csharp
public X509AuthorityInformationAccessExtension (System.Collections.Generic.IEnumerable<string>? ocspUris, System.Collections.Generic.IEnumerable<string>? caIssuersUris, bool critical = false);
```

Initializes a new instance of the `X509AuthorityInformationAccessExtension` class from a collection of OCSP and CAIssuer values.

Parameters:

- `ocspUris`: A collection of OCSP URI values to embed in the extension.
- `caIssuersUris`: A collection of CAIssuers URI values to embed in the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `ArgumentException`: Both `ocspUris` and `caIssuersUris` are
either `null` or empty.
- `CryptographicException`: One of the values in `ocspUris` or `caIssuersUris`
contains characters outside of the International Alphabet 5 (IA5) character space
(which is equivalent to 7-bit US-ASCII).

To be added.

## X509AuthorityInformationAccessExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Copies the extension properties of the specified `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` to be copied.

To be added.

## X509AuthorityInformationAccessExtension.EnumerateCAIssuersUris() method

```csharp
public System.Collections.Generic.IEnumerable<string> EnumerateCAIssuersUris ();
```

Enumerates the AccessDescription values whose AccessMethod is CAIssuers (1.3.6.1.5.5.7.48.2) and content data type is URI.

Returns: The URIs corresponding to the locations for the issuing Certificate Authority certificate.

Exceptions:

- `CryptographicException`: The contents of the extension could not be decoded successfully.

To be added.

## X509AuthorityInformationAccessExtension.EnumerateOcspUris() method

```csharp
public System.Collections.Generic.IEnumerable<string> EnumerateOcspUris ();
```

Enumerates the AccessDescription values whose AccessMethod is OCSP (1.3.6.1.5.5.7.48.1) and content data type is URI.

Returns: The URIs corresponding to the locations for the issuing Certificate Authority certificate.

Exceptions:

- `CryptographicException`: The contents of the extension could not be decoded successfully.

To be added.

## X509AuthorityInformationAccessExtension.EnumerateUris(Oid) method

```csharp
public System.Collections.Generic.IEnumerable<string> EnumerateUris (System.Security.Cryptography.Oid accessMethodOid);
```

Enumerates the AccessDescription values described in this extension, filtering the results to include only items using the specified access method and having a content data type of URI.

Parameters:

- `accessMethodOid`: The object identifier representing the access method for filtering.

Returns: The URI-typed access location values that correspond to the requested access method.

Exceptions:

- `ArgumentNullException`: `accessMethodOid` is `null`.
- `ArgumentException`: The `Oid.Value` property of the `accessMethodOid` parameter is
`null` or the empty string.
- `CryptographicException`: The contents of the extension could not be decoded successfully.

#### Remarks

This method does not validate or ensure that the produced values are valid URIs,
merely that they were encoded as a URI.

## X509AuthorityInformationAccessExtension.EnumerateUris(String) method

```csharp
public System.Collections.Generic.IEnumerable<string> EnumerateUris (string accessMethodOid);
```

Enumerates the AccessDescription values described in this extension, filtering the results to include only items using the specified access method and having a content data type of URI.

Parameters:

- `accessMethodOid`: The dotted-decimal form of the access method for filtering.

Returns: The URI-typed access location values that correspond to the requested access method.

Exceptions:

- `ArgumentNullException`: `accessMethodOid` is `null`.
- `CryptographicException`: The contents of the extension could not be decoded successfully.

#### Remarks

This method does not validate or ensure that the produced values are valid URIs,
merely that they were encoded as a URI.
