---
title: "Type class (part 9 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 9 of 33)

## Type.GetConstructor(BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
public System.Reflection.ConstructorInfo? GetConstructor (System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Searches for a constructor whose parameters match the specified argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and the stack is cleaned up.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the constructor to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a constructor that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: An object representing the constructor that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.

#### Remarks
Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

If an exact match does not exist, the `binder` will attempt to coerce the parameter types specified in the `types` array in order to select a match. If the `binder` is unable to select a match, then `null` is returned.

The following `BindingFlags` filter flags can be used to define which constructors to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public constructors in the search.

- Specify `BindingFlags.NonPublic` to include non-public constructors (that is, private, internal, and protected constructors) in the search.

See `BindingFlags` for more information.

To get the class initializer (static constructor) using this method, you must specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

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

If the current `Type` represents a constructed generic type, this method returns the `ConstructorInfo` with the type parameters replaced by the appropriate type arguments. If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method always returns `null`.

## Examples
The following example obtains the type of `MyClass`, gets the `ConstructorInfo` object, and displays the constructor signature.

_Code sample not included: ~/snippets/csharp/System/Type/GetConstructor/type_getconstructor3.cs._

## Type.GetConstructorImpl(BindingFlags, Binder, CallingConventions, Type[], ParameterModifier[]) method

```csharp
protected abstract System.Reflection.ConstructorInfo? GetConstructorImpl (System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, System.Reflection.CallingConventions callConvention, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

When overridden in a derived class, searches for a constructor whose parameters match the specified argument types and modifiers, using the specified binding constraints and the specified calling convention.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return `null`.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (`Nothing` in Visual Basic), to use the `Type.DefaultBinder`.
- `callConvention`: The object that specifies the set of rules to use regarding the order and layout of arguments, how the return value is passed, what registers are used for arguments, and the stack is cleaned up.
- `types`: An array of `Type` objects representing the number, order, and type of the parameters for the constructor to get.

-or-

An empty array of the type `Type` (that is, Type[] types = new Type[0]) to get a constructor that takes no parameters.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `types` array. The default binder does not process this parameter.

Returns: A `ConstructorInfo` object representing the constructor that matches the specified requirements, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `types` is `null`.

-or-

One of the elements in `types` is `null`.
- `ArgumentException`: `types` is multidimensional.

-or-

`modifiers` is multidimensional.

-or-

`types` and `modifiers` do not have the same length.
- `NotSupportedException`: The current type is a `TypeBuilder` or `GenericTypeParameterBuilder`.

#### Remarks
Although the default binder does not process `ParameterModifier` (the `modifiers` parameter), you can use the abstract `Binder` class to write a custom binder that does process `modifiers`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

If an exact match does not exist, the `binder` will attempt to coerce the parameter types specified in the `types` array in order to select a match. If the `binder` is unable to select a match, then `null` is returned.

The following `BindingFlags` filter flags can be used to define which constructors to include in the search:

- You must specify either `BindingFlags.Instance` or `BindingFlags.Static` in order to get a return.

- Specify `BindingFlags.Public` to include public constructors in the search.

- Specify `BindingFlags.NonPublic` to include non-public constructors (that is, private, internal, and protected constructors) in the search.

See `BindingFlags` for more information.

This method implements `Type.GetConstructor`.

## Type.GetConstructors() method

```csharp
public System.Reflection.ConstructorInfo[] GetConstructors ();
```

Returns all the public constructors defined for the current `Type`.

Returns: An array of `ConstructorInfo` objects representing all the public instance constructors defined for the current `Type`, but not including the type initializer (static constructor). If no public instance constructors are defined for the current `Type`, or if the current `Type` represents a type parameter in the definition of a generic type or generic method, an empty array of type `ConstructorInfo` is returned.

#### Remarks
The `Type.GetConstructors` method returns constructors in a deterministic order based upon the metadata ordering in the assembly.

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

This method overload calls the `GetConstructors` method overload, with `Public` | `Instance` (`Public`` Or ``Instance` in Visual Basic). It will not find class initializers (static constructor). To find class initializers, use an overload that takes `BindingFlags`, and specify `Static` | `NonPublic` (`Static`` Or ``NonPublic` in Visual Basic). You can also get the class initializer using the `TypeInitializer` property.

If the current `Type` represents a constructed generic type, this method returns the `ConstructorInfo` objects with the type parameters replaced by the appropriate type arguments. For example, if class `C<T>` has a constructor `C(T t1)` (`Sub New(ByVal t1 As T)` in Visual Basic), calling `Type.GetConstructors` on `C<int>` returns a `ConstructorInfo` that represents `C(int t1)` in C# (`Sub New(ByVal t1 As Integer)` in Visual Basic).

If the current `Type` represents a generic type parameter, the `Type.GetConstructors` method returns an empty array.

## Type.GetConstructors(BindingFlags) method

```csharp
public abstract System.Reflection.ConstructorInfo[] GetConstructors (System.Reflection.BindingFlags bindingAttr);
```

When overridden in a derived class, searches for the constructors defined for the current `Type`, using the specified `BindingFlags`.

Parameters:

- `bindingAttr`: A bitwise combination of the enumeration values that specify how the search is conducted.

-or-

`BindingFlags.Default` to return an empty array.

Returns: An array of `ConstructorInfo` objects representing all constructors defined for the current `Type` that match the specified binding constraints, including the type initializer if it's defined. Returns an empty array of type `ConstructorInfo` if no constructors are defined for the current `Type`, if none of the defined constructors match the binding constraints, or if the current `Type` represents a type parameter in the definition of a generic type or generic method.

#### Remarks

`bindingAttr` can be used to specify whether to return only public constructors or both public and non-public constructors.

The following `BindingFlags` filter flags can be used to define which constructors to include in the search:

- Specify `BindingFlags.Static` along with `BindingFlags.NonPublic` to retrieve the class initializer (static constructor). You can also get the class initializer using the `TypeInitializer` property.

- Specify `BindingFlags.Instance` along with one or both of `BindingFlags.Public` and `BindingFlags.NonPublic` to retrieve instance constructors.

See `BindingFlags` for more information.

The `Type.GetConstructors` method returns constructors in a deterministic order based upon the metadata ordering in the assembly.

If the current `Type` represents a constructed generic type, this method returns the `ConstructorInfo` objects with the type parameters replaced by the appropriate type arguments. For example, if class `C<T>` has a constructor `C(T t1)` (`Sub New(ByVal t1 As T)` in Visual Basic), calling `Type.GetConstructors` on `C<int>` returns a `ConstructorInfo` that represents `C(int t1)` in C# (`Sub New(ByVal t1 As Integer)` in Visual Basic).

If the current `Type` represents a generic type parameter, the `Type.GetConstructors` method returns an empty array.
