---
title: "Type class (part 22 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 22 of 33)

## Type.GetType(String) method

```csharp
public static Type? GetType (string typeName);
```

Gets the `Type` with the specified name, performing a case-sensitive search.

Parameters:

- `typeName`: The assembly-qualified name of the type to get. See `Type.AssemblyQualifiedName`. If the type is in the currently executing assembly or in mscorlib.dll/System.Private.CoreLib.dll, it's sufficient to supply the type name qualified by its namespace.

Returns: The type with the specified name, if found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `TargetInvocationException`: A class initializer is invoked and throws an exception.
- `ArgumentException`: `typeName` represents a generic type that has a pointer type, a `ByRef` type, or `Void` as one of its type arguments.

-or-

`typeName` represents a generic type that has an incorrect number of type arguments.

-or-

`typeName` represents a generic type, and one of its type arguments does not satisfy the constraints for the corresponding type parameter.
- `TypeLoadException`: `typeName` represents an invalid type, for example, an array of `TypedReference`.
- `FileLoadException`: The assembly or one of its dependencies was found, but could not be loaded.
- `BadImageFormatException`: The assembly is not valid for the currently loaded runtime.

#### Remarks

You can use the `Type.GetType` method to obtain a `Type` object for a type in another assembly if you know its assembly-qualified name, which can be obtained from `AssemblyQualifiedName`. `Type.GetType` causes loading of the assembly specified in `typeName`. You can also load an assembly using the `Assembly.Load` method, and then use the `Assembly.GetType` or `Assembly.GetTypes` method to get `Type` objects. If a type is in an assembly known to your program at compile time, it's more efficient to use `typeof` in C# or the `GetType` operator in Visual Basic.

> **Note:**
> If `typeName` cannot be found, the call to the `GetType` method returns `null`. It does not throw an exception. To control whether an exception is thrown, call an overload of the `Type.GetType` method that has a `throwOnError` parameter.

Assembly loads triggered by this API are affected by the current value of `AssemblyLoadContext.CurrentContextualReflectionContext`.

The following table shows what members of a base class are returned by the `Get` methods when reflecting on a type.

| Member Type | Static | Non-Static                                         |
|-------------|--------|----------------------------------------------------|
| Constructor | No     | No                                                 |
| Field       | No     | Yes. A field is always hide-by-name-and-signature. |
|Event|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|
|Method|No|Yes. A method (both virtual and non-virtual) can be hide-by-name or hide-by-name-and-signature.|
|Nested Type|No|No|
|Property|Not applicable|The common type system rule is that the inheritance is the same as that of the methods that implement the property. Reflection treats properties as hide-by-name-and-signature. See note 2 below.|

1. Hide-by-name-and-signature considers all of the parts of the signature, including custom modifiers, return types, parameter types, sentinels, and unmanaged calling conventions. This is a binary comparison.

2. For reflection, properties and events are hide-by-name-and-signature. If you have a property with both a get and a set accessor in the base class, but the derived class has only a get accessor, the derived class property hides the base class property, and you will not be able to access the setter on the base class.

3. Custom attributes are not part of the common type system.

Arrays or COM types are not searched for unless they have already been loaded into the table of available classes.

`typeName` can be the type name qualified by its namespace or an assembly-qualified name that includes an assembly name specification. See `Type.AssemblyQualifiedName`.

If `typeName` includes the namespace but not the assembly name, this method searches only the calling object's assembly and mscorlib.dll/System.Private.CoreLib.dll, in that order. If typeName is fully qualified with the partial or complete assembly name, this method searches in the specified assembly. If the assembly has a strong name, a complete assembly name is required.

The `AssemblyQualifiedName` property returns a fully qualified type name including nested types, the assembly name, and generic type arguments. All compilers that support the common language runtime will emit the simple name of a nested class, and reflection constructs a mangled name when queried, in accordance with the following conventions.

> **Note:**
> Processor architecture is part of assembly identity, and can be specified as part of assembly name strings. For example, "ProcessorArchitecture=msil". However, it's not included in the string returned by the `AssemblyQualifiedName` property, for compatibility reasons. You can also load types by creating an `AssemblyName` object and passing it to an appropriate overload of the `Assembly.Load` method. You can then use the `Assembly.GetType` method to load types from the assembly. See also `AssemblyName.ProcessorArchitecture`.

| Delimiter      | Meaning                        |
|----------------|--------------------------------|
| Backslash (\\) | Escape character.             |
| Backtick (`)   | Precedes one or more digits representing the number of type parameters, located at the end of the name of a generic type. |
| Brackets ([])  | Enclose a generic type argument list, for a constructed generic type; within a type argument list, enclose an assembly-qualified type. |
| Comma (,)      | Precedes the Assembly name.   |
| Period (.)     | Denotes namespace identifiers. |
| Plus sign (+)  | Precedes a nested class.      |

For example, the fully qualified name for a class might look like this:

```txt
TopNamespace.SubNameSpace.ContainingClass+NestedClass,MyAssembly
```

If the namespace were TopNamespace.Sub+Namespace, then the string would have to precede the plus sign (+) with an escape character (\\) to prevent it from being interpreted as a nesting separator. Reflection emits this string as follows:

```txt
TopNamespace.Sub\+Namespace.ContainingClass+NestedClass,MyAssembly
```

A "++" becomes "\\+\\+", and a "\\" becomes "\\\\".

This qualified name can be persisted and later used to load the `Type`. To search for and load a `Type`, use `Type.GetType` either with the type name only or with the assembly qualified type name. `Type.GetType` with the type name only will look for the `Type` in the caller's assembly and then in the System assembly. `Type.GetType` with the assembly qualified type name will look for the `Type` in any assembly.

Type names may include trailing characters that denote additional information about the type, such as whether the type is a reference type, a pointer type or an array type. To retrieve the type name without these trailing characters, use `t.GetElementType().ToString()`, where `t` is the type.

Spaces are relevant in all type name components except the assembly name. In the assembly name, spaces before the ',' separator are relevant, but spaces after the ',' separator are ignored.

The name of a generic type ends with a backtick (\`) followed by digits representing the number of generic type arguments. The purpose of this name mangling is to allow compilers to support generic types with the same name but with different numbers of type parameters, occurring in the same scope. For example, reflection returns the mangled names ``Tuple`1`` and ``Tuple`2`` from the generic methods `Tuple(Of T)` and `Tuple(Of T0, T1)` in Visual Basic, or `Tuple<T>` and `Tuple<T0, T1>` in Visual C#.

For generic types, the type argument list is enclosed in brackets, and the type arguments are separated by commas. For example, a generic `Dictionary<T1,T2>` has two type parameters. A `Dictionary<T1,T2>` of `MyType` with keys of type `String` might be represented as follows:

```txt
System.Collections.Generic.Dictionary`2[System.String,MyType]
```

To specify an assembly-qualified type within a type argument list, enclose the assembly-qualified type within brackets. Otherwise, the commas that separate the parts of the assembly-qualified name are interpreted as delimiting additional type arguments. For example, a `Dictionary<T1,T2>` of `MyType` fromMyAssembly.dll, with keys of type `String`, might be specified as follows:

```txt
Type.GetType("System.Collections.Generic.Dictionary`2[System.String,[MyType,MyAssembly]]")
```

> **Note:**
> An assembly-qualified type can be enclosed in brackets only when it appears within a type parameter list. The rules for searching assemblies for qualified and unqualified types in type parameter lists are the same as the rules for qualified and unqualified nongeneric types.

Nullable types are a special case of generic types. For example, a nullable `Int32` is represented by the string "System.Nullable`1[System.Int32]".

> **Note:**
> You can also get nullable types using type operators. For example, the nullable `Boolean` type is returned by `typeof(Nullable<bool>)` in C# and by `GetType(Nullable(Of Boolean))` in Visual Basic.

The following table shows the syntax you use with `GetType` for various types.

| To Get                                        | Use                                                 |
|-----------------------------------------------|-----------------------------------------------------|
| A nullable `Int32`                | ``Type.GetType("System.Nullable`1[System.Int32]")`` |
| An unmanaged pointer to `MyType`              | `Type.GetType("MyType*")`                           |
| An unmanaged pointer to a pointer to `MyType` | `Type.GetType("MyType**")`                          |
|A managed pointer or reference to `MyType`|`Type.GetType("MyType&")`. Note that unlike pointers, references are limited to one level.|
|A parent class and a nested class|`Type.GetType("MyParentClass+MyNestedClass")`|
|A one-dimensional array with a lower bound of 0|`Type.GetType("MyType[]")`|
|A one-dimensional array with an unknown lower bound|`Type.GetType("MyType[*]")`|
|An n-dimensional array|A comma (,) inside the brackets a total of n-1 times. For example, `System.Object[,,]` represents a three-dimensional `Object` array.|
|An array of one-dimensional arrays|`Type.GetType("MyType[][]")`|
|A rectangular two-dimensional array with unknown lower bounds|`Type.GetType("MyType[,]")`|
|A generic type with one type argument|``Type.GetType("MyGenericType`1[MyType]")``|
|A generic type with two type arguments|``Type.GetType("MyGenericType`2[MyType,AnotherType]")``|
|A generic type with two assembly-qualified type arguments|``Type.GetType("MyGenericType`2[[MyType,MyAssembly],[AnotherType,AnotherAssembly]]")``|
|An assembly-qualified generic type with an assembly-qualified type argument|``Type.GetType("MyGenericType`1[[MyType,MyAssembly]],MyGenericTypeAssembly")``|
|A generic type whose type argument is a generic type with two type arguments|``Type.GetType("MyGenericType`1[AnotherGenericType`2[MyType,AnotherType]]")``|

#### Examples
The following example retrieves the type of `System.Int32` and uses that type object to display the `FullName` property of `System.Int32`.

_Code sample not included: ~/snippets/csharp/System/Type/GetType/type_gettype.cs._
