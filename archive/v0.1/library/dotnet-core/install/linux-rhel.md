---
title: "Install .NET on RHEL and CentOS Stream"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/linux-rhel.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install the .NET SDK or the .NET Runtime on RHEL and CentOS Stream

.NET is supported on Red Hat Enterprise Linux (RHEL). This article describes how to install .NET on RHEL and CentOS Stream.

Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see How to check that .NET is already installed.

## Register your Red Hat subscription

To install .NET from Red Hat on RHEL, you first need to register using the Red Hat Subscription Manager. If this hasn't been done on your system, or if you're unsure, see the Red Hat Product Documentation for .NET.

> **Important:**
> The previous statement doesn't apply to CentOS Stream.

## Supported distributions

The following table is a list of currently supported .NET releases on both RHEL and CentOS Stream. These versions remain supported until either the version of .NET reaches end-of-support or the Linux distribution is no longer supported.

| Distribution                          | .NET   |
|---------------------------------------|--------|
| RHEL 10                   | 11, 10 |
| RHEL 9                     | 11, 10 |
| RHEL 8                     | 11, 10 |
| CentOS Stream 10 | 11, 10 |
| CentOS Stream 9   | 11, 10 |

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

## Install preview versions

Preview and release candidate versions of .NET aren't available in package repositories. You can install previews and release candidates of .NET in one of the following ways:

- Scripted install with _install-dotnet.sh_
- Manual binary extraction

## Remove preview versions

When using a package manager to manage your installation of .NET, you may run into a conflict if you've previously installed a preview release. The package manager may interpret the non-preview release as an earlier version of .NET. To install the non-preview release, first uninstall the preview versions. For more information about uninstalling .NET, see How to remove the .NET Runtime and SDK.

## RHEL 10

.NET is included in the AppStream repositories for RHEL 10.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo dnf install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo dnf install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo dnf install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

## RHEL 9

.NET is included in the AppStream repositories for RHEL 9.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo dnf install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo dnf install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo dnf install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

## RHEL 8

.NET is included in the AppStream repositories for RHEL 8.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo dnf install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo dnf install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo dnf install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

## CentOS Stream 10

.NET is included in the AppStream repositories for CentOS Stream 10.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo dnf install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo dnf install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo dnf install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

## CentOS Stream 9

.NET is included in the AppStream repositories for CentOS Stream 9.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo dnf install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo dnf install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo dnf install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

## Where is CentOS Linux

.NET is no longer supported on CentOS Linux. As of June 30th, 2024, CentOS Linux reached end-of-life. For more information, see End dates are coming for CentOS Stream 8 and CentOS Linux 7.

## Dependencies

The following libraries are required for .NET to run on RHEL and CentOS Stream. Install them using the `dnf` package manager:

- glibc
- libgcc
- ca-certificates
- openssl-libs
- libstdc++
- libicu
- tzdata
- krb5-libs
- zlib (required for .NET 8 only)

For example, to install all dependencies:

```bash
sudo dnf install glibc libgcc ca-certificates openssl-libs libstdc++ libicu tzdata krb5-libs
```

For .NET 8, also install:

```bash
sudo dnf install zlib
```

## How to install other versions

Consult the Red Hat documentation for .NET on the steps required to install other releases of .NET.

## Troubleshoot the package manager

This section provides information on common errors you may get while using the package manager to install .NET or .NET Core.

### Errors related to missing `fxr`, `libhostfxr.so`, or `FrameworkList.xml`

For more information about solving these problems, see Troubleshoot `fxr`, `libhostfxr.so`, and `FrameworkList.xml` errors.

## Next steps

- .NET CLI overview
- How to enable TAB completion for the .NET CLI
- Tutorial: Create a console application with .NET
