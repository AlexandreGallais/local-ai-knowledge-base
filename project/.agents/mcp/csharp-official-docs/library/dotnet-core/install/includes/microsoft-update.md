---
title: "microsoft-update"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/install/includes/microsoft-update.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# microsoft-update

The .NET installer executables are independent products that can be serviced using Microsoft Update (MU) on Windows. MU is different to Windows Update (WU), which is used to service operating system components like .NET Framework.

Both security and non-security fixes for supported versions of .NET are provided through MU using multiple distribution channels. Automatic Updates (AU) is relevant to end users and consumers, while Window Server Update Services (WSUS) and Windows Update Catalog are relevant to IT administrators.

The .NET installer executables support side-by-side (SxS) installations across major and minor releases for different architectures and components, such as the runtime and SDK. For example, you can install both the 6.0.15 (x64) and 6.0.17 (x86) runtime. When MU triggers, it will offer the latest installer for both installations.

#### Block updates

While most users prefer to be kept up to date, it is possible to block .NET updates using the registry keys in the following table.

| .NET version | Registry key | Name | Type | Value |
| -------------- | :--------- | :---------- | :---------- | :---------- |
| All | HKLM\SOFTWARE\Microsoft\\.NET | BlockMU | REG_DWORD | 0x00000001 |
| .NET 10 | HKLM\SOFTWARE\Microsoft\\.NET\10.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 9 | HKLM\SOFTWARE\Microsoft\\.NET\9.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 8 | HKLM\SOFTWARE\Microsoft\\.NET\8.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 7 | HKLM\SOFTWARE\Microsoft\\.NET\7.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 6 | HKLM\SOFTWARE\Microsoft\\.NET\6.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET 5 | HKLM\SOFTWARE\Microsoft\\.NET\5.0 | BlockMU | REG_DWORD | 0x00000001 |
| .NET Core 3.1 | HKLM\SOFTWARE\Microsoft\\.NET\3.1 | BlockMU | REG_DWORD | 0x00000001 |
| .NET Core 2.1 | HKLM\SOFTWARE\Microsoft\\.NET\2.1 | BlockMU | REG_DWORD | 0x00000001 |

#### Automatic updates for Server OS

Updates for server operating systems are supported by WSUS and Microsoft Update Catalog, but not AU. Server operating systems can opt in to receive updates through AU using the following registry keys.

| .NET version | Registry key | Name | Type | Value |
| -------------- | :--------- | :---------- | :---------- | :---------- |
| All | HKLM\SOFTWARE\Microsoft\\.NET | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 10 | HKLM\SOFTWARE\Microsoft\\.NET\10.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 9 | HKLM\SOFTWARE\Microsoft\\.NET\9.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 8 | HKLM\SOFTWARE\Microsoft\\.NET\8.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 7 | HKLM\SOFTWARE\Microsoft\\.NET\7.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 6 | HKLM\SOFTWARE\Microsoft\\.NET\6.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET 5 | HKLM\SOFTWARE\Microsoft\\.NET\5.0 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |
| .NET Core 3.1 | HKLM\SOFTWARE\Microsoft\\.NET\3.1 | AllowAUOnServerOS | REG_DWORD | 0x00000001 |

#### WSUS and update classifications

WSUS can be configured to provide specific updates based on their classification. Updates for .NET are classified as either *security* or *critical*. If the latest update is classified as critical, an older *security* update might be offered when an older version of .NET is installed that's superseded by the latest security update. This also applies to using the offline CAB (Wsusscan2.cab) to scan a machine.

> **Note:**
> In some cases, WSUS might report a missing update for a version that's older than the .NET version you installed. For example, imagine a user installs .NET 6.0.36, the latest release of .NET 6. This version is classified as a critical (non-security) update. Then an application installs an older version, 6.0.33. (It's not uncommon for applications to include specific versions of .NET as a prerequisite.) If an admin configured WSUS to only provide security updates, the next scan will report 6.0.35 as a missing update. Machines configured to receive *security* updates through AU or WSUS will be offered 6.0.35, even when 6.0.36 is installed. The reason for this is that 6.0.35 supersedes 6.0.33 and is the latest *security* update.
