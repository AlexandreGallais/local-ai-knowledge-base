---
title: "Type class (part 16 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 16 of 33)

## Type.GetMethod(String, BindingFlags, Binder, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified method whose parameters match the specified argument types and modifiers, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the method to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and matching the specified binding constraints.
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

The following `BindingFlags` filter flags can be used to define which methods to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public methods in the search.

- Specify `BindingFlags.NonPublic` to include nonpublic methods (that is, private, internal, and protected methods) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the methods declared on the `Type`, not methods that were simply inherited.

See `BindingFlags` for more information.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example finds specific overloads of `MethodA`, specifying binding constraints and a variety of argument types.

> **Note:**
> The Visual C# 2005 example requires the `/unsafe` compiler option.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/type_getmethod5.cs._

## Type.GetMethod(String, Int32, BindingFlags, Binder, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, int genericParameterCount, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified method whose parameters match the specified generic parameter count, argument types and modifiers, using the specified binding constraints.

Parameters:

- `name`: The string containing the name of the public method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified generic parameter count, argument types, modifiers and binding constraints, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in the `types` array is `null`.
- `ArgumentException`: `genericParameterCount` is negative.

To be added.

## Type.GetMethod(String, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified method whose parameters match the specified argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `name`: The string containing the name of the method to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and how the stack is cleaned up.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and matching the specified binding constraints.
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

The following table shows what members of a base class are returned by the `GetXXX` methods when reflecting on a type.

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

The following `BindingFlags` filter flags can be used to define which methods to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public methods in the search.

- Specify `BindingFlags.NonPublic` to include nonpublic methods (that is, private, internal, and protected methods) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the methods declared on the `Type`, not methods that were simply inherited.

See `BindingFlags` for more information.

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

> **Note:**
> For generic methods, do not include the type arguments in `name`. For example, the C# code `GetMember("MyMethod<int>")` searches for a member with the text name "`MyMethod<int>`", rather than for a method named `MyMethod` that has one generic argument of type `int`.

#### Examples
The following example finds specific overloads of `MethodA`, specifying binding constraints, calling conventions, and a variety of argument types.

> **Note:**
> The Visual C# 2005 example requires the `/unsafe` compiler option.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethod/type_getmethod3.cs._

## Type.GetMethod(String, Int32, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.MethodInfo? GetMethod (string name, int genericParameterCount, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for the specified method whose parameters match the specified generic parameter count, argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `name`: The string containing the name of the public method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and how the stack is cleaned up.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of `Type` objects (as provided by the `Type.EmptyTypes` field) to get a method that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. To be only used when calling through COM interop, and only parameters that are passed by reference are handled. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified generic parameter count, argument types, modifiers, binding constraints and calling convention, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`types` is `null`.

-or-

One of the elements in the `types` array is `null`.
- `ArgumentException`: `genericParameterCount` is negative.

To be added.
