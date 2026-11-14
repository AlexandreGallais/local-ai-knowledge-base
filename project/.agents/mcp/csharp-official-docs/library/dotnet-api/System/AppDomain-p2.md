---
title: "AppDomain class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 2 of 7)

## AppDomain.CreateInstance(String, String, Object[]) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly. A parameter specifies an array of activation attributes.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects.Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An object that is a wrapper for the new instance specified by `typeName`. The return value needs to be unwrapped to access the real object.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MissingMethodException`: No matching public constructor was found.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `NullReferenceException`: This instance is `null`.

#### Remarks
This method calls the parameterless constructor for `typeName`.

See `AssemblyName` for the format of `assemblyName`.

An attempt to call `AppDomain.CreateInstance` on a target application domain that is not the current application domain will result in a successful load of the assembly in the target application domain. Since an `Assembly` is not `MarshalByRefObject`, when this method attempts to return the `Assembly` for the loaded assembly to the current application domain, the common language runtime will try to load the assembly into the current application domain and the load might fail. The assembly that is loaded into the current application domain might be different from the assembly that was loaded first if the path settings for the two application domains are different.

## AppDomain.CreateInstance(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly. Parameters specify a binder, binding flags, constructor arguments, culture-specific information used to interpret arguments, and optional activation attributes.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `ignoreCase`: A Boolean value specifying whether to perform a case-sensitive search or not.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects using reflection. If `binder` is null, the default binder is used.
- `args`: The arguments to pass to the constructor. This array of arguments must match in number, order, and type the parameters of the constructor to invoke. If the parameterless constructor is preferred, `args` must be an empty array or null.
- `culture`: Culture-specific information that governs the coercion of `args` to the formal types declared for the `typeName` constructor. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An object that is a wrapper for the new instance specified by `typeName`. The return value needs to be unwrapped to access the real object.

Exceptions:

- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MissingMethodException`: No matching constructor was found.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `NullReferenceException`: This instance is `null`.

#### Remarks
See `AssemblyName` for the format of `assemblyName`.

An attempt to call `AppDomain.CreateInstance` on a target application domain that is not the current application domain will result in a successful load of the assembly in the target application domain. Since an `Assembly` is not `MarshalByRefObject`, when this method attempts to return the `Assembly` for the loaded assembly to the current application domain, the common language runtime will try to load the assembly into the current application domain and the load might fail. The assembly that is loaded into the current application domain might be different from the assembly that was loaded first if the path settings for the two application domains are different.

## AppDomain.CreateInstanceAndUnwrap(String, String) method

```csharp
public object? CreateInstanceAndUnwrap (string assemblyName, string typeName);
```

Creates a new instance of the specified type. Parameters specify the assembly where the type is defined, and the name of the type.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.

Returns: An instance of the object specified by `typeName`.

Exceptions:

- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstance` and `ObjectHandle.Unwrap`. This method calls the parameterless constructor for `typeName`.

See `AssemblyName` for the format of `assemblyName`. See the `FullName` property for the format of `typeName`.

> **Note:**
> If you make an early-bound call to a method `M` of an object of type `T1` that was returned by `AppDomain.CreateInstanceAndUnwrap`, and that method makes an early-bound call to a method of an object of type `T2` in an assembly `C` other than the current assembly or the assembly containing `T1`, assembly `C` is loaded into the current application domain. This loading occurs even if the early-bound call to `T1.M()` was made in the body of a `DynamicMethod`, or in other dynamically generated code. If the current domain is the default domain, assembly `C` cannot be unloaded until the process ends. If the current domain later attempts to load assembly `C`, the load might fail.

## AppDomain.CreateInstanceAndUnwrap(String, String, Object[]) method

```csharp
public object? CreateInstanceAndUnwrap (string assemblyName, string typeName, object?[]? activationAttributes);
```

Creates a new instance of the specified type. Parameters specify the assembly where the type is defined, the name of the type, and an array of activation attributes.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects.Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An instance of the object specified by `typeName`.

Exceptions:

- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstance` and `ObjectHandle.Unwrap`. This method calls the parameterless constructor for `typeName`.

See `AssemblyName` for the format of `assemblyName`. See the `FullName` property for the format of `typeName`.

> **Note:**
> If you make an early-bound call to a method `M` of an object of type `T1` that was returned by `AppDomain.CreateInstanceAndUnwrap`, and that method makes an early-bound call to a method of an object of type `T2` in an assembly `C` other than the current assembly or the assembly containing `T1`, assembly `C` is loaded into the current application domain. This loading occurs even if the early-bound call to `T1.M()` was made in the body of a `DynamicMethod`, or in other dynamically generated code. If the current domain is the default domain, assembly `C` cannot be unloaded until the process ends. If the current domain later attempts to load assembly `C`, the load might fail.
