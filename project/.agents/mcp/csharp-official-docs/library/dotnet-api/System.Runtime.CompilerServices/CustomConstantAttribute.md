---
title: "CustomConstantAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CustomConstantAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomConstantAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public abstract class CustomConstantAttribute : Attribute
```

Defines a constant value that a compiler can persist for a field or method parameter.

#### Remarks
You can apply this attribute to fields or parameters.

This class cannot be instantiated.

Compilers should create specific classes, derived from this class, that define the type of the constant value. For example, see the `DateTimeConstantAttribute`, which allows a compiler to persist an 8-byte `DateTime` constant for a field or method parameter. If you are using `Reflection`, this pattern of deriving specific classes from `CustomConstantAttribute` enables you to find all occurrences of custom constant attributes easily.

The classes in `CompilerServices` are for compiler writers' use only.

## CustomConstantAttribute.CustomConstantAttribute() constructor

```csharp
protected CustomConstantAttribute ();
```

Initializes a new instance of the `CustomConstantAttribute` class.

#### Remarks
The classes in `CompilerServices` are for compiler writers' use only.

## CustomConstantAttribute.Value property

```csharp
public abstract object? Value { get; }
```

Gets the constant value stored by this attribute.

Returns: The constant value stored by this attribute.

To be added.
