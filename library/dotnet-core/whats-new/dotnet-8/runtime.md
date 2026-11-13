---
title: "What's new in .NET 8 runtime (part 1 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-8/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the .NET 8 runtime

This article describes new features in the .NET runtime for .NET 8.

## Performance improvements

.NET 8 includes improvements to code generation and just-in time (JIT) compilation:

- Arm64 performance improvements
- SIMD improvements
- Support for AVX-512 ISA extensions (see Vector512 and AVX-512)
- Cloud-native improvements
- JIT throughput improvements
- Loop and general optimizations
- Optimized access for fields marked with `System.ThreadStaticAttribute`
- Consecutive register allocation. Arm64 has two instructions for table vector lookup, which require that all entities in their tuple operands are present in consecutive registers.
- JIT/NativeAOT can now unroll and auto-vectorize some memory operations with SIMD, such as comparison, copying, and zeroing, if it can determine their sizes at compile time.

In addition, dynamic profile-guided optimization (PGO) has been improved and is now enabled by default. You no longer need to use a runtime configuration option to enable it. Dynamic PGO works hand-in-hand with tiered compilation to further optimize code based on additional instrumentation that's put in place during tier 0.

On average, dynamic PGO increases performance by about 15%. In a benchmark suite of ~4600 tests, 23% saw performance improvements of 20% or more.

### Codegen struct promotion

.NET 8 includes a new physical promotion optimization pass for codegen that generalizes the JIT's ability to promote struct variables. This optimization (also called *scalar replacement of aggregates*) replaces the fields of struct variables by primitive variables that the JIT is then able to reason about and optimize more precisely.

The JIT already supported this optimization but with several large limitations including:

- It was only supported for structs with four or fewer fields.
- It was only supported if each field was a primitive type, or a simple struct wrapping a primitive type.

Physical promotion removes these limitations, which fixes a number of long-standing JIT issues.

## Garbage collection

.NET 8 adds a capability to adjust the memory limit on the fly. This is useful in cloud-service scenarios, where demand comes and goes. To be cost-effective, services should scale up and down on resource consumption as the demand fluctuates. When a service detects a decrease in demand, it can scale down resource consumption by reducing its memory limit. Previously, this would fail because the garbage collector (GC) was unaware of the change and might allocate more memory than the new limit. With this change, you can call the `System.GC.RefreshMemoryLimit` API to update the GC with the new memory limit.

There are some limitations to be aware of:

- On 32-bit platforms (for example, Windows x86 and Linux ARM), .NET is unable to establish a new heap hard limit if there isn't already one.
- The API might return a non-zero status code indicating the refresh failed. This can happen if the scale-down is too aggressive and leaves no room for the GC to maneuver. In this case, consider calling `GC.Collect(2, GCCollectionMode.Aggressive)` to shrink the current memory usage, and then try again.
- If you scale up the memory limit beyond the size that the GC believes the process can handle during startup, the `RefreshMemoryLimit` call will succeed, but it won't be able to use more memory than what it perceives as the limit.

The following code snippet shows how to call the API.

```csharp
GC.RefreshMemoryLimit();
```

You can also refresh some of the GC configuration settings related to the memory limit. The following code snippet sets the heap hard limit to 100 mebibytes (MiB):

```csharp
AppContext.SetData("GCHeapHardLimit", (ulong)100 * 1_024 * 1_024);
GC.RefreshMemoryLimit();
```

The API can throw an `System.InvalidOperationException` if the hard limit is invalid, for example, in the case of negative heap hard limit percentages and if the hard limit is too low. This can happen if the heap hard limit that the refresh will set, either because of new AppData settings or implied by the container memory limit changes, is lower than what's already committed.

## Globalization for mobile apps

Mobile apps on iOS, tvOS, and MacCatalyst can opt in to a new *hybrid* globalization mode that uses a lighter ICU bundle. In hybrid mode, globalization data is partially pulled from the ICU bundle and partially from calls into Native APIs. Hybrid mode serves all the locales supported by mobile.

Hybrid mode is most suitable for apps that can't work in invariant globalization mode and that use cultures that were trimmed from ICU data on mobile. You can also use it when you want to load a smaller ICU data file. (The *icudt_hybrid.dat* file is 34.5 % smaller than the default ICU data file *icudt.dat*.)

To use hybrid globalization mode, set the `HybridGlobalization` MSBuild property to true:

```xml
<PropertyGroup>
  <HybridGlobalization>true</HybridGlobalization>
</PropertyGroup>
```

There are some limitations to be aware of:

- Due to limitations of Native API, not all globalization APIs are supported in hybrid mode.
- Some of the supported APIs have different behavior.

To check if your application is affected, see Behavioral differences.

## Source-generated COM interop

.NET 8 includes a new source generator that supports interoperating with COM interfaces. You can use the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` to mark an interface as a COM interface for the source generator. The source generator will then generate code to enable calling from C# code to unmanaged code. It also generates code to enable calling from unmanaged code into C#. This source generator integrates with `System.Runtime.InteropServices.LibraryImportAttribute`, and you can use types with the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` as parameters and return types in `LibraryImport`-attributed methods.

```csharp
﻿using System.Runtime.InteropServices;
using System.Runtime.InteropServices.Marshalling;

[GeneratedComInterface]
[Guid("5401c312-ab23-4dd3-aa40-3cb4b3a4683e")]
partial interface IComInterface
{
    void DoWork();
}

internal partial class MyNativeLib
{
    [LibraryImport(nameof(MyNativeLib))]
    public static partial void GetComInterface(out IComInterface comInterface);
}
```
The source generator also supports the new `System.Runtime.InteropServices.Marshalling.GeneratedComClassAttribute` attribute to enable you to pass types that implement interfaces with the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` attribute to unmanaged code. The source generator will generate the code necessary to expose a COM object that implements the interfaces and forwards calls to the managed implementation.

Methods on interfaces with the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` attribute support all the same types as `LibraryImportAttribute`, and `LibraryImportAttribute` now supports `GeneratedComInterface`-attributed types and `GeneratedComClass`-attributed types.

If your C# code only uses a `GeneratedComInterface`-attributed interface to either wrap a COM object from unmanaged code or wrap a managed object from C# to expose to unmanaged code, you can use the options in the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute.Options` property to customize which code will be generated. These options mean you don't need to write marshallers for scenarios that you know won't be used.

The source generator uses the new `System.Runtime.InteropServices.Marshalling.StrategyBasedComWrappers` type to create and manage the COM object wrappers and the managed object wrappers. This new type handles providing the expected .NET user experience for COM interop, while providing customization points for advanced users. If your application has its own mechanism for defining types from COM or if you need to support scenarios that source-generated COM doesn't currently support, consider using the new `System.Runtime.InteropServices.Marshalling.StrategyBasedComWrappers` type to add the missing features for your scenario and get the same .NET user experience for your COM types.

If you're using Visual Studio, new analyzers and code fixes make it easy to convert your existing COM interop code to use source-generated interop. Next to each interface that has the `System.Runtime.InteropServices.ComImportAttribute`, a lightbulb offers an option to convert to source-generated interop. The fix changes the interface to use the `System.Runtime.InteropServices.Marshalling.GeneratedComInterfaceAttribute` attribute. And next to every class that implements an interface with `GeneratedComInterfaceAttribute`, a lightbulb offers an option to add the `System.Runtime.InteropServices.Marshalling.GeneratedComClassAttribute` attribute to the type. Once your types are converted, you can move your `DllImport` methods to use `LibraryImportAttribute`.

### Limitations

The COM source generator doesn't support apartment affinity, using the `new` keyword to activate a COM CoClass, and the following APIs:

- `System.Runtime.InteropServices.UnmanagedType.IDispatch`-based interfaces.
- `System.Runtime.InteropServices.UnmanagedType.IInspectable`-based interfaces.
- COM properties and events.

## Configuration-binding source generator

.NET 8 introduces a source generator to provide AOT and trim-friendly configuration in ASP.NET Core. The generator is an alternative to the pre-existing reflection-based implementation.

The source generator probes for `Microsoft.Extensions.Options.ConfigureOptions`1.Configure(`0)`, `Microsoft.Extensions.Configuration.ConfigurationBinder.Bind*`, and `Microsoft.Extensions.Configuration.ConfigurationBinder.Get*` calls to retrieve type info from. When the generator is enabled in a project, the compiler implicitly chooses generated methods over the pre-existing reflection-based framework implementations.

No source code changes are needed to use the generator. It's enabled by default in AOT-compiled web apps, and when `PublishTrimmed` is set to `true` (.NET 8+ apps). For other project types, the source generator is off by default, but you can opt in by setting the `EnableConfigurationBindingGenerator` property to `true` in your project file:

```xml
<PropertyGroup>
    <EnableConfigurationBindingGenerator>true</EnableConfigurationBindingGenerator>
</PropertyGroup>
```

The following code shows an example of invoking the binder.

```csharp
﻿public class ConfigBindingSG
{
    static void RunIt(params string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        IConfigurationSection section = builder.Configuration.GetSection("MyOptions");

        // !! Configure call - to be replaced with source-gen'd implementation
        builder.Services.Configure<MyOptions>(section);

        // !! Get call - to be replaced with source-gen'd implementation
        MyOptions? options0 = section.Get<MyOptions>();

        // !! Bind call - to be replaced with source-gen'd implementation
        MyOptions options1 = new();
        section.Bind(options1);

        WebApplication app = builder.Build();
        app.MapGet("/", () => "Hello World!");
        app.Run();
    }

    public class MyOptions
    {
        public int A { get; set; }
        public string S { get; set; }
        public byte[] Data { get; set; }
        public Dictionary<string, string> Values { get; set; }
        public List<MyClass> Values2 { get; set; }
    }

    public class MyClass
    {
        public int SomethingElse { get; set; }
    }
}
```
