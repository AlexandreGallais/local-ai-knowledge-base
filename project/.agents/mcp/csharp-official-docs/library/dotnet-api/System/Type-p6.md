---
title: "Type class (part 6 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 6 of 33)

## Type.IsNestedFamANDAssem property

```csharp
public bool IsNestedFamANDAssem { get; }
```

Gets a value indicating whether the `Type` is nested and visible only to classes that belong to both its own family and its own assembly.

Returns: `true` if the `Type` is nested and visible only to classes that belong to both its own family and its own assembly; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

> **Note:**
> The C# and Visual Basic <example-value> do not include semantics that allow you to define a nested type that is visible only to protected types in its own assembly. `protected internal` visibility in C# and `Protected Friend` visibility in Visual Basic <example-value> a nested type that is visible both to protected types and to types in the same assembly.

A `Type` object's family is defined as all objects of the same `Type` and of its subtypes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNestedFamily property

```csharp
public bool IsNestedFamily { get; }
```

Gets a value indicating whether the `Type` is nested and visible only within its own family.

Returns: `true` if the `Type` is nested and visible only within its own family; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

A `Type` object's family is defined as all objects of the exact same `Type` and of its subtypes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNestedFamORAssem property

```csharp
public bool IsNestedFamORAssem { get; }
```

Gets a value indicating whether the `Type` is nested and visible only to classes that belong to either its own family or to its own assembly.

Returns: `true` if the `Type` is nested and visible only to classes that belong to its own family or to its own assembly; otherwise, `false`.

#### Remarks
If the visibility of a type is `protected internal` in C# or `Protected Friend` in Visual Basic, the `IsNestedFamORAssem` property returns `true`.

If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

A `Type` object's family is defined as all objects of the exact same `Type` and of its subtypes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNestedPrivate property

```csharp
public bool IsNestedPrivate { get; }
```

Gets a value indicating whether the `Type` is nested and declared private.

Returns: `true` if the `Type` is nested and declared private; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNestedPublic property

```csharp
public bool IsNestedPublic { get; }
```

Gets a value indicating whether a class is nested and declared public.

Returns: `true` if the class is nested and declared public; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNotPublic property

```csharp
public bool IsNotPublic { get; }
```

Gets a value indicating whether the `Type` is not declared public.

Returns: `true` if the `Type` is not declared public and is not a nested type; otherwise, `false`.

#### Remarks
Do not use this property with nested types; use the `IsNestedPublic` property instead.

If the current `Type` represents a type parameter of a generic type, this property returns `false`.

#### Examples
This example uses the `IsNotPublic` property to get the visibility of the type.

_Code sample not included: ~/snippets/csharp/System/Type/IsNotPublic/source.cs._

The following code example demonstrates why you cannot use `IsPublic` and `IsNotPublic` for nested classes.

_Code sample not included: ~/snippets/csharp/System/Type/IsNotPublic/source.cs._

For nested classes, ignore the results of `IsPublic` and `IsNotPublic` and pay attention only to the results of `IsNestedPublic` and `IsNestedPrivate`. The reflection output for this code fragment would be as follows:

|Class|IsNotPublic|IsPublic|IsNestedPublic|IsNestedPrivate|
|-----------|-----------------|--------------|--------------------|---------------------|
|A|FALSE|TRUE|FALSE|FALSE|
|B|FALSE|FALSE|TRUE|FALSE|
|C|FALSE|FALSE|FALSE|TRUE|

## Type.IsPointer property

```csharp
public bool IsPointer { get; }
```

Gets a value indicating whether the `Type` is a pointer.

Returns: `true` if the `Type` is a pointer; otherwise, `false`.

#### Remarks
If the current `Type` represents a generic type, or a type parameter in the definition of a generic type or generic method, this property always returns `false`.

This property is read-only.

#### Examples
The following example shows a use of the `IsPointer` property.

_Code sample not included: ~/snippets/csharp/System/Type/HasElementTypeImpl/type_haselementtypeimpl.cs._

## Type.IsPrimitive property

```csharp
public bool IsPrimitive { get; }
```

Gets a value indicating whether the `Type` is one of the primitive types.

Returns: `true` if the `Type` is one of the primitive types; otherwise, `false`.

#### Remarks
The primitive types are `Boolean`, `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, `IntPtr`, `UIntPtr`, `Char`, `Double`, and `Single`.

If the current `Type` represents a generic type, or a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example demonstrates the `Type.IsContextful`, `Type.IsMarshalByRef`, and `IsPrimitive` properties of the `Type` class. It checks whether the given type can be hosted in the context, whether it can be marshaled by reference, and whether the type is a primitive data type.

_Code sample not included: ~/snippets/csharp/System/Type/IsContextful/type_iscontextful.cs._

## Type.IsPublic property

```csharp
public bool IsPublic { get; }
```

Gets a value indicating whether the `Type` is declared public.

Returns: `true` if the `Type` is declared public and is not a nested type; otherwise, `false`.

#### Remarks
Do not use with nested types; use `Type.IsNestedPublic` instead.

If the current `Type` represents a type parameter of a generic type, this property returns `true`.

`VisibilityMask` selects the visibility attributes.

#### Examples
The following example creates an instance of `MyTestClass`, checks for the `IsPublic` property, and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsPublic/type_ispublic.cs._

For nested classes, ignore the results of `IsPublic` and `IsNotPublic` and pay attention only to the results of `Type.IsNestedPublic` and `Type.IsNestedPrivate`.

## Type.IsSealed property

```csharp
public bool IsSealed { get; }
```

Gets a value indicating whether the `Type` is declared sealed.

Returns: `true` if the `Type` is declared sealed; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `true`.

#### Examples
The following example creates an instance of a `sealed` class, checks for the `IsSealed` property, and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsSealed/type_issealed.cs._

## Type.IsSecurityCritical property

```csharp
public virtual bool IsSecurityCritical { get; }
```

Gets a value that indicates whether the current type is security-critical or security-safe-critical at the current trust level, and therefore can perform critical operations.

Returns: `true` if the current type is security-critical or security-safe-critical at the current trust level; `false` if it's transparent.

#### Remarks
The `Type.IsSecurityCritical`, `Type.IsSecuritySafeCritical`, and `Type.IsSecurityTransparent` properties report the transparency level of the type at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection

## Type.IsSecuritySafeCritical property

```csharp
public virtual bool IsSecuritySafeCritical { get; }
```

Gets a value that indicates whether the current type is security-safe-critical at the current trust level; that is, whether it can perform critical operations and can be accessed by transparent code.

Returns: `true` if the current type is security-safe-critical at the current trust level; `false` if it's security-critical or transparent.

#### Remarks
The `Type.IsSecurityCritical`, `Type.IsSecuritySafeCritical`, and `Type.IsSecurityTransparent` properties report the transparency level of the type at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## Type.IsSecurityTransparent property

```csharp
public virtual bool IsSecurityTransparent { get; }
```

Gets a value that indicates whether the current type is transparent at the current trust level, and therefore cannot perform critical operations.

Returns: `true` if the type is security-transparent at the current trust level; otherwise, `false`.

#### Remarks
If this property returns `true`, the `Type.IsSecurityCritical` and `Type.IsSecuritySafeCritical` properties return `false`.

The `Type.IsSecurityCritical`, `Type.IsSecuritySafeCritical`, and `Type.IsSecurityTransparent` properties report the transparency level of the type at its current trust level, as determined by the common language runtime (CLR). Using these properties is much simpler than examining the security annotations of an assembly and its types, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## Type.IsSerializable property

```csharp
public virtual bool IsSerializable { get; }
```

Gets a value indicating whether the `Type` is binary serializable.

Returns: `true` if the `Type` is binary serializable; otherwise, `false`.

To be added.

## Type.IsSignatureType property

```csharp
public virtual bool IsSignatureType { get; }
```

Gets a value that indicates whether the type is a signature type.

Returns: `true` if the `Type` is a signature type; otherwise, `false`.

#### Remarks

A signature type is a restricted type that can be passed to the `Type.GetMethod` method but does not support most of the other reflection functionality. For example, you can obtain the signature type instance corresponding to the generic method parameter by calling the `Type.MakeGenericMethodParameter` method.

## Type.IsSpecialName property

```csharp
public bool IsSpecialName { get; }
```

Gets a value indicating whether the type has a name that requires special handling.

Returns: `true` if the type has a name that requires special handling; otherwise, `false`.

#### Remarks
Names that begin with or contain an underscore character (_), property accessors, and operator overloading methods are examples of types that might require special treatment by some compilers.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.
