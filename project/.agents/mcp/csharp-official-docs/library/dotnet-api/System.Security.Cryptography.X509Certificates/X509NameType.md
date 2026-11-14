---
title: "X509NameType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509NameType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509NameType enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509NameType
```

Specifies the type of name the X509 certificate contains.

#### Remarks
The name type can be a simple name, an email address, a User Principal Name (UPN), a Domain Name System (DNS) name or a URL. An X509 certificate can have one or more of these names. You can obtain the name of a certificate using the method `X509Certificate2.GetNameInfo`.

#### Examples
The following example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509NameType.DnsFromAlternativeName field

```csharp
DnsFromAlternativeName
```

The DNS name associated with the alternative name of either the subject or the issuer of an X.509 certificate.  This value is equivalent to the `X509NameType.DnsName` value.

## X509NameType.DnsName field

```csharp
DnsName
```

The DNS name associated with the alternative name of either the subject or issuer of an X509 certificate.

## X509NameType.EmailName field

```csharp
EmailName
```

The email address of the subject or issuer associated of an X509 certificate.

## X509NameType.SimpleName field

```csharp
SimpleName
```

The simple name of a subject or issuer of an X509 certificate.

## X509NameType.UpnName field

```csharp
UpnName
```

The UPN name of the subject or issuer of an X509 certificate.

## X509NameType.UrlName field

```csharp
UrlName
```

The URL address associated with the alternative name of either the subject or issuer of an X509 certificate.
