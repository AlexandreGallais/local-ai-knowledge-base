---
title: "ParameterInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ParameterInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterInfo class (part 2 of 2)

## ParameterInfo.GetCustomAttributesData() method

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributesData ();
```

Returns a list of `CustomAttributeData` objects for the current parameter, which can be used in the reflection-only context.

Returns: A generic list of `CustomAttributeData` objects representing data about the attributes that have been applied to the current parameter.

#### Remarks
Use this method to examine the custom attributes of code in the reflection-only context, in cases where the custom attributes themselves are defined in code that is loaded into the reflection-only context. Methods such as `Attribute.GetCustomAttributes` and `ParameterInfo.GetCustomAttributes` cannot be used in such cases, because they create instances of the attributes. Code in the reflection-only context cannot be executed. For more information and example code, see the `CustomAttributeData` class.

## ParameterInfo.GetModifiedParameterType() method

```csharp
public virtual Type GetModifiedParameterType ();
```

Gets the modified type of this parameter object.

Returns: A modified type.

#### Remarks
A modified type supports `Type.GetOptionalCustomModifiers`, `Type.GetRequiredCustomModifiers`, and `Type.GetFunctionPointerCallingConventions`, which are used to obtain custom modifiers from a function pointer.

To obtain the normal, unmodified type from a modified type, use `Type.UnderlyingSystemType`.

This method is provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## ParameterInfo.GetOptionalCustomModifiers() method

```csharp
public virtual Type[] GetOptionalCustomModifiers ();
```

Gets the optional custom modifiers of the parameter.

Returns: An array of `Type` objects that identify the optional custom modifiers of the current parameter, such as `IsConst` or `IsImplicitlyDereferenced`.

#### Remarks
The `ParameterInfo.GetOptionalCustomModifiers` and `ParameterInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace, and the metadata specification in the ECMA Partition II documentation. For more information, see ECMA 335 Common Language Infrastructure (CLI).

## ParameterInfo.GetRealObject(StreamingContext) method

```csharp
public object GetRealObject (System.Runtime.Serialization.StreamingContext context);
```

Returns the real object that should be deserialized instead of the object that the serialized stream specifies.

Parameters:

- `context`: The serialized stream from which the current object is deserialized.

Returns: The actual object that is put into the graph.

Exceptions:

- `SerializationException`: The parameter's position in the parameter list of its associated member is not valid for that member's type.

To be added.

## ParameterInfo.GetRequiredCustomModifiers() method

```csharp
public virtual Type[] GetRequiredCustomModifiers ();
```

Gets the required custom modifiers of the parameter.

Returns: An array of `Type` objects that identify the required custom modifiers of the current parameter, such as `IsConst` or `IsImplicitlyDereferenced`.

#### Remarks
The `ParameterInfo.GetOptionalCustomModifiers` and `ParameterInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace, and the metadata specification in Partition II of ECMA 335 Common Language Infrastructure (CLI).

## ParameterInfo.IsDefined(Type, Boolean) method

```csharp
public virtual bool IsDefined (Type attributeType, bool inherit);
```

Determines whether the custom attribute of the specified type or its derived types is applied to this parameter.

Parameters:

- `attributeType`: The `Type` object to search for.
- `inherit`: This argument is ignored for objects of this type.

Returns: `true` if one or more instances of `attributeType` or its derived types are applied to this parameter; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not a `Type` object supplied by the common language runtime.

#### Remarks
This method ignores the `inherit` parameter. To search the inheritance chain for attributes on parameters, use the appropriate overloads of the `Attribute.IsDefined` method.

#### Examples
The following example defines two custom attributes, `MyAttribute` and `MyDerivedAttribute`. `MyDerivedAttribute` is derived from `MyAttribute`. The example then applies these attributes to the parameters of a method of an example class.

When the example is run, it uses the `ParameterInfo.IsDefined` method to test all parameters of all methods in the example class. It then displays the parameters that have `MyAttribute` or `MyDerivedAttribute`.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/IsDefined/parameterinfo_getcustomattribute_isdefined.cs._

## ParameterInfo.ToString() method

```csharp
public override string ToString ();
```

Gets the parameter type and name represented as a string.

Returns: A string containing the type and the name of the parameter.

To be added.

## ParameterInfo.AttrsImpl field

```csharp
protected System.Reflection.ParameterAttributes AttrsImpl;
```

The attributes of the parameter.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to parameter attributes is through `ParameterInfo.Attributes`.

## ParameterInfo.ClassImpl field

```csharp
protected Type? ClassImpl;
```

The `Type` of the parameter.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to parameter types is through `ParameterInfo.ParameterType`.

## ParameterInfo.DefaultValueImpl field

```csharp
protected object? DefaultValueImpl;
```

The default value of the parameter.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to the default value of the parameter is through `ParameterInfo.DefaultValue`.

## ParameterInfo.MemberImpl field

```csharp
protected System.Reflection.MemberInfo MemberImpl;
```

The member in which the field is implemented.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to the parameter name is through the `ParameterInfo.Member`.

## ParameterInfo.NameImpl field

```csharp
protected string? NameImpl;
```

The name of the parameter.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to the parameter name is through the `ParameterInfo.Name`.

## ParameterInfo.PositionImpl field

```csharp
protected int PositionImpl;
```

The zero-based position of the parameter in the parameter list.

#### Remarks
This field is intended only for users who are deriving classes from `ParameterInfo`.

Typical access to the name of the parameter is through `ParameterInfo.Position`.
