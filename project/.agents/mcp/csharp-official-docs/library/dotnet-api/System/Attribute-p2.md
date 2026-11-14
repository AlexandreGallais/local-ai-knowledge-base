---
title: "Attribute class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Attribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Attribute class (part 2 of 4)

## Attribute.GetCustomAttribute(ParameterInfo, Type, Boolean) method

```csharp
public static Attribute? GetCustomAttribute (System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Retrieves a custom attribute applied to a method parameter. Parameters specify the method parameter, the type of the custom attribute to search for, and whether to search ancestors of the method parameter.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

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

_Code sample not included: ~/snippets/csharp/System/Attribute/.ctor/getcustattrprminh.cs._

## Attribute.GetCustomAttributes(Assembly) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Assembly element);
```

Retrieves an array of the custom attributes applied to an assembly. A parameter specifies the assembly.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

#### Examples
The following example retrieves the custom attributes found in the current assembly.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca1.cs._

## Attribute.GetCustomAttributes(MemberInfo) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.MemberInfo element);
```

Retrieves an array of the custom attributes applied to a member of a type. A parameter specifies the member.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
The return value contains the custom attributes for ancestors of `element`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttribute`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca4.cs._

## Attribute.GetCustomAttributes(Module) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Module element);
```

Retrieves an array of the custom attributes applied to a module. A parameter specifies the module.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca2.cs._

## Attribute.GetCustomAttributes(ParameterInfo) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.ParameterInfo element);
```

Retrieves an array of the custom attributes applied to a method parameter. A parameter specifies the method parameter.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
If `element` represents a parameter in a method of a derived type, the return value includes the inheritable custom attributes applied to the same parameter in the overridden base methods.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca5.cs._

## Attribute.GetCustomAttributes(Assembly, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Assembly element, bool inherit);
```

Retrieves an array of the custom attributes applied to an assembly. Parameters specify the assembly, and an ignored search option.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca1.cs._

## Attribute.GetCustomAttributes(Assembly, Type) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Assembly element, Type attributeType);
```

Retrieves an array of the custom attributes applied to an assembly. Parameters specify the assembly, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca1.cs._

## Attribute.GetCustomAttributes(MemberInfo, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.MemberInfo element, bool inherit);
```

Retrieves an array of the custom attributes applied to a member of a type. Parameters specify the member, the type of the custom attribute to search for, and whether to search ancestors of the member.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
The return value contains the custom attributes for ancestors of `element` if `inherit` is `true`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca4.cs._

## Attribute.GetCustomAttributes(MemberInfo, Type) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.MemberInfo element, Type attributeType);
```

Retrieves an array of the custom attributes applied to a member of a type. Parameters specify the member, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.
- `attributeType`: To be added.

Returns: An `Attribute` array that contains the custom attributes of type `type` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `type` is `null`.
- `ArgumentException`: `type` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
The return value contains the custom attributes for ancestors of `element`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttribute`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca4.cs._

## Attribute.GetCustomAttributes(Module, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Module element, bool inherit);
```

Retrieves an array of the custom attributes applied to a module. Parameters specify the module, and an ignored search option.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` is `null`.

#### Remarks
The return value contains the custom attributes for ancestors of `element` if `inherit` is `true`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca2.cs._

## Attribute.GetCustomAttributes(Module, Type) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Module element, Type attributeType);
```

Retrieves an array of the custom attributes applied to a module. Parameters specify the module, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca2.cs._

## Attribute.GetCustomAttributes(ParameterInfo, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.ParameterInfo element, bool inherit);
```

Retrieves an array of the custom attributes applied to a method parameter. Parameters specify the method parameter, and whether to search ancestors of the method parameter.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: An `Attribute` array that contains the custom attributes applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentException`: The `ParameterInfo.Member` property of `element` is `null`.
- `ArgumentNullException`: `element` is `null`.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
If `element` represents a parameter in a method of a derived type, the return value includes the inheritable custom attributes applied to the same parameter in the overridden base methods.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca5.cs._
