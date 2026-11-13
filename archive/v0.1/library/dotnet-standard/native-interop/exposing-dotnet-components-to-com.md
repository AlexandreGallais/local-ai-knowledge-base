---
title: "Expose .NET components to COM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/exposing-dotnet-components-to-com.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Expose .NET components to COM

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy tools and deployment models, such as Regasm.exe, the global assembly cache, and registry-based COM registration. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

Writing a .NET type and consuming that type from unmanaged code are distinct activities for developers. This section describes several tips for writing managed code that interoperates with COM clients:

- Qualifying .NET types for interoperation.

     All managed types, methods, properties, fields, and events that you want to expose to COM must be public. Types must have a public parameterless constructor, which is the only constructor that can be invoked through COM.

- Applying interop attributes.

     Custom attributes within managed code can enhance the interoperability of a component.

- Packaging an assembly for COM.

     COM developers might require that you summarize the steps involved in referencing and deploying your assemblies.

 Additionally, this section identifies the tasks related to consuming a managed type from a COM client.

## To consume a managed type from COM

1. Register assemblies with COM.

     For .NET Framework, types in an assembly (and type libraries) must be registered at design time. If an installer does not register the assembly, instruct COM developers to use Regasm.exe.

2. Reference .NET types from COM.

     COM developers can reference types in an assembly using the same tools and techniques they use today.

3. Call a .NET object.

     COM developers can call methods on the .NET object the same way they call methods on any unmanaged type. For example, the COM `CoCreateInstance` API activates .NET objects.

4. Deploy an application for COM access.

     For .NET Framework, a strong-named assembly can be installed in the global assembly cache and requires a signature from its publisher. Assemblies that are not strong named must be installed in the application directory of the client.

## See also

- Interoperating with Unmanaged Code
- COM interop sample: COM client and .NET server
