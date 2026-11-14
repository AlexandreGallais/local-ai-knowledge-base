---
title: "Delegate class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate class (part 5 of 7)

## Delegate.CreateDelegate(Type, MethodInfo, Boolean) method

```csharp
public static Delegate? CreateDelegate (Type type, System.Reflection.MethodInfo method, bool throwOnBindFailure);
```

Creates a delegate of the specified type to represent the specified static method, with the specified behavior on failure to bind.

Parameters:

- `type`: The `Type` of delegate to create.
- `method`: The `MethodInfo` describing the static or instance method the delegate is to represent.
- `throwOnBindFailure`: `true` to throw an exception if `method` cannot be bound; otherwise, `false`.

Returns: A delegate of the specified type to represent the specified static method.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`method` cannot be bound, and `throwOnBindFailure` is `true`.

-or-

`method` is not a `RuntimeMethodInfo`.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method overload can create open static method delegates and open instance method delegates - that is, delegates that expose the hidden first argument of instance methods. For a detailed explanation, see the more general `CreateDelegate` method overload, which allows you to create all combinations of open or closed delegates for instance or static methods.

> **Note:**
> This method overload should be used when the delegate is not closed over its first argument, because it is somewhat faster in that case.

#### Examples

This section contains two code examples. The first example demonstrates the two kinds of delegates that can be created with this method overload: open over an instance method and open over a static method.

The second code example demonstrates compatible parameter types and return types.

#### Example 1

The following code example demonstrates the two ways a delegate can be created using this overload of the `Delegate.CreateDelegate` method.

> **Note:**
> There are two overloads of the `Delegate.CreateDelegate` method that specify a `MethodInfo` but not a first argument; their functionality is the same except that one allows you to specify whether to throw on failure to bind, and the other always throws. This code example uses both overloads.

The example declares a class `C` with a static method `M2` and an instance method `M1`, and two delegate types: `D1` takes an instance of `C` and a string, and `D2` takes a string.

A second class named `Example` contains the code that creates the delegates.

- A delegate of type `D1`, representing an open instance method, is created for the instance method `M1`. An instance must be passed when the delegate is invoked.
- A delegate of type `D2`, representing an open static method, is created for the static method `M2`.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/openClosedOver.cs._

#### Example 2

The following code example demonstrates compatibility of parameter types and return types.

The code example defines a base class named `Base` and a class named `Derived` that derives from `Base`. The derived class has a `static` (`Shared` in Visual Basic) method named `MyMethod` with one parameter of type `Base` and a return type of `Derived`. The code example also defines a delegate named `Example` that has one parameter of type `Derived` and a return type of `Base`.

The code example demonstrates that the delegate named `Example` can be used to represent the method `MyMethod`. The method can be bound to the delegate because:

- The parameter type of the delegate (`Derived`) is more restrictive than the parameter type of `MyMethod` (`Base`), so that it is always safe to pass the argument of the delegate to `MyMethod`.
- The return type of `MyMethod` (`Derived`) is more restrictive than the parameter type of the delegate (`Base`), so that it is always safe to cast the return type of the method to the return type of the delegate.

The code example produces no output.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/source1.cs._

## Delegate.CreateDelegate(Type, Type, String) method

```csharp
public static Delegate CreateDelegate (Type type, Type target, string method);
```

Creates a delegate of the specified type that represents the specified static method of the specified class.

Parameters:

- `type`: The `Type` of delegate to create.
- `target`: The `Type` representing the class that implements `method`.
- `method`: The name of the static method that the delegate is to represent.

Returns: A delegate of the specified type that represents the specified static method of the specified class.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`target` is not a `RuntimeType`.

-or-

`target` is an open generic type. That is, its `Type.ContainsGenericParameters` property is `true`.

-or-

`method` is not a `static` method (`Shared` method in Visual Basic).
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method creates delegates for static methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

This method overload is equivalent to calling the `CreateDelegate` method overload, specifying `false` for `ignoreCase` and `true` for `throwOnBindFailure`.

## Delegate.CreateDelegate(Type, Object, MethodInfo, Boolean) method

```csharp
public static Delegate? CreateDelegate (Type type, object? firstArgument, System.Reflection.MethodInfo method, bool throwOnBindFailure);
```

Creates a delegate of the specified type that represents the specified static or instance method, with the specified first argument and the specified behavior on failure to bind.

Parameters:

- `type`: A `Type` representing the type of delegate to create.
- `firstArgument`: An `Object` that is the first argument of the method the delegate represents. For instance methods, it must be compatible with the instance type.
- `method`: The `MethodInfo` describing the static or instance method the delegate is to represent.
- `throwOnBindFailure`: `true` to throw an exception if `method` cannot be bound; otherwise, `false`.

Returns: A delegate of the specified type that represents the specified static or instance method, or `null` if `throwOnBindFailure` is `false` and the delegate cannot be bound to `method`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`method` cannot be bound, and `throwOnBindFailure` is `true`.

-or-

`method` is not a `RuntimeMethodInfo`.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method overload and the `CreateDelegate` method overload, which always throws on failure to bind, provide the most flexible way to create delegates. You can use them to create delegates for either static or instance methods, with or without a first argument.

> **Note:**
> If you do not supply a first argument, use the `CreateDelegate` method overload for better performance.

The delegate type and the method must have compatible return types. That is, the return type of `method` must be assignable to the return type of `type`.

`firstArgument`, the second parameter to these overloads, is the first argument of the method the delegate represents. If `firstArgument` is supplied, it is passed to `method` every time the delegate is invoked; `firstArgument` is said to be bound to the delegate, and the delegate is said to be closed over its first argument. If `method` is `static` (`Shared` in Visual Basic), the argument list supplied when invoking the delegate includes all parameters except the first; if `method` is an instance method, then `firstArgument` is passed to the hidden instance parameter (represented by `this` in C#, or by `Me` in Visual Basic).

If `firstArgument` is supplied, the first parameter of `method` must be a reference type, and `firstArgument` must be compatible with that type.

> **Important:**
> If `method` is `static` (`Shared` in Visual Basic) and its first parameter is of type `Object` or `ValueType`, then `firstArgument` can be a value type. In this case `firstArgument` is automatically boxed. Automatic boxing does not occur for any other arguments, as it would in a C# or Visual Basic <example-value> call.

If `firstArgument` is a null reference and `method` is an instance method, the result depends on the signatures of the delegate type `type` and of `method`:

- If the signature of `type` explicitly includes the hidden first parameter of `method`, the delegate is said to represent an open instance method. When the delegate is invoked, the first argument in the argument list is passed to the hidden instance parameter of `method`.
- If the signatures of `method` and `type` match (that is, all parameter types are compatible), then the delegate is said to be closed over a null reference. Invoking the delegate is like calling an instance method on a null instance, which is not a particularly useful thing to do.

If `firstArgument` is a null reference and `method` is static, the result depends on the signatures of the delegate type `type` and of `method`:

- If the signature of `method` and `type` match (that is, all parameter types are compatible), the delegate is said to represent an open static method. This is the most common case for static methods. In this case, you can get slightly better performance by using the `CreateDelegate` method overload.
- If the signature of `type` begins with the second parameter of `method` and the rest of the parameter types are compatible, then the delegate is said to be closed over a null reference. When the delegate is invoked, a null reference is passed to the first parameter of `method`.

#### Example

The following code example shows all the methods a single delegate type can represent: closed over an instance method, open over an instance method, open over a static method, and closed over a static method.

The code example defines two classes, `C` and `F`, and a delegate type `D` with one argument of type `C`. The classes have matching static and instance methods `M1`, `M3`, and `M4`, and class `C` also has an instance method `M2` that has no arguments.

A third class named `Example` contains the code that creates the delegates.

- Delegates are created for instance method `M1` of type `C` and type `F`; each is closed over an instance of the respective type. Method `M1` of type `C` displays the `ID` properties of the bound instance and of the argument.
- A delegate is created for method `M2` of type `C`. This is an open instance delegate, in which the argument of the delegate represents the hidden first argument on the instance method. The method has no other arguments. It is called as if it were a static method.
- Delegates are created for static method `M3` of type `C` and type `F`; these are open static delegates.
- Finally, delegates are created for static method `M4` of type `C` and type `F`; each method has the declaring type as its first argument, and an instance of the type is supplied, so the delegates are closed over their first arguments. Method `M4` of type `C` displays the `ID` properties of the bound instance and of the argument.

_Code sample not included: ~/snippets/csharp/System/Delegate/CreateDelegate/source.cs._

## Delegate.CreateDelegate(Type, Object, String, Boolean) method

```csharp
public static Delegate CreateDelegate (Type type, object target, string method, bool ignoreCase);
```

Creates a delegate of the specified type that represents the specified instance method to invoke on the specified class instance with the specified case-sensitivity.

Parameters:

- `type`: The `Type` of delegate to create.
- `target`: The class instance on which `method` is invoked.
- `method`: The name of the instance method that the delegate is to represent.
- `ignoreCase`: A Boolean indicating whether to ignore the case when comparing the name of the method.

Returns: A delegate of the specified type that represents the specified instance method to invoke on the specified class instance.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

-or-

`target` is `null`.

-or-

`method` is `null`.
- `ArgumentException`: `type` does not inherit `MulticastDelegate`.

-or-

`type` is not a `RuntimeType`.

-or-

`method` is not an instance method.

-or-

`method` cannot be bound, for example because it cannot be found.
- `MissingMethodException`: The `Invoke` method of `type` is not found.
- `MethodAccessException`: The caller does not have the permissions necessary to access `method`.

#### Remarks
This method creates delegates for instance methods only. An instance method is a method that is associated with an instance of a class; a static method is a method that is associated with the class itself.

This method overload is equivalent to calling the `CreateDelegate` method overload, specifying `true` for `throwOnBindFailure`.
