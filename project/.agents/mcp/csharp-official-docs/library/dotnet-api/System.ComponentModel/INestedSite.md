---
title: "INestedSite interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/INestedSite.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INestedSite interface

Namespace: `System.ComponentModel`

```csharp
public interface INestedSite : IServiceProvider, System.ComponentModel.ISite
```

Provides the ability to retrieve the full nested name of a component.

To be added.

## INestedSite.FullName property

```csharp
public string? FullName { get; }
```

Gets the full name of the component in this site.

Returns: The full name of the component in this site.

#### Remarks
The `FullName` property returns the full name of the component in this site in the format of [*owner*].[*component*]*.* If this component's site has a null name, the property also returns `null`.
