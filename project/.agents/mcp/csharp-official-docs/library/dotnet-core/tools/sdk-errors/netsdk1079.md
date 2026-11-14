---
title: "NETSDK1079: The Microsoft.AspNetCore.All package is not supported when targeting .NET Core 3.0 or higher."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1079.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1079: The Microsoft.AspNetCore.All package is not supported when targeting .NET Core 3.0 or higher.

**This article applies to:** ✔️ .NET Core SDK 3.1.100 and later versions

You may receive this error message when:

- You retarget an ASP.NET Core project from .NET Core 2.2 or earlier to .NET Core 3.0 or later.
- The project uses the Microsoft.AspNetCore.All package.

Remove the `PackageReference` for Microsoft.AspNetCore.All.  You may also need to add package references for packages that were referenced from Microsoft.AspNetCore.All but are not included in the ASP.NET Core shared framework.  These packages are listed here: Migrating from Microsoft.AspNetCore.All to Microsoft.AspNetCore.App.

## See also

- Migrate from ASP.NET Core 2.2 to 3.0.
