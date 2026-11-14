---
title: "MethodBase class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodBase class (part 2 of 4)

## MethodBase.IsHideBySig property

```csharp
public bool IsHideBySig { get; }
```

Gets a value indicating whether only a member of the same kind with exactly the same signature is hidden in the derived class.

Returns: `true` if the member is hidden by signature; otherwise, `false`.

#### Remarks
When a member in a derived class is declared with the C# `new` modifier or the Visual Basic `Shadows` modifier, it can hide a member of the same name in the base class. C# hides base class members by signature. That is, if the base class member has multiple overloads, the only one that is hidden is the one that has the identical signature. By contrast, Visual Basic hides all the base class overloads. Thus, `MethodBase.IsHideBySig` returns `false` on a member declared with the Visual Basic `Shadows` modifier, and `true` on a member declared with the C# `new` modifier.

> **Warning:**
> This property does not determine whether a method has the `NewSlot` attribute. A method that is declared with either the `new` or the `Shadows` modifier will have the `NewSlot` attribute, but only methods declared with `new` (that is, only C# methods) will have the `IsHideBySig` property set to `true`.  To determine whether a method has the `NewSlot` attribute, use code similar to the following: `if ((myMethodInfo.Attributes & MethodAttributes.VtableLayoutMask) == MethodAttributes.NewSlot)` in C# or `If (myMethodInfo.Attributes And MethodAttributes.VtableLayoutMask) = MethodAttributes.NewSlot` in Visual Basic. Note, however, that although all methods declared with `new` or `Shadows` have the `NewSlot` attribute, not all methods that have the `NewSlot` attribute are declared with `new` or `Shadows`.

#### Examples
The following code example contains a base class with an overloaded method, and a derived class that hides one of the overloads. In the Visual Basic <example-value> of the code example, the `IsHideBySig` property returns `false` for the member in the derived class. In the C# version of the code sample, the property returns `true` for the member in the derived class.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsHideBySig/hide.cs._

## MethodBase.IsPrivate property

```csharp
public bool IsPrivate { get; }
```

Gets a value indicating whether this member is private.

Returns: `true` if access to this method is restricted to other members of the class itself; otherwise, `false`.

#### Remarks
If a type member has `Private` level visibility, it can be called from any member in the same class and no others.

## MethodBase.IsPublic property

```csharp
public bool IsPublic { get; }
```

Gets a value indicating whether this is a public method.

Returns: `true` if this method is public; otherwise, `false`.

#### Remarks
To get the `MethodBase`, first get the type. From the type, get the method. From the method, get the `MethodBase`. If the `MethodBase` or constructor is other than public, it is protected and cannot be readily accessed. To access a non-public method, set the `BindingFlags` mask to `NonPublic` in `GetMethod`.

#### Examples
The following example uses the `IsPublic` property to display a message that indicates whether the specified method is public.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsPublic/source.cs._

## MethodBase.IsSecurityCritical property

```csharp
public virtual bool IsSecurityCritical { get; }
```

Gets a value that indicates whether the current method or constructor is security-critical or security-safe-critical at the current trust level, and therefore can perform critical operations.

Returns: `true` if the current method or constructor is security-critical or security-safe-critical at the current trust level; `false` if it is transparent.

#### Remarks
The `MethodBase.IsSecurityCritical`, `MethodBase.IsSecuritySafeCritical`, and `MethodBase.IsSecurityTransparent` properties report the transparency level of the method or constructor at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## MethodBase.IsSecuritySafeCritical property

```csharp
public virtual bool IsSecuritySafeCritical { get; }
```

Gets a value that indicates whether the current method or constructor is security-safe-critical at the current trust level; that is, whether it can perform critical operations and can be accessed by transparent code.

Returns: `true` if the method or constructor is security-safe-critical at the current trust level; `false` if it is security-critical or transparent.

#### Remarks
The `MethodBase.IsSecurityCritical`, `MethodBase.IsSecuritySafeCritical`, and `MethodBase.IsSecurityTransparent` properties report the transparency level of the method or constructor at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## MethodBase.IsSecurityTransparent property

```csharp
public virtual bool IsSecurityTransparent { get; }
```

Gets a value that indicates whether the current method or constructor is transparent at the current trust level, and therefore cannot perform critical operations.

Returns: `true` if the method or constructor is security-transparent at the current trust level; otherwise, `false`.

#### Remarks
If this property returns `true`, the `MethodBase.IsSecurityCritical` and `MethodBase.IsSecuritySafeCritical` properties return `false`.

The `MethodBase.IsSecurityCritical`, `MethodBase.IsSecuritySafeCritical`, and `MethodBase.IsSecurityTransparent` properties report the transparency level of the method or constructor at its current trust level, as determined by the common language runtime (CLR). Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## MethodBase.IsSpecialName property

```csharp
public bool IsSpecialName { get; }
```

Gets a value indicating whether this method has a special name.

Returns: `true` if this method has a special name; otherwise, `false`.

#### Remarks
The `SpecialName` bit is set to flag members that are treated in a special way by some compilers (such as property accessors and operator overloading methods).

#### Examples
This example shows a use of `MethodBase.IsSpecialName` to filter internal or private members out of a list.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsSpecialName/source.cs._

## MethodBase.IsStatic property

```csharp
public bool IsStatic { get; }
```

Gets a value indicating whether the method is `static`.

Returns: `true` if this method is `static`; otherwise, `false`.

#### Remarks
A static member cannot implicitly reference instance data in a class.

## MethodBase.IsVirtual property

```csharp
public bool IsVirtual { get; }
```

Gets a value indicating whether the method is `virtual`.

Returns: `true` if this method is `virtual`; otherwise, `false`.

#### Remarks
A virtual member may reference instance data in a class and must be referenced through an instance of the class.

To determine if a method is overridable, it is not sufficient to check that `IsVirtual` is `true`. For a method to be overridable, `IsVirtual` must be `true` and `MethodBase.IsFinal` must be `false`. For example, a method might be non-virtual, but it implements an interface method. The common language runtime requires that all methods that implement interface members must be marked as `virtual`; therefore, the compiler marks the method `virtual final`. So there are cases where a method is marked as `virtual` but is still not overridable.

To establish with certainty whether a method is overridable, use code such as this:

```csharp
if (MethodInfo.IsVirtual && !MethodInfo.IsFinal)
```

```vb
If MethodInfo.IsVirtual AndAlso Not MethodInfo.IsFinal Then
```

If `IsVirtual` is `false` or `IsFinal` is `true`, then the method cannot be overridden.

You can determine whether the current method overrides a method in a base class by calling the `MethodInfo.GetBaseDefinition` method. The following example implements an `IsOverride` method that does this.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsVirtual/IsOverride1.cs._

#### Examples
The following example displays `false` for `IsFinal`, which might lead you to think that `MyMethod` is overridable. The code prints `false` even though `MyMethod` is not marked `virtual` and thus cannot be overridden.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/IsFinal/source.cs._

## MethodBase.MethodHandle property

```csharp
public abstract RuntimeMethodHandle MethodHandle { get; }
```

Gets a handle to the internal metadata representation of a method.

Returns: A `RuntimeMethodHandle` object.

To be added.

## MethodBase.MethodImplementationFlags property

```csharp
public virtual System.Reflection.MethodImplAttributes MethodImplementationFlags { get; }
```

Gets the `MethodImplAttributes` flags that specify the attributes of a method implementation.

Returns: The method implementation flags.

#### Remarks
See the `MethodBase.GetMethodImplementationFlags` method for more information.

## MethodBase.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## MethodBase.GetCurrentMethod() method

```csharp
public static System.Reflection.MethodBase? GetCurrentMethod ();
```

Returns a `MethodBase` object representing the currently executing method.

Returns: `MethodBase.GetCurrentMethod` is a static method that is called from within an executing method and that returns information about that method.

A `MethodBase` object representing the currently executing method.

Exceptions:

- `TargetException`: This member was invoked with a late-binding mechanism.

#### Remarks
If the currently executing method is defined on a generic type, the `MethodInfo` that is returned by `MethodBase.GetCurrentMethod` is obtained from the generic type definition (that is, `MethodBase.ContainsGenericParameters` returns `true`). Therefore, it does not reflect the type arguments that were used when the method was called. For example, if a method `M()` is defined on a generic type `C<T>` (`C(Of T)` in Visual Basic), and `MethodBase.GetCurrentMethod` is called from `C<string>.M()`, then `MethodBase.GetCurrentMethod` returns `C<T>.M()` (`C(Of T).M()` in Visual Basic).

If the currently executing method is a generic method, `MethodBase.GetCurrentMethod` returns the generic method definition. If the generic method is defined on a generic type, the `MethodInfo` is obtained from the generic type definition.

#### Examples
The following example defines two types. The first is a non-generic class, `TestClass`, includes a constructor, a method named `GetValue`, and a read-write property named `GetValue`. The second is a generic class named `TestClass<T>` that includes a constructor, a `GetValue` method, and a generic method, `ConvertValue<Y>`. Each constructor, method, and property accessor includes a call to the `MethodBase.GetCurrentMethod` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/MethodBase/GetCurrentMethod/GetCurentMethod1.cs._
