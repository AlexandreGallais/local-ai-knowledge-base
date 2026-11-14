---
title: "CorDebugPlatform Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugplatform-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugPlatform Enumeration

Provides target platform values that are used by the ICorDebugDataTarget::GetPlatform method.

## Syntax

```cpp
typedef enum CorDebugPlatform
{
    CORDB_PLATFORM_WINDOWS_X86,    // Windows on Intel x86
    CORDB_PLATFORM_WINDOWS_AMD64,  // Windows x64 (AMD64, Intel EM64T)
    CORDB_PLATFORM_WINDOWS_IA64,   // Windows on Intel IA-64
    CORDB_PLATFORM_MAC_PPC,        // Macintosh OS on PowerPC
    CORDB_PLATFORM_MAC_X86,        // Macintosh OS on Intel x86
    CORDB_PLATFORM_WINDOWS_ARM,    // Windows on ARM
    CORDB_PLATFORM_MAC_AMD64       // MacOS on Intel x64
} CorDebugPlatform;
```

## Members

| Member                       | Description                                                                            |
|------------------------------|----------------------------------------------------------------------------------------|
| `CORDB_PLATFORM_WINDOWS_X86`   | The target platform is Windows running on Intel x86 hardware.                          |
| `CORDB_PLATFORM_WINDOWS_AMD64` | The target platform is 64 bit Windows running on AMD64 or Intel EM64T hardware.        |
| `CORDB_PLATFORM_WINDOWS_IA64`  | The target platform is 32 bit Windows running on Intel IA-64 hardware.                 |
| `CORDB_PLATFORM_MAC_PPC`       | The target platform is the Macintosh operating system running on PowerPC hardware.     |
| `CORDB_PLATFORM_MAC_X86`       | The target platform is the Macintosh operating system running on Intel x86 hardware.   |
| `CORDB_PLATFORM_WINDOWS_ARM`   | The target platform is the Macintosh operating system running on Windows ARM hardware. |
| `CORDB_PLATFORM_MAC_AMD64`     | The target platform is the Macintosh operating system running on AMD64 hardware.       |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0/4.5.2
