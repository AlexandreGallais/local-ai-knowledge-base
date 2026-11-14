---
title: "ICorDebugDataTarget::GetPlatform Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugdatatarget-getplatform-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugDataTarget::GetPlatform Method

Provides information about the platform, including processor architecture and operating system, on which the target process is running.

## Syntax

```cpp
HRESULT GetPlatform([out] CorDebugPlatform * pTargetPlatform);
```

## Parameters

 `pTargetPlatform`
 [out] A pointer to a CorDebugPlatformEnum enumeration that describes the target platform.

## Remarks

The `CorDebugPlatformEnum` enumeration return value is used by the ICorDebug interface to determine details of the target process such as its pointer size, address space layout, register set, instruction format, context layout, and calling conventions.

The `pTargetPlatform` value may refer to a platform that is being emulated for the target instead of specifying the actual hardware in use. For example, a process that is running in the Windows on Windows (WOW) environment on a 64-bit edition of the Windows operating system should use the `CORDB_PLATFORM_WINDOWS_X86` value of the CorDebugPlatformEnum enumeration.

This method must succeed. If it fails, the target platform is unusable. The method may fail for the following reasons:

- The platform that is being emulated for the target is unusable.

- The actual hardware on the target platform is unusable.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugDataTarget Interface
