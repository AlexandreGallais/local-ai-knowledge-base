---
title: "Install .NET on Debian (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-debian.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install the .NET SDK or the .NET Runtime on Debian

This article describes how to install .NET on Debian. When a Debian version falls out of support, .NET is no longer supported with that version. However, these instructions might help you to get .NET running on those versions, even though it isn't supported.

Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see How to check that .NET is already installed.

## Supported distributions

The following table is a list of currently supported .NET releases and the versions of Debian they're supported on. These versions remain supported until either the version of .NET reaches end-of-support or the version of Debian reaches end-of-life.

| Debian | .NET     |
|--------|----------|
| 13     | 11, 10   |
| 12     | 10       |

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

## Debian 13

Installing with APT can be done with a few commands. Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the package repository.

Open a terminal and run the following commands:

```bash
wget https://packages.microsoft.com/config/debian/13/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

# .NET 10

> **Important:**
> The **Microsoft package feed** only publishes **x64** and **Arm64** packages for .NET 10. If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo apt-get install -y dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 9

> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-9.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-9.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-9.0` in the previous command with `dotnet-runtime-9.0`:

```bash
sudo apt-get install -y dotnet-runtime-9.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 8

> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-8.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-8.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-8.0` in the previous command with `dotnet-runtime-8.0`:

```bash
sudo apt-get install -y dotnet-runtime-8.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

---

## Debian 12

Installing with APT can be done with a few commands. Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the package repository.

Open a terminal and run the following commands:

```bash
wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

# .NET 10

> **Important:**
> The **Microsoft package feed** only publishes **x64** and **Arm64** packages for .NET 10. If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo apt-get install -y dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 9

> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-9.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-9.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-9.0` in the previous command with `dotnet-runtime-9.0`:

```bash
sudo apt-get install -y dotnet-runtime-9.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

# .NET 8

> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-8.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-8.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-8.0` in the previous command with `dotnet-runtime-8.0`:

```bash
sudo apt-get install -y dotnet-runtime-8.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

---

## Use APT to update .NET

When a new patch release is available for .NET, you can upgrade it through APT with the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
```

If you upgraded your Linux distribution since installing .NET, you might need to reconfigure the Microsoft package repository. Run the installation instructions for your current distribution version to upgrade to the appropriate package repository for .NET updates.
