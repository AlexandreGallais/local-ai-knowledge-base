---
title: "package-manager-heading-hack-pkgname"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/includes/package-manager-heading-hack-pkgname.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# package-manager-heading-hack-pkgname

All versions of .NET are available for download at <https://dotnet.microsoft.com/download/dotnet>, but require manual installation. You can try to use the package manager to install a different version of .NET. However, the requested version might not be available.

The packages added to package manager feeds are named in a hackable format, for example: `{product}-{type}-{version}`.

- **product**\
The type of .NET product to install. Valid options are:

  - `dotnet`
  - `aspnetcore`

- **type**\
Chooses the SDK or the runtime. Valid options are:

  - `sdk` (only available for the **dotnet** product)
  - `runtime`

- **version**\
The version of the SDK or runtime to install. Valid options are any released version, such as:

  - `9.0`
  - `8.0`
  - `3.1`
  - `2.1`

  It's possible the SDK/runtime you're trying to download isn't available for your Linux distribution. For a list of supported distributions, see Install .NET on Linux.

### Examples

- Install the ASP.NET Core 9.0 runtime: `aspnetcore-runtime-9.0`
- Install the .NET Core 2.1 runtime: `dotnet-runtime-2.1`
- Install the .NET 5 SDK: `dotnet-sdk-5.0`
- Install the .NET Core 3.1 SDK: `dotnet-sdk-3.1`

> **Note:**
> Some package might not be available on your Linux distribution.

### Package missing

If the package-version combination doesn't work, it's not available. For example, there isn't an ASP.NET Core SDK. The SDK components for ASP.NET Core are included with the .NET SDK. The value `aspnetcore-sdk-8.0` is incorrect and should be `dotnet-sdk-8.0`. For a list of Linux distributions supported by .NET, see .NET dependencies and requirements.
