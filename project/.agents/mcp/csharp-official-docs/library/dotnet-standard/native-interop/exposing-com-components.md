---
title: "Expose COM components to .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/exposing-com-components.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Expose COM components to .NET

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy tools and deployment models, such as primary interop assemblies, the global assembly cache, and registry-based COM registration. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

This section summarizes the process needed to expose an existing COM component to managed code.

 Existing COM components are valuable resources in managed code as middle-tier business applications or as isolated functionality. An ideal component has a primary interop assembly and conforms tightly to the programming standards imposed by COM.

## Expose COM components to .NET

1. Import a type library as an assembly.

     The common language runtime requires metadata for all types, including COM types. There are several ways to obtain an assembly containing COM types imported as metadata.

2. Use COM types in managed Code.

     You can inspect COM types, activate instances, and invoke methods on the COM object the same way you do for any managed type.

3. Compile an interop project.

     The Windows SDK provides compilers for several languages compliant with the Common Language Specification (CLS), including Visual Basic, C#, and C++.

4. Deploy an interop application.

     For .NET Framework, interop applications are often deployed as strong-named, signed assemblies in the global assembly cache.

## See also

- Interoperating with Unmanaged Code
- Design Considerations for Interoperation
- COM Interop Sample: .NET Client and COM Server
- Language Independence and Language-Independent Components
- Gacutil.exe (Global Assembly Cache Tool)
