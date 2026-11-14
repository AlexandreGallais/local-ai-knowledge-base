---
title: "X500DistinguishedNameBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X500DistinguishedNameBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X500DistinguishedNameBuilder class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X500DistinguishedNameBuilder
```

Facilitates building a distinguished name for an X.509 certificate.

#### Remarks

When constructing the `SEQUENCE OF` `Relative Distinguished Names`, this builder constructs the `SEQUENCE OF` in the opposite order which they were added to the builder. For example:

```csharp
builder.AddCommonName("Contoso");
builder.AddCountryOrRegion("US");
```

Will produce a `SEQUENCE OF` with the country or region first, and the common name second. Because `X500DistinguishedName` follows RFC 4514
when converting a `Distinguished Name` to a string, it starts with the last `Relative Distinguished Name` component, moving backward toward the first.

Because the builder creates the `SEQUENCE OF` in reverse, and `X500DistinguishedName` is also in reverse, it gives the appearance of the added attributes and the string representation of the `Distinguished Name` in the same order.

## X500DistinguishedNameBuilder.X500DistinguishedNameBuilder() constructor

```csharp
public X500DistinguishedNameBuilder ();
```

Initializes a new instance of the `X500DistinguishedNameBuilder` class.

To be added.

## X500DistinguishedNameBuilder.Add(Oid, String, UniversalTagNumber>) method

```csharp
public void Add (System.Security.Cryptography.Oid oid, string value, System.Formats.Asn1.UniversalTagNumber? stringEncodingType = default);
```

Adds a `Relative Distinguished Name` attribute identified by an OID.

Parameters:

- `oid`: The OID of the attribute.
- `value`: The value of the attribute.
- `stringEncodingType`: The encoding type to use when encoding the `value` in to the attribute.

Exceptions:

- `ArgumentNullException`: `oid` or `value` is `null`.
- `ArgumentException`: `oid` does not contain a valid OID.

-or-

`stringEncodingType` is not a type for character strings.

-or-

`value` is not encodable as defined by `stringEncodingType`.

To be added.

## X500DistinguishedNameBuilder.Add(String, String, UniversalTagNumber>) method

```csharp
public void Add (string oidValue, string value, System.Formats.Asn1.UniversalTagNumber? stringEncodingType = default);
```

Adds a `Relative Distinguished Name` attribute identified by an OID.

Parameters:

- `oidValue`: The OID of the attribute.
- `value`: The value of the attribute.
- `stringEncodingType`: The encoding type to use when encoding the `value` in to the attribute.

Exceptions:

- `ArgumentNullException`: `oidValue` or `value` is `null`.
- `ArgumentException`: `oidValue` is an empty string or not a valid OID.

-or-

`stringEncodingType` is not a type for character strings.

-or-

`value` is not encodable as defined by `stringEncodingType`.

To be added.

## X500DistinguishedNameBuilder.AddCommonName(String) method

```csharp
public void AddCommonName (string commonName);
```

Adds a common name attribute.

Parameters:

- `commonName`: The common name to add.

Exceptions:

- `ArgumentNullException`: `commonName` is `null`.
- `ArgumentException`: `commonName` is empty.

#### Remarks

This encodes an attribute with the OID 2.5.4.3 as a UTF8String.

## X500DistinguishedNameBuilder.AddCountryOrRegion(String) method

```csharp
public void AddCountryOrRegion (string twoLetterCode);
```

Adds a country or region attribute.

Parameters:

- `twoLetterCode`: The two letter code of the country or region.

Exceptions:

- `ArgumentNullException`: `twoLetterCode` is `null`.
- `ArgumentException`: `twoLetterCode` is not exactly two characters, or contains
characters that are not A through Z.

#### Remarks

This encodes an attribute with the OID 2.5.4.6 as a PrintableString.

`twoLetterCode` should be a two letter ISO 3166 alpha-2 code, and will be normalized to upper case characters.

## X500DistinguishedNameBuilder.AddDomainComponent(String) method

```csharp
public void AddDomainComponent (string domainComponent);
```

Adds a domain component attribute.

Parameters:

- `domainComponent`: The domain component to add.

Exceptions:

- `ArgumentNullException`: `domainComponent` is `null`.
- `ArgumentException`: `domainComponent` is empty.

#### Remarks

This encodes an attribute with the OID 0.9.2342.19200300.100.1.25 as an IA5String.

## X500DistinguishedNameBuilder.AddEmailAddress(String) method

```csharp
public void AddEmailAddress (string emailAddress);
```

Adds an email address attribute.

Parameters:

- `emailAddress`: The email address to add.

Exceptions:

- `ArgumentNullException`: `emailAddress` is `null`.
- `ArgumentException`: `emailAddress` is empty or exceeds 255 characters.

#### Remarks

This encodes an attribute with the OID 1.2.840.113549.1.9.1 as an IA5String.

## X500DistinguishedNameBuilder.AddLocalityName(String) method

```csharp
public void AddLocalityName (string localityName);
```

Adds a locality name attribute.

Parameters:

- `localityName`: The locality name to add.

Exceptions:

- `ArgumentNullException`: `localityName` is `null`.
- `ArgumentException`: `localityName` is empty.

#### Remarks

This encodes an attribute with the OID 2.5.4.7 as a UTF8String.

## X500DistinguishedNameBuilder.AddOrganizationalUnitName(String) method

```csharp
public void AddOrganizationalUnitName (string organizationalUnitName);
```

Adds an organizational unit name attribute.

Parameters:

- `organizationalUnitName`: The organizational unit name to add.

Exceptions:

- `ArgumentNullException`: `organizationalUnitName` is `null`.
- `ArgumentException`: `organizationalUnitName` is empty.

#### Remarks

This encodes an attribute with the OID 2.5.4.11 as a UTF8String.

## X500DistinguishedNameBuilder.AddOrganizationName(String) method

```csharp
public void AddOrganizationName (string organizationName);
```

Adds an organization name attribute.

Parameters:

- `organizationName`: The organization name to add.

Exceptions:

- `ArgumentNullException`: `organizationName` is `null`.
- `ArgumentException`: `organizationName` is empty.

#### Remarks

This encodes an attribute with the OID 2.5.4.10 as a UTF8String.

## X500DistinguishedNameBuilder.AddStateOrProvinceName(String) method

```csharp
public void AddStateOrProvinceName (string stateOrProvinceName);
```

Adds a state or province name attribute.

Parameters:

- `stateOrProvinceName`: The state or province name to add.

Exceptions:

- `ArgumentNullException`: `stateOrProvinceName` is `null`.
- `ArgumentException`: `stateOrProvinceName` is empty.

#### Remarks

This encodes an attribute with the OID 2.5.4.8 as a UTF8String.

## X500DistinguishedNameBuilder.Build() method

```csharp
public System.Security.Cryptography.X509Certificates.X500DistinguishedName Build ();
```

Builds an `X500DistinguishedName` that represents the encoded attributes.

Returns: An `X500DistinguishedName` that represents the encoded attributes.

To be added.
