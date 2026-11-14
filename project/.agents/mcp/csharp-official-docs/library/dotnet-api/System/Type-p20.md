---
title: "Type class (part 20 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 20 of 33)

## Type.GetProperty(String, Type[]) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, Type[] types);
```

Searches for the specified public property whose parameters match the specified argument types.

Parameters:

- `name`: The string containing the name of the public property to get.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the indexed property to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a property that is not indexed.

Returns: An object representing the public property whose parameters match the specified argument types, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified argument types.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.
- `ArgumentException`: `types` is multidimensional.
- `NullReferenceException`: An element of `types` is `null`.

#### Remarks
A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The search for `name` is case-sensitive. The search includes public static and public instance properties.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### Examples
The following example retrieves the `Type` object of a user-defined class, retrieves the property of that class, and displays the property name and type of the property as specified by the arguments passed to `GetProperty`.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperty/type_getproperty3.cs._

## Type.GetProperty(String, Type, Type[]) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, Type? returnType, Type[] types);
```

Searches for the specified public property whose parameters match the specified argument types.

Parameters:

- `name`: The string containing the name of the public property to get.
- `returnType`: The return type of the property.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the indexed property to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a property that is not indexed.

Returns: An object representing the public property whose parameters match the specified argument types, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified argument types.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.
- `ArgumentException`: `types` is multidimensional.
- `NullReferenceException`: An element of `types` is `null`.

#### Remarks
A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

The search for `name` is case-sensitive. The search includes public static and public instance properties.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

## Type.GetProperty(String, Type, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.PropertyInfo? GetProperty (string name, Type? returnType, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified public property whose parameters match the specified argument types and modifiers.

Parameters:

- `name`: The string containing the name of the public property to get.
- `returnType`: The return type of the property.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the indexed property to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a property that is not indexed.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the public property that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one property is found with the specified name and matching the specified argument types and modifiers.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.
- `NullReferenceException`: An element of `types` is `null`.

#### Remarks
A property is considered public to reflection if it has at least one accessor that is public. Otherwise the property is considered private, and you must use `NonPublic` | `Instance` | `Static` (in Visual Basic, combine the values using ` Or `) to get it.

Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

The search for `name` is case-sensitive. The search includes public static and public instance properties.

If the current `Type` represents a constructed generic type, this method returns the `PropertyInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the properties of the class constraint.

#### Examples
The following example obtains a `Type` object corresponding to `MyPropertyClass`, and the indexed property of this class is retrieved using the arguments passed to the `GetProperty` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperty/type_getproperty21.cs._
