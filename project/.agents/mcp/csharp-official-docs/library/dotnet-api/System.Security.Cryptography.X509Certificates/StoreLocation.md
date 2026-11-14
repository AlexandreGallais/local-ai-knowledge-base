---
title: "StoreLocation enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/StoreLocation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StoreLocation enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum StoreLocation
```

Specifies the location of the X.509 certificate store.

#### Remarks

This enumeration is used with the `X509Store` constructor.

#### Examples

The following example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## StoreLocation.CurrentUser field

```csharp
CurrentUser
```

The X.509 certificate store used by the current user.

## StoreLocation.LocalMachine field

```csharp
LocalMachine
```

The X.509 certificate store assigned to the local machine.
