---
title: "CngKeyHandleOpenOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyHandleOpenOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyHandleOpenOptions enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngKeyHandleOpenOptions
```

Specifies options for opening key handles.

#### Remarks
This enumeration is used by the `CngKey.Open` method.

## CngKeyHandleOpenOptions.EphemeralKey field

```csharp
EphemeralKey
```

The key <example-value> being opened specifies an ephemeral key.

## CngKeyHandleOpenOptions.None field

```csharp
None
```

The key <example-value> being opened does not specify an ephemeral key.
