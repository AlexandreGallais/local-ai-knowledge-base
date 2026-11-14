---
title: "Type class (part 15 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 15 of 33)

## Type.GetMethod(String, BindingFlags) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr);
```

Searches for the specified method, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the method to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.

Returns: An object representing the method that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and matching the specified binding constraints.
- `ArgumentNullException`: `name` is `null`.

#### Remarks
The following `BindingFlags` filter flags can be used to define which methods to include in the search:

- You must specify either `Instance` or `Static` in order to get a return.

- Specify `Public` to include public methods in the search.

- Specify `NonPublic` to include non-public methods (that is, private, internal, and protected methods) in the search.

- Specify `FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `IgnoreCase` to ignore the case of `name`.

-   `DeclaredOnly` to search only the methods declared on the `Type`, not methods that were simply inherited.

See `BindingFlags` for more information.

If a method is overloaded and more than one overload meets the constraints specified by the `bindingAttr` argument, the method throws an `AmbiguousMatchException` exception. In the following example, an exception is thrown because:

- The `TestClass` type has two public instance overloads of the `DisplayValue` method, `DisplayValue(String)` and `DisplayValue(String, Object[])`.

- The `TestClass` type has two public instance overloads of the `Equals` method,  one of which is inherited from `Object`: `Equals(TestClass)` and `Equals(Object)`.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/GetMethodWithOverloads1.cs._

You can do one of the following to retrieve a specific method:

- Change the binding constraints. In the previous example, attempting to retrieve a public instance `Equals` method that is declared by the type and not inherited successfully retrieves `Equals(TestClass)`.

- Call an overload of the `Type.GetMethod` method that includes a `types` parameter which defines the types of the method's parameters.

- Call the `GetMethods` method to retrieve an array containing all of the methods belonging to a type that have the specified binding attributes. You can then iterate it to identify the duplicate methods named `name`. This approach is illustrated in the previous example's handler for the `AmbiguousMatchException` exception.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example gets the method that matches the specified binding flags.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/type_getmethod2.cs._

## Type.GetMethod(String, Type[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, Type[] types);
```

Searches for the specified public method whose parameters match the specified argument types.

Parameters:

- `name`: The string containing the name of the public method to get.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.

Returns: An object representing the public method whose parameters match the specified argument types, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and specified parameters.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

#### Remarks
The search for `name` is case-sensitive. The search includes public static and public instance methods.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> The `name` parameter cannot include type arguments. For example, the C# code `GetMethod("MyGenericMethod<int>")` searches for a method with the text name "`MyGenericMethod<int>`", rather than for a method named `MyGenericMethod` that has one generic argument of type `int`. Instead, use `GetMethod("MyGenericMethod")` with the appropriate parameter in the `types` array.

#### Examples
The following example finds specific overloads of `MethodA`, specifying a variety of argument types.

> **Note:**
> The Visual C# 2005 example requires the `/unsafe` compiler option.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/type_getmethod4.cs._

The following example retrieves `MethodInfo` objects that represent the `Add` methods  of a non-generic type (the `ArrayList` class), an open generic type (the `List<T>` class), and a closed generic type (the `List(Of String)` type.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/GetMethod1.cs._

The example defines a `GetAddMethod` method that retrieves the appropriate `MethodInfo` object. To provide the `types` argument for an open generic type, it calls the `Type.GetGenericArguments` method. To provide the `types` argument for a closed generic type, it retrieves the value of the `GenericTypeArguments` property.

## Type.GetMethod(String, Int32, Type[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, int genericParameterCount, Type[] types);
```

Searches for the specified public method whose parameters match the specified generic parameter count and argument types.

Parameters:

- `name`: The string containing the name of the public method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.

Returns: An object representing the public method whose parameters match the specified generic parameter count and argument types, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in the `types` array is `null`.
- `ArgumentException`: `genericParameterCount` is negative.

To be added.

## Type.GetMethod(String, BindingFlags, Type[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr, Type[] types);
```

Searches for the specified method whose parameters match the specified argument types, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the method to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.
-or- Default to return `null`.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.
-or- An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.

Returns: An object representing the method that matches the specified requirements, if found; otherwise, `null`.

To be added.

## Type.GetMethod(String, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified public method whose parameters match the specified argument types and modifiers.

Parameters:

- `name`: The string containing the name of the public method to get.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the public method that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and specified parameters.
- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

#### Remarks
Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

The search for `name` is case-sensitive. The search includes public static and public instance methods.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMethod("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`. Instead, use `GetMethod("MyMethod")` with the appropriate parameter in the `types` array.

## Type.GetMethod(String, Int32, BindingFlags, Type[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, int genericParameterCount, System.Reflection.BindingFlags bindingAttr, Type[] types);
```

Searches for the specified method whose parameters match the specified generic parameter count and argument types, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.

Returns: An object representing the method that matches the specified generic parameter count, argument types, and binding constraints, if found; otherwise, `null`.

To be added.

## Type.GetMethod(String, Int32, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, int genericParameterCount, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified public method whose parameters match the specified generic parameter count, argument types and modifiers.

Parameters:

- `name`: The string containing the name of the public method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the public method that matches the specified generic parameter count, argument types and modifiers, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in the `types` array is `null`.
- `ArgumentException`: `genericParameterCount` is negative.

To be added.
