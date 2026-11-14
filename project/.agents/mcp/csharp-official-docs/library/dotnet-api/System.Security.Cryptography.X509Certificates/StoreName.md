---
title: "StoreName enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/StoreName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StoreName enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum StoreName
```

Specifies the name of the X.509 certificate store to open.

#### Remarks
This enumeration specifies the X.509 store name, which also includes the type of certificates included. For example, My includes personal certificates, whereas Disallowed includes only revoked certificates.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/StoreName/Overview/program.cs._

## StoreName.AddressBook field

```csharp
AddressBook
```

The X.509 certificate store for other users.

## StoreName.AuthRoot field

```csharp
AuthRoot
```

The X.509 certificate store for third-party certificate authorities (CAs).

## StoreName.CertificateAuthority field

```csharp
CertificateAuthority
```

The X.509 certificate store for intermediate certificate authorities (CAs).

## StoreName.Disallowed field

```csharp
Disallowed
```

The X.509 certificate store for revoked certificates.

## StoreName.My field

```csharp
My
```

The X.509 certificate store for personal certificates.

## StoreName.Root field

```csharp
Root
```

The X.509 certificate store for trusted root certificate authorities (CAs).

## StoreName.TrustedPeople field

```csharp
TrustedPeople
```

The X.509 certificate store for directly trusted people and resources.

## StoreName.TrustedPublisher field

```csharp
TrustedPublisher
```

The X.509 certificate store for directly trusted publishers.
