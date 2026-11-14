---
title: "CompositeFormat class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/CompositeFormat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeFormat class

Namespace: `System.Text`

```csharp
public sealed class CompositeFormat
```

Represents a parsed composite format string.

To be added.

## CompositeFormat.Format property

```csharp
public string Format { get; }
```

Gets the original composite format string used to create this `CompositeFormat` instance.

Returns: To be added.

To be added.

## CompositeFormat.MinimumArgumentCount property

```csharp
public int MinimumArgumentCount { get; }
```

Gets the minimum number of arguments that must be passed to a formatting operation using this `CompositeFormat`.

Returns: To be added.

It's permissible to supply more arguments than this value, but it's an error to pass fewer.

## CompositeFormat.Parse(String) method

```csharp
public static System.Text.CompositeFormat Parse (string format);
```

Parses the specified composite format string.

Parameters:

- `format`: The string to parse.

Returns: The parsed `CompositeFormat`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: A format item in `format` is invalid.

To be added.
