---
title: "X509KeyStorageFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509KeyStorageFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509KeyStorageFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509KeyStorageFlags
```

Defines where and how to import the private key of an X.509 certificate.

To be added.

## X509KeyStorageFlags.DefaultKeySet field

```csharp
DefaultKeySet
```

The default key set is used.  The user key set is usually the default.

## X509KeyStorageFlags.EphemeralKeySet field

```csharp
EphemeralKeySet
```

The key <example-value> with a PFX file is created in memory and not persisted on disk when importing a certificate.

## X509KeyStorageFlags.Exportable field

```csharp
Exportable
```

Imported keys are marked as exportable.

## X509KeyStorageFlags.MachineKeySet field

```csharp
MachineKeySet
```

Private keys are stored in the local computer store rather than the current user store.

## X509KeyStorageFlags.PersistKeySet field

```csharp
PersistKeySet
```

The key <example-value> with a PFX file is persisted when importing a certificate.

## X509KeyStorageFlags.UserKeySet field

```csharp
UserKeySet
```

Private keys are stored in the current user store rather than the local computer store. This occurs even if the certificate specifies that the keys should go in the local computer store.

## X509KeyStorageFlags.UserProtected field

```csharp
UserProtected
```

Notify the user through a dialog box or other method that the key is accessed.  The Cryptographic Service Provider (CSP) in use defines the precise behavior.
