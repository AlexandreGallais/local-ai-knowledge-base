---
title: "OptionalAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/OptionalAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionalAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class OptionalAttribute : Attribute
```

Indicates that a parameter is optional.

#### Remarks
You can apply this attribute to parameters.

Optional parameters are not supported by all languages.

`OptionalAttribute` is sometimes used in conjunction with `DefaultParameterValueAttribute`.

#### Examples

The following code example demonstrates how to apply the `OptionalAttribute` attribute to a parameter of a method written in C#.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/OptionalAttribute/Overview/sample.cs._
## OptionalAttribute.OptionalAttribute() constructor

```csharp
public OptionalAttribute ();
```

Initializes a new instance of the `OptionalAttribute` class with default values.

To be added.
