---
title: "DefaultCharSetAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DefaultCharSetAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultCharSetAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DefaultCharSetAttribute : Attribute
```

Specifies the value of the `CharSet` enumeration. This class cannot be inherited.

#### Remarks
Apply the `DefaultCharSetAttribute` attribute at the assembly level or module level to set the `CharSet` value for any call to `DllImportAttribute` that does not include a `CharSet` named argument specified by the user.

A `CharSet` named argument specified by the user overrides the setting of `DefaultCharSetAttribute`.

> **Note:**
> Only the C# and Visual Basic <example-value> recognize this attribute; it is not used by the C++ compiler.

#### Examples
The following code example changes the default `CharSet` value from `Ansi` to `Auto`.

`using System.Runtime.InteropServices;`

`[module: DefaultCharSet(CharSet.Auto)]`

`// …`

## DefaultCharSetAttribute.DefaultCharSetAttribute(CharSet) constructor

```csharp
public DefaultCharSetAttribute (System.Runtime.InteropServices.CharSet charSet);
```

Initializes a new instance of the `DefaultCharSetAttribute` class with the specified `CharSet` value.

Parameters:

- `charSet`: One of the `CharSet` values.

To be added.

## DefaultCharSetAttribute.CharSet property

```csharp
public System.Runtime.InteropServices.CharSet CharSet { get; }
```

Gets the default value of `CharSet` for any call to `DllImportAttribute`.

Returns: The default value of `CharSet` for any call to `DllImportAttribute`.

To be added.
