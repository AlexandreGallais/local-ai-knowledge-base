---
title: ".NET and Ubuntu overview (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux-ubuntu-decision.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET on Ubuntu decision guide

This article helps you decide how install .NET on Ubuntu. Starting with Ubuntu 22.04, most supported versions of .NET are available in the built-in Ubuntu feed. The Ubuntu .NET backports package repository contains the remaining supported .NET versions.

Canonical has taken over publishing .NET on Ubuntu. Starting with Ubuntu 22.04, Microsoft no longer distributes .NET for Ubuntu to the Microsoft package repository.

## Supported distributions

The following table is a list of currently supported .NET releases and the versions of Ubuntu they're supported on. Each link goes to the specific Ubuntu version page with instructions on how to install .NET for that version of Ubuntu.

| Ubuntu                                                             | Supported .NET versions | Available inbuilt-in Ubuntu feed | Available in.NET backportsUbuntu feed | Available inMicrosoft feed |
|--------------------------------------------------------------------|-------------------------|--------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| 26.04 (LTS) | 11.0, 10.0              | 10.0                                 | 9.0, 8.0                                                                                               | None                                                                         |
| 25.10       | None                    | 10.0, 9.0, 8.0                       | None                                                                                                   | None                                                                         |
| 25.04       | None                    | 10.0, 9.0, 8.0                       | None                                                                                                   | None                                                                         |
| 24.04 (LTS) | 11.0, 10.0              | 10.0, 8.0                            | 9.0, 7.0, 6.0                                                                                          | None                                                                         |
| 22.04 (LTS) | 11.0, 10.0              | 8.0, 7.0, 6.0                        | 10.0, 9.0                                                                                              | 8.0, 7.0, 6.0, 3.1                                                           |

When an Ubuntu version reaches the end of its support period, .NET is no longer supported with that particular Ubuntu version.

Canonical supports .NET versions in the built-in Ubuntu feed for the lifetime of that Ubuntu version, even beyond the Microsoft-provided support lifetime and provides best-effort support for .NET versions in the .NET backports package repository, which does not extend beyond the Microsoft-provided support lifetime.

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

## Considerations when upgrading Ubuntu

Upgrading Ubuntu to 22.04 or later? Consider uninstalling .NET first.

If you used a package manager to install .NET from the Microsoft package repository, you'll end up with a package mix-up problem after upgrading Ubuntu. Now that Canonical publishes .NET to the package feeds for Ubuntu 22.04 (and later versions), the package manager won't know about the previously installed .NET version. The packages can't be upgraded to the latest .NET. First, uninstall them, then reinstall them from the Ubuntu package repository.

## Decide how to install .NET

When your version of Ubuntu supports .NET through the built-in or .NET backports Ubuntu feed, support for those builds of .NET is provided by Canonical and the builds might be optimized for different workloads. Microsoft provides support for packages in the Microsoft package repository feed.

> **Warning:**
> It's recommended that you choose between either Ubuntu or Microsoft feeds to source .NET packages. Don't mix .NET packages from multiple package repositories, as this leads to problems when apps try to resolve a specific version of .NET.

| Method | Pros | Cons |
|--------|------|------|
| Package manager(built-inUbuntu feed) | Usually the latest version is available.Patches are available right way.Dependencies are included.Easy removal.Available .NET versions are supported for the support period of the particular Ubuntu version.Support for the IBM System Z and Power platforms for .NET 8 and newer. | Not available for Ubuntu 16.04, 18.04, 20.04..NET versions available vary by Ubuntu version.Preview releases aren't available. |
| Package manager(.NET backportsUbuntu feed) | Contains any supported version, which is not contained in the built-in Ubuntu feed.Patches are available right way.Dependencies are included.Easy removal.Compatible with built-in Ubuntu feed. | Not available for Ubuntu 16.04, 18.04, 20.04.Requires registering the Ubuntu .NET backports package repository.Preview releases aren't available. |
| Package manager(Microsoft feed) | Supported versions always available.Patches are available right way.Dependencies are included.Easy removal. | Not available for Ubuntu 24.04+.Requires registering the Microsoft package repository.Preview releases aren't available.Only supports x64 Ubuntu. |
| Script \ Manual extraction | Control where .NET is installed.Preview releases are available. | Manually install updates.Manually install dependencies.Manual removal. |

Use the following sections to determine how you should install .NET:

- I'm using Ubuntu 22.04 or later, and I only need .NET
- I'm using a version of Ubuntu prior to 22.04
- I'm using other Microsoft packages, such as `powershell`, `mdatp`, or `mssql`
- I want to create a .NET app
- I want to run a .NET app in a container, cloud, or continuous-integration scenario
- My Ubuntu distribution doesn't include the .NET version I want, or I need an out-of-support .NET version
- I want to install a preview version
- I don't want to use APT
- I'm using an Arm-based CPU
- I'm using the IBM System Z or Power platform

### I'm using Ubuntu 22.04 or later, and I only need .NET

If you don't need other Microsoft packages, such as `powershell`, `mdatp`, or `mssql`, install .NET through the Ubuntu feed. For more information, see the following pages:

- Install .NET on Ubuntu 26.04.
- Install .NET on Ubuntu 25.10.
- Install .NET on Ubuntu 25.04.
- Install .NET on Ubuntu 24.04.
- Install .NET on Ubuntu 22.04.

> **Important:**
> If you're using .NET 8 SDK and Ubuntu 22.04, understand that SDK versions offered by Canonical are always in the .1xx feature band. If you want to use a newer feature band release, use the Microsoft feed to install the SDK. Make sure you review the information in the .NET package mix ups on Linux article to understand the implications of switching between repository feeds.

If you're going to install the Microsoft repository to use other Microsoft packages, such as `powershell`, `mdatp`, or `mssql`, you need to deprioritize the .NET packages provided by the Microsoft repository. For instructions on how to deprioritize the packages, see My Linux distribution provides .NET packages, and I want to use them.

### I'm using a version of Ubuntu prior to 22.04

Use the instructions in the version-specific section of Install .NET SDK or .NET Runtime on Ubuntu.

Review the Supported distributions section for more information about what versions of .NET are supported for your version of Ubuntu. If you're installing a version that isn't supported, see Register the Microsoft package repository.

### I'm using other Microsoft packages, such as `powershell`, `mdatp`, or `mssql`

If your Ubuntu version supports .NET through an Ubuntu feeds, you must decide which feed should install .NET. The Supported distributions section provides a table that lists which versions of .NET are available in the package feeds.

If you want to source the .NET packages from an Ubuntu feed, you need to deprioritize the .NET packages provided by the Microsoft repository. For instructions on how to deprioritize the packages, see My Linux distribution provides .NET packages, and I want to use them.

### I want to create a .NET app

Use the same package sources for the SDK as you use for the runtime. It is recommended that you install .NET through an Ubuntu feed. If, however you want to install .NET from another source (for example, the Microsoft package repository to access higher SDK feature bands), you should uninstall .NET, configure your package manager to ignore .NET packages from the Ubuntu feed and reinstall it from the other source.

Review the other suggestions in the Decide how to install .NET section.

### I want to run a .NET app in a container, cloud, or continuous-integration scenario

If your Ubuntu version provides the .NET version you require, install it from an Ubuntu feed. Otherwise, register the Microsoft package repository and install .NET from that repository. Review the information in the Supported distributions section.

If the version of .NET you want isn't available, try using the dotnet-install script.

### My Ubuntu distribution doesn't include the .NET version I want, or I need an out-of-support .NET version

We recommend you use APT and the Microsoft package repository. For more information, see the Register and install with the Microsoft package repository section.

### I want to install a preview version

Use one of the following ways to install .NET:

- Install .NET with `install-dotnet` script.
- Manually install .NET

### I don't want to use APT

If you want an automated installation, use the Linux installation script.

If you want full control over the .NET installation experience, download a tarball and manually install .NET. For more information, see Manual install.

### I'm using an Arm-based CPU

If your Ubuntu version provides the .NET version you require, install it from the built-in feed. Review the information in the Supported distributions section.

If the version of .NET you want isn't available, try using one of the following ways to install .NET:

- Install .NET with `install-dotnet` script.
- Manually install .NET

### I'm using the IBM System Z or Power platform

Starting with .NET 8 on Ubuntu 22.04, Canonical supports .NET for the IBM System Z and Power platforms. This support will continue for every .NET release going forward.

Install .NET through the built-in Ubuntu feed. For more information, see the following page:

- Install .NET 10 on Ubuntu 26.04.
