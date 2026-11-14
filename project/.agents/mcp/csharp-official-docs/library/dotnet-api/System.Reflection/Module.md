---
title: "Module class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Module.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Module class

Namespace: `System.Reflection`

```csharp
public abstract class Module : System.Reflection.ICustomAttributeProvider, System.Runtime.Serialization.ISerializable
```

Performs reflection on a module.

#### Remarks
A module is a portable executable file, such as type.dll or application.exe, consisting of one or more classes and interfaces. There can be multiple namespaces contained in a single module, and a namespace can span multiple modules.

One or more modules deployed as a unit compose an assembly. For information about creating an assembly with more than one module, see Multifile Assemblies.

#### Examples
The following code examples show how to use reflection to get information about modules:

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/Overview/source.cs._

## Module.Module() constructor

```csharp
protected Module ();
```

Initializes a new instance of the `Module` class.

#### Remarks
This constructor is invoked by derived classes during the construction of `Module` objects.

## Module.Assembly property

```csharp
public virtual System.Reflection.Assembly Assembly { get; }
```

Gets the appropriate `Assembly` for this instance of `Module`.

Returns: An `Assembly` object.

#### Examples
The following example displays the full name of the specified assembly in the specified module.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/Assembly/class1.cs._

## Module.CustomAttributes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.CustomAttributeData> CustomAttributes { get; }
```

Gets a collection that contains this module's custom attributes.

Returns: A collection that contains this module's custom attributes.

To be added.

## Module.FullyQualifiedName property

```csharp
public virtual string FullyQualifiedName { get; }
```

Gets a string representing the fully qualified name and path to this module.

Returns: The fully qualified module name.

Exceptions:

- `SecurityException`: The caller does not have the required permissions.

#### Remarks
To get the name without the path, use `Module.Name`.

If the assembly for this module was loaded from a byte array then the `FullyQualifiedName` for the module will be: \<Unknown>.

> **Note:**
>  The case of module name is platform-dependent.

#### Examples
The following example displays the fully qualified name of the specified module.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/FullyQualifiedName/class1.cs._

## Module.MDStreamVersion property

```csharp
public virtual int MDStreamVersion { get; }
```

Gets the metadata stream version.

Returns: A 32-bit integer representing the metadata stream version. The high-order two bytes represent the major version number, and the low-order two bytes represent the minor version number.

#### Remarks

> **Note:**
> For more information on the metadata header, see "Partition II: Metadata Definition and Semantics" in the ECMA 335 Common Language Infrastructure (CLI) specification.

## Module.MetadataToken <example-value>

```csharp
public virtual int MetadataToken { get; }
```

Gets a token that identifies the module in metadata.

Returns: An integer token that identifies the current module in metadata.

#### Remarks
The tokens obtained using this property can be passed to the unmanaged Reflection API.

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## Module.ModuleHandle property

```csharp
public ModuleHandle ModuleHandle { get; }
```

Gets a handle for the module.

Returns: A `ModuleHandle` structure for the current module.

To be added.

## Module.ModuleVersionId property

```csharp
public virtual Guid ModuleVersionId { get; }
```

Gets a universally unique identifier (UUID) that can be used to distinguish between two versions of a module.

Returns: A `Guid` that can be used to distinguish between two versions of a module.

#### Remarks
In unmanaged metadata, the GUID returned by the `ModuleVersionId` property is referred to as the `mvid`, and is stored in the GUID heap.

> **Note:**
>  More information about metadata can be found in the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## Module.Name property

```csharp
public virtual string Name { get; }
```

Gets a `String` representing the name of the module with the path removed.

Returns: The module name with no path.

#### Remarks
`Name` is a platform-dependent string.

If the assembly for this module was loaded from a byte array then the `FullyQualifiedName` for the module will be: \<Unknown>.

To get the name and the path, use `Module.FullyQualifiedName`.

#### Examples
This example shows the effect of the `ScopeName`, `FullyQualifiedName`, and `Name` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/Name/source.cs._

## Module.ScopeName property

```csharp
public virtual string ScopeName { get; }
```

Gets a string representing the name of the module.

Returns: The module name.

#### Remarks
The `ScopeName` property is not used by the common language runtime, but you can use it to store any string you want in the property when you emit a module using the metadata APIs. Reflection itself does not allow you to set the `ScopeName` property.

#### Examples
This example shows the effect of the `ScopeName`, `FullyQualifiedName`, and `Name` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/ScopeName/source.cs._

## Module.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether this module and the specified object are equal.

Parameters:

- `o`: The object to compare with this instance.

Returns: `true` if `o` is equal to this instance; otherwise, `false`.

To be added.

## Module.FindTypes(TypeFilter, Object) method

```csharp
public virtual Type[] FindTypes (System.Reflection.TypeFilter? filter, object? filterCriteria);
```

Returns an array of classes accepted by the given filter and filter criteria.

Parameters:

- `filter`: The delegate used to filter the classes.
- `filterCriteria`: An Object used to filter the classes.

Returns: An array of type `Type` containing classes that were accepted by the filter.

Exceptions:

- `ReflectionTypeLoadException`: One or more classes in a module could not be loaded.

#### Remarks
`ReflectionTypeLoadException` is a special class load exception. The `ReflectionTypeLoadException.Types` property contains the array of classes that were defined in the module and were loaded. This array may contain some null values. The `ReflectionTypeLoadException.LoaderExceptions` property is an array of exceptions that represent the exceptions that were thrown by the class loader. The holes in the class array line up with the exceptions.

The delegate given by `filter` is called for each class in the module, passing along the `Type` object representing the class as well as the given `filterCriteria`. If `filter` returns a particular class, that class will be included in the returned array. If `filter` returns `null`, all classes are returned and `filterCriteria` is ignored.

`FindTypes` cannot be used to look up parameterized types such as arrays.

#### Examples
The following example demonstrates the `FindTypes` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/FilterTypeName/class1.cs._

## Module.GetCustomAttributes(Boolean) method

```csharp
public virtual object[] GetCustomAttributes (bool inherit);
```

Returns all custom attributes.

Parameters:

- `inherit`: This argument is ignored for objects of this type.

Returns: An array of type `Object` containing all custom attributes.

#### Examples
The following example displays the module names that match the specified search criteria.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/GetCustomAttributes/class1.cs._

## Module.GetCustomAttributes(Type, Boolean) method

```csharp
public virtual object[] GetCustomAttributes (Type attributeType, bool inherit);
```

Gets custom attributes of the specified type.

Parameters:

- `attributeType`: The type of attribute to get.
- `inherit`: This argument is ignored for objects of this type.

Returns: An array of type `Object` containing all custom attributes of the specified type.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not a `Type` object supplied by the runtime. For example, `attributeType` is a `TypeBuilder` object.

#### Examples
The following example displays the module names of the specified type that match the specified search criteria.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/GetCustomAttributes/class11.cs._

## Module.GetCustomAttributesData() method

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributesData ();
```

Returns a list of `CustomAttributeData` objects for the current module, which can be used in the reflection-only context.

Returns: A generic list of `CustomAttributeData` objects representing data about the attributes that have been applied to the current module.

#### Remarks
Use this method to examine the custom attributes of code in the reflection-only context, in cases where the custom attributes themselves are defined in code that is loaded into the reflection-only context. Methods such as `Attribute.GetCustomAttributes` and `Module.GetCustomAttributes` cannot be used in such cases, because they create instances of the attributes. Code in the reflection-only context cannot be executed. For more information and example code, see the `CustomAttributeData` class.

## Module.GetField(String) method

```csharp
public System.Reflection.FieldInfo? GetField (string name);
```

Returns a field having the specified name.

Parameters:

- `name`: The field name.

Returns: A `FieldInfo` object having the specified name, or `null` if the field does not exist.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

To be added.

## Module.GetField(String, BindingFlags) method

```csharp
public virtual System.Reflection.FieldInfo? GetField (string name, System.Reflection.BindingFlags bindingAttr);
```

Returns a field having the specified name and binding attributes.

Parameters:

- `name`: The field name.
- `bindingAttr`: One of the `BindingFlags` bit flags used to control the search.

Returns: A `FieldInfo` object having the specified name and binding attributes, or `null` if the field does not exist.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

To be added.

## Module.GetFields() method

```csharp
public System.Reflection.FieldInfo[] GetFields ();
```

Returns the global fields defined on the module.

Returns: An array of `FieldInfo` objects representing the global fields defined on the module; if there are no global fields, an empty array is returned.

#### Remarks
The `Module.GetFields` method does not return fields in a particular order, such as alphabetical or declaration order. Your code must not depend on the order in which fields are returned, because that order can vary.

## Module.GetFields(BindingFlags) method

```csharp
public virtual System.Reflection.FieldInfo[] GetFields (System.Reflection.BindingFlags bindingFlags);
```

Returns the global fields defined on the module that match the specified binding flags.

Parameters:

- `bindingFlags`: A bitwise combination of `BindingFlags` values that limit the search.

Returns: An array of type `FieldInfo` representing the global fields defined on the module that match the specified binding flags; if no global fields match the binding flags, an empty array is returned.

#### Remarks
The `Module.GetFields` method does not return fields in a particular order, such as alphabetical or declaration order. Your code must not depend on the order in which fields are returned, because that order can vary.

## Module.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Module.GetMethod(String) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name);
```

Returns a method having the specified name.

Parameters:

- `name`: The method name.

Returns: A `MethodInfo` object having the specified name, or `null` if the method does not exist.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

To be added.

## Module.GetMethod(String, Type[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, Type[] types);
```

Returns a method having the specified name and parameter types.

Parameters:

- `name`: The method name.
- `types`: The parameter types to search for.

Returns: A `MethodInfo` object in accordance with the specified criteria, or `null` if the method does not exist.

Exceptions:

- `ArgumentNullException`: `name` is `null`, `types` is `null`, or `types` (i) is `null`.

To be added.

## Module.GetMethod(String, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Returns a method having the specified name, binding information, calling convention, and parameter types and modifiers.

Parameters:

- `name`: The method name.
- `bindingAttr`: One of the `BindingFlags` bit flags used to control the search.
- `binder`: An object that implements `Binder`, containing properties related to this method.
- `callConvention`: The calling convention for the method.
- `types`: The parameter types to search for.
- `modifiers`: An array of parameter modifiers used to make binding work with parameter signatures in which the types have been modified.

Returns: A `MethodInfo` object in accordance with the specified criteria, or `null` if the method does not exist.

Exceptions:

- `ArgumentNullException`: `name` is `null`, `types` is `null`, or `types` (i) is `null`.

To be added.
