---
title: "AttributeTargets enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AttributeTargets.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AttributeTargets enum

Namespace: `System`

```csharp
public enum AttributeTargets
```

Specifies the application elements on which it is valid to apply an attribute.

#### Remarks
The `AttributeUsageAttribute` class uses this enumeration to specify the kind of element on which it's valid to apply an attribute.

`AttributeTargets` enumeration values can be combined with a bitwise OR operation to get the preferred combination.

#### Examples
The following example illustrates the application of attributes to various targets.

> **Note:**
> Visual Basic <example-value> doesn't support the application of attributes to type parameters.

_Code sample not included: ~/snippets/csharp/System/AttributeTargets/Overview/attrtargs.cs._

## AttributeTargets.All field

```csharp
All
```

Attribute can be applied to any application element.

## AttributeTargets.Assembly field

```csharp
Assembly
```

Attribute can be applied to an assembly.

## AttributeTargets.Class field

```csharp
Class
```

Attribute can be applied to a class.

## AttributeTargets.Constructor field

```csharp
Constructor
```

Attribute can be applied to a constructor.

## AttributeTargets.Delegate field

```csharp
Delegate
```

Attribute can be applied to a delegate.

## AttributeTargets.Enum field

```csharp
Enum
```

Attribute can be applied to an enumeration.

## AttributeTargets.Event field

```csharp
Event
```

Attribute can be applied to an event.

## AttributeTargets.Field field

```csharp
Field
```

Attribute can be applied to a field.

## AttributeTargets.GenericParameter field

```csharp
GenericParameter
```

Attribute can be applied to a generic parameter. Currently, this attribute can be applied only in C#, Microsoft intermediate language (MSIL), and emitted code.

## AttributeTargets.Interface field

```csharp
Interface
```

Attribute can be applied to an interface.

## AttributeTargets.Method field

```csharp
Method
```

Attribute can be applied to a method.

## AttributeTargets.Module field

```csharp
Module
```

Attribute can be applied to a module. `Module` refers to a portable executable file (.dll or.exe) and not a Visual Basic <example-value> module.

## AttributeTargets.Parameter field

```csharp
Parameter
```

Attribute can be applied to a parameter.

## AttributeTargets.Property field

```csharp
Property
```

Attribute can be applied to a property.

## AttributeTargets.ReturnValue field

```csharp
ReturnValue
```

Attribute can be applied to a return value.

## AttributeTargets.Struct field

```csharp
Struct
```

Attribute can be applied to a structure; that is, a value type.
