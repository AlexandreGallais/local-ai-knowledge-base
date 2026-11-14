---
title: "AppDomain class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomain class (part 3 of 7)

## AppDomain.CreateInstanceAndUnwrap(String, String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public object? CreateInstanceAndUnwrap (string assemblyName, string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object?[]? args, System.Globalization.CultureInfo? culture, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly, specifying whether the case of the type name is ignored; the binding attributes and the binder that are used to select the type to be created; the arguments of the constructor; the culture; and the activation attributes.

Parameters:

- `assemblyName`: The display name of the assembly. See `Assembly.FullName`.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `ignoreCase`: A Boolean value specifying whether to perform a case-sensitive search or not.
- `bindingAttr`: A combination of zero or more bit flags that affect the search for the `typeName` constructor. If `bindingAttr` is zero, a case-sensitive search for public constructors is conducted.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects using reflection. If `binder` is null, the default binder is used.
- `args`: The arguments to pass to the constructor. This array of arguments must match in number, order, and type the parameters of the constructor to invoke. If the parameterless constructor is preferred, `args` must be an empty array or null.
- `culture`: A culture-specific object used to govern the coercion of types. If `culture` is `null`, the `CultureInfo` for the current thread is used.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object. that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An instance of the object specified by `typeName`.

Exceptions:

- `ArgumentNullException`: `assemblyName` or `typeName` is `null`.
- `MissingMethodException`: No matching constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `BadImageFormatException`: `assemblyName` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

#### Remarks
This is a convenience method that combines `AppDomain.CreateInstance` and `ObjectHandle.Unwrap`.

See `AssemblyName` for the format of `assemblyName`. See the `FullName` property for the format of `typeName`.

> **Note:**
> If you make an early-bound call to a method `M` of an object of type `T1` that was returned by `AppDomain.CreateInstanceAndUnwrap`, and that method makes an early-bound call to a method of an object of type `T2` in an assembly `C` other than the current assembly or the assembly containing `T1`, assembly `C` is loaded into the current application domain. This loading occurs even if the early-bound call to `T1.M()` was made in the body of a `DynamicMethod`, or in other dynamically generated code. If the current domain is the default domain, assembly `C` cannot be unloaded until the process ends. If the current domain later attempts to load assembly `C`, the load might fail.

## AppDomain.CreateInstanceFrom(String, String) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName);
```

Creates a new instance of the specified type defined in the specified assembly file.

Parameters:

- `assemblyFile`: The name, including the path, of a file that contains an assembly that defines the requested type. The assembly is loaded using the `Assembly.LoadFrom` method.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.

Returns: An object that is a wrapper for the new instance, or `null` if `typeName` is not found. The return value needs to be unwrapped to access the real object.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.

-or-

`typeName` is `null`.
- `FileNotFoundException`: `assemblyFile` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `MissingMethodException`: No parameterless public constructor was found.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `NullReferenceException`: This instance is `null`.

#### Remarks
The parameterless constructor for `typeName` is invoked.

For more information, see the `Activator.CreateInstanceFrom` method.

When the `AppDomain.CreateInstanceFrom` method is used to create an instance in a target application domain, other than the application domain from which the call is made, the assembly is loaded in the target application domain. However, if the instance is unwrapped in the calling application domain, using the unwrapped instance in certain ways can cause the assembly to be loaded into the calling application domain. For example, after the instance is unwrapped, its type information might be requested, in order to call its methods late-bound. When the assembly is loaded into the calling application domain, exceptions can occur.

- If another version of the same assembly was previously loaded into the calling application domain, or if the load path of the calling application domain is different from that of the target application domain, exceptions such as `MissingMethodException` can occur.
- If the calling application domain makes early-bound calls to the instance type, `InvalidCastException` can be thrown when an attempt is made to cast the instance.

#### Examples
The following example shows how to use the `CreateInstanceFrom` method overload to create an instance of an object in a target application domain and call its methods.

The example defines the `MarshalableExample` class, which can be marshaled across application domain boundaries. The example builds a path to the currently executing assembly, creates a target application domain, and uses the `CreateInstanceFrom` method overload to load the example assembly into the target application domain and create an instance of `MarshalableExample`.

> **Note:**
> The path is absolute in this example, but a relative path would also work because the `Assembly.LoadFrom` method is used to load the assembly.

After unwrapping the object handle, the example demonstrates three ways to use an object in a target application domain:

- Invoking a method with late binding, using reflection. This requires type information, which causes the assembly to be loaded into the application domain of the caller. (In this example, it is already loaded.)
- Casting the object to an interface known to both the caller and the callee. If the interface is defined in the calling assembly or in a third assembly referenced by both the caller and the callee, the called assembly is not loaded into the application domain of the caller.
- Using the object directly when its type is known to the caller. The assembly must be loaded into the application domain of the caller.

Another way to avoid loading the called assembly into the application domain of the caller is for the caller to derive from the `MarshalByRefObject` class and to define a method that can be run in the target application domain. That method can use reflection to examine a target assembly, because the target assembly is already loaded into the target application domain. See the example for the `DynamicDirectory` property.

_Code sample not included: ~/snippets/csharp/System/AppDomain/CreateInstanceFrom/example.cs._

## AppDomain.CreateInstanceFrom(String, String, Object[]) method

```csharp
public System.Runtime.Remoting.ObjectHandle? CreateInstanceFrom (string assemblyFile, string typeName, object?[]? activationAttributes);
```

Creates a new instance of the specified type defined in the specified assembly file.

Parameters:

- `assemblyFile`: The name, including the path, of a file that contains an assembly that defines the requested type. The assembly is loaded using the `Assembly.LoadFrom` method.
- `typeName`: The fully qualified name of the requested type, including the namespace but not the assembly, as returned by the `Type.FullName` property.
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.

This parameter is related to client-activated objects.Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An object that is a wrapper for the new instance, or `null` if `typeName` is not found. The return value needs to be unwrapped to access the real object.

Exceptions:

- `ArgumentNullException`: `assemblyFile` is `null`.
- `FileNotFoundException`: `assemblyFile` was not found.
- `TypeLoadException`: `typeName` was not found in `assemblyFile`.
- `MethodAccessException`: The caller does not have sufficient permission to call this constructor.
- `MissingMethodException`: No matching public constructor was found.
- `NotSupportedException`: The caller cannot provide activation attributes for an object that does not inherit from `MarshalByRefObject`.
- `AppDomainUnloadedException`: The operation is attempted on an unloaded application domain.
- `BadImageFormatException`: `assemblyFile` is not a valid assembly for the currently loaded runtime.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.
- `NullReferenceException`: This instance is `null`.

#### Remarks
The parameterless constructor for `typeName` is invoked.

For more information about this method, see the `Activator.CreateInstanceFrom` method.

When the `AppDomain.CreateInstanceFrom` method is used to create an instance in a target application domain, other than the application domain from which the call is made, the assembly is loaded in the target application domain. However, if the instance is unwrapped in the calling application domain, using the unwrapped instance in certain ways can cause the assembly to be loaded into the calling application domain. For example, after the instance is unwrapped, its type information might be requested, in order to call its methods late-bound. When the assembly is loaded into the calling application domain, exceptions can occur.

- If another version of the same assembly was previously loaded into the calling application domain, or if the load path of the calling application domain is different from that of the target application domain, exceptions such as `MissingMethodException` can occur.

- If the calling application domain makes early-bound calls to the instance type, `InvalidCastException` can be thrown when an attempt is made to cast the instance.
