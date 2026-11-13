---
title: "Breaking change: DriveInfo.DriveFormat returns Linux filesystem types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/driveinfo-driveformat-linux.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DriveInfo.DriveFormat returns Linux filesystem types

On Linux systems, `System.IO.DriveInfo.DriveFormat` now returns Linux kernel filesystem type strings. These strings represent a more granular representation of the filesystem type than the previous implementation. For example, it's now possible to distinguish between `ext3` and `ext4`.

## Previous behavior

Previously, .NET returned a string representation by mapping magic constants to strings. Because several different filesystem types use the same magic constants, it wasn't possible to distinguish between them.

For cgroup file systems, `DriveFormat` returned `cgroupfs`/`cgroup2fs`. For the SELinux filesystem, the value was `selinux`.

## New behavior

Starting in .NET 10, .NET returns the string representation used by the Linux kernel for the filesystem type.

For cgroup file systems, `DriveFormat` returns `cgroup`/`cgroup2`. For the SELinux filesystem, the value is `selinuxfs`.

## Version introduced

.NET 10

## Type of breaking change

This change is a behavioral change.

## Reason for change

Provide more granular filesystem type information.

## Recommended action

Check and update usages of `System.IO.DriveInfo.DriveFormat` to include the Linux filesystem type strings. On a Linux system, you can read the type strings of the drives from the `/proc/self/mountinfo` file. On each line, the filesystem type string is the first field after the `-` separator.

## Affected APIs

- `System.IO.DriveInfo.DriveFormat`
