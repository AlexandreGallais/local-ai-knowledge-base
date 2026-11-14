---
title: "Add references to type libraries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/how-to-add-references-to-type-libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Add references to type libraries

> **Note:**
> This article describes .NET Framework COM interop guidance that uses legacy Visual Studio type-library references and primary interop assemblies. For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

Visual Studio generates an interop assembly containing metadata when you add a reference to a type library. If a primary interop assembly is available, Visual Studio uses the existing assembly before generating a new interop assembly.

## Add a reference to a type library in Visual Studio

1. Install the COM DLL or EXE file on your computer, unless a Windows Setup.exe file performs the installation for you.

2. Choose **Project**, **Add Reference**.

3. In the Reference Manager, choose **COM**.

4. Select the type library from the list, or browse for the .tlb file.

5. Choose **OK**.

6. In Solution Explorer, open the shortcut menu for the reference you just added, and then choose **Properties**.

7. In the **Properties** window, make sure that the **Embed Interop Types** property is set to **True**. This causes Visual Studio to embed type information for COM types in your executables, eliminating the need to deploy primary interop assemblies with your app.

> **Note:**
> The menu and dialog box options may vary depending on the version of Visual Studio you're using.

## Add a reference to a type library for command-line compilation

1. Generate an interop assembly as described in Generate interop assemblies from type libraries.

2. Use the -link (C# Compiler Options) or -link (Visual Basic) compiler option with the interop assembly name to embed type information for COM types in your executables.

## See also

- Import a type library as an assembly
- Expose COM components to .NET
- Walkthrough: Embedding Types from Managed Assemblies in Visual Studio
- -link (C# Compiler Options)
- -link (Visual Basic)
