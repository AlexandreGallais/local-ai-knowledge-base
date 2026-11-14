---
title: "BindingFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/BindingFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindingFlags enum

Namespace: `System.Reflection`

```csharp
public enum BindingFlags
```

Specifies flags that control binding and the way in which the search for members and types is conducted by reflection.

#### Remarks
These `BindingFlags` control binding for a great many classes in the `System`, `System.Reflection`, and `System.Runtime` namespaces that invoke, create, get, set, and find members and types.

`BindingFlags` are used in the following `Type` methods and other places such as `MethodBase.Invoke`:

-   `MethodBase.Invoke`

-   `Type.GetMembers`

-   `Type.GetEvents`

-   `Type.InvokeMember`

-   `Activator.CreateInstance`

-   `Type.GetConstructor`

-   `Type.GetConstructors`

-   `Type.GetMethod`

-   `Type.GetMethods`

-   `Type.GetField`

-   `Type.GetFields`

-   `Type.GetEvent`

-   `Type.GetProperty`

-   `Type.GetProperties`

-   `Type.GetMember`

-   `Type.FindMembers`

`InvokeMember` and `GetMethod` are especially important.

The binding flags can be categorized by how they identify a type member, as listed in the following table.

|Identified by Accessibility|Identified by Binding Argument|Identified by Operation|
|---------------------------------|------------------------------------|-----------------------------|
|DeclaredOnly FlattenHierarchy IgnoreCase IgnoreReturn Instance NonPublic Public Static|ExactBinding OptionalParamBinding|CreateInstance GetField SetField GetProperty SetProperty InvokeMethod PutDispProperty PutRefDispProperty|

> **Note:**
>  You must specify `Instance` or `Static` along with `Public` or `NonPublic` or no members will be returned.

The following table lists the coercions performed by the default `Binder.ChangeType`. This table applies especially to the `BindingFlags.ExactBinding` binding flag. The general principle is that `Binder.ChangeType` should perform only widening coercions, which never lose data. An example of a widening coercion is coercing a value that is a 32-bit signed integer to a value that is a 64-bit signed integer. This is distinguished from a narrowing coercion, which may lose data. An example of a narrowing coercion is coercing a 64-bit signed integer to a 32-bit signed integer.

|Source Type|Target Type|
|-----------------|-----------------|
|Any type|Its base type.|
|Any type|The interface it implements.|
|`Char`|`UInt16`, `UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double`|
|`Byte`|`Char`, `UInt16`, `Int16`, `UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double`|
|`SByte`|`Int16`, `Int32`, `Int64`, `Single`, `Double`|
|`UInt16`|`UInt32`, `Int32`, `UInt64`, `Int64`, `Single`, `Double`|
|`Int16`|`Int32`, `Int64`, `Single`, `Double`|
|`UInt32`|`UInt64`, `Int64`, `Single`, `Double`|
|`Int32`|`Int64`, `Single`, `Double`|
|`UInt64`|`Single`, `Double`|
|`Int64`|`Single`, `Double`|
|`Single`|`Double`|
|Non-reference|By-reference.|

When the `BindingFlags.ExactBinding` binding flag is used, reflection models the accessibility rules of the common type system. For example, if the caller is in the same assembly, the caller does not need special permissions for internal members. Otherwise, the caller needs `ReflectionPermission`. This is consistent with the lookup of members that are protected, private, and so on.

#### Examples
The following example demonstrates many of the binding flags.

_Code sample not included: ~/snippets/csharp/System.Reflection/BindingFlags/Overview/bindingflagssample.cs._

## BindingFlags.CreateInstance field

```csharp
CreateInstance
```

Specifies that reflection should create an instance of the specified type. Calls the constructor that matches the given arguments. The supplied member name is ignored. If the type of lookup is not specified, (Instance | Public) will apply. It is not possible to call a type initializer.

This flag is passed to an `InvokeMember` method to invoke a constructor.

## BindingFlags.DeclaredOnly field

```csharp
DeclaredOnly
```

Specifies that only members declared at the level of the supplied type's hierarchy should be considered. Inherited members are not considered.

## BindingFlags.Default field

```csharp
Default
```

Specifies that no binding flags are defined.

## BindingFlags.DoNotWrapExceptions field

```csharp
DoNotWrapExceptions
```

Specifies that exceptions should not be wrapped in a `TargetInvocationException`.

## BindingFlags.ExactBinding field

```csharp
ExactBinding
```

Specifies that types of the supplied arguments must exactly match the types of the corresponding formal parameters. Reflection throws an exception if the caller supplies a non-null `Binder` object, since that implies that the caller is supplying `BindToXXX` implementations that will pick the appropriate method. The default binder ignores this flag, while custom binders can implement the semantics of this flag.

## BindingFlags.FlattenHierarchy field

```csharp
FlattenHierarchy
```

Specifies that public and protected static members up the hierarchy should be returned. Private static members in inherited classes are not returned. Static members include fields, methods, events, and properties. Nested types are not returned.

## BindingFlags.GetField field

```csharp
GetField
```

Specifies that the value of the specified field should be returned.

This flag is passed to an `InvokeMember` method to get a field value.

## BindingFlags.GetProperty field

```csharp
GetProperty
```

Specifies that the value of the specified property should be returned.

This flag is passed to an `InvokeMember` method to invoke a property getter.

## BindingFlags.IgnoreCase field

```csharp
IgnoreCase
```

Specifies that the case of the member name should not be considered when binding.

## BindingFlags.IgnoreReturn field

```csharp
IgnoreReturn
```

Used in COM interop to specify that the return value of the member can be ignored.

## BindingFlags.Instance field

```csharp
Instance
```

Specifies that instance members are to be included in the search.

## BindingFlags.InvokeMethod field

```csharp
InvokeMethod
```

Specifies that a method is to be invoked. This must not be a constructor or a type initializer.

This flag is passed to an `InvokeMember` method to invoke a method.

## BindingFlags.NonPublic field

```csharp
NonPublic
```

Specifies that non-public members are to be included in the search.

## BindingFlags.OptionalParamBinding field

```csharp
OptionalParamBinding
```

Returns the set of members whose parameter count matches the number of supplied arguments. This binding flag is used for methods with parameters that have default values and methods with variable arguments (varargs). This flag should only be used with `Type.InvokeMember`.Parameters with default values are used only in calls where trailing arguments are omitted. They must be the last arguments.

## BindingFlags.Public field

```csharp
Public
```

Specifies that public members are to be included in the search.

## BindingFlags.PutDispProperty field

```csharp
PutDispProperty
```

Specifies that the `PROPPUT` member on a COM object should be invoked. `PROPPUT` specifies a property-setting function that uses a value. Use `PutDispProperty` if a property has both `PROPPUT` and `PROPPUTREF` and you need to distinguish which one is called.

## BindingFlags.PutRefDispProperty field

```csharp
PutRefDispProperty
```

Specifies that the `PROPPUTREF` member on a COM object should be invoked. `PROPPUTREF` specifies a property-setting function that uses a reference instead of a value. Use `PutRefDispProperty` if a property has both `PROPPUT` and `PROPPUTREF` and you need to distinguish which one is called.

## BindingFlags.SetField field

```csharp
SetField
```

Specifies that the value of the specified field should be set.

This flag is passed to an `InvokeMember` method to set a field value.

## BindingFlags.SetProperty field

```csharp
SetProperty
```

Specifies that the value of the specified property should be set. For COM properties, specifying this binding flag is equivalent to specifying `PutDispProperty` and `PutRefDispProperty`.

This flag is passed to an `InvokeMember` method to invoke a property setter.

## BindingFlags.Static field

```csharp
Static
```

Specifies that static members are to be included in the search.

## BindingFlags.SuppressChangeType field

```csharp
SuppressChangeType
```

Not implemented.
