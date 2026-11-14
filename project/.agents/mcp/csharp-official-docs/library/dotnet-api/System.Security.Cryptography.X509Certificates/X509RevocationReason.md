---
title: "X509RevocationReason enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509RevocationReason.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509RevocationReason enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509RevocationReason
```

Specifies the reason a certificate was revoked.

This enum represents the `CRLReason` enum from IETF RFC 5280 and ITU T-REC X.509.

## X509RevocationReason.AACompromise field

```csharp
AACompromise
```

It is known, or suspected, that aspects of the Attribute Authority (AA) validated in the attribute certificate have been compromised.

## X509RevocationReason.AffiliationChanged field

```csharp
AffiliationChanged
```

The subject's name, or other validated information in the certificate, has changed without anything being compromised.

## X509RevocationReason.CACompromise field

```csharp
CACompromise
```

The private key, or another validated portion of a Certificate Authority (CA) certificate, is suspected to have been compromised.

## X509RevocationReason.CertificateHold field

```csharp
CertificateHold
```

The certificate is temporarily suspended, and may either return to service or become permanently revoked in the future.

## X509RevocationReason.CessationOfOperation field

```csharp
CessationOfOperation
```

The certificate is no longer needed, but nothing is suspected to be compromised.

## X509RevocationReason.KeyCompromise field

```csharp
KeyCompromise
```

The private key, or another validated portion of an end-entity certificate, is suspected to have been compromised.

## X509RevocationReason.PrivilegeWithdrawn field

```csharp
PrivilegeWithdrawn
```

A privilege contained within the certificate has been withdrawn.

## X509RevocationReason.RemoveFromCrl field

```csharp
RemoveFromCrl
```

The certificate was revoked with `X509RevocationReason.CertificateHold` on a base Certificate Revocation List (CRL) and is being returned to service on a delta CRL.

## X509RevocationReason.Superseded field

```csharp
Superseded
```

The certificate has been superseded, but without anything being compromised.

## X509RevocationReason.Unspecified field

```csharp
Unspecified
```

Revocation occurred for a reason that has no more specific value.

## X509RevocationReason.WeakAlgorithmOrKey field

```csharp
WeakAlgorithmOrKey
```

The certificate key uses a weak cryptographic algorithm, or the key is too short, or the key was generated in an unsafe manner.
