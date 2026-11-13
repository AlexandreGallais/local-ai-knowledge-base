---
title: "Install .NET on Debian (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/install/linux-debian.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install .NET on Debian (part 2 of 2)

## Troubleshooting

This section provides information on common errors you might get while using APT to install .NET.

### Unable to find package

> **Important:**
> The **Microsoft package feed** publishes packages for different architectures depending on the .NET version:
>
> - **.NET 10**: **x64** and **Arm64** packages only.
> - **.NET 9**: **x64** packages only.
> - **.NET 8**: **x64** packages only.
>
> If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - Use the `install-dotnet` script to install .NET.
> - Manually install .NET.

### Unable to locate \\ Some packages could not be installed

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

If you're using Debian 12 or later, try the following commands:

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

If you're using a Debian version older than 12, try the following commands:

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

### Failed to fetch

While installing the .NET package, you may see an error similar to `Failed to fetch ... File has unexpected size ... Mirror sync in progress?`. This error could mean that the package feed for .NET is being upgraded with newer package versions, and that you should try again later. During an upgrade, the package feed shouldn't be unavailable for more than 30 minutes. If you continually receive this error for more than 30 minutes, please file an issue at <https://github.com/dotnet/core/issues>.

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

### 13.x

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu76
- libssl3t64
- libstdc++6
- tzdata
- zlib1g (required for .NET 8 only)

### 12.x

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu72
- libssl3
- libstdc++6
- tzdata
- zlib1g (required for .NET 8 only)

### Other notes

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `libc6` library:

```bash
sudo apt install libc6
```

## Next steps

- .NET CLI overview
- How to enable TAB completion for the .NET CLI
- Tutorial: Create a console application with .NET
