---
title: "Attribute class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Attribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Attribute class

Namespace: `System`

```csharp
public abstract class Attribute
```

Represents the base class for custom attributes.

#### Remarks
The `Attribute` class associates predefined system information or user-defined custom information with a target element. A target element can be an assembly, class, constructor, delegate, enum, event, field, interface, method, portable executable file module, parameter, property, return value, struct, or another attribute.

Information provided by an attribute is also known as metadata. Metadata can be examined at run time by your application to control how your program processes data, or before run time by external tools to control how your application itself is processed or maintained. For example, .NET predefines and uses attribute types to control run-time behavior, and some programming languages use attribute types to represent language features not directly supported by the .NET common type system.

All attribute types derive directly or indirectly from the `Attribute` class. Attributes can be applied to any target element; multiple attributes can be applied to the same target element; and attributes can be inherited by an element derived from a target element. Use the `AttributeTargets` class to specify the target element to which the attribute is applied.

The `Attribute` class provides convenient methods to retrieve and test custom attributes. For more information about using attributes, see Applying Attributes and Attributes.

#### Examples
The following code example demonstrates the usage of `Attribute`.

_Code sample not included: ~/snippets/csharp/System/Attribute/Overview/customattribute.cs._

## Attribute.Attribute() constructor

```csharp
protected Attribute ();
```

Initializes a new instance of the `Attribute` class.

#### Remarks
This constructor is only called by classes that derive from `Attribute`.

#### Examples
The following code example shows the definition of a custom parameter `Attribute` class with its constructor.

_Code sample not included: ~/snippets/csharp/System/Attribute/.ctor/getcustattrparam.cs._

## Attribute.TypeId property

```csharp
public virtual object TypeId { get; }
```

When implemented in a derived class, gets a unique identifier for this `Attribute`.

Returns: An `Object` that is a unique identifier for the attribute.

#### Remarks
As implemented, this identifier is merely the `Type` of the attribute. However, it is intended that the unique identifier be used to identify two attributes of the same type.

#### Examples
The following code example implements the `TypeId` property in a custom parameter `Attribute` class and shows its use.

_Code sample not included: ~/snippets/csharp/System/Attribute/TypeId/typeid.cs._

## Attribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or `null`.

Returns: `true` if `obj` and this instance are of the same type and have identical field values; otherwise, `false`.

#### Remarks

The `Attribute.Equals` method uses reflection to retrieve field information for the current instance and the `obj` argument. It then compares field values.

When implementing your own class derived from `Attribute`, you can override the `Attribute.Equals` method. Because it uses reflection, we recommend that you do so. However, your override should perform a standard test for reference equality (the two arguments represent the same object instance) or value equality (the two arguments are of the same type and have identical field values). If you want to perform a custom comparison to determine whether two attributes objects are equal, you can override the `Attribute.Match` method.

#### Examples
The following example defines two custom parameter `Attribute` classes, then creates several objects of each class and uses the `Attribute.Equals` method to compare them.

_Code sample not included: ~/snippets/csharp/System/Attribute/Equals/equals.cs._

## Attribute.GetCustomAttribute(Assembly, Type) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.Assembly element, Type attributeType);
```

Retrieves a custom attribute applied to a specified assembly. Parameters specify the assembly and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Remarks
Use the `Attribute.GetCustomAttributes` method if you expect more than one value to be returned, or `AmbiguousMatchException` will be thrown.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id1.cs._

## Attribute.GetCustomAttribute(MemberInfo, Type) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.MemberInfo element, Type attributeType);
```

Retrieves a custom attribute applied to a member of a type. Parameters specify the member, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
A match is determined in the same way described in the Return Value section of `Type.IsAssignableFrom`.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id4.cs._

## Attribute.GetCustomAttribute(Module, Type) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.Module element, Type attributeType);
```

Retrieves a custom attribute applied to a module. Parameters specify the module, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id2.cs._

## Attribute.GetCustomAttribute(ParameterInfo, Type) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.ParameterInfo element, Type attributeType);
```

Retrieves a custom attribute applied to a method parameter. Parameters specify the method parameter, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
If `element` represents a parameter in a method of a derived type, the return value includes the inheritable custom attributes applied to the same parameter in the overridden base methods.

#### Examples
The following code example defines a custom parameter `Attribute` class and applies the custom attribute to a method in a derived class and the base of the derived class. The example shows the use of the `Attribute.GetCustomAttribute` method to return the attributes.

_Code sample not included: ~/snippets/csharp/System/Attribute/.ctor/getcustattrparam.cs._

## Attribute.GetCustomAttribute(Assembly, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.Assembly element, Type attributeType, bool inherit);
```

Retrieves a custom attribute applied to an assembly. Parameters specify the assembly, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id1.cs._

## Attribute.GetCustomAttribute(MemberInfo, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Retrieves a custom attribute applied to a member of a type. Parameters specify the member, the type of the custom attribute to search for, and whether to search ancestors of the member.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `AmbiguousMatchException`: More than one of the requested attributes was found.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id4.cs._

## Attribute.GetCustomAttribute(Module, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.Module element, Type attributeType, bool inherit);
```

Retrieves a custom attribute applied to a module. Parameters specify the module, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: A reference to the single custom attribute of type `attributeType` that is applied to `element`, or `null` if there is no such attribute.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `AmbiguousMatchException`: More than one of the requested attributes was found.

#### Examples
The following code example illustrates the use of the `Attribute.GetCustomAttribute` method taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id2.cs._
