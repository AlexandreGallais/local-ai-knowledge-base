---
title: "CngPropertyOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngPropertyOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngPropertyOptions enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngPropertyOptions
```

Specifies Cryptography Next Generation (CNG) key <example-value> options.

#### Remarks
These options are used to initialize `CngProperty` objects, which are then used in `CngKey.SetProperty` calls. You also use these options when you query for the value of properties with the `CngKey.GetProperty` method.

Properties must be queried with the `CngPropertyOptions` they are stored with. Otherwise, they will not be found.

## CngPropertyOptions.CustomProperty field

```csharp
CustomProperty
```

The property is not specified by CNG. Use this option to avoid future name conflicts with CNG properties.

## CngPropertyOptions.None field

```csharp
None
```

The referenced property has no options.

## CngPropertyOptions.Persist field

```csharp
Persist
```

The property should be persisted.
