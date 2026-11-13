---
title: "Install .NET on Ubuntu (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/linux-ubuntu-install.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install .NET on Ubuntu (part 3 of 3)

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu70
- libssl3
- libstdc++6
- tzdata
- zlib1g

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```

**os-linux-ubuntu-2604,os-linux-ubuntu-2510,os-linux-ubuntu-2504,os-linux-ubuntu-2404,os-linux-ubuntu-2204:**

## Unsupported versions

The following versions of .NET are ❌ no longer supported:

- .NET 9
- .NET 8
- .NET 7
- .NET 6
- .NET 5
- .NET Core 3.1
- .NET Core 3.0
- .NET Core 2.2
- .NET Core 2.1
- .NET Core 2.0

## How to install other versions

.NET package names are standardized across all Linux distributions. The following table lists the packages:

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

## Next steps

- .NET CLI overview
- How to enable TAB completion for the .NET CLI.
- Tutorial: Create a console application with .NET.
