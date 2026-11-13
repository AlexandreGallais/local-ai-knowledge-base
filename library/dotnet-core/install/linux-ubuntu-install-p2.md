---
title: "Install .NET on Ubuntu (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/linux-ubuntu-install.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install .NET on Ubuntu (part 2 of 3)

## Ubuntu 25.04

.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.

The following versions of .NET are supported or available for Ubuntu 25.04:

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

**os-linux-ubuntu-2404:**

## Ubuntu 24.04

.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.

The following versions of .NET are supported or available for Ubuntu 24.04:

| Supported .NET versions | Available inbuilt-in Ubuntu feed | Available inbackportsUbuntu feed | Available inMicrosoft feed |
|-------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 11.0, 10.0              | 10.0, 8.0                            | 9.0, 7.0, 6.0                                                                                       |None                                                                                         |

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
- libicu74
- libssl3t64
- libstdc++6
- tzdata
- zlib1g

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```

**os-linux-ubuntu-2204:**

## Ubuntu 22.04

.NET is available in the Ubuntu package manager feeds, as well as the Microsoft package repository. However, you should only use one or the other to install .NET. Microsoft recommends that you use the Ubuntu package manager feeds. If you want to use the Microsoft package repository, see How to register the Microsoft package repository.

The following versions of .NET are supported or available for Ubuntu 22.04:

| Supported .NET versions | Available inbuilt-in Ubuntu feed | Available in.NET backportsUbuntu feed | Available inMicrosoft feed |
|-------------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 11.0, 10.0              | 8.0, 7.0, 6.0                        | 10.0, 9.0                                                                                                | 8.0, 7.0, 6.0, 3.1                |

> **Important:**
> If you're using .NET 8 SDK and Ubuntu 22.04, understand that SDK versions offered by Canonical are always in the .1xx feature band. If you want to use a newer feature band release, use the Microsoft feed to install the SDK. Make sure you review the information in the .NET package mix ups on Linux article to understand the implications of switching between repository feeds.

When an Ubuntu version falls out of support, .NET is no longer supported with that version.

# .NET 10

.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```

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
