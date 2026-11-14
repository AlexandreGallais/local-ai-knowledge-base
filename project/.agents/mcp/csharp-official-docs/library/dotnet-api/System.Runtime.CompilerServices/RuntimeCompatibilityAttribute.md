---
title: "RuntimeCompatibilityAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeCompatibilityAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeCompatibilityAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class RuntimeCompatibilityAttribute : Attribute
```

Specifies whether to wrap exceptions that do not derive from the `Exception` class with a `RuntimeWrappedException` object. This class cannot be inherited.

#### Remarks
Some languages, such as C++, allow you to throw exceptions of any type. Other languages, such as Microsoft C# and Visual Basic, require that every thrown exception be derived from the `Exception` class. To maintain compatibility between languages, the common language runtime (CLR) wraps objects that do not derive from `Exception` in a `RuntimeWrappedException` object.

You can use the `RuntimeCompatibilityAttribute` class to specify whether exceptions should appear wrapped inside catch blocks and exception filters for an assembly. Many language compilers, including the Microsoft C# and Visual Basic <example-value>, apply this attribute by default to specify the wrapping behavior.

Note that the runtime still wraps exceptions even if you use the `RuntimeCompatibilityAttribute` class to specify that you do not want them wrapped. In this case, exceptions are unwrapped only inside catch blocks or exception filters.

#### Examples
The following code example demonstrates how to apply the `RuntimeCompatibilityAttribute` class to an assembly that throws a `String` object as an exception in C++ and catches it using a `RuntimeWrappedException` object.

## RuntimeCompatibilityAttribute.RuntimeCompatibilityAttribute() constructor

```csharp
public RuntimeCompatibilityAttribute ();
```

Initializes a new instance of the `RuntimeCompatibilityAttribute` class.

#### Examples
The following code example applies the `RuntimeCompatibilityAttribute` attribute to an assembly to disable exception wrapping.

## RuntimeCompatibilityAttribute.WrapNonExceptionThrows property

```csharp
public bool WrapNonExceptionThrows { get; set; }
```

Gets or sets a value that indicates whether to wrap exceptions that do not derive from the `Exception` class with a `RuntimeWrappedException` object.

Returns: `true` if exceptions that do not derive from the `Exception` class should appear wrapped with a `RuntimeWrappedException` object; otherwise, `false`.

#### Examples
The following code example applies the `RuntimeCompatibilityAttribute` attribute to an assembly to disable exception wrapping.
