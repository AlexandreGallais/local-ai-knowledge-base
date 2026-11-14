---
title: "Type class (part 18 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 18 of 33)

## Type.GetNestedType(String, BindingFlags) method

```csharp
public abstract Type? GetNestedType (string name, System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the specified nested type, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the nested type to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: An object representing the nested type that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
Use the simple name of the nested class for `name`. Do not qualify it with the name of the outer class. For a generic nested class, use the mangled name - that is, append a grave accent and the number of generic parameters. For example, use the string "Inner\`1" to get the generic nested class `Inner<T>` (`Inner(Of T)` in Visual Basic). Do not include language-specific syntax for type parameters.

The following `BindingFlags` filter flags can be used to define which nested types to include in the search:

- You must specify either `Public` or `NonPublic` to get a return.

- Specify `Public` to include public nested types in the search.

- Specify `NonPublic` to include non-public nested types (that is, private, internal, and protected nested types) in the search.

This method returns only the nested types of the current type. It does not search the base classes of the current type. To find types that are nested in base classes, you must walk the inheritance hierarchy, calling `Type.GetNestedType` at each level.

`Instance` and `Static` are ignored.

Calling this method with only the `Public` flag or only the `NonPublic` flag will return the specified nested types and does not require any other flags.

See `BindingFlags` for more information.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the nested types of the class constraint.

If a nested type is generic, this method returns its generic type definition. This is true even if the enclosing generic type is a closed constructed type.

> **Note:**
> If the current `Type` represents a generic type defined in C#, Visual Basic, or C++, its nested types are all generic even if they have no generic parameters of their own. This is not necessarily true of nested types defined in dynamic assemblies or compiled with the Ilasm.exe (IL Assembler).

For information on nested generic types, and on constructing nested generic types from their generic type definitions, see `Type.MakeGenericType`.

## Type.GetNestedTypes() method

```csharp
public Type[] GetNestedTypes ();
```

Returns the public types nested in the current `Type`.

Returns: An array of `Type` objects representing the public types nested in the current `Type` (the search is not recursive), or an empty array of type `Type` if no public types are nested in the current `Type`.

#### Remarks
The `Type.GetNestedTypes` method returns types in a deterministic order based upon the metadata ordering in the assembly.

Only the public types immediately nested in the current type are returned; the search is not recursive.

The following table shows what members of a base class are returned by the `Get` methods when reflecting on a type.

|Member Type|Static|Non-Static|
|-----------------|------------|-----------------|
|Constructor|No|No|
|Field|No|Yes. A field is always hide-by-name-and-signature.|
|Event|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|
|Method|No|Yes. A method (both virtual and non-virtual) can be hide-by-name or hide-by-name-and-signature.|
|Nested Type|No|No|
|Property|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|

1. Hide-by-name-and-signature considers all of the parts of the signature, including custom modifiers, return types, parameter types, sentinels, and unmanaged calling conventions. This is a binary comparison.

2. For reflection, properties and events are hide-by-name-and-signature. If you have a property with both a get and a set accessor in the base class, but the derived class has only a get accessor, the derived class property hides the base class property, and you will not be able to access the setter on the base class.

3. Custom attributes are not part of the common type system.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the nested types of the class constraint.

If a nested type is generic, this method returns its generic type definition. This is true even if the enclosing generic type is a closed constructed type.

> **Note:**
> If the current `Type` represents a generic type defined in C#, Visual Basic, or C++, its nested types are all generic even if they have no generic parameters of their own. This is not necessarily true of nested types defined in dynamic assemblies or compiled with the Ilasm.exe (IL Assembler).

For information on nested generic types, and on constructing nested generic types from their generic type definitions, see `Type.MakeGenericType`.

#### Examples
The following example defines a nested class and a `struct` in `MyClass`, and then obtains objects of the nested types using the type of `MyClass`.

_Code sample not included: ~/snippets/csharp/System/Type/GetNestedTypes/type_getnestedtypes.cs._

## Type.GetNestedTypes(BindingFlags) method

```csharp
public abstract Type[] GetNestedTypes (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the types nested in the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: An array of `Type` objects representing all the types nested in the current `Type` that match the specified binding constraints (the search is not recursive), or an empty array of type `Type`, if no nested types are found that match the binding constraints.

#### Remarks
The search for nested types is not recursive.

The `Type.GetNestedTypes` method returns types in a deterministic order based upon the metadata ordering in the assembly.

The following `BindingFlags` filter flags can be used to define which nested types to include in the search:

- You must specify either `Public` or `NonPublic` to get a return.

- Specify `Public` to include public nested types in the search.

- Specify `NonPublic` to include non-public nested types (that is, private, internal, and protected nested types) in the search.

This method returns only the nested types of the current type. It does not search the base classes of the current type. To find types that are nested in base classes, you must walk the inheritance hierarchy, calling `Type.GetNestedTypes` at each level.

`Instance` and `Static` are ignored.

Calling this method with only the `Public` flag or only the `NonPublic` flag will return the specified nested types and does not require any other flags.

See `BindingFlags` for more information.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the nested types of the class constraint.

If a nested type is generic, this method returns its generic type definition. This is true even if the enclosing generic type is a closed constructed type.

> **Note:**
> If the current `Type` represents a generic type defined in C#, Visual Basic, or C++, its nested types are all generic even if they have no generic parameters of their own. This is not necessarily true of nested types defined in dynamic assemblies or compiled with the Ilasm.exe (IL Assembler).

For information on nested generic types, and on constructing nested generic types from their generic type definitions, see `Type.MakeGenericType`.

#### Examples
The following example creates two nested public classes and two nested protected classes, and displays information for classes that match the specified binding constraints.

_Code sample not included: ~/snippets/csharp/System/Type/GetNestedTypes/type_getnestedclassesabs.cs._

## Type.GetNullableUnderlyingType() method

```csharp
public virtual Type? GetNullableUnderlyingType ();
```

Gets the underlying type argument of the current nullable type.

Returns: The underlying type argument if the current type is a constructed `Nullable<T>` type; otherwise, `null`.

Exceptions:

- `NotSupportedException`: The current type is a derived type that doesn't override this method.

Derived classes must override this method. The base implementation throws `NotSupportedException`.

## Type.GetOptionalCustomModifiers() method

```csharp
public virtual Type[] GetOptionalCustomModifiers ();
```

When overridden in a derived class, returns the optional custom modifiers of the current `Type`.

Returns: An array of `Type` objects that identify the optional custom modifiers of the current `Type`.

-or-

An empty array of type `Type`, if the current `Type` has no custom modifiers.

-or-

An empty array of type `Type`, if the current `Type` is not a modified `Type`. A modified `Type` is obtained from `FieldInfo.GetModifiedFieldType`, `PropertyInfo.GetModifiedPropertyType`, or `ParameterInfo.GetModifiedParameterType`.

#### Remarks
The `Type.GetOptionalCustomModifiers` and `Type.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## Type.GetProperties() method

```csharp
public System.Reflection.PropertyInfo[] GetProperties ();
```

Returns all the public properties of the current `Type`.

Returns: An array of `PropertyInfo` objects representing all public properties of the current `Type`.

-or-

An empty array of type `PropertyInfo`, if the current `Type` does not have public properties.

#### Remarks
Calling this overload is equivalent to calling the `GetProperties` overload with a `bindingAttr` argument equal to `BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public` in C# and  `BindingFlags.Instance Or BindingFlags.Static Or BindingFlags.Public` in Visual Basic. It returns all public instance and static properties, both those defined by the type represented by the current `Type` object as well as those inherited from its base types.

A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The `Type.GetProperties` method returns properties in a deterministic order based upon the metadata ordering in the assembly.

The following table shows what members of a base class are returned by the `Get` methods when reflecting on a type.

|Member Type|Static|Non-Static|
|-----------------|------------|-----------------|
|Constructor|No|No|
|Field|No|Yes. A field is always hide-by-name-and-signature.|
|Event|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|
|Method|No|Yes. A method (both virtual and non-virtual) can be hide-by-name or hide-by-name-and-signature.|
|Nested Type|No|No|
|Property|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|

1. Hide-by-name-and-signature considers all of the parts of the signature, including custom modifiers, return types, parameter types, sentinels, and unmanaged calling conventions. This is a binary comparison.

2. For reflection, properties and events are hide-by-name-and-signature. If you have a property with both a get and a set accessor in the base class, but the derived class has only a get accessor, the derived class property hides the base class property, and you will not be able to access the setter on the base class.

3. Custom attributes are not part of the common type system.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### Examples
The following example demonstrates the use of the `GetProperties` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperties/type_gettypecode.cs._
