---
title: "linux-install-100-zyp"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/includes/linux-install-100-zyp.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# linux-install-100-zyp

### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo zypper install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo zypper install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo zypper install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see .NET CLI overview.
