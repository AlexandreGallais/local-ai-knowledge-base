---
title: "ConstructorInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ConstructorInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConstructorInfo class

Namespace: `System.Reflection`

```csharp
public abstract class ConstructorInfo : System.Reflection.MethodBase
```

Discovers the attributes of a class constructor and provides access to constructor metadata.

#### Remarks
`ConstructorInfo` is used to discover the attributes of a constructor as well as to invoke a constructor. Objects are created by calling `ConstructorInfo.Invoke` on a `ConstructorInfo` returned by either the `Type.GetConstructors` or `Type.GetConstructor` method of a `Type` object.

#### Examples
The following example uses `ConstructorInfo` with `Type.GetConstructor` and `BindingFlags` to find the constructors that match the specified search criteria.

_Code sample not included: ~/snippets/csharp/System/Type/GetConstructor/type_getconstructor3.cs._

## ConstructorInfo.ConstructorInfo() constructor

```csharp
protected ConstructorInfo ();
```

Initializes a new instance of the `ConstructorInfo` class.

To be added.

## ConstructorInfo.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is a constructor.

Returns: A `MemberTypes` value indicating that this member is a constructor.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `Constructor` only when a given member is a constructor.

#### Examples
The following example uses the `MemberType` property to identify a `MemberInfo` object as a constructor.

_Code sample not included: ~/snippets/csharp/System.Reflection/ConstructorInfo/MemberType/source.cs._

## ConstructorInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## ConstructorInfo.GetGenericArguments() method

```csharp
public override Type[] GetGenericArguments ();
```

To be added.

Returns: To be added.

To be added.

## ConstructorInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ConstructorInfo.Invoke(Object[]) method

```csharp
public object Invoke (object?[]? parameters);
```

Invokes the constructor reflected by the instance that has the specified parameters, providing default values for the parameters not commonly used.

Parameters:

- `parameters`: An array of values that matches the number, order and type (under the constraints of the default binder) of the parameters for this constructor. If this constructor takes no parameters, then use either an array with zero elements or `null`, as in Object[] parameters = new Object[0]. Any object in this array that is not explicitly initialized with a value will contain the default value for that object type. For reference-type elements, this value is `null`. For value-type elements, this value is 0, 0.0, or `false`, depending on the specific element type.

Returns: An instance of the class associated with the constructor.

Exceptions:

- `MemberAccessException`: The class is abstract.

-or-

The constructor is a class initializer.
- `MethodAccessException`: The constructor is private or protected, and the caller lacks `ReflectionPermissionFlag.MemberAccess`.
- `ArgumentException`: The `parameters` array does not contain values that match the types accepted by this constructor.
- `TargetInvocationException`: The invoked constructor throws an exception.
- `TargetParameterCountException`: An incorrect number of parameters was passed.
- `NotSupportedException`: Creation of `TypedReference`, `ArgIterator`, and `RuntimeArgumentHandle` types is not supported.
- `SecurityException`: The caller does not have the necessary code access permission.

#### Remarks
The number, type, and order of elements in the `parameters` array should be identical to the number, type, and order of parameters for the constructor reflected by this instance. Before calling the constructor, `Invoke` ensures that the caller has access permission and verifies that the parameters are valid.

Access restrictions are ignored for fully trusted code. That is, private constructors, methods, fields, and properties can be accessed and invoked using reflection whenever the code is fully trusted.

> **Note:**
> To create an instance of a value type that has no instance constructors, use the `Activator.CreateInstance` method.

This method is a convenience method for using default values. This method cannot be overridden.

## ConstructorInfo.Invoke(BindingFlags, Binder, Object[], CultureInfo) method

```csharp
public abstract object Invoke (System.Reflection.BindingFlags invokeAttr, System.Reflection.Binder? binder, object?[]? parameters, System.Globalization.CultureInfo? culture);
```

When implemented in a derived class, invokes the constructor reflected by this `ConstructorInfo` with the specified arguments, under the constraints of the specified `Binder`.

Parameters:

- `invokeAttr`: One of the `BindingFlags` values that specifies the type of binding.
- `binder`: A `Binder` that defines a set of properties and enables the binding, coercion of argument types, and invocation of members using reflection. If `binder` is `null`, then `Binder.DefaultBinding` is used.
- `parameters`: An array of type `Object` used to match the number, order and type of the parameters for this constructor, under the constraints of `binder`. If this constructor does not require parameters, pass an array with zero elements, as in Object[] parameters = new Object[0]. Any object in this array that is not explicitly initialized with a value will contain the default value for that object type. For reference-type elements, this value is `null`. For value-type elements, this value is 0, 0.0, or `false`, depending on the specific element type.
- `culture`: A `CultureInfo` used to govern the coercion of types. If this is `null`, the `CultureInfo` for the current thread is used.

Returns: An instance of the class associated with the constructor.

Exceptions:

- `ArgumentException`: The `parameters` array does not contain values that match the types accepted by this constructor, under the constraints of the `binder`.
- `TargetInvocationException`: The invoked constructor throws an exception.
- `TargetParameterCountException`: An incorrect number of parameters was passed.
- `NotSupportedException`: Creation of `TypedReference`, `ArgIterator`, and `RuntimeArgumentHandle` types is not supported.
- `SecurityException`: The caller does not have the necessary code access permissions.
- `MemberAccessException`: The class is abstract.

-or-

The constructor is a class initializer.
- `MethodAccessException`: The constructor is private or protected, and the caller lacks `ReflectionPermissionFlag.MemberAccess`.

#### Remarks
The number, type, and order of elements in the `parameters` array should be identical to the number, type, and order of parameters for the constructor reflected by this instance.

Before calling the constructor, `Invoke` ensures that the caller has access permission and that the parameters are of the correct number, order and type.

> **Note:**
> To create an instance of a value type that has no instance constructors, use the `Activator.CreateInstance` method.

## ConstructorInfo.op_Equality(ConstructorInfo, ConstructorInfo) method

```csharp
public static bool operator == (System.Reflection.ConstructorInfo? left, System.Reflection.ConstructorInfo? right);
```

Indicates whether two `ConstructorInfo` objects are equal.

Parameters:

- `left`: The first `ConstructorInfo` to compare.
- `right`: The second `ConstructorInfo` to compare.

Returns: `true` if `left` is equal to `right`; otherwise `false`.

To be added.

## ConstructorInfo.op_Inequality(ConstructorInfo, ConstructorInfo) method

```csharp
public static bool operator != (System.Reflection.ConstructorInfo? left, System.Reflection.ConstructorInfo? right);
```

Indicates whether two `ConstructorInfo` objects are not equal.

Parameters:

- `left`: The first `ConstructorInfo` to compare.
- `right`: The second `ConstructorInfo` to compare.

Returns: `true` if `left` is not equal to `right`; otherwise `false`.

To be added.

## ConstructorInfo.ConstructorName field

```csharp
public static readonly string ConstructorName;
```

Represents the name of the class constructor method as it is stored in metadata. This name is always ".ctor". This field is read-only.

To be added.

## ConstructorInfo.TypeConstructorName field

```csharp
public static readonly string TypeConstructorName;
```

Represents the name of the type constructor method as it is stored in metadata. This name is always ".cctor". This property is read-only.

To be added.
