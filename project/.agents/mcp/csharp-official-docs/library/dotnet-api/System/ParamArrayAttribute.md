---
title: "ParamArrayAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ParamArrayAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParamArrayAttribute class

Namespace: `System`

```csharp
public sealed class ParamArrayAttribute : Attribute
```

Indicates that a method will allow a variable number of arguments in its invocation. This class cannot be inherited.

#### Remarks
The `ParamArrayAttribute` indicates that a method parameter is a parameter array. A parameter array allows the specification of an unknown number of arguments. A parameter array must be the last parameter in a formal parameter list, and it must be a single-dimension array. When the method is called, a parameter array permits arguments to a method to be specified in either of two ways:

- As a single expression of a type that is implicitly convertible to the parameter array type. The parameter array functions as a value parameter.

- As zero or more arguments, where each argument is an expression of a type that is implicitly convertible to the type of the parameter array element.

The example in the next section illustrates both calling conventions.

> **Note:**
>  Typically, the `ParamArrayAttribute` is not used directly in code. Instead, individual language keywords, such as `ParamArray` in Visual Basic and `params` in C#, are used as wrappers for the `ParamArrayAttribute` class. Some languages, such as C#, may even require the use of the language keyword and prohibit the use of `ParamArrayAttribute`.

During overload resolution, when compilers that support parameter arrays encounter a method overload that does not exist but has one fewer parameter than an overload that includes a parameter array, they will replace the method with the overload that includes the parameter array. For example, a call to the `String.Split()` instance method (which does not exist in the `String` class) is resolved as a call to the `Split` method. The compiler will also pass an empty array of the required type to the method. This means that the method must always be prepared to handle an array whose length is zero when it processes the elements in the parameter array. The example provides an illustration.

For more information about using attributes, see Attributes.

#### Examples
The following example defines a `Temperature` class that includes a `Display` method, which is intended to display one or more formatted temperature values. The method has a single parameter, `formats`, which is defined as a parameter array.

_Code sample not included: ~/snippets/csharp/System/ParamArrayAttribute/Overview/Example.cs._

The following example illustrates three different calls to the `Temperature.Display` method. In the first, the method is passed an array of format strings. In the second, the method is passed four individual format strings as arguments. In the third, the method is called with no arguments. As the output from the example illustrates, the Visual Basic and C# compilers translate this into a call to the `Display` method with an empty string array.

_Code sample not included: ~/snippets/csharp/System/ParamArrayAttribute/Overview/Example.cs._

## ParamArrayAttribute.ParamArrayAttribute() constructor

```csharp
public ParamArrayAttribute ();
```

Initializes a new instance of the `ParamArrayAttribute` class with default properties.

To be added.
