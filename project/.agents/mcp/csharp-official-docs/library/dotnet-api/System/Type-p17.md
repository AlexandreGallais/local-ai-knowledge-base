---
title: "Type class (part 17 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 17 of 33)

## Type.GetMethodImpl(String, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected abstract System.Reflection.MethodInfo? GetMethodImpl (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

When overridden in a derived class, searches for the specified method whose parameters match the specified argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `name`: The string containing the name of the method to get.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and what process cleans up the stack.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a method that takes no parameters.

-or-

`null`. If `types` is `null`, arguments are not matched.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: More than one method is found with the specified name and matching the specified binding constraints.
- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.
- `NotSupportedException`: The current type is a `TypeBuilder` or `GenericTypeParameterBuilder`.

#### Remarks
Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

If `types` is `null`, arguments are not matched.

The following `BindingFlags` filter flags can be used to define which methods to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public methods in the search.

- Specify `BindingFlags.NonPublic` to include non-public methods (that is, private, internal, and protected methods) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the methods declared on the `Type`, not methods that were simply inherited.

See `BindingFlags` for more information.

## Type.GetMethodImpl(String, Int32, BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected virtual System.Reflection.MethodInfo? GetMethodImpl (string name, int genericParameterCount, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

When overridden in a derived class, searches for the specified method whose parameters match the specified generic parameter count, argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `name`: The string containing the name of the method to get.
- `genericParameterCount`: The number of generic type parameters of the method.
- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and what process cleans up the stack.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the method to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a method that takes no parameters.

-or-

`null`. If `types` is `null`, arguments are not matched.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the method that matches the specified generic parameter count, argument types, modifiers, binding constraints and calling convention, if found; otherwise, `null`.

Exceptions:

- `NotSupportedException`: The method needs to be overriden and called in a derived class.

To be added.

## Type.GetMethods() method

```csharp
public System.Reflection.MethodInfo[] GetMethods ();
```

Returns all the public methods of the current `Type`.

Returns: An array of `MethodInfo` objects representing all the public methods defined for the current `Type`.

-or-

An empty array of type `MethodInfo`, if no public methods are defined for the current `Type`.

#### Remarks

The `Type.GetMethods` method returns methods in a deterministic order based upon the metadata ordering in the assembly.

Constructors are not included in the array of methods returned by this call. Make a separate call to `GetConstructors()` to get the constructor methods.

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

> **Note:**
> You cannot omit parameters when looking up constructors and methods. You can only omit parameters when invoking.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

## Type.GetMethods(BindingFlags) method

```csharp
public abstract System.Reflection.MethodInfo[] GetMethods (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the methods defined for the current `Type`, using the specified binding constraints.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `MethodInfo` objects representing all methods defined for the current `Type` that match the specified binding constraints.

-or-

An empty array of type `MethodInfo`, if no methods are defined for the current `Type`, or if none of the defined methods match the binding constraints.

#### Remarks

For the `GetMethods(BindingFlags)` overload to successfully retrieve method information, the `bindingAttr` argument must include at least one of `Instance` and `Static`, along with at least one of `NonPublic` and `Public`.

The following `BindingFlags` filter flags can be used to define which methods to include in the search:

- Specify `BindingFlags.Instance` to include instance methods.

- Specify `BindingFlags.Static` to include static methods.

- Specify `BindingFlags.Public` to include public methods in the search.

- Specify `BindingFlags.NonPublic` to include non-public methods (that is, private, internal, and protected methods) in the search. Only protected and internal methods on base classes are returned; private methods on base classes are not returned.

- Specify `BindingFlags.FlattenHierarchy` to include `public` and `protected` static members up the hierarchy; `private` static members in inherited classes are not included.

- Specify `BindingFlags.Default` alone to return an empty `MethodInfo` array.

The following `BindingFlags` modifier flags can be used to change how the search works:

- `BindingFlags.DeclaredOnly` to search only the methods declared on the `Type`, not methods that were simply inherited.

See `BindingFlags` for more information.

The `Type.GetMethods` method returns methods in a deterministic order based upon the metadata ordering in the assembly.

If the current `Type` represents a constructed generic type, this method returns the `MethodInfo` objects with the type parameters replaced by the appropriate type arguments.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method searches the methods of the class constraint, or the methods of `Object` if there is no class constraint.

#### Examples
The following example creates a class with two public methods and one protected method, creates a `Type` object corresponding to `MyTypeClass`, gets all public and non-public methods, and displays their names.

_Code sample not included: ~/snippets/csharp/System/Type/GetMethods/type_getmethods2.cs._

## Type.GetNestedType(String) method

```csharp
public Type? GetNestedType (string name);
```

Searches for the public nested type with the specified name.

Parameters:

- `name`: The string containing the name of the nested type to get.

Returns: An object representing the public nested type with the specified name, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
The search for `name` is case-sensitive.

Use the simple name of the nested class for `name`. Do not qualify it with the name of the outer class. For a generic nested class, use the mangled name - that is, append a grave accent and the number of generic arguments. For example, use the string "Inner\`1" to get the generic nested class `Inner<T>` (`Inner(Of T)` in Visual Basic). Do not include language-specific syntax for type parameters.

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
