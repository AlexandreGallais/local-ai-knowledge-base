---
title: "OSINFO Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/metadata/structures/osinfo-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# OSINFO Structure

Contains details about the operating system for an assembly or module.

## Syntax

```cpp
typedef struct {
    DWORD   dwOSPlatformId;
    DWORD   dwOSMajorVersion;
    DWORD   dwOSMinorVersion;
} OSINFO;
```

## Members

| Member             | Description                                                                  |
|--------------------|------------------------------------------------------------------------------|
| `dwOSPlatformId`   | One of the identifier values defined by the Microsoft Windows platform function `GetVersionEx`. The following values are supported: - VER_PLATFORM_WIN32s, or 0x0000, to specify Microsoft Windows 3.1.- VER_PLATFORM_WIN32_WINDOWS, or 0x0001, to specify Windows 95, Windows 98, or operating systems descended from them.- VER_PLATFORM_WIN32_NT, or 0x0002, to specify Windows NT or operating systems descended from it. |
| `dwOSMajorVersion` | The operating system major version, or a NULL value to indicate any version. |
| `dwOSMinorVersion` | The operating system minor version, or a NULL value to indicate any version. |

## Remarks

 `OSINFO` is based on the `OSVERSIONINFOEX` structure that is used in calls to the Microsoft Windows platform function `GetVersionEx`. This structure is used by the `ASSEMBLYMETADATA` structure to indicate its operating system support.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** Cor.h

## See also

- IMetaDataAssemblyEmit Interface
