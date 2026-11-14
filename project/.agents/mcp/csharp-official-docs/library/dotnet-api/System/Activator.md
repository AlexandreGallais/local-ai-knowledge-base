---
title: "Activator class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Activator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Activator class

Namespace: `System`

```csharp
public static class Activator
```

Contains methods to create types of objects locally or remotely, or obtain references to existing remote objects. This class cannot be inherited.

#### Remarks
The `Activator.CreateInstance` method creates an instance of a type defined in an assembly by invoking the constructor that best matches the specified arguments. If no arguments are specified, the constructor that takes no parameters, that is, the parameterless constructor, is invoked.

You must have sufficient permission to search for and call a constructor; otherwise, an exception is thrown. By default, only public constructors are considered during the search for a constructor. If no constructor or parameterless constructor can be found, an exception is thrown.

A binder parameter specifies an object that searches an assembly for a suitable constructor. You can specify your own binder and search criteria. If no binder is specified, a default binder is used. For more information, see the `Binder` and `BindingFlags` classes.

An evidence parameter affects the security policy and permissions for the constructor. For more information, see the `Evidence` class.

An instance of a type can be created at a local or remote site. If the type is created remotely, an activation attribute parameter specifies the URI of the remote site. The call to create the instance might pass <example-value> intermediary sites before it reaches the remote site. Other activation attributes can modify the environment, or context, in which the call operates at the remote and intermediary sites.

If the instance is created locally, a reference to that object is returned. If the instance is created remotely, a reference to a proxy is returned. The remote object is manipulated through the proxy as if it were a local object.

The `Activator.GetObject` method creates a proxy to a currently running remote object, server-activated well-known object, or XML Web service. You can specify the connection medium, that is, the channel. For more information, see the `ChannelServices` class.

Assemblies contain type definitions. The `Activator.CreateInstance` method creates an instance of a type from a currently running assembly. The `Activator.CreateInstanceFrom` method creates an instance from a file that contains an assembly. The `Activator.CreateComInstanceFrom` method creates an instance of a COM object from a file that contains an assembly.

#### Examples
The following example shows how to use the `Activator` class to dynamically construct objects at run time.

_Code sample not included: ~/snippets/csharp/System/Activator/Overview/ActivatorX.cs._

## Activator.CreateInstance(Type) method

```csharp
public static object? CreateInstance (Type type);
```

Creates an instance of the specified type using that type's parameterless constructor.

Parameters:

- `type`: The type of object to create.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances.

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
- `TargetInvocationException`: The constructor being called throws an exception.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `MissingMethodException`: No matching public constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

#### Remarks
The constructor to be invoked must be accessible.

#### Examples
The following code example demonstrates how to call the `CreateInstance` method. Instances of several different types are created and their default values are displayed.

_Code sample not included: ~/snippets/csharp/System/Activator/Overview/source2.cs._

## Activator.CreateInstance(String, String) method

```csharp
public static System.Runtime.Remoting.ObjectHandle? CreateInstance (string assemblyName, string typeName);
```

Creates an instance of the type whose name is specified, using the named assembly and parameterless constructor.

Parameters:

- `assemblyName`: The name of the assembly where the type named `typeName` is sought. If `assemblyName` is `null`, the executing assembly is searched.
- `typeName`: The fully qualified name of the type to create an instance of.

Returns: A handle that must be unwrapped to access the newly created object, or `null` for `Nullable<T>` instances.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching public constructor was found.
- `TypeLoadException`: `typeName` was not found in `assemblyName`.
- `FileNotFoundException`: `assemblyName` was not found.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: You cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `TargetInvocationException`: The constructor, which was invoked through reflection, threw an exception.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `NotSupportedException`: Creation of `TypedReference`, `ArgIterator`, `Void`, and `RuntimeArgumentHandle` types, or arrays of those types, is not supported.
- `BadImageFormatException`: `assemblyName` is not a valid assembly.

-or-

The common language runtime (CLR) version 2.0 or later is currently loaded, and `assemblyName` was compiled for a version of the CLR that is later than the currently loaded version.
- `FileLoadException`: An assembly or module was loaded twice with two different evidences.

-or-

The assembly name or code base is invalid.

#### Remarks
Use `ObjectHandle.Unwrap` to unwrap the return value.

`assemblyName` can be either of the following:

- The simple name of an assembly, without its path or file extension. For example, you would specify `TypeExtensions` for an assembly whose path and name are .\bin\TypeExtensions.dll.
- The full name of a signed assembly, which consists of its simple name, version, culture, and public key token; for example, "<example-value>".

Assembly loads triggered by this API are affected by the current value of `AssemblyLoadContext.CurrentContextualReflectionContext`.

#### Examples
The following example defines a class named `Person` in an assembly named `PersonInfo`. Note that the `Person` class has two constructors, one of which is parameterless.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstance/personinfo.cs._

The following example calls the `CreateInstance` method to instantiate the `Person` class. It requires a reference to PersonInfo.dll to be added to the project. Because the `CreateInstance` method calls the `Person` class parameterless constructor,  the example assigns a value to its `Name` property.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstance/createinstanceex1.cs._

However, `Activator.CreateInstance` is frequently called to instantiate a type that crosses machine boundaries or that is not known at design time. In this case, you cannot include a reference to the assembly in the project and cannot make early-bound calls to the type's members. To work around this limitation, the following example uses the `Activator.CreateInstance` method along with reflection to assign a value to the `Person` object's `Name` property and to display its value.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstance/createinstanceex1a.cs._

## Activator.CreateInstance(Type, Boolean) method

```csharp
public static object? CreateInstance (Type type, bool nonPublic);
```

Creates an instance of the specified type using that type's parameterless constructor.

Parameters:

- `type`: The type of object to create.
- `nonPublic`: `true` if a public or nonpublic parameterless constructor can match; `false` if only a public parameterless constructor can match.

Returns: A reference to the newly created object, or `null` for `Nullable<T>` instances.

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
- `TargetInvocationException`: The constructor being called throws an exception.
- `MethodAccessException`: The caller does not have permission to call this constructor.
- `MemberAccessException`: Cannot create an instance of an abstract class, or this member was invoked with a late-binding mechanism.
- `InvalidComObjectException`: The COM type was not obtained through `GetTypeFromProgID` or `GetTypeFromCLSID`.
- `MissingMethodException`: No matching public constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

To be added.

## Activator.CreateInstance(Type, Object[]) method

```csharp
public static object? CreateInstance (Type type, params object?[]? args);
```

Creates an instance of the specified type using the constructor that best matches the specified parameters.

Parameters:

- `type`: The type of object to create.
- `args`: An array of arguments that match in number, order, and type the parameters of the constructor to invoke. If `args` is an empty array or `null`, the constructor that takes no parameters (the parameterless constructor) is invoked.

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
- `MissingMethodException`: No matching public constructor was found.
- `COMException`: `type` is a COM object but the class identifier used to obtain the type is invalid, or the identified class is not registered.
- `TypeLoadException`: `type` is not a valid type.

#### Remarks
The constructor to be invoked must be accessible and must provide the most specific match with the specified argument list.

#### Examples
The following example calls the  `CreateInstance` method to create a `String` object. It calls the `%23ctor` constructor to instantiate a string that contains ten elements from a character array starting at the fourteenth position.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstance/CreateInstance5.cs._

The following example creates a jagged array whose elements are arguments to be passed to a `String` constructor. The example then passes each array to the `CreateInstance` method to invoke the appropriate string constructor.

_Code sample not included: ~/snippets/csharp/System/Activator/CreateInstance/createinstance2.cs._
