---
title: "OpenFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/OpenFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OpenFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum OpenFlags
```

Specifies the way to open the X.509 certificate store.

#### Remarks
The `ReadOnly`, `ReadWrite`, and `MaxAllowed` flags are mutually exclusive. The `OpenExistingOnly` flag is the only flag that does not require the `CreateStore` permission to be granted.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## OpenFlags.IncludeArchived field

```csharp
IncludeArchived
```

Open the X.509 certificate store and include archived certificates.

## OpenFlags.MaxAllowed field

```csharp
MaxAllowed
```

Open the X.509 certificate store for the highest access allowed.

## OpenFlags.OpenExistingOnly field

```csharp
OpenExistingOnly
```

Opens only existing stores; if no store exists, the `X509Store.Open` method will not create a new store.

## OpenFlags.ReadOnly field

```csharp
ReadOnly
```

Open the X.509 certificate store for reading only.

## OpenFlags.ReadWrite field

```csharp
ReadWrite
```

Open the X.509 certificate store for both reading and writing.
