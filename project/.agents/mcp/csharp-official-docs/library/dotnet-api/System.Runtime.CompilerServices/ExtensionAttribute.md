---
title: "ExtensionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ExtensionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExtensionAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ExtensionAttribute : Attribute
```

Indicates that a method is an extension method, or that a class or assembly contains extension methods.

#### Remarks
In Visual Basic, you should use this attribute to create an extension method. For more information, see Extension Methods.

In C#, you do not need to use this attribute; you should use the this modifier for the first parameter to create an extension method. The compiler automatically emits `ExtensionAttribute` for extension methods. For more information, see Extension Methods.

If you are writing a compiler that supports extension methods, your compiler should emit this attribute on each extension method and on each class and assembly that contains one or more extension methods.

## ExtensionAttribute.ExtensionAttribute() constructor

```csharp
public ExtensionAttribute ();
```

Initializes a new instance of the `ExtensionAttribute` class.

To be added.
