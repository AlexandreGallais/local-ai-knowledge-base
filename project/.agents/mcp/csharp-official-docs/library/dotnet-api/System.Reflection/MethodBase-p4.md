---
title: "MethodBase class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodBase class (part 4 of 4)

## MethodBase.Invoke(Object, BindingFlags, Binder, Object[], CultureInfo) method

```csharp
public abstract object? Invoke (object? obj, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object?[]? parameters, System.Globalization.CultureInfo? culture);
```

When overridden in a derived class, invokes the reflected method or constructor with the given parameters.

Parameters:

- `obj`: The object on which to invoke the method or constructor. If a method is static, this argument is ignored. If a constructor is static, this argument must be `null` or an instance of the class that defines the constructor.
- `invokeAttr`: A bitmask that is a combination of 0 or more bit flags from `BindingFlags`.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects via reflection. If `binder` is `null`, the default binder is used.
- `parameters`: An argument list for the invoked method or constructor. This is an array of objects with the same number, order, and type as the parameters of the method or constructor to be invoked. If there are no parameters, this should be `null`.

If the method or constructor represented by this instance takes a ByRef parameter, there is no special attribute required for that parameter in order to invoke the method or constructor using this function. Any object in this array that is not explicitly initialized with a value will contain the default value for that object type. For reference-type elements, this value is `null`. For value-type elements, this value is 0, 0.0, or `false`, depending on the specific element type.
- `culture`: An instance of `CultureInfo` used to govern the coercion of types. If this is `null`, the `CultureInfo` for the current thread is used. (This is necessary to convert a string that represents 1000 to a `Double` value, for example, since 1000 is represented differently by different cultures.)

Returns: An `Object` containing the return value of the invoked method, or `null` in the case of a constructor, or `null` if the method's return type is `void`. Before calling the method or constructor, `Invoke` checks to see if the user has access permission and verifies that the parameters are valid.

Exceptions:

- `TargetException`: The `obj` parameter is `null` and the method is not static.

-or-

The method is not declared or inherited by the class of `obj`.

-or-

A static constructor is invoked, and `obj` is neither `null` nor an instance of the class that declared the constructor.
- `ArgumentException`: The type of the `parameters` parameter does not match the signature of the method or constructor reflected by this instance.
- `TargetParameterCountException`: The `parameters` array does not have the correct number of arguments.
- `TargetInvocationException`: The invoked method or constructor throws an exception.
- `MethodAccessException`: The caller does not have permission to execute the method or constructor that is represented by the current instance.
- `InvalidOperationException`: The type that declares the method is an open generic type. That is, the `Type.ContainsGenericParameters` property returns `true` for the declaring type.

#### Remarks

This method dynamically invokes the method reflected by this instance on `obj`, and passes along the specified parameters. If the method is static, the `obj` parameter is ignored. For non-static methods, `obj` should be an instance of a class that inherits or declares the method and must be the same type as this class. If the method has no parameters, the value of `parameters` should be `null`. Otherwise, the number, type, and order of elements in `parameters` should be identical to the number, type, and order of parameters for the method reflected by this instance.

You may not omit optional parameters in calls to `Invoke`. To invoke a method and omit optional parameters, call `Type.InvokeMember` instead.

> **Note:**
> If this method overload is used to invoke an instance constructor, the object supplied for `obj` is reinitialized; that is, all instance initializers are executed. The return value is `null`. If a class constructor is invoked, the class is reinitialized; that is, all class initializers are executed. The return value is `null`.

For pass-by-value primitive parameters, normal widening is performed (Int16 -> Int32, for example). For pass-by-value reference parameters, normal reference widening is allowed (derived class to base class, and base class to interface type). However, for pass-by-reference primitive parameters, the types must match exactly. For pass-by-reference reference parameters, the normal widening still applies.

For example, if the method reflected by this instance is declared as `public boolean Compare(String a, String b)`, then `parameters` should be an array of `Objects` with length 2 such that `parameters[0] = new Object("SomeString1") and parameters[1] = new Object("SomeString2")`.

If a parameter of the current method is a value type, and the corresponding argument in `parameters` is `null`, the runtime passes a zero-initialized instance of the value type.

Reflection uses dynamic method lookup when invoking virtual methods. For example, suppose that class B inherits from class A and both implement a virtual method named M. Now suppose that you have a `MethodInfo` object that represents M on class A. If you use the `Invoke` method to invoke M on an object of type B, then reflection will use the implementation given by class B. Even if the object of type B is cast to A, the implementation given by class B is used (see code sample below).

On the other hand, if the method is non-virtual, then reflection will use the implementation given by the type from which the `MethodInfo` was obtained, regardless of the type of the object passed as the target.

If the invoked method throws an exception, the `Exception.GetBaseException` method returns the originating exception.

#### Examples
The following example demonstrates all members of the `Binder` class using an overload of `Type.InvokeMember`. The private method `CanConvertFrom` finds compatible types for a given type. For another example of invoking members in a custom binding scenario, see Dynamically Loading and Using Types.

_Code sample not included: ~/snippets/csharp/System.Reflection/Binder/Overview/binder.cs._

## MethodBase.op_Equality(MethodBase, MethodBase) method

```csharp
public static bool operator == (System.Reflection.MethodBase? left, System.Reflection.MethodBase? right);
```

Indicates whether two `MethodBase` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## MethodBase.op_Inequality(MethodBase, MethodBase) method

```csharp
public static bool operator != (System.Reflection.MethodBase? left, System.Reflection.MethodBase? right);
```

Indicates whether two `MethodBase` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.
