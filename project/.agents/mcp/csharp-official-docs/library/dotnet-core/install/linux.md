---
title: "Install .NET on Linux distributions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/linux.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Install .NET on Linux

>
> - Install on Windows
> - Install on macOS
> - Install on Linux

This article describes how .NET is available on various Linux distributions. .NET can be installed by a package manager, snap, or manually. .NET is also available as a container image.

## Packages

Packages are published in the Microsoft package repository at <https://packages.microsoft.com/> and are available for the following Linux distributions:

- Azure Linux
- Debian
- openSUSE Leap
- SUSE Enterprise Linux

> **Note:**
> Distributions are selected per the policy defined at dotnet/core \#9556.

The following Linux distributions publish their own .NET packages:

- Alpine
- CentOS Stream
- Fedora
- Red Hat Enterprise Linux (RHEL)
- Ubuntu

## Snap

.NET SDK snap packages are provided by and maintained by Canonical. Snaps are a great alternative to the package manager built into your Linux distribution.

- Install .NET Runtime with Snap
- Install .NET SDK with Snap

## Manual installation

You can install .NET manually in the following ways:

- Manual install
- Scripted install

You might need to install .NET dependencies if you install .NET manually.

For user-level installations, dotnetup can track and update .NET SDKs and runtimes.

## Additional sources

.NET is also available from other sources. The packages and containers use a name similar to one of the following names:

- aspnet-runtime
- dotnet-runtime
- dotnet-sdk
- dotnet

### Package managers

- <https://formulae.brew.sh/cask/dotnet-sdk>
- <https://ports.macports.org/port/dotnet-cli>
- <https://search.nixos.org/packages?query=dotnet>
- <https://archlinux.org>
- <https://aur.archlinux.org>

### Containers

- <https://containers.dev/features>
- <https://images.chainguard.dev>
