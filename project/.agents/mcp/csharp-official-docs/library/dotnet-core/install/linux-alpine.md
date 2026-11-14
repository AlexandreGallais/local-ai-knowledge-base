---
title: "Install .NET on Alpine"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-alpine.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install the .NET SDK or the .NET Runtime on Alpine

.NET is supported on Alpine and this article describes how to install .NET on Alpine. When an Alpine version falls out of support, .NET is no longer supported with that version.

If you're using Docker, consider using official .NET Docker images instead of installing .NET yourself.

> **Important:**
> .NET 10 was released on November 11, 2025. It may take time for the packages to appear in the package manager feeds or for your specific Linux distribution to include it.

Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see How to check that .NET is already installed.

## Supported distributions

The following table is a list of currently supported .NET releases and the versions of Alpine they're supported on. These versions remain supported until either the version of .NET reaches end-of-support or the version of Alpine reaches end-of-life.

| Alpine | Supported versions | Available in package manager |
|--------|--------------------|-------------------------------|
| 3.24   | 11, 10             | None                          |
| 3.23   | 11, 10             | 10, 9, 8                      |
| 3.22   | 10                 | 9, 8                          |
| 3.21   | 10                 | 9, 8                          |

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

# .NET 10

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo apk add dotnet10-sdk
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo apk add aspnetcore10-runtime
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore10-runtime` in the previous command with `dotnet10-runtime`:

```bash
sudo apk add dotnet10-runtime
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 9

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo apk add dotnet9-sdk
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo apk add aspnetcore9-runtime
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore9-runtime` in the previous command with `dotnet9-runtime`:

```bash
sudo apk add dotnet9-runtime
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 8

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo apk add dotnet8-sdk
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo apk add aspnetcore8-runtime
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore8-runtime` in the previous command with `dotnet8-runtime`:

```bash
sudo apk add dotnet8-runtime
```

To learn how to use the .NET CLI, see .NET CLI overview.

---

## Supported architectures

The following table is a list of currently supported .NET releases and the architecture of Alpine they're supported on. These versions remain supported until either the version of .NET reaches end-of-support or the architecture of Alpine is supported#. Note that only `x86_64`, `armv7`, `aarch64` is officially supported by Microsoft. Other architectures are supported by the distribution maintainers, and can be installed using the `apk` package manager, if a package is available for that architecture.

| Architecture | .NET 11          | .NET 10          |
|--------------|------------------|------------------|
| x86_64       | 3.23, 3.24       | 3.21, 3.22, 3.23, 3.24 |
| x86          | None             | None             |
| aarch64      | 3.23, 3.24       | 3.21, 3.22, 3.23, 3.24 |
| armv7        | 3.23, 3.24       | 3.21, 3.22, 3.23, 3.24 |
| armhf        | None             | None             |
| s390x        | None             | None             |
| ppc64le      | None             | None             |
| riscv64      | None             | None             |

## Install preview versions

Preview and release candidate versions of .NET aren't available in package repositories. You can install previews and release candidates of .NET in one of the following ways:

- Scripted install with _install-dotnet.sh_
- Manual binary extraction

## Remove preview versions

When using a package manager to manage your installation of .NET, you may run into a conflict if you've previously installed a preview release. The package manager may interpret the non-preview release as an earlier version of .NET. To install the non-preview release, first uninstall the preview versions. For more information about uninstalling .NET, see How to remove the .NET Runtime and SDK.

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

### 3.21+

- ca-certificates
- libgcc
- libssl3
- libstdc++
- zlib (.NET 8 only)
- icu-libs and icu-data-full (unless the .NET app is running in globalization-invariant mode)
- tzdata
- krb5

Use the `apk add` command to install the dependencies.

## Next steps

- .NET CLI overview
- How to enable TAB completion for the .NET CLI
- Tutorial: Create a console application with .NET
