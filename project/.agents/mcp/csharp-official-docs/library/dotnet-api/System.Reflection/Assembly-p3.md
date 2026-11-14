---
title: "Assembly class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/Assembly.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Assembly class (part 3 of 6)

## Assembly.GetCustomAttributes(Type, Boolean) method

```csharp
public virtual object[] GetCustomAttributes (Type attributeType, bool inherit);
```

Gets the custom attributes for this assembly as specified by type.

Parameters:

- `attributeType`: The type for which the custom attributes are to be returned.
- `inherit`: This argument is ignored for objects of type `Assembly`.

Returns: An array that contains the custom attributes for this assembly as specified by `attributeType`.

Exceptions:

- `ArgumentNullException`: `attributeType` is `null`.
- `ArgumentException`: `attributeType` is not a runtime type.

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

## Assembly.GetCustomAttributesData() method

```csharp
public virtual System.Collections.Generic.IList<System.Reflection.CustomAttributeData> GetCustomAttributesData ();
```

Returns information about the attributes that have been applied to the current `Assembly`, expressed as `CustomAttributeData` objects.

Returns: A generic list of `CustomAttributeData` objects representing data about the attributes that have been applied to the current assembly.

#### Remarks
Use this method to examine the custom attributes of code in the reflection-only context, in cases where the custom attributes themselves are defined in code that is loaded into the reflection-only context. Methods like `Attribute.GetCustomAttributes` and `Assembly.GetCustomAttributes` cannot be used in such cases, because they create instances of the attributes. Code in the reflection-only context cannot be executed. For more information and for example code, see the `CustomAttributeData` class.

## Assembly.GetEntryAssembly() method

```csharp
public static System.Reflection.Assembly? GetEntryAssembly ();
```

Gets the entry assembly for the running application.

Returns: The entry assembly for the running application. Can return `null` when called from unmanaged code.

#### Remarks

The `Assembly.GetEntryAssembly` method can return `null` when a managed assembly has been loaded from an unmanaged application. For example, if an unmanaged application creates an instance of a COM component written in C#, a call to the `Assembly.GetEntryAssembly` method from the C# component returns null, because the entry point for the process was unmanaged code rather than a managed assembly.

## Assembly.GetExecutingAssembly() method

```csharp
public static System.Reflection.Assembly GetExecutingAssembly ();
```

Gets the assembly that contains the code that is currently executing.

Returns: The assembly that contains the code that is currently executing.

#### Remarks
For performance reasons, you should call this method only when you do not know at design time what assembly is currently executing. The recommended way to retrieve an `Assembly` object that represents the current assembly is to use the `Assembly` property of a type found in the assembly, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetExecutingAssembly/assembly1.cs._

To get the assembly that contains the method that called the currently executing code, use `Assembly.GetCallingAssembly`.

#### Examples
The following example uses the `Assembly` property to get the currently executing assembly based on a type contained in that assembly. It also calls the `Assembly.GetExecutingAssembly` method to show that it returns an `Assembly` object that represents the same assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetExecutingAssembly/getexecutingassembly1.cs._

## Assembly.GetExportedTypes() method

```csharp
public virtual Type[] GetExportedTypes ();
```

Gets the public types defined in this assembly that are visible outside the assembly.

Returns: An array that represents the types defined in this assembly that are visible outside the assembly.

Exceptions:

- `NotSupportedException`: The assembly is a dynamic assembly.
- `FileNotFoundException`: Unable to load a dependent assembly.

#### Remarks
The only types visible outside an assembly are public types and public types nested within other public types. To retrieve all types within an assembly, including those that are non-public, use the `Assembly.GetTypes` method.

#### Examples
The following code sample defines a number of classes with various access levels, and calls `Assembly.GetExportedTypes` to display the ones that are visible from outside the assembly.

_Code sample not included: ~/snippets/csharp/System.Reflection/Assembly/GetExportedTypes/source.cs._

## Assembly.GetFile(String) method

```csharp
public virtual System.IO.FileStream? GetFile (string name);
```

Gets a `FileStream` for the specified file in the file table of the manifest of this assembly.

Parameters:

- `name`: The name of the specified file. Do not include the path to the file.

Returns: A stream that contains the specified file, or `null` if the file is not found.

Exceptions:

- `FileLoadException`: A file that was found could not be loaded.
- `ArgumentNullException`: The `name` parameter is `null`.
- `ArgumentException`: The `name` parameter is an empty string ("").
- `FileNotFoundException`: `name` was not found.
- `BadImageFormatException`: `name` is not a valid assembly.

#### Remarks
This method works on both public and private resource files.

The `name` argument should not include the path to the file.

For bundled assemblies, this method throws an exception.

## Assembly.GetFiles() method

```csharp
public virtual System.IO.FileStream[] GetFiles ();
```

Gets the files in the file table of an assembly manifest.

Returns: An array of streams that contain the files.

Exceptions:

- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: A file was not found.
- `BadImageFormatException`: A file was not a valid assembly.

#### Remarks
This method works on public and private resource files.

This overload is equivalent to calling the `GetFiles` overload and specifying `false`.

## Assembly.GetFiles(Boolean) method

```csharp
public virtual System.IO.FileStream[] GetFiles (bool getResourceModules);
```

Gets the files in the file table of an assembly manifest, specifying whether to include resource modules.

Parameters:

- `getResourceModules`: `true` to include resource modules; otherwise, `false`.

Returns: An array of streams that contain the files.

Exceptions:

- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: A file was not found.
- `BadImageFormatException`: A file was not a valid assembly.

#### Remarks
This method works on public and private resource files.

## Assembly.GetForwardedTypes() method

```csharp
public virtual Type[] GetForwardedTypes ();
```

To be added.

Returns: To be added.

To be added.

## Assembly.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Assembly.GetLoadedModules() method

```csharp
public System.Reflection.Module[] GetLoadedModules ();
```

Gets all the loaded modules that are part of this assembly.

Returns: An array of modules.

To be added.

## Assembly.GetLoadedModules(Boolean) method

```csharp
public virtual System.Reflection.Module[] GetLoadedModules (bool getResourceModules);
```

Gets all the loaded modules that are part of this assembly, specifying whether to include resource modules.

Parameters:

- `getResourceModules`: `true` to include resource modules; otherwise, `false`.

Returns: An array of modules.

To be added.

## Assembly.GetManifestResourceInfo(String) method

```csharp
public virtual System.Reflection.ManifestResourceInfo? GetManifestResourceInfo (string resourceName);
```

Returns information about how the given resource has been persisted.

Parameters:

- `resourceName`: The case-sensitive name of the resource.

Returns: An object that is populated with information about the resource's topology, or `null` if the resource is not found.

Exceptions:

- `ArgumentNullException`: `resourceName` is `null`.
- `ArgumentException`: The `resourceName` parameter is an empty string ("").

#### Remarks
Resource information is returned only if the resource is visible to the caller, or the caller has `ReflectionPermission`.

## Assembly.GetManifestResourceNames() method

```csharp
public virtual string[] GetManifestResourceNames ();
```

Returns the names of all the resources in this assembly.

Returns: An array that contains the names of all the resources.

#### Remarks
You can use each resource name in the array returned by this method as follows:

- You can pass the resource name to the `Assembly.GetManifestResourceInfo` method to get additional information about the resource.

- If the name identifies a binary .resources file, you can remove its .resources file extension and pass it to the `%23ctor` constructor to instantiate the resource manager.

- You can pass the resource name to the `Assembly.GetManifestResourceStream` method to retrieve a `Stream` object that you can then pass to the `%23ctor` constructor.

- You can pass the resource name to the `Assembly.GetManifestResourceStream` method to retrieve a `Stream` object that you can then pass to the `%23ctor` constructor.

Resource information is returned only if the resource is visible to the caller, or the caller has `ReflectionPermission`.

## Assembly.GetManifestResourceStream(String) method

```csharp
public virtual System.IO.Stream? GetManifestResourceStream (string name);
```

Loads the specified manifest resource from this assembly.

Parameters:

- `name`: The case-sensitive name of the manifest resource being requested.

Returns: The manifest resource; or `null` if no resources were specified during compilation or if the resource is not visible to the caller.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.
- `ArgumentException`: The `name` parameter is an empty string ("").
- `FileLoadException`: A file that was found could not be loaded.
- `FileNotFoundException`: `name` was not found.
- `BadImageFormatException`: `name` is not a valid assembly.
- `NotImplementedException`: Resource length is greater than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
A manifest resource is a resource (such as an image file) that is embedded in the assembly at compile time.

Resource information is returned only if the resource is visible to the caller, or the caller has `ReflectionPermission`.

> **Note:**
>  This method returns `null` if a private resource in another assembly is accessed and the caller does not have `ReflectionPermission` with the `MemberAccess` flag.

If the assembly manifest lists a resource file, `Assembly.GetManifestResourceStream` returns a `Stream` object even if the resource file cannot be found on disk at the time. If the resource file is not found, passing the resulting `Stream` object to the `ResourceReader` constructor causes an `ArgumentException`.
