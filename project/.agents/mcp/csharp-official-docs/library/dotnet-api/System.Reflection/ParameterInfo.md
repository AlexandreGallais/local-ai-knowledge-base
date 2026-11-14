---
title: "ParameterInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ParameterInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParameterInfo class

Namespace: `System.Reflection`

```csharp
public class ParameterInfo : System.Reflection.ICustomAttributeProvider, System.Runtime.Serialization.IObjectReference
```

Discovers the attributes of a parameter and provides access to parameter metadata.

#### Remarks
Use an instance of `ParameterInfo` to obtain information about the parameter's data type, default value, and so on.

`MethodBase.GetParameters` returns an array of `ParameterInfo` objects representing the parameters of a method, in order.

#### Examples
This example shows how to use various reflection classes to analyze the metadata contained in an assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetReferencedAssemblies/Reflection.cs._

## ParameterInfo.ParameterInfo() constructor

```csharp
protected ParameterInfo ();
```

Initializes a new instance of the `ParameterInfo` class.

To be added.

## ParameterInfo.Attributes property

```csharp
public virtual System.Reflection.ParameterAttributes Attributes { get; }
```

Gets the attributes for this parameter.

Returns: A `ParameterAttributes` object representing the attributes for this parameter.

#### Remarks

This method utilizes the `AttrsImpl` method.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

#### Examples

The following example defines a method with three parameters. It uses the `Attributes` property to get the attributes of each parameter and display them in the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/Attributes/parameterinfo_attributes1.cs._

## ParameterInfo.CustomAttributes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.CustomAttributeData> CustomAttributes { get; }
```

Gets a collection that contains this parameter's custom attributes.

Returns: A collection that contains this parameter's custom attributes.

To be added.

## ParameterInfo.DefaultValue property

```csharp
public virtual object? DefaultValue { get; }
```

Gets a value indicating the default value if the parameter has a default value.

Returns: The default value of the parameter, or `DBNull.Value` if the parameter has no default value.

#### Remarks
This property is used only in the execution context. In the reflection-only context, use the `RawDefaultValue` property instead.

The default value is used when an actual value is not specified in the method call. A parameter can have a default value that is `null`. This is distinct from the case where a default value is not defined.

This method utilizes the `DefaultValueImpl` method.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

## ParameterInfo.HasDefaultValue property

```csharp
public virtual bool HasDefaultValue { get; }
```

Gets a value that indicates whether this parameter has a default value.

Returns: `true` if this parameter has a default value; otherwise, `false`.

To be added.

## ParameterInfo.IsIn property

```csharp
public bool IsIn { get; }
```

Gets a value indicating whether this is an input parameter.

Returns: `true` if the parameter is an input parameter; otherwise, `false`.

#### Remarks
This method depends on an optional metadata flag. This flag can be inserted by compilers, but the compilers are not obligated to do so.

This method utilizes the `In` flag of the `ParameterAttributes` enumerator.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

#### Examples
The following example shows how to test method parameters for the `In`, `Out`, and `Optional` attributes.

The example contains a `DefineMethod` method that does the following:

- Creates a dynamic assembly containing a `MyType` type.

- Adds a `MyMethod` method to `MyType`. `MyMethod` has three parameters. The first parameter is defined with `In`, the second with `Out`, and the third with `Optional`.

- Calls `TypeBuilder.CreateType` to complete the type.

After executing `DefineMethod`, the example searches the assemblies that are currently loaded until it finds the dynamic assembly. It loads `MyType` from the assembly, gets a `MethodInfo` object for the `MyMethod` method, and examines the parameters. The example uses the `ParameterInfo.IsIn`, `ParameterInfo.IsOut`, and `ParameterInfo.IsOptional` properties to display information about the parameters.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/IsIn/parameterinfo_isin_isout_isoptional.cs._

## ParameterInfo.IsLcid property

```csharp
public bool IsLcid { get; }
```

Gets a value indicating whether this parameter is a locale identifier (lcid).

Returns: `true` if the parameter is a locale identifier; otherwise, `false`.

#### Remarks
This method depends on an optional metadata flag. This flag can be inserted by compilers, but the compilers are not obligated to do so.

This method utilizes the `Lcid` flag of the `ParameterAttributes` enumerator.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

## ParameterInfo.IsOptional property

```csharp
public bool IsOptional { get; }
```

Gets a value indicating whether this parameter is optional.

Returns: `true` if the parameter is optional; otherwise, `false`.

#### Remarks
This method depends on an optional metadata flag. This flag can be inserted by compilers, but the compilers are not obligated to do so.

This method utilizes the `Optional` flag of the `ParameterAttributes` enumerator.

To get the `ParameterInfo` array, first get the method and then call `MethodBase.GetParameters`.

#### Examples
The following example shows how to test method parameters for the `In`, `Out`, and `Optional` attributes.

The example contains a `DefineMethod` method that does the following:

- Creates a dynamic assembly containing a `MyType` type.

- Adds a `MyMethod` method to `MyType`. `MyMethod` has three parameters. The first parameter is defined with `In`, the second with `Out`, and the third with `Optional`.

- Calls `TypeBuilder.CreateType` to complete the type.

After executing `DefineMethod`, the example searches the assemblies that are currently loaded until it finds the dynamic assembly. It loads `MyType` from the assembly, gets a `MethodInfo` object for the `MyMethod` method, and examines the parameters. The example uses the `ParameterInfo.IsIn`, `ParameterInfo.IsOut`, and `ParameterInfo.IsOptional` properties to display information about the parameters.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/IsIn/parameterinfo_isin_isout_isoptional.cs._

## ParameterInfo.IsOut property

```csharp
public bool IsOut { get; }
```

Gets a value indicating whether this is an output parameter.

Returns: `true` if the parameter is an output parameter; otherwise, `false`.

#### Remarks
This method depends on an optional metadata flag. This flag can be inserted by compilers, but the compilers are not obligated to do so.

This method utilizes the `Out` flag of the `ParameterAttributes` enumerator.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

#### Examples
The following example shows how to test method parameters for the `In`, `Out`, and `Optional` attributes.

The example contains a `DefineMethod` method that does the following:

- Creates a dynamic assembly containing a `MyType` type.

- Adds a `MyMethod` method to `MyType`. `MyMethod` has three parameters. The first parameter is defined with `In`, the second with `Out`, and the third with `Optional`.

- Calls `TypeBuilder.CreateType` to complete the type.

After executing `DefineMethod`, the example searches the assemblies that are currently loaded until it finds the dynamic assembly. It loads `MyType` from the assembly, gets a `MethodInfo` object for the `MyMethod` method, and examines the parameters. The example uses the `ParameterInfo.IsIn`, `ParameterInfo.IsOut`, and `ParameterInfo.IsOptional` properties to display information about the parameters.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/IsOut/source.cs._

## ParameterInfo.IsRetval property

```csharp
public bool IsRetval { get; }
```

Gets a value indicating whether this is a `Retval` parameter.

Returns: `true` if the parameter is a `Retval`; otherwise, `false`.

#### Remarks
This method depends on an optional metadata flag. This flag can be inserted by compilers, but the compilers are not obligated to do so.

This method utilizes the `Retval` flag of the `ParameterAttributes` enumerator.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

## ParameterInfo.Member property

```csharp
public virtual System.Reflection.MemberInfo Member { get; }
```

Gets a value indicating the member in which the parameter is implemented.

Returns: The member which implanted the parameter represented by this `ParameterInfo`.

To be added.

## ParameterInfo.MetadataToken <example-value>

```csharp
public virtual int MetadataToken { get; }
```

Gets a value that identifies this parameter in metadata.

Returns: A value which, in combination with the module, uniquely identifies this parameter in metadata.

#### Remarks
To get the module, use the `Module` property of the member that defines this parameter.

The tokens obtained using this property can be passed to the unmanaged Reflection API.

## ParameterInfo.Name property

```csharp
public virtual string? Name { get; }
```

Gets the name of the parameter.

Returns: The simple name of this parameter.

#### Remarks
This property utilizes the protected `NameImpl` field, and depends on an optional metadata flag that might not be available in all compilers.

To get the `ParameterInfo` array, first get the method or the constructor and then call the `MethodBase.GetParameters` method.

> **Warning:**
>  If this `ParameterInfo` represents a return value (that is, if it was obtained by using the `ReturnParameter` property), this property will be `null`.

#### Examples
The following example shows how to get `ParameterInfo` objects for the parameters of a method, and then use the `Name` property to obtain the parameter names.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/Name/source.cs._

## ParameterInfo.ParameterType property

```csharp
public virtual Type ParameterType { get; }
```

Gets the `Type` of this parameter.

Returns: The `Type` object that represents the `Type` of this parameter.

#### Remarks
This method depends on an optional metadata and might not be available in all compilers.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

#### Examples
The following example shows how to get `ParameterInfo` objects for the parameters of a method, and then use the `ParameterType` property to display the type of each parameter.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/ParameterType/source.cs._

## ParameterInfo.Position property

```csharp
public virtual int Position { get; }
```

Gets the zero-based position of the parameter in the formal parameter list.

Returns: An integer representing the position this parameter occupies in the parameter list.

#### Remarks
Only parameters in the method signature (that is, in the formal parameter list) are considered when calculating the position. For instance methods, the hidden parameter that represents `this` (`Me` in Visual Basic) is not counted.

This method utilizes the `PositionImpl` method.

To get the `ParameterInfo` array, first get the method or the constructor and then call `MethodBase.GetParameters`.

## ParameterInfo.RawDefaultValue property

```csharp
public virtual object? RawDefaultValue { get; }
```

Gets a value indicating the default value if the parameter has a default value.

Returns: The default value of the parameter, or `DBNull.Value` if the parameter has no default value.

#### Remarks
This property can be used in both the execution context and the reflection-only context.

The default value is used when an actual value is not specified in the method call. A parameter can have a default value that is `null`. This is distinct from the case where a default value is not defined.

To get the `ParameterInfo` array, first get the method or the constructor and then call the `MethodBase.GetParameters` method.

## ParameterInfo.GetCustomAttributes(Boolean) method

```csharp
public virtual object[] GetCustomAttributes (bool inherit);
```

Gets all the custom attributes defined on this parameter.

Parameters:

- `inherit`: This argument is ignored for objects of this type.

Returns: An array that contains all the custom attributes applied to this parameter.

Exceptions:

- `TypeLoadException`: A custom attribute type could not be loaded.

#### Remarks
This method ignores the `inherit` parameter. To search the inheritance chain for attributes on parameters, use the appropriate overloads of the `Attribute.GetCustomAttributes` method.

#### Examples
The following example shows how custom attributes that have been applied to the parameters of methods can be retrieved at run time. The example defines a custom attribute named `MyAttribute` that can be applied to parameters. The example then defines a class named `MyClass` with a method named `MyMethod`, and applies `MyAttribute` to a parameter of the method.

When the example is run, it uses the `GetCustomAttributes` method to retrieve the custom attributes that have been applied to all parameters of all methods in `MyClass`, and displays them at the console.

_Code sample not included: ~/snippets/csharp/System.Reflection/ParameterInfo/GetCustomAttributes/source.cs._

## ParameterInfo.GetCustomAttributes(Type, Boolean) method

```csharp
public virtual object[] GetCustomAttributes (Type attributeType, bool inherit);
```

Gets the custom attributes of the specified type or its derived types that are applied to this parameter.

Parameters:

- `attributeType`: The custom attributes identified by type.
- `inherit`: This argument is ignored for objects of this type.

Returns: An array that contains the custom attributes of the specified type or its derived types.

Exceptions:

- `ArgumentException`: The type must be a type provided by the underlying runtime system.
- `ArgumentNullException`: `attributeType` is `null`.
- `TypeLoadException`: A custom attribute type could not be loaded.

#### Remarks
This method ignores the `inherit` parameter. To search the inheritance chain for attributes on parameters, use the appropriate overloads of the `Attribute.GetCustomAttributes` method.
