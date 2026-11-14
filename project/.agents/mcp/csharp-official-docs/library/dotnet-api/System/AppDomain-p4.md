---
title: "AppDomain class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 4 of 7)

## AppDomain.CreateInstanceFrom(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly file.

Parameters:

- `assemblyFile`: The name, including the path, of a file that contains an assembly that defines the requested type. The assembly is loaded using the `Assembly.LoadFrom` method.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `ignoreCase`: A Boolean value specifying whether to perform a case-sensitive search or not.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects through reflection. If `binder` is null, the default binder is used.
- `args`: The arguments to pass to the constructor. This array of arguments must match in number, order, and type the parameters of the constructor to invoke. If the parameterless constructor is preferred, `args` must be an empty array or null.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `typeName` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An object that is a wrapper for the new instance, or `null` if `typeName` is not found. The return value needs to be unwrapped to access the real object.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.

-or-

`typeName` is `null`.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileNotFoundException`: `assemblyFile` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `MissingMethodException`: No matching public constructor was found.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `NullReferenceException`: This instance is `null`.

#### Remarks
For more information, see the `Activator.CreateInstanceFrom` method.

When the `AppDomain.CreateInstanceFrom` method is used to create an instance in a target application domain, other than the application domain from which the call is made, the assembly is loaded in the target application domain. However, if the instance is unwrapped in the calling application domain, using the unwrapped instance in certain ways can cause the assembly to be loaded into the calling application domain. For example, after the instance is unwrapped, its type information might be requested, in order to call its methods late-bound. When the assembly is loaded into the calling application domain, exceptions can occur.

- If another version of the same assembly was previously loaded into the calling application domain, or if the load path of the calling application domain is different from that of the target application domain, exceptions such as `MissingMethodException` can occur.

- If the calling application domain makes early-bound calls to the instance type, `InvalidCastException` can be thrown when an attempt is made to cast the instance.

## AppDomain.CreateInstanceFromAndUnwrap(String, String) method

```csharp
public object? CreateInstanceFromAndUnwrap (string assemblyFile, string typeName);
```

Creates a new instance of the specified type defined in the specified assembly file.

Parameters:

- `assemblyFile`: To be added.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.

Returns: The requested object, or `null` if `typeName` is not found.

Exceptions:

- `ArgumentNullException`: `assemblyName` is `null`.

-or-

`typeName` is `null`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileNotFoundException`: `assemblyName` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `MissingMethodException`: No parameterless public constructor was found.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstanceFrom` and `ObjectHandle.Unwrap`. This method calls the parameterless constructor for `typeName`.

For more information, see the `Activator.CreateInstanceFrom` method.

## AppDomain.CreateInstanceFromAndUnwrap(String, String, Object[]) method

```csharp
public object? CreateInstanceFromAndUnwrap (string assemblyFile, string typeName, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly file.

Parameters:

- `assemblyFile`: To be added.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly (see the `Type.FullName` property).
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects.Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: The requested object, or `null` if `typeName` is not found.

Exceptions:

- `ArgumentNullException`: `assemblyName` is `null`.

-or-

`typeName` is `null`.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileNotFoundException`: `assemblyName` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `MissingMethodException`: No parameterless public constructor was found.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstanceFrom` and `ObjectHandle.Unwrap`. This method calls the parameterless constructor for `typeName`.

For more information about this method, see the `Activator.CreateInstanceFrom` method.

## AppDomain.CreateInstanceFromAndUnwrap(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public object? CreateInstanceFromAndUnwrap (string assemblyFile, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly file, specifying whether the case of the type name is ignored; the binding attributes and the binder that are used to select the type to be created; the arguments of the constructor; the culture; and the activation attributes.

Parameters:

- `assemblyFile`: The file name and path of the assembly that defines the requested type.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `ignoreCase`: A Boolean value specifying whether to perform a case-sensitive search or not.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects through reflection. If `binder` is null, the default binder is used.
- `args`: The arguments to pass to the constructor. This array of arguments must match in number, order, and type the parameters of the constructor to invoke. If the parameterless constructor is preferred, `args` must be an empty array or null.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `typeName` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: The requested object, or `null` if `typeName` is not found.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.

-or-

`typeName` is `null`.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileNotFoundException`: `assemblyFile` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `MissingMethodException`: No matching public constructor was found.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly.

-or-

`assemblyFile` was compiled with a later version of the common language runtime that the version that is currently loaded.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstanceFrom` and `ObjectHandle.Unwrap`.

For more information about this method, see the `Activator.CreateInstanceFrom` method.

## AppDomain.ExecuteAssembly(String) method

```csharp
public int ExecuteAssembly (string assemblyFile);
```

Executes the assembly contained in the specified file.

Parameters:

- `assemblyFile`: The name of the file that contains the assembly to execute.

Returns: The value returned by the entry point of the assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` is not found.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `MissingMethodException`: The specified assembly has no entry point.

#### Remarks
The assembly begins executing at the entry point specified in the .NET header.

This method does not create a new process or application domain, and it does not execute the entry point method on a new thread.

This method loads assemblies using the `Assembly.LoadFile` method. You can also execute assemblies using the `AppDomain.ExecuteAssemblyByName` method, which loads assemblies using the `Assembly.Load` method.

To create the `AppDomain` to load and execute, use the `AppDomain.CreateDomain` method.

#### Examples
The following sample demonstrates using one of the overloads of `AppDomain.ExecuteAssembly` on two different domains.

_Code sample not included: ~/snippets/csharp/System/AppDomain/ExecuteAssembly/executeassembly.cs._

## AppDomain.ExecuteAssembly(String, String[]) method

```csharp
public int ExecuteAssembly (string assemblyFile, string?[]? args);
```

Executes the assembly contained in the specified file, using the specified arguments.

Parameters:

- `assemblyFile`: The name of the file that contains the assembly to execute.
- `args`: The arguments to the entry point of the assembly.

Returns: The value that is returned by the entry point of the assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` is not found.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `MissingMethodException`: The specified assembly has no entry point.

#### Remarks
The assembly begins executing at the entry point specified in the .NET header.

This method does not create a new process or application domain, and it does not execute the entry point method on a new thread.

This method loads assemblies using the `Assembly.LoadFile` method. You can also execute assemblies using the `AppDomain.ExecuteAssemblyByName` method, which loads assemblies using the `Assembly.Load` method.

#### Examples
The following sample demonstrates using one of the overloads of `AppDomain.ExecuteAssembly` on two different domains.

_Code sample not included: ~/snippets/csharp/System/AppDomain/ExecuteAssembly/executeassembly.cs._
