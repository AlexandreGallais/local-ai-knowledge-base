---
title: "aot_lib"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/aot/includes/aot_lib.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# aot_lib

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as Roslyn source generators.

Library authors hoping to support Native AOT are encouraged to review the following articles:

* Native AOT deployment
* Prepare .NET libraries for trimming
