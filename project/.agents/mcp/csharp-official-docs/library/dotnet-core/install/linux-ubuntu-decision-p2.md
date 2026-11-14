---
title: ".NET and Ubuntu overview (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-ubuntu-decision.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET and Ubuntu overview (part 2 of 2)

## Register a package repository

Depending on your version of Ubuntu, you might need to register either the Ubuntu backports or the Microsoft package repository.

> **Important:**
> Make sure you consider the information in the Decide how to install .NET section.

- Register the Ubuntu .NET backports package repository
- Register the Microsoft package repository

### Ubuntu .NET backports package repository

The Ubuntu .NET backports package repository provides versions of .NET that aren't available in the built-in Ubuntu feed. Canonical maintains the packages contained in this package repository and provides best-effort support, which does not extend beyond the Microsoft-provided support lifetime or the support period of the particular Ubuntu version.

This package repository is supported on Ubuntu 26.04 LTS (Resolute Raccoon), Ubuntu 24.04 LTS (Noble Numbat), and Ubuntu 22.04 LTS (Jammy Jellyfish). The Supported distributions section provides a table that lists which versions of .NET are available in the package feed. For more information, see Ubuntu .NET backports package repository.

To add this package repository, run the following commands:

```bash
sudo add-apt-repository ppa:dotnet/backports
sudo apt update
```

#### Register the Ubuntu .NET backports package repository

Open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```

> **Note:**
> The Ubuntu .NET backports package repository is compatible with the built-in Ubuntu feed. Therefore you do not need to configure your package manager to ignore .NET packages in the built-in Ubuntu feed.

#### Unregister the Ubuntu .NET backports package repository

If you no longer want to consume packages from the Ubuntu .NET backports package repository you can unregister it. Open a terminal and run the following command:

```bash
sudo add-apt-repository --remove ppa:dotnet/backports
```

> **Important:**
> Unregistering the Ubuntu .NET backports package repository does not uninstall any packages.

#### add-apt-repository command not found

The `add-apt-repository(1)` utility is pre-installed on most Ubuntu installations.

If you receive an error message that the `add-apt-repository` command was not found, you have to install the `software-properties-common` package, which provides this command. Open a terminal and run the following commands:

```bash
sudo apt update
sudo apt install software-properties-common
```

### Register the Microsoft package repository

> **Important:**
> This only applies to Ubuntu versions prior to 24.04. Starting with Ubuntu 24.04, Microsoft no longer publishes packages to the Microsoft package repository. Use the  supported distributions table to determine the best way to install .NET.

The Microsoft package repository contains all versions of .NET that were previously, or are currently, supported with your version of Ubuntu. If your version of Ubuntu provides .NET packages, you'll need to deprioritize the Ubuntu packages and use the Microsoft repository. For instructions on how to deprioritize the packages, see I need a version of .NET that isn't provided by my Linux distribution.

> **Important:**
> The Microsoft package repository only supports .NET packages that target the **x64** architecture. Other architectures, such as **Arm**, must install .NET by some other means, such as with the installer script or by manual installation.

Preview releases are **not** available in the Microsoft package repository. For more information, see Install preview versions.

> **Caution:**
> We recommend that you only use one repository to manage all of your .NET installs. If you've previously installed .NET with the Ubuntu repository, you must clean the system of .NET packages and configure APT to ignore the Ubuntu feeds. For more information about how to do this, see I need a version of .NET that isn't provided by my Linux distribution.

Installing with APT can be done with a few commands. Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the package repository.

Open a terminal and run the following commands:

```bash
# Get OS version info which adds the $ID and $VERSION_ID variables
source /etc/os-release

# Download Microsoft signing key and repository
wget https://packages.microsoft.com/config/$ID/$VERSION_ID/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

# Install Microsoft signing key and repository
sudo dpkg -i packages-microsoft-prod.deb

# Clean up
rm packages-microsoft-prod.deb

# Update packages
sudo apt update
```

> **Tip:**
> The previous script was written for Ubuntu and might not work if you're using a derived distribution, such as Linux Mint. It's likely that the `$ID` and `$VERSION_ID` variables won't be assigned the correct values, making the URI for the `wget` command invalid. The `$ID` corresponds to the distribution (for example, `ubuntu`), while `$VERSION_ID` maps to the specific version of Ubuntu you want to get packages for, such as 22.04 or 23.10.
>
> For example, on Ubuntu 22.04 `$ID` would be `ubuntu` and `$VERSION_ID` would be `22.04`. The URL would look like:
> `https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb`.
>
> You can use a web browser and navigate to <https://packages.microsoft.com/config/ubuntu/> to see which versions of Ubuntu are available to use as the `$repo_version` value.

## Install, uninstall, or update .NET

The following sections describe how to manage .NET through the package manager.

### Install .NET

Install .NET through the package manager with the `sudo apt install <package-name>` command. Replace `<package-name>` with the name of the .NET package you want to install. For example, to install .NET SDK 10.0, use the command `sudo apt install dotnet-sdk-10.0`. The following table lists the currently supported .NET packages (which might vary by your Ubuntu version):

|| Product      | Type    | Package                    |
|---------|--------------|---------|----------------------------|
| **10.0**   | ASP.NET Core | Runtime | `aspnetcore-runtime-10.0` |
| **10.0**   | .NET         | Runtime | `dotnet-runtime-10.0`     |
| **10.0**   | .NET         | SDK     | `dotnet-sdk-10.0`         |
| **9.0**    | ASP.NET Core | Runtime | `aspnetcore-runtime-9.0`  |
| **9.0**    | .NET         | Runtime | `dotnet-runtime-9.0`      |
| **9.0**    | .NET         | SDK     | `dotnet-sdk-9.0`          |
| **8.0**    | ASP.NET Core | Runtime | `aspnetcore-runtime-8.0`  |
| **8.0**    | .NET         | Runtime | `dotnet-runtime-8.0`      |
| **8.0**    | .NET         | SDK     | `dotnet-sdk-8.0`          |

> **Tip:**
> If you're not creating .NET apps, install the ASP.NET Core runtime as it includes the .NET runtime and also supports ASP.NET Core apps.

Some environment variables affect how .NET is run after it's installed. For more information, see .NET SDK and CLI environment variables.

### Uninstall .NET

If you installed .NET through a package manager, uninstall in the same way with the `apt-get remove` command:

```bash
sudo apt-get remove dotnet-sdk-6.0
```

For more information, see Uninstall .NET.

### Update .NET

If you installed .NET through a package manager, you can upgrade the package with the `apt upgrade` command. For example, the following commands upgrade the `dotnet-sdk-10.0` package with the latest version:

```bash
sudo apt update
sudo apt upgrade dotnet-sdk-10.0
```

> **Tip:**
> If you've upgraded your Linux distribution since installing .NET, you may need to reconfigure the Microsoft package repository. Run the installation instructions for your current distribution version to upgrade to the appropriate package repository for .NET updates.

## Manage preview versions

The following sections describe how to install and uninstall preview releases of .NET.

### Install preview versions

Preview and release candidate versions of .NET aren't available in package repositories. You can install previews and release candidates of .NET in one of the following ways:

- Scripted install with _install-dotnet.sh_
- Manual binary extraction

### Remove preview versions

When using a package manager to manage your installation of .NET, you may run into a conflict if you've previously installed a preview release. The package manager may interpret the non-preview release as an earlier version of .NET. To install the non-preview release, first uninstall the preview versions. For more information about uninstalling .NET, see How to remove the .NET Runtime and SDK.

## Troubleshooting

Starting with Ubuntu 22.04, you might run into a situation where it seems only a piece of .NET is available. For example, you've installed the runtime and the SDK, but when you run `dotnet --info` only the runtime is listed. This situation can be related to using two different package sources. The built-in Ubuntu 22.04 and Ubuntu 22.10 package feeds include some versions of .NET, but not all, and you might have also installed .NET from the Microsoft feeds. For more information about how to fix this problem, see Troubleshoot .NET errors related to missing files on Linux.

### APT problems

This section provides information on common errors you might get while using APT to install .NET.

#### Unable to find package

> **Important:**
> Using a package manager to install .NET from the **Microsoft package feed** only supports the **x64** architecture. Other architectures, such as **Arm64**, aren't supported by the **Microsoft package feed**. Use the Ubuntu feeds or manually install .NET. Be cautious of package mix up problems when using multiple feeds. For more information, see .NET package mix ups on Linux.

For more information on installing .NET **without a package manager**, see one of the following articles:

- Use the `install-dotnet` script to install .NET.
- Manually install .NET.

#### Unable to locate \\ Some packages could not be installed

> **Note:**
> This information only applies when .NET is installed from the Microsoft package feed.

If you receive an error message similar to **Unable to locate package {dotnet-package}** or **Some packages could not be installed**, run the following commands.

There are two placeholders in the following set of commands.

- `{dotnet-package}`\
This represents the .NET package you're installing, such as `aspnetcore-runtime-8.0`. This is used in the following `sudo apt-get install` command.

First, try purging the package list:

```bash
sudo dpkg --purge packages-microsoft-prod && sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
```

Then, try to install .NET again. If that doesn't work, you can run a manual install with the following commands:

If you're using Ubuntu 23.10 or later, try the following commands:

```bash
# Get OS version info which adds the $ID and $VERSION_ID variables
source /etc/os-release

# Download the Microsoft keys
sudo apt-get install -y gpg wget
wget https://packages.microsoft.com/keys/microsoft.asc
cat microsoft.asc | gpg --dearmor -o microsoft.asc.gpg

# Add the Microsoft repository to the system's sources list
wget https://packages.microsoft.com/config/$ID/$VERSION_ID/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list

# Move the key to the appropriate place
sudo mv microsoft.asc.gpg $(cat /etc/apt/sources.list.d/microsoft-prod.list | grep -oP "(?<=signed-by=).*(?=\])")

# Update packages and install .NET
sudo apt-get update && \
  sudo apt-get install -y {dotnet-package}
```

> **Note:**
> If you're using a derived distribution, such as Linux Mint, the `$ID` and `$VERSION_ID` variables from `/etc/os-release` might not match any directory on the Microsoft packages server, causing a 404 error. To resolve the error, check which Ubuntu or Debian version your distribution is based on and use those values instead. For example, Linux Mint 22 is based on Ubuntu 24.04, so use `ubuntu` for `$ID` and `24.04` for `$VERSION_ID`.

If you're using an Ubuntu version prior to 23.10, try the following commands:

```bash
# Define the OS version, name, and codename
source /etc/os-release

# Download the Microsoft keys
sudo apt-get install -y gpg wget
wget https://packages.microsoft.com/keys/microsoft.asc
cat microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
sudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/

# Add the Microsoft repository to the system's sources list
wget https://packages.microsoft.com/config/$ID/$VERSION_ID/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list

# Set ownership
sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list

# Update packages and install .NET
sudo apt-get update && \
  sudo apt-get install -y {dotnet-package}
```

> **Note:**
> If you're using a derived distribution, such as Linux Mint, the `$ID` and `$VERSION_ID` variables from `/etc/os-release` might not match any directory on the Microsoft packages server, causing a 404 error. To resolve the error, check which Ubuntu or Debian version your distribution is based on and use those values instead. For example, Linux Mint 22 is based on Ubuntu 24.04, so use `ubuntu` for `$ID` and `24.04` for `$VERSION_ID`.

#### Failed to fetch

While installing the .NET package, you may see an error similar to `Failed to fetch ... File has unexpected size ... Mirror sync in progress?`. This error could mean that the package feed for .NET is being upgraded with newer package versions, and that you should try again later. During an upgrade, the package feed shouldn't be unavailable for more than 30 minutes. If you continually receive this error for more than 30 minutes, please file an issue at <https://github.com/dotnet/core/issues>.

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you must install these dependencies to run your app:

- ca-certificates
- libc6
- libgcc1 (for 16.x and 18.x)
- libgcc-s1 (for 20.x or later)
- libgssapi-krb5-2
- libicu55 (for 16.x)
- libicu60 (for 18.x)
- libicu66 (for 20.x)
- libicu70 (for 22.04)
- libicu72 (for 23.10)
- libicu74 (for 24.04)
- libicu76 (for 25.04 and 25.10)
- libicu78 (for 26.04 or later)
- libssl1.0.0 (for 16.x)
- libssl1.1 (for 18.x, 20.x)
- libssl3 (for 22.x or later)
- libstdc++6
- tzdata
- zlib1g

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```

## Next steps

- .NET CLI overview
- How to enable Tab completion for the .NET CLI
- Tutorial: Create a console application with .NET
