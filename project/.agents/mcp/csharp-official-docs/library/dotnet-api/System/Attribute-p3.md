---
title: "Attribute class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Attribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Attribute class (part 3 of 4)

## Attribute.GetCustomAttributes(ParameterInfo, Type) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.ParameterInfo element, Type attributeType);
```

Retrieves an array of the custom attributes applied to a method parameter. Parameters specify the method parameter, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
If `element` represents a parameter in a method of a derived type, the return value includes the inheritable custom attributes applied to the same parameter in the overridden base methods.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca5.cs._

## Attribute.GetCustomAttributes(Assembly, Type, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Assembly element, Type attributeType, bool inherit);
```

Retrieves an array of the custom attributes applied to an assembly. Parameters specify the assembly, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca1.cs._

## Attribute.GetCustomAttributes(MemberInfo, Type, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.MemberInfo element, Type attributeType, bool inherit);
```

Retrieves an array of the custom attributes applied to a member of a type. Parameters specify the member, the type of the custom attribute to search for, and whether to search ancestors of the member.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, or property member of a class.
- `attributeType`: To be added.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: An `Attribute` array that contains the custom attributes of type `type` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `type` is `null`.
- `ArgumentException`: `type` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
The return value contains the custom attributes for ancestors of `element` if `inherit` is `true`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca4.cs._

## Attribute.GetCustomAttributes(Module, Type, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.Module element, Type attributeType, bool inherit);
```

Retrieves an array of the custom attributes applied to a module. Parameters specify the module, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Remarks
The return value contains the custom attributes for ancestors of `element` if `inherit` is `true`.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca2.cs._

## Attribute.GetCustomAttributes(ParameterInfo, Type, Boolean) method

```csharp
public static Attribute[] GetCustomAttributes (System.Reflection.ParameterInfo element, Type attributeType, bool inherit);
```

Retrieves an array of the custom attributes applied to a method parameter. Parameters specify the method parameter, the type of the custom attribute to search for, and whether to search ancestors of the method parameter.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: If `true`, specifies to also search the ancestors of `element` for custom attributes.

Returns: An `Attribute` array that contains the custom attributes of type `attributeType` applied to `element`, or an empty array if no such custom attributes exist.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `TypeLoadException`: A custom attribute type cannot be loaded.

#### Remarks
If `element` represents a parameter in a method of a derived type, the return value includes the inheritable custom attributes applied to the same parameter in the overridden base methods.

#### Examples
The following code example demonstrates the use of `Attribute.GetCustomAttributes`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttributes/ca5.cs._

## Attribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

#### Examples
The following code example illustrates the use of `Attribute.GetHashCode` in the context of `Attribute`.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetHashCode/hashcode.cs._

## Attribute.IsDefaultAttribute() method

```csharp
public virtual bool IsDefaultAttribute ();
```

When overridden in a derived class, indicates whether the value of this instance is the default value for the derived class.

Returns: `true` if this instance is the default attribute for the class; otherwise, `false`.

#### Remarks
The default implementation of this class returns `false`, and must be implemented in the derived class to be useful to that class.

The implementation of this method in a derived class compares the value of this instance to a standard default value, then returns a Boolean value that indicates whether the value of this instance is equal to the standard value. The standard value is typically coded as a constant in the implementation, or stored programmatically in a field used by the implementation.

#### Examples
The following code example illustrates the use of `Attribute.IsDefaultAttribute`.

_Code sample not included: ~/snippets/csharp/System/Attribute/IsDefaultAttribute/defattr.cs._

## Attribute.IsDefined(Assembly, Type) method

```csharp
public static bool IsDefined (System.Reflection.Assembly element, Type attributeType);
```

Determines whether any custom attributes are applied to an assembly. Parameters specify the assembly, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id1.cs._

## Attribute.IsDefined(MemberInfo, Type) method

```csharp
public static bool IsDefined (System.Reflection.MemberInfo element, Type attributeType);
```

Determines whether any custom attributes are applied to a member of a type. Parameters specify the member, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `MemberInfo` class that describes a constructor, event, field, method, type, or property member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.
- `NotSupportedException`: `element` is not a constructor, method, property, event, type, or field.

#### Remarks
The ancestors of `element` are searched for custom attributes.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `MemberInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id4.cs._

## Attribute.IsDefined(Module, Type) method

```csharp
public static bool IsDefined (System.Reflection.Module element, Type attributeType);
```

Determines whether any custom attributes of a specified type are applied to a module. Parameters specify the module, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `Module` class that describes a portable executable file.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Remarks
The ancestors of `element` are not searched for custom attributes.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `Module` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id2.cs._

## Attribute.IsDefined(ParameterInfo, Type) method

```csharp
public static bool IsDefined (System.Reflection.ParameterInfo element, Type attributeType);
```

Determines whether any custom attributes are applied to a method parameter. Parameters specify the method parameter, and the type of the custom attribute to search for.

Parameters:

- `element`: An object derived from the `ParameterInfo` class that describes a parameter of a member of a class.
- `attributeType`: The type, or a base type, of the custom attribute to search for.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Remarks
The ancestors of `element` are searched for custom attributes.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking a `ParameterInfo` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id5.cs._

## Attribute.IsDefined(Assembly, Type, Boolean) method

```csharp
public static bool IsDefined (System.Reflection.Assembly element, Type attributeType, bool inherit);
```

Determines whether any custom attributes are applied to an assembly. Parameters specify the assembly, the type of the custom attribute to search for, and an ignored search option.

Parameters:

- `element`: An object derived from the `Assembly` class that describes a reusable collection of modules.
- `attributeType`: The type, or a base type, of the custom attribute to search for.
- `inherit`: This parameter is ignored, and does not affect the operation of this method.

Returns: `true` if a custom attribute of type `attributeType` is applied to `element`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `element` or `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not derived from `Attribute`.

#### Examples
The following code example illustrates the use of `Attribute.IsDefined`, taking an `Assembly` as a parameter.

_Code sample not included: ~/snippets/csharp/System/Attribute/GetCustomAttribute/id1.cs._
