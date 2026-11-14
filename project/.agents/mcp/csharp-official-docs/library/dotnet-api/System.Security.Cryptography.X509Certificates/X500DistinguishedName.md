---
title: "X500DistinguishedName class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X500DistinguishedName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X500DistinguishedName class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X500DistinguishedName : System.Security.Cryptography.AsnEncodedData
```

Represents the distinguished name of an X509 certificate. This class cannot be inherited.

#### Remarks
This class is like an extension to the `X509Certificate2.SubjectName` or `IssuerName` property, which is the name of the person or entity that the certificate is being issued to. X.500 is an international standard for distributed directory services. The distinguished name uses the following format:

[X500:/C=CountryCode/O=Organization/OU=OrganizationUnit/CN=CommonName]

The following field length limits apply:

|Field|Length Limit|
|-----------|------------------|
|CountryCode|2 characters|
|Organization|Up to 64 characters|
|OrganizationUnit|Up to 32 characters|
|CommonName|Up to 64 characters|

The following guidelines apply:

- Field values can be uppercase or lowercase.

- Delimiters are slash marks (/) and must appear before the first value and between subsequent values.

- Delimiters can be followed by a space.

The following is an example of a correctly formatted name: [X500:/ C=US/ O=Microsoft/ OU=WGA/ CN=TedSt]

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.X500DistinguishedName(Byte[]) constructor

```csharp
public X500DistinguishedName (byte[] encodedDistinguishedName);
```

Initializes a new instance of the `X500DistinguishedName` class using information from the specified byte array.

Parameters:

- `encodedDistinguishedName`: A byte array that contains distinguished name information.

#### Remarks
The `X500DistinguishedName` class inherits from the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.X500DistinguishedName(Byte>) constructor

```csharp
public X500DistinguishedName (ReadOnlySpan<byte> encodedDistinguishedName);
```

Initializes a new instance of the `X500DistinguishedName` class using information from the provided data.

Parameters:

- `encodedDistinguishedName`: The encoded distinguished name.

To be added.

## X500DistinguishedName.X500DistinguishedName(AsnEncodedData) constructor

```csharp
public X500DistinguishedName (System.Security.Cryptography.AsnEncodedData encodedDistinguishedName);
```

Initializes a new instance of the `X500DistinguishedName` class using the specified `AsnEncodedData` object.

Parameters:

- `encodedDistinguishedName`: An `AsnEncodedData` object that represents the distinguished name.

#### Remarks
The `X500DistinguishedName` class inherits from the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.X500DistinguishedName(X500DistinguishedName) constructor

```csharp
public X500DistinguishedName (System.Security.Cryptography.X509Certificates.X500DistinguishedName distinguishedName);
```

Initializes a new instance of the `X500DistinguishedName` class using the specified `X500DistinguishedName` object.

Parameters:

- `distinguishedName`: An `X500DistinguishedName` object.

#### Remarks
This constructor creates a copy of the specified `X500DistinguishedName` object. The `X500DistinguishedName` class inherits from the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.X500DistinguishedName(String) constructor

```csharp
public X500DistinguishedName (string distinguishedName);
```

Initializes a new instance of the `X500DistinguishedName` class using information from the specified string.

Parameters:

- `distinguishedName`: A string that represents the distinguished name.

#### Remarks
The `X500DistinguishedName` class inherits from the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.X500DistinguishedName(String, X500DistinguishedNameFlags) constructor

```csharp
public X500DistinguishedName (string distinguishedName, System.Security.Cryptography.X509Certificates.X500DistinguishedNameFlags flag);
```

Initializes a new instance of the `X500DistinguishedName` class using the specified string and `X500DistinguishedNameFlags` flag.

Parameters:

- `distinguishedName`: A string that represents the distinguished name.
- `flag`: A bitwise combination of the enumeration values that specify the characteristics of the distinguished name.

#### Remarks
The `X500DistinguishedName` class inherits from the `AsnEncodedData` class.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.Name property

```csharp
public string Name { get; }
```

Gets the comma-delimited distinguished name from an X500 certificate.

Returns: The comma-delimited distinguished name of the X509 certificate.

#### Remarks
The distinguished name uses the following format:

[X500:/C=CountryCode/O=Organization/OU=OrganizationUnit/CN=CommonName]

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.Decode(X500DistinguishedNameFlags) method

```csharp
public string Decode (System.Security.Cryptography.X509Certificates.X500DistinguishedNameFlags flag);
```

Decodes a distinguished name using the characteristics specified by the `flag` parameter.

Parameters:

- `flag`: A bitwise combination of the enumeration values that specify the characteristics of the distinguished name.

Returns: The decoded distinguished name.

Exceptions:

- `CryptographicException`: The certificate has an invalid name.

#### Remarks
This method decodes the ASN encoded distinguished name into a string value.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedName.EnumerateRelativeDistinguishedNames(Boolean) method

```csharp
public System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X500RelativeDistinguishedName> EnumerateRelativeDistinguishedNames (bool reversed = true);
```

Iterates over the RelativeDistinguishedName values within this distinguished name value.

Parameters:

- `reversed`: `true` to enumerate in the order used by `X500DistinguishedName.Name`; `false` to enumerate in the declared order.

Returns: An enumerator that iterates over the relative distinguished names in the X.500 Distinguished Name.

Exceptions:

- `CryptographicException`: The X.500 Name is not a proper DER-encoded X.500 Name value.

To be added.

## X500DistinguishedName.Format(Boolean) method

```csharp
public override string Format (bool multiLine);
```

Returns a formatted version of an X500 distinguished name for printing or for output to a text window or to a console.

Parameters:

- `multiLine`: `true` if the return string should contain carriage returns; otherwise, `false`.

Returns: A formatted string that represents the X500 distinguished name.

#### Remarks
Use this method to print Abstract Syntax Notation number One (ASN.1)-encoded data or output the information to a text box. Use the `multiLine` parameter to control the layout of the output.

#### Examples
The following code example shows how to use the `X500DistinguishedName` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._
