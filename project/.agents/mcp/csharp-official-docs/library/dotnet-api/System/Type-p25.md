---
title: "Type class (part 25 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 25 of 33)

## Type.GetType(String, Assembly>, Type>) method

```csharp
public static Type? GetType (string typeName, Func<System.Reflection.AssemblyName,System.Reflection.Assembly?>? assemblyResolver, Func<System.Reflection.Assembly?,string,bool,Type?>? typeResolver);
```

Gets the type with the specified name, optionally providing custom methods to resolve the assembly and the type.

Parameters:

- `typeName`: The name of the type to get. If the `typeResolver` parameter is provided, the type name can be any string that `typeResolver` is capable of resolving. If the `assemblyResolver` parameter is provided or if standard type resolution is used, `typeName` must be an assembly-qualified name (see `Type.AssemblyQualifiedName`), unless the type is in the currently executing assembly or in mscorlib.dll/System.Private.CoreLib.dll, in which case it's sufficient to supply the type name qualified by its namespace.
- `assemblyResolver`: A method that locates and returns the assembly that is specified in `typeName`. The assembly name is passed to `assemblyResolver` as an `AssemblyName` object. If `typeName` does not contain the name of an assembly, `assemblyResolver` is not called. If `assemblyResolver` is not supplied, standard assembly resolution is performed.

Caution: Don't pass <example-value> from unknown or untrusted callers. Doing so could result in elevation of privilege for malicious code. Use only methods that you provide or that you are familiar with.
- `typeResolver`: A method that locates and returns the type that is specified by `typeName` from the assembly that is returned by `assemblyResolver` or by standard assembly resolution. If no assembly is provided, the `typeResolver` method can provide one. The method also takes a parameter that specifies whether to perform a case-insensitive search; `false` is passed to that parameter.

Caution: Don't pass <example-value> from unknown or untrusted callers.

Returns: The type with the specified name, or `null` if the type is not found.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `TargetInvocationException`: A class initializer is invoked and throws an exception.
- `ArgumentException`: An error occurs when `typeName` is parsed into a type name and an assembly name (for example, when the simple type name includes an unescaped special character).

-or-

`typeName` represents a generic type that has a pointer type, a `ByRef` type, or `Void` as one of its type arguments.

-or-

`typeName` represents a generic type that has an incorrect number of type arguments.

-or-

`typeName` represents a generic type, and one of its type arguments does not satisfy the constraints for the corresponding type parameter.
- `TypeLoadException`: `typeName` represents an invalid type, for example, an array of `TypedReference`.
- `FileLoadException`: The assembly or one of its dependencies was found, but could not be loaded.

-or-

`typeName` contains an invalid assembly name.

-or-

`typeName` is a valid assembly name without a type name.
- `BadImageFormatException`: The assembly or one of its dependencies is not valid for the currently loaded runtime.

#### Remarks

Usage scenarios for this method and details about the `assemblyResolver` and `typeResolver` parameters can be found in the `GetType` method overload.

> **Note:**
> If `typeName` cannot be found, the call to the `GetType` method returns `null`. It does not throw an exception. To control whether an exception is thrown, call an overload of the `Type.GetType` method that has a `throwOnError` parameter.

Calling this method overload is the same as calling the `GetType` method overload and specifying `false` for the `throwOnError` and `ignoreCase` parameters.

## Type.GetType(String, Assembly>, Type>, Boolean) method

```csharp
public static Type? GetType (string typeName, Func<System.Reflection.AssemblyName,System.Reflection.Assembly?>? assemblyResolver, Func<System.Reflection.Assembly?,string,bool,Type?>? typeResolver, bool throwOnError);
```

Gets the type with the specified name, specifying whether to throw an exception if the type is not found, and optionally providing custom methods to resolve the assembly and the type.

Parameters:

- `typeName`: The name of the type to get. If the `typeResolver` parameter is provided, the type name can be any string that `typeResolver` is capable of resolving. If the `assemblyResolver` parameter is provided or if standard type resolution is used, `typeName` must be an assembly-qualified name (see `Type.AssemblyQualifiedName`), unless the type is in the currently executing assembly or in mscorlib.dll/System.Private.CoreLib.dll, in which case it's sufficient to supply the type name qualified by its namespace.
- `assemblyResolver`: A method that locates and returns the assembly that is specified in `typeName`. The assembly name is passed to `assemblyResolver` as an `AssemblyName` object. If `typeName` does not contain the name of an assembly, `assemblyResolver` is not called. If `assemblyResolver` is not supplied, standard assembly resolution is performed.

Caution: Don't pass <example-value> from unknown or untrusted callers. Doing so could result in elevation of privilege for malicious code. Use only methods that you provide or that you are familiar with.
- `typeResolver`: A method that locates and returns the type that is specified by `typeName` from the assembly that is returned by `assemblyResolver` or by standard assembly resolution. If no assembly is provided, the method can provide one. The method also takes a parameter that specifies whether to perform a case-insensitive search; `false` is passed to that parameter.

Caution: Don't pass <example-value> from unknown or untrusted callers.
- `throwOnError`: `true` to throw an exception if the type cannot be found; `false` to return `null`. Specifying `false` also suppresses some other exception conditions, but not all of them. See the Exceptions section.

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

-or-

`typeName` contains an invalid assembly name.

-or-

`typeName` is a valid assembly name without a type name.
- `FileLoadException`: The assembly or one of its dependencies was found, but could not be loaded.
- `BadImageFormatException`: The assembly or one of its dependencies is not valid for the currently loaded runtime.

#### Remarks
Usage scenarios for this method and details about the `assemblyResolver` and `typeResolver` parameters can be found in the `GetType` method overload.

Calling this method overload is the same as calling the `GetType` method overload and specifying `false` for the `ignoreCase` parameter.
