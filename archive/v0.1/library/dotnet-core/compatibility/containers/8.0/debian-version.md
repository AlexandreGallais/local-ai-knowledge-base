---
title: "Breaking change: Debian container images upgraded to Debian 12"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/containers/8.0/debian-version.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Debian container images upgraded to Debian 12

The default Linux distro for .NET container images is Debian. In .NET 8, the Debian version has been upgraded to Debian 12 (Bookworm). As a result of upgraded package versions, this new version of Debian may have changes in it that break your application. The most notable change is the upgrade of Open SSL from 1.1 to 3.0.

## Previous behavior

In .NET 6 and 7, the default Debian version was Debian 11 (Bullseye).

Notable package versions:

- `libicu`: 67
- `libssl`: 1.1

## New behavior

In .NET 8, the default Debian version is Debian 12 (Bookworm).

Notable package versions:

- `libicu`: 72
- `libssl`: 3

## Version introduced

.NET 8 Preview 1

## Type of change

This change can affect binary compatibility and is also a behavioral change.

## Reason for change

According to the container support policy, with each version of .NET, the default version of Debian that's targeted is the latest stable version.

## Recommended action

If necessary, update your application to work with the newer package versions.

## Affected APIs

None.

## See also

- Debian release notes
