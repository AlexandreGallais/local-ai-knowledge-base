---
title: "X509ChainStatusFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainStatusFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainStatusFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509ChainStatusFlags
```

Defines the status of an X509 chain.

#### Remarks
This enumeration is used in conjunction with the `X509ChainStatus` structure and the `ChainStatus` property.

## X509ChainStatusFlags.CtlNotSignatureValid field

```csharp
CtlNotSignatureValid
```

Specifies that the certificate trust list (CTL) contains an invalid signature.

## X509ChainStatusFlags.CtlNotTimeValid field

```csharp
CtlNotTimeValid
```

Specifies that the certificate trust list (CTL) is not valid because of an invalid time value, such as one that indicates that the CTL has expired.

## X509ChainStatusFlags.CtlNotValidForUsage field

```csharp
CtlNotValidForUsage
```

Specifies that the certificate trust list (CTL) is not valid for this use.

## X509ChainStatusFlags.Cyclic field

```csharp
Cyclic
```

Specifies that the X509 chain could not be built.

## X509ChainStatusFlags.ExplicitDistrust field

```csharp
ExplicitDistrust
```

Specifies that the certificate is explicitly distrusted.

## X509ChainStatusFlags.HasExcludedNameConstraint field

```csharp
HasExcludedNameConstraint
```

Specifies that the X509 chain is invalid because a certificate has excluded a name constraint.

## X509ChainStatusFlags.HasNotDefinedNameConstraint field

```csharp
HasNotDefinedNameConstraint
```

Specifies that the certificate has an undefined name constraint.

## X509ChainStatusFlags.HasNotPermittedNameConstraint field

```csharp
HasNotPermittedNameConstraint
```

Specifies that the certificate has an impermissible name constraint.

## X509ChainStatusFlags.HasNotSupportedCriticalExtension field

```csharp
HasNotSupportedCriticalExtension
```

Specifies that the certificate does not support a critical extension.

## X509ChainStatusFlags.HasNotSupportedNameConstraint field

```csharp
HasNotSupportedNameConstraint
```

Specifies that the certificate does not have a supported name constraint or has a name constraint that is unsupported.

## X509ChainStatusFlags.HasWeakSignature field

```csharp
HasWeakSignature
```

Specifies that the certificate has not been strong signed. Typically, this indicates that the MD2 or MD5 hashing algorithms were used to create a hash of the certificate.

## X509ChainStatusFlags.InvalidBasicConstraints field

```csharp
InvalidBasicConstraints
```

Specifies that the X509 chain is invalid due to invalid basic constraints.

## X509ChainStatusFlags.InvalidExtension field

```csharp
InvalidExtension
```

Specifies that the X509 chain is invalid due to an invalid extension.

## X509ChainStatusFlags.InvalidNameConstraints field

```csharp
InvalidNameConstraints
```

Specifies that the X509 chain is invalid due to invalid name constraints.

## X509ChainStatusFlags.InvalidPolicyConstraints field

```csharp
InvalidPolicyConstraints
```

Specifies that the X509 chain is invalid due to invalid policy constraints.

## X509ChainStatusFlags.NoError field

```csharp
NoError
```

Specifies that the X509 chain has no errors.

## X509ChainStatusFlags.NoIssuanceChainPolicy field

```csharp
NoIssuanceChainPolicy
```

Specifies that there is no certificate policy extension in the certificate. This error would occur if a group policy has specified that all certificates must have a certificate policy.

## X509ChainStatusFlags.NotSignatureValid field

```csharp
NotSignatureValid
```

Specifies that the X509 chain is invalid due to an invalid certificate signature.

## X509ChainStatusFlags.NotTimeNested field

```csharp
NotTimeNested
```

Deprecated. Specifies that the CA (certificate authority) certificate and the issued certificate have validity periods that are not nested. For example, the CA cert can be valid from January 1 to December 1 and the issued certificate from January 2 to December 2, which would mean the validity periods are not nested.

## X509ChainStatusFlags.NotTimeValid field

```csharp
NotTimeValid
```

Specifies that the X509 chain is not valid due to an invalid time value, such as a value that indicates an expired certificate.

## X509ChainStatusFlags.NotValidForUsage field

```csharp
NotValidForUsage
```

Specifies that the key usage is not valid.

## X509ChainStatusFlags.OfflineRevocation field

```csharp
OfflineRevocation
```

Specifies that the online certificate revocation list (CRL) the X509 chain relies on is currently offline.

## X509ChainStatusFlags.PartialChain field

```csharp
PartialChain
```

Specifies that the X509 chain could not be built up to the root certificate.

## X509ChainStatusFlags.RevocationStatusUnknown field

```csharp
RevocationStatusUnknown
```

Specifies that it is not possible to determine whether the certificate has been revoked. This can be due to the certificate revocation list (CRL) being offline or unavailable.

## X509ChainStatusFlags.Revoked field

```csharp
Revoked
```

Specifies that the X509 chain is invalid due to a revoked certificate.

## X509ChainStatusFlags.UntrustedRoot field

```csharp
UntrustedRoot
```

Specifies that the X509 chain is invalid due to an untrusted root certificate.
