---
title: "IIntellisenseBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IIntellisenseBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IIntellisenseBuilder interface

Namespace: `System.ComponentModel`

```csharp
public interface IIntellisenseBuilder
```

Provides an interface to facilitate the retrieval of the builder's name and to display the builder.

To be added.

## IIntellisenseBuilder.Name property

```csharp
public string Name { get; }
```

Gets a localized name.

Returns: A localized name.

To be added.

## IIntellisenseBuilder.Show(String, String, String) method

```csharp
public bool Show (string language, string value, ref string newValue);
```

Shows the builder.

Parameters:

- `language`: The language service that is calling the builder.
- `value`: The expression being edited.
- `newValue`: The new value.

Returns: `true` if the value should be replaced with `newValue`; otherwise, `false` (if the user cancels, for example).

To be added.
