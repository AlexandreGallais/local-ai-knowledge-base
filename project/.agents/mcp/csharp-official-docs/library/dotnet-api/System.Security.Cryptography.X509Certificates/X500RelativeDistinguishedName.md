---
title: "X500RelativeDistinguishedName class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X500RelativeDistinguishedName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X500RelativeDistinguishedName class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X500RelativeDistinguishedName
```

Represents a Relative Distinguished Name component of an X.500 Distinguished Name.

To be added.

## X500RelativeDistinguishedName.HasMultipleElements property

```csharp
public bool HasMultipleElements { get; }
```

Gets a value that indicates whether this Relative Distinguished Name is composed of multiple attributes or only a single attribute.

Returns: `true` if the Relative Distinguished Name is composed of multiple attributes; `false` if it is composed of only a single attribute.

To be added.

## X500RelativeDistinguishedName.RawData property

```csharp
public ReadOnlyMemory<byte> RawData { get; }
```

Gets the encoded representation of this Relative Distinguished Name.

Returns: The encoded representation of this Relative Distinguished Name.

To be added.

## X500RelativeDistinguishedName.GetSingleElementType() method

```csharp
public System.Security.Cryptography.Oid GetSingleElementType ();
```

Gets the object identifier (OID) identifying the single attribute value for this Relative Distinguished Name (RDN), when the RDN only contains one attribute.

Returns: The object identifier (OID) identifying the single attribute value for this Relative Distinguished Name (RDN).

Exceptions:

- `InvalidOperationException`: The Relative Distinguished Name has multiple attributes (`X500RelativeDistinguishedName.HasMultipleElements`
is `true`).

To be added.

## X500RelativeDistinguishedName.GetSingleElementValue() method

```csharp
public string? GetSingleElementValue ();
```

Gets the textual representation of the value for the Relative Distinguished Name (RDN), when the RDN only contains one attribute.

Returns: The decoded text representing the attribute value.
If the attribute value is an `OCTET STRING`, or other non-text data type, this method returns `null`.

Exceptions:

- `CryptographicException`: The attribute is identified as a textual value, but the value did not successfully decode.
- `InvalidOperationException`: The Relative Distinguished Name has multiple attributes (`X500RelativeDistinguishedName.HasMultipleElements`
is `true`).

To be added.
