---
title: "Breaking change: Cryptography.Oid is functionally init-only"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/5.0/cryptography-oid-init-only.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Security.Cryptography.Oid is functionally init-only

The `System.Security.Cryptography.Oid` class, which is used to represent ASN.1 Object Identifier values and their "friendly" names, was previously fully mutable. This mutability was often overlooked or came as a surprise. The property setters now throw a `System.PlatformNotSupportedException` when you attempt to change the value after it's already been assigned.

## Change description

In previous versions, the property setters on `System.Security.Cryptography.Oid` can be used to change the value of the `System.Security.Cryptography.Oid.FriendlyName` and `System.Security.Cryptography.Oid.Value` properties.

In .NET 5 and later versions, the property setters can only be used to initialize the value. Once the property has a value, either from a constructor or a previous call to the property setter, the property setter always throws a `System.PlatformNotSupportedException`.

## Reason for change

This change enables the reuse of `System.Security.Cryptography.Oid` objects as part of return values in public APIs to reduce object allocation profiles. It avoids the need to create temporary "defensive" copies when `System.Security.Cryptography.Oid` values are used as inputs.

## Version introduced

5.0

## Recommended action

Avoid using the `System.Security.Cryptography.Oid` property setters other than for object initialization. To represent a new value, use a new instance instead of changing the value on an existing object.

## Affected APIs

- `System.Security.Cryptography.Oid.FriendlyName`
- `System.Security.Cryptography.Oid.Value`
