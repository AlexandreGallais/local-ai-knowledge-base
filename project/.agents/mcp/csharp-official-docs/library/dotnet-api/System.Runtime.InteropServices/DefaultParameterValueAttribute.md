---
title: "DefaultParameterValueAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DefaultParameterValueAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultParameterValueAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DefaultParameterValueAttribute : Attribute
```

Sets the default value of a parameter when called from a language that supports default parameters. This class cannot be inherited.

#### Remarks
The `DefaultParameterValueAttribute` attribute allows you to specify a default parameter value in a language that does not otherwise support default parameters.  After you apply this attribute to your code, languages that support default parameters can use the specified value as a default parameter.

The `DefaultParameterValueAttribute` is particularly useful to specify default parameters for methods of a COM interop interface.

#### Examples

The following code example demonstrates how to apply the `DefaultParameterValueAttribute` attribute to a parameter of a method written in C#. The snippet also uses the `OptionalAttribute` attribute to enable the method to be called without any arguments.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DefaultParameterValueAttribute/Overview/sample1.cs._
There are some behavior differences between C# optional arguments and using `DefaultParameterValueAttribute` with `OptionalAttribute`. The following code snippet demonstrates these differences.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DefaultParameterValueAttribute/Overview/sample2.cs._
## DefaultParameterValueAttribute.DefaultParameterValueAttribute(Object) constructor

```csharp
public DefaultParameterValueAttribute (object? value);
```

Initializes a new instance of the `DefaultParameterValueAttribute` class with the default value of a parameter.

Parameters:

- `value`: An object that represents the default value of a parameter.

#### Remarks
Use this constructor to apply the `DefaultParameterValueAttribute` attribute to a parameter written in a language such as Microsoft Visual C# that does not support default parameters.

#### Examples
The following code example demonstrates how to apply the `DefaultParameterValueAttribute` attribute to a parameter of a method written in C#. The `OptionalAttribute` attribute is also used to enable the method to be called without any arguments.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DefaultParameterValueAttribute/Overview/sample1.cs._
## DefaultParameterValueAttribute.Value property

```csharp
public object? Value { get; }
```

Gets the default value of a parameter.

Returns: An object that represents the default value of a parameter.

To be added.
