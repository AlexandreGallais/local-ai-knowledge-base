---
title: "PropertyInfo class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PropertyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyInfo class (part 2 of 3)

## PropertyInfo.GetGetMethod(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo? GetGetMethod (bool nonPublic);
```

When overridden in a derived class, returns the public or non-public `get` accessor for this property.

Parameters:

- `nonPublic`: Indicates whether a non-public `get` accessor should be returned. `true` if a non-public accessor is to be returned; otherwise, `false`.

Returns: A `MethodInfo` object representing the `get` accessor for this property, if `nonPublic` is `true`. Returns `null` if `nonPublic` is `false` and the `get` accessor is non-public, or if `nonPublic` is `true` but no `get` accessors exist.

Exceptions:

- `SecurityException`: The requested method is non-public and the caller does not have `ReflectionPermission` to reflect on this non-public method.

#### Remarks
This property is the `MethodInfo` representing the get accessor.

To use the `GetGetMethod` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetGetMethod` method.

#### Examples
The following example displays the public or non-public `get` accessor for the specified property.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetGetMethod/source.cs._

## PropertyInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## PropertyInfo.GetIndexParameters() method

```csharp
public abstract System.Reflection.ParameterInfo[] GetIndexParameters ();
```

When overridden in a derived class, returns an array of all the index parameters for the property.

Returns: An array of type `ParameterInfo` containing the parameters for the indexes. If the property is not indexed, the array has 0 (zero) elements.

#### Remarks
Extract any required parameter information from the returned array.

To use the `GetIndexParameters` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetIndexParameters` method.

#### Examples
The following example displays the index parameters of the specified property.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetIndexParameters/source.cs._

## PropertyInfo.GetModifiedPropertyType() method

```csharp
public virtual Type GetModifiedPropertyType ();
```

Gets the modified type of this property object.

Returns: A modified type.

#### Remarks
A modified type supports `Type.GetOptionalCustomModifiers`, `Type.GetRequiredCustomModifiers`, and `Type.GetFunctionPointerCallingConventions`, which are used to obtain custom modifiers from a function pointer.

To obtain the normal, unmodified type from a modified type, use `Type.UnderlyingSystemType`.

This method is provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## PropertyInfo.GetOptionalCustomModifiers() method

```csharp
public virtual Type[] GetOptionalCustomModifiers ();
```

Returns an array of types representing the optional custom modifiers of the property.

Returns: An array of `Type` objects that identify the optional custom modifiers of the current property, such as `IsConst` or `IsImplicitlyDereferenced`.

#### Remarks
The `PropertyInfo.GetOptionalCustomModifiers` and `PropertyInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) specification.

## PropertyInfo.GetRawConstantValue() method

```csharp
public virtual object? GetRawConstantValue ();
```

Returns a literal value associated with the property by a compiler.

Returns: An `Object` that contains the literal value associated with the property. If the literal value is a class type with an element value of zero, the return value is `null`.

Exceptions:

- `InvalidOperationException`: The Constant table in unmanaged metadata does not contain a constant value for the current property.
- `FormatException`: The type of the value is not one of the types permitted by the Common Language Specification (CLS). See the ECMA Partition II specification, Metadata Logical Format: Other Structures, Element Types used in Signatures.

#### Remarks
This method is provided for designers of managed compilers and code analyzers.

This method can be used in both the execution context and the reflection-only context.

In unmanaged metadata, the Constant table is used to store constant values for fields, parameters, and properties. Constant information does not directly influence runtime behavior. Compilers inspect this information, at compile time, when importing metadata. If used, the value of a constant is embedded in the Microsoft intermediate language (MSIL) stream the compiler emits. There are no MSIL instructions that can be used to access the Constant table at run time.

> **Note:**
> For more information on constant values and the Constant table, , see Partition II of the Common Language Infrastructure (CLI) specification.

## PropertyInfo.GetRequiredCustomModifiers() method

```csharp
public virtual Type[] GetRequiredCustomModifiers ();
```

Returns an array of types representing the required custom modifiers of the property.

Returns: An array of `Type` objects that identify the required custom modifiers of the current property, such as `IsConst` or `IsImplicitlyDereferenced`.

#### Remarks
The `PropertyInfo.GetOptionalCustomModifiers` and `PropertyInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) specification.

## PropertyInfo.GetSetMethod() method

```csharp
public System.Reflection.MethodInfo? GetSetMethod ();
```

Returns the public `set` accessor for this property.

Returns: The `MethodInfo` object representing the `Set` method for this property if the `set` accessor is public, or `null` if the `set` accessor is not public.

#### Remarks
This is a convenience method that provides an implementation for the abstract `GetSetMethod` method with the `nonPublic` parameter set to `false`.

To use the `GetSetMethod` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetSetMethod` method.

## PropertyInfo.GetSetMethod(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo? GetSetMethod (bool nonPublic);
```

When overridden in a derived class, returns the `set` accessor for this property.

Parameters:

- `nonPublic`: Indicates whether the accessor should be returned if it is non-public. `true` if a non-public accessor is to be returned; otherwise, `false`.

Returns: This property's `Set` method, or `null`, as shown in the following table.

-  The `Set` method for this property.

:  The `set` accessor is public, OR `nonPublic` is `true` and the `set` accessor is non-public.

- `null`: `nonPublic` is `true`, but the property is read-only, OR `nonPublic` is `false` and the `set` accessor is non-public, OR there is no `set` accessor.

Exceptions:

- `SecurityException`: The requested method is non-public and the caller does not have `ReflectionPermission` to reflect on this non-public method.

#### Remarks
To use the `GetSetMethod` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetSetMethod` method.

#### Examples
The following example displays the `set` accessor for the specified property.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetSetMethod/source.cs._

## PropertyInfo.GetValue(Object) method

```csharp
public object? GetValue (object? obj);
```

Returns the property value of a specified object.

Parameters:

- `obj`: The object whose property value will be returned.

Returns: The property value of the specified object.

#### Remarks
You call the `GetValue` overload to retrieve the value of a non-indexed property; if you try to retrieve the value of an indexed property, the method throws a `TargetParameterCountException` exception. You can determine whether a property is indexed or not by calling the `PropertyInfo.GetIndexParameters` method. If the length of the returned `ParameterInfo` array is zero, the property is not indexed.

This is a convenience method that provides an implementation for the abstract `GetValue` method with the `BindingFlags` parameter set to `Default`, the `Binder` set to `null`, the object array of index values set to `null`, and the `CultureInfo` set to `null`.

#### Examples
The following example defines a `Planet` class that has two properties: `Name`, the name of the planet; and `Distance`, the planet's distance from Earth. The example instantiates a `Planet` object that represents the planet Jupiter and passes it to a `GetPropertyValues` method that displays information about the properties and uses the `PropertyInfo.GetValue` method to get the value of each `Planet` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetValue/getvalue1.cs._

## PropertyInfo.GetValue(Object, Object[]) method

```csharp
public virtual object? GetValue (object? obj, object?[]? index);
```

Returns the property value of a specified object with optional index values for indexed properties.

Parameters:

- `obj`: The object whose property value will be returned.
- `index`: Optional index values for indexed properties. The indexes of indexed properties are zero-based. This value should be `null` for non-indexed properties.

Returns: The property value of the specified object.

Exceptions:

- `ArgumentException`: The `index` array does not contain the type of arguments needed.

-or-

The property's `get` accessor is not found.
- `TargetException`: The object does not match the target type, or a property is an instance property but `obj` is `null`.
- `TargetParameterCountException`: The number of parameters in `index` does not match the number of parameters the indexed property takes.
- `MethodAccessException`: There was an illegal attempt to access a private or protected method inside a class.
- `TargetInvocationException`: An error occurred while retrieving the property value. For example, an index value specified for an indexed property is out of range. The `Exception.InnerException` property indicates the reason for the error.

#### Remarks
To determine whether a property is indexed, use the `PropertyInfo.GetIndexParameters` method. If the resulting array has 0 (zero) elements, the property is not indexed.

This is a convenience method that provides an implementation for the abstract `GetValue` method with a `BindingFlags` parameter of `Default`, the `Binder` set to `null`, and the `CultureInfo` set to `null`.

Because static properties belong to the type, not individual objects, get static properties by passing `null` as the object argument. For example, use the following code to get the static `CurrentCulture` property of `CultureInfo` :

```csharp
PropertyInfo CurCultProp =
    (typeof(CultureInfo)).GetProperty("CurrentCulture");
Console.WriteLine("CurrCult: " +
    CurCultProp.GetValue(null,null));
```

To use the `GetValue` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetValue` method.

#### Examples
The following example shows how to get the value of an indexed property. The `String.Chars` property is the default property (the indexer in C#) of the `String` class.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetValue/source.cs._
