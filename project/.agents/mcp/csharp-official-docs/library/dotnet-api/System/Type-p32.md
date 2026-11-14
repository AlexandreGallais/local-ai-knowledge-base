---
title: "Type class (part 32 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 32 of 33)

## Type.MakeGenericMethodParameter(Int32) method

```csharp
public static Type MakeGenericMethodParameter (int position);
```

Returns a signature type object that can be passed into the `Type[]` array parameter of a `GetMethod` method to represent a generic parameter reference.

Parameters:

- `position`: The typed parameter position.

Returns: A signature type object that can be passed into the `Type[]` array parameter of a `GetMethod` method to represent a generic parameter reference.

Exceptions:

- `ArgumentOutOfRangeException`: `position` is negative.

To be added.

## Type.MakeGenericSignatureType(Type, Type[]) method

```csharp
public static Type MakeGenericSignatureType (Type genericTypeDefinition, params Type[] typeArguments);
```

Creates a generic signature type, which allows third party reimplementations of Reflection to fully support the use of signature types in querying type members.

Parameters:

- `genericTypeDefinition`: The generic type definition.
- `typeArguments`: An array of type arguments.

Returns: A generic signature type.

To be added.

## Type.MakeGenericType(Type[]) method

```csharp
public virtual Type MakeGenericType (params Type[] typeArguments);
```

Substitutes the elements of an array of types for the type parameters of the current generic type definition and returns a `Type` object representing the resulting constructed type.

Parameters:

- `typeArguments`: An array of types to be substituted for the type parameters of the current generic type.

Returns: A `Type` representing the constructed type formed by substituting the elements of `typeArguments` for the type parameters of the current generic type.

Exceptions:

- `InvalidOperationException`: The current type does not represent a generic type definition. That is, `Type.IsGenericTypeDefinition` returns `false`.
- `ArgumentNullException`: `typeArguments` is `null`.

-or-

Any element of `typeArguments` is `null`.
- `ArgumentException`: The number of elements in `typeArguments` is not the same as the number of type parameters in the current generic type definition.

-or-

Any element of `typeArguments` does not satisfy the constraints specified for the corresponding type parameter of the current generic type.

-or-

`typeArguments` contains an element that is a pointer type (`Type.IsPointer` returns `true`), a by-ref type (`Type.IsByRef` returns `true`), or `Void`.
- `NotSupportedException`: The invoked method is not supported in the base class. Derived classes must provide an implementation.

The `Type.MakeGenericType` method allows you to write code that assigns specific types to the type parameters of a generic type definition, thus creating a `Type` object that represents a particular constructed type. You can use this `Type` object to create runtime instances of the constructed type.

Types constructed with `Type.MakeGenericType` can be open, that is, some of their type arguments can be type parameters of enclosing generic methods or types. You might use such open constructed types when you emit dynamic assemblies. For example, consider the classes `Base` and `Derived` in the following code.

_Code sample not included: ~/snippets/csharp/System/Type/MakeGenericType/remarks.cs._

To generate `Derived` in a dynamic assembly, it is necessary to construct its base type. To do this, call the `Type.MakeGenericType` method on a `Type` object representing the class `Base`, using the generic type arguments `Int32` and the type parameter `V` from `Derived`. Because types and generic type parameters are both represented by `Type` objects, an array containing both can be passed to the `Type.MakeGenericType` method.

> **Note:**
> A constructed type such as `Base<int, V>` is useful when emitting code, but you cannot call the `Type.MakeGenericType` method on this type because it is not a generic type definition. To create a closed constructed type that can be instantiated, first call the `Type.GetGenericTypeDefinition` method to get a `Type` object representing the generic type definition and then call `Type.MakeGenericType` with the desired type arguments.

The `Type` object returned by `Type.MakeGenericType` is the same as the `Type` obtained by calling the `Object.GetType` method of the resulting constructed type, or the `Object.GetType` method of any constructed type that was created from the same generic type definition using the same type arguments.

> **Note:**
> An array of generic types is not itself a generic type. You cannot call `Type.MakeGenericType` on an array type such as `C<T>[]` (`Dim ac() As C(Of T)` in Visual Basic). To construct a closed generic type from `C<T>[]`, call `Type.GetElementType` to obtain the generic type definition `C<T>`; call `Type.MakeGenericType` on the generic type definition to create the constructed type; and finally call the `Type.MakeArrayType` method on the constructed type to create the array type. The same is true of pointer types and `ref` types (`ByRef` in Visual Basic).

For a list of the invariant conditions for terms used in generic reflection, see the `IsGenericType` property remarks.

#### Nested types

If a generic type is defined using C#, C++, or Visual Basic, then its nested types are all generic. This is true even if the nested types have no type parameters of their own, because all three languages include the type parameters of enclosing types in the type parameter lists of nested types. Consider the following classes:

_Code sample not included: ~/snippets/csharp/System/Type/MakeGenericType/remarks.cs._

The type parameter list of the nested class `Inner` has two type parameters, `T` and `U`, the first of which is the type parameter of its enclosing class. Similarly, the type parameter list of the nested class `Innermost1` has three type parameters, `T`, `U`, and `V`, with `T` and `U` coming from its enclosing classes. The nested class `Innermost2` has two type parameters, `T` and `U`, which come from its enclosing classes.

If the parameter list of the enclosing type has more than one type parameter, all the type parameters in order are included in the type parameter list of the nested type.

To construct a generic type from the generic type definition for a nested type, call the `Type.MakeGenericType` method with the array formed by concatenating the type argument arrays of all the enclosing types, beginning with the outermost generic type, and ending with the type argument array of the nested type itself, if it has type parameters of its own. To create an instance of `Innermost1`, call the `Type.MakeGenericType` method with an array containing three types, to be assigned to T, U, and V. To create an instance of `Innermost2`, call the `Type.MakeGenericType` method with an array containing two types, to be assigned to T and U.

The languages propagate the type parameters of enclosing types in this fashion so you can use the type parameters of an enclosing type to define fields of nested types. Otherwise, the type parameters would not be in scope within the bodies of the nested types. It is possible to define nested types without propagating the type parameters of enclosing types, by emitting code in dynamic assemblies or by using the Ilasm.exe (IL Assembler). Consider the following code for the CIL assembler:

```msil
.class public Outer<T> {
    .class nested public Inner<U> {
        .class nested public Innermost {
        }
    }
}
```

In this example, it is not possible to define a field of type `T` or `U` in class `Innermost`, because those type parameters are not in scope. The following assembler code defines nested classes that behave the way they would if defined in C++, Visual Basic, and C#:

```msil
.class public Outer<T> {
    .class nested public Inner<T, U> {
        .class nested public Innermost<T, U, V> {
        }
    }
}
```

You can use the Ildasm.exe (IL Disassembler) to examine nested classes defined in the high-level languages and observe this naming scheme.

The following example uses the `Type.MakeGenericType` method to create a constructed type from the generic type definition for the `Dictionary<T1,T2>` type. The constructed type represents a `Dictionary<T1,T2>` of `Test` objects with string keys.

_Code sample not included: ~/snippets/csharp/System/Type/MakeGenericType/source.cs._

## Type.MakeModifiedSignatureType(Type, Type[], Type[]) method

```csharp
public static Type MakeModifiedSignatureType (Type type, Type[]? requiredCustomModifiers, Type[]? optionalCustomModifiers);
```

To be added.

Parameters:

- `type`: To be added.
- `requiredCustomModifiers`: To be added.
- `optionalCustomModifiers`: To be added.

Returns: To be added.

To be added.

## Type.MakePointerType() method

```csharp
public virtual Type MakePointerType ();
```

Returns a `Type` object that represents a pointer to the current type.

Returns: A `Type` object that represents a pointer to the current type.

Exceptions:

- `NotSupportedException`: The invoked method is not supported in the base class.
- `TypeLoadException`: The current type is `TypedReference`.

-or-

The current type is a `ByRef` type. That is, `Type.IsByRef` returns `true`.

#### Remarks
The `Type.MakePointerType` method provides a way to generate pointer types for parameter lists.

Using the syntax of Microsoft intermediate language (MSIL), if the current `Type` object represents `Int32`, this method returns a `Type` object representing `Int32*`.

#### Examples
The following code example creates array, `ref` (`ByRef` in Visual Basic), and pointer types for the `Test` class.

_Code sample not included: ~/snippets/csharp/System/Type/MakeByRefType/source.cs._

## Type.op_Equality(Type, Type) method

```csharp
public static bool operator == (Type? left, Type? right);
```

Indicates whether two `Type` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is equal to `right`; otherwise, `false`.

To be added.

## Type.op_Inequality(Type, Type) method

```csharp
public static bool operator != (Type? left, Type? right);
```

Indicates whether two `Type` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` is not equal to `right`; otherwise, `false`.

To be added.

## Type.ReflectionOnlyGetType(String, Boolean, Boolean) method

```csharp
public static Type? ReflectionOnlyGetType (string typeName, bool throwIfNotFound, bool ignoreCase);
```

Gets the `Type` with the specified name, specifying whether to perform a case-sensitive search and whether to throw an exception if the type is not found. The type is loaded for reflection only, not for execution.

Parameters:

- `typeName`: The assembly-qualified name of the `Type` to get.
- `throwIfNotFound`: `true` to throw a `TypeLoadException` if the type cannot be found; `false` to return `null` if the type cannot be found. Specifying `false` also suppresses some other exception conditions, but not all of them.
- `ignoreCase`: `true` to perform a case-insensitive search for `typeName`; `false` to perform a case-sensitive search for `typeName`.

Returns: The type with the specified name, if found; otherwise, `null`. If the type is not found, the `throwIfNotFound` parameter specifies whether `null` is returned or an exception is thrown. In some cases, an exception is thrown regardless of the value of `throwIfNotFound`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Type.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` representing the name of the current `Type`.

Returns: A `String` representing the name of the current `Type`.

#### Remarks
This method returns the fully qualified common language runtime namespace and name for all primitive types. For example, the C# instruction, `(long)0.Type().ToString()` returns "System.Int64" instead of merely "Int64".

If the current `Type` represents a generic type, the type and its type arguments are qualified by namespace and by nested type, but not by assembly. If the current `Type` represents a type parameter in the definition of a generic type or generic method, this method returns the unqualified name of the type parameter.

#### Examples
This following example demonstrates a use of the `Type.Namespace` and `Type.Module` properties and the `ToString` method of `Type`.

_Code sample not included: ~/snippets/csharp/System/Type/Module/type_tostring.cs._

The following example compares the strings returned by the `ToString` method and the `Type.Name`, `Type.FullName`, and `Type.AssemblyQualifiedName` properties.

_Code sample not included: ~/snippets/csharp/System/Type/AssemblyQualifiedName/fullname1.cs._

## Type.Delimiter field

```csharp
public static readonly char Delimiter;
```

Separates names in the namespace of the `Type`. This field is read-only.

To be added.

## Type.EmptyTypes field

```csharp
public static readonly Type[] EmptyTypes;
```

Represents an empty array of type `Type`. This field is read-only.

#### Examples
The following code example shows the `EmptyTypes` field used in one of the `GetConstructor` methods to get a constructor that takes no parameters.

_Code sample not included: ~/snippets/csharp/System/Type/EmptyTypes/source.cs._

## Type.FilterAttribute field

```csharp
public static readonly System.Reflection.MemberFilter FilterAttribute;
```

Represents the member filter used on attributes. This field is read-only.

#### Remarks
This field holds a reference to the delegate used by the `Type.FindMembers` method. The method encapsulated by this delegate takes two parameters: the first is a `MemberInfo` object and the second is an `Object`. The method determines whether the `MemberInfo` object matches the criteria specified by the `Object`. The `Object` may be assigned the value of any one of the fields on the classes `FieldAttributes`, `MethodAttributes`, or `MethodImplAttributes`.

For example, the `Object` can be assigned the value of a field from `FieldAttributes` such as Public. In that case, when the `FilterAttribute` delegate is invoked, it will return `true` only if the method represented by the `MemberInfo` object is decorated with the public field attribute in metadata.

#### Examples
The following example gets the `FilterAttribute` delegate, passes it as a parameter to the `Type.FindMembers` method, and displays the specified members and their attributes.

_Code sample not included: ~/snippets/csharp/System/Type/FilterAttribute/type_filterattribute.cs._
