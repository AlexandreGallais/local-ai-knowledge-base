---
title: "Type class (part 5 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 5 of 33)

## Type.IsGenericType property

```csharp
public virtual bool IsGenericType { get; }
```

Gets a value indicating whether the current type is a generic type.

Returns: `true` if the current type is a generic type; otherwise, `false`.

#### Remarks
Use the `IsGenericType` property to determine whether a `Type` object represents a generic type. Use the `ContainsGenericParameters` property to determine whether a `Type` object represents an open constructed type or a closed constructed type.

> **Note:**
> The `IsGenericType` property returns `false` if the immediate type is not generic. For example, an array whose elements are of type `A<int>` (`A(Of Integer)` in Visual Basic) is not itself a generic type.

The following table summarizes the invariant conditions for common terms used in generic reflection.

|Term|Invariant|
|----------|---------------|
|generic type definition|The `IsGenericTypeDefinition` property is `true`. Defines a generic type. A constructed type is created by calling the `Type.MakeGenericType` method on a `Type` object that represents a generic type definition and specifying an array of type arguments. `Type.MakeGenericType` can be called only on generic type definitions. Any generic type definition is a generic type (the `IsGenericType` property is `true`), but the converse is not true.|
|generic type|The `IsGenericType` property is `true`. Can be a generic type definition, an open constructed type, or a closed constructed type. Note that an array type whose element type is generic is not itself a generic type. The same is true of a `Type` object representing a pointer to a generic type.|
|open constructed type|The `ContainsGenericParameters` property is `true`. Examples are a generic type that has unassigned type parameters, a type that is nested in a generic type definition or in an open constructed type, or a generic type that has a type argument for which the `ContainsGenericParameters` property is `true`. it's not possible to create an instance of an open constructed type. Note that not all open constructed types are generic. For example, an array whose element type is a generic type definition is not generic, and a pointer to an open constructed type is not generic.|
|closed constructed type|The `ContainsGenericParameters` property is `false`. When examined recursively, the type has no unassigned generic parameters.|
|generic type parameter|The `IsGenericParameter` property is `true`. The `ContainsGenericParameters` property is `true`. In a generic type definition, a placeholder for a type that will be assigned later.|
|generic type argument|Can be any type, including a generic type parameter. Type arguments are specified as an array of `Type` objects passed to the `Type.MakeGenericType` method when creating a constructed generic type. If instances of the resulting type are to be created, the `ContainsGenericParameters` property must be `false` for all the type arguments.|

The following code example and table illustrate some of these terms and invariants. The `Derived` class is of particular interest because its base type is a constructed type that has a mixture of types and type parameters in its type argument list.

_Code sample not included: ~/snippets/csharp/System/Type/IsGenericType/remarks.cs._

The following table shows examples that use and build on the classes `Base`, `Derived`, and `G`. When the C++ and C# code is the same, only one entry is shown.

|Example|Invariants|
|-------------|----------------|
|`Derived(Of V)` `Derived<V>`|For this type: `Type.IsGenericType` is `true`. `Type.IsGenericTypeDefinition` is `true`. `Type.ContainsGenericParameters` is `true`.|
|`Base(Of String, V)` `Base<String,V>` `Base<String^,V>`|For this type: `Type.IsGenericType` is `true`. `Type.IsGenericTypeDefinition` is `false`. `Type.ContainsGenericParameters` is `true`.|
|`Dim d() As Derived(Of Integer)` `Derived<int>[] d;` `array<Derived<int>^>^ d;`|For the type of variable `d`: `Type.IsGenericType` is `false` because `d` is an array. `Type.IsGenericTypeDefinition` is `false`. `Type.ContainsGenericParameters` is `false`.|
|`T`, `U`, and `V` (everywhere they appear)|`Type.IsGenericParameter` is `true`. `Type.IsGenericType` is `false` because there is no way to constrain a type parameter to generic types. `Type.IsGenericTypeDefinition` is `false`. `Type.ContainsGenericParameters` is `true` because `T`, `U`, and `V` are themselves generic type parameters. This does not imply anything about type arguments that are assigned to them later.|
|The type of field `F`|`Type.IsGenericType` is `true`. `Type.IsGenericTypeDefinition` is `false` because a type has been assigned to the type parameter of `G`. Note that this is equivalent to having called the `Type.MakeGenericType` method. `Type.ContainsGenericParameters` is `true` because the type of field `F` has a type argument that is an open constructed type. The constructed type is open because its type argument (that is, `Base`) is a generic type definition. This illustrates the recursive nature of the `IsGenericType` property.|
|The nested class `Nested`|`Type.IsGenericType` is `true`, even though the `Nested` class has no generic type parameters of its own, because it's nested in a generic type. `Type.IsGenericTypeDefinition` is `true`. That is, you can call the `Type.MakeGenericType` method and supply the type parameter of the enclosing type, `Derived`. `Type.ContainsGenericParameters` is `true` because the enclosing type, `Derived`, has generic type parameters. This illustrates the recursive nature of the `ContainsGenericParameters` property.|

#### Examples
The following code example displays the value of the `Type.IsGenericType`, `Type.IsGenericTypeDefinition`, `Type.IsGenericParameter`, and `Type.ContainsGenericParameters` properties for the types described in the Remarks section. For explanations of the property values, see the accompanying table in Remarks.

_Code sample not included: ~/snippets/csharp/System/Type/IsGenericType/source.cs._

## Type.IsGenericTypeDefinition property

```csharp
public virtual bool IsGenericTypeDefinition { get; }
```

Gets a value indicating whether the current `Type` represents a generic type definition, from which other generic types can be constructed.

Returns: `true` if the `Type` object represents a generic type definition; otherwise, `false`.

#### Remarks
A generic type definition is a template from which other types can be constructed. For example, from the C# generic type definition `G<T>`, you can construct and instantiate the type `G<int>` (`G(Of Integer)` in Visual Basic), by calling the `Type.MakeGenericType` method with a generic argument list containing the `Int32` type. Given a `Type` object representing this constructed type, the `Type.GetGenericTypeDefinition` method gets the generic type definition back again.

Use the `IsGenericTypeDefinition` property to determine whether you can create new types from the current type. If the `IsGenericTypeDefinition` property returns `true`, you can call the `Type.MakeGenericType` method to create new generic types.

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Examples
The following example displays information about a type, including whether or not it's a generic type definition. Information is displayed for a constructed type, for its generic type definition, and for an ordinary type.

_Code sample not included: ~/snippets/csharp/System/Type/IsGenericParameter/source.cs._

## Type.IsGenericTypeParameter property

```csharp
public virtual bool IsGenericTypeParameter { get; }
```

Gets a value that indicates whether the current `Type` represents a type parameter in the definition of a generic type.

Returns: `true` if the `Type` object represents a type parameter of a generic type definition; otherwise, `false`.

To be added.

## Type.IsImport property

```csharp
public bool IsImport { get; }
```

Gets a value indicating whether the `Type` has a `ComImportAttribute` attribute applied, indicating that it was imported from a COM type library.

Returns: `true` if the `Type` has a `ComImportAttribute`; otherwise, `false`.

#### Remarks
If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>.`

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

## Type.IsInterface property

```csharp
public bool IsInterface { get; }
```

Gets a value indicating whether the `Type` is an interface; that is, not a class or a value type.

Returns: `true` if the `Type` is an interface; otherwise, `false`.

#### Remarks
The `ClassSemanticsMask` distinguishes a type declaration as class, interface or value type.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

This property is read-only.

#### Examples
The following example creates an interface, checks for the interface type, and indicates whether a class has the `IsInterface` property set.

_Code sample not included: ~/snippets/csharp/System/Type/IsInterface/type_isinterface.cs._

## Type.IsLayoutSequential property

```csharp
public bool IsLayoutSequential { get; }
```

Gets a value indicating whether the fields of the current type are laid out sequentially, in the order that they were defined or emitted to the metadata.

Returns: `true` if the `Type.Attributes` property of the current type includes `TypeAttributes.SequentialLayout`; otherwise, `false`.

#### Remarks
This property is provided as a convenience. Alternatively, you can use the `LayoutMask` enumeration value to select the type layout attributes, and then test whether `SequentialLayout` is set. The `AutoLayout`, `ExplicitLayout`, and `SequentialLayout` enumeration values indicate the way the fields of the type are laid out in memory.

For dynamic types, you can specify `SequentialLayout` when you create the type. In code, apply the `StructLayoutAttribute` attribute with the `Sequential` enumeration value to the type, to specify that layout is sequential.

> **Note:**
> You cannot use the `MemberInfo.GetCustomAttributes` method to determine whether the `StructLayoutAttribute` has been applied to a type.

For more information, see section 9.1.2 of the specification for the Common Language Infrastructure (CLI) documentation, "Partition II: Metadata Definition and Semantics".

If the current `Type` represents a constructed generic type, this property applies to the generic type definition from which the type was constructed. For example, if the current `Type` represents `MyGenericType<int>` (`MyGenericType(Of Integer)` in Visual Basic), the value of this property is determined by `MyGenericType<T>`.

If the current `Type` represents a type parameter in the definition of a generic type or generic method, this property always returns `false`.

#### Examples
The following example creates an instance of a class for which the `Sequential` enumeration value in the `StructLayoutAttribute` class has been set, checks for the `IsLayoutSequential` property, and displays the result.

_Code sample not included: ~/snippets/csharp/System/Type/IsLayoutSequential/type_islayoutsequential.cs._

## Type.IsMarshalByRef property

```csharp
public bool IsMarshalByRef { get; }
```

Gets a value indicating whether the `Type` is marshaled by reference.

Returns: `true` if the `Type` is marshaled by reference; otherwise, `false`.

#### Examples
The following example demonstrates the `Type.IsContextful`, `IsMarshalByRef`, and `Type.IsPrimitive` properties of the `Type` class. It checks whether the given type can be hosted in the context, whether it can be marshaled by reference, and whether the type is a primitive data type.

_Code sample not included: ~/snippets/csharp/System/Type/IsContextful/type_iscontextful.cs._

## Type.IsNested property

```csharp
public bool IsNested { get; }
```

Gets a value indicating whether the current `Type` object represents a type whose definition is nested inside the definition of another type.

Returns: `true` if the `Type` is nested inside another type; otherwise, `false`.

#### Remarks
The `IsNested` property returns `true` for all nested types, regardless of visibility. To test for nesting and visibility at the same time, use the related properties `Type.IsNestedAssembly`, `Type.IsNestedFamily`, `Type.IsNestedFamANDAssem`, `Type.IsNestedFamORAssem`, `Type.IsNestedPrivate`, or `Type.IsNestedPublic`.

> **Note:**
> The `VisibilityMask` enumeration member selects the visibility attributes for a type.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._

## Type.IsNestedAssembly property

```csharp
public bool IsNestedAssembly { get; }
```

Gets a value indicating whether the `Type` is nested and visible only within its own assembly.

Returns: `true` if the `Type` is nested and visible only within its own assembly; otherwise, `false`.

#### Remarks
If the current `Type` represents a type parameter of a generic type, this property always returns `false`.

`VisibilityMask` selects the visibility attributes.

#### Examples
The following example creates an outer class with a number of nested classes that have various types of visibility. It then retrieves the value of a number of visibility-related `Type` properties for the parent type and each of its nested types.

_Code sample not included: ~/snippets/csharp/System/Type/IsNested/isnestedfamilyandassembly1.cs._
