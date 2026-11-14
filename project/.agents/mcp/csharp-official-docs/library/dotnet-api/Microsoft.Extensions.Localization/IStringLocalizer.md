---
title: "IStringLocalizer interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/IStringLocalizer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStringLocalizer interface

Namespace: `Microsoft.Extensions.Localization`

```csharp
public interface IStringLocalizer
```

Represents a service that provides localized strings.

To be added.

## IStringLocalizer.Item property

```csharp
public Microsoft.Extensions.Localization.LocalizedString this[string name] { get; }
```

Gets the string resource with the given name.

Parameters:

- `name`: The name of the string resource.

Returns: The string resource as a `LocalizedString`.

To be added.

## IStringLocalizer.Item property

```csharp
public Microsoft.Extensions.Localization.LocalizedString this[string name, params object[] arguments] { get; }
```

Gets the string resource with the given name and formatted with the supplied arguments.

Parameters:

- `name`: The name of the string resource.
- `arguments`: The values to format the string with.

Returns: The formatted string resource as a `LocalizedString`.

To be added.

## IStringLocalizer.GetAllStrings(Boolean) method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Localization.LocalizedString> GetAllStrings (bool includeParentCultures);
```

Gets all string resources.

Parameters:

- `includeParentCultures`: A `Boolean` indicating whether to include strings from parent cultures.

Returns: The strings.

To be added.
