---
title: "Install .NET SDK on Linux with Snap"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-snap-sdk.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET SDK with Snap

This article describes how to install the .NET SDK snap package. .NET SDK snap packages are provided by and maintained by Canonical. Snaps are a great alternative to the package manager built into your Linux distribution.

A snap is a bundle of an app and its dependencies that works across many different Linux distributions. Snaps are discoverable and installable from the Snap Store. For more information about Snap, see Get started.

> **Important:**
> If you install .NET with Snap, use Snap to manage all your .NET installations. Avoid mixing Snap with other installation methods, such as a package manager or the scripted install, because mixing methods can cause conflicts.

> **Caution:**
> Snap installations of .NET may have problems running .NET tools. If you wish to use .NET tools, we recommend that you install .NET using the `dotnet-install` script or the package manager for the particular Linux distribution.
>
> It's a known issue that the `dotnet watch` command doesn't work when .NET is installed via Snap.
>
> If you're going to use .NET tools or the `dotnet watch` command, we recommend that you install .NET using the `dotnet-install` script.

## Prerequisites

- Linux distribution that supports snap.
- `snapd` the snap daemon.

Your Linux distribution might already include snap. Try running `snap` from a terminal to see if the command works. For a list of supported Linux distributions, and instructions on how to install snap, see Installing `snapd`.

## .NET releases

Microsoft publishes .NET under two different support policies, Long Term Support (LTS) and Standard Term Support (STS). The quality of all releases is the same. The only difference is the length of support. LTS releases get free support and patches for three years. STS releases get free support and patches for two years. For more information, see .NET Support Policy.

The versions of .NET that are currently supported by Microsoft are:

- 11.0 (STS)—Support ends **November 14, 2028**.
- 10.0 (LTS)—Support ends **November 14, 2028**.

Other entities that build and release .NET might introduce different support policies. Be sure to check with them to understand how .NET is supported.

## 1. Install the SDK

To install the .NET SDK, use version-specific snap package identifiers because this approach lets you install and manage multiple SDK versions side by side. For example, use `dotnet-sdk-80` for .NET 8 and `dotnet-sdk-100` for .NET 10. The SDK includes both the ASP.NET Core and .NET runtime, versioned to the SDK. This article uses the .NET 10 SDK snap package; if you're using a different package, substitute it.

> **Tip:**
> The Snapcraft .NET SDK package page (.NET 8, .NET 9, .NET 10) includes distribution-specific instructions on how to install Snapcraft and .NET.

01. Open a terminal.
01. Use `snap install` to install the .NET SDK snap package.

    The following command installs .NET SDK 10:

    ```bash
    sudo snap install dotnet-sdk-100
    ```

The following table lists the .NET SDK snap packages you can install:

| .NET version | Snap package     |
|--------------|------------------|
| 10 (LTS)     | `dotnet-sdk-100` |
| 9 (STS)      | `dotnet-sdk-90`  |
| 8 (LTS)      | `dotnet-sdk-80`  |

## 2. Map the dotnet command

Because Snap doesn't create an unversioned `dotnet` command, create a symbolic link to make `dotnet` available system-wide. Create this link only if you want to map the `dotnet` command to this specific Snap installation. If you already have .NET installed through another method and you create this link, it overwrites that mapping.

If `/usr/local/bin/dotnet` already exists, remove it before you create the link.

```bash
sudo ln -s /snap/dotnet-sdk-100/current/usr/bin/dotnet /usr/local/bin/dotnet
```

## 3. Export the install location

Configure the `DOTNET_ROOT` environment variable in your shell profile because tools use it to determine where .NET is installed. Snap installations don't set this variable automatically. The path uses the following format: `/snap/{package}/current/usr/lib/dotnet`.

```bash
export DOTNET_ROOT=/snap/dotnet-sdk-100/current/usr/lib/dotnet
```

Replace `100` with the SDK version you installed, such as `80` for .NET 8 or `90` for .NET 9.

### Export the environment variable permanently

The preceding `export` command only sets the environment variable for the terminal session in which it was run.

You can edit your shell profile to permanently add the commands. There are many different shells available for Linux and each has a different profile. For example:

- **Bash Shell**: _~/.bash_profile_, _~/.bashrc_
- **Korn Shell**: _~/.kshrc_ or _.profile_
- **Z Shell**: _~/.zshrc* or _.zprofile_

Edit the appropriate source file for your shell, add the export command for your installed .NET version, and save your changes.

For example: `export DOTNET_ROOT=/snap/dotnet-sdk-100/current/usr/lib/dotnet`.

## 4. Use the .NET CLI

Open a terminal and run the `dotnet` command.

```dotnetcli
dotnet
```

The following output is displayed:

```output
Usage: dotnet [options]
Usage: dotnet [path-to-application]

Options:
  -h|--help         Display help.
  --info            Display .NET information.
  --list-sdks       Display the installed SDKs.
  --list-runtimes   Display the installed runtimes.

path-to-application:
  The path to an application .dll file to execute.
```

To learn how to use the .NET CLI, see .NET CLI overview.

## Troubleshooting

- Can't install Snap on WSL2
- Can't resolve the dotnet command or SDK
- TLS/SSL Certificate errors

### Can't install Snap on WSL2

`systemd` must be enabled on the WSL2 instance before Snap can be installed.

01. Open `/etc/wsl.conf` in a text editor of your choice.
01. Paste in the following configuration:

    ```ini
    [boot]
    systemd=true
    ```

01. Save the file and restart the WSL2 instance through PowerShell. Use the `wsl.exe --shutdown` command.

### Can't resolve the dotnet command or SDK

It's common for other apps, such as a code IDE or an extension in Visual Studio Code, to try to resolve the location of the .NET SDK. Typically, discovery is done by checking the `DOTNET_ROOT` environment variable, or figuring out where the `dotnet` executable is located. A snap-installed .NET SDK might confuse these apps. When these apps can't resolve the .NET SDK, an error similar to one of the following messages is displayed:

- The SDK 'Microsoft.NET.Sdk' specified could not be found
- The SDK 'Microsoft.NET.Sdk.Web' specified could not be found
- The SDK 'Microsoft.NET.Sdk.Razor' specified could not be found

Try the following steps to fix the issue:

01. Complete 2. Map the dotnet command.
01. Set the `DOTNET_ROOT` environment variable permanently by following Export the environment variable permanently.

### TLS/SSL Certificate errors

When .NET is installed through Snap, it's possible that on some distributions the .NET TLS/SSL certificates might not be found and you might receive an error during `restore`:

```bash
Processing post-creation actions...
Running 'dotnet restore' on /home/myhome/test/test.csproj...
  Restoring packages for /home/myhome/test/test.csproj...
/snap/dotnet-sdk/27/sdk/2.2.103/NuGet.targets(114,5): error : Unable to load the service index for source https://api.nuget.org/v3/index.json. [/home/myhome/test/test.csproj]
/snap/dotnet-sdk/27/sdk/2.2.103/NuGet.targets(114,5): error :   The SSL connection could not be established, see inner exception. [/home/myhome/test/test.csproj]
/snap/dotnet-sdk/27/sdk/2.2.103/NuGet.targets(114,5): error :   The remote certificate is invalid according to the validation procedure. [/home/myhome/test/test.csproj]
```

To resolve this problem, set a few environment variables:

```bash
export SSL_CERT_FILE=[path-to-certificate-file]
export SSL_CERT_DIR=/dev/null
```

The certificate location varies by distribution. Here are the locations for the distributions where the issue has been observed:

| Distribution | Location                                            |
|--------------|-----------------------------------------------------|
| **Fedora**   | `/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem` |
| **OpenSUSE** | `/etc/ssl/ca-bundle.pem`                            |
| **Solus**    | `/etc/ssl/certs/ca-certificates.crt`                |

## Related content

- .NET CLI overview
- How to enable TAB completion for the .NET CLI.
- Tutorial: Create a console application with .NET
