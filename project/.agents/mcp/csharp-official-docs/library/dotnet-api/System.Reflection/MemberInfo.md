---
title: "MemberInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MemberInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberInfo class

Namespace: `System.Reflection`

```csharp
public abstract class MemberInfo : System.Reflection.ICustomAttributeProvider
```

Obtains information about the attributes of a member and provides access to member metadata.

#### Remarks
The `MemberInfo` class is the abstract base class for classes used to obtain information about all members of a class (constructors, events, fields, methods, and properties).

This class introduces the basic <example-value> that all members provide.

#### Examples
This example shows how to use various reflection classes to analyze the metadata contained in an assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetReferencedAssemblies/Reflection.cs._

## MemberInfo.MemberInfo() constructor

```csharp
protected MemberInfo ();
```

Initializes a new instance of the `MemberInfo` class.

#### Remarks
Only a derived class can create this `MemberInfo` class.

## MemberInfo.CustomAttributes property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Reflection.CustomAttributeData> CustomAttributes { get; }
```

Gets a collection that contains this member's custom attributes.

Returns: A collection that contains this member's custom attributes.

To be added.

## MemberInfo.DeclaringType property

```csharp
public abstract Type? DeclaringType { get; }
```

Gets the class that declares this member.

Returns: The `Type` object for the class that declares this member.

#### Remarks
The `DeclaringType` property retrieves a reference to the `Type` object for the type that declares this member. A member of a type is either declared by the type or inherited from a base type, so the `Type` object returned by the `DeclaringType` property might not be the same as the `Type` object used to obtain the current `MemberInfo` object.

- If the `Type` object from which this `MemberInfo` object was obtained did not declare this member, the `DeclaringType` property will represent one of its base types.

- If the `MemberInfo` object is a global member (that is, if it was obtained from the `Module.GetMethods` method, which returns global methods on a module), the returned `MemberInfo.DeclaringType` will be `null`.

#### Examples
The following example defines an interface, `IValue`, with a single member, `GetValue`. It also defines four classes: `A`, a base class that implements the `IValue` interface; `B`, which inherits from `A` and hides its implementation of `GetValue` from the base class implementation; `C`, which simply inherits from `A`; and `D`, which inherits from `A` and overrides its `GetValue` method.  The example then retrieves a `MemberInfo` object for each member of the type (including members inherited from `Object`) and displays the value of its `DeclaringType` property.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/DeclaringType/Example2.cs._

Note that the declaring type of `A.GetValue` is `A`, that `B` includes two `GetValue` methods, one declared by `A` and one by `B`, and that the declaring type of `D.GetValue` is `D`.

> **Note:**
>  `DeclaringType` returns only the member names and the names of their declaring types. To return the member names with their prototypes, call `MemberInfo.ToString`.

## MemberInfo.IsCollectible property

```csharp
public virtual bool IsCollectible { get; }
```

Gets a value that indicates whether this `MemberInfo` object references one or more assemblies held in a collectible `AssemblyLoadContext`.

Returns: `true` if the `MemberInfo` references one or more assemblies held in a collectible assembly load context; otherwise, `false`.

To be added.

## MemberInfo.MemberType property

```csharp
public abstract System.Reflection.MemberTypes MemberType { get; }
```

When overridden in a derived class, gets a `MemberTypes` value indicating the type of the member - method, constructor, event, and so on.

Returns: A `MemberTypes` value indicating the type of member.

#### Remarks
This property is overridden in derived classes, and the override returns the appropriate member type. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property can be used to determine the member type of any given member.

To get the `MemberType` property, get the class `Type`. From the `Type`, get the `MethodInfo` array. From the `MethodInfo` array, get the `MemberTypes`.

#### Examples
The following example displays the member name and type of a specified class.

_Code sample not included: ~/snippets/csharp/System.Reflection/ConstructorInfo/MemberType/source.cs._

## MemberInfo.MetadataToken <example-value>

```csharp
public virtual int MetadataToken { get; }
```

Gets a value that identifies a metadata element.

Returns: A value which, in combination with `MemberInfo.Module`, uniquely identifies a metadata element.

Exceptions:

- `InvalidOperationException`: The current `MemberInfo` represents an array method, such as `Address`, on an array type whose element type is a dynamic type that has not been completed. To get a metadata token in this case, pass the `MemberInfo` object to the `ModuleBuilder.GetMethodToken` method; or use the `ModuleBuilder.GetArrayMethodToken` method to get the token <example-value>, instead of using the `ModuleBuilder.GetArrayMethod` method to get a `MethodInfo` first.

#### Remarks
The tokens obtained using this property can be passed to the unmanaged reflection API.

> **Note:**
> Using the unmanaged reflection API requires familiarity with the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics" and "Partition III: CIL Instruction Set". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## MemberInfo.Module property

```csharp
public virtual System.Reflection.Module Module { get; }
```

Gets the module in which the type that declares the member represented by the current `MemberInfo` is defined.

Returns: The `Module` in which the type that declares the member represented by the current `MemberInfo` is defined.

Exceptions:

- `NotImplementedException`: This method is not implemented.

#### Remarks
This property is provided as a convenience. It is equivalent to using the `DeclaringType` property to get the type in which the method is declared, and then calling the `Module` property of the resulting `Type` object.

#### Examples
The following code example declares a class that inherits `Object` and overrides `Object.ToString`. The example obtains `MethodInfo` objects for the class's `ToString` method and for the inherited `Object.GetHashCode` method, and displays the names of the modules in which the two methods are declared.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/Module/source.cs._

## MemberInfo.Name property

```csharp
public abstract string Name { get; }
```

Gets the name of the current member.

Returns: A `String` containing the name of this member.

#### Remarks
Only the simple name of the member is returned, not the fully qualified name.

To get the `Name` property, get the class `Type`. From the `Type`, get the `MemberInfo` array. From a `MemberInfo` element of the array, obtain the `Name` property.

#### Examples
This example lists the `Name` and `DeclaringType` property of each member of the specified class.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/Name/source.cs._

## MemberInfo.ReflectedType property

```csharp
public abstract Type? ReflectedType { get; }
```

Gets the class object that was used to obtain this instance of `MemberInfo`.

Returns: The `Type` object through which this `MemberInfo` object was obtained.

#### Remarks
The `ReflectedType` property retrieves the `Type` object that was used to obtain this instance of `MemberInfo`. This may differ from the value of the `DeclaringType` property if this `MemberInfo` object represents a member that is inherited from a base class.

If the `MemberInfo` object is a global member (that is, if it was obtained from the `Module.GetMethods` method, which returns global methods on a module), the returned `MemberInfo.DeclaringType` will be `null`.

#### Examples
The following code example shows how the `MemberInfo.ReflectedType` changes when the member `Object.ToString` is viewed from a `MemberInfo` obtained from type `Object` and from a `MemberInfo` obtained from the `MemberInfo` class itself, which inherits `Object` but does not override `Object.ToString`.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/ReflectedType/source.cs._

## MemberInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## MemberInfo.GetCustomAttributes(Boolean) method

```csharp
public abstract object[] GetCustomAttributes (bool inherit);
```

When overridden in a derived class, returns an array of all custom attributes applied to this member.

Parameters:

- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`. This parameter is ignored for properties and events.

Returns: An array that contains all the custom attributes applied to this member, or an array with zero elements if no attributes are defined.

Exceptions:

- `InvalidOperationException`: This member belongs to a type that is loaded into the reflection-only context. See How to: Load Assemblies into the Reflection-Only Context.
- `TypeLoadException`: A custom attribute type could not be loaded.

#### Remarks
This method ignores the `inherit` parameter for properties and events. To search the inheritance chain for attributes on properties and events, use the appropriate overloads of the `Attribute.GetCustomAttributes` method.

#### Examples
The following example defines a custom attribute and associates the attribute with `MyClass.MyMethod`, retrieves the attribute at run time, and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/GetCustomAttributes/memberinfo_getcustomattributes1.cs._

## MemberInfo.GetCustomAttributes(Type, Boolean) method

```csharp
public abstract object[] GetCustomAttributes (Type attributeType, bool inherit);
```

When overridden in a derived class, returns an array of custom attributes applied to this member and identified by `Type`.

Parameters:

- `attributeType`: The type of attribute to search for. Only attributes that are assignable to this type are returned.
- `inherit`: `true` to search this member's inheritance chain to find the attributes; otherwise, `false`. This parameter is ignored for properties and events.

Returns: An array of custom attributes applied to this member, or an array with zero elements if no attributes assignable to `attributeType` have been applied.

Exceptions:

- `TypeLoadException`: A custom attribute type cannot be loaded.
- `ArgumentNullException`: If `attributeType` is `null`.
- `InvalidOperationException`: This member belongs to a type that is loaded into the reflection-only context. See How to: Load Assemblies into the Reflection-Only Context.

#### Remarks
This method ignores the `inherit` parameter for properties and events. To search the inheritance chain for attributes on properties and events, use the appropriate overloads of the `Attribute.GetCustomAttributes` method.

#### Examples
The following example defines a class named `BaseClass` that has two non-inherited members: a thread static field named `total` and a non-CLS-compliant method named `MethodA`.  A class named `DerivedClass` inherits from `BaseClass` and overrides its `MethodA` method. Note that no attributes are applied to the members of `DerivedClass`. The example iterates the members of `DerivedClass` to determine whether the `CLSCompliantAttribute` or `ThreadStaticAttribute` attribute as been applied to them. Because `inherit` is `true`, the method searches the inheritance hierarchy of `DerivedClass` for the specified attribute. As the output from the example shows, the `total` field is decorated with the `ThreadStaticAttribute` attribute, and the `MethodA` method is decorated with the `CLSCompliantAttribute` attribute.

_Code sample not included: ~/snippets/csharp/System.Reflection/MemberInfo/GetCustomAttributes/GetCustomAttributes1.cs._

## MemberInfo.GetCustomAttributesData() method

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributesData ();
```

Returns a list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target member.

Returns: A generic list of `CustomAttributeData` objects representing data about the attributes that have been applied to the target member.

#### Remarks
Use this method to examine the custom attributes of code in the reflection-only context, in cases where the custom attributes themselves are defined in code that is loaded into the reflection-only context. Methods like `Attribute.GetCustomAttributes` and `MemberInfo.GetCustomAttributes` cannot be used in such cases, because they create instances of the attributes. Code in the reflection-only context cannot be executed. For more information and for example code, see the `CustomAttributeData` class.

This method gets custom attribute data for types, nested types, and type members, because the `Type` class and the classes in the `Reflection` namespace that represent type members all derive from `MemberInfo`.

## MemberInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## MemberInfo.HasSameMetadataDefinitionAs(MemberInfo) method

```csharp
public virtual bool HasSameMetadataDefinitionAs (System.Reflection.MemberInfo other);
```

To be added.

Parameters:

- `other`: To be added.

Returns: To be added.

To be added.
