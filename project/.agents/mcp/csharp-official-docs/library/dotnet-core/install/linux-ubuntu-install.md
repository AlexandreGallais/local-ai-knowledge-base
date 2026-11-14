---
title: "Install .NET on Ubuntu (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-ubuntu-install.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET SDK or .NET Runtime on Ubuntu

This article discusses how to install .NET on Ubuntu.

Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see How to check that .NET is already installed.

> **Important:**
> Using a package manager to install .NET from the **Microsoft package feed** only supports the **x64** architecture. Other architectures, such as **Arm64**, aren't supported by the **Microsoft package feed**. Use the Ubuntu feeds or manually install .NET. Be cautious of package mix up problems when using multiple feeds. For more information, see .NET package mix ups on Linux.

For more information on installing .NET **without a package manager**, see one of the following articles:

- Use the `install-dotnet` script to install .NET.
- Manually install .NET.

**os-linux-ubuntu-2604:**

## Ubuntu 26.04

.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.

The following versions of .NET are supported or available for Ubuntu 26.04:

| Supported .NET versions | Available inbuilt-in Ubuntu feed | Available inbackportsUbuntu feed | Available inMicrosoft feed |
|-------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 11.0, 10.0              | 10.0                                 | 9.0, 8.0                                                                                            |None                                                                                         |

When an Ubuntu version falls out of support, .NET is no longer supported with that version.

# .NET 10

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

.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```

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

.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```

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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libbrotli1
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu78
- libssl3t64
- libstdc++6
- tzdata
- zlib1g

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```

**os-linux-ubuntu-2510:**

## Ubuntu 25.10

.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.

The following versions of .NET are supported or available for Ubuntu 25.10:

| Supported .NET versions | Available inbuilt-in Ubuntu feed | Available inbackportsUbuntu feed | Available inMicrosoft feed |
|-------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| None                    | 10.0, 9.0, 8.0                       | None                                                                                                |None                                                                                         |

When an Ubuntu version falls out of support, .NET is no longer supported with that version.

# .NET 10

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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu76
- libssl3t64
- libstdc++6
- tzdata
- zlib1g

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```

**os-linux-ubuntu-2504:**
