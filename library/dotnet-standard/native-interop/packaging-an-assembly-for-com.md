---
title: "Package a .NET Framework assembly for COM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/packaging-an-assembly-for-com.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Package a .NET Framework assembly for COM

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy tools and deployment models, such as Tlbexp.exe, Regasm.exe, Regsvcs.exe, the global assembly cache, and registry-based COM registration. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

COM developers can benefit from the following information about the managed types they plan to incorporate in their application:

- A list of types that COM applications can consume

  Some managed types are invisible to COM; some are visible but not creatable; and some are both visible and creatable. An assembly can comprise any combination of invisible, visible, not creatable, and creatable types. For completeness, identify the types in an assembly that you intend to expose to COM, especially when those types are a subset of the types exposed to .NET.

  For additional information, see Qualifying .NET Types for Interoperation.

- Versioning instructions

  Managed classes that implement the class interface (a COM interop-generated interface) are subject to versioning restrictions.

  For guidelines on using the class interface, see Introducing the class interface.

- Deployment instructions

  For .NET Framework, strong-named assemblies that are signed by a publisher can be installed into the global assembly cache. Unsigned assemblies must be installed on the user's machine as private assemblies.

  For additional information, see Assembly Security Considerations.

- Type library inclusion

  Most types require a type library when consumed by a COM application. You can generate a type library or have COM developers perform this task. The Windows SDK provides the following options for generating a type library:

  - Type Library Exporter

  - TypeLibConverter Class

  - Assembly Registration Tool

  - .NET Services Installation Tool

  Regardless of the mechanism you choose, only public types defined in the assembly you supply are included in the generated type library.

For instructions, see How to: Embed Type Libraries as Win32 Resources in .NET-Based Applications.

## Type Library Exporter

The Type Library Exporter (Tlbexp.exe) is a command-line tool that converts the classes and interfaces contained in an assembly to a COM type library. Once the type information of the class is available, COM clients can create an instance of the .NET class and call the methods of the instance, just as if it were a COM object. Tlbexp.exe converts an entire assembly at one time. You cannot use Tlbexp.exe to generate type information for a subset of the types defined in an assembly.

## TypeLibConverter Class

The `System.Runtime.InteropServices.TypeLibConverter` class, located in the **System.Runtime.Interop** namespace, converts the classes and interfaces contained in an assembly to a COM type library. This API produces the same type information as the Type Library Exporter, described in the previous section.

The **TypeLibConverter class** implements the `System.Runtime.InteropServices.ITypeLibConverter`.

## Assembly Registration Tool

The Assembly Registration Tool (Regasm.exe) can generate and register a type library when you apply the **/tlb:** option. COM clients require that type libraries be installed in the Windows registry. Without this option, Regasm.exe only registers the types in an assembly, not the type library. Registering the types in an assembly and registering the type library are distinct activities.

## .NET Services Installation Tool

The .NET Services Installation Tool (Regsvcs.exe) adds managed classes to Windows 2000 Component Services and combines several tasks within a single tool. In addition to loading and registering an assembly, Regsvcs.exe can generate, register, and install the type library into an existing COM+ 1.0 application.

## See also

- `System.Runtime.InteropServices.TypeLibConverter`
- `System.Runtime.InteropServices.ITypeLibConverter`
- Expose .NET components to COM
- Qualifying .NET Types for Interoperation
- Introducing the class interface
- Assembly Security Considerations
- Tlbexp.exe (Type Library Exporter)
- Register .NET Framework assemblies with COM
- How to: Embed Type Libraries as Win32 Resources in Applications
