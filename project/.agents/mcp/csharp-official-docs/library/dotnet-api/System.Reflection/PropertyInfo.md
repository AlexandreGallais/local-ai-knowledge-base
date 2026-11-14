---
title: "PropertyInfo class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PropertyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyInfo class

Namespace: `System.Reflection`

```csharp
public abstract class PropertyInfo : System.Reflection.MemberInfo
```

Discovers the attributes of a property and provides access to property metadata.

#### Remarks
Properties are logically the same as fields. A property is a named aspect of an object's state whose value is typically accessible through `get` and `set` accessors. Properties may be read-only, in which case a set routine is not supported.

> **Note:**
> To determine whether a property is `static`, you must obtain the `MethodInfo` for the `get` or `set` accessor, by calling the `PropertyInfo.GetGetMethod` or the `PropertyInfo.GetSetMethod` method, and examine its `IsStatic` property.

Several methods in this class assume that the `get` accessor and `set` accessor methods of a property have certain formats. The signatures of the `get` and `set` methods must match the following convention:

- The return type of the `get` method and the last argument of the `set` method must be identical. This is the type of the property.

- The `get` and `set` methods must have the same number, type, and order of indices.

If this format is not followed, the behavior of the `GetValue` and `SetValue` methods is undefined.

Calling `ICustomAttributeProvider.GetCustomAttributes` on `PropertyInfo` when the `inherit` parameter of `GetCustomAttributes` is `true` does not walk the type hierarchy. Use `Attribute` to inherit custom attributes.

#### Examples
This example shows how to use various reflection classes to analyze the metadata contained in an assembly.

> **Note:**
> This example generates about 55,000 lines of data, which you can redirect to a text file at the command prompt, as follows: **example.exe > propertyinfo.txt**

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetReferencedAssemblies/Reflection.cs._

## PropertyInfo.PropertyInfo() constructor

```csharp
protected PropertyInfo ();
```

Initializes a new instance of the `PropertyInfo` class.

To be added.

## PropertyInfo.Attributes property

```csharp
public abstract System.Reflection.PropertyAttributes Attributes { get; }
```

Gets the attributes for this property.

Returns: The attributes of this property.

#### Remarks
The `Attributes` property returns the attributes associated with the property represented by this `PropertyInfo` object. The attributes are primarily modifiers applied by a compiler when creating a property; they indicate whether a property is the default property, a `SpecialName` property, and so on. Note that, for almost all properties found in types in the .NET class library, the value of the `Attributes` property is `None`.

> **Tip:**
> In most cases, you probably want to retrieve the custom attributes associated with a property. To do this, retrieve the value of the `CustomAttributes` property, or call one of the overloads of the `MemberInfo.GetCustomAttributes` method.

To get the `Attributes` property:

1. Get a `Type` object that represents the type to which the property belongs.
2. Get the `PropertyInfo` object by calling an overload of the `Type.GetProperty` method.
3. Retrieve the property's attributes from the `Attributes` property.

You can define the attributes of a property for a type created dynamically using reflection emit by calling an overload of the `TypeBuilder.DefineProperty` method and supplying a value for the `attributes` argument.

## PropertyInfo.CanRead property

```csharp
public abstract bool CanRead { get; }
```

Gets a value indicating whether the property can be read.

Returns: `true` if this property can be read; otherwise, `false`.

#### Remarks
If the property does not have a `get` accessor, it cannot be read.

To get the `CanRead` property, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, get the `CanRead` value.

#### Examples
The following example defines two properties. The first property is readable and the `CanRead` property is `true`. The second property is not readable (there is no get accessor), and the `CanRead` property is `false`.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/CanRead/source.cs._

## PropertyInfo.CanWrite property

```csharp
public abstract bool CanWrite { get; }
```

Gets a value indicating whether the property can be written to.

Returns: `true` if this property can be written to; otherwise, `false`.

#### Remarks
`PropertyInfo.CanWrite` returns `true` if the property has a `set` accessor, even if the accessor is `private`, `internal` (or `Friend` in Visual Basic), or `protected`.  If the property does not have a `set` accessor, the method returns `false`.

To get the value of the `CanWrite` property:

1. Get the `Type` object of the type that includes the property.

2. Call the `Type.GetProperty` to get the `PropertyInfo` object that represents the property.

3. Retrieve the value of the `CanWrite` property.

#### Examples
The following example defines two properties. The first property is writable and the `CanWrite` property is `true`. The second property is not writable (there is no `set` accessor), and the `CanWrite` property is `false`.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/CanWrite/source.cs._

## PropertyInfo.GetMethod property

```csharp
public virtual System.Reflection.MethodInfo? GetMethod { get; }
```

Gets the `get` accessor for this property.

Returns: The `get` accessor for this property.

To be added.

## PropertyInfo.IsSpecialName property

```csharp
public bool IsSpecialName { get; }
```

Gets a value indicating whether the property is the special name.

Returns: `true` if this property is the special name; otherwise, `false`.

#### Remarks
The `SpecialName` bit is set to flag members that are treated in a special way by some compilers (such as property accessors and operator overloading methods).

To get the `IsSpecialName` property, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, get the `IsSpecialName` value.

## PropertyInfo.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is a property.

Returns: A `MemberTypes` value indicating that this member is a property.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `Property` only when a given member is a property.

`MemberType` is a derived class of `MemberInfo` and specifies the type of member this is. Member types are constructors, properties, fields, and methods. Since this is a `PropertyInfo` property, the returned type is a property.

To get the `MemberType` property, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, get the `MemberType` value.

#### Examples
The following example displays the type of the specified member.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/MemberType/source.cs._

## PropertyInfo.PropertyType property

```csharp
public abstract Type PropertyType { get; }
```

Gets the type of this property.

Returns: The type of this property.

#### Remarks
To determine the type of a particular property, do the following:

1. Get a `Type` object that represents the type (the class or structure) that contains the property. If you are working with an object (an instance of a type), you can call its `Object.GetType` method. Otherwise, you can use the C#  operator or the Visual Basic <example-value> operator, as the example illustrates.

2. Get a `PropertyInfo` object that represents the property in which you're interested. You can do this by getting an array of all properties from the `Type.GetProperties` method and then iterating the elements in the array, or you can retrieve the `PropertyInfo` object that represents the property directly by calling the `Type.GetProperty` method and specifying the property name.

3. Retrieve the value of the `PropertyType` property from the `PropertyInfo` object.

#### Examples
The following example defines an `Employee` class that has five properties. It then uses retrieves an array of `PropertyInfo` objects that represent those properties and displays the name and type of each.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/PropertyType/propertytype1.cs._

## PropertyInfo.SetMethod property

```csharp
public virtual System.Reflection.MethodInfo? SetMethod { get; }
```

Gets the `set` accessor for this property.

Returns: The `set` accessor for this property, or `null` if the property is read-only.

#### Remarks
Retrieving the value of the `SetMethod` property is equivalent to calling the `GetSetMethod` method with a value of `true` for the `nonPublic` argument.

## PropertyInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## PropertyInfo.GetAccessors() method

```csharp
public System.Reflection.MethodInfo[] GetAccessors ();
```

Returns an array whose elements reflect the public `get` and `set` accessors of the property reflected by the current instance.

Returns: An array of `MethodInfo` objects that reflect the public `get` and `set` accessors of the property reflected by the current instance, if found; otherwise, this method returns an array with zero (0) elements.

#### Remarks
To call the `PropertyInfo.GetAccessors` method:

1.Get a `Type` object that represents the class.
2.From the `Type` object, get the `PropertyInfo` object.
3.From the `PropertyInfo` object, call the `PropertyInfo.GetAccessors` method.

#### Examples
The following example retrieves the public accessors of the `ClassWithProperty.Caption` property and displays information about them. It also calls the `MethodBase.Invoke` method of the setter to set the property value and of the getter to retrieve the property value.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetAccessors/source1.cs._

## PropertyInfo.GetAccessors(Boolean) method

```csharp
public abstract System.Reflection.MethodInfo[] GetAccessors (bool nonPublic);
```

Returns an array whose elements reflect the public and, if specified, non-public `get` and `set` accessors of the property reflected by the current instance.

Parameters:

- `nonPublic`: Indicates whether non-public methods should be returned in the returned array. `true` if non-public methods are to be included; otherwise, `false`.

Returns: An array whose elements reflect the `get` and `set` accessors of the property reflected by the current instance. If `nonPublic` is `true`, this array contains public and non-public `get` and `set` accessors. If `nonPublic` is `false`, this array contains only public `get` and `set` accessors. If no accessors with the specified visibility are found, this method returns an array with zero (0) elements.

#### Remarks

To call the `PropertyInfo.GetAccessors` method:

1. Get a `Type` object that represents the class.
2. From the `Type` object, get the `PropertyInfo` object.
3. From the `PropertyInfo` object, call the `PropertyInfo.GetAccessors` method.

#### Examples
The following example retrieves the accessors of the `ClassWithProperty.Caption` property and displays information about them. It also calls the `MethodBase.Invoke` method of the setter to set the property value and of the getter to retrieve the property value.

_Code sample not included: ~/snippets/csharp/System.Reflection/PropertyInfo/GetAccessors/source.cs._

## PropertyInfo.GetConstantValue() method

```csharp
public virtual object? GetConstantValue ();
```

Returns a literal value associated with the property by a compiler.

Returns: An `Object` that contains the literal value associated with the property. If the literal value is a class type with an element value of zero, the return value is `null`.

Exceptions:

- `InvalidOperationException`: The Constant table in unmanaged metadata does not contain a constant value for the current property.
- `FormatException`: The type of the value is not one of the types permitted by the Common Language Specification (CLS). See the ECMA Partition II specification, Metadata.

#### Remarks
This method is provided for designers of managed compilers and code analyzers.

> **Note:**
> Do not use this method in the reflection-only context, because it might cause code to execute. Use the `PropertyInfo.GetRawConstantValue` method instead.

In unmanaged metadata, the Constant table is used to store constant values for fields, parameters, and properties. Constant information does not directly influence runtime behavior. Compilers inspect this information, at compile time, when importing metadata. If used, the value of a constant is embedded in the Microsoft intermediate language (MSIL) stream the compiler emits. There are no MSIL instructions that can be used to access the Constant table at run time.

> **Note:**
> For more information on constant values and the Constant table, see Partition II of the Common Language Infrastructure (CLI) specification.

## PropertyInfo.GetGetMethod() method

```csharp
public System.Reflection.MethodInfo? GetGetMethod ();
```

Returns the public `get` accessor for this property.

Returns: A `MethodInfo` object representing the public `get` accessor for this property, or `null` if the `get` accessor is non-public or does not exist.

#### Remarks
This is a convenience method that provides an implementation for the abstract `GetGetMethod` method with the `nonPublic` parameter set to `false`.

To use the `GetGetMethod` method, first get the class `Type`. From the `Type`, get the `PropertyInfo`. From the `PropertyInfo`, use the `GetGetMethod` method.
