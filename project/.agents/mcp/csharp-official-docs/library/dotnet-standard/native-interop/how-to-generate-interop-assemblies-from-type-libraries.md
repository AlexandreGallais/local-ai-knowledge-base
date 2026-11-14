---
title: "Generate interop assemblies from type libraries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/how-to-generate-interop-assemblies-from-type-libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generate interop assemblies from type libraries

> **Note:**
> This article describes .NET Framework COM interop guidance that uses the legacy Type Library Importer (Tlbimp.exe). For modern .NET, use COM source generation or the `System.Runtime.InteropServices.ComWrappers` API. For more information, see COM interop.

The Type Library Importer (Tlbimp.exe) is a command-line tool that converts the coclasses and interfaces contained in a COM type library to metadata. This tool creates an interop assembly and namespace for the type information automatically. After the metadata of a class is available, managed clients can create instances of the COM type and call its methods, just as if it were a .NET instance. Tlbimp.exe converts an entire type library to metadata at once and cannot generate type information for a subset of the types defined in a type library.

## Generate an interop assembly from a type library

To generate an interop assembly from a type library, use the following command:

`tlbimp <type-library-file>`

Adding the `/out:` switch produces an interop assembly with an altered name, such as LOANLib.dll. Altering the interop assembly name can help distinguish it from the original COM DLL and prevent problems that can occur from having duplicate names.

## Example

 The following command produces the Loanlib.dll assembly in the `Loanlib` namespace.

```console
tlbimp Loanlib.tlb
```

 The following command produces an interop assembly with an altered name (LOANLib.dll).

```console
tlbimp LoanLib.tlb /out: LOANLib.dll
```

## See also

- Import a type library as an assembly
- Expose COM components to .NET
