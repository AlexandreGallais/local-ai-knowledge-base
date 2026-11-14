---
title: "Binder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Binder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Binder class

Namespace: `System.Reflection`

```csharp
public abstract class Binder
```

Selects a member from a list of candidates, and performs type conversion from actual argument type to formal argument type.

#### Remarks
Implementations of the `Binder` class are used by methods such as `Type.InvokeMember`, which selects from a set of possible members to execute, based on a set of parameter types and argument values; `Type.GetMethod`, which selects a method based on parameter types; and so on.

A default implementation of the `Binder` class is provided by the `DefaultBinder` property.

#### Examples
The following example implements and demonstrates all members of the `Binder` class. The private method `CanConvertFrom` finds compatible types for a given type.

_Code sample not included: ~/snippets/csharp/System.Reflection/Binder/Overview/binder.cs._

## Binder.Binder() constructor

```csharp
protected Binder ();
```

Initializes a new instance of the `Binder` class.

#### Remarks
This constructor is called by the constructors of derived classes, to initialize state in this type.

## Binder.BindToField(BindingFlags, FieldInfo[], Object, CultureInfo) method

```csharp
public abstract System.Reflection.FieldInfo BindToField (System.Reflection.BindingFlags bindingAttr, System.Reflection.FieldInfo[] match, object value, System.Globalization.CultureInfo? culture);
```

Selects a field from the given set of fields, based on the specified criteria.

Parameters:

- `bindingAttr`: A bitwise combination of `BindingFlags` values.
- `match`: The set of fields that are candidates for matching. For example, when a `Binder` object is used by `InvokeMember`, this parameter specifies the set of fields that reflection has determined to be possible matches, typically because they have the correct member name. The default implementation provided by `Type.DefaultBinder` changes the order of this array.
- `value`: The field value used to locate a matching field.
- `culture`: An instance of `CultureInfo` that is used to control the coercion of data types, in binder implementations that coerce types. If `culture` is `null`, the `CultureInfo` for the current thread is used.

Returns: The matching field.

Exceptions:

- `AmbiguousMatchException`: For the default binder, `bindingAttr` includes `BindingFlags.SetField`, and `match` contains multiple fields that are equally good matches for `value`. For example, `value` contains a `MyClass` object that implements the `IMyClass` interface, and `match` contains a field of type `MyClass` and a field of type `IMyClass`.
- `MissingFieldException`: For the default binder, `bindingAttr` includes `BindingFlags.SetField`, and `match` contains no fields that can accept `value`.
- `NullReferenceException`: For the default binder, `bindingAttr` includes `BindingFlags.SetField`, and `match` is `null` or an empty array.

-or-

`bindingAttr` includes `BindingFlags.SetField`, and `value` is `null`.

#### Remarks
If `bindingAttr` does not include `SetField`, the default binder implementation provided by `Type.DefaultBinder` simply returns the first element of `match`. No selection is done.

This method controls the binding provided by `Type.InvokeMember`.

If a binder implementation allows coercion of string values to numeric types, the `culture` parameter is necessary to convert a string that represents 1000 to a `Double` value, because 1000 is represented differently by different cultures. The default binder does not do such string coercions.

## Binder.BindToMethod(BindingFlags, MethodBase[], Object[], ParameterModifier[], CultureInfo, String[], Object) method

```csharp
public abstract System.Reflection.MethodBase BindToMethod (System.Reflection.BindingFlags bindingAttr, System.Reflection.MethodBase[] match, ref object?[] args, System.Reflection.ParameterModifier[]? modifiers, System.Globalization.CultureInfo? culture, string[]? names, out object? state);
```

Selects a method to invoke from the given set of methods, based on the supplied arguments.

Parameters:

- `bindingAttr`: A bitwise combination of `BindingFlags` values.
- `match`: The set of methods that are candidates for matching. For example, when a `Binder` object is used by `InvokeMember`, this parameter specifies the set of methods that reflection has determined to be possible matches, typically because they have the correct member name. The default implementation provided by `Type.DefaultBinder` changes the order of this array.
- `args`: The arguments that are passed in. The binder can change the order of the arguments in this array; for example, the default binder changes the order of arguments if the `names` parameter is used to specify an order other than positional order. If a binder implementation coerces argument types, the types and values of the arguments can be changed as well.
- `modifiers`: An array of parameter modifiers that enable binding to work with parameter signatures in which the types have been modified. The default binder implementation does not use this parameter.
- `culture`: An instance of `CultureInfo` that is used to control the coercion of data types, in binder implementations that coerce types. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `names`: The parameter names, if parameter names are to be considered when matching, or `null` if arguments are to be treated as purely positional. For example, parameter names must be used if arguments are not supplied in positional order.
- `state`: After the method returns, `state` contains a binder-provided object that keeps track of argument reordering. The binder creates this object, and the binder is the sole consumer of this object. If `state` is not `null` when `BindToMethod` returns, you must pass `state` to the `Binder.ReorderArgumentArray` method if you want to restore `args` to its original order, for example, so that you can retrieve the values of `ref` parameters (`ByRef` parameters in Visual Basic).

Returns: The matching method.

Exceptions:

- `AmbiguousMatchException`: For the default binder, `match` contains multiple methods that are equally good matches for `args`. For example, `args` contains a `MyClass` object that implements the `IMyClass` interface, and `match` contains a method that takes `MyClass` and a method that takes `IMyClass`.
- `MissingMethodException`: For the default binder, `match` contains no methods that can accept the arguments supplied in `args`.
- `ArgumentException`: For the default binder, `match` is `null` or an empty array.

#### Remarks
The default binder takes into account both parameters that have values and `params` arrays (`ParamArray` arrays in Visual Basic). Thus, it is possible to find a match in cases where `args` and `match` do not contain the same number of elements.

The binder enables a client to map the array of arguments back to its original form if the argument array has been manipulated by `Binder.BindToMethod`. Use this remap capability to get back by-reference arguments when such arguments are present. When you pass <example-value> by name, the binder reorders the argument array. The `state` parameter keeps track of argument reordering, thus enabling the binder's `Binder.ReorderArgumentArray` method to reorder the argument array to its original form.

The `Binder.BindToMethod` method is used by the `Type.InvokeMember` method.

If a binder implementation allows coercion of string values to numeric types, the `culture` parameter is necessary to convert a string that represents 1000 to a `Double` value, because 1000 is represented differently by different cultures. The default binder does not do such string coercions.

## Binder.ChangeType(Object, Type, CultureInfo) method

```csharp
public abstract object ChangeType (object value, Type type, System.Globalization.CultureInfo? culture);
```

Changes the type of the given `Object` to the given `Type`.

Parameters:

- `value`: The object to change into a new `Type`.
- `type`: The new `Type` that `value` will become.
- `culture`: An instance of `CultureInfo` that is used to control the coercion of data types. If `culture` is `null`, the `CultureInfo` for the current thread is used.

Returns: An object that contains the given value as the new type.

#### Remarks
Reflection models the accessibility rules of the common type system. For example, if the caller is in the same assembly, the caller does not need special permissions for internal members. Otherwise, the caller needs `ReflectionPermission`. This is consistent with lookup of members that are protected, private, and so on.

The general principle is that `ChangeType` should perform only widening coercions, which never lose data. An example of a widening coercion is coercing a value that is a 32-bit signed integer to a value that is a 64-bit signed integer. This is distinguished from a narrowing coercion, which may lose data. An example of a narrowing coercion is coercing a 64-bit signed integer to a 32-bit signed integer.

The following table lists the coercions performed by the default `ChangeType`.

|Source type|Target type|
|-----------------|-----------------|
|Any type|Its base type.|
|Any type|The interface it implements.|
|Char|UInt16, UInt32, Int32, UInt64, Int64, Single, Double|
|Byte|Char, UInt16, Int16, UInt32, Int32, UInt64, Int64, Single, Double|
|SByte|Int16, Int32, Int64, Single, Double|
|UInt16|UInt32, Int32, UInt64, Int64, Single, Double|
|Int16|Int32, Int64, Single, Double|
|UInt32|UInt64, Int64, Single, Double|
|Int32|Int64, Single, Double|
|UInt64|Single, Double|
|Int64|Single, Double|
|Single|Double|
|Non-reference|By-reference.|

If a binder implementation allows coercion of string values to numeric types, the `culture` parameter is necessary to convert a string that represents 1000 to a `Double` value, because 1000 is represented differently by different cultures. The default binder does not do such string coercions.

## Binder.ReorderArgumentArray(Object[], Object) method

```csharp
public abstract void ReorderArgumentArray (ref object?[] args, object state);
```

Upon returning from `Binder.BindToMethod`, restores the `args` argument to what it was when it came from `BindToMethod`.

Parameters:

- `args`: The actual arguments that are passed in. Both the types and values of the arguments can be changed.
- `state`: A binder-provided object that keeps track of argument reordering.

#### Remarks
The common language runtime calls this method if `state` is not `null` after a return from `BindToMethod`.

## Binder.SelectMethod(BindingFlags, MethodBase[], Type[], ParameterModifier[]) method

```csharp
public abstract System.Reflection.MethodBase? SelectMethod (System.Reflection.BindingFlags bindingAttr, System.Reflection.MethodBase[] match, Type[] types, System.Reflection.ParameterModifier[]? modifiers);
```

Selects a method from the given set of methods, based on the argument type.

Parameters:

- `bindingAttr`: A bitwise combination of `BindingFlags` values.
- `match`: The set of methods that are candidates for matching. For example, when a `Binder` object is used by `InvokeMember`, this parameter specifies the set of methods that reflection has determined to be possible matches, typically because they have the correct member name. The default implementation provided by `Type.DefaultBinder` changes the order of this array.
- `types`: The parameter types used to locate a matching method.
- `modifiers`: An array of parameter modifiers that enable binding to work with parameter signatures in which the types have been modified.

Returns: The matching method, if found; otherwise, `null`.

Exceptions:

- `AmbiguousMatchException`: For the default binder, `match` contains multiple methods that are equally good matches for the parameter types described by `types`. For example, the array in `types` contains a `Type` object for `MyClass` and the array in `match` contains a method that takes a base class of `MyClass` and a method that takes an interface that `MyClass` implements.
- `ArgumentException`: For the default binder, `match` is `null` or an empty array.

-or-

An element of `types` derives from `Type`, but is not of type `RuntimeType`.

#### Remarks
This method should return `null` if no method matches the criteria. This method controls the selection provided by the `GetConstructor` and `GetMethod` methods on `Type`.

## Binder.SelectProperty(BindingFlags, PropertyInfo[], Type, Type[], ParameterModifier[]) method

```csharp
public abstract System.Reflection.PropertyInfo? SelectProperty (System.Reflection.BindingFlags bindingAttr, System.Reflection.PropertyInfo[] match, Type? returnType, Type[]? indexes, System.Reflection.ParameterModifier[]? modifiers);
```

Selects a property from the given set of properties, based on the specified criteria.

Parameters:

- `bindingAttr`: A bitwise combination of `BindingFlags` values.
- `match`: The set of properties that are candidates for matching. For example, when a `Binder` object is used by `InvokeMember`, this parameter specifies the set of properties that reflection has determined to be possible matches, typically because they have the correct member name. The default implementation provided by `Type.DefaultBinder` changes the order of this array.
- `returnType`: The return value the matching property must have.
- `indexes`: The index types of the property being searched for. Used for index properties such as the indexer for a class.
- `modifiers`: An array of parameter modifiers that enable binding to work with parameter signatures in which the types have been modified.

Returns: The matching property.

Exceptions:

- `AmbiguousMatchException`: For the default binder, `match` contains multiple properties that are equally good matches for `returnType` and `indexes`.
- `ArgumentException`: For the default binder, `match` is `null` or an empty array.

#### Remarks
This method controls the selection provided by the `GetProperty` method on `Type`.
