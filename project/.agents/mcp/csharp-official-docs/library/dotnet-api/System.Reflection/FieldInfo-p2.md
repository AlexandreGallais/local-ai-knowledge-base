---
title: "FieldInfo class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/FieldInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FieldInfo class (part 2 of 3)

## FieldInfo.IsSecuritySafeCritical property

```csharp
public virtual bool IsSecuritySafeCritical { get; }
```

Gets a value that indicates whether the current field is security-safe-critical at the current trust level.

Returns: `true` if the current field is security-safe-critical at the current trust level; `false` if it is security-critical or transparent.

#### Remarks
The `FieldInfo.IsSecurityCritical`, `FieldInfo.IsSecuritySafeCritical`, and `FieldInfo.IsSecurityTransparent` properties report the transparency level of the field at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## FieldInfo.IsSecurityTransparent property

```csharp
public virtual bool IsSecurityTransparent { get; }
```

Gets a value that indicates whether the current field is transparent at the current trust level.

Returns: `true` if the field is security-transparent at the current trust level; otherwise, `false`.

#### Remarks
The `FieldInfo.IsSecurityCritical`, `FieldInfo.IsSecuritySafeCritical`, and `FieldInfo.IsSecurityTransparent` properties report the transparency level of the field at its current trust level, as determined by the common language runtime (CLR). The combinations of these properties are shown in the following table:

| Security level | IsSecurityCritical | IsSecuritySafeCritical | IsSecurityTransparent |
|----------------|--------------------|------------------------|-----------------------|
| Critical       | `true`             | `false`                | `false`               |
| Safe critical  | `true`             | `true`                 | `false`               |
| Transparent    | `false`            | `false`                | `true`                |

Using these properties is much simpler than examining the security annotations of an assembly and its types and members, checking the current trust level, and attempting to duplicate the runtime's rules.

For more information about reflection and transparency, see Security Considerations for Reflection.

## FieldInfo.IsSpecialName property

```csharp
public bool IsSpecialName { get; }
```

Gets a value indicating whether the corresponding `SpecialName` attribute is set in the `FieldAttributes` enumerator.

Returns: `true` if the `SpecialName` attribute is set in `FieldAttributes`; otherwise, `false`.

#### Remarks
Names that begin with or contain an underscore character (_), property accessors, and operator overloading methods are examples of names that might require special treatment by some compilers.

#### Examples
The following example returns a value indicating whether or not the fields in the class contain a SpecialName attribute.

_Code sample not included: ~/snippets/csharp/System/Type/GetFields/fieldinfo_isspecialname.cs._

## FieldInfo.IsStatic property

```csharp
public bool IsStatic { get; }
```

Gets a value indicating whether the field is static.

Returns: `true` if this field is static; otherwise, `false`.

#### Remarks
When a field is static, one copy of the field is shared by all instances of the type.

The `IsStatic` property is set when the `FieldAttributes.Static` attribute is set.

To get the `IsStatic` property, first get the class `Type`. From the `Type`, get the `FieldInfo`. From the `FieldInfo`, get the `IsStatic` property. To access a non-public field, set the `BindingFlags` to `NonPublic` in the `GetField` method and set the accessibility to `Instance` or `Static`.

#### Examples
The following example determines whether the specified field is static and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/IsStatic/source.cs._

This code produces the following output:

```console
Reflection.FieldInfo

Myfielda - A private field; IsStatic - False

Myfieldb - B static field; IsStatic - True
```

## FieldInfo.MemberType property

```csharp
public override System.Reflection.MemberTypes MemberType { get; }
```

Gets a `MemberTypes` value indicating that this member is a field.

Returns: A `MemberTypes` value indicating that this member is a field.

#### Remarks
This property overrides `MemberInfo.MemberType`. Therefore, when you examine a set of `MemberInfo` objects - for example, the array returned by `Type.GetMembers` - the `MemberType` property returns `Field` only when a given member is a field.

#### Examples
The following example determines whether the specified member is a field and displays the result.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/MemberType/source.cs._

This code produces the following output:

```console
Reflection.FieldInfo

Myfield.field - a private field; MemberType is a Field
```

## FieldInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## FieldInfo.GetFieldFromHandle(RuntimeFieldHandle) method

```csharp
public static System.Reflection.FieldInfo GetFieldFromHandle (RuntimeFieldHandle handle);
```

Gets a `FieldInfo` for the field represented by the specified handle.

Parameters:

- `handle`: A `RuntimeFieldHandle` structure that contains the handle to the internal metadata representation of a field.

Returns: A `FieldInfo` object representing the field specified by `handle`.

Exceptions:

- `ArgumentException`: `handle` is invalid.

#### Examples
The following code example uses the `Type.GetFields` method to get `FieldInfo` objects for the fields of a type, gets a `RuntimeFieldHandle` structure for each field, and then retrieves the `FieldInfo` objects from the handles using this overload of the `FieldInfo.GetFieldFromHandle` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/GetFieldFromHandle/fieldinfo_getfieldfromhandle.cs._

## FieldInfo.GetFieldFromHandle(RuntimeFieldHandle, RuntimeTypeHandle) method

```csharp
public static System.Reflection.FieldInfo GetFieldFromHandle (RuntimeFieldHandle handle, RuntimeTypeHandle declaringType);
```

Gets a `FieldInfo` for the field represented by the specified handle, for the specified generic type.

Parameters:

- `handle`: A `RuntimeFieldHandle` structure that contains the handle to the internal metadata representation of a field.
- `declaringType`: A `RuntimeTypeHandle` structure that contains the handle to the generic type that defines the field.

Returns: A `FieldInfo` object representing the field specified by `handle`, in the generic type specified by `declaringType`.

Exceptions:

- `ArgumentException`: `handle` is invalid.

-or-

`declaringType` is not compatible with `handle`. For example, `declaringType` is the runtime type handle of the generic type definition, and `handle` comes from a constructed type.

#### Remarks

The recommended practice is that `declaringType` should always be the runtime type handle of the constructed type that `handle` belongs to. That is, if `handle` is a runtime field handle for a field that belongs to `MyType<int>` (`MyType(Of Integer)` in Visual Basic), `declaringType` is the runtime type handle for `MyType<int>`. Do not use the runtime type handle of the generic type definition, unless the runtime field handle represents a field on the generic type definition.

Implementations are compatible in some cases. For example, a single implementation is shared by all types that are constructed from a particular generic type definition by using reference types for the generic type arguments. For example, `MyType<string>`, `MyType<object>`, and `MyType<ArrayList>` all share the same implementation. In this situation, the `FieldInfo` object that is returned represents a field on the type that `declaringType` specifies, regardless of the original source of `handle`. This practice is not recommended, because it works only if the generic type arguments of the constructed type are reference types.

If a generic argument is a value type, the runtime type handle of the constructed type is not compatible with runtime field handles from constructions that have a reference type in the same generic parameter position, or that have a different value type in that position. In that case, the only way to use the `GetFieldFromHandle` overload is to ensure that `declaringType` is the runtime type handle for the constructed type that `handle` belongs to.

#### Examples
The following example shows how to retrieve `FieldInfo` objects for fields on constructed generic classes. The example defines the generic type `Test<T>` (`Test(Of T)` in Visual Basic) with a single field named `TestField`, of type `T`. The example gets the `RuntimeFieldHandle` and `RuntimeTypeHandle` for the case where `T` is `String`, and demonstrates the following:

- An exception is thrown if the `GetFieldFromHandle` method overload is used. This is true even if the field is not of type `T`.

- A `FieldInfo` is retrieved successfully if the runtime type handle is from the same construction as the runtime field handle, in this case `Test<string>`.

- If the runtime type handle is from a compatible construction, in this case `Test<object>`, a `FieldInfo` for the field on the compatible construction is retrieved.

- If the runtime type handle is not from a compatible construction, an exception is thrown. In this case, a value type is specified for `T`.

_Code sample not included: ~/snippets/csharp/System.Reflection/FieldInfo/GetFieldFromHandle/source.cs._

## FieldInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## FieldInfo.GetModifiedFieldType() method

```csharp
public virtual Type GetModifiedFieldType ();
```

Gets the modified type of this field object.

Returns: A modified type.

#### Remarks
A modified type supports `Type.GetOptionalCustomModifiers`, `Type.GetRequiredCustomModifiers`, and `Type.GetFunctionPointerCallingConventions`, which are used to obtain custom modifiers from a function pointer.

To obtain the normal, unmodified type from a modified type, use `Type.UnderlyingSystemType`.

This method is provided for designers of managed compilers. For more information on custom modifiers, see classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## FieldInfo.GetOptionalCustomModifiers() method

```csharp
public virtual Type[] GetOptionalCustomModifiers ();
```

Gets an array of types that identify the optional custom modifiers of the field.

Returns: An array of `Type` objects that identify the optional custom modifiers of the current field, such as `IsConst`.

#### Remarks
The `FieldInfo.GetOptionalCustomModifiers` and `FieldInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.

## FieldInfo.GetRawConstantValue() method

```csharp
public virtual object? GetRawConstantValue ();
```

Returns a literal value associated with the field by a compiler.

Returns: An `Object` that contains the literal value associated with the field. If the literal value is a class type with an element value of zero, the return value is `null`.

Exceptions:

- `InvalidOperationException`: The Constant table in unmanaged metadata does not contain a constant value for the current field.
- `FormatException`: The type of the value is not one of the types permitted by the Common Language Specification (CLS). See the ECMA Partition II specification Metadata Logical Format: Other Structures, Element Types used in Signatures.
- `NotSupportedException`: The constant value for the field is not set.

#### Remarks
This method is provided for designers of managed compilers and code analyzers.

This method can be used in both the execution context and the reflection-only context.

In unmanaged metadata, the Constant table is used to store constant values for fields, parameters, and properties. Constant information does not directly influence runtime behavior. Compilers inspect this information, at compile time, when importing metadata. If used, the value of a constant is embedded in the Microsoft intermediate language (MSIL) stream the compiler emits. There are no MSIL instructions that can be used to access the Constant table at run time.

> **Note:**
> For more information on constant values and the Constant table, see Partition II of the Common Language Infrastructure (CLI) documentation.

## FieldInfo.GetRequiredCustomModifiers() method

```csharp
public virtual Type[] GetRequiredCustomModifiers ();
```

Gets an array of types that identify the required custom modifiers of the property.

Returns: An array of `Type` objects that identify the required custom modifiers of the current property, such as `IsConst` or `IsImplicitlyDereferenced`.

#### Remarks
The `FieldInfo.GetOptionalCustomModifiers` and `FieldInfo.GetRequiredCustomModifiers` methods are provided for designers of managed compilers. For more information on custom modifiers, see `IsBoxed` and related classes in the `CompilerServices` namespace. Also see the metadata specification in Partition II of the Common Language Infrastructure (CLI) documentation.
