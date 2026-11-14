---
title: "MetadataLoadContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MetadataLoadContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetadataLoadContext class

Namespace: `System.Reflection`

```csharp
public sealed class MetadataLoadContext : IDisposable
```

Represents a closed universe of Type objects loaded for inspection-only purposes. Each MetadataLoadContext can have its own binding rules and is isolated from all other MetadataLoadContexts.

#### Remarks

A `MetadataLoadContext` maintains bindings between assembly names and the `Assembly` instances returned by its `MetadataAssemblyResolver`. Explicitly loading an assembly into the context does not establish such a binding.

Assemblies are treated strictly as metadata. There are no restrictions on loading assemblies based on target platform, CPU architecture, or pointer size. There are no restrictions on the assembly designated as the core assembly (**mscorlib**).

For more information and examples, see How to: Inspect assembly contents using MetadataLoadContext.

## MetadataLoadContext.MetadataLoadContext(MetadataAssemblyResolver, String) constructor

```csharp
public MetadataLoadContext (System.Reflection.MetadataAssemblyResolver resolver, string? coreAssemblyName = default);
```

Creates a new `MetadataLoadContext` object.

Parameters:

- `resolver`: A `MetadataAssemblyResolver` instance.
- `coreAssemblyName`: The name of the assembly that contains the core types such as `Object`. Typically, this would be "mscorlib".

To be added.

## MetadataLoadContext.CoreAssembly property

```csharp
public System.Reflection.Assembly CoreAssembly { get; }
```

Gets or sets the assembly that denotes the "system assembly" that houses the well-known types such as `Int32`.

Returns: An `Assembly` instance.

#### Remarks

The core assembly is treated differently than other assemblies because references to these well-known types do not include the assembly reference, unlike normal types.

Typically, this assembly is named "System.Runtime", "mscorlib", or "netstandard".

The `CoreAssembly` is determined by passing the `coreAssemblyName` parameter to the `MetadataLoadContext` constructor,
which in turn passes it to the `MetadataAssemblyResolver.Resolve` method.

If no `coreAssemblyName` argument was specified in the constructor of `MetadataLoadContext`, then default values are used, including "mscorlib", "System.Runtime" and "netstandard".

The designated core assembly does not need to contain the core types directly. It can type forward them to other assemblies. Thus, it is perfectly permissible to use the mscorlib facade as the designated core assembly.

Note that `Runtime` is not an ideal core assembly because it excludes some of the interop-related pseudo-custom attribute types such as `DllImportAttribute`. However, it can serve if you have no interest in those attributes. The CustomAttributes API will skip those attributes if the core assembly does not include the necessary types.

If a core assembly cannot be found, the constructor of `MetadataLoadContext` throws an exception.

## MetadataLoadContext.Dispose() method

```csharp
public void Dispose ();
```

Releases any native resources (such as file locks on assembly files).

After disposal, it is not safe to use any `Assembly` objects dispensed by the `MetadataLoadContext` or any reflection objects dispensed by those `Assembly` objects.

Though objects provided by the `MetadataLoadContext` strive to throw an `ObjectDisposedException`, this is not guaranteed.

Some APIs may return fixed or previously cached data. Accessing objects *during* a `MetadataLoadContext.Dispose` method call may result in an unmanaged access violation and failfast.

## MetadataLoadContext.GetAssemblies() method

```csharp
public System.Collections.Generic.IEnumerable<System.Reflection.Assembly> GetAssemblies ();
```

Return an atomic snapshot of the assemblies that have been loaded into the `MetadataLoadContext`.

Returns: An enumerable collection of `Assembly` objects.

To be added.

## MetadataLoadContext.GetLoadContext(Assembly) method

```csharp
public static System.Reflection.MetadataLoadContext? GetLoadContext (System.Reflection.Assembly assembly);
```

To be added.

Parameters:

- `assembly`: To be added.

Returns: To be added.

To be added.

## MetadataLoadContext.LoadFromAssemblyName(AssemblyName) method

```csharp
public System.Reflection.Assembly LoadFromAssemblyName (System.Reflection.AssemblyName assemblyName);
```

Resolves the supplied assembly name to an assembly. If an assembly was previously bound to this name, that assembly is returned. Otherwise, the `MetadataLoadContext` calls the specified `MetadataAssemblyResolver`.

Parameters:

- `assemblyName`: An `AssemblyName` instance.

Returns: An `Assembly` instance.

Exceptions:

- `FileNotFoundException`: The resolver returns `null`.

#### Remarks

If the resolver returns `null`, that failure is remembered: later requests for the same name throw `FileNotFoundException` without calling the resolver again.

## MetadataLoadContext.LoadFromAssemblyName(String) method

```csharp
public System.Reflection.Assembly LoadFromAssemblyName (string assemblyName);
```

Resolves the supplied assembly name to an assembly. If an assembly was previously bound to this name, that assembly is returned. Otherwise, the `MetadataLoadContext` calls the specified `MetadataAssemblyResolver`.

Parameters:

- `assemblyName`: A `String` representing the assembly name.

Returns: An `Assembly` instance.

Exceptions:

- `FileNotFoundException`: The resolver returns `null`.

#### Remarks

If the resolver returns `null`, that failure is remembered: later requests for the same name throw `FileNotFoundException` without calling the resolver again.

## MetadataLoadContext.LoadFromAssemblyPath(String) method

```csharp
public System.Reflection.Assembly LoadFromAssemblyPath (string assemblyPath);
```

Loads an assembly from a specific path on the disk into the `MetadataLoadContext`. If a prior assembly with the same name was already loaded into the `MetadataLoadContext`, the prior assembly is returned.

Parameters:

- `assemblyPath`: A `String` representing the path to the assembly.

Returns: An `Assembly` instance.

Exceptions:

- `FileLoadException`: The two assemblies do not have the same Mvid.

#### Remarks

Loading an assembly does not automatically make it available for resolution by name. References to the assembly and calls to `MetadataLoadContext.LoadFromAssemblyName` are resolved through the `MetadataAssemblyResolver`, which may return the loaded assembly.

## MetadataLoadContext.LoadFromByteArray(Byte[]) method

```csharp
public System.Reflection.Assembly LoadFromByteArray (byte[] assembly);
```

Loads an assembly from a byte array into the `MetadataLoadContext`. If a prior assembly with the same name was already loaded into the `MetadataLoadContext`, the prior assembly is returned.

Parameters:

- `assembly`: A byte array holding an assembly.

Returns: An `Assembly` instance.

Exceptions:

- `FileLoadException`: The two assemblies do not have the same Mvid.

#### Remarks

Loading an assembly does not automatically make it available for resolution by name. References to the assembly and calls to `MetadataLoadContext.LoadFromAssemblyName` are resolved through the `MetadataAssemblyResolver`, which may return the loaded assembly.

## MetadataLoadContext.LoadFromStream(Stream) method

```csharp
public System.Reflection.Assembly LoadFromStream (System.IO.Stream assembly);
```

Loads an assembly from a stream into the `MetadataLoadContext`. If a prior assembly with the same name was already loaded into the `MetadataLoadContext`, the prior assembly is returned.

Parameters:

- `assembly`: A `Stream` holding an assembly.

Returns: The loaded assembly.

Exceptions:

- `FileLoadException`: The two assemblies do not have the same Mvid.

#### Remarks

Loading an assembly does not automatically make it available for resolution by name. References to the assembly and calls to `MetadataLoadContext.LoadFromAssemblyName` are resolved through the `MetadataAssemblyResolver`, which may return the loaded assembly.

> **Important:**
> The `MetadataLoadContext` takes ownership of the `Stream` passed into this method. The original owner must not mutate its position, dispose the `Stream`, or assume that its position will stay unchanged.
