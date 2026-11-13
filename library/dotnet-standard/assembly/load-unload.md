---
title: "How to: Load and unload assemblies"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/assembly/load-unload.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Load and unload assemblies

The assemblies referenced by your program will automatically be loaded by the common language runtime, but it is also possible to dynamically load specific assemblies into the current application domain. For more information, see How to: Load assemblies into an application domain.

In .NET Framework, there is no way to unload an individual assembly without unloading all of the application domains that contain it. Even if the assembly goes out of scope, the actual assembly file will remain loaded until all application domains that contain it are unloaded. In .NET Core, the `System.Runtime.Loader.AssemblyLoadContext` class handles the unloading of assemblies. For more information, see How to use and debug assembly unloadability in .NET Core.

## Load and unload assemblies

To load an assembly into an application domain, use one of the several load methods contained in the classes `System.AppDomain` and `System.Reflection.Assembly`. For more information, see How to: Load assemblies into an application domain. Note that .NET Core supports only a single application domain.

To unload an assembly in the .NET Framework, you must unload all of the application domains that contain it. To unload an application domain, use the `System.AppDomain.Unload*` method. For more information, see How to: Unload an application domain.

If you want to unload some assemblies but not others in a .NET Framework application, consider creating a new application domain, executing the code inside that domain, and then unloading that application domain. For more information, see How to: Unload an application domain.

## See also

- C# programming guide
- Programming concepts (Visual Basic)
- Assemblies in .NET
- How to: Load assemblies into an application domain
