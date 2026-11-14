---
title: "Environment+SpecialFolderOption enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment+SpecialFolderOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment+SpecialFolderOption enum

Namespace: `System`

```csharp
public enum Environment.SpecialFolderOption
```

Specifies options to use for getting the path to a special folder.

#### Remarks
The `SpecialFolderOption` enumeration is used to define the precise behavior of the `Environment.GetFolderPath` method.

## Environment+SpecialFolderOption.Create field

```csharp
Create
```

The path to the folder is created if it does not already exist.

## Environment+SpecialFolderOption.DoNotVerify field

```csharp
DoNotVerify
```

The path to the folder is returned without verifying whether the path exists. If the folder is located on a network, specifying this option can reduce lag time.

## Environment+SpecialFolderOption.None field

```csharp
None
```

The path to the folder is verified. If the folder exists, the path is returned. If the folder does not exist, an empty string is returned. This is the default behavior.
