---
title: "MethodInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodInfo class

Namespace: `System.Reflection`

```csharp
public abstract class MethodInfo : System.Reflection.MethodBase
```

Discovers the attributes of a method and provides access to method metadata.

#### Remarks
The `MethodInfo` class represents a method of a type. You can use a `MethodInfo` object to obtain information about the method that the object represents and to invoke the method. For example:

- You can determine the method's visibility by retrieving the values of the `MethodBase.IsFamilyAndAssembly`, `MethodBase.IsFamilyOrAssembly`, `MethodBase.IsPrivate`, and `MethodBase.IsPublic` properties.

- You can discover what attributes are applied to the method by retrieving the value of the `Attributes` property or calling the `Assembly.GetCustomAttributes` method.

- You can determine whether the method is a generic method, an open constructed generic method, or a closed constructed generic method, by retrieving the values of the `MethodBase.IsGenericMethod` and `MethodBase.ContainsGenericParameters` properties.

- You can get information about the method's parameters and return type from the `MethodBase.GetParameters` method and the `MethodInfo.ReturnParameter`, `MethodInfo.ReturnType`, and `MethodInfo.ReturnTypeCustomAttributes` properties.

- You can execute a method on a class instance by calling the `MethodBase.Invoke` method.

- You can instantiate a `MethodInfo` object that represents a constructed generic method from one that represents a generic method definition by calling the `MethodInfo.MakeGenericMethod` method.

You can instantiate a `MethodInfo` instances by calling the `Type.GetMethods` or `Type.GetMethod` method, or by calling the `MethodInfo.MakeGenericMethod` method of a `MethodInfo` object that represents a generic method definition.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

## MethodInfo.MethodInfo() constructor

```csharp
protected MethodInfo ();
```

Initializes a new instance of the `MethodInfo` class.

To be added.

## MethodInfo.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is a method.

Returns: A `MemberTypes` value indicating that this member is a method.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `Method` only when a given member is a method.

To get the `MemberType` property, first get the class `Type`. From the `Type`, get the `MethodInfo`. From the `MethodInfo`, get the `MemberType`.

#### Examples
The following example displays the type of the specified member.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodInfo/MemberType/source.cs._

## MethodInfo.ReturnParameter property

```csharp
public virtual System.Reflection.ParameterInfo ReturnParameter { get; }
```

Gets a `ParameterInfo` object that contains information about the return type of the method, such as whether the return type has custom modifiers.

Returns: A `ParameterInfo` object that contains information about the return type.

Exceptions:

- `NotImplementedException`: This method is not implemented.

#### Remarks
Compiler designers can use the `ParameterInfo` object returned by this property to discover whether custom modifiers, such as `IsConstModifier`, have been applied to the return type.

## MethodInfo.ReturnType property

```csharp
public virtual Type ReturnType { get; }
```

Gets the return type of this method.

Returns: The return type of this method.

#### Remarks
To get the return type property, first get the class `Type`. From the `Type`, get the `MethodInfo`. From the `MethodInfo`, get the `ReturnType`.

#### Examples
The following example displays the return type of the specified method.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodInfo/ReturnType/source.cs._

## MethodInfo.ReturnTypeCustomAttributes property

```csharp
public abstract System.Reflection.ICustomAttributeProvider ReturnTypeCustomAttributes { get; }
```

Gets the custom attributes for the return type.

Returns: An `ICustomAttributeProvider` object representing the custom attributes for the return type.

To be added.

## MethodInfo.CreateDelegate(Type) method

```csharp
public virtual Delegate CreateDelegate (Type delegateType);
```

Creates a delegate of the specified type from this method.

Parameters:

- `delegateType`: The type of the delegate to create.

Returns: The delegate for this method.

To be added.

## MethodInfo.CreateDelegate(Type, Object) method

```csharp
public virtual Delegate CreateDelegate (Type delegateType, object? target);
```

Creates a delegate of the specified type with the specified target from this method.

Parameters:

- `delegateType`: The type of the delegate to create.
- `target`: The object targeted by the delegate.

Returns: The delegate for this method.

To be added.

## MethodInfo.CreateDelegate<T>() method

```csharp
public T CreateDelegate<T> () where T : Delegate;
```

Creates a delegate of type `T` from this method.

Parameters:

- `T`: The type of the delegate to create.

Returns: The delegate for this method.

To be added.

## MethodInfo.CreateDelegate<T>(Object) method

```csharp
public T CreateDelegate<T> (object? target) where T : Delegate;
```

Creates a delegate of type `T` with the specified target from this method.

Parameters:

- `T`: The type of the delegate to create.
- `target`: The object targeted by the delegate.

Returns: The delegate for this method.

To be added.

## MethodInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## MethodInfo.GetBaseDefinition() method

```csharp
public abstract System.Reflection.MethodInfo GetBaseDefinition ();
```

When overridden in a derived class, returns the `MethodInfo` object for the method on the direct or indirect base class in which the method represented by this instance was first declared.

Returns: A `MethodInfo` object for the first implementation of this method.

#### Remarks
The `MethodInfo.GetBaseDefinition` method returns the first definition of the specified method in the class hierarchy. You can determine the type on which the first definition of the method is found by retrieving the value of the `DeclaringType` property on the returned `MethodInfo` object.

The `MethodInfo.GetBaseDefinition` method behaves as follows:

- If the current `MethodInfo` object represents an interface implementation, the `MethodInfo.GetBaseDefinition` method returns the current `MethodInfo` object.

- If the current `MethodInfo` object represents a method that overrides a virtual definition in a base class, the `MethodInfo.GetBaseDefinition` method returns a `MethodInfo` object that represents the virtual definition.

- If the current `MethodInfo` object represents a method that is specified with the `new` keyword in C# or the `Shadows` keyword in Visual Basic (as in `newslot`, as described in Common Type System), the `MethodInfo.GetBaseDefinition` method returns the current `MethodInfo` object.

- If the current `MethodInfo` object represents an inherited method (that is, the current method does not provide its own implementation), the `MethodInfo.GetBaseDefinition` method returns a `MethodInfo` object that represents the lowest method in the class hierarchy. For example, if `Base.ToString` overrides `Object.ToString`, and `Derived.ToString` overrides `Base.ToString`, calling the `MethodInfo.GetBaseDefinition` method on a `MethodInfo` object that represents `Derived.ToString` returns a `MethodInfo` object that represents `Object.ToString`.

- If the current `MethodInfo` object represents a method that is not present in any base class, the `MethodInfo.GetBaseDefinition` method returns the current `MethodInfo` object.

You can determine whether the current method overrides a method in a base class by calling the `MethodInfo.GetBaseDefinition` method. The following example implements an `IsOverride` method that does this.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsVirtual/IsOverride1.cs._

To call the `GetBaseDefinition` method:

1.  Get a `Type` object that represents the type (the class or structure) that contains the property. If you are working with an object (an instance of a type), you can call its `Object.GetType` method. Otherwise, you can use the C#  operator or the Visual Basic <example-value> operator, as the example illustrates.

2.  Get a `MethodInfo` object that represents the method in which you're interested. You can do this by getting an array of all methods from the `Type.GetMethods` method and then iterating the elements in the array, or you can retrieve the `MethodInfo` object that represents the method directly by calling the `GetMethod` method and specifying the method name.

3.  Call the `MethodInfo.GetBaseDefinition` method to get the value of the `MethodInfo` object that represents the base method definition.

#### Examples
The following example demonstrates the behavior of the `MethodInfo.GetBaseDefinition` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsVirtual/getbasedefinition1.cs._

## MethodInfo.GetGenericArguments() method

```csharp
public override Type[] GetGenericArguments ();
```

Returns an array of `Type` objects that represent the type arguments of a generic method or the type parameters of a generic method definition.

Returns: An array of `Type` objects that represent the type arguments of a generic method or the type parameters of a generic method definition. Returns an empty array if the current method is not a generic method.

Exceptions:

- `NotSupportedException`: This method is not supported.

#### Remarks
The elements of the returned array are in the order in which they appear in the list of type parameters for the generic method.

- If the current method is a closed constructed method (that is, the `ContainsGenericParameters` property returns `false`), the array returned by the `MethodInfo.GetGenericArguments` method contains the types that have been assigned to the generic type parameters of the generic method definition.

- If the current method is a generic method definition, the array contains the type parameters.

- If the current method is an open constructed method (that is, the `ContainsGenericParameters` property returns `true`) in which specific types have been assigned to some type parameters and type parameters of enclosing generic types have been assigned to other type parameters, the array contains both types and type parameters. Use the `IsGenericParameter` property to tell them apart. For a demonstration of this scenario, see the code example for the `ContainsGenericParameters` property.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

#### Examples
The following code example shows how to get the type arguments of a generic method and display them.

This example is part of a larger example provided for the `MethodInfo.MakeGenericMethod` method.

_Code sample not included: ~/snippets/csharp/System/Type/DeclaringMethod/source.cs._
