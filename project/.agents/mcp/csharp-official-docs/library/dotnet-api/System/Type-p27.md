---
title: "Type class (part 27 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Type.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Type class (part 27 of 33)

|Contents of type name|Assembly resolver method|Type resolver method|Result|
|---------------------------|------------------------------|--------------------------|------------|
|type, assembly|null|null|Equivalent to calling the `GetType` method overload.|
|type, assembly|provided|null|`assemblyResolver` returns the assembly or returns `null` if it cannot resolve the assembly. If the assembly is resolved, the `GetType` method overload is used to load the type from the assembly; otherwise, there is no attempt to resolve the type.|
|type, assembly|null|provided|Equivalent to converting the assembly name to an `AssemblyName` object and calling the `Load` method overload to get the assembly. If the assembly is resolved, it is passed to `typeResolver`; otherwise, `typeResolver` is not called and there is no further attempt to resolve the type.|
|type, assembly|provided|provided|`assemblyResolver` returns the assembly or returns `null` if it cannot resolve the assembly. If the assembly is resolved, it is passed to `typeResolver`; otherwise, `typeResolver` is not called and there is no further attempt to resolve the type.|
|type|null, provided|null|Equivalent to calling the `GetType` method overload. Because the assembly name is not provided, only mscorlib.dll/System.Private.CoreLib.dll and the currently executing assembly are searched. If `assemblyResolver` is provided, it is ignored.|
|type|null, provided|provided|`typeResolver` is called, and `null` is passed for the assembly. `typeResolver` can provide a type from any assembly, including assemblies it loads for the purpose. If `assemblyResolver` is provided, it is ignored.|
|assembly|null, provided|null, provided|A `FileLoadException` is thrown, because the assembly name is parsed as if it were an assembly-qualified type name. This results in an invalid assembly name.|

## Type.GetTypeArray(Object[]) method

```csharp
public static Type[] GetTypeArray (object[] args);
```

Gets the types of the objects in the specified array.

Parameters:

- `args`: An array of objects whose types to determine.

Returns: An array of `Type` objects representing the types of the corresponding elements in `args`.

Exceptions:

- `ArgumentNullException`: `args` is `null`.

-or-

One or more of the elements in `args` is `null`.
- `TargetInvocationException`: The class initializers are invoked and at least one throws an exception.

#### Examples
The following code example demonstrates how to use the `Type.GetTypeArray` method to list the types of the elements of an array.

_Code sample not included: ~/snippets/csharp/System/Type/GetProperties/type_gettypecode.cs._

## Type.GetTypeCode(Type) method

```csharp
public static TypeCode GetTypeCode (Type? type);
```

Gets the underlying type code of the specified `Type`.

Parameters:

- `type`: The type whose underlying type code to get.

Returns: The code of the underlying type, or `TypeCode.Empty` if `type` is `null`.

#### Remarks
When you inherit from `Type`, you can change the behavior of this method by overriding the `Type.GetTypeCodeImpl` method.
For `Enum` types, the type code of the underlying integral type is returned.

#### Examples
The following code example demonstrates how the `TypeCode` enumeration can be used. In a decision block inside the `WriteObjectInfo` method, the `TypeCode` of an `Object` parameter is examined, and an appropriate message is written to the console.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeCode/iconvertible.cs._

## Type.GetTypeCodeImpl() method

```csharp
protected virtual TypeCode GetTypeCodeImpl ();
```

Returns the underlying type code of this `Type` instance.

Returns: The type code of the underlying type.

#### Remarks
This method provides the implementation for the `static` (in C#) or `Shared` (in Visual Basic) `GetTypeCode` method. When you inherit from `Type`, you can override this method to provide your own implementation of `Type.GetTypeCode`.

## Type.GetTypeFromCLSID(Guid) method

```csharp
public static Type? GetTypeFromCLSID (Guid clsid);
```

Gets the type associated with the specified class identifier (CLSID).

Parameters:

- `clsid`: The CLSID of the type to get.

Returns: `System.__ComObject` regardless of whether the CLSID is valid.

#### Remarks
The `Type.GetTypeFromCLSID` method supports late-bound access to unmanaged COM objects from .NET apps when you know the COM object's class identifier (CLSID). The class identifier for COM classes is defined in the HKEY_CLASSES_ROOT\CLSID key of the registry. You can retrieve the value of the `IsCOMObject` property to determine whether the type returned by this method is a COM object.

> **Tip:**
> You can call the `Type.GetTypeFromProgID` method for late-bound access to COM objects whose programmatic identifier (ProgID) you know.

Instantiating an unmanaged COM object from its CLSID is a two-step process:

1. Get a `Type` object that represents the`__ComObject` that corresponds to the CLSID by calling the `Type.GetTypeFromCLSID` method.
2. Call the `CreateInstance` method to instantiate the COM object.

See the example for an illustration.

The `GetTypeFromCLSID` overload ignores any exception that may occur when instantiating a `Type` object based on the `clsid` argument. Note that no exception is thrown if `clsid` is not found in the registry.

#### Examples
The following example uses the CLSID of the Microsoft Word Application object to retrieve a COM type that represents the Microsoft Word application. It then instantiates the type by calling the `Activator.CreateInstance` method, and closes it by calling the Application.Quit method.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromCLSID/gettypefromclsid1.cs._

## Type.GetTypeFromCLSID(Guid, Boolean) method

```csharp
public static Type? GetTypeFromCLSID (Guid clsid, bool throwOnError);
```

Gets the type associated with the specified class identifier (CLSID), specifying whether to throw an exception if an error occurs while loading the type.

Parameters:

- `clsid`: The CLSID of the type to get.
- `throwOnError`: `true` to throw any exception that occurs.

-or-

`false` to ignore any exception that occurs.

Returns: `System.__ComObject` regardless of whether the CLSID is valid.

#### Remarks
The `Type.GetTypeFromCLSID` method supports late-bound access to unmanaged COM objects from .NET apps when you know the COM object's class identifier (CLSID). The class identifier for COM classes is defined in the HKEY_CLASSES_ROOT\CLSID key of the registry. You can retrieve the value of the `IsCOMObject` property to determine whether the type returned by this method is a COM object.

> **Tip:**
> You can call the `Type.GetTypeFromProgID` method for late-bound access to COM objects whose programmatic identifier (ProgID) you know.

Instantiating an unmanaged COM object from its CLSID is a two-step process:

1. Get a `Type` object that represents the `__ComObject` that corresponds to the CLSID by calling the `Type.GetTypeFromCLSID` method.
2. Call the `CreateInstance` method to instantiate the COM object.

See the example for an illustration.

Exceptions such as `OutOfMemoryException` will be thrown when specifying `true` for `throwOnError`, but it will not fail for unregistered CLSIDs.

#### Examples
The following example uses the CLSID of the Microsoft Word Application object to retrieve a COM type that represents the Microsoft Word application. It then instantiates the type by calling the `Activator.CreateInstance` method, and closes it by calling the Application.Quit method. An exception is thrown if an error occurs while loading the type.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromCLSID/gettypefromclsid_ex2.cs._

## Type.GetTypeFromCLSID(Guid, String) method

```csharp
public static Type? GetTypeFromCLSID (Guid clsid, string? server);
```

Gets the type associated with the specified class identifier (CLSID) from the specified server.

Parameters:

- `clsid`: The CLSID of the type to get.
- `server`: The server from which to load the type. If the server name is `null`, this method automatically reverts to the local machine.

Returns: `System.__ComObject` regardless of whether the CLSID is valid.

#### Remarks
The `Type.GetTypeFromCLSID` method supports late-bound access to unmanaged COM objects from .NET apps when you know the COM object's class identifier (CLSID). The class identifier for COM classes is defined in the HKEY_CLASSES_ROOT\CLSID key of the registry. You can retrieve the value of the `IsCOMObject` property to determine whether the type returned by this method is a COM object.

> **Tip:**
> You can call the `Type.GetTypeFromProgID` method for late-bound access to COM objects whose programmatic identifier (ProgID) you know.

Instantiating an unmanaged COM object from its CLSID is a two-step process:

1. Get a `Type` object that represents the `__ComObject` that corresponds to the CLSID by calling the `Type.GetTypeFromCLSID` method.
2. Call the `CreateInstance` method to instantiate the COM object.

#### Examples
The following example uses the CLSID of the Microsoft Word Application object to retrieve a COM type that represents the Microsoft Word application from a server named computer17.central.contoso.com. It then instantiates the type by calling the `Activator.CreateInstance` method, and closes it by calling the Application.Quit method.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromCLSID/gettypefromclsid_ex3.cs._

## Type.GetTypeFromCLSID(Guid, String, Boolean) method

```csharp
public static Type? GetTypeFromCLSID (Guid clsid, string? server, bool throwOnError);
```

Gets the type associated with the specified class identifier (CLSID) from the specified server, specifying whether to throw an exception if an error occurs while loading the type.

Parameters:

- `clsid`: The CLSID of the type to get.
- `server`: The server from which to load the type. If the server name is `null`, this method automatically reverts to the local machine.
- `throwOnError`: `true` to throw any exception that occurs.

-or-

`false` to ignore any exception that occurs.

Returns: `System.__ComObject` regardless of whether the CLSID is valid.

#### Remarks
The `Type.GetTypeFromCLSID` method supports late-bound access to unmanaged COM objects from .NET apps when you know the COM object's class identifier (CLSID). The class identifier for COM classes is defined in the HKEY_CLASSES_ROOT\CLSID key of the registry. You can retrieve the value of the `IsCOMObject` property to determine whether the type returned by this method is a COM object.

> **Tip:**
> You can call the `Type.GetTypeFromProgID` method for late-bound access to COM objects whose programmatic identifier (ProgID) you know.

Instantiating an unmanaged COM object from its CLSID is a two-step process:

1. Get a `Type` object that represents the `__ComObject` that corresponds to the CLSID by calling the `Type.GetTypeFromCLSID` method.
2. Call the `CreateInstance` method to instantiate the COM object.

Exceptions such as `OutOfMemoryException` will be thrown when specifying `true` for `throwOnError`, but it will not fail for unregistered CLSIDs.

#### Examples
The following example uses the CLSID of the Microsoft Word Application object to retrieve a COM type that represents the Microsoft Word application from a server named computer17.central.contoso.com. It then instantiates the type by calling the `Activator.CreateInstance` method, and closes it by calling the Application.Quit method. An exception is thrown if an error occurs while loading the type.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromCLSID/gettypefromclsid_ex4.cs._

## Type.GetTypeFromHandle(RuntimeTypeHandle) method

```csharp
public static Type? GetTypeFromHandle (RuntimeTypeHandle handle);
```

Gets the type referenced by the specified type handle.

Parameters:

- `handle`: The object that refers to the type.

Returns: The type referenced by the specified `RuntimeTypeHandle`, or `null` if the `RuntimeTypeHandle.Value` property of `handle` is `null`.

Exceptions:

- `TargetInvocationException`: A class initializer is invoked and throws an exception.

#### Examples
The following example uses the `Type.GetTypeFromHandle` method to get a `Type` object from a `RuntimeTypeHandle` provided by the `Type.GetTypeHandle` method.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromHandle/type_gettypefromhandle.cs._

## Type.GetTypeFromProgID(String) method

```csharp
public static Type? GetTypeFromProgID (string progID);
```

Gets the type associated with the specified program identifier (ProgID), returning null if an error is encountered while loading the `Type`.

Parameters:

- `progID`: The ProgID of the type to get.

Returns: The type associated with the specified ProgID, if `progID` is a valid entry in the registry and a type is associated with it; otherwise, `null`.

Exceptions:

- `ArgumentException`: `progID` is `null`.

#### Remarks
This method is provided for COM support. ProgIDs are not used in .NET because they have been superseded by the concept of namespace.

## Type.GetTypeFromProgID(String, Boolean) method

```csharp
public static Type? GetTypeFromProgID (string progID, bool throwOnError);
```

Gets the type associated with the specified program identifier (ProgID), specifying whether to throw an exception if an error occurs while loading the type.

Parameters:

- `progID`: The ProgID of the type to get.
- `throwOnError`: `true` to throw any exception that occurs.

-or-

`false` to ignore any exception that occurs.

Returns: The type associated with the specified program identifier (ProgID), if `progID` is a valid entry in the registry and a type is associated with it; otherwise, `null`.

Exceptions:

- `ArgumentException`: `progID` is `null`.
- `COMException`: The specified ProgID is not registered.

#### Remarks
This method is provided for COM support. Program IDs are not used in .NET because they have been superseded by the concept of namespace.

#### Examples
The following example retrieves a type by passing a ProgID, specifying whether to throw an exception if the ProgID is invalid. The example then displays the ClassID related to the ProgID, along with any applicable exception message.

_Code sample not included: ~/snippets/csharp/System/Type/GetTypeFromProgID/type_gettypefromprogid2.cs._
