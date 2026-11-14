---
title: "Activator class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Activator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Activator class (part 2 of 3)

## Activator.CreateInstance(String, String, Object[]) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName, object?[]? activationAttributes);
```

Creates an instance of the type whose name is specified, using the named assembly and parameterless constructor.

Parameters:

- `assemblyName`: The name of the assembly where the type named `typeName` is sought. If `assemblyName` is `null`, the executing assembly is searched.
- `typeName`: The fully qualified name of the type to create an instance of.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A handle that must be unwrapped to access the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `NotSupportedException`: Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.

-or-

`activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.

-or-

`activationAttributes` is not a `UrlAttribute`

array.
- `BadImageFormatException`: `assemblyName` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyName` was compiled for a version of the CLR that is later than the currently loaded version.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

-or-

The assembly name or code base is invalid.
- `TargetInvocationException`: The invoked constructor throws an exception.

-or-

An error occurred when attempting remote activation in a target specified in `activationAttributes`.

#### Remarks
Use `ObjectHandle.Unwrap` to unwrap the return value.

Assembly loads triggered by this API are affected by the current value of `AssemblyLoadContext.CurrentContextualReflectionContext`.

## Activator.CreateInstance(Type, Object[], Object[]) method

```csharp
public static object? CreateInstance (Type type, object?[]? args, object?[]? activationAttributes);
```

Creates an instance of the specified type using the constructor that best matches the specified parameters.

Parameters:

- `type`: The type of object to create.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances with no value.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not a `RuntimeType`.

-or-

`type` is an open generic type (that is, the `Type.ContainsGenericParameters` property returns `true`).
- `NotSupportedException`: `type` cannot be a `TypeBuilder`.

-or-

Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.

-or-

`activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.

-or-

The assembly that contains `type` is a dynamic assembly that was created with `AssemblyBuilderAccess.Save`.

-or-

The constructor that best matches `args` has `varargs` arguments.
- `TargetInvocationException`: The constructor being called throws an exception.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `MissingMethodException`: No matching public constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

#### Remarks
The constructor to be invoked must be accessible and must provide the most specific match with the specified argument list.

## Activator.CreateInstance(Type, BindingFlags, Binder, Object[], CultureInfo) method

```csharp
public static object? CreateInstance (Type type, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture);
```

Creates an instance of the specified type using the constructor that best matches the specified parameters.

Parameters:

- `type`: The type of object to create.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `type` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that uses `bindingAttr` and `args` to seek and identify the `type` constructor. If `binder` is `null`, the default binder is used.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `type` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances with no value.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not a `RuntimeType`.

-or-

`type` is an open generic type (that is, the `Type.ContainsGenericParameters` property returns `true`).
- `NotSupportedException`: `type` cannot be a `TypeBuilder`.

-or-

Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.

-or-

The assembly that contains `type` is a dynamic assembly that was created with `AssemblyBuilderAccess.Save`.

-or-

The constructor that best matches `args` has `varargs` arguments.
- `TargetInvocationException`: The constructor being called throws an exception.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `MissingMethodException`: No matching constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

#### Remarks
The constructor to be invoked must provide the most specific match with the specified argument list under the constraints of the specified binder and binding attributes.

## Activator.CreateInstance(Type, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public static object? CreateInstance (Type type, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates an instance of the specified type using the constructor that best matches the specified parameters.

Parameters:

- `type`: The type of object to create.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `type` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that uses `bindingAttr` and `args` to seek and identify the `type` constructor. If `binder` is `null`, the default binder is used.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `type` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances with no value.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not a `RuntimeType`.

-or-

`type` is an open generic type (that is, the `Type.ContainsGenericParameters` property returns `true`).
- `NotSupportedException`: `type` cannot be a `TypeBuilder`.

-or-

Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.

-or-

`activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.

-or-

The assembly that contains `type` is a dynamic assembly that was created with `AssemblyBuilderAccess.Save`.

-or-

The constructor that best matches `args` has `varargs` arguments.
- `TargetInvocationException`: The constructor being called throws an exception.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `MissingMethodException`: No matching constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

#### Remarks
The constructor to be invoked must provide the most specific match with the specified argument list under the constraints of the specified binder and binding attributes.
