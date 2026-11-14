---
title: "ResourceManagerStringLocalizer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/ResourceManagerStringLocalizer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceManagerStringLocalizer class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public class ResourceManagerStringLocalizer : Microsoft.Extensions.Localization.IStringLocalizer
```

An `IStringLocalizer` that uses the `ResourceManager` and
`ResourceReader` to provide localized strings.

This type is thread-safe.

## ResourceManagerStringLocalizer.ResourceManagerStringLocalizer(ResourceManager, Assembly, String, IResourceNamesCache, ILogger) constructor

```csharp
public ResourceManagerStringLocalizer (System.Resources.ResourceManager resourceManager, System.Reflection.Assembly resourceAssembly, string baseName, Microsoft.Extensions.Localization.IResourceNamesCache resourceNamesCache, Microsoft.Extensions.Logging.ILogger logger);
```

Creates a new `ResourceManagerStringLocalizer`.

Parameters:

- `resourceManager`: The `ResourceManager` to read strings from.
- `resourceAssembly`: The `Assembly` that contains the strings as embedded resources.
- `baseName`: The base name of the embedded resource that contains the strings.
- `resourceNamesCache`: Cache of the list of strings for a given resource assembly name.
- `logger`: The `ILogger`.

To be added.

## ResourceManagerStringLocalizer.Item property

```csharp
public virtual Microsoft.Extensions.Localization.LocalizedString this[string name] { get; }
```

Gets the string resource with the given name.

Parameters:

- `name`: The name of the string resource.

Returns: The string resource as a `LocalizedString`.

To be added.

## ResourceManagerStringLocalizer.Item property

```csharp
public virtual Microsoft.Extensions.Localization.LocalizedString this[string name, params object[] arguments] { get; }
```

Gets the string resource with the given name and formatted with the supplied arguments.

Parameters:

- `name`: The name of the string resource.
- `arguments`: The values to format the string with.

Returns: The formatted string resource as a `LocalizedString`.

To be added.

## ResourceManagerStringLocalizer.GetAllStrings(Boolean) method

```csharp
public virtual System.Collections.Generic.IEnumerable<Microsoft.Extensions.Localization.LocalizedString> GetAllStrings (bool includeParentCultures);
```

Gets all the resource strings.

Parameters:

- `includeParentCultures`: `true` to include strings from parent cultures; `false` otherwise.

Returns: An enumeration that contains all the resource strings.

To be added.

## ResourceManagerStringLocalizer.GetAllStrings(Boolean, CultureInfo) method

```csharp
protected System.Collections.Generic.IEnumerable<Microsoft.Extensions.Localization.LocalizedString> GetAllStrings (bool includeParentCultures, System.Globalization.CultureInfo culture);
```

Returns all strings in the specified culture.

Parameters:

- `includeParentCultures`: Whether to include parent cultures in the search for a resource.
- `culture`: The `CultureInfo` to get strings for.

Returns: The strings.

To be added.

## ResourceManagerStringLocalizer.GetStringSafely(String, CultureInfo) method

```csharp
protected string? GetStringSafely (string name, System.Globalization.CultureInfo? culture);
```

Gets a resource string from a `ResourceManager` and returns `null` instead of
throwing exceptions if a match isn't found.

Parameters:

- `name`: The name of the string resource.
- `culture`: The `CultureInfo` to get the string for.

Returns: The resource string, or `null` if none was found.

To be added.
