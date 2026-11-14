---
title: "TypeDelegator class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/TypeDelegator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDelegator class (part 3 of 3)

## TypeDelegator.GetPropertyImpl(String, BindingFlags, Binder, Type, Type[], ParameterModifier[]) method

```csharp
protected override System.Reflection.PropertyInfo? GetPropertyImpl (string name, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, Type? returnType, Type[]? types, System.Reflection.ParameterModifier[]? modifiers);
```

When overridden in a derived class, searches for the specified property whose parameters match the specified argument types and modifiers, using the specified binding constraints.

Parameters:

- `name`: The property to get.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of zero or more bit flags from `BindingFlags`.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects via reflection. If `binder` is `null`, the default binder is used. See `Binder`.
- `returnType`: The return type of the property.
- `types`: A list of parameter types. The list represents the number, order, and types of the parameters. Types cannot be null; use an appropriate `GetMethod` method or an empty array to search for a method without parameters.
- `modifiers`: An array of the same length as types with elements that represent the attributes associated with the parameters of the method to get.

Returns: A `PropertyInfo` object for the property that matches the specified criteria, or null if a match cannot be found.

To be added.

## TypeDelegator.HasElementTypeImpl() method

```csharp
protected override bool HasElementTypeImpl ();
```

Gets a value indicating whether the current `Type` encompasses or refers to another type; that is, whether the current `Type` is an array, a pointer or a ByRef.

Returns: `true` if the `Type` is an array, a pointer or a ByRef; otherwise, `false`.

To be added.

## TypeDelegator.InvokeMember(String, BindingFlags, Binder, Object, Object[], ParameterModifier[], CultureInfo, String[]) method

```csharp
public override object? InvokeMember (string name, System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object? target, object?[]? args, System.Reflection.ParameterModifier[]? modifiers, System.Globalization.CultureInfo? culture, string[]? namedParameters);
```

Invokes the specified member. The method that is to be invoked must be accessible and provide the most specific match with the specified argument list, under the constraints of the specified binder and invocation attributes.

Parameters:

- `name`: The name of the member to invoke. This may be a constructor, method, property, or field. If an empty string ("") is passed, the default member is invoked.
- `invokeAttr`: The invocation attribute. This must be one of the following `BindingFlags` : `InvokeMethod`, `CreateInstance`, `Static`, `GetField`, `SetField`, `GetProperty`, or `SetProperty`. A suitable invocation attribute must be specified. If a static member is to be invoked, the `Static` flag must be set.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects via reflection. If `binder` is `null`, the default binder is used. See `Binder`.
- `target`: The object on which to invoke the specified member.
- `args`: An array of type `Object` that contains the number, order, and type of the parameters of the member to be invoked. If `args` contains an uninitialized `Object`, it is treated as empty, which, with the default binder, can be widened to 0, 0.0 or a string.
- `modifiers`: An array of type `ParameterModifier` that is the same length as `args`, with elements that represent the attributes associated with the arguments of the member to be invoked. A parameter has attributes associated with it in the member's signature. For ByRef, use `ParameterModifier.ByRef`, and for none, use `ParameterModifier.None`. The default binder does exact matching on these. Attributes such as `In` and `InOut` are not used in binding, and can be viewed using `ParameterInfo`.
- `culture`: An instance of `CultureInfo` used to govern the coercion of types. This is necessary, for example, to convert a string that represents 1000 to a `Double` value, since 1000 is represented differently by different cultures. If `culture` is `null`, the `CultureInfo` for the current thread's `CultureInfo` is used.
- `namedParameters`: A string array containing parameter names that match up, starting at element zero, with the `args` array. There must be no holes in the array. If `args`. `Length` is greater than `namedParameters`. `Length`, the remaining parameters are filled in order.

Returns: An `Object` representing the return value of the invoked member.

#### Remarks
A method will be invoked if both the following conditions are true:

- The number of parameters in the method declaration equals the number of arguments in the specified argument list (unless default arguments are defined on the member).
- The type of each argument can be converted by the binder to the type of the parameter.

The binder will find all the matching methods. These methods are found based upon the type of binding requested (`BindingFlags.MethodInvoke`, `BindingFlags.GetProperties`, and so on). The set of methods is filtered by the name, number of arguments, and a set of search modifiers defined in the binder.

After the method is selected, it will be invoked. Accessibility is checked at that point. The search may control which set of methods are searched based upon the accessibility attribute associated with the method. The `Binder.BindToMethod` method is responsible for selecting the method to be invoked. The default binder selects the most specific match.

> **Note:**
>  Access restrictions are ignored for fully trusted code. That is, private constructors, methods, fields, and properties can be accessed and invoked using reflection whenever the code is fully trusted.

Currently, `InvokeMember` performs the .NET reflection semantics for every type of object.

If the member specified by name is an array and the `BindingFlags.GetField` flag is set on `invokeAttr`, the `args` array specifies the elements whose values are to be returned. For example, the following call through `Type` object `t` returns the value of the first element of the string array MyArray, which is a member of the calling object:

`String ret = (String) t.InvokeMember ("MyArray", BindingFlags.GetField, null, this, new Variant[]{0});`

You can use `InvokeMember` to set one or more elements of a member array. All elements are set to the same value. The `args` array must be formatted as follows:

```
{index1,
    index2,, value}
```

For example, to set the first member of MyArray from the previous example, the syntax is as follows:

```csharp
t.InvokeMember ("MyArray", BindingFlags.SetField, null, this, new
    Variant[]{0,"Updated"});
```

## TypeDelegator.IsArrayImpl() method

```csharp
protected override bool IsArrayImpl ();
```

Returns a value that indicates whether the `Type` is an array.

Returns: `true` if the `Type` is an array; otherwise, `false`.

To be added.

## TypeDelegator.IsAssignableFrom(TypeInfo) method

```csharp
public override bool IsAssignableFrom (System.Reflection.TypeInfo? typeInfo);
```

Returns a value that indicates whether the specified type can be assigned to this type.

Parameters:

- `typeInfo`: The type to check.

Returns: `true` if the specified type can be assigned to this type; otherwise, `false`.

To be added.

## TypeDelegator.IsByRefImpl() method

```csharp
protected override bool IsByRefImpl ();
```

Returns a value that indicates whether the `Type` is passed by reference.

Returns: `true` if the `Type` is passed by reference; otherwise, `false`.

To be added.

## TypeDelegator.IsCOMObjectImpl() method

```csharp
protected override bool IsCOMObjectImpl ();
```

Returns a value that indicates whether the `Type` is a COM object.

Returns: `true` if the `Type` is a COM object; otherwise, `false`.

To be added.

## TypeDelegator.IsDefined(Type, Boolean) method

```csharp
public override bool IsDefined (Type attributeType, bool inherit);
```

Indicates whether a custom attribute identified by `attributeType` is defined.

Parameters:

- `attributeType`: Specifies whether to search this type's inheritance chain to find the attributes.
- `inherit`: An array of custom attributes identified by type.

Returns: `true` if a custom attribute identified by `attributeType` is defined; otherwise, `false`.

Exceptions:

- `ArgumentException`: `attributeType` is `null`.
- `ReflectionTypeLoadException`: The custom attribute type cannot be loaded.

To be added.

## TypeDelegator.IsPointerImpl() method

```csharp
protected override bool IsPointerImpl ();
```

Returns a value that indicates whether the `Type` is a pointer.

Returns: `true` if the `Type` is a pointer; otherwise, `false`.

To be added.

## TypeDelegator.IsPrimitiveImpl() method

```csharp
protected override bool IsPrimitiveImpl ();
```

Returns a value that indicates whether the `Type` is one of the primitive types.

Returns: `true` if the `Type` is one of the primitive types; otherwise, `false`.

To be added.

## TypeDelegator.IsValueTypeImpl() method

```csharp
protected override bool IsValueTypeImpl ();
```

Returns a value that indicates whether the type is a value type; that is, not a class or an interface.

Returns: `true` if the type is a value type; otherwise, `false`.

To be added.

## TypeDelegator.typeImpl field

```csharp
protected Type typeImpl;
```

A value indicating type information.

To be added.
