---
title: "ConfigurationPath class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationPath.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationPath class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ConfigurationPath
```

Provides utility methods and constants for manipulating Configuration paths.

To be added.

## ConfigurationPath.Combine(String>) method

```csharp
public static string Combine (System.Collections.Generic.IEnumerable<string> pathSegments);
```

Combines path segments into one path.

Parameters:

- `pathSegments`: The path segments to combine.

Returns: The combined path.

To be added.

## ConfigurationPath.Combine(String[]) method

```csharp
public static string Combine (params string[] pathSegments);
```

Combines path segments into one path.

Parameters:

- `pathSegments`: The path segments to combine.

Returns: The combined path.

To be added.

## ConfigurationPath.GetParentPath(String) method

```csharp
public static string? GetParentPath (string? path);
```

Extracts the path corresponding to the parent node for a given path.

Parameters:

- `path`: The path.

Returns: The original path minus the last individual segment found in it. Null if the original path corresponds to a top level node.

To be added.

## ConfigurationPath.GetSectionKey(String) method

```csharp
public static string? GetSectionKey (string? path);
```

Extracts the last path segment from the path.

Parameters:

- `path`: The path.

Returns: The last path segment of the path.

To be added.

## ConfigurationPath.KeyDelimiter field

```csharp
public static readonly string KeyDelimiter;
```

The delimiter ":" used to separate individual keys in a path.

To be added.
