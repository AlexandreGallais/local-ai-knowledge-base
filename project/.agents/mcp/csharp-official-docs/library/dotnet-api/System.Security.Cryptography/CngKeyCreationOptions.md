---
title: "CngKeyCreationOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyCreationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyCreationOptions enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngKeyCreationOptions
```

Specifies options used for key creation.

#### Remarks
This type is used by the `KeyCreationOptions` property.

## CngKeyCreationOptions.MachineKey field

```csharp
MachineKey
```

A machine-wide key is created.

## CngKeyCreationOptions.None field

```csharp
None
```

No key <example-value> options are used.

## CngKeyCreationOptions.OverwriteExistingKey field

```csharp
OverwriteExistingKey
```

The existing key is overwritten during key creation.

## CngKeyCreationOptions.PreferVbs field

```csharp
PreferVbs
```

Indicates a key <example-value> be protected with Virtualization-based security (VBS).

## CngKeyCreationOptions.RequireVbs field

```csharp
RequireVbs
```

Indicates a key must be protected with Virtualization-based security (VBS).

## CngKeyCreationOptions.UsePerBootKey field

```csharp
UsePerBootKey
```

Instructs Virtualization-based security (VBS) to protect the client key with a per-boot key when combined with `CngKeyCreationOptions.RequireVbs` or `CngKeyCreationOptions.PreferVbs`.
