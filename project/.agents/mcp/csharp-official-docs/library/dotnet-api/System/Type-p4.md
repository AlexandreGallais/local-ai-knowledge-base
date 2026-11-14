---
title: "Type class (part 4 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 4 of 33)

## Type.IsByRefLike property

```csharp
public virtual bool IsByRefLike { get; }
```

Gets a value that indicates whether the type is a byref-like structure.

Returns: `true` if the `Type` is a byref-like structure; otherwise, `false`.

#### Remarks
Byref-like structures are declared using `ref struct` keyword in C#. An instance of the byref-like structure can't be placed on the managed heap. For more information, see Ref struct.

## Type.IsClass property

```csharp
public bool IsClass { get; }
```

Gets a value indicating whether the `Type` is a class or a delegate; that is, not a value type or interface.

Returns: `true` if the `Type` is a class; otherwise, `false`.

#### Remarks
This property returns `true` for classes as well as delegates. It returns `false` for value types (for structures and enumerations) even if they are boxed.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `true`. If the current `Type` represents a constructed generic type, this property returns `true` if the generic type definition is a class definition; that is, it does not define an interface or a value type.

> **Note:**
> This property returns `true` for `Type` instances that represent the `Enum` and `ValueType` classes. These two classes are the base types for enumerations and value types, respectively, but they are not enumerations or value types themselves. For more information, see the `Type.IsValueType` and `Type.IsEnum` properties.

The `ClassSemanticsMask` enumeration value  distinguishes a type declaration as class or interface. However, both classes and value types are marked with the `Class` attribute. If you retrieve the value of a type's Attributes property and use the `ClassSemanticsMask` value to determine whether a type is a class instead of a value type, you must also call the `IsValueType` property. The example for the `TypeAttributes` enumeration contains additional information as well as anexample.

This property is read-only.

#### Examples
The following example creates an instance of a type and indicates whether the type is a class.

_Code sample not included: ~/snippets/csharp/System/Type/IsClass/type_isclass.cs._

## Type.IsCOMObject property

```csharp
public bool IsCOMObject { get; }
```

Gets a value indicating whether the `Type` is a COM object.

Returns: `true` if the `Type` is a COM object; otherwise, `false`.

#### Remarks
This method returns `false` for COM interfaces because they are not objects. COM interfaces can be implemented by .NET objects.

You can also load a COM class and get a `Type` object for that COM class by using the Tlbimp.exe (Type Library Importer) tool.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int`> (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

## Type.IsConstructedGenericType property

```csharp
public virtual bool IsConstructedGenericType { get; }
```

Gets a value that indicates whether this object represents a constructed generic type. You can create instances of a constructed generic type.

Returns: `true` if this object represents a constructed generic type; otherwise, `false`.

#### Remarks
A constructed generic type has had explicit types supplied for all of its generic type parameters. it's also referred to as a closed generic type.

When this property is `true`, you can create instances of the current type; when it's `false`, you can't.

## Type.IsContextful property

```csharp
public bool IsContextful { get; }
```

Gets a value indicating whether the `Type` can be hosted in a context.

Returns: `true` if the `Type` can be hosted in a context; otherwise, `false`.

#### Remarks
A context intercepts calls to the class members and enforces policies that are applied to the class, such as synchronization. For more detailed information on remoting contexts, see `Context`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example demonstrates the `IsContextful`, `Type.IsMarshalByRef`, and `Type.IsPrimitive` properties of the `Type` class. It checks whether the given type can be hosted in the context, whether it can be marshaled by reference, and whether the type is a primitive data type.

_Code sample not included: ~/snippets/csharp/System/Type/IsContextful/type_iscontextful.cs._

## Type.IsEnum property

```csharp
public virtual bool IsEnum { get; }
```

Gets a value indicating whether the current `Type` represents an enumeration.

Returns: `true` if the current `Type` represents an enumeration; otherwise, `false`.

#### Remarks
This property returns `true` for an enumeration, but not for the `Enum` type itself.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

This property is read-only.

#### Examples
The following example demonstrates how to use the `IsEnum` property.

_Code sample not included: ~/snippets/csharp/System/Type/IsEnum/testisenum.cs._

## Type.IsExplicitLayout property

```csharp
public bool IsExplicitLayout { get; }
```

Gets a value indicating whether the fields of the current type are laid out at explicitly specified offsets.

Returns: `true` if the `Type.Attributes` property of the current type includes `TypeAttributes.ExplicitLayout`; otherwise, `false`.

#### Remarks
This property is provided as a convenience. Alternatively, you can use the `LayoutMask` enumeration value to select the type layout attributes, and then test whether `ExplicitLayout` is set. The `AutoLayout`, `ExplicitLayout`, and `SequentialLayout` enumeration values indicate the way the fields of the type are laid out in memory.

For dynamic types, you can specify `ExplicitLayout` when you create the type. In code, apply the `StructLayoutAttribute` attribute with the `Explicit` enumeration value to the type, to specify that the offsets at which the fields start are specified explicitly.

> **Note:**
> You cannot use the `MemberInfo.GetCustomAttributes` method to determine whether the `StructLayoutAttribute` has been applied to a type.

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example creates an instance of a type and displays the value of its `IsExplicitLayout` property. It uses the `MySystemTime` class, which is also in the code example for `StructLayoutAttribute`.

_Code sample not included: ~/snippets/csharp/System/Type/IsExplicitLayout/type_isexplicitlayout.cs._

## Type.IsFunctionPointer property

```csharp
public virtual bool IsFunctionPointer { get; }
```

Gets a value that indicates whether the current `Type` is a function pointer.

Returns: `true` if the current `Type` is a function pointer; otherwise, `false`.

To be added.

## Type.IsGenericMethodParameter property

```csharp
public virtual bool IsGenericMethodParameter { get; }
```

Gets a value that indicates whether the current `Type` represents a type parameter in the definition of a generic method.

Returns: `true` if the `Type` object represents a type parameter of a generic method definition; otherwise, `false`.

To be added.

## Type.IsGenericParameter property

```csharp
public virtual bool IsGenericParameter { get; }
```

Gets a value indicating whether the current `Type` represents a type parameter in the definition of a generic type or method.

Returns: `true` if the `Type` object represents a type parameter of a generic type definition or generic method definition; otherwise, `false`.

#### Remarks
`Type` objects that represent generic type parameters can be obtained by calling the `Type.GetGenericArguments` method of a `Type` object that represents a generic type definition, or the `MethodInfo.GetGenericArguments` method of a `MethodInfo` object that represents a generic method definition.

- For a generic type or method definition, the `IsGenericParameter` property returns `true` for every element of the resulting array.

- For a closed constructed type or method, the `IsGenericParameter` property returns `false` for every element of the array returned by the `Type.GetGenericArguments` method.

- For an open constructed type or method, some elements of the array might be specific types and others might be type parameters. `Type.IsGenericParameter` returns `false` for the types and `true` for the type parameters. The code example for the `ContainsGenericParameters` property demonstrates a generic class with a mixture of types and type parameters.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following example uses the `IsGenericParameter` property to test for generic type parameters in a generic type.

_Code sample not included: ~/snippets/csharp/System/Type/GetGenericArguments/source.cs._
