---
title: "StringLocalizerExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/StringLocalizerExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringLocalizerExtensions class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public static class StringLocalizerExtensions
```

Extension methods for operating on `IStringLocalizer` instances.

To be added.

## StringLocalizerExtensions.GetAllStrings(IStringLocalizer) method

```csharp
public static System.Collections.Generic.IEnumerable<Microsoft.Extensions.Localization.LocalizedString> GetAllStrings (this Microsoft.Extensions.Localization.IStringLocalizer stringLocalizer);
```

Gets all string resources including those for parent cultures.

Parameters:

- `stringLocalizer`: The `IStringLocalizer`.

Returns: The string resources.

To be added.

## StringLocalizerExtensions.GetString(IStringLocalizer, String) method

```csharp
public static Microsoft.Extensions.Localization.LocalizedString GetString (this Microsoft.Extensions.Localization.IStringLocalizer stringLocalizer, string name);
```

Gets the string resource with the given name.

Parameters:

- `stringLocalizer`: The `IStringLocalizer`.
- `name`: The name of the string resource.

Returns: The string resource as a `LocalizedString`.

To be added.

## StringLocalizerExtensions.GetString(IStringLocalizer, String, Object[]) method

```csharp
public static Microsoft.Extensions.Localization.LocalizedString GetString (this Microsoft.Extensions.Localization.IStringLocalizer stringLocalizer, string name, params object[] arguments);
```

Gets the string resource with the given name and formatted with the supplied arguments.

Parameters:

- `stringLocalizer`: The `IStringLocalizer`.
- `name`: The name of the string resource.
- `arguments`: The values to format the string with.

Returns: The formatted string resource as a `LocalizedString`.

To be added.
