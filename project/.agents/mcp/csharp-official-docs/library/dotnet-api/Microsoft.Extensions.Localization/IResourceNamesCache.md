---
title: "IResourceNamesCache interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/IResourceNamesCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IResourceNamesCache interface

Namespace: `Microsoft.Extensions.Localization`

```csharp
public interface IResourceNamesCache
```

Represents a cache of string names in resources.

To be added.

## IResourceNamesCache.GetOrAdd(String, String>>) method

```csharp
public System.Collections.Generic.IList<string>? GetOrAdd (string name, Func<string,System.Collections.Generic.IList<string>?> valueFactory);
```

Adds a set of resource names to the cache by using the specified function, if the name does not already exist.

Parameters:

- `name`: The resource name to add string names for.
- `valueFactory`: The function used to generate the string names for the resource.

Returns: The string names for the resource.

To be added.
