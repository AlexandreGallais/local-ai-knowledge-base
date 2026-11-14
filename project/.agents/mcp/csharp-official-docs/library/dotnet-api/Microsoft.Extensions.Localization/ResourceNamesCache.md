---
title: "ResourceNamesCache class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/ResourceNamesCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceNamesCache class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public class ResourceNamesCache : Microsoft.Extensions.Localization.IResourceNamesCache
```

An implementation of `IResourceNamesCache` backed by a `ConcurrentDictionary<T1,T2>`.

To be added.

## ResourceNamesCache.ResourceNamesCache() constructor

```csharp
public ResourceNamesCache ();
```

Creates a new `ResourceNamesCache`

To be added.

## ResourceNamesCache.GetOrAdd(String, String>>) method

```csharp
public System.Collections.Generic.IList<string>? GetOrAdd (string name, Func<string,System.Collections.Generic.IList<string>?> valueFactory);
```

Adds a set of resource names to the cache by using the specified function, if the name does not already exist.

Parameters:

- `name`: The resource name to add string names for.
- `valueFactory`: The function used to generate the string names for the resource.

Returns: A list containing the string names for the resource.

To be added.
