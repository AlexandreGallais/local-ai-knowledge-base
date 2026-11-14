---
title: "Activator class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Activator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Activator class (part 3 of 3)

## Activator.CreateInstance(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates an instance of the type whose name is specified, using the named assembly and the constructor that best matches the specified parameters.

Parameters:

- `assemblyName`: The name of the assembly where the type named `typeName` is sought. If `assemblyName` is `null`, the executing assembly is searched.
- `typeName`: The fully qualified name of the type to create an instance of.
- `ignoreCase`: `true` to specify that the search for `typeName` is not case-sensitive; `false` to specify that the search is case-sensitive.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that uses `bindingAttr` and `args` to seek and identify the `typeName` constructor. If `binder` is `null`, the default binder is used.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `typeName` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A handle that must be unwrapped to access the newly created instance, or `null` for `Nullable<T>` instances with no value.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `TargetInvocationException`: The constructor, which was invoked through reflection, threw an exception.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `NotSupportedException`: Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.

-or-

`activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.

-or-

The constructor that best matches `args` has `varargs` arguments.
- `BadImageFormatException`: `assemblyName` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyName` was compiled for a version of the CLR that is later than the currently loaded version.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

-or-

The assembly name or code base is invalid.

#### Remarks
Use `ObjectHandle.Unwrap` to unwrap the return value.

Assembly loads triggered by this API are affected by the current value of `AssemblyLoadContext.CurrentContextualReflectionContext`.

## Activator.CreateInstance<T>() method

```csharp
public static T CreateInstance<T> () where T : allows ref struct;
```

Creates an instance of the type designated by the specified generic type parameter, using the parameterless constructor.

Parameters:

- `T`: The type to create.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `MissingMethodException`: Cannot create an instance of an abstract class, or the type that is specified for `T` does not have a parameterless constructor.

#### Remarks
The `CreateInstance<T>` generic method is used by compilers to implement the instantiation of types specified by type parameters. For example, in the following generic method, the implementation of `new T()` uses the `CreateInstance<T>` generic method.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstanceT/remarks.cs._

In general, there is no use for the `CreateInstance<T>` generic method in application code, because the type must be known at compile time. If the type is known at compile time, normal instantiation syntax can be used (`new` operator in C#, `New` in Visual Basic). If the type is not known at compile time, you can call a non-generic overload of `Activator.CreateInstance`.

There are no overloads of the `CreateInstance<T>` generic method that take argument lists, because the non-generic overloads of `Activator.CreateInstance` already provide late-bound constructor resolution.

## Activator.CreateInstanceFrom(String, String) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName);
```

Creates an instance of the type whose name is specified, using the named assembly file and parameterless constructor.

Parameters:

- `assemblyFile`: The name of a file that contains an assembly where the type named `typeName` is sought.
- `typeName`: The name of the type to create an instance of.

Returns: A handle that must be unwrapped to access the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `FileNotFoundException`: `assemblyFile` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `TargetInvocationException`: The constructor, which was invoked through reflection, threw an exception.
- `SecurityException`: The caller does have the required `FileIOPermission`.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyFile` was compiled for a version of the CLR that is later than the currently loaded version.

#### Remarks
Use the `ObjectHandle.Unwrap` method to unwrap the return value.

For information about other exceptions that can be thrown by invoked methods, see the Exceptions section of the `Assembly.LoadFrom` and `Activator.CreateInstance` methods.

#### Examples
The following code example demonstrates how to call the `Activator.CreateInstanceFrom` method. This code example is part of a larger example provided for the `Activator` class.

_Code sample not included: ~/snippets/csharp/System/Activator/Overview/ActivatorX.cs._

## Activator.CreateInstanceFrom(String, String, Object[]) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName, object?[]? activationAttributes);
```

Creates an instance of the type whose name is specified, using the named assembly file and parameterless constructor.

Parameters:

- `assemblyFile`: The name of a file that contains an assembly where the type named `typeName` is sought.
- `typeName`: The name of the type to create an instance of.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A handle that must be unwrapped to access the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `FileNotFoundException`: `assemblyFile` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `TargetInvocationException`: The constructor, which was invoked through reflection, threw an exception.
- `NotSupportedException`: `activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.
- `SecurityException`: The caller does have the required `FileIOPermission`.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyFile` was compiled for a version of the CLR that is later than the currently loaded version.

#### Remarks
Use the `ObjectHandle.Unwrap` method to unwrap the return value.

For information about other exceptions that can be thrown by invoked methods, see the Exceptions section of the `Assembly.LoadFrom` and `Activator.CreateInstance` methods.

## Activator.CreateInstanceFrom(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates an instance of the type whose name is specified, using the named assembly file and the constructor that best matches the specified parameters.

Parameters:

- `assemblyFile`: The name of a file that contains an assembly where the type named `typeName` is sought.
- `typeName`: The name of the type to create an instance of.
- `ignoreCase`: `true` to specify that the search for `typeName` is not case-sensitive; `false` to specify that the search is case-sensitive.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that uses `bindingAttr` and `args` to seek and identify the `typeName` constructor. If `binder` is `null`, the default binder is used.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `typeName` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. This is typically an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: A handle that must be unwrapped to access the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `FileNotFoundException`: `assemblyFile` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `TargetInvocationException`: The constructor, which was invoked through reflection, threw an exception.
- `SecurityException`: The caller does not have the required `FileIOPermission`.
- `NotSupportedException`: `activationAttributes` is not an empty array, and the type being created does not derive from `MarshalByRefObject`.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyFile` was compiled for a version of the CLR that is later than the currently loaded version.

#### Remarks
Use the `ObjectHandle.Unwrap` method to unwrap the return value.

For information about other exceptions that can be thrown by invoked methods, see the Exceptions section of the `Assembly.LoadFrom` and `Activator.CreateInstance` methods.
