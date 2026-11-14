---
title: "Assembly class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class (part 2 of 6)

## Assembly.CreateInstance(String, Boolean) method

```csharp
public object? CreateInstance (string typeName, bool ignoreCase);
```

Locates the specified type from this assembly and creates an instance of it using the system activator, with optional case-sensitive search.

Parameters:

- `typeName`: The `Type.FullName` of the type to locate.
- `ignoreCase`: `true` to ignore the case of the type name; otherwise, `false`.

Returns: An instance of the specified type created with the parameterless constructor; or `null` if `typeName` is not found. The type is resolved using the default binder, without specifying culture or activation attributes, and with `BindingFlags` set to `Public` or `Instance`.

Exceptions:

- `ArgumentException`: `typeName` is an empty string ("") or a string beginning with a null character.

-or-

The current assembly was loaded into the reflection-only context.
- `MissingMethodException`: No matching constructor was found.
- `ArgumentNullException`: `typeName` is `null`.
- `FileNotFoundException`: `typeName` requires a dependent assembly that could not be found.
- `FileLoadException`: `typeName` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `typeName` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `typeName` requires a dependent assembly, but the file is not a valid assembly for the currently loaded runtime.

#### Remarks
If the runtime is unable to find `typeName` in the `Assembly` instance, it returns `null` instead of throwing an exception. This might happen because:

- You haven't specified the fully qualified name of the type.

- The type doesn't exist in the current `Assembly` instance.

#### Examples
The following example defines a `Person` class. It then calls the `CreateInstance` method to instantiate it, but because the casing of the `typeName` argument doesn't match that of the type's `FullName` property, the method returns `null`. When the example passes the same string to the `CreateInstance` overload and specifies that the comparison should be case-insensitive, the `Person` class is found, and a `Person` object is successfully instantiated.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CreateInstance/createinstance2.cs._

## Assembly.CreateInstance(String, Boolean, BindingFlags, Binder, Object[], CultureInfo, Object[]) method

```csharp
public virtual object? CreateInstance (string typeName, bool ignoreCase, System.Reflection.BindingFlags bindingAttr, System.Reflection.Binder? binder, object[]? args, System.Globalization.CultureInfo? culture, object[]? activationAttributes);
```

Locates the specified type from this assembly and creates an instance of it using the system activator, with optional case-sensitive search and having the specified culture, arguments, and binding and activation attributes.

Parameters:

- `typeName`: The `Type.FullName` of the type to locate.
- `ignoreCase`: `true` to ignore the case of the type name; otherwise, `false`.
- `bindingAttr`: A bitmask that affects the way in which the search is conducted. The value is a combination of bit flags from `BindingFlags`.
- `binder`: An object that enables the binding, coercion of argument types, invocation of members, and retrieval of `MemberInfo` objects via reflection. If `binder` is `null`, the default binder is used.
- `args`: An array that contains the arguments to be passed to the constructor. This array of arguments must match in number, order, and type the parameters of the constructor to be invoked. If the parameterless constructor is desired, `args` must be an empty array or `null`.
- `culture`: An instance of `CultureInfo` used to govern the coercion of types. If this is `null`, the `CultureInfo` for the current thread is used. (This is necessary to convert a string that represents 1000 to a `Double` value, for example, since 1000 is represented differently by different cultures.)
- `activationAttributes`: An array of one or more attributes that can participate in activation. Typically, an array that contains a single `UrlAttribute` object that specifies the URL that is required to activate a remote object.  This parameter is related to client-activated objects. Client activation is a legacy technology that is retained for backward compatibility but is not recommended for new development. Distributed applications should instead use Windows Communication Foundation.

Returns: An instance of the specified type, or `null` if `typeName` is not found. The supplied arguments are used to resolve the type, and to bind the constructor that is used to create the instance.

Exceptions:

- `ArgumentException`: `typeName` is an empty string ("") or a string beginning with a null character.

-or-

The current assembly was loaded into the reflection-only context.
- `ArgumentNullException`: `typeName` is `null`.
- `MissingMethodException`: No matching constructor was found.
- `NotSupportedException`: A non-empty activation attributes array is passed to a type that does not inherit from `MarshalByRefObject`.
- `FileNotFoundException`: `typeName` requires a dependent assembly that could not be found.
- `FileLoadException`: `typeName` requires a dependent assembly that was found but could not be loaded.

-or-

The current assembly was loaded into the reflection-only context, and `typeName` requires a dependent assembly that was not preloaded.
- `BadImageFormatException`: `typeName` requires a dependent assembly, but the file is not a valid assembly for the currently loaded runtime.

To be added.

## Assembly.CreateQualifiedName(String, String) method

```csharp
public static string CreateQualifiedName (string? assemblyName, string? typeName);
```

Creates the name of a type qualified by the display name of its assembly.

Parameters:

- `assemblyName`: The display name of an assembly.
- `typeName`: The full name of a type.

Returns: The full name of the type qualified by the display name of the assembly.

#### Remarks
The format of the returned string is:

\<FullTypeName>, \<AssemblyDisplayName>

See `AssemblyName` for a description of the format of the display name of an assembly.

To accommodate changes in versions of the common language runtime, use this method rather than constructing the qualified name yourself.  For information about qualified assembly names, see `Type.AssemblyQualifiedName`.

## Assembly.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether this assembly and the specified object are equal.

Parameters:

- `o`: The object to compare with this instance.

Returns: `true` if `o` is equal to this instance; otherwise, `false`.

#### Remarks
The `Assembly.Equals` method performs a test for reference equality to determine whether the current instance and `o` are equal.

## Assembly.GetAssembly(Type) method

```csharp
public static System.Reflection.Assembly? GetAssembly (Type type);
```

Gets the currently loaded assembly in which the specified type is defined.

Parameters:

- `type`: An object representing a type in the assembly that will be returned.

Returns: The assembly in which the specified type is defined.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
Calling this method is equivalent to retrieving the value of the  `Assembly` property. However, the `Assembly` property typically offers superior performance.

In order to call this method, you must have a `Type` object, which means that the assembly in which the class is defined must already be loaded.

#### Examples
The following example retrieves the assembly that contains the `Int32` type and displays its name and file location.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CodeBase/GetAssembly1.cs._

## Assembly.GetCallingAssembly() method

```csharp
public static System.Reflection.Assembly GetCallingAssembly ();
```

Returns the `Assembly` of the method that invoked the currently executing method.

Returns: The `Assembly` object of the method that invoked the currently executing method.

Exceptions:

- `NotSupportedException`: In .NET 11 and later, stack trace support is disabled.

#### Remarks
If the method that calls the `Assembly.GetCallingAssembly` method is expanded inline by the just-in-time (JIT) compiler, or if its caller is expanded inline, the assembly that is returned by `Assembly.GetCallingAssembly` may differ unexpectedly. For example, consider the following methods and assemblies:

- Method `M1` in assembly `A1` calls `Assembly.GetCallingAssembly`.

- Method `M2` in assembly `A2` calls `M1`.

- Method `M3` in assembly `A3` calls `M2`.

When `M1` is not inlined, `Assembly.GetCallingAssembly` returns `A2`. When `M1` is inlined, `Assembly.GetCallingAssembly` returns `A3`. Similarly, when `M2` is not inlined, `Assembly.GetCallingAssembly` returns `A2`. When `M2` is inlined, `Assembly.GetCallingAssembly` returns `A3`.

This effect also occurs when `M1` executes as a tail call from `M2`, or when `M2` executes as a tail call from `M3`. You can prevent the JIT compiler from inlining the method that calls `Assembly.GetCallingAssembly`, by applying the `MethodImplAttribute` attribute with the `NoInlining` flag, but there is no similar mechanism for preventing tail calls.

Starting in .NET 11, this method supports Native AOT and uses stack trace data to identify the caller. If the `StackTraceSupport` feature switch is set to `false`, the method throws `NotSupportedException`.

#### Examples
The following example gets the calling assembly of the current method.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/CodeBase/getcallingassembly1.cs._

## Assembly.GetCustomAttributes(Boolean) method

```csharp
public virtual object[] GetCustomAttributes (bool inherit);
```

Gets all the custom attributes for this assembly.

Parameters:

- `inherit`: This argument is ignored for objects of type `Assembly`.

Returns: An array that contains the custom attributes for this assembly.

#### Remarks
This method implements the corresponding `ICustomAttributeProvider` interface method. Therefore, the `inherit` parameter must be specified even though it is ignored.

A pseudo-attribute indicates bits of the core metadata that must be set when the attribute is present. Unlike a custom attribute that extends the metadata for a type and is saved along with the type, a pseudo-attribute modifies the metadata for the type and then is discarded. Some of the resulting bits cannot be accessed using existing reflection APIs.

The following table summarizes the different pseudo-attributes and the accessors for the bits that are available in reflection.

|Pseudo-Attribute|Metadata Bits|Reflection Accessor|
|-----------------------|-------------------|-------------------------|
|`DllImportAttribute`|`CorPInvokeMap` DLL name|No accessor for `PInvokeMap` for ordinary method/global method attributes. No accessor for DLL name.|
|`GuidAttribute`|Stored as a real custom attribute.|Accessed as a real custom attribute.|
|`ComImportAttribute`|`CorTypeAttr.tdImport`|`Type.Attributes.Import`|
|`SerializableAttribute`|`CorTypeAttr.tdSerializable`|`Type.Attributes.Serializable`|
|`NonSerializedAttribute`|`CorFieldAttr.fdNotSerialized`|`FieldInfo.Attributes.NotSerialized`|
|`MethodImplAttribute`|`CorMethodImpl`|`MethodInfo.GetMethodImplementationFlags()` `ConstructorInfo.GetMethodImplementationFlags()`|
|`MarshalAsAttribute`|Various bits.|No accessor.|
|`PreserveSigAttribute`|`CorMethodImpl.miOLE`|`MethodInfo.GetMethodImplementationFlags().OLE` `ConstructorInfo.GetMethodImplementationFlags().OLE`|
|`InAttribute`|`CorParamAttr.pdIn`|`ParameterInfo.Attributes.In`|
|`OutAttribute`|`CorParamAttr.pdOut`|`ParameterInfo.Attributes.Out`|
|`StructLayoutAttribute`|`CorTypeAttr.tdLayoutSequential` `CorTypeAttr.tdExplicitLayout` `CorTypeAttr.tdAnsiClass` `CorTypeAttr.tdUnicodeClass` `CorTypeAttr.tdAutoClass` Class packing.|`Type.Attributes.LayoutSequential` `Type.Attributes.ExplicitLayout` `Type.Attributes.AnsiClass` `Type.Attributes.UnicodeClass` `Type.Attributes.AutoClass` No accessor.|
|`FieldOffsetAttribute`|Field offset.|No accessor.|
|`AssemblyLoadAttribute`|`CorAssemblyFlags`|No accessor or enumerator.|
