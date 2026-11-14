---
title: "X509VerificationFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509VerificationFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509VerificationFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509VerificationFlags
```

Specifies conditions under which verification of certificates in the X509 chain should be conducted.

#### Remarks
These flags indicate the conditions under which chain verification should occur. For example, if an application does not require certificates time values in a chain to be valid, the IgnoreNotTimeValid flag can be used.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509VerificationFlags.AllFlags field

```csharp
AllFlags
```

All flags pertaining to verification are included.

## X509VerificationFlags.AllowUnknownCertificateAuthority field

```csharp
AllowUnknownCertificateAuthority
```

Ignore that the chain cannot be verified due to an unknown certificate authority (CA) or partial chains.

## X509VerificationFlags.IgnoreCertificateAuthorityRevocationUnknown field

```csharp
IgnoreCertificateAuthorityRevocationUnknown
```

Ignore that the certificate authority revocation is unknown when determining certificate verification.

## X509VerificationFlags.IgnoreCtlNotTimeValid field

```csharp
IgnoreCtlNotTimeValid
```

Ignore that the certificate trust list (CTL) is not valid, for reasons such as the CTL has expired, when determining certificate verification.

## X509VerificationFlags.IgnoreCtlSignerRevocationUnknown field

```csharp
IgnoreCtlSignerRevocationUnknown
```

Ignore that the certificate trust list (CTL) signer revocation is unknown when determining certificate verification.

## X509VerificationFlags.IgnoreEndRevocationUnknown field

```csharp
IgnoreEndRevocationUnknown
```

Ignore that the end certificate (the user certificate) revocation is unknown when determining certificate verification.

## X509VerificationFlags.IgnoreInvalidBasicConstraints field

```csharp
IgnoreInvalidBasicConstraints
```

Ignore that the basic <example-value> are not valid when determining certificate verification.

## X509VerificationFlags.IgnoreInvalidName field

```csharp
IgnoreInvalidName
```

Ignore that the certificate has an invalid name when determining certificate verification.

## X509VerificationFlags.IgnoreInvalidPolicy field

```csharp
IgnoreInvalidPolicy
```

Ignore that the certificate has invalid policy when determining certificate verification.

## X509VerificationFlags.IgnoreNotTimeNested field

```csharp
IgnoreNotTimeNested
```

Ignore that the CA (certificate authority) certificate and the issued certificate have validity periods that are not nested when verifying the certificate. For example, the CA cert can be valid from January 1 to December 1 and the issued certificate from January 2 to December 2, which would mean the validity periods are not nested.

## X509VerificationFlags.IgnoreNotTimeValid field

```csharp
IgnoreNotTimeValid
```

Ignore certificates in the chain that are not valid either because they have expired or they are not yet in effect when determining certificate validity.

## X509VerificationFlags.IgnoreRootRevocationUnknown field

```csharp
IgnoreRootRevocationUnknown
```

Ignore that the root revocation is unknown when determining certificate verification.

## X509VerificationFlags.IgnoreWrongUsage field

```csharp
IgnoreWrongUsage
```

Ignore that the certificate was not issued for the current use when determining certificate verification.

## X509VerificationFlags.NoFlag field

```csharp
NoFlag
```

No flags pertaining to verification are included.
