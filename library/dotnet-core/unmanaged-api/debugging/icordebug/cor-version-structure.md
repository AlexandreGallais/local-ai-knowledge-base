---
title: "COR_VERSION Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-version-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_VERSION Structure

Stores the standard four-part version number of the common language runtime.

## Syntax

```cpp
typedef struct _COR_VERSION {
    DWORD dwMajor;
    DWORD dwMinor;
    DWORD dwBuild;
    DWORD dwSubBuild;
} COR_VERSION;
```

## Members

| Member       | Description               |
|--------------|---------------------------|
| `dwMajor`    | The major version number. |
| `dwMinor`    | The minor version number. |
| `dwBuild`    | The build number.         |
| `dwSubBuild` | The sub-build number.     |

## Remarks

 If the version number is 1.0.3705.288, 1 is the major version number, 0 is the minor version number, 3705 is the build number, and 288 is the sub-build number.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
