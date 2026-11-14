---
title: "LoadHint enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/LoadHint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoadHint enum

Namespace: `System.Runtime.CompilerServices`

```csharp
public enum LoadHint
```

Specifies the preferred default binding for a dependent assembly.

#### Remarks
Use this enumeration with the `DependencyAttribute` attribute and the `DefaultDependencyAttribute` attribute to specify the preferred default binding for a dependent assembly.

Note that the `Default` value directs the native generation service to consult the dependent assembly for its preferred default binding, which is specified using the `DefaultDependencyAttribute` attribute. Very few assemblies should need to specify a default value in this manner.

## LoadHint.Always field

```csharp
Always
```

The dependency is always loaded.

## LoadHint.Default field

```csharp
Default
```

No preference specified.

## LoadHint.Sometimes field

```csharp
Sometimes
```

The dependency is sometimes loaded.
