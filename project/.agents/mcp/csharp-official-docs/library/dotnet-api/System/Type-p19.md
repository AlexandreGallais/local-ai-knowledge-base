---
title: "Type class (part 19 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 19 of 33)

## Type.GetProperties(BindingFlags) method

```csharp
public abstract System.Reflection.PropertyInfo[] GetProperties (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the properties of the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of objects representing all properties of the current `Type` that match the specified binding constraints.

-or-

An empty array of type `PropertyInfo`, if the current `Type` does not have properties, or if none of the properties match the binding constraints.

#### Remarks

For the `GetProperties(BindingFlags)` overload to successfully retrieve property information, the `bindingAttr` argument must include at least one of `Instance` and `Static`, along with at least one of `NonPublic` and `Public`.

The following `BindingFlags` filter flags can be used to define which properties to include in the search:

- Specify `BindingFlags.Instance` to include instance methods.

- Specify `BindingFlags.Static` to include static methods.

- Specify `BindingFlags.Public` to include public properties in the search. A property is considered public to reflection if it has at least one accessor that is public.

- Specify `BindingFlags.NonPublic` to include non-public properties (that is, private, internal, and protected properties) in the search. Only protected and internal properties on base classes are returned; private properties on base classes are not returned.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

- Specify `BindingFlags.Default` alone to return an empty `PropertyInfo` array.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.DeclaredOnly` to search only the properties declared on the `Type`, not properties that were simply inherited.

See `BindingFlags` for more information.

The `Type.GetProperties` method returns properties in a deterministic order based upon the metadata ordering in the assembly.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### Examples
The following example defines a class named `PropertyClass` that includes six properties: two are public, one is private, one is protected, one is internal (`Friend` in Visual Basic), and one is protected internal (`Protected Friend` in Visual Basic). It then displays some basic <example-value> information (the property name and type, whether it's read/write, and the visibility of its `get` and `set` accessors) for the properties that match the specified binding constraints.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperties/type_getproperties2.cs._

## Type.GetProperty(String) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name);
```

Searches for the public property with the specified name.

Parameters:

- `name`: The string containing the name of the public property to get.

Returns: An object representing the public property with the specified name, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name.
- `ArgumentNullException`: `name` is `null`.

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

The following example retrieves the `Type` object of a user-defined class, retrieves a property of that class, and displays the property name.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperty/type_getproperty1.cs._

## Type.GetProperty(String, BindingFlags) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, System.Reflection.BindingFlags bindingAttr);
```

Searches for the specified property, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the property to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: An object representing the property that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified binding constraints.
- `ArgumentNullException`: `name` is `null`.

#### Examples
The following example retrieves the type of a user-defined class, retrieves a property of that class and displays the property name in accordance with the specified binding constraints.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperty/type_getproperty2.cs._

## Type.GetProperty(String, Type) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, Type? returnType);
```

Searches for the public property with the specified name and return type.

Parameters:

- `name`: The string containing the name of the public property to get.
- `returnType`: The return type of the property.

Returns: An object representing the public property with the specified name, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name.
- `ArgumentNullException`: `name` is `null`, or `returnType` is `null`.

#### Remarks
A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The search for `name` is case-sensitive. The search includes public static and public instance properties.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### Examples
The following example defines a class with one property and retrieves the name and type of the property.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperty/type_getproperty_types.cs._
