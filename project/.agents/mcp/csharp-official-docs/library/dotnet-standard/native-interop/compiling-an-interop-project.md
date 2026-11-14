---
title: "Compile an interop project"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/compiling-an-interop-project.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compile an interop project

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy interop assemblies and primary interop assemblies. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

COM interop projects that reference one or more assemblies containing imported COM types are compiled like any other managed project. You can reference interop assemblies in a development environment such as Visual Studio, or you can reference them when you use a command-line compiler. In either case, to compile properly, the interop assembly must be in the same directory as the other project files.

 There are two ways to reference interop assemblies:

- Embedded interop types: Instruct the compiler to embed type information from an interop assembly into your executable. This is the recommended technique.
- Deploying interop assemblies: Create a standard reference to an interop assembly. In this case, the interop assembly must be deployed with your application.

 The differences between these two techniques are discussed in greater detail in Using COM Types in Managed Code.

 Embedding interop types with Visual Studio is demonstrated in Walkthrough: Embedding Types from Managed Assemblies in Visual Studio.

 To reference an interop assembly with a command-line compiler and embed type information in your executables, use the -link (C# Compiler Options) or the -link (Visual Basic) compiler switch and specify the name of the interop assembly.

> **Note:**
> Visual C++ applications cannot embed type information, but they can interoperate with applications or add-ins that do.

 To compile an application that includes a primary interop assembly when it is deployed, use the **/reference** compiler switch and specify the name of the interop assembly.

## See also

- Expose COM components to .NET
- Language Independence and Language-Independent Components
- Using COM Types in Managed Code
- Walkthrough: Embedding Types from Managed Assemblies in Visual Studio
- Import a type library as an assembly
