---
title: "COM Interop in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/cominterop.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# COM interop in .NET

The Component Object Model (COM) lets an object expose its functionality to other components and to host applications on Windows platforms. To help enable users to interoperate with their existing code bases, .NET Framework has always provided strong support for interoperating with COM libraries. A large portion of this support has been added to modern .NET (on Windows only). The documentation here explains how the common COM interop technologies work and how you can utilize them to interoperate with your existing COM libraries.

## Built-in and source-generated COM interop

COM interop functionality can be achieved through a built-in system in the .NET runtime or through implementing the ComWrappers API (introduced in .NET 6). You can use the COM source generator to automatically implement the `ComWrappers` API for `IUnknown`-based interfaces.

- COM Wrappers
- COM Callable Wrappers
- Runtime Callable Wrappers
- Qualifying .NET Types for COM Interoperation
- Trimmer and Native AOT-friendly COM interop
