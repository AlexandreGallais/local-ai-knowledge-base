---
title: "How to use and debug assembly unloadability in .NET (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/assembly/unloadability.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use and debug assembly unloadability in .NET

.NET (Core) introduced the ability to load and later unload a set of assemblies. In .NET Framework, custom app domains were used for this purpose, but .NET (Core) only supports a single default app domain.

Unloadability is supported through `System.Runtime.Loader.AssemblyLoadContext`. You can load a set of assemblies into a collectible `AssemblyLoadContext`, execute methods in them or just inspect them using reflection, and finally unload the `AssemblyLoadContext`. That unloads the assemblies loaded into the `AssemblyLoadContext`.

There's one noteworthy difference between the unloading using `AssemblyLoadContext` and using AppDomains. With AppDomains, the unloading is forced. At unload time, all threads running in the target AppDomain are aborted, managed COM objects created in the target AppDomain are destroyed, and so on. With `AssemblyLoadContext`, the unload is "cooperative". Calling the `System.Runtime.Loader.AssemblyLoadContext.Unload*` method just initiates the unloading. The unloading finishes after:

- No threads have methods from the assemblies loaded into the `AssemblyLoadContext` on their call stacks.
- None of the types from the assemblies loaded into the `AssemblyLoadContext`, instances of those types, and the assemblies themselves are referenced by:
  - References outside of the `AssemblyLoadContext`, except for weak references (`System.WeakReference` or `System.WeakReference`1`).
  - Strong garbage collector (GC) handles (GCHandleType.Normal or GCHandleType.Pinned) from both inside and outside of the `AssemblyLoadContext`.

## Use collectible AssemblyLoadContext

This section contains a detailed step-by-step tutorial that shows a simple way to load a .NET (Core) application into a collectible `AssemblyLoadContext`, execute its entry point, and then unload it. You can find a complete sample at <https://github.com/dotnet/samples/tree/main/core/tutorials/Unloading>.

### Create a collectible AssemblyLoadContext

Derive your class from the `System.Runtime.Loader.AssemblyLoadContext` and override its `System.Runtime.Loader.AssemblyLoadContext.Load*` method. That method resolves references to all assemblies that are dependencies of assemblies loaded into that `AssemblyLoadContext`.

The following code is an example of the simplest custom `AssemblyLoadContext`:

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

As you can see, the `Load` method returns `null`. That means that all the dependency assemblies are loaded into the default context, and the new context contains only the assemblies explicitly loaded into it.

If you want to load some or all of the dependencies into the `AssemblyLoadContext` too, you can use the `AssemblyDependencyResolver` in the `Load` method. The `AssemblyDependencyResolver` resolves the assembly names to absolute assembly file paths. The resolver uses the *.deps.json* file and assembly files in the directory of the main assembly loaded into the context.

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/complex_assemblyloadcontext.cs._

### Use a custom collectible AssemblyLoadContext

This section assumes the simpler version of the `TestAssemblyLoadContext` is being used.

You can create an instance of the custom `AssemblyLoadContext` and load an assembly into it as follows:

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

For each of the assemblies referenced by the loaded assembly, the `TestAssemblyLoadContext.Load` method is called so that the `TestAssemblyLoadContext` can decide where to get the assembly from. In this case, it returns `null` to indicate that it should be loaded into the default context from locations that the runtime uses to load assemblies by default.

Now that an assembly was loaded, you can execute a method from it. Run the `Main` method:

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

After the `Main` method returns, you can initiate unloading by either calling the `Unload` method on the custom `AssemblyLoadContext` or removing the reference you have to the `AssemblyLoadContext`:

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

This is sufficient to unload the test assembly. Next, you'll put all of this into a separate noninlineable method to ensure that the `TestAssemblyLoadContext`, `Assembly`, and `MethodInfo` (the `Assembly.EntryPoint`) can't be kept alive by stack slot references (real- or JIT-introduced locals). That could keep the `TestAssemblyLoadContext` alive and prevent the unload.

Also, return a weak reference to the `AssemblyLoadContext` so that you can use it later to detect unload completion.

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

Now you can run this function to load, execute, and unload the assembly.

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

However, the unload doesn't complete immediately. As previously mentioned, it relies on the garbage collector to collect all the objects from the test assembly. In many cases, it isn't necessary to wait for the unload completion. However, there are cases where it's useful to know that the unload has finished. For example, you might want to delete the assembly file that was loaded into the custom `AssemblyLoadContext` from disk. In such a case, the following code snippet can be used. It triggers garbage collection and waits for pending finalizers in a loop until the weak reference to the custom `AssemblyLoadContext` is set to `null`, indicating the target object was collected. In most cases, just one pass <example-value> the loop is required. However, for more complex cases where objects created by the code running in the `AssemblyLoadContext` have finalizers, more passes might be needed.

_Code sample not included: ~/samples/snippets/standard/assembly/unloading/simple_example.cs._

### Limitations

Assemblies loaded in a collectible `AssemblyLoadContext` must abide by the general restrictions on collectible assemblies. The following limitations additionally apply:

* Assemblies written in C++/CLI are not supported.
* ReadyToRun generated code will be ignored.

### The Unloading event

In some cases, it might be necessary for the code loaded into a custom `AssemblyLoadContext` to perform some cleanup when the unloading is initiated. For example, it might need to stop threads or clean up strong GC handles. The `Unloading` event can be used in such cases. You can hook a handler that performs the necessary cleanup to this event.

### Troubleshoot unloadability issues

Due to the cooperative nature of the unloading, it's easy to forget about references that might be keeping the stuff in a collectible `AssemblyLoadContext` alive and preventing unload. Here's a summary of entities (some of them nonobvious) that can hold the references:

- Regular references held from outside of the collectible `AssemblyLoadContext` that are stored in a stack slot or a processor register (method locals, either explicitly created by the user code or implicitly by the just-in-time (JIT) compiler), a static variable, or a strong (pinning) GC handle, and transitively pointing to:
  - An assembly loaded into the collectible `AssemblyLoadContext`.
  - A type from such an assembly.
  - An instance of a type from such an assembly.
- Threads running code from an assembly loaded into the collectible `AssemblyLoadContext`.
- Instances of custom, noncollectible `AssemblyLoadContext` types created inside of the collectible `AssemblyLoadContext`.
- Pending `System.Threading.RegisteredWaitHandle` instances with callbacks set to methods in the custom `AssemblyLoadContext`.
- Fields on your custom `AssemblyLoadContext` subclass that reference assemblies, types, or instances of types loaded into the collectible `AssemblyLoadContext`. While unloading is in progress, the runtime holds a strong GC handle to the `AssemblyLoadContext` to coordinate the unload. This means the GC won't collect those field references even after you drop your own reference to the `AssemblyLoadContext`. Clear these fields so unloading can complete.

> **Tip:**
> Object references that are stored in stack slots or processor registers and that could prevent unloading of an `AssemblyLoadContext` can occur in the following situations:
>
> - When function call results are passed directly to another function, even though there is no user-created local variable.
> - When the JIT compiler keeps a reference to an object that was available at some point in a method.
