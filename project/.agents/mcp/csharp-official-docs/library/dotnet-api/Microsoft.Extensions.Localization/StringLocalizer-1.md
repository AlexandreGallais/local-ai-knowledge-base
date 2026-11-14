---
title: "StringLocalizer<TResourceSource> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/StringLocalizer`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringLocalizer<TResourceSource> class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public class StringLocalizer<TResourceSource> : Microsoft.Extensions.Localization.IStringLocalizer<TResourceSource>
```

Provides strings for `TResourceSource`.

Parameters:

- `TResourceSource`: The `Type` to provide strings for.

To be added.

## StringLocalizer<TResourceSource>.StringLocalizer(IStringLocalizerFactory) constructor

```csharp
public StringLocalizer (Microsoft.Extensions.Localization.IStringLocalizerFactory factory);
```

Creates a new `StringLocalizer<T>`.

Parameters:

- `factory`: The `IStringLocalizerFactory` to use.

To be added.

## StringLocalizer<TResourceSource>.Item property

```csharp
public virtual Microsoft.Extensions.Localization.LocalizedString this[string name] { get; }
```

Gets the string resource with the given name.

Parameters:

- `name`: The name of the string resource.

Returns: The string resource as a `LocalizedString`.

To be added.

## StringLocalizer<TResourceSource>.Item property

```csharp
public virtual Microsoft.Extensions.Localization.LocalizedString this[string name, params object[] arguments] { get; }
```

Gets the string resource with the given name and formatted with the supplied arguments.

Parameters:

- `name`: The name of the string resource.
- `arguments`: The values to format the string with.

Returns: The formatted string resource as a `LocalizedString`.

To be added.

## StringLocalizer<TResourceSource>.GetAllStrings(Boolean) method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Localization.LocalizedString> GetAllStrings (bool includeParentCultures);
```

Gets all the resource strings.

Parameters:

- `includeParentCultures`: `true` to include strings from parent cultures; `false` otherwise.

Returns: An enumeration that contains all the resource strings.

To be added.
