---
title: "Type class (part 21 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 21 of 33)

## Type.GetProperty(String, BindingFlags, Binder, Type, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type? returnType, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified property whose parameters match the specified argument types and modifiers, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the property to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `returnType`: The return type of the property.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the indexed property to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a property that is not indexed.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the property that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified binding constraints.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.
- `NullReferenceException`: An element of `types` is `null`.

The following guidance applies to all overloads:

- A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.
- If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` with the type parameters replaced by the appropriate type arguments.
- If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### `GetProperty` method

The search for `name` is case-sensitive. The search includes public static and public instance properties.

Situations in which `AmbiguousMatchException` occurs include the following:

- A type contains two indexed properties that have the same name but different numbers of parameters. To resolve the ambiguity, use an overload of the `Type.GetProperty` method that specifies parameter types.
- A derived type declares a property that hides an inherited property with the same name, by using the `new` modifier (`Shadows` in Visual Basic). To resolve the ambiguity, use the `GetProperty` method overload and add the `DeclaredOnly` flag to restrict the search to members that aren't inherited.

#### `GetProperty` method

The following `BindingFlags` filter flags can be used to define which properties to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.
- Specify `BindingFlags.Public` to include public properties in the search.
- Specify `BindingFlags.NonPublic` to include non-public properties (that is, private, internal, and protected properties) in the search.
- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.IgnoreCase` to ignore the case of `name`.
- `BindingFlags.DeclaredOnly` to search only the properties declared on the `Type`, not properties that were simply inherited.

Situations in which `AmbiguousMatchException` occurs include the following:

- A type contains two indexed properties that have the same name but different numbers of parameters. To resolve the ambiguity, use an overload of the `Type.GetProperty` method that specifies parameter types.
- A derived type declares a property that hides an inherited property with the same name, using the `new` modifier (`Shadows` in Visual Basic). To resolve the ambiguity, include `DeclaredOnly` to restrict the search to members that are not inherited.

#### GetProperty(System.String, System.Reflection.BindingFlags, System.Reflection.Binder, System.Type, System.Type[], System.Reflection.ParameterModifier[])) method

Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

The following table shows what members of a base class are returned by the `Get` methods when reflecting on a type.

| Member Type | Static | Non-Static                                         |
|-------------|--------|----------------------------------------------------|
| Constructor | No     | No                                                 |
| Field       | No     | Yes. A field is always hide-by-name-and-signature. |
| Event       | Not applicable | The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature.2 |
| Method      | No     | Yes. A method (both virtual and non-virtual) can be hide-by-name or hide-by-name-and-signature.|
| Nested Type | No | No |
| Property    | Not applicable | The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature.2 |

Notes:

- Hide-by-name-and-signature considers all of the parts of the signature, including custom modifiers, return types, parameter types, sentinels, and unmanaged calling conventions. This is a binary comparison.
- For reflection, properties and events are hide-by-name-and-signature. If you have a property with both a get and a set accessor in the base class, but the derived class has only a get accessor, the derived class property hides the base class property, and you will not be able to access the setter on the base class.
- Custom attributes are not part of the common type system.

The following `BindingFlags` filter flags can be used to define which properties to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.
- Specify `BindingFlags.Public` to include public properties in the search.
- Specify `BindingFlags.NonPublic` to include non-public properties (that is, private, internal, and protected properties) in the search.
- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.IgnoreCase` to ignore the case of `name`.
- `BindingFlags.DeclaredOnly` to search only the properties declared on the `Type`, not properties that were simply inherited.

#### Indexers and default properties

Visual Basic, C#, and C++ have simplified syntax for accessing indexed properties and allow one indexed property to be a default for its type. For example, if the variable `myList` refers to an `ArrayList`, the syntax `myList[3]` (`myList(3)` in Visual Basic) retrieves the element with the index of 3. You can overload the property.

In C#, this feature is called an indexer and cannot be referred to by name. By default, a C# indexer appears in metadata as an indexed property named `Item`. However, a class library developer can use the `IndexerNameAttribute` attribute to change the name of the indexer in the metadata. For example, the `String` class has an indexer named `String.Chars`. Indexed properties created using languages other than C# can have names other than `Item`, as well.

To determine whether a type has a default property, use the `GetCustomAttributes` method to test for the `DefaultMemberAttribute` attribute. If the type has `DefaultMemberAttribute`, the `MemberName` property returns the name of the default property.

## Type.GetPropertyImpl(String, BindingFlags, Binder, Type, Type[], ParameterModifier[]) method

```csharp
protected abstract System.Reflection.PropertyInfo? GetPropertyImpl (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type? returnType, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

When overridden in a derived class, searches for the specified property whose parameters match the specified argument types and modifiers, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the property to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded member, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `returnType`: The return type of the property.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the indexed property to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a property that is not indexed.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the property that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified binding constraints.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.
- `NotSupportedException`: The current type is a `TypeBuilder`, `EnumBuilder`, or `GenericTypeParameterBuilder`.

#### Remarks
Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

The following `BindingFlags` filter flags can be used to define which properties to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public properties in the search.

- Specify `BindingFlags.NonPublic` to include non-public properties (that is, private, internal, and protected properties) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the properties declared on the `Type`, not properties that were simply inherited.

See `BindingFlags` for more information.

## Type.GetRequiredCustomModifiers() method

```csharp
public virtual Type[] GetRequiredCustomModifiers ();
```

When overridden in a derived class, returns the required custom modifiers of the current `Type`.

Returns: An array of `Type` objects that identify the required custom modifiers of the current `Type`.

-or-

An empty array of type `Type`, if the current `Type` has no custom modifiers.

-or-

An empty array of type `Type`, if the current `Type` is not a modified `Type`. A modified `Type` is obtained from `FieldInfo.GetModifiedFieldType`, `PropertyInfo.GetModifiedPropertyType`, or `ParameterInfo.GetModifiedParameterType`.

#### Remarks
The `Type.GetRequiredCustomModifiers` and `Type.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## Type.GetType() method

```csharp
public Type GetType ();
```

Gets the current `Type`.

Returns: The current `Type`.

Exceptions:

- `TargetInvocationException`: A class initializer is invoked and throws an exception.

To be added.
