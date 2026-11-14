---
title: "Module class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Module.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Module class (part 4 of 4)

## Module.ResolveMethod(Int32, Type[], Type[]) method

```csharp
public virtual System.Reflection.MethodBase? ResolveMethod (int metadataToken, Type[]? genericTypeArguments, Type[]? genericMethodArguments);
```

Returns the method or constructor identified by the specified metadata token, in the context defined by the specified generic type parameters.

Parameters:

- `metadataToken`: A metadata token that identifies a method or constructor in the module.
- `genericTypeArguments`: An array of `Type` objects representing the generic type arguments of the type where the token is in scope, or `null` if that type is not generic.
- `genericMethodArguments`: An array of `Type` objects representing the generic type arguments of the method where the token is in scope, or `null` if that method is not generic.

Returns: A `MethodBase` object representing the method that is identified by the specified metadata token.

Exceptions:

- `ArgumentException`: `metadataToken` is not a token for a method or constructor in the scope of the current module.

-or-

`metadataToken` is a `MethodSpec` whose signature contains element type `var` (a type parameter of a generic type) or `mvar` (a type parameter of a generic method), and the necessary generic type arguments were not supplied for either or both of `genericTypeArguments` and `genericMethodArguments`.
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks
Use the `Type.GetGenericArguments` method on the type where `metadataToken` is in scope to obtain an array of generic type arguments for `genericTypeArguments`. Use the `MethodInfo.GetGenericArguments` method on the method where `metadataToken` is in scope to obtain an array of generic type arguments for `genericMethodArguments`. It is always safe to provide these arguments, even when they are not needed.

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

#### Examples
The following example shows how to use the two overloads of the `Module.ResolveMethod` method to resolve metadata tokens from call sites in generic and non-generic contexts.

The code example defines two generic types, `G1<Tg1>` and `G2<Tg2>`, each of which has a generic method. `G1<Tg1>` also has a non-generic method that uses the type parameter `Tg1` for its parameter. The generic method `GM2<Tgm2>` in type `G2<Tg2>` contains several method calls:

- Case 1: The generic method `GM1<Tgm1>` is called, using the type parameters of `G2<Tg2>` and `GM2<Tgm2>` as the type arguments. In other words, the parameter types of the called method will depend on the types that are used to construct a closed generic type from the type definition for `G2<Tg2>`.

- Case 2: The non-generic method `M1` is called. The parameter of this method uses the type parameter of the defining type, `G1<Tg1>`, which is replaced in this case by the type parameter of the enclosing type, `G2<Tg2>`.

- Case 3: The generic method `GM1<Tgm1>` is called, specifying `Int32` and `Object` for the type arguments of the generic type and the generic method, respectively. This method call does not depend on the type parameters of the enclosing type or method.

- Case 4: The non-generic method `M1` of the `Example` class is called. This method call does not depend on the type parameters of the enclosing type or method.

In addition, the example defines the non-generic `Example` class. This class has a method `M` that makes a call to a generic method.

- Case 5: The generic method `GM1<Tgm1>` is called, specifying `Int32` and `Object` for the type arguments of the generic type and the generic method, respectively. The context for this method has no enclosing generic type or generic method.

For each case, the example first constructs a `MethodInfo` that represents the called method, and then resolves the token using the `ResolveMethod` method overload, using the `Type.GetGenericArguments` and `MethodInfo.GetGenericArguments` methods to get the values for the `genericTypeArguments` and `genericMethodArguments` parameters. This technique works in all cases, because the methods return `EmptyTypes` for non-generic contexts. The example compares the resolved `MethodInfo` with the constructed `MethodInfo`.

The example then attempts to use the `ResolveMethod` method overload to resolve the token. This works in cases 3, 4, and 5, because the method calls do not depend on the generic context. In cases 1 and 2, an exception is thrown because there is insufficient information to resolve the token.

The metadata token <example-value> are hard-coded as an enumeration. If you change this code example, the token <example-value> are likely to change. To determine the new token <example-value>, compile the code and use Ildasm.exe with the **/TOKENS** option to examine the assembly. The tokens can be found at the points of call. Insert the new values into the enumeration, and recompile the example.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/ResolveMethod/source.cs._

## Module.ResolveSignature(Int32) method

```csharp
public virtual byte[] ResolveSignature (int metadataToken);
```

Returns the signature blob identified by a metadata token.

Parameters:

- `metadataToken`: A metadata token that identifies a signature in the module.

Returns: An array of bytes representing the signature blob.

Exceptions:

- `ArgumentException`: `metadataToken` is not a valid `MemberRef`, `MethodDef`, `TypeSpec`, signature, or `FieldDef` token in the scope of the current module.
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks

> **Note:**
>  Information about metadata tokens and signatures can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## Module.ResolveString(Int32) method

```csharp
public virtual string ResolveString (int metadataToken);
```

Returns the string identified by the specified metadata token.

Parameters:

- `metadataToken`: A metadata token that identifies a string in the string heap of the module.

Returns: A `String` containing a string value from the metadata string heap.

Exceptions:

- `ArgumentException`: `metadataToken` is not a token for a string in the scope of the current module.
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## Module.ResolveType(Int32) method

```csharp
public Type ResolveType (int metadataToken);
```

Returns the type identified by the specified metadata token.

Parameters:

- `metadataToken`: A metadata token that identifies a type in the module.

Returns: A `Type` object representing the type that is identified by the specified metadata token.

Exceptions:

- `ArgumentException`: `metadataToken` is not a token for a type in the scope of the current module.

-or-

`metadataToken` is a `TypeSpec` whose signature contains element type `var` (a type parameter of a generic type) or `mvar` (a type parameter of a generic method).
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks
To resolve a metadata token for a `TypeSpec` whose signature contains `ELEMENT_TYPE_VAR` or `ELEMENT_TYPE_MVAR`, use the `ResolveType` method overload, which allows you to supply the necessary context. That is, when you are resolving a metadata token for a type that depends on the generic type parameters of the generic type and/or the generic method in which the token is embedded, you must use the overload that allows you to supply those type parameters.

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

## Module.ResolveType(Int32, Type[], Type[]) method

```csharp
public virtual Type ResolveType (int metadataToken, Type[]? genericTypeArguments, Type[]? genericMethodArguments);
```

Returns the type identified by the specified metadata token, in the context defined by the specified generic type parameters.

Parameters:

- `metadataToken`: A metadata token that identifies a type in the module.
- `genericTypeArguments`: An array of `Type` objects representing the generic type arguments of the type where the token is in scope, or `null` if that type is not generic.
- `genericMethodArguments`: An array of `Type` objects representing the generic type arguments of the method where the token is in scope, or `null` if that method is not generic.

Returns: A `Type` object representing the type that is identified by the specified metadata token.

Exceptions:

- `ArgumentException`: `metadataToken` is not a token for a type in the scope of the current module.

-or-

`metadataToken` is a `TypeSpec` whose signature contains element type `var` (a type parameter of a generic type) or `mvar` (a type parameter of a generic method), and the necessary generic type arguments were not supplied for either or both of `genericTypeArguments` and `genericMethodArguments`.
- `ArgumentOutOfRangeException`: `metadataToken` is not a valid token in the scope of the current module.

#### Remarks
Use the `Type.GetGenericArguments` method on the type where `metadataToken` is in scope to obtain an array of generic type arguments for `genericTypeArguments`. Use the `MethodInfo.GetGenericArguments` method on the method where `metadataToken` is in scope to obtain an array of generic type arguments for `genericTypeArguments`. It is always safe to provide these arguments, even when they are not needed.

> **Note:**
>  Information about metadata tokens can be found in the Common Language Infrastructure (CLI) documentation, especially "<example-value>". For more information, see ECMA 335 Common Language Infrastructure (CLI).

For code that demonstrates token <example-value> using the generic context (that is, the generic type parameters of the generic type and/or the generic method in which the token is embedded) see the `ResolveMethod` method.

## Module.ToString() method

```csharp
public override string ToString ();
```

Returns the name of the module.

Returns: A `String` representing the name of this module.

#### Examples
The following example demonstrates a use of the `ToString` method.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/ToString/class1.cs._

## Module.FilterTypeName field

```csharp
public static readonly System.Reflection.TypeFilter FilterTypeName;
```

A `TypeFilter` object that filters the list of types defined in this module based upon the name. This field is case-sensitive and read-only.

#### Remarks
The filter supports a trailing "*" wildcard.

#### Examples
The following example displays the module names that match the specified search criteria.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/FilterTypeName/class1.cs._

## Module.FilterTypeNameIgnoreCase field

```csharp
public static readonly System.Reflection.TypeFilter FilterTypeNameIgnoreCase;
```

A `TypeFilter` object that filters the list of types defined in this module based upon the name. This field is case-insensitive and read-only.

#### Remarks
The filter supports a trailing "*" wildcard.

#### Examples
The following example displays the module names that match the specified search criteria, ignoring the case.

_Code sample not included: ~/snippets/csharp/System.Reflection/Module/FilterTypeNameIgnoreCase/class1.cs._
