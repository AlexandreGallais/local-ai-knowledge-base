---
title: "Type class (part 26 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 26 of 33)

## Type.GetType(String, Assembly>, Type>, Boolean, Boolean) method

```csharp
public static Type? GetType (string typeName, Func<System.Reflection.AssemblyName,System.Reflection.Assembly?>? assemblyResolver, Func<System.Reflection.Assembly?,string,bool,Type?>? typeResolver, bool throwOnError, bool ignoreCase);
```

Gets the type with the specified name, specifying whether to perform a case-sensitive search and whether to throw an exception if the type is not found, and optionally providing custom methods to resolve the assembly and the type.

Parameters:

- `typeName`: The name of the type to get. If the `typeResolver` parameter is provided, the type name can be any string that `typeResolver` is capable of resolving. If the `assemblyResolver` parameter is provided or if standard type resolution is used, `typeName` must be an assembly-qualified name (see `Type.AssemblyQualifiedName`), unless the type is in the currently executing assembly or in mscorlib.dll/System.Private.CoreLib.dll, in which case it's sufficient to supply the type name qualified by its namespace.
- `assemblyResolver`: A method that locates and returns the assembly that is specified in `typeName`. The assembly name is passed to `assemblyResolver` as an `AssemblyName` object. If `typeName` does not contain the name of an assembly, `assemblyResolver` is not called. If `assemblyResolver` is not supplied, standard assembly resolution is performed.

Caution: Don't pass <example-value> from unknown or untrusted callers. Doing so could result in elevation of privilege for malicious code. Use only methods that you provide or that you are familiar with.
- `typeResolver`: A method that locates and returns the type that is specified by `typeName` from the assembly that is returned by `assemblyResolver` or by standard assembly resolution. If no assembly is provided, the method can provide one. The method also takes a parameter that specifies whether to perform a case-insensitive search; the value of `ignoreCase` is passed to that parameter.

Caution: Don't pass <example-value> from unknown or untrusted callers.
- `throwOnError`: `true` to throw an exception if the type cannot be found; `false` to return `null`. Specifying `false` also suppresses some other exception conditions, but not all of them. See the Exceptions section.
- `ignoreCase`: `true` to perform a case-insensitive search for `typeName`, `false` to perform a case-sensitive search for `typeName`.

Returns: The type with the specified name. If the type is not found, the `throwOnError` parameter specifies whether `null` is returned or an exception is thrown. In some cases, an exception is thrown regardless of the value of `throwOnError`. See the Exceptions section.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `TargetInvocationException`: A class initializer is invoked and throws an exception.
- `TypeLoadException`: `throwOnError` is `true` and the type is not found.

-or-

`throwOnError` is `true` and `typeName` contains invalid characters, such as an embedded tab.

-or-

`throwOnError` is `true` and `typeName` is an empty string.

-or-

`throwOnError` is `true` and `typeName` represents an array type with an invalid size.

-or-

`typeName` represents an array of `TypedReference`.
- `ArgumentException`: An error occurs when `typeName` is parsed into a type name and an assembly name (for example, when the simple type name includes an unescaped special character).

-or-

`throwOnError` is `true` and `typeName` contains invalid syntax (for example, "MyType[,*,]").

-or-

`typeName` represents a generic type that has a pointer type, a `ByRef` type, or `Void` as one of its type arguments.

-or-

`typeName` represents a generic type that has an incorrect number of type arguments.

-or-

`typeName` represents a generic type, and one of its type arguments does not satisfy the constraints for the corresponding type parameter.
- `FileNotFoundException`: `throwOnError` is `true` and the assembly or one of its dependencies was not found.
- `FileLoadException`: The assembly or one of its dependencies was found, but could not be loaded.

-or-

`typeName` contains an invalid assembly name.

-or-

`typeName` is a valid assembly name without a type name.
- `BadImageFormatException`: The assembly or one of its dependencies is not a valid assembly for the currently loaded runtime.

#### Remarks

If `assemblyResolver` is null, then assembly loads triggered by this API are affected by the current value of `AssemblyLoadContext.CurrentContextualReflectionContext`.

Use the `GetType` method overload and its associated overloads (`GetType` and `GetType`) to replace the default implementation of the `Type.GetType` method with more flexible implementations. By providing your own methods that resolve type names and the names of the assemblies that contain them, you can do the following:

- Control which version of an assembly a type is loaded from.
- Provide another place to look for a type name that does not include an assembly name.
- Load assemblies using partial assembly names.
- Return subclasses of `Type` that are not created by the common language runtime (CLR).

For example, in version-tolerant serialization this method enables you to search for a "best fit" assembly by using a partial name. Other overloads of the `Type.GetType` method require an assembly-qualified type name, which includes the version number.

Alternate implementations of the type system may need to return subclasses of `Type` that are not created by the CLR; all types that are returned by other overloads of the `Type.GetType` method are runtime types.

#### Usage notes

This method overload and its associated overloads parse `typeName` into the name of a type and the name of an assembly, and then resolve the names. Resolution of the assembly name occurs before resolution of the type name, because a type name must be resolved in the context of an assembly.

> **Note:**
> If you are unfamiliar with the concept of assembly-qualified type names, see the `AssemblyQualifiedName` property.

If `typeName` is not an assembly-qualified name, assembly resolution is skipped. Unqualified type names can be resolved in the context of mscorlib.dll/System.Private.CoreLib.dll or the currently executing assembly, or you can optionally provide an assembly in the `typeResolver` parameter. The effects of including or omitting the assembly name for different kinds of name resolution are displayed as a table in the Mixed name resolution section.

General usage notes:

- Do not pass <example-value> to `assemblyResolver` or `typeResolver` if they come from unknown or untrusted callers. Use only methods that you provide or that you are familiar with.

> **Caution:**
> Using methods from unknown or untrusted callers could result in elevation of privilege for malicious code.

- If you omit the `assemblyResolver` and/or `typeResolver` parameters, the value of the `throwOnError` parameter is passed to the methods that perform the default resolution.

- If `throwOnError` is `true`, this method throws a `TypeLoadException` when `typeResolver` returns `null`, and a `FileNotFoundException` when `assemblyResolver` returns `null`.

- This method does not catch exceptions thrown by `assemblyResolver` and `typeResolver`. You are responsible for any exceptions that are thrown by the resolver methods.

#### Resolve assemblies

The `assemblyResolver` method receives an `AssemblyName` object, which is produced by parsing the string assembly name that is included in `typeName`. If `typeName` does not contain an assembly name, `assemblyResolver` is not called and `null` is passed to `typeResolver`.

If `assemblyResolver` is not supplied, standard assembly probing is used to locate the assembly. If `assemblyResolver` is provided, the `Type.GetType` method does not do standard probing; in that case you must ensure that your `assemblyResolver` can handle all the assemblies you pass to it.

The `assemblyResolver` method should return `null` if the assembly cannot be resolved. If `assemblyResolver` returns `null`, `typeResolver` is not called and no further processing occurs; additionally, if `throwOnError` is `true`, a `FileNotFoundException` is thrown.

If the `AssemblyName` that is passed to `assemblyResolver` is a partial name, one or more of its parts are `null`. For example, if it has no version, the `Version` property is `null`. If the `Version` property, the `CultureInfo` property, and the `AssemblyName.GetPublicKeyToken` method all return `null`, then only the simple name of the assembly was supplied. The `assemblyResolver` method can use or ignore all parts of the assembly name.

The effects of different assembly resolution options are displayed as a table in the Mixed name resolution section, for simple and assembly-qualified type names.

#### Resolve types

If `typeName` does not specify an assembly name, `typeResolver` is always called. If `typeName` specifies an assembly name, `typeResolver` is called only when the assembly name is successfully resolved. If `assemblyResolver` or standard assembly probing returns `null`, `typeResolver` is not called.

The `typeResolver` method receives three arguments:

- The assembly to search or `null` if `typeName` does not contain an assembly name.
- The simple name of the type. In the case of a nested type, this is the outermost containing type. In the case of a generic type, this is the simple name of the generic type.
- A Boolean value that's `true` if the case of type names is to be ignored.

The implementation determines the way these arguments are used. The `typeResolver` method should return `null` if it cannot resolve the type. If `typeResolver` returns `null` and `throwOnError` is `true`, this overload of `Type.GetType` throws a `TypeLoadException`.

The effects of different type resolution options are displayed as a table in the Mixed name resolution section, for simple and assembly-qualified type names.

#### Resolve nested types

If `typeName` is a nested type, only the name of the outermost containing type is passed to `typeResolver`. When `typeResolver` returns this type, the `Type.GetNestedType` method is called recursively until the innermost nested type has been resolved.

#### Resolve generic types

The `Type.GetType` is called recursively to resolve generic types: First to resolve the generic type itself, and then to resolve its type arguments. If a type argument is generic, `Type.GetType` is called recursively to resolve its type arguments, and so on.

The combination of `assemblyResolver` and `typeResolver` that you provide must be capable of resolving all levels of this recursion. For example, suppose you supply an `assemblyResolver` that controls the loading of `MyAssembly`. Suppose you want to resolve the generic type `Dictionary<string, MyType>` (`Dictionary(Of String, MyType)` in Visual Basic). You might pass the following generic type name:

```
"System.Collections.Generic.Dictionary`2[System.String,[MyNamespace.MyType, MyAssembly]]"
```

Notice that `MyType` is the only assembly-qualified type argument. The names of the `Dictionary<T1,T2>` and `String` classes are not assembly-qualified. Your `typeResolver` must be able to handle either an assembly or `null`, because it will receive `null` for `Dictionary<T1,T2>` and `String`. It can handle that case by calling an overload of the `Type.GetType` method that takes a string, because both of the unqualified type names are in mscorlib.dll/System.Private.CoreLib.dll:

_Code sample not included: ~/snippets/csharp/System/Type/GetType/source.cs._

The `assemblyResolver` method is not called for the dictionary type and the string type, because those type names are not assembly-qualified.

Now suppose that instead of `System.String`, the first generic argument type is `YourType`, from `YourAssembly`:

```
"<example-value>"
```

Because this assembly is neither mscorlib.dll/System.Private.CoreLib.dll nor the currently executing assembly, you cannot resolve `YourType` without an assembly-qualified name. Because your `assemblyResolve` will be called recursively, it must be able to handle this case. Instead of returning `null` for assemblies other than `MyAssembly`, it now performs an assembly load using the supplied `AssemblyName` object.

_Code sample not included: ~/snippets/csharp/System/Type/GetType/source.cs._

#### Resolve type names with special characters

Certain characters have special meanings in assembly-qualified names. If a simple type name contains these characters, the characters cause parsing errors when the simple name is part of an assembly-qualified name. To avoid the parsing errors, you must escape the special characters with a backslash before you can pass the assembly-qualified name to the `Type.GetType` method. For example, if a type is named `Strange]Type`, the escape character must be added ahead of the square bracket as follows: `Strange\]Type`.

> **Note:**
> Names with such special characters cannot be created in Visual Basic or C#, but can be created by using common intermediate language (CIL) or by emitting dynamic assemblies.

The following table shows the special characters for type names.

|Character|Meaning|
|---------------|-------------|
|`,` (comma)|Delimiter for assembly-qualified names.|
|`[]` (square brackets)|As a suffix pair, indicates an array type; as a delimiter pair, encloses generic argument lists and assembly-qualified names.|
|`&` (ampersand)|As a suffix, indicates that a type is a reference type.|
|`*` (asterisk)|As a suffix, indicates that a type is a pointer type.|
|`+` (plus)|Delimiter for nested types.|
|`\` (backslash)|Escape character.|

Properties such as `AssemblyQualifiedName` return correctly escaped strings. You must pass <example-value> escaped strings to the `Type.GetType` method. In turn, the `Type.GetType` method passes correctly escaped names to `typeResolver` and to the default type resolution methods. If you need to compare a name to an unescaped name in `typeResolver`, you must remove the escape characters.

#### Mixed name resolution

The following table summarizes the interactions between `assemblyResolver`, `typeResolver`, and default name resolution, for all combinations of type name and assembly name in `typeName`:
