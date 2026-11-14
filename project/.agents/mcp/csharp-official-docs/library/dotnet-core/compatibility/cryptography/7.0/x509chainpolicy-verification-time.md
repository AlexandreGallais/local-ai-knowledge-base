---
title: "Breaking change: Dynamic X509ChainPolicy verification time"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/7.0/x509chainpolicy-verification-time.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Dynamic X509ChainPolicy verification time

In previous versions of .NET, the `System.Security.Cryptography.X509Certificates.X509ChainPolicy.VerificationTime` value was assigned to `System.DateTime.Now` when the `System.Security.Cryptography.X509Certificates.X509ChainPolicy` object was constructed. Using the same `X509ChainPolicy` object for multiple calls to `System.Security.Cryptography.X509Certificates.X509Chain.Build(System.Security.Cryptography.X509Certificates.X509Certificate2)` resulted in all chain builds using that same value as the verification time, no matter how much time had passed since the object was created.

The new default behavior is to use the value of `DateTime.Now` when `X509Chain.Build()` is invoked as the verification time. This change doesn't affect chain builds that explicitly assign `X509ChainPolicy.VerificationTime`.

## Previous behavior

The `System.Security.Cryptography.X509Certificates.X509ChainPolicy.VerificationTime` value was assigned to `System.DateTime.Now` when the `X509ChainPolicy` object was constructed. This value was used in all subsequent `System.Security.Cryptography.X509Certificates.X509Chain.Build(System.Security.Cryptography.X509Certificates.X509Certificate2)` calls (unless or until the value was reassigned at a later time).

## New behavior

The `System.Security.Cryptography.X509Certificates.X509ChainPolicy.VerificationTime` value is assigned to `System.DateTime.Now` when the `X509ChainPolicy` object is constructed, but the new `X509ChainPolicy.VerificationTimeIgnored` property defaults to `true`. When this property has a value of `true`, the `System.Security.Cryptography.X509Certificates.X509Chain.Build(System.Security.Cryptography.X509Certificates.X509Certificate2)` method uses `DateTime.Now` as the verification time instead of `X509ChainPolicy.VerificationTime` when building the chain.

Assigning a value to the `X509ChainPolicy.VerificationTime` property automatically sets `VerificationTimeIgnored` to `false`.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Callers who cache configured `X509ChainPolicy` objects were often surprised that their validation was slowly moving further back in time. This change makes long-lived `X509ChainPolicy` objects easier to work with and doesn't significantly impact short-lived objects.

## Recommended action

The following callers aren't impacted by the change:

- Callers that don't have long-lived `X509ChainPolicy` objects.
- Callers that explicitly assign the `X509ChainPolicy.VerificationTime` property.

Callers that have a long-lived `X509ChainPolicy` object that wish to use the previous behavior can either assign the new `X509ChainPolicy.VerificationTimeIgnored` property to `false` or assign the `X509ChainPolicy.VerificationTime` property to `DateTime.Now`.

```csharp
var policy = new X509ChainPolicy
{
   // ...
   VerificationTime = DateTime.Now,
};
```

or

```csharp
var policy = new X509ChainPolicy
{
    // ...
    VerificationTimeIgnored = false,
};
```

## Affected APIs

- `System.Security.Cryptography.X509Certificates.X509ChainPolicy`
- `System.Security.Cryptography.X509Certificates.X509ChainPolicy.VerificationTime`
- `System.Security.Cryptography.X509Certificates.X509ChainPolicy.VerificationTimeIgnored`
