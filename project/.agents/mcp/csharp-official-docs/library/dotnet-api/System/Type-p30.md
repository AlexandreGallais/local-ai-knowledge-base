---
title: "Type class (part 30 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 30 of 33)

## Type.InvokeMember(String, BindingFlags, Binder, Object, Object[], ParameterModifier[], CultureInfo, String[]) method

```csharp
public abstract object? InvokeMember (string name, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object? target, object?[]? args, System.Reflection.ParameterModifier[]? modifiers, System.Globalization.CultureInfo? culture, string[]? namedParameters);
```

When overridden in a derived class, invokes the specified member, using the specified binding constraints and matching the specified argument list, modifiers and culture.

Parameters:

- `name`: The string containing the name of the constructor, method, property, or field member to invoke.

-or-

An empty string ("") to invoke the default member.

-or-

For `IDispatch` members, a string representing the DispID, for example "[DispID=3]".
- `invokeAttr`: A bitwise combination of the enumeration values that specify how the search is conducted. The access can be one of the `BindingFlags` such as `Public`, `NonPublic`, `Private`, `InvokeMethod`, `GetField`, and so on. The type of lookup need not be specified. If the type of lookup is omitted, `BindingFlags.Public` | `BindingFlags.Instance` | `BindingFlags.Static` are used.
- `binder`: An object that defines a set of properties and enables binding, which can involve selection of an overloaded method, coercion of argument types, and invocation of a member through reflection.

-or-

A null reference (Nothing in Visual Basic), to use the `Type.DefaultBinder`. Note that explicitly defining a `Binder` object may be required for successfully invoking method overloads with variable arguments.
- `target`: The object on which to invoke the specified member.
- `args`: An array containing the arguments to pass to the member to invoke.
- `modifiers`: An array of `ParameterModifier` objects representing the attributes associated with the corresponding element in the `args` array. A parameter's associated attributes are stored in the member's signature.

The default binder processes this parameter only when calling a COM component.
- `culture`: The `CultureInfo` object representing the globalization locale to use, which may be necessary for locale-specific conversions, such as converting a numeric String to a Double.

-or-

A null reference (`Nothing` in Visual Basic) to use the current thread's `CultureInfo`.
- `namedParameters`: An array containing the names of the parameters to which the values in the `args` array are passed.

Returns: An object representing the return value of the invoked member.

Exceptions:

- `ArgumentNullException`: `invokeAttr` does not contain `CreateInstance` and `name` is `null`.
- `ArgumentException`: `args` and `modifiers` do not have the same length.

-or-

`invokeAttr` is not a valid `BindingFlags` attribute.

-or-

`invokeAttr` does not contain one of the following binding flags: `InvokeMethod`, `CreateInstance`, `GetField`, `SetField`, `GetProperty`, or `SetProperty`.

-or-

`invokeAttr` contains `CreateInstance` combined with `InvokeMethod`, `GetField`, `SetField`, `GetProperty`, or `SetProperty`.

-or-

`invokeAttr` contains both `GetField` and `SetField`.

-or-

`invokeAttr` contains both `GetProperty` and `SetProperty`.

-or-

`invokeAttr` contains `InvokeMethod` combined with `SetField` or `SetProperty`.

-or-

`invokeAttr` contains `SetField` and `args` has more than one element.

-or-

The named parameter array is larger than the argument array.

-or-

This method is called on a COM object and one of the following binding flags was not passed in: `BindingFlags.InvokeMethod`, `BindingFlags.GetProperty`, `BindingFlags.SetProperty`, `BindingFlags.PutDispProperty`, or `BindingFlags.PutRefDispProperty`.

-or-

One of the named parameter arrays contains a string that is `null`.
- `MethodAccessException`: The specified member is a class initializer.
- `MissingFieldException`: The field or property cannot be found.
- `MissingMethodException`: No method can be found that matches the arguments in `args`.

-or-

No member can be found that has the argument names supplied in `namedParameters`.

-or-

The current `Type` object represents a type that contains open type parameters, that is, `Type.ContainsGenericParameters` returns `true`.
- `TargetException`: The specified member cannot be invoked on `target`.
- `AmbiguousMatchException`: More than one method matches the binding criteria.
- `InvalidOperationException`: The method represented by `name` has one or more unspecified generic type parameters. That is, the method's `MethodBase.ContainsGenericParameters` property returns `true`.

#### Remarks
`InvokeMember` calls a constructor member or a method member, gets or sets a property member, gets or sets a data field member, or gets or sets an element of an array member.

> **Note:**
> You cannot use `Type.InvokeMember` to invoke a generic method.

When you invoke an `IDispatch` member you can specify the DispID instead of the member name, using the string format "[DispID=##]". For example, if the DispID of MyComMethod is 3, you can specify the string "[DispID=3]" instead of "MyComMethod". Invoking a member by DispID is faster than looking up the member by name. In complex aggregation scenarios, the DispID is sometimes the only way to invoke the desired member.

Although the default binder does not process `ParameterModifier` or `CultureInfo` (the `modifiers` and `culture` parameters), you can use the abstract `Binder` class to write a custom binder that does process `modifiers` and `culture`. `ParameterModifier` is only used when calling through COM interop, and only parameters that are passed by reference are handled.

Each parameter in the `namedParameters` array gets the value in the corresponding element in the `args` array. If the length of `args` is greater than the length of `namedParameters`, the remaining argument values are passed in order.

The `namedParameters` array can be used to change the order of arguments in an input array. For example, given the method `M(string a, int b)` (`M(ByVal a As String, ByVal b As Integer)` in Visual Basic) and the input array `{ 42, "x" }`, the input array can be passed unchanged to `args` if the array `{ "b", "a" }` is supplied for `namedParameters`.

The following `BindingFlags` filter flags can be used to define which members to include in the search:

- Specify `BindingFlags.Public` to include public members in the search.

- Specify `BindingFlags.NonPublic` to include non-public members (that is, private, internal, and protected members) in the search.

- Specify `BindingFlags.FlattenHierarchy` to include static members up the hierarchy.

The following `BindingFlags` modifier flags can be used to change how the search works:

-   `BindingFlags.IgnoreCase` to ignore the case of `name`.

-   `BindingFlags.DeclaredOnly` to search only the members declared on the `Type`, not members that were simply inherited.

The following `BindingFlags` invocation flags can be used to denote what action to take with the member:

-   `CreateInstance` to invoke a constructor. `name` is ignored. Not valid with other invocation flags.

-   `InvokeMethod` to invoke a method, but not a constructor or a type initializer. Not valid with `SetField` or `SetProperty`. If `InvokeMethod` is specified by itself, `BindingFlags.Public`, `BindingFlags.Instance`, and `BindingFlags.Static` are automatically included.

-   `GetField` to get the value of a field. Not valid with `SetField`.

-   `SetField` to set the value of a field. Not valid with `GetField`.

-   `GetProperty` to get a property. Not valid with `SetProperty`.

-   `SetProperty` to set a property. Not valid with `GetProperty`.

See `BindingFlags` for more information.

A method will be invoked if both of the following conditions are true:

- The number of parameters in the method declaration equals the number of arguments in the `args` array (unless default arguments are defined on the member and `BindingFlags.OptionalParamBinding` is specified).

- The type of each argument can be converted by the binder to the type of the parameter.

The binder will find all of the matching methods. These methods are found based upon the type of binding requested (`BindingFlags` values `InvokeMethod`, `GetProperty`, and so on). The set of methods is filtered by the name, number of arguments, and a set of search modifiers defined in the binder.

After the method is selected, it's invoked. Accessibility is checked at that point. The search may control which set of methods are searched based upon the accessibility attribute associated with the method. The `Binder.BindToMethod` method of the `Binder` class is responsible for selecting the method to be invoked. The default binder selects the most specific match.

`InvokeMember` can be used to invoke methods with parameters that have default values. To bind to these methods, Reflection requires `OptionalParamBinding` to be specified. For a parameter that has a default value, you can either supply a different value, or supply `Value` to use the default value.

For example, consider a method such as MyMethod(int x, float y = 2.0). To invoke this method with only the first argument as MyMethod(4), pass one of the above binding flags and pass two arguments, namely, 4 for the first argument and `Missing.Value` for the second argument. Unless you use `Missing.Value`, you may not omit optional parameters with the `Invoke` method. If you must do so, use `InvokeMember` instead.

Access restrictions are ignored for fully trusted code; that is, private constructors, methods, fields, and properties can be accessed and invoked through `Reflection` whenever the code is fully trusted.

You can use `Type.InvokeMember` to set a field to a particular value by specifying `SetField`. For example, if you want to set a public instance field named F on class C, and F is a `String`, you can use code such as:

`typeof(C).InvokeMember("F", BindingFlags.SetField, null, c, new Object[] {"strings new value"}, null, null, null);`

If F is a `String[]`, you can use code such as:

`typeof(C).InvokeMember("F", BindingFlags.SetField, null, c, new Object[] {new String[]{"a","z","c","d"}}, null, null, null);`

which will initialize the field F to this new array. You can also use `Type.InvokeMember` to set a position in an array by supplying the index of the value and then the next value by using code such as the following:

`typeof(C).InvokeMember("F", BindingFlags.SetField, null, c, new Object[] {1, "b"}, null, null, null);`

This will change string "z" in the array that F holds to string "b".

## Type.IsArrayImpl() method

```csharp
protected abstract bool IsArrayImpl ();
```

When overridden in a derived class, implements the `Type.IsArray` property and determines whether the `Type` is an array.

Returns: `true` if the `Type` is an array; otherwise, `false`.

#### Remarks
An instance of the `Array` class must return `false` because it's an object, not an array.

#### Examples
The following example overrides the `IsArrayImpl` method in the `MyTypeDelegator` class, checks if a variable is an array, and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsArrayImpl/type_isarrayimpl.cs._

## Type.IsAssignableFrom(Type) method

```csharp
public virtual bool IsAssignableFrom (Type? c);
```

Determines whether an instance of a specified type `c` can be assigned to a variable of the current type.

Parameters:

- `c`: The type to compare with the current type.

Returns: `true` if any of the following conditions is true:

-   `c` and the current instance represent the same type.

-   `c` is derived either directly or indirectly from the current instance. `c` is derived directly from the current instance if it inherits from the current instance; `c` is derived indirectly from the current instance if it inherits from a succession of one or more classes that inherit from the current instance.

- The current instance is an interface that `c` implements.

-   `c` is a generic type parameter, and the current instance represents one of the constraints of `c`.

-   `c` represents a value type, and the current instance represents `Nullable<c>` (`Nullable(Of c)` in Visual Basic).

`false` if none of these conditions are true, or if `c` is `null`.

#### Remarks
The `Type.IsAssignableFrom` method can be used to determine whether an instance of `c` can be assigned to an instance of the current type, The method is most useful when you are handling objects whose types are not known at design time and allows for conditional assignment, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Type/IsAssignableFrom/IsAssignableFrom3.cs._

This method thus ensures that a line of code like the following will execute at runtime without throwing an `InvalidCastException` exception or a similar exception:

_Code sample not included: ~/snippets/csharp/System/Type/IsAssignableFrom/IsAssignableFrom3.cs._

This method can be overridden by a derived class.

> **Note:**
> A generic type definition is not assignable from a closed constructed type. That is, you cannot assign the closed constructed type `MyGenericList<int>` (`MyGenericList(Of Integer)` in Visual Basic) to a variable of type `MyGenericList<T>`.

If the `c` parameter is of type `TypeBuilder`, the result is based on the type that is to be built. The following code example demonstrates this using a built type named `B`.

_Code sample not included: ~/snippets/csharp/System/Type/IsAssignableFrom/isassignablefrom_ex1.cs._

#### Examples
The following example demonstrates the `IsAssignableFrom` method using defined classes, integer arrays, and generics.

_Code sample not included: ~/snippets/csharp/System/Type/IsAssignableFrom/testisassignablefrom.cs._

In the following example, the current instance is a `Type` object that represents the `Stream` class. `GenericWithConstraint` is a generic type whose generic type parameter must be of type `Stream`. Passing its generic type parameter to the `IsAssignableFrom` method indicates that an instance of the generic type parameter can be assigned to an `Stream` object.

_Code sample not included: ~/snippets/csharp/System/Type/IsAssignableFrom/IsAssignableFrom2.cs._
