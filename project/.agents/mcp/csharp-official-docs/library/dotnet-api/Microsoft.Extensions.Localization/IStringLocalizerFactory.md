---
title: "IStringLocalizerFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/IStringLocalizerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStringLocalizerFactory interface

Namespace: `Microsoft.Extensions.Localization`

```csharp
public interface IStringLocalizerFactory
```

Represents a factory that creates `IStringLocalizer` instances.

To be added.

## IStringLocalizerFactory.Create(Type) method

```csharp
public Microsoft.Extensions.Localization.IStringLocalizer Create (Type resourceSource);
```

Creates an `IStringLocalizer` using the `Assembly` and
`Type.FullName` of the specified `Type`.

Parameters:

- `resourceSource`: The `Type`.

Returns: The `IStringLocalizer`.

To be added.

## IStringLocalizerFactory.Create(String, String) method

```csharp
public Microsoft.Extensions.Localization.IStringLocalizer Create (string baseName, string location);
```

Creates an `IStringLocalizer`.

Parameters:

- `baseName`: The base name of the resource to load strings from.
- `location`: The location to load resources from.

Returns: The `IStringLocalizer`.

To be added.
