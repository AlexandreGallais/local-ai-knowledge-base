---
title: "MethodBase class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodBase class

Namespace: `System.Reflection`

```csharp
public abstract class MethodBase : System.Reflection.MemberInfo
```

Provides information about methods and constructors.

#### Remarks
`MethodBase` is the base class of `MethodInfo` and `ConstructorInfo`.

## MethodBase.MethodBase() constructor

```csharp
protected MethodBase ();
```

Initializes a new instance of the `MethodBase` class.

To be added.

## MethodBase.Attributes property

```csharp
public abstract System.Reflection.MethodAttributes Attributes { get; }
```

Gets the attributes associated with this method.

Returns: One of the `MethodAttributes` values.

#### Remarks
All members have a set of attributes, which are defined in relation to the specific type of member.

To get the `MethodAttributes`, first get the type. From the type, get the method. From the method, get the `MethodAttributes`.

#### Examples
The following code example displays the attributes of the user-defined method Mymethod.

_Code sample not included: ~/snippets/csharp/System/Type/GetFields/source.cs._

## MethodBase.CallingConvention property

```csharp
public virtual System.Reflection.CallingConventions CallingConvention { get; }
```

Gets a value indicating the calling conventions for this method.

Returns: The `CallingConventions` for this method.

To be added.

## MethodBase.ContainsGenericParameters property

```csharp
public virtual bool ContainsGenericParameters { get; }
```

Gets a value indicating whether the generic method contains unassigned generic type parameters.

Returns: `true` if the current `MethodBase` object represents a generic method that contains unassigned generic type parameters; otherwise, `false`.

#### Remarks
A generic method can be invoked only if there are no generic type definitions or open constructed types in the type arguments of the method itself or in any enclosing types. Because types can be arbitrarily complex, making this recursive determination is difficult. For convenience, and to reduce the chance of error, the `ContainsGenericParameters` property provides a standard way to distinguish between closed constructed methods, which can be invoked, and open constructed methods, which cannot. If the `ContainsGenericParameters` property returns `true`, the method cannot be invoked.

The `ContainsGenericParameters` property searches recursively for type parameters. For example, it returns `true` for any method in an open type `A<T>` (`A(Of T)` in Visual Basic), even though the method itself is not generic. Contrast this with the behavior of the `IsGenericMethod` property, which returns `false` for such a method.

Similarly, the `ContainsGenericParameters` property parameter returns `true` for any constructor in an open type, even though constructors cannot have type parameters of their own.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.

## MethodBase.IsAbstract property

```csharp
public bool IsAbstract { get; }
```

Gets a value indicating whether the method is abstract.

Returns: `true` if the method is abstract; otherwise, `false`.

#### Remarks
An abstract member is declared on a base class and has no implementation supplied.

To get the `MethodBase`, first get the type. From the type, get the method. From the method, get the `MethodBase`. If the `MethodBase` or constructor is other than public, it is protected and cannot be readily accessed. To access a non-public method, set the `BindingFlags` mask to `NonPublic` in `GetMethod`.

#### Examples
The following example determines whether specified the method is abstract and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsAbstract/source.cs._

## MethodBase.IsAssembly property

```csharp
public bool IsAssembly { get; }
```

Gets a value indicating whether the potential visibility of this method or constructor is described by `MethodAttributes.Assembly`; that is, the method or constructor is visible at most to other types in the same assembly, and is not visible to derived types outside the assembly.

Returns: `true` if the visibility of this method or constructor is exactly described by `MethodAttributes.Assembly`; otherwise, `false`.

#### Remarks
The actual visibility of a method is limited by the visibility of its type. The `IsAssembly` property might be `true` for a method, but if it is a method of a private nested type then the method is not visible outside the containing type.

The visibility of a method or constructor is exactly described by `Assembly` if the only visibility modifier is `internal` (`Friend` in Visual Basic). This property is `false` for methods that are `protected internal` in C# (`Protected Friend` in Visual Basic); use the `IsFamilyOrAssembly` property to identify such methods.

#### Examples
The following code example defines methods with varying levels of visibility, and displays the values of their `MethodBase.IsAssembly`, `MethodBase.IsFamily`, `MethodBase.IsFamilyOrAssembly`, and `MethodBase.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsAssembly/source.cs._

## MethodBase.IsConstructedGenericMethod property

```csharp
public virtual bool IsConstructedGenericMethod { get; }
```

To be added.

Returns: To be added.

To be added.

## MethodBase.IsConstructor property

```csharp
public bool IsConstructor { get; }
```

Gets a value indicating whether the method is a constructor.

Returns: `true` if this method is a constructor represented by a `ConstructorInfo` object (see note in Remarks about `ConstructorBuilder` objects); otherwise, `false`.

#### Remarks

> **Note:**
> The `IsConstructor` property returns `false` for a `ConstructorBuilder` object in a dynamic type, unless the `RTSpecialName` flag was included in the `attributes` parameter when the constructor was defined. Omitting the `RTSpecialName` flag does not affect the correctness of the emitted constructor.

## MethodBase.IsFamily property

```csharp
public bool IsFamily { get; }
```

Gets a value indicating whether the visibility of this method or constructor is described by `MethodAttributes.Family`; that is, the method or constructor is visible only within its class and derived classes.

Returns: `true` if access to this method or constructor is exactly described by `MethodAttributes.Family`; otherwise, `false`.

#### Remarks
The visibility of a method or constructor is exactly described by `Family` if the only visibility modifier is `protected`. This property is `false` for methods that are `protected internal` in C# (`Protected Friend` in Visual Basic); use the `IsFamilyOrAssembly` property to identify such methods.

#### Examples
The following code example defines methods with varying levels of visibility, and displays the values of their `MethodBase.IsAssembly`, `MethodBase.IsFamily`, `MethodBase.IsFamilyOrAssembly`, and `MethodBase.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsAssembly/source.cs._

## MethodBase.IsFamilyAndAssembly property

```csharp
public bool IsFamilyAndAssembly { get; }
```

Gets a value indicating whether the visibility of this method or constructor is described by `MethodAttributes.FamANDAssem`; that is, the method or constructor can be called by derived classes, but only if they are in the same assembly.

Returns: `true` if access to this method or constructor is exactly described by `MethodAttributes.FamANDAssem`; otherwise, `false`.

#### Remarks
The visibility of a method or constructor is exactly described by `FamANDAssem` if the visibility modifier is `private protected` in C# or `Private Protected` in Visual Basic.

#### Examples
The following code example defines methods with varying levels of visibility, and displays the values of their `MethodBase.IsAssembly`, `MethodBase.IsFamily`, `MethodBase.IsFamilyOrAssembly`, and `MethodBase.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsAssembly/source.cs._

## MethodBase.IsFamilyOrAssembly property

```csharp
public bool IsFamilyOrAssembly { get; }
```

Gets a value indicating whether the potential visibility of this method or constructor is described by `MethodAttributes.FamORAssem`; that is, the method or constructor can be called by derived classes wherever they are, and by classes in the same assembly.

Returns: `true` if access to this method or constructor is exactly described by `MethodAttributes.FamORAssem`; otherwise, `false`.

#### Remarks
If a type member has `FamORAssem` visibility, it can be called from any member in a derived class or any member in the same assembly, but not from any other type.

The actual visibility of a method is limited by the visibility of its type. The `IsFamilyOrAssembly` property might be `true` for a method, but if it is a method of a private nested type then the method is not visible outside the containing type.

The visibility of a method or constructor is exactly described by `FamORAssem` if the visibility modifier is `protected internal` in C# (`Protected Friend` in Visual Basic).

#### Examples
The following code example defines methods with varying levels of visibility, and displays the values of their `MethodBase.IsAssembly`, `MethodBase.IsFamily`, `MethodBase.IsFamilyOrAssembly`, and `MethodBase.IsFamilyAndAssembly` properties.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsAssembly/source.cs._

## MethodBase.IsFinal property

```csharp
public bool IsFinal { get; }
```

Gets a value indicating whether this method is `final`.

Returns: `true` if this method is `final`; otherwise, `false`.

#### Remarks

If the virtual method is marked `final`, it can't be overridden in derived classes. The overridden virtual method can be marked `final` using the sealed keyword in C# or NotOverridable keyword in Visual Basic. The method can also be marked `final` implicitly by the compiler. For example, a method might be defined as non-virtual in your code, but it implements an interface method. The Common Language Runtime requires that all methods that implement interface members must be marked as `virtual`; therefore, the compiler marks the method `virtual final`.

You can use this property, in conjunction with the `IsVirtual` property, to determine if a method is overridable. For a method to be overridable, `IsVirtual` property must be `true` and `IsFinal` property must be `false`. To establish with certainty whether a method is overridable, use code such as this:

```csharp
if (MethodInfo.IsVirtual && !MethodInfo.IsFinal)
```

```vb
If MethodInfo.IsVirtual AndAlso Not MethodInfo.IsFinal Then
```

If `IsVirtual` is `false` or `IsFinal` is `true`, then the method cannot be overridden.

#### Examples
The following example displays `false` for `IsFinal`, which might lead you to think that MyMethod is overridable. The code prints `false` even though MyMethod is not marked `virtual` and thus cannot be overridden.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsFinal/source.cs._

## MethodBase.IsGenericMethod property

```csharp
public virtual bool IsGenericMethod { get; }
```

Gets a value indicating whether the method is generic.

Returns: `true` if the current `MethodBase` represents a generic method; otherwise, `false`.

#### Remarks
Use the `IsGenericMethod` property to determine whether the current `MethodBase` object represents a generic method. Use the `ContainsGenericParameters` property to determine whether the current `MethodBase` object represents an open constructed method or a closed constructed method.

> **Note:**
> Generics are not supported by default; this property returns `false` if not overridden in a derived class.

The following table summarizes the invariant conditions for terms specific to generic methods. For other terms used in generic reflection, such as *generic type parameter* and *generic type*, see the `IsGenericType` property.

|Term|Invariant condition|
|---|---|
|generic method definition| The `IsGenericMethodDefinition` property is `true`. Defines a generic method. A constructed method is created by calling the `MethodInfo.MakeGenericMethod` method on a `MethodInfo` object that represents a generic method definition, and specifying an array of type arguments. The `MethodInfo.MakeGenericMethod` method can be called only on generic method definitions. Any generic method definition is a generic method, but the converse is not true.|
|generic method|The `IsGenericMethod` property is `true`.  Can be a generic method definition, an open constructed method, or a closed constructed method.|
|open constructed method|The `ContainsGenericParameters` property is `true`. It is not possible to invoke an open constructed method.|
|closed constructed method|The `ContainsGenericParameters` property is `false`. When examined recursively, the method has no unassigned generic parameters. The containing type has no generic type parameters, and none of the type arguments have generic type parameters. The method can be invoked.|

## MethodBase.IsGenericMethodDefinition property

```csharp
public virtual bool IsGenericMethodDefinition { get; }
```

Gets a value indicating whether the method is a generic method definition.

Returns: `true` if the current `MethodBase` object represents the definition of a generic method; otherwise, `false`.

#### Remarks
If the current `MethodBase` represents a generic method definition, then:

- The `IsGenericMethodDefinition` property is `true`.

- For each `Type` object in the array returned by the `MethodBase.GetGenericArguments` method:

- The `IsGenericParameter` property is `true`.
- The `DeclaringMethod` property returns the current instance.
- The `GenericParameterPosition` property is the same as the position of the `Type` object in the array.

> **Note:**
> Generics are not supported by default; this property returns `false` if not overridden in a derived class.

For a list of the invariant conditions for terms specific to generic methods, see the `IsGenericMethod` property. For a list of the invariant conditions for other terms used in generic reflection, see the `IsGenericType` property.
