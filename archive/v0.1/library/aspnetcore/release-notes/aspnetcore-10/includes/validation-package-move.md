---
title: "validation-package-move"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/validation-package-move.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# validation-package-move

### Validation APIs moved to Microsoft.Extensions.Validation

The validation APIs have moved to the `Microsoft.Extensions.Validation` namespace and NuGet package. This change makes the APIs usable outside of ASP.NET Core HTTP scenarios. The public APIs and behavior remain unchanged—only the package and namespace are different. Existing projects don't require code changes, as old references redirect to the new implementation.
