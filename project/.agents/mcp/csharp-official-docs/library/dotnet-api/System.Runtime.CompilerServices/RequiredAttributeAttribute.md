---
title: "RequiredAttributeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RequiredAttributeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RequiredAttributeAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class RequiredAttributeAttribute : Attribute
```

Specifies that an importing compiler must fully understand the semantics of a type definition, or refuse to use it. This class cannot be inherited.

#### Remarks
You can apply this attribute to classes, structures, enumerations, and interfaces.

For example, you can use this attribute to mark a C++ class that has a copy constructor. Any compiler that uses such a class must understand every constraint on its use, such as never creating an object of that class in the garbage collected heap, because a relocation does not call its copy constructor.

The classes in `CompilerServices` are for compiler writers use only.

## RequiredAttributeAttribute.RequiredAttributeAttribute(Type) constructor

```csharp
public RequiredAttributeAttribute (Type requiredContract);
```

Initializes a new instance of the `RequiredAttributeAttribute` class.

Parameters:

- `requiredContract`: A type that an importing compiler must fully understand. This parameter is not supported.

To be added.

## RequiredAttributeAttribute.RequiredContract property

```csharp
public Type RequiredContract { get; }
```

Gets a type that an importing compiler must fully understand.

Returns: A type that an importing compiler must fully understand.

To be added.
