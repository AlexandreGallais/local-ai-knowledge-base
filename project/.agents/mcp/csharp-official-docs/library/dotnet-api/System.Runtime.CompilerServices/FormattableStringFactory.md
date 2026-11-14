---
title: "FormattableStringFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/FormattableStringFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FormattableStringFactory class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class FormattableStringFactory
```

Provides a static method to create a `FormattableString` object from a composite format string and its arguments.

To be added.

## FormattableStringFactory.Create(String, Object[]) method

```csharp
public static FormattableString Create (string format, params object?[] arguments);
```

Creates a `FormattableString` instance from a composite format string and its arguments.

Parameters:

- `format`: A composite format string.
- `arguments`: The arguments whose string representations are to be inserted in the result string.

Returns: The object that represents the composite format string and its arguments.

Exceptions:

- `ArgumentNullException`: `format` is `null`.

-or-

`arguments` is `null`.

To be added.
